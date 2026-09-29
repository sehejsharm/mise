// Ad-hoc screenshot helper: node scripts/qa/shot.mjs <url> <out.png> [width] [theme] [fullPage] [scrollY]
import { chromium } from "@playwright/test";
const [url, out, width = "1440", theme = "dark", full = "1", scrollY = "0"] = process.argv.slice(2);
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || "/opt/pw-browsers/chromium" });
const page = await browser.newPage({ viewport: { width: Number(width), height: 900 }, deviceScaleFactor: 1 });
await page.addInitScript((t) => {
  try { localStorage.setItem("mise-theme", t); } catch {}
  document.cookie = "mise_consent=a%3A0%7Cm%3A0; path=/";
}, theme);
await page.route(/googletagmanager|google-analytics|google\.com/, (r) => r.abort());
await page.goto(url, { waitUntil: "load" });
await page.waitForTimeout(800);
// Trigger reveal observers by scrolling through the page.
const h = await page.evaluate(() => document.body.scrollHeight);
for (let y = 0; y < h; y += 700) { await page.evaluate((yy) => window.scrollTo(0, yy), y); await page.waitForTimeout(120); }
await page.evaluate((y) => window.scrollTo(0, Number(y)), scrollY);
await page.waitForTimeout(1500);
await page.screenshot({ path: out, fullPage: full === "1" });
await browser.close();
