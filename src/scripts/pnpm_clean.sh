#!/usr/bin/env bash

set -e

cd ../../
pwd

rm -rf "node_modules" ".pnpm-store" ".pnp.js" "*-lock.*" "package-lock.json" "pnpm-lock.yaml" && echo "removed pnpm
directories and
files"
