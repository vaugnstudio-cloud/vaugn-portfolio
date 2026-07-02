"use client";

import { useState } from "react";
import { EMAIL, gmailCompose, FORMSPREE_ID } from "@/data/site";

const NEED_OPTIONS = [
  "Brand + Website",
  "Website only",
  "Landing page",
  "Ongoing design / retainer",
  "Other",
] as const;

const BUDGET_OPTIONS = ["Under $2k", "$2–5k", "$5–10k", "$10k+"] as const;

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // No Formspree configured → the form still works: it opens Gmail compose
    // pre-filled with everything typed. Swaps to real in-page submissions the
    // moment a Formspree id is set.
    if (!FORMSPREE_ID) {
      const subject = `Project enquiry — ${data.get("need") ?? "new project"}`;
      const body = [
        `Name: ${data.get("name") ?? ""}`,
        `Email: ${data.get("email") ?? ""}`,
        `Company/practice: ${data.get("company") ?? ""}`,
        `Need: ${data.get("need") ?? ""}`,
        `Budget: ${data.get("budget") ?? "—"}`,
        "",
        `${data.get("message") ?? ""}`,
      ].join("\n");
      window.open(gmailCompose(subject, body), "_blank", "noopener");
      setStatus("done");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      setStatus(res.ok ? "done" : "error");
      if (res.ok) form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="rounded-2xl border border-line bg-surface p-10 text-center">
        <p className="font-display text-2xl text-ink">
          {FORMSPREE_ID ? "Got it — thank you." : "Your email is ready."}
        </p>
        <p className="mt-3 text-ink2">
          {FORMSPREE_ID
            ? "I'll reply within 24–48 hours with honest thoughts and a clear next step."
            : `Gmail just opened in a new tab with everything pre-filled — hit send and I'll reply within 24–48 hours. (Nothing opened? Email me directly at ${EMAIL}.)`}
        </p>
      </div>
    );
  }

  const field =
    "w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm text-ink placeholder:text-dim focus:border-ink2";

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      {/* Honeypot — bots fill it, humans never see it */}
      <input
        type="text"
        name="_gotcha"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className="eyebrow">Name</label>
          <input id="cf-name" name="name" type="text" required placeholder="Your name" className={`mt-2 ${field}`} />
        </div>
        <div>
          <label htmlFor="cf-email" className="eyebrow">Email</label>
          <input id="cf-email" name="email" type="email" required placeholder="you@company.com" className={`mt-2 ${field}`} />
        </div>
      </div>

      <div>
        <label htmlFor="cf-company" className="eyebrow">Company / practice</label>
        <input id="cf-company" name="company" type="text" placeholder="Business name" className={`mt-2 ${field}`} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-need" className="eyebrow">What do you need?</label>
          <select id="cf-need" name="need" required defaultValue="" className={`mt-2 ${field}`}>
            <option value="" disabled>Select one</option>
            {NEED_OPTIONS.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="cf-budget" className="eyebrow">Budget range</label>
          <select id="cf-budget" name="budget" defaultValue="" className={`mt-2 ${field}`}>
            <option value="" disabled>Select one (optional)</option>
            {BUDGET_OPTIONS.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="cf-message" className="eyebrow">Tell me about the project</label>
        <textarea
          id="cf-message"
          name="message"
          required
          rows={5}
          placeholder="What are you building, who is it for, and when do you want it live?"
          className={`mt-2 ${field}`}
        />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-2 rounded-full bg-accent px-7 py-3.5 font-medium text-accent-ink transition-transform hover:scale-[1.02] disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Send message"}
      </button>

      {status === "error" && (
        <p className="text-sm text-ink2">
          {FORMSPREE_ID
            ? "Something went wrong — please try again, or "
            : "The form isn't connected yet — "}
          email me directly at{" "}
          <a
            href={gmailCompose("Project enquiry")}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent underline"
          >
            {EMAIL}
          </a>
          .
        </p>
      )}
    </form>
  );
}
