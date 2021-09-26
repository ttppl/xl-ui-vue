#!/bin/bash
dir=$(ls -l /usr/ |awk '/^d/ {print $NF}')
for file in $dir
do
  echo $file
fi
done