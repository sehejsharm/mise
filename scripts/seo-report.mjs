#!/usr/bin/env node
/**
 * Crawl check → docs/SEO-REPORT.md.
 * For every URL in the sitemap: title, H1, primary keyword (first entry of the
 * keywords meta, set by lib/seo.ts), and whether the keyword appears in the
 * title, meta description, H1, first 100 words, an H2, the lead image alt and
 * the OG title. Also checks description length/CTA and counts homepage words.
 *
 * Usage: start the production server (pnpm start -p 3100), then
 *        BASE_URL=http://localhost:3100 pnpm seo:report
 */
import fs from "node:fs";
import path from "node:path";
import { chromium } from "@playwright/test";
import { parse } from "node-html-parser";

const BASE = process.env.BASE_URL || "http://localhost:3100";
const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");

const norm = (s) => s.toLowerCase().replace(/[’']/g, "'").replace(/[^a-z0-9&' ]+/g, " ").replace(/\s+/g, " ").trim();
/** Keyword tokens appear in order (allows small connecting words: "hotel SOP software built in India"). */
function has(text, keyword) {
  const t = norm(text);
  const k = norm(keyword);
  if (!k) return false;
  if (t.includes(k)) return true;
  const tokens = k.split(" ");
  let i = 0;
  for (const word of t.split(" ")) if (word === tokens[i] || word === `${tokens[i]}s`) i++;
  return i === tokens.length;
}
const mark = (b) => (b ? "✓" : "✗");

const sitemap = await (await fetch(`${BASE}/sitemap.xml`)).text();
const paths = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);

const rows = [];
const issues = [];
for (const p of paths) {
  const html = await (await fetch(`${BASE}${p}`)).text();
  const doc = parse(html);
  const title = doc.querySelector("title")?.text.trim() ?? "";
  const desc = doc.querySelector('meta[name="description"]')?.getAttribute("content") ?? "";
  const kw = (doc.querySelector('meta[name="keywords"]')?.getAttribute("content") ?? "").split(",")[0].trim();
  const h1 = doc.querySelector("h1")?.text.trim() ?? "";
  const ogTitle = doc.querySelector('meta[property="og:title"]')?.getAttribute("content") ?? "";
  const main = doc.querySelector("main");
  main?.querySelectorAll("script, style, nav[aria-label='Breadcrumb']").forEach((n) => n.remove());
  const words = (main?.text ?? "").replace(/\s+/g, " ").trim();
  const fromH1 = words.slice(Math.max(0, words.indexOf(h1.slice(0, 20))));
  const first100 = fromH1.split(" ").slice(0, 100).join(" ");
  const h2s = doc.querySelectorAll("h2").map((h) => h.text);
  const lead = doc.querySelector("main [data-lead]");
  const leadAlt = lead ? (lead.getAttribute("alt") ?? lead.getAttribute("aria-label") ?? "") : "";
  const r = {
    path: p,
    title,
    h1,
    kw,
    inTitle: has(title, kw),
    inDesc: has(desc, kw),
    inH1: has(h1, kw),
    inFirst100: has(first100, kw),
    inH2: h2s.some((h) => has(h, kw)),
    inAlt: leadAlt ? has(leadAlt, kw) : null,
    inOg: has(ogTitle, kw),
    descLen: desc.length,
    descCta: /demo\.?$/i.test(desc.trim()),
  };
  rows.push(r);
  if (!p.startsWith("/blog/author") && !p.startsWith("/blog/category") && !p.startsWith("/team/") && !["/privacy", "/terms", "/cookies", "/security", "/contact", "/demo"].includes(p)) {
    for (const [k, label] of [["inTitle", "title"], ["inDesc", "description"], ["inH1", "H1"], ["inFirst100", "first 100 words"], ["inH2", "an H2"], ["inOg", "OG title"]]) {
      if (!r[k]) issues.push(`${p}: primary keyword "${kw}" not in ${label}`);
    }
    if (r.inAlt === false) issues.push(`${p}: primary keyword "${kw}" not in lead image alt`);
  }
  if (r.descLen < 120 || r.descLen > 158) issues.push(`${p}: description length ${r.descLen}`);
  if (!r.descCta && p !== "/demo") issues.push(`${p}: description does not end with a demo CTA`);
}

// Homepage copy budget, measured on rendered visible text at desktop width.
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || "/opt/pw-browsers/chromium" });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.route(/googletagmanager|google-analytics/, (r) => r.abort());
await page.goto(`${BASE}/`, { waitUntil: "load" });
const budget = await page.evaluate(() => {
  const main = document.querySelector("main").cloneNode(true);
  // Not copy: decorative duplicates (aria-hidden) and demo-data mockups (ticker, dashboard).
  main.querySelectorAll("[aria-hidden='true'], [data-copy-budget='exclude'], script, style").forEach((n) => n.remove());
  document.body.appendChild(main);
  main.style.position = "absolute";
  main.style.left = "-99999px";
  main.style.width = "1440px";
  const count = (el) => (el?.innerText ?? "").split(/\s+/).filter((w) => /[A-Za-z0-9]/.test(w)).length;
  const sections = [...main.children].flatMap((c) => (c.tagName === "DIV" ? [...c.children] : [c])).map((s) => ({ id: s.querySelector("h1,h2")?.textContent?.trim().slice(0, 40) ?? s.tagName, words: count(s) }));
  const faq = document.querySelector("#faq-title")?.closest("section");
  const faqWords = faq ? [...faq.querySelectorAll("details")].reduce((n, d) => n + d.textContent.split(/\s+/).filter(Boolean).length, 0) : 0;
  const ticker = [...document.querySelectorAll("[aria-label^='Service record entries'] li")].slice(0, 8).reduce((n, li) => n + li.innerText.split(/\s+/).length, 0);
  const headings = [...main.querySelectorAll("h2")].map((h) => ({ text: h.innerText.trim(), words: h.innerText.trim().split(/\s+/).length }));
  return { visible: count(main), faqWords, ticker, headings, sections };
});
await browser.close();

