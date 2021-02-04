#!/bin/bash


GENERATOR_NAME=$1; # "dot-docs"

hygen generator new "$GENERATOR_NAME" && echo "successfully created generator $GENERATOR_NAME"