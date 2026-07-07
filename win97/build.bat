@ECHO off
CMD /C "npm run build&& EXIT"
CMD /C "npm run vbuild&& EXIT"
DEL /Q /F /S ..\html\windows\*
XCOPY /Y /S dist\ ..\html\windows\
REM timeout /t 10
