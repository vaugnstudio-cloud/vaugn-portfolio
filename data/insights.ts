// Insights — short, honest notes from real practice. Edit here; pages render
// from this file. Paragraphs are plain strings (rendered as <p> blocks).

export interface Insight {
  slug: string;
  title: string;
  kicker: string;
  date: string; // ISO
  readMinutes: number;
  summary: string;
  paragraphs: string[];
}

export const insights: Insight[] = [
  {
    slug: "what-makes-patients-trust-a-clinic-website",
    title: "What makes patients trust a clinic website",
    kicker: "Healthcare",
    date: "2026-07-10",
    readMinutes: 4,
    summary:
      "Patients decide whether to trust a clinic before they read a word. Here's what they're actually scanning for — and how to design those answers in.",
    paragraphs: [
      "Nobody comparison-shops a therapist the way they shop for shoes. A person landing on a clinic website is usually anxious, often in a hurry, and quietly asking one question: can I trust these people with something that matters? They answer it in seconds, mostly from signals the clinic never consciously designed.",
      "The first signal is calm. Cluttered layouts, stock photos of models in lab coats, and urgent pop-ups read as noise — and noise reads as risk. The sites that convert are quiet: generous spacing, real photography or none at all, one clear action per screen. Calm design isn't an aesthetic preference in healthcare; it's a proxy for competence.",
      "The second is specificity. 'We provide quality care' says nothing. 'Medicare rebates available, referrals not required, first appointment within two weeks' answers the questions patients actually have. Every vague claim you replace with a concrete fact moves someone closer to booking.",
      "The third is the people. Healthcare is bought from humans, not brands. Real names, real faces, real credentials — placed before the booking button, not buried on an about page. When I built MedSync's site, the structure followed the patient's internal order of questions: is this for me, who are these people, what happens next. That order is the design.",
      "None of this requires a big brand budget. It requires deciding, deliberately, what an anxious stranger needs to feel in the first ten seconds — and building the page backwards from that.",
    ],
  },
  {
    slug: "a-restaurant-brand-is-a-system-not-a-logo",
    title: "A restaurant brand is a system, not a logo",
    kicker: "Hospitality",
    date: "2026-07-10",
    readMinutes: 4,
    summary:
      "Venues don't fail at branding on day one — they fail in week six, when the posts stop matching the menus. The fix is architecture, not more design.",
    paragraphs: [
      "Every venue owner has lived this cycle: pay for a beautiful brand, launch strong, then watch it dissolve — a staff member makes Tuesday's story in a random app, the new menu uses a different font, and by winter the feed looks like three different restaurants.",
      "The problem was never the logo. It's that a restaurant produces more design than almost any other small business — weekly specials, event promos, menu changes, signage — and most brands are delivered as artwork instead of architecture. Artwork depletes. Architecture compounds.",
      "The system that survives contact with a real kitchen has three layers. Rules: a small set of non-negotiables (two typefaces, four colours, one way to write prices) simple enough to follow at 11pm. Templates: drop-in formats for the recurring jobs — menu drop, event, special — where changing the dish and the date is the whole task. Rhythm: a weekly calendar that decides what gets posted when, so nobody starts from a blank canvas on a busy Friday.",
      "Junk Sunshine Coast has run on this model since 2023 — two venues, weekly content, one unmistakable voice. Not because someone polices the brand, but because the system makes staying on-brand the path of least resistance.",
      "If your venue's brand keeps drifting, the answer usually isn't a rebrand. It's turning the brand you have into a machine your team can actually operate.",
    ],
  },
  {
    slug: "how-i-use-ai-without-letting-it-design",
    title: "How I use AI without letting it design",
    kicker: "Process",
    date: "2026-07-10",
    readMinutes: 3,
    summary:
      "AI runs my production line, not my art direction. Where the line sits, and why clients get more design thinking — not less — because of it.",
    paragraphs: [
      "I'll say the quiet part plainly: I use AI tools daily, and none of my clients receive AI-designed brands. Both halves of that sentence matter.",
      "Design work splits into two kinds of hours. Thinking hours: positioning, the idea behind a mark, why this typeface and not that one, what a patient needs to feel in ten seconds. Production hours: resizing forty deliverables, versioning a template across seven formats, retouching, exploration rounds. Clients pay for the first kind — but traditionally most of a project's budget burned on the second.",
      "AI compresses production hours dramatically. Photoshop's generative tools handle cleanup that took an afternoon; automation handles versioning; drafting tools accelerate exploration. What it cannot do is know that a disability-care brand should feel dependable before it feels friendly, or that a craft beverage can has three seconds to win a fridge door. Every direction, every final decision, every mark in my work is human — mine.",
      "The practical result for clients: more of the budget lands on strategy and craft, revisions come back in hours instead of days, and the work still carries a personal signature no generator produces. That's the whole arrangement. AI is staff, not the designer.",
    ],
  },
];

export function getInsight(slug: string): Insight | undefined {
  return insights.find((i) => i.slug === slug);
}
