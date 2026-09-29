import type { APIRequestContext, Page } from "@playwright/test";

/** All site routes, read from the built sitemap (drafts included on non-production builds). */
export async function sitemapPaths(request: APIRequestContext): Promise<string[]> {
  const xml = await (await request.get("/sitemap.xml")).text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
}

/** Google's tag cannot load in CI sandboxes; serve an inert stub so tests are deterministic. */
export async function stubGoogle(page: Page) {
  await page.route(/googletagmanager\.com|google-analytics\.com|analytics\.google\.com/, (route) =>
    route.fulfill({ status: 200, contentType: "application/javascript", body: "/* gtag stub */" }),
  );
}

export async function rejectConsentUpfront(page: Page) {
  await page.context().addCookies([{ name: "mise_consent", value: "a%3A0%7Cm%3A0", url: "http://localhost" }]);
}
