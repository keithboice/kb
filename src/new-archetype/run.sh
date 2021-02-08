#!/usr/bin/env bash

set -e

# see: https://github.com/FormidableLabs/builder

NAME=$1
ROOT= "$(pwd)"
PKGS_ROOT="$ROOT/packages"
NEW_ROOT="$PKGS_ROOT/$NAME"

# Create and link new archetype
mkdir "$NEW_ROOT" && cd "$NEW_ROOT"

npm init && npm link

cd "$ROOT" && npm link "$NAME"

# Create and link dev archetype
$ npm install builder-support --save-dev
$ ./node_modules/.bin/builder-support gen-dev
$ cd dev
$ npm link
$ cd path/to/consuming/project
$ npm link new-archetype-name-dev
touch dev/require.js && cat "module.exports = require"
