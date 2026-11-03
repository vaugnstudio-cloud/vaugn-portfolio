// Fresh MedSync captures for the case page: desktop services grid and the
// mobile services cards, taken after lazy content has loaded.
//   node scripts/medsync-shots.mjs
import { chromium } from "playwright";

const URL = "https://medsyncmentalhealth.com/";
const OUT = "public/images/live";

const browser = await chromium.launch();

async function load(page, h) {
  await page.goto(URL, { waitUntil: "networkidle" });
  await page.addStyleTag({ content: "html{scroll-behavior:auto!important}" });
  const total = await page.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y < total; y += h * 0.6) {
    await page.evaluate((yy) => window.scrollTo(0, yy), y);
    await page.waitForTimeout(250);
  }
  await page.waitForTimeout(800);
}

async function shootAt(page, text, file, offset, h) {
  const y = await page.evaluate((t) => {
    // Framer nests text deeply, so match on visible text nodes instead of tags.
    const walk = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    while (walk.nextNode()) {
      const n = walk.currentNode;
      if (!n.textContent.trim().startsWith(t)) continue;
      const r = n.parentElement.getBoundingClientRect();
      if (r.width > 0 && r.height > 0) return r.top + window.scrollY;
    }
    return -1;
  }, text);
  if (y < 0) throw new Error(`not found: ${text}`);
  await page.evaluate((yy) => window.scrollTo(0, yy), Math.max(0, y - offset));
  await page.waitForTimeout(1200);
  await page.screenshot({ path: `${OUT}/${file}`, type: "jpeg", quality: 86, clip: { x: 0, y: 0, width: page.viewportSize().width, height: h } });
  console.log("saved", file);
}

const desk = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
await load(desk, 900);
await shootAt(desk, "Our Core services", "medsync-d-services.jpg", 150, 900);

const mob = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true });
await load(mob, 844);
await shootAt(mob, "Our Core services", "medsync-m-services.jpg", 190, 844);

await browser.close();
