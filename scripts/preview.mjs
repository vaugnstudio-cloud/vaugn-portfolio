// Screenshot the local site to preview the build with real covers.
import { chromium } from "playwright";
import path from "node:path";

const tmp = process.env.TEMP || ".";
const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1280, height: 900 },
  deviceScaleFactor: 1,
  reducedMotion: "reduce", // force scroll-reveal content visible for full-page capture
});
const page = await ctx.newPage();

await page.goto("http://localhost:3000/", { waitUntil: "networkidle", timeout: 30000 });
await page.waitForTimeout(1500);
await page.mouse.move(10, 10);
await page.screenshot({ path: path.join(tmp, "vp_home.jpg"), type: "jpeg", quality: 85 });
console.log("OK home");

await page.goto("http://localhost:3000/work", { waitUntil: "networkidle", timeout: 30000 });
await page.waitForTimeout(2000);
await page.screenshot({ path: path.join(tmp, "vp_work.jpg"), type: "jpeg", quality: 82, fullPage: true });
console.log("OK work");

await browser.close();
console.log("DONE " + tmp);
