"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import type { ImageAsset } from "@/data/projects";

// Each aspect matches the artwork's real ratio, so object-cover never crops
// a poster's type or a screenshot's edges.
const ASPECTS: Record<NonNullable<ImageAsset["aspect"]>, string> = {
  wide: "aspect-[16/10]",
  square: "aspect-square",
  tall: "aspect-[4/5]",
  landscape: "aspect-[4/3]",
  story: "aspect-[9/16]",
  phone: "aspect-[390/844]",
  pano: "", // panoramas keep natural aspect inside a horizontal scroller
};

// Full-size view in a native <dialog>: Esc, the close button or a tap on the
// backdrop closes it, and focus returns to the image that opened it.
function Lightbox({
  asset,
  dialogRef,
  open,
  onClose,
}: {
  asset: ImageAsset;
  dialogRef: React.RefObject<HTMLDialogElement | null>;
  open: boolean;
  onClose: () => void;
}) {
  const close = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) dialogRef.current?.close();
  };
  return (
    <dialog ref={dialogRef} className="lightbox" aria-label={asset.label} onClick={close} onClose={onClose}>
      <div
        className="flex h-full w-full flex-col items-center justify-center gap-3 p-4 sm:p-8"
        onClick={close}
      >
        {asset.src && open && (
          // Plain <img>, rendered only while open: the full file loads on
          // demand (lazy loading never fires inside a closed dialog).
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={asset.src}
            alt={asset.label}
            className="max-h-[82dvh] max-w-full object-contain"
          />
        )}
        <div className="flex w-full max-w-3xl items-start justify-between gap-4">
          <p className="text-sm leading-snug text-white/85">{asset.label}</p>
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            className="flex-none rounded-full border border-white/40 px-4 py-2 font-mono text-[11px] uppercase tracking-wider text-white hover:bg-white hover:text-black"
            autoFocus
          >
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
}

// Placeholder aware image: renders the real asset when `src` exists,
// otherwise a designed slot so scaffolded pages still look intentional.
export default function ImageSlot({
  asset,
  sizes = "(max-width: 768px) 100vw, 720px",
  zoom = true,
  priority = false,
}: {
  asset: ImageAsset;
  sizes?: string;
  zoom?: boolean;
  priority?: boolean;
}) {
  const [imageOk, setImageOk] = useState(true);
  const [zoomed, setZoomed] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const aspect = ASPECTS[asset.aspect ?? "wide"];

  // Panorama (stylescapes): full resolution at natural aspect; the viewer
  // scrolls sideways instead of the image being cropped or squeezed.
  if (asset.aspect === "pano" && asset.src && imageOk) {
    return (
      <figure className="relative w-full overflow-hidden rounded-2xl bg-raised">
        <div
          className="overflow-x-auto overscroll-x-contain [scrollbar-width:thin]"
          tabIndex={0}
          aria-label={`${asset.label}, scrolls sideways`}
        >
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
        <span className="pointer-events-none absolute bottom-3 right-3 rounded-full bg-bg/85 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-ink backdrop-blur">
          Scroll →
        </span>
      </figure>
    );
  }

  if (asset.src && imageOk) {
    const img = (
      <Image
        src={asset.src}
        alt={asset.label}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover transition-transform duration-500 group-hover/zoom:scale-[1.015]"
        onError={() => setImageOk(false)}
      />
    );
    if (!zoom) {
      return (
        <figure className={`relative w-full overflow-hidden rounded-2xl bg-raised ${aspect}`}>
          {img}
        </figure>
      );
    }
    return (
      <figure className="w-full">
        <button
          type="button"
          onClick={() => {
            setZoomed(true);
            dialogRef.current?.showModal();
          }}
          className={`group/zoom relative block w-full cursor-zoom-in overflow-hidden rounded-2xl bg-raised ${aspect}`}
          aria-label={`View full size: ${asset.label}`}
        >
          {img}
          <span
            aria-hidden
            className="pointer-events-none absolute bottom-2.5 right-2.5 flex h-8 w-8 items-center justify-center rounded-full bg-bg/90 text-ink opacity-0 shadow-sm transition-opacity group-hover/zoom:opacity-100 group-focus-visible/zoom:opacity-100"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M8.5 1.5h4v4M5.5 12.5h-4v-4M12.5 1.5 8 6M1.5 12.5 6 8" />
            </svg>
          </span>
        </button>
        <Lightbox asset={asset} dialogRef={dialogRef} open={zoomed} onClose={() => setZoomed(false)} />
      </figure>
    );
  }

  return (
    <figure
      className={`relative flex w-full flex-col items-center justify-center gap-2 overflow-hidden rounded-2xl border border-dashed border-line bg-surface ${aspect}`}
      aria-label={`${asset.label}, asset placeholder`}
    >
      <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-dim">
        {asset.label}
      </span>
      <span className="h-px w-8 bg-line" aria-hidden />
      <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-dim/60">
        asset slot
      </span>
    </figure>
  );
}
