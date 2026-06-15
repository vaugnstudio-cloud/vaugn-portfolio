// Capture live About + mobile home + the three references for the audit.
import { chromium } from "playwright";
import path from "node:path";

const tmp = process.env.TEMP || ".";
const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36";
const browser = await chromium.launch();

async function shot(url, file, { width = 1280, height = 900, full = false, mobile = false, wait = 4000 } = {}) {
  const ctx = await browser.newContext({
    viewport: { width, height },
    deviceScaleFactor: 1,
    userAgent: mobile
      ? "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1"
      : UA,
    reducedMotion: "reduce",
    ignoreHTTPSErrors: true,
  });
  const page = await ctx.newPage();
  try {
    await page.goto(url, { waitUntil: "networkidle", timeout: 45000 });
  } catch (e) {
    console.log("WARN", url, e.message);
  }
  await page.waitForTimeout(wait);
  await page.screenshot({ path: path.join(tmp, file), type: "jpeg", quality: 80, fullPage: full });
  console.log("OK", file, "->", page.url());
  await ctx.close();
}

await shot("https://vaugn-portfolio.vercel.app/about", "a_about.jpg", { full: true });
await shot("https://vaugn-portfolio.vercel.app/", "a_home_mobile.jpg", { width: 390, height: 844, mobile: true });
await shot("https://portfoliov1.framer.ai/", "ref1.jpg");
await shot("https://portfoliov2.framer.ai/", "ref2.jpg");
await shot("https://portfoliov3.framer.ai/blog", "ref3.jpg");

await browser.close();
console.log("DONE " + tmp);
