import type { Metadata } from "next";
import NicheLanding from "@/components/NicheLanding";
import { getNiche } from "@/data/niches";

const niche = getNiche("healthcare")!;

export const metadata: Metadata = {
  title: niche.metaTitle,
  description: niche.metaDescription,
  alternates: { canonical: "/healthcare" },
};

export default function HealthcarePage() {
  return <NicheLanding niche={niche} />;
}
