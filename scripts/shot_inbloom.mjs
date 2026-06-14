// Capture InBloom Therapy hero from the staging site.
import { chromium } from "playwright";
import path from "node:path";

const out = path.resolve("public/images/inbloom-cover.jpg");
const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1200, height: 800 },
  deviceScaleFactor: 2,
  ignoreHTTPSErrors: true,
});
const page = await ctx.newPage();

try {
  await page.goto("https://www.inbloomtherapy.com.au/home-new-staging", {
    waitUntil: "load",
    timeout: 45000,
  });
} catch (e) {
  console.log("WARN goto", e.message);
}
await page.waitForTimeout(5000);
await page.keyboard.press("Escape").catch(() => {});
await page
  .evaluate(() => {
    document
      .querySelectorAll(
        '[id*="cookie" i],[class*="cookie" i],[id*="consent" i],[class*="consent" i]',
      )
      .forEach((e) => e.style.setProperty("display", "none", "important"));
  })
  .catch(() => {});
await page.evaluate(() => window.scrollTo(0, 120));
await page.waitForTimeout(700);
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(1500);
await page.screenshot({ path: out, type: "jpeg", quality: 88 });
console.log("OK inbloom ->", page.url());
await browser.close();
console.log("DONE");
