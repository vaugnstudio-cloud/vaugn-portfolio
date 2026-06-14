// All project data lives here. No CMS — edit this file to update case studies.
// Curated, healthcare-led lineup of 10 (2026 refresh). Copy finalized from
// Vaugn's scope answers.

export interface Project {
  id: string;
  title: string;
  client: string;
  year: string;
  category: string[];
  headline: string;
  description: string;
  deliverables: string[];
  coverImage: string;
  featured: boolean;
  url?: string; // live site, where applicable
}

export const projects: Project[] = [
  // ── HEALTHCARE (niche lead) ──────────────────────────────
  {
    id: "medsync",
    title: "MedSync",
    client: "Mental Health Service · Australia",
    year: "2026",
    category: ["HEALTHCARE", "BRAND DESIGN", "WEB DESIGN", "FRAMER"],
    headline: "A mental-health platform, designed and built to earn trust.",
    description:
      "End-to-end work for MedSync, an Australian mental health service — brand identity through to a conversion-focused website designed and built in Framer. Calm, credible, and clinically reassuring from the first scroll.",
    deliverables: [
      "Brand identity",
      "Website design",
      "Framer build",
      "Responsive layout",
    ],
    coverImage: "/images/medsync-cover.jpg",
    featured: true,
    url: "https://medsyncmentalhealth.com/",
  },
  {
    id: "ozmax-care",
    title: "Ozmax Care",
    client: "NDIS & Disability Support · Australia",
    year: "2026",
    category: ["HEALTHCARE", "BRAND DESIGN", "WEB DESIGN"],
    headline: "A disability-care brand built to feel personal and dependable.",
    description:
      "Full brand identity for Ozmax Care, a Melbourne NDIS and disability-support provider — logo, colour palette, and typography — plus homepage website design built around its warm, trust-first “Empowering Every Ability” message. Created with Your SocialChef.",
    deliverables: [
      "Logo & identity",
      "Colour palette",
      "Typography system",
      "Website homepage",
    ],
    coverImage: "/images/ozmax-cover.png", // hero crop from exported Desktop.pdf
    featured: true,
    // Not live yet (Figma prototype).
  },
  {
    id: "inbloom-therapy",
    title: "InBloom Therapy",
    client: "Therapy Practice · Australia",
    year: "2026",
    category: ["HEALTHCARE", "BRAND DESIGN", "WEB DESIGN"],
    headline: "Brand and website for a therapy practice, built to reassure.",
    description:
      "Brand identity and full website for InBloom Therapy — warm, calming visual language designed for a mental-health audience and built for conversion. Final staging in progress.",
    deliverables: [
      "Brand identity",
      "Website design",
      "Web build",
      "Responsive layout",
    ],
    coverImage: "/images/inbloom-cover.jpg",
    featured: false,
    // Staging in progress — live URL withheld until launch.
  },
  {
    id: "acef-enterprises",
    title: "ACEF Enterprises",
    client: "Healthcare Billing · USA",
    year: "2024–2025",
    category: ["HEALTHCARE", "BRAND DESIGN", "PRINT"],
    headline: "Healthcare brand system built for clinical credibility.",
    description:
      "A complete, trust-first marketing suite for a US healthcare billing firm — trifold brochures, roll-up banners, calling-card systems, and Instagram Stories. Designed to read as credible to the people who sign off: physician office managers and hospital administrators.",
    deliverables: [
      "Trifold brochure",
      "Roll-up stand banner",
      "Calling card template",
      "Instagram Stories",
    ],
    coverImage: "/images/acef-cover.jpg",
    featured: false,
  },

  // ── AGENCY SCALE ─────────────────────────────────────────
  {
    id: "your-socialchef",
    title: "Your SocialChef",
    client: "Marketing Agency · Australia",
    year: "2023–Present",
    category: ["AGENCY", "BRAND DESIGN", "WEB DESIGN"],
    headline: "Creative direction across 20+ client accounts.",
    description:
      "In-house creative for Your SocialChef — brand campaigns, social media systems, Figma web mockups, and short-form video across 20+ concurrent client accounts spanning healthcare, hospitality, retail, and professional services. Agency volume, held to one consistent standard.",
    deliverables: [
      "Instagram carousel series",
      "Agency website contribution",
      "Brand campaign creative",
      "Social media templates",
    ],
    coverImage: "/images/ysc-cover.jpg",
    featured: false,
    url: "https://yoursocialchef.com/",
  },

  // ── HOSPITALITY (best-of) ────────────────────────────────
  {
    id: "mekong-merchant",
    title: "Mekong Merchant of Taste",
    client: "Restaurant · Australia",
    year: "2026",
    category: ["WEB DESIGN", "BRAND DESIGN", "ORDERING SYSTEM"],
    headline: "Restaurant brand, website, and online ordering — designed end to end.",
    description:
      "Brand creative and full design for Mekong Merchant of Taste — both the website and its online ordering system — paired with the in-house build team at Your SocialChef. Appetite-led visuals with a clear, functional ordering flow.",
    deliverables: [
      "Website design",
      "Ordering system UI",
      "Brand creative",
    ],
    coverImage: "/images/mekong-cover.jpg",
    featured: true,
    url: "https://mekongmerchant.com.au/",
  },
  {
    id: "junk-sunshine-coast",
    title: "Junk Sunshine Coast",
    client: "Restaurant · Australia",
    year: "2023–Present",
    category: ["BRAND DESIGN", "WEB DESIGN", "SOCIAL MEDIA"],
    headline: "A bold brand and website built to match the food's energy.",
    description:
      "Social media design, Figma website design, photo editing, and print collateral for Junk Sunshine Coast — a high-energy Australian food brand. A loud, confident visual system, now live across its Sippy Downs and Maroochydore venues. Ongoing retainer with Your SocialChef.",
    deliverables: [
      "Instagram story templates",
      "Promotional posters",
      "Website design",
      "Photo enhancement & color grading",
    ],
    coverImage: "/images/junk-cover.jpg",
    featured: false,
    url: "https://junksunshinecoast.com.au/",
  },
  {
    id: "yassas",
    title: "Yassas",
    client: "Hospitality · Australia",
    year: "2025–2026",
    category: ["WEB DESIGN", "BRAND DESIGN", "HOSPITALITY"],
    headline: "Full website and brand for a modern Greek venue.",
    description:
      "End-to-end website page design and branding for Yassas — a contemporary Greek hospitality brand. Bold, appetite-led visuals carried across the full site. Created with Your SocialChef.",
    deliverables: ["Website design", "Brand identity"],
    coverImage: "/images/yassas-cover.jpg",
    featured: false,
    url: "https://www.yassas.com.au/",
  },
  {
    id: "feedme-group",
    title: "FeedMe Group",
    client: "Food-Truck Events · Australia",
    year: "2026",
    category: ["WEB DESIGN", "BRAND DESIGN", "EVENTS"],
    headline: "Website for a food-truck event organiser.",
    description:
      "Website page design for FeedMe Group, organisers of food-truck events — a landing experience built to showcase events and convert enquiries.",
    deliverables: ["Website design", "Brand creative"],
    coverImage: "/images/feedme-cover.jpg",
    featured: false,
    url: "https://feedmegroup.com.au/",
  },

  // ── RANGE / SMB ──────────────────────────────────────────
  {
    id: "plumbyourway",
    title: "PlumbYourWay",
    client: "Trades · Australia",
    year: "2026",
    category: ["WEB DESIGN", "BRAND DESIGN"],
    headline: "Full website and brand for an Australian plumbing business.",
    description:
      "Website page design and branding for PlumbYourWay, an Australian plumbing business — clean, credible, and built to convert local enquiries. Created with Your SocialChef.",
    deliverables: ["Website design", "Brand identity"],
    coverImage: "/images/plumb-cover.jpg",
    featured: false,
    url: "https://plumbyourway.com.au/",
  },
];
