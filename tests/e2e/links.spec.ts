/** No broken internal links anywhere on the site. */
import { expect, test } from "@playwright/test";
import { parse } from "node-html-parser";
import { sitemapPaths } from "./helpers";

test("every internal link resolves", async ({ request }) => {
  test.setTimeout(180_000);
  const pages = await sitemapPaths(request);
  const targets = new Map<string, string>();
  for (const path of pages) {
    const doc = parse(await (await request.get(path)).text());
    for (const a of doc.querySelectorAll("a[href^='/']")) {
      const href = a.getAttribute("href")!.split("#")[0].split("?")[0];
      if (href && !targets.has(href)) targets.set(href, path);
    }
  }
  const broken: string[] = [];
  for (const [href, from] of targets) {
    const res = await request.get(href, { maxRedirects: 3 });
    if (res.status() >= 400) broken.push(`${href} (linked from ${from}) → ${res.status()}`);
  }
  expect(broken, broken.join("\n")).toEqual([]);
});

test("the retired /author/platform screenshot is never served", async ({ request }) => {
  const html = await (await request.get("/platform")).text();
  expect(html).not.toMatch(/pilot-foundation/);
});
