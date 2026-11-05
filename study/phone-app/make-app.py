"""Builds the GitHub Pages phone app from the claude.ai artifact page.
Usage: python3 make-app.py <artifact.html> <runtime.js> <out-index.html>"""
import sys
src, runtime, out = sys.argv[1:4]
page = open(src).read()
rt = open(runtime).read()
title_end = page.index('</title>') + len('</title>')
head_bits, body = page[:title_end], page[title_end:]
# The artifact's <style> sits in the body; move everything up to the first </style> into <head>.
style_end = body.index('</style>') + len('</style>')
head_rest, body = body[:style_end], body[style_end:]
html = f'''<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover">
<meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#171c2e" media="(prefers-color-scheme: dark)">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="default">
<meta name="apple-mobile-web-app-title" content="Studyhall">
<link rel="manifest" href="manifest.webmanifest">
<link rel="apple-touch-icon" href="apple-touch-icon-v1.png">
<link rel="icon" type="image/png" href="icon-192-v1.png">
<style>
:root {{ padding-top: env(safe-area-inset-top, 0px); padding-bottom: env(safe-area-inset-bottom, 0px); }}
body {{ margin: 0; font-size: 14px; -webkit-tap-highlight-color: transparent; }}
html {{ -webkit-text-size-adjust: 100%; text-size-adjust: 100%; overscroll-behavior-x: none; }}
img {{ max-width: 100%; }}
[hidden] {{ display: none !important; }}
</style>
{head_bits.strip()}
{head_rest.strip()}
<script>
{rt}
</script>
</head>
<body>
{body.strip()}
</body>
</html>
'''
open(out, 'w').write(html)
print('wrote', out, len(html))
