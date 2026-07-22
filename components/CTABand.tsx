import Link from "next/link";
import { EMAIL, gmailCompose, RESPONSE_PROMISE, CV_URL } from "@/data/site";

// Final conversion band — one calm ask, used at the end of every page.
export default function CTABand({
  heading = "Looking for a senior designer who ships?",
}: {
  heading?: string;
}) {
  return (
    <section className="border-t border-line">
      <div className="mx-auto max-w-6xl px-6 py-24 text-center">
        <h2 className="display mx-auto max-w-2xl text-4xl text-ink sm:text-5xl">
          {heading}
        </h2>
        <p className="mx-auto mt-4 max-w-md text-ink2">
          Hiring, or building something? Either way, tell me — I&apos;ll reply
          with honest thoughts and a clear next step. {RESPONSE_PROMISE}.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href={CV_URL}
            download
            className="rounded-full bg-accent px-7 py-3.5 font-medium text-accent-ink transition-transform hover:scale-[1.03]"
          >
            Download CV
          </a>
          <Link
            href="/contact"
            className="rounded-full border border-line px-7 py-3.5 text-ink2 transition-colors hover:border-ink2 hover:text-ink"
          >
            Start a project
          </Link>
          <a
            href={gmailCompose("Hello from your portfolio")}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs uppercase tracking-wider text-ink2 transition-colors hover:text-accent"
          >
            {EMAIL}
          </a>
        </div>
      </div>
    </section>
  );
}
