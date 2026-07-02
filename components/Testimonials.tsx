import { approvedTestimonials } from "@/data/testimonials";

// Renders CLIENT-APPROVED quotes only. Drafts (approved: false) never appear.
// If nothing is approved yet, the section renders nothing at all —
// a placeholder testimonial is worse than none (strategy §3.7).
export default function Testimonials() {
  if (approvedTestimonials.length === 0) return null;

  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <p className="eyebrow">What clients say</p>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {approvedTestimonials.map((t) => (
          <blockquote
            key={t.role}
            className="rounded-2xl border border-line bg-surface p-8"
          >
            <p className="font-display text-xl leading-relaxed text-ink">
              “{t.quote}”
            </p>
            <footer className="mt-6 text-sm text-dim">
              {t.name ? `${t.name} · ` : ""}
              {t.role}
            </footer>
          </blockquote>
        ))}
      </div>
    </section>
  );
}
