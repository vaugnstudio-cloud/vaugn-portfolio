import type { Metadata } from "next";
import NicheLanding from "@/components/NicheLanding";
import { getNiche } from "@/data/niches";

const niche = getNiche("hospitality")!;

export const metadata: Metadata = {
  title: niche.metaTitle,
  description: niche.metaDescription,
  alternates: { canonical: "/hospitality" },
  // Unlinked since Nov 2026: freelance work avoids restaurant clients that
  // overlap with the agency role. Kept reachable, kept out of search.
  robots: { index: false, follow: true },
};

export default function HospitalityPage() {
  return <NicheLanding niche={niche} />;
}
