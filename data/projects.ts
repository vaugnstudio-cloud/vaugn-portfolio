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
          { src: "/images/live/medsync-d-hero.jpg", label: "The live site — identity in use", aspect: "wide" },
        ],
      },
      execution: [
        {
          heading: "Website & Framer build",
          body: "Designed and built end to end in Framer: a conversion-focused structure that answers a visitor's real questions in order — is this for me, can I trust them, how do I start. Fully responsive, fast, and easy for the MedSync team to update themselves. These are captures of the site as it runs today.",
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
          { src: "/images/live/ysc-d-hero.jpg", label: "The agency's live site", aspect: "wide" },
        ],
      },
      execution: [
        {
          heading: "Agency-scale delivery",
          body: "Weekly output across 20+ accounts: campaign creative, social systems, web mockups, and short-form video — every account held to one consistent standard since 2023. The agency's own site, captured live below, carries this creative direction.",
          images: [
            { src: "/images/live/ysc-m-hero.jpg", label: "Mobile — first screen", aspect: "tall" },
            { src: "/images/live/ysc-m-mid.jpg", label: "Mobile — services", aspect: "tall" },
            { src: "/images/live/ysc-d-mid.jpg", label: "Desktop — client results", aspect: "wide" },
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
    client: "Studio template systems",
    year: "2023–Present",
    category: ["SOCIAL MEDIA", "TEMPLATE SYSTEMS", "CONTENT DESIGN"],
    headline: "Template systems that keep brands consistent at posting speed.",
    description:
      "The framework craft behind managing 20+ agency accounts, distilled into reusable template systems — shown here as the studio's own framework sets.",
    deliverables: ["Feed grid frameworks", "Carousel systems", "Quote & offer templates", "Content architecture"],
    coverImage: "/images/gd/social-system-grid.png",
    featured: false,
    gallery: {
      context:
        "Consistency at posting speed is a system problem, not a talent problem. These are the studio's template frameworks — the nine-slot grid architecture, carousel structures, and tile systems that let a brand publish daily without drifting off-model. Every client system starts from bones like these.",
      tools: ["Figma", "Photoshop", "Illustrator"],
      images: [
        { src: "/images/gd/social-system-grid.png", label: "Feed grid framework — nine-slot system", aspect: "wide" },
        { src: "/images/gd/social-quote-template.png", label: "Quote template", aspect: "square" },
        { src: "/images/gd/social-carousel-template.png", label: "Carousel frames", aspect: "square" },
      ],
    },
  },
  {
    id: "hospitality-social-content",
    type: "graphic-design",
    title: "Hospitality Social Content",
    client: "Studio template systems · F&B",
    year: "2023–Present",
    category: ["SOCIAL MEDIA", "F&B", "TEMPLATE SYSTEMS"],
    headline: "The content engine that keeps a venue fed, weekly.",
    description:
      "Menu drops, event promos, specials, and a seven-day content calendar — the F&B template engine refined across live Australian venues, shown as the studio's framework set.",
    deliverables: ["Menu drop templates", "Event promos", "Specials system", "Content calendar"],
    coverImage: "/images/gd/hosp-menu-drop.png",
    featured: false,
    gallery: {
      context:
        "Restaurants don't need a designer on call — they need an engine. This is the studio's F&B content framework, the same architecture running behind venues like Junk Sunshine Coast: drop-in templates for menu launches, events, and specials, sequenced on a seven-slot weekly calendar.",
      tools: ["Photoshop", "Figma", "Lightroom"],
      images: [
        { src: "/images/gd/hosp-menu-drop.png", label: "Menu drop template — three formats", aspect: "wide" },
        { src: "/images/gd/hosp-event-story.png", label: "Event promo · 9:16", aspect: "tall" },
        { src: "/images/gd/hosp-special-story.png", label: "Weekly special · 9:16", aspect: "tall" },
        { src: "/images/gd/hosp-calendar.png", label: "Seven-day content calendar", aspect: "wide" },
      ],
    },
  },
  {
    id: "print-collateral",
    type: "graphic-design",
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
