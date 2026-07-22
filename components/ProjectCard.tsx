"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Project } from "@/data/projects";

function Cover({ project }: { project: Project }) {
  const [imageOk, setImageOk] = useState(true);

  if (project.coverImage && imageOk) {
    return (
      <Image
        src={project.coverImage}
        alt={`${project.title} — project cover`}
        fill
        sizes="(max-width: 768px) 100vw, 560px"
        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        onError={() => setImageOk(false)}
      />
    );
  }

  // Designed placeholder cover — keeps scaffolded projects looking intentional.
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-raised">
      <span className="font-display text-3xl italic text-ink2">{project.title}</span>
      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-dim">
        {project.category[0]}
      </span>
    </div>
  );
}

const BADGE: Record<Project["type"], string> = {
  "case-study": "View case study",
  product: "View product",
  branding: "View branding",
  "graphic-design": "View work",
  project: "View project",
};

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/work/${project.id}`} className="block h-full">
      <motion.article
        whileHover={{ y: -5 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface"
      >
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-raised">
          <Cover project={project} />
          <span className="absolute right-4 top-4 rounded-full bg-bg/80 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-ink backdrop-blur transition-colors group-hover:bg-accent group-hover:text-accent-ink">
            {BADGE[project.type]} →
          </span>
        </div>
        <div className="flex flex-1 flex-col p-7">
          <p className="font-mono text-[11px] font-medium uppercase tracking-wider text-accent">
            {project.category.join(" · ")}
          </p>
          <h3 className="mt-3 font-display text-2xl text-ink">{project.title}</h3>
          <p className="mt-1 text-sm text-dim">
            {project.client} · {project.year}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-ink2">{project.headline}</p>
          {project.url && (
            <p className="mt-5 font-mono text-[11px] font-medium uppercase tracking-wider text-accent">
              Live site available ↗
            </p>
          )}
        </div>
      </motion.article>
    </Link>
  );
}
