#!/bin/bash

# git_push.sh


# exit if any command fails.
set -e

lerna link convert && lerna bootstrap --hoist && echo "...bootstrapped lerna"
git add . && git commit -m "initial commit" && echo "...committed to repo"
git push --recurse-submodules=on-demand origin main  && echo "...pushed to repo"

#git submodule add -f --name "$NAME" git@github.com:keithboice/.docs.git "$TARGET_DIR" && git submodule absorbgitdirs