// Motion & video work — gated like INTRO_VIDEO_SRC in data/site.ts.
// Items without `src` render as designed placeholder slots ("in production").
// Drop a real file into /public/videos/ and set `src` (+ optional `poster`)
// to make a slot go live. Honesty rule: nothing fake ships — slots stay
// placeholders until a piece passes the quality bar.

export interface MotionItem {
  id: string;
  title: string;
  kind: string; // e.g. "REEL" | "BRAND ANIMATION" | "UI MOTION"
  aspect?: "wide" | "square" | "tall"; // default "wide"
  src?: string; // undefined → designed placeholder slot
  poster?: string;
}

export const MOTION_STATUS = "in-production" as const;

export const motionItems: MotionItem[] = [
  {
    id: "studio-reel",
    title: "Vaugn Studio — project reel",
    kind: "REEL",
    aspect: "wide",
  },
  {
    id: "brand-motion",
    title: "Brand reveal — identity in motion",
    kind: "BRAND ANIMATION",
    aspect: "square",
  },
  {
    id: "ui-motion",
    title: "Product UI — interaction studies",
    kind: "UI MOTION",
    aspect: "square",
  },
];
