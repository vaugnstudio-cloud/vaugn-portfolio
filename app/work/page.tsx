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
    "Selected client cases first, then own products, concept studies and graphic design, each labelled for what it is.",
  alternates: { canonical: "/work" },
};

// Curated "selected" tiers — strongest work first, the rest under Explore more.
const SELECTED_PRODUCT_IDS = ["averis-rcm-kit", "sop-quest"];
// Branding: the same four featured identities the homepage shows, so a
// visitor arriving from /#branding sees the set they clicked through for.
const SELECTED_BRANDING_IDS = [
  "specialty-coffee-branding",
  "boutique-hotel-branding",
  "craft-beverage-branding",
  "wellness-medspa-branding",
];

export default function WorkPage() {
  const selectedProducts = productWork.filter((p) => SELECTED_PRODUCT_IDS.includes(p.id));
  const moreProducts = productWork.filter((p) => !SELECTED_PRODUCT_IDS.includes(p.id));
  const selectedBranding = branding.filter((p) => SELECTED_BRANDING_IDS.includes(p.id));
  const moreBranding = branding.filter((p) => !SELECTED_BRANDING_IDS.includes(p.id));
  // One lead card when the remainder pairs evenly, two when it wouldn't.
  const leadCount = (caseStudies.length - 1) % 2 === 0 ? 1 : 2;

  return (
    <>
      <section className="mx-auto max-w-[1240px] px-5 sm:px-8 pb-28 pt-16 sm:pt-24">
        <FadeIn>
          <p className="eyebrow">Work</p>
          <h1 className="display mt-3 max-w-3xl text-5xl text-ink sm:text-6xl">
            Selected work first. <em>The full archive below.</em>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-ink2">
            Client and agency cases, my own products and concept studies.
            Every piece is labelled for what it is, and agency work is
            credited to Your SocialChef.
          </p>
        </FadeIn>

        {/* §1 Selected client case studies */}
        <div className="mt-20">
          <FadeIn>
            <div className="flex items-baseline gap-4">
              <h2 className="font-display text-3xl text-ink">
                Client and agency cases
              </h2>
              <span className="font-mono text-xs text-dim">
                0{caseStudies.length}
              </span>
            </div>
            <p className="mt-2 max-w-lg text-sm text-ink2">
              Direct client work and agency work through Your SocialChef,
              with my part in each made clear.
            </p>
          </FadeIn>
          {/* The newest work leads full-width; the rest fill an even 2-col grid. */}
          {caseStudies.slice(0, leadCount).map((p, i) => (
            <FadeIn key={p.id} className={i === 0 ? "mt-10" : "mt-6"}>
              <ProjectCard project={p} variant="lead" latest={i === 0} />
            </FadeIn>
          ))}
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {caseStudies.slice(leadCount).map((p, i) => (
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
              My own products, designed and built end to end. Demo content
              is sample data, not client results.
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
              Concept studies: my own identities for the niches I serve.
              These are not paid client work.
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
                More detail on the{" "}
                <Link
                  href="/resources"
                  className="font-mono text-[11px] font-medium uppercase tracking-wider text-accent hover:underline"
                >
                  Resources page →
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
                <span className="rounded-full border border-line px-3 py-1 font-mono text-[11px] uppercase tracking-[0.2em] text-dim">
                  Short form · Food and drink
                </span>
              </div>
              <p className="mt-2 max-w-lg text-sm text-ink2">
                Animated stories for client venues first, made from their own
                photography and shown without sound. Then studio appetite
                reels, art directed by me and made with AI tools.
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
