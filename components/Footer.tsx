// Footer: Name · Email · LinkedIn · "Available for freelance" status (Section 4).
const EMAIL = "vaugn.studio@gmail.com";
const LINKEDIN_URL = "https://linkedin.com/in/vaugn-almeida";
const LINKEDIN_LABEL = "linkedin.com/in/vaugn-almeida";

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-12 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-heading font-bold text-white">Vaugn Almeida</p>
          <p className="mt-1 text-sm text-gray">Brand &amp; Web Designer · Remote</p>
        </div>
        <div className="flex flex-col gap-2 text-sm sm:items-end">
          <a
            href={`mailto:${EMAIL}`}
            className="text-white/70 transition-colors hover:text-white"
          >
            {EMAIL}
          </a>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/70 transition-colors hover:text-white"
          >
            {LINKEDIN_LABEL}
          </a>
          <span className="mt-1 inline-flex items-center gap-2 text-gray">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Available for freelance
          </span>
        </div>
      </div>
    </footer>
  );
}
