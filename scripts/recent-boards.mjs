// Presentation boards for the Sep–Oct 2026 agency work, composed from the
// real delivered files prepared by scripts/recent-assets.sh. Run from
// PowerShell at the repo root (Bash-launched browsers die on this machine):
//   node scripts/recent-boards.mjs
import { chromium } from "playwright";
import fs from "node:fs";

const b64 = (p) => `data:image/jpeg;base64,${fs.readFileSync(p).toString("base64")}`;
const A = "scripts/assets/recent";
const I = "public/images";

const FONTS = `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400..600;1,9..144,400..600&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap">`;
const BASE = `*{margin:0;box-sizing:border-box}body{width:1600px;height:1000px;position:relative;overflow:hidden;font-family:Inter,Arial,sans-serif}
.mono{font-family:'JetBrains Mono',monospace;font-size:13px;letter-spacing:.22em;text-transform:uppercase}
.shadow{box-shadow:0 30px 70px rgba(0,0,0,.35),0 6px 14px rgba(0,0,0,.2)}
.browser{position:absolute;border-radius:12px;overflow:hidden;background:#fff}
.browser .bar{height:34px;background:#ECE8E1;display:flex;align-items:center;gap:7px;padding:0 14px}
.browser .bar i{width:11px;height:11px;border-radius:50%;background:#CFC8BD;display:block}
.browser .bar b{margin-left:18px;height:20px;flex:1;max-width:420px;border-radius:10px;background:#fff;font:500 11px Inter;color:#8a8276;display:flex;align-items:center;padding-left:12px}
.browser img{display:block;width:100%}
.phone{position:absolute;border-radius:38px;padding:10px;background:#141210}
.phone .screen{border-radius:29px;overflow:hidden;position:relative}
.phone .screen img{display:block;width:100%}
.phone .notch{position:absolute;top:10px;left:50%;transform:translateX(-50%);width:90px;height:22px;border-radius:0 0 14px 14px;background:#141210;z-index:2}
.card{position:absolute;display:block;border-radius:6px}`;

const browser = (src, x, y, w, url) =>
  `<div class="browser shadow" style="left:${x}px;top:${y}px;width:${w}px"><div class="bar"><i></i><i></i><i></i><b>${url}</b></div><img src="${src}"></div>`;
const phone = (src, x, y, w, h) =>
  `<div class="phone shadow" style="left:${x}px;top:${y}px;width:${w}px"><div class="notch"></div><div class="screen" style="height:${h}px"><img src="${src}"></div></div>`;

const b64png = (p) => `data:image/png;base64,${fs.readFileSync(p).toString("base64")}`;

// QA tooling: the safe-zone overlays built for the design team, on a neutral
// canvas so the red no-go zones read, beside the named checks every creative
// passes before it reaches a client. No co-worker artwork is shown.
const qaCard = (file, label, w, h) => `<figure style="margin:0">
  <div class="shadow" style="width:${w}px;height:${h}px;border-radius:6px;overflow:hidden;background:repeating-linear-gradient(135deg,#DAD5CD 0 14px,#D2CCC3 14px 28px)">
    <img src="${b64png(`${A}/${file}`)}" style="width:100%;height:100%;display:block"></div>
  <figcaption class="mono" style="margin-top:12px;font-size:11px;color:#B8AEA4">${label}</figcaption></figure>`;
const QA_CHECKS = [
  ["Safe zones", "Type clear of the platform UI on every format"],
  ["Real food", "Dish pixels match the shoot, no AI re-render that reads as different"],
  ["Motion", "No AI steam or smoke on plated food, checked frame by frame"],
  ["Copy & offer", "Prices, dates and venue match the brief word for word"],
  ["Brand", "The client's own type, colour and logo placement"],
  ["Delivery", "The file on the shared drive is the fixed file, checked by hash"],
];

