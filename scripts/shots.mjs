// Local hero-screenshot capture for project covers.
// Run: node scripts/shots.mjs   (Playwright is a devDependency)
import { chromium } from "playwright";
import path from "node:path";

const outDir = path.resolve("public/images");

const sites = [
  { file: "medsync-cover.jpg", url: "https://medsyncmentalhealth.com/" },
  { file: "ysc-cover.jpg", url: "https://yoursocialchef.com/" },
  { file: "mekong-cover.jpg", url: "https://mekongmerchant.com.au/" },
  { file: "junk-cover.jpg", url: "https://junksunshinecoast.com.au/" },
  { file: "yassas-cover.jpg", url: "https://www.yassas.com.au/" },
  { file: "feedme-cover.jpg", url: "https://feedmegroup.com.au/" },
  { file: "plumb-cover.jpg", url: "https://plumbyourway.com.au/" },
];

const hideBanners = () => {
  const sel =
    '[id*="cookie" i],[class*="cookie" i],[id*="consent" i],[class*="consent" i],[id*="gdpr" i],[class*="gdpr" i],#onetrust-banner-sdk,.cky-consent-container,.termly-banner,[aria-label*="cookie" i]';
  document.querySelectorAll(sel).forEach((el) => {
    try {
      el.style.setProperty("display", "none", "important");
    } catch {}
  });
};

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1200, height: 800 },
  deviceScaleFactor: 2,
  ignoreHTTPSErrors: true,
});
const page = await ctx.newPage();

for (const s of sites) {
  try {
    await page.goto(s.url, { waitUntil: "load", timeout: 45000 });
  } catch (e) {
    console.log(`WARN goto ${s.url}: ${e.message}`);
  }
  await page.waitForTimeout(5000); // let Framer / scroll-reveal animations settle
  await page.evaluate(hideBanners).catch(() => {});
  await page.waitForTimeout(400);
  const out = path.join(outDir, s.file);
  await page.screenshot({ path: out, type: "jpeg", quality: 88 });
  console.log(`OK ${s.file}`);
}

await browser.close();
console.log("DONE");
