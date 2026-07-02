// Niche landing pages — /healthcare and /hospitality.
// Each speaks 100% to one buyer type. Linked from services cards + footer
// (not main nav, to keep it clean).

export interface Niche {
  slug: string;
  label: string;
  metaTitle: string;
  metaDescription: string;
  headline: string; // supports *italic* accent via <em> split on asterisks
  subheadline: string;
  pains: { title: string; body: string }[];
  projectIds: string[]; // relevant work, in display order
  serviceId: string; // the matching package
  faq: { q: string; a: string }[];
}

export const niches: Niche[] = [
  {
    slug: "healthcare",
    label: "Healthcare",
    metaTitle: "Healthcare Brand & Web Design",
    metaDescription:
      "Brand identity and websites for clinics, therapy practices, dental clinics, med-spas, NDIS providers, and health businesses — designed to earn patient trust from the first glance.",
    headline: "Patients decide if they *trust* you before they read a word.",
    subheadline:
      "Brand identity and websites for clinics, therapy practices, dental & specialist clinics, med-spas, NDIS providers, and health businesses — from a designer with real healthcare-industry experience, including medical billing and RCM.",
    pains: [
      {
        title: "Your website feels colder than your care",
        body: "Healthcare sites default to sterile templates or stock-photo warmth. Neither earns trust. The design has to feel the way your waiting room should — calm, competent, human.",
      },
      {
        title: "Credibility isn't optional in this industry",
        body: "Patients, carers, and plan managers all scan for signals: who's behind this, are they legitimate, what happens to my information. I design those answers into the structure — not as an afterthought.",
      },
      {
        title: "Generic designers don't speak healthcare",
        body: "I've worked inside the industry — including US medical billing and RCM — so compliance-aware content, patient journeys, and clinical credibility aren't new concepts I learn on your project.",
      },
    ],
    projectIds: [
      "medsync",
      "ozmax-care",
      "inbloom-therapy",
      "acef-enterprises",
      "wellness-medspa-branding",
      "dental-clinic-branding",
    ],
    serviceId: "healthcare",
    faq: [
      {
        q: "Do you understand healthcare compliance constraints?",
        a: "I design with compliance awareness — careful claims, privacy-conscious forms, accessible layouts — and flag anything that needs your compliance officer's review. Final regulatory sign-off always stays with you.",
      },
      {
        q: "Can you work with our existing brand?",
        a: "Yes. Some healthcare projects are full identities, others are website-only builds on an existing brand. The package flexes either way.",
      },
      {
        q: "What healthcare work have you actually shipped?",
        a: "MedSync (mental health — live), Ozmax Care (NDIS), InBloom Therapy, and a full US healthcare-billing marketing suite for ACEF Enterprises. The case studies are on this site — most with live links you can visit.",
      },
    ],
  },
  {
    slug: "hospitality",
    label: "Hospitality",
    metaTitle: "Restaurant & Hospitality Brand Design",
    metaDescription:
      "Brand systems, websites, and social content engines for restaurants, cafés, boutique hotels, breweries, and venues — designed to make the food the hero and the brand impossible to ignore.",
    headline: "People eat with their eyes — *online first*.",
    subheadline:
      "Brand systems, websites with ordering, and social content engines for restaurants, cafés, boutique hotels, breweries, and venues. Built as systems that keep working week after week — proven across live Australian venues.",
    pains: [
      {
        title: "One-off graphics don't feed a feed",
        body: "A logo isn't a marketing system. Venues need weekly content, menu drops, event promos, and a website that takes orders — all speaking one visual language. I build the system, not just the pieces.",
      },
      {
        title: "Your food deserves better photos than your feed shows",
        body: "Photo enhancement and colour grading are part of the package — the difference between a phone snap and a post that makes someone hungry.",
      },
      {
        title: "Consistency dies when the agency hands over",
        body: "Everything ships as templates with rules — so whoever posts next week keeps the brand tight without a designer on call. (Though the retainer exists if you want one.)",
      },
    ],
    projectIds: [
      "junk-sunshine-coast",
      "mekong-merchant",
      "yassas",
      "feedme-group",
      "specialty-coffee-branding",
      "boutique-hotel-branding",
    ],
    serviceId: "hospitality",
    faq: [
      {
        q: "Can you handle online ordering and bookings?",
        a: "Yes — Mekong Merchant's site and ordering system were designed end to end, and booking/ordering flows are part of the hospitality package.",
      },
      {
        q: "We just need social content, not a rebrand — is that possible?",
        a: "Yes. The system is modular: some venues start with the social engine and grow into the full package, or hold it as a monthly retainer.",
      },
      {
        q: "What hospitality work is live right now?",
        a: "Junk Sunshine Coast (two venues, ongoing since 2023), Mekong Merchant of Taste, Yassas, and FeedMe Group — all linked from the work page so you can see them in the wild.",
      },
    ],
  },
];

export function getNiche(slug: string): Niche | undefined {
  return niches.find((n) => n.slug === slug);
}
