// All project data lives here. No CMS — edit this file to update case studies.
//
// Four tiers (2026 strategy) — every project is clickable:
//   "case-study"     → full narrative detail page at /work/[slug]
//   "branding"       → niche branding showcase (gallery page); scaffolds until
//                      Vaugn designs each concept brand — clearly labelled
//                      "concept series", never presented as client work
//   "graphic-design" → visual showcase detail page at /work/[slug]
//   "project"        → lighter gallery detail page at /work/[slug]
//
// Image slots with no `src` render as designed placeholders — drop the real
// asset into /public/images/<slug>/ and add the path to make it appear.
// Grid alignment rule: within each image set, keep aspects in balanced rows —
// "wide" spans both columns; pair "square" with "square", "tall" with "tall".

export type ProjectType = "case-study" | "branding" | "graphic-design" | "project";

export interface ImageAsset {
  src?: string; // omit → renders a labeled placeholder slot
  label: string;
  aspect?: "wide" | "square" | "tall"; // default "wide"
}

export interface CaseStudySection {
  heading: string;
  body: string;
  images?: ImageAsset[];
}

export interface CaseStudy {
  problem: string;
  role: string[];
  strategy: string;
  designSystem: { body: string; images: ImageAsset[] };
  execution: CaseStudySection[];
  // Only real, verifiable outcomes — never invented metrics.
  outcome?: { body: string; liveUrl?: string };
}

export interface Gallery {
  context: string;
  tools: string[];
  images: ImageAsset[];
}

export interface Project {
  id: string;
  type: ProjectType;
  title: string;
  client: string;
  year: string;
  category: string[];
  headline: string;
  description: string;
  deliverables: string[];
  coverImage?: string; // omit → designed placeholder cover
  featured: boolean; // shown on homepage
  url?: string; // live site, where applicable
  caseStudy?: CaseStudy;
  gallery?: Gallery;
}

