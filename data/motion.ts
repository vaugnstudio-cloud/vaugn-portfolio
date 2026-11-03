// Motion & video work. Items without `src` render as designed placeholder
// slots; items with `src` play inline. Client pieces come first and play as
// silent web copies (their music is licensed for the client's channels).
// Studio reels are labelled honestly: art direction, prompting and edit
// selection are mine; the footage is made with AI tools.

export interface MotionItem {
  id: string;
  title: string;
  kind: string; // e.g. "Client story · The Hill" | "Studio reel"
  aspect?: "wide" | "square" | "tall" | "reel"; // reel = 9:16
  src?: string; // undefined → designed placeholder slot
  poster?: string;
}

export const motionItems: MotionItem[] = [
  {
    id: "the-hill-wine",
    title: "Seniors Lunch, the wine pour",
    kind: "Client story · The Hill",
    aspect: "reel",
    src: "/videos/the-hill/sl-story-2.mp4",
    poster: "/images/the-hill/sl-story-2-poster.jpg",
  },
  {
    id: "the-hill-lunch",
    title: "Lunch at The Hill",
    kind: "Client story · The Hill",
    aspect: "reel",
    src: "/videos/the-hill/lh-story-1.mp4",
    poster: "/images/the-hill/lh-story-1-poster.jpg",
  },
  {
    id: "augellos-reel",
    title: "Augello's reel",
    kind: "Client reel · Augello's",
    aspect: "reel",
    src: "/videos/augellos-reel.mp4",
    poster: "/images/recent/augellos-reel-poster.jpg",
  },
  {
    id: "tnt-follower-story",
    title: "Modern Mexican, animated story",
    kind: "Client story · Tacos 'N' Tequilas",
    aspect: "reel",
    src: "/videos/tnt-follower-story.mp4",
    poster: "/images/recent/tnt-follower-story-poster.jpg",
  },
  {
    id: "renzos-story",
    title: "Renzo's Bar, animated story",
    kind: "Client story · Renzo's Bar",
    aspect: "reel",
    src: "/videos/renzos-story.mp4",
    poster: "/images/recent/renzos-story-poster.jpg",
  },
  {
    id: "reel-steak",
    title: "Cast iron ribeye",
    kind: "Studio reel",
    aspect: "reel",
    src: "/videos/reel-steak.mp4",
  },
  {
    id: "reel-burger",
    title: "Smash burger",
    kind: "Studio reel",
    aspect: "reel",
    src: "/videos/reel-burger.mp4",
  },
  {
    id: "reel-ramen",
    title: "Tonkotsu ramen",
    kind: "Studio reel",
    aspect: "reel",
    src: "/videos/reel-ramen.mp4",
  },
];
