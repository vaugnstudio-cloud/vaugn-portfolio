import Link from "next/link";

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 bg-bg/80 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link
          href="/"
          className="font-heading text-lg font-extrabold tracking-tight text-ink"
        >
          Vaugn<span className="text-accent">.</span>
        </Link>
        <div className="hidden gap-8 text-sm text-ink2 sm:flex">
          <Link href="/work" className="transition-colors hover:text-ink">
            Work
          </Link>
          <Link href="/about" className="transition-colors hover:text-ink">
            About
          </Link>
        </div>
        <Link
          href="/contact"
          className="rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-cream transition-transform hover:scale-[1.03]"
        >
          Contact
        </Link>
      </nav>
    </header>
  );
}
