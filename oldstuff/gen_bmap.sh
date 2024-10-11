#!/bin/sh
export bucket="s3://spam-can-prime"
export mapout="html/page/bucket/bucketmap.txt"
rm "$mapout"
OIFS="$IFS"
IFS=$'\n'
for file in `~/s3cmd/s3cmd ls --recursive "$bucket"`; do
  echo "$file"
  echo $(echo "$file" | sed s,.*"$bucket",,g) >> "$mapout"
done
IFS="$OIFS"
