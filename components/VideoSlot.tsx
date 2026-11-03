"use client";

import { useState } from "react";
import Image from "next/image";

export interface VideoAsset {
  src: string;
  poster: string;
  label: string;
}

// Click to play. Nothing autoplays, so the visitor controls motion and data.
// The files are silent web copies: client music stays on client channels.
export default function VideoSlot({
  video,
  sizes = "(max-width: 768px) 80vw, 300px",
}: {
  video: VideoAsset;
  sizes?: string;
}) {
  const [playing, setPlaying] = useState(false);

  return (
    <figure className="w-full">
      <div className="relative aspect-[9/16] w-full overflow-hidden rounded-2xl bg-raised">
        {playing ? (
          <video
            src={video.src}
            poster={video.poster}
            controls
            autoPlay
            muted
            playsInline
            preload="auto"
            aria-label={video.label}
            className="h-full w-full object-cover"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="group absolute inset-0 block h-full w-full"
            aria-label={`Play: ${video.label}`}
          >
            <Image
              src={video.poster}
              alt=""
              fill
              sizes={sizes}
              className="object-cover"
            />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-bg/90 text-ink shadow-md transition-transform group-hover:scale-105">
                <svg width="14" height="16" viewBox="0 0 12 14" fill="currentColor" aria-hidden>
                  <path d="M0 0L12 7L0 14V0Z" />
                </svg>
              </span>
            </span>
          </button>
        )}
      </div>
      <figcaption className="mt-2.5 text-sm leading-snug text-ink2">{video.label}</figcaption>
    </figure>
  );
}
