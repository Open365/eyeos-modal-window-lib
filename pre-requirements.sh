#!/bin/bash
set -x
set -e
set -u
sudo npm install -g bower
sudo yum install -y gem ruby-devel
sudo gem update --system
gem install json_pure
gem install compass
