#!/bin/bash

PACKAGE_DIR=./packages

if [ -z "$PACKAGE_NAME" ]
then
    echo "#########################################"
    echo "Provide folder name under packages folder"
    echo "#########################################"
    exit 1
fi

find $PACKAGE_DIR -mindepth 1 -maxdepth 1 -type d | while read -r dir
do
  pushd "$dir"  # note the quotes, which encapsulate whitespace
  # gets last string after slash
  LOCAL_PACKNAME=`echo $dir | sed 's:.*/::'`
  if [ $PACKAGE_NAME == $LOCAL_PACKNAME ]
  then
    yarn publish
  fi
  popd
done