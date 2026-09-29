import { defineConfig, devices } from "@playwright/test";

const PORT = Number(process.env.PORT ?? 3100);
const chromePath = process.env.CHROME_PATH ?? (process.env.CI ? undefined : "/opt/pw-browsers/chromium");

export default defineConfig({
  testDir: "./tests/e2e",
  timeout: 60_000,
  fullyParallel: true,
  workers: process.env.CI ? 2 : 4,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL: `http://localhost:${PORT}`,
    trace: "retain-on-failure",
    launchOptions: chromePath ? { executablePath: chromePath } : {},
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"], launchOptions: chromePath ? { executablePath: chromePath } : {} } }],
  webServer: {
    command: `pnpm exec next start -p ${PORT}`,
    url: `http://localhost:${PORT}`,
    reuseExistingServer: true,
    timeout: 120_000,
    env: { LEAD_DRY_RUN: "1", LEAD_RATE_LIMIT: "500" },
  },
});
