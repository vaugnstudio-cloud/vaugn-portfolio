"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/components/ThemeToggle";
import { CV_URL } from "@/data/site";

const LINKS = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
] as const;

export default function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/85 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link
          href="/"
          className="font-display text-xl tracking-tight text-ink"
          onClick={() => setOpen(false)}
        >
          Vaugn<span className="text-accent">.</span>
        </Link>

        <div className="hidden items-center gap-8 text-sm text-ink2 sm:flex">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`transition-colors hover:text-ink ${
                pathname.startsWith(l.href) ? "text-ink" : ""
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <a
            href={CV_URL}
            download
            className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-ink transition-transform hover:scale-[1.03]"
            onClick={() => setOpen(false)}
          >
            Download CV
          </a>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink2 sm:hidden"
          >
            <span aria-hidden className="text-lg leading-none">
              {open ? "×" : "≡"}
            </span>
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-line bg-bg sm:hidden">
          <div className="mx-auto flex max-w-6xl flex-col px-6 py-4">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="border-b border-line py-4 text-lg text-ink last:border-b-0"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
