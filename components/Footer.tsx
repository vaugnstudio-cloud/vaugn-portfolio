import Link from "next/link";
import {
  EMAIL,
  mailto,
  LINKEDIN_URL,
  LINKEDIN_LABEL,
  CV_URL,
  PORTFOLIO_PDF_URL,
  AVAILABILITY,
} from "@/data/site";

const NAV = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
] as const;

const MORE = [
  { href: "/healthcare", label: "For healthcare" },
  { href: "/resources", label: "Resources" },
  { href: "/insights", label: "Insights" },
] as const;

export default function Footer() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto max-w-[1240px] px-5 py-14 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <p className="font-display text-2xl font-semibold tracking-tight text-ink">
              Vaugn Almeida<span className="text-accent">.</span>
            </p>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-ink2">
              Senior Brand &amp; Web Designer. Campaigns, brand guides and
              websites.
            </p>
            <span className="mt-4 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-dim">
              <span className="h-2 w-2 rounded-full bg-accent" aria-hidden />
              {AVAILABILITY}
            </span>
          </div>

          <div className="flex flex-col gap-2 text-sm">
            <p className="eyebrow mb-2">Explore</p>
            {[...NAV, ...MORE].map((l) => (
              <Link key={l.href} href={l.href} className="text-ink2 transition-colors hover:text-ink">
                {l.label}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-2 text-sm">
            <p className="eyebrow mb-2">Contact</p>
            <a href={mailto()} className="text-ink2 transition-colors hover:text-ink">
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
            <a href={CV_URL} download className="text-ink2 transition-colors hover:text-ink">
              CV (PDF)
            </a>
            <a href={PORTFOLIO_PDF_URL} download className="text-ink2 transition-colors hover:text-ink">
              Portfolio (PDF)
            </a>
          </div>
        </div>

        <p className="mt-12 border-t border-line pt-6 text-xs leading-relaxed text-dim">
          © {new Date().getFullYear()} Vaugn Jasper Almeida. Agency work is
          credited to Your SocialChef and shown as my own part of each project.
          Client brands, logos and photography belong to their owners.
        </p>
      </div>
    </footer>
  );
}
