// Sitewide constants. Edit here, everything updates.

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://vaugn-portfolio.vercel.app";

export const EMAIL = "vaugn.studio@gmail.com";

// Plain mailto link, so it opens whatever mail app the visitor uses
// (Gmail compose links only suit Gmail users). Pair with CopyEmail.
export function mailto(subject = "", body = ""): string {
  const params = new URLSearchParams();
  if (subject) params.set("subject", subject);
  if (body) params.set("body", body);
  const qs = params.toString().replace(/\+/g, "%20");
  return `mailto:${EMAIL}${qs ? `?${qs}` : ""}`;
}
export const LINKEDIN_URL = "https://linkedin.com/in/vaugn-almeida";
export const LINKEDIN_LABEL = "linkedin.com/in/vaugn-almeida";

// Formspree form id for the contact form (env var overrides). Delivery has
// not been tested end to end; the page keeps email as the primary route.
export const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID ?? "meebpqde";

// Cal.com booking link: the path after cal.com/ (env var overrides).
export const CAL_LINK =
  process.env.NEXT_PUBLIC_CAL_LINK ?? "vaugn-almeida-wavcgv";

// About-page intro video. Leave undefined: the video section stays hidden
// until a real file is added (must pass the "no client would suspect AI" bar).
export const INTRO_VIDEO_SRC: string | undefined = undefined;

// Portrait photo (undefined → designed placeholder, no failed requests).
export const PORTRAIT_SRC: string | undefined = "/images/vaugn-photo.jpg";

// Downloadable CV, copied to public/.
export const CV_URL = "/cv.pdf";
// One column version for upload forms and screening software.
export const CV_PLAIN_URL = "/cv-plain.pdf";

// Portfolio deck for applications that ask for a file upload
// (scripts/portfolio-pdf.mjs → public/portfolio.pdf).
export const PORTFOLIO_PDF_URL = "/portfolio.pdf";

// Availability line: header, footer, contact.
export const AVAILABILITY = "Open to senior roles and select client projects";

// The facts a hiring manager scans for before reading anything else.
export const HIRING_FACTS = [
  { label: "Now", value: "Senior Graphic Designer at Your SocialChef, an Australian agency, since September 2026" },
  { label: "Looking for", value: "A senior brand and web design role, full time or long term contract, remote" },
  { label: "Based", value: "Greater Manila Area, GMT+8. Overlaps Australian hours" },
  { label: "Tools", value: "Figma, Framer, Photoshop, Illustrator, InDesign, After Effects" },
] as const;

// Real numbers only. Counts that are not reconciled yet (websites, apps)
// stay off the site until they are.
export const STATS = [
  { value: "20+", label: "Client accounts, across several years" },
  { value: "2023", label: "Joined Your SocialChef" },
  { value: "2026", label: "Promoted to Senior Graphic Designer" },
] as const;

export const RESPONSE_PROMISE = "I usually reply within two working days";
