import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import CTABand from "@/components/CTABand";
import { products } from "@/data/products";
import { EMAIL } from "@/data/site";

export const metadata: Metadata = {
  title: "Resources & Digital Products",
  description:
    "Templates, checklists, and marketing systems — the systems I use for client work, packaged. Launching soon.",
};

export default function ResourcesPage() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-6 pb-24 pt-16 sm:pt-24">
        <FadeIn>
          <p className="eyebrow">Resources</p>
          <h1 className="display mt-3 max-w-3xl text-5xl text-ink sm:text-6xl">
            The systems I use for clients, <em>packaged</em>.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink2">
            Templates, checklists, and marketing systems built from real client
            work — not theory. Everything below is in production for launch.
          </p>
          <span className="mt-8 inline-flex items-center gap-2 rounded-full border border-line px-4 py-1.5 font-mono text-xs uppercase tracking-wider text-ink2">
            <span className="h-2 w-2 rounded-full bg-accent" />
            First products launching soon
          </span>
        </FadeIn>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {products.map((p, i) => (
            <FadeIn key={p.id} delay={i * 0.05}>
              <article className="flex h-full flex-col rounded-2xl border border-line bg-surface p-8">
                <div className="flex items-center justify-between gap-4">
                  <span className="rounded-full border border-line px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-ink2">
                    {p.category}
                  </span>
                  <span
                    className={`font-mono text-[10px] uppercase tracking-wider ${
                      p.free ? "text-accent" : "text-dim"
                    }`}
                  >
                    {p.free ? "Free" : p.status === "available" ? p.price : "Coming soon"}
                  </span>
                </div>

                {/* Product artwork slot — drop a cover at launch */}
                <div className="mt-6 flex aspect-[16/9] w-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-line bg-raised">
                  <span className="font-display text-xl italic text-ink2">{p.name}</span>
                  <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-dim/70">
                    artwork — coming
                  </span>
                </div>

                <h2 className="mt-6 font-display text-2xl text-ink">{p.name}</h2>
                <p className="mt-1 text-sm text-dim">{p.forWho}</p>
                <p className="mt-3 text-sm leading-relaxed text-ink2">{p.description}</p>

                <div className="mt-auto pt-6">
                  {p.status === "available" && p.url ? (
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-ink transition-transform hover:scale-[1.02]"
                    >
                      Get it →
                    </a>
                  ) : (
                    <span className="inline-block cursor-default rounded-full border border-line px-5 py-2.5 text-sm text-dim">
                      {p.free ? "Available at launch" : "Coming soon"}
                    </span>
                  )}
                </div>
              </article>
            </FadeIn>
          ))}
        </div>

        <FadeIn className="mt-16">
          <div className="rounded-2xl border border-line bg-surface p-10 text-center">
            <h2 className="font-display text-2xl text-ink">
              Want to know when these launch?
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink2">
              Email me &ldquo;resources&rdquo; and you&apos;ll be first to know —
              or just start a project and get the systems custom-built instead.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
              <a
                href={`mailto:${EMAIL}?subject=Resources%20launch%20list`}
                className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-ink transition-transform hover:scale-[1.02]"
              >
                Join the launch list
              </a>
              <Link
                href="/services"
                className="rounded-full border border-line px-6 py-3 text-sm text-ink2 transition-colors hover:border-ink2 hover:text-ink"
              >
                Or see client services
              </Link>
            </div>
          </div>
        </FadeIn>
      </section>

      <CTABand heading="Need it custom instead?" />
    </>
  );
}
