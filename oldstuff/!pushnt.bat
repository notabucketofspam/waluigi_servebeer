@ECHO off
TITLE %~nx0
SET __whatfiles=html/page/reviews/*

pscp %__whatfiles% oci-cool:/httpd/waluigi_servebeer/html/page/reviews/

timeout /t 10
