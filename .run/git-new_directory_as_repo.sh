#!/bin/bash

set -e

REPO_ALIAS="actions"
REPO_URL="git@github.com:keithboice/.github_actions.git"
SUBDIR="/Users/dkb/Library/Mobile Documents/com~apple~CloudDocs/repos/packages/.github/workflows"
BRANCH_LOCAL="develop"
BRANCH_REMOTE="main"

echo "$REPO_ALIAS" && echo "$REPO_URL" && echo "$SUBDIR";

pwd && cd "$SUBDIR" && pwd && git remote -v

#git remote add "$REPO_ALIAS" "$REPO_URL"



# @example git subtree add --prefix {local directory being pulled into} {remote repo URL} {remote branch} --squash
git subtree add --prefix "$SUBDIR" $REPO_URL $BRANCH_REMOTE --squash

git subtree add --prefix ./.github/workflows git@github.com:keithboice/.github_actions.git master --squash
git subtree add --prefix  https://github.com/newfivefour/vimrc.git master --squash


git remote -v

#git push --set-upstream "$REPO_ALIAS" $BRANCH_LOCAL

