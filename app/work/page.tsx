import type { Metadata } from "next";
import Link from "next/link";
import {
  caseStudies,
  productWork,
  branding,
  graphicDesign,
  moreProjects,
} from "@/data/projects";
import ProjectCard from "@/components/ProjectCard";
import FadeIn from "@/components/FadeIn";
import CTABand from "@/components/CTABand";
import MotionSection from "@/components/MotionSection";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Client case studies, shipped products, branding, and graphic design across healthcare and hospitality — most with live sites you can visit.",
  alternates: { canonical: "/work" },
};

// Curated "selected" tiers — strongest work first, the rest under Explore more.
const SELECTED_PRODUCT_IDS = ["averis-rcm-kit", "sop-quest"];
const SELECTED_BRANDING_IDS = ["specialty-coffee-branding", "wellness-medspa-branding"];

export default function WorkPage() {
  const selectedProducts = productWork.filter((p) => SELECTED_PRODUCT_IDS.includes(p.id));
  const moreProducts = productWork.filter((p) => !SELECTED_PRODUCT_IDS.includes(p.id));
  const selectedBranding = branding.filter((p) => SELECTED_BRANDING_IDS.includes(p.id));
  const moreBranding = branding.filter((p) => !SELECTED_BRANDING_IDS.includes(p.id));

  return (
    <>
      <section className="mx-auto max-w-6xl px-6 pb-28 pt-16 sm:pt-24">
        <FadeIn>
          <p className="eyebrow">Work</p>
          <h1 className="display mt-3 max-w-3xl text-5xl text-ink sm:text-6xl">
            Selected work first. <em>Everything else below.</em>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-ink2">
            Client case studies, shipped products, and brand systems — every
            piece labelled for what it is, most with live links so you can see
            the work in the wild.
          </p>
        </FadeIn>

        {/* §1 Selected client case studies */}
        <div className="mt-20">
          <FadeIn>
            <div className="flex items-baseline gap-4">
              <h2 className="font-display text-3xl text-ink">
                Selected client case studies
              </h2>
              <span className="font-mono text-xs text-dim">
                0{caseStudies.length}
              </span>
            </div>
            <p className="mt-2 max-w-lg text-sm text-ink2">
              Real engagements, direct and through the agency — the problem,
              the thinking, and the system behind each.
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

        {/* §2 Selected products & systems */}
        <div className="mt-24 border-t border-line pt-20">
          <FadeIn>
            <div className="flex items-baseline gap-4">
              <h2 className="font-display text-3xl text-ink">
                Selected products &amp; systems
              </h2>
              <span className="font-mono text-xs text-dim">
                0{selectedProducts.length}
              </span>
            </div>
            <p className="mt-2 max-w-lg text-sm text-ink2">
              Self-initiated and shipped — real, running software I designed
              and built end to end. More in Explore below.
            </p>
          </FadeIn>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {selectedProducts.map((p, i) => (
              <FadeIn key={p.id} delay={i * 0.05}>
                <ProjectCard project={p} />
              </FadeIn>
            ))}
          </div>
        </div>

        {/* §3 Selected branding */}
        <div className="mt-24 border-t border-line pt-20">
          <FadeIn>
            <div className="flex items-baseline gap-4">
              <h2 className="font-display text-3xl text-ink">
                Selected branding
              </h2>
              <span className="font-mono text-xs text-dim">
                0{selectedBranding.length}
              </span>
            </div>
            <p className="mt-2 max-w-lg text-sm text-ink2">
              Concept studies — self-initiated identities for the niches I
              serve, designed as complete systems and labelled as concepts.
            </p>
          </FadeIn>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {selectedBranding.map((p, i) => (
              <FadeIn key={p.id} delay={i * 0.05}>
                <ProjectCard project={p} />
              </FadeIn>
            ))}
          </div>
        </div>

        {/* §4 Explore more work */}
        <div className="mt-24 border-t-2 border-line pt-20">
          <FadeIn>
            <p className="eyebrow">Explore more work</p>
            <h2 className="display mt-3 max-w-2xl text-4xl text-ink sm:text-5xl">
              The rest of the shelf.
            </h2>
          </FadeIn>

          {/* More client projects */}
          <div className="mt-14">
            <FadeIn>
              <div className="flex items-baseline gap-4">
                <h3 className="font-display text-2xl text-ink">
                  More client projects
                </h3>
                <span className="font-mono text-xs text-dim">
                  0{moreProjects.length}
                </span>
              </div>
            </FadeIn>
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {moreProjects.map((p, i) => (
                <FadeIn key={p.id} delay={i * 0.04}>
                  <ProjectCard project={p} />
                </FadeIn>
              ))}
            </div>
          </div>

          {/* More products */}
          <div className="mt-16">
            <FadeIn>
              <div className="flex items-baseline gap-4">
                <h3 className="font-display text-2xl text-ink">
                  More products &amp; systems
                </h3>
                <span className="font-mono text-xs text-dim">
                  0{moreProducts.length}
                </span>
              </div>
              <p className="mt-2 max-w-lg text-sm text-ink2">
                The kits are also packaged for sale —{" "}
                <Link
                  href="/resources"
                  className="font-mono text-[11px] font-medium uppercase tracking-wider text-accent hover:underline"
                >
                  see Resources →
                </Link>
              </p>
            </FadeIn>
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {moreProducts.map((p, i) => (
                <FadeIn key={p.id} delay={i * 0.04}>
                  <ProjectCard project={p} />
                </FadeIn>
              ))}
            </div>
          </div>

          {/* More branding concepts */}
          <div className="mt-16">
            <FadeIn>
              <div className="flex items-baseline gap-4">
                <h3 className="font-display text-2xl text-ink">
                  More branding concepts
                </h3>
                <span className="font-mono text-xs text-dim">
                  0{moreBranding.length}
                </span>
              </div>
            </FadeIn>
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {moreBranding.map((p, i) => (
                <FadeIn key={p.id} delay={i * 0.04}>
                  <ProjectCard project={p} />
                </FadeIn>
              ))}
            </div>
          </div>

          {/* Graphic design */}
          <div className="mt-16">
            <FadeIn>
              <div className="flex items-baseline gap-4">
                <h3 className="font-display text-2xl text-ink">
                  Graphic design
                </h3>
                <span className="font-mono text-xs text-dim">
                  0{graphicDesign.length}
                </span>
              </div>
            </FadeIn>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {graphicDesign.map((p, i) => (
                <FadeIn key={p.id} delay={i * 0.05}>
                  <ProjectCard project={p} />
                </FadeIn>
              ))}
            </div>
          </div>

          {/* Motion & video — in production */}
          <div id="motion" className="mt-16 scroll-mt-24">
            <FadeIn>
              <div className="flex items-baseline gap-4">
                <h3 className="font-display text-2xl text-ink">
                  Motion &amp; video
                </h3>
                <span className="rounded-full border border-line px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-dim">
                  In production
                </span>
              </div>
              <p className="mt-2 max-w-lg text-sm text-ink2">
                Motion pieces for the brands and products above — slots go
                live as each one passes the bar.
              </p>
            </FadeIn>
            <div className="mt-8">
              <MotionSection />
            </div>
          </div>
        </div>
      </section>

      <CTABand heading="Want a designer who works like this on your team?" />
    </>
  );
}
