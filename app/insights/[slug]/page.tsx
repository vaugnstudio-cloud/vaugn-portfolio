import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import FadeIn from "@/components/FadeIn";
import CTABand from "@/components/CTABand";
import { insights, getInsight } from "@/data/insights";

export function generateStaticParams() {
  return insights.map((i) => ({ slug: i.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getInsight(slug);
  if (!post) return {};
  return { title: post.title, description: post.summary };
}

const dateFmt = new Intl.DateTimeFormat("en-AU", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export default async function InsightPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getInsight(slug);
  if (!post) notFound();

  return (
    <>
      <article className="mx-auto max-w-6xl px-6 pb-24 pt-16 sm:pt-24">
        <FadeIn>
          <p className="font-mono text-[11px] font-medium uppercase tracking-wider text-accent">
            {post.kicker} · {post.readMinutes} min read
          </p>
          <h1 className="display mt-4 max-w-3xl text-4xl text-ink sm:text-6xl">
            {post.title}
          </h1>
          <p className="mt-4 text-sm text-dim">
            Vaugn Jasper Almeida · {dateFmt.format(new Date(post.date))}
          </p>
        </FadeIn>

        <FadeIn className="mt-14">
          <div className="flex max-w-[68ch] flex-col gap-7">
            {post.paragraphs.map((para) => (
              <p key={para.slice(0, 40)} className="text-lg leading-[1.8] text-ink2">
                {para}
              </p>
            ))}
          </div>
        </FadeIn>

        <FadeIn className="mt-16 border-t border-line pt-8">
          <Link
            href="/insights"
            className="font-mono text-xs uppercase tracking-wider text-ink2 transition-colors hover:text-accent"
          >
            ← All insights
          </Link>
        </FadeIn>
      </article>

      <CTABand heading="Want this thinking on your project?" />
    </>
  );
}
