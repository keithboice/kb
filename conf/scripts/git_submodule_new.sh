#!/bin/bash

# git_dir_to_submodule.sh

#ROOT_DIR="$(pwd)"
TARGET_DIR=$1 # "./packages/dot-github/"
NAME=$2; # "dot-docs"

git submodule add -f --name "$NAME" git@github.com:keithboice/.docs.git "$TARGET_DIR" && git submodule absorbgitdirs