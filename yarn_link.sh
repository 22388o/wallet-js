#!/bin/bash

PACKAGE_DIR=./packages

find $PACKAGE_DIR -mindepth 1 -maxdepth 1 -type d | while read -r dir
do
  pushd "$dir"  # note the quotes, which encapsulate whitespace
  echo $dir
  yarn link
  popd
done