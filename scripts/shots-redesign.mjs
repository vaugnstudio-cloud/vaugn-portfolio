// Review screenshots of the November 2026 redesign (local production build).
//   node scripts/shots-redesign.mjs <base> <outDir>
// Full pages are saved, plus viewport-height slices that are easy to review.
import { chromium } from "playwright";
import fs from "node:fs";

const BASE = process.argv[2] ?? "http://localhost:3111";
const OUT = process.argv[3] ?? "review-shots";
fs.mkdirSync(OUT, { recursive: true });

const ROUTES = [
  ["home", "/"],
  ["the-hill", "/work/the-hill"],
  ["medsync", "/work/medsync"],
  ["augellos", "/work/augellos"],
  ["ysc", "/work/your-socialchef"],
  ["work", "/work"],
  ["about", "/about"],
  ["contact", "/contact"],
];

const only = process.argv[4]?.split(",");
const browser = await chromium.launch();
for (const [vp, w, h] of [["d", 1440, 900], ["m", 390, 844]]) {
  const page = await browser.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: vp === "m" ? 2 : 1 });
  for (const [name, route] of ROUTES) {
    if (only && !only.includes(name)) continue;
    await page.goto(`${BASE}${route}`, { waitUntil: "networkidle" });
    await page.addStyleTag({ content: "html{scroll-behavior:auto!important}" });
    const total = await page.evaluate(() => document.body.scrollHeight);
    for (let y = 0; y < total; y += h * 0.7) {
      await page.evaluate((yy) => window.scrollTo(0, yy), y);
      await page.waitForTimeout(110);
    }
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(500);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    const slices = Math.ceil(total / h);
    for (let i = 0; i < slices; i++) {
      await page.evaluate((yy) => window.scrollTo(0, yy), i * h);
      await page.waitForTimeout(160);
      await page.screenshot({ path: `${OUT}/${name}-${vp}-${String(i + 1).padStart(2, "0")}.jpg`, type: "jpeg", quality: 72 });
    }
    console.log(name, vp, `height=${total}`, `slices=${slices}`, `hOverflow=${overflow}`);
  }
  await page.close();
}
await browser.close();
