"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/business/Icon";
import { INDUSTRIES, SERVICES, type Industry, type Proof, type ProofKind, type ServiceId } from "@/data/business";
import { mailto } from "@/data/site";

const pad = (n: number) => String(n).padStart(2, "0");
const SERVICE_NAME = Object.fromEntries(SERVICES.map((s) => [s.id, s.name])) as Record<ServiceId, string>;

// Shared events so the hero chips, this explorer, the service cards and the
// request builder stay in step without a global store.
export const INDUSTRY_EVENT = "biz:industry";
export const SERVICE_EVENT = "biz:service";

export function selectIndustry(id: string, scroll = true) {
  if (!INDUSTRIES.some((i) => i.id === id)) return;
  history.replaceState(null, "", `#${id}`);
  window.dispatchEvent(new CustomEvent(INDUSTRY_EVENT, { detail: id }));
  if (scroll) document.getElementById("industries")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function selectService(id: ServiceId) {
  window.dispatchEvent(new CustomEvent(SERVICE_EVENT, { detail: id }));
  document.getElementById(`service-${id}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
}

const KIND_STYLE: Record<ProofKind, string> = {
  "Direct client": "bg-accent text-accent-ink",
  "Agency work": "bg-ink text-bg",
  "Own product": "bg-surface text-ink",
  "Concept study": "bg-surface text-ink2",
};

// Website screenshots sit in a browser frame, campaign posters stay tall,
// everything else (identity boards) shows wide. Nothing gets cropped badly.
type Shape = "site" | "tall" | "wide";
function shapeOf(src: string): Shape {
  if (src.includes("/live/") || src.includes("/products/")) return "site";
  if (/\/(the-hill|augellos|tnt)\//.test(src)) return "tall";
  return "wide";
}

function Sample({ proof }: { proof: Proof }) {
  const shape = shapeOf(proof.image);
  const badge = (
    <span className={`absolute left-3 top-3 z-10 rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.1em] shadow-sm ${KIND_STYLE[proof.kind]}`}>
      {proof.kind}
    </span>
  );
  const img = (aspect: string, pos = "object-center") => (
    <div className={`relative ${aspect} overflow-hidden bg-raised`}>
      <Image
        src={proof.image}
        alt={`${proof.title}: ${proof.note}`}
        fill
        sizes="(max-width: 1024px) 92vw, 600px"
        className={`object-cover ${pos} transition-transform duration-700 group-hover:scale-[1.03]`}
      />
    </div>
  );
  if (shape === "site") {
    return (
      <div className="relative overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_20px_50px_-25px_rgb(0_0_0_/_0.35)]">
        <div className="flex items-center gap-1.5 border-b border-line px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-line" />
          <span className="h-2.5 w-2.5 rounded-full bg-line" />
          <span className="h-2.5 w-2.5 rounded-full bg-line" />
          <span className="ml-3 h-5 flex-1 rounded-full bg-raised" />
        </div>
        <div className="relative">
          {badge}
          {img("aspect-[16/10]", "object-top")}
        </div>
      </div>
    );
  }
  return (
    <div className="relative overflow-hidden rounded-2xl">
      {badge}
      {img(shape === "tall" ? "aspect-[4/5]" : "aspect-[16/10]")}
    </div>
  );
}

function Card({ industry, n }: { industry: Industry; n: number }) {
  const [copied, setCopied] = useState(false);
  const [lead, ...more] = industry.proof;

  const copyLink = async () => {
    const url = `${window.location.origin}/for-business#${industry.id}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.prompt("Copy this link:", url);
    }
  };

  const mail = mailto(
    `Design help for my ${industry.short.toLowerCase()} business`,
    `Hi Vaugn,\n\nI run a ${industry.short.toLowerCase()} business and I'd love some help with:\n\n(website, social media, posters, ads or brand)\n\nOur website or page:\n\nThanks!`,
  );

  return (
    <div key={industry.id} className="swap-in">
      {/* Headline + lead sample */}
      <div className="grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-12">
        <div className="lg:col-span-6">
          <p className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] text-dim">
            <span className="text-accent">{pad(n)}</span> For {industry.name.toLowerCase()}
          </p>
          <h3 className="display mt-4 text-[clamp(2.6rem,5vw,4.3rem)] leading-[0.95] text-ink">{industry.headline}</h3>
          <p className="mt-5 max-w-lg text-xl leading-snug text-ink2">{industry.promise}</p>
        </div>

        <Link href={lead.href} className={`group block lg:col-span-6 ${shapeOf(lead.image) === "tall" ? "mx-auto w-full max-w-[360px]" : ""}`}>
          <Sample proof={lead} />
          <p className="mt-3 flex items-baseline justify-between gap-4">
            <span className="font-display text-lg font-semibold tracking-tight text-ink group-hover:text-accent">{lead.title}</span>
            <span className="shrink-0 text-sm text-dim">See the work →</span>
          </p>
          <p className="text-sm text-ink2">{lead.note}</p>
        </Link>
      </div>

      {/* Three outcomes, readable at a glance */}
      <ul className="mt-12 grid gap-4 sm:grid-cols-3">
        {industry.outcomes.map((o, i) => (
          <li key={o.big} className={`rounded-2xl p-6 ${i === 0 ? "bg-accent text-accent-ink" : "border border-line bg-bg"}`}>
            <span className={`grid h-9 w-9 place-items-center rounded-full ${i === 0 ? "bg-accent-ink/15" : "bg-accent/10 text-accent"}`}>
              <Icon name="check" className="h-5 w-5" />
            </span>
            <p className={`mt-4 font-display text-[1.6rem] font-semibold leading-tight tracking-tight ${i === 0 ? "" : "text-ink"}`}>{o.big}</p>
            <p className={`mt-1.5 text-[15px] leading-snug ${i === 0 ? "opacity-90" : "text-ink2"}`}>{o.small}</p>
          </li>
        ))}
      </ul>

      {/* What I'd make */}
      <div className="mt-12">
        <p className="eyebrow">What I&apos;d make for you</p>
        <div className={`mt-4 grid gap-3 sm:grid-cols-2 ${industry.make.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}>
          {industry.make.map((m) => (
            <button
              key={m.what}
              type="button"
              onClick={() => selectService(m.service)}
              className="group flex items-start gap-4 rounded-2xl border border-line bg-surface p-5 text-left transition-colors hover:border-accent"
              aria-label={`${SERVICE_NAME[m.service]}: ${m.what}. See what is included.`}
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent/10 text-accent">
                <Icon name={m.service} />
              </span>
              <span>
                <span className="block font-display text-lg font-semibold tracking-tight text-ink group-hover:text-accent">
                  {SERVICE_NAME[m.service]}
                </span>
                <span className="mt-0.5 block text-sm leading-snug text-ink2">{m.what}</span>
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* More samples + actions */}
      <div className="mt-10 flex flex-col gap-6 border-t border-line pt-8 lg:flex-row lg:items-center lg:justify-between">
        {more.length > 0 ? (
          <div className="flex items-center gap-3">
            <p className="eyebrow mr-1">More samples</p>
            {more.map((p) => (
              <Link key={p.title} href={p.href} className="group relative h-16 w-16 overflow-hidden rounded-xl bg-raised sm:h-20 sm:w-20" title={`${p.title} (${p.kind})`}>
                <Image src={p.image} alt={`${p.title}: ${p.note}`} fill sizes="80px" className="object-cover transition-transform duration-500 group-hover:scale-110" />
              </Link>
            ))}
          </div>
        ) : (
          <span />
        )}
        <div className="flex flex-wrap items-center gap-3">
          <a
            href={mail}
            className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-medium text-accent-ink transition-opacity hover:opacity-90"
          >
            Let&apos;s talk about your business <span aria-hidden>→</span>
          </a>
          <button
            type="button"
            onClick={copyLink}
            className="rounded-full border border-ink/70 px-5 py-3 text-sm font-medium text-ink transition-colors hover:bg-ink hover:text-bg"
          >
            {copied ? "Link copied ✓" : "Copy link"}
          </button>
          <span role="status" className="sr-only">{copied ? "Link copied" : ""}</span>
        </div>
      </div>
    </div>
  );
}

export default function IndustryExplorer() {
  const [active, setActive] = useState<string>(INDUSTRIES[0].id);
  const [open, setOpen] = useState(false);

  const apply = useCallback((id: string) => {
    if (INDUSTRIES.some((i) => i.id === id)) {
      setActive(id);
      setOpen(false);
    }
  }, []);

  useEffect(() => {
    const fromHash = window.location.hash.slice(1);
    if (INDUSTRIES.some((i) => i.id === fromHash)) {
      // A link sent to a prospect (/for-business#dental) opens on their industry.
      requestAnimationFrame(() => {
        setActive(fromHash);
        document.getElementById("industries")?.scrollIntoView({ block: "start" });
      });
    }
    const onEvent = (e: Event) => apply((e as CustomEvent<string>).detail);
    const onHash = () => apply(window.location.hash.slice(1));
    window.addEventListener(INDUSTRY_EVENT, onEvent);
    window.addEventListener("hashchange", onHash);
    return () => {
      window.removeEventListener(INDUSTRY_EVENT, onEvent);
      window.removeEventListener("hashchange", onHash);
    };
  }, [apply]);

  const idx = INDUSTRIES.findIndex((i) => i.id === active);
  const industry = INDUSTRIES[idx];
  const step = (d: number) => selectIndustry(INDUSTRIES[(idx + d + INDUSTRIES.length) % INDUSTRIES.length].id, false);

  return (
    <div>
      {/* Industry switcher: a compact bar that opens a grid, then hides again */}
      <div className="rounded-2xl border border-line bg-surface">
        <div className="flex items-center gap-3 p-3 sm:p-4">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-ink text-bg">
            <Icon name={industry.id} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="eyebrow">Showing</p>
            <p className="truncate font-display text-xl font-semibold tracking-tight text-ink sm:text-2xl">{industry.name}</p>
          </div>
          <button
            type="button"
            onClick={() => step(-1)}
            aria-label="Previous industry"
            className="hidden h-11 w-11 place-items-center rounded-full border border-line text-ink transition-colors hover:border-ink sm:grid"
          >
            <Icon name="arrow-left" className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => step(1)}
            aria-label="Next industry"
            className="hidden h-11 w-11 place-items-center rounded-full border border-line text-ink transition-colors hover:border-ink sm:grid"
          >
            <Icon name="arrow-right" className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="industry-grid"
            className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-3 text-sm font-medium text-bg transition-colors hover:bg-accent hover:text-accent-ink sm:px-5"
          >
            <span className="hidden sm:inline">{open ? "Hide industries" : "Change industry"}</span>
            <span className="sm:hidden">{open ? "Hide" : "Change"}</span>
            <Icon name="chevron" className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
          </button>
        </div>

        {open && (
          <div id="industry-grid" className="swap-in grid grid-cols-2 gap-2 border-t border-line p-3 sm:grid-cols-4 sm:p-4">
            {INDUSTRIES.map((ind) => {
              const on = ind.id === active;
              return (
                <button
                  key={ind.id}
                  type="button"
                  aria-pressed={on}
                  onClick={() => selectIndustry(ind.id, false)}
                  className={`flex items-center gap-3 rounded-xl border p-3 text-left text-sm font-medium transition-colors ${
                    on ? "border-accent bg-accent text-accent-ink" : "border-line bg-bg text-ink hover:border-ink"
                  }`}
                >
                  <Icon name={ind.id} className="h-5 w-5 shrink-0" />
                  {ind.short}
                </button>
              );
            })}
          </div>
        )}
      </div>

      <div className="mt-10 lg:mt-14">
        <Card industry={industry} n={idx + 1} />
      </div>
    </div>
  );
}
