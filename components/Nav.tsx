"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// Contact uses a mailto: link (simplest — Open Questions, Section 10).
const EMAIL = "vaugn.studio@gmail.com";

const links = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
];

const focusRing =
  "rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2 focus-visible:ring-offset-bg";

export default function Nav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/80 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link
          href="/"
          className={`font-heading text-lg font-bold tracking-tight text-white ${focusRing}`}
        >
          Vaugn Almeida
        </Link>
        <div className="flex items-center gap-4 text-sm sm:gap-6">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={`transition-colors hover:text-white ${focusRing} ${
                  isActive ? "text-white" : "text-gray"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <a
            href={`mailto:${EMAIL}`}
            className={`bg-blue px-4 py-2 font-medium text-white transition-transform hover:scale-[1.02] sm:px-5 ${focusRing}`}
          >
            Contact
          </a>
        </div>
      </nav>
    </header>
  );
}
