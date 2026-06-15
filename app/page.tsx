import Image from "next/image";
import Link from "next/link";
import { projects } from "@/data/projects";
import FadeIn from "@/components/FadeIn";
import Marquee from "@/components/Marquee";

const EMAIL = "vaugn.studio@gmail.com";
const eyebrow = { fontFamily: "Georgia, 'Times New Roman', serif" };

function Lozenge({ src, alt }: { src: string; alt: string }) {
  return (
    <span className="relative mx-2 inline-block h-[0.9em] w-[1.7em] -translate-y-[0.06em] overflow-hidden rounded-full border-[3px] border-cream align-middle shadow-[0_5px_18px_rgba(0,0,0,0.18)]">
      <Image src={src} alt={alt} fill sizes="110px" className="object-cover" />
    </span>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="mb-5">
      <div className="font-mono text-[11px] uppercase tracking-wider text-dim">{label}</div>
      <div className="mt-1.5 whitespace-pre-line font-heading text-sm font-semibold text-[#f3f1ea]">
        {value}
      </div>
    </div>
  );
}

export default function Home() {
  const featured = projects.filter((p) => p.featured);

  return (
    <>
      {/* Availability pill */}
      <div className="flex justify-center pt-8">
        <span className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 font-mono text-[11px] uppercase tracking-wider text-cream">
          <span className="h-2 w-2 rounded-full bg-emerald-400" /> Available for new projects
        </span>
      </div>

      {/* HERO */}
      <section className="mx-auto max-w-3xl px-6 pb-20 pt-12 text-center sm:pt-16">
        <FadeIn>
          <div className="mb-8 flex items-center justify-center gap-3">
            <div className="flex">
              {[
                ["M", "#2E6FD9"],
                ["O", "#1B7F6B"],
                ["Y", "#CC8A22"],
              ].map(([l, c], i) => (
                <span
                  key={l}
                  style={{ background: c, marginLeft: i ? -10 : 0 }}
                  className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-bg font-heading text-[11px] font-bold text-white"
                >
                  {l}
                </span>
              ))}
            </div>
            <span className="text-sm text-ink2">Trusted by founders &amp; teams.</span>
          </div>

          <h1 className="font-heading text-4xl font-extrabold leading-[1.08] tracking-tight text-ink sm:text-6xl">
            Brand design
            <Lozenge src="/images/medsync-cover.jpg" alt="MedSync website" />
            that makes small teams
            <Lozenge src="/images/ozmax-cover.png" alt="Ozmax Care brand" />
            look like leaders.
          </h1>

          <p className="mx-auto mt-8 max-w-md text-lg leading-relaxed text-ink2">
            Brand, web &amp; marketing creative for businesses that want to look
            like the ones people already trust.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4">
            <Link
              href="/work"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-4 text-sm font-medium text-white transition-transform hover:scale-[1.03]"
            >
              View work →
            </Link>
            <a
              href="/cv.pdf"
              className="font-mono text-[11px] uppercase tracking-wider text-dim transition-colors hover:text-ink"
            >
              or download CV ↓
            </a>
          </div>
        </FadeIn>
      </section>

      {/* WORK PREVIEW STRIP */}
      <section className="mx-auto max-w-6xl px-6">
        <FadeIn>
          <div className="grid grid-cols-3 gap-4 rounded-[28px] bg-dark p-4">
            {featured.map((p) => (
              <div key={p.id} className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                <Image
                  src={p.coverImage}
                  alt={p.title}
                  fill
                  sizes="(max-width: 768px) 33vw, 360px"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </FadeIn>
      </section>

      <Marquee />

      {/* INTRO */}
      <section className="mx-auto max-w-2xl px-6 py-16 text-center sm:py-24">
        <FadeIn>
          <p className="text-base italic text-accent" style={eyebrow}>
            (hello)
          </p>
          <h2 className="mx-auto mt-5 max-w-xl font-heading text-2xl font-bold leading-snug text-ink sm:text-3xl">
            I help brands launch sharper —{" "}
            <span className="text-ink2">with clarity, speed, and no drama.</span>
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {["Branding", "Logo", "Website", "Social", "Strategy"].map((s) => (
              <span
                key={s}
                className="rounded-full border border-line bg-cream px-4 py-2 text-sm text-ink2"
              >
                {s}
              </span>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* STATS */}
      <section className="mx-auto max-w-6xl px-6 pb-20 sm:pb-28">
        <FadeIn>
          <div className="flex flex-col items-center justify-around gap-8 rounded-[28px] bg-dark px-8 py-12 sm:flex-row">
            {[
              ["20+", "Agency accounts"],
              ["4+", "Years"],
              ["3", "Industries"],
            ].map(([n, l]) => (
              <div key={l} className="text-center">
                <div className="font-heading text-5xl font-extrabold text-white">{n}</div>
                <div className="mt-3 font-mono text-[11px] uppercase tracking-wider text-dim">
                  {l}
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* FEATURED WORK — one per panel */}
      <section className="mx-auto max-w-6xl px-6 pb-12">
        <FadeIn>
          <p className="text-center text-base italic text-accent" style={eyebrow}>
            (selected work)
          </p>
          <h2 className="mt-2 text-center font-heading text-5xl font-extrabold text-line sm:text-7xl">
            Recent work
          </h2>
        </FadeIn>
        <div className="mt-6 space-y-8">
          {featured.map((p, i) => (
            <FadeIn key={p.id}>
              <article className="overflow-hidden rounded-[28px] bg-dark p-6 sm:p-10">
                <div className="flex flex-col gap-8 sm:flex-row sm:items-center">
                  <div className="flex-1">
                    <div className="font-mono text-[11px] uppercase tracking-wider text-dim">
                      {String(i + 1).padStart(2, "0")} / {String(featured.length).padStart(2, "0")}
                    </div>
                    <div className="relative my-5 aspect-[16/10] w-full overflow-hidden rounded-2xl">
                      <Image
                        src={p.coverImage}
                        alt={p.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 640px"
                        className="object-cover"
                      />
                    </div>
                    <h3 className="font-heading text-3xl font-extrabold text-white sm:text-4xl">
                      {p.title}
                    </h3>
                    <p className="mt-3 max-w-md text-sm leading-relaxed text-[#b8b3a8]">
                      {p.headline}
                    </p>
                    {p.url && (
                      <a
                        href={p.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-block font-mono text-[11px] uppercase tracking-wider text-accent"
                      >
                        Visit live site ↗
                      </a>
                    )}
                  </div>
                  <div className="w-full shrink-0 sm:w-44">
                    <Meta label="Year" value={p.year} />
                    <Meta label="Role" value={p.category.slice(0, 2).join(" · ")} />
                    <Meta label="Services" value={p.deliverables.slice(0, 3).join("\n")} />
                  </div>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 rounded-full border border-line bg-cream px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-ink/30"
          >
            All projects →
          </Link>
        </div>
      </section>

      {/* SERVICES */}
      <section className="mx-auto max-w-4xl px-6 py-20 text-center sm:py-28">
        <FadeIn>
          <p className="text-base italic text-accent" style={eyebrow}>
            (services)
          </p>
          <h2 className="mt-3 font-heading text-4xl font-extrabold text-ink sm:text-6xl">
            What I do
          </h2>
          <div className="mx-auto mt-10 grid max-w-3xl gap-px overflow-hidden rounded-[24px] border border-line bg-line sm:grid-cols-3">
            {[
              ["Brand & Identity", "Systems that make a business recognizable and trusted fast."],
              ["Marketing & Social", "Ad creative, campaigns, and social systems that convert."],
              ["Web & Landing", "Figma → Framer sites, mobile-first, built to convert."],
            ].map(([t, d]) => (
              <div key={t} className="bg-cream p-8 text-left">
                <div className="font-heading text-lg font-bold text-ink">{t}</div>
                <p className="mt-3 text-sm leading-relaxed text-ink2">{d}</p>
              </div>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* TESTIMONIAL */}
      <section className="mx-auto max-w-6xl px-6 pb-20 sm:pb-28">
        <FadeIn>
          <div className="rounded-[28px] bg-dark p-8 sm:p-12">
            <p className="font-mono text-[11px] uppercase tracking-wider text-accent">
              (why clients work with me)
            </p>
            <p className="mt-6 max-w-2xl font-heading text-xl font-semibold leading-relaxed text-white sm:text-2xl">
              &ldquo;Vaugn turns a messy brief into on-brand work fast — and it
              always ships looking premium.&rdquo;
            </p>
            <p className="mt-6 font-mono text-[11px] uppercase tracking-wider text-[#c9c3b6]">
              — Your testimonial · name + role
            </p>
          </div>
        </FadeIn>
      </section>

      {/* CONTACT */}
      <section className="mx-auto max-w-2xl px-6 pb-28 text-center">
        <FadeIn>
          <h2 className="mx-auto max-w-md font-heading text-4xl font-extrabold text-ink sm:text-5xl">
            Have a brand worth getting right?
          </h2>
          <p className="mx-auto mt-5 max-w-sm text-ink2">
            Open to full-time roles and select freelance projects. Remote · GMT+8.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href={`mailto:${EMAIL}`}
              className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-4 text-sm font-medium text-white transition-transform hover:scale-[1.03]"
            >
              Start a conversation →
            </a>
            <a href={`mailto:${EMAIL}`} className="text-sm text-ink2 hover:text-ink">
              {EMAIL}
            </a>
          </div>
        </FadeIn>
      </section>
    </>
  );
}
