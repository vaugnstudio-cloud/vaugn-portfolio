"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

// Subtle scroll reveal — fade up only (Section 12 / Phase 5: keep subtle).
// Respects prefers-reduced-motion: content appears instantly, no movement.
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
      className={className}
      initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
