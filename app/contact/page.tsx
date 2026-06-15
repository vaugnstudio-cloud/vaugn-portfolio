import type { Metadata } from "next";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Open to full-time roles and select freelance projects. Remote, GMT+8, async-friendly. Get in touch with Vaugn Almeida.",
};

const EMAIL = "vaugn.studio@gmail.com";
const LINKEDIN_URL = "https://linkedin.com/in/vaugn-almeida";
const eyebrow = { fontFamily: "Georgia, 'Times New Roman', serif" };

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-32 pt-16 sm:pt-24">
      <FadeIn>
        <p className="text-base italic text-accent" style={eyebrow}>
          (contact)
        </p>
        <h1 className="mt-3 max-w-3xl font-heading text-5xl font-extrabold leading-[1.05] tracking-tight text-ink sm:text-7xl">
          Let&apos;s build something worth showing.
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink2">
          Open to full-time roles and select freelance projects. The fastest way
          to reach me is email — I reply within 24 hours.
        </p>
      </FadeIn>

      <div className="mt-14 grid gap-10 sm:grid-cols-[1.2fr_1fr]">
        <FadeIn>
          <div className="space-y-4">
            <a
              href={`mailto:${EMAIL}`}
              className="flex items-center justify-between rounded-[20px] border border-line bg-cream px-7 py-6 transition-colors hover:border-ink/30"
            >
              <span>
                <span className="block font-mono text-[11px] uppercase tracking-wider text-dim">
                  Email
                </span>
                <span className="mt-1 block font-heading text-lg font-bold text-ink">
                  {EMAIL}
                </span>
              </span>
              <span className="text-accent">→</span>
            </a>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between rounded-[20px] border border-line bg-cream px-7 py-6 transition-colors hover:border-ink/30"
            >
              <span>
                <span className="block font-mono text-[11px] uppercase tracking-wider text-dim">
                  LinkedIn
                </span>
                <span className="mt-1 block font-heading text-lg font-bold text-ink">
                  in/vaugn-almeida
                </span>
              </span>
              <span className="text-accent">↗</span>
            </a>
            <a
              href="/cv.pdf"
              className="flex items-center justify-between rounded-[20px] border border-line bg-cream px-7 py-6 transition-colors hover:border-ink/30"
            >
              <span>
                <span className="block font-mono text-[11px] uppercase tracking-wider text-dim">
                  Résumé
                </span>
                <span className="mt-1 block font-heading text-lg font-bold text-ink">
                  Download CV (PDF)
                </span>
              </span>
              <span className="text-accent">↓</span>
            </a>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="rounded-[24px] bg-dark p-8 text-cream">
            <p className="font-mono text-[11px] uppercase tracking-wider text-accent">
              Availability
            </p>
            <p className="mt-5 inline-flex items-center gap-2 font-heading text-lg font-bold text-white">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
              Available for work
            </p>
            <dl className="mt-8 space-y-5 text-sm">
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-wider text-dim">Open to</dt>
                <dd className="mt-1 text-[#cfc9bd]">Full-time roles · Freelance projects</dd>
              </div>
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-wider text-dim">Based</dt>
                <dd className="mt-1 text-[#cfc9bd]">Laguna, Philippines · Remote</dd>
              </div>
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-wider text-dim">Timezone</dt>
                <dd className="mt-1 text-[#cfc9bd]">GMT+8 · async-friendly</dd>
              </div>
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-wider text-dim">Response</dt>
                <dd className="mt-1 text-[#cfc9bd]">Within 24 hours</dd>
              </div>
            </dl>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
