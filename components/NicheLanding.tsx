import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import ProjectCard from "@/components/ProjectCard";
import ServiceCard from "@/components/ServiceCard";
import CTABand from "@/components/CTABand";
import type { Niche } from "@/data/niches";
import { getProject } from "@/data/projects";
import { services } from "@/data/services";

// Renders "*word*" markers in niche headlines as accent italics.
function AccentHeadline({ text }: { text: string }) {
  const parts = text.split("*");
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? <em key={i}>{part}</em> : <span key={i}>{part}</span>
      )}
    </>
  );
}

export default function NicheLanding({ niche }: { niche: Niche }) {
  const nicheProjects = niche.projectIds
    .map((id) => getProject(id))
    .filter((p) => p !== undefined);
  const service = services.find((s) => s.id === niche.serviceId);

  return (
    <>
      <section className="mx-auto max-w-6xl px-6 pb-24 pt-16 sm:pt-24">
        <FadeIn>
          <p className="eyebrow">For {niche.label.toLowerCase()}</p>
          <h1 className="display mt-3 max-w-3xl text-5xl text-ink sm:text-6xl">
            <AccentHeadline text={niche.headline} />
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink2">
            {niche.subheadline}
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="rounded-full bg-accent px-7 py-3.5 font-medium text-accent-ink transition-transform hover:scale-[1.03]"
            >
              Start a project
            </Link>
            <a
              href="#work"
              className="rounded-full border border-line px-7 py-3.5 text-ink2 transition-colors hover:border-ink2 hover:text-ink"
            >
              See the work
            </a>
          </div>
        </FadeIn>

        {/* Pains — speak to this buyer only */}
        <div className="mt-24 grid gap-px overflow-hidden rounded-2xl border border-line bg-line lg:grid-cols-3">
          {niche.pains.map((pain, i) => (
            <FadeIn key={pain.title} delay={i * 0.06} className="bg-surface">
              <div className="flex h-full flex-col p-8">
                <span className="font-mono text-xs text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className="mt-4 font-display text-2xl text-ink">{pain.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-ink2">{pain.body}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Relevant work */}
        <div id="work" className="mt-24 border-t border-line pt-20">
          <FadeIn>
            <p className="eyebrow">{niche.label} work</p>
            <h2 className="display mt-3 text-4xl text-ink sm:text-5xl">
              Proof, <em>not promises.</em>
            </h2>
          </FadeIn>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {nicheProjects.map((p, i) => (
              <FadeIn key={p.id} delay={i * 0.05}>
                <ProjectCard project={p} />
              </FadeIn>
            ))}
          </div>
        </div>

        {/* The matching package */}
        {service && (
          <div className="mt-24 border-t border-line pt-20">
            <FadeIn>
              <p className="eyebrow">The package</p>
              <h2 className="display mt-3 max-w-2xl text-4xl text-ink sm:text-5xl">
                Built for {niche.label.toLowerCase()} from the ground up.
              </h2>
            </FadeIn>
            <div className="mt-12 max-w-2xl">
              <FadeIn>
                <ServiceCard service={service} detailed />
              </FadeIn>
            </div>
          </div>
        )}

        {/* Niche FAQ */}
        <div className="mt-24 border-t border-line pt-20">
          <FadeIn>
            <p className="eyebrow">Common questions</p>
          </FadeIn>
          <div className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-line bg-line">
            {niche.faq.map((f) => (
              <FadeIn key={f.q} className="bg-surface">
                <details className="group p-7">
                  <summary className="cursor-pointer list-none font-display text-xl text-ink transition-colors group-open:text-accent">
                    {f.q}
                  </summary>
                  <p className="mt-4 max-w-2xl leading-relaxed text-ink2">{f.a}</p>
                </details>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <CTABand heading={`Building something in ${niche.label.toLowerCase()}?`} />
    </>
  );
}
