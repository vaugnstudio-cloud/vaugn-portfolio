// Service packages — premium positioning, no public price anchors
// (July 2026 decision: pricing is custom-quoted after scoping; the contact
// form's budget dropdown handles pre-qualification).

export interface Service {
  id: string;
  name: string;
  forWho: string;
  fromPrice: string; // engagement tier label (shown where prices used to be)
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
    forWho: "New or rebranding businesses that need everything, one accountable person from idea to live site.",
    fromPrice: "Signature engagement",
    includes: [
      "Strategy workshop",
      "Full brand identity",
      "5 to 7 page website, designed & built (Framer or Webflow)",
      "Launch kit: social profiles, templates, brand guide",
    ],
    next: "We start with a strategy call, then I send a scoped proposal within 48 hours.",
    cta: "Start your launch",
    flagship: true,
    onHomepage: true,
  },
  {
    id: "healthcare",
    name: "Healthcare Brand & Web",
    forWho: "Clinics, therapy practices, dental & specialist clinics, med spas, NDIS providers, health tech, and billing/RCM firms that need to be trusted before they're tried.",
    fromPrice: "Specialist engagement",
    includes: [
      "Everything in Brand + Web Launch",
      "Compliance aware content structure",
      "Trust first UX & patient journey thinking",
      "Credibility system: proof, credentials, reassurance",
    ],
    next: "Book a healthcare project call, I'll review your current presence first.",
    cta: "Book a healthcare project call",
    onHomepage: true,
  },
  {
    id: "website-care",
    name: "Website Care for Small Practices",
    forWho: "Healthcare, allied health and therapy practices that already have a website and need it kept current, fixed or refreshed.",
    fromPrice: "Fixed quote, written first",
    includes: [
      "Quick fixes and update rounds",
      "A new site when the old one no longer fits",
      "Optional monthly care",
      "Written price and scope before any work",
    ],
    next: "Send me your website link and what needs to change. I'll reply with a written scope and price.",
    cta: "Ask about website care",
    onHomepage: true,
  },
  {
    id: "framer-landing",
    name: "Framer Landing Page",
    forWho: "Startups and campaigns that need one high converting page, fast.",
    fromPrice: "Fast track build",
    includes: [
      "Copy structure",
      "Design & Framer build",
      "Basic SEO setup",
      "1 to 2 week turnaround",
    ],
    next: "Send the brief. If it's a fit and I have availability, I'll suggest a start date.",
    cta: "Launch a page",
  },
  {
    id: "retainer",
    name: "Monthly Creative Retainer",
    forWho: "Past clients and growth businesses that need ongoing design, social, web updates, campaigns.",
    fromPrice: "Monthly partnership",
    includes: [
      "Reserved monthly design capacity",
      "Social, web, and campaign deliverables",
      "Priority turnaround",
    ],
    next: "Usually starts after a project, but ask and we'll scope it.",
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
    a: "I usually reply within two working days. We start with a short call to understand your goals, then I send a scoped proposal, fixed price, clear deliverables, no surprises.",
  },
  {
    q: "How long does a project take?",
    a: "A landing page ships in 1 to 2 weeks. A full Brand + Web Launch typically runs 4 to 8 weeks depending on scope and how quickly content decisions land on your side.",
  },
  {
    q: "Who do you take projects from?",
    a: "Mainly healthcare, allied health and therapy practices, plus other service businesses such as trades and professional services. Restaurant and hospitality work stays with my agency role.",
  },
  {
    q: "You work with AI tools. Will my brand look AI generated?",
    a: "No, and that's the point. AI compresses the repetitive production work (versioning, resizing, exploration), which buys more hours for the thinking and craft that make work distinctive. Every direction, decision, and final piece is mine.",
  },
  {
    q: "Where are you based, and does timezone matter?",
    a: "I'm in the Greater Manila Area (GMT+8) and work remotely. My hours overlap Australian business hours and US West Coast mornings.",
  },
  {
    q: "How does pricing work?",
    a: "Every engagement is custom quoted. After a short scoping call you receive one fixed price proposal, tailored to your scope, timeline, and market, and it never changes mid project. No hourly billing, no surprise line items.",
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
    body: "Identity and page design, presented with reasoning, one strong direction, refined together.",
  },
  {
    step: "03",
    name: "Build",
    body: "Designed in Figma, built in Framer or Webflow. AI assisted production keeps it fast without cutting corners.",
  },
  {
    step: "04",
    name: "Launch & support",
    body: "QA, SEO basics, handover you can actually use, and a retainer option if you want me to stay on.",
  },
] as const;
