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
}

export const products: Product[] = [
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
