// Testimonials — DRAFT-FOR-APPROVAL workflow (July 2026 strategy, §7):
// Each quote below is a DRAFT written for the client to review, edit, and
// sign off. `approved` stays false until the client confirms the exact
// wording. The <Testimonials> component renders APPROVED quotes only —
// drafts never appear on the site. Never flip `approved` without a real
// client sign-off.

export interface Testimonial {
  quote: string;
  name: string; // real name once approved
  role: string;
  project: string;
  approved: boolean;
}

export const testimonials: Testimonial[] = [
  {
    // DRAFT — send to Your SocialChef leadership for sign-off
    quote:
      "Vaugn carried the creative for 20+ of our client accounts at once — and every single one looked like it had its own dedicated designer. Fast, consistent, and completely dependable.",
    name: "",
    role: "Your SocialChef — leadership",
    project: "your-socialchef",
    approved: false,
  },
  {
    // DRAFT — send to MedSync contact for sign-off
    quote:
      "We needed to look trustworthy from day one, and Vaugn delivered exactly that — brand, website, everything, handled end to end by one person. The site he built in Framer is calm, credible, and ours to update.",
    name: "",
    role: "MedSync Mental Health",
    project: "medsync",
    approved: false,
  },
  {
    // DRAFT — send to Junk Sunshine Coast contact for sign-off
    quote:
      "Two venues, weekly content, posters, the website — Vaugn keeps all of it loud and unmistakably Junk. Three years in and the brand has never looked tired.",
    name: "",
    role: "Junk Sunshine Coast",
    project: "junk-sunshine-coast",
    approved: false,
  },
  {
    // DRAFT — send to Ozmax Care contact for sign-off
    quote:
      "Vaugn understood that families choosing an NDIS provider are making a deeply personal decision. The brand he designed feels warm and dependable — exactly who we are.",
    name: "",
    role: "Ozmax Care",
    project: "ozmax-care",
    approved: false,
  },
];

export const approvedTestimonials = testimonials.filter((t) => t.approved);
