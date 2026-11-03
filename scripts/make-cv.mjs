// CV in two versions from one set of facts (November 2026 rewrite):
//   · designed: the portfolio's "proof sheet" type and colour, two A4 pages,
//     for people reading it directly          → public/cv.pdf
//   · plain: one column, standard headings, contact in the main text, for
//     upload forms and screening software       → public/cv-plain.pdf
// Facts follow the hub claims register: no "concurrent" accounts, no
// unsupported results, agency projects credited to Your SocialChef, training
// separated from the one personal certificate. No dash punctuation.
//   node scripts/make-cv.mjs [outDir]
// Run from PowerShell on this machine (Bash-launched browsers die silently).
import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";

const OUT_DIR = process.argv[2] ?? "public";

const INK = "#111110", INK2 = "#46453F", DIM = "#67655E", LINE = "#D6D4CB", ACCENT = "#2A3BD6", PAPER = "#FFFFFF", SURFACE = "#F2F1EC";

const CONTACT = {
  email: "vaugn.studio@gmail.com",
  phone: "+63 909 203 0913",
  place: "Greater Manila Area, Philippines (GMT+8)",
  site: "vaugn-portfolio.vercel.app",
  linkedin: "linkedin.com/in/vaugn-almeida",
};

const SUMMARY =
  "Brand and web designer with 5+ years in design, now Senior Graphic Designer at Your SocialChef, an Australian marketing agency. I design campaigns, brand guides, social graphics and website layouts, and I review the design team's creative work for text, layout, safe zones and brand consistency. For direct clients I design, write and build websites in Framer. My background in US healthcare billing helps on healthcare projects. Open to a senior brand and web design role, remote, full time or long term contract.";

const EXPERIENCE = [
  {
    role: "Senior Graphic Designer",
    org: "Your SocialChef, Australian marketing agency (remote)",
    dates: "Sep 2026 to now",
    bullets: [
      "Design campaign graphics, social posts, animated stories, menus and email headers for client brands, each in the client's own type and colour.",
      "Review creative work across the team: text and offer details against the brief, spacing, readability, cropping, safe zones and brand consistency. I give correction notes or make the changes myself, depending on the task.",
      "Built safe zone templates and review checks for the formats the team produces.",
      "Recent work: The Hill's Seniors Lunch and Lunch at The Hill campaigns, with posters, Google graphics and animated stories.",
    ],
  },
  {
    role: "Brand & Web Designer",
    org: "Your SocialChef, Australian marketing agency (remote)",
    dates: "Feb 2023 to Sep 2026",
    bullets: [
      "Worked across 20+ client accounts over several years, mostly Australian hospitality, plus healthcare and retail.",
      "Augello's: pinned post series, Google ad graphics in three ratios and the What's On webpage design, which another person built.",
      "Tacos 'N' Tequilas: a one page brand guide and campaign layouts within the venue's existing identity.",
      "Agency projects also include Ozmax Care, InBloom Therapy, Junk Sunshine Coast and Mekong Merchant. Website layouts designed in Figma for the build team.",
    ],
  },
  {
    role: "Independent Brand & Web Designer",
    org: "Direct clients (remote)",
    dates: "Mar 2022 to now",
    bullets: [
      "MedSync, a psychiatry clinic in California: visual design, website copy and the Framer build, with a supporting typography and colour palette. The client supplied the logo. The site is live.",
      "Designed and built my own website kits and small web apps in 2026.",
    ],
  },
  {
    role: "Creative Designer (part time)",
    org: "ACEF Enterprises, US healthcare billing (remote)",
    dates: "Mar 2024 to Nov 2025",
    bullets: ["Brochures, roll up banners, calling cards and social graphics explaining revenue cycle services to clinics."],
  },
  {
    role: "Revenue Cycle Management Specialist",
    org: "ChrisNGrace Inc., US healthcare billing (remote)",
    dates: "May 2023 to Dec 2025",
    bullets: ["Claim review, submission monitoring, denial follow up and payer coordination for physician clinics and allied health providers."],
  },
  {
    role: "Brand Designer",
    org: "Lucia's Kitchen & Pomodoro Pizza, Manila",
    dates: "Feb 2021 to Dec 2022",
    bullets: ["Visual identities for two food brands across menus, packaging, signage and social media."],
  },
];

