import { test, expect, type Page } from "@playwright/test";
import { groups, selectQuestions, objectiveMet } from "../src/data/questions";
async function begin(page: Page, group: string) {
  await page.goto("/");
  await page.getByRole("button", { name: "Tetapan Guru" }).click();
  await page.getByLabel("Set soalan").selectOption("a");
  await page.getByRole("button", { name: "Tutup", exact: true }).click();
  await page.getByRole("button", { name: "MULA MISI", exact: true }).click();
  await page.getByRole("button", { name: new RegExp(group) }).click();
  await page.getByRole("button", { name: "MULAKAN PEMERIKSAAN" }).click();
}
for (const [n, g] of groups.entries())
  test(`Complete ${g.name}`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    await page.setViewportSize({ width: 1024, height: 768 });
    await begin(page, g.name);
    const qs = selectQuestions(g.name, "a");
    for (let i = 0; i < 5; i++) {
      if (n === 0 && i < 2) {
        await page
          .locator(".answer")
          .filter({ hasNotText: qs[i].answer })
          .first()
          .click();
        await expect(page.getByRole("status")).toContainText("Belum tepat");
      }
      await page.locator(".answer").filter({ hasText: qs[i].answer }).click();
      await expect(page.getByRole("status")).toContainText("Betul!");
      await page
        .getByRole("button", {
          name: i === 4 ? "SELESAIKAN MISI" : "SETERUSNYA",
        })
        .click();
    }
    await page.getByRole("button", { name: "MISI 2 · BINA AYAT" }).click();
    for (let i = 0; i < 5; i++) {
      if (n === 0 && i === 0) {
        for (let j = 0; j < 4; j++) {
          await page
            .getByRole("button", {
              name: qs[i].chunks[(j + 1) % 4],
              exact: true,
            })
            .click();
          await page.getByRole("button", { name: `Petak ${j + 1}:` }).click();
        }
        await page.getByRole("button", { name: "SEMAK AYAT" }).click();
        await expect(page.getByRole("status")).toContainText("Hampir betul");
        await page
          .getByRole("button", { name: "Susun semula", exact: true })
          .click();
      }
      for (let j = 0; j < 4; j++) {
        await page
          .getByRole("button", { name: qs[i].chunks[j], exact: true })
          .click();
        await page.getByRole("button", { name: `Petak ${j + 1}:` }).click();
      }
      await page.getByRole("button", { name: "SEMAK AYAT" }).click();
      await expect(page.getByRole("status")).toContainText(
        "Struktur ayat betul",
      );
      await page
        .getByRole("button", {
          name: i === 4 ? "SELESAIKAN MISI" : "SETERUSNYA",
        })
        .click();
    }
    await expect(page.locator(".score-grid")).toContainText("10 / 10");
    await expect(page.locator(".objective")).toContainText(
      n === 0 ? "USAHA YANG BAIK" : "OBJEKTIF MISI TERCAPAI",
    );
    await page.getByRole("button", { name: "MAIN SEMULA" }).click();
    await expect(page.getByText("Soalan 1 / 5")).toBeVisible();
    await page.getByRole("button", { name: "Tetapan Guru" }).click();
    await page
      .getByRole("button", { name: "Tetapkan semula ke skrin mula" })
      .click();
    await expect(
      page.getByRole("button", { name: "MULA MISI", exact: true }),
    ).toBeVisible();
    expect(errors).toEqual([]);
  });
test("Objective boundary", () => {
  expect(objectiveMet(4, 4)).toBe(true);
  expect(objectiveMet(3, 5)).toBe(false);
  expect(objectiveMet(5, 3)).toBe(false);
});
test("Touch, preferences, help and responsive views", async ({ browser }) => {
  const context = await browser.newContext({
    hasTouch: true,
    viewport: { width: 390, height: 844 },
  });
  const page = await context.newPage();
  await page.goto("/");
  await page.getByRole("button", { name: "CARA BERMAIN" }).tap();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.getByRole("button", { name: "SAYA FAHAM" }).tap();
  for (const size of [
    { width: 390, height: 844 },
    { width: 768, height: 1024 },
    { width: 1024, height: 768 },
    { width: 1440, height: 900 },
  ]) {
    await page.setViewportSize(size);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  }
  await page.screenshot({
    path: "test-results/start-desktop.png",
    fullPage: true,
  });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({
    path: "test-results/start-mobile.png",
    fullPage: true,
  });
  await begin(page, "Rasa");
  await page.getByRole("button", { name: "Tetapan Guru" }).tap();
  await page.getByLabel("Pemasa tanpa had masa").check();
  await page.getByLabel("Bunyi permainan").uncheck();
  await page.getByLabel("Petunjuk pembelajaran").uncheck();
  await page.getByRole("button", { name: "Tutup", exact: true }).tap();
  await expect(page.locator(".timer")).toBeVisible();
  await expect(page.getByText("Perlukan petunjuk?")).toHaveCount(0);
  await page.reload();
  await expect(
    page.getByRole("button", { name: "Hidupkan bunyi" }),
  ).toBeVisible();
  await context.close();
});
test("Touch sentence placement, hints and team switching", async ({
  browser,
}) => {
  const context = await browser.newContext({
    hasTouch: true,
    viewport: { width: 390, height: 844 },
  });
  const page = await context.newPage();
  await begin(page, "Bau");
  const qs = selectQuestions("Bau", "a");
  await page.getByRole("button", { name: "Perlukan petunjuk?" }).tap();
  await expect(page.locator(".hint")).toContainText("Gunakan deria bau");
  for (let i = 0; i < 5; i++) {
    await page.locator(".answer").filter({ hasText: qs[i].answer }).tap();
    await page
      .getByRole("button", { name: i === 4 ? "SELESAIKAN MISI" : "SETERUSNYA" })
      .tap();
  }
  await page.getByRole("button", { name: "MISI 2 · BINA AYAT" }).tap();
  await page.screenshot({
    path: "test-results/builder-mobile.png",
    fullPage: true,
  });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 4; j++) {
      await page
        .getByRole("button", { name: qs[i].chunks[j], exact: true })
        .tap();
      await page.getByRole("button", { name: `Petak ${j + 1}:` }).tap();
    }
    await page.getByRole("button", { name: "SEMAK AYAT" }).tap();
    await page
      .getByRole("button", { name: i === 4 ? "SELESAIKAN MISI" : "SETERUSNYA" })
      .tap();
  }
  await expect(page.locator(".score-grid")).toContainText("4 / 5");
  await expect(page.locator(".objective")).toContainText(
    "OBJEKTIF MISI TERCAPAI",
  );
  await page.getByRole("button", { name: "TUKAR PASUKAN" }).tap();
  await expect(
    page.getByRole("heading", { name: "Pilih Pasukan Anda" }),
  ).toBeVisible();
  await context.close();
});
