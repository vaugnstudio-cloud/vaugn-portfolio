import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/business/Icon";
import VideoSlot from "@/components/VideoSlot";

// Visual explainers for the For business page. Every image is real work and
// labelled as such; the charts use only facts from the services list (no
// invented percentages or results).

/* ── 1. How good design turns a visitor into a customer ─────────────────── */

const JOURNEY = [
  { icon: "eye", step: "They find you", design: "A post, ad or Google listing that stops the scroll." },
  { icon: "shield", step: "They trust you", design: "A look that feels professional, clear and real." },
  { icon: "pointer", step: "They take a step", design: "One easy button: book, call, order or message." },
  { icon: "check", step: "They become a customer", design: "And your brand looks the same when they come back." },
] as const;

export function CustomerJourney() {
  return (
    <div>
      <ol className="relative grid gap-4 md:grid-cols-4">
        {/* the connecting line on wider screens */}
        <span aria-hidden className="absolute left-0 right-0 top-7 hidden h-px bg-line md:block" />
        {JOURNEY.map((j, i) => (
          <li key={j.step} className="relative">
            <span
              className={`relative z-10 grid h-14 w-14 place-items-center rounded-2xl ${
                i === JOURNEY.length - 1 ? "bg-accent text-accent-ink" : "border border-line bg-bg text-ink"
              }`}
            >
              <Icon name={j.icon} className="h-6 w-6" />
            </span>
            <p className="mt-5 font-mono text-xs text-accent">Step {i + 1}</p>
            <p className="mt-1 font-display text-2xl font-semibold leading-tight tracking-tight text-ink">{j.step}</p>
            <p className="mt-2 text-[15px] leading-snug text-ink2">{j.design}</p>
          </li>
        ))}
      </ol>

      {/* Funnel picture: an illustration, not data */}
      <figure className="mt-12 rounded-2xl border border-line bg-surface p-6 sm:p-8">
        <div className="grid gap-2">
          {[
            ["People who see you", "w-full"],
            ["People who trust you", "w-[82%]"],
            ["People who take a step", "w-[64%]"],
            ["New customers", "w-[48%]"],
          ].map(([label, w], i) => (
            <div key={label} className="flex justify-center">
              <div
                className={`${w} flex h-12 items-center justify-center rounded-lg px-3 text-center text-sm font-medium sm:text-[15px] ${
                  i === 3 ? "bg-accent text-accent-ink" : i === 0 ? "bg-ink text-bg" : "bg-raised text-ink"
                }`}
              >
                {label}
              </div>
            </div>
          ))}
        </div>
        <figcaption className="mx-auto mt-5 max-w-xl text-center text-[15px] leading-snug text-ink2">
          Every step loses some people. <span className="font-medium text-ink">Good design keeps more of them</span>, so more
          of the people who see you end up as customers.
        </figcaption>
      </figure>
    </div>
  );
}

/* ── 2. One idea, every size (real campaign) ─────────────────────────────── */

export function OneIdeaEverySize() {
  return (
    <figure>
      <div className="grid grid-cols-[1fr_0.72fr] items-end gap-3 sm:grid-cols-[1fr_0.62fr_1.25fr] sm:gap-4">
        <div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-raised">
            <Image src="/images/the-hill/sl-poster-1.jpg" alt="Seniors Lunch feed poster for The Hill" fill sizes="(max-width: 640px) 50vw, 300px" className="object-cover" />
          </div>
          <p className="mt-2.5 text-sm leading-snug text-ink2">Feed post, 4:5</p>
        </div>
        <div>
          <VideoSlot
            video={{ src: "/videos/the-hill/sl-story-2.mp4", poster: "/images/the-hill/sl-story-2-poster.jpg", label: "Story, 9:16 (tap to play)" }}
            sizes="(max-width: 640px) 40vw, 200px"
          />
        </div>
        <div className="col-span-2 sm:col-span-1">
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-raised">
            <Image src="/images/the-hill/sl-google.jpg" alt="Seniors Lunch Google graphic for The Hill" fill sizes="(max-width: 640px) 92vw, 380px" className="object-cover" />
          </div>
          <p className="mt-2.5 text-sm leading-snug text-ink2">Google post, 4:3</p>
        </div>
      </div>
      <figcaption className="mt-5 text-sm text-ink2">
        One campaign, made to fit every place it shows up. Real work for{" "}
        <Link href="/work/the-hill" className="text-ink underline decoration-line underline-offset-4 hover:text-accent">
          The Hill
        </Link>{" "}
        at my agency, Your SocialChef.
      </figcaption>
    </figure>
  );
}

/* ── 3. A month of posts (real posts, one brand) ─────────────────────────── */

