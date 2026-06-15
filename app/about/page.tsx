import type { Metadata } from "next";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "About",
  description:
    "Agency-trained brand & marketing designer — healthcare-fluent, AI-enhanced. Brand, web, and marketing creative, remote from GMT+8.",
};

const EMAIL = "vaugn.studio@gmail.com";
const LINKEDIN_URL = "https://linkedin.com/in/vaugn-almeida";
const eyebrow = { fontFamily: "Georgia, 'Times New Roman', serif" };

const process = [
  ["01", "Understand", "The business and the audience — not just the brief."],
  ["02", "Design", "Systems and identities, not disconnected one-offs."],
  ["03", "Ship", "Production-ready files and builds, on time."],
  ["04", "Measure", "Did it convert and build trust? Then iterate."],
];

const experience = [
  [
    "Your SocialChef",
    "Brand & Marketing Designer · 2023–Present",
    "In-house creative across 20+ concurrent client accounts — brand campaigns, social systems, Figma/Framer web design, and short-form video, spanning healthcare, hospitality, retail, and professional services.",
  ],
  [
    "Freelance",
    "Brand & Web Designer · 2024–Present",
    "Direct client work including MedSync, InBloom Therapy, and FeedMe Group — brand identity, websites, and marketing creative end to end.",
  ],
];

const tools = [
  [
    "Design & Web",
    "Figma · Framer · Photoshop · Illustrator · InDesign · After Effects · Premiere Pro · Lightroom",
  ],
  [
    "AI-Enhanced Workflow",
    "Adobe Firefly · Photoshop Generative AI · Magnific AI · Higgsfield AI · ChatGPT · Claude",
  ],
];

export default function AboutPage() {
  return (
    <>
      {/* Intro */}
      <section className="mx-auto max-w-6xl px-6 pt-16 pb-20 sm:pt-24">
        <FadeIn>
          <p className="text-base italic text-accent" style={eyebrow}>
            (about)
          </p>
          <h1 className="mt-3 max-w-4xl font-heading text-4xl font-extrabold leading-[1.08] tracking-tight text-ink sm:text-6xl">
            The designer who reads the business — not just the brief.
          </h1>
        </FadeIn>
        <div className="mt-12 grid gap-10 sm:grid-cols-[260px_1fr] sm:items-start">
          <FadeIn>
            {/* Photo placeholder — swap for Vaugn's real portrait (/images/vaugn-photo.jpg) */}
            <div className="flex aspect-square w-full items-center justify-center rounded-[24px] border border-line bg-[#e3e0d8] text-dim">
              <span className="font-mono text-[11px] uppercase tracking-widest">your photo</span>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="max-w-xl space-y-6 text-lg leading-relaxed text-ink2">
              <p>
                I&apos;m Vaugn — a brand &amp; marketing designer who helps
                businesses look like the ones people already trust.
              </p>
              <p>
                With 4+ years of agency experience across Australian, American,
                and European clients, I combine brand strategy, Figma and Framer
                web design, and AI-enhanced creative workflows to deliver visual
                systems that build credibility, attract better clients, and
                convert — at agency speed.
              </p>
              <p>
                My background is uncommon for a designer. I&apos;ve worked across
                healthcare, where credibility and compliance-aware design
                aren&apos;t optional — so I speak the language of trust-first
                brands without the onboarding gap.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Process */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <FadeIn>
          <p className="text-base italic text-accent" style={eyebrow}>
            (how I work)
          </p>
          <h2 className="mt-2 font-heading text-3xl font-extrabold text-ink sm:text-5xl">
            Understand → Design → Ship → Measure.
          </h2>
        </FadeIn>
        <div className="mt-10 grid gap-8 sm:grid-cols-4">
          {process.map(([n, t, d], i) => (
            <FadeIn key={n} delay={i * 0.08}>
              <div className="font-mono text-[11px] uppercase tracking-wider text-accent">{n}</div>
              <div className="mt-3 font-heading text-xl font-bold text-ink">{t}</div>
              <p className="mt-2 text-sm leading-relaxed text-ink2">{d}</p>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Experience */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <FadeIn>
          <p className="text-base italic text-accent" style={eyebrow}>
            (experience)
          </p>
        </FadeIn>
        <div className="mt-6 divide-y divide-line border-y border-line">
          {experience.map(([org, role, desc], i) => (
            <FadeIn key={org} delay={i * 0.08}>
              <div className="grid gap-3 py-8 sm:grid-cols-[1fr_2fr]">
                <div>
                  <div className="font-heading text-xl font-bold text-ink">{org}</div>
                  <div className="mt-1 font-mono text-[11px] uppercase tracking-wider text-dim">
                    {role}
                  </div>
                </div>
                <p className="max-w-xl text-base leading-relaxed text-ink2">{desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Capabilities & Tools */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <FadeIn>
          <p className="text-base italic text-accent" style={eyebrow}>
            (capabilities &amp; tools)
          </p>
        </FadeIn>
        <div className="mt-8 grid gap-8 sm:grid-cols-2">
          {tools.map(([heading, items], i) => (
            <FadeIn key={heading} delay={i * 0.08}>
              <div className="rounded-[24px] border border-line bg-cream p-8">
                <h3 className="font-heading text-lg font-bold text-ink">{heading}</h3>
                <p className="mt-4 leading-relaxed text-ink2">{items}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className="mx-auto max-w-2xl px-6 pb-28 text-center">
        <FadeIn>
          <h2 className="mx-auto max-w-md font-heading text-4xl font-extrabold text-ink sm:text-5xl">
            Let&apos;s build something.
          </h2>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href={`mailto:${EMAIL}`}
              className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-4 text-sm font-medium text-white transition-transform hover:scale-[1.03]"
            >
              {EMAIL}
            </a>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-line bg-cream px-7 py-4 text-sm font-medium text-ink transition-colors hover:border-ink/30"
            >
              LinkedIn ↗
            </a>
          </div>
        </FadeIn>
      </section>
    </>
  );
}
