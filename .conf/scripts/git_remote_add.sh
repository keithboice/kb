#!/bin/bash

# git_push.sh


#### Config
# exit if any command fails.
set -e

#### Variables
URL=$1 # "./packages/dot-github/"
#NAME=$2; # "dot-docs"

#### Functions


#### Main
git remote add origin "$URL" && git remote -v && echo "...all done!"