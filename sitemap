#!/bin/sh
find html | sed s/"html\/"/"\/"/g | sed ':a;N;$!ba;s/\/desktop.ini\n//g' | sed -n -e "2,65535p" > html/page/sitemap/sitemap.txt
echo "Done"
