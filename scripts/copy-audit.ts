/**
 * Copy audit: keeps Mise positioned as the service execution platform (SEP) for
 * every hotel department, implementing the SOPs hotels already have.
 *
 *   node scripts/copy-audit.ts                     audit the local build (.next), after `pnpm build`
 *   node scripts/copy-audit.ts --base https://misehotel.com
 *                                                  audit the live site, every URL in its sitemap
 *
 * Fails (exit 1) when:
 *  1. "housekeeping" appears in a <title>, H1 or meta description anywhere other
 *     than /solutions/housekeeping and housekeeping blog posts;
 *  2. the homepage mentions housekeeping more often than any other single department;
 *  3. a demo CTA is a mailto: link. The only mailto links allowed are the plain
 *     contact address (no subject/body) on /demo, /contact and in the footer;
 *  4. retired vocabulary ("LMS", "course", "module", "learner", "training
 *     platform") appears outside the comparison content and "not an LMS" contexts;
 *  5. a confidential term or the retired domain appears in the HTML;
 *  6. Mise is named as SOP software ("SOP app", "SOP software", "SOP platform",
 *     "SOP management") in visible text, title, meta description or JSON-LD.
 *
 * Writes the per-URL counts table to docs/COPY-AUDIT.md (or --out <file>).
 * Runs with Node 22's built-in type stripping; no extra dependencies.
 */
import fs from "node:fs";
import path from "node:path";
import { parse, type HTMLElement } from "node-html-parser";

const args = process.argv.slice(2);
const arg = (name: string) => {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : undefined;
};
const base = arg("--base")?.replace(/\/$/, "");
const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const outFile = path.resolve(root, arg("--out") ?? "docs/COPY-AUDIT.md");

const DEPTS: [string, RegExp][] = [
  ["Front office", /\bfront (?:office|desk)\b/gi],
  ["Housekeeping", /\bhousekeeping\b/gi],
  ["F&B", /\bF&B\b|\bfood (?:and|&) beverage\b|\brestaurant\b/gi],
  ["Kitchen", /\bkitchen\b/gi],
  ["Engineering", /\bengineering\b|\bmaintenance\b/gi],
  ["Security", /\bsecurity\b|\bfire[- ]exit\b/gi],
  ["Spa", /\bspa\b/gi],
];
const HOUSEKEEPING_PAGES = [/^\/solutions\/housekeeping$/, /^\/blog\/[^/]*housekeeping[^/]*$/];
const VOCAB = [/\bLMS\b/, /\bcourses?\b/i, /\bmodules?\b/i, /\blearners?\b/i, /\btraining platforms?\b/i];
const VOCAB_ALLOWED_PHRASES = [/\bnot an LMS\b/gi, /\bnot a learning management system\b/gi];
const VOCAB_ALLOWED_PAGES = [/^\/compare\/mise-vs-hotel-lms$/, /^\/blog\/what-is-a-service-execution-platform$/];
const MAILTO_PAGES = ["/demo", "/contact"];
const rev = (s: string) => s.split("").reverse().join("");
const SOP_PRODUCT = /\bSOP (?:apps?|software|platforms?|management)\b/i;
const CONFIDENTIAL = [new RegExp(`\\b${rev("noigeL")}\\b`, "i"), new RegExp(`\\b${rev("CDT")}\\b`), new RegExp(["focus", "realm\\.com"].join("-"), "i")];

type Page = { url: string; html: string };

async function loadPages(): Promise<Page[]> {
  if (base) {
    const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();
    const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
    const pages: Page[] = [];
    for (const url of urls) {
      const res = await fetch(`${base}${url}`, { redirect: "follow" });
      pages.push({ url, html: res.ok ? await res.text() : `<!-- HTTP ${res.status} -->` });
    }
    return pages;
  }
  const appDir = path.join(root, ".next/server/app");
  if (!fs.existsSync(appDir)) {
    console.error("copy-audit: no build found. Run `pnpm build` first, or pass --base <url>.");
    process.exit(1);
  }
  const sitemap = fs.readFileSync(path.join(appDir, "sitemap.xml.body"), "utf8");
  const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
  return urls.map((url) => {
    const file = path.join(appDir, url === "/" ? "index.html" : `${url.slice(1)}.html`);
    return { url, html: fs.existsSync(file) ? fs.readFileSync(file, "utf8") : "" };
  });
}

function count(text: string, re: RegExp) {
  return (text.match(re) ?? []).length;
}

function visibleText(doc: HTMLElement) {
  const clone = parse(doc.toString());
  clone.querySelectorAll("script, style, noscript, template").forEach((n) => n.remove());
  return clone.querySelector("body")?.text ?? "";
}

const failures: string[] = [];
let sopTotal = 0;
const rows: string[] = [];

