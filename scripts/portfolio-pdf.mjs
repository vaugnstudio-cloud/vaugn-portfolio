// Portfolio PDF — a 14-page 16:9 deck built from the same assets and the
// same facts as the live site, for job applications that ask for a file
// upload instead of a link.
//   node scripts/portfolio-pdf.mjs
//
// Notes:
// - msedge channel (bundled Chromium can't decode H.264 → motion stills).
// - Assets are downscaled to JPEG in-browser and inlined as data URIs, so
//   the deck never touches file:// (this repo path contains spaces) and the
//   final PDF stays small enough for upload forms.
// - Provenance labels mirror the site exactly: client / agency / concept /
//   self-initiated. Nothing here claims more than the site does.
import { chromium } from "playwright";
import http from "node:http";
import fs from "node:fs";
import path from "node:path";

const ROOT = "public";
const OUT = process.argv[2] ?? "portfolio-deck.pdf";
const PORT = 4319;

/* ── tiny static server for public/ ─────────────────────────── */
const MIME = { ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png", ".mp4": "video/mp4" };
const server = http.createServer((req, res) => {
  const url = decodeURIComponent(req.url.split("?")[0]);
  // Same-origin host page: canvas.toDataURL() on cross-origin pixels taints.
  if (url === "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end("<!DOCTYPE html><title>prep</title><body></body>");
    return;
  }
  const file = path.join(ROOT, url);
  fs.stat(file, (err, st) => {
    if (err || !st.isFile()) { res.writeHead(404).end(); return; }
    const range = req.headers.range;
    const type = MIME[path.extname(file).toLowerCase()] ?? "application/octet-stream";
    if (range) {
      const [s, e] = range.replace(/bytes=/, "").split("-");
      const start = parseInt(s, 10), end = e ? parseInt(e, 10) : st.size - 1;
      res.writeHead(206, { "Content-Type": type, "Content-Range": `bytes ${start}-${end}/${st.size}`, "Accept-Ranges": "bytes", "Content-Length": end - start + 1 });
      fs.createReadStream(file, { start, end }).pipe(res);
    } else {
      res.writeHead(200, { "Content-Type": type, "Content-Length": st.size, "Accept-Ranges": "bytes" });
      fs.createReadStream(file).pipe(res);
    }
  });
});
await new Promise((r) => server.listen(PORT, r));

/* ── assets ─────────────────────────────────────────────────── */
const IMAGES = {
  augCover: "/images/augellos/cover.jpg",
  augCarousel: "/images/augellos/pinned-strip.jpg",
  augPmax: "/images/augellos/pmax-matrix.jpg",
  rKumarsAfl: "/images/recent/kumars-afl.jpg",
  rNavratri: "/images/recent/kumars-navratri.jpg",
  rRenzos: "/images/recent/renzos-pasta.jpg",
  rVictorias: "/images/recent/victorias-point-cook.jpg",
  rHill: "/images/recent/the-hill-seniors-lunch.jpg",
  rSincero: "/images/recent/sincero-christmas.jpg",
  rGccoQr: "/images/recent/gcco-a3-qr.jpg",
  rJunkCoastal: "/images/recent/junk-coastal-makewaves.jpg",
  rKumarsOct: "/images/recent/kumars-october.jpg",
  rDussehra: "/images/recent/kumars-dussehra.jpg",
  rLilianas: "/images/recent/lilianas-christmas.jpg",
  rJunkCup: "/images/recent/junk-melbourne-cup-2.jpg",
  rGccoHalloween: "/images/recent/gcco-halloween.jpg",
  qaToolkit: "/images/recent/qa-toolkit.jpg",
  rRenzosCocktail: "/images/recent/renzos-cocktail.jpg",
  rSp: "/images/recent/sp-fathers-day.jpg",
  rGccoBurger: "/images/recent/gcco-burger.jpg",
  rAuz: "/images/recent/auz-review.jpg",
  tntCover: "/images/tnt/cover.jpg",
  tntGuideMark: "/images/tnt/guide-mark.jpg",
  tntHeadline: "/images/tnt/guide-headline-price.jpg",
  tntV2: "/images/tnt/v2-company-4x5.jpg",
  tntStories: "/images/tnt/stories-9x16-set.jpg",
  portrait: "/images/vaugn-photo.jpg",
  medsyncD: "/images/live/medsync-d-hero.jpg",
  medsyncM: "/images/live/medsync-m-hero.jpg",
  ozmaxD: "/images/live/ozmax-d-hero.jpg",
  ozmaxMid: "/images/live/ozmax-d-mid.jpg",
  ozmaxGuide: "/images/ysc/ozmax-guide-system.jpg",
  junkD: "/images/live/junk-d-hero.jpg",
  junkM: "/images/live/junk-m-hero.jpg",
  junkPrint: "/images/ysc/junk-maroochydore.jpg",
  yassasD: "/images/live/yassas-d-hero.jpg",
  yassasMid: "/images/live/yassas-d-mid.jpg",
  mekongD: "/images/live/mekong-d-hero.jpg",
  mekongMid: "/images/live/mekong-d-mid.jpg",
  inbloomD: "/images/live/inbloom-d-hero.jpg",
  inbloomMid: "/images/live/inbloom-d-mid.jpg",
  feedmeD: "/images/live/feedme-d-hero.jpg",
  feedmeMid: "/images/live/feedme-d-mid.jpg",
  yscA: "/images/ysc/gabbys-summer-frenzy.jpg",
  yscB: "/images/ysc/dantes-pizza-week.jpg",
  yscC: "/images/ysc/yassas-greek-mothers.jpg",
  yscD: "/images/ysc/augellos-valentines.jpg",
  yscE: "/images/ysc/truly-assam-fuel.jpg",
  yscF: "/images/ysc/twiddles-imessage.jpg",
  smsFeed: "/images/gd/sms-feed-sundry.png",
  smsAnatomy: "/images/gd/sms-carousel-anatomy.png",
  smsMatrix: "/images/gd/sms-brand-matrix.png",
  hospMenu: "/images/gd/hosp-menu-drop.png",
  logoGrid: "/images/gd/logo-marks-grid.png",
  sundryHero: "/images/branding/specialty-coffee-hero.jpg",
  sundryId: "/images/branding/specialty-coffee-identity.png",
  sundryMenu: "/images/branding/specialty-coffee-application-v2.png",
  asterHero: "/images/branding/boutique-hotel-hero.jpg",
  riptideHero: "/images/branding/craft-beverage-hero.jpg",
  seleneHero: "/images/branding/wellness-medspa-hero.jpg",
  averisM: "/images/products/averis-m-hero.jpg",
  lumiereM: "/images/products/lumiere-m-hero.jpg",
  eclatM: "/images/products/eclat-m-hero.jpg",
  maisonM: "/images/products/maison-m-hero.jpg",
  espritM: "/images/products/esprit-m-hero.jpg",
  sopQuest: "/images/products/sop-quest-d-hero.jpg",
  sopQuestB: "/images/products/sop-quest-d-mid.jpg",
  studioOs: "/images/products/studio-os-d-hero.jpg",
  studioOsB: "/images/products/studio-os-d-crm.jpg",
  cockpit: "/images/products/outreach-cockpit-d-hero.jpg",
  cockpitB: "/images/products/outreach-cockpit-d-insights.jpg",
  denial: "/images/products/dd-demo-home.png",
  denialB: "/images/products/dd-demo-sops.png",
};
const VIDEOS = {
  reelBurger: "/videos/reel-burger.mp4",
  reelSteak: "/videos/reel-steak.mp4",
  reelRamen: "/videos/reel-ramen.mp4",
  reelColdbrew: "/videos/reel-coldbrew.mp4",
};

const browser = await chromium.launch({ channel: "msedge" });
const prep = await browser.newPage({ viewport: { width: 1600, height: 900 } });
await prep.goto(`http://localhost:${PORT}/`, { waitUntil: "domcontentloaded" });

const A = await prep.evaluate(
  async ({ images, videos, port }) => {
    const out = {};
    const toJpeg = (src, maxEdge) =>
      new Promise((res) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => {
          const scale = Math.min(1, maxEdge / Math.max(img.naturalWidth, img.naturalHeight));
          const c = document.createElement("canvas");
          c.width = Math.round(img.naturalWidth * scale);
          c.height = Math.round(img.naturalHeight * scale);
          const ctx = c.getContext("2d");
          ctx.fillStyle = "#fff";
          ctx.fillRect(0, 0, c.width, c.height);
          ctx.drawImage(img, 0, 0, c.width, c.height);
          res(c.toDataURL("image/jpeg", 0.8));
        };
        img.onerror = () => res("");
        img.src = `http://localhost:${port}${src}`;
      });

    for (const [k, src] of Object.entries(images)) out[k] = await toJpeg(src, 1400);

    for (const [k, src] of Object.entries(videos)) {
      out[k] = await new Promise((res) => {
        const v = document.createElement("video");
        v.muted = true;
        v.playsInline = true;
        v.preload = "auto";
        const grab = () => {
          const c = document.createElement("canvas");
          c.width = 540;
          c.height = Math.round((v.videoHeight / v.videoWidth) * 540) || 960;
          c.getContext("2d").drawImage(v, 0, 0, c.width, c.height);
          res(c.toDataURL("image/jpeg", 0.78));
        };
        v.addEventListener("seeked", grab, { once: true });
        v.addEventListener("error", () => res(""), { once: true });
        const seek = () => { v.currentTime = Math.min(1.2, (v.duration || 3) * 0.35); };
        if (v.readyState >= 1) seek();
        else v.addEventListener("loadedmetadata", seek, { once: true });
        setTimeout(() => res(""), 15000);
        v.src = `http://localhost:${port}${src}`;
      });
    }
    return out;
  },
  { images: IMAGES, videos: VIDEOS, port: PORT }
);

