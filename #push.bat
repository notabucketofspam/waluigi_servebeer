@ECHO off
CD basic
CALL tsc --build
CD ..
CD win97
CALL build
CD ..
CALL mexec "./push.sh"
timeout /t 10
