#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

VERSION=$(node -p "require('./package.json').version")
OUT_DIR="releases"
ZIP_NAME="hhhelper-v${VERSION}-chrome.zip"

rm -rf dist
pnpm build

mkdir -p "$OUT_DIR"
rm -f "$OUT_DIR/$ZIP_NAME"

(cd dist && zip -rq "../$OUT_DIR/$ZIP_NAME" . -x ".*")

echo "Built $OUT_DIR/$ZIP_NAME"
