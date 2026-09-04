// Composes the Tacos 'N' Tequilas card cover (16:10) from the real
// deliverables — grid mock + V1 poster on the brand red. Run from PowerShell.
//   node scripts/tnt-cover.mjs
import { chromium } from "playwright";
import fs from "node:fs";
const b64 = (p, t) => `data:${t};base64,${fs.readFileSync(p).toString("base64")}`;
const grid = b64("public/images/tnt/grid-3x3.jpg", "image/jpeg");
const v1 = b64("public/images/tnt/v1-craving-4x5.jpg", "image/jpeg");
const v3 = b64("public/images/tnt/v3-room-4x5.jpg", "image/jpeg");
const logo = b64("../tnt-birria-night/assets/tnt-logo-gold.svg", "image/svg+xml");
const html = `<!doctype html><meta charset="utf-8"><style>
*{margin:0;box-sizing:border-box}
body{width:1600px;height:1000px;background:#9F2210;position:relative;overflow:hidden;font-family:Montserrat,Inter,Arial,sans-serif}
.pic{position:absolute;left:0;right:0;bottom:0;height:26px;background:
 linear-gradient(135deg,#F9D021 50%,transparent 50%) 0 0/26px 26px,
 linear-gradient(225deg,#F9D021 50%,transparent 50%) 0 0/26px 26px;opacity:.9}
img{position:absolute;display:block;box-shadow:0 30px 60px rgba(0,0,0,.35),0 4px 10px rgba(0,0,0,.25);border-radius:6px}
.grid{left:96px;top:118px;width:720px;height:720px}
.v1{left:880px;top:86px;width:500px;height:625px}
.v3{left:1200px;top:300px;width:330px;height:412px;box-shadow:0 30px 60px rgba(0,0,0,.45)}
.tag{position:absolute;left:96px;bottom:70px;color:#FFF9EC;font-size:18px;letter-spacing:.18em;text-transform:uppercase;opacity:.9}
.logo{position:absolute;right:96px;bottom:58px;width:64px}
</style><body>
<img class="grid" src="${grid}"><img class="v1" src="${v1}"><img class="v3" src="${v3}">
<div class="tag">Tacos 'N' Tequilas · Sunday Birria Night · brand guide, grid &amp; campaign</div>
<img class="logo" src="${logo}" style="box-shadow:none;border-radius:0">
<div class="pic"></div></body>`;
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1600, height: 1000 } });
await page.setContent(html, { waitUntil: "load" });
await page.waitForTimeout(300);
await page.screenshot({ path: "public/images/tnt/cover.jpg", type: "jpeg", quality: 88 });
await browser.close();
console.log("cover written");
