#!/usr/bin/env bash
# Open the static site locally in the default browser
xdg-open index.html 2>/dev/null || open index.html 2>/dev/null || echo "Open index.html in your browser"
