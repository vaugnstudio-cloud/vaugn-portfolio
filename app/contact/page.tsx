import type { Metadata } from "next";
import FadeIn from "@/components/FadeIn";
import ContactForm from "@/components/ContactForm";
import CopyEmail from "@/components/CopyEmail";
import {
  EMAIL,
  mailto,
  LINKEDIN_URL,
  LINKEDIN_LABEL,
  CAL_LINK,
  RESPONSE_PROMISE,
  CV_URL,
  CV_PLAIN_URL,
  AVAILABILITY,
  PORTFOLIO_PDF_URL,
  HIRING_FACTS,
} from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Hiring a senior brand and web designer, or planning a project? Email Vaugn Almeida directly.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-[1240px] px-5 sm:px-8 pb-28 pt-16 sm:pt-24">
      <FadeIn>
        <p className="eyebrow">Contact</p>
        <h1 className="display mt-3 max-w-3xl text-5xl text-ink sm:text-6xl">
          Hiring, or <em>building something</em>?
        </h1>
        <p className="mt-6 max-w-xl text-lg text-ink2">
          Email is the fastest way to reach me. A few details are enough,
          and I&apos;ll reply with a clear next step. {RESPONSE_PROMISE}.
        </p>
      </FadeIn>

      <div className="mt-16 grid gap-12 lg:grid-cols-[3fr_2fr]">
        <FadeIn>
          <ContactForm />
        </FadeIn>

        <FadeIn delay={0.1} className="order-first lg:order-none">
          <div className="flex flex-col gap-6">
            <div className="rounded-2xl border border-accent/50 bg-surface p-8">
              <p className="eyebrow">Direct</p>
              <a
                href={mailto("Project enquiry")}
                className="mt-3 block break-all font-display text-xl font-semibold tracking-tight text-ink transition-colors hover:text-accent"
              >
                {EMAIL}
              </a>
              <CopyEmail className="mt-4" />
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 block text-sm text-ink2 transition-colors hover:text-ink"
              >
                {LINKEDIN_LABEL}
              </a>
            </div>

            {/* Hiring: the fast path for recruiters and agencies */}
            <div className="rounded-2xl border border-line bg-surface p-8">
              <p className="eyebrow">Hiring?</p>
              <h2 className="mt-3 font-display text-2xl text-ink">
                The short version, ready to send on
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-ink2">
                My CV, a portfolio PDF for upload forms and my LinkedIn.
              </p>
              <dl className="mt-5 grid gap-2 text-sm">
                {HIRING_FACTS.slice(0, 3).map((f) => (
                  <div key={f.label} className="flex gap-3">
                    <dt className="w-24 flex-none font-mono text-[11px] uppercase tracking-[0.18em] text-dim pt-1">
                      {f.label}
                    </dt>
                    <dd className="text-ink2">{f.value}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={CV_URL}
                  download
                  className="inline-block rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-ink transition-transform hover:scale-[1.02]"
                >
                  Download CV
                </a>
                <a
                  href={PORTFOLIO_PDF_URL}
                  download
                  className="inline-block rounded-full border border-line px-6 py-3 text-sm text-ink2 transition-colors hover:border-ink2 hover:text-ink"
                >
                  Portfolio PDF
                </a>
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block rounded-full border border-line px-6 py-3 text-sm text-ink2 transition-colors hover:border-ink2 hover:text-ink"
                >
                  LinkedIn ↗
                </a>
              </div>
              <a
                href={CV_PLAIN_URL}
                download
                className="mt-4 inline-block text-sm text-ink2 underline decoration-line underline-offset-4 hover:text-ink"
              >
                Plain one column CV, for upload forms
              </a>
            </div>

            {/* Booking — appears once a Cal.com link is configured */}
            {CAL_LINK ? (
              <div className="rounded-2xl border border-line bg-surface p-8">
                <p className="eyebrow">Prefer to talk?</p>
                <h2 className="mt-3 font-display text-2xl text-ink">
                  Book a 15-minute intro call
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-ink2">
                  A short conversation about what you need and whether I&apos;m
                  the right fit.
                </p>
                <a
                  href={`https://cal.com/${CAL_LINK}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-block rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-ink transition-transform hover:scale-[1.02]"
                >
                  Pick a time ↗
                </a>
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-line bg-surface p-8">
                <p className="eyebrow">Booking coming soon</p>
                <p className="mt-3 text-sm leading-relaxed text-ink2">
                  A 15-minute intro-call scheduler is on its way. Until then,
                  the form or email works just as fast.
                </p>
              </div>
            )}



            <div className="rounded-2xl border border-line bg-surface p-8">
              <p className="eyebrow">Right now</p>
              <p className="mt-3 flex items-center gap-2 text-sm text-ink2">
                <span className="h-2 w-2 rounded-full bg-accent" />
                {AVAILABILITY}
              </p>
              <p className="mt-2 text-sm text-ink2">
                Working remotely from the Greater Manila Area, GMT+8.
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
