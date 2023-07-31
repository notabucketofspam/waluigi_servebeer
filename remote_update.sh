#!/bin/sh
find html | sed s/"html\/"/"\/"/g | sed ':a;N;$!ba;s/\/desktop.ini\n//g' | \
sed -n -e "2,65535p" > html/page/sitemap/sitemap.txt
echo "$(($(git rev-list --count HEAD) + 1))" > html/resource/git-data.txt
date --iso-8601=seconds >> html/resource/git-data.txt
git add .; git commit -m "Normal update"
git push origin master
ssh git@35.227.79.38 "cd /var/www; git pull origin master"
