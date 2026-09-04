// Review screenshots of the local production build (desktop + mobile).
//   node scripts/shots-review.mjs <base> <outDir>
import { chromium } from "playwright";
import fs from "node:fs";

const BASE = process.argv[2] ?? "http://localhost:3111";
const OUT = process.argv[3] ?? "review-shots";
fs.mkdirSync(OUT, { recursive: true });

const ROUTES = [
  ["home", "/"],
  ["work", "/work"],
  ["tnt", "/work/tacos-n-tequilas"],
  ["about", "/about"],
  ["contact", "/contact"],
];

const browser = await chromium.launch();
for (const [vp, w, h] of [["d", 1280, 800], ["m", 390, 844]]) {
  const page = await browser.newPage({ viewport: { width: w, height: h } });
  for (const [name, route] of ROUTES) {
    await page.goto(`${BASE}${route}`, { waitUntil: "networkidle" });
    // scroll through so lazy images + reveal observers fire, then back up
    // the site scrolls smoothly; make it instant so every reveal fires
    await page.addStyleTag({ content: "html{scroll-behavior:auto!important}" });
    const total = await page.evaluate(() => document.body.scrollHeight);
    for (let y = 0; y < total; y += h * 0.8) {
      await page.evaluate((yy) => window.scrollTo(0, yy), y);
      await page.waitForTimeout(120);
    }
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(600);
    await page.screenshot({ path: `${OUT}/${name}-${vp}.jpg`, fullPage: true, type: "jpeg", quality: 70 });
    console.log(name, vp, total);
  }
  await page.close();
}
await browser.close();
