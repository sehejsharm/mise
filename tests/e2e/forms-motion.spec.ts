import { expect, test } from "@playwright/test";
import { rejectConsentUpfront, stubGoogle } from "./helpers";

test("the demo form validates and submits", async ({ page }) => {
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
  await page.getByRole("button", { name: "Book my 15-min demo" }).click();
  await expect(page.getByTestId("demo-success")).toBeVisible();
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
