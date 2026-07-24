// All project data lives here. No CMS — edit this file to update case studies.
//
// Five tiers (v2 hire-first strategy) — every project is clickable:
//   "case-study"     → full narrative detail page at /work/[slug]
//   "product"        → self-initiated shipped products (kits + apps); story
//                      gallery or full case study — always labelled
//                      "Self-initiated product", never presented as client work
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

export type ProjectType =
  | "case-study"
  | "product"
  | "branding"
  | "graphic-design"
  | "project";

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

export interface GalleryChapter {
  kicker: string; // e.g. "01 — The Insight"
  heading: string;
  body: string;
  images?: ImageAsset[]; // balanced-row rule applies
}

export interface Gallery {
  context: string;
  tools: string[];
  images?: ImageAsset[]; // flat grid (GD showcases & projects)
  chapters?: GalleryChapter[]; // story layout (branding concepts)
}

export interface Project {
  id: string;
  type: ProjectType;
  title: string;
  client: string;
  year: string;
  /** Honest provenance label shown on cards. Defaults by type (see
   *  PROVENANCE in ProjectCard); set explicitly where the default is wrong —
   *  e.g. agency-affiliated client work. */
  provenance?: "Client work" | "Agency work" | "Self-initiated product" | "Concept study" | "Studio system";
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
    client: "Psychiatry Clinic · California, US",
    year: "2025",
    category: ["HEALTHCARE", "BRAND DESIGN", "WEB DESIGN", "FRAMER"],
    headline: "A psychiatry clinic's first impression, rebuilt around patient trust.",
    description:
      "End-to-end work for MedSync, a California psychiatry clinic — brand identity through to a conversion-focused website designed and built in Framer, serving patients in person and via telehealth.",
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
        "MedSync was launching into a space where trust is the entire product. People looking for psychiatric care are cautious, often anxious, and quick to leave a website that feels corporate, clinical in the cold sense, or template-made. The clinic needed to look established and safe from day one — without a legacy brand to lean on, and with the added constraints of a clinical setting: sensitive service content, a crisis pathway that must never be hard to find, and appointment booking for both in-person and telehealth patients.",
      role: [
        "Brand strategy & identity — solo",
        "Website design — solo",
        "Framer build, responsive layout & content structure — solo, working directly with the clinic's stakeholders",
      ],
      strategy:
        "Calm first, credibility close behind. Every decision — palette, type, pacing of the page — was made to lower the temperature for an anxious visitor while still signalling clinical competence. The site reads like a reassuring first conversation, not a brochure: what you'll get, who's behind it, and what happens next.",
      designSystem: {
        body: "A soft, low-contrast palette with generous whitespace, humanist type, and rounded, unhurried components. The identity avoids the two clichés of the category — sterile hospital blue and decorative wellness pastel — and lands on something quietly professional.",
        images: [
          { src: "/images/live/medsync-d-hero.jpg", label: "The live site — identity in use", aspect: "wide" },
        ],
      },
      execution: [
        {
          heading: "Website & Framer build",
          body: "Designed and built end to end in Framer: clinical service pages for medication management, ADHD, and depression; crisis-protocol information kept one step from every page; and a booking flow that serves both in-person and telehealth patients. The structure answers a visitor's real questions in order — is this for me, can I trust them, how do I start — and the Framer CMS lets the clinic team update services and content without a designer. These are captures of the site as it runs today.",
          images: [
            { src: "/images/live/medsync-m-hero.jpg", label: "Mobile — first screen", aspect: "tall" },
            { src: "/images/live/medsync-m-mid.jpg", label: "Mobile — services", aspect: "tall" },
            { src: "/images/live/medsync-d-mid.jpg", label: "Desktop — mid-page", aspect: "wide" },
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
    provenance: "Agency work",
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
          { src: "/images/live/ozmax-d-hero.jpg", label: "The live site — identity in use", aspect: "wide" },
        ],
      },
      execution: [
        {
          heading: "Homepage design",
          body: "A homepage built around the questions families actually ask: what supports are offered, who is behind the service, and how to get started with a plan. Designed for clarity at every reading level — captured here from the live site.",
          images: [
            { src: "/images/live/ozmax-m-hero.jpg", label: "Mobile — first screen", aspect: "tall" },
            { src: "/images/live/ozmax-m-mid.jpg", label: "Mobile — supports", aspect: "tall" },
            { src: "/images/live/ozmax-d-mid.jpg", label: "Desktop — services", aspect: "wide" },
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
    provenance: "Agency work",
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
          { src: "/images/live/junk-d-hero.jpg", label: "The live site — loud on arrival", aspect: "wide" },
        ],
      },
      execution: [
        {
          heading: "Built for the phone in the queue",
          body: "Most of Junk's traffic arrives from the feed, on a phone, hungry. The mobile experience carries the same energy as the socials — captured here from the live site.",
          images: [
            { src: "/images/live/junk-m-hero.jpg", label: "Mobile — first screen", aspect: "tall" },
            { src: "/images/live/junk-m-mid.jpg", label: "Mobile — what's on", aspect: "tall" },
          ],
        },
        {
          heading: "Website & print",
          body: "Figma website design carrying the same energy to the web, plus in-venue posters and promotional print that tie the physical spaces to the feed.",
          images: [
            { src: "/images/live/junk-d-mid.jpg", label: "Desktop — menus & promos", aspect: "wide" },
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
    provenance: "Agency work",
    title: "Your SocialChef",
    client: "Marketing Agency · Australia",
    year: "2023–Present",
    category: ["AGENCY", "BRAND DESIGN", "WEB DESIGN"],
    headline: "Brand and web creative across 20+ concurrent accounts.",
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
        "Brand designer, in-house — 2023 to present",
        "Sole designer on most accounts; strategy and scheduling in collaboration with the agency team",
        "Social media systems & template libraries — built and maintained by me",
        "Web design in Figma, handed to development partners as build-ready specs",
        "Campaign creative & short-form video",
      ],
      strategy:
        "Systems over heroics. Each account gets a visual rulebook — palette, type, layout skeletons, voice notes — and shares one underlying template architecture, so weekly batches ship without any account drifting off-model. Production is batched by format, not by client; AI-assisted tooling compresses the resizing-and-versioning work so creative hours go to the thinking.",
      designSystem: {
        body: "Not one design system — twenty in parallel. The senior craft here isn't a single beautiful identity; it's holding twenty distinct visual languages apart, at weekly volume, without cross-contamination. The template architecture below is the actual machinery.",
        images: [
          { src: "/images/gd/social-system-grid.png", label: "The nine-slot template architecture — one skeleton, every account", aspect: "wide" },
        ],
      },
      execution: [
        {
          heading: "The system that scales",
          body: "One template architecture skinned per brand: swap type, palette, and voice — never the bones. This is what let a coffee brand, a clinic, and a gym all post daily through one designer without their feeds converging.",
          images: [
            { src: "/images/gd/sms-brand-matrix.png", label: "One template, four visual languages", aspect: "wide" },
          ],
        },
        {
          heading: "Agency accounts, live",
          body: "A sample of accounts delivered through the agency, live today — websites designed in Figma to build-ready specs, developed with the agency's build partners, alongside the agency's own site.",
          images: [
            { src: "/images/live/junk-d-hero.jpg", label: "Junk Sunshine Coast — live (agency account)", aspect: "wide" },
            { src: "/images/live/yassas-d-hero.jpg", label: "Yassas — live (agency account)", aspect: "wide" },
            { src: "/images/live/ysc-m-hero.jpg", label: "The agency's own site — mobile", aspect: "tall" },
            { src: "/images/live/ysc-m-mid.jpg", label: "The agency's own site — services", aspect: "tall" },
          ],
        },
      ],
      outcome: {
        body: "Ongoing since 2023 — more than three years inside the same agency, with client accounts and the agency's own site carrying this work today. The template systems built here are documented in the Social Media Systems study.",
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
    headline: "The corner that knows your order.",
    description:
      "Concept identity for Sundry Coffee Co. — a neighbourhood specialty roaster built on the ritual of slow mornings: a hand-stamped sun, letterpress warmth, and a brand that feels like your usual table.",
    deliverables: ["Identity system", "Packaging", "Signage & menus", "Print"],
    coverImage: "/images/branding/specialty-coffee-hero.jpg",
    featured: true,
    gallery: {
      context:
        "Sundry is a concept study in belonging: what a café brand looks like when it behaves less like a chain and more like the corner that remembers you. Designed as a complete system — mark, print, packaging, and place.",
      tools: ["Illustrator", "Photoshop", "InDesign"],
      chapters: [
        {
          kicker: "01 — The Insight",
          heading: "Specialty coffee doesn't sell caffeine. It sells belonging.",
          body: "Every third-wave café can pull a good shot. What regulars actually pay for is the ritual — the bell on the door, the order that's already started before they reach the counter. So Sundry was designed as a place first and a brand second: everything about it should feel local, handmade, and slightly imperfect on purpose.",
          images: [
            { src: "/images/branding/specialty-coffee-hero.jpg", label: "The corner — storefront", aspect: "wide" },
          ],
        },
        {
          kicker: "02 — The Identity",
          heading: "A sun, stamped by hand.",
          body: "The mark is a rising sun with deliberately uneven rays — drawn to behave like a rubber stamp, not a vector file. Fraunces brings the letterpress warmth; Karla keeps menus and bags legible at arm's length. The palette is pulled straight off the counter: terracotta clay, espresso, oat cream, roast sand.",
          images: [
            { src: "/images/branding/specialty-coffee-identity.png", label: "Mark & stamp sheet", aspect: "square" },
            { src: "/images/branding/specialty-coffee-application-v2.png", label: "House menu — letterpress", aspect: "square" },
          ],
        },
        {
          kicker: "03 — The World It Lives In",
          heading: "From fascia to filter paper.",
          body: "A brand for a café earns its keep in daily use: painted on the fascia, stamped on the cup that leaves the shop, inked on the bag that goes home. The system is engineered to survive all three without losing its warmth.",
          images: [
            { src: "/images/branding/specialty-coffee-world-1.jpg", label: "Stamped cups in hand", aspect: "tall" },
            { src: "/images/branding/specialty-coffee-world-2.jpg", label: "Retail shelf — bags", aspect: "tall" },
            { src: "/images/branding/specialty-coffee-world-3.jpg", label: "Counter ritual", aspect: "wide" },
          ],
        },
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
    headline: "Arrive a guest. Leave a regular.",
    description:
      "Concept identity for Aster House — a heritage-modern boutique stay where the brand whispers: engraved brass, deep olive, and typography that behaves like good service.",
    deliverables: ["Identity system", "Collateral", "Wayfinding", "Guest print"],
    coverImage: "/images/branding/boutique-hotel-hero.jpg",
    featured: true,
    gallery: {
      context:
        "Aster House is a concept study in restraint: how a small hotel earns loyalty not by shouting, but by getting every quiet detail — the plaque, the key tag, the welcome card — exactly right.",
      tools: ["Illustrator", "InDesign", "Photoshop"],
      chapters: [
        {
          kicker: "01 — The Insight",
          heading: "Nobody rebooks a hotel because of its logo. They rebook a feeling.",
          body: "Boutique stays are chosen on atmosphere and remembered for details. The brand's job is to disappear into the experience — to be the engraving under your thumb on the room key, not a billboard in the lobby. Aster House was designed to whisper, on the theory that whispering is what luxury sounds like.",
          images: [
            { src: "/images/branding/boutique-hotel-hero.jpg", label: "The entrance — brass plaque", aspect: "wide" },
          ],
        },
        {
          kicker: "02 — The Identity",
          heading: "An arch you walk through, drawn as a monogram.",
          body: "The mark is a double arch — a doorway inside a doorway, the moment of arrival made geometric. Cormorant Garamond carries the heritage register; Jost keeps the practical pieces light and modern. Brass on deep olive is the house pairing: warm metal against evening green.",
          images: [
            { src: "/images/branding/boutique-hotel-identity.png", label: "Engraved monogram — olive & brass", aspect: "square" },
            { src: "/images/branding/boutique-hotel-application-v2.png", label: "Guest cards", aspect: "square" },
          ],
        },
        {
          kicker: "03 — The World It Lives In",
          heading: "The details guests take photos of.",
          body: "Key tags, matchbooks, morning corridors. The identity was built for the touchpoints that end up on a guest's camera roll — because for a boutique hotel, that camera roll is the marketing department.",
          images: [
            { src: "/images/branding/boutique-hotel-world-1.jpg", label: "Key & matchbook on linen", aspect: "tall" },
            { src: "/images/branding/boutique-hotel-world-2.jpg", label: "Corridor — morning light", aspect: "tall" },
            { src: "/images/branding/boutique-hotel-world-3.jpg", label: "Breakfast stationery", aspect: "wide" },
          ],
        },
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
    headline: "Small batch. Big mouth.",
    description:
      "Concept identity for Riptide Brew Works — a coastal craft label with zine energy: a wave roundel, cut-paper collage, and packaging that gets picked up before it gets read.",
    deliverables: ["Identity system", "Can & label design", "Stickers & merch", "Launch creative"],
    coverImage: "/images/branding/craft-beverage-hero.jpg",
    featured: true,
    gallery: {
      context:
        "Riptide is a concept study in shelf warfare: craft beverage is a category where the can has three seconds to win, and politeness loses. The brand is built loud on purpose — and systematic underneath the noise.",
      tools: ["Illustrator", "Photoshop"],
      chapters: [
        {
          kicker: "01 — The Insight",
          heading: "On a crowded shelf, the polite can dies first.",
          body: "A craft beverage brand lives or dies in the three seconds a hand hovers over a fridge door. Riptide's answer is volume: hazard-bright tangerine against deep teal, a wave that reads at ten paces, and a voice that talks like your funniest friend at the beach. Loud isn't a style choice here — it's the survival strategy.",
          images: [
            { src: "/images/branding/craft-beverage-hero.jpg", label: "Cooler full of cans — beach", aspect: "wide" },
          ],
        },
        {
          kicker: "02 — The Identity",
          heading: "A wave in a roundel, built like a sticker.",
          body: "The mark is a double wave locked in a heavy ring — designed to work as a 30mm sticker before anything else, because that's how beverage brands actually travel. Archivo Black does the shouting; Space Grotesk handles the fine print. The whole system is cut-paper zine collage: tilted, taped, unbothered.",
          images: [
            { src: "/images/branding/craft-beverage-identity.png", label: "Zine board — identity, loud", aspect: "square" },
            { src: "/images/branding/craft-beverage-application-v2.png", label: "Sticker sheet", aspect: "square" },
          ],
        },
        {
          kicker: "03 — The World It Lives In",
          heading: "Coolers, seawalls, and fridge doors.",
          body: "Riptide's natural habitat is anywhere sandy, salty, or slightly sunburnt. The packaging was photographed the way it gets used — buried in ice, passed hand to hand — because that's the truth test for a can design.",
          images: [
            { src: "/images/branding/craft-beverage-world-1.jpg", label: "Can in hand — seawall", aspect: "tall" },
            { src: "/images/branding/craft-beverage-world-2.jpg", label: "Fridge lineup", aspect: "tall" },
            { src: "/images/branding/craft-beverage-world-3.jpg", label: "Sticker-bombed cooler", aspect: "wide" },
          ],
        },
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
    headline: "Calm is a clinical outcome.",
    description:
      "Concept identity for Selene Skin & Wellness — a med-spa brand at the exact point where dermatology meets ritual: a crescent that reads as a leaf, ivory and amber, arches instead of edges.",
    deliverables: ["Identity system", "Treatment menus", "Interior cues", "Product suite"],
    coverImage: "/images/branding/wellness-medspa-hero.jpg",
    featured: true,
    gallery: {
      context:
        "Selene is a concept study in holding two truths at once: patients want clinical results and spa care, and most med-spa brands are forced to pick a side. This identity refuses the choice.",
      tools: ["Illustrator", "InDesign", "Photoshop"],
      chapters: [
        {
          kicker: "01 — The Insight",
          heading: "Patients don't want a hospital or a hotel. They want both.",
          body: "Med-spa clients are making a medical decision in a hospitality mood. A brand that's too clinical scares them; too plush and they doubt the science. Selene is engineered for the midpoint: every element carries one trust signal and one comfort signal, never just one of the two.",
          images: [
            { src: "/images/branding/wellness-medspa-hero.jpg", label: "Reception — the arch", aspect: "wide" },
          ],
        },
        {
          kicker: "02 — The Identity",
          heading: "A crescent waning into a leaf.",
          body: "The mark holds two readings — moon cycle and new growth — the way good treatment holds science and rest. Marcellus gives the wordmark its Roman calm; Mulish carries consent forms and menus without a hint of fuss. Ivory, amber, and travertine come straight from the treatment room.",
          images: [
            { src: "/images/branding/wellness-medspa-identity.png", label: "Mark in the arch", aspect: "square" },
            { src: "/images/branding/wellness-medspa-application-v2.png", label: "The ritual — treatment card", aspect: "square" },
          ],
        },
        {
          kicker: "03 — The World It Lives In",
          heading: "From reception wall to bathroom shelf.",
          body: "The brand extends from architecture to amber glass: the arch repeats in doorways and product labels alike, so the visit and the take-home routine feel like one continuous ritual.",
          images: [
            { src: "/images/branding/wellness-medspa-world-1.jpg", label: "Product suite — amber glass", aspect: "tall" },
            { src: "/images/branding/wellness-medspa-world-2.jpg", label: "Robe & towel detail", aspect: "tall" },
            { src: "/images/branding/wellness-medspa-world-3.jpg", label: "Treatment room", aspect: "wide" },
          ],
        },
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
    headline: "Dentistry that starts with listening.",
    description:
      "Concept identity for Arc Dental Studio — a clinic brand built to lower shoulders before anyone reaches the chair: Swiss precision, a smile made geometric, mint against slate.",
    deliverables: ["Identity system", "Signage & wayfinding", "Patient collateral", "Interior cues"],
    coverImage: "/images/branding/dental-clinic-hero.jpg",
    featured: false,
    gallery: {
      context:
        "Arc is a concept study in de-escalation: most people arrive at a dental brand carrying low-grade dread. Every design decision here exists to take some of that weight off before the first hello.",
      tools: ["Illustrator", "Figma", "InDesign"],
      chapters: [
        {
          kicker: "01 — The Insight",
          heading: "Nobody is excited to see the dentist. Design for that.",
          body: "Dental brands love to promise perfection — white-on-white smiles, laser everything. Arc starts somewhere quieter: the patient's nervous system. Rounded geometry instead of clinical edges, a calm mint instead of surgical blue, and a name you can say with your mouth open.",
          images: [
            { src: "/images/branding/dental-clinic-hero.jpg", label: "The studio at dusk", aspect: "wide" },
          ],
        },
        {
          kicker: "02 — The Identity",
          heading: "A smile, reduced to its arc.",
          body: "The mark is the curve of a smile abstracted into two nested arcs and a point of focus — friendly at 16 pixels, architectural at 16 feet. Manrope's soft geometry does the headlines; Inter runs the appointment system. Everything sits on a strict Swiss grid, because precision is a bedside manner too.",
          images: [
            { src: "/images/branding/dental-clinic-identity.png", label: "System board — Swiss grid", aspect: "square" },
            { src: "/images/branding/dental-clinic-application-v2.png", label: "Backlit wayfinding", aspect: "square" },
          ],
        },
        {
          kicker: "03 — The World It Lives In",
          heading: "From the street to the chair.",
          body: "The identity is sequenced like a patient journey: the glowing sign that says this place is different, the welcome card in your hand, the lounge that feels more studio than surgery. By the time you sit down, the brand has already done its job.",
          images: [
            { src: "/images/branding/dental-clinic-world-1.jpg", label: "Welcome card in hand", aspect: "tall" },
            { src: "/images/branding/dental-clinic-world-2.jpg", label: "The lounge", aspect: "tall" },
            { src: "/images/branding/dental-clinic-world-3.jpg", label: "Uniform detail", aspect: "wide" },
          ],
        },
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
    headline: "Show up. The rest is reps.",
    description:
      "Concept identity for FORM Strength Studio — brutalist discipline as a brand: twin stripes at a climbing angle, Anton at wall scale, carbon and volt.",
    deliverables: ["Identity system", "Environment & wall graphics", "Class collateral", "Merch"],
    coverImage: "/images/branding/fitness-studio-hero.jpg",
    featured: false,
    gallery: {
      context:
        "FORM is a concept study in identity-as-uniform: boutique fitness brands aren't really selling workouts, they're selling membership of a tribe. The brand has to look good on a wall and feel earned on a t-shirt.",
      tools: ["Illustrator", "Photoshop"],
      chapters: [
        {
          kicker: "01 — The Insight",
          heading: "A gym brand is worn, not viewed.",
          body: "Nobody photographs a treadmill. They photograph the wall, the chalk, the shirt they earned by showing up at six in the morning. FORM was designed backwards from that truth: the identity had to survive being painted two storeys tall and shrunk onto a cap — with zero softness anywhere in between.",
          images: [
            { src: "/images/branding/fitness-studio-hero.jpg", label: "The wall", aspect: "wide" },
          ],
        },
        {
          kicker: "02 — The Identity",
          heading: "Two stripes, one direction: up.",
          body: "The mark is a pair of parallel strokes at a climbing angle — progress, drawn as bluntly as possible. Anton is the only display voice, set tight and huge. Carbon black, chalk white, and one deliberate jolt of volt green: the palette of effort under gym lights.",
          images: [
            { src: "/images/branding/fitness-studio-identity.png", label: "Poster No. 01", aspect: "square" },
            { src: "/images/branding/fitness-studio-application-v2.png", label: "Class board", aspect: "square" },
          ],
        },
        {
          kicker: "03 — The World It Lives In",
          heading: "Chalk, concrete, and earned merch.",
          body: "The system was tested where it lives: raked light on painted concrete, chalk dust in the air, a duffel on the floor. If a brand element couldn't hold up there, it didn't make the cut.",
          images: [
            { src: "/images/branding/fitness-studio-world-1.jpg", label: "Chalk hands", aspect: "tall" },
            { src: "/images/branding/fitness-studio-world-2.jpg", label: "Class board — wall", aspect: "tall" },
            { src: "/images/branding/fitness-studio-world-3.jpg", label: "Merch stack", aspect: "wide" },
          ],
        },
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
    client: "Studio design system",
    year: "2023–Present",
    category: ["SOCIAL MEDIA", "DESIGN SYSTEMS", "CONTENT DESIGN"],
    headline: "One architecture, twenty brands, zero drift — the system behind daily posting.",
    description:
      "The design system distilled from running social for 20+ concurrent agency accounts: a nine-slot content architecture, an annotated conversion carousel, and the brand-skin matrix that lets one template serve wildly different voices.",
    deliverables: ["Nine-slot content architecture", "Conversion carousel system", "Brand-skin matrix", "Voice & tone application"],
    coverImage: "/images/gd/sms-feed-sundry.png",
    featured: false,
    gallery: {
      context:
        "Consistency at posting speed is a system problem, not a talent problem. This is the studio's social architecture shown three ways: the bones (the framework itself), the skin (one concept brand wearing it, end to end), and the scale (four brands on the same skeleton, none of them sounding alike). Concept application — photography is AI-assisted and art-directed in-studio.",
      tools: ["Figma", "Photoshop", "Illustrator", "Art direction"],
      chapters: [
        {
          kicker: "01 — The Bones",
          heading: "Nine slots. Every post has a job.",
          body: "A feed isn't nine pretty squares — it's nine jobs: hook, proof, value, offer, engagement, and one CTA per cycle, never more. The framework decides what each post is for before anyone opens a design tool, which is why it survives contact with real deadlines.",
          images: [
            { src: "/images/gd/social-system-grid.png", label: "The nine-slot architecture — every tile has a job", aspect: "wide" },
          ],
        },
        {
          kicker: "02 — The Skin",
          heading: "The same system, wearing Sundry.",
          body: "Bones don't sell coffee — voice does. Here the architecture is dressed in Sundry Coffee Co.: terracotta and bone, Fraunces italics, copy that sounds like the corner that remembers your order. Same nine jobs, now with a pulse. The carousel below shows the conversion arc slide by slide — with the reasoning annotated, because the thinking is the deliverable.",
          images: [
            { src: "/images/gd/sms-feed-sundry.png", label: "Sundry feed — the system with a voice", aspect: "wide" },
            { src: "/images/gd/sms-carousel-anatomy.png", label: "Carousel anatomy — hook to CTA, annotated", aspect: "wide" },
          ],
        },
        {
          kicker: "03 — The Scale",
          heading: "Four brands. Same bones. Different soul.",
          body: "This is the test of a real system: swap the type, palette, and voice — never the architecture — and a coffee roaster, a brewery, a med-spa, and a gym can all post daily without drifting off-model. That's what made 20+ concurrent accounts survivable.",
          images: [
            { src: "/images/gd/sms-brand-matrix.png", label: "The brand-skin matrix — one template, four voices", aspect: "wide" },
            { src: "/images/gd/social-quote-template.png", label: "Quote template — the reshare layout", aspect: "square" },
            { src: "/images/gd/social-carousel-template.png", label: "Carousel frames — the swipe skeleton", aspect: "square" },
          ],
        },
      ],
    },
  },
  {
    id: "hospitality-social-content",
    type: "graphic-design",
    title: "Hospitality Social Content",
    client: "Studio design system · F&B",
    year: "2023–Present",
    category: ["SOCIAL MEDIA", "F&B", "CAMPAIGN DESIGN"],
    headline: "Appetite first, always — the content engine that fills tables.",
    description:
      "The F&B content engine refined across live Australian venues: appetite-led menu drops with real photography, a three-story campaign arc that turns one dish into a weekly ritual, and the seven-day calendar that keeps a venue fed without a designer on call.",
    deliverables: ["Menu-drop system", "Campaign arc — tease, drop, service", "Weekly specials system", "Seven-day content calendar"],
    coverImage: "/images/gd/hosp-menu-drop.png",
    featured: false,
    gallery: {
      context:
        "Nobody ever booked a table because of a layout — they booked because the food looked like that. The photography leads, the type serves, and every post has one job: get someone through the door this week. Concept application built on the studio's live-venue engine — photography is AI-assisted and art-directed in-studio; campaign shown for a concept venue.",
      tools: ["Photoshop", "Figma", "Lightroom", "Art direction"],
      chapters: [
        {
          kicker: "01 — Appetite First",
          heading: "The photo does the selling. The type gets out of the way.",
          body: "The menu-drop system is built around one rule: nothing competes with the dish. Real photography sits full-bleed, the price is typographic jewellery, and the drop lands in three formats — feed, story, print — from one layout. Swap the dish, the date, and the shot; the drama is built in.",
          images: [
            { src: "/images/gd/hosp-menu-drop.png", label: "Menu drop — feed, story & print from one system", aspect: "wide" },
            { src: "/images/gd/hosp-special-story.png", label: "Weekly special · 9:16 — photo leads", aspect: "tall" },
            { src: "/images/gd/hosp-event-story.png", label: "Event promo · 9:16 — the loud one", aspect: "tall" },
          ],
        },
        {
          kicker: "02 — One Launch, One Arc",
          heading: "Birria Tuesday: tease, drop, last tables.",
          body: "A dish launch isn't a post — it's a three-act story. The night before: anticipation. Drop day: one dish, one price, one rule. During service: scarcity you didn't have to invent, posted live from the pass. This is the arc that turns a Tuesday special into the reason Tuesday exists.",
          images: [
            { src: "/images/gd/hsc-launch-set.png", label: "The campaign arc — tease · drop · service", aspect: "wide" },
          ],
        },
        {
          kicker: "03 — The Weekly Engine",
          heading: "Seven slots, so the kitchen never wonders what to post.",
          body: "Rituals beat randomness. The calendar gives every day a job — menu hero Monday, the special midweek, events into the weekend — so the venue posts daily at service speed, and the feed reads like a place with a heartbeat instead of a brand doing homework.",
          images: [
            { src: "/images/gd/hosp-calendar.png", label: "The seven-day engine", aspect: "wide" },
          ],
        },
      ],
    },
  },
  {
    id: "print-collateral",
    type: "graphic-design",
    provenance: "Client work",
    title: "Print & Collateral",
    client: "Children's publishing",
    year: "2025–2026",
    category: ["PRINT", "PUBLISHING", "ILLUSTRATION SYSTEMS"],
    headline: "A children's book universe, designed as a system.",
    description:
      "Cover systems, interior spreads, and collateral for a children's story-and-colouring book series — one illustrated universe, engineered to scale across titles.",
    deliverables: ["Cover system", "Interior page layouts", "Colouring editions", "Completion certificate"],
    coverImage: "/images/gd/print-cover-luna-story.jpg",
    featured: false,
    gallery: {
      context:
        "Client work for a children's publishing series where every title comes in a story edition and a colouring edition. The design challenge is a cover system that stays unmistakably one family across characters and formats — plus the small print pieces, like the completion certificate kids actually earn.",
      tools: ["InDesign", "Illustrator", "Photoshop"],
      images: [
        { src: "/images/gd/print-cover-luna-story.jpg", label: "Cover — Luna story edition", aspect: "square" },
        { src: "/images/gd/print-cover-quietforest.jpg", label: "Cover — Quiet Forest", aspect: "square" },
        { src: "/images/gd/print-cover-luna-coloring.jpg", label: "Colouring edition", aspect: "tall" },
        { src: "/images/gd/print-cover-world-coloring.jpg", label: "World colouring edition", aspect: "tall" },
        { src: "/images/gd/print-cover-dinosaur.jpg", label: "Cover — Dinosaur story", aspect: "square" },
        { src: "/images/gd/print-certificate.jpg", label: "Completion certificate", aspect: "square" },
      ],
    },
  },
  {
    id: "logo-identity",
    type: "graphic-design",
    title: "Logo & Identity Pieces",
    client: "Studio concept series",
    year: "2026",
    category: ["LOGO DESIGN", "IDENTITY", "BRAND DESIGN"],
    headline: "Six marks, six industries — the craft in isolation.",
    description:
      "The logo suite from the studio's niche concept series: a stamped sun, an arch monogram, a wave roundel, a crescent-leaf, a smile arc, and twin stripes — each built for its industry.",
    deliverables: ["Logo marks", "Wordmark lockups", "Construction systems", "One-colour versions"],
    coverImage: "/images/gd/logo-marks-grid.png",
    featured: false,
    gallery: {
      context:
        "The distilled proof of identity craft: six primary lockups from the niche concept series, each designed backwards from where it has to live — a coffee stamp, hotel brass, a beverage sticker, spa signage, a clinic panel, a gym wall. Full systems on the branding pages.",
      tools: ["Illustrator", "Figma"],
      images: [
        { src: "/images/branding/specialty-coffee-lockup.png", label: "Sundry Coffee Co. — primary lockup", aspect: "square" },
        { src: "/images/branding/boutique-hotel-lockup.png", label: "Aster House — arch monogram", aspect: "square" },
        { src: "/images/branding/craft-beverage-lockup.png", label: "Riptide — wave roundel", aspect: "square" },
        { src: "/images/branding/wellness-medspa-lockup.png", label: "Selene — crescent leaf", aspect: "square" },
        { src: "/images/branding/dental-clinic-lockup.png", label: "Arc Dental — smile arc", aspect: "square" },
        { src: "/images/branding/fitness-studio-lockup.png", label: "FORM — twin stripes", aspect: "square" },
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
        { src: "/images/live/inbloom-d-hero.jpg", label: "Live site — home", aspect: "wide" },
        { src: "/images/live/inbloom-m-hero.jpg", label: "Mobile — first screen", aspect: "tall" },
        { src: "/images/live/inbloom-m-mid.jpg", label: "Mobile — services", aspect: "tall" },
        { src: "/images/live/inbloom-d-mid.jpg", label: "Desktop — approach", aspect: "wide" },
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
        { src: "/images/gd/acef-overview.png", label: "Engagement overview — the print suite", aspect: "wide" },
      ],
    },
  },
  {
    id: "mekong-merchant",
    type: "project",
    provenance: "Agency work",
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
        { src: "/images/live/mekong-d-hero.jpg", label: "Live site — home", aspect: "wide" },
        { src: "/images/live/mekong-m-hero.jpg", label: "Mobile — first screen", aspect: "tall" },
        { src: "/images/live/mekong-m-mid.jpg", label: "Mobile — menu & ordering", aspect: "tall" },
        { src: "/images/live/mekong-d-mid.jpg", label: "Desktop — menu", aspect: "wide" },
      ],
    },
  },
  {
    id: "yassas",
    type: "project",
    provenance: "Agency work",
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
        { src: "/images/live/yassas-d-hero.jpg", label: "Live site — home", aspect: "wide" },
        { src: "/images/live/yassas-m-hero.jpg", label: "Mobile — first screen", aspect: "tall" },
        { src: "/images/live/yassas-m-mid.jpg", label: "Mobile — menu", aspect: "tall" },
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
        { src: "/images/live/feedme-d-hero.jpg", label: "Live site — home", aspect: "wide" },
        { src: "/images/live/feedme-m-hero.jpg", label: "Mobile — first screen", aspect: "tall" },
        { src: "/images/live/feedme-m-mid.jpg", label: "Mobile — events", aspect: "tall" },
      ],
    },
  },
  {
    id: "plumbyourway",
    type: "project",
    provenance: "Agency work",
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
        { src: "/images/live/plumb-d-hero.jpg", label: "Live site — home", aspect: "wide" },
        { src: "/images/live/plumb-m-hero.jpg", label: "Mobile — first screen", aspect: "tall" },
        { src: "/images/live/plumb-m-mid.jpg", label: "Mobile — services", aspect: "tall" },
      ],
    },
  },

  // ══ TIER — PRODUCTS & SYSTEMS (self-initiated, designed + built + shipped) ══
  // Honesty rule: every entry is labelled a self-initiated product. Demo
  // content is demo content. No client is implied, no metric is invented.
  {
    id: "averis-rcm-kit",
    type: "product",
    title: "Averis — RCM Website Kit",
    client: "Vaugn Studio · Self-initiated product",
    year: "2026",
    category: ["HEALTHCARE", "PRODUCT DESIGN", "WEB KIT"],
    headline:
      "A revenue-cycle website system with a leakage calculator and a 14-slide pitch deck — designed, built, packaged.",
    description:
      "A complete website kit for medical-billing and RCM companies — five pages, an interactive revenue-leakage calculator as the lead-gen hook, and a matching 14-slide pitch deck in HTML and native PowerPoint. Two full themes, no framework, no build step.",
    deliverables: [
      "5-page website system",
      "Revenue-leakage calculator",
      "14-slide pitch deck (HTML + PPTX)",
      "Two themes · design tokens",
    ],
    coverImage: "/images/products/averis-d-hero.jpg",
    url: "https://averis-rcm-demo.netlify.app",
    featured: true,
    gallery: {
      context:
        "Self-initiated product — demo content shown, not client work. Built from real revenue-cycle experience: I've worked inside RCM operations, so the kit speaks the industry's language instead of guessing at it.",
      tools: ["HTML/CSS/JS", "Design tokens", "SVG illustration", "PowerPoint"],
      chapters: [
        {
          kicker: "01 — The Insight",
          heading: "Billing firms sell trust to sceptical clinics.",
          body: "Medical-billing companies pitch physician practices that have been burned before — so the website has to read established, precise, and financially literate at first glance. Generic agency templates can't do that. Averis is designed around the one number a practice owner cares about: revenue they're leaking right now.",
          images: [
            { src: "/images/products/averis-d-hero.jpg", label: "Home — Ledger Cream theme", aspect: "wide" },
          ],
        },
        {
          kicker: "02 — The System",
          heading: "A calculator that opens conversations, and a deck that closes them.",
          body: "The interactive revenue-leakage calculator turns anonymous visitors into qualified conversations. Behind it: services, results, and contact pages built on one token system in two full themes, plus a 14-slide pitch deck shipped in both HTML and editable PowerPoint — the whole sales motion, not just a website.",
          images: [
            { src: "/images/products/averis-d-calc.jpg", label: "Revenue-leakage calculator", aspect: "wide" },
            { src: "/images/products/averis-d-deck.jpg", label: "Pitch deck — slide system", aspect: "wide" },
          ],
        },
        {
          kicker: "03 — What Ships",
          heading: "Hand-drawn visuals, zero stock photos, zero dependencies.",
          body: "Every visual is CSS and SVG drawn for the kit — nothing stock, nothing generated-looking. Pure HTML/CSS/JS with design tokens at the top of one stylesheet, so a buyer can rebrand the entire system in minutes and deploy it anywhere static files run.",
          images: [
            { src: "/images/products/averis-m-hero.jpg", label: "Mobile — first screen", aspect: "tall" },
            { src: "/images/products/averis-m-services.jpg", label: "Mobile — services", aspect: "tall" },
          ],
        },
      ],
    },
  },
  {
    id: "lumiere-kit",
    type: "product",
    title: "Lumière — Med-Spa Lead-Gen Kit",
    client: "Vaugn Studio · Self-initiated product",
    year: "2026",
    category: ["HEALTHCARE", "WEB KIT", "DESIGN SYSTEM"],
    headline:
      "A 13-page med-spa lead-gen system in two themes — every page engineered to book consultations.",
    description:
      "A complete website system for med spas and aesthetic clinics: landing page, four treatment deep-dives, results gallery with before/afters, pricing and memberships, a six-post blog, and the full supporting cast — in light and dark 'Quiet Luxe' themes.",
    deliverables: [
      "13-page website system",
      "4 treatment deep-dive templates",
      "Before/after results gallery",
      "Light + dark themes",
    ],
    coverImage: "/images/products/lumiere-d-hero.jpg",
    url: "https://lumiere-medspa-kit-demo.netlify.app",
    featured: true,
    gallery: {
      context:
        "Self-initiated product — demo content shown, not client work. Designed for the aesthetics category, where the brand has to feel as premium as the treatment menu.",
      tools: ["HTML/CSS/JS", "Design tokens", "Art direction"],
      chapters: [
        {
          kicker: "01 — The Insight",
          heading: "Aesthetics clients buy the feeling before the treatment.",
          body: "A med spa's website is the first treatment — if it doesn't feel calm, expensive, and safe, the consultation never gets booked. Lumière is built on restraint: generous space, quiet typography, photography-first layouts that let results speak.",
          images: [
            { src: "/images/products/lumiere-d-hero.jpg", label: "Landing — light theme", aspect: "wide" },
          ],
        },
        {
          kicker: "02 — The System",
          heading: "Thirteen pages, one design language, two moods.",
          body: "Landing, services, four treatment deep-dives, results, pricing and memberships, blog, about, contact — every page shares one token system that flips between a daylight theme and the dark 'Quiet Luxe' variant without touching a layout.",
          images: [
            { src: "/images/products/lumiere-d-mid.jpg", label: "Treatments — system pages", aspect: "wide" },
            { src: "/images/products/lumiere-d-dark.jpg", label: "Quiet Luxe — dark theme", aspect: "wide" },
          ],
        },
        {
          kicker: "03 — What Ships",
          heading: "Lead-gen wiring, ready for a real clinic.",
          body: "Consultation CTAs on every page, a before/after gallery structure that handles real patient photography, and mobile layouts treated as the primary surface — because that's where aesthetics clients actually browse.",
          images: [
            { src: "/images/products/lumiere-m-hero.jpg", label: "Mobile — first screen", aspect: "tall" },
            { src: "/images/products/lumiere-m-mid.jpg", label: "Mobile — treatments", aspect: "tall" },
          ],
        },
      ],
    },
  },
  {
    id: "eclat-kit",
    type: "product",
    title: "Éclat — Dental Clinic Kit",
    client: "Vaugn Studio · Self-initiated product",
    year: "2026",
    category: ["HEALTHCARE", "WEB KIT", "SEO"],
    headline:
      "A dental-clinic website system with structured data, sitemap, and CRM playbooks built in.",
    description:
      "A 13-page dental practice website system — general, cosmetic, aligner, and implant service deep-dives, a smile gallery with before/after sliders, pricing, and blog — shipped with JSON-LD Dentist schema, sitemap, robots, and CRM integration guides.",
    deliverables: [
      "13-page website system",
      "Smile gallery — before/after sliders",
      "JSON-LD schema · sitemap · robots",
      "CRM integration playbook",
    ],
    coverImage: "/images/products/eclat-d-hero.jpg",
    url: "https://eclat-dental-kit-demo.netlify.app",
    featured: false,
    gallery: {
      context:
        "Self-initiated product — demo content shown, not client work. Built to the standard a real dental group would audit it against: structured data, UTM-tracked forms, and CRM-ready lead capture out of the box.",
      tools: ["HTML/CSS/JS", "JSON-LD", "Design tokens"],
      chapters: [
        {
          kicker: "01 — The Insight",
          heading: "Dental is won on credibility and found on Google.",
          body: "Patients cross-shop dentists the way they cross-shop hotels — reviews, photos, prices. Éclat pairs a trust-first design language ('Porcelain Day' light, 'Midnight Studio' dark) with the technical SEO layer most clinic sites skip entirely.",
          images: [
            { src: "/images/products/eclat-d-hero.jpg", label: "Home — Porcelain Day theme", aspect: "wide" },
          ],
        },
        {
          kicker: "02 — The System",
          heading: "Four service lines, one conversion architecture.",
          body: "General & preventive, cosmetic, aligners, implants — each deep-dive follows the same evidence-first structure: what it is, what it costs, what the results look like, how to book. The smile gallery's before/after sliders do the persuading.",
          images: [
            { src: "/images/products/eclat-d-mid.jpg", label: "Service deep-dive", aspect: "wide" },
          ],
        },
        {
          kicker: "03 — What Ships",
          heading: "The unglamorous parts, done properly.",
          body: "JSON-LD Dentist schema, sitemap.xml, robots.txt, UTM-tagged forms, and a written CRM integration guide — the kit ships the infrastructure a practice manager needs, not just the pixels.",
          images: [
            { src: "/images/products/eclat-m-hero.jpg", label: "Mobile — first screen", aspect: "tall" },
            { src: "/images/products/eclat-m-mid.jpg", label: "Mobile — smile gallery", aspect: "tall" },
          ],
        },
      ],
    },
  },
  {
    id: "maison-kit",
    type: "product",
    title: "Maison — Real Estate Kit",
    client: "Vaugn Studio · Self-initiated product",
    year: "2026",
    category: ["REAL ESTATE", "WEB KIT", "BRAND SYSTEM"],
    headline:
      "A property-agency site system — listings, sell/buy funnels, and a brand that reads established.",
    description:
      "A website system for real-estate agents and brokerages: home with featured listings, a seller lead-gen funnel, listings and sold galleries, buyer journey, and blog — in 'Estate Ivory' and 'Estate Noir' themes, with CRM integration docs included.",
    deliverables: [
      "10-page website system",
      "Seller valuation lead funnel",
      "Listings · sold · staged galleries",
      "Two themes · CRM playbook",
    ],
    coverImage: "/images/products/maison-d-hero.jpg",
    url: "https://maison-realty-kit-demo.netlify.app",
    featured: false,
    gallery: {
      context:
        "Self-initiated product — demo content shown, not client work. Real estate is a trust-and-taste category: Maison is designed so a two-person agency presents like an established firm.",
      tools: ["HTML/CSS/JS", "Design tokens", "Art direction"],
      chapters: [
        {
          kicker: "01 — The Insight",
          heading: "Sellers choose the agent whose brand looks like their price bracket.",
          body: "A homeowner picking an agent is really asking: will this firm make my property look worth more? Maison answers with editorial listing layouts, a staged-to-sell gallery, and typography that borrows from property marketing at the top of the market.",
          images: [
            { src: "/images/products/maison-d-hero.jpg", label: "Home — Estate Ivory theme", aspect: "wide" },
          ],
        },
        {
          kicker: "02 — The System",
          heading: "Two funnels — sellers in, buyers through.",
          body: "The seller valuation funnel is the money page: a low-friction 'what's my home worth' path that feeds the CRM. Around it, listings, sold results, and a buyer journey keep the site useful between campaigns.",
          images: [
            { src: "/images/products/maison-d-mid.jpg", label: "Listings — gallery system", aspect: "wide" },
          ],
        },
        {
          kicker: "03 — What Ships",
          heading: "Ready to rebrand, ready to deploy.",
          body: "One token system, two full themes ('Estate Ivory' / 'Estate Noir'), sitemap and robots included, CRM integration documented. Static files — deployable anywhere in an afternoon.",
          images: [
            { src: "/images/products/maison-m-hero.jpg", label: "Mobile — first screen", aspect: "tall" },
            { src: "/images/products/maison-m-mid.jpg", label: "Mobile — listings", aspect: "tall" },
          ],
        },
      ],
    },
  },
  {
    id: "esprit-kit",
    type: "product",
    title: "Esprit — AI Agency Kit",
    client: "Vaugn Studio · Self-initiated product",
    year: "2026",
    category: ["AI / SAAS", "WEB KIT", "DARK UI"],
    headline:
      "A dark-first landing system for AI agencies — audit funnel included.",
    description:
      "A conversion landing system for AI agencies and productized-service studios: hero, services, metric case-study cards with industry filters, team, pricing, FAQ — and an 'AI Audit' lead-magnet funnel. Dark-first 'Circuit Night' theme with a full light variant.",
    deliverables: [
      "8-page landing system",
      "AI-audit lead funnel",
      "Case-study card system with filters",
      "Dark-first + light themes",
    ],
    coverImage: "/images/products/esprit-d-hero.jpg",
    url: "https://esprit-ai-kit-demo.netlify.app",
    featured: false,
    gallery: {
      context:
        "Self-initiated product — demo content shown, not client work. Built for the AI-services category, where dark UI is the convention and credibility is proven with numbers, not adjectives.",
      tools: ["HTML/CSS/JS", "Design tokens", "Dark UI"],
      chapters: [
        {
          kicker: "01 — The Insight",
          heading: "AI agencies sell certainty in a hype market.",
          body: "Every AI agency claims transformation; buyers have stopped listening. Esprit leads with the category's visual convention — precise, dark, engineered — and backs it with metric-first case-study cards and a concrete first step: the AI audit.",
          images: [
            { src: "/images/products/esprit-d-hero.jpg", label: "Landing — Circuit Night theme", aspect: "wide" },
          ],
        },
        {
          kicker: "02 — The System",
          heading: "An audit funnel, not a contact form.",
          body: "The lead magnet is productized: 'The AI Audit' has its own page, its own promise, and its own form — turning a vague 'get in touch' into a defined offer a founder can say yes to.",
          images: [
            { src: "/images/products/esprit-d-mid.jpg", label: "AI-audit funnel page", aspect: "wide" },
          ],
        },
        {
          kicker: "03 — What Ships",
          heading: "Filterable proof, themeable everything.",
          body: "Case-study cards filter by industry, pricing is transparent, and the whole system runs on tokens — 'Circuit Night' dark by default with a complete 'Circuit Day' light variant for studios that want to break convention.",
          images: [
            { src: "/images/products/esprit-m-hero.jpg", label: "Mobile — first screen", aspect: "tall" },
            { src: "/images/products/esprit-m-mid.jpg", label: "Mobile — case studies", aspect: "tall" },
          ],
        },
      ],
    },
  },
  {
    id: "sop-quest",
    type: "product",
    title: "SOP Quest",
    client: "Vaugn Studio · Self-initiated product",
    year: "2026",
    category: ["PRODUCT DESIGN", "PWA", "UX"],
    headline:
      "SOPs turned into a game — a gamified quest tracker, live as an installable PWA.",
    description:
      "'The System' — a gamified SOP and task tracker. Import a standard-operating-procedure document and it becomes quests with XP, hunter ranks, level-up moments, streaks, and a calendar Gate Map. Designed, built, and shipped as an installable offline-first PWA.",
    deliverables: [
      "Product concept & UX",
      "Game-system design (XP · ranks · streaks)",
      "Full UI design system",
      "PWA build — offline, installable",
    ],
    coverImage: "/images/products/sop-quest-d-hero.jpg",
    featured: true,
    url: "https://the-system-vaugn.netlify.app",
    gallery: {
      context:
        "Self-initiated product, live and installable today. The design problem: SOPs are the most important documents in a business and the least likely to be followed. The answer: make following them feel like progress.",
      tools: ["UX design", "UI system", "Vanilla JS", "PWA"],
      chapters: [
        {
          kicker: "01 — The Insight",
          heading: "Nobody follows the SOP. Everybody finishes the quest.",
          body: "Checklists die of boredom. SOP Quest borrows the mechanics that keep games compelling — visible XP, ranks that mean something, streaks you don't want to break — and attaches them to real operational work. The document becomes a quest log.",
          images: [
            { src: "/images/products/sop-quest-d-hero.jpg", label: "The System — quest log", aspect: "wide" },
          ],
        },
        {
          kicker: "02 — The System",
          heading: "Import a document, get a game.",
          body: "A markdown SOP parses into quests automatically. Completing steps earns XP; XP moves you through hunter ranks E to S; the Gate Map turns your calendar into territory. Level-ups get a cinematic moment — because finishing real work should feel like one.",
          images: [
            { src: "/images/products/sop-quest-d-mid.jpg", label: "Progression — ranks & gates", aspect: "wide" },
          ],
        },
        {
          kicker: "03 — What Ships",
          heading: "A real product, running in production.",
          body: "Offline-first PWA with strict CSP, installable on any device, data stored locally. Designed, built, and deployed solo — visit the live app and install it.",
          images: [
            { src: "/images/products/sop-quest-m-hero.jpg", label: "Mobile — installed PWA", aspect: "tall" },
            { src: "/images/products/sop-quest-m-mid.jpg", label: "Mobile — quest detail", aspect: "tall" },
          ],
        },
      ],
    },
  },
  {
    id: "studio-os",
    type: "product",
    title: "Studio OS",
    client: "Vaugn Studio · Self-initiated product",
    year: "2026",
    category: ["PRODUCT DESIGN", "DASHBOARD", "CRM"],
    headline:
      "A freelancer's business OS — 19-metric dashboard, full CRM, and a reports engine, no backend.",
    description:
      "A complete business operating system for freelancers: a 19-metric dashboard across finance, business, content, and health; a sales-pipeline CRM with 8 stages; and a reports engine with hand-rolled charts and a rule-based insights advisor. Local-first, three themes, white-label ready.",
    deliverables: [
      "Product design — dashboard · CRM · reports",
      "Hand-rolled SVG chart system",
      "Rule-based insights engine",
      "PWA · white-label theming",
    ],
    coverImage: "/images/products/studio-os-d-hero.jpg",
    featured: true,
    gallery: {
      context:
        "Self-initiated product. I run my own business on the same engine every day — Studio OS is that personal dashboard, productized: guided tours, help center, sample-data mode, and Google Sheets sync included.",
      tools: ["Product design", "Data visualization", "Vanilla JS", "PWA"],
      chapters: [
        {
          kicker: "01 — The Insight",
          heading: "Freelancers fly blind between invoices.",
          body: "Most independents track money in one app, leads in another, and everything else nowhere. Studio OS puts the whole business on one dark-premium surface — the 19 numbers that actually describe how the month is going.",
          images: [
            { src: "/images/products/studio-os-d-hero.jpg", label: "Dashboard — 19 metrics", aspect: "wide" },
          ],
        },
        {
          kicker: "02 — The System",
          heading: "Dashboard, pipeline, reports — one design language.",
          body: "A 19-field CRM moves leads through 8 stages; the reports engine draws its charts in hand-rolled SVG and reads the data back to you through a rule-based insights advisor. No backend, no accounts — everything lives in the browser.",
          images: [
            { src: "/images/products/studio-os-d-crm.jpg", label: "Pipeline CRM", aspect: "wide" },
            { src: "/images/products/studio-os-d-reports.jpg", label: "Reports & insights engine", aspect: "wide" },
          ],
        },
        {
          kicker: "03 — What Ships",
          heading: "Built to sell, built to rebrand.",
          body: "White-label theming, guided onboarding tours, a help center, sample-data sandbox, and optional Google Sheets sync via a bundled Apps Script. Designed and engineered as a sellable product from the first commit.",
        },
      ],
    },
  },
  {
    id: "outreach-cockpit",
    type: "product",
    title: "Outreach Cockpit",
    client: "Vaugn Studio · Self-initiated product",
    year: "2026",
    category: ["PRODUCT DESIGN", "CRM", "PWA"],
    headline:
      "A local-first cold-outreach CRM — pipeline, insights engine, Sheets sync — designed and shipped solo.",
    description:
      "An internal tool I designed and built for my own client outreach: a multi-industry cold-outreach CRM with editable leads, one-tap Gmail and Instagram actions, a five-stage pipeline, follow-up scheduling, KPI tiles, and a rule-based insights advisor. In daily use.",
    deliverables: [
      "Product & UX design",
      "Pipeline + follow-up system",
      "Rule-based insights advisor",
      "PWA · Google Sheets sync",
    ],
    coverImage: "/images/products/outreach-cockpit-d-hero.jpg",
    featured: true,
    caseStudy: {
      problem:
        "Cold outreach dies in spreadsheets. Rows don't tell you who to contact next, follow-ups slip, and every send means re-typing the same message into Gmail. I needed a tool that made the next action obvious and instant — and no off-the-shelf CRM was worth its overhead for a one-person studio.",
      role: [
        "Product strategy & UX — solo",
        "UI design system — solo",
        "Build & ship (vanilla JS PWA) — solo",
      ],
      strategy:
        "Design for the next five minutes, not the quarterly report. Every screen answers one question: who do I contact right now? Leads carry pre-filled Gmail and Instagram action links, the Due view surfaces slipping follow-ups, and a rule-based insights advisor reads the pipeline and says what to fix. Local-first by principle — outreach data is sensitive, so it never leaves the browser unless you sync it to your own Google Sheet.",
      designSystem: {
        body: "The same dark-premium design language as Studio OS — KPI tiles, stage chips, and an editable lead drawer — tuned for speed: everything is one tap from the pipeline. Shown here with sample data; the real pipeline stays private.",
        images: [
          { src: "/images/products/outreach-cockpit-d-hero.jpg", label: "Cockpit — insights & KPIs (sample data)", aspect: "wide" },
        ],
      },
      execution: [
        {
          heading: "The insights advisor",
          body: "A rule engine watches the numbers — reply rates by industry, follow-up debt, stage bottlenecks — and turns them into plain-language advice. It's the difference between a database and a cockpit: the tool tells you where to point the plane.",
          images: [
            { src: "/images/products/outreach-cockpit-d-insights.jpg", label: "Pipeline — lead cards (sample data)", aspect: "wide" },
            { src: "/images/products/outreach-cockpit-m-hero.jpg", label: "Mobile — pipeline", aspect: "tall" },
            { src: "/images/products/outreach-cockpit-m-mid.jpg", label: "Mobile — lead actions", aspect: "tall" },
          ],
        },
      ],
      outcome: {
        body: "Shipped and in daily use running my own client outreach. This one stays private — it's shown here with sample data as proof of product thinking, not as something to buy.",
      },
    },
  },
];

// ── Helpers ─────────────────────────────────────────────────
export const caseStudies = projects.filter((p) => p.type === "case-study");
export const productWork = projects.filter((p) => p.type === "product");
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
