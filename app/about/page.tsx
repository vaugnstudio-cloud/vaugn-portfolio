import type { Metadata } from "next";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "About",
  description:
    "Agency-trained, healthcare-fluent Brand & Web Designer. Brand design, web design, and marketing creative.",
};

const EMAIL = "vaugn.studio@gmail.com";
const LINKEDIN_URL = "https://linkedin.com/in/vaugn-almeida";
const LINKEDIN_LABEL = "linkedin.com/in/vaugn-almeida";

const services = [
  {
    title: "Brand Design",
    description:
      "Identity systems, visual language, and brand guidelines — built for businesses that want to be recognized immediately and trusted fast.",
    deliverables:
      "Logo suite · Color & type system · Brand guidelines · Social templates",
  },
  {
    title: "Web Design",
    description:
      "Figma and Framer websites designed for conversion — clean hierarchy, strong visual identity, and mobile-first from the first frame.",
    deliverables:
      "UI design in Figma · Framer build · Responsive layout · Basic SEO setup",
  },
  {
    title: "Marketing Creative",
    description:
      "Social media systems, ad creative, print collateral, and campaign visuals — at agency production speed without the agency overhead.",
    deliverables:
      "Social templates · Ad creative · Brochures & print · Pitch decks",
  },
];

const tools = [
  {
    heading: "Design & Web",
    items:
      "Figma · Framer · Adobe Photoshop · Illustrator · InDesign · After Effects · Premiere Pro · Lightroom",
  },
  {
    heading: "AI-Enhanced Workflow",
    items:
      "Adobe Firefly · Photoshop Generative AI · Magnific AI · Higgsfield AI · ChatGPT · Claude AI",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Bio */}
      <section className="mx-auto max-w-6xl px-6 pt-24 pb-16 sm:pt-32">
        <FadeIn>
          <p className="font-mono text-[11px] font-medium uppercase tracking-widest text-blue">
            ▪ About
          </p>
          <h1 className="mt-4 max-w-4xl font-heading text-4xl font-bold leading-tight text-white sm:text-5xl">
            The designer who understands how the business works — not just how
            the brand should look.
          </h1>
          <div className="mt-8 max-w-2xl space-y-6 text-lg leading-relaxed text-white/70">
            <p>
              I design brands and websites that help businesses look like they
              belong in the premium tier of their industry.
            </p>
            <p>
              With 4+ years of agency experience across Australian, American,
              and European clients, I combine brand strategy, Figma and Framer
              web design, and AI-enhanced creative workflows to deliver visual
              systems that build credibility, attract better clients, and
              convert.
            </p>
            <p>
              My background is uncommon for a designer. I&apos;ve managed
              healthcare revenue cycles — which means I speak the language of
              medical billing, clinical credibility, and compliance-aware design
              without the onboarding gap. That makes me a faster and more
              valuable creative partner for healthcare clients.
            </p>
          </div>
        </FadeIn>
      </section>

      {/* Services */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <FadeIn>
          <p className="font-mono text-[11px] font-medium uppercase tracking-widest text-blue">
            ▪ Services
          </p>
          <h2 className="mt-4 font-heading text-4xl font-bold text-white sm:text-5xl">
            What I do.
          </h2>
        </FadeIn>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {services.map((service, index) => (
            <FadeIn key={service.title} delay={index * 0.1} className="h-full">
              <article className="flex h-full flex-col rounded-lg border border-border bg-surface p-8">
                <h3 className="font-heading text-xl font-semibold text-white">
                  {service.title}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-white/70">
                  {service.description}
                </p>
                <p className="mt-6 font-mono text-xs leading-relaxed text-gray">
                  {service.deliverables}
                </p>
              </article>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Tools & Workflow */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <FadeIn>
          <p className="font-mono text-[11px] font-medium uppercase tracking-widest text-blue">
            ▪ Tools &amp; Workflow
          </p>
        </FadeIn>
        <div className="mt-8 grid gap-8 sm:grid-cols-2">
          {tools.map((group, index) => (
            <FadeIn key={group.heading} delay={index * 0.1}>
              <div className="rounded-lg border border-border bg-surface p-8">
                <h3 className="font-heading text-lg font-semibold text-white">
                  {group.heading}
                </h3>
                <p className="mt-4 leading-relaxed text-white/70">
                  {group.items}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
          <FadeIn>
            <p className="font-mono text-[11px] font-medium uppercase tracking-widest text-blue">
              ▪ Contact
            </p>
            <h2 className="mt-4 font-heading text-4xl font-bold text-white sm:text-5xl">
              Let&apos;s build something.
            </h2>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a
                href={`mailto:${EMAIL}`}
                className="inline-flex items-center justify-center rounded-full bg-blue px-6 py-3 text-sm font-medium text-white transition-transform hover:scale-[1.02]"
              >
                {EMAIL}
              </a>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-border px-6 py-3 text-sm font-medium text-white transition-colors hover:border-gray"
              >
                {LINKEDIN_LABEL}
              </a>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
