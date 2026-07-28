"use client";

import { useState } from "react";
import Image from "next/image";
import type { ImageAsset } from "@/data/projects";

const ASPECTS: Record<NonNullable<ImageAsset["aspect"]>, string> = {
  wide: "aspect-[16/10]",
  square: "aspect-square",
  tall: "aspect-[4/5]",
  pano: "", // panoramas keep natural aspect inside a horizontal scroller
};

// Placeholder-aware image: renders the real asset when `src` exists,
// otherwise a designed slot so scaffolded pages still look intentional.
export default function ImageSlot({ asset }: { asset: ImageAsset }) {
  const [imageOk, setImageOk] = useState(true);
  const aspect = ASPECTS[asset.aspect ?? "wide"];

  // Panorama (stylescapes): full resolution at natural aspect — the viewer
  // scrolls horizontally instead of the image being cropped or squeezed.
  if (asset.aspect === "pano" && asset.src && imageOk) {
    return (
      <figure className="relative w-full overflow-hidden rounded-2xl bg-raised">
        <div className="overflow-x-auto overscroll-x-contain [scrollbar-width:thin]">
          <Image
            src={asset.src}
            alt={asset.label}
            width={4000}
            height={1000}
            sizes="1700px"
            className="h-[280px] w-auto max-w-none sm:h-[400px]"
            onError={() => setImageOk(false)}
          />
        </div>
        <span className="pointer-events-none absolute bottom-3 right-3 rounded-full bg-bg/80 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-ink backdrop-blur">
          scroll →
        </span>
      </figure>
    );
  }

  if (asset.src && imageOk) {
    return (
      <figure className={`relative w-full overflow-hidden rounded-2xl bg-raised ${aspect}`}>
        <Image
          src={asset.src}
          alt={asset.label}
          fill
          sizes="(max-width: 768px) 100vw, 720px"
          className="object-cover"
          onError={() => setImageOk(false)}
        />
      </figure>
    );
  }

  return (
    <figure
      className={`relative flex w-full flex-col items-center justify-center gap-2 overflow-hidden rounded-2xl border border-dashed border-line bg-surface ${aspect}`}
      aria-label={`${asset.label} — asset placeholder`}
    >
      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-dim">
        {asset.label}
      </span>
      <span className="h-px w-8 bg-line" aria-hidden />
      <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-dim/60">
        asset slot
      </span>
    </figure>
  );
}
