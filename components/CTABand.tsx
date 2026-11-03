import Link from "next/link";
import { EMAIL, mailto, RESPONSE_PROMISE, CV_URL } from "@/data/site";
import CopyEmail from "@/components/CopyEmail";

// Closing band: one calm ask, used at the end of most pages.
export default function CTABand({
  heading = "Looking for a senior designer?",
}: {
  heading?: string;
}) {
  return (
    <section className="border-t border-line bg-surface">
      <div className="mx-auto max-w-[1240px] px-5 py-20 sm:px-8">
        <h2 className="display max-w-3xl text-4xl text-ink sm:text-5xl">{heading}</h2>
        <p className="mt-4 max-w-md text-ink2">
          Hiring, or planning a project? Send me a short note and I&apos;ll
          reply with a clear next step. {RESPONSE_PROMISE}.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a
            href={CV_URL}
            download
            className="rounded-full bg-ink px-6 py-3 font-medium text-bg transition-colors hover:bg-accent hover:text-accent-ink"
          >
            Download CV
          </a>
          <Link
            href="/contact"
            className="rounded-full border border-ink/70 px-6 py-3 font-medium text-ink transition-colors hover:bg-ink hover:text-bg"
          >
            Contact
          </Link>
          <a
            href={mailto("Hello from your portfolio")}
            className="px-2 text-ink2 underline decoration-line underline-offset-4 hover:text-ink"
          >
            {EMAIL}
          </a>
          <CopyEmail />
        </div>
      </div>
    </section>
  );
}
