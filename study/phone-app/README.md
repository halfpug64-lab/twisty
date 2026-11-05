# Studyhall phone app build

The phone app lives in `studyhall/` on the `claude/dreamy-gates-rpu7nz` branch (served by GitHub Pages next to Twisty).
It is built from `../claude-artifact.html`:

    python3 make-app.py ../claude-artifact.html runtime.js studyhall/index.html

`runtime.js` stands in for the claude.ai page runtime: AI runs on the user's own key (Claude API through a
bundled copy of `@anthropic-ai/sdk` 1.0.0, or Google Gemini), and sets are kept on the device.
`anthropic-sdk.js` is that SDK bundled for the browser with esbuild 0.28.2:

    echo 'export { default as Anthropic } from "@anthropic-ai/sdk";' > entry.js
    npx esbuild entry.js --bundle --format=esm --platform=browser --minify --legal-comments=none --outfile=anthropic-sdk.js

After changing the page, bump `CACHE` in `sw.js` so phones pick up the new version.
