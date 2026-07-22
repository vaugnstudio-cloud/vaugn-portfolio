// Captures the self-initiated products (kits + apps) as portfolio imagery.
// Local static HTML is served over http (PWA service workers are blocked);
// SOP Quest is shot from its live URL.
//
// HONESTY / PRIVACY RULES BAKED IN:
//   - Outreach Cockpit: its default seed data contains REAL prospects, so a
//     fully fictional dataset is injected into localStorage BEFORE first load
//     (Store.load() prefers saved leads over seeds). Every cockpit shot must
//     also be eyeballed before commit.
//   - Studio OS: shot in its own sample-data sandbox (SampleData.load()) —
//     fictional demo numbers, never the personal dashboard instance.
//
//   node scripts/product-shots.mjs
import { chromium } from "playwright";
import http from "node:http";
import fs from "node:fs";
import path from "node:path";

const OUT = "public/images/products";
const PARENT = path.resolve("..");

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css",
  ".js": "text/javascript",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".webmanifest": "application/manifest+json",
};

function serve(rootDir) {
  const server = http.createServer((req, res) => {
    const urlPath = decodeURIComponent(new URL(req.url, "http://x").pathname);
    let file = path.join(rootDir, urlPath === "/" ? "index.html" : urlPath);
    if (!file.startsWith(rootDir)) { res.writeHead(403).end(); return; }
    if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, "index.html");
    if (!fs.existsSync(file)) { res.writeHead(404).end("not found"); return; }
    res.writeHead(200, { "Content-Type": MIME[path.extname(file).toLowerCase()] ?? "application/octet-stream" });
    fs.createReadStream(file).pipe(res);
  });
  return new Promise((resolve) => {
    server.listen(0, "127.0.0.1", () => resolve({ port: server.address().port, close: () => server.close() }));
  });
}

// Fully fictional cockpit dataset — no real business, person, or email.
const COCKPIT_STATE = {
  version: 2,
  settings: { sample: true, brandName: "Vaugn Studio", brandSub: "Outreach Cockpit" },
  leads: [
    { industry: "healthcare", name: "Harborview Dental Studio", geo: "Portland, OR", channel: "email", to: "hello@example.com", status: "replied", score: 8, why: "New site launched with no booking flow above the fold.", followUpAt: "2026-07-24" },
    { industry: "healthcare", name: "Sunrise Physiotherapy", geo: "Austin, TX", channel: "email", to: "frontdesk@example.com", status: "contacted", score: 7, why: "Referral-heavy clinic, zero Google presence.", followUpAt: "2026-07-23", sentAt: "2026-07-19" },
    { industry: "healthcare", name: "Cedar Grove Counselling", geo: "Seattle, WA", channel: "form", to: "", status: "new", score: 6, why: "Template site erodes trust for anxious first-time patients." },
    { industry: "healthcare", name: "Bluewater Medical Billing", geo: "Tampa, FL", channel: "email", to: "admin@example.com", status: "won", score: 9, why: "Losing clean claims to a dated brand — leakage calculator angle." },
    { industry: "healthcare", name: "Northgate Family Clinic", geo: "Boise, ID", channel: "phone", to: "", status: "contacted", score: 5, why: "No mobile layout; patients book by phone only.", followUpAt: "2026-07-22" },
    { industry: "restaurants", name: "The Copper Skillet", geo: "Melbourne, AU", channel: "ig", handle: "@example", status: "replied", score: 8, why: "Great food photos, feed has no system or offer." },
    { industry: "restaurants", name: "Mariposa Cantina", geo: "San Diego, CA", channel: "ig", handle: "@example", status: "new", score: 7, why: "Events every week, none promoted beyond stories." },
    { industry: "restaurants", name: "Driftwood Café", geo: "Brisbane, AU", channel: "email", to: "bookings@example.com", status: "lost", score: 4, why: "Menu PDF from 2023; weekend queues but no capture." },
  ].map((l, i) => ({ id: `demo-${i + 1}`, tags: [], log: [], createdAt: "2026-07-10T00:00:00.000Z", updatedAt: "2026-07-18T00:00:00.000Z", ...l })),
  updatedAt: "2026-07-18T00:00:00.000Z",
};

