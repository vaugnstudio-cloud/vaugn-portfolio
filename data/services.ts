// Service packages — final USD anchors (July 2026, start-lower strategy;
// raise after first testimonial wins).

export interface Service {
  id: string;
  name: string;
  forWho: string;
  fromPrice: string;
  includes: string[];
  next: string;
  cta: string;
  flagship?: boolean;
  onHomepage?: boolean;
}

export const services: Service[] = [
  {
    id: "brand-web-launch",
    name: "Brand + Web Launch",
    forWho: "New or rebranding businesses that need everything — one accountable person from idea to live site.",
    fromPrice: "From $3,500",
    includes: [
      "Strategy workshop",
      "Full brand identity",
      "5–7 page website, designed & built (Framer or Webflow)",
      "Launch kit — social profiles, templates, brand guide",
    ],
    next: "We start with a strategy call, then I send a scoped proposal within 48 hours.",
    cta: "Start your launch",
    flagship: true,
    onHomepage: true,
  },
  {
    id: "healthcare",
    name: "Healthcare Brand & Web",
    forWho: "Clinics, therapy practices, dental & specialist clinics, med-spas, NDIS providers, health-tech, and billing/RCM firms that need to be trusted before they're tried.",
    fromPrice: "From $4,500",
    includes: [
      "Everything in Brand + Web Launch",
      "Compliance-aware content structure",
      "Trust-first UX & patient-journey thinking",
      "Credibility system — proof, credentials, reassurance",
    ],
    next: "Book a healthcare project call — I'll review your current presence first.",
    cta: "Book a healthcare project call",
    onHomepage: true,
  },
  {
    id: "hospitality",
    name: "Restaurant & Hospitality Marketing System",
    forWho: "Restaurants, cafés, boutique hotels, breweries, and F&B groups that need a brand engine, not a one-off logo.",
    fromPrice: "From $2,500",
    includes: [
      "Brand refresh",
      "Website with menu & ordering/booking",
      "Social content system",
      "Monthly template kit",
    ],
    next: "Tell me about your venue — I'll reply with examples from live hospitality projects.",
    cta: "Get the system",
    onHomepage: true,
  },
  {
    id: "framer-landing",
    name: "Framer Landing Page",
    forWho: "Startups and campaigns that need one high-converting page, fast.",
    fromPrice: "From $1,200",
    includes: [
      "Copy structure",
      "Design & Framer build",
      "Basic SEO setup",
      "1–2 week turnaround",
    ],
    next: "Send the brief — if it's a fit, we can start within the week.",
    cta: "Launch a page",
  },
  {
    id: "retainer",
    name: "Monthly Creative Retainer",
    forWho: "Past clients and growth businesses that need ongoing design — social, web updates, campaigns.",
    fromPrice: "From $900/mo",
    includes: [
      "Reserved monthly design capacity",
      "Social, web, and campaign deliverables",
      "Priority turnaround",
    ],
    next: "Usually starts after a project — but ask, and we'll scope it.",
    cta: "Ask about retainers",
  },
];

export interface Faq {
  q: string;
  a: string;
}

export const faqs: Faq[] = [
  {
    q: "What happens after I reach out?",
    a: "You'll hear back within 24–48 hours. We start with a short call to understand your goals, then I send a scoped proposal — fixed price, clear deliverables, no surprises.",
  },
  {
    q: "How long does a project take?",
    a: "A landing page ships in 1–2 weeks. A full Brand + Web Launch typically runs 4–8 weeks depending on scope and how quickly content decisions land on your side.",
  },
  {
    q: "Do you only work with healthcare and hospitality?",
    a: "They're my deepest niches — but the same trust-first, conversion-focused approach works for any growth business. Recent work spans trades, events, retail, and professional services.",
  },
  {
    q: "You work with AI tools — will my brand look AI-generated?",
    a: "No — and that's the point. AI compresses the repetitive production work (versioning, resizing, exploration), which buys more hours for the thinking and craft that make work distinctive. Every direction, decision, and final piece is mine.",
  },
  {
    q: "Where are you based, and does timezone matter?",
    a: "I work remotely with clients across Australia, the US, and Europe, and structure handoffs so timezone differences work for you — you often wake up to finished work.",
  },
  {
    q: "What do the 'from' prices mean?",
    a: "The starting price for the smallest sensible version of that package. Your exact quote is fixed after scoping — it never changes mid-project.",
  },
];

export const processSteps = [
  {
    step: "01",
    name: "Discover",
    body: "A strategy call + short workshop. We define who the work needs to convince and what it needs to say.",
  },
  {
    step: "02",
    name: "Design",
    body: "Identity and page design, presented with reasoning — one strong direction, refined together.",
  },
  {
    step: "03",
    name: "Build",
    body: "Designed in Figma, built in Framer or Webflow. AI-assisted production keeps it fast without cutting corners.",
  },
  {
    step: "04",
    name: "Launch & support",
    body: "QA, SEO basics, handover you can actually use — and a retainer option if you want me to stay on.",
  },
] as const;
