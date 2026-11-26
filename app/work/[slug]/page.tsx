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
import VideoSlot, { type VideoAsset } from "@/components/VideoSlot";
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

/* ── Artwork grid ─────────────────────────────────────────────
   Consecutive images of the same family share a row layout, and each image
   keeps its real ratio, so posters, phone captures and wide boards never get
   cropped to fit a decorative card. Every image opens full size. */
type Family = "wide" | "tile" | "phone" | "landscape";

function family(a: ImageAsset["aspect"]): Family {
  if (a === "tall" || a === "square") return "tile";
  if (a === "phone" || a === "story") return "phone";
  if (a === "landscape") return "landscape";
  return "wide";
}

const TILE_COLS: Record<number, string> = {
  1: "max-w-xl",
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-3",
};

function ImageGrid({ images }: { images: ImageAsset[] }) {
  const groups: { fam: Family; items: ImageAsset[] }[] = [];
  for (const img of images) {
    const fam = family(img.aspect);
    const last = groups[groups.length - 1];
    if (last && last.fam === fam && fam !== "wide") last.items.push(img);
    else groups.push({ fam, items: [img] });
  }

  // A single 4:5 poster followed by three 9:16 stories shares one row. The
  // poster column is 1.422x a story column (1.778 / 1.25), so all four end
  // at the same height and nothing is cropped.
  if (
    groups.length === 2 &&
    groups[0].fam === "tile" &&
    groups[0].items.length === 1 &&
    groups[0].items[0].aspect === "tall" &&
    groups[1].fam === "phone" &&
    groups[1].items.length === 3 &&
    groups[1].items.every((i) => i.aspect === "story")
  ) {
    const items = [...groups[0].items, ...groups[1].items];
    return (
      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-[1.422fr_1fr_1fr_1fr]">
        {items.map((img, i) => (
          <div key={img.label} className={`min-w-0 ${i === 0 ? "col-span-2 sm:col-span-1" : ""}`}>
            <ImageSlot
              asset={img}
              sizes={i === 0 ? "(max-width: 640px) 100vw, 400px" : "(max-width: 640px) 50vw, 280px"}
            />
            <p className="mt-2 text-[13px] leading-snug text-dim">{img.label}</p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="mt-8 flex flex-col gap-6">
      {groups.map((g, gi) => {
        const n = g.items.length;
        const cols =
          g.fam === "tile"
            ? (TILE_COLS[n] ?? "grid-cols-2 lg:grid-cols-4")
            : g.fam === "phone"
              ? "max-w-3xl grid-cols-2 sm:grid-cols-3"
              : g.fam === "landscape"
                ? n === 1
                  ? "max-w-3xl"
                  : "sm:grid-cols-2"
                : "";
        const sizes =
          g.fam === "wide"
            ? "(max-width: 1280px) 100vw, 1200px"
            : g.fam === "phone"
              ? "(max-width: 640px) 50vw, 260px"
              : "(max-width: 640px) 100vw, 600px";
        return (
          <div key={gi} className={`grid gap-4 ${cols}`}>
            {g.items.map((img) => (
              <div key={img.label} className="min-w-0">
                <ImageSlot asset={img} sizes={sizes} />
                <p className="mt-2 text-[13px] leading-snug text-dim">{img.label}</p>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}

function VideoRow({ videos }: { videos: VideoAsset[] }) {
  return (
    <div className="snap-row -mx-5 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-3 sm:mx-0 sm:grid sm:max-w-4xl sm:grid-cols-3 sm:overflow-visible sm:px-0">
      {videos.map((v) => (
        <div key={v.src} className="w-[62%] shrink-0 snap-start sm:w-auto">
          <VideoSlot video={v} sizes="(max-width: 640px) 62vw, 300px" />
        </div>
      ))}
    </div>
  );
}

function SectionHead({ n, title }: { n: string; title: string }) {
  return (
    <div className="flex items-baseline gap-4 border-t border-ink/80 pt-5">
      <span className="font-mono text-xs text-accent">{n}</span>
      <h2 className="display text-3xl text-ink sm:text-4xl">{title}</h2>
    </div>
  );
}

function Note({ children }: { children: React.ReactNode }) {
  return (
    <aside className="rounded-2xl border border-line bg-surface p-5">
      <p className="eyebrow text-accent">Design decision</p>
      <p className="mt-2 leading-relaxed text-ink">{children}</p>
    </aside>
  );
}

function PrevNext({ current }: { current: Project }) {
  const idx = detailProjects.findIndex((p) => p.id === current.id);
  const prev = detailProjects[(idx - 1 + detailProjects.length) % detailProjects.length];
  const next = detailProjects[(idx + 1) % detailProjects.length];
  return (
    <nav aria-label="More projects" className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
      {[
        { p: prev, label: "← Previous" },
        { p: next, label: "Next →" },
      ].map(({ p, label }) => (
        <Link
          key={label}
          href={`/work/${p.id}`}
          className="group bg-surface p-7 transition-colors hover:bg-bg"
        >
          <span className="font-mono text-[11px] uppercase tracking-wider text-dim">
            {label}
          </span>
          <p className="mt-2 font-display text-2xl font-semibold tracking-tight text-ink group-hover:text-accent">
            {p.title}
          </p>
        </Link>
      ))}
    </nav>
  );
}

/* ── Case header: shared by both templates ───────────────── */
function CaseHeader({ project, intro }: { project: Project; intro: string }) {
  const credit =
    project.credit ??
    (project.provenance ? project.provenance : project.type === "product" ? "Own product" : undefined);
  return (
    <FadeIn>
      <nav aria-label="Breadcrumb" className="font-mono text-[11px] uppercase tracking-[0.12em] text-dim">
        <Link href="/work" className="hover:text-ink">Work</Link>
        <span className="mx-2">/</span>
        <span className="text-ink2">{project.title}</span>
      </nav>
      <div className="mt-8 grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <h1 className="display text-[clamp(3rem,8vw,6.5rem)] leading-[0.92] text-ink">
            {project.title}
          </h1>
          <p className="mt-6 max-w-2xl text-xl leading-snug text-ink sm:text-2xl">
            {project.headline}
          </p>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink2">{intro}</p>
        </div>
        <dl className="grid content-start gap-5 border-t border-line pt-5 text-[15px] lg:col-span-4 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-1">
          {credit && (
            <div>
              <dt className="eyebrow">Credit</dt>
              <dd className="mt-1.5 text-ink">{credit}</dd>
            </div>
          )}
          <div>
            <dt className="eyebrow">Client</dt>
            <dd className="mt-1.5 text-ink2">
              {project.client}
              <span className="text-dim"> · {project.year}</span>
            </dd>
          </div>
          <div>
            <dt className="eyebrow">Delivered</dt>
            <dd className="mt-1.5">
              <ul className="grid gap-1 text-ink2">
                {project.deliverables.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            </dd>
          </div>
          {project.url && (
            <div>
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-ink/70 px-4 py-2 text-sm font-medium text-ink transition-colors hover:bg-ink hover:text-bg"
              >
                Visit the live site ↗
              </a>
            </div>
          )}
        </dl>
      </div>
    </FadeIn>
  );
}

/* ── Case study template ─────────────────────────────────── */
function CaseStudyView({ project }: { project: Project }) {
  const cs = project.caseStudy!;
  let n = 0;
  const num = () => String(++n).padStart(2, "0");
  // Lead artwork: the wide cover board, right after the header.
  const lead: ImageAsset[] = project.coverImage
    ? [{ src: project.coverImage, label: `${project.title}: selected work`, aspect: "wide" }]
    : [];

  return (
    <article className="mx-auto max-w-[1240px] px-5 pb-20 pt-10 sm:px-8 sm:pt-14">
      <CaseHeader project={project} intro={project.description} />

      {lead.length > 0 && (
        <FadeIn className="mt-12">
          <ImageGrid images={lead} />
        </FadeIn>
      )}

      {/* Brief and my part, side by side */}
      <FadeIn className="mt-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHead n={num()} title="The brief" />
            <p className="mt-6 max-w-[62ch] text-lg leading-relaxed text-ink2">{cs.problem}</p>
          </div>
          <div>
            <SectionHead n={num()} title="My part" />
            <ul className="mt-6 grid max-w-[62ch] gap-3">
              {cs.role.map((r) => (
                <li key={r} className="flex gap-3 text-lg leading-relaxed text-ink2">
                  <span aria-hidden className="mt-[0.7em] h-1.5 w-1.5 flex-none rounded-full bg-accent" />
                  {r}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </FadeIn>

      {cs.strategy && (
        <FadeIn className="mt-16">
          <SectionHead n={num()} title="Approach" />
          <p className="mt-6 max-w-[62ch] text-lg leading-relaxed text-ink2">{cs.strategy}</p>
        </FadeIn>
      )}

      {cs.designSystem && (
        <FadeIn className="mt-16">
          <SectionHead n={num()} title="The system" />
          <p className="mt-6 max-w-[62ch] leading-relaxed text-ink2">{cs.designSystem.body}</p>
          <ImageGrid images={cs.designSystem.images} />
        </FadeIn>
      )}

      {cs.execution.map((section) => (
        <FadeIn key={section.heading} className="mt-16">
          <SectionHead n={num()} title={section.heading} />
          <div className="mt-6 grid gap-6 lg:grid-cols-12 lg:gap-10">
            <p className="max-w-[62ch] leading-relaxed text-ink2 lg:col-span-7">{section.body}</p>
            {section.note && (
              <div className="lg:col-span-5">
                <Note>{section.note}</Note>
              </div>
            )}
          </div>
          {section.images && <ImageGrid images={section.images} />}
          {section.videos && (
            <>
              <p className="eyebrow mt-10">Animated stories · tap to play, no sound</p>
              <VideoRow videos={section.videos} />
            </>
          )}
        </FadeIn>
      ))}

      {cs.outcome && (
        <FadeIn className="mt-16">
          <div className="rounded-2xl border border-line bg-surface p-7 sm:p-10">
            <p className="eyebrow">Delivered</p>
            <p className="mt-3 max-w-[62ch] text-lg leading-relaxed text-ink">
              {cs.outcome.body}
            </p>
            {cs.outcome.liveUrl && (
              <a
                href={cs.outcome.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-block rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-ink transition-opacity hover:opacity-90"
              >
                See it live ↗
              </a>
            )}
          </div>
        </FadeIn>
      )}
    </article>
  );
}

/* ── Gallery template: graphic design showcases and lighter projects ── */
function GalleryView({ project }: { project: Project }) {
  const g = project.gallery!;
  const isProject = project.type === "project";

  return (
    <article className="mx-auto max-w-[1240px] px-5 pb-20 pt-10 sm:px-8 sm:pt-14">
      <CaseHeader project={project} intro={g.context} />

      {isProject && project.coverImage && (
        <FadeIn className="mt-12">
          <ImageSlot
            asset={{
              src: project.coverImage,
              label: `${project.title}, cover`,
              aspect: "wide",
            }}
            sizes="(max-width: 1280px) 100vw, 1200px"
          />
        </FadeIn>
      )}

      {g.chapters ? (
        /* Story chapter layout: branding concepts */
        <div className="mt-6">
          {g.chapters.map((ch) => (
            <FadeIn key={ch.kicker} className="mt-16">
              <div className="border-t border-ink/80 pt-5">
                <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent">
                  {ch.kicker}
                </p>
                <h2 className="display mt-3 max-w-2xl text-3xl text-ink sm:text-4xl">
                  {ch.heading}
                </h2>
              </div>
              <p className="mt-5 max-w-[65ch] text-lg leading-relaxed text-ink2">
                {ch.body}
              </p>
              {ch.images && <ImageGrid images={ch.images} />}
            </FadeIn>
          ))}
        </div>
      ) : (
        g.images && (
          <FadeIn className="mt-10">
            <ImageGrid images={g.images} />
          </FadeIn>
        )
      )}
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
      {project.caseStudy ? (
        <CaseStudyView project={project} />
      ) : (
        <GalleryView project={project} />
      )}
      <div className="mx-auto max-w-[1240px] px-5 pb-8 sm:px-8">
        <PrevNext current={project} />
      </div>
      <CTABand
        heading={
          project.type === "product"
            ? "Want a designer who can build, too?"
            : project.type === "case-study"
              ? "Want work like this on your team or your business?"
              : "Need this kind of craft on your brand?"
        }
      />
    </>
  );
}
