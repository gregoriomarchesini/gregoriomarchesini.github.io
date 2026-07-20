---
name: run-site
description: Build, run, and drive gregoriomarchesini.github.io. Use when asked to start the site or dev server, screenshot a page, check that routes render, verify a content/markdown change, or run its build and tests.
---

Vite + React personal site (Tailwind, react-router, framer-motion). All page
content is markdown under `src/content/`, parsed at runtime by
`src/content/collections.ts`. Drive it with
`.claude/skills/run-site/driver.mjs` — headless Chrome that walks every route,
screenshots each, and exits non-zero on any page error or 4xx.

**Read this first:** `npm run build`, `npx tsc --noEmit`, and `npm run test` all
pass even when the markdown content is broken, and a single bad content file
white-screens the *entire* site. Only the driver catches that. See Gotchas.

All paths are relative to the repo root.

## Prerequisites

Node 20 and Google Chrome. Chrome is already at `/usr/bin/google-chrome`; the
driver uses it via Playwright's `channel: "chrome"`. **No `apt-get` needed, and
do not run `npx playwright install`** — Playwright's bundled chromium is absent
from `~/.cache/ms-playwright/` and downloading ~150 MB is unnecessary.

## Setup

```bash
npm install
```

## Run (agent path)

One command — starts the dev server, drives all 10 routes, tears the server down:

```bash
node .claude/skills/run-site/driver.mjs --serve
```

```
driving http://localhost:8080 (10 routes)

   1508 chars  Gregorio Marchesini    /
    328 chars  Blog                   /blog
    726 chars  Publications           /publications
    ...
✓ all routes rendered, no console/page errors
```

Screenshots → `.claude/skills/run-site/screenshots/` (wiped each run, gitignored).

**Known failure on a clean tree** (as of 2026-07-20) — you did not cause this:

```
✗ 1 failure(s):
  /blog/2025/movies-clips  HTTP 404  /vi/Wey8nauEyA4I/hqdefault.jpg
```

`src/content/blog/2025/movies-clips.md:27` has a 12-character YouTube ID with a
trailing `I`; the real ID is `Wey8nauEyA4`. Drop the `I` and the run goes green.

| invocation | what it does |
|---|---|
| `driver.mjs --serve` | starts vite, walks all routes, stops vite |
| `driver.mjs /teaching /cv` | only these routes; needs a server already up |
| `driver.mjs --serve --full` | full-page screenshots instead of 1100×1400 viewport |
| `SITE_ORIGIN=http://localhost:4173 driver.mjs` | drive a `npm run preview` build instead |

With no `--serve` it requires a server already running:

```bash
npm run dev > /tmp/vite.log 2>&1 &
timeout 30 bash -c 'until curl -sf http://localhost:8080 >/dev/null; do sleep 0.3; done'
node .claude/skills/run-site/driver.mjs /publications
lsof -ti:8080 -sTCP:LISTEN | xargs -r kill    # npm does not forward SIGTERM; kill the listener
```

The no-argument run also scrapes `/blog` and `/projects` for one real post and
one real project slug, so the two detail templates that render markdown *bodies*
(`BlogPostTemplate`, `ProjectPageTemplate`) get covered — not just the index pages.

**Always look at a screenshot after a visual change.** A route can report a
healthy `h1` and plenty of characters while looking wrong.

## Run (human path)

```bash
npm run dev     # → http://localhost:8080, Ctrl-C to stop
```

Useless headless — nothing opens a window. Use the driver.

## Build and test

```bash
npm run build       # → dist/, ~2s
npx tsc --noEmit    # vite build does NOT typecheck; run this separately
npm run test        # vitest, 2 files / 8 tests
npm run lint        # 5 errors, 7 warnings — ALL pre-existing, see Gotchas
```

## Gotchas

- **A one-character content typo white-screens the whole site, and every check
  still passes.** `collections.ts` parses all page markdown at module load and
  `requiredField` throws on a missing key. Because every page imports from that
  one module, a bad key in `publications.md` also blanks `/cv`, `/teaching`, and
  the rest. Verified by renaming `venue:` → `venu:`: `npm run build` exit 0,
  `tsc --noEmit` exit 0, `npm run test` exit 0 — and the site fully dead. The
  driver was the only thing that caught it, reporting
  `PAGEERROR Missing required frontmatter field: venue`. **After editing anything
  under `src/content/`, run the driver.** This is the main reason this skill exists.
- **Dev server is on port 8080**, not Vite's default 5173 (`vite.config.ts`).
- **`npm run build` does not typecheck.** It's `vite build` alone. Run
  `npx tsc --noEmit` if types matter.
- **`npm run lint` fails on a clean tree** — 5 pre-existing errors in
  `src/components/ui/*` (shadcn boilerplate), `tailwind.config.ts` (`require()`),
  and `src/lib/markdown.ts:98` (a useless-escape in the italic regex). Lint your
  own files specifically: `npx eslint <paths>`. Don't try to get the whole repo green.
- **Playwright's bundled chromium is not installed.** The driver tries
  `channel: "chrome"` first and falls back to the bundle, so it works as-is —
  but a hand-written `chromium.launch()` script will fail with "Executable
  doesn't exist at ~/.cache/ms-playwright/…". Pass `channel: "chrome"`.
- **A driver script must live inside the repo.** Node resolves `@playwright/test`
  by walking up from the *script's* directory, so a copy in `/tmp` dies with
  `ERR_MODULE_NOT_FOUND` even when run from the repo root.
- **`chromium-cli` is not available here.** That's why this driver exists rather
  than the usual inline heredoc.
- **Content lives in markdown, not TSX.** `src/content/pages/*.md` (about,
  publications, coding, cv, teaching), `src/content/projects/*.md`,
  `src/content/blog/<year>/*.md`. Page `.tsx` files are formatting only. There is
  no `siteContent.tsx` — it was removed.

## Troubleshooting

- **`✗ nothing serving http://localhost:8080`**: no dev server. Pass `--serve`.
- **`✗ http://localhost:8080 is already in use`** with `--serve`: a stray vite.
  `lsof -ti:8080 -sTCP:LISTEN | xargs -r kill`.
- **`NO <h1> — page rendered blank or crashed`**: React didn't mount. Almost
  always a content parse error — read the `PAGEERROR` line above it for the
  offending field name, then check the corresponding `src/content/**/*.md`.
- **`HTTP 404 /vi/<id>/hqdefault.jpg`**: a YouTube thumbnail. The video ID in the
  markdown is wrong — YouTube IDs are exactly 11 characters. Verify with
  `curl -o /dev/null -w "%{http_code}" https://img.youtube.com/vi/<id>/hqdefault.jpg`.
