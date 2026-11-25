"use client";

import { useState } from "react";
import { COMPARE_OPTIONS, COMPARE_ROWS } from "@/data/business";

// Me versus the usual alternatives. Desktop shows every column; phones pick
// one alternative at a time so the table never needs sideways scrolling.
export default function CompareOptions() {
  const [other, setOther] = useState(1);

  return (
    <div>
      {/* Phone: pick what to compare against */}
      <div className="md:hidden">
        <p className="eyebrow">Compare me with</p>
        <div role="radiogroup" aria-label="Compare with" className="mt-3 flex flex-wrap gap-2">
          {COMPARE_OPTIONS.slice(1).map((o, i) => {
            const on = other === i + 1;
            return (
              <button
                key={o}
                type="button"
                role="radio"
                aria-checked={on}
                onClick={() => setOther(i + 1)}
                className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                  on ? "border-ink bg-ink text-bg" : "border-line text-ink2"
                }`}
              >
                {o}
              </button>
            );
          })}
        </div>
        <div className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-line bg-line">
          {COMPARE_ROWS.map((r) => (
            <div key={r.label} className="bg-bg p-4">
              <p className="eyebrow">{r.label}</p>
              <div className="mt-2 grid grid-cols-2 gap-3 text-[15px] leading-snug">
                <p className="rounded-lg bg-accent/10 p-2.5 text-ink">
                  <span className="block font-mono text-[10px] uppercase tracking-[0.1em] text-accent">Me</span>
                  {r.values[0]}
                </p>
                <p className="p-2.5 text-ink2">
                  <span className="block font-mono text-[10px] uppercase tracking-[0.1em] text-dim">{COMPARE_OPTIONS[other]}</span>
                  {r.values[other]}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tablet and up: the full table */}
      <div className="hidden overflow-hidden rounded-2xl border border-line md:block">
        <table className="w-full border-collapse text-left text-[15px] leading-snug">
          <caption className="sr-only">Working with me compared with a big agency, an in house hire, or doing it yourself</caption>
          <thead>
            <tr className="bg-surface">
              <th scope="col" className="w-[18%] p-5"><span className="sr-only">Question</span></th>
              {COMPARE_OPTIONS.map((o, i) => (
                <th
                  key={o}
                  scope="col"
                  className={`p-5 font-display text-lg font-semibold tracking-tight ${i === 0 ? "bg-accent text-accent-ink" : "text-ink"}`}
                >
                  {i === 0 ? "Working with me" : o}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {COMPARE_ROWS.map((r) => (
              <tr key={r.label} className="border-t border-line">
                <th scope="row" className="eyebrow bg-surface p-5 align-top font-medium">{r.label}</th>
                {r.values.map((v, i) => (
                  <td key={i} className={`p-5 align-top ${i === 0 ? "bg-accent/10 font-medium text-ink" : "text-ink2"}`}>
                    {i === 0 && <span aria-hidden className="mr-1.5 text-accent">✓</span>}
                    {v}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
