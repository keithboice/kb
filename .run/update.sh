#!/usr/bin/env bash

clear
chmod -R 777 ~/.grunt-init
cp -R "/Users/dkb/Library/Mobile Documents/com~apple~CloudDocs/repos/packages/packages/run-generate/build" ~/.grunt-init/yarnpkg
chmod -R 777 "/Users/dkb/Library/Mobile Documents/com~apple~CloudDocs/repos/packages/packages/test-grnt-init"
cd "/Users/dkb/Library/Mobile Documents/com~apple~CloudDocs/repos/packages/packages/test-grnt-init" || exit
rm -rf ./*

npx grunt-init yarnpkg