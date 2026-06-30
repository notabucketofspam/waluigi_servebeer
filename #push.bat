@ECHO off
CD basic
CMD /C "npm run build&& EXIT"
CD ..
CD retrochat
CALL build
CD ..
CALL mexec "./push.sh"
timeout /t 10
