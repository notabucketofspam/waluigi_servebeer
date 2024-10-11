#!/bin/sh
# git log -1 --date=iso8601-strict --format=%cd >> html/text/git_data.txt
# sed ':a;N;$!ba;s/html\n//g' sitemap.txt
# find html | sed s/"html\/"/"\/"/g | sed ':a;N;$!ba;s/\/desktop.ini\n//g' | sed -n -e "2,65535p"

# find ./html -type f \( -name '*.js' -o -name '*.css' -o -name '*.txt' \)

# find "./css-js" -type f \( -name '*.js' -o -name '*.css' \) -exec sh -c '
#   for file do
#     echo "--- --- ---"
#     fdir=$(dirname "$file" | cut -c 3-65535 | sed s,"css-js/",,g)
#     fname=$(basename "$file" | cut -d "." -f 1)
#     fext=$(basename "$file" | cut -d "." -f 2)
#     fhash=$(sha256sum "$file" | cut -d " " -f 1)
#     fhashshort=$(echo "$fhash" | cut -c 1-8)
#     fpathfull="/""$fdir""/""$fname"-"$fhash"."$fext"
#     echo "$fpathfull"
#     mkdir -p html/"$fdir"
#     cat "$file" > html/"$fdir"/"$fname"-"$fhash"."$fext"
#     for html in $(find ./html -type f \( -name "*.html" \)); do
#       # hline="$(grep -e "src=\""/"$fdir"/"$fname".*"$fext""\"" "$html") \
#       #   $(grep -e "href=\""/"$fdir"/"$fname".*"$fext""\"" "$html")"
#       # hreplace=$(echo "$hline" | sed s,"/""$fdir""/""$fname".*"$fext","$fpathfull",g)
#       # echo "$html"" : ""$hreplace"
#       sed -i s,"/""$fdir""/""$fname".*"$fext","$fpathfull",g "$html"
#     done
#   done
# ' exec-sh {} +

# ~/s3cmd/s3cmd sync --recursive --acl-public cloud/ s3://spam-can-prime/