const PROJECTS = [
  ["Augello's", "Campaign graphics and webpage design", "Agency work · 2026"],
  ["MedSync", "Website design, copy and Framer build", "Direct client · 2025"],
  ["The Hill", "Campaign graphics and animated stories", "Agency work · 2026"],
  ["Tacos 'N' Tequilas", "Brand guide and campaign layouts", "Agency work · 2026"],
  ["Your SocialChef", "Design production and creative review", "Employer · 2023 to now"],
];

const SKILLS = [
  ["Design", "Photoshop, Illustrator, InDesign, Figma, layered PSD files with live text, print files"],
  ["Web", "Framer, Webflow, Figma web layouts, HTML and CSS"],
  ["Motion", "After Effects, Premiere Pro, animated stories and reels"],
  ["AI tools", "Photoshop Generative Fill, Firefly and ChatGPT for production steps"],
  ["Industries", "Hospitality, healthcare and medical billing, marketing agencies"],
];

const EDUCATION = [["BS Industrial Engineering", "Polytechnic University of the Philippines, 2020"]];
const CERTIFICATE = [["Social Media", "HubSpot Academy, certificate in my own name"]];
const TRAINING = [
  "Google UX Design",
  "DataCamp AI Fundamentals",
  "Coursera HTML, CSS and JavaScript",
  "Udemy Graphic Design Masterclass",
];

const esc = (t) => t.replace(/&/g, "&amp;").replace(/</g, "&lt;");
const FONTS = `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500..700&family=Instrument+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap">`;

const job = (j) => `
  <article class="job">
    <div class="top"><h3>${esc(j.role)}</h3><span class="dates">${esc(j.dates)}</span></div>
    <p class="org">${esc(j.org)}</p>
    <ul>${j.bullets.map((b) => `<li>${esc(b)}</li>`).join("")}</ul>
  </article>`;

