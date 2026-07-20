#!/usr/bin/env node
// Drives the running site with headless Chrome: walks routes, screenshots each,
// and fails loudly on any page error. See SKILL.md for usage.
//
// Must be run from the repo root (node resolves @playwright/test upward from
// this file, so it only works while the driver lives inside the repo).

import { mkdirSync, rmSync } from "node:fs";
import { spawn } from "node:child_process";
import { chromium } from "@playwright/test";

const ORIGIN = process.env.SITE_ORIGIN ?? "http://localhost:8080";
const SHOTS = new URL("./screenshots/", import.meta.url).pathname;

const args = process.argv.slice(2);
const serve = args.includes("--serve");
const full = args.includes("--full");
const routes = args.filter((a) => a.startsWith("/"));

// Static routes from src/App.tsx. Dynamic ones (/blog/:year/:slug,
// /projects/:slug) are discovered by scraping their index pages below.
const STATIC = ["/", "/blog", "/publications", "/projects", "/coding", "/cv", "/teaching", "/art-gallery"];

const up = async () => {
  try {
    return (await fetch(ORIGIN, { signal: AbortSignal.timeout(1000) })).ok;
  } catch {
    return false;
  }
};

const waitForServer = async (timeoutMs) => {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    if (await up()) return true;
    await new Promise((r) => setTimeout(r, 300));
  }
  return false;
};

let vite;
if (serve) {
  if (await up()) {
    console.error(`✗ ${ORIGIN} is already in use. Free it first:\n  lsof -ti:8080 -sTCP:LISTEN | xargs -r kill`);
    process.exit(1);
  }
  vite = spawn("npm", ["run", "dev"], { stdio: "ignore", detached: true });
  if (!(await waitForServer(30_000))) {
    process.kill(-vite.pid);
    console.error("✗ dev server never came up within 30s");
    process.exit(1);
  }
} else if (!(await up())) {
  console.error(`✗ nothing serving ${ORIGIN}. Either pass --serve, or start it yourself:\n  npm run dev &`);
  process.exit(1);
}

// Playwright's own chromium is usually not downloaded here; the system Chrome is.
const launch = async () => {
  const opts = { args: ["--no-sandbox"] };
  try {
    return await chromium.launch({ ...opts, channel: "chrome" });
  } catch {
    return await chromium.launch(opts); // needs `npx playwright install chromium`
  }
};

rmSync(SHOTS, { recursive: true, force: true });
mkdirSync(SHOTS, { recursive: true });

const browser = await launch();
const page = await (await browser.newContext({ viewport: { width: 1100, height: 1400 } })).newPage();

const failures = [];
let current = "";
page.on("pageerror", (e) => failures.push(`${current}  PAGEERROR  ${e.message.split("\n")[0]}`));
page.on("console", (m) => {
  // Chrome logs a generic "Failed to load resource" with no URL; the response
  // handler below reports the same failure with the path, so skip the dupe.
  if (m.type() === "error" && !m.text().startsWith("Failed to load resource")) {
    failures.push(`${current}  CONSOLE  ${m.text()}`);
  }
});
page.on("response", (r) => {
  if (r.status() >= 400) {
    failures.push(`${current}  HTTP ${r.status()}  ${new URL(r.url()).pathname}`);
  }
});

const visit = async (route) => {
  current = route;
  await page.goto(ORIGIN + route, { waitUntil: "networkidle" });

  // Every page renders inside <main>; an h1 means React mounted and the
  // content module didn't throw on import.
  let heading = "(no h1)";
  try {
    await page.waitForSelector("h1", { timeout: 5000 });
    heading = (await page.textContent("h1"))?.trim() ?? "";
  } catch {
    failures.push(`${route}  NO <h1> — page rendered blank or crashed`);
  }

  const chars = (await page.innerText("body")).length;
  const name = route === "/" ? "index" : route.slice(1).replace(/\//g, "_");
  await page.screenshot({ path: `${SHOTS}${name}.png`, fullPage: full });

  console.log(`  ${String(chars).padStart(5)} chars  ${heading.padEnd(22)} ${route}`);
};

let targets = routes.length ? routes : STATIC;

if (!routes.length) {
  // Discover one real blog post and one real project so the detail templates
  // (which render markdown bodies) are covered too.
  await page.goto(`${ORIGIN}/blog`, { waitUntil: "networkidle" });
  const post = await page.getAttribute('a[href^="/blog/"]', "href");
  await page.goto(`${ORIGIN}/projects`, { waitUntil: "networkidle" });
  const project = await page.getAttribute('a[href^="/projects/"]', "href");
  targets = [...STATIC, post, project].filter(Boolean);
}

console.log(`\ndriving ${ORIGIN} (${targets.length} routes)\n`);
for (const route of targets) await visit(route);

console.log(`\nscreenshots → .claude/skills/run-site/screenshots/`);

if (failures.length) {
  console.error(`\n✗ ${failures.length} failure(s):`);
  for (const f of failures) console.error(`  ${f}`);
} else {
  console.log("\n✓ all routes rendered, no console/page errors");
}

await browser.close();
if (vite) process.kill(-vite.pid);
process.exit(failures.length ? 1 : 0);
