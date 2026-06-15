import type { Metadata } from "next";
import { projects } from "@/data/projects";
import ProjectCard from "@/components/ProjectCard";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Brand systems, websites, and marketing creative across healthcare, hospitality, and agency scale.",
};

const eyebrow = { fontFamily: "Georgia, 'Times New Roman', serif" };

export default function WorkPage() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-28 pt-16 sm:pt-24">
      <FadeIn>
        <p className="text-base italic text-accent" style={eyebrow}>
          (selected work)
        </p>
        <h1 className="mt-3 font-heading text-5xl font-extrabold leading-[1.05] tracking-tight text-ink sm:text-7xl">
          Every project.
          <br />
          Full picture.
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink2">
          Brand systems, websites, and marketing creative across healthcare,
          hospitality, and agency scale.
        </p>
      </FadeIn>

      <div className="mt-14 grid gap-8 sm:grid-cols-2">
        {projects.map((project, index) => (
          <FadeIn key={project.id} delay={(index % 2) * 0.08} className="h-full">
            <ProjectCard project={project} />
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
