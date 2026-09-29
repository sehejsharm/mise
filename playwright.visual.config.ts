import { defineConfig } from "@playwright/test";

const PORT = Number(process.env.PORT ?? 3100);
const chromePath = process.env.CHROME_PATH ?? (process.env.CI ? undefined : "/opt/pw-browsers/chromium");

/** Visual QA: screenshots of every page at 4 widths × 2 themes, overflow + axe checks. */
export default defineConfig({
  testDir: "./tests/visual",
  timeout: 15 * 60_000,
  fullyParallel: true,
  workers: 4,
  reporter: [["list"]],
  use: {
    baseURL: `http://localhost:${PORT}`,
    launchOptions: chromePath ? { executablePath: chromePath } : {},
  },
  webServer: {
    command: `pnpm exec next start -p ${PORT}`,
    url: `http://localhost:${PORT}`,
    reuseExistingServer: true,
    timeout: 120_000,
    env: { LEAD_DRY_RUN: "1" },
  },
});
