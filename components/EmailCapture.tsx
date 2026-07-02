"use client";

import { useState } from "react";
import { FORMSPREE_ID } from "@/data/site";

// Footer email capture — single field, no popups (strategy §7).
// Renders only when Formspree is configured (parent checks FORMSPREE_ID).
export default function EmailCapture() {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      setStatus(res.ok ? "done" : "error");
      if (res.ok) form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return <p className="mt-4 text-sm text-accent">Checklist on its way — check your inbox.</p>;
  }

  return (
    <form onSubmit={onSubmit} className="mt-4">
      <label htmlFor="capture-email" className="block text-xs text-dim">
        Get the healthcare website trust checklist
      </label>
      <div className="mt-2 flex gap-2">
        <input
          id="capture-email"
          type="email"
          name="email"
          required
          placeholder="you@company.com"
          className="w-full rounded-lg border border-line bg-bg px-3 py-2 text-sm text-ink placeholder:text-dim"
        />
        <input type="hidden" name="form" value="checklist" />
        <button
          type="submit"
          disabled={status === "sending"}
          className="rounded-lg bg-accent px-3 py-2 text-sm font-medium text-accent-ink disabled:opacity-60"
        >
          Send
        </button>
      </div>
      {status === "error" && (
        <p className="mt-2 text-xs text-dim">Something went wrong — try again.</p>
      )}
    </form>
  );
}
