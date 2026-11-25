import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import CopyEmail from "@/components/CopyEmail";
import IndustryChips from "@/components/business/IndustryChips";
import IndustryExplorer from "@/components/business/IndustryExplorer";
import ServiceExplorer from "@/components/business/ServiceExplorer";
import CompareOptions from "@/components/business/CompareOptions";
import RequestBuilder from "@/components/business/RequestBuilder";
import Icon from "@/components/business/Icon";
import { CustomerJourney, MonthOfPosts, OneIdeaEverySize, TimelineChart } from "@/components/business/Visuals";
import { BUSINESS_FAQS, INDUSTRIES, SERVICES } from "@/data/business";
import { EMAIL, RESPONSE_PROMISE, mailto } from "@/data/site";

export const metadata: Metadata = {
  title: "For your business",
  description:
    "Websites, social media, posters, ads and branding for clinics, dental, med spas, gyms, restaurants, real estate, trades and startups. One friendly designer, agency quality, a written quote first.",
  alternates: { canonical: "/for-business" },
};

const PROMISES = [
  { icon: "pointer", k: "One person", v: "You talk to the designer doing the work." },
  { icon: "shield", k: "Agency quality", v: "Senior designer at an Australian agency." },
  { icon: "brand", k: "Everything matches", v: "Site, posts, posters and ads in one look." },
  { icon: "check", k: "Quote first", v: "One clear price before any work starts." },
] as const;

// Section heading used down the page: big title left, one short line right.
function Heading({ eyebrow, title, line }: { eyebrow: string; title: React.ReactNode; line: string }) {
  return (
    <FadeIn>
      <div className="mb-10 grid gap-4 lg:mb-12 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="display mt-3 text-[clamp(2.4rem,5vw,4.2rem)] text-ink">{title}</h2>
        </div>
        <p className="max-w-md text-lg leading-snug text-ink2 lg:col-span-5">{line}</p>
      </div>
    </FadeIn>
  );
}

