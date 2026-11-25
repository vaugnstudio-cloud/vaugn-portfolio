"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/components/ThemeToggle";
import { CV_URL } from "@/data/site";

const LINKS = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/for-business", label: "For business" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
] as const;

export default function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/90 backdrop-blur">
      <nav aria-label="Main" className="mx-auto flex h-16 max-w-[1240px] items-center justify-between px-5 sm:px-8">
        <Link
          href="/"
          className="font-display text-lg font-semibold tracking-tight text-ink"
          onClick={() => setOpen(false)}
        >
          Vaugn Almeida<span className="text-accent">.</span>
        </Link>

        <div className="hidden items-center gap-8 text-[15px] text-ink2 sm:flex">
          {LINKS.map((l) => {
            const active = pathname.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={active ? "page" : undefined}
                className={`transition-colors hover:text-ink ${
                  active ? "text-ink underline decoration-accent decoration-2 underline-offset-[6px]" : ""
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-2.5">
          <ThemeToggle />
          <a
            href={CV_URL}
            download
            className="hidden rounded-full bg-ink px-4 py-2.5 text-sm font-medium text-bg transition-colors hover:bg-accent hover:text-accent-ink sm:inline-block"
            onClick={() => setOpen(false)}
          >
            Download CV
          </a>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink sm:hidden"
          >
            <span aria-hidden className="text-lg leading-none">
              {open ? "×" : "≡"}
            </span>
          </button>
        </div>
      </nav>

      {open && (
        <div id="mobile-menu" className="border-t border-line bg-bg sm:hidden">
          <div className="mx-auto flex max-w-[1240px] flex-col px-5 py-3">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="border-b border-line py-4 font-display text-2xl font-semibold tracking-tight text-ink"
              >
                {l.label}
              </Link>
            ))}
            <a
              href={CV_URL}
              download
              onClick={() => setOpen(false)}
              className="mt-4 mb-2 rounded-full bg-ink px-5 py-3 text-center font-medium text-bg"
            >
              Download CV
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
