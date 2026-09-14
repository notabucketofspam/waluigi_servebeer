@ECHO off
CALL tsc
CALL vite build -l warn
DEL /Q /F /S ..\html\windows\*
XCOPY /Y /S dist\ ..\html\windows\
REM timeout /t 10
