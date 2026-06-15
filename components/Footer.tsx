const EMAIL = "vaugn.studio@gmail.com";
const LINKEDIN_URL = "https://linkedin.com/in/vaugn-almeida";
const LINKEDIN_LABEL = "linkedin.com/in/vaugn-almeida";

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-12 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-heading text-lg font-extrabold text-ink">
            Vaugn<span className="text-accent">.</span>
          </p>
          <p className="mt-1 text-sm text-ink2">
            Brand &amp; Marketing Designer · Remote (GMT+8)
          </p>
        </div>
        <div className="flex flex-col gap-2 text-sm sm:items-end">
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
          <span className="mt-1 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-dim">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Available for work
          </span>
        </div>
      </div>
    </footer>
  );
}