const missing = Object.entries(A).filter(([, v]) => !v).map(([k]) => k);
if (missing.length) console.log("WARNING — assets failed to load:", missing.join(", "));
await prep.close();

/* ── deck ───────────────────────────────────────────────────── */
const img = (k, fit = "cover", pos = "top center") =>
  `<img src="${A[k]}" style="width:100%; height:100%; object-fit:${fit}; object-position:${pos}; display:block;">`;

// Frames stretch to fill the page (no fixed heights → no dead bands).
// `fade` softens a screenshot crop so it reads as a deliberate edge rather
// than a sentence sliced in half; `contain` is for designed boards, which
// must never be cropped.
const frame = (k, o = {}) => {
  const { fit = "cover", pos = "top center", fade = false, h, pad = 0 } = o;
  const fadeEl = fade
    ? `<div style="position:absolute; left:0; right:0; bottom:0; height:26%; background:linear-gradient(to bottom, rgba(16,14,13,0), rgba(16,14,13,.92));"></div>`
    : "";
  return `<div style="position:relative; ${h ? `height:${h}px;` : "flex:1;"} min-height:0; border-radius:10px; overflow:hidden; background:#171412; border:1px solid #2A2521; ${pad ? `padding:${pad}px;` : ""}">${img(k, fit, pos)}${fadeEl}</div>`;
};

