// Studio template-system boards for the graphic-design showcase pages.
// These are REAL designed template frameworks by Vaugn Studio (honestly
// framed as such in the page copy) — not mocked client posts.
//   node scripts/gd-boards.mjs [name1,name2]   (no args = render all)
import { chromium } from "playwright";
import fs from "node:fs";

const OUT = "public/images/gd";
const FONTS =
  "https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,400..700;1,400..600&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Archivo+Black&family=Marcellus&family=Karla:wght@400;700&family=Space+Grotesk:wght@500;700&family=Anton&display=swap";

// Art-directed photography (Higgsfield, studio-prompted) — base64-embedded
// because file:// subresources are blocked in setContent.
const photo = (name) => {
  const p = `scripts/assets/${name}`;
  return fs.existsSync(p) ? `data:image/png;base64,${fs.readFileSync(p).toString("base64")}` : "";
};
const PH = { coffee: photo("photo-coffee.png"), cornribs: photo("photo-cornribs.png"), taco: photo("photo-taco.png") };
const noise = (o = 0.05) =>
  `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='240' height='240' filter='url(%23n)' opacity='${o}'/%3E%3C/svg%3E")`;

const S = { ink: "#17160F", bone: "#F2EFE8", orange: "#E85D1F", sage: "#8A9B8A", stone: "#CDBFAC", teal: "#0E5F63" };

const shell = (w, h, bg, inner) => `<!DOCTYPE html><html><head>
<link rel="stylesheet" href="${FONTS}">
<style>*{margin:0;padding:0;box-sizing:border-box}h1,h2,h3,p{text-wrap:balance}
body{width:${w}px;height:${h}px;overflow:hidden;${bg}}
.mono{font-family:'JetBrains Mono',monospace;letter-spacing:.15em;text-transform:uppercase}</style>
</head><body>${inner}</body></html>`;

const chrome = (label, right) => `
  <div style="display:flex;justify-content:space-between;color:${S.ink};opacity:.55;">
    <p class="mono" style="font-size:14px;">${label}</p><p class="mono" style="font-size:14px;">${right}</p>
  </div>`;

// A reusable social tile
const tile = (bg, fg, inner, extra = "") =>
  `<div style="background:${bg};color:${fg};border-radius:16px;padding:34px;display:flex;flex-direction:column;position:relative;overflow:hidden;${extra}">${inner}</div>`;

