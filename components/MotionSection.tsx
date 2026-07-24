import { motionItems, type MotionItem } from "@/data/motion";
import FadeIn from "@/components/FadeIn";

const ASPECTS: Record<NonNullable<MotionItem["aspect"]>, string> = {
  wide: "aspect-[16/10]",
  square: "aspect-square",
  tall: "aspect-[4/5]",
  reel: "aspect-[9/16]",
};

// A motion slot: real <video> when `src` exists, otherwise a designed
// placeholder matching ImageSlot's visual language (dashed border, mono type).
// `showreel` plays muted loops automatically (homepage band); the default
// renders a normal player with controls (/work#motion).
function MotionSlot({ item, showreel = false }: { item: MotionItem; showreel?: boolean }) {
  const aspect = ASPECTS[item.aspect ?? "wide"];

  if (item.src) {
    return (
      <figure className={`relative w-full overflow-hidden rounded-2xl bg-raised ${aspect}`}>
        <video
          src={item.src}
          poster={item.poster}
          controls={!showreel}
          autoPlay={showreel}
          muted
          loop
          playsInline
          preload={showreel ? "auto" : "metadata"}
          aria-label={`${item.title} — ${item.kind}`}
          className="h-full w-full object-cover"
        />
        <figcaption className="pointer-events-none absolute left-3 top-3 rounded-full bg-bg/80 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-ink backdrop-blur">
          {item.title}
        </figcaption>
      </figure>
    );
  }

  return (
    <figure
      className={`relative flex w-full flex-col items-center justify-center gap-2 overflow-hidden rounded-2xl border border-dashed border-line bg-surface ${aspect}`}
      aria-label={`${item.title} — in production`}
    >
      <span
        className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-dim"
        aria-hidden
      >
        <svg width="12" height="14" viewBox="0 0 12 14" fill="currentColor" aria-hidden>
          <path d="M0 0L12 7L0 14V0Z" />
        </svg>
      </span>
      <span className="mt-1 px-4 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-dim">
        {item.title}
      </span>
      <span className="h-px w-8 bg-line" aria-hidden />
      <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-dim/60">
        {item.kind} · in production
      </span>
    </figure>
  );
}

// Motion & Video section. `teaser` renders the compact homepage row (first 3);
// the full grid lives on /work#motion.
export default function MotionSection({ teaser = false }: { teaser?: boolean }) {
  const items = teaser ? motionItems.slice(0, 3) : motionItems;
  return (
    <div
      className={
        teaser
          ? "grid gap-5 sm:grid-cols-3"
          : "grid grid-cols-2 gap-5 lg:grid-cols-4"
      }
    >
      {items.map((item, i) => (
        <FadeIn key={item.id} delay={i * 0.05}>
          <MotionSlot item={item} showreel={teaser} />
        </FadeIn>
      ))}
    </div>
  );
}