// Desktop screenshots and designed artefacts are shown whole — a landscape
// asset in a tall column would otherwise crop mid-headline, which reads as
// an accident rather than a crop. Only long mobile scrolls use cover+fade.
const shot = (k) => frame(k, { fit: "contain", pos: "center", pad: 8 });

// Media area that eats all remaining page height.
const media = (cols, inner, gap = 20) =>
  `<div style="flex:1; min-height:0; display:grid; grid-template-columns:${cols}; gap:${gap}px; margin-top:26px;">${inner}</div>`;

// A titled card: frames stacked above a caption block.
const card = (frames, title, sub) =>
  `<div style="display:flex; flex-direction:column; gap:12px; min-height:0;">${frames}
    <div style="flex:none;"><p style="font-family:'Fraunces',serif; font-size:19px;">${title}</p>
    <p style="font-family:'JetBrains Mono',monospace; font-size:10px; letter-spacing:.16em; text-transform:uppercase; color:#8C8279; margin-top:6px;">${sub}</p></div>
  </div>`;

const tag = (t) => `<span style="border:1px solid #3A322C; border-radius:999px; padding:6px 14px; font-family:'JetBrains Mono',monospace; font-size:11px; letter-spacing:.16em; text-transform:uppercase; color:#B8AEA4;">${t}</span>`;

