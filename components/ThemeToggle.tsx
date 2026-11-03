"use client";

// Light is the default; dark persists in localStorage ("theme").
// layout.tsx runs an inline script before paint to avoid a flash.
// Stateless: the current theme is read from the DOM at click time, and the
// visible glyph is CSS-gated on html[data-theme] so server and client always
// match. The accessible name stays stable, so screen readers hear one control.
export default function ThemeToggle() {
  function toggle() {
    const next =
      document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    if (next === "dark") {
      document.documentElement.dataset.theme = "dark";
    } else {
      delete document.documentElement.dataset.theme;
    }
    try {
      localStorage.setItem("theme", next);
    } catch {
      // storage unavailable (private mode): theme still switches for the session
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle light or dark theme"
      title="Toggle theme"
      className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink2 transition-colors hover:border-ink2 hover:text-ink"
    >
      {/* Render both glyphs, CSS-gated, so server and client markup match */}
      <span aria-hidden className="hidden text-base [html[data-theme=dark]_&]:inline">
        ☀
      </span>
      <span aria-hidden className="inline text-base [html[data-theme=dark]_&]:hidden">
        ☾
      </span>
    </button>
  );
}