const date = new Date().toISOString().slice(0, 10);
const table = rows
  .map(
    (r) =>
      `| \`${r.path}\` | ${r.title.replace(/\|/g, "\\|")} | ${r.h1.replace(/\|/g, "\\|")} | ${r.kw} | ${mark(r.inTitle)} | ${mark(r.inDesc)} | ${mark(r.inH1)} | ${mark(r.inFirst100)} | ${mark(r.inH2)} | ${r.inAlt === null ? "–" : mark(r.inAlt)} | ${mark(r.inOg)} | ${r.descLen}${r.descCta ? "" : " ⚠"} |`,
  )
  .join("\n");

const md = `# SEO report: misehotel.com

Generated ${date} by \`pnpm seo:report\` against a local production build (${rows.length} URLs from the sitemap, drafts included because this is not a production build).

**Keyword checks** use the page's primary keyword (the first \`keywords\` meta entry, set in \`content/\`). A keyword counts as present when its words appear in order (so "hotel SOP software India" matches "Hotel SOP software built in India"). **URL slugs** were fixed by the brief's information architecture, so they are not scored here. Utility pages (legal, contact, demo, author and category archives, founder profiles) are listed but not scored for keyword placement.

## Summary

- URLs checked: **${rows.length}**
- Keyword placement issues on scored pages: **${issues.filter((i) => i.includes("primary keyword")).length}**
- Description length / CTA issues: **${issues.filter((i) => !i.includes("primary keyword")).length}**

### Homepage copy budget

- Body copy in \`<main>\` at 1440px: **${budget.visible} words** (rendered text; excludes collapsed FAQ answers, aria-hidden decorative duplicates such as the marquee copies and phone mockup, and the demo-data ticker and dashboard, which are labelled data rather than copy)
- Words inside the eight FAQ accordion items (questions + collapsed answers): **${budget.faqWords}**
- Words in the demo service-record ticker (data labels): **${budget.ticker}**
- Per section: ${budget.sections.map((s) => `${s.id} ${s.words}`).join(" · ")}
- Section headlines (H2) and word counts: ${budget.headings.map((h) => `${h.text} (${h.words})`).join(" · ")}

${issues.length ? `### Open issues\n\n${issues.map((i) => `- ${i}`).join("\n")}\n` : "### Open issues\n\nNone.\n"}
## Per-URL detail

Legend: ✓ present · ✗ missing · – no lead image · ⚠ description does not end with a demo CTA.

| URL | Title | H1 | Primary keyword | Title | Desc | H1 | First 100 | H2 | Alt | OG | Desc len |
|---|---|---|---|---|---|---|---|---|---|---|---|
${table}
`;
fs.writeFileSync(path.join(root, "docs/SEO-REPORT.md"), md);
console.log(`Wrote docs/SEO-REPORT.md: ${rows.length} URLs, ${issues.length} issue(s). Homepage visible words: ${budget.visible}.`);
if (issues.length) console.log(issues.join("\n"));
