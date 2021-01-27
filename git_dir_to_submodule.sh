#!/bin/bash

# git_dir_to_submodule.sh

ROOT_DIR="$(pwd)"
TARGET_DIR="./packages/dot-github/"

#git add remote origin git@github.com:keithboice/.github.git || exit
#cd "$ROOT_DIR" || exit
#git submodule add git@github.com:keithboice/.github.git "./.github/" || exit

git init "$TARGET_DIR" || exit
git checkout -b main || exit
git add . && git commit -m "initial commit" || exit
cd "$ROOT_DIR" || exit
git submodule add -f git@github.com:keithboice/.github.git "$TARGET_DIR" || exit

git submodule add -b "main" -f --name "dot-github" git@github.com:keithboice/.github.git "./packages/dot-github/"

git submodule absorbgitdirs