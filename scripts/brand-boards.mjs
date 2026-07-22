// ROUND 4 — Bespoke brand systems. Each brand has its OWN board language:
// no shared chrome, no template. Also renders clean logo lockups used as
// reference images for Higgsfield photography (so real marks appear in shots).
//   node scripts/brand-boards.mjs
import { chromium } from "playwright";

const OUT = "public/images/branding";

const FONTS =
  "https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,300..900;1,300..900&family=Karla:wght@400;500;700&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Jost:wght@300;400;500&family=Archivo+Black&family=Space+Grotesk:wght@400;500;700&family=Marcellus&family=Mulish:wght@300;400;600&family=Manrope:wght@400;600;800&family=Inter:wght@400;500;700&family=Anton&family=JetBrains+Mono:wght@400;500&display=swap";

// Paper grain / noise texture as data-URI (SVG feTurbulence)
const noise = (opacity = 0.05) =>
  `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='240' height='240' filter='url(%23n)' opacity='${opacity}'/%3E%3C/svg%3E")`;

const shell = (bodyCss, inner) => `<!DOCTYPE html><html><head>
<link rel="stylesheet" href="${FONTS}">
<style>
  * { margin:0; padding:0; box-sizing:border-box; }
  h1,h2,h3,p { text-wrap: balance; }
  .prose { text-wrap: pretty; }
  body { ${bodyCss} overflow:hidden; }
  .mono { font-family:'JetBrains Mono',monospace; letter-spacing:.16em; text-transform:uppercase; }
</style></head><body>${inner}</body></html>`;

/* ══ MARKS — crafted SVG, one per brand ══════════════════════ */
const MARKS = {
  sundry: (c, s = 1) => `<g transform="scale(${s})" fill="${c}">
    <circle cx="200" cy="200" r="74"/>
    ${Array.from({ length: 12 }, (_, i) => {
      const a = (i * Math.PI) / 6, long = i % 3 === 0;
      const r1 = 104, r2 = long ? 168 : 138;
      return `<line x1="${200 + Math.cos(a) * r1}" y1="${200 + Math.sin(a) * r1}" x2="${200 + Math.cos(a) * r2}" y2="${200 + Math.sin(a) * r2}" stroke="${c}" stroke-width="${long ? 15 : 11}" stroke-linecap="round"/>`;
    }).join("")}</g>`,
  aster: (c, s = 1) => `<g transform="scale(${s})" fill="none" stroke="${c}" stroke-linecap="round">
    <path d="M110 310 V190 a90 90 0 0 1 180 0 V310" stroke-width="17"/>
    <path d="M155 310 V205 a45 45 0 0 1 90 0 V310" stroke-width="11"/>
    <line x1="88" y1="310" x2="312" y2="310" stroke-width="13"/>
    <line x1="145" y1="152" x2="255" y2="152" stroke-width="9"/></g>`,
  riptide: (c, s = 1) => `<g transform="scale(${s})">
    <circle cx="200" cy="200" r="158" fill="none" stroke="${c}" stroke-width="22"/>
    <g fill="none" stroke="${c}" stroke-width="24" stroke-linecap="round">
      <path d="M96 178 q52 -48 104 0 t104 0"/>
      <path d="M110 250 q45 -42 90 0 t90 0" stroke-width="17" opacity=".85"/></g></g>`,
  selene: (c, s = 1) => `<g transform="scale(${s})" fill="${c}">
    <path d="M228 62 a150 150 0 1 0 0 276 a138 150 0 0 1 0 -276 Z"/>
    <path d="M258 152 q64 48 0 132 q-30 -66 0 -132 Z" opacity=".55"/></g>`,
  arc: (c, s = 1) => `<g transform="scale(${s})" fill="none" stroke="${c}" stroke-linecap="round">
    <path d="M96 156 a104 104 0 0 0 208 0" stroke-width="30"/>
    <path d="M148 156 a52 52 0 0 0 104 0" stroke-width="18" opacity=".55"/>
    <circle cx="200" cy="312" r="19" fill="${c}" stroke="none"/></g>`,
  form: (c, s = 1) => `<g transform="scale(${s})" stroke="${c}" stroke-linecap="square">
    <line x1="128" y1="300" x2="222" y2="112" stroke-width="40"/>
    <line x1="204" y1="300" x2="298" y2="112" stroke-width="40" opacity=".62"/>
    <line x1="128" y1="118" x2="196" y2="118" stroke-width="26"/></g>`,
};

