import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import CTABand from "@/components/CTABand";
import { insights } from "@/data/insights";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Short, honest notes from real practice — on healthcare trust, hospitality brand systems, and AI-assisted design workflows.",
};

const dateFmt = new Intl.DateTimeFormat("en-AU", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export default function InsightsPage() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-6 pb-28 pt-16 sm:pt-24">
        <FadeIn>
          <p className="eyebrow">Insights</p>
          <h1 className="display mt-3 max-w-3xl text-5xl text-ink sm:text-6xl">
            Notes from <em>real practice</em>.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-ink2">
            Short reads on what actually makes trust-critical brands work — no
            theory, no filler.
          </p>
        </FadeIn>

        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-line bg-line">
          {insights.map((post, i) => (
            <FadeIn key={post.slug} delay={i * 0.05} className="bg-surface">
              <Link
                href={`/insights/${post.slug}`}
                className="group grid gap-4 p-8 transition-colors hover:bg-raised sm:grid-cols-[160px_1fr_auto] sm:items-baseline"
              >
                <span className="font-mono text-[11px] uppercase tracking-wider text-accent">
                  {post.kicker}
                </span>
                <span>
                  <h2 className="font-display text-2xl text-ink group-hover:text-accent sm:text-3xl">
                    {post.title}
                  </h2>
                  <p className="mt-2 max-w-[65ch] text-sm leading-relaxed text-ink2">
                    {post.summary}
                  </p>
                </span>
                <span className="font-mono text-xs text-dim">
                  {post.readMinutes} min
                </span>
              </Link>
            </FadeIn>
          ))}
        </div>

        <FadeIn>
          <p className="mt-8 text-sm text-dim">
            More notes are written as the work teaches them —{" "}
            {dateFmt.format(new Date(insights[0].date))}.
          </p>
        </FadeIn>
      </section>

      <CTABand heading="Working on something these notes touch?" />
    </>
  );
}
