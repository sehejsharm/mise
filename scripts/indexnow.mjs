#!/usr/bin/env node
/**
 * Pings IndexNow (Bing, Yandex, Seznam, Naver) with every sitemap URL after a
 * production build on Vercel. Bing's index also feeds ChatGPT search.
 * Skips silently everywhere else, and never fails the build.
 */
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const key = process.env.INDEXNOW_KEY;
const site = (process.env.NEXT_PUBLIC_SITE_URL || "https://misehotel.com").replace(/\/$/, "");

if (process.env.VERCEL_ENV !== "production" || !key) {
  console.log("↷ indexnow: skipped (runs on Vercel production builds with INDEXNOW_KEY set).");
  process.exit(0);
}

try {
  const sitemap = fs.readFileSync(path.join(root, ".next/server/app/sitemap.xml.body"), "utf8");
  const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "content-type": "application/json; charset=utf-8" },
    body: JSON.stringify({ host: new URL(site).host, key, keyLocation: `${site}/indexnow-key.txt`, urlList }),
  });
  console.log(`✓ indexnow: submitted ${urlList.length} URLs (HTTP ${res.status}).`);
} catch (error) {
  console.warn(`! indexnow: ping failed (${error.message}); the build continues.`);
}
