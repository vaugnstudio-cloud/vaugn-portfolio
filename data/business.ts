// "For your business" page: what I can do for a business owner, by industry
// and by service. Written to be read at a glance: short headline, one promise,
// three outcomes, what I make, proof. Copy rules: plain English, no dashes or
// hyphenated words in visible text, no invented stats, prices, results or
// testimonials. Proof is labelled exactly as it is.

export type ProofKind = "Direct client" | "Agency work" | "Own product" | "Concept study";
export type ServiceId = "website" | "social" | "posters" | "ads" | "brand";
export type IndustryIcon =
  | "medical"
  | "dental"
  | "wellness"
  | "fitness"
  | "restaurants"
  | "real-estate"
  | "trades"
  | "startups";

export interface Proof {
  title: string;
  kind: ProofKind;
  note: string;
  image: string;
  href: string;
}

export interface Industry {
  id: IndustryIcon; // also the URL hash: /for-business#dental
  name: string;
  short: string;
  headline: string; // the one line a client reads first
  promise: string; // one supporting sentence
  outcomes: { big: string; small: string }[]; // exactly 3
  make: { service: ServiceId; what: string }[]; // 3 or 4, a few words each
  proof: Proof[]; // first one is shown large
}

export interface Service {
  id: ServiceId;
  name: string;
  promise: string;
  points: string[]; // 3 short lines
  pace: string;
}

export const SERVICES: Service[] = [
  {
    id: "website",
    name: "Website",
    promise: "A site that turns visitors into bookings, calls and orders.",
    points: ["Designed for phones first", "Built in Framer, easy for you to edit", "Booking, contact and maps set up"],
    pace: "Landing page 1 to 2 weeks · Full site 4 to 8 weeks",
  },
  {
    id: "social",
    name: "Social media",
    promise: "A steady, good looking feed you never have to think about.",
    points: ["Monthly plan, posts, stories and reels", "Captions in your voice", "Scheduled for you, if you want"],
    pace: "Planned monthly, ready ahead of time",
  },
  {
    id: "posters",
    name: "Posters and print",
    promise: "Posters, menus and flyers people actually read.",
    points: ["Counter, window and waiting room", "Print ready, plus social sizes", "Editable files included"],
    pace: "Most pieces in a few days",
  },
  {
    id: "ads",
    name: "Ads and campaigns",
    promise: "Ads built around one clear offer that reads in a second.",
    points: ["Meta and Google, every size", "Two or three versions to test", "Seasonal campaign sets"],
    pace: "A full set in about a week",
  },
  {
    id: "brand",
    name: "Brand identity",
    promise: "Logo, colours and fonts, so everything matches.",
    points: ["Logo and versions for every use", "A simple brand guide", "Starter templates"],
    pace: "About 2 to 4 weeks",
  },
];

