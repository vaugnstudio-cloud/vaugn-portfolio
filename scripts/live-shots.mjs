// Captures the REAL live client sites as case-study imagery — the most
// honest possible portfolio assets: the shipped work itself.
//   node scripts/live-shots.mjs
import { chromium } from "playwright";

const OUT = "public/images/live";
const SITES = [
  ["medsync", "https://medsyncmentalhealth.com/"],
  ["ozmax", "https://ozmaxcare.com.au/"],
  ["junk", "https://junksunshinecoast.com.au/"],
  ["ysc", "https://yoursocialchef.com/"],
  ["mekong", "https://mekongmerchant.com.au/"],
  ["yassas", "https://www.yassas.com.au/"],
  ["feedme", "https://feedmegroup.com.au/"],
  ["plumb", "https://plumbyourway.com.au/"],
  ["inbloom", "https://www.inbloomtherapy.com.au/"],
];

const browser = await chromium.launch();

async function settle(page) {
  await page.waitForTimeout(2600);
  // dismiss likely cookie banners without clicking anything risky
  await page.evaluate(() => {
    document
      .querySelectorAll("[class*='cookie' i],[id*='cookie' i],[class*='consent' i]")
      .forEach((el) => {
        if (el instanceof HTMLElement && el.offsetHeight > 40 && el.offsetHeight < 500) el.style.display = "none";
      });
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(400);
}

for (const [slug, url] of SITES) {
  try {
    // Desktop hero + mid-scroll
    const d = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await d.goto(url, { waitUntil: "load", timeout: 45000 });
    await settle(d);
    await d.screenshot({ path: `${OUT}/${slug}-d-hero.png` });
    await d.evaluate(() => window.scrollTo({ top: window.innerHeight * 1.4 }));
    await d.waitForTimeout(1500);
    await d.screenshot({ path: `${OUT}/${slug}-d-mid.png` });
    await d.close();

    // Mobile hero + mid-scroll
    const m = await browser.newPage({
      viewport: { width: 390, height: 844 },
      userAgent:
        "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
      isMobile: true,
      hasTouch: true,
      deviceScaleFactor: 2,
    });
    await m.goto(url, { waitUntil: "load", timeout: 45000 });
    await settle(m);
    await m.screenshot({ path: `${OUT}/${slug}-m-hero.png` });
    await m.evaluate(() => window.scrollTo({ top: window.innerHeight * 1.6 }));
    await m.waitForTimeout(1500);
    await m.screenshot({ path: `${OUT}/${slug}-m-mid.png` });
    await m.close();
    console.log(`${slug} ok`);
  } catch (e) {
    console.log(`${slug} FAILED: ${String(e).slice(0, 120)}`);
  }
}
await browser.close();
