import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import Portrait from "@/components/Portrait";
import ImageSlot from "@/components/ImageSlot";
import VideoSlot from "@/components/VideoSlot";
import CopyEmail from "@/components/CopyEmail";
import {
  featuredProjects,
  type Project,
  type ShowcaseImage,
} from "@/data/projects";
import {
  AVAILABILITY,
  CV_URL,
  CV_PLAIN_URL,
  EMAIL,
  HIRING_FACTS,
  LINKEDIN_URL,
  PORTFOLIO_PDF_URL,
  RESPONSE_PROMISE,
  mailto,
} from "@/data/site";

// Literal class maps so Tailwind can see every class at build time.
const SPAN: Record<NonNullable<ShowcaseImage["span"]>, string> = {
  2: "lg:col-span-2",
  3: "lg:col-span-3",
  4: "lg:col-span-4",
  6: "lg:col-span-6",
};
// Width of each item in the swipe row on small screens.
const MOBILE_W: Record<NonNullable<ShowcaseImage["aspect"]>, string> = {
  wide: "w-[86%]",
  landscape: "w-[80%]",
  square: "w-[72%]",
  tall: "w-[70%]",
  story: "w-[52%]",
  phone: "w-[44%]",
  pano: "w-[86%]",
};

const pad = (n: number) => String(n).padStart(2, "0");

function Plate({ project, n }: { project: Project; n: number }) {
  const s = project.showcase!;
  return (
    <article
      id={project.id}
      className="scroll-mt-20 border-t border-ink/80 pt-6 lg:pt-8"
      aria-labelledby={`${project.id}-title`}
    >
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <p className="font-mono text-xs text-dim">
          <span className="text-accent">{pad(n)}</span>
          <span className="mx-2">/</span>
          {pad(featuredProjects.length)}
        </p>
        <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-dim">
          {project.provenance === "Client work" ? "Direct client" : "Agency work · Your SocialChef"}
          <span className="mx-2">·</span>
          {project.year}
        </p>
      </div>

      {/* Phones read title → artwork → details; desktop keeps the words in
          a left column with the artwork spanning both rows on the right. */}
      <div className="mt-6 grid gap-x-10 gap-y-7 lg:mt-8 lg:grid-cols-12 lg:grid-rows-[auto_1fr]">
        <div className="lg:col-span-4 lg:row-start-1">
          <FadeIn>
            <h3 id={`${project.id}-title`} className="display text-4xl text-ink sm:text-5xl">
              {project.title}
            </h3>
            <p className="mt-2 text-sm text-dim">{project.client}</p>
            <p className="mt-5 text-lg leading-snug text-ink">{s.what}</p>
          </FadeIn>
        </div>

        <div className="lg:col-span-4 lg:col-start-1 lg:row-start-2">
          <FadeIn>
            <dl className="grid gap-4 border-t border-line pt-5 text-[15px] leading-relaxed">
              <div>
                <dt className="eyebrow">My part</dt>
                <dd className="mt-1.5 text-ink2">{s.part}</dd>
              </div>
              <div>
                <dt className="eyebrow">Formats</dt>
                <dd className="mt-1.5 text-ink2">{s.formats}</dd>
              </div>
              {project.credit && (
                <div>
                  <dt className="eyebrow">Credit</dt>
                  <dd className="mt-1.5 text-ink2">{project.credit}</dd>
                </div>
              )}
            </dl>
            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Link
                href={`/work/${project.id}`}
                className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-bg transition-colors hover:bg-accent hover:text-accent-ink"
              >
                Read the case <span aria-hidden>→</span>
              </Link>
              {project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-ink2 underline decoration-line underline-offset-4 hover:text-ink"
                >
                  Live site ↗
                </a>
              )}
            </div>
          </FadeIn>
        </div>

        {/* Artwork: a swipe row on phones, a grid from large screens up */}
        <div className="row-start-2 lg:col-span-8 lg:col-start-5 lg:row-span-2 lg:row-start-1">
          <div
            className="snap-row -mx-5 flex snap-x snap-mandatory items-start gap-3 overflow-x-auto px-5 pb-3 sm:-mx-8 sm:px-8 lg:mx-0 lg:grid lg:grid-cols-6 lg:gap-4 lg:overflow-visible lg:px-0 lg:pb-0"
            tabIndex={0}
            role="group"
            aria-label={`${project.title} artwork`}
          >
            {s.images.map((img, i) => (
              <div
                key={img.src}
                className={`min-w-0 shrink-0 snap-start lg:w-auto ${MOBILE_W[img.aspect ?? "wide"]} ${SPAN[img.span ?? (img.aspect === "wide" ? 6 : 3)]}`}
              >
                <ImageSlot
                  asset={img}
                  priority={n === 1 && i === 0}
                  sizes={
                    (img.span ?? 6) >= 6
                      ? "(max-width: 1024px) 86vw, 800px"
                      : "(max-width: 1024px) 70vw, 400px"
                  }
                />
                <p className="mt-2 text-[13px] leading-snug text-dim">{img.label}</p>
              </div>
            ))}
          </div>
          <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.14em] text-dim lg:hidden">
            Swipe for more · Tap to enlarge
          </p>
        </div>
      </div>
    </article>
  );
}

