import { chromium } from "playwright";
import path from "node:path";

const tmp = process.env.TEMP || ".";
const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1280, height: 900 },
  deviceScaleFactor: 1,
  reducedMotion: "reduce",
});
const page = await ctx.newPage();
for (const [route, file] of [
  ["/work", "pg_work.jpg"],
  ["/about", "pg_about.jpg"],
  ["/contact", "pg_contact.jpg"],
]) {
  await page.goto("http://localhost:3000" + route, { waitUntil: "networkidle", timeout: 30000 });
  await page.waitForTimeout(1200);
  await page.screenshot({ path: path.join(tmp, file), type: "jpeg", quality: 78, fullPage: true });
  console.log("ok", route);
}
await browser.close();
console.log("DONE");
