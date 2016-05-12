#!/bin/sh

set -e
set -u
set -x

npm install
bower install
grunt build

rm -rf pkgs
mkdir pkgs
cd build
tar -czvf ../pkgs/packageBuild.tar.gz .
