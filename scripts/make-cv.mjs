// Designed CV — same facts as the finalized 2026 résumé, set in the
// portfolio's own type and colour so the PDF a recruiter downloads looks
// like it came from the designer whose site they are on. Two A4 pages, real
// text (ATS-readable), DOM order = reading order.
//   node scripts/make-cv.mjs            → public/cv.pdf
//   node scripts/make-cv.mjs out.pdf
// Run from PowerShell on this machine (Bash-launched browsers die silently).
import { chromium } from "playwright";
import fs from "node:fs";

const OUT = process.argv[2] ?? "public/cv.pdf";

const INK = "#1A1816", INK2 = "#4A4541", DIM = "#8A837C", LINE = "#E3DED6", ACCENT = "#E85D1F", PAPER = "#FFFFFF", SURFACE = "#F7F4EE";

const EXPERIENCE = [
  {
    role: "Brand & Web Designer",
    org: "Your SocialChef · Victoria, Australia (Remote)",
    dates: "Feb 2023 – Present",
    lede: "Primary brand and web designer at an Australian marketing agency — creative output across 20+ concurrent client accounts spanning hospitality, healthcare, retail, and professional services.",
    bullets: [
      "Own creative delivery across 20+ concurrent accounts: campaigns, ads, carousels, story systems, short-form video, and print/digital collateral, weekly, under agency deadlines.",
      "Built the Tacos 'N' Tequilas brand visual guide, nine-tile Instagram grid, and Sunday Birria Night campaign (Sep 2026) — three variations × three formats, animated stories, layered PSDs, and a hand-back document that resolved two conflicting brand sources.",
      "Designed website mockups and UI layouts in Figma for agency clients including Junk Sunshine Coast and ACEF Enterprises, handed over as build-ready specs; sites live today.",
      "Built repeatable brand frameworks — content template systems, identity rulebooks, campaign structures — so the agency grew its client intake without a proportional increase in design hours.",
      "Integrated AI tooling into daily production (Adobe Firefly, Photoshop Generative AI, Magnific, Higgsfield, ChatGPT, Claude) for exploration, versioning, and upscaling; direction and final craft stay hand-made.",
    ],
  },
  {
    role: "Independent Brand & Web Designer",
    org: "Vaugn Studio · Philippines (Remote)",
    dates: "Mar 2022 – Present",
    lede: "Identity, websites, and marketing systems for healthcare, hospitality, and growth businesses — designed and built end to end.",
    bullets: [
      "Shipped complete brand-to-website engagements: MedSync Mental Health (live Framer site for a California psychiatry clinic), Ozmax Care (Australian NDIS provider), InBloom Therapy, Mekong Merchant.",
      "Designed, built, and launched a self-initiated product line in 2026 — five niche website kits (Averis, Lumière, Éclat, Maison, Esprit) and three working apps (Studio OS, SOP Quest, Outreach Cockpit) — design system to production PWA, solo.",
    ],
  },
  {
    role: "Creative Designer — Part-time",
    org: "ACEF Enterprises · California, USA (Remote)",
    dates: "Mar 2024 – Nov 2025",
    bullets: [
      "Developed a coordinated healthcare marketing suite — trifold brochures, roll-up banners, calling-card materials, social assets — for physician office managers and hospital administrators.",
      "Translated revenue-cycle-management services into clear, benefit-led visual communication with strong hierarchy and healthcare credibility cues; production-ready across print and digital.",
    ],
  },
  {
    role: "Revenue Cycle Management Specialist",
    org: "ChrisNGrace Inc. · California, USA (Remote)",
    dates: "May 2023 – Dec 2025",
    bullets: [
      "Supported revenue-cycle operations for physician clinics and allied-health providers: claim review, submission monitoring, denial follow-up, payer coordination — across Noridian Medicare, Office Ally, CollaborateMD, and Practice Fusion.",
      "Identified recurring denial and documentation issues, reducing avoidable rework between clinical and billing teams — the inside view that now informs my healthcare design work.",
    ],
  },
  {
    role: "Brand Designer",
    org: "Lucia's Kitchen & Pomodoro Pizza · Manila, Philippines",
    dates: "Feb 2021 – Dec 2022",
    bullets: [
      "Built complete visual identities for two F&B brands across menus, packaging, signage, social, and in-store materials; branded content and campaigns lifted Lucia's social engagement by roughly 80% and contributed to measurable in-store traffic growth.",
    ],
  },
];

