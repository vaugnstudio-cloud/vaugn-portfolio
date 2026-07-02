// Pre-launch audit: route statuses, console errors, mobile horizontal
// overflow, sitemap/robots content, 404 behaviour, OG image.
import { chromium } from "playwright";

const BASE = "http://localhost:3000";
const ROUTES = [
  "/", "/work", "/services", "/about", "/contact", "/healthcare",
  "/hospitality", "/resources",
  "/work/medsync", "/work/ozmax-care", "/work/junk-sunshine-coast",
  "/work/your-socialchef", "/work/specialty-coffee-branding",
  "/work/boutique-hotel-branding", "/work/craft-beverage-branding",
  "/work/wellness-medspa-branding", "/work/dental-clinic-branding",
  "/work/fitness-studio-branding", "/work/social-media-systems",
  "/work/hospitality-social-content", "/work/print-collateral",
  "/work/logo-identity", "/work/inbloom-therapy", "/work/acef-enterprises",
  "/work/mekong-merchant", "/work/yassas", "/work/feedme-group",
  "/work/plumbyourway",
];

const browser = await chromium.launch();
const issues = [];

// 1) Route status + console errors + mobile overflow
for (const viewport of [{ width: 1280, height: 800, name: "desktop" }, { width: 375, height: 812, name: "mobile" }]) {
  const page = await browser.newPage({ viewport, reducedMotion: "reduce" });
  const errors = [];
  page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
  page.on("pageerror", (e) => errors.push(String(e)));

  for (const route of ROUTES) {
    const res = await page.goto(`${BASE}${route}`, { waitUntil: "networkidle" });
    if (!res || res.status() !== 200) issues.push(`${viewport.name} ${route}: HTTP ${res ? res.status() : "??"}`);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    if (overflow > 1) issues.push(`${viewport.name} ${route}: horizontal overflow ${overflow}px`);
  }
  if (errors.length) issues.push(`${viewport.name} console errors: ${[...new Set(errors)].slice(0, 5).join(" | ")}`);
  await page.close();
}

// 2) sitemap, robots, OG, 404
const page = await browser.newPage();
const sm = await page.goto(`${BASE}/sitemap.xml`);
const smText = await sm.text();
const missing = ROUTES.filter((r) => r !== "/" && !smText.includes(`${r}<`) && !smText.includes(`${r}</loc>`));
if (missing.length) issues.push(`sitemap missing: ${missing.join(", ")}`);
const rb = await page.goto(`${BASE}/robots.txt`);
const rbText = await rb.text();
if (!rbText.includes("sitemap")) issues.push("robots.txt missing sitemap line");
const og = await page.goto(`${BASE}/opengraph-image`);
if (og.status() !== 200 || !(og.headers()["content-type"] || "").includes("image")) issues.push(`opengraph-image: ${og.status()} ${og.headers()["content-type"]}`);
const nf = await page.goto(`${BASE}/this-page-does-not-exist`);
if (nf.status() !== 404) issues.push(`404 page returned ${nf.status()}`);

await browser.close();
console.log(issues.length ? "ISSUES:\n" + issues.join("\n") : "AUDIT CLEAN — 28 routes × 2 viewports, sitemap, robots, OG, 404 all pass");
