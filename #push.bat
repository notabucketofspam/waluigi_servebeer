@ECHO off
CMD /C "npm run build&& EXIT"
CALL mexec "./push.sh"
timeout /t 10