const PROJECTS = [
  ["Tacos 'N' Tequilas", "Brand visual guide · grid · campaign · motion", "Agency · Melbourne · 2026"],
  ["MedSync Mental Health", "Brand & Framer website, live", "Client · California · 2025"],
  ["Ozmax Care", "Brand identity, guide & website", "Agency · Melbourne · 2026"],
  ["Junk Sunshine Coast", "Brand, website & social system", "Agency · QLD · 2023–"],
  ["ACEF Enterprises", "Healthcare brand & marketing suite", "Client · California · 2024–25"],
  ["Product line", "5 website kits · 4 working apps", "Self-initiated · 2025–26"],
];

const SKILLS = [
  ["Brand & campaign", "Identity systems · brand guides · campaign creative · social systems · print"],
  ["Web & product", "Figma (UI/UX) · Framer · Webflow · HTML/CSS · design systems · responsive build"],
  ["Adobe & motion", "Photoshop · Illustrator · InDesign · After Effects · Premiere Pro · Lightroom"],
  ["AI-assisted production", "Firefly · Photoshop Generative AI · Magnific · Higgsfield · ChatGPT · Claude"],
  ["Domain", "Healthcare & medical billing · marketing agencies · hospitality & F&B"],
];

const EDUCATION = [
  ["BS Industrial Engineering", "Polytechnic University of the Philippines · 2020"],
  ["Google UX Design Professional Certificate", "Google / Coursera · 2026"],
  ["AI Fundamentals", "DataCamp · 2025"],
  ["HTML, CSS & JavaScript for Web Developers", "Coursera · 2024"],
  ["Graphic Design Masterclass", "Udemy · 2023"],
  ["Social Media Marketing", "HubSpot Academy · 2022"],
];

const HOW = [
  "Systems over one-offs: every account gets a rulebook — palette, type, layout skeletons, voice — so weekly batches ship without drift.",
  "Honest hand-backs: reasoning next to every piece, conflicts in the inputs flagged before anything else, assumptions stated so a lead can overturn them.",
  "Build-ready by default: Figma to clean specs, or the Framer/Webflow build itself with a CMS the client runs without me.",
];

const esc = (t) => t.replace(/&/g, "&amp;").replace(/</g, "&lt;");

