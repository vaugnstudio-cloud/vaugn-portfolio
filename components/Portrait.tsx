"use client";

import { useState } from "react";
import Image from "next/image";
import { PORTRAIT_SRC } from "@/data/site";

// Portrait slot — renders PORTRAIT_SRC (data/site.ts) when set, otherwise a
// designed placeholder. Adding the photo = drop the file + set one constant.
export default function Portrait({ className = "" }: { className?: string }) {
  const [ok, setOk] = useState(true);
  const showPhoto = Boolean(PORTRAIT_SRC) && ok;

  return (
    <div
      className={`relative aspect-[4/5] w-full overflow-hidden rounded-2xl border bg-raised ${
        showPhoto ? "border-line" : "border-dashed border-line"
      } ${className}`}
    >
      {showPhoto ? (
        <Image
          src={PORTRAIT_SRC!}
          alt="Vaugn Jasper Almeida — portrait"
          fill
          sizes="(max-width: 1024px) 100vw, 480px"
          className="object-cover"
          onError={() => setOk(false)}
        />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-2">
          <span className="font-display text-2xl italic text-ink2">Vaugn</span>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-dim">
            portrait — coming
          </span>
        </div>
      )}
    </div>
  );
}
