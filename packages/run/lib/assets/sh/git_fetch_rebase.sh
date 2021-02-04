#!/bin/bash

# $FILENAME

##### Constants

ROOT_DIR=""


while getopts p: flag
do
    # shellcheck disable=SC2220
    case "${flag}" in
        p) ROOT_DIR=${OPTARG};;
    esac
done


##### Main

echo ".... starting ....";
clear
cd "${ROOT_DIR}" || exit && echo ".... in root dir ....";
git add . || exit && echo ".... added files ....";
git commit -m "updated" || exit && echo ".... committed files ....";
git push -f origin main || exit && echo ".... pushed files ....";


echo "all done!";