/* ══ SOCIAL MEDIA SYSTEMS (studio palette) ══ */
const boards = {
  // Wide: the 9-tile grid system
  "social-system-grid": [1600, 1000, shell(1600, 1000, `background:${S.bone};background-image:${noise(0.05)};padding:64px;display:flex;flex-direction:column;`, `
    ${chrome("TEMPLATE SYSTEM — FEED GRID FRAMEWORK", "VAUGN STUDIO")}
    <div style="flex:1;display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:36px;">
      ${[
        tile(S.ink, S.bone, `<p style="font-family:'Fraunces';font-style:italic;font-size:34px;line-height:1.2;">“Quote goes here — make it hurt a little.”</p><p class="mono" style="margin-top:auto;font-size:11px;opacity:.6;">01 · QUOTE</p>`),
        tile(S.orange, "#fff", `<p style="font-family:'Inter';font-weight:700;font-size:40px;line-height:1.1;">Big offer, three words.</p><p class="mono" style="margin-top:auto;font-size:11px;opacity:.85;">02 · OFFER</p>`),
        tile("#fff", S.ink, `<p class="mono" style="font-size:11px;color:${S.orange};">TIP NO. 4</p><p style="font-family:'Inter';font-weight:600;font-size:26px;line-height:1.35;margin-top:14px;">One useful thing your audience saves for later.</p><p class="mono" style="margin-top:auto;font-size:11px;opacity:.45;">03 · VALUE</p>`, `border:2px solid ${S.ink}1f;`),
        tile("#fff", S.ink, `<div style="flex:1;border-radius:10px;background:repeating-linear-gradient(45deg,${S.stone}66,${S.stone}66 12px,${S.bone} 12px,${S.bone} 24px);display:flex;align-items:center;justify-content:center;"><p class="mono" style="font-size:12px;opacity:.6;">PHOTO</p></div><p class="mono" style="margin-top:16px;font-size:11px;opacity:.45;">04 · PROOF</p>`, `border:2px solid ${S.ink}1f;`),
        tile(S.ink, S.bone, `<p style="font-family:'Fraunces';font-size:56px;">A</p><p style="font-family:'Inter';font-weight:600;font-size:24px;margin-top:10px;">Anatomy of a post that converts</p><p class="mono" style="margin-top:auto;font-size:11px;color:${S.orange};">05 · CAROUSEL COVER</p>`),
        tile(S.sage, "#fff", `<p style="font-family:'Inter';font-weight:700;font-size:34px;line-height:1.15;">Before → After</p><div style="display:flex;gap:10px;margin-top:20px;"><div style="flex:1;height:90px;border-radius:8px;background:#ffffff44;"></div><div style="flex:1;height:90px;border-radius:8px;background:#ffffff88;"></div></div><p class="mono" style="margin-top:auto;font-size:11px;opacity:.85;">06 · RESULT</p>`),
        tile(S.orange, "#fff", `<p style="font-family:'Fraunces';font-style:italic;font-size:34px;">Ask me anything about X.</p><p class="mono" style="margin-top:auto;font-size:11px;opacity:.85;">07 · ENGAGE</p>`),
        tile("#fff", S.ink, `<p class="mono" style="font-size:11px;color:${S.orange};">MYTH VS FACT</p><div style="margin-top:16px;display:grid;gap:10px;"><div style="height:44px;border-radius:8px;background:${S.ink}0d;"></div><div style="height:44px;border-radius:8px;background:${S.ink}0d;"></div></div><p class="mono" style="margin-top:auto;font-size:11px;opacity:.45;">08 · EDUCATE</p>`, `border:2px solid ${S.ink}1f;`),
        tile(S.ink, S.bone, `<p style="font-family:'Inter';font-weight:700;font-size:30px;">Work with the studio →</p><p style="font-size:17px;opacity:.7;margin-top:12px;">One CTA per nine posts. No more.</p><p class="mono" style="margin-top:auto;font-size:11px;color:${S.orange};">09 · CTA</p>`),
      ].join("")}
    </div>`)],
  // Squares: single templates at scale
  "social-quote-template": [1200, 1200, shell(1200, 1200, `background:${S.ink};background-image:${noise(0.06)};padding:80px;display:flex;flex-direction:column;color:${S.bone};`, `
    <p class="mono" style="font-size:14px;color:${S.orange};">TEMPLATE 01 — QUOTE</p>
    <p style="font-family:'Fraunces';font-style:italic;font-weight:500;font-size:96px;line-height:1.12;margin-top:70px;max-width:11ch;">“The quote layout your clients keep resharing.”</p>
    <div style="margin-top:auto;display:flex;justify-content:space-between;align-items:center;">
      <p class="mono" style="font-size:14px;opacity:.55;">@YOURBRAND</p>
      <div style="width:64px;height:3px;background:${S.orange};"></div>
    </div>`)],
  "social-carousel-template": [1200, 1200, shell(1200, 1200, `background:${S.bone};background-image:${noise(0.05)};padding:70px;display:flex;flex-direction:column;`, `
    ${chrome("TEMPLATE 02 — CAROUSEL FRAMES", "SWIPE SYSTEM")}
    <div style="flex:1;display:flex;gap:26px;margin-top:44px;align-items:stretch;">
      ${["Hook them here.", "Teach one thing per slide.", "Land the CTA."].map((t, i) => `
        <div style="flex:1;background:${i === 2 ? S.orange : "#fff"};color:${i === 2 ? "#fff" : S.ink};border:2px solid ${S.ink}1f;border-radius:18px;padding:34px;display:flex;flex-direction:column;${i === 1 ? "transform:translateY(24px);" : ""}">
          <p class="mono" style="font-size:12px;${i === 2 ? "opacity:.85;" : `color:${S.orange};`}">0${i + 1}/0${3}</p>
          <p style="font-family:'Inter';font-weight:700;font-size:34px;line-height:1.15;margin-top:22px;">${t}</p>
          <p class="mono" style="margin-top:auto;font-size:11px;opacity:.5;">SWIPE →</p>
        </div>`).join("")}
    </div>`)],

  /* ══ HOSPITALITY CONTENT TEMPLATES (warm F&B palette) ══ */
  "hosp-menu-drop": [1600, 1000, shell(1600, 1000, `background:#2A1E17;background-image:${noise(0.07)};padding:64px;display:flex;gap:54px;color:#F3E9DC;`, `
    <div style="flex:1.2;display:flex;flex-direction:column;">
      <p class="mono" style="font-size:14px;color:#E8A13C;">TEMPLATE — MENU DROP</p>
      <p style="font-family:'Fraunces';font-weight:600;font-size:92px;line-height:1.02;margin-top:40px;">New menu. <em style="font-style:italic;color:#E8A13C;">Thursday.</em></p>
      <p style="font-family:'Inter';font-size:26px;opacity:.75;margin-top:26px;max-width:26ch;">Swap the dish, the date, and the photo — the drama is built in.</p>
      <p class="mono" style="margin-top:auto;font-size:13px;opacity:.55;">STORY + FEED + PRINT VARIANTS INCLUDED</p>
    </div>
    <div style="flex:1;display:grid;grid-template-rows:1fr 1fr;gap:22px;">
      <div style="border-radius:16px;overflow:hidden;position:relative;"><img src="${PH.cornribs}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;"/><p class="mono" style="position:absolute;left:16px;bottom:12px;font-size:11px;color:#F3E9DC;background:#1E1713cc;padding:6px 12px;border-radius:99px;">HERO DISH — SHOT FOR THE DROP</p></div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:22px;">
        <div style="border-radius:16px;background:#E8A13C;color:#2A1E17;padding:24px;display:flex;flex-direction:column;"><p style="font-family:'Fraunces';font-weight:600;font-size:30px;">Charred corn ribs · 14</p><p class="mono" style="margin-top:auto;font-size:10px;">FEED TILE</p></div>
        <div style="border-radius:16px;overflow:hidden;position:relative;border:2px solid #F3E9DC22;"><img src="${PH.cornribs}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:70% 40%;"/><p class="mono" style="position:absolute;left:14px;bottom:12px;font-size:10px;color:#F3E9DC;background:#1E1713cc;padding:5px 10px;border-radius:99px;">9:16 STORY CROP</p></div>
      </div>
    </div>`)],
  "hosp-event-story": [1200, 1500, shell(1200, 1500, `background:#0E5F63;background-image:${noise(0.06)};padding:70px;display:flex;flex-direction:column;color:#F5EED9;`, `
    ${`<div style="display:flex;justify-content:space-between;"><p class="mono" style="font-size:14px;opacity:.8;">TEMPLATE — EVENT PROMO · 9:16</p><p class="mono" style="font-size:14px;opacity:.8;">F&amp;B</p></div>`}
    <p style="font-family:'Archivo Black';font-size:120px;line-height:.95;margin-top:80px;">LIVE<br/>MUSIC<br/><span style="color:#F2C94C;">FRI.</span></p>
    <div style="margin-top:70px;border-top:3px solid #F5EED944;padding-top:30px;display:grid;gap:16px;">
      ${["7PM — DOORS", "8PM — FIRST SET", "KITCHEN OPEN LATE"].map((t) => `<p style="font-family:'Inter';font-weight:600;font-size:28px;">${t}</p>`).join("")}
    </div>
    <div style="margin-top:auto;background:#F5EED9;color:#0E5F63;border-radius:14px;padding:24px;text-align:center;"><p style="font-family:'Inter';font-weight:700;font-size:26px;">BOOK A TABLE →</p></div>`)],
  "hosp-special-story": [1200, 1500, shell(1200, 1500, `background:#F3E9DC;background-image:${noise(0.05)};padding:70px;display:flex;flex-direction:column;color:#2A1E17;`, `
    ${chrome("TEMPLATE — WEEKLY SPECIAL · 9:16", "F&B")}
    <div style="flex:1;border-radius:20px;margin-top:40px;overflow:hidden;position:relative;"><img src="${PH.cornribs}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;"/></div>
    <div style="display:flex;justify-content:space-between;align-items:baseline;margin-top:44px;">
      <p style="font-family:'Fraunces';font-weight:600;font-size:64px;">The Wednesday Special</p>
      <p style="font-family:'Fraunces';font-style:italic;font-size:64px;color:#C4552D;">14</p>
    </div>
    <p style="font-family:'Inter';font-size:26px;opacity:.7;margin-top:16px;">Charred corn ribs, lime crema, cotija — gone by nine, every week.</p>`)],
  "hosp-calendar": [1600, 1000, shell(1600, 1000, `background:#F3E9DC;background-image:${noise(0.05)};padding:64px;display:flex;flex-direction:column;color:#2A1E17;`, `
    ${chrome("TEMPLATE SYSTEM — WEEKLY CONTENT CALENDAR", "F&B ENGINE")}
    <div style="flex:1;display:grid;grid-template-columns:repeat(7,1fr);gap:16px;margin-top:40px;">
      ${[["MON", "Menu hero", "#C4552D", "#fff"], ["TUE", "Staff pick", "#fff", "#2A1E17"], ["WED", "Special", "#2A1E17", "#F3E9DC"], ["THU", "Menu drop", "#E8A13C", "#2A1E17"], ["FRI", "Event promo", "#0E5F63", "#F5EED9"], ["SAT", "Full house", "#fff", "#2A1E17"], ["SUN", "Slow brunch", "#8A9B8A", "#fff"]].map(([d, t, bg, fg]) => `
        <div style="background:${bg};color:${fg};border-radius:14px;padding:20px 16px;display:flex;flex-direction:column;${bg === "#fff" ? "border:2px solid #2A1E171f;" : ""}">
          <p class="mono" style="font-size:12px;opacity:.7;">${d}</p>
          <p style="font-family:'Inter';font-weight:700;font-size:21px;line-height:1.2;margin-top:12px;">${t}</p>
          <div style="margin-top:auto;height:52px;border-radius:8px;background:${fg}22;"></div>
        </div>`).join("")}
    </div>
    <p class="mono" style="font-size:13px;opacity:.55;margin-top:32px;">SEVEN SLOTS · THREE FORMATS EACH · POST WITHOUT A DESIGNER ON CALL</p>`)],
};

