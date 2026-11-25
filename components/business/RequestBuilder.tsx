"use client";

import { useEffect, useMemo, useState } from "react";
import { INDUSTRIES, SERVICES, type ServiceId } from "@/data/business";
import { INDUSTRY_EVENT } from "@/components/business/IndustryExplorer";
import { mailto } from "@/data/site";

const TIMING = ["As soon as possible", "Within a month", "In the next few months", "Just exploring"] as const;

// Builds a short, ready to send brief. Nothing is stored or sent from the
// page: the button opens the visitor's own mail app with the brief filled in.
export default function RequestBuilder() {
  const [industry, setIndustry] = useState<string>(INDUSTRIES[0].id);
  const [picked, setPicked] = useState<ServiceId[]>(["website"]);
  const [timing, setTiming] = useState<(typeof TIMING)[number]>("Within a month");
  const [business, setBusiness] = useState("");
  const [site, setSite] = useState("");
  const [copied, setCopied] = useState(false);

  // Follow the industry chosen higher up the page.
  useEffect(() => {
    const fromHash = window.location.hash.slice(1);
    if (INDUSTRIES.some((i) => i.id === fromHash)) requestAnimationFrame(() => setIndustry(fromHash));
    const on = (e: Event) => setIndustry((e as CustomEvent<string>).detail);
    window.addEventListener(INDUSTRY_EVENT, on);
    return () => window.removeEventListener(INDUSTRY_EVENT, on);
  }, []);

  const toggle = (id: ServiceId) =>
    setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  const ind = INDUSTRIES.find((i) => i.id === industry)!;
  const names = SERVICES.filter((s) => picked.includes(s.id)).map((s) => s.name.toLowerCase());

  const summary = useMemo(() => {
    const lines = [
      "Hi Vaugn,",
      "",
      `I run ${business.trim() || "a business"} (${ind.name.toLowerCase()}).`,
      names.length ? `I'd like help with: ${names.join(", ")}.` : "I'm not sure yet what I need. Can you suggest?",
      `Timing: ${timing.toLowerCase()}.`,
    ];
    if (site.trim()) lines.push(`Our website or page: ${site.trim()}`);
    lines.push("", "Thanks!");
    return lines.join("\n");
  }, [business, ind, names, timing, site]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard blocked: the mail button still works */
    }
  };

  const chip = (on: boolean) =>
    `rounded-full border px-4 py-2 text-sm transition-colors ${
      on ? "border-ink bg-ink text-bg" : "border-line bg-bg text-ink2 hover:border-ink2 hover:text-ink"
    }`;

  return (
    <div className="grid gap-10 lg:grid-cols-12">
      <div className="grid gap-9 lg:col-span-7">
        <fieldset>
          <legend className="eyebrow"><span className="text-accent">01</span> Your industry</legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {INDUSTRIES.map((i) => (
              <button key={i.id} type="button" aria-pressed={i.id === industry} onClick={() => setIndustry(i.id)} className={chip(i.id === industry)}>
                {i.short}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="eyebrow"><span className="text-accent">02</span> What you need (pick any)</legend>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {SERVICES.map((s) => {
              const on = picked.includes(s.id);
              return (
                <label
                  key={s.id}
                  className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition-colors ${
                    on ? "border-accent bg-accent/10" : "border-line bg-bg hover:border-ink2"
                  }`}
                >
                  <input type="checkbox" checked={on} onChange={() => toggle(s.id)} className="mt-1 h-4 w-4 accent-[var(--color-accent)]" />
                  <span>
                    <span className="block font-medium text-ink">{s.name}</span>
                    <span className="mt-0.5 block text-sm leading-snug text-ink2">{s.promise}</span>
                  </span>
                </label>
              );
            })}
          </div>
        </fieldset>

        <fieldset>
          <legend className="eyebrow"><span className="text-accent">03</span> When</legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {TIMING.map((t) => (
              <button key={t} type="button" aria-pressed={t === timing} onClick={() => setTiming(t)} className={chip(t === timing)}>
                {t}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset className="grid gap-4 sm:grid-cols-2">
          <legend className="eyebrow mb-3"><span className="text-accent">04</span> Optional details</legend>
          <label className="grid gap-1.5 text-sm text-ink2">
            Business name
            <input
              value={business}
              onChange={(e) => setBusiness(e.target.value)}
              placeholder="e.g. Bright Smile Dental"
              className="rounded-lg border border-line bg-bg px-3.5 py-2.5 text-[15px] text-ink placeholder:text-dim focus:border-accent"
            />
          </label>
          <label className="grid gap-1.5 text-sm text-ink2">
            Website or social page
            <input
              value={site}
              onChange={(e) => setSite(e.target.value)}
              placeholder="yourbusiness.com"
              className="rounded-lg border border-line bg-bg px-3.5 py-2.5 text-[15px] text-ink placeholder:text-dim focus:border-accent"
            />
          </label>
        </fieldset>
      </div>

      <div className="lg:col-span-5">
        <div className="rounded-2xl border border-ink/80 bg-surface p-6 lg:sticky lg:top-24">
          <p className="eyebrow">Your message, ready to send</p>
          <pre className="mt-4 whitespace-pre-wrap font-sans text-[15px] leading-relaxed text-ink">{summary}</pre>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={mailto(`Design help: ${ind.short}`, summary)}
              className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-medium text-accent-ink transition-opacity hover:opacity-90"
            >
              Send it to me <span aria-hidden>→</span>
            </a>
            <button
              type="button"
              onClick={copy}
              className="rounded-full border border-ink/70 px-5 py-3 text-sm font-medium text-ink transition-colors hover:bg-ink hover:text-bg"
            >
              {copied ? "Copied ✓" : "Copy text"}
            </button>
          </div>
          <p className="mt-4 text-xs leading-relaxed text-dim">
            Opens your own email app. Nothing is saved on this page.
          </p>
        </div>
      </div>
    </div>
  );
}