/* ══ BRAND DEFINITIONS ═══════════════════════════════════════ */
const B = {
  sundry: {
    slug: "specialty-coffee", mark: MARKS.sundry,
    ink: "#2A1E17", bg: "#F3E9DC", accent: "#C4552D", sand: "#D9C7B2",
    display: "Fraunces", body: "Karla",
  },
  aster: {
    slug: "boutique-hotel", mark: MARKS.aster,
    ink: "#23241F", bg: "#F1EDE2", accent: "#B08D57", olive: "#3A3D33",
    display: "Cormorant Garamond", body: "Jost",
  },
  riptide: {
    slug: "craft-beverage", mark: MARKS.riptide,
    ink: "#131313", bg: "#F5EED9", accent: "#F26B21", teal: "#0E5F63",
    display: "Archivo Black", body: "Space Grotesk",
  },
  selene: {
    slug: "wellness-medspa", mark: MARKS.selene,
    ink: "#3E4438", bg: "#F4EEE5", accent: "#8C5A2E", stone: "#CDBFAC",
    display: "Marcellus", body: "Mulish",
  },
  arc: {
    slug: "dental-clinic", mark: MARKS.arc,
    ink: "#33424C", bg: "#FAFAF7", accent: "#7FC6B5", mist: "#C9D4DA",
    display: "Manrope", body: "Inter",
  },
  form: {
    slug: "fitness-studio", mark: MARKS.form,
    ink: "#F4F4F0", bg: "#0D0D0D", accent: "#C8F542", steel: "#3B3B3B",
    display: "Anton", body: "Inter",
  },
};

const svg = (mark, color, size, vb = 400) =>
  `<svg width="${size}" height="${size}" viewBox="0 0 ${vb} ${vb}">${mark(color)}</svg>`;

/* ══ LOCKUPS (1200×1200, clean — AI reference images) ════════ */
const lockups = {
  sundry: (b) => shell(`background:#FFFDF8; width:1200px; height:1200px; display:flex; align-items:center; justify-content:center;`, `
    <div style="text-align:center; color:${b.ink};">
      ${svg(b.mark, b.accent, 420)}
      <p style="font-family:'Fraunces'; font-weight:600; font-size:150px; letter-spacing:.06em; margin-top:24px;">SUNDRY</p>
      <p class="mono" style="font-size:26px; margin-top:14px; letter-spacing:.5em;">COFFEE CO.</p>
    </div>`),
  aster: (b) => shell(`background:#FFFEFA; width:1200px; height:1200px; display:flex; align-items:center; justify-content:center;`, `
    <div style="text-align:center; color:${b.ink};">
      ${svg(b.mark, b.accent, 380)}
      <p style="font-family:'Cormorant Garamond'; font-weight:500; font-size:160px; letter-spacing:.14em; margin-top:30px;">ASTER</p>
      <p class="mono" style="font-size:26px; margin-top:8px; letter-spacing:.62em;">HOUSE</p>
    </div>`),
  riptide: (b) => shell(`background:#FFFEF9; width:1200px; height:1200px; display:flex; align-items:center; justify-content:center;`, `
    <div style="text-align:center; color:${b.ink};">
      ${svg(b.mark, b.teal, 400)}
      <p style="font-family:'Archivo Black'; font-size:140px; letter-spacing:.01em; margin-top:20px; color:${b.accent}; -webkit-text-stroke:5px ${b.ink};">RIPTIDE</p>
      <p class="mono" style="font-size:26px; margin-top:10px; letter-spacing:.44em;">BREW WORKS</p>
    </div>`),
  selene: (b) => shell(`background:#FFFEFB; width:1200px; height:1200px; display:flex; align-items:center; justify-content:center;`, `
    <div style="text-align:center; color:${b.ink};">
      ${svg(b.mark, b.ink, 380)}
      <p style="font-family:'Marcellus'; font-size:150px; letter-spacing:.2em; margin-top:26px;">SELENE</p>
      <p class="mono" style="font-size:24px; margin-top:12px; letter-spacing:.5em;">SKIN &amp; WELLNESS</p>
    </div>`),
  arc: (b) => shell(`background:#FFFFFF; width:1200px; height:1200px; display:flex; align-items:center; justify-content:center;`, `
    <div style="display:flex; align-items:center; gap:70px; color:${b.ink};">
      ${svg(b.mark, b.ink, 360)}
      <div>
        <p style="font-family:'Manrope'; font-weight:800; font-size:190px; letter-spacing:-.02em;">Arc</p>
        <p class="mono" style="font-size:26px; letter-spacing:.4em; margin-top:6px;">DENTAL STUDIO</p>
      </div>
    </div>`),
  form: (b) => shell(`background:#0D0D0D; width:1200px; height:1200px; display:flex; align-items:center; justify-content:center;`, `
    <div style="text-align:center;">
      ${svg(b.mark, b.accent, 380)}
      <p style="font-family:'Anton'; font-size:230px; color:${b.ink}; letter-spacing:.04em; margin-top:10px;">FORM</p>
      <p class="mono" style="font-size:26px; color:${b.accent}; letter-spacing:.6em; margin-top:8px;">STRENGTH STUDIO</p>
    </div>`),
};