/* ══ Extra boards: logo-page cover + ACEF engagement overview ══ */
const MARKS = {
  sundry: (c) => `<g fill="${c}"><circle cx="200" cy="200" r="74"/>${Array.from({ length: 12 }, (_, i) => { const a = (i * Math.PI) / 6, l = i % 3 === 0; const r1 = 104, r2 = l ? 168 : 138; return `<line x1="${200 + Math.cos(a) * r1}" y1="${200 + Math.sin(a) * r1}" x2="${200 + Math.cos(a) * r2}" y2="${200 + Math.sin(a) * r2}" stroke="${c}" stroke-width="${l ? 15 : 11}" stroke-linecap="round"/>`; }).join("")}</g>`,
  aster: (c) => `<g fill="none" stroke="${c}" stroke-linecap="round"><path d="M110 310 V190 a90 90 0 0 1 180 0 V310" stroke-width="17"/><path d="M155 310 V205 a45 45 0 0 1 90 0 V310" stroke-width="11"/><line x1="88" y1="310" x2="312" y2="310" stroke-width="13"/><line x1="145" y1="152" x2="255" y2="152" stroke-width="9"/></g>`,
  riptide: (c) => `<g><circle cx="200" cy="200" r="158" fill="none" stroke="${c}" stroke-width="22"/><g fill="none" stroke="${c}" stroke-width="24" stroke-linecap="round"><path d="M96 178 q52 -48 104 0 t104 0"/><path d="M110 250 q45 -42 90 0 t90 0" stroke-width="17" opacity=".85"/></g></g>`,
  selene: (c) => `<g fill="${c}"><path d="M228 62 a150 150 0 1 0 0 276 a138 150 0 0 1 0 -276 Z"/><path d="M258 152 q64 48 0 132 q-30 -66 0 -132 Z" opacity=".55"/></g>`,
  arc: (c) => `<g fill="none" stroke="${c}" stroke-linecap="round"><path d="M96 156 a104 104 0 0 0 208 0" stroke-width="30"/><path d="M148 156 a52 52 0 0 0 104 0" stroke-width="18" opacity=".55"/><circle cx="200" cy="312" r="19" fill="${c}" stroke="none"/></g>`,
  form: (c) => `<g stroke="${c}" stroke-linecap="square"><line x1="128" y1="290" x2="222" y2="112" stroke-width="40"/><line x1="204" y1="290" x2="298" y2="112" stroke-width="40" opacity=".62"/><line x1="128" y1="118" x2="196" y2="118" stroke-width="26"/></g>`,
};