const page = (inner, opts = {}) => `
  <section style="width:1600px; height:900px; background:${opts.bg ?? "#100E0D"}; color:#F4EFE9; position:relative; overflow:hidden; page-break-after:always; ${opts.pad === false ? "" : "padding:64px 76px;"} display:flex; flex-direction:column;">
    ${inner}
  </section>`;

const header = (kicker, title, meta) => `
  <div style="display:flex; align-items:flex-end; justify-content:space-between; gap:40px;">
    <div>
      <p style="font-family:'JetBrains Mono',monospace; font-size:11px; letter-spacing:.28em; text-transform:uppercase; color:#C4552D;">${kicker}</p>
      <h2 style="font-family:'Fraunces',serif; font-weight:600; font-size:46px; line-height:1.05; margin-top:12px;">${title}</h2>
    </div>
    <div style="display:flex; gap:8px; flex:none;">${(meta ?? []).map(tag).join("")}</div>
  </div>`;

const body = (text) => `<p style="font-family:'Inter',sans-serif; font-size:17px; line-height:1.55; color:#B8AEA4; max-width:1000px; margin-top:14px;">${text}</p>`;

const pages = [];

/* 01 — cover */
pages.push(page(`
  <div style="position:absolute; inset:0; background:radial-gradient(120% 90% at 78% 18%, rgba(196,85,45,.26), transparent 62%);"></div>
  <div style="position:relative; flex:1; display:flex; flex-direction:column; justify-content:space-between;">
    <div style="display:flex; justify-content:space-between; align-items:flex-start;">
      <p style="font-family:'JetBrains Mono',monospace; font-size:12px; letter-spacing:.3em; text-transform:uppercase; color:#B8AEA4;">Portfolio — 2026</p>
      <div style="width:132px; height:132px; border-radius:999px; overflow:hidden; border:1px solid #3A322C;">${img("portrait", "cover", "center")}</div>
    </div>
    <div>
      <p style="font-family:'JetBrains Mono',monospace; font-size:13px; letter-spacing:.28em; text-transform:uppercase; color:#C4552D;">Vaugn Almeida</p>
      <h1 style="font-family:'Fraunces',serif; font-weight:600; font-size:96px; line-height:1.02; margin-top:20px; max-width:1240px;">Identity systems and websites for brands that live on <em style="font-style:italic; color:#C4552D;">trust</em>.</h1>
      <p style="font-family:'Inter',sans-serif; font-size:21px; line-height:1.5; color:#B8AEA4; margin-top:26px; max-width:900px;">Senior Brand &amp; Web Designer — healthcare and hospitality. I design the brand, design the site, and build it myself.</p>
    </div>
    <div style="display:flex; justify-content:space-between; align-items:flex-end; border-top:1px solid #2A2521; padding-top:22px; font-family:'JetBrains Mono',monospace; font-size:12px; letter-spacing:.14em; color:#B8AEA4;">
      <span>vaugn-portfolio.vercel.app</span>
      <span>vaugn.studio@gmail.com</span>
      <span>linkedin.com/in/vaugn-almeida</span>
      <span>Greater Manila Area · Remote</span>
    </div>
  </div>`));

