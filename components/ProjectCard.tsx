"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Project } from "@/data/projects";

export default function ProjectCard({ project }: { project: Project }) {
  // Auto-swap: render the real cover when present in /public/images; until then
  // (e.g. ACEF, InBloom) the image 404s and we fall back to the placeholder.
  const [imageOk, setImageOk] = useState(true);

  return (
    <motion.article
      whileHover={{ scale: 1.015 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-surface transition-colors hover:border-gray"
    >
      <Link
        href="/work"
        className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue"
      >
        <div className="relative aspect-[3/2] w-full overflow-hidden bg-gradient-to-br from-[#1d1d1d] to-[#0f0f0f]">
          {imageOk ? (
            <Image
              src={project.coverImage}
              alt={`${project.title} — project cover`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 384px"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              onError={() => setImageOk(false)}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <span className="font-mono text-[10px] uppercase tracking-widest text-gray">
                {project.coverImage}
              </span>
            </div>
          )}
        </div>
        <div className="flex flex-col p-6">
          <p className="font-mono text-xs font-medium uppercase tracking-wider text-blue">
            {project.category.join(" · ")}
          </p>
          <h3 className="mt-3 font-heading text-xl font-semibold text-white">
            {project.title}
          </h3>
          <p className="mt-1 text-sm text-gray">
            {project.client} · {project.year}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-white/70">
            {project.headline}
          </p>
        </div>
      </Link>
      {project.url && (
        <div className="mt-auto px-6 pb-6">
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded font-mono text-xs font-medium uppercase tracking-wider text-blue transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue"
          >
            Visit live site ↗
          </a>
        </div>
      )}
    </motion.article>
  );
}
