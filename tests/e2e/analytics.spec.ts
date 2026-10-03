/**
 * GA4: the tag appears exactly once per page, Consent Mode v2 defaults to
 * denied before gtag.js, and nothing is configured or tracked until the
 * visitor accepts.
 */
import { expect, test } from "@playwright/test";
import { stubGoogle } from "./helpers";

type Cmd = unknown[];
const dataLayer = (page: import("@playwright/test").Page) =>
  page.evaluate(() => ((window as unknown as { dataLayer?: unknown[] }).dataLayer ?? []).map((a) => Array.from(a as ArrayLike<unknown>)));

for (const path of ["/", "/platform", "/demo", "/blog"]) {
  test(`GA4 tag appears exactly once on ${path}`, async ({ page }) => {
    await stubGoogle(page);
    await page.goto(path);
    await page.waitForLoadState("load");
    await expect(page.locator('script[src*="googletagmanager.com/gtag/js?id=G-KVTTR7P7BY"]')).toHaveCount(1);
  });
}

test("analytics only fires after consent", async ({ page }) => {
  const hits: string[] = [];
  page.on("request", (r) => {
    if (/google-analytics\.com\/g\/collect|analytics\.google\.com\/g\/collect/.test(r.url())) hits.push(r.url());
  });
  await stubGoogle(page);
  await page.goto("/");
  await page.waitForLoadState("load");

  let dl = (await dataLayer(page)) as Cmd[];
  const defaults = dl.find((c) => c[0] === "consent" && c[1] === "default") as [string, string, Record<string, string>];
  expect(defaults, "consent default must be set").toBeTruthy();
  expect(defaults[2]).toMatchObject({ ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied", analytics_storage: "denied" });
  expect(dl.some((c) => c[0] === "config")).toBe(false);

  // Click a tracked CTA before consent: must not produce an event.
  await page.locator('a[data-track-location="hero"]').first().dispatchEvent("click");
  dl = (await dataLayer(page)) as Cmd[];
  expect(dl.some((c) => c[0] === "event")).toBe(false);
  expect(hits).toEqual([]);

  await page.goto("/");
  await page.getByRole("region", { name: "Cookie consent" }).getByRole("button", { name: "Accept" }).click();
  dl = (await dataLayer(page)) as Cmd[];
  expect(dl.some((c) => c[0] === "consent" && c[1] === "update" && (c[2] as Record<string, string>).analytics_storage === "granted")).toBe(true);
  expect(dl.some((c) => c[0] === "config" && c[1] === "G-KVTTR7P7BY")).toBe(true);

  await page.locator('a[data-track-location="hero"]').first().dispatchEvent("click");
  dl = (await dataLayer(page)) as Cmd[];
  expect(dl.some((c) => c[0] === "event" && c[1] === "demo_cta_click")).toBe(true);
});

test("a returning visitor who accepted is configured on load", async ({ page, context }) => {
  await context.addCookies([{ name: "mise_consent", value: "a%3A1%7Cm%3A0", url: "http://localhost" }]);
  await stubGoogle(page);
  await page.goto("/platform");
  const dl = (await dataLayer(page)) as Cmd[];
  expect(dl.some((c) => c[0] === "config")).toBe(true);
  await expect(page.getByRole("region", { name: "Cookie consent" })).toHaveCount(0);
});