/* 02 — snapshot */
pages.push(page(`
  ${header("Snapshot", "One person, strategy to shipped site.")}
  <div style="display:grid; grid-template-columns:1.15fr 1fr; gap:56px; margin-top:38px; flex:1;">
    <div>
      <p style="font-family:'Inter',sans-serif; font-size:18px; line-height:1.62; color:#D6CFC7;">I&rsquo;m a brand &amp; web designer working remotely with international clients across healthcare, hospitality, and growth businesses. My route in is unusual: I worked inside US healthcare revenue-cycle operations — claims, denials, payer follow-up — so clinics and billing firms skip the months of onboarding most designers need.</p>
      <p style="font-family:'Inter',sans-serif; font-size:18px; line-height:1.62; color:#D6CFC7; margin-top:18px;">Since 2023 I&rsquo;ve worked at Your SocialChef, an Australian agency, across 20+ concurrent accounts. In September 2026 I was promoted to Senior Graphic Designer, and I now review the design team&rsquo;s work before it reaches clients, on top of my own accounts.</p>
      <p style="font-family:'Inter',sans-serif; font-size:18px; line-height:1.62; color:#D6CFC7; margin-top:18px;">Alongside client work I designed, built, and shipped a product line of my own — five niche website kits and four working apps, design system to production.</p>
    </div>
    <div style="display:flex; flex-direction:column; gap:14px;">
      ${[["5+", "Years in design"], ["20+", "Agency accounts managed"], ["9", "Products designed &amp; built"], ["7", "Live sites you can visit"]]
        .map(([v, l]) => `<div style="border:1px solid #2A2521; border-radius:12px; padding:20px 24px; display:flex; align-items:baseline; gap:18px; background:#161311;">
          <span style="font-family:'Fraunces',serif; font-weight:600; font-size:40px; color:#C4552D; min-width:96px;">${v}</span>
          <span style="font-family:'Inter',sans-serif; font-size:15px; color:#B8AEA4;">${l}</span></div>`).join("")}
      <div style="border:1px solid #2A2521; border-radius:12px; padding:20px 24px; background:#161311;">
        <p style="font-family:'JetBrains Mono',monospace; font-size:11px; letter-spacing:.22em; text-transform:uppercase; color:#8C8279;">Tools</p>
        <p style="font-family:'Inter',sans-serif; font-size:15px; line-height:1.7; color:#D6CFC7; margin-top:10px;">Figma · Framer · Webflow · Photoshop · Illustrator · InDesign · After Effects · Premiere Pro</p>
      </div>
    </div>
  </div>`));

/* 03 — Augello's */
pages.push(page(`
  ${header("01 — Client work", "Augello&rsquo;s", ["Agency work · 2026", "Hospitality", "Social · Paid · Web"])}
  ${body("For an Italian restaurant in Balwyn, through Your SocialChef: a pinned-post series of signature dishes, 33 Google Performance Max creatives cut from the venue&rsquo;s own shoot, and the What&rsquo;s On page for the new website, designed for desktop and mobile.")}
  ${media("1.3fr 1fr", `${frame("augCover", { fit: "contain", pos: "center" })}<div style="display:flex; flex-direction:column; gap:18px; min-height:0;">${shot("augCarousel")}${shot("augPmax")}</div>`, 22)}`));

/* 03 — Tacos 'N' Tequilas */
pages.push(page(`
  ${header("01 — Client work", "Tacos 'N' Tequilas", ["Agency work · 2026", "Hospitality", "Brand system · Campaign · Motion"])}
  ${body("For a Melbourne Mexican kitchen and bar, through Your SocialChef: a one-page brand visual guide that settled two conflicting brand documents, a nine-tile Instagram grid, and the Sunday Birria Night campaign — three variations, three formats each, plus animated stories. Every image is the venue&rsquo;s own photography; nothing generated.")}
  ${media("1.45fr 1fr", `${frame("tntCover", { fit: "contain", pos: "center" })}<div style="display:flex; flex-direction:column; gap:18px; min-height:0;">${shot("tntGuideMark")}${shot("tntHeadline")}</div>`, 22)}`));

/* 03 — MedSync */
pages.push(page(`
  ${header("01 — Client work", "MedSync", ["Client work · Live", "Healthcare", "Brand + Web"])}
  ${body("A California psychiatry clinic&rsquo;s first impression, rebuilt around patient trust: HIPAA-aware design, crisis-protocol integration, and a booking flow that works for someone in a bad week. Designed and built in Framer, with a CMS the clinic team runs without me. <span style=\"color:#8C8279\">medsyncmentalhealth.com · 2025</span>")}
  ${media("1fr 300px", `${frame("medsyncD", { fade: true })}${frame("medsyncM", { fade: true })}`, 24)}`));

/* 04 — Ozmax */
pages.push(page(`
  ${header("01 — Client work", "Ozmax Care", ["Agency work · Live", "NDIS &amp; disability", "Brand + Web"])}
  ${body("Full brand identity for a Melbourne NDIS and disability-support provider — logo, palette, typography, and a brand guide — plus the website design built around its trust-first &ldquo;Empowering Every Ability&rdquo; message. For families making sensitive care decisions, warmth is the conversion strategy.")}
  ${media("1fr 1fr", `${shot("ozmaxD")}${shot("ozmaxGuide")}`, 24)}`));

