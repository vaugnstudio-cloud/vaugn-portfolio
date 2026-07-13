// Digital products — /resources scaffold (Phase 7 strategy, pulled forward
// as placeholders July 2026). Everything ships as "coming soon" until real
// products exist; flip `status` and add a `url` (checkout/marketplace link)
// per product when they launch. Framed as "the systems I use for clients,
// packaged" — reinforcing, never cheapening, the service brand.

export type ProductStatus = "coming-soon" | "available";

export interface Product {
  id: string;
  name: string;
  category: string;
  forWho: string;
  description: string;
  price?: string; // set at launch, e.g. "$49"
  status: ProductStatus;
  url?: string; // checkout / marketplace link at launch
  free?: boolean; // lead magnets
  image?: string; // product artwork (rendered via scripts/product-posters.mjs)
  demoUrl?: string; // live demo, where one exists
}

// Storefront — everything lives here
export const STORE_URL = "https://vaugnstudio.gumroad.com";
export const STORE_BANNER = "/images/products/gumroad-storefront.png";

export const products: Product[] = [
  {
    id: "denial-defense-system",
    name: "Denial Defense System",
    category: "SOP toolkit",
    forWho: "Private medical practices & billing teams",
    description:
      "The complete medical-billing SOP toolkit — 25 step-by-step revenue-cycle SOPs, an interactive offline dashboard, denial & A/R trackers, and 5 appeal letter templates. Built by an RCM insider.",
    price: "$67",
    status: "available",
    url: "https://vaugnstudio.gumroad.com/l/qymrx",
    demoUrl: "https://denial-defense-demo.netlify.app",
    image: "/images/products/denial-defense-card.png",
  },
  {
    id: "healthcare-trust-checklist",
    name: "Healthcare Website Trust Checklist",
    category: "Free resource",
    forWho: "Clinics, practices & health businesses",
    description:
      "The checklist I use to launch trust-worthy healthcare websites — the credibility signals patients scan for, in order.",
    status: "coming-soon",
    free: true,
  },
  {
    id: "framer-healthcare-template",
    name: "Framer Template — Healthcare Clinic",
    category: "Framer template",
    forWho: "Clinics & practices that want a credible site, fast",
    description:
      "A trust-first clinic website template built from real client projects — calm UX, credibility structure, booking-ready.",
    status: "coming-soon",
  },
  {
    id: "framer-restaurant-template",
    name: "Framer Template — Restaurant",
    category: "Framer template",
    forWho: "Restaurants & venues",
    description:
      "An appetite-first restaurant template with menu, ordering hooks, and event sections — proven structure from live venues.",
    status: "coming-soon",
  },
  {
    id: "restaurant-marketing-pack",
    name: "Restaurant Marketing Pack",
    category: "Template pack",
    forWho: "Venues that need weekly content without a designer",
    description:
      "Social templates, menu-drop layouts, and promo systems — the same content engine running live Australian venues.",
    status: "coming-soon",
  },
  {
    id: "social-media-system-kit",
    name: "Social Media System Kit",
    category: "Template pack",
    forWho: "Small businesses & marketing teams",
    description:
      "A template architecture for staying consistent at posting speed — built from managing 20+ agency accounts at once.",
    status: "coming-soon",
  },
];
