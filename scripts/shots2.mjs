// Re-capture for sites with popups / scroll-reveal heroes.
import { chromium } from "playwright";
import path from "node:path";

const outDir = path.resolve("public/images");
const sites = [
  { file: "mekong-cover.jpg", url: "https://mekongmerchant.com.au/" },
  { file: "junk-cover.jpg", url: "https://junksunshinecoast.com.au/" },
  { file: "yassas-cover.jpg", url: "https://www.yassas.com.au/" },
];

const hideSel =
  '[id*="cookie" i],[class*="cookie" i],[id*="consent" i],[class*="consent" i]';

async function dismiss(page) {
  await page.keyboard.press("Escape").catch(() => {});
  await page.waitForTimeout(300);
  const texts = ["Close", "No thanks", "Got it", "Dismiss", "Maybe later"];
  for (const t of texts) {
    try {
      const el = page
        .getByRole("button", { name: new RegExp("^\\s*" + t + "\\s*$", "i") })
        .first();
      if (await el.isVisible({ timeout: 250 })) {
        await el.click({ timeout: 1000 });
        await page.waitForTimeout(500);
      }
    } catch {}
  }
  for (const sel of [
    '[aria-label*="close" i]',
    ".modal-close",
    ".popup-close",
    'button:has-text("×")',
    'button:has-text("✕")',
  ]) {
    try {
      const el = page.locator(sel).first();
      if (await el.isVisible({ timeout: 250 })) {
        await el.click({ timeout: 1000 });
        await page.waitForTimeout(500);
      }
    } catch {}
  }
  await page.keyboard.press("Escape").catch(() => {});
}

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1200, height: 800 },
  deviceScaleFactor: 2,
  ignoreHTTPSErrors: true,
});
const page = await ctx.newPage();

for (const s of sites) {
  try {
    await page.goto(s.url, { waitUntil: "load", timeout: 45000 });
  } catch (e) {
    console.log("WARN", s.url, e.message);
  }
  await page.waitForTimeout(3500);
  await dismiss(page);
  await page.evaluate(() => window.scrollTo(0, 140));
  await page.waitForTimeout(800);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(1800);
  await page
    .evaluate((sel) => {
      document
        .querySelectorAll(sel)
        .forEach((e) => e.style.setProperty("display", "none", "important"));
    }, hideSel)
    .catch(() => {});
  await page.waitForTimeout(300);
  await page.screenshot({
    path: path.join(outDir, s.file),
    type: "jpeg",
    quality: 88,
  });
  console.log("OK", s.file);
}

await browser.close();
console.log("DONE");
