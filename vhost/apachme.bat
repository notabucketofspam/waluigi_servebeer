@ECHO off

SET "whereyouat=%~dp0.."

pause
exit 0

RENAME "C:\Apache24\htdocs" "htdocs_old"
mklink /d "C:\Apache24\htdocs" "%whereyouat%\html"
RENAME "C:\Apache24\cgi-bin" "cgi-bin_old"
mklink /d "C:\Apache24\cgi-bin" "%whereyouat%\cgi-bin"
MKDIR "C:\httpd"
mklink /d "C:\httpd\waluigi_servebeer" "%whereyouat%"
MKDIR "C:\httpd\dlc"

REM this lets us compile 'basic.esproj',
REM assuming that you cloned "online" into "C:\httpd\online"
MKDIR "%whereyouat%\basic\src\extern"
mklink "%whereyouat%\basic\src\extern\MediaPlayer.ts" "C:\httpd\online\MediaPlayer\src\MediaPlayer.ts"