/* 05 — Junk */
pages.push(page(`
  ${header("01 — Client work", "Junk Sunshine Coast", ["Agency work · Live", "Hospitality", "Brand · Web · Social"])}
  ${body("A high-energy Australian food brand across two venues: website design, social systems, promotional print, and photo grading. The brief was loud — the system keeps it loud without becoming noise.")}
  ${media("1fr 300px 1fr", `${shot("junkD")}${frame("junkM", { fade: true })}${shot("junkPrint")}`, 24)}`));

/* 06 — more live sites */
pages.push(page(`
  ${header("01 — Client work", "More live sites", ["Client &amp; agency work", "All live"])}
  ${body("Seven client sites are live and visitable. Four of them here: contemporary Greek hospitality, a restaurant with its own ordering system, a Melbourne counselling practice, and a food-truck event organiser.")}
  ${media("repeat(4, 1fr)",
    [["yassasD", "yassasMid", "Yassas", "Hospitality · AU"],
     ["mekongD", "mekongMid", "Mekong Merchant", "Restaurant + ordering · AU"],
     ["inbloomD", "inbloomMid", "InBloom Therapy", "Counselling · AU"],
     ["feedmeD", "feedmeMid", "FeedMe Group", "Food-truck events · AU"]]
      .map(([a, b, t, s]) => card(`${shot(a)}${shot(b)}`, t, s)).join(""))}`));

/* 06b — the recent roster */
pages.push(page(`
  ${header("02 — Agency creative", "September and October 2026", ["Agency work", "Your SocialChef", "9 clients shown"])}
  ${body("A recent slice of the roster, each piece set in that client&rsquo;s own type and colour: game-day and festival posters, restaurant content, a franchise recruitment set, a seniors lunch, Christmas tables and Christmas functions, Halloween, Melbourne Cup catering and an A3 order-by-QR print poster.")}
  <div style="display:grid; grid-template-columns:repeat(6, 196px); gap:18px 22px; margin-top:30px;">
    ${[["rKumarsAfl", "Kumar&rsquo;s Sweets"], ["rNavratri", "Kumar&rsquo;s Kitchen"], ["rRenzos", "Renzo&rsquo;s Bar"], ["rRenzosCocktail", "Renzo&rsquo;s Bar"], ["rVictorias", "Victoria&rsquo;s Pizza"], ["rHill", "The Hill"],
        ["rSincero", "Sincero"], ["rLilianas", "Liliana&rsquo;s Trattoria"], ["rGccoQr", "General Chicken Co."], ["rGccoHalloween", "General Chicken Co."], ["rDussehra", "Kumar&rsquo;s Sweets"], ["rJunkCup", "JUNK"]]
      .map(([k, t]) => `<div style="display:flex; flex-direction:column; gap:7px;">
        <div style="width:196px; height:245px; border-radius:8px; overflow:hidden; border:1px solid #2A2521;">${img(k, "cover", "center")}</div>
        <p style="font-family:'JetBrains Mono',monospace; font-size:9px; letter-spacing:.14em; text-transform:uppercase; color:#8C8279;">${t}</p></div>`).join("")}
  </div>`));

/* 06c — creative QA */
pages.push(page(`
  ${header("02 — Agency creative", "Creative QA for the team", ["Senior Graphic Designer", "Your SocialChef", "Since Sep 2026"])}
  ${body("Promoted to Senior Graphic Designer in September 2026. On top of my own accounts, I review the other designers&rsquo; creatives before they reach clients, against six named checks, and report each finding with its fix to the account and project managers. These are the safe-zone templates I built for the team.")}
  ${media("1fr", shot("qaToolkit"), 22)}`));

/* 07 — agency campaign creative */
pages.push(page(`
  ${header("02 — Agency creative", "Campaign work across the roster", ["Agency work", "Your SocialChef", "2023 — Present"])}
  ${body("A sample of client creative delivered at agency pace — hospitality campaigns, seasonal promotions, and retail launches, each holding its own brand&rsquo;s voice while sharing one production system underneath.")}
  <div style="flex:1; min-height:0; display:grid; grid-template-columns:repeat(3, 1fr); grid-template-rows:1fr 1fr; gap:18px; margin-top:26px;">
    ${["yscA", "yscB", "yscC", "yscD", "yscE", "yscF"].map((k) => shot(k)).join("")}
  </div>`));

