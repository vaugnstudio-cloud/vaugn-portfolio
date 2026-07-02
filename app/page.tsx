import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import Portrait from "@/components/Portrait";
import ProjectCard from "@/components/ProjectCard";
import ServiceCard from "@/components/ServiceCard";
import ProcessSteps from "@/components/ProcessSteps";
import Testimonials from "@/components/Testimonials";
import CTABand from "@/components/CTABand";
import { featuredProjects, featuredBranding } from "@/data/projects";
import { services } from "@/data/services";
import { STATS } from "@/data/site";

export default function Home() {
  const homeServices = services.filter((s) => s.onHomepage);

  return (
    <>
      {/* 1 · Hero — position + qualify in five seconds */}
      <section className="mx-auto max-w-6xl px-6 pb-20 pt-24 sm:pt-32">
        <FadeIn>
          <span className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-1.5 font-mono text-xs uppercase tracking-wider text-ink2">
            <span className="h-2 w-2 rounded-full bg-accent" />
            Available for new projects
          </span>
        </FadeIn>
        <FadeIn delay={0.08}>
          <h1 className="display mt-8 max-w-4xl text-5xl text-ink sm:text-6xl lg:text-7xl">
            Brand &amp; web design that makes people <em>trust</em> you at
            first glance.
          </h1>
        </FadeIn>
        <FadeIn delay={0.16}>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink2">
            Brand identity, websites, and marketing systems for healthcare,
            hospitality, and growth businesses — designed and built end to end.
          </p>
        </FadeIn>
        <FadeIn delay={0.24}>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="rounded-full bg-accent px-7 py-3.5 font-medium text-accent-ink transition-transform hover:scale-[1.03]"
            >
              Start a project
            </Link>
            <Link
              href="/work"
              className="rounded-full border border-line px-7 py-3.5 text-ink2 transition-colors hover:border-ink2 hover:text-ink"
            >
              View work
            </Link>
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

      {/* 4 · Branding — niche concept series (scaffolds until designed) */}
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

      {/* 5 · Services snapshot — route buyers to the right offer */}
      <section className="border-t border-line bg-surface">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <FadeIn>
            <p className="eyebrow">Services</p>
            <h2 className="display mt-3 max-w-2xl text-4xl text-ink sm:text-5xl">
              Not just design — a <em>system</em> that launches.
            </h2>
          </FadeIn>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {homeServices.map((s, i) => (
              <FadeIn key={s.id} delay={i * 0.06}>
                <ServiceCard service={s} />
              </FadeIn>
            ))}
          </div>
          <FadeIn>
            <p className="mt-8 text-sm text-dim">
              Also:{" "}
              <Link
                href="/services"
                className="text-ink2 underline decoration-line underline-offset-4 transition-colors hover:text-accent"
              >
                Framer landing pages, monthly retainers, and the full service
                breakdown →
              </Link>
            </p>
          </FadeIn>
        </div>
      </section>

      {/* 6 · Process — de-risk hiring a solo designer */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <FadeIn>
          <p className="eyebrow">How it works</p>
          <h2 className="display mt-3 max-w-2xl text-4xl text-ink sm:text-5xl">
            One person. No handoff loss. <em>No drama.</em>
          </h2>
        </FadeIn>
        <div className="mt-12">
          <ProcessSteps />
        </div>
      </section>

      {/* 7 · About teaser — human trust */}
      <section className="border-t border-line bg-surface">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-24 lg:grid-cols-2 lg:items-center">
          <FadeIn>
            <Portrait className="mx-auto max-w-sm" />
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="eyebrow">Behind the work</p>
            <h2 className="display mt-3 text-4xl text-ink sm:text-5xl">
              Agency-trained. <em>Healthcare-fluent.</em>
            </h2>
            <p className="mt-6 leading-relaxed text-ink2">
              I&apos;m Vaugn Jasper Almeida — an independent brand &amp; web
              designer with 5+ years across Australian, US, and European
              clients, creative direction on 20+ concurrent agency accounts,
              and real healthcare-industry experience, from mental-health
              platforms to US medical billing.
            </p>
            <Link
              href="/about"
              className="mt-8 inline-block font-mono text-xs uppercase tracking-wider text-accent transition-opacity hover:opacity-70"
            >
              More about me →
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* 8 · Resources teaser — quiet, service positioning stays primary */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <FadeIn>
          <div className="rounded-2xl border border-line bg-surface p-10 sm:p-14">
            <div className="grid items-center gap-8 lg:grid-cols-[3fr_2fr]">
              <div>
                <p className="eyebrow">Coming soon</p>
                <h2 className="display mt-3 text-4xl text-ink sm:text-5xl">
                  Tools &amp; templates — <em>the systems, packaged.</em>
                </h2>
                <p className="mt-5 max-w-lg leading-relaxed text-ink2">
                  Framer templates, restaurant marketing packs, and healthcare
                  checklists — built from the same systems I use on client
                  work. Launching soon.
                </p>
              </div>
              <div className="flex lg:justify-end">
                <Link
                  href="/resources"
                  className="rounded-full border border-line px-7 py-3.5 text-ink2 transition-colors hover:border-accent hover:text-accent"
                >
                  Preview the resources →
                </Link>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* 9 · Testimonials — renders only client-approved quotes */}
      <Testimonials />

      {/* 10 · Final CTA — one calm ask */}
      <CTABand />
    </>
  );
}
