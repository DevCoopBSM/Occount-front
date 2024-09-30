#!/bin/sh
set -e
echo "Starting deployment script"

# CI/CD 환경 확인
if [ -n "$CI_PROJECT_DIR" ]; then
    echo "Running in CI/CD environment"
    BASE_DIR="$CI_PROJECT_DIR"
    DOCKER_BASE_DIR="/usr/share/nginx/oring_occount_v1"
else
    echo "Running in server environment"
    BASE_DIR="/root/server/oring/O-ccount_front_v1"
    DOCKER_BASE_DIR="/usr/share/nginx/oring_occount_v1"
fi

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

echo "Contents of BUILD_OUTPUT directory:"
ls -la $BUILD_OUTPUT

if ! cp -r $BUILD_OUTPUT/* $NEW_BUILD_DIR/; then
    echo "Failed to copy new files. Error: $?"
    echo "Contents of BUILD_OUTPUT directory:"
    ls -la $BUILD_OUTPUT
    echo "Contents of NEW_BUILD_DIR:"
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
readlink $ACTIVE_LINK

# 스크립트가 성공적으로 완료되었음을 명시적으로 표시
exit 0