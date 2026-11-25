"use client";

import { useEffect, useState } from "react";
import Icon from "@/components/business/Icon";
import { SERVICES, type ServiceId } from "@/data/business";
import { SERVICE_EVENT } from "@/components/business/IndustryExplorer";

// Five services as a bento of cards: everything visible at once, no tabs.
// Website and social are the two most asked for, so they get wider cards.
const SPAN: Record<ServiceId, string> = {
  website: "lg:col-span-3",
  social: "lg:col-span-3",
  posters: "lg:col-span-2",
  ads: "lg:col-span-2",
  brand: "lg:col-span-2",
};

export default function ServiceExplorer() {
  const [flash, setFlash] = useState<ServiceId | null>(null);

  // Clicking a service inside an industry card scrolls here and highlights it.
  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    const on = (e: Event) => {
      setFlash((e as CustomEvent<ServiceId>).detail);
      clearTimeout(t);
      t = setTimeout(() => setFlash(null), 2200);
    };
    window.addEventListener(SERVICE_EVENT, on);
    return () => {
      window.removeEventListener(SERVICE_EVENT, on);
      clearTimeout(t);
    };
  }, []);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
      {SERVICES.map((s, i) => {
        const big = s.id === "website" || s.id === "social";
        return (
          <article
            key={s.id}
            id={`service-${s.id}`}
            className={`flex scroll-mt-24 flex-col rounded-2xl border bg-bg p-6 transition-[border-color,box-shadow] duration-500 sm:p-7 ${SPAN[s.id]} ${
              flash === s.id ? "border-accent ring-4 ring-accent/15" : "border-line"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-accent text-accent-ink">
                <Icon name={s.id} />
              </span>
              <span className="font-mono text-xs text-dim">{String(i + 1).padStart(2, "0")}</span>
            </div>
            <h3 className={`mt-6 font-display font-semibold tracking-tight text-ink ${big ? "text-3xl" : "text-2xl"}`}>{s.name}</h3>
            <p className={`mt-2 leading-snug text-ink ${big ? "text-xl" : "text-lg"}`}>{s.promise}</p>
            <ul className="mt-5 grid gap-2.5">
              {s.points.map((p) => (
                <li key={p} className="flex items-start gap-2.5 text-[15px] leading-snug text-ink2">
                  <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  {p}
                </li>
              ))}
            </ul>
            <p className="mt-auto pt-6 font-mono text-[11px] uppercase tracking-[0.1em] text-dim">{s.pace}</p>
          </article>
        );
      })}
    </div>
  );
}
