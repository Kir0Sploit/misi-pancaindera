import { test, expect } from "@playwright/test";
test("Music lifecycle, mute and independent music control", async ({
  page,
}) => {
  await page.addInitScript(() => {
    const Native = window.AudioContext;
    const probe = {
      contexts: [] as AudioContext[],
      gains: [] as GainNode[],
      notes: 0,
    };
    Object.assign(window, { audioProbe: probe });
    window.AudioContext = class extends Native {
      constructor(options?: AudioContextOptions) {
        super(options);
        probe.contexts.push(this);
      }
      createGain() {
        const node = super.createGain();
        probe.gains.push(node);
        return node;
      }
      createOscillator() {
        probe.notes++;
        return super.createOscillator();
      }
    };
  });
  await page.goto("./");
  expect(
    await page.evaluate(() => (window as any).audioProbe.contexts.length),
  ).toBe(0);
  await page.getByRole("button", { name: "CARA BERMAIN" }).click();
  await expect
    .poll(() => page.evaluate(() => (window as any).audioProbe.notes))
    .toBeGreaterThan(3);
  // Keep both buses rendering silence so AudioParam.value is observable even
  // after the last effect ends (browsers skip processing idle audio nodes).
  await page.evaluate(() => {
    const p = (window as any).audioProbe;
    const source = p.contexts[0].createConstantSource();
    source.offset.value = 0;
    source.connect(p.gains[0]);
    source.connect(p.gains[1]);
    source.start();
  });
  await page.getByRole("button", { name: "SAYA FAHAM" }).click();
  await page.getByRole("button", { name: "Matikan muzik latar" }).click();
  await expect
    .poll(() =>
      page.evaluate(() => (window as any).audioProbe.gains[0].gain.value),
    )
    .toBeLessThan(0.001);
  expect(
    await page.evaluate(() => (window as any).audioProbe.gains[1].gain.value),
  ).toBeGreaterThan(0.1);
  await page.getByRole("button", { name: "Hidupkan muzik latar" }).click();
  await expect
    .poll(() =>
      page.evaluate(() => (window as any).audioProbe.gains[0].gain.value),
    )
    .toBeGreaterThan(0.1);
  await page
    .getByRole("button", { name: "Matikan bunyi", exact: true })
    .click();
  await expect
    .poll(() =>
      page.evaluate(() =>
        (window as any).audioProbe.gains
          .slice(0, 2)
          .every((g: GainNode) => g.gain.value < 0.001),
      ),
    )
    .toBe(true);
  await page
    .getByRole("button", { name: "Hidupkan bunyi", exact: true })
    .click();
  await page.evaluate(() => {
    Object.defineProperty(document, "hidden", {
      configurable: true,
      get: () => true,
    });
    document.dispatchEvent(new Event("visibilitychange"));
  });
  await expect
    .poll(() =>
      page.evaluate(() => (window as any).audioProbe.contexts[0].state),
    )
    .toBe("suspended");
  await page.evaluate(() => {
    Object.defineProperty(document, "hidden", {
      configurable: true,
      get: () => false,
    });
    document.dispatchEvent(new Event("visibilitychange"));
  });
  await expect
    .poll(() =>
      page.evaluate(() => (window as any).audioProbe.contexts[0].state),
    )
    .toBe("running");
  await page.getByRole("button", { name: "Matikan muzik latar" }).click();
  await page.reload();
  await expect(
    page.getByRole("button", { name: "Hidupkan muzik latar" }),
  ).toBeVisible();
  expect(
    await page.evaluate(() => (window as any).audioProbe.contexts.length),
  ).toBe(0);
});
test("Animated lobby at desktop, iPad and phone sizes", async ({ page }) => {
  await page.goto("./");
  for (const [name, width, height] of [
    ["desktop", 1440, 900],
    ["ipad", 1024, 768],
    ["phone", 390, 844],
  ] as const) {
    await page.setViewportSize({ width, height });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await expect(
      page.getByRole("button", { name: "MULA MISI", exact: true }),
    ).toBeInViewport();
    await page.screenshot({
      path: `test-results/lobby-${name}.png`,
      fullPage: true,
    });
  }
  await page.getByRole("button", { name: "Jeda animasi" }).click();
  await expect(page.locator(".airport-plane")).toHaveCSS(
    "animation-play-state",
    "paused",
  );
  await page.getByRole("button", { name: "Sambung animasi" }).click();
  await expect(page.locator(".airport-plane")).toHaveCSS(
    "animation-play-state",
    "running",
  );
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator(".airport-plane")).toHaveCSS(
    "animation-name",
    "none",
  );
});
