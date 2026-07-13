// Product marketing visuals v2 — reference standard: real dashboard
// screenshots in browser frames + heavy condensed type on deep navy.
//   node scripts/product-posters.mjs   (expects dd-demo-*.png captured first)
import { chromium } from "playwright";
import { readFileSync } from "fs";

const OUT = "public/images/products";
const b64 = (p) => `data:image/png;base64,${readFileSync(p).toString("base64")}`;
const home = b64("public/images/products/dd-demo-home.png");
const sops = b64("public/images/products/dd-demo-sops.png");

const FONTS =
  "https://fonts.googleapis.com/css2?family=Archivo+Black&family=Fraunces:ital,wght@0,500;0,600;1,400&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap";
const noise = (o = 0.05) =>
  `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='240' height='240' filter='url(%23n)' opacity='${o}'/%3E%3C/svg%3E")`;

const shell = (bg, inner) => `<!DOCTYPE html><html><head>
<link rel="stylesheet" href="${FONTS}">
<style>
  * { margin:0; padding:0; box-sizing:border-box; }
  body { width:1280px; height:720px; overflow:hidden; ${bg} }
  .mono { font-family:'JetBrains Mono',monospace; letter-spacing:.16em; text-transform:uppercase; }
  .frame { background:#F4F6F9; border-radius:14px; overflow:hidden; box-shadow:0 40px 90px rgba(0,0,0,.55); }
  .frame .bar { height:38px; background:#fff; border-bottom:1px solid #E3E8EF; display:flex; align-items:center; padding:0 16px; gap:7px; }
  .frame .bar span { width:11px; height:11px; border-radius:50%; }
  .frame .url { flex:1; margin-left:10px; background:#EEF2F7; border-radius:8px; height:22px; display:flex; align-items:center; padding:0 12px; font-family:'JetBrains Mono'; font-size:11px; color:#7C8B9D; letter-spacing:.04em; }
  .frame img { width:100%; display:block; }
</style></head><body>${inner}</body></html>`;

const browserFrame = (src, url, extra = "") => `
  <div class="frame" style="${extra}">
    <div class="bar">
      <span style="background:#F35D57;"></span><span style="background:#F8BD2D;"></span><span style="background:#37C24F;"></span>
      <div class="url">${url}</div>
    </div>
    <img src="${src}" alt="">
  </div>`;

/* 1 · Product card — reference style: framed real dashboard + condensed type */
const card = shell(
  `background:#0E2238; background-image:radial-gradient(ellipse 1100px 620px at 82% -10%, #14503f33 0%, transparent 55%), radial-gradient(ellipse 900px 500px at 10% 110%, #16344F 0%, transparent 60%), ${noise(0.06)};`,
  `
  <div style="position:absolute; top:-8px; left:90px; right:90px;">
    ${browserFrame(home, "denial-defense · works offline", "transform:perspective(1400px) rotateX(3deg);")}
  </div>
  <div style="position:absolute; left:0; right:0; bottom:0; height:400px; background:linear-gradient(180deg, transparent 0%, #0E2238 42%);"></div>
  <div style="position:absolute; left:0; right:0; bottom:56px; text-align:center; color:#EDF2F6;">
    <p style="font-family:'Archivo Black'; font-size:86px; line-height:1; letter-spacing:.01em;">DENIAL DEFENSE</p>
    <p style="font-family:'Archivo Black'; font-size:60px; line-height:1.15; color:#D9A441;">SYSTEM</p>
    <div style="width:64px; height:4px; background:#37B597; margin:20px auto 0; border-radius:99px;"></div>
    <p style="font-family:'Inter'; font-weight:500; font-size:24px; color:#B9C8D6; margin-top:20px;">25 billing SOPs · dashboard · trackers · letters</p>
    <div style="display:flex; gap:14px; justify-content:center; margin-top:24px;">
      <span style="font-family:'Inter'; font-weight:700; font-size:21px; background:#D9A441; color:#0E2238; border-radius:999px; padding:12px 26px;">$67 once</span>
      <span style="font-family:'Inter'; font-weight:600; font-size:21px; border:2px solid #2C4A66; color:#EDF2F6; border-radius:999px; padding:12px 26px;">Works offline</span>
      <span style="font-family:'Inter'; font-weight:600; font-size:21px; border:2px solid #2C4A66; color:#EDF2F6; border-radius:999px; padding:12px 26px;">Lifetime updates</span>
    </div>
  </div>`
);

/* 2 · Storefront banner — editorial type + two framed real screenshots */
const storefront = shell(
  `background:#0D0D0B; background-image:radial-gradient(ellipse 700px 420px at 15% 90%, #1c1c19 0%, transparent 60%), ${noise(0.07)};`,
  `
  <div style="position:absolute; inset:0; padding:64px 72px; color:#F2EFE7;">
    <div style="display:flex; justify-content:space-between; align-items:center;">
      <p style="font-family:'Fraunces'; font-weight:600; font-size:28px;">Vaugn<span style="color:#F0662A;">.</span></p>
      <p class="mono" style="font-size:13px; color:#7b776e;">GUMROAD STORE</p>
    </div>
    <div style="display:flex; gap:56px; margin-top:44px; align-items:center;">
      <div style="width:520px;">
        <h1 style="font-family:'Fraunces'; font-weight:500; font-size:64px; line-height:1.04; letter-spacing:-.02em;">
          The systems I use for clients, <em style="font-style:italic; font-weight:400; color:#F0662A;">packaged.</em>
        </h1>
        <p style="font-family:'Inter'; font-size:20px; color:#b3afa4; margin-top:20px; line-height:1.55;">
          Toolkits, templates, and marketing systems built from real client work — not theory.
        </p>
        <div style="display:flex; gap:10px; margin-top:26px; flex-wrap:wrap;">
          ${["SOP toolkits", "Framer templates", "Marketing packs"].map((c) => `
            <span style="font-family:'Inter'; font-weight:600; font-size:15px; border:1.5px solid #262622; border-radius:999px; padding:9px 17px; color:#b3afa4;">${c}</span>`).join("")}
        </div>
        <p class="mono" style="font-size:13px; color:#F0662A; margin-top:34px;">VAUGNSTUDIO.GUMROAD.COM →</p>
      </div>
      <div style="flex:1; position:relative; height:520px;">
        ${browserFrame(home, "denial-defense · live demo", "position:absolute; top:0; left:0; width:560px; transform:rotate(-2deg);")}
        ${browserFrame(sops, "sop library — fighting denials", "position:absolute; top:190px; left:120px; width:560px; transform:rotate(1.5deg);")}
      </div>
    </div>
  </div>`
);

const browser = await chromium.launch();
for (const [name, html] of [["denial-defense-card", card], ["gumroad-storefront", storefront]]) {
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: 2 });
  await page.setContent(html, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(300);
  await page.screenshot({ path: `${OUT}/${name}.png` });
  await page.close();
  console.log(`rendered ${name}`);
}
await browser.close();
