"use client";

import { useEffect, useState } from "react";

type Theme = "dark" | "light";

// Dark is the default; choice persists in localStorage ("theme").
// layout.tsx runs an inline script before paint to avoid a flash.
export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const current =
      document.documentElement.dataset.theme === "light" ? "light" : "dark";
    setTheme(current);
  }, []);

  function toggle() {
    const next: Theme = theme === "light" ? "dark" : "light";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      // storage unavailable (private mode) — theme still switches for the session
    }
    setTheme(next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "light" ? "Switch to dark theme" : "Switch to light theme"}
      title={theme === "light" ? "Dark theme" : "Light theme"}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink2 transition-colors hover:border-ink2 hover:text-ink"
    >
      {/* Render both glyphs, CSS-gated, so server and client markup match */}
      <span aria-hidden className="hidden text-base [html[data-theme=light]_&]:inline">
        ☾
      </span>
      <span aria-hidden className="inline text-base [html[data-theme=light]_&]:hidden">
        ☀
      </span>
    </button>
  );
}
