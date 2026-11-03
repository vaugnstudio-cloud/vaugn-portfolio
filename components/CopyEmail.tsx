"use client";

import { useState } from "react";
import { EMAIL } from "@/data/site";

// Copies the address for visitors whose mail app does not open from a link.
export default function CopyEmail({ className = "" }: { className?: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard blocked: the address is visible beside the button anyway
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className={`rounded-full border border-line px-4 py-2 font-mono text-[11px] uppercase tracking-wider text-ink2 transition-colors hover:border-ink2 hover:text-ink ${className}`}
    >
      <span aria-live="polite">{copied ? "Copied" : "Copy email"}</span>
    </button>
  );
}
