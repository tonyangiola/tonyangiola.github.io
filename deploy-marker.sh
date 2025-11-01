#!/usr/bin/env bash
set -euo pipefail
ts=$(date +%Y%m%d-%H%M%S)
# Touch a tiny marker so GitHub Pages serves a fresh build
echo "<!-- deploy-marker $ts -->" >> assets/style.css
git add assets/style.css
git commit -m "deploy-marker $ts" || true
git push || true
