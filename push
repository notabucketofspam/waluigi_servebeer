#!/bin/sh
find html | sed s/"html\/"/"\/"/g | sed ':a;N;$!ba;s/\/desktop.ini\n//g' | sed -n -e "2,65535p" > html/page/sitemap/sitemap.txt
rsync --compress --quiet --recursive --include-from="./rsync-include.txt" --exclude-from="./rsync-exclude.txt" --delete -e "ssh -i \"./notkeys/key\"" ./ ubuntu@193.122.154.50:/httpd/waluigi_servebeer/
echo "Done"