const browser = await chromium.launch();

async function newPage(ctxOpts = {}, init) {
  const context = await browser.newContext({ serviceWorkers: "block", ...ctxOpts });
  if (init) await context.addInitScript(init.fn, init.arg);
  return { context, page: await context.newPage() };
}

const DESKTOP = { viewport: { width: 1440, height: 900 } };
const MOBILE = {
  viewport: { width: 390, height: 844 },
  userAgent:
    "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
  isMobile: true,
  hasTouch: true,
  deviceScaleFactor: 2,
};

async function shoot(page, file, { scroll = 0, settle = 1800 } = {}) {
  if (scroll) {
    await page.evaluate((f) => window.scrollTo({ top: window.innerHeight * f }), scroll);
  }
  await page.waitForTimeout(settle);
  await page.screenshot({ path: `${OUT}/${file}`, type: "jpeg", quality: 82 });
  console.log(`  ${file}`);
}

// ── The 5 kits + cockpit + studio-os: local serve ─────────────────────────
const KITS = [
  {
    slug: "averis", dir: "averis-rcm-kit",
    shots: [
      { file: "averis-d-hero.jpg", path: "/index.html", mobile: false },
      { file: "averis-d-calc.jpg", path: "/results.html", mobile: false, scroll: 0.8 },
      { file: "averis-d-deck.jpg", path: "/deck/deck.html", mobile: false },
      { file: "averis-m-hero.jpg", path: "/index.html", mobile: true },
      { file: "averis-m-services.jpg", path: "/services.html", mobile: true },
    ],
  },
  {
    slug: "lumiere", dir: "lumiere-kit",
    shots: [
      { file: "lumiere-d-hero.jpg", path: "/index.html", mobile: false },
      { file: "lumiere-d-mid.jpg", path: "/services.html", mobile: false },
      { file: "lumiere-d-dark.jpg", path: "/index.html", mobile: false, dark: "lumiere-theme" },
      { file: "lumiere-m-hero.jpg", path: "/index.html", mobile: true },
      { file: "lumiere-m-mid.jpg", path: "/services.html", mobile: true },
    ],
  },
  {
    slug: "eclat", dir: "eclat-kit",
    shots: [
      { file: "eclat-d-hero.jpg", path: "/index.html", mobile: false },
      { file: "eclat-d-mid.jpg", path: "/services.html", mobile: false },
      { file: "eclat-m-hero.jpg", path: "/index.html", mobile: true },
      { file: "eclat-m-mid.jpg", path: "/results.html", mobile: true },
    ],
  },
  {
    slug: "maison", dir: "maison-kit",
    shots: [
      { file: "maison-d-hero.jpg", path: "/index.html", mobile: false },
      { file: "maison-d-mid.jpg", path: "/listings.html", mobile: false },
      { file: "maison-m-hero.jpg", path: "/index.html", mobile: true },
      { file: "maison-m-mid.jpg", path: "/listings.html", mobile: true },
    ],
  },
  {
    slug: "esprit", dir: "esprit-kit",
    shots: [
      { file: "esprit-d-hero.jpg", path: "/index.html", mobile: false },
      { file: "esprit-d-mid.jpg", path: "/audit.html", mobile: false },
      { file: "esprit-m-hero.jpg", path: "/index.html", mobile: true },
      { file: "esprit-m-mid.jpg", path: "/work.html", mobile: true },
    ],
  },
];

for (const kit of KITS) {
  const root = path.join(PARENT, kit.dir);
  if (!fs.existsSync(root)) { console.log(`${kit.slug} SKIPPED — ${root} missing`); continue; }
  const srv = await serve(root);
  console.log(`${kit.slug} @ :${srv.port}`);
  for (const s of kit.shots) {
    try {
      const init = s.dark
        ? { fn: (key) => localStorage.setItem(key, "dark"), arg: s.dark }
        : undefined;
      const { context, page } = await newPage(s.mobile ? MOBILE : DESKTOP, init);
      await page.goto(`http://127.0.0.1:${srv.port}${s.path}`, { waitUntil: "load", timeout: 30000 });
      await shoot(page, s.file, { scroll: s.scroll ?? 0 });
      await context.close();
    } catch (e) {
      console.log(`  ${s.file} FAILED: ${String(e).slice(0, 120)}`);
    }
  }
  srv.close();
}

