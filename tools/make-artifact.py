"""Builds app.html (the claude.ai preview copy) from index.html.
Strips the document wrapper and the home-screen-app pieces the preview can't use.
Run: python3 tools/make-artifact.py"""
import pathlib, re
root = pathlib.Path(__file__).resolve().parent.parent
s = (root / "index.html").read_text()
s = s[s.index("<title>"):]
s = s.replace("</head>\n<body>\n", "")
s = re.sub(r"\n</body>\n</html>\n?$", "\n", s)
for pat in [r'<meta name="theme-color"[^>]*>\n', r'<meta name="(apple-)?mobile-web-app-[^>]*>\n', r'<link rel="(manifest|apple-touch-icon|icon)"[^>]*>\n',
            r'<script src="daily.js"></script>\n', r'if\("serviceWorker" in navigator\)[^\n]*\n']:
    s = re.sub(pat, "", s)
(root / "app.html").write_text(s)
print("app.html rebuilt,", len(s), "chars")
