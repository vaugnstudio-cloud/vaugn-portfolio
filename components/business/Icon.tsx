import type { IndustryIcon, ServiceId } from "@/data/business";

// Small line icons for the For business page. Stroke uses currentColor so
// they follow the theme. Hand drawn on a 24 grid, no icon library needed.
export type IconName = IndustryIcon | ServiceId | "eye" | "shield" | "pointer" | "check" | "chevron" | "arrow-left" | "arrow-right";

const PATHS: Record<IconName, React.ReactNode> = {
  medical: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="4" />
      <path d="M12 8v8M8 12h8" />
    </>
  ),
  dental: (
    <path d="M7 3c-2.2 0-4 1.8-4 4.2 0 2.3 1 3.6 1.6 5.6.6 2.1.8 4.4 1.7 6.4.4.9 1.6.9 2 0 .7-1.6.9-3.7 1.7-4.6.5-.6 1.5-.6 2 0 .8.9 1 3 1.7 4.6.4.9 1.6.9 2 0 .9-2 1.1-4.3 1.7-6.4.6-2 1.6-3.3 1.6-5.6C21 4.8 19.2 3 17 3c-1.9 0-3.1 1-5 1S8.9 3 7 3z" />
  ),
  wellness: (
    <>
      <path d="M11 3l1.7 5.1L18 10l-5.3 1.9L11 17l-1.7-5.1L4 10l5.3-1.9z" />
      <path d="M18.5 15l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z" />
    </>
  ),
  fitness: (
    <>
      <rect x="4" y="7" width="3.2" height="10" rx="1" />
      <rect x="16.8" y="7" width="3.2" height="10" rx="1" />
      <path d="M7.2 12h9.6M2 10v4M22 10v4" />
    </>
  ),
  restaurants: <path d="M7 3v18M4.5 3v5a2.5 2.5 0 0 0 5 0V3M17.5 21V3c-2.2 1.2-3.5 3.8-3.5 7.5h3.5" />,
  "real-estate": <path d="M3 11l9-7 9 7M5.5 9.5V20h13V9.5M10 20v-5.5h4V20" />,
  trades: (
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.8-3.8a6 6 0 0 1-7.9 7.9l-6.9 6.9a2.1 2.1 0 0 1-3-3l6.9-6.9a6 6 0 0 1 7.9-7.9z" />
  ),
  startups: <path d="M3 17l6-6 4 4 8-8M15 7h6v6" />,
  website: (
    <>
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <path d="M8 20h8M12 16v4M3 8h18" />
    </>
  ),
  social: (
    <>
      <rect x="7" y="2.5" width="10" height="19" rx="2.5" />
      <path d="M12 14.5s-2.5-1.5-2.5-3.2a1.4 1.4 0 0 1 2.5-.9 1.4 1.4 0 0 1 2.5.9c0 1.7-2.5 3.2-2.5 3.2z" />
    </>
  ),
  posters: (
    <>
      <rect x="4.5" y="3" width="15" height="18" rx="1.5" />
      <path d="M4.5 15.5l4-4 4 4 2.5-2.5 4.5 4.5" />
      <circle cx="15" cy="8" r="1.5" />
    </>
  ),
  ads: <path d="M3.5 10.5v3a1 1 0 0 0 1 1H7l5 4v-13l-5 4H4.5a1 1 0 0 0-1 1zM15.5 9a3.5 3.5 0 0 1 0 6M18.5 6a7.5 7.5 0 0 1 0 12" />,
  brand: <path d="M12 3l2.6 5.6 6.1.7-4.5 4.2 1.2 6L12 16.6l-5.4 2.9 1.2-6-4.5-4.2 6.1-.7z" />,
  eye: (
    <>
      <path d="M2.5 12s3.5-6.5 9.5-6.5 9.5 6.5 9.5 6.5-3.5 6.5-9.5 6.5S2.5 12 2.5 12z" />
      <circle cx="12" cy="12" r="2.8" />
    </>
  ),
  shield: <path d="M12 3l7.5 3v5.5c0 4.5-3.2 8-7.5 9.5-4.3-1.5-7.5-5-7.5-9.5V6zM9 12l2.2 2.2L15.5 10" />,
  pointer: <path d="M9 4v10.5l2.6-2.4 2 4.8 2.2-.9-2-4.7H17.5z" />,
  check: <path d="M5 12.5l4.5 4.5L19 7.5" />,
  chevron: <path d="M6 9l6 6 6-6" />,
  "arrow-left": <path d="M15 5l-7 7 7 7" />,
  "arrow-right": <path d="M9 5l7 7-7 7" />,
};

export default function Icon({ name, className = "h-6 w-6" }: { name: IconName; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
    >
      {PATHS[name]}
    </svg>
  );
}