/* ══ BESPOKE BOARDS — two per brand, unique language ═════════ */
const boards = {
  /* SUNDRY — letterpress stamp sheet + hand-set label study */
  "sundry-identity": (b) => shell(`background:${b.bg}; background-image:${noise(0.07)}; width:1200px; height:1200px;`, `
    <div style="width:100%; height:100%; padding:90px; color:${b.ink}; position:relative;">
      <p class="mono" style="font-size:15px; opacity:.5;">SUNDRY COFFEE CO. — MARK &amp; STAMPS</p>
      <div style="display:grid; grid-template-columns:repeat(3,1fr); gap:40px; margin-top:70px;">
        ${[
          [b.accent, 0, 1], [b.ink, -8, 0.85], [b.sand, 5, 0.9],
          [b.ink, 10, 0.8], [b.accent, -5, 1.05], [b.accent, 0, 0.7],
        ].map(([c, rot, sc]) => `
          <div style="aspect-ratio:1; border:2px dashed ${b.ink}33; border-radius:14px; display:flex; align-items:center; justify-content:center; transform:rotate(${rot}deg);">
            ${svg(b.mark, c, 200 * sc)}
          </div>`).join("")}
      </div>
      <div style="display:flex; justify-content:space-between; align-items:flex-end; margin-top:76px;">
        <p style="font-family:'Fraunces'; font-style:italic; font-weight:400; font-size:54px; max-width:640px; line-height:1.15;" class="prose">A sun that rises slowly — stamped by hand, never printed in a hurry.</p>
        <p class="mono" style="font-size:15px; opacity:.5;">EST. CORNER OF 5TH</p>
      </div>
    </div>`),
  "sundry-application": (b) => shell(`background:${b.accent}; background-image:${noise(0.08)}; width:1200px; height:1200px; display:flex; align-items:center; justify-content:center; position:relative;`, `
    <div style="position:absolute; top:52px; left:52px; opacity:.35;">${svg(b.mark, b.bg, 120)}</div>
    <div style="position:absolute; bottom:52px; right:52px; opacity:.35; transform:rotate(14deg);">${svg(b.mark, b.bg, 96)}</div>
    <p class="mono" style="position:absolute; top:66px; right:64px; font-size:14px; color:${b.bg}; opacity:.75;">HOUSE MENU — NO. 47</p>
    <p class="mono" style="position:absolute; bottom:70px; left:64px; font-size:14px; color:${b.bg}; opacity:.75;">SUNDRY COFFEE CO.</p>
    <div style="width:880px; height:1000px; background:${b.bg}; background-image:${noise(0.06)}; border-radius:10px; padding:52px 66px 44px; color:${b.ink}; box-shadow:0 44px 90px rgba(30,15,5,.4); transform:rotate(-1.2deg); display:flex; flex-direction:column;">
      <div style="display:flex; align-items:center; justify-content:center; gap:26px;">
        <span style="flex:1; height:2px; background:${b.ink}33;"></span>
        ${svg(b.mark, b.accent, 76)}
        <span style="flex:1; height:2px; background:${b.ink}33;"></span>
      </div>
      <p style="font-family:'Fraunces'; font-weight:600; font-size:58px; text-align:center; letter-spacing:.08em; margin-top:8px;">SUNDRY</p>
      <p class="mono" style="font-size:13px; text-align:center; letter-spacing:.5em; margin-top:6px; opacity:.6;">ROASTED TUESDAYS</p>
      <p class="mono" style="font-size:13px; letter-spacing:.34em; color:${b.accent}; border-top:4px solid ${b.ink}; margin-top:26px; padding-top:18px;">THE BEANS</p>
      <div style="display:flex; flex-direction:column;">
        ${[["Single origin — Huila", "Washed · honey &amp; stone fruit", "6.5"], ["House blend — Corner", "Comfort first · chocolate &amp; malt", "5.0"], ["Seasonal — Kayanza", "Bright · currant &amp; black tea", "7.0"]].map(([a, d, p]) => `
          <div style="display:flex; justify-content:space-between; align-items:baseline; padding:17px 4px; border-bottom:2px solid ${b.ink}22;">
            <div>
              <p style="font-family:'Karla'; font-weight:700; font-size:28px;">${a}</p>
              <p style="font-family:'Karla'; font-size:19px; opacity:.65; margin-top:5px;">${d}</p>
            </div>
            <p style="font-family:'Fraunces'; font-style:italic; font-size:34px; color:${b.accent};">${p}</p>
          </div>`).join("")}
      </div>
      <p class="mono" style="font-size:13px; letter-spacing:.34em; color:${b.accent}; margin-top:24px;">AT THE COUNTER</p>
      <div style="display:flex; flex-direction:column;">
        ${[["Espresso · Long black", "Your usual, started already", "4.0"], ["Flat white · Batch filter", "Slow mornings encouraged", "4.5"], ["Sundry toastie", "Sourdough · aged cheddar &amp; pickle", "8.0"]].map(([a, d, p]) => `
          <div style="display:flex; justify-content:space-between; align-items:baseline; padding:17px 4px; border-bottom:2px solid ${b.ink}22;">
            <div>
              <p style="font-family:'Karla'; font-weight:700; font-size:28px;">${a}</p>
              <p style="font-family:'Karla'; font-size:19px; opacity:.65; margin-top:5px;">${d}</p>
            </div>
            <p style="font-family:'Fraunces'; font-style:italic; font-size:34px; color:${b.accent};">${p}</p>
          </div>`).join("")}
      </div>
      <div style="flex:1;"></div>
      <p class="mono" style="font-size:13px; text-align:center; letter-spacing:.4em; opacity:.55;">250G · WHOLE BEAN · BATCH 47 · KEEP YOUR CUP</p>
    </div>`),

  /* ASTER — brass engraving on olive + stationery spec */
  "aster-identity": (b) => shell(`background:${b.olive}; background-image:${noise(0.05)}; width:1200px; height:1200px; display:flex; align-items:center; justify-content:center;`, `
    <div style="text-align:center; position:relative;">
      <div style="position:absolute; inset:-120px; border:1px solid ${b.accent}44; border-radius:50%;"></div>
      <div style="position:absolute; inset:-70px; border:1px solid ${b.accent}66; border-radius:50%;"></div>
      ${svg(b.mark, b.accent, 400)}
      <p style="font-family:'Cormorant Garamond'; font-weight:500; font-size:100px; letter-spacing:.2em; color:#EFE9DA; margin-top:44px;">ASTER</p>
      <p class="mono" style="font-size:20px; letter-spacing:.7em; color:${b.accent}; margin-top:10px;">HOUSE</p>
      <p style="font-family:'Cormorant Garamond'; font-style:italic; font-size:32px; color:#EFE9DAcc; margin-top:52px;" class="prose">Arrive a guest. Leave a regular.</p>
    </div>`),
  "aster-application": (b) => shell(`background:${b.bg}; background-image:${noise(0.04)}; width:1200px; height:1200px; padding:80px; display:flex; gap:44px; align-items:center; justify-content:center;`, `
    <div style="width:470px; height:660px; background:#FBF8F0; box-shadow:0 30px 60px rgba(30,30,20,.18); padding:60px 50px; text-align:center; color:${b.ink};">
      ${svg(b.mark, b.accent, 120)}
      <p style="font-family:'Cormorant Garamond'; font-size:54px; letter-spacing:.18em; margin-top:22px;">ASTER</p>
      <div style="width:60px; height:1px; background:${b.accent}; margin:36px auto;"></div>
      <p style="font-family:'Jost'; font-weight:300; font-size:24px; line-height:1.7;" class="prose">Rooms from the quiet side of the street. Breakfast until eleven, unhurried.</p>
      <p class="mono" style="font-size:13px; letter-spacing:.4em; margin-top:52px; opacity:.55;">ROOM NO. ——</p>
    </div>
    <div style="width:470px; height:660px; background:${b.olive}; box-shadow:0 30px 60px rgba(30,30,20,.25); padding:60px 50px; display:flex; flex-direction:column; align-items:center; justify-content:center;">
      ${svg(b.mark, b.accent, 190)}
      <p class="mono" style="font-size:15px; letter-spacing:.55em; color:${b.accent}; margin-top:40px;">DO NOT DISTURB</p>
      <p style="font-family:'Cormorant Garamond'; font-style:italic; font-size:30px; color:#EFE9DA; margin-top:18px;">— we understand.</p>
    </div>`),

  /* RIPTIDE — zine collage + sticker sheet */
  "riptide-identity": (b) => shell(`background:${b.bg}; background-image:${noise(0.06)}; width:1200px; height:1200px; overflow:hidden;`, `
    <div style="width:100%; height:100%; position:relative; color:${b.ink};">
      <div style="position:absolute; top:-60px; right:-80px; width:520px; height:520px; background:${b.teal}; border-radius:50%;"></div>
      <div style="position:absolute; bottom:-110px; left:-70px; width:520px; height:520px; background:${b.accent}; transform:rotate(12deg);"></div>
      <div style="position:absolute; top:0; left:0; right:0; height:100%; background:radial-gradient(${b.teal}40 3px, transparent 3px); background-size:30px 30px; clip-path:polygon(0 44%, 100% 34%, 100% 66%, 0 76%);"></div>
      <p style="font-family:'Archivo Black'; font-size:300px; line-height:.88; transform:rotate(-4deg); position:absolute; top:60px; left:70px; color:${b.accent}; -webkit-text-stroke:8px ${b.ink};">RIP<br/>TIDE</p>
      <div style="position:absolute; top:84px; right:92px; transform:rotate(8deg);">${svg(b.mark, "#FFFEF9", 300)}</div>
      <div style="position:absolute; top:585px; right:210px; background:#FFFEF9; border:7px solid ${b.ink}; border-radius:50%; width:250px; height:250px; display:flex; align-items:center; justify-content:center; transform:rotate(10deg); box-shadow:0 18px 40px rgba(10,10,10,.25);">
        <p style="font-family:'Archivo Black'; font-size:46px; text-align:center; transform:rotate(-10deg);">100%<br/>LOUD</p>
      </div>
      <div style="position:absolute; top:548px; right:64px; width:130px; height:44px; background:${b.ink}22; transform:rotate(38deg);"></div>
      <div style="position:absolute; bottom:210px; right:70px; background:${b.ink}; color:${b.bg}; padding:28px 46px; transform:rotate(-5deg); font-family:'Space Grotesk'; font-weight:700; font-size:40px; box-shadow:0 16px 36px rgba(10,10,10,.3);">SMALL BATCH. BIG MOUTH.</div>
      <div style="position:absolute; bottom:96px; left:96px; transform:rotate(-8deg); background:#FFFEF9; border:5px solid ${b.ink}; padding:18px 30px;">
        <p style="font-family:'Space Grotesk'; font-weight:700; font-size:26px; letter-spacing:.14em;">EST. THE SHORE — 473ML</p>
      </div>
      <div style="position:absolute; bottom:64px; right:110px; display:flex; gap:5px; align-items:flex-end; transform:rotate(-5deg);">
        ${[38, 22, 44, 18, 34, 26, 42, 20, 36, 24, 40].map((h) => `<span style="width:9px; height:${h}px; background:${b.ink};"></span>`).join("")}
      </div>
      <p class="mono" style="position:absolute; bottom:34px; left:110px; font-size:15px; opacity:.65;">RIPTIDE BREW WORKS — IDENTITY, LOUD</p>
    </div>`),
  "riptide-application": (b) => shell(`background:${b.teal}; background-image:${noise(0.06)}; width:1200px; height:1200px; padding:70px; display:flex; flex-direction:column;`, `
    <div style="display:flex; justify-content:space-between; align-items:center; color:#FFFEF9;">
      <p class="mono" style="font-size:16px;">STICKER SHEET — CUT LOUD</p>
      <p class="mono" style="font-size:16px;">PEEL &amp; SLAP · SHEET 01</p>
    </div>
    <div style="flex:1; display:grid; grid-template-columns:repeat(3,1fr); grid-template-rows:repeat(3,1fr); gap:34px; margin-top:44px; color:#FFFEF9;">
      ${[
        `<div style="background:${b.accent}; border-radius:50%; display:flex; align-items:center; justify-content:center; border:8px solid #FFFEF9; transform:rotate(-6deg);">${svg(B.riptide.mark, "#FFFEF9", 190)}</div>`,
        `<div style="background:#FFFEF9; display:flex; align-items:center; justify-content:center; transform:rotate(4deg); border-radius:22px;"><p style="font-family:'Archivo Black'; font-size:62px; color:${b.teal}; transform:rotate(-8deg);">GULP.</p></div>`,
        `<div style="background:${b.ink}; display:flex; align-items:center; justify-content:center; border-radius:50%; transform:rotate(6deg);">${svg(B.riptide.mark, b.accent, 185)}</div>`,
        `<div style="background:${b.accent}; display:flex; align-items:center; justify-content:center; transform:rotate(-3deg); clip-path:polygon(50% 0,100% 25%,100% 75%,50% 100%,0 75%,0 25%);"><p style="font-family:'Archivo Black'; font-size:48px; color:${b.ink};">FRESH</p></div>`,
        `<div style="background:#FFFEF9; border-radius:50%; display:flex; flex-direction:column; align-items:center; justify-content:center; border:10px dashed ${b.accent}; transform:rotate(2deg);"><p style="font-family:'Archivo Black'; font-size:42px; color:${b.ink}; text-align:center;">WAVE<br/>NO.3</p></div>`,
        `<div style="background:${b.ink}; display:flex; align-items:center; justify-content:center; border-radius:22px; transform:rotate(-5deg);"><p style="font-family:'Space Grotesk'; font-weight:700; font-size:38px; color:#FFFEF9; text-align:center;">DRINK<br/>LOUD →</p></div>`,
        `<div style="background:#FFFEF9; display:flex; align-items:center; justify-content:center; transform:rotate(5deg); border-radius:50%; border:8px solid ${b.ink};"><p style="font-family:'Archivo Black'; font-size:36px; color:${b.accent}; text-align:center; transform:rotate(-5deg);">SALT<br/>WATER</p></div>`,
        `<div style="background:${b.accent}; display:flex; align-items:center; justify-content:center; border-radius:22px; transform:rotate(-4deg); border:6px solid #FFFEF9;">${svg(B.riptide.mark, b.ink, 165)}</div>`,
        `<div style="background:${b.ink}; display:flex; align-items:center; justify-content:center; transform:rotate(3deg); clip-path:polygon(50% 0,100% 25%,100% 75%,50% 100%,0 75%,0 25%);"><p style="font-family:'Archivo Black'; font-size:34px; color:${b.accent}; text-align:center;">NO.<br/>473</p></div>`,
      ].join("")}
    </div>
    <div style="display:flex; justify-content:space-between; align-items:center; margin-top:40px; border-top:3px dashed #FFFEF966; padding-top:26px; color:#FFFEF9;">
      <p class="mono" style="font-size:15px;">RIPTIDE BREW WORKS</p>
      <div style="display:flex; gap:5px; align-items:flex-end;">
        ${[30, 18, 36, 14, 28, 22, 34, 16, 30].map((h) => `<span style="width:8px; height:${h}px; background:#FFFEF9;"></span>`).join("")}
      </div>
    </div>`),

  /* SELENE — arch composition + ritual card */
  "selene-identity": (b) => shell(`background:${b.bg}; width:1200px; height:1200px; padding:90px; display:flex; gap:70px;`, `
    <div style="flex:1.1; background:${b.stone}55; border-radius:340px 340px 0 0; display:flex; align-items:center; justify-content:center; border:1px solid ${b.ink}22;">
      ${svg(b.mark, b.ink, 330)}
    </div>
    <div style="flex:1; color:${b.ink}; display:flex; flex-direction:column; justify-content:center;">
      <p class="mono" style="font-size:15px; opacity:.5;">SELENE — IDENTITY</p>
      <p style="font-family:'Marcellus'; font-size:92px; letter-spacing:.12em; margin-top:30px;">SELENE</p>
      <div style="width:74px; height:1px; background:${b.accent}; margin:34px 0;"></div>
      <p style="font-family:'Mulish'; font-weight:300; font-size:29px; line-height:1.75;" class="prose">A crescent, waning into a leaf. The mark holds both readings — cycle and growth — the way good treatment holds both science and rest.</p>
      <p class="mono" style="font-size:14px; letter-spacing:.4em; margin-top:44px; opacity:.5;">SKIN &amp; WELLNESS</p>
    </div>`),
  "selene-application": (b) => shell(`background:${b.stone}; background-image:${noise(0.04)}; width:1200px; height:1200px; display:flex; align-items:center; justify-content:center;`, `
    <div style="width:720px; background:${b.bg}; border-radius:24px 24px 260px 24px; padding:90px 80px; color:${b.ink}; box-shadow:0 34px 70px rgba(50,45,35,.22);">
      <div style="display:flex; justify-content:space-between; align-items:center;">
        ${svg(b.mark, b.ink, 96)}
        <p class="mono" style="font-size:14px; letter-spacing:.4em; opacity:.5;">THE RITUAL</p>
      </div>
      ${[["01", "Consult", "Twenty unhurried minutes. Skin history before skin goals."], ["02", "Treat", "Clinical protocols, spa pacing. Nothing rushed onto your skin."], ["03", "Rest", "The last ten minutes belong to you. We keep the lights low."]].map(([n, t, d]) => `
        <div style="display:flex; gap:38px; padding:44px 0; border-bottom:1px solid ${b.ink}1c; align-items:baseline;">
          <span style="font-family:'Marcellus'; font-size:34px; color:${b.accent};">${n}</span>
          <div>
            <p style="font-family:'Marcellus'; font-size:40px;">${t}</p>
            <p style="font-family:'Mulish'; font-weight:300; font-size:23px; opacity:.72; margin-top:8px; line-height:1.6;" class="prose">${d}</p>
          </div>
        </div>`).join("")}
    </div>`),

  /* ARC — Swiss grid spec + wayfinding */
  "arc-identity": (b) => shell(`background:${b.bg}; width:1200px; height:1200px; padding:80px; position:relative;`, `
    <div style="position:absolute; inset:80px; display:grid; grid-template-columns:repeat(6,1fr); gap:0;">
      ${Array.from({ length: 6 }, () => `<div style="border-left:1px solid ${b.mist}66;"></div>`).join("")}
    </div>
    <div style="position:relative; color:${b.ink}; height:100%; display:flex; flex-direction:column;">
      <div style="display:flex; justify-content:space-between;">
        <p class="mono" style="font-size:15px; opacity:.55;">ARC DENTAL STUDIO — SYSTEM</p>
        <p class="mono" style="font-size:15px; opacity:.55;">GRID 6 · 1200</p>
      </div>
      <div style="display:flex; align-items:center; gap:80px; margin-top:110px;">
        ${svg(b.mark, b.ink, 320)}
        <div>
          <p style="font-family:'Manrope'; font-weight:800; font-size:150px; letter-spacing:-.02em;">Arc<span style="color:${b.accent};">.</span></p>
          <p class="mono" style="font-size:18px; letter-spacing:.4em; margin-top:8px; opacity:.6;">DENTAL STUDIO</p>
        </div>
      </div>
      <div style="display:flex; gap:0; margin-top:auto; border-top:2px solid ${b.ink};">
        ${[["Aa", "Manrope 800", "Display"], ["Aa", "Inter 400–700", "Interface"], ["", "#7FC6B5", "Mint"], ["", "#33424C", "Slate"]].map(([g, l, k], i) => `
          <div style="flex:1; padding:34px 26px; border-right:1px solid ${b.mist}; ${i > 1 ? `background:${i === 2 ? b.accent : b.ink}; color:${i === 2 ? b.ink : "#fff"};` : ""}">
            ${g ? `<p style="font-family:'${i === 0 ? "Manrope" : "Inter"}'; font-weight:${i === 0 ? 800 : 500}; font-size:58px;">${g}</p>` : `<div style="height:58px;"></div>`}
            <p style="font-size:20px; font-weight:600; margin-top:14px;">${l}</p>
            <p class="mono" style="font-size:13px; margin-top:6px; opacity:.6;">${k}</p>
          </div>`).join("")}
      </div>
    </div>`),
  "arc-application": (b) => shell(`background:${b.ink}; width:1200px; height:1200px; display:flex; align-items:center; justify-content:center;`, `
    <div style="text-align:center;">
      <div style="background:${b.bg}; border-radius:40px; padding:110px 130px; box-shadow:0 40px 90px rgba(10,20,26,.5);">
        ${svg(b.mark, b.ink, 260)}
        <p style="font-family:'Manrope'; font-weight:800; font-size:96px; color:${b.ink}; margin-top:30px;">Arc<span style="color:${b.accent};">.</span></p>
        <div style="display:flex; gap:22px; justify-content:center; margin-top:44px;">
          ${["RECEPTION →", "SUITES 1–4 ↑", "X-RAY ←"].map((w) => `<span class="mono" style="font-size:16px; letter-spacing:.24em; color:${b.ink}; border:2px solid ${b.mist}; border-radius:999px; padding:14px 26px;">${w}</span>`).join("")}
        </div>
      </div>
      <p class="mono" style="font-size:15px; letter-spacing:.3em; color:${b.mist}; margin-top:44px;">INTERIOR SIGNAGE — BACKLIT PANEL</p>
    </div>`),

  /* FORM — brutalist poster + wall spec */
  "form-identity": (b) => shell(`background:${b.bg}; background-image:${noise(0.09)}; width:1200px; height:1200px; padding:56px; position:relative; overflow:hidden;`, `
    <div style="color:${b.ink}; height:100%; display:flex; flex-direction:column; position:relative; border:3px solid ${b.steel}; padding:56px 60px;">
      <div style="display:flex; justify-content:space-between;">
        <p class="mono" style="font-size:16px; color:${b.accent};">FORM STRENGTH STUDIO</p>
        <p class="mono" style="font-size:16px; opacity:.5;">POSTER NO. 01</p>
      </div>
      <p style="font-family:'Anton'; font-size:310px; line-height:.84; letter-spacing:-.01em; margin-top:52px;">SHOW<br/><span style="color:${b.accent};">UP.</span></p>
      <p class="mono" style="font-size:20px; letter-spacing:.34em; margin-top:56px; opacity:.75;">STRENGTH · CONDITIONING · COMMUNITY</p>
      <p style="font-family:'Anton'; font-size:96px; margin-top:26px; color:transparent; -webkit-text-stroke:2px ${b.steel}; letter-spacing:.04em;">THE REST IS REPS</p>
      <div style="margin-top:auto; display:flex; align-items:center; gap:30px;">
        ${svg(b.mark, b.accent, 110)}
        <div style="flex:1; height:3px; background:${b.steel};"></div>
        <p class="mono" style="font-size:16px; opacity:.6;">06:00 — 21:00</p>
      </div>
    </div>`),
  "form-application": (b) => shell(`background:${b.bg}; background-image:${noise(0.1)}; width:1200px; height:1200px; padding:80px; display:flex; flex-direction:column;`, `
    <div style="display:flex; justify-content:space-between; align-items:center;">
      ${svg(b.mark, b.accent, 130)}
      <div style="text-align:right;">
        <p style="font-family:'Anton'; font-size:56px; color:${b.ink};">CLASS BOARD</p>
        <p class="mono" style="font-size:17px; color:${b.accent}; letter-spacing:.4em; margin-top:6px;">WEEK 27</p>
      </div>
    </div>
    <div style="flex:1; display:flex; flex-direction:column; margin-top:56px; border-top:6px solid ${b.accent};">
      ${[["06:00", "STRENGTH BLOCK", "BARBELL · 55 MIN"], ["12:15", "LUNCH LIFT", "FULL BODY · 40 MIN"], ["18:30", "ENGINE", "CONDITIONING · 45 MIN"]].map(([t, n, d]) => `
        <div style="flex:1; display:flex; align-items:center; gap:56px; border-bottom:3px solid ${b.steel};">
          <span style="font-family:'Anton'; font-size:64px; color:${b.accent}; min-width:210px;">${t}</span>
          <div>
            <p style="font-family:'Anton'; font-size:88px; color:${b.ink}; letter-spacing:.02em; line-height:1;">${n}</p>
            <p class="mono" style="font-size:18px; color:${b.ink}99; margin-top:12px;">${d}</p>
          </div>
        </div>`).join("")}
    </div>
    <div style="display:flex; justify-content:space-between; align-items:center; margin-top:44px;">
      <p class="mono" style="font-size:16px; color:${b.ink}99;">FORM STRENGTH STUDIO</p>
      <p class="mono" style="font-size:16px; color:${b.accent};">SHOW UP. THE REST IS REPS.</p>
    </div>`),
};

/* ══ RENDER ══════════════════════════════════════════════════ */
const browser = await chromium.launch();

async function render(html, w, h, path) {
  const page = await browser.newPage({ viewport: { width: w, height: h } });
  await page.setContent(html, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(250);
  await page.screenshot({ path });
  await page.close();
  console.log(`rendered ${path.split("/").pop()}`);
}

// Optional CLI filter: `node scripts/brand-boards.mjs sundry` renders one brand.
const only = process.argv[2];
for (const [key, b] of Object.entries(B)) {
  if (only && key !== only) continue;
  await render(lockups[key](b), 1200, 1200, `${OUT}/${b.slug}-lockup.png`);
  await render(boards[`${key}-identity`](b), 1200, 1200, `${OUT}/${b.slug}-identity.png`);
  await render(boards[`${key}-application`](b), 1200, 1200, `${OUT}/${b.slug}-application-v2.png`);
}
await browser.close();