/* ── Designed version ───────────────────────────────────── */
const designed = `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8">${FONTS}
<style>
  @page { size: A4; margin: 0; }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body { background: ${PAPER}; color: ${INK}; font-family: 'Instrument Sans', system-ui, sans-serif; font-size: 9.6pt; line-height: 1.45; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  .page { width: 210mm; height: 297mm; padding: 15mm 16mm 13mm; display: flex; flex-direction: column; page-break-after: always; overflow: hidden; }
  .page:last-child { page-break-after: auto; }
  .mono { font-family: 'IBM Plex Mono', monospace; font-size: 7.2pt; letter-spacing: .12em; text-transform: uppercase; }
  .display { font-family: 'Bricolage Grotesque', sans-serif; font-weight: 600; letter-spacing: -.03em; }
  .head { display: grid; grid-template-columns: 1fr auto; gap: 10mm; align-items: end; padding-bottom: 5mm; border-bottom: 1.5px solid ${INK}; }
  .head h1 { font-size: 30pt; line-height: .95; }
  .head h1 span { color: ${ACCENT}; }
  .head .role { color: ${ACCENT}; margin-top: 3mm; }
  .contact { text-align: right; color: ${INK2}; font-size: 8.6pt; line-height: 1.7; }
  .contact b { color: ${INK}; font-weight: 600; }
  .cols { display: grid; grid-template-columns: 1fr 57mm; gap: 9mm; margin-top: 6mm; flex: 1; }
  section + section { margin-top: 5mm; }
  h2 { display: flex; align-items: center; gap: 3mm; color: ${INK}; margin-bottom: 3mm; }
  h2::after { content: ""; flex: 1; height: 1px; background: ${LINE}; }
  .summary { font-size: 9.8pt; line-height: 1.5; color: ${INK2}; }
  .job { margin-bottom: 4mm; page-break-inside: avoid; }
  .job .top { display: flex; justify-content: space-between; align-items: baseline; gap: 4mm; }
  .job h3 { font-family: 'Bricolage Grotesque', sans-serif; font-weight: 600; font-size: 11.6pt; letter-spacing: -.01em; }
  .job .dates { font-family: 'IBM Plex Mono', monospace; font-size: 7.4pt; color: ${DIM}; white-space: nowrap; text-transform: uppercase; letter-spacing: .08em; }
  .job .org { color: ${INK2}; margin-top: .4mm; font-size: 9pt; }
  .job ul { margin-top: 1.6mm; list-style: none; }
  .job li { position: relative; padding-left: 4mm; margin-top: 1.1mm; }
  .job li::before { content: ""; position: absolute; left: .6mm; top: 1.9mm; width: 1.4mm; height: 1.4mm; border-radius: 50%; background: ${ACCENT}; }
  .rail .card { background: ${SURFACE}; border-radius: 2mm; padding: 4mm 4.2mm; }
  .rail .card + .card { margin-top: 3.5mm; }
  .rail h2::after { display: none; }
  .proj { margin-top: 2.2mm; padding-top: 2.2mm; border-top: 1px solid ${LINE}; }
  .proj:first-of-type { border-top: 0; padding-top: 0; }
  .proj .t { font-family: 'Bricolage Grotesque', sans-serif; font-weight: 600; font-size: 10.4pt; }
  .proj .d { color: ${INK2}; font-size: 8.6pt; }
  .proj .m { color: ${DIM}; margin-top: .6mm; font-size: 6.8pt; }
  .kv { margin-top: 2mm; }
  .kv .t { font-weight: 600; font-size: 8.8pt; }
  .kv .d { color: ${INK2}; font-size: 8.5pt; line-height: 1.45; }
  .facts { display: grid; grid-template-columns: repeat(3, 1fr); gap: 3mm; margin-top: 5mm; }
  .fact { border: 1px solid ${LINE}; border-radius: 2mm; padding: 3mm 3.6mm; }
  .fact .k { color: ${DIM}; }
  .fact .v { margin-top: 1mm; font-size: 9pt; line-height: 1.35; }
  .foot { margin-top: auto; padding-top: 4mm; border-top: 1px solid ${LINE}; display: flex; justify-content: space-between; color: ${DIM}; }
</style></head><body>
<div class="page">
  <header class="head">
    <div>
      <h1 class="display">Vaugn Jasper<br>Almeida<span>.</span></h1>
      <p class="mono role">Senior Brand &amp; Web Designer · Remote</p>
    </div>
    <div class="contact">
      <div><b>${CONTACT.email}</b></div>
      <div>${CONTACT.phone}</div>
      <div>${CONTACT.place}</div>
      <div>${CONTACT.site}</div>
      <div>${CONTACT.linkedin}</div>
    </div>
  </header>
  <div class="facts">
    <div class="fact"><p class="mono k">Now</p><p class="v">Senior Graphic Designer, Your SocialChef, since September 2026</p></div>
    <div class="fact"><p class="mono k">Looking for</p><p class="v">Senior brand and web design role, remote, full time or long term contract</p></div>
    <div class="fact"><p class="mono k">Hours</p><p class="v">GMT+8. Overlaps Australian business hours and US West Coast mornings</p></div>
  </div>
  <div class="cols">
    <main>
      <section><h2 class="mono">Summary</h2><p class="summary">${esc(SUMMARY.replace(/ Open to a senior.*$/, ""))}</p></section>
      <section><h2 class="mono">Experience</h2>${EXPERIENCE.slice(0, 2).map(job).join("")}</section>
    </main>
    <aside class="rail">
      <div class="card">
        <h2 class="mono">Selected work</h2>
        ${PROJECTS.map(([t, d, m]) => `<div class="proj"><p class="t">${esc(t)}</p><p class="d">${esc(d)}</p><p class="mono m">${esc(m)}</p></div>`).join("")}
        <p class="kv d" style="margin-top:3mm">Full cases with my part in each: ${CONTACT.site}</p>
      </div>
    </aside>
  </div>
  <footer class="foot mono"><span>Vaugn Jasper Almeida · CV 2026</span><span>Page 1 of 2</span></footer>
</div>
<div class="page">
  <div class="cols" style="margin-top:0">
    <main>
      <section><h2 class="mono">Experience, continued</h2>${EXPERIENCE.slice(2).map(job).join("")}</section>
    </main>
    <aside class="rail">
      <div class="card">
        <h2 class="mono">Skills</h2>
        ${SKILLS.map(([k, v]) => `<div class="kv"><p class="t">${esc(k)}</p><p class="d">${esc(v)}</p></div>`).join("")}
      </div>
      <div class="card">
        <h2 class="mono">Education</h2>
        ${EDUCATION.map(([t, d]) => `<div class="kv"><p class="t">${esc(t)}</p><p class="d">${esc(d)}</p></div>`).join("")}
        <h2 class="mono" style="margin-top:4mm">Certificate</h2>
        ${CERTIFICATE.map(([t, d]) => `<div class="kv"><p class="t">${esc(t)}</p><p class="d">${esc(d)}</p></div>`).join("")}
        <h2 class="mono" style="margin-top:4mm">Training</h2>
        <div class="kv"><p class="d">Completed through the agency account, without personal certificates:</p><p class="d" style="margin-top:1mm">${TRAINING.map(esc).join("<br>")}</p></div>
      </div>
    </aside>
  </div>
  <footer class="foot mono"><span>${CONTACT.email} · ${CONTACT.phone}</span><span>Page 2 of 2</span></footer>
</div>
</body></html>`;

