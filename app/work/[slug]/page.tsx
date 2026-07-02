import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  detailProjects,
  getProject,
  type Project,
  type ImageAsset,
} from "@/data/projects";
import FadeIn from "@/components/FadeIn";
import ImageSlot from "@/components/ImageSlot";
import CTABand from "@/components/CTABand";

// Prerender every case-study and graphic-design page at build time.
export function generateStaticParams() {
  return detailProjects.map((p) => ({ slug: p.id }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.headline,
    openGraph: {
      title: `${project.title} · Vaugn Almeida`,
      description: project.headline,
    },
  };
}

function ImageGrid({ images }: { images: ImageAsset[] }) {
  return (
    <div className="mt-8 grid gap-4 sm:grid-cols-2">
      {images.map((img) => (
        <div key={img.label} className={img.aspect === "wide" ? "sm:col-span-2" : ""}>
          <ImageSlot asset={img} />
        </div>
      ))}
    </div>
  );
}

function SectionLabel({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <div className="flex items-baseline gap-4">
      <span className="font-mono text-xs text-accent">{n}</span>
      <h2 className="font-display text-3xl text-ink">{children}</h2>
    </div>
  );
}

function PrevNext({ current }: { current: Project }) {
  const idx = detailProjects.findIndex((p) => p.id === current.id);
  const prev = detailProjects[(idx - 1 + detailProjects.length) % detailProjects.length];
  const next = detailProjects[(idx + 1) % detailProjects.length];
  return (
    <nav className="mx-auto grid max-w-6xl gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
      {[
        { p: prev, label: "← Previous" },
        { p: next, label: "Next →" },
      ].map(({ p, label }) => (
        <Link
          key={label}
          href={`/work/${p.id}`}
          className="group bg-surface p-8 transition-colors hover:bg-raised"
        >
          <span className="font-mono text-[11px] uppercase tracking-wider text-dim">
            {label}
          </span>
          <p className="mt-2 font-display text-2xl text-ink group-hover:text-accent">
            {p.title}
          </p>
        </Link>
      ))}
    </nav>
  );
}

/* ── Case study template ─────────────────────────────────── */
function CaseStudyView({ project }: { project: Project }) {
  const cs = project.caseStudy!;
  let n = 0;
  const num = () => String(++n).padStart(2, "0");

  return (
    <article className="mx-auto max-w-6xl px-6 pb-24 pt-16 sm:pt-24">
      {/* Hero */}
      <FadeIn>
        <p className="font-mono text-[11px] font-medium uppercase tracking-wider text-accent">
          {project.category.join(" · ")}
        </p>
        <h1 className="display mt-4 max-w-3xl text-5xl text-ink sm:text-6xl">
          {project.title}
        </h1>
        <p className="mt-4 text-dim">
          {project.client} · {project.year}
        </p>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink2">
          {project.description}
        </p>
        {project.url && (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block rounded-full border border-line px-5 py-2.5 font-mono text-xs uppercase tracking-wider text-ink transition-colors hover:border-accent hover:text-accent"
          >
            Visit live site ↗
          </a>
        )}
      </FadeIn>

      <FadeIn className="mt-12">
        <ImageSlot
          asset={{
            src: project.coverImage,
            label: `${project.title} — hero`,
            aspect: "wide",
          }}
        />
      </FadeIn>

      {/* Problem */}
      <FadeIn className="mt-20 border-t border-line pt-16">
        <SectionLabel n={num()}>The problem</SectionLabel>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink2">{cs.problem}</p>
      </FadeIn>

      {/* Role */}
      <FadeIn className="mt-16">
        <SectionLabel n={num()}>My role &amp; scope</SectionLabel>
        <ul className="mt-6 grid max-w-2xl gap-3">
          {cs.role.map((r) => (
            <li key={r} className="flex gap-3 text-ink2">
              <span aria-hidden className="mt-0.5 text-accent">—</span>
              {r}
            </li>
          ))}
        </ul>
      </FadeIn>

      {/* Strategy */}
      <FadeIn className="mt-16">
        <SectionLabel n={num()}>Strategy</SectionLabel>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink2">{cs.strategy}</p>
      </FadeIn>

      {/* Design system */}
      <FadeIn className="mt-16">
        <SectionLabel n={num()}>Design system</SectionLabel>
        <p className="mt-6 max-w-2xl leading-relaxed text-ink2">{cs.designSystem.body}</p>
        <ImageGrid images={cs.designSystem.images} />
      </FadeIn>

      {/* Execution */}
      {cs.execution.map((section) => (
        <FadeIn key={section.heading} className="mt-16">
          <SectionLabel n={num()}>{section.heading}</SectionLabel>
          <p className="mt-6 max-w-2xl leading-relaxed text-ink2">{section.body}</p>
          {section.images && <ImageGrid images={section.images} />}
        </FadeIn>
      ))}

      {/* Outcome — only when real */}
      {cs.outcome && (
        <FadeIn className="mt-16 rounded-2xl border border-line bg-surface p-10">
          <SectionLabel n={num()}>Outcome</SectionLabel>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink">
            {cs.outcome.body}
          </p>
          {cs.outcome.liveUrl && (
            <a
              href={cs.outcome.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-ink transition-transform hover:scale-[1.02]"
            >
              See it live ↗
            </a>
          )}
        </FadeIn>
      )}
    </article>
  );
}

/* ── Gallery template — graphic-design showcases & lighter projects ── */
function GalleryView({ project }: { project: Project }) {
  const g = project.gallery!;
  const isProject = project.type === "project";

  return (
    <article className="mx-auto max-w-6xl px-6 pb-24 pt-16 sm:pt-24">
      <FadeIn>
        <p className="font-mono text-[11px] font-medium uppercase tracking-wider text-accent">
          {project.category.join(" · ")}
        </p>
        <h1 className="display mt-4 max-w-3xl text-5xl text-ink sm:text-6xl">
          {project.title}
        </h1>
        <p className="mt-4 text-dim">
          {project.client} · {project.year}
        </p>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink2">{g.context}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          {(isProject ? project.deliverables : g.tools).map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-line px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-ink2"
            >
              {tag}
            </span>
          ))}
        </div>
        {project.url && (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-block rounded-full border border-line px-5 py-2.5 font-mono text-xs uppercase tracking-wider text-ink transition-colors hover:border-accent hover:text-accent"
          >
            Visit live site ↗
          </a>
        )}
      </FadeIn>

      {isProject && project.coverImage && (
        <FadeIn className="mt-14">
          <ImageSlot
            asset={{
              src: project.coverImage,
              label: `${project.title} — cover`,
              aspect: "wide",
            }}
          />
        </FadeIn>
      )}

      <div className="mt-14 grid gap-4 sm:grid-cols-2">
        {g.images.map((img, i) => (
          <FadeIn
            key={img.label}
            delay={(i % 2) * 0.05}
            className={img.aspect === "wide" ? "sm:col-span-2" : ""}
          >
            <ImageSlot asset={img} />
          </FadeIn>
        ))}
      </div>
    </article>
  );
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <>
      {project.type === "case-study" ? (
        <CaseStudyView project={project} />
      ) : (
        <GalleryView project={project} />
      )}
      <div className="mx-auto max-w-6xl px-6 pb-8">
        <PrevNext current={project} />
      </div>
      <CTABand
        heading={
          project.type === "case-study"
            ? "Want something like this for your business?"
            : "Need this kind of craft on your brand?"
        }
      />
    </>
  );
}