export default function Home() {
  const archive = [
    {
      label: "More client and agency work",
      note: "Ozmax Care, Junk Sunshine Coast, InBloom Therapy and more, credited by relationship.",
    },
    {
      label: "Own products",
      note: "Website kits and apps I designed and built. Demo content is sample data.",
    },
    {
      label: "Concept studies",
      note: "Identities for the niches I serve. Labelled as concepts, not client work.",
    },
    {
      label: "Graphic design studies",
      note: "Social systems, print and logo work.",
    },
  ];

  const motion = [
    { src: "/videos/the-hill/sl-story-2.mp4", poster: "/images/the-hill/sl-story-2-poster.jpg", label: "The Hill · Seniors Lunch story" },
    { src: "/videos/the-hill/lh-story-1.mp4", poster: "/images/the-hill/lh-story-1-poster.jpg", label: "The Hill · Lunch at The Hill story" },
    { src: "/videos/augellos-reel.mp4", poster: "/images/recent/augellos-reel-poster.jpg", label: "Augello's · reel" },
    { src: "/videos/tnt-follower-story.mp4", poster: "/images/recent/tnt-follower-story-poster.jpg", label: "Tacos 'N' Tequilas · follower story" },
  ];

  return (
    <>
      {/* ═══ Header: who, what, next step. No project artwork here. ═══ */}
      <section className="mx-auto max-w-[1240px] px-5 pb-14 pt-8 sm:px-8 sm:pt-12 lg:pb-20">
        <FadeIn>
          <div className="flex flex-col gap-2 border-b border-line pb-4 font-mono text-[11px] uppercase tracking-[0.12em] text-dim sm:flex-row sm:items-center sm:justify-between">
            <span>Senior Brand &amp; Web Designer</span>
            <span>Greater Manila Area · GMT+8 · Remote</span>
            <span className="inline-flex items-center gap-2 text-ink2">
              <span className="h-2 w-2 rounded-full bg-accent" aria-hidden />
              {AVAILABILITY}
            </span>
          </div>
        </FadeIn>

        <div className="mt-10 grid gap-12 lg:mt-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <FadeIn delay={0.05}>
              <h1 className="display text-[clamp(3.6rem,11vw,8.5rem)] leading-[0.88] text-ink">
                Vaugn
                <br />
                Almeida<span className="text-accent">.</span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="mt-8 max-w-xl text-xl leading-relaxed text-ink sm:text-2xl sm:leading-snug">
                I design campaigns, brand guides and websites.
              </p>
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink2">
                I&apos;m a Senior Graphic Designer at Your SocialChef, an
                Australian agency, where I design for client brands and review
                the team&apos;s creative work. I also design and build websites
                in Framer for direct clients.
              </p>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <a
                  href="#work"
                  className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 font-medium text-accent-ink transition-opacity hover:opacity-90"
                >
                  See selected work <span aria-hidden>↓</span>
                </a>
                <a
                  href={CV_URL}
                  download
                  className="rounded-full border border-ink/70 px-6 py-3.5 font-medium text-ink transition-colors hover:bg-ink hover:text-bg"
                >
                  Download CV
                </a>
                <a
                  href={mailto("Hello from your portfolio")}
                  className="px-2 py-3.5 text-ink2 underline decoration-line underline-offset-4 hover:text-ink"
                >
                  Email me
                </a>
              </div>
            </FadeIn>
          </div>

          {/* Text index of the cases: links into the body, no artwork */}
          <nav className="lg:col-span-5 lg:pt-3" aria-label="Selected work index">
            <FadeIn delay={0.12}>
              <p className="eyebrow">Selected work</p>
              <ol className="mt-4 border-t border-line">
                {featuredProjects.map((p, i) => (
                  <li key={p.id} className="border-b border-line">
                    <a
                      href={`#${p.id}`}
                      className="group grid grid-cols-[2.25rem_1fr_auto] items-baseline gap-x-2 py-3.5 transition-colors hover:text-accent"
                    >
                      <span className="font-mono text-xs text-dim group-hover:text-accent">{pad(i + 1)}</span>
                      <span>
                        <span className="block font-display text-xl font-semibold tracking-tight text-ink group-hover:text-accent">
                          {p.title}
                        </span>
                        <span className="mt-0.5 block text-sm text-ink2">{p.showcase!.index}</span>
                      </span>
                      <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-dim">
                        {p.provenance === "Client work" ? "Direct" : "Agency"}
                      </span>
                    </a>
                  </li>
                ))}
              </ol>
            </FadeIn>
          </nav>
        </div>

        {/* Hiring facts */}
        <FadeIn delay={0.2}>
          <dl className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {HIRING_FACTS.map((f) => (
              <div key={f.label} className="bg-bg px-5 py-4">
                <dt className="eyebrow">{f.label}</dt>
                <dd className="mt-1.5 text-[15px] leading-snug text-ink">{f.value}</dd>
              </div>
            ))}
          </dl>
        </FadeIn>
      </section>

      {/* ═══ Selected work: the artwork starts here ═══ */}
      <section id="work" className="scroll-mt-16 border-t border-line bg-surface">
        <div className="mx-auto max-w-[1240px] px-5 py-16 sm:px-8 lg:py-24">
          <FadeIn>
            <div className="grid gap-4 lg:grid-cols-12 lg:items-end">
              <h2 className="display text-5xl text-ink sm:text-6xl lg:col-span-7">Selected work</h2>
              <p className="max-w-md text-ink2 lg:col-span-5">
                Five projects. Agency work is credited to Your SocialChef, and
                each one says exactly which part was mine.
              </p>
            </div>
          </FadeIn>

          <div className="mt-12 flex flex-col gap-20 lg:mt-16 lg:gap-28">
            {featuredProjects.map((p, i) => (
              <Plate key={p.id} project={p} n={i + 1} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Motion ═══ */}
      <section className="border-t border-line">
        <div className="mx-auto max-w-[1240px] px-5 py-16 sm:px-8 lg:py-24">
          <FadeIn>
            <div className="grid gap-4 lg:grid-cols-12 lg:items-end">
              <h2 className="display text-4xl text-ink sm:text-5xl lg:col-span-7">Motion</h2>
              <p className="max-w-md text-ink2 lg:col-span-5">
                Animated stories and a reel for client venues, made from their
                own photography. Tap to play. They play without sound here.
              </p>
            </div>
          </FadeIn>
          <div className="snap-row -mx-5 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-3 sm:-mx-8 sm:px-8 lg:mx-0 lg:grid lg:grid-cols-4 lg:overflow-visible lg:px-0">
            {motion.map((v) => (
              <div key={v.src} className="w-[62%] shrink-0 snap-start sm:w-[40%] lg:w-auto">
                <VideoSlot video={v} />
              </div>
            ))}
          </div>
          <Link
            href="/work#motion"
            className="mt-6 inline-block text-sm text-ink2 underline decoration-line underline-offset-4 hover:text-ink"
          >
            All motion work →
          </Link>
        </div>
      </section>

      {/* ═══ Archive: everything else, labelled ═══ */}
      <section className="border-t border-line bg-surface">
        <div className="mx-auto max-w-[1240px] px-5 py-16 sm:px-8 lg:py-20">
          <FadeIn>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 className="display text-4xl text-ink sm:text-5xl">The full archive</h2>
              <Link
                href="/work"
                className="rounded-full border border-ink/70 px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-ink hover:text-bg"
              >
                Browse all work →
              </Link>
            </div>
          </FadeIn>
          <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {archive.map((a) => (
              <Link key={a.label} href="/work" className="group bg-bg p-6 transition-colors hover:bg-surface">
                <p className="font-display text-xl font-semibold tracking-tight text-ink group-hover:text-accent">
                  {a.label}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-ink2">{a.note}</p>
                <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.12em] text-accent">Open →</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ About ═══ */}
      <section className="border-t border-line">
        <div className="mx-auto grid max-w-[1240px] gap-12 px-5 py-16 sm:px-8 lg:grid-cols-12 lg:gap-10 lg:py-24">
          <FadeIn className="lg:col-span-4">
            <Portrait className="max-w-sm" />
          </FadeIn>
          <FadeIn delay={0.08} className="lg:col-span-8">
            <p className="eyebrow">About</p>
            <h2 className="display mt-3 max-w-2xl text-4xl text-ink sm:text-5xl">
              Agency trained, with a background in <em>healthcare</em>.
            </h2>
            <div className="mt-6 grid max-w-2xl gap-4 text-lg leading-relaxed text-ink2">
              <p>
                I joined Your SocialChef in February 2023 as a Brand &amp; Web
                Designer and was promoted to Senior Graphic Designer in
                September 2026. Over several years I have worked across 20+
                client accounts there, mostly hospitality, plus healthcare and
                retail.
              </p>
              <p>
                Before and alongside design, I worked in US healthcare revenue
                cycle operations: claims, denials and payer follow up. It is
                why healthcare clients are a good fit for me.
              </p>
            </div>
            <ol className="mt-10 grid max-w-2xl border-t border-line">
              {[
                ["Sep 2026 to now", "Senior Graphic Designer, Your SocialChef"],
                ["Feb 2023 to Sep 2026", "Brand & Web Designer, Your SocialChef"],
                ["Mar 2022 to now", "Independent designer, direct clients such as MedSync"],
                ["May 2023 to Dec 2025", "Revenue Cycle Management Specialist, US healthcare billing"],
              ].map(([when, what]) => (
                <li key={what} className="grid gap-1 border-b border-line py-3.5 sm:grid-cols-[13rem_1fr]">
                  <span className="font-mono text-xs uppercase tracking-[0.1em] text-dim sm:pt-1">{when}</span>
                  <span className="text-ink">{what}</span>
                </li>
              ))}
            </ol>
            <Link
              href="/about"
              className="mt-6 inline-block text-sm text-ink2 underline decoration-line underline-offset-4 hover:text-ink"
            >
              More about me →
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* ═══ Two routes: hiring, or a project ═══ */}
      <section className="border-t border-line bg-surface">
        <div className="mx-auto grid max-w-[1240px] gap-px px-5 py-16 sm:px-8 lg:grid-cols-2 lg:py-20">
          <FadeIn className="border-t border-ink/80 pt-6 lg:mr-8">
            <p className="eyebrow">Hiring</p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink">
              Looking for a senior designer?
            </h2>
            <p className="mt-3 max-w-md text-ink2">
              My CV, a portfolio PDF for upload forms and my LinkedIn. Remote,
              full time or long term contract.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={CV_URL} download className="rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-bg hover:bg-accent hover:text-accent-ink">
                Download CV
              </a>
              <a href={PORTFOLIO_PDF_URL} download className="rounded-full border border-ink/70 px-5 py-2.5 text-sm font-medium text-ink hover:bg-ink hover:text-bg">
                Portfolio PDF
              </a>
              <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="rounded-full border border-line px-5 py-2.5 text-sm text-ink2 hover:border-ink2 hover:text-ink">
                LinkedIn ↗
              </a>
            </div>
            <a href={CV_PLAIN_URL} download className="mt-4 inline-block text-sm text-ink2 underline decoration-line underline-offset-4 hover:text-ink">
              Plain one column CV, for upload forms
            </a>
          </FadeIn>
          <FadeIn delay={0.08} className="mt-12 border-t border-ink/80 pt-6 lg:ml-8 lg:mt-0">
            <p className="eyebrow">Projects</p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink">
              Need a website or brand work?
            </h2>
            <p className="mt-3 max-w-md text-ink2">
              I take on a small number of projects alongside my role, mainly
              for healthcare and service businesses: website design and build
              in Framer, brand guides and campaign graphics.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/services" className="rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-bg hover:bg-accent hover:text-accent-ink">
                See services
              </Link>
              <Link href="/contact" className="rounded-full border border-ink/70 px-5 py-2.5 text-sm font-medium text-ink hover:bg-ink hover:text-bg">
                Tell me about it
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ Contact ═══ */}
      <section className="border-t border-line">
        <div className="mx-auto max-w-[1240px] px-5 py-16 sm:px-8 lg:py-24">
          <FadeIn>
            <p className="eyebrow">Contact</p>
            <a
              href={mailto("Hello from your portfolio")}
              className="display mt-4 block break-all text-[clamp(2rem,6vw,4.75rem)] text-ink transition-colors hover:text-accent"
            >
              {EMAIL}
            </a>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <CopyEmail />
              <span className="text-sm text-dim">{RESPONSE_PROMISE}.</span>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
