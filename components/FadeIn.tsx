import type { CSSProperties, ReactNode } from "react";

// Scroll reveal — progressive enhancement only.
// The server renders content fully visible (no-JS, crawlers, and pre-hydration
// all see everything). A tiny inline script in layout.tsx adds `js` to <html>
// and drives an IntersectionObserver that toggles `.in`; the animation styles
// in globals.css apply only under `html.js`, so JS enhances the entrance but
// never controls visibility. Reduced-motion users get no movement at all.
export default function FadeIn({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <div
      data-fadein
      className={className}
      style={
        delay ? ({ "--fd": `${delay}s` } as CSSProperties) : undefined
      }
    >
      {children}
    </div>
  );
}
