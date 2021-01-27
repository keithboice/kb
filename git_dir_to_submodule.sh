#!/bin/bash

# git_dir_to_submodule.sh

ROOT_DIR=""

system_info() {
  echo "<h2>System release info</h2>"
  echo "<p>Function not yet implemented</p>"

} # end of system_info

while getopts p: flag; do
  # shellcheck disable=SC2220
  case "${flag}" in
  p) ROOT_DIR=${OPTARG} ;;
  esac
done

echo "root paths: /"
