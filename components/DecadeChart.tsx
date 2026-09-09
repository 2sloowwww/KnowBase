import { SummaryStats } from "@/lib/summary";

export function DecadeChart({ stats }: { stats: SummaryStats }) {
  const max = Math.max(...stats.byDecade.map((d) => d.count));

  return (
    <div className="flex items-end gap-1.5 sm:gap-2.5 h-28">
      {stats.byDecade.map((d) => {
        const pct = Math.max((d.count / max) * 100, 6);
        return (
          <div key={d.decade} className="group flex flex-1 flex-col items-center gap-2">
            <div className="relative flex w-full flex-1 items-end justify-center">
              <span className="absolute -top-5 font-mono-data text-[11px] text-ink-faint opacity-0 group-hover:opacity-100 transition-opacity">
                {d.count}
              </span>
              <div
                className="w-full max-w-6 rounded-t bg-accent/70 transition-all duration-300 group-hover:bg-accent"
                style={{ height: `${pct}%` }}
              />
            </div>
            <div className="font-mono-data text-[10px] text-ink-faint whitespace-nowrap">
              &apos;{d.decade.slice(2, 4)}
            </div>
          </div>
        );
      })}
    </div>
  );
}
