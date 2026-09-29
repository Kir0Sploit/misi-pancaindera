import { defineConfig } from "@playwright/test";
const liveURL = process.env.TEST_URL;
export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  workers: 2,
  use: {
    baseURL: liveURL
      ? `${liveURL.replace(/\/$/, "")}/`
      : "http://127.0.0.1:4182/",
    headless: true,
    channel: process.env.PLAYWRIGHT_CHANNEL || undefined,
  },
  webServer: liveURL
    ? undefined
    : {
        command: "npm run dev -- --port 4182 --strictPort",
        url: "http://127.0.0.1:4182/",
        reuseExistingServer: !process.env.CI,
      },
  reporter: "list",
});
