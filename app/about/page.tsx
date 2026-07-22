import type { Metadata } from "next";
import FadeIn from "@/components/FadeIn";
import Portrait from "@/components/Portrait";
import CTABand from "@/components/CTABand";
import {
  EMAIL,
  gmailCompose,
  LINKEDIN_URL,
  LINKEDIN_LABEL,
  INTRO_VIDEO_SRC,
  CV_URL,
} from "@/data/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Senior brand & web designer — agency-trained, healthcare-fluent, ships own products. 5+ years across Australian, US, and European clients.",
};

const TOOLS = {
  Design: [
    "Figma",
    "Framer",
    "Webflow",
    "Photoshop",
    "Illustrator",
    "InDesign",
    "After Effects",
    "Premiere Pro",
    "Lightroom",
  ],
  "AI workflow": [
    "Claude",
    "ChatGPT",
    "Adobe Firefly",
    "Photoshop Generative AI",
    "Magnific AI",
    "Higgsfield AI",
  ],
} as const;

const EXPERIENCE = [
  {
    period: "2025 — Present",
    title: "Vaugn Studio — Products",
    body: "Designed, built, and shipped a product line of my own: niche website kits (Averis, Lumière, Éclat, Maison, Esprit) and working apps (Studio OS, SOP Quest, Outreach Cockpit) — design system to production PWA, solo.",
  },
  {
    period: "2024 — Present",
    title: "Independent — Brand & Web Designer",
    body: "Direct client work across healthcare, hospitality, and growth businesses: MedSync, InBloom Therapy, FeedMe Group, and more. Strategy to shipped site, end to end.",
  },
  {
    period: "2023 — Present",
    title: "Your SocialChef — In-house Creative",
    body: "Creative direction across 20+ concurrent client accounts spanning healthcare, hospitality, retail, and professional services. Brand campaigns, social systems, web mockups, short-form video.",
  },
] as const;

export default function AboutPage() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-6 pb-24 pt-16 sm:pt-24">
        <FadeIn>
          <p className="eyebrow">About</p>
          <h1 className="display mt-3 max-w-3xl text-5xl text-ink sm:text-6xl">
            Design that earns trust isn&apos;t an accident. <em>It&apos;s a practice.</em>
          </h1>
        </FadeIn>
        <FadeIn delay={0.08}>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href={CV_URL}
              download
              className="rounded-full bg-accent px-7 py-3.5 font-medium text-accent-ink transition-transform hover:scale-[1.03]"
            >
              Download CV (PDF)
            </a>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-line px-7 py-3.5 text-ink2 transition-colors hover:border-ink2 hover:text-ink"
            >
              LinkedIn
            </a>
          </div>
        </FadeIn>

        <div className="mt-16 grid gap-12 lg:grid-cols-[2fr_3fr]">
          <FadeIn>
            <Portrait />
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="flex flex-col gap-5 text-lg leading-relaxed text-ink2">
              <p>
                I&apos;m Vaugn Jasper Almeida — an independent brand &amp; web
                designer working with clients across Australia, the US, and
                Europe.
              </p>
              <p>
                My background is uncommon for a designer: years inside the
                healthcare industry — including US medical billing and revenue
                cycle management — before and alongside agency work managing
                creative for 20+ concurrent client accounts. That mix means I
                design for the things regulated and trust-critical businesses
                actually worry about: credibility, compliance-aware
                communication, and patients or customers who decide in seconds.
              </p>
              <p>
                I work as one accountable person from strategy to shipped
                site — identity, web design, and the build itself in Framer or
                Webflow. AI-assisted production keeps the repetitive work fast;
                the thinking, direction, and craft stay human.
              </p>
              <p>
                Since 2025 I&apos;ve also shipped my own product line — website
                kits and working apps, designed and built end to end — proof I
                can carry a design from strategy to running code.
              </p>
            </div>
          </FadeIn>
        </div>

        {/* Intro video — hidden scaffold until a real video passes the
            "no client would suspect AI" bar (set INTRO_VIDEO_SRC in data/site.ts). */}
        {INTRO_VIDEO_SRC && (
          <FadeIn className="mt-16">
            <video
              src={INTRO_VIDEO_SRC}
              controls
              preload="metadata"
              className="w-full rounded-2xl border border-line"
            />
          </FadeIn>
        )}

        {/* Experience */}
        <div className="mt-24 border-t border-line pt-16">
          <FadeIn>
            <p className="eyebrow">Experience</p>
          </FadeIn>
          <div className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-line bg-line">
            {EXPERIENCE.map((e) => (
              <FadeIn key={e.title} className="bg-surface">
                <div className="grid gap-4 p-8 sm:grid-cols-[180px_1fr]">
                  <span className="font-mono text-xs uppercase tracking-wider text-dim">
                    {e.period}
                  </span>
                  <div>
                    <h3 className="font-display text-2xl text-ink">{e.title}</h3>
                    <p className="mt-3 leading-relaxed text-ink2">{e.body}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* Tools */}
        <div className="mt-24 border-t border-line pt-16">
          <FadeIn>
            <p className="eyebrow">Tools</p>
          </FadeIn>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {Object.entries(TOOLS).map(([group, tools]) => (
              <FadeIn key={group}>
                <div className="rounded-2xl border border-line bg-surface p-8">
                  <h3 className="font-display text-xl text-ink">{group}</h3>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {tools.map((tool) => (
                      <span
                        key={tool}
                        className="rounded-full border border-line px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-ink2"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn>
            <p className="mt-6 max-w-2xl text-sm leading-relaxed text-dim">
              On AI: it compresses production — versioning, resizing,
              exploration — so more hours go to strategy and craft. Every
              direction and final decision is mine.
            </p>
          </FadeIn>
        </div>

        {/* Quiet links */}
        <FadeIn className="mt-16">
          <div className="flex flex-wrap gap-6 text-sm text-dim">
            <a
              href={gmailCompose()}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-ink"
            >
              {EMAIL}
            </a>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-ink"
            >
              {LINKEDIN_LABEL}
            </a>
            <a href={CV_URL} className="transition-colors hover:text-ink">
              CV (PDF)
            </a>
          </div>
        </FadeIn>
      </section>

      <CTABand />
    </>
  );
}