boards["logo-marks-grid"] = [1600, 1000, shell(1600, 1000, `background:${S.bone};background-image:${noise(0.05)};padding:64px;display:flex;flex-direction:column;`, `
  ${chrome("LOGO & IDENTITY — CONCEPT SERIES MARKS", "SIX INDUSTRIES")}
  <div style="flex:1;display:grid;grid-template-columns:repeat(3,1fr);gap:22px;margin-top:36px;">
    ${[["sundry", S.ink], ["aster", "#B08D57"], ["riptide", S.teal], ["selene", "#3E4438"], ["arc", "#33424C"], ["form", S.orange]].map(([k, c]) => `
      <div style="background:#fff;border:2px solid ${S.ink}14;border-radius:18px;display:flex;align-items:center;justify-content:center;">
        <svg width="190" height="190" viewBox="0 0 400 400">${MARKS[k](c)}</svg>
      </div>`).join("")}
  </div>`)];

/* ══ ONE SYSTEM, WORN BY A BRAND — the Sundry feed application ══ */
const SUN = { ink: "#2A1E17", bg: "#F3E9DC", accent: "#C4552D" };
const sunTile = (bg, fg, inner, slot) =>
  `<div style="background:${bg};color:${fg};border-radius:16px;padding:30px;display:flex;flex-direction:column;position:relative;overflow:hidden;">${inner}<p class="mono" style="margin-top:auto;font-size:10px;opacity:.55;">${slot}</p></div>`;
