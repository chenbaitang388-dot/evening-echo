param([Parameter(Mandatory=$true)][string]$SdkDirectory)
$ErrorActionPreference='Stop'
$projectRoot=Split-Path -Parent $PSScriptRoot
$compiler=Join-Path $env:WINDIR 'Microsoft.NET\Framework64\v4.0.30319\csc.exe'
$core=Join-Path $SdkDirectory 'lib\net462\Microsoft.Web.WebView2.Core.dll'
$forms=Join-Path $SdkDirectory 'lib\net462\Microsoft.Web.WebView2.WinForms.dll'
Copy-Item -LiteralPath $core,$forms -Destination $projectRoot -Force
Copy-Item -LiteralPath (Join-Path $SdkDirectory 'runtimes\win-x64\native\WebView2Loader.dll') -Destination $projectRoot -Force
& $compiler /nologo /target:winexe /platform:x64 /optimize+ "/win32icon:$projectRoot\assets\evening-echo.ico" /reference:System.dll /reference:System.Core.dll /reference:System.Drawing.dll /reference:System.Windows.Forms.dll "/reference:$core" "/reference:$forms" "/out:$projectRoot\EveningEcho.exe" (Join-Path $PSScriptRoot 'EveningEcho.cs')
if($LASTEXITCODE -ne 0){throw 'Compilation failed'}
& $compiler /nologo /target:winexe /platform:x64 /optimize+ "/win32icon:$projectRoot\assets\evening-echo.ico" /reference:System.dll /reference:System.Windows.Forms.dll "/out:$projectRoot\EveningEcho.Edge.exe" (Join-Path $PSScriptRoot 'Launcher.cs')
if($LASTEXITCODE -ne 0){throw 'Fallback compilation failed'}
