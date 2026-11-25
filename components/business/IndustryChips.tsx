"use client";

import Icon from "@/components/business/Icon";
import { INDUSTRIES } from "@/data/business";
import { selectIndustry } from "@/components/business/IndustryExplorer";

// Quick picks in the page header: jump straight to an industry.
export default function IndustryChips() {
  return (
    <div className="flex flex-wrap gap-2">
      {INDUSTRIES.map((i) => (
        <button
          key={i.id}
          type="button"
          onClick={() => selectIndustry(i.id)}
          className="inline-flex items-center gap-2 rounded-full border border-line bg-surface py-2 pl-3 pr-4 text-[15px] text-ink transition-colors hover:border-ink hover:bg-ink hover:text-bg"
        >
          <Icon name={i.id} className="h-4 w-4" />
          {i.short}
        </button>
      ))}
    </div>
  );
}