const sunPhoto = (pos, slot) =>
  `<div style="border-radius:16px;position:relative;overflow:hidden;"><img src="${PH.coffee}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:${pos};"/><p class="mono" style="position:absolute;left:14px;bottom:12px;font-size:10px;color:${SUN.bg};background:${SUN.ink}cc;padding:5px 10px;border-radius:99px;">${slot}</p></div>`;

boards["sms-feed-sundry"] = [1600, 1000, shell(1600, 1000, `background:${SUN.bg};background-image:${noise(0.05)};padding:64px;display:flex;flex-direction:column;color:${SUN.ink};`, `
  <div style="display:flex;justify-content:space-between;opacity:.6;">
    <p class="mono" style="font-size:14px;">ONE SYSTEM, WORN BY A BRAND — SUNDRY COFFEE CO.</p>
    <p class="mono" style="font-size:14px;">CONCEPT APPLICATION</p>
  </div>
  <div style="flex:1;display:grid;grid-template-columns:repeat(3,1fr);grid-auto-rows:1fr;gap:18px;margin-top:34px;">
    ${sunPhoto("50% 50%", "01 · PROOF — THE CUP")}
    ${sunTile(SUN.ink, SUN.bg, `<p style="font-family:'Fraunces';font-style:italic;font-size:33px;line-height:1.2;">“Your usual, started already.”</p>`, "02 · QUOTE — HOUSE VOICE")}
    ${sunTile(SUN.accent, SUN.bg, `<p style="font-family:'Karla';font-weight:700;font-size:36px;line-height:1.12;">Batch 47 drops Tuesday.</p><p style="font-family:'Karla';font-size:19px;opacity:.85;margin-top:12px;">250g · whole bean · roasted here</p>`, "03 · OFFER — THE DROP")}
    ${sunTile(SUN.bg, SUN.ink, `<div style="display:flex;align-items:center;justify-content:center;flex:1;"><svg width="120" height="120" viewBox="0 0 400 400">${MARKS.sundry(SUN.accent)}</svg></div><p class="mono" style="font-size:12px;text-align:center;letter-spacing:.4em;">ROASTED TUESDAYS</p>`, "04 · BRAND BLOCK", ) .replace('border-radius:16px;', `border-radius:16px;border:2px solid ${SUN.ink}1f;`)}
    ${sunTile("#fff", SUN.ink, `<p class="mono" style="font-size:11px;color:${SUN.accent};">BREW NOTE Nº 12</p><p style="font-family:'Karla';font-weight:700;font-size:26px;line-height:1.3;margin-top:14px;">Grind coarser than you think. Then one notch more.</p>`, "05 · VALUE — THE SAVE")}
    ${sunPhoto("50% 85%", "06 · PROOF — THE BAG")}
    ${sunTile(SUN.ink, SUN.bg, `<p style="font-family:'Fraunces';font-style:italic;font-size:30px;line-height:1.25;">Milk or none — settle it in the comments.</p>`, "07 · ENGAGE")}
    ${sunTile("#fff", SUN.ink, `<p class="mono" style="font-size:11px;color:${SUN.accent};">THIS WEEK</p><div style="margin-top:14px;display:grid;gap:10px;font-family:'Karla';font-size:20px;"><div style="display:flex;justify-content:space-between;border-bottom:2px solid ${SUN.ink}1a;padding-bottom:8px;"><span style="font-weight:700;">Huila</span><span style="font-family:'Fraunces';font-style:italic;color:${SUN.accent};">6.5</span></div><div style="display:flex;justify-content:space-between;"><span style="font-weight:700;">Corner blend</span><span style="font-family:'Fraunces';font-style:italic;color:${SUN.accent};">5.0</span></div></div>`, "08 · MENU SNIPPET")}
    ${sunTile(SUN.accent, SUN.bg, `<p style="font-family:'Karla';font-weight:700;font-size:30px;line-height:1.15;">Keep your cup.<br/>See you Tuesday →</p>`, "09 · CTA — ONE ASK")}
  </div>`)];

