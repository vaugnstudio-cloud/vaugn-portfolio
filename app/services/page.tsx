import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import ServiceCard from "@/components/ServiceCard";
import ProcessSteps from "@/components/ProcessSteps";
import CTABand from "@/components/CTABand";
import { services, faqs } from "@/data/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Select client engagements — brand + web launch packages, healthcare and hospitality specialties, Framer landing pages, and monthly retainers. Custom-quoted, fixed-price.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-6 pb-24 pt-16 sm:pt-24">
        <FadeIn>
          <p className="eyebrow">Client services</p>
          <h1 className="display mt-3 max-w-3xl text-5xl text-ink sm:text-6xl">
            Also available for <em>select client projects</em>.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-ink2">
            I take a limited number of client engagements alongside senior-role
            work. Every one is custom-quoted and fixed before it starts — one
            proposal, tailored to your scope and market, that never changes
            mid-project.
          </p>
        </FadeIn>

        <FadeIn className="mt-10">
          <div className="rounded-2xl border border-line bg-surface p-6 sm:p-8">
            <p className="text-sm text-ink2">
              <span className="font-medium text-ink">
                Here to hire rather than commission?
              </span>{" "}
              The fast path:{" "}
              <a
                href="/cv.pdf"
                download
                className="text-accent underline decoration-line underline-offset-4"
              >
                download the CV
              </a>{" "}
              or{" "}
              <Link
                href="/about"
                className="text-accent underline decoration-line underline-offset-4"
              >
                read the background →
              </Link>
            </p>
          </div>
        </FadeIn>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {services.map((s, i) => (
            <FadeIn key={s.id} delay={i * 0.05}>
              <ServiceCard service={s} detailed />
            </FadeIn>
          ))}
        </div>

        {/* Niche pointers */}
        <FadeIn className="mt-16">
          <div className="grid gap-4 sm:grid-cols-2">
            <Link
              href="/healthcare"
              className="group rounded-2xl border border-line bg-surface p-8 transition-colors hover:bg-raised"
            >
              <p className="eyebrow">In healthcare?</p>
              <p className="mt-3 font-display text-2xl text-ink group-hover:text-accent">
                See how I design for patient trust →
              </p>
            </Link>
            <Link
              href="/hospitality"
              className="group rounded-2xl border border-line bg-surface p-8 transition-colors hover:bg-raised"
            >
              <p className="eyebrow">Running a venue?</p>
              <p className="mt-3 font-display text-2xl text-ink group-hover:text-accent">
                See the hospitality marketing system →
              </p>
            </Link>
          </div>
        </FadeIn>

        {/* Process */}
        <div id="process" className="mt-24 border-t border-line pt-20">
          <FadeIn>
            <p className="eyebrow">How we&apos;ll work together</p>
            <h2 className="display mt-3 max-w-2xl text-4xl text-ink sm:text-5xl">
              A process built to <em>de-risk</em> hiring a solo designer.
            </h2>
          </FadeIn>
          <div className="mt-12">
            <ProcessSteps />
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-24 border-t border-line pt-20">
          <FadeIn>
            <p className="eyebrow">Questions, answered</p>
            <h2 className="display mt-3 text-4xl text-ink sm:text-5xl">FAQ</h2>
          </FadeIn>
          <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-line bg-line">
            {faqs.map((f) => (
              <FadeIn key={f.q} className="bg-surface">
                <details className="group p-7">
                  <summary className="cursor-pointer list-none font-display text-xl text-ink transition-colors group-open:text-accent">
                    {f.q}
                  </summary>
                  <p className="mt-4 max-w-2xl leading-relaxed text-ink2">{f.a}</p>
                </details>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <CTABand heading="Not sure which package fits?" />
    </>
  );
}
