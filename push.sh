#!/bin/sh
find html | sed s/"html\/"/"\/"/g | sed ':a;N;$!ba;s/\/desktop.ini\n//g' | \
  sed -n -e "2,65535p" > html/page/sitemap/sitemap.txt
echo "$(($(head -n 1 html/resource/git-data.txt) + 1))" > html/resource/git-data.txt
date --iso-8601=seconds >> html/resource/git-data.txt
domain="150.136.87.157"
rsync --compress --recursive \
  --include-from="./rsync-include.txt" --exclude-from="./rsync-exclude.txt" \
  --delete -e "ssh -i \"../common/httpd-private-key\"" ./ httpd@$domain:/httpd/waluigi_servebeer/
echo "Done"