const html = `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..700;1,9..144,300..700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap">
<style>
  @page { size: A4; margin: 0; }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body { background: ${PAPER}; color: ${INK}; font-family: 'Inter', system-ui, sans-serif; font-size: 9.6pt; line-height: 1.42; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  .page { width: 210mm; height: 297mm; padding: 16mm 16mm 14mm; position: relative; page-break-after: always; display: flex; flex-direction: column; overflow: hidden; }
  .page:last-child { page-break-after: auto; }
  .mono { font-family: 'JetBrains Mono', monospace; font-size: 7.4pt; letter-spacing: .18em; text-transform: uppercase; }
  .display { font-family: 'Fraunces', serif; font-weight: 500; letter-spacing: -.01em; }
  a { color: inherit; text-decoration: none; }
  /* header */
  .head { display: grid; grid-template-columns: 1fr auto; gap: 10mm; align-items: end; padding-bottom: 6mm; border-bottom: 1.5px solid ${INK}; }
  .head h1 { font-size: 27pt; line-height: 1; }
  .head h1 span { color: ${ACCENT}; }
  .head .role { color: ${ACCENT}; margin-top: 3mm; }
  .head .tag { color: ${INK2}; margin-top: 2mm; font-size: 9.4pt; }
  .contact { text-align: right; color: ${INK2}; font-size: 8.6pt; line-height: 1.7; }
  .contact b { color: ${INK}; font-weight: 500; }
  /* layout */
  .cols { display: grid; grid-template-columns: 1fr 58mm; gap: 9mm; margin-top: 6mm; flex: 1; }
  section + section { margin-top: 5.5mm; }
  h2 { display: flex; align-items: center; gap: 3mm; color: ${INK}; margin-bottom: 3mm; }
  h2::after { content: ""; flex: 1; height: 1px; background: ${LINE}; }
  h2 .n { color: ${ACCENT}; }
  .summary { font-size: 9.8pt; line-height: 1.5; color: ${INK2}; }
  .summary b { color: ${INK}; font-weight: 500; }
  /* experience */
  .job { margin-bottom: 4.2mm; page-break-inside: avoid; }
  .job .top { display: flex; justify-content: space-between; align-items: baseline; gap: 4mm; }
  .job h3 { font-family: 'Fraunces', serif; font-weight: 500; font-size: 12pt; line-height: 1.15; }
  .job .dates { color: ${DIM}; white-space: nowrap; }
  .job .org { color: ${INK2}; margin-top: .6mm; font-size: 9pt; }
  .job .lede { color: ${INK2}; margin-top: 1.6mm; font-style: italic; font-size: 9pt; }
  .job ul { margin-top: 1.8mm; padding-left: 0; list-style: none; }
  .job li { position: relative; padding-left: 4mm; margin-top: 1.2mm; color: ${INK}; }
  .job li::before { content: "—"; position: absolute; left: 0; color: ${ACCENT}; }
  /* rail */
  .rail .card { background: ${SURFACE}; border-radius: 3mm; padding: 4mm 4.2mm; }
  .rail .card + .card { margin-top: 3.5mm; }
  .rail h2 { margin-bottom: 2.6mm; }
  .rail h2::after { display: none; }
  .skill { margin-top: 2.2mm; }
  .skill .k { color: ${INK}; font-weight: 600; font-size: 8.8pt; }
  .skill .v { color: ${INK2}; font-size: 8.6pt; line-height: 1.45; margin-top: .4mm; }
  .proj { display: grid; grid-template-columns: 1fr; margin-top: 2.2mm; padding-top: 2.2mm; border-top: 1px solid ${LINE}; }
  .proj:first-of-type { border-top: 0; padding-top: 0; }
  .proj .t { font-family: 'Fraunces', serif; font-weight: 500; font-size: 10.4pt; }
  .proj .d { color: ${INK2}; font-size: 8.6pt; margin-top: .3mm; }
  .proj .m { color: ${DIM}; margin-top: .8mm; font-size: 6.8pt; }
  .edu { margin-top: 2mm; }
  .edu .t { font-weight: 600; font-size: 8.8pt; }
  .edu .d { color: ${INK2}; font-size: 8.4pt; }
  .foot { margin-top: auto; padding-top: 4mm; border-top: 1px solid ${LINE}; display: flex; justify-content: space-between; color: ${DIM}; }
  .facts { display: grid; grid-template-columns: repeat(3, 1fr); gap: 3mm; margin-top: 5mm; }
  .fact { border: 1px solid ${LINE}; border-radius: 3mm; padding: 3mm 3.6mm; }
  .fact .k { color: ${DIM}; }
  .fact .v { margin-top: 1mm; font-size: 9pt; color: ${INK}; line-height: 1.35; }
</style></head><body>

<div class="page">
  <header class="head">
    <div>
      <h1 class="display">Vaugn Jasper Almeida<span>.</span></h1>
      <p class="mono role">Senior Brand &amp; Web Designer · Remote</p>
      <p class="tag">Healthcare-fluent · agency-trained on 20+ concurrent accounts · ships own products</p>
    </div>
    <div class="contact">
      <div><b>vaugn.studio@gmail.com</b></div>
      <div>+63 909 203 0913 · Manila, Philippines (GMT+8)</div>
      <div>vaugn-portfolio.vercel.app</div>
      <div>linkedin.com/in/vaugn-almeida</div>
    </div>
  </header>

  <div class="facts">
    <div class="fact"><p class="mono k">Looking for</p><p class="v">Senior brand &amp; web design role — full-time or long-term contract, remote</p></div>
    <div class="fact"><p class="mono k">Hours</p><p class="v">Overlaps Australian business hours, US-West mornings, EU afternoons</p></div>
    <div class="fact"><p class="mono k">Stack</p><p class="v">Figma · Framer · Webflow · Adobe CC · After Effects · AI-assisted production</p></div>
  </div>

  <div class="cols">
    <main>
      <section>
        <h2 class="mono"><span class="n">01</span> Profile</h2>
        <p class="summary">Brand and web designer with <b>5+ years in design</b>, including <b>3+ years inside an Australian agency</b> running creative for 20+ concurrent accounts across hospitality, healthcare, retail, and professional services. I take a brand from strategy to shipped site — identity, campaign systems, web design, and the build itself in Framer or Webflow — as one accountable designer. Healthcare fluency comes from the inside: two years in US revenue-cycle operations means clinics and billing firms skip the onboarding most designers need. AI-assisted production compresses versioning and exploration; direction, taste, and final craft stay mine.</p>
      </section>

      <section>
        <h2 class="mono"><span class="n">02</span> Experience</h2>
        ${EXPERIENCE.slice(0, 1).map((j) => `
        <article class="job">
          <div class="top"><h3>${esc(j.role)}</h3><span class="mono dates">${esc(j.dates)}</span></div>
          <p class="org">${esc(j.org)}</p>
          ${j.lede ? `<p class="lede">${esc(j.lede)}</p>` : ""}
          <ul>${j.bullets.map((b) => `<li>${esc(b)}</li>`).join("")}</ul>
        </article>`).join("")}
      </section>

    </main>

    <aside class="rail">
      <div class="card">
        <h2 class="mono"><span class="n">03</span> Selected work</h2>
        ${PROJECTS.map(([t, d, m]) => `<div class="proj"><p class="t">${esc(t)}</p><p class="d">${esc(d)}</p><p class="mono m">${esc(m)}</p></div>`).join("")}
      </div>
    </aside>
  </div>

  <footer class="foot mono"><span>Vaugn Jasper Almeida · CV 2026</span><span>Page 1 of 2</span></footer>
</div>

<div class="page">
  <div class="cols" style="margin-top:0">
    <main>
      <section>
        <h2 class="mono"><span class="n">02</span> Experience, continued</h2>
        ${EXPERIENCE.slice(1).map((j) => `
        <article class="job">
          <div class="top"><h3>${esc(j.role)}</h3><span class="mono dates">${esc(j.dates)}</span></div>
          <p class="org">${esc(j.org)}</p>
          ${j.lede ? `<p class="lede">${esc(j.lede)}</p>` : ""}
          <ul>${j.bullets.map((b) => `<li>${esc(b)}</li>`).join("")}</ul>
        </article>`).join("")}
      </section>

      <section>
        <h2 class="mono"><span class="n">04</span> How I work</h2>
        <ul style="list-style:none">
          ${HOW.map((b) => `<li style="position:relative;padding-left:4mm;margin-top:1.4mm"><span style="position:absolute;left:0;color:${ACCENT}">—</span>${esc(b)}</li>`).join("")}
        </ul>
      </section>
    </main>

    <aside class="rail">
      <div class="card">
        <h2 class="mono"><span class="n">05</span> Skills</h2>
        ${SKILLS.map(([k, v]) => `<div class="skill"><p class="k">${esc(k)}</p><p class="v">${esc(v)}</p></div>`).join("")}
      </div>
      <div class="card">
        <h2 class="mono"><span class="n">06</span> Education &amp; certifications</h2>
        ${EDUCATION.map(([t, d]) => `<div class="edu"><p class="t">${esc(t)}</p><p class="d">${esc(d)}</p></div>`).join("")}
      </div>
      <div class="card">
        <h2 class="mono"><span class="n">07</span> Links</h2>
        <div class="edu"><p class="t">Portfolio</p><p class="d">vaugn-portfolio.vercel.app</p></div>
        <div class="edu"><p class="t">Live client sites</p><p class="d">medsyncmentalhealth.com · ozmaxcare.com.au · junksunshinecoast.com.au · yoursocialchef.com</p></div>
        <div class="edu"><p class="t">LinkedIn</p><p class="d">linkedin.com/in/vaugn-almeida</p></div>
        <div class="edu"><p class="t">References</p><p class="d">Available on request</p></div>
      </div>
    </aside>
  </div>
  <footer class="foot mono"><span>vaugn.studio@gmail.com · +63 909 203 0913</span><span>Page 2 of 2</span></footer>
</div>
</body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage();
await page.setContent(html, { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(300);
await page.pdf({ path: OUT, format: "A4", printBackground: true, preferCSSPageSize: true });
// preview PNGs (outside public/) for a quick visual check
const PREVIEW = process.env.CV_PREVIEW_DIR ?? "review-shots";
fs.mkdirSync(PREVIEW, { recursive: true });
await page.setViewportSize({ width: 794, height: 1123 });
const pages = await page.$$(".page");
for (let i = 0; i < pages.length; i++) {
  await pages[i].screenshot({ path: `${PREVIEW}/cv-p${i + 1}.png`, type: "png" });
}
await browser.close();
console.log(`wrote ${OUT} (${Math.round(fs.statSync(OUT).size / 1024)} KB)`);
