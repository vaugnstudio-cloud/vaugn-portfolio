import type { NextConfig } from "next";

// Security headers — the site is static with no auth/DB, so the attack
// surface is minimal by design; these harden what remains.
// React/Turbopack need eval + websockets in dev only; production stays strict.
const isDev = process.env.NODE_ENV === "development";

const securityHeaders = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  {
    // Allow self + Vercel tooling; Formspree for form posts; Cal.com for booking.
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://va.vercel-scripts.com`,
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob:",
      "font-src 'self'",
      `connect-src 'self'${isDev ? " ws: wss:" : ""} https://formspree.io https://va.vercel-scripts.com`,
      "frame-src https://cal.com https://app.cal.com",
      "form-action 'self' https://formspree.io",
      "base-uri 'self'",
      "frame-ancestors 'none'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  // The old restaurant pitch page (Nov 2026: freelance avoids restaurant work
  // that overlaps the agency role) sends visitors to the case archive. Not
  // permanent, so the page can come back if the policy changes.
  async redirects() {
    return [{ source: "/hospitality", destination: "/work", permanent: false }];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
