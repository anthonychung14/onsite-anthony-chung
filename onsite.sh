#! /bin/bash

set -ex

REPO_NAME="heydoctor/onsite-$1"
BRANCH_NAME=teammate-pr

if [[ $# -eq 0 ]] ; then
  echo 'Please supply the hyphenated name of our candidate'
  exit 1
fi

hub create $REPO_NAME
git remote add $REPO_NAME "git@github.com:$REPO_NAME"
git push --set-upstream $REPO_NAME master
git push --set-upstream $REPO_NAME $BRANCH_NAME
hub pull-request -b "$REPO_NAME:master" -h "$REPO_NAME:$BRANCH_NAME" -F ./pr-notes.txt
