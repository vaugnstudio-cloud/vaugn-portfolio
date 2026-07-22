import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import Portrait from "@/components/Portrait";
import ProjectCard from "@/components/ProjectCard";
import Testimonials from "@/components/Testimonials";
import CTABand from "@/components/CTABand";
import MotionSection from "@/components/MotionSection";
import { featuredProjects, featuredBranding, productWork } from "@/data/projects";
import { STATS, CV_URL, AVAILABILITY, CAL_LINK } from "@/data/site";

export default function Home() {
  const featuredProducts = productWork.filter((p) => p.featured).slice(0, 4);

  return (
    <>
      {/* 1 · Hero — senior designer who ships, in five seconds */}
      <section className="mx-auto max-w-6xl px-6 pb-20 pt-24 sm:pt-32">
        <FadeIn>
          <span className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-1.5 font-mono text-xs uppercase tracking-wider text-ink2">
            <span className="h-2 w-2 rounded-full bg-accent" />
            {AVAILABILITY}
          </span>
        </FadeIn>
        <FadeIn delay={0.08}>
          <h1 className="display mt-8 max-w-4xl text-5xl text-ink sm:text-6xl lg:text-7xl">
            A senior brand &amp; web designer who <em>ships</em> — identity
            systems, live websites, and products of my own.
          </h1>
        </FadeIn>
        <FadeIn delay={0.16}>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink2">
            5+ years across healthcare and hospitality — creative direction on
            20+ agency accounts, 7 live client sites, and a product line I
            designed and built myself. One person, strategy to production.
          </p>
        </FadeIn>
        <FadeIn delay={0.24}>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href={CV_URL}
              download
              className="rounded-full bg-accent px-7 py-3.5 font-medium text-accent-ink transition-transform hover:scale-[1.03]"
            >
              Download CV
            </a>
            <Link
              href="/work"
              className="rounded-full border border-line px-7 py-3.5 text-ink2 transition-colors hover:border-ink2 hover:text-ink"
            >
              View work
            </Link>
            <a
              href={`https://cal.com/${CAL_LINK}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs uppercase tracking-wider text-ink2 transition-colors hover:text-accent"
            >
              Prefer to talk? Book 15 minutes →
            </a>
          </div>
        </FadeIn>
      </section>

      {/* 2 · Proof strip — real numbers only */}
      <section className="border-y border-line bg-surface">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px lg:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="px-6 py-10">
              <p className="font-display text-4xl text-ink">{s.value}</p>
              <p className="mt-2 font-mono text-[11px] uppercase tracking-wider text-dim">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 3 · Selected work — show, don't tell */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <FadeIn>
          <div className="flex items-end justify-between">
            <div>
              <p className="eyebrow">Selected work</p>
              <h2 className="display mt-3 text-4xl text-ink sm:text-5xl">
                The work does the <em>talking</em>.
              </h2>
            </div>
            <Link
              href="/work"
              className="hidden font-mono text-xs uppercase tracking-wider text-ink2 transition-colors hover:text-accent sm:block"
            >
              All work →
            </Link>
          </div>
        </FadeIn>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {featuredProjects.map((p, i) => (
            <FadeIn key={p.id} delay={i * 0.06}>
              <ProjectCard project={p} />
            </FadeIn>
          ))}
        </div>
        <Link
          href="/work"
          className="mt-10 block text-center font-mono text-xs uppercase tracking-wider text-ink2 transition-colors hover:text-accent sm:hidden"
        >
          All work →
        </Link>
      </section>

      {/* 4 · Products & systems — the senior differentiator */}
      <section className="border-t border-line bg-surface">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <FadeIn>
            <div className="flex items-end justify-between">
              <div>
                <p className="eyebrow">Products &amp; systems</p>
                <h2 className="display mt-3 max-w-2xl text-4xl text-ink sm:text-5xl">
                  I design it, build it, and <em>ship it</em>.
                </h2>
                <p className="mt-4 max-w-xl text-ink2">
                  Self-initiated products — website systems for the niches I
                  know and full working apps, taken from first sketch to
                  running software. Solo, end to end.
                </p>
              </div>
              <Link
                href="/work"
                className="hidden font-mono text-xs uppercase tracking-wider text-ink2 transition-colors hover:text-accent sm:block"
              >
                All products →
              </Link>
            </div>
          </FadeIn>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {featuredProducts.map((p, i) => (
              <FadeIn key={p.id} delay={i * 0.06}>
                <ProjectCard project={p} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 5 · Branding — niche concept series (scaffolds until designed) */}
      <section className="border-t border-line">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <FadeIn>
            <div className="flex items-end justify-between">
              <div>
                <p className="eyebrow">Branding design</p>
                <h2 className="display mt-3 max-w-2xl text-4xl text-ink sm:text-5xl">
                  Brands built <em>niche by niche</em>.
                </h2>
                <p className="mt-4 max-w-xl text-ink2">
                  Concept identities for the industries I serve — coffee,
                  stays, craft beverage, and wellness — designed as complete
                  systems, not just logos.
                </p>
              </div>
              <Link
                href="/work"
                className="hidden font-mono text-xs uppercase tracking-wider text-ink2 transition-colors hover:text-accent sm:block"
              >
                All branding →
              </Link>
            </div>
          </FadeIn>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {featuredBranding.map((p, i) => (
              <FadeIn key={p.id} delay={i * 0.06}>
                <ProjectCard project={p} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 6 · Motion & video — in production, honest placeholders */}
      <section className="border-t border-line bg-surface">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <FadeIn>
            <div className="flex items-baseline gap-4">
              <p className="eyebrow">Motion &amp; video</p>
              <span className="rounded-full border border-line px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-dim">
                In production
              </span>
            </div>
            <h2 className="display mt-3 max-w-2xl text-4xl text-ink sm:text-5xl">
              The next chapter is <em>moving</em>.
            </h2>
            <p className="mt-4 max-w-xl text-ink2">
              Motion pieces for the brands and products above are in the edit
              now — these slots go live as each one passes the bar.
            </p>
          </FadeIn>
          <div className="mt-12">
            <MotionSection teaser />
          </div>
        </div>
      </section>

      {/* 7 · About teaser — human trust */}
      <section className="border-t border-line">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-24 lg:grid-cols-2 lg:items-center">
          <FadeIn>
            <Portrait className="mx-auto max-w-sm" />
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="eyebrow">Behind the work</p>
            <h2 className="display mt-3 text-4xl text-ink sm:text-5xl">
              Agency-trained. Healthcare-fluent. <em>Ships own products.</em>
            </h2>
            <p className="mt-6 leading-relaxed text-ink2">
              I&apos;m Vaugn Jasper Almeida — a senior brand &amp; web designer
              with 5+ years across Australian, US, and European clients,
              creative direction on 20+ concurrent agency accounts, real
              healthcare-industry experience from mental-health platforms to
              US medical billing — and a shipped product line of my own.
            </p>
            <div className="mt-8 flex flex-wrap gap-6">
              <Link
                href="/about"
                className="font-mono text-xs uppercase tracking-wider text-accent transition-opacity hover:opacity-70"
              >
                More about me →
              </Link>
              <a
                href={CV_URL}
                download
                className="font-mono text-xs uppercase tracking-wider text-ink2 transition-colors hover:text-accent"
              >
                Download CV →
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 8 · Client work — demoted but visible */}
      <section className="border-t border-line bg-surface">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <FadeIn>
            <div className="grid items-center gap-8 lg:grid-cols-[3fr_2fr]">
              <div>
                <p className="eyebrow">Client work</p>
                <h2 className="display mt-3 text-3xl text-ink sm:text-4xl">
                  Also available for <em>select client projects</em>.
                </h2>
                <p className="mt-4 max-w-lg text-ink2">
                  Brand identity, websites, and marketing systems for
                  healthcare and hospitality businesses — designed and built
                  end to end, with limited capacity alongside senior-role work.
                </p>
              </div>
              <div className="flex lg:justify-end">
                <Link
                  href="/services"
                  className="rounded-full border border-line px-7 py-3.5 text-ink2 transition-colors hover:border-accent hover:text-accent"
                >
                  See services →
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 9 · Resources teaser — products packaged for sale */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <FadeIn>
          <div className="rounded-2xl border border-line bg-surface p-10 sm:p-14">
            <div className="grid items-center gap-8 lg:grid-cols-[3fr_2fr]">
              <div>
                <p className="eyebrow">Now available</p>
                <h2 className="display mt-3 text-4xl text-ink sm:text-5xl">
                  Tools &amp; templates — <em>the systems, packaged.</em>
                </h2>
                <p className="mt-5 max-w-lg leading-relaxed text-ink2">
                  The Denial Defense System — a complete medical-billing SOP
                  toolkit — is live now, with the Averis RCM kit, niche website
                  kits, and Studio OS shipping next. All real, all built by me.
                </p>
              </div>
              <div className="flex lg:justify-end">
                <Link
                  href="/resources"
                  className="rounded-full border border-line px-7 py-3.5 text-ink2 transition-colors hover:border-accent hover:text-accent"
                >
                  Browse the resources →
                </Link>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* 10 · Testimonials — renders only client-approved quotes */}
      <Testimonials />

      {/* 11 · Final CTA — one calm ask */}
      <CTABand />
    </>
  );
}