// Six different real posts, one brand, laid out as two planned weeks.
const PLAN = [
  "/images/tnt/v1-craving-4x5.jpg",
  "/images/tnt/follower-1.jpg",
  "/images/tnt/v2-company-4x5.jpg",
  "/images/tnt/follower-2.jpg",
  "/images/tnt/v3-room-1x1.jpg",
  "/images/tnt/follower-3.jpg",
];
const DAYS = ["Mon", "Wed", "Fri"];

export function MonthOfPosts() {
  return (
    <figure>
      <div className="overflow-hidden rounded-2xl border border-line bg-surface">
        <div className="grid grid-cols-[2.75rem_1fr_1fr_1fr] border-b border-line font-mono text-[11px] uppercase tracking-[0.1em] text-dim">
          <span className="p-2.5" />
          {DAYS.map((d) => (
            <span key={d} className="border-l border-line p-2.5">{d}</span>
          ))}
        </div>
        {[0, 1].map((w) => (
          <div key={w} className="grid grid-cols-[2.75rem_1fr_1fr_1fr] border-b border-line last:border-b-0">
            <span className="p-2.5 font-mono text-[11px] uppercase tracking-[0.1em] text-dim">Wk {w + 1}</span>
            {DAYS.map((d, i) => (
              <div key={d} className="border-l border-line p-1.5 sm:p-2">
                <div className="relative aspect-[4/5] overflow-hidden rounded-md bg-raised">
                  <Image src={PLAN[w * 3 + i]} alt="" fill sizes="(max-width: 640px) 28vw, 160px" className="object-cover" />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      <figcaption className="mt-5 text-sm text-ink2">
        Three posts a week, planned ahead and all on brand. Shown with real posts I designed for{" "}
        <Link href="/work/tacos-n-tequilas" className="text-ink underline decoration-line underline-offset-4 hover:text-accent">
          Tacos &apos;N&apos; Tequilas
        </Link>{" "}
        at my agency.
      </figcaption>
    </figure>
  );
}

/* ── 4. How long things take (from the services list) ───────────────────── */

const TIMELINE: { label: string; min: number; max: number; note: string }[] = [
  { label: "Poster or flyer", min: 0.3, max: 0.6, note: "A few days" },
  { label: "Ad campaign set", min: 0.8, max: 1.2, note: "About a week" },
  { label: "Landing page", min: 1, max: 2, note: "1 to 2 weeks" },
  { label: "Brand identity", min: 2, max: 4, note: "2 to 4 weeks" },
  { label: "Full website", min: 4, max: 8, note: "4 to 8 weeks" },
];
const WEEKS = 8;

export function TimelineChart() {
  return (
    <figure className="rounded-2xl border border-line bg-surface p-5 sm:p-8">
      <div className="grid gap-5">
        {TIMELINE.map((t) => (
          <div key={t.label} className="grid gap-2 sm:grid-cols-[10rem_1fr_7rem] sm:items-center sm:gap-4">
            <p className="font-display text-lg font-semibold tracking-tight text-ink">{t.label}</p>
            <div className="relative h-4 rounded-full bg-raised" role="img" aria-label={`${t.label}: ${t.note}`}>
              <span
                className="absolute inset-y-0 left-0 rounded-full bg-accent/30"
                style={{ width: `${(t.max / WEEKS) * 100}%` }}
              />
              <span
                className="absolute inset-y-0 left-0 rounded-full bg-accent"
                style={{ width: `${Math.max(t.min / WEEKS, 0.03) * 100}%` }}
              />
            </div>
            <p className="font-mono text-xs uppercase tracking-[0.1em] text-dim sm:text-right">{t.note}</p>
          </div>
        ))}
        <div className="grid gap-2 sm:grid-cols-[10rem_1fr_7rem] sm:items-center sm:gap-4">
          <p className="font-display text-lg font-semibold tracking-tight text-ink">Social media</p>
          <div className="flex h-4 gap-1" role="img" aria-label="Social media: planned every month">
            {Array.from({ length: WEEKS }).map((_, i) => (
              <span key={i} className="flex-1 rounded-full bg-ink/80" />
            ))}
          </div>
          <p className="font-mono text-xs uppercase tracking-[0.1em] text-dim sm:text-right">Every month</p>
        </div>
      </div>
      {/* week scale */}
      <div className="mt-4 hidden sm:grid sm:grid-cols-[10rem_1fr_7rem] sm:gap-4">
        <span />
        <div className="flex justify-between font-mono text-[11px] text-dim">
          {Array.from({ length: WEEKS + 1 }).map((_, i) => (
            <span key={i}>{i === 0 ? "0" : `${i}w`}</span>
          ))}
        </div>
        <span />
      </div>
      <figcaption className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-ink2">
        <span className="inline-flex items-center gap-2"><span className="h-2.5 w-5 rounded-full bg-accent" /> Usually done by</span>
        <span className="inline-flex items-center gap-2"><span className="h-2.5 w-5 rounded-full bg-accent/30" /> Bigger projects</span>
        <span className="text-dim">Times start once I have your content.</span>
      </figcaption>
    </figure>
  );
}