export const projects: Project[] = [
  // ══ TIER 1 — FULL CASE STUDIES ═══════════════════════════
  {
    id: "medsync",
    type: "case-study",
    title: "MedSync",
    client: "Mental Health Service · Australia",
    year: "2026",
    category: ["HEALTHCARE", "BRAND DESIGN", "WEB DESIGN", "FRAMER"],
    headline: "A mental-health platform, designed and built to earn trust.",
    description:
      "End-to-end work for MedSync, an Australian mental health service — brand identity through to a conversion-focused website designed and built in Framer.",
    deliverables: [
      "Brand identity",
      "Website design",
      "Framer build",
      "Responsive layout",
    ],
    coverImage: "/images/medsync-cover.jpg",
    featured: true,
    url: "https://medsyncmentalhealth.com/",
    caseStudy: {
      problem:
        "MedSync was launching into a space where trust is the entire product. People looking for mental-health support are cautious, often anxious, and quick to leave a website that feels corporate, clinical in the cold sense, or template-made. The service needed to look established and safe from its very first day — without a legacy brand or existing audience to lean on.",
      role: [
        "Brand strategy & identity — solo",
        "Website design — solo",
        "Framer build & responsive layout — solo",
      ],
      strategy:
        "Calm first, credibility close behind. Every decision — palette, type, pacing of the page — was made to lower the temperature for an anxious visitor while still signalling clinical competence. The site reads like a reassuring first conversation, not a brochure: what you'll get, who's behind it, and what happens next.",
      designSystem: {
        body: "A soft, low-contrast palette with generous whitespace, humanist type, and rounded, unhurried components. The identity avoids the two clichés of the category — sterile hospital blue and decorative wellness pastel — and lands on something quietly professional.",
        images: [
          { label: "Logo & identity lockup", aspect: "wide" },
          { label: "Colour & type specimen", aspect: "square" },
          { label: "Component library", aspect: "square" },
        ],
      },
      execution: [
        {
          heading: "Website & Framer build",
          body: "Designed and built end to end in Framer: a conversion-focused structure that answers a visitor's real questions in order — is this for me, can I trust them, how do I start. Fully responsive, fast, and easy for the MedSync team to update themselves.",
          images: [
            { label: "Homepage — full scroll", aspect: "tall" },
            { label: "Mobile screens", aspect: "tall" },
            { label: "Services & booking flow", aspect: "wide" },
          ],
        },
      ],
      outcome: {
        body: "Delivered, launched, and live. The site is in production and serving patients today.",
        liveUrl: "https://medsyncmentalhealth.com/",
      },
    },
  },
  {
    id: "ozmax-care",
    type: "case-study",
    title: "Ozmax Care",
    client: "NDIS & Disability Support · Australia",
    year: "2026",
    category: ["HEALTHCARE", "BRAND DESIGN", "WEB DESIGN"],
    headline: "A disability-care brand built to feel personal and dependable.",
    description:
      "Full brand identity for Ozmax Care, a Melbourne NDIS and disability-support provider — logo, colour palette, and typography — plus homepage website design built around its warm, trust-first “Empowering Every Ability” message.",
    deliverables: [
      "Logo & identity",
      "Colour palette",
      "Typography system",
      "Website homepage",
    ],
    coverImage: "/images/ozmax-cover.png",
    featured: true,
    url: "https://ozmaxcare.com.au/",
    caseStudy: {
      problem:
        "Families choosing an NDIS provider are making one of the most personal decisions there is — and comparing providers whose websites often look interchangeable. Ozmax Care needed an identity that felt warm and human without losing the dependability signals that carers and plan managers look for.",
      role: [
        "Logo & brand identity — designed with Your SocialChef",
        "Colour & typography system",
        "Homepage website design",
      ],
      strategy:
        "Lead with warmth, back it with structure. The brand centres on the “Empowering Every Ability” message — optimistic but concrete — and the design system pairs friendly, rounded forms with a disciplined grid and clear information hierarchy, so warmth never tips into vagueness.",
      designSystem: {
        body: "A warm, accessible palette with strong contrast for readability, a friendly geometric mark, and a typography system built to stay legible for every audience — including users with visual impairments.",
        images: [
          { label: "Logo construction", aspect: "square" },
          { label: "Palette & accessibility contrast", aspect: "square" },
          { label: "Typography system", aspect: "wide" },
        ],
      },
      execution: [
        {
          heading: "Homepage design",
          body: "A homepage built around the questions families actually ask: what supports are offered, who is behind the service, and how to get started with a plan. Designed for clarity at every reading level.",
          images: [
            { label: "Homepage — desktop", aspect: "tall" },
            { label: "Homepage — mobile", aspect: "tall" },
          ],
        },
      ],
      outcome: {
        body: "Delivered and launched — the brand and site are live. Created in collaboration with Your SocialChef.",
        liveUrl: "https://ozmaxcare.com.au/",
      },
    },
  },
  {
    id: "junk-sunshine-coast",
    type: "case-study",
    title: "Junk Sunshine Coast",
    client: "Restaurant · Australia",
    year: "2023–Present",
    category: ["BRAND DESIGN", "WEB DESIGN", "SOCIAL MEDIA"],
    headline: "A bold brand and website built to match the food's energy.",
    description:
      "Social media design, Figma website design, photo editing, and print collateral for Junk Sunshine Coast — a high-energy Australian food brand, live across its Sippy Downs and Maroochydore venues.",
    deliverables: [
      "Instagram story templates",
      "Promotional posters",
      "Website design",
      "Photo enhancement & color grading",
    ],
    coverImage: "/images/junk-cover.jpg",
    featured: true,
    url: "https://junksunshinecoast.com.au/",
    caseStudy: {
      problem:
        "Junk's food is loud, fast, and fun — but keeping a brand that energetic consistent across two venues, a website, weekly social content, and in-venue print is where most hospitality brands fall apart. The work needed a system, not a stream of one-off graphics.",
      role: [
        "Ongoing creative — retainer via Your SocialChef, 2023 to present",
        "Social media system — templates, stories, campaign creative",
        "Website design in Figma",
        "Photo enhancement & colour grading",
        "Print collateral — posters, promos",
      ],
      strategy:
        "Build the energy into a repeatable system. A loud, confident visual language — bold type, saturated colour, appetite-first photography — engineered as templates and rules so every post, poster, and page hits the same note, week after week, without redesigning from scratch.",
      designSystem: {
        body: "High-contrast type, punchy colour, and a photography treatment (grading + enhancement) that makes the food the hero. The system is deliberately simple to execute at social-media speed.",
        images: [
          { label: "Visual language board", aspect: "wide" },
          { label: "Instagram template system", aspect: "square" },
          { label: "Poster series", aspect: "square" },
        ],
      },
      execution: [
        {
          heading: "Social content engine",
          body: "A template system for stories, posts, and promos that keeps two venues fed with on-brand content weekly — designed so speed never costs consistency.",
          images: [
            { label: "Story templates in use", aspect: "square" },
            { label: "Feed grid — 3 months", aspect: "square" },
            { label: "Promo campaign set", aspect: "square" },
            { label: "Reel covers", aspect: "square" },
          ],
        },
        {
          heading: "Website & print",
          body: "Figma website design carrying the same energy to the web, plus in-venue posters and promotional print that tie the physical spaces to the feed.",
          images: [
            { label: "Website — key pages", aspect: "wide" },
            { label: "In-venue print", aspect: "square" },
            { label: "Poster close-ups", aspect: "square" },
          ],
        },
      ],
      outcome: {
        body: "Live across both Sippy Downs and Maroochydore venues, with the social system still running as an ongoing retainer since 2023.",
        liveUrl: "https://junksunshinecoast.com.au/",
      },
    },
  },
  {
    id: "your-socialchef",
    type: "case-study",
    title: "Your SocialChef",
    client: "Marketing Agency · Australia",
    year: "2023–Present",
    category: ["AGENCY", "BRAND DESIGN", "WEB DESIGN"],
    headline: "Creative direction across 20+ client accounts.",
    description:
      "In-house creative for Your SocialChef — brand campaigns, social media systems, Figma web mockups, and short-form video across 20+ concurrent client accounts spanning healthcare, hospitality, retail, and professional services.",
    deliverables: [
      "Instagram carousel series",
      "Agency website contribution",
      "Brand campaign creative",
      "Social media templates",
    ],
    coverImage: "/images/ysc-cover.jpg",
    featured: true,
    url: "https://yoursocialchef.com/",
    caseStudy: {
      problem:
        "An agency serving 20+ concurrent accounts lives or dies on throughput without quality drift. Every client — a clinic, a restaurant, a retailer — needs work that looks like it came from a dedicated designer, delivered on an agency calendar.",
      role: [
        "In-house creative, 2023 to present",
        "Brand campaign creative across healthcare, hospitality, retail, professional services",
        "Social media systems & template libraries",
        "Figma web mockups & agency website contribution",
        "Short-form video creative",
      ],
      strategy:
        "Systems over heroics. Reusable template architectures, per-client visual rulebooks, and an AI-assisted production workflow that compresses the repetitive work — so the creative hours go where they matter. It's the same systems thinking I now bring to individual clients.",
      designSystem: {
        body: "Not one design system — twenty. The craft here is building and holding parallel visual languages without cross-contamination, at volume.",
        images: [
          { label: "Multi-account work wall", aspect: "wide" },
          { label: "Template architecture", aspect: "square" },
          { label: "Carousel series — selected", aspect: "square" },
        ],
      },
      execution: [
        {
          heading: "Agency-scale delivery",
          body: "Weekly output across 20+ accounts: campaign creative, social systems, web mockups, and short-form video — every account held to one consistent standard since 2023.",
          images: [
            { label: "Selected campaign creative", aspect: "wide" },
            { label: "Short-form video stills", aspect: "square" },
            { label: "Template systems in use", aspect: "square" },
          ],
        },
      ],
      outcome: {
        body: "Ongoing since 2023. The agency's client work — and its own site — carry this creative direction today.",
        liveUrl: "https://yoursocialchef.com/",
      },
    },
  },

  // ══ BRANDING — NICHE CONCEPT SERIES ══════════════════════
  // Self-initiated concept brands for target niches (July 2026 research:
  // café, hotel, craft beverage, wellness on home; dental + fitness on
  // work page). Scaffolds until Vaugn designs each — always labelled
  // "concept series", never presented as client work. Set featured: true
  // for the four that appear on the homepage Branding section.
  {
    id: "specialty-coffee-branding",
    type: "branding",
    title: "Specialty Coffee & Café",
    client: "Concept series · Branding",
    year: "2026",
    category: ["BRANDING", "HOSPITALITY", "PACKAGING"],
    headline: "A café brand built on place — from cup to counter to feed.",
    description:
      "A complete concept identity for a specialty coffee brand — logo system, cups and bags, signage, menus, and a social presence that carries the neighbourhood story hyper-local café branding demands.",
    deliverables: ["Identity system", "Packaging", "Signage & menus", "Social system"],
    coverImage: "/images/branding/specialty-coffee-cover.jpg",
    featured: true,
    gallery: {
      context:
        "Concept branding for the specialty coffee niche — designed to show how a café brand should work as one system: identity, packaging, environment, and content. Full concept in production.",
      tools: ["Illustrator", "Photoshop", "Figma"],
      images: [
        { src: "/images/branding/specialty-coffee-cover.jpg", label: "Brand board", aspect: "wide" },
        { src: "/images/branding/specialty-coffee-logo.png", label: "Logo construction", aspect: "square" },
        { src: "/images/branding/specialty-coffee-type.png", label: "Palette & typography", aspect: "square" },
        { src: "/images/branding/specialty-coffee-photo.jpg", label: "Cups & packaging", aspect: "tall" },
        { src: "/images/branding/specialty-coffee-application.png", label: "House menu", aspect: "tall" },
        { src: "/images/branding/specialty-coffee-social.png", label: "Social system", aspect: "wide" },
      ],
    },
  },
  {
    id: "boutique-hotel-branding",
    type: "branding",
    title: "Boutique Hotel & Stay",
    client: "Concept series · Branding",
    year: "2026",
    category: ["BRANDING", "HOSPITALITY", "IDENTITY"],
    headline: "An identity designed like a stay — calm, layered, memorable.",
    description:
      "Concept identity for a boutique accommodation brand — wordmark, collateral, wayfinding, and the quiet, experience-led visual language 2026 hospitality branding is moving toward.",
    deliverables: ["Identity system", "Collateral", "Wayfinding", "Digital presence"],
    coverImage: "/images/branding/boutique-hotel-cover.jpg",
    featured: true,
    gallery: {
      context:
        "Concept branding for the boutique hotel niche — an experience-led identity across print, wayfinding, and digital touchpoints. Full concept in production.",
      tools: ["Illustrator", "InDesign", "Figma"],
      images: [
        { src: "/images/branding/boutique-hotel-cover.jpg", label: "Brand board", aspect: "wide" },
        { src: "/images/branding/boutique-hotel-logo.png", label: "Monogram construction", aspect: "square" },
        { src: "/images/branding/boutique-hotel-type.png", label: "Palette & typography", aspect: "square" },
        { src: "/images/branding/boutique-hotel-photo.jpg", label: "Print collateral", aspect: "tall" },
        { src: "/images/branding/boutique-hotel-application.png", label: "Welcome card", aspect: "tall" },
        { src: "/images/branding/boutique-hotel-social.png", label: "Social system", aspect: "wide" },
      ],
    },
  },
  {
    id: "craft-beverage-branding",
    type: "branding",
    title: "Craft Beverage",
    client: "Concept series · Branding",
    year: "2026",
    category: ["BRANDING", "PACKAGING", "F&B"],
    headline: "Packaging-first branding with shelf presence and personality.",
    description:
      "Concept identity for a craft beverage label — can and bottle design, brand character, and the merch-ready visual world that makes beverage brands portfolio-defining work.",
    deliverables: ["Identity system", "Can & label design", "Merch", "Launch creative"],
    coverImage: "/images/branding/craft-beverage-cover.jpg",
    featured: true,
    gallery: {
      context:
        "Concept branding for the craft beverage niche — identity built packaging-first, where the can is the billboard. Full concept in production.",
      tools: ["Illustrator", "Photoshop", "Dimension"],
      images: [
        { src: "/images/branding/craft-beverage-cover.jpg", label: "Brand board", aspect: "wide" },
        { src: "/images/branding/craft-beverage-logo.png", label: "Wave mark construction", aspect: "square" },
        { src: "/images/branding/craft-beverage-type.png", label: "Palette & typography", aspect: "square" },
        { src: "/images/branding/craft-beverage-photo.jpg", label: "Can detail", aspect: "tall" },
        { src: "/images/branding/craft-beverage-application.png", label: "Launch poster", aspect: "tall" },
        { src: "/images/branding/craft-beverage-social.png", label: "Social system", aspect: "wide" },
      ],
    },
  },
  {
    id: "wellness-medspa-branding",
    type: "branding",
    title: "Wellness & Med-Spa",
    client: "Concept series · Branding",
    year: "2026",
    category: ["BRANDING", "HEALTHCARE", "WELLNESS"],
    headline: "Where clinical trust meets hospitality warmth.",
    description:
      "Concept identity for a wellness and med-spa brand — the exact intersection of my two niches: healthcare credibility with a hospitality-grade sensory brand world.",
    deliverables: ["Identity system", "Interior cues", "Treatment menus", "Digital presence"],
    coverImage: "/images/branding/wellness-medspa-cover.jpg",
    featured: true,
    gallery: {
      context:
        "Concept branding for the wellness & med-spa niche — clinical trust signals wrapped in warmth, from treatment menus to the booking experience. Full concept in production.",
      tools: ["Illustrator", "Figma", "InDesign"],
      images: [
        { src: "/images/branding/wellness-medspa-cover.jpg", label: "Brand board", aspect: "wide" },
        { src: "/images/branding/wellness-medspa-logo.png", label: "Mark construction", aspect: "square" },
        { src: "/images/branding/wellness-medspa-type.png", label: "Palette & typography", aspect: "square" },
        { src: "/images/branding/wellness-medspa-photo.jpg", label: "Product suite", aspect: "tall" },
        { src: "/images/branding/wellness-medspa-application.png", label: "Treatment menu", aspect: "tall" },
        { src: "/images/branding/wellness-medspa-social.png", label: "Social system", aspect: "wide" },
      ],
    },
  },
  {
    id: "dental-clinic-branding",
    type: "branding",
    title: "Dental & Specialist Clinic",
    client: "Concept series · Branding",
    year: "2026",
    category: ["BRANDING", "HEALTHCARE", "IDENTITY"],
    headline: "A clinic brand patients trust before the first appointment.",
    description:
      "Concept identity for a dental and specialist clinic — modern, calm, and credibility-first, extending my healthcare branding beyond mental health and disability care.",
    deliverables: ["Identity system", "Patient collateral", "Signage", "Digital presence"],
    coverImage: "/images/branding/dental-clinic-cover.jpg",
    featured: false,
    gallery: {
      context:
        "Concept branding for the dental & specialist clinic niche — trust-first identity across patient touchpoints. Full concept in production.",
      tools: ["Illustrator", "Figma"],
      images: [
        { src: "/images/branding/dental-clinic-cover.jpg", label: "Brand board", aspect: "wide" },
        { src: "/images/branding/dental-clinic-logo.png", label: "Arc mark construction", aspect: "square" },
        { src: "/images/branding/dental-clinic-type.png", label: "Palette & typography", aspect: "square" },
        { src: "/images/branding/dental-clinic-photo.jpg", label: "Clinic signage", aspect: "tall" },
        { src: "/images/branding/dental-clinic-application.png", label: "Appointment card", aspect: "tall" },
        { src: "/images/branding/dental-clinic-social.png", label: "Social system", aspect: "wide" },
      ],
    },
  },
  {
    id: "fitness-studio-branding",
    type: "branding",
    title: "Fitness Studio",
    client: "Concept series · Branding",
    year: "2026",
    category: ["BRANDING", "FITNESS", "SOCIAL MEDIA"],
    headline: "An energetic identity built for the feed as much as the floor.",
    description:
      "Concept identity for a boutique fitness studio — bold identity, class collateral, and the social content system that fitness brands live or die by.",
    deliverables: ["Identity system", "Class collateral", "Merch", "Social system"],
    coverImage: "/images/branding/fitness-studio-cover.jpg",
    featured: false,
    gallery: {
      context:
        "Concept branding for the fitness studio niche — energy on the walls and on the feed, built as a system. Full concept in production.",
      tools: ["Illustrator", "Photoshop", "Figma"],
      images: [
        { src: "/images/branding/fitness-studio-cover.jpg", label: "Brand board", aspect: "wide" },
        { src: "/images/branding/fitness-studio-logo.png", label: "Stripe mark construction", aspect: "square" },
        { src: "/images/branding/fitness-studio-type.png", label: "Palette & typography", aspect: "square" },
        { src: "/images/branding/fitness-studio-photo.jpg", label: "Merch", aspect: "tall" },
        { src: "/images/branding/fitness-studio-application.png", label: "Class poster", aspect: "tall" },
        { src: "/images/branding/fitness-studio-social.png", label: "Social system", aspect: "wide" },
      ],
    },
  },

  // ══ TIER 2 — GRAPHIC DESIGN SHOWCASES ════════════════════
  // Placeholder scaffolds (approved July 2026) — swap image slots with real
  // pieces from the local archives when curated.
  {
    id: "social-media-systems",
    type: "graphic-design",
    title: "Social Media Systems",
    client: "Multiple clients · AU / US",
    year: "2023–Present",
    category: ["SOCIAL MEDIA", "TEMPLATE SYSTEMS", "CONTENT DESIGN"],
    headline: "Template systems that keep brands consistent at posting speed.",
    description:
      "Instagram grids, story systems, carousel frameworks, and campaign content built as reusable systems — the volume-and-consistency craft from 20+ agency accounts.",
    deliverables: ["Story templates", "Carousel systems", "Feed grids", "Campaign sets"],
    featured: false,
    gallery: {
      context:
        "A selection of social systems designed across healthcare, hospitality, and retail accounts — built as templates so brands stay consistent long after the handover.",
      tools: ["Figma", "Photoshop", "Illustrator", "Canva"],
      images: [
        { label: "Campaign content set", aspect: "wide" },
        { label: "Feed grid — hospitality", aspect: "square" },
        { label: "Carousel framework", aspect: "square" },
        { label: "Story template system", aspect: "tall" },
        { label: "Promo story series", aspect: "tall" },
        { label: "Healthcare social system", aspect: "wide" },
      ],
    },
  },
  {
    id: "hospitality-social-content",
    type: "graphic-design",
    title: "Hospitality Social Content",
    client: "Restaurants & venues · Australia",
    year: "2023–Present",
    category: ["SOCIAL MEDIA", "F&B", "PHOTO EDITING"],
    headline: "Appetite-first content for restaurants and venues.",
    description:
      "Food-forward social creative — menu drops, event promos, story campaigns, and photo enhancement — for Australian restaurants and hospitality venues.",
    deliverables: ["Menu promos", "Event creative", "Photo grading", "Story campaigns"],
    featured: false,
    gallery: {
      context:
        "Content built to make food the hero: colour-graded photography, bold menu drops, and event promos designed for thumb-stopping speed on the feed.",
      tools: ["Photoshop", "Lightroom", "Figma", "After Effects"],
      images: [
        { label: "Photo grading — before/after", aspect: "wide" },
        { label: "Menu drop series", aspect: "square" },
        { label: "Seasonal campaign", aspect: "square" },
        { label: "Event promo set", aspect: "tall" },
        { label: "Venue story campaign", aspect: "tall" },
        { label: "Reel covers", aspect: "wide" },
      ],
    },
  },
  {
    id: "print-collateral",
    type: "graphic-design",
    title: "Print & Collateral",
    client: "Healthcare & hospitality clients",
    year: "2024–Present",
    category: ["PRINT", "COLLATERAL", "BRAND DESIGN"],
    headline: "Craft beyond screens — print that carries the brand.",
    description:
      "Trifold brochures, roll-up banners, calling-card systems, menus, and posters — including the ACEF Enterprises healthcare marketing suite and restaurant print.",
    deliverables: ["Brochures", "Banners", "Menus", "Business cards", "Posters"],
    featured: false,
    gallery: {
      context:
        "Print work spanning clinical credibility (healthcare brochures, conference banners) and hospitality energy (menus, posters) — designed for the hand, not just the screen.",
      tools: ["InDesign", "Illustrator", "Photoshop"],
      images: [
        { label: "ACEF trifold brochure", aspect: "wide" },
        { label: "Roll-up banner system", aspect: "tall" },
        { label: "Restaurant menu design", aspect: "tall" },
        { label: "Calling-card system", aspect: "square" },
        { label: "Poster series", aspect: "square" },
        { label: "Print suite overview", aspect: "wide" },
      ],
    },
  },
  {
    id: "logo-identity",
    type: "graphic-design",
    title: "Logo & Identity Pieces",
    client: "Selected clients · AU / US / EU",
    year: "2023–Present",
    category: ["LOGO DESIGN", "IDENTITY", "BRAND DESIGN"],
    headline: "Marks, wordmarks, and identity pieces — the craft in isolation.",
    description:
      "A collection of logos and identity work from engagements across three markets — the distilled, single-artifact proof of identity craft.",
    deliverables: ["Logo marks", "Wordmarks", "Identity lockups", "Usage systems"],
    featured: false,
    gallery: {
      context:
        "Selected marks and identity pieces, shown with construction and in-context applications — the foundation work underneath every larger brand system.",
      tools: ["Illustrator", "Figma"],
      images: [
        { label: "Mark collection — grid", aspect: "wide" },
        { label: "Logo construction", aspect: "square" },
        { label: "Wordmark set", aspect: "square" },
        { label: "In-context applications", aspect: "wide" },
        { label: "Identity lockups", aspect: "square" },
        { label: "Monochrome versions", aspect: "square" },
      ],
    },
  },

  // ══ TIER 3 — PROJECTS (lighter gallery detail pages) ═════════
  {
    id: "inbloom-therapy",
    type: "project",
    title: "InBloom Therapy",
    client: "Therapy Practice · Australia",
    year: "2026",
    category: ["HEALTHCARE", "BRAND DESIGN", "WEB DESIGN"],
    headline: "Brand and website for a therapy practice, built to reassure.",
    description:
      "Brand identity and full website for InBloom Therapy — warm, calming visual language designed for a mental-health audience and built for conversion. Live.",
    deliverables: ["Brand identity", "Website design", "Web build", "Responsive layout"],
    coverImage: "/images/inbloom-cover.jpg",
    featured: false,
    url: "https://www.inbloomtherapy.com.au/",
    gallery: {
      context:
        "A warm, calming identity and full website for a therapy practice — designed to reassure a mental-health audience from the first scroll. Live and serving clients.",
      tools: ["Figma", "Illustrator", "Photoshop"],
      images: [
        { label: "Homepage — desktop", aspect: "tall" },
        { label: "Homepage — mobile", aspect: "tall" },
        { label: "Brand identity", aspect: "square" },
        { label: "Colour & type", aspect: "square" },
      ],
    },
  },
  {
    id: "acef-enterprises",
    type: "project",
    title: "ACEF Enterprises",
    client: "Healthcare Billing · USA",
    year: "2024–2025",
    category: ["HEALTHCARE", "BRAND DESIGN", "PRINT"],
    headline: "Healthcare brand system built for clinical credibility.",
    description:
      "A complete, trust-first marketing suite for a US healthcare billing firm — trifold brochures, roll-up banners, calling-card systems, and Instagram Stories.",
    deliverables: [
      "Trifold brochure",
      "Roll-up stand banner",
      "Calling card template",
      "Instagram Stories",
    ],
    coverImage: "/images/acef-cover.jpg",
    featured: false,
    gallery: {
      context:
        "A complete marketing suite designed to read as credible to the people who sign off: physician office managers and hospital administrators. Print-first, with a social extension.",
      tools: ["InDesign", "Illustrator", "Photoshop"],
      images: [
        { label: "Trifold brochure", aspect: "wide" },
        { label: "Roll-up banner", aspect: "square" },
        { label: "Calling-card system", aspect: "square" },
        { label: "Instagram Stories — set 1", aspect: "tall" },
        { label: "Instagram Stories — set 2", aspect: "tall" },
      ],
    },
  },
  {
    id: "mekong-merchant",
    type: "project",
    title: "Mekong Merchant of Taste",
    client: "Restaurant · Australia",
    year: "2026",
    category: ["WEB DESIGN", "BRAND DESIGN", "ORDERING SYSTEM"],
    headline: "Restaurant brand, website, and online ordering — designed end to end.",
    description:
      "Brand creative and full design for Mekong Merchant of Taste — both the website and its online ordering system — paired with the in-house build team at Your SocialChef.",
    deliverables: ["Website design", "Ordering system UI", "Brand creative"],
    coverImage: "/images/mekong-cover.jpg",
    featured: false,
    url: "https://mekongmerchant.com.au/",
    gallery: {
      context:
        "Appetite-led visuals with a clear, functional ordering flow — website and ordering system designed end to end, built with the in-house team at Your SocialChef.",
      tools: ["Figma", "Photoshop"],
      images: [
        { label: "Website — homepage", aspect: "tall" },
        { label: "Ordering flow", aspect: "tall" },
        { label: "Brand creative", aspect: "square" },
        { label: "Menu pages", aspect: "square" },
      ],
    },
  },
  {
    id: "yassas",
    type: "project",
    title: "Yassas",
    client: "Hospitality · Australia",
    year: "2025–2026",
    category: ["WEB DESIGN", "BRAND DESIGN", "HOSPITALITY"],
    headline: "Full website and brand for a modern Greek venue.",
    description:
      "End-to-end website page design and branding for Yassas — a contemporary Greek hospitality brand. Created with Your SocialChef.",
    deliverables: ["Website design", "Brand identity"],
    coverImage: "/images/yassas-cover.jpg",
    featured: false,
    url: "https://www.yassas.com.au/",
    gallery: {
      context:
        "Bold, appetite-led visuals carried across the full site for a contemporary Greek venue. Created with Your SocialChef.",
      tools: ["Figma", "Photoshop"],
      images: [
        { label: "Website — key pages", aspect: "wide" },
        { label: "Brand identity", aspect: "square" },
        { label: "Mobile screens", aspect: "square" },
      ],
    },
  },
  {
    id: "feedme-group",
    type: "project",
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
    gallery: {
      context:
        "A landing experience built to showcase events and convert enquiries for a food-truck event organiser.",
      tools: ["Figma", "Photoshop"],
      images: [
        { label: "Landing page — full scroll", aspect: "wide" },
        { label: "Event showcase", aspect: "square" },
        { label: "Mobile screens", aspect: "square" },
      ],
    },
  },
  {
    id: "plumbyourway",
    type: "project",
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
    gallery: {
      context:
        "Clean, credible, and built to convert local enquiries — website and brand for an Australian plumbing business. Created with Your SocialChef.",
      tools: ["Figma", "Illustrator"],
      images: [
        { label: "Website — homepage", aspect: "wide" },
        { label: "Brand identity", aspect: "square" },
        { label: "Mobile screens", aspect: "square" },
      ],
    },
  },
];

// ── Helpers ─────────────────────────────────────────────────
export const caseStudies = projects.filter((p) => p.type === "case-study");
export const branding = projects.filter((p) => p.type === "branding");
export const graphicDesign = projects.filter((p) => p.type === "graphic-design");
export const moreProjects = projects.filter((p) => p.type === "project");
export const detailProjects = projects; // every project has a detail page
// Homepage "Selected work" — featured case studies only
export const featuredProjects = projects.filter(
  (p) => p.featured && p.type === "case-study"
);
// Homepage "Branding" section — the four featured niche concepts
export const featuredBranding = branding.filter((p) => p.featured);

export function getProject(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}
