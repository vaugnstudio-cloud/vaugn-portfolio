import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { SITE_URL, EMAIL } from "@/data/site";

// Display — editorial serif with true italics (2026 dark-editorial direction)
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

// Body — clean, readable, professional
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// Monospace — eyebrow labels / tags
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const titleDefault = "Vaugn Almeida — Senior Brand & Web Designer";
const description =
  "Senior brand & web designer for healthcare and hospitality. 5+ years, 20+ agency accounts, 7 live client sites — plus self-built products from design system to shipped PWA. Open to senior roles and select client projects.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: titleDefault,
    template: "%s · Vaugn Almeida",
  },
  description,
  keywords: [
    "senior brand designer",
    "senior web designer",
    "brand designer",
    "web designer",
    "product designer",
    "design systems",
    "design portfolio",
    "healthcare web designer",
    "hospitality branding",
    "restaurant marketing design",
    "Framer designer",
    "brand identity",
    "freelance designer",
  ],
  openGraph: {
    title: titleDefault,
    description,
    url: SITE_URL,
    siteName: "Vaugn Almeida",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: titleDefault,
    description,
  },
};

// JSON-LD: sitewide Person schema
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Vaugn Jasper Almeida",
  jobTitle: "Senior Brand & Web Designer",
  email: `mailto:${EMAIL}`,
  url: SITE_URL,
  knowsAbout: [
    "Brand identity design",
    "Web design",
    "Product design",
    "Design systems",
    "Healthcare marketing",
    "Hospitality marketing",
    "Framer",
    "Figma",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${fraunces.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="flex min-h-screen flex-col">
        {/* Theme init before paint — dark is default, light persists via localStorage */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              'try{if(localStorage.getItem("theme")==="light")document.documentElement.dataset.theme="light"}catch(e){}',
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
