import type { Metadata } from "next";
import { Syne, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

// Headings — geometric, modern (Design System, Section 5)
const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

// Body — clean, readable, professional
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// Monospace — labels / tags
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
});

// Set NEXT_PUBLIC_SITE_URL to override (e.g. a custom domain); otherwise the
// live Vercel URL is used for absolute OG / canonical metadata.
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://vaugn-portfolio.vercel.app";

const titleDefault = "Vaugn Almeida — Brand & Marketing Designer";
const description =
  "Brand, web & marketing designer. Agency-trained, AI-enhanced graphic design, branding, and advertising creative across healthcare, hospitality, and 20+ agency accounts. Remote.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: titleDefault,
    template: "%s · Vaugn Almeida",
  },
  description,
  keywords: [
    "graphic designer",
    "brand designer",
    "marketing designer",
    "creative designer",
    "branding",
    "logo design",
    "social media design",
    "advertising design",
    "remote designer",
    "Philippines designer",
  ],
  openGraph: {
    title: titleDefault,
    description,
    url: siteUrl,
    siteName: "Vaugn Almeida",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: titleDefault,
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen flex flex-col">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
