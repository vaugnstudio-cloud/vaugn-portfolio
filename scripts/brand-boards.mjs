// Generates designed brand boards (real typography, exact palettes, vector
// marks) for the 6 branding concept showcases. Rendered via Playwright —
// no AI, no fake text, infinitely regenerable.
//   node scripts/brand-boards.mjs
import { chromium } from "playwright";

const OUT = "public/images/branding";

const FONTS =
  "https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,300..900;1,300..900&family=Karla:wght@400;500;700&family=Cormorant+Garamond:wght@400;500;600&family=Jost:wght@300;400;500&family=Archivo+Black&family=Space+Grotesk:wght@400;500;700&family=Marcellus&family=Mulish:wght@300;400;600&family=Manrope:wght@400;600;800&family=Inter:wght@400;500;700&family=Anton&family=JetBrains+Mono:wght@400;500&display=swap";

// ── Per-niche design systems ────────────────────────────────
const NICHES = [
  {
    slug: "specialty-coffee",
    label: "SPECIALTY COFFEE & CAFÉ",
    name: "Sundry",
    sub: "Coffee Co.",
    display: "Fraunces", displayWeight: 500, displayItal: true,
    body: "Karla",
    bg: "#F3E9DC", ink: "#2A1E17", accent: "#C4552D",
    chips: [
      ["Terracotta", "#C4552D"], ["Espresso", "#2A1E17"],
      ["Oat Cream", "#F3E9DC"], ["Roast Sand", "#D9C7B2"],
    ],
    mark: (c) => `<g fill="none" stroke="${c}" stroke-width="14" stroke-linecap="round">
      <circle cx="200" cy="200" r="86" fill="${c}" stroke="none"/>
      ${Array.from({ length: 8 }, (_, i) => {
        const a = (i * Math.PI) / 4;
        const x1 = 200 + Math.cos(a) * 122, y1 = 200 + Math.sin(a) * 122;
        const x2 = 200 + Math.cos(a) * 162, y2 = 200 + Math.sin(a) * 162;
        return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"/>`;
      }).join("")}</g>`,
    app: "menu",
    menu: [["Espresso", "4.0"], ["Batch Filter", "5.5"], ["Oat Flat White", "6.0"], ["Seasonal Pour Over", "8.5"]],
    quote: "Good mornings are brewed, not rushed.",
    offer: "Single-origin drop — Saturday",
  },
  {
    slug: "boutique-hotel",
    label: "BOUTIQUE HOTEL & STAY",
    name: "Aster",
    sub: "House",
    display: "Cormorant Garamond", displayWeight: 500, displayItal: false,
    body: "Jost",
    bg: "#F1EDE2", ink: "#23241F", accent: "#B08D57",
    chips: [
      ["Brass", "#B08D57"], ["Ink Olive", "#23241F"],
      ["Warm Linen", "#F1EDE2"], ["Sage", "#8A9B8A"],
    ],
    mark: (c) => `<g fill="none" stroke="${c}" stroke-width="16" stroke-linecap="round">
      <path d="M120 300 V190 a80 80 0 0 1 160 0 V300"/>
      <path d="M162 300 V200 a38 38 0 0 1 76 0 V300" stroke-width="12"/>
      <line x1="96" y1="300" x2="304" y2="300"/></g>`,
    app: "welcome",
    quote: "Arrive as a guest. Leave as a regular.",
    offer: "Long-stay rates — this autumn",
  },
  {
    slug: "craft-beverage",
    label: "CRAFT BEVERAGE",
    name: "Riptide",
    sub: "Brew Works",
    display: "Archivo Black", displayWeight: 400, displayItal: false,
    body: "Space Grotesk",
    bg: "#F5EED9", ink: "#131313", accent: "#F26B21",
    chips: [
      ["Tangerine", "#F26B21"], ["Deep Teal", "#0E5F63"],
      ["Shore Cream", "#F5EED9"], ["Ink", "#131313"],
    ],
    mark: (c) => `<g fill="none" stroke="${c}" stroke-width="22" stroke-linecap="round">
      <path d="M90 160 q55 -52 110 0 t110 0"/>
      <path d="M90 230 q55 -52 110 0 t110 0" opacity="0.72"/>
      <path d="M90 300 q55 -52 110 0 t110 0" opacity="0.45"/></g>`,
    app: "poster",
    quote: "Loud flavour. Zero apologies.",
    offer: "New wave — citrus session",
  },
  {
    slug: "wellness-medspa",
    label: "WELLNESS & MED-SPA",
    name: "Selene",
    sub: "Skin & Wellness",
    display: "Marcellus", displayWeight: 400, displayItal: false,
    body: "Mulish",
    bg: "#F4EEE5", ink: "#3E4438", accent: "#8C5A2E",
    chips: [
      ["Amber", "#8C5A2E"], ["Deep Moss", "#3E4438"],
      ["Ivory", "#F4EEE5"], ["Travertine", "#CDBFAC"],
    ],
    mark: (c) => `<g fill="none" stroke="${c}" stroke-width="14" stroke-linecap="round">
      <path d="M200 90 q92 76 0 220 q-92 -144 0 -220 Z" fill="${c}" fill-opacity="0.12"/>
      <line x1="200" y1="130" x2="200" y2="272"/></g>`,
    app: "treatments",
    menu: [["Signature Facial", "180"], ["LED Renewal", "120"], ["Dermal Consult", "90"], ["Skin Program · 6 wks", "840"]],
    quote: "Calm is a clinical outcome.",
    offer: "New patient consults open",
  },
  {
    slug: "dental-clinic",
    label: "DENTAL & SPECIALIST CLINIC",
    name: "Arc",
    sub: "Dental Studio",
    display: "Manrope", displayWeight: 800, displayItal: false,
    body: "Inter",
    bg: "#FAFAF7", ink: "#33424C", accent: "#7FC6B5",
    chips: [
      ["Mint", "#7FC6B5"], ["Slate", "#33424C"],
      ["Chalk", "#FAFAF7"], ["Mist Blue", "#C9D4DA"],
    ],
    mark: (c) => `<g fill="none" stroke="${c}" stroke-width="26" stroke-linecap="round">
      <path d="M110 170 a90 90 0 0 0 180 0"/>
      <circle cx="200" cy="292" r="16" fill="${c}" stroke="none"/></g>`,
    app: "appointment",
    quote: "Dentistry that starts with listening.",
    offer: "Same-week new patient visits",
  },
  {
    slug: "fitness-studio",
    label: "FITNESS STUDIO",
    name: "FORM",
    sub: "Strength Studio",
    display: "Anton", displayWeight: 400, displayItal: false,
    body: "Inter",
    bg: "#0D0D0D", ink: "#F4F4F0", accent: "#C8F542",
    dark: true,
    chips: [
      ["Volt", "#C8F542"], ["Carbon", "#0D0D0D"],
      ["Chalk White", "#F4F4F0"], ["Steel", "#3B3B3B"],
    ],
    mark: (c) => `<g stroke="${c}" stroke-width="34" stroke-linecap="round">
      <line x1="130" y1="290" x2="230" y2="110"/>
      <line x1="196" y1="290" x2="296" y2="110" opacity="0.6"/></g>`,
    app: "class",
    quote: "Show up. The rest is reps.",
    offer: "6AM strength block — new",
  },
];

// ── Shared chrome ───────────────────────────────────────────
const base = (n, w, h, inner) => `<!DOCTYPE html><html><head>
<link rel="stylesheet" href="${FONTS}">
<style>
  * { margin:0; padding:0; box-sizing:border-box; }
  html,body { width:${w}px; height:${h}px; background:${n.bg}; overflow:hidden; }
  .board { position:relative; width:100%; height:100%; padding:72px; color:${n.ink};
           font-family:'${n.body}',sans-serif; display:flex; flex-direction:column; }
  .mono { font-family:'JetBrains Mono',monospace; font-size:15px; letter-spacing:.18em;
          text-transform:uppercase; opacity:.55; }
  .chrome-top { display:flex; justify-content:space-between; }
  .chrome-bot { display:flex; justify-content:space-between; margin-top:auto; }
  .display { font-family:'${n.display}',serif; font-weight:${n.displayWeight}; }