// ── SOP Quest — live PWA ───────────────────────────────────────────────────
const SOP_URL = "https://the-system-vaugn.netlify.app";
try {
  console.log("sop-quest @ live");
  const d = await newPage(DESKTOP);
  await d.page.goto(SOP_URL, { waitUntil: "load", timeout: 45000 });
  await shoot(d.page, "sop-quest-d-hero.jpg", { settle: 2600 });
  await shoot(d.page, "sop-quest-d-mid.jpg", { scroll: 1.2 });
  await d.context.close();
  const m = await newPage(MOBILE);
  await m.page.goto(SOP_URL, { waitUntil: "load", timeout: 45000 });
  await shoot(m.page, "sop-quest-m-hero.jpg", { settle: 2600 });
  await shoot(m.page, "sop-quest-m-mid.jpg", { scroll: 1.4 });
  await m.context.close();
} catch (e) {
  console.log(`sop-quest FAILED: ${String(e).slice(0, 120)}`);
}

// ── Studio OS — local serve, sample-data sandbox ───────────────────────────
try {
  const root = path.join(PARENT, "studio-os");
  const srv = await serve(root);
  console.log(`studio-os @ :${srv.port} (sample mode)`);
  const { context, page } = await newPage(DESKTOP);
  await page.goto(`http://127.0.0.1:${srv.port}/index.html`, { waitUntil: "load", timeout: 30000 });
  // Enter the built-in fictional sandbox; it sets welcomed flags + reloads.
  await page.evaluate(() => window.SampleData && window.SampleData.load());
  await page.waitForLoadState("load");
  await shoot(page, "studio-os-d-hero.jpg", { settle: 2400 });
  await page.goto(`http://127.0.0.1:${srv.port}/crm.html`, { waitUntil: "load", timeout: 30000 });
  await shoot(page, "studio-os-d-crm.jpg", { settle: 2400 });
  await page.goto(`http://127.0.0.1:${srv.port}/reports.html`, { waitUntil: "load", timeout: 30000 });
  await shoot(page, "studio-os-d-reports.jpg", { settle: 2400 });
  await context.close();
  srv.close();
} catch (e) {
  console.log(`studio-os FAILED: ${String(e).slice(0, 120)}`);
}

// ── Outreach Cockpit — local serve, FICTIONAL data injected pre-load ──────
try {
  const root = path.join(PARENT, "outreach-cockpit");
  const srv = await serve(root);
  console.log(`outreach-cockpit @ :${srv.port} (fictional dataset)`);
  const init = {
    fn: (state) => localStorage.setItem("app.outreach.v1", JSON.stringify(state)),
    arg: COCKPIT_STATE,
  };
  const d = await newPage(DESKTOP, init);
  await d.page.goto(`http://127.0.0.1:${srv.port}/index.html`, { waitUntil: "load", timeout: 30000 });
  await shoot(d.page, "outreach-cockpit-d-hero.jpg", { settle: 2400 });
  // Insights view — the rule-based advisor
  await d.page.evaluate(() => {
    const el = document.querySelector("[data-view='insights'],[data-tab='insights'],#insightsBtn,[data-insights]");
    if (el instanceof HTMLElement) el.click();
  });
  await shoot(d.page, "outreach-cockpit-d-insights.jpg", { settle: 1600 });
  await d.context.close();
  const m = await newPage(MOBILE, init);
  await m.page.goto(`http://127.0.0.1:${srv.port}/index.html`, { waitUntil: "load", timeout: 30000 });
  await shoot(m.page, "outreach-cockpit-m-hero.jpg", { settle: 2400 });
  await shoot(m.page, "outreach-cockpit-m-mid.jpg", { scroll: 1.0 });
  await m.context.close();
  srv.close();
} catch (e) {
  console.log(`outreach-cockpit FAILED: ${String(e).slice(0, 120)}`);
}

await browser.close();
console.log("done");
