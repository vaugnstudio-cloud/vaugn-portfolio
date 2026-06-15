// Scroll-capture the Agero reference to study its full section rhythm + spacing.
import { chromium } from "playwright";
import path from "node:path";

const tmp = process.env.TEMP || ".";
const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1280, height: 900 },
  deviceScaleFactor: 1,
  userAgent:
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36",
  ignoreHTTPSErrors: true,
});
const page = await ctx.newPage();
try {
  await page.goto("https://portfoliov1.framer.ai/", { waitUntil: "networkidle", timeout: 45000 });
} catch (e) {
  console.log("WARN", e.message);
}
await page.waitForTimeout(3500);

const total = await page.evaluate(() => document.body.scrollHeight);
console.log("scrollHeight", total);

let y = 0;
const step = 760;
let i = 1;
while (y < total + 200 && i <= 9) {
  await page.evaluate((yy) => window.scrollTo({ top: yy, behavior: "instant" }), y);
  await page.waitForTimeout(1100); // let scroll-reveal animations finish
  await page.screenshot({ path: path.join(tmp, `ag_${i}.jpg`), type: "jpeg", quality: 78 });
  console.log("shot", i, "@", y);
  y += step;
  i++;
}
await browser.close();
console.log("DONE");
