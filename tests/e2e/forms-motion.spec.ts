import { expect, test } from "@playwright/test";
import { rejectConsentUpfront, stubGoogle } from "./helpers";

test("the demo form validates and submits to the lead API", async ({ page }) => {
  await stubGoogle(page);
  await rejectConsentUpfront(page);
  await page.goto("/demo");

  // Empty submit → field errors from the zod schema.
  await page.getByRole("button", { name: "Book my 15-min demo" }).click();
  await expect(page.getByText("Please check the highlighted fields.")).toBeVisible();

  await page.getByLabel("Your name").fill("Test Person");
  await page.getByLabel("Work email").fill("test@example-hotel.com");
  await page.getByLabel("Hotel or group").fill("Example Grand");
  await page.getByLabel("Your role").selectOption("General Manager");
  await page.getByLabel("Number of properties").selectOption("2–5");
  await page.getByLabel("Anything we should know?").fill("Playwright end-to-end test submission.");
  await page.waitForTimeout(1600); // minimum human fill time
  const lead = page.waitForResponse((r) => r.url().endsWith("/api/lead") && r.request().method() === "POST");
  await page.getByRole("button", { name: "Book my 15-min demo" }).click();
  expect((await lead).status()).toBe(200);
  await expect(page.getByTestId("demo-success")).toBeVisible();
});

test("every demo CTA goes to /demo, never mailto", async ({ page }) => {
  await stubGoogle(page);
  await rejectConsentUpfront(page);
  for (const path of ["/", "/platform", "/solutions", "/solutions/kitchen", "/contact"]) {
    await page.goto(path);
    const hrefs = await page.locator("a[data-track='demo_cta_click']").evaluateAll((els) => els.map((e) => e.getAttribute("href")));
    expect(hrefs.length, path).toBeGreaterThan(0);
    for (const h of hrefs) expect(h, path).toBe("/demo");
  }
});

test("nav Solutions opens the department mega-menu and links to /solutions", async ({ page }) => {
  await stubGoogle(page);
  await rejectConsentUpfront(page);
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const nav = page.getByRole("navigation", { name: "Primary" });
  await expect(nav.getByRole("link", { name: "Solutions", exact: true })).toHaveAttribute("href", "/solutions");
  await nav.getByRole("button", { name: /Show solutions/ }).click();
  const menu = page.locator("#solutions-menu");
  await expect(menu).toBeVisible();
  for (const label of ["Front office", "Housekeeping", "F&B service", "Kitchen", "Engineering & maintenance", "Security & safety", "Spa & wellness", "Hotel chains", "Boutique hotels"]) {
    await expect(menu.getByRole("link", { name: label, exact: true })).toBeVisible();
  }
});

test("the homepage is positioned as the service execution platform for every department", async ({ page }) => {
  await stubGoogle(page);
  await rejectConsentUpfront(page);
  await page.goto("/");
  await expect(page).toHaveTitle("Hotel Service Execution Platform (SEP) & Timed Task Tracking | Mise");
  await expect(page.locator("h1")).toContainText("service execution platform for hotels");
  const group = page.getByRole("group", { name: "Show the demo for a department" });
  for (const d of ["Front office", "Housekeeping", "F&B service", "Kitchen", "Engineering", "Security", "Spa"]) {
    await expect(group.getByRole("button", { name: d })).toBeVisible();
  }
});

test("the lead API rejects invalid payloads and swallows honeypot bots", async ({ request }) => {
  const bad = await request.post("/api/lead", { data: { type: "demo", email: "nope" } });
  expect(bad.status()).toBe(422);
  const bot = await request.post("/api/lead", {
    data: { type: "newsletter", email: "bot@example.com", company_website: "spam", elapsedMs: 5000 },
  });
  expect(bot.status()).toBe(200);
});

test.describe("reduced motion", () => {
  test.use({ reducedMotion: "reduce" });

  test("homepage renders without scroll-jacking or pinning", async ({ page }) => {
    await stubGoogle(page);
    await rejectConsentUpfront(page);
    await page.goto("/");
    await page.waitForTimeout(3500);
    const state = await page.evaluate(() => {
      const loop = document.querySelector("#how-it-works > div") as HTMLElement | null;
      return {
        lenis: Boolean((window as unknown as { __lenis?: unknown }).__lenis),
        loopHeight: loop?.getBoundingClientRect().height ?? 0,
        viewport: window.innerHeight,
        sticky: loop ? getComputedStyle(loop.firstElementChild as Element).position : "",
        canvas: document.querySelectorAll("canvas").length,
      };
    });
    expect(state.lenis).toBe(false);
    expect(state.sticky).not.toBe("sticky");
    expect(state.loopHeight).toBeLessThan(state.viewport * 3.5);
    // Scrolling must be native: one wheel tick moves the page immediately.
    await page.mouse.wheel(0, 600);
    await page.waitForTimeout(200);
    expect(await page.evaluate(() => window.scrollY)).toBeGreaterThan(300);
    expect(state.canvas).toBe(0);
  });
});

test("desktop with full motion pins the loop section", async ({ page }) => {
  await stubGoogle(page);
  await rejectConsentUpfront(page);
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  // The pinned layout is applied after hydration on capable desktops.
  await expect
    .poll(() => page.evaluate(() => (document.querySelector("#how-it-works > div") as HTMLElement).getBoundingClientRect().height))
    .toBeGreaterThan(900 * 3);
});
