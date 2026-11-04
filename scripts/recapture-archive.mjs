// Clean recaptures for archive screenshots flagged in the 4 Nov QA:
// Mekong menu tiles loaded, Denial Defense library without the welcome
// modal, SOP Quest mobile without onboarding toasts, Éclat mobile gallery
// showing the actual before/after sliders.
//   node scripts/recapture-archive.mjs [outDir]   (default public/images)
import { chromium } from "playwright";
import fs from "node:fs";

const OUT = process.argv[2] ?? "public/images";
fs.mkdirSync(`${OUT}/live`, { recursive: true });
fs.mkdirSync(`${OUT}/products`, { recursive: true });

const DESKTOP = { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 };
const MOBILE = { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true };
const browser = await chromium.launch();

async function settle(page, h) {
  await page.addStyleTag({ content: "html{scroll-behavior:auto!important}" });
  const total = await page.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y < total; y += h * 0.5) {
    await page.evaluate((yy) => window.scrollTo(0, yy), y);
    await page.waitForTimeout(350);
  }
  await page.waitForLoadState("networkidle").catch(() => {});
  await page.waitForTimeout(1200);
}

// Scroll so the element holding `text` sits `offset` px below the top.
async function scrollToText(page, text, offset) {
  const y = await page.evaluate((t) => {
    const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    while (w.nextNode()) {
      if (w.currentNode.textContent.includes(t)) {
        const r = w.currentNode.parentElement.getBoundingClientRect();
        if (r.height > 0) return r.top + window.scrollY;
      }
    }
    return -1;
  }, text);
  if (y < 0) throw new Error(`text not found: ${text}`);
  await page.evaluate((yy) => window.scrollTo(0, yy), Math.max(0, y - offset));
  await page.waitForTimeout(1500);
}

const shot = (page, file) => page.screenshot({ path: `${OUT}/${file}`, type: "jpeg", quality: 86 });

// Mekong: desktop menu with every tile image loaded
try {
  const ctx = await browser.newContext(DESKTOP);
  const page = await ctx.newPage();
  await page.goto("https://mekongmerchant.com.au/", { waitUntil: "networkidle", timeout: 60000 });
  await page.keyboard.press("Escape").catch(() => {});
  await settle(page, 900);
  await scrollToText(page, "Banh Mi", 260);
  await page.waitForFunction(() => [...document.images].filter((i) => { const r = i.getBoundingClientRect(); return r.top < innerHeight && r.bottom > 0; }).every((i) => i.complete && i.naturalWidth > 0), null, { timeout: 15000 }).catch(() => console.log("mekong: some tile images still loading"));
  await shot(page, "live/mekong-d-mid.jpg");
  console.log("mekong ok");
  await ctx.close();
} catch (e) { console.log("mekong FAILED", String(e).slice(0, 140)); }

// Denial Defense: library view, welcome modal skipped
try {
  const ctx = await browser.newContext(DESKTOP);
  const page = await ctx.newPage();
  await page.goto("https://denial-defense-demo.netlify.app", { waitUntil: "networkidle", timeout: 60000 });
  const skip = page.getByText("Skip for now");
  if (await skip.count()) await skip.first().click();
  await page.waitForTimeout(800);
  const lib = page.getByText("Denial Defense", { exact: false }).filter({ hasText: "Fighting" });
  if (await lib.count()) await lib.first().click();
  await page.waitForTimeout(1500);
  const modal = await page.getByText("Welcome to the Denial Defense System").count();
  await shot(page, "products/dd-demo-sops.png".replace(".png", ".jpg"));
  console.log("denial defense ok, modal still present:", modal > 0 && (await page.getByText("Welcome to the Denial Defense System").first().isVisible()));
  await ctx.close();
} catch (e) { console.log("denial defense FAILED", String(e).slice(0, 140)); }

// SOP Quest: mobile, onboarding toasts hidden
try {
  const ctx = await browser.newContext(MOBILE);
  const page = await ctx.newPage();
  await page.goto("https://the-system-vaugn.netlify.app", { waitUntil: "load", timeout: 60000 });
  await page.waitForTimeout(2000);
  // Load the built in sample quest so the board shows real structure.
  const sample = page.getByText(/sample quest/i);
  if (await sample.count()) await sample.first().click();
  await page.waitForTimeout(2600);
  const hideToasts = () => page.evaluate(() => {
    document.querySelectorAll("body *").forEach((el) => {
      const s = getComputedStyle(el);
      if ((s.position === "fixed" || s.position === "absolute") && /Welcome,|safely stashed|try the sample/i.test(el.textContent) && el.textContent.length < 200) el.style.display = "none";
    });
  });
  await hideToasts();
  await shot(page, "products/sop-quest-m-hero.jpg");
  await page.evaluate(() => window.scrollTo(0, innerHeight * 1.4));
  await page.waitForTimeout(1200);
  await hideToasts();
  await shot(page, "products/sop-quest-m-mid.jpg");
  console.log("sop quest ok");
  await ctx.close();
} catch (e) { console.log("sop quest FAILED", String(e).slice(0, 140)); }

// Éclat: mobile results page, scrolled to the first before/after slider
try {
  const ctx = await browser.newContext(MOBILE);
  const page = await ctx.newPage();
  await page.goto("https://eclat-dental-kit-demo.netlify.app/results.html", { waitUntil: "networkidle", timeout: 60000 });
  await settle(page, 844);
  await scrollToText(page, "All results", 30);
  await shot(page, "products/eclat-m-mid.jpg");
  console.log("eclat ok");
  await ctx.close();
} catch (e) { console.log("eclat FAILED", String(e).slice(0, 140)); }

await browser.close();
