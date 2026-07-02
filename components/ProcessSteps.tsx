import { processSteps } from "@/data/services";
import FadeIn from "@/components/FadeIn";

export default function ProcessSteps() {
  return (
    <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
      {processSteps.map((s, i) => (
        <FadeIn key={s.step} delay={i * 0.08} className="bg-surface">
          <div className="flex h-full flex-col p-8">
            <span className="font-mono text-xs text-accent">{s.step}</span>
            <h3 className="mt-4 font-display text-2xl text-ink">{s.name}</h3>
            <p className="mt-3 text-sm leading-relaxed text-ink2">{s.body}</p>
          </div>
        </FadeIn>
      ))}
    </div>
  );
}
