import Link from "next/link";
import { EMAIL, LINKEDIN_URL, LINKEDIN_LABEL, FORMSPREE_ID } from "@/data/site";
import EmailCapture from "@/components/EmailCapture";

const NAV = [
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

const NICHES = [
  { href: "/healthcare", label: "For healthcare" },
  { href: "/hospitality", label: "For hospitality" },
  { href: "/resources", label: "Resources" },
] as const;

export default function Footer() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <p className="font-display text-2xl text-ink">
              Vaugn<span className="text-accent">.</span>
            </p>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-ink2">
              Independent brand &amp; web designer for healthcare, hospitality,
              and growth businesses.
            </p>
            <span className="mt-4 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-dim">
              <span className="h-2 w-2 rounded-full bg-accent" />
              Available for new projects
            </span>
          </div>

          <div className="flex flex-col gap-2 text-sm">
            <p className="eyebrow mb-2">Explore</p>
            {NAV.map((l) => (
              <Link key={l.href} href={l.href} className="text-ink2 transition-colors hover:text-ink">
                {l.label}
              </Link>
            ))}
            {NICHES.map((l) => (
              <Link key={l.href} href={l.href} className="text-ink2 transition-colors hover:text-ink">
                {l.label}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-2 text-sm">
            <p className="eyebrow mb-2">Contact</p>
            <a href={`mailto:${EMAIL}`} className="text-ink2 transition-colors hover:text-ink">
              {EMAIL}
            </a>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink2 transition-colors hover:text-ink"
            >
              {LINKEDIN_LABEL}
            </a>
            {FORMSPREE_ID && <EmailCapture />}
          </div>
        </div>

        <p className="mt-12 border-t border-line pt-6 text-xs text-dim">
          © {new Date().getFullYear()} Vaugn Jasper Almeida. All work shown was
          created by me; agency projects credited where applicable.
        </p>
      </div>
    </footer>
  );
}
