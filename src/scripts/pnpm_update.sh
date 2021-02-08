#!/usr/bin/env bash

set -e


cd ../../

pwd

pnpm update --latest --recursive

pnpm update --recursive--workspace

pnpm install
