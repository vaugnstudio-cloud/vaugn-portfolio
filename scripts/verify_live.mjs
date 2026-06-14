// Screenshot the live production site to verify deployment.
import { chromium } from "playwright";
import path from "node:path";

const base = process.argv[2] || "https://vaugn-portfolio.vercel.app";
const tmp = process.env.TEMP || ".";
const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1280, height: 900 },
  deviceScaleFactor: 1,
  reducedMotion: "reduce",
});
const page = await ctx.newPage();

await page.goto(base + "/", { waitUntil: "networkidle", timeout: 45000 });
await page.waitForTimeout(1500);
await page.screenshot({ path: path.join(tmp, "live_home.jpg"), type: "jpeg", quality: 85 });
console.log("OK home", page.url());

await page.goto(base + "/work", { waitUntil: "networkidle", timeout: 45000 });
await page.waitForTimeout(2000);
await page.screenshot({ path: path.join(tmp, "live_work.jpg"), type: "jpeg", quality: 82, fullPage: true });
console.log("OK work");

await browser.close();
console.log("DONE");