const pages = await loadPages();
for (const { url, html } of pages) {
  const doc = parse(html);
  const title = doc.querySelector("title")?.text ?? "";
  const h1 = doc.querySelector("h1")?.text ?? "";
  const desc = doc.querySelector('meta[name="description"]')?.getAttribute("content") ?? "";
  const text = visibleText(doc);
  const counts = DEPTS.map(([, re]) => count(text, re));
  const hk = counts[1];
  const problems: string[] = [];

  // 1. housekeeping in title / H1 / meta description.
  if (!HOUSEKEEPING_PAGES.some((re) => re.test(url))) {
    for (const [where, value] of [
      ["title", title],
      ["H1", h1],
      ["meta description", desc],
    ] as const) {
      if (/\bhousekeeping\b/i.test(value)) problems.push(`"housekeeping" in ${where}`);
    }
  }

  // 2. homepage balance.
  if (url === "/") {
    const others = Math.max(...counts.filter((_, i) => i !== 1));
    if (hk > others) problems.push(`homepage mentions housekeeping ${hk}× vs ${others}× for the most-mentioned other department`);
  }

  // 3. mailto demo CTAs.
  let mailtoCtas = 0;
  const footer = doc.querySelector("footer");
  for (const a of doc.querySelectorAll("a[href^='mailto:']")) {
    const href = a.getAttribute("href") ?? "";
    const plain = !href.includes("?");
    const inFooter = footer ? footer.querySelectorAll("a").includes(a) : false;
    const allowed = plain && (MAILTO_PAGES.includes(url) || inFooter);
    if (!allowed || /demo/i.test(a.text)) {
      mailtoCtas++;
      problems.push(`mailto link "${a.text.trim().slice(0, 40)}" → ${href.slice(0, 60)}`);
    }
  }
  const demoLinks = doc.querySelectorAll("a").filter((a) => /book (?:a |my )?15-min demo|book demo/i.test(a.text));
  for (const a of demoLinks) {
    const href = a.getAttribute("href") ?? "";
    if (href !== "/demo" && !href.endsWith("://misehotel.com/demo")) problems.push(`demo CTA "${a.text.trim()}" → ${href}`);
  }

  // 4. retired vocabulary.
  if (!VOCAB_ALLOWED_PAGES.some((re) => re.test(url))) {
    const clean = parse(html);
    clean.querySelectorAll("script, style, noscript, template, [data-copy-lint='allow']").forEach((n) => n.remove());
    let body = `${clean.querySelector("body")?.text ?? ""} ${title} ${desc}`;
    for (const re of VOCAB_ALLOWED_PHRASES) body = body.replace(re, "");
    for (const re of VOCAB) {
      const m = body.match(re);
      if (m) problems.push(`retired vocabulary "${m[0]}"`);
    }
  }

  // 5. confidential terms.
  const raw = html.replace(/data:[a-z/+.-]+;base64,[A-Za-z0-9+/=]+/g, "");
  if (CONFIDENTIAL.some((re) => re.test(raw))) problems.push("confidential term in HTML");

  // 6. SOP product naming. Mise is the service execution platform; it runs SOPs, it is not SOP software.
  const ld = doc.querySelectorAll('script[type="application/ld+json"]').map((n) => n.text).join(" ");
  const sopName = `${text} ${title} ${desc} ${ld}`.match(SOP_PRODUCT);
  if (sopName) problems.push(`SOP product naming "${sopName[0]}"`);
  const sops = count(text, /\bSOPs?\b/g);
  sopTotal += sops;

  if (!html) problems.push("page not found in build");
  problems.forEach((p) => failures.push(`${url}: ${p}`));
  rows.push(`| \`${url}\` | ${counts.join(" | ")} | ${sops} | ${mailtoCtas} | ${problems.length ? "FAIL" : "PASS"} |`);
}

const source = base ? `live site ${base} (sitemap URLs)` : "local production build (.next)";
const md = `# Copy audit

Generated by \`scripts/copy-audit.ts\` on ${new Date().toISOString().slice(0, 10)} against the ${source}.

**Result: ${failures.length ? `FAIL (${failures.length} problem${failures.length > 1 ? "s" : ""})` : "PASS"}** across ${pages.length} URLs.

Rules:
- "housekeeping" may appear in a title, H1 or meta description only on \`/solutions/housekeeping\` and housekeeping blog posts.
- The homepage may not mention housekeeping more often than any other single department.
- No demo CTA may be a \`mailto:\` link. Plain contact-address links are allowed only on \`/demo\`, \`/contact\` and in the footer.
- Mise is never named as SOP software: "SOP app", "SOP software", "SOP platform" and "SOP management" fail anywhere in visible text, titles, meta descriptions or JSON-LD. The "SOP" column counts remaining mentions of the word (the hotel's own SOPs and the ghost SOP concept).
- The existing bans stay: retired vocabulary outside the comparison content and "not an LMS" contexts, confidential terms and the retired domain.

Department and SOP mentions are counted in each page's visible text. Total SOP mentions across the site: ${sopTotal}.${failures.length ? `\n\n## Problems\n\n${failures.map((f) => `- ${f}`).join("\n")}` : ""}

| URL | ${DEPTS.map(([n]) => n).join(" | ")} | SOP | mailto CTAs | Result |
|---|${DEPTS.map(() => "---:").join("|")}|---:|---:|---|
${rows.join("\n")}
`;
fs.mkdirSync(path.dirname(outFile), { recursive: true });
fs.writeFileSync(outFile, md);
console.log(`${failures.length ? "✗" : "✓"} copy-audit: ${pages.length} URLs from the ${source}; ${failures.length} problem(s). Table → ${path.relative(root, outFile)}`);
failures.slice(0, 40).forEach((f) => console.log(`  - ${f}`));
if (failures.length) process.exit(1);
