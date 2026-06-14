import Link from "next/link";
import { projects } from "@/data/projects";
import ProjectCard from "@/components/ProjectCard";
import ContactCTA from "@/components/ContactCTA";
import FadeIn from "@/components/FadeIn";

const EMAIL = "vaugn.studio@gmail.com";

export default function Home() {
  const featured = projects.filter((project) => project.featured);

  return (
    <>
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pt-24 pb-16 sm:pt-32">
        <FadeIn>
          <p className="font-mono text-[11px] font-medium uppercase tracking-widest text-blue">
            Brand &amp; Web Designer
          </p>
          <h1 className="mt-6 max-w-4xl font-heading text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-7xl">
            Visual systems that build credibility and convert.
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-white/70 sm:text-xl">
            Agency-trained. Healthcare-fluent. AI-enhanced. I design brands and
            websites for businesses that want to look like they belong in the
            premium tier of their industry.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/work"
              className="inline-flex items-center justify-center rounded-full bg-blue px-6 py-3 text-sm font-medium text-white transition-transform hover:scale-[1.02]"
            >
              View My Work →
            </Link>
            <a
              href={`mailto:${EMAIL}`}
              className="inline-flex items-center justify-center rounded-full border border-border px-6 py-3 text-sm font-medium text-white transition-colors hover:border-gray"
            >
              Get In Touch
            </a>
          </div>
        </FadeIn>
      </section>

      {/* Featured work */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <FadeIn>
          <p className="font-mono text-[11px] font-medium uppercase tracking-widest text-blue">
            ▪ Selected Work
          </p>
          <h2 className="mt-4 font-heading text-4xl font-bold text-white sm:text-5xl">
            Projects that moved the needle.
          </h2>
        </FadeIn>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {featured.map((project, index) => (
            <FadeIn key={project.id} delay={index * 0.1} className="h-full">
              <ProjectCard project={project} />
            </FadeIn>
          ))}
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