export const INDUSTRIES: Industry[] = [
  {
    id: "medical",
    name: "Medical clinics",
    short: "Medical",
    headline: "Look as trusted online as you are in the room.",
    promise: "Calm, clear design that helps new patients choose you and book.",
    outcomes: [
      { big: "More bookings", small: "A clear Book button on every page" },
      { big: "Fewer calls", small: "Fees, hours and parking answered online" },
      { big: "Healthcare know how", small: "I worked in US healthcare billing" },
    ],
    make: [
      { service: "website", what: "Trust first clinic site" },
      { service: "social", what: "Health tips and team intros" },
      { service: "posters", what: "Waiting room posters" },
      { service: "brand", what: "Clean, warm identity" },
    ],
    proof: [
      { title: "MedSync", kind: "Direct client", note: "Psychiatry clinic website, designed and built", image: "/images/live/medsync-d-hero.jpg", href: "/work/medsync" },
      { title: "Ozmax Care", kind: "Agency work", note: "NDIS brand and website", image: "/images/ozmax-cover.png", href: "/work/ozmax-care" },
      { title: "InBloom Therapy", kind: "Agency work", note: "Therapy practice brand and social", image: "/images/inbloom-cover.jpg", href: "/work/inbloom-therapy" },
    ],
  },
  {
    id: "dental",
    name: "Dental clinics",
    short: "Dental",
    headline: "Help nervous patients feel safe before they book.",
    promise: "A modern look and simple treatment pages that patients understand.",
    outcomes: [
      { big: "Bigger treatments", small: "Implants and aligners explained simply" },
      { big: "Modern first impression", small: "Your look matches your equipment" },
      { big: "Results that sell", small: "Tasteful before and after galleries" },
    ],
    make: [
      { service: "website", what: "Treatment pages that convert" },
      { service: "social", what: "Smile results and tips" },
      { service: "ads", what: "Whitening and check up offers" },
      { service: "posters", what: "Reception posters and brochures" },
    ],
    proof: [
      { title: "Éclat Dental Kit", kind: "Own product", note: "Dental website system with before and after sliders", image: "/images/products/eclat-d-hero.jpg", href: "/work/eclat-kit" },
      { title: "Dental clinic identity", kind: "Concept study", note: "Brand study for a specialist clinic", image: "/images/branding/dental-clinic-hero.jpg", href: "/work/dental-clinic-branding" },
    ],
  },
  {
    id: "wellness",
    name: "Med spas and wellness",
    short: "Med spa & wellness",
    headline: "Your clients buy a feeling. Let your brand sell it.",
    promise: "A premium site and feed that turn followers into booked consults.",
    outcomes: [
      { big: "Premium prices", small: "A high end look makes them feel fair" },
      { big: "More consults", small: "One simple next step everywhere" },
      { big: "A planned feed", small: "On brand, even in busy months" },
    ],
    make: [
      { service: "website", what: "Treatments, results, memberships" },
      { service: "social", what: "A consistent, luxe feed" },
      { service: "ads", what: "Consult and package offers" },
      { service: "brand", what: "Clinical yet calming identity" },
    ],
    proof: [
      { title: "Lumière Med Spa Kit", kind: "Own product", note: "13 page med spa website in two themes", image: "/images/products/lumiere-d-hero.jpg", href: "/work/lumiere-kit" },
      { title: "Selene Skin & Wellness", kind: "Concept study", note: "Med spa identity", image: "/images/branding/wellness-medspa-hero.jpg", href: "/work/wellness-medspa-branding" },
    ],
  },
  {
    id: "fitness",
    name: "Gyms and fitness studios",
    short: "Gyms & fitness",
    headline: "Make your brand feel like your best class.",
    promise: "Bold visuals and a simple path from first look to first session.",
    outcomes: [
      { big: "More trial sign ups", small: "Timetable, prices and trial in one tap" },
      { big: "A brand people share", small: "Bold and consistent everywhere" },
      { big: "Never a quiet feed", small: "A monthly content plan" },
    ],
    make: [
      { service: "website", what: "Memberships, timetable, free trial" },
      { service: "social", what: "Member wins and challenges" },
      { service: "posters", what: "Gym floor posters" },
      { service: "ads", what: "New member campaigns" },
    ],
    proof: [
      { title: "Fitness studio identity", kind: "Concept study", note: "Brand and social system for a boutique studio", image: "/images/branding/fitness-studio-hero.jpg", href: "/work/fitness-studio-branding" },
      { title: "Social media systems", kind: "Concept study", note: "Templates that keep a feed on brand", image: "/images/gd/sms-feed-sundry.png", href: "/work/social-media-systems" },
    ],
  },
  {
    id: "restaurants",
    name: "Restaurants and cafés",
    short: "Restaurants & cafés",
    headline: "Make people hungry in one second.",
    promise: "Specials, events and menus that fill tables on quiet nights.",
    outcomes: [
      { big: "Fuller quiet nights", small: "One clear offer per post" },
      { big: "Food at its best", small: "Your real dishes, styled to sell" },
      { big: "Agency tested", small: "My daily work for Australian venues" },
    ],
    make: [
      { service: "social", what: "Specials, events and stories" },
      { service: "posters", what: "Menus and counter posters" },
      { service: "ads", what: "Google and Meta campaigns" },
      { service: "website", what: "What's On page and menu" },
    ],
    proof: [
      { title: "The Hill", kind: "Agency work", note: "Lunch campaigns, posters and animated stories", image: "/images/the-hill/lh-poster-2.jpg", href: "/work/the-hill" },
      { title: "Augello's", kind: "Agency work", note: "Pinned posts, ads and a What's On page", image: "/images/augellos/pinned-2.jpg", href: "/work/augellos" },
      { title: "Tacos 'N' Tequilas", kind: "Agency work", note: "Brand guide and campaigns", image: "/images/tnt/follower-1.jpg", href: "/work/tacos-n-tequilas" },
    ],
  },
  {
    id: "real-estate",
    name: "Real estate agencies",
    short: "Real estate",
    headline: "Look like the agent who sells for more.",
    promise: "A premium brand and fast templates that win new listings.",
    outcomes: [
      { big: "More listings", small: "Sellers trust a premium look" },
      { big: "Faster marketing", small: "New listing to posts in minutes" },
      { big: "Known on the street", small: "Signs, flyers and posts that match" },
    ],
    make: [
      { service: "website", what: "Listings and appraisal requests" },
      { service: "social", what: "Just listed and sold templates" },
      { service: "posters", what: "Brochures and signboards" },
      { service: "brand", what: "A standout identity" },
    ],
    proof: [
      { title: "Maison Real Estate Kit", kind: "Own product", note: "A complete agency website system", image: "/images/products/maison-d-hero.jpg", href: "/work/maison-kit" },
    ],
  },
  {
    id: "trades",
    name: "Trades and home services",
    short: "Trades",
    headline: "Be the one they call when something breaks.",
    promise: "A reliable look and a site that makes calling you the easy choice.",
    outcomes: [
      { big: "More local calls", small: "Service areas and one tap calling" },
      { big: "Look established", small: "Van, quotes and site all match" },
      { big: "Fairer quotes", small: "Professional looks earn fair prices" },
    ],
    make: [
      { service: "website", what: "Services, areas and reviews" },
      { service: "brand", what: "Logo for the van and uniforms" },
      { service: "posters", what: "Flyers and quote templates" },
      { service: "ads", what: "Local seasonal ads" },
    ],
    proof: [
      { title: "PlumbYourWay", kind: "Agency work", note: "Plumbing brand and website", image: "/images/plumb-cover.jpg", href: "/work/plumbyourway" },
    ],
  },
  {
    id: "startups",
    name: "Startups and services",
    short: "Startups & services",
    headline: "Explain what you do in one look.",
    promise: "A clear site, deck and brand that match, launched fast.",
    outcomes: [
      { big: "Instantly clear", small: "Plain words and strong visuals" },
      { big: "Launch faster", small: "One person for brand, site and deck" },
      { big: "Investor ready", small: "Polished everywhere you show up" },
    ],
    make: [
      { service: "website", what: "Landing page or full site" },
      { service: "brand", what: "Identity and deck template" },
      { service: "ads", what: "Launch and LinkedIn visuals" },
    ],
    proof: [
      { title: "Esprit AI Agency Kit", kind: "Own product", note: "Modern site system for an AI agency", image: "/images/products/esprit-d-hero.jpg", href: "/work/esprit-kit" },
      { title: "Averis RCM Kit", kind: "Own product", note: "Website and pitch deck kit", image: "/images/products/averis-d-hero.jpg", href: "/work/averis-rcm-kit" },
    ],
  },
];

