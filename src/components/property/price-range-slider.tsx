"use client";

import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { formatCompactPrice } from "@/lib/format";

export function PriceRangeSlider({
  mode,
  value,
  onChange,
  className,
}: {
  mode: "buy" | "rent";
  value: [number, number];
  onChange: (v: [number, number]) => void;
  className?: string;
}) {
  const isRent = mode === "rent";
  const step = isRent ? 50 : 5000;
  const marks = isRent
    ? [0, 1500, 3000, 4500, 6000, 8000]
    : [0, 250000, 500000, 750000, 1000000, 1250000, 1500000];

  return (
    <div className={cn("space-y-3", className)}>
      <Slider
        min={0}
        max={isRent ? 8000 : 1500000}
        step={step}
        value={value}
        onValueChange={(v) => onChange([v[0], v[1]] as [number, number])}
      />
      <div className="flex items-center justify-between font-mono text-xs font-medium">
        <span className="rounded-xl border border-ink/10 bg-white px-2.5 py-1 font-mono text-[11px] text-ink shadow-soft">
          {value[0] === 0 ? "ANY" : formatCompactPrice(value[0])}
        </span>
        <span className="text-ink-dim">—</span>
        <span className="rounded-xl border border-ink/10 bg-white px-2.5 py-1 font-mono text-[11px] text-ink shadow-soft">
          {value[1] >= (isRent ? 8000 : 1500000)
            ? "ANY"
            : formatCompactPrice(value[1])}
        </span>
      </div>
      <div className="flex justify-between font-mono text-[9px] uppercase tracking-wide text-ink-dim/70">
        {marks.map((m) => (
          <span key={m}>{m === 0 ? "" : formatCompactPrice(m)}</span>
        ))}
      </div>
    </div>
  );
}
