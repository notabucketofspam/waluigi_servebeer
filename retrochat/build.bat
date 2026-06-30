@ECHO off
CMD /C "npm run build&& EXIT"
CMD /C "npm run vbuild&& EXIT"
XCOPY /Y /S dist\ ..\html\windows\
REM timeout /t 10