/* 08 — design systems */
pages.push(page(`
  ${header("02 — Agency creative", "The system underneath", ["Studio design system", "20+ brands"])}
  ${body("Twenty accounts a week only works with architecture: a template system where one layout carries any brand&rsquo;s type, colour, and voice — plus a conversion anatomy for carousels and a hospitality menu-drop format that reuses every week.")}
  <div style="flex:1; min-height:0; display:grid; grid-template-columns:1fr 1fr; grid-template-rows:1fr 1fr; gap:18px; margin-top:26px;">
    ${[["smsFeed", "Feed system"], ["smsAnatomy", "Carousel anatomy"], ["smsMatrix", "One template, four brands"], ["hospMenu", "Menu-drop format"]]
      .map(([k, t]) => `<div style="display:flex; flex-direction:column; gap:8px; min-height:0;">
        ${shot(k)}
        <p style="flex:none; font-family:'JetBrains Mono',monospace; font-size:10px; letter-spacing:.16em; text-transform:uppercase; color:#8C8279;">${t}</p>
      </div>`).join("")}
  </div>`));

/* 09 — Sundry */
pages.push(page(`
  ${header("03 — Brand identity", "Sundry Coffee Co.", ["Concept study — self-initiated", "Identity · Packaging · Print"])}
  ${body("A neighbourhood roaster built on the ritual of slow mornings. The mark is a rising sun with deliberately uneven rays — drawn to behave like a rubber stamp, not a vector file — with Fraunces for letterpress warmth and a palette pulled straight off the counter.")}
  ${media("1.25fr 1fr 1fr", `${frame("sundryHero", { pos: "center" })}${frame("sundryId", { fit: "contain", pos: "center" })}${frame("sundryMenu", { fit: "contain", pos: "center" })}`, 22)}`));

/* 10 — concept series */
pages.push(page(`
  ${header("03 — Brand identity", "Built niche by niche", ["Concept studies — self-initiated", "Not client work"])}
  ${body("Identity systems for the industries I serve, designed as complete systems rather than logos — each one taken from mark and type through packaging, signage, and the places the brand actually lives.")}
  ${media("repeat(4, 1fr)",
    [["sundryHero", "Sundry", "Specialty coffee"], ["asterHero", "Aster House", "Boutique hotel"], ["riptideHero", "Riptide Brew Works", "Craft beverage"], ["seleneHero", "Selene", "Wellness &amp; med-spa"]]
      .map(([k, t, s]) => card(frame(k, { pos: "center" }), t, s)).join(""))}`));

/* 11 — website kits */
pages.push(page(`
  ${header("04 — Products", "Five niche website kits", ["Self-initiated products", "Designed, built, packaged"])}
  ${body("Complete website systems for specific industries — each one a full design system, responsive build, and documentation, produced solo and packaged for sale. Averis carries a revenue-leak calculator and a 14-slide pitch deck; Lumière ships in two themes.")}
  ${media("repeat(5, 1fr)",
    [["averisM", "Averis", "RCM firms"], ["lumiereM", "Lumière", "Med spas"], ["eclatM", "Éclat", "Dental clinics"], ["maisonM", "Maison", "Real estate"], ["espritM", "Esprit", "AI agencies"]]
      .map(([k, t, s]) => card(frame(k, { fade: true }), t, s)).join(""), 16)}`));

/* 12 — apps */
pages.push(page(`
  ${header("04 — Products", "Four working apps", ["Self-initiated products", "Live software"])}
  ${body("Not mockups — running software I designed and built end to end: a gamified SOP tracker shipped as an installable PWA, a 19-metric business dashboard with a reports engine, a local-first outreach CRM, and the medical-billing SOP toolkit that was my first shipped product.")}
  ${media("repeat(4, 1fr)",
    [["sopQuest", "sopQuestB", "SOP Quest", "Gamified SOP tracker · PWA"],
     ["studioOs", "studioOsB", "Studio OS", "Business dashboard + CRM"],
     ["cockpit", "cockpitB", "Outreach Cockpit", "Local-first outreach CRM"],
     ["denial", "denialB", "Denial Defense System", "Medical-billing SOP toolkit"]]
      .map(([a, b, t, s]) => card(`${shot(a)}${shot(b)}`, t, s)).join(""))}`));

