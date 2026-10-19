using System;
using System.Diagnostics;
using System.IO;
using System.Windows.Forms;
namespace EveningEchoLauncher {
 static class Launcher {
  [STAThread] static void Main(string[] args) {
   string root=AppDomain.CurrentDomain.BaseDirectory;bool test=Array.IndexOf(args,"--smoke-test")>=0;
   try {
    string edge=null;foreach(string folder in new[]{Environment.GetFolderPath(Environment.SpecialFolder.ProgramFilesX86),Environment.GetFolderPath(Environment.SpecialFolder.ProgramFiles),Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData)}){string candidate=Path.Combine(folder,"Microsoft","Edge","Application","msedge.exe");if(File.Exists(candidate)){edge=candidate;break;}}
    if(edge==null)throw new InvalidOperationException("此版本需要本机安装 Microsoft Edge。也可以用已有的 Chrome 打开 index.html。");
    string page=Path.Combine(root,"index.html");if(!File.Exists(page))throw new FileNotFoundException("请先解压整个游戏文件夹，再启动游戏。",page);
    string profile=Path.Combine(root,test?"TestEdgePlayerDataV3":"PlayerData-Edge");Directory.CreateDirectory(profile);
    string options="--app=\""+new Uri(page).AbsoluteUri+"\" --user-data-dir=\""+profile+"\" --no-first-run --no-default-browser-check --disable-background-networking";
    if(test)options+=" --headless=new --no-sandbox --remote-debugging-port=9335 --remote-debugging-address=127.0.0.1 \""+new Uri(page).AbsoluteUri+"\"";
    using(Process process=Process.Start(new ProcessStartInfo(edge,options){UseShellExecute=false,WorkingDirectory=root,WindowStyle=test?ProcessWindowStyle.Hidden:ProcessWindowStyle.Normal})){if(process!=null)process.WaitForExit();}
   }catch(Exception ex){File.WriteAllText(Path.Combine(root,"launcher-error.log"),ex.ToString());if(!test)MessageBox.Show(ex.Message,"晚风留声",MessageBoxButtons.OK,MessageBoxIcon.Information);Environment.ExitCode=1;}
  }
 }
}
