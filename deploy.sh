#!/bin/sh
set -e
echo "Starting deployment script"
BASE_DIR="/root/server/oring/O-ccount_front_v1"
DOCKER_BASE_DIR="/usr/share/nginx/oring_occount_v1"
BLUE_DIR="$BASE_DIR/build_blue"
GREEN_DIR="$BASE_DIR/build_green"
ACTIVE_LINK="$BASE_DIR/active"
BUILD_OUTPUT="$BASE_DIR/build_output"

echo "Current directory contents:"
ls -la $BASE_DIR

# 현재 활성 버전 확인
if [ -L "$ACTIVE_LINK" ] && [ "$(readlink $ACTIVE_LINK)" = "$DOCKER_BASE_DIR/build_blue" ]; then
    CURRENT_VERSION="blue"
    NEW_VERSION="green"
    NEW_BUILD_DIR=$GREEN_DIR
    DOCKER_NEW_BUILD_DIR="$DOCKER_BASE_DIR/build_green"
else
    CURRENT_VERSION="green"
    NEW_VERSION="blue"
    NEW_BUILD_DIR=$BLUE_DIR
    DOCKER_NEW_BUILD_DIR="$DOCKER_BASE_DIR/build_blue"
fi

echo "Current version: $CURRENT_VERSION"
echo "New version will be: $NEW_VERSION"
echo "Copying new build to $NEW_BUILD_DIR"

# 새 빌드 디렉토리 생성 또는 비우기
rm -rf $NEW_BUILD_DIR
mkdir -p $NEW_BUILD_DIR

if ! cp -r $BUILD_OUTPUT/* $NEW_BUILD_DIR/; then
    echo "Failed to copy new files. Error: $?"
    ls -la $BUILD_OUTPUT
    ls -la $NEW_BUILD_DIR
    exit 1
fi

echo "Updating symbolic link"
if ! ln -sfn $DOCKER_NEW_BUILD_DIR $ACTIVE_LINK; then
    echo "Failed to update symbolic link. Error: $?"
    ls -la $BASE_DIR
    exit 1
fi

echo "Deployment completed. New active version: $NEW_VERSION"
ls -la $BASE_DIR
echo "Symbolic link created:"
ls -l $ACTIVE_LINK
echo "Symbolic link target:"
readlink -f $ACTIVE_LINK