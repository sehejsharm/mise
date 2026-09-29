/**
 * Visual QA. For every sitemap route, in dark and light themes:
 *  - full-page screenshots at 390, 768, 1440 and 1920 px → qa/screenshots/
 *  - horizontal overflow check at every width
 *  - axe-core WCAG 2.2 AA scan at 390 and 1440 px (includes colour contrast)
 * One test per route × theme; each writes qa/results/<theme>--<slug>.json.
 * Run `node scripts/qa/visual-summary.mjs` afterwards for the summary.
 * Routes are read from the built sitemap (.next), so run `pnpm build` first.
 */
import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";

const WIDTHS = [390, 768, 1440, 1920];
const THEMES = ["dark", "light"] as const;
const OUT = path.join(process.cwd(), "qa");
const sitemap = fs.readFileSync(path.join(process.cwd(), ".next/server/app/sitemap.xml.body"), "utf8");
const ROUTES = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);

async function settle(page: Page) {
  const h = await page.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y < h; y += 800) {
    await page.evaluate((yy) => window.scrollTo(0, yy), y);
    await page.waitForTimeout(30);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(200);
}

test.use({ reducedMotion: "reduce", deviceScaleFactor: 1 });

for (const theme of THEMES) {
  for (const route of ROUTES) {
    const slug = route === "/" ? "home" : route.slice(1).replace(/\//g, "--");
    test(`${theme} ${route}`, async ({ page }) => {
      await page.addInitScript((t) => {
        try {
          localStorage.setItem("mise-theme", t);
        } catch {}
      }, theme);
      await page.context().addCookies([{ name: "mise_consent", value: "a%3A0%7Cm%3A0", url: "http://localhost" }]);
      await page.route(/googletagmanager|google-analytics/, (r) => r.abort());

      const results: Record<string, unknown>[] = [];
      for (const width of WIDTHS) {
        await page.setViewportSize({ width, height: 900 });
        await page.goto(route, { waitUntil: "load" });
        await settle(page);
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
        const dir = path.join(OUT, "screenshots", theme, String(width));
        fs.mkdirSync(dir, { recursive: true });
        await page.screenshot({ path: path.join(dir, `${slug}.png`), fullPage: true });
        const r: Record<string, unknown> = { path: route, theme, width, overflow };
        if (width === 390 || width === 1440) {
          const axe = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"]).analyze();
          r.axe = axe.violations.map((v) => ({
            id: v.id,
            impact: v.impact ?? "unknown",
            nodes: v.nodes.length,
            help: v.help,
            samples: v.nodes.slice(0, 3).map((n) => `${n.target.join(" ")} :: ${n.failureSummary?.split("\n")[1]?.trim() ?? ""}`),
          }));
        }
        results.push(r);
      }
      fs.mkdirSync(path.join(OUT, "results"), { recursive: true });
      fs.writeFileSync(path.join(OUT, "results", `${theme}--${slug}.json`), JSON.stringify(results, null, 2));

      const overflowing = results.filter((r) => (r.overflow as number) > 1).map((r) => `@${r.width}: +${r.overflow}px`);
      const serious = results.flatMap((r) =>
        ((r.axe as { id: string; impact: string; nodes: number; samples: string[] }[]) ?? [])
          .filter((v) => v.impact === "serious" || v.impact === "critical")
          .map((v) => `@${r.width}: ${v.id} (${v.nodes}) ${v.samples[0]}`),
      );
      expect(overflowing, `Horizontal overflow on ${route}`).toEqual([]);
      expect(serious, `Accessibility violations on ${route}`).toEqual([]);
    });
  }
}
