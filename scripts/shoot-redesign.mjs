// Temp verification script — full-page screenshots of the 2026 redesign.
import { chromium } from "playwright";

const OUT = process.argv[2] ?? "./screenshots";
const BASE = "http://localhost:3000";
const ROUTES = [
  ["home", "/"],
  ["work", "/work"],
  ["case-junk", "/work/junk-sunshine-coast"],
  ["case-socialchef", "/work/your-socialchef"],
  ["project-mekong", "/work/mekong-merchant"],
  ["resources", "/resources"],
];

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1280, height: 800 },
  reducedMotion: "reduce", // reveal animations render instantly for capture
});

for (const [name, route] of ROUTES) {
  await page.goto(`${BASE}${route}`, { waitUntil: "networkidle" });
  await page.waitForTimeout(400);
  await page.screenshot({ path: `${OUT}/${name}.png`, fullPage: true });
  console.log(`captured ${name}`);
}

// Light theme captures
await page.emulateMedia({ colorScheme: "light" });
await page.addInitScript(() => localStorage.setItem("theme", "light"));
for (const [name, route] of [["home-light", "/"], ["work-light", "/work"]]) {
  await page.goto(`${BASE}${route}`, { waitUntil: "networkidle" });
  await page.waitForTimeout(400);
  await page.screenshot({ path: `${OUT}/${name}.png`, fullPage: true });
  console.log(`captured ${name}`);
}

// Mobile spot-check (light stays from init script? clear it)
await page.addInitScript(() => localStorage.removeItem("theme"));
await page.setViewportSize({ width: 375, height: 812 });
await page.goto(`${BASE}/work/junk-sunshine-coast`, { waitUntil: "networkidle" });
await page.waitForTimeout(400);
await page.screenshot({ path: `${OUT}/case-junk-mobile.png`, fullPage: true });
console.log("captured case-junk-mobile");

await browser.close();
