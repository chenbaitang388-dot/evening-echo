using System;
using System.IO;
using System.Drawing;
using System.Threading.Tasks;
using System.Windows.Forms;
using Microsoft.Web.WebView2.Core;
using Microsoft.Web.WebView2.WinForms;

namespace EveningEcho {
 public sealed class GameWindow : Form {
  readonly WebView2 view = new WebView2();
  readonly bool smoke;
  readonly bool acceptance;
  bool mayClose, closing, fullscreen;
  Rectangle previousBounds;
  FormWindowState previousState;
  readonly string basePath = AppDomain.CurrentDomain.BaseDirectory;
  public GameWindow(bool test, bool fullTest) {
   smoke=test; acceptance=fullTest; Text="晚风留声 · Evening Echo"; ClientSize=new Size(1366,768);
   Icon=new Icon(Path.Combine(basePath,"assets","evening-echo.ico")); MinimumSize=new Size(960,600); StartPosition=FormStartPosition.CenterScreen;
   BackColor=Color.FromArgb(16,28,33); view.Dock=DockStyle.Fill; Controls.Add(view);
   if(smoke){StartPosition=FormStartPosition.Manual;Location=new Point(-30000,-30000);ShowInTaskbar=false;}
   // Initialise after the message loop starts, including a hidden smoke-test window.
   var startup=new System.Windows.Forms.Timer(); startup.Interval=100;
   startup.Tick+=async (s,e)=>{startup.Stop();startup.Dispose();await Initialise();};
   startup.Start();
   FormClosing+=OnClosing;
  }
  async Task Initialise() {
   try {
    if(smoke){File.WriteAllText(Path.Combine(basePath,"desktop-smoke.log"),"initialising");Show();}
    var options=new CoreWebView2EnvironmentOptions();
    if(smoke)options.AdditionalBrowserArguments="--no-sandbox --remote-debugging-port=9333 --remote-debugging-address=127.0.0.1";
    string data=Path.Combine(basePath,smoke?"TestPlayerDataV3":"PlayerData");
    var env=await CoreWebView2Environment.CreateAsync(null,data,options);
    await view.EnsureCoreWebView2Async(env);
    if(smoke)File.WriteAllText(Path.Combine(basePath,"desktop-smoke.log"),"webview created");
    if(acceptance)view.CoreWebView2.DownloadStarting+=(s,e)=>{Directory.CreateDirectory(Path.Combine(basePath,"work"));e.ResultFilePath=Path.Combine(basePath,"work","native-export.json");e.Handled=true;};
    view.CoreWebView2.Settings.AreDefaultContextMenusEnabled=false;
    view.CoreWebView2.Settings.AreDevToolsEnabled=smoke;
    view.CoreWebView2.Settings.IsStatusBarEnabled=false;
    view.CoreWebView2.Settings.IsZoomControlEnabled=false;
    view.CoreWebView2.NavigationStarting+=(s,e)=>{if(smoke)File.AppendAllText(Path.Combine(basePath,"desktop-smoke.log"),"\nstarting: "+e.Uri);if(!LocalResource(e.Uri))e.Cancel=true;};
    view.CoreWebView2.NewWindowRequested+=(s,e)=>{e.Handled=true;};
    view.CoreWebView2.AddWebResourceRequestedFilter("*",CoreWebView2WebResourceContext.All);
    view.CoreWebView2.WebResourceRequested+=(s,e)=>{
     Uri resource; if(!Uri.TryCreate(e.Request.Uri,UriKind.Absolute,out resource)||resource.Scheme!="https"||resource.Host!="evening-echo.local") {e.Response=env.CreateWebResourceResponse(new MemoryStream(),403,"Offline mode","");return;}
     try{string relative=Uri.UnescapeDataString(resource.AbsolutePath).TrimStart('/').Replace('/',Path.DirectorySeparatorChar);if(relative.Length==0)relative="index.html";string target=Path.GetFullPath(Path.Combine(basePath,relative));
      if(!target.StartsWith(Path.GetFullPath(basePath).TrimEnd(Path.DirectorySeparatorChar)+Path.DirectorySeparatorChar,StringComparison.OrdinalIgnoreCase)||!File.Exists(target)){e.Response=env.CreateWebResourceResponse(new MemoryStream(),404,"Not found","");return;}
      string ext=Path.GetExtension(target).ToLowerInvariant(),mime=ext==".html"?"text/html; charset=utf-8":ext==".js"?"text/javascript; charset=utf-8":ext==".css"?"text/css; charset=utf-8":ext==".png"?"image/png":ext==".json"?"application/json":"application/octet-stream";
      e.Response=env.CreateWebResourceResponse(File.OpenRead(target),200,"OK","Content-Type: "+mime+"\r\nCache-Control: no-cache");
     }catch{e.Response=env.CreateWebResourceResponse(new MemoryStream(),500,"Local resource error","");}
    };
    view.CoreWebView2.WebMessageReceived+=(s,e)=>{string m;try{m=e.TryGetWebMessageAsString();}catch{return;}if(m=="quit")Close();else if(m=="saved"&&closing){mayClose=true;Close();}else if(m=="fullscreen")ToggleFullscreen();};
    view.CoreWebView2.NavigationCompleted+=async (s,e)=>{if(smoke){File.WriteAllText(Path.Combine(basePath,"desktop-smoke.log"),e.IsSuccess?"ready":"navigation failed: "+e.WebErrorStatus);if(e.IsSuccess&&!acceptance){try{string result=await view.CoreWebView2.ExecuteScriptAsync(File.ReadAllText(Path.Combine(basePath,"desktop","smoke.js")));File.WriteAllText(Path.Combine(basePath,"docs","desktop-validation.json"),result);Close();}catch(Exception ex){File.WriteAllText(Path.Combine(basePath,"desktop-error.log"),ex.ToString());Close();}}}};
    view.CoreWebView2.Navigate("https://evening-echo.local/index.html");
    if(smoke)File.AppendAllText(Path.Combine(basePath,"desktop-smoke.log"),"\nnavigation requested");
   }catch(Exception ex){
    File.WriteAllText(Path.Combine(basePath,"desktop-error.log"),ex.ToString());
    if(!smoke)MessageBox.Show("无法启动游戏窗口。请确认已安装 Microsoft Edge WebView2 Runtime，并将整个游戏文件夹解压到可写入的位置。\n\n错误详情已写入 desktop-error.log。","晚风留声",MessageBoxButtons.OK,MessageBoxIcon.Error);
    mayClose=true;Close();
   }
  }
  bool LocalResource(string address){Uri uri;return Uri.TryCreate(address,UriKind.Absolute,out uri)&&uri.Scheme=="https"&&uri.Host=="evening-echo.local";}
  async void OnClosing(object sender,FormClosingEventArgs e){
   if(mayClose||view.CoreWebView2==null)return;e.Cancel=true;if(closing)return;closing=true;
   try{view.CoreWebView2.PostWebMessageAsString("save-and-close");await Task.Delay(2500);if(!mayClose){await view.CoreWebView2.ExecuteScriptAsync("window.EveningEcho && window.EveningEcho.flush()");mayClose=true;Close();}}
   catch{mayClose=true;Close();}
  }
  void ToggleFullscreen(){if(!fullscreen){previousBounds=Bounds;previousState=WindowState;WindowState=FormWindowState.Normal;FormBorderStyle=FormBorderStyle.None;Bounds=Screen.FromControl(this).Bounds;fullscreen=true;}else{FormBorderStyle=FormBorderStyle.Sizable;Bounds=previousBounds;WindowState=previousState;fullscreen=false;}}
  [STAThread] public static void Main(string[] args){Application.EnableVisualStyles();Application.SetCompatibleTextRenderingDefault(false);Application.Run(new GameWindow(Array.IndexOf(args,"--smoke-test")>=0||Array.IndexOf(args,"--acceptance-test")>=0,Array.IndexOf(args,"--acceptance-test")>=0));}
 }
}
