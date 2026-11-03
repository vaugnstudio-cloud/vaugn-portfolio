import type { Metadata } from "next";
import { Bricolage_Grotesque, Instrument_Sans, IBM_Plex_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { SITE_URL, EMAIL } from "@/data/site";

// Display: grotesk with optical sizing (November 2026 "proof sheet" direction)
const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

// Body: clear and friendly at reading sizes
const instrument = Instrument_Sans({
  variable: "--font-instrument",
  subsets: ["latin"],
});

// Monospace: captions, labels and numbers
const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const titleDefault = "Vaugn Almeida, Senior Brand & Web Designer";
const description =
  "Senior Brand & Web Designer. Senior Graphic Designer at Your SocialChef, an Australian agency, and designer of websites for direct clients in Framer. Campaign graphics, brand guides and websites. Open to senior roles and select client projects.";

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
      className={`${bricolage.variable} ${instrument.variable} ${plexMono.variable}`}
    >
      <body className="flex min-h-screen flex-col">
        {/* Theme init before paint: light is default, dark persists via localStorage */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              'try{if(localStorage.getItem("theme")==="dark")document.documentElement.dataset.theme="dark"}catch(e){}',
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-accent focus:px-5 focus:py-2.5 focus:text-sm focus:font-medium focus:text-accent-ink"
        >
          Skip to content
        </a>
        <Nav />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        {/* Scroll-reveal driver — vanilla, runs without waiting for React
            hydration. Content stays visible if this never runs. The
            MutationObserver re-scans after client-side route changes, so
            pages reached via <Link> navigation reveal too, not only full
            page loads. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{
if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
if(!('IntersectionObserver' in window))return;
document.documentElement.classList.add('js');
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},{threshold:0.1,rootMargin:'0px 0px -6% 0px'});
var seen=typeof WeakSet==='function'?new WeakSet():null;
var scan=function(){document.querySelectorAll('[data-fadein]').forEach(function(el){if(el.classList.contains('in'))return;if(seen){if(seen.has(el))return;seen.add(el);}io.observe(el);});};
var boot=function(){scan();new MutationObserver(function(){scan();}).observe(document.body,{childList:true,subtree:true});};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
}catch(e){document.documentElement.classList.remove('js');}})();`,
          }}
        />
        <Analytics />
      </body>
    </html>
  );
}