/* ══ CAROUSEL ANATOMY — conversion logic, annotated ══ */
boards["sms-carousel-anatomy"] = [1600, 1000, shell(1600, 1000, `background:${S.bone};background-image:${noise(0.05)};padding:64px;display:flex;flex-direction:column;color:${SUN.ink};`, `
  ${chrome("CAROUSEL SYSTEM — THE CONVERSION ARC, ANNOTATED", "SUNDRY SKIN")}
  <div style="flex:1;display:grid;grid-template-columns:repeat(5,1fr);gap:18px;margin-top:36px;">
    ${[
      [SUN.ink, SUN.bg, `<p class="mono" style="font-size:11px;color:${SUN.accent};">01</p><p style="font-family:'Fraunces';font-style:italic;font-size:30px;line-height:1.18;margin-top:16px;">Your coffee isn't bitter.<br/>It's over-extracted.</p>`, "HOOK", "Earn the stop in 1.5 seconds"],
      [SUN.bg, SUN.ink, `<p class="mono" style="font-size:11px;color:${SUN.accent};">02</p><p style="font-family:'Karla';font-weight:700;font-size:25px;line-height:1.3;margin-top:16px;">Same beans, two minutes apart — completely different cup.</p>`, "CONTEXT", "Name the itch they already feel"],
      ["#fff", SUN.ink, `<p class="mono" style="font-size:11px;color:${SUN.accent};">03</p><div style="margin-top:16px;display:grid;gap:12px;font-family:'Karla';font-weight:700;font-size:21px;"><p>→ Grind coarser</p><p>→ Water off the boil</p><p>→ Pour slower</p></div>`, "VALUE", "The slide they save for later"],
      ["photo", "", "", "PROOF", "Show it — don't claim it"],
      [SUN.accent, SUN.bg, `<p class="mono" style="font-size:11px;opacity:.85;">05</p><p style="font-family:'Karla';font-weight:700;font-size:28px;line-height:1.2;margin-top:16px;">Taste the difference Tuesday.</p><p class="mono" style="font-size:12px;margin-top:14px;">@SUNDRY.COFFEE</p>`, "CTA", "One ask. Only one."],
    ].map(([bg, fg, inner, role, note]) => `
      <div style="display:flex;flex-direction:column;gap:14px;">
        ${bg === "photo"
          ? `<div style="flex:1;border-radius:16px;position:relative;overflow:hidden;"><img src="${PH.coffee}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;"/><p class="mono" style="position:absolute;left:12px;bottom:12px;font-size:10px;color:${SUN.bg};background:${SUN.ink}cc;padding:5px 10px;border-radius:99px;">BATCH 47</p></div>`
          : `<div style="flex:1;background:${bg};color:${fg};border-radius:16px;padding:26px;display:flex;flex-direction:column;${bg === "#fff" || bg === SUN.bg ? `border:2px solid ${SUN.ink}1f;` : ""}">${inner}<p class="mono" style="margin-top:auto;font-size:10px;opacity:.5;">SWIPE →</p></div>`}
        <div style="border-top:3px solid ${SUN.ink};padding-top:10px;">
          <p class="mono" style="font-size:12px;color:${SUN.accent};">${role}</p>
          <p style="font-family:'Inter';font-size:15px;opacity:.7;margin-top:4px;line-height:1.4;">${note}</p>
        </div>
      </div>`).join("")}
  </div>`)];

