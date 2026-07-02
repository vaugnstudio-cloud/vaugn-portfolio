import type { Metadata } from "next";
import { caseStudies, branding, graphicDesign, moreProjects } from "@/data/projects";
import ProjectCard from "@/components/ProjectCard";
import FadeIn from "@/components/FadeIn";
import CTABand from "@/components/CTABand";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Case studies and graphic design across healthcare, hospitality, and agency scale — most with live sites you can visit.",
};

export default function WorkPage() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-6 pb-28 pt-16 sm:pt-24">
        <FadeIn>
          <p className="eyebrow">Work</p>
          <h1 className="display mt-3 max-w-3xl text-5xl text-ink sm:text-6xl">
            Every project. <em>Full picture.</em>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-ink2">
            Deep case studies, graphic design, and shipped websites — most with
            live links, so you can see the work in the wild.
          </p>
        </FadeIn>

        {/* §1 Case studies — full narrative pages */}
        <div className="mt-20">
          <FadeIn>
            <div className="flex items-baseline gap-4">
              <h2 className="font-display text-3xl text-ink">Case studies</h2>
              <span className="font-mono text-xs text-dim">
                0{caseStudies.length}
              </span>
            </div>
            <p className="mt-2 max-w-lg text-sm text-ink2">
              Strategy to shipped — the problem, the thinking, and the system
              behind each project.
            </p>
          </FadeIn>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {caseStudies.map((p, i) => (
              <FadeIn key={p.id} delay={i * 0.05}>
                <ProjectCard project={p} />
              </FadeIn>
            ))}
          </div>
        </div>

        {/* §2 Branding — niche concept series */}
        <div className="mt-24 border-t border-line pt-20">
          <FadeIn>
            <div className="flex items-baseline gap-4">
              <h2 className="font-display text-3xl text-ink">Branding</h2>
              <span className="font-mono text-xs text-dim">
                0{branding.length}
              </span>
            </div>
            <p className="mt-2 max-w-lg text-sm text-ink2">
              Concept identities for the niches I serve — complete brand
              systems from mark to packaging to feed.
            </p>
          </FadeIn>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {branding.map((p, i) => (
              <FadeIn key={p.id} delay={i * 0.04}>
                <ProjectCard project={p} />
              </FadeIn>
            ))}
          </div>
        </div>

        {/* §3 Graphic design — visual showcases */}
        <div className="mt-24 border-t border-line pt-20">
          <FadeIn>
            <div className="flex items-baseline gap-4">
              <h2 className="font-display text-3xl text-ink">Graphic design</h2>
              <span className="font-mono text-xs text-dim">
                0{graphicDesign.length}
              </span>
            </div>
            <p className="mt-2 max-w-lg text-sm text-ink2">
              The craft in isolation — social systems, print, and identity
              pieces from five years of client work.
            </p>
          </FadeIn>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {graphicDesign.map((p, i) => (
              <FadeIn key={p.id} delay={i * 0.05}>
                <ProjectCard project={p} />
              </FadeIn>
            ))}
          </div>
        </div>

        {/* §4 More projects — gallery pages with live links */}
        <div className="mt-24 border-t border-line pt-20">
          <FadeIn>
            <div className="flex items-baseline gap-4">
              <h2 className="font-display text-3xl text-ink">More projects</h2>
              <span className="font-mono text-xs text-dim">
                0{moreProjects.length}
              </span>
            </div>
            <p className="mt-2 max-w-lg text-sm text-ink2">
              Additional shipped work — click through for details and live
              sites.
            </p>
          </FadeIn>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {moreProjects.map((p, i) => (
              <FadeIn key={p.id} delay={i * 0.04}>
                <ProjectCard project={p} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <CTABand heading="Want work like this for your business?" />
    </>
  );
}
