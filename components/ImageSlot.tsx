"use client";

import { useState } from "react";
import Image from "next/image";
import type { ImageAsset } from "@/data/projects";

const ASPECTS: Record<NonNullable<ImageAsset["aspect"]>, string> = {
  wide: "aspect-[16/10]",
  square: "aspect-square",
  tall: "aspect-[4/5]",
};

// Placeholder-aware image: renders the real asset when `src` exists,
// otherwise a designed slot so scaffolded pages still look intentional.
export default function ImageSlot({ asset }: { asset: ImageAsset }) {
  const [imageOk, setImageOk] = useState(true);
  const aspect = ASPECTS[asset.aspect ?? "wide"];

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
