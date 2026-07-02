import Link from "next/link";
import { EMAIL, RESPONSE_PROMISE } from "@/data/site";

// Final conversion band — one calm ask, used at the end of every page.
export default function CTABand({
  heading = "Have a project in mind?",
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
          Tell me what you&apos;re building — I&apos;ll reply with honest
          thoughts and a clear next step. {RESPONSE_PROMISE}.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/contact"
            className="rounded-full bg-accent px-7 py-3.5 font-medium text-accent-ink transition-transform hover:scale-[1.03]"
          >
            Start a project
          </Link>
          <a
            href={`mailto:${EMAIL}`}
            className="rounded-full border border-line px-7 py-3.5 text-ink2 transition-colors hover:border-ink2 hover:text-ink"
          >
            {EMAIL}
          </a>
        </div>
      </div>
    </section>
  );
}
