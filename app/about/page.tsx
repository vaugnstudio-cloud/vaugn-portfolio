import type { Metadata } from "next";
import FadeIn from "@/components/FadeIn";
import Portrait from "@/components/Portrait";
import CTABand from "@/components/CTABand";
import {
  EMAIL,
  mailto,
  LINKEDIN_URL,
  LINKEDIN_LABEL,
  INTRO_VIDEO_SRC,
  CV_URL,
  PORTFOLIO_PDF_URL,
  HIRING_FACTS,
} from "@/data/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Vaugn Almeida, Senior Brand & Web Designer. Senior Graphic Designer at Your SocialChef, with a background in US healthcare billing.",
  alternates: { canonical: "/about" },
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
} as const;

const EXPERIENCE = [
  {
    period: "Sep 2026 to now",
    title: "Senior Graphic Designer, Your SocialChef",
    body: "Promoted in September 2026. Design work for client brands, plus creative review of the team's work: text and offers, layout, readability, cropping, safe zones and brand consistency. Depending on the task I give correction notes or make the changes myself.",
  },
  {
    period: "Feb 2023 to Sep 2026",
    title: "Brand & Web Designer, Your SocialChef",
    body: "Campaigns, brand guides, social templates, menus, email headers, Figma web mockups and short video, across 20+ client accounts over several years. Mostly hospitality, plus healthcare and retail. Agency projects include Augello's, Tacos 'N' Tequilas, Ozmax Care, InBloom Therapy and Mekong Merchant.",
  },
  {
    period: "Mar 2022 to now",
    title: "Independent Brand & Web Designer",
    body: "Direct client work, including the MedSync website: visual design, copy and the Framer build. In 2026 I also designed and built my own website kits and apps.",
  },
  {
    period: "Mar 2024 to Nov 2025",
    title: "Creative Designer (part time), ACEF Enterprises",
    body: "Brochures, banners and social graphics for a US healthcare billing company.",
  },
  {
    period: "May 2023 to Dec 2025",
    title: "Revenue Cycle Management Specialist, ChrisNGrace Inc.",
    body: "Claims, denials and payer follow up in US healthcare billing. This is where my healthcare knowledge comes from.",
  },
] as const;

const TRAINING = [
  "HubSpot Social Media, completed in my own name",
  "Google UX Design, completed through the agency account",
  "DataCamp AI Fundamentals, completed through the agency account",
  "Coursera HTML, CSS and JavaScript, completed through the agency account",
  "Udemy Graphic Design Masterclass, completed through the agency account",
] as const;

export default function AboutPage() {
  return (
    <>
      <section className="mx-auto max-w-[1240px] px-5 sm:px-8 pb-24 pt-16 sm:pt-24">
        <FadeIn>
          <p className="eyebrow">About</p>
          <h1 className="display mt-3 max-w-3xl text-5xl text-ink sm:text-6xl">
            Designer at an agency, with a background in <em>healthcare</em>.
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
              href={PORTFOLIO_PDF_URL}
              download
              className="rounded-full border border-line px-7 py-3.5 text-ink2 transition-colors hover:border-ink2 hover:text-ink"
            >
              Portfolio PDF
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

        {/* Hiring snapshot — the facts a recruiter scans for first */}
        <FadeIn delay={0.12}>
          <dl className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {HIRING_FACTS.map((f) => (
              <div key={f.label} className="bg-surface px-5 py-4">
                <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-dim">
                  {f.label}
                </dt>
                <dd className="mt-1.5 text-sm leading-snug text-ink">{f.value}</dd>
              </div>
            ))}
          </dl>
        </FadeIn>

        <div className="mt-16 grid gap-12 lg:grid-cols-[2fr_3fr]">
          <FadeIn>
            <Portrait />
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="flex flex-col gap-5 text-lg leading-relaxed text-ink2">
              <p>
                I&apos;m Vaugn Jasper Almeida, a brand and web designer based in
                the Greater Manila Area. I work remotely.
              </p>
              <p>
                I joined Your SocialChef, an Australian agency, in February
                2023 as a Brand &amp; Web Designer. In September 2026 I was
                promoted to Senior Graphic Designer. Alongside my own design
                work, I now review creative work across the team.
              </p>
              <p>
                I also worked in US healthcare billing, handling claims, denials
                and payer follow up. It means I already know how clinics and
                billing teams talk, which helps on healthcare projects.
              </p>
              <p>
                For direct clients I design and build websites in Framer. For
                MedSync, a psychiatry clinic in California, I did the visual
                design, the copy and the build. I use AI tools for some
                production steps. The direction and the decisions are mine.
              </p>
              <p>
                I&apos;m open to senior remote roles in brand and web design,
                and I take on a small number of client projects alongside.
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
          <div className="mt-8 grid gap-6">
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
              Training: {TRAINING.join(". ")}.
            </p>
          </FadeIn>
        </div>

        {/* Quiet links */}
        <FadeIn className="mt-16">
          <div className="flex flex-wrap gap-6 text-sm text-dim">
            <a
              href={mailto()}
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
