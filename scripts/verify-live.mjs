#!/usr/bin/env node
/**
 * Live deployment verification → docs/LIVE-VERIFICATION.md
 *
 *   node scripts/verify-live.mjs                          # https://misehotel.com
 *   node scripts/verify-live.mjs --base http://localhost:3100 --out docs/LIVE-VERIFICATION-LOCAL.md
 *   node scripts/verify-live.mjs --submit-test-lead       # also submits one real demo request
 *
 * Every check prints PASS / FAIL / SKIP with its evidence. Needs network access
 * to the site and Chromium (Playwright) for the browser checks. Lighthouse and
 * screenshots are separate commands, printed at the end of the report.
 */
import fs from "node:fs";
import path from "node:path";
import tls from "node:tls";
import { chromium } from "@playwright/test";
import { parse } from "node-html-parser";

const args = process.argv.slice(2);
const opt = (n, d) => (args.includes(n) ? args[args.indexOf(n) + 1] : d);
const BASE = opt("--base", "https://misehotel.com").replace(/\/$/, "");
const OUT = path.resolve(opt("--out", "docs/LIVE-VERIFICATION.md"));
const SUBMIT = args.includes("--submit-test-lead");
const GA = "G-KVTTR7P7BY";
const host = new URL(BASE).host;
const isLive = !/localhost|127\.0\.0\.1/.test(host);
const NEW_PAGES = ["/solutions", "/solutions/kitchen", "/solutions/engineering", "/solutions/security-and-safety", "/solutions/spa-and-wellness"];
const CANON = "Mise is the service execution platform (SEP) for hotels.";
const REPOSITIONED = "2026-10-01";

const results = [];
const check = (section, name, pass, evidence) => {
  const status = pass === null ? "SKIP" : pass ? "PASS" : "FAIL";
  results.push({ section, name, status, evidence: String(evidence ?? "").slice(0, 600) });
  console.log(`${status.padEnd(4)}  ${section} · ${name}${evidence ? `  — ${String(evidence).split("\n")[0].slice(0, 140)}` : ""}`);
};
const get = (url, init = {}) => fetch(url.startsWith("http") ? url : `${BASE}${url}`, { redirect: "manual", ...init });

/* ── Domain & transport ───────────────────────────────────────────────── */
{
  const r = await get("/");
  check("Domain & transport", `${BASE} returns 200`, r.status === 200, `HTTP ${r.status}`);
  if (isLive) {
    for (const from of [`http://${host}/`, `https://www.${host}/`, `http://www.${host}/`]) {
      try {
        const a = await fetch(from, { redirect: "manual" });
        const loc = a.headers.get("location") ?? "";
        const ok = [301, 308].includes(a.status) && loc.replace(/\/$/, "") === BASE;
        check("Domain & transport", `${from} redirects to ${BASE} in one hop`, ok, `HTTP ${a.status} → ${loc || "(no location)"}`);
      } catch (e) {
        check("Domain & transport", `${from} redirects to ${BASE}`, false, e.message);
      }
    }
    const cert = await new Promise((resolve) => {
      const s = tls.connect(443, host, { servername: host }, () => {
        const c = s.getPeerCertificate();
        resolve({ ok: s.authorized, subject: c.subject?.CN, until: c.valid_to, err: s.authorizationError });
        s.end();
      });
      s.on("error", (e) => resolve({ ok: false, err: e.message }));
    });
    check("Domain & transport", "Valid TLS certificate", cert.ok, cert.ok ? `CN=${cert.subject}, valid to ${cert.until}` : cert.err);
  } else {
    check("Domain & transport", "HTTP → HTTPS and www → apex redirects", null, "Not applicable to a local server");
    check("Domain & transport", "Valid TLS certificate", null, "Not applicable to a local server");
  }
  const h = r.headers;
  const want = ["strict-transport-security", "content-security-policy", "x-content-type-options", "referrer-policy", "permissions-policy"];
  const missing = want.filter((k) => !h.get(k));
  check("Domain & transport", "Security headers (HSTS, CSP, nosniff, Referrer-Policy, Permissions-Policy)", missing.length === 0, missing.length ? `missing: ${missing.join(", ")}` : want.map((k) => `${k}: ${h.get(k).slice(0, 60)}`).join("\n"));
}

