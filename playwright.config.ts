import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  use: {
    baseURL: "http://127.0.0.1:4182",
    headless: true,
    channel: process.env.PLAYWRIGHT_CHANNEL || undefined,
  },
  webServer: {
    command: "npm run dev -- --port 4182 --strictPort",
    url: "http://127.0.0.1:4182",
    reuseExistingServer: !process.env.CI,
  },
  reporter: "list",
});
