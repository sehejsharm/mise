#!/usr/bin/env node
/**
 * Checks every external <a href> in the built site (run `pnpm build` first).
 * Brief rule: verify each URL resolves before linking; never invent a URL.
 *
 *   pnpm check:links            report; exit 1 only on a definite break (4xx/5xx)
 *   pnpm check:links --strict   also exit 1 when a URL could not be verified
 *
 * "Unverified" means the request never got a usable answer: a network block,
 * a timeout, or a site that refuses automated requests (LinkedIn answers 999).
 * Click-check those by hand before launch.
 */
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const appDir = path.join(root, ".next/server/app");
const strict = process.argv.includes("--strict");
// Share buttons build these per post; they are intents, not destinations.
const SHARE_INTENT = /^https:\/\/(twitter\.com\/intent\/|x\.com\/intent\/|wa\.me\/\?|www\.linkedin\.com\/sharing\/)/;
const site = new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://misehotel.com").host;

if (!fs.existsSync(appDir)) {
  console.error("✗ check-links: no build found. Run `pnpm build` first.");
  process.exit(1);
}

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    return e.isDirectory() ? walk(p) : e.name.endsWith(".html") ? [p] : [];
  });
}

/** url → set of pages linking to it */
const links = new Map();
for (const file of walk(appDir)) {
  const html = fs.readFileSync(file, "utf8");
  const page = "/" + path.relative(appDir, file).replace(/\.html$/, "").replace(/(^|\/)index$/, "");
  for (const m of html.matchAll(/<a\b[^>]*?\shref="(https?:\/\/[^"]+)"/g)) {
    const url = m[1].replace(/&amp;/g, "&");
    if (new URL(url).host === site || SHARE_INTENT.test(url)) continue;
    if (!links.has(url)) links.set(url, new Set());
    links.get(url).add(page === "/" ? "/" : page);
  }
}

async function probe(url) {
  const attempt = async (method) => {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 12_000);
    try {
      const res = await fetch(url, {
        method,
        redirect: "follow",
        signal: ctrl.signal,
        headers: { "user-agent": "Mozilla/5.0 (compatible; misehotel-linkcheck/1.0)" },
      });
      return { status: res.status };
    } catch (error) {
      return { error: error.name === "AbortError" ? "timeout" : error.cause?.code || error.message };
    } finally {
      clearTimeout(timer);
    }
  };
  let r = await attempt("HEAD");
  if (r.error || r.status === 405 || r.status === 403 || r.status >= 500) r = await attempt("GET");
  return r;
}

const urls = [...links.keys()].sort();
const results = [];
const queue = [...urls];
await Promise.all(
  Array.from({ length: 6 }, async () => {
    while (queue.length) {
      const url = queue.shift();
      results.push({ url, ...(await probe(url)) });
    }
  }),
);

const ok = results.filter((r) => r.status && r.status < 400);
const broken = results.filter((r) => r.status && ([404, 410].includes(r.status) || r.status >= 500) && r.status !== 999);
const unverified = results.filter((r) => !ok.includes(r) && !broken.includes(r));

const where = (url) => [...links.get(url)].slice(0, 3).join(", ") + (links.get(url).size > 3 ? ` +${links.get(url).size - 3}` : "");
console.log(`check-links: ${urls.length} external URLs across the built pages.`);
ok.forEach((r) => console.log(`  ✓ ${r.status} ${r.url}`));
unverified.forEach((r) => console.log(`  ? ${r.status ?? r.error} ${r.url}  (on ${where(r.url)})`));
broken.forEach((r) => console.log(`  ✗ ${r.status} ${r.url}  (on ${where(r.url)})`));
console.log(`\n${ok.length} ok · ${unverified.length} unverified · ${broken.length} broken`);
if (broken.length || (strict && unverified.length)) process.exit(1);