/* ── Sitemap crawl ────────────────────────────────────────────────────── */
const sitemapRes = await get("/sitemap.xml");
const sitemap = await sitemapRes.text();
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const paths = urls.map((u) => new URL(u).pathname);
const pages = new Map();
for (const p of paths) {
  const res = await get(p);
  pages.set(p, { status: res.status, html: res.status === 200 ? await res.text() : "" });
}

/* ── The fix is live ──────────────────────────────────────────────────── */
{
  const home = parse(pages.get("/")?.html ?? "");
  const title = home.querySelector("title")?.text ?? "";
  const h1 = home.querySelector("h1")?.text ?? "";
  check("Fix is live", "Homepage <title> and H1 name Mise the service execution platform (SEP)", title === "Hotel Service Execution Platform (SEP) | Mise" && /service execution platform for hotels/i.test(h1), `title: ${title} | H1: ${h1}`);
  const solutionsLink = home.querySelectorAll("nav[aria-label='Primary'] a").find((a) => a.text.trim() === "Solutions");
  check("Fix is live", "Nav \"Solutions\" goes to /solutions", solutionsLink?.getAttribute("href") === "/solutions", `href=${solutionsLink?.getAttribute("href")}`);
  const codes = [];
  for (const p of NEW_PAGES) codes.push(`${p} ${(await get(p)).status}`);
  check("Fix is live", "/solutions and the 4 new department pages return 200", codes.every((c) => c.endsWith(" 200")), codes.join(", "));
  const bad = [];
  let demoCtas = 0;
  for (const [p, { html }] of pages) {
    const doc = parse(html);
    for (const a of doc.querySelectorAll("a")) {
      const href = a.getAttribute("href") ?? "";
      const isDemo = /book (?:a |my )?15-min demo|book demo/i.test(a.text) || a.getAttribute("data-track") === "demo_cta_click";
      if (isDemo) {
        demoCtas++;
        if (href !== "/demo") bad.push(`${p}: "${a.text.trim()}" → ${href}`);
      }
      if (href.startsWith("mailto:") && href.includes("?")) bad.push(`${p}: prefilled mailto → ${href.slice(0, 50)}`);
    }
  }
  check("Fix is live", "Zero mailto demo CTAs; every \"Book a 15-min demo\" → /demo", bad.length === 0, bad.length ? bad.slice(0, 8).join("\n") : `${demoCtas} demo CTAs across ${pages.size} pages, all → /demo`);
  const llms = await (await get("/llms.txt")).text();
  check("Fix is live", "llms.txt contains \"Departments covered\"", llms.includes("Departments covered"), llms.match(/## Departments covered[\s\S]{0,160}/)?.[0]);
}

/* ── SEO / GEO ────────────────────────────────────────────────────────── */
{
  const today = new Date().toISOString().slice(0, 10);
  const hasNew = NEW_PAGES.every((p) => paths.includes(p));
  check("SEO / GEO", "sitemap.xml lists all routes including the new ones", sitemapRes.status === 200 && hasNew, `${paths.length} URLs; new pages ${hasNew ? "present" : "MISSING"}`);
  const entries = [...sitemap.matchAll(/<url>\s*<loc>([^<]+)<\/loc>[\s\S]*?<lastmod>([^<]+)<\/lastmod>/g)].map((m) => [new URL(m[1]).pathname, m[2].slice(0, 10)]);
  const changed = entries.filter(([p]) => NEW_PAGES.includes(p) || p === "/" || p === "/platform");
  const fresh = changed.length >= NEW_PAGES.length && changed.every(([, d]) => d >= REPOSITIONED);
  check("SEO / GEO", `sitemap lastModified for the changed pages is the repositioning date or later (${REPOSITIONED}; today ${today})`, fresh, changed.map(([p, d]) => `${p} ${d}`).join(", "));
  const robots = await (await get("/robots.txt")).text();
  const bots = ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "Claude-SearchBot", "PerplexityBot", "Google-Extended", "Applebot-Extended", "Bingbot", "CCBot"];
  const missingBots = bots.filter((b) => !robots.includes(b));
  check("SEO / GEO", "robots.txt allows the AI crawlers and blocks /keystatic and /api", !missingBots.length && /Disallow: \/keystatic/.test(robots) && /Disallow: \/api/.test(robots), missingBots.length ? `missing: ${missingBots}` : "all 10 crawlers listed; /keystatic and /api disallowed");
  for (const f of ["/llms.txt", "/llms-full.txt"]) {
    const r = await get(f);
    check("SEO / GEO", `${f} returns 200 as text/plain`, r.status === 200 && /text\/plain/.test(r.headers.get("content-type") ?? ""), `HTTP ${r.status}, ${r.headers.get("content-type")}`);
  }
  const seo = [];
  for (const [p, { status, html }] of pages) {
    if (status !== 200) {
      seo.push(`${p}: HTTP ${status}`);
      continue;
    }
    const d = parse(html);
    const h1s = d.querySelectorAll("h1").length;
    const title = d.querySelector("title")?.text ?? "";
    const desc = d.querySelector('meta[name="description"]')?.getAttribute("content") ?? "";
    const canon = d.querySelector('link[rel="canonical"]')?.getAttribute("href") ?? "";
    const ld = d.querySelectorAll('script[type="application/ld+json"]');
    let ldOk = ld.length > 0;
    for (const s of ld) {
      try {
        JSON.parse(s.text);
      } catch {
        ldOk = false;
      }
    }
    const expectCanon = `https://misehotel.com${p === "/" ? "" : p}`;
    if (h1s !== 1) seo.push(`${p}: ${h1s} H1s`);
    if (title.length > 60) seo.push(`${p}: title ${title.length} chars`);
    if (!desc || desc.length > 160) seo.push(`${p}: description ${desc.length} chars`);
    if (canon.replace(/\/$/, "") !== expectCanon.replace(/\/$/, "")) seo.push(`${p}: canonical ${canon}`);
    if (!ldOk) seo.push(`${p}: JSON-LD missing or invalid`);
  }
  check("SEO / GEO", "Every page: one H1, self-canonical on https://misehotel.com, title ≤60, description ≤160, parseable JSON-LD", seo.length === 0, seo.length ? seo.slice(0, 10).join("\n") : `${pages.size} pages checked`);
  const graph = JSON.parse(parse(pages.get("/")?.html ?? "").querySelector('script[type="application/ld+json"]')?.text ?? "{}");
  const nodes = graph["@graph"] ?? [];
  const desc = (t) => nodes.find((n) => n["@type"] === t)?.description ?? "";
  const faqPage = parse(pages.get("/faq")?.html ?? "").querySelectorAll('script[type="application/ld+json"]').map((s) => JSON.parse(s.text)["@graph"] ?? []).flat();
  const faqWhat = faqPage.find((n) => n["@type"] === "FAQPage")?.mainEntity?.find((q) => q.name === "What is Mise?")?.acceptedAnswer?.text ?? "";
  check("SEO / GEO", "Organization / SoftwareApplication descriptions name the service execution platform (SEP); FAQ \"What is Mise?\" is the canonical definition", desc("Organization").startsWith("Mise is the service execution platform (SEP) for hotels") && desc("SoftwareApplication").startsWith("Standalone service execution platform (SEP)") && faqWhat.startsWith(CANON), `Organization: ${desc("Organization").slice(0, 70)}… | FAQ: ${faqWhat.slice(0, 50)}…`);
  const og = [];
  for (const key of ["home", "solutions", "solutions--kitchen", "solutions--engineering", "solutions--security-and-safety", "solutions--spa-and-wellness"]) {
    const r = await get(`/og/${key}.png`);
    const buf = Buffer.from(await r.arrayBuffer());
    const w = buf.length > 24 ? buf.readUInt32BE(16) : 0;
    const h = buf.length > 24 ? buf.readUInt32BE(20) : 0;
    og.push({ key, ok: r.status === 200 && w === 1200 && h === 630, s: `${key} ${r.status} ${w}×${h}` });
  }
  check("SEO / GEO", "OG images resolve (200, 1200×630) for home, /solutions and each new solution page", og.every((o) => o.ok), og.map((o) => o.s).join(", "));
  const broken = new Set();
  const seen = new Set();
  for (const [p, { html }] of pages) {
    for (const a of parse(html).querySelectorAll("a[href^='/']")) {
      const href = (a.getAttribute("href") ?? "").split("#")[0];
      if (!href || seen.has(href)) continue;
      seen.add(href);
      const r = await get(href);
      if (r.status >= 400) broken.add(`${href} (${r.status}, linked from ${p})`);
    }
  }
  check("SEO / GEO", "Zero broken internal links / 404s across a full crawl", broken.size === 0, broken.size ? [...broken].slice(0, 10).join("\n") : `${seen.size} unique internal links, all < 400`);
  check("SEO / GEO", "IndexNow ping sent for changed URLs", null, "Logged in the Vercel production build output (scripts/indexnow.mjs); requires INDEXNOW_KEY in Production env");
}

/* ── Browser checks: Google tag, consent, events, form ────────────────── */
{
  const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || (fs.existsSync("/opt/pw-browsers/chromium") ? "/opt/pw-browsers/chromium" : undefined) });
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  const hits = [];
  page.on("request", (req) => {
    const u = req.url();
    if (/googletagmanager\.com\/gtag\/js/.test(u) || /google-analytics\.com\/g\/collect|analytics\.google\.com\/g\/collect/.test(u)) hits.push(u);
  });
  const html = pages.get("/")?.html ?? "";
  check("Google tag", `${GA} present in the homepage HTML`, html.includes(GA), `${(html.match(new RegExp(GA, "g")) ?? []).length} occurrences in raw HTML`);
  const perPage = [];
  for (const p of ["/", "/solutions", "/platform", "/demo"]) {
    hits.length = 0;
    await page.goto(`${BASE}${p}`, { waitUntil: "load" });
    await page.waitForTimeout(1500);
    perPage.push(`${p}: ${hits.filter((u) => u.includes("gtag/js") && u.includes(GA)).length}`);
  }
  check("Google tag", "gtag/js loads exactly once per page", perPage.every((s) => s.endsWith(": 1")), perPage.join(", "));
  const consent = await page.evaluate(() => (window.dataLayer ?? []).filter((e) => e && e[0] === "consent").map((e) => [...e].slice(0, 3)));
  const collectBefore = hits.filter((u) => u.includes("/g/collect")).length;
  const deniedFirst = JSON.stringify(consent[0] ?? []).includes('"analytics_storage":"denied"');
  check("Google tag", "Before consent: analytics_storage denied and no collect hits", deniedFirst && collectBefore === 0, `first consent call: ${JSON.stringify(consent[0])}; collect hits: ${collectBefore}`);
  hits.length = 0;
  const accept = page.getByRole("button", { name: /^Accept/i });
  if (await accept.count()) {
    await accept.first().click();
    await page.waitForTimeout(3000);
  }
  const collect = hits.filter((u) => u.includes("/g/collect") && u.includes(`tid=${GA}`));
  check("Google tag", "After Accept: page_view hit to /g/collect with tid=G-KVTTR7P7BY", isLive ? collect.some((u) => /en=page_view/.test(u)) : null, isLive ? collect.slice(0, 2).join("\n") || "no collect hits observed" : "Google is not reachable from a local rehearsal; run against the live site");
  const events = async () => page.evaluate(() => (window.dataLayer ?? []).filter((e) => e && e[0] === "event").map((e) => e[1]));
  await page.goto(`${BASE}/`, { waitUntil: "load" });
  // Hold the navigation for one click so the event can be read from this page's dataLayer.
  await page.evaluate(() => window.addEventListener("click", (e) => e.preventDefault(), { capture: true, once: true }));
  await page.locator("a[data-track='demo_cta_click']").first().click();
  await page.waitForTimeout(300);
  const evs = await events();
  const ctaHref = await page.locator("a[data-track='demo_cta_click']").first().getAttribute("href");
  check("Google tag", "Clicking a demo CTA fires demo_cta_click", evs.includes("demo_cta_click"), `events: ${evs.join(", ") || "none"}; CTA href ${ctaHref}`);
  await page.goto(`${BASE}/demo`, { waitUntil: "load" });
  if (SUBMIT) {
    await page.getByLabel("Your name").fill("TEST — ignore");
    await page.getByLabel("Work email").fill("hello@misehotel.com");
    await page.getByLabel("Hotel or group").fill("Verification test");
    await page.getByLabel("Your role").selectOption({ index: 1 });
    await page.getByLabel("Number of properties").selectOption({ index: 1 });
    await page.waitForTimeout(1800);
    const lead = page.waitForResponse((r) => r.url().endsWith("/api/lead"));
    await page.getByRole("button", { name: "Book my 15-min demo" }).click();
    const res = await lead;
    const body = await res.text();
    const success = await page
      .getByTestId("demo-success")
      .waitFor({ state: "visible", timeout: 8000 })
      .then(() => true)
      .catch(() => false);
    check("Demo form", "Live /demo submission: HTTP 200 and success state", res.status() === 200 && success, `HTTP ${res.status()} ${body.slice(0, 120)}; success state ${success ? "shown" : "NOT shown"}`);
    const fired = (await events()).includes("demo_form_submit");
    check("Google tag", "Submitting the form fires demo_form_submit", fired, fired ? "demo_form_submit in dataLayer" : "not observed");
    check("Demo form", "Resend shows the email delivered", null, "Confirm in the Resend dashboard (Emails → latest) and in the hello@misehotel.com inbox; not verifiable from this script");
  } else {
    check("Demo form", "Live /demo submission", null, "Not submitted. Re-run with --submit-test-lead to send one real test request");
  }
  await browser.close();
}

