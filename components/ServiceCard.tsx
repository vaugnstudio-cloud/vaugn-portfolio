import Link from "next/link";
import type { Service } from "@/data/services";

export default function ServiceCard({
  service,
  detailed = false,
}: {
  service: Service;
  detailed?: boolean;
}) {
  return (
    <article
      className={`flex h-full flex-col rounded-2xl border p-8 ${
        service.flagship
          ? "border-accent/40 bg-surface"
          : "border-line bg-surface"
      }`}
    >
      {service.flagship && (
        <span className="mb-4 w-fit rounded-full bg-accent px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-accent-ink">
          Flagship
        </span>
      )}
      <h3 className="font-display text-2xl text-ink">{service.name}</h3>
      <p className="mt-1 font-mono text-sm text-accent">{service.fromPrice}</p>
      <p className="mt-4 text-sm leading-relaxed text-ink2">{service.forWho}</p>

      <ul className="mt-6 flex flex-col gap-2.5">
        {service.includes.map((item) => (
          <li key={item} className="flex gap-3 text-sm text-ink2">
            <span aria-hidden className="mt-0.5 text-accent">✓</span>
            {item}
          </li>
        ))}
      </ul>

      {detailed && (
        <p className="mt-6 border-t border-line pt-5 text-sm leading-relaxed text-dim">
          {service.next}
        </p>
      )}

      <div className="mt-auto pt-8">
        <Link
          href="/contact"
          className="inline-block rounded-full border border-line px-5 py-2.5 text-sm text-ink transition-colors hover:border-accent hover:text-accent"
        >
          {service.cta} →
        </Link>
      </div>
    </article>
  );
}
