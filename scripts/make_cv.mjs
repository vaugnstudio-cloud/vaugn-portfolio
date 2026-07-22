// RETIRED 2026-07: public/cv.pdf now comes from the 2026 résumé build in
// "1. Projects/Resume Archive/Vaugn Almeida Resume 2026" (master variant).
// Keep this script for future regeneration only — DO NOT RUN, it would
// overwrite the current CV with the old layout.
// Generate a clean one-page CV PDF into public/cv.pdf (Playwright print-to-PDF).
import { chromium } from "playwright";
import path from "node:path";

const out = path.resolve("public/cv.pdf");

const html = `<!doctype html><html><head><meta charset="utf-8"/>
<style>
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@500&display=swap');
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Inter',sans-serif;color:#15140f;background:#fff;padding:46px 52px;font-size:11.5px;line-height:1.55}
.h{font-family:'Syne',sans-serif}
.acc{color:#e85d1f}
h1{font-family:'Syne';font-size:30px;font-weight:800;letter-spacing:-.5px}
.role{font-family:'Syne';font-weight:600;font-size:13px;color:#56524a;margin-top:3px}
.contact{margin-top:10px;font-family:'JetBrains Mono',monospace;font-size:10px;color:#56524a;letter-spacing:.3px}
.lab{font-family:'JetBrains Mono',monospace;font-size:9.5px;letter-spacing:1.5px;text-transform:uppercase;color:#e85d1f;margin:22px 0 10px;border-top:1px solid #e4e0d6;padding-top:14px}
.row{display:flex;justify-content:space-between;gap:16px;margin-bottom:3px}
.org{font-family:'Syne';font-weight:700;font-size:13px}
.when{font-family:'JetBrains Mono',monospace;font-size:9.5px;color:#928d81;white-space:nowrap}
.desc{color:#56524a;margin:3px 0 12px;max-width:92%}
.muted{color:#56524a}
.grid{display:grid;grid-template-columns:140px 1fr;gap:6px 18px}
.k{font-family:'JetBrains Mono',monospace;font-size:9.5px;letter-spacing:1px;text-transform:uppercase;color:#928d81;padding-top:2px}
</style></head><body>
<h1>Vaugn Jasper Almeida</h1>
<div class="role">Brand &amp; Marketing Designer</div>
<div class="contact">vaugn.studio@gmail.com &nbsp;·&nbsp; linkedin.com/in/vaugn-almeida &nbsp;·&nbsp; vaugn-portfolio.vercel.app &nbsp;·&nbsp; Laguna, Philippines (Remote, GMT+8)</div>

<div class="lab">Profile</div>
<div class="muted">Agency-trained brand &amp; marketing designer with 4+ years across Australian, American, and European clients. I combine branding, Figma &amp; Framer web design, marketing &amp; advertising creative, and AI-enhanced workflows to build visual systems that earn trust and convert — at agency speed. Healthcare-fluent.</div>

<div class="lab">Experience</div>
<div class="row"><span class="org">Your SocialChef <span class="muted" style="font-weight:400">— Brand &amp; Marketing Designer</span></span><span class="when">2023 – Present</span></div>
<div class="desc">In-house creative across 20+ concurrent client accounts — brand campaigns, social media systems, Figma/Framer web design, photo editing, and short-form video across healthcare, hospitality, retail, and professional services.</div>
<div class="row"><span class="org">Freelance <span class="muted" style="font-weight:400">— Brand &amp; Web Designer</span></span><span class="when">2024 – Present</span></div>
<div class="desc">Direct client work including MedSync (mental-health platform), InBloom Therapy, and FeedMe Group — brand identity, websites (designed &amp; built in Framer), and marketing creative end to end.</div>

<div class="lab">Selected Work</div>
<div class="muted">MedSync · Ozmax Care (NDIS/disability) · ACEF Enterprises (US healthcare billing) · Mekong Merchant · Junk Sunshine Coast · Yassas · FeedMe Group · PlumbYourWay</div>

<div class="lab">Capabilities</div>
<div class="grid">
<div class="k">Brand</div><div class="muted">Identity systems, logo suites, brand guidelines, social templates</div>
<div class="k">Web</div><div class="muted">UI design in Figma, Framer build, responsive, basic SEO</div>
<div class="k">Marketing</div><div class="muted">Ad creative, campaigns, social systems, print &amp; pitch decks</div>
</div>

<div class="lab">Tools</div>
<div class="grid">
<div class="k">Design &amp; Web</div><div class="muted">Figma · Framer · Photoshop · Illustrator · InDesign · After Effects · Premiere Pro · Lightroom</div>
<div class="k">AI-Enhanced</div><div class="muted">Adobe Firefly · Photoshop Generative AI · Magnific AI · Higgsfield AI · ChatGPT · Claude</div>
</div>
</body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage();
await page.setContent(html, { waitUntil: "networkidle" });
await page.pdf({ path: out, format: "A4", printBackground: true, margin: { top: "0", bottom: "0", left: "0", right: "0" } });
await browser.close();
console.log("OK cv ->", out);
