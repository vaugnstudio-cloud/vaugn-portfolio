import { chromium } from "playwright";
import path from "node:path";

const suffix = process.argv[2] || "blue";
const tmp = process.env.TEMP || ".";
const browser = await chromium.launch();

const ctx = await browser.newContext({
  viewport: { width: 1280, height: 900 },
  deviceScaleFactor: 1,
  reducedMotion: "reduce",
});
const page = await ctx.newPage();
await page.goto("http://localhost:3000/", { waitUntil: "networkidle", timeout: 30000 });
await page.waitForTimeout(1500);
await page.screenshot({ path: path.join(tmp, `home_${suffix}.jpg`), type: "jpeg", quality: 80, fullPage: true });
console.log("desktop ok");
await ctx.close();

const m = await browser.newContext({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 1,
  reducedMotion: "reduce",
  userAgent:
    "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
});
const mp = await m.newPage();
await mp.goto("http://localhost:3000/", { waitUntil: "networkidle", timeout: 30000 });
await mp.waitForTimeout(1500);
await mp.screenshot({ path: path.join(tmp, `home_${suffix}_mobile.jpg`), type: "jpeg", quality: 80 });
console.log("mobile ok");

await browser.close();
console.log("DONE");