// Why one freelance designer, compared with the usual alternatives.
// Qualitative only: no invented percentages or prices.
export const COMPARE_OPTIONS = ["Me", "Big agency", "Hire in house", "Do it yourself"] as const;

export const COMPARE_ROWS: { label: string; values: [string, string, string, string] }[] = [
  { label: "You talk to", values: ["The designer", "An account manager", "Your employee", "Yourself"] },
  { label: "Cost", values: ["One fixed quote", "Highest", "A full salary", "Your time"] },
  { label: "Skills", values: ["Web, social, print, ads, brand", "Split across a team", "Usually one or two", "What you know"] },
  { label: "Start", values: ["In days", "In weeks", "In months", "Now, slow to finish"] },
];

export const BUSINESS_FAQS = [
  {
    q: "You are in the Philippines. Does that work?",
    a: "Yes. I work with Australian businesses every day through my agency. My hours (GMT+8) overlap Australian business hours and US mornings.",
  },
  {
    q: "Do you write the words too?",
    a: "Yes. I write the copy for websites, posts and ads, and you approve everything before it goes live.",
  },
  {
    q: "Can you post on our social media?",
    a: "Yes. I can plan, design, write and schedule your posts, or hand the files to your team.",
  },
  {
    q: "We do not have good photos.",
    a: "That is fine. I can work with phone photos, improve them, or give you a simple shoot list.",
  },
  {
    q: "Who owns the files?",
    a: "You do. You get the final and editable files once the project is paid.",
  },
  {
    q: "How does pricing work?",
    a: "One written quote with a clear scope before any work starts. Ongoing work can be a simple monthly plan.",
  },
];
