import { Investigation } from "@/lib/types";

export function GapChart({ gap }: { gap: Investigation["gap"] }) {
  const max = Math.max(gap.targetValue, gap.actualValue) * 1.08;
  const targetPct = (gap.targetValue / max) * 100;
  const actualPct = (gap.actualValue / max) * 100;

  const rows = [
    {
      key: "target",
      label: gap.targetLabel ?? "Target",
      display: gap.targetDisplay ?? `${gap.targetValue} ${gap.unit}`,
      pct: targetPct,
      style: "border-2 border-ink-dim bg-transparent",
    },
    {
      key: "actual",
      label: gap.actualLabel ?? "Actual",
      display: gap.actualDisplay ?? `${gap.actualValue} ${gap.unit}`,
      pct: actualPct,
      style: "bg-accent",
    },
  ];

  return (
    <div
      role="img"
      aria-label={`${gap.metricLabel}: ${rows[0].label} ${rows[0].display}, ${rows[1].label} ${rows[1].display}`}
      className="space-y-4"
    >
      <div className="text-xs uppercase tracking-wider text-ink-faint">{gap.metricLabel}</div>
      <div className="space-y-3">
        {rows.map((row) => (
          <div key={row.key} className="flex items-center gap-3 sm:gap-4">
            <div className="w-14 sm:w-16 shrink-0 text-xs text-ink-dim">{row.label}</div>
            <div className="flex-1 h-8 sm:h-9 rounded-md bg-canvas-line/60 relative overflow-hidden">
              <div
                className={`h-full rounded-md ${row.style}`}
                style={{ width: `${Math.max(row.pct, 2)}%` }}
              />
            </div>
            <div className="w-24 sm:w-28 shrink-0 text-right font-mono-data text-sm sm:text-base text-ink">
              {row.display}
            </div>
          </div>
        ))}
      </div>
      <p className="text-[11px] text-ink-faint">
        Bars share a single zero-based scale. No axis truncation is used to exaggerate or
        minimize the gap between the two figures.
      </p>
    </div>
  );
}