/* 13 — motion */
pages.push(page(`
  ${header("05 — Motion", "Short-form for hospitality feeds", ["Motion &amp; video", "F&amp;B"])}
  ${body("Appetite-first reels for restaurant and café feeds — art-directed in-studio with AI-assisted production, then graded and cut for vertical. Stills shown here; the reels play on the site.")}
  <div style="flex:1; min-height:0; display:flex; gap:26px; margin-top:26px; justify-content:center; align-items:stretch;">
    ${[["reelBurger", "Burger"], ["reelSteak", "Steak"], ["reelRamen", "Ramen"], ["reelColdbrew", "Cold brew"]]
      .map(([k, t]) => `<div style="display:flex; flex-direction:column; gap:12px; min-height:0;">
        <div style="flex:1; min-height:0; aspect-ratio:9/16; border-radius:10px; overflow:hidden; background:#171412; border:1px solid #2A2521;">${img(k, "cover", "center")}</div>
        <p style="flex:none; font-family:'JetBrains Mono',monospace; font-size:10px; letter-spacing:.16em; text-transform:uppercase; color:#8C8279;">${t}</p>
      </div>`).join("")}
  </div>`));

/* 14 — closing */
pages.push(page(`
  <div style="position:absolute; inset:0; background:radial-gradient(110% 80% at 22% 82%, rgba(196,85,45,.22), transparent 60%);"></div>
  <div style="position:relative; flex:1; display:flex; flex-direction:column; justify-content:center;">
    <p style="font-family:'JetBrains Mono',monospace; font-size:12px; letter-spacing:.3em; text-transform:uppercase; color:#C4552D;">Thank you for reading</p>
    <h2 style="font-family:'Fraunces',serif; font-weight:600; font-size:76px; line-height:1.05; margin-top:22px; max-width:1150px;">The full portfolio is live — case studies, live sites, and the products in use.</h2>
    <p style="font-family:'Inter',sans-serif; font-size:20px; color:#B8AEA4; margin-top:26px;">vaugn-portfolio.vercel.app</p>
    <div style="display:flex; gap:56px; margin-top:56px; font-family:'Inter',sans-serif; font-size:17px; color:#D6CFC7;">
      <div><p style="font-family:'JetBrains Mono',monospace; font-size:10px; letter-spacing:.2em; text-transform:uppercase; color:#8C8279;">Email</p><p style="margin-top:8px;">vaugn.studio@gmail.com</p></div>
      <div><p style="font-family:'JetBrains Mono',monospace; font-size:10px; letter-spacing:.2em; text-transform:uppercase; color:#8C8279;">LinkedIn</p><p style="margin-top:8px;">linkedin.com/in/vaugn-almeida</p></div>
      <div><p style="font-family:'JetBrains Mono',monospace; font-size:10px; letter-spacing:.2em; text-transform:uppercase; color:#8C8279;">Based</p><p style="margin-top:8px;">Greater Manila Area · Remote worldwide</p></div>
      <div><p style="font-family:'JetBrains Mono',monospace; font-size:10px; letter-spacing:.2em; text-transform:uppercase; color:#8C8279;">Reply time</p><p style="margin-top:8px;">Within 24–48 hours</p></div>
    </div>
  </div>`));

const deck = `<!DOCTYPE html><html><head>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..900;1,9..144,300..900&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap">
<style>
  * { margin:0; padding:0; box-sizing:border-box; }
  body { background:#100E0D; }
  section:last-child { page-break-after:auto; }
  em { font-style:italic; }
</style></head><body>${pages.join("")}</body></html>`;

const deckPage = await browser.newPage({ viewport: { width: 1600, height: 900 } });
await deckPage.setContent(deck, { waitUntil: "networkidle" });
await deckPage.evaluate(() => document.fonts.ready);
await deckPage.waitForTimeout(400);
await deckPage.pdf({ path: OUT, width: "1600px", height: "900px", printBackground: true, pageRanges: `1-${pages.length}` });
await deckPage.close();
await browser.close();
server.close();

const kb = Math.round(fs.statSync(OUT).size / 1024);
console.log(`wrote ${OUT} — ${pages.length} pages, ${kb} KB`);
