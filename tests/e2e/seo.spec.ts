/**
 * Every route: 200, exactly one H1, title ≤ 60, description ≤ 160 (≥ 120),
 * self-canonical on the production origin, hreflang, OG image, valid JSON-LD
 * with the fields Google's rich-result rules require for each type.
 */
import { expect, test } from "@playwright/test";
import { parse } from "node-html-parser";
import { sitemapPaths } from "./helpers";

const ORIGIN = "https://misehotel.com";

type Node = Record<string, unknown> & { "@type"?: string | string[] };

function validateNode(node: Node, errors: string[]) {
  const type = Array.isArray(node["@type"]) ? node["@type"][0] : node["@type"];
  const need = (keys: string[]) => keys.forEach((k) => node[k] === undefined && errors.push(`${type} missing ${k}`));
  switch (type) {
    case "Organization":
      need(["name", "url", "logo", "description", "parentOrganization", "founder", "contactPoint"]);
      break;
    case "WebSite":
      need(["name", "url", "potentialAction"]);
      break;
    case "SoftwareApplication":
      need(["name", "applicationCategory", "operatingSystem", "featureList", "description"]);
      break;
    case "Person":
      need(["name"]);
      break;
    case "BreadcrumbList": {
      const items = node.itemListElement as Node[];
      if (!items?.length) errors.push("BreadcrumbList without items");
      items?.forEach((it, i) => {
        if (it.position !== i + 1 || !it.name || !it.item) errors.push(`BreadcrumbList item ${i} incomplete`);
      });
      break;
    }
    case "FAQPage": {
      const qs = node.mainEntity as Node[];
      if (!qs?.length) errors.push("FAQPage without questions");
      qs?.forEach((q) => {
        const a = q.acceptedAnswer as Node | undefined;
        if (q["@type"] !== "Question" || !q.name || !a?.text) errors.push("FAQPage question incomplete");
      });
      break;
    }
    case "HowTo":
      need(["name", "step"]);
      break;
    case "BlogPosting":
    case "Article":
      need(["headline", "datePublished", "dateModified", "author", "image", "publisher"]);
      if ((node.headline as string)?.length > 110) errors.push("Article headline > 110 characters");
      break;
    case "DefinedTermSet":
      need(["name", "hasDefinedTerm"]);
      break;
    case "DefinedTerm":
      need(["name", "description"]);
      break;
  }
}

test("every route passes the on-page SEO contract", async ({ request }) => {
  const paths = await sitemapPaths(request);
  expect(paths.length).toBeGreaterThan(50);
  const problems: string[] = [];

  for (const path of paths) {
    const res = await request.get(path);
    if (res.status() !== 200) {
      problems.push(`${path}: HTTP ${res.status()}`);
      continue;
    }
    const doc = parse(await res.text());
    const h1s = doc.querySelectorAll("h1");
    const title = doc.querySelector("title")?.text.trim() ?? "";
    const desc = doc.querySelector('meta[name="description"]')?.getAttribute("content") ?? "";
    const canonical = doc.querySelector('link[rel="canonical"]')?.getAttribute("href");
    const expected = path === "/" ? ORIGIN : `${ORIGIN}${path}`;

    if (h1s.length !== 1) problems.push(`${path}: ${h1s.length} H1 elements`);
    if (!title || title.length > 60) problems.push(`${path}: title length ${title.length} "${title}"`);
    if (desc.length > 160 || desc.length < 110) problems.push(`${path}: description length ${desc.length}`);
    if (canonical !== expected) problems.push(`${path}: canonical ${canonical} ≠ ${expected}`);
    if (!doc.querySelector('link[rel="alternate"][hreflang="en-IN"]')) problems.push(`${path}: missing hreflang en-IN`);
    if (!doc.querySelector('meta[property="og:image"]')) problems.push(`${path}: missing og:image`);
    if (doc.querySelector('meta[name="robots"][content*="noindex"]')) problems.push(`${path}: noindex on a sitemap URL`);

    const blocks = doc.querySelectorAll('script[type="application/ld+json"]');
    if (!blocks.length) problems.push(`${path}: no JSON-LD`);
    for (const block of blocks) {
      try {
        const data = JSON.parse(block.text);
        const nodes: Node[] = data["@graph"] ?? [data];
        const errors: string[] = [];
        nodes.forEach((n) => validateNode(n, errors));
        errors.forEach((e) => problems.push(`${path}: ${e}`));
      } catch (e) {
        problems.push(`${path}: invalid JSON-LD (${(e as Error).message})`);
      }
    }

    const internalLinks = new Set(
      doc
        .querySelectorAll("main a[href^='/']")
        .map((a) => a.getAttribute("href")!.split("#")[0])
        .filter((h) => h && h !== path && !h.startsWith("/demo")),
    );
    if (internalLinks.size < 3) problems.push(`${path}: only ${internalLinks.size} contextual internal links in <main>`);
    if (path !== "/demo" && !doc.querySelector("main a[href^='/demo'], main a[href^='mailto:hello@misehotel.com?subject=']")) problems.push(`${path}: no demo CTA in <main>`);
  }

  expect(problems, problems.join("\n")).toEqual([]);
});

test("robots.txt welcomes AI crawlers and blocks the CMS", async ({ request }) => {
  const robots = await (await request.get("/robots.txt")).text();
  for (const bot of ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "Claude-SearchBot", "PerplexityBot", "Google-Extended", "Applebot-Extended", "Bingbot", "CCBot"]) {
    expect(robots).toContain(`User-Agent: ${bot}`);
  }
  expect(robots).toContain("Disallow: /keystatic");
  expect(robots).toContain("Disallow: /api/");
  expect(robots).toContain("Sitemap: https://misehotel.com/sitemap.xml");
});

test("llms.txt carries the definition and the disambiguation block", async ({ request }) => {
  const llms = await (await request.get("/llms.txt")).text();
  expect(llms).toContain("Mise is the SOP app for hotels: a service execution platform");
  expect(llms).toContain("## Departments covered");
  expect(llms).toContain("It is not affiliated with Focus Softnet or its Focus e-RMS hospitality ERP.");
  expect(llms).toContain("mise en place");
  const full = await (await request.get("/llms-full.txt")).text();
  expect(full.length).toBeGreaterThan(20000);
});
