// Portfolio PDF (November 2026): an 11 page 16:9 deck in the site's "proof
// sheet" style, for applications that ask for a file upload. Same facts and
// credits as the site (data/cases.ts); the previous 18 page deck stays in git
// history and in the hub as the archive.
//   node scripts/portfolio-pdf.mjs [out.pdf]     (default public/portfolio.pdf)
//
// Images are downscaled in the browser and inlined as JPEG data URIs, so the
// deck never touches file:// (this repo path contains spaces) and stays well
// under common 8 to 10 MB upload limits. No dash punctuation in deck copy.
import { chromium } from "playwright";
import http from "node:http";
import fs from "node:fs";
import path from "node:path";

const ROOT = "public";
const OUT = process.argv[2] ?? "public/portfolio.pdf";
const PORT = 4319;

const MIME = { ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png" };
const server = http.createServer((req, res) => {
  const url = decodeURIComponent(req.url.split("?")[0]);
  if (url === "/") { res.writeHead(200, { "Content-Type": "text/html" }); res.end("<!DOCTYPE html><title>prep</title>"); return; }
  const file = path.join(ROOT, url);
  fs.stat(file, (err, st) => {
    if (err || !st.isFile()) { res.writeHead(404).end(); return; }
    res.writeHead(200, { "Content-Type": MIME[path.extname(file).toLowerCase()] ?? "application/octet-stream", "Content-Length": st.size });
    fs.createReadStream(file).pipe(res);
  });
});
await new Promise((r) => server.listen(PORT, r));

// [path, max width in px]: roughly 1.6x the size each image is shown at.
const IMG = {
  augP2: ["/images/augellos/pinned-2.jpg", 700], augP5: ["/images/augellos/pinned-5.jpg", 700], augP3: ["/images/augellos/pinned-3.jpg", 700],
  augWeb: ["/images/augellos/web-devices.jpg", 1300],
  msD: ["/images/live/medsync-d-services.jpg", 1300], msHero: ["/images/live/medsync-d-hero.jpg", 1300], msM: ["/images/live/medsync-m-services.jpg", 520],
  sl1: ["/images/the-hill/sl-poster-1.jpg", 640], sl2: ["/images/the-hill/sl-poster-2.jpg", 640], sl3: ["/images/the-hill/sl-poster-3.jpg", 640], slG: ["/images/the-hill/sl-google.jpg", 800],
  lh1: ["/images/the-hill/lh-poster-1.jpg", 640], lh2: ["/images/the-hill/lh-poster-2.jpg", 640], lh3: ["/images/the-hill/lh-poster-3.jpg", 640], lhS: ["/images/the-hill/lh-story-1.jpg", 460], lhG: ["/images/the-hill/lh-google.jpg", 800],
  tntGuide: ["/images/tnt/guide-headline-price.jpg", 1300], tntV1: ["/images/tnt/v1-craving-4x5.jpg", 640], tntV2: ["/images/tnt/v2-company-4x5.jpg", 640], tntF2: ["/images/tnt/follower-2.jpg", 640],
  qa: ["/images/recent/qa-toolkit.jpg", 1300],
  r1: ["/images/recent/kumars-navratri.jpg", 520], r2: ["/images/recent/renzos-cocktail.jpg", 520], r3: ["/images/recent/lilianas-christmas.jpg", 520], r4: ["/images/recent/gcco-halloween.jpg", 520],
  r5: ["/images/recent/sincero-christmas.jpg", 520], r6: ["/images/recent/kumars-thali.jpg", 520], r7: ["/images/recent/junk-melbourne-cup-1.jpg", 520], r8: ["/images/recent/gcco-a3-qr.jpg", 520],
  ozmax: ["/images/live/ozmax-d-hero.jpg", 700], junk: ["/images/live/junk-d-hero.jpg", 700], inbloom: ["/images/live/inbloom-d-hero.jpg", 700],
};

const browser = await chromium.launch();
const prep = await browser.newPage();
await prep.goto(`http://localhost:${PORT}/`);
const data = {};
for (const [k, [src, maxW]] of Object.entries(IMG)) {
  data[k] = await prep.evaluate(async ([src, maxW]) => {
    const img = new Image(); img.src = src; await img.decode();
    const s = Math.min(1, maxW / img.naturalWidth);
    const c = document.createElement("canvas"); c.width = Math.round(img.naturalWidth * s); c.height = Math.round(img.naturalHeight * s);
    c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
    return c.toDataURL("image/jpeg", 0.84);
  }, [src, maxW]);
}
await prep.close();
server.close();

const img = (k, cls = "", alt = "") => `<img class="${cls}" src="${data[k]}" alt="${alt}">`;
const W = 1600, H = 900;
// A row of images at one fixed height; widths follow each image's real ratio.
const row = (h, keys) => `<div class="frow" style="height:${h}px">${keys.map((k) => `<img src="${data[k]}" alt="">`).join("")}</div>`;

const caseSlide = (n, title, client, credit, what, part, art) => `
<section class="slide case">
  <div class="meta">
    <p class="mono"><span class="acc">${n}</span> / 05 · ${credit}</p>
    <h2 class="display">${title}</h2>
    <p class="client">${client}</p>
    <p class="what">${what}</p>
    <p class="mono k">My part</p><p class="part">${part}</p>
  </div>
  <div class="art">${art}</div>
</section>`;

const html = `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500..700&family=Instrument+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap">
<style>
  @page { size: ${W}px ${H}px; margin: 0; }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Instrument Sans', sans-serif; color: #111110; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  .slide { width: ${W}px; height: ${H}px; background: #F2F1EC; padding: 64px 72px; position: relative; overflow: hidden; page-break-after: always; }
  .slide:last-child { page-break-after: auto; }
  .mono { font-family: 'IBM Plex Mono', monospace; font-size: 15px; letter-spacing: .12em; text-transform: uppercase; color: #67655E; }
  .acc { color: #2A3BD6; }
  .display { font-family: 'Bricolage Grotesque', sans-serif; font-weight: 600; letter-spacing: -.035em; line-height: .95; }
  img { display: block; border-radius: 8px; }
  .foot { position: absolute; left: 72px; right: 72px; bottom: 36px; display: flex; justify-content: space-between; border-top: 1px solid #D6D4CB; padding-top: 14px; }
  /* case slides */
  .case { display: grid; grid-template-columns: 430px 1fr; gap: 56px; }
  .case .meta { border-top: 2px solid #111110; padding-top: 22px; }
  .case h2 { font-size: 64px; margin-top: 26px; }
  .case .client { margin-top: 10px; color: #67655E; font-size: 18px; }
  .case .what { margin-top: 26px; font-size: 25px; line-height: 1.25; }
  .case .k { margin-top: 30px; padding-top: 18px; border-top: 1px solid #D6D4CB; }
  .case .part { margin-top: 8px; font-size: 19px; line-height: 1.45; color: #46453F; }
  .art { display: grid; gap: 16px; align-content: start; }
  .art img { width: 100%; height: auto; }
  .row { display: grid; gap: 16px; }
  .c2 { grid-template-columns: 1fr 1fr; } .c3 { grid-template-columns: repeat(3, 1fr); } .c4 { grid-template-columns: repeat(4, 1fr); }
  .row img { width: 100%; height: auto; }
  .frow { display: flex; gap: 16px; }
  .frow img { height: 100%; width: auto; }
  .cap { margin-top: 8px; font-size: 14px; color: #67655E; }
</style></head><body>

<section class="slide">
  <div style="display:flex;justify-content:space-between;border-bottom:1px solid #D6D4CB;padding-bottom:18px" class="mono">
    <span>Portfolio 2026</span><span>Senior Brand &amp; Web Designer</span><span>Greater Manila Area · Remote</span>
  </div>
  <h1 class="display" style="font-size:210px;margin-top:150px">Vaugn<br>Almeida<span class="acc">.</span></h1>
  <p style="margin-top:44px;font-size:34px;max-width:1000px;line-height:1.25">I design campaigns, brand guides and websites.</p>
  <div class="foot mono"><span>vaugn.studio@gmail.com</span><span>vaugn-portfolio.vercel.app</span><span>linkedin.com/in/vaugn-almeida</span></div>
</section>

<section class="slide" style="display:grid;grid-template-columns:1fr 1fr;gap:72px">
  <div style="border-top:2px solid #111110;padding-top:22px">
    <p class="mono">About</p>
    <h2 class="display" style="font-size:58px;margin-top:26px">Agency trained, with a background in <span class="acc">healthcare</span>.</h2>
    <p style="margin-top:32px;font-size:21px;line-height:1.5;color:#46453F">I'm a Senior Graphic Designer at Your SocialChef, an Australian marketing agency. I design for client brands and review the team's creative work: text and offers, layout, safe zones and brand consistency. For direct clients I design, write and build websites in Framer. Before and alongside design, I worked in US healthcare billing.</p>
  </div>
  <div style="border-top:2px solid #111110;padding-top:22px">
    <p class="mono">Experience</p>
    ${[
      ["Sep 2026 to now", "Senior Graphic Designer, Your SocialChef"],
      ["Feb 2023 to Sep 2026", "Brand & Web Designer, Your SocialChef. 20+ client accounts over several years"],
      ["Mar 2022 to now", "Independent designer, direct clients such as MedSync"],
      ["Mar 2024 to Nov 2025", "Creative Designer (part time), ACEF Enterprises"],
      ["May 2023 to Dec 2025", "Revenue Cycle Management Specialist, US healthcare billing"],
    ].map(([w, t]) => `<div style="display:grid;grid-template-columns:230px 1fr;gap:16px;padding:16px 0;border-bottom:1px solid #D6D4CB"><span class="mono" style="font-size:13px;padding-top:4px">${w}</span><span style="font-size:20px">${t.replace(/&/g, "&amp;")}</span></div>`).join("")}
    <p class="mono" style="margin-top:34px">Looking for</p>
    <p style="margin-top:8px;font-size:21px">A senior brand and web design role, remote, full time or long term contract.</p>
  </div>
</section>

${caseSlide("01", "Augello's", "Italian restaurant and pizzeria, Melbourne", "Agency work · Your SocialChef",
  "Campaign graphics and a webpage design, made within the restaurant's existing brand.",
  "I designed the pinned post series, the Google ad graphics and the What's On page. Another person built the page.",
  row(340, ["augP2", "augP3", "augP5"]) + row(410, ["augWeb"]))}

${caseSlide("02", "MedSync", "Psychiatry clinic, California", "Direct client",
  "A psychiatry clinic website, designed, written and built in Framer.",
  "Visual design, copy, typography and colour palette, and the Framer build. The client supplied the logo. The site is live at medsyncmentalhealth.com.",
  row(460, ["msD", "msM"]) + row(290, ["msHero"]))}

${caseSlide("03", "The Hill", "Seniors Lunch campaign", "Agency work · Your SocialChef",
  "Posters, a Google graphic and animated stories for a weekday seniors lunch.",
  "I designed the poster, Google and story layouts and refined the title treatment so every piece in the set matches.",
  row(385, ["sl1", "sl2", "sl3"]) + row(370, ["slG"]))}

${caseSlide("03", "The Hill", "Lunch at The Hill campaign", "Agency work · Your SocialChef",
  "Coordinated posters, story layouts and animated stories, with the plate leading every format.",
  "I prepared the posters, story layouts and animated stories, keeping the headline lockup the same on every format.",
  row(420, ["lh1", "lh2", "lhS"]) + row(330, ["lh3", "lhG"]))}

${caseSlide("04", "Tacos 'N' Tequilas", "Mexican kitchen and bar, Melbourne", "Agency work · Your SocialChef",
  "A brand guide and campaign layouts, made within an existing identity.",
  "I created the one page brand guide and the campaign layouts. The identity already existed.",
  row(395, ["tntGuide", "tntV1"]) + row(355, ["tntV2", "tntF2"]))}

${caseSlide("05", "Your SocialChef", "Marketing agency, Australia", "Employer · 2023 to now",
  "Design production and creative review across client accounts.",
  "I review creative work across the team for text and offers, spacing, readability, cropping, safe zones and brand. I give notes or make the corrections myself.",
  row(420, ["qa"]) + row(285, ["r1", "r2", "r3", "r4"]))}

<section class="slide">
  <div style="border-top:2px solid #111110;padding-top:22px;display:flex;justify-content:space-between;align-items:baseline">
    <h2 class="display" style="font-size:56px">Recent client work</h2>
    <p class="mono">Agency work · Your SocialChef · Sep and Oct 2026</p>
  </div>
  <div class="row c4" style="margin-top:34px;grid-template-columns:repeat(8,1fr);gap:14px">${["r1", "r2", "r3", "r4", "r5", "r6", "r7", "r8"].map((k) => img(k)).join("")}</div>
  <p style="margin-top:28px;font-size:19px;color:#46453F;max-width:1100px">Each piece is set in that client's own type and colour. Most use the client's own photography. Where a shoot did not cover a shot, the image was extended with AI tools and art directed by me.</p>
  <div class="foot mono"><span>Kumar's · Renzo's · Liliana's · General Chicken Co. · Sincero · JUNK</span><span>vaugn-portfolio.vercel.app</span></div>
</section>

<section class="slide">
  <div style="border-top:2px solid #111110;padding-top:22px">
    <h2 class="display" style="font-size:56px">Also in the archive</h2>
    <p class="mono" style="margin-top:14px">Agency work through Your SocialChef</p>
  </div>
  <div class="row c3" style="margin-top:36px">
    ${[["ozmax", "Ozmax Care", "Disability support provider: brand and website"], ["junk", "Junk Sunshine Coast", "Restaurant: website design, social and print"], ["inbloom", "InBloom Therapy", "Therapy practice: brand and website"]].map(([k, t, d]) => `<div>${img(k)}<p style="margin-top:14px;font-size:22px;font-weight:600">${t}</p><p class="cap" style="font-size:16px">${d}</p></div>`).join("")}
  </div>
  <p style="margin-top:34px;font-size:19px;color:#46453F">More on the site: own website kits and apps (demo content is sample data) and concept identities, each labelled for what it is.</p>
</section>

<section class="slide">
  <p class="mono">Contact</p>
  <h2 class="display" style="font-size:96px;margin-top:150px">vaugn.studio@gmail.com</h2>
  <p style="margin-top:36px;font-size:26px;color:#46453F">Full cases, with my part in each: vaugn-portfolio.vercel.app</p>
  <div class="foot mono"><span>linkedin.com/in/vaugn-almeida</span><span>Greater Manila Area, GMT+8</span><span>Open to senior roles and select client projects</span></div>
</section>
</body></html>`;

const page = await browser.newPage({ viewport: { width: W, height: H } });
await page.setContent(html, { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(400);
const over = await page.$$eval(".slide", (ss) => ss.map((s, i) => [i + 1, s.scrollHeight - s.clientHeight]).filter(([, o]) => o > 0));
if (over.length) console.log("slides overflowing (slide, px):", JSON.stringify(over));
await page.pdf({ path: OUT, width: `${W}px`, height: `${H}px`, printBackground: true });
const PREVIEW = process.env.DECK_PREVIEW_DIR;
if (PREVIEW) {
  fs.mkdirSync(PREVIEW, { recursive: true });
  const slides = await page.$$(".slide");
  for (let i = 0; i < slides.length; i++) await slides[i].screenshot({ path: `${PREVIEW}/slide-${String(i + 1).padStart(2, "0")}.jpg`, type: "jpeg", quality: 70 });
}
await browser.close();
console.log(`wrote ${OUT} (${(fs.statSync(OUT).size / 1048576).toFixed(2)} MB)`);