/* ══ BRAND MATRIX — one template, four skins ══ */
boards["sms-brand-matrix"] = [1600, 1000, shell(1600, 1000, `background:${S.ink};background-image:${noise(0.06)};padding:64px;display:flex;flex-direction:column;color:${S.bone};`, `
  <div style="display:flex;justify-content:space-between;opacity:.7;">
    <p class="mono" style="font-size:14px;color:${S.orange};">ONE TEMPLATE — FOUR BRANDS</p>
    <p class="mono" style="font-size:14px;">SAME BONES · DIFFERENT SOUL</p>
  </div>
  <div style="flex:1;display:grid;grid-template-columns:repeat(4,1fr);gap:20px;margin-top:38px;">
    ${[
      ["#F3E9DC", "#2A1E17", "#C4552D", "Fraunces", `<p style="font-family:'Fraunces';font-style:italic;font-size:34px;line-height:1.15;">Batch 47 drops Tuesday.</p>`, "SUNDRY — COFFEE"],
      ["#0E5F63", "#F5EED9", "#F26B21", "Archivo Black", `<p style="font-family:'Archivo Black';font-size:33px;line-height:1.05;">TIDE'S IN.<br/>NEW BREW.</p>`, "RIPTIDE — CRAFT BEV"],
      ["#F4EEE5", "#3E4438", "#8C5A2E", "Marcellus", `<p style="font-family:'Marcellus';font-size:31px;line-height:1.25;">The quiet hour, extended.</p>`, "SELENE — MED-SPA"],
      ["#0D0D0D", "#F4F4F0", "#C8F542", "Anton", `<p style="font-family:'Anton';font-size:37px;line-height:1.05;">SIX WEEKS.<br/>SHOW UP.</p>`, "FORM — FITNESS"],
    ].map(([bg, fg, ac, font, inner, brand]) => `
      <div style="display:flex;flex-direction:column;gap:14px;">
        <div style="flex:1;background:${bg};color:${fg};border-radius:18px;padding:28px;display:flex;flex-direction:column;">
          <p class="mono" style="font-size:10px;color:${ac};">THE OFFER SLOT</p>
          <div style="margin-top:18px;">${inner}</div>
          <div style="margin-top:auto;display:flex;justify-content:space-between;align-items:center;"><p class="mono" style="font-size:10px;opacity:.6;">SAVE YOURS →</p><div style="width:34px;height:3px;background:${ac};"></div></div>
        </div>
        <div style="border-top:3px solid ${S.bone}33;padding-top:10px;display:flex;justify-content:space-between;align-items:center;">
          <p class="mono" style="font-size:11px;color:${S.orange};">${brand}</p>
          <div style="display:flex;gap:6px;align-items:center;"><span class="mono" style="font-size:10px;opacity:.55;">${font}</span>${[bg, fg, ac].map((c) => `<span style="width:14px;height:14px;border-radius:50%;background:${c};border:1px solid ${S.bone}44;"></span>`).join("")}</div>
        </div>
      </div>`).join("")}
  </div>
  <p class="mono" style="font-size:13px;opacity:.5;margin-top:34px;">THE ARCHITECTURE NEVER CHANGES — TYPE, PALETTE &amp; VOICE DO. THAT'S WHAT LETS 20+ ACCOUNTS POST DAILY WITHOUT DRIFT.</p>`)];

/* ══ HOSPITALITY CAMPAIGN — one launch, one arc ══ */
boards["hsc-launch-set"] = [1600, 1000, shell(1600, 1000, `background:#1E1713;background-image:${noise(0.07)};padding:64px;display:flex;flex-direction:column;color:#F2E7D5;`, `
  <div style="display:flex;justify-content:space-between;opacity:.7;">
    <p class="mono" style="font-size:14px;color:#D96C2C;">CAMPAIGN STUDY — BIRRIA TUESDAY · THE COPPER SKILLET</p>
    <p class="mono" style="font-size:14px;">CONCEPT VENUE · 3-STORY ARC</p>
  </div>
  <div style="flex:1;display:grid;grid-template-columns:repeat(3,1fr);gap:22px;margin-top:36px;">
    <div style="display:flex;flex-direction:column;gap:14px;">
      <div style="flex:1;border-radius:18px;position:relative;overflow:hidden;">
        <img src="${PH.taco}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;"/>
        <div style="position:absolute;inset:0;background:linear-gradient(180deg,#1E171300 30%,#1E1713e6 78%);"></div>
        <div style="position:absolute;left:26px;right:26px;bottom:26px;">
          <p style="font-family:'Archivo Black';font-size:56px;line-height:1;">TOMORROW.</p>
          <p style="font-family:'Inter';font-size:19px;opacity:.85;margin-top:10px;">The pot's already on.</p>
        </div>
      </div>
      <div style="border-top:3px solid #F2E7D5;padding-top:10px;"><p class="mono" style="font-size:12px;color:#D96C2C;">T-MINUS 1 · TEASE</p><p style="font-family:'Inter';font-size:15px;opacity:.7;margin-top:4px;">Anticipation beats announcement</p></div>
    </div>
    <div style="display:flex;flex-direction:column;gap:14px;">
      <div style="flex:1;border-radius:18px;background:#D96C2C;color:#1E1713;padding:30px;display:flex;flex-direction:column;">
        <p class="mono" style="font-size:12px;">EVERY TUESDAY</p>
        <p style="font-family:'Archivo Black';font-size:52px;line-height:.98;margin-top:18px;">BIRRIA<br/>TUESDAY</p>
        <div style="margin-top:auto;">
          <div style="display:flex;justify-content:space-between;align-items:baseline;border-top:3px solid #1E1713;padding-top:16px;"><p style="font-family:'Inter';font-weight:700;font-size:24px;">3 tacos + consomé</p><p style="font-family:'Fraunces';font-style:italic;font-size:40px;">12</p></div>
          <p class="mono" style="font-size:12px;margin-top:10px;">6PM TIL GONE · DINE IN ONLY</p>
        </div>
      </div>
      <div style="border-top:3px solid #F2E7D5;padding-top:10px;"><p class="mono" style="font-size:12px;color:#D96C2C;">DROP DAY · THE OFFER</p><p style="font-family:'Inter';font-size:15px;opacity:.7;margin-top:4px;">One dish, one price, one rule</p></div>
    </div>
    <div style="display:flex;flex-direction:column;gap:14px;">
      <div style="flex:1;border-radius:18px;border:2px solid #F2E7D533;padding:30px;display:flex;flex-direction:column;">
        <p class="mono" style="font-size:12px;color:#D96C2C;">8:04 PM</p>
        <p style="font-family:'Archivo Black';font-size:46px;line-height:1.02;margin-top:18px;">LAST<br/>TABLES.</p>
        <p style="font-family:'Inter';font-size:19px;opacity:.75;margin-top:16px;">Walk-ins after nine. Maybe.</p>
        <div style="margin-top:auto;background:#F2E7D5;color:#1E1713;border-radius:12px;padding:18px;text-align:center;"><p style="font-family:'Inter';font-weight:700;font-size:20px;">BOOK THE LAST ONE →</p></div>
      </div>
      <div style="border-top:3px solid #F2E7D5;padding-top:10px;"><p class="mono" style="font-size:12px;color:#D96C2C;">SERVICE · SCARCITY, EARNED</p><p style="font-family:'Inter';font-size:15px;opacity:.7;margin-top:4px;">True urgency — posted live, never faked</p></div>
    </div>
  </div>`)];