</style></head><body><div class="board">
  <div class="chrome-top"><span class="mono">Concept Series — ${n.label}</span><span class="mono">Vaugn · Brand Concept</span></div>
  ${inner}
</div></body></html>`;

// 1 · Logo construction (1200×1200)
const logoBoard = (n) => base(n, 1200, 1200, `
  <div style="flex:1; display:flex; align-items:center; justify-content:center; position:relative;">
    <svg width="640" height="640" viewBox="0 0 400 400">
      <g stroke="${n.ink}" stroke-width="1" opacity="0.22" fill="none" stroke-dasharray="5 7">
        <circle cx="200" cy="200" r="170"/><circle cx="200" cy="200" r="120"/><circle cx="200" cy="200" r="60"/>
        <line x1="200" y1="6" x2="200" y2="394"/><line x1="6" y1="200" x2="394" y2="200"/>
        <line x1="63" y1="63" x2="337" y2="337"/><line x1="337" y1="63" x2="63" y2="337"/>
        <rect x="30" y="30" width="340" height="340"/>
      </g>
      ${n.mark(n.dark ? n.accent : n.ink)}
    </svg>
  </div>
  <div class="chrome-bot">
    <span class="mono">Primary mark — construction grid</span>
    <span class="mono">Clear space · 1×</span>
  </div>`);

// 2 · Palette & typography (1200×1200)
const typeBoard = (n) => base(n, 1200, 1200, `
  <div style="flex:1; display:flex; flex-direction:column; justify-content:center; gap:34px;">
    <div style="display:flex; align-items:baseline; gap:44px;">
      <span class="display" style="font-size:280px; line-height:.9; ${n.displayItal ? "font-style:italic;" : ""}">Aa</span>
      <div>
        <p class="display" style="font-size:52px;">${n.display}</p>
        <p class="mono" style="margin-top:12px;">Display — headlines &amp; marks</p>
        <p style="font-family:'${n.body}'; font-size:34px; margin-top:36px;">${n.body} — Regular / Medium / Bold</p>
        <p class="mono" style="margin-top:12px;">Body — UI, menus &amp; long copy</p>
      </div>
    </div>
    <div style="display:flex; height:300px; border-radius:20px; overflow:hidden; border:2px solid ${n.ink}22;">
      ${n.chips.map(([name, hex]) => {
        const light = ["#F3E9DC","#F1EDE2","#F5EED9","#F4EEE5","#FAFAF7","#C9D4DA","#CDBFAC","#D9C7B2","#F4F4F0","#C8F542","#7FC6B5","#8A9B8A"].includes(hex);
        const tc = light ? "rgba(20,18,14,.82)" : "rgba(250,248,242,.92)";
        return `<div style="flex:1; background:${hex}; padding:26px 24px; display:flex; flex-direction:column; justify-content:flex-end;">
          <p style="color:${tc}; font-weight:600; font-size:23px;">${name}</p>
          <p style="color:${tc}; opacity:.75; font-family:'JetBrains Mono'; font-size:17px; margin-top:6px;">${hex}</p></div>`;
      }).join("")}
    </div>
  </div>
  <div class="chrome-bot"><span class="mono">Palette &amp; typography</span><span class="mono">${n.name} ${n.sub}</span></div>`);

// 3 · Application (1200×1500) — a designed artifact per niche
const appBoard = (n) => {
  const markSm = `<svg width="120" height="120" viewBox="0 0 400 400">${n.mark(n.accent)}</svg>`;
  let card = "";
  if (n.app === "menu" || n.app === "treatments") {
    card = `
      <div style="text-align:center;">${markSm}</div>
      <p class="display" style="font-size:88px; text-align:center; margin-top:8px; ${n.displayItal ? "font-style:italic;" : ""}">${n.name}</p>
      <p class="mono" style="text-align:center; margin-top:10px; opacity:.6;">${n.sub} — ${n.app === "menu" ? "House Menu" : "Treatments"}</p>
      <div style="margin:64px 40px 0; border-top:2px solid ${n.ink}22;">
        ${n.menu.map(([item, price]) => `
          <div style="display:flex; justify-content:space-between; align-items:baseline; padding:34px 6px; border-bottom:2px solid ${n.ink}22;">
            <span style="font-size:34px; font-weight:500;">${item}</span>
            <span class="display" style="font-size:38px; color:${n.accent};">${price}</span>
          </div>`).join("")}
      </div>`;
  } else if (n.app === "welcome") {
    card = `
      <div style="text-align:center; margin-top:40px;">${markSm}</div>
      <p class="display" style="font-size:120px; text-align:center; margin-top:36px;">Welcome</p>
      <p style="font-size:30px; font-weight:300; text-align:center; margin-top:26px; line-height:1.6;">Your room is ready.<br/>Breakfast is served 7–11, slowly.</p>
      <div style="margin-top:72px; display:flex; justify-content:center; gap:18px;">
        <span style="width:52px; height:2px; background:${n.accent}; align-self:center;"></span>
        <span class="mono" style="opacity:.65;">${n.name} ${n.sub}</span>
        <span style="width:52px; height:2px; background:${n.accent}; align-self:center;"></span>
      </div>`;
  } else if (n.app === "poster") {
    card = `
      <p class="display" style="font-size:172px; line-height:.92; color:${n.ink}; margin-top:20px;">RIDE<br/><span style="color:${n.accent};">THE</span><br/>WAVE</p>
      <div style="margin-top:56px;">${markSm}</div>
      <p style="font-family:'${n.body}'; font-size:30px; font-weight:500; margin-top:40px; max-width:520px; line-height:1.45;">Small-batch, big-mouth brews. Poured loud since day one.</p>`;
  } else if (n.app === "appointment") {
    card = `
      ${markSm}
      <p class="display" style="font-size:96px; margin-top:32px;">${n.name} <span style="color:${n.accent};">.</span></p>
      <p style="font-size:30px; opacity:.75; margin-top:8px;">${n.sub}</p>
      <div style="margin-top:80px; display:grid; gap:40px;">
        ${["Patient", "Appointment", "With"].map((l) => `
          <div><p class="mono" style="opacity:.5;">${l}</p><div style="border-bottom:2px solid ${n.ink}33; height:52px;"></div></div>`).join("")}
      </div>`;
  } else {
    card = `
      <p class="display" style="font-size:190px; line-height:.92; color:${n.ink};">TRAIN<br/><span style="color:${n.accent};">HEAVY</span><br/>REST<br/><span style="color:${n.accent};">HARD</span></p>
      <div style="display:flex; align-items:center; gap:26px; margin-top:56px;">
        <svg width="90" height="90" viewBox="0 0 400 400">${n.mark(n.accent)}</svg>
        <p class="mono" style="opacity:.8;">${n.name} ${n.sub} — Class Schedule Inside</p>
      </div>`;
  }
  return base(n, 1200, 1500, `
    <div style="flex:1; display:flex; flex-direction:column; justify-content:center; padding:20px 30px;">${card}</div>
    <div class="chrome-bot"><span class="mono">Application — ${n.app}</span><span class="mono">Concept</span></div>`);
};

// 4 · Social system (1600×1000) — three on-brand template tiles
const socialBoard = (n) => {
  const tile = "flex:1; border-radius:18px; padding:44px; display:flex; flex-direction:column; position:relative; overflow:hidden;";
  const onAccent = n.slug === "fitness-studio" ? "#0D0D0D" : "#FDFBF6";
  return base(n, 1600, 1000, `
    <div style="flex:1; display:flex; gap:26px; margin-top:44px;">
      <div style="${tile} background:${n.ink}; color:${n.dark ? "#0D0D0D" : "#FDFBF6"}; ${n.dark ? `background:${n.ink}; color:#0d0d0d;` : ""}">
        <p class="display" style="font-size:52px; line-height:1.12; ${n.displayItal ? "font-style:italic;" : ""} color:${n.dark ? "#0D0D0D" : "#FDFBF6"};">“${n.quote}”</p>
        <p class="mono" style="margin-top:auto; color:${n.dark ? "#0D0D0D99" : "#FDFBF699"}; opacity:1;">@${n.name.toLowerCase()}</p>
      </div>
      <div style="${tile} background:${n.accent}; align-items:center; justify-content:center;">
        <svg width="260" height="260" viewBox="0 0 400 400">${n.mark(onAccent)}</svg>
      </div>
      <div style="${tile} background:${n.dark ? "#1C1C19" : "#FFFFFF"}; border:2px solid ${n.ink}1f;">
        <p class="mono" style="opacity:.5;">Now</p>
        <p class="display" style="font-size:58px; line-height:1.05; margin-top:18px;">${n.offer}</p>
        <p style="margin-top:auto; font-weight:600; font-size:26px; color:${n.accent};">Learn more →</p>
      </div>
    </div>
    <div class="chrome-bot" style="margin-top:40px;"><span class="mono">Social system — template set</span><span class="mono">${n.name} ${n.sub}</span></div>`);
};

// ── Render ──────────────────────────────────────────────────
const browser = await chromium.launch();
const boards = [
  ["logo", logoBoard, 1200, 1200],
  ["type", typeBoard, 1200, 1200],
  ["application", appBoard, 1200, 1500],
  ["social", socialBoard, 1600, 1000],
];

for (const n of NICHES) {
  for (const [kind, fn, w, h] of boards) {
    const page = await browser.newPage({ viewport: { width: w, height: h } });
    await page.setContent(fn(n), { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(250);
    await page.screenshot({ path: `${OUT}/${n.slug}-${kind}.png` });
    await page.close();
    console.log(`rendered ${n.slug}-${kind}`);
  }
}
await browser.close();
