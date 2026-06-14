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

// Update NEXT_PUBLIC_SITE_URL (or this fallback) to the final domain after deploy.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Vaugn Almeida — Brand & Web Designer",
    template: "%s · Vaugn Almeida",
  },
  description:
    "Agency-trained, healthcare-fluent Brand & Web Designer. Visual systems that build credibility and convert.",
  openGraph: {
    title: "Vaugn Almeida — Brand & Web Designer",
    description:
      "Agency-trained, healthcare-fluent Brand & Web Designer. Visual systems that build credibility and convert.",
    url: siteUrl,
    siteName: "Vaugn Almeida",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vaugn Almeida — Brand & Web Designer",
    description:
      "Agency-trained, healthcare-fluent Brand & Web Designer. Visual systems that build credibility and convert.",
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