/* ── Report ───────────────────────────────────────────────────────────── */
const counts = Object.fromEntries(["PASS", "FAIL", "SKIP"].map((s) => [s, results.filter((r) => r.status === s).length]));
const sections = [...new Set(results.map((r) => r.section))];
const md = `# Live verification

Target: **${BASE}**${isLive ? "" : " (local rehearsal, not the live site)"} · run ${new Date().toISOString()} · \`node scripts/verify-live.mjs${args.length ? ` ${args.join(" ")}` : ""}\`

**${counts.PASS} PASS · ${counts.FAIL} FAIL · ${counts.SKIP} SKIP**

${sections
  .map(
    (s) => `## ${s}

| Check | Result | Evidence |
|---|---|---|
${results
  .filter((r) => r.section === s)
  .map((r) => `| ${r.name} | **${r.status}** | ${r.evidence.replace(/\|/g, "\\|").replace(/\n/g, "<br>")} |`)
  .join("\n")}`,
  )
  .join("\n\n")}

## Separate commands

- Copy audit against the live sitemap: \`node scripts/copy-audit.ts --base ${BASE} --out docs/COPY-AUDIT-LIVE.md\`
- Lighthouse (mobile + desktop) on live \`/\`, \`/solutions\`, \`/platform\`, \`/demo\`: \`pnpm exec lhci collect --url=${BASE}/ --url=${BASE}/solutions --url=${BASE}/platform --url=${BASE}/demo && pnpm exec lhci collect --preset=desktop ...\`
- Screenshots (390 / 1440, dark + light): \`node scripts/qa/shot.mjs ${BASE}/solutions out.png 390 dark\`
`;
fs.writeFileSync(OUT, md);
console.log(`\n${counts.PASS} PASS · ${counts.FAIL} FAIL · ${counts.SKIP} SKIP → ${path.relative(process.cwd(), OUT)}`);
process.exit(counts.FAIL ? 1 : 0);