const boards = {
  "recent/qa-toolkit.jpg": `<body style="background:#151311">
    <p class="mono" style="position:absolute;left:70px;top:96px;color:#F0662A">Creative QA · team tooling</p>
    <div style="position:absolute;left:70px;top:150px;display:flex;gap:24px;align-items:flex-end">
      ${qaCard("qa-ig-story-1080x1920.png", "Story 9:16", 336, 597)}
      ${qaCard("qa-ig-reel-1080x1920.png", "Reel 9:16", 336, 597)}
      <div style="display:flex;flex-direction:column;gap:22px">
        ${qaCard("qa-ig-feed-4x5-1080x1350.png", "Feed 4:5", 270, 338)}
        ${qaCard("qa-google-post-1200x900.png", "Google post 4:3", 270, 203)}
      </div>
    </div>
    <div style="position:absolute;left:1130px;top:150px;width:400px">
      <p style="font-family:Fraunces,serif;font-size:34px;line-height:1.12;color:#F2EFE7">Six checks before anything reaches a client.</p>
      <div style="margin-top:30px;border-top:1px solid #34302B">
        ${QA_CHECKS.map(([k, v], i) => `<div style="display:grid;grid-template-columns:42px 1fr;gap:6px;padding:15px 0;border-bottom:1px solid #34302B">
          <span class="mono" style="color:#F0662A;font-size:12px;padding-top:3px">0${i + 1}</span>
          <div><p style="font-weight:600;font-size:16px;color:#F2EFE7">${k}</p><p style="font-size:14px;line-height:1.45;color:#B8AEA4;margin-top:3px">${v}</p></div></div>`).join("")}
      </div>
    </div>
  </body>`,

  // Augello's — the card cover: web page, phone, a carousel slide
  "augellos/cover.jpg": `<body style="background:#1C1813">
    <div style="position:absolute;inset:0;background:radial-gradient(90% 70% at 30% 20%,rgba(178,58,43,.28),transparent 65%)"></div>
    ${browser(b64(`${A}/aug-desktop-top.jpg`), 80, 120, 980, "augellos.com.au/whats-on")}
    ${phone(b64(`${A}/aug-mobile-top.jpg`), 930, 330, 250, 530)}
    <img class="card shadow" src="${b64(`${I}/augellos/pinned-2.jpg`)}" style="left:1230px;top:150px;width:300px;height:375px">
    <img class="card shadow" src="${b64(`${I}/augellos/pinned-5.jpg`)}" style="left:1270px;top:560px;width:240px;height:300px">
  </body>`,

  // Augello's — the pinned-post series, read as a profile grid
  "augellos/pinned-strip.jpg": `<body style="background:#EDEAE6">
    <div style="position:absolute;left:118px;top:56px;display:grid;grid-template-columns:repeat(4,318px);grid-auto-rows:398px;gap:34px 28px">
      <div style="display:flex;flex-direction:column;justify-content:center;padding-right:18px">
        <p class="mono" style="color:#B23A2B">Pinned posts</p>
        <p style="font-family:Fraunces,serif;font-size:40px;line-height:1.08;color:#241F1A;margin-top:18px">One dish,<br>one <em style="color:#B23A2B">surface</em>.</p>
        <p style="font-size:15px;line-height:1.55;color:#6E6354;margin-top:16px">The first posts a new visitor sees on the profile: each signature dish on the same stone ground, named in one italic line with one red word.</p>
      </div>
      ${[1, 2, 3, 4, 5, 6, 7].map((n) => `<img class="shadow" src="${b64(`${I}/augellos/pinned-${n}.jpg`)}" style="width:318px;height:398px;object-fit:cover;border-radius:6px;display:block">`).join("")}
    </div>
  </body>`,

  // Augello's — Google P-Max: one headline, three ratios, two rows
  "augellos/pmax-matrix.jpg": `<body style="background:#1C1813">
    <p class="mono" style="position:absolute;left:150px;top:70px;color:#F6F1E6;opacity:.8">Google Performance Max · 11 headlines × 3 ratios · 2 shown</p>
    <div style="position:absolute;left:150px;top:130px;display:flex;flex-direction:column;gap:56px">
      ${["02", "11"].map((k) => `<div style="display:flex;gap:26px;align-items:flex-start">
        ${[["l", 640, 335, "1200 × 628"], ["s", 335, 335, "1200 × 1200"], ["p", 268, 335, "960 × 1200"]].map(([r, w, h, t]) => `<figure style="margin:0">
          <img class="shadow" src="${b64(`${A}/pmax-${k}-${r}.jpg`)}" style="width:${w}px;height:${h}px;object-fit:cover;border-radius:4px;display:block">
          <figcaption class="mono" style="margin-top:12px;font-size:11px;color:#C9BCA4">${t}</figcaption></figure>`).join("")}
      </div>`).join("")}
    </div>
  </body>`,

  // Augello's — the What's On page, desktop and phone
  "augellos/web-devices.jpg": `<body style="background:#EFE7D5">
    ${browser(b64(`${I}/augellos/web-specials.jpg`), 90, 120, 1010, "augellos.com.au/whats-on")}
    ${phone(b64(`${A}/aug-mobile-specials.jpg`), 1170, 150, 330, 657)}
    <p class="mono" style="position:absolute;left:90px;bottom:60px;color:#6E6354">What's On · designed at 1920 desktop and 420 mobile</p>
  </body>`,

  // JUNK — Coastalscape, one event across every channel
  "recent/junk-coastal-channels.jpg": `<body style="background:#F4EFE6">
    <div style="position:absolute;left:70px;top:150px;display:flex;gap:24px;align-items:flex-start">
      <figure style="margin:0"><img class="shadow" src="${b64(`${A}/junk-social-v1.jpg`)}" style="width:520px;height:650px;object-fit:cover;border-radius:6px;display:block"><figcaption class="mono" style="margin-top:14px;font-size:11px;color:#6b6258">Feed · 4:5</figcaption></figure>
      <figure style="margin:0"><img class="shadow" src="${b64(`${A}/junk-story.jpg`)}" style="width:366px;height:650px;object-fit:cover;border-radius:6px;display:block"><figcaption class="mono" style="margin-top:14px;font-size:11px;color:#6b6258">Story · 9:16</figcaption></figure>
    </div>
    <div style="position:absolute;right:70px;top:50px;width:460px;display:flex;flex-direction:column;gap:16px">
      ${[["junk-whatson", "Website What's On"], ["junk-edm", "Email header"], ["junk-popup", "Website pop-up"]].map(([k, t]) => `<figure style="margin:0"><img class="shadow" src="${b64(`${A}/${k}.jpg`)}" style="width:460px;height:auto;border-radius:6px;display:block"><figcaption class="mono" style="margin-top:8px;font-size:11px;color:#6b6258">${t}</figcaption></figure>`).join("")}
    </div>
  </body>`,
};

const chrome = await chromium.launch();
const page = await chrome.newPage({ viewport: { width: 1600, height: 1000 } });
for (const [out, body] of Object.entries(boards)) {
  await page.setContent(`<!doctype html><html><head><meta charset="utf-8">${FONTS}<style>${BASE}</style></head>${body}</html>`, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(250);
  await page.screenshot({ path: `${I}/${out}`, type: "jpeg", quality: 86 });
  console.log("wrote", out);
}
await chrome.close();