export default function ForBusinessPage() {
  return (
    <>
      {/* ═══ Header ═══ */}
      <section className="mx-auto max-w-[1240px] px-5 pb-16 pt-12 sm:px-8 sm:pt-16 lg:pb-20">
        <FadeIn>
          <div className="flex flex-col gap-2 border-b border-line pb-4 font-mono text-[11px] uppercase tracking-[0.12em] text-dim sm:flex-row sm:items-center sm:justify-between">
            <span>For business owners</span>
            <span>{INDUSTRIES.length} industries · {SERVICES.length} services · 1 designer</span>
            <span className="inline-flex items-center gap-2 text-ink2">
              <span className="h-2 w-2 rounded-full bg-accent" aria-hidden />
              Taking select projects
            </span>
          </div>
        </FadeIn>
        <div className="mt-10 grid gap-10 lg:mt-14 lg:grid-cols-12">
          <FadeIn delay={0.05} className="lg:col-span-8">
            <h1 className="display text-[clamp(3rem,8vw,6.5rem)] leading-[0.92] text-ink">
              Good design brings you <em>more customers</em>.
            </h1>
          </FadeIn>
          <FadeIn delay={0.1} className="lg:col-span-4 lg:self-end">
            <p className="text-xl leading-snug text-ink2">
              Hi, I&apos;m Vaugn. I make websites, social posts, posters and
              ads that help small businesses look great and get booked.
            </p>
          </FadeIn>
        </div>
        <FadeIn delay={0.15} className="mt-10">
          <p className="eyebrow mb-3">What kind of business do you run?</p>
          <IndustryChips />
        </FadeIn>
      </section>

      {/* ═══ Promises ═══ */}
      <section className="border-t border-line bg-surface">
        <div className="mx-auto max-w-[1240px] px-5 py-10 sm:px-8">
          <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {PROMISES.map((p, i) => (
              <FadeIn key={p.k} delay={i * 0.05} className="bg-bg">
                <div className="flex h-full items-start gap-4 p-6">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent/10 text-accent">
                    <Icon name={p.icon} className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-semibold tracking-tight text-ink">{p.k}</h3>
                    <p className="mt-1 text-[15px] leading-snug text-ink2">{p.v}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ How design brings customers ═══ */}
      <section className="border-t border-line">
        <div className="mx-auto max-w-[1240px] px-5 py-16 sm:px-8 lg:py-24">
          <Heading
            eyebrow="Why design matters"
            title={<>From <em>stranger</em> to customer</>}
            line="Before anyone buys, they look you up. Here is where design does its quiet work."
          />
          <FadeIn>
            <CustomerJourney />
          </FadeIn>
        </div>
      </section>

      {/* ═══ Industry explorer ═══ */}
      <section id="industries" className="scroll-mt-16 border-t border-line bg-surface">
        <div className="mx-auto max-w-[1240px] px-5 py-16 sm:px-8 lg:py-24">
          <Heading
            eyebrow="By industry"
            title={<>Made for <em>your</em> kind of business</>}
            line="Pick your industry to see what I would make and how it helps. Each one has its own link to share."
          />
          <IndustryExplorer />
        </div>
      </section>

      {/* ═══ Services ═══ */}
      <section id="services" className="scroll-mt-16 border-t border-line">
        <div className="mx-auto max-w-[1240px] px-5 py-16 sm:px-8 lg:py-24">
          <Heading
            eyebrow="What I do"
            title={<>Five things, <em>done well</em></>}
            line="Pick one, or let me handle all of it so everything matches."
          />
          <ServiceExplorer />
        </div>
      </section>

      {/* ═══ Samples ═══ */}
      <section className="border-t border-line bg-surface">
        <div className="mx-auto max-w-[1240px] px-5 py-16 sm:px-8 lg:py-24">
          <Heading
            eyebrow="See it in action"
            title={<>Real work, <em>real campaigns</em></>}
            line="Two quick examples from my agency work, so you can picture it for your business."
          />
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-14">
            <FadeIn>
              <p className="font-display text-2xl font-semibold tracking-tight text-ink">One idea, every size</p>
              <p className="mb-5 mt-1 text-ink2">Feed, story and Google, all from one campaign.</p>
              <OneIdeaEverySize />
            </FadeIn>
            <FadeIn delay={0.08}>
              <p className="font-display text-2xl font-semibold tracking-tight text-ink">Your posts, planned ahead</p>
              <p className="mb-5 mt-1 text-ink2">You approve the plan once. I handle the rest.</p>
              <MonthOfPosts />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══ Timeline ═══ */}
      <section className="border-t border-line">
        <div className="mx-auto max-w-[1240px] px-5 py-16 sm:px-8 lg:py-24">
          <Heading
            eyebrow="How long it takes"
            title={<>Faster than <em>you think</em></>}
            line="Rough times for most projects. You approve every step along the way."
          />
          <FadeIn>
            <TimelineChart />
          </FadeIn>
        </div>
      </section>

      {/* ═══ Compare ═══ */}
      <section className="border-t border-line bg-surface">
        <div className="mx-auto max-w-[1240px] px-5 py-16 sm:px-8 lg:py-24">
          <Heading
            eyebrow="Why me"
            title={<>Agency quality, <em>without the agency</em></>}
            line="Here is how working with me compares with the other options."
          />
          <FadeIn>
            <CompareOptions />
          </FadeIn>
        </div>
      </section>

      {/* ═══ Request builder ═══ */}
      <section id="start" className="scroll-mt-16 border-t border-line">
        <div className="mx-auto max-w-[1240px] px-5 py-16 sm:px-8 lg:py-24">
          <Heading
            eyebrow="Let's start"
            title={<>Tell me what you need in <em>30 seconds</em></>}
            line={`Tap a few options and send. ${RESPONSE_PROMISE}, with ideas and a quote.`}
          />
          <RequestBuilder />
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section className="border-t border-line bg-surface">
        <div className="mx-auto max-w-[1240px] px-5 py-16 sm:px-8 lg:py-24">
          <Heading eyebrow="Good questions" title="Before you ask" line="The things most business owners want to know." />
          <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2">
            {BUSINESS_FAQS.map((f) => (
              <details key={f.q} className="group bg-bg p-6 open:bg-surface">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-display text-xl font-semibold tracking-tight text-ink group-open:text-accent">
                  {f.q}
                  <span aria-hidden className="font-mono text-lg text-dim transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-[17px] leading-relaxed text-ink2">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Close ═══ */}
      <section className="border-t border-line">
        <div className="mx-auto max-w-[1240px] px-5 py-16 sm:px-8 lg:py-24">
          <FadeIn>
            <p className="eyebrow">Ready when you are</p>
            <h2 className="display mt-3 max-w-4xl text-[clamp(2.6rem,6vw,5rem)] text-ink">
              Let&apos;s make your business look <em>as good as it is</em>.
            </h2>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={mailto("Design help for my business")}
                className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 font-medium text-accent-ink transition-opacity hover:opacity-90"
              >
                Email {EMAIL} <span aria-hidden>→</span>
              </a>
              <CopyEmail />
              <Link href="/work" className="px-2 text-ink2 underline decoration-line underline-offset-4 hover:text-ink">
                See all my work
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
