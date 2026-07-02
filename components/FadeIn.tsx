"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

// Subtle scroll reveal — fade up only.
// Respects prefers-reduced-motion: content appears instantly, no movement.
// The initial style must be identical on server and client (the server can't
// know the motion preference), so only the transition varies — this avoids
// hydration mismatches for reduced-motion users.
export default function FadeIn({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      data-fadein
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={
        shouldReduceMotion
          ? { duration: 0 }
          : { duration: 0.6, delay, ease: "easeOut" }
      }
    >
      {children}
    </motion.div>
  );
}
