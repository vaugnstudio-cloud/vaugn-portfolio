import type { Metadata } from "next";
import NicheLanding from "@/components/NicheLanding";
import { getNiche } from "@/data/niches";

const niche = getNiche("hospitality")!;

export const metadata: Metadata = {
  title: niche.metaTitle,
  description: niche.metaDescription,
  alternates: { canonical: "/hospitality" },
};

export default function HospitalityPage() {
  return <NicheLanding niche={niche} />;
}
