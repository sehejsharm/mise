// Finds text elements whose right edge extends beyond the viewport at 390px.
import { chromium } from "@playwright/test";
import fs from "node:fs";
const s = fs.readFileSync(".next/server/app/sitemap.xml.body", "utf8");
const routes = [...s.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
const b = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium" });
const p = await b.newPage({ viewport: { width: 390, height: 900 }, reducedMotion: "reduce" });
await p.route(/googletagmanager|google-analytics/, (r) => r.abort());
let bad = 0;
for (const r of routes) {
  await p.goto("http://localhost:3100" + r, { waitUntil: "load" });
  const hits = await p.evaluate(() => {
    const out = [];
    for (const el of document.querySelectorAll("main p, main h1, main h2, main h3, main li, main a, main button")) {
      if (el.closest("[aria-hidden='true'], [data-copy-budget='exclude'], .animate-marquee, pre, table, [class*='overflow-x']")) continue;
      const rc = el.getBoundingClientRect();
      if (rc.width && rc.right > window.innerWidth + 1) out.push(`${el.tagName} "${el.textContent.trim().slice(0, 50)}" right=${Math.round(rc.right)}`);
    }
    return out.slice(0, 3);
  });
  if (hits.length) { bad++; console.log(r, hits); }
}
console.log("routes with clipped text:", bad, "of", routes.length);
await b.close();
