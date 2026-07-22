import Link from "next/link";
import { motionItems, type MotionItem } from "@/data/motion";
import FadeIn from "@/components/FadeIn";

const ASPECTS: Record<NonNullable<MotionItem["aspect"]>, string> = {
  wide: "aspect-[16/10]",
  square: "aspect-square",
  tall: "aspect-[4/5]",
};

// A motion slot: real <video> when `src` exists, otherwise a designed
// placeholder matching ImageSlot's visual language (dashed border, mono type).
function MotionSlot({ item, forceWide }: { item: MotionItem; forceWide?: boolean }) {
  const aspect = forceWide ? ASPECTS.wide : ASPECTS[item.aspect ?? "wide"];

  if (item.src) {
    return (
      <figure className={`relative w-full overflow-hidden rounded-2xl bg-raised ${aspect}`}>
        <video
          src={item.src}
          poster={item.poster}
          controls
          playsInline
          preload="metadata"
          className="h-full w-full object-cover"
        />
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

// Motion & Video section. `teaser` renders the compact homepage row;
// the full variant lives on /work#motion.
export default function MotionSection({ teaser = false }: { teaser?: boolean }) {
  if (teaser) {
    return (
      <div>
        <div className="grid gap-5 sm:grid-cols-3">
          {motionItems.slice(0, 3).map((item) => (
            <FadeIn key={item.id}>
              <MotionSlot item={item} forceWide />
            </FadeIn>
          ))}
        </div>
        <FadeIn>
          <p className="mt-6">
            <Link
              href="/work#motion"
              className="font-mono text-[11px] font-medium uppercase tracking-wider text-accent hover:underline"
            >
              Motion work →
            </Link>
          </p>
        </FadeIn>
      </div>
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {motionItems.map((item) => (
        <FadeIn key={item.id} className={item.aspect === "wide" || !item.aspect ? "sm:col-span-2" : ""}>
          <MotionSlot item={item} />
        </FadeIn>
      ))}
    </div>
  );
}
