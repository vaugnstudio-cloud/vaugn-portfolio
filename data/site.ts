// Sitewide constants — edit here, everything updates.

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://vaugn-portfolio.vercel.app";

export const EMAIL = "vaugn.studio@gmail.com";
export const LINKEDIN_URL = "https://linkedin.com/in/vaugn-almeida";
export const LINKEDIN_LABEL = "linkedin.com/in/vaugn-almeida";

// Formspree form id — contact form + footer email capture (env var overrides).
export const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID ?? "meebpqde";

// Cal.com booking link — the path after cal.com/ (env var overrides).
export const CAL_LINK =
  process.env.NEXT_PUBLIC_CAL_LINK ?? "vaugn-almeida-wavcgv";

// About-page intro video. Leave undefined — the video section stays hidden
// until a real file is added (must pass the "no client would suspect AI" bar).
export const INTRO_VIDEO_SRC: string | undefined = undefined;

// Portrait photo (undefined → designed placeholder, no failed requests).
export const PORTRAIT_SRC: string | undefined = "/images/vaugn-photo.jpg";

// Real numbers only — no invented metrics.
export const STATS = [
  { value: "5+", label: "Years in design" },
  { value: "20+", label: "Agency accounts managed" },
  { value: "3", label: "Markets · AU / US / EU" },
  { value: "7", label: "Live sites you can visit" },
] as const;

export const RESPONSE_PROMISE = "Replies within 24–48 hours";
