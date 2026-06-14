"use client";

import { motion } from "framer-motion";

const EMAIL = "vaugn.studio@gmail.com";

// Contact CTA strip — bottom of Home, above footer (Section 6).
export default function ContactCTA() {
  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p className="font-mono text-[11px] font-medium uppercase tracking-widest text-blue">
            ▪ Let&apos;s Work Together
          </p>
          <h2 className="mt-4 max-w-2xl font-heading text-4xl font-bold leading-tight text-white sm:text-5xl">
            Ready to build something worth showing?
          </h2>
          <p className="mt-6 max-w-xl text-lg text-white/70">
            Available for brand, web, and healthcare design projects. Remote.
            Fast. Built to convert.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <a
              href={`mailto:${EMAIL}`}
              className="inline-flex items-center justify-center rounded-full bg-blue px-6 py-3 text-sm font-medium text-white transition-transform hover:scale-[1.02]"
            >
              Start a Project →
            </a>
            <a
              href={`mailto:${EMAIL}`}
              className="text-sm text-gray transition-colors hover:text-white"
            >
              {EMAIL}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