/* ── Plain version: one column, reading order = DOM order ── */
const plain = `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8">${FONTS}
<style>
  @page { size: A4; margin: 16mm 18mm; }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Instrument Sans', Arial, sans-serif; font-size: 10pt; line-height: 1.45; color: #111; }
  h1 { font-size: 18pt; font-weight: 600; }
  .sub { margin-top: 1mm; font-size: 10.5pt; }
  .contact { margin-top: 2mm; font-size: 9.5pt; }
  h2 { font-size: 11pt; font-weight: 600; text-transform: uppercase; letter-spacing: .04em; border-bottom: 1px solid #999; padding-bottom: 1mm; margin: 5mm 0 2mm; }
  h3 { font-size: 10.5pt; font-weight: 600; margin-top: 3mm; }
  .meta { font-size: 9.5pt; }
  ul { margin: 1mm 0 0 5mm; }
  li { margin-top: .8mm; }
  p + p { margin-top: 1mm; }
</style></head><body>
  <h1>Vaugn Jasper Almeida</h1>
  <p class="sub">Senior Brand &amp; Web Designer</p>
  <p class="contact">Email: ${CONTACT.email} | Phone: ${CONTACT.phone} | Location: ${CONTACT.place}<br>Portfolio: ${CONTACT.site} | LinkedIn: ${CONTACT.linkedin}</p>
  <h2>Summary</h2>
  <p>${esc(SUMMARY)}</p>
  <h2>Experience</h2>
  ${EXPERIENCE.map((j) => `<h3>${esc(j.role)}</h3><p class="meta">${esc(j.org)} | ${esc(j.dates)}</p><ul>${j.bullets.map((b) => `<li>${esc(b)}</li>`).join("")}</ul>`).join("")}
  <h2>Skills</h2>
  ${SKILLS.map(([k, v]) => `<p><b>${esc(k)}:</b> ${esc(v)}</p>`).join("")}
  <h2>Education</h2>
  ${EDUCATION.map(([t, d]) => `<p><b>${esc(t)}</b>, ${esc(d)}</p>`).join("")}
  <h2>Certificate and training</h2>
  <p>HubSpot Academy Social Media certificate, in my own name.</p>
  <p>Training completed through the agency account, without personal certificates: ${TRAINING.join(", ")}.</p>
</body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage();
const PREVIEW = process.env.CV_PREVIEW_DIR ?? "review-shots";
fs.mkdirSync(PREVIEW, { recursive: true });
fs.mkdirSync(OUT_DIR, { recursive: true });

for (const [name, html] of [["cv", designed], ["cv-plain", plain]]) {
  await page.setContent(html, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(300);
  const out = path.join(OUT_DIR, `${name}.pdf`);
  await page.pdf({ path: out, format: "A4", printBackground: true, preferCSSPageSize: true });
  console.log(`wrote ${out} (${Math.round(fs.statSync(out).size / 1024)} KB)`);
  if (name === "cv") {
    await page.setViewportSize({ width: 794, height: 1123 });
    const pages = await page.$$(".page");
    for (let i = 0; i < pages.length; i++) await pages[i].screenshot({ path: `${PREVIEW}/cv-p${i + 1}.png` });
    // overflow guard: content must fit inside each fixed A4 page
    const over = await page.$$eval(".page", (ps) => ps.map((p) => p.scrollHeight - p.clientHeight));
    console.log("page overflow px:", over.join(", "));
  }
}
await browser.close();
