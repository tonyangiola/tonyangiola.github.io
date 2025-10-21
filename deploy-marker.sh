#!/usr/bin/env bash
set -e
stamp=$(date +%s)
# ensure closed, single-line marker at top of index.html
if grep -q "^<!-- deploy-marker:" index.html; then
  sed -i -E "1s|^<!-- deploy-marker: .*$|<!-- deploy-marker: ${stamp} -->|" index.html
else
  sed -i "1s|^|<!-- deploy-marker: ${stamp} -->\n|" index.html
fi
git add index.html
git commit -m "deploy-marker ${stamp}" || true
git push
echo "Deployed marker ${stamp}"
