// Motion & video work. Items without `src` render as designed placeholder
// slots; items with `src` play inline. Honesty rule: AI-assisted pieces are
// labelled as such — art direction, prompting, and edit selection are mine.

export interface MotionItem {
  id: string;
  title: string;
  kind: string; // e.g. "F&B REEL" | "BRAND ANIMATION" | "UI MOTION"
  aspect?: "wide" | "square" | "tall" | "reel"; // reel = 9:16
  src?: string; // undefined → designed placeholder slot
  poster?: string;
}

export const motionItems: MotionItem[] = [
  {
    id: "tnt-birria-story",
    title: "Sunday Birria Night — story",
    kind: "Client campaign story · Tacos 'N' Tequilas",
    aspect: "reel",
    src: "/videos/tnt-birria-story.mp4",
    poster: "/images/tnt/story-poster.jpg",
  },
  {
    id: "reel-steak",
    title: "Cast-iron ribeye",
    kind: "F&B appetite reel",
    aspect: "reel",
    src: "/videos/reel-steak.mp4",
  },
  {
    id: "reel-burger",
    title: "Smash burger",
    kind: "F&B appetite reel",
    aspect: "reel",
    src: "/videos/reel-burger.mp4",
  },
  {
    id: "reel-ramen",
    title: "Tonkotsu ramen",
    kind: "F&B appetite reel",
    aspect: "reel",
    src: "/videos/reel-ramen.mp4",
  },
  {
    id: "reel-coldbrew",
    title: "Cold brew",
    kind: "F&B appetite reel",
    aspect: "reel",
    src: "/videos/reel-coldbrew.mp4",
  },
];