boards["acef-overview"] = [1600, 1000, shell(1600, 1000, `background:#10273D;background-image:${noise(0.06)};padding:70px;display:flex;flex-direction:column;color:#EDF2F6;`, `
  <div style="display:flex;justify-content:space-between;">
    <p class="mono" style="font-size:14px;color:#D9A441;">ENGAGEMENT OVERVIEW — ACEF ENTERPRISES</p>
    <p class="mono" style="font-size:14px;opacity:.55;">HEALTHCARE BILLING · USA · 2024–2025</p>
  </div>
  <p style="font-family:'Fraunces';font-weight:500;font-size:74px;line-height:1.05;margin-top:52px;max-width:16ch;">A print-first marketing suite for clinical credibility.</p>
  <div style="flex:1;display:grid;grid-template-columns:repeat(4,1fr);gap:20px;margin-top:56px;">
    ${[["Trifold brochure", "The core sales piece — service lines, process, proof"], ["Roll-up banner", "Conference-stand presence at reading distance"], ["Calling-card system", "A card format the whole team shares"], ["Instagram Stories", "The suite, translated to social"]].map(([t, d], i) => `
      <div style="background:#16334F;border:1px solid #2C4A66;border-radius:16px;padding:28px 24px;display:flex;flex-direction:column;">
        <p class="mono" style="font-size:12px;color:#D9A441;">0${i + 1}</p>
        <p style="font-family:'Inter';font-weight:700;font-size:24px;margin-top:14px;">${t}</p>
        <p style="font-family:'Inter';font-size:16px;opacity:.65;margin-top:10px;line-height:1.5;">${d}</p>
      </div>`).join("")}
  </div>
  <p class="mono" style="font-size:13px;opacity:.5;margin-top:40px;">DESIGNED TO READ AS CREDIBLE TO OFFICE MANAGERS &amp; HOSPITAL ADMINISTRATORS</p>`)];

const browser = await chromium.launch();
// Optional CLI filter: comma-separated board names, e.g.
//   node scripts/gd-boards.mjs sms-feed-sundry,hosp-menu-drop
const only = process.argv[2] ? process.argv[2].split(",") : null;
for (const [name, [w, h, html]] of Object.entries(boards)) {
  if (only && !only.includes(name)) continue;
  const page = await browser.newPage({ viewport: { width: w, height: h } });
  await page.setContent(html, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(220);
  await page.screenshot({ path: `${OUT}/${name}.png` });
  await page.close();
  console.log(`rendered ${name}`);
}
await browser.close();
