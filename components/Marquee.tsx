// Rotating service marquee (Agero-style). Pure CSS animation; respects
// reduced-motion via globals.css.
const ITEMS = ["Brand Design", "Marketing", "Web Design", "Social", "Logo", "Strategy"];

export default function Marquee() {
  // Four copies = two identical halves, so translateX(-50%) loops seamlessly.
  const seq = [...ITEMS, ...ITEMS, ...ITEMS, ...ITEMS];
  return (
    <div className="overflow-hidden py-10">
      <div className="-rotate-2 bg-accent" style={{ width: "112%", marginLeft: "-6%" }}>
        <div className="flex w-max animate-marquee whitespace-nowrap py-3.5">
          {seq.map((t, i) => (
            <span
              key={i}
              className="flex items-center px-2 font-heading text-[15px] font-bold text-white"
            >
              {t}
              <span className="px-6 opacity-50">✕</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
