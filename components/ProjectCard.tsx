"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Project } from "@/data/projects";

export default function ProjectCard({ project }: { project: Project }) {
  const [imageOk, setImageOk] = useState(true);

  return (
    <motion.article
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="group flex h-full flex-col overflow-hidden rounded-[24px] border border-line bg-cream"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#e3e0d8]">
        {imageOk ? (
          <Image
            src={project.coverImage}
            alt={`${project.title} — project cover`}
            fill
            sizes="(max-width: 768px) 100vw, 520px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setImageOk(false)}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="font-mono text-[10px] uppercase tracking-widest text-dim">
              {project.coverImage}
            </span>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-7">
        <p className="font-mono text-[11px] font-medium uppercase tracking-wider text-accent">
          {project.category.join(" · ")}
        </p>
        <h3 className="mt-3 font-heading text-2xl font-bold text-ink">{project.title}</h3>
        <p className="mt-1 text-sm text-dim">
          {project.client} · {project.year}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-ink2">{project.headline}</p>
        {project.url && (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-block font-mono text-[11px] font-medium uppercase tracking-wider text-accent transition-opacity hover:opacity-70"
          >
            Visit live site ↗
          </a>
        )}
      </div>
    </motion.article>
  );
}
