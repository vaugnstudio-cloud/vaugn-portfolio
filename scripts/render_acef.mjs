// Render the designed ACEF cover (HTML) to a 1200x800 image.
import { chromium } from "playwright";
import path from "node:path";
import { pathToFileURL } from "node:url";

const htmlPath = process.argv[2];
const out = path.resolve("public/images/acef-cover.jpg");

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1200, height: 800 },
  deviceScaleFactor: 2,
});
const page = await ctx.newPage();
await page.goto(pathToFileURL(htmlPath).href, { waitUntil: "networkidle" });
await page.waitForTimeout(900);
await page.screenshot({ path: out, type: "jpeg", quality: 92 });
console.log("OK acef ->", out);
await browser.close();
