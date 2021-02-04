#!/bin/bash


GENERATOR_NAME=$1;
TEMPLATE_NAME=$2;


hygen "$GENERATOR_NAME" new "$TEMPLATE_NAME" && echo "successfully created template $TEMPLATE_NAME"