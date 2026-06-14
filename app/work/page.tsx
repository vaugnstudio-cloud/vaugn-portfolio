import type { Metadata } from "next";
import { projects } from "@/data/projects";
import ProjectCard from "@/components/ProjectCard";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Brand systems, websites, and marketing creative across healthcare, hospitality, and agency scale.",
};

export default function WorkPage() {
  return (
    <section className="mx-auto max-w-6xl px-6 pt-24 pb-24 sm:pt-32">
      <FadeIn>
        <p className="font-mono text-[11px] font-medium uppercase tracking-widest text-blue">
          ▪ Work
        </p>
        <h1 className="mt-4 font-heading text-4xl font-bold text-white sm:text-5xl">
          Every project. Full picture.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-white/70">
          Brand systems, websites, and marketing creative across healthcare,
          hospitality, and agency scale.
        </p>
      </FadeIn>

      {/* All 6 projects — 2-column grid on desktop, 1-column on mobile (Section 6). */}
      <div className="mt-12 grid gap-8 sm:grid-cols-2">
        {projects.map((project, index) => (
          <FadeIn key={project.id} delay={(index % 2) * 0.1} className="h-full">
            <ProjectCard project={project} />
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
