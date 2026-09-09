import Link from "next/link";
import { Investigation, STATUS_META } from "@/lib/types";

const FIRST_DECADE = 1940;

function decadeOf(inv: Investigation): number {
  return Math.floor(new Date(inv.promise.date).getFullYear() / 10) * 10;
}

export function HistoryTimeline({ investigations }: { investigations: Investigation[] }) {
  const sorted = [...investigations].sort(
    (a, b) => new Date(a.promise.date).getTime() - new Date(b.promise.date).getTime()
  );

  if (sorted.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-canvas-line py-16 text-center text-ink-dim">
        No cases match these filters yet.
      </div>
    );
  }

  const lastYear = new Date(sorted[sorted.length - 1].promise.date).getFullYear();
  const lastDecade = Math.floor(lastYear / 10) * 10;

  const decades: number[] = [];
  for (let d = FIRST_DECADE; d <= lastDecade; d += 10) decades.push(d);

  const byDecade = new Map<number, Investigation[]>();
  for (const inv of sorted) {
    const d = decadeOf(inv);
    if (!byDecade.has(d)) byDecade.set(d, []);
    byDecade.get(d)!.push(inv);
  }

  return (
    <div className="relative">
      <div className="absolute left-[7px] sm:left-[9px] top-2 bottom-2 w-px bg-canvas-line" aria-hidden />
      <ol className="space-y-10">
        {decades.map((decade) => {
          const cases = byDecade.get(decade) ?? [];
          const isEmpty = cases.length === 0;
          return (
            <li key={decade}>
              <div className="flex items-baseline gap-4 mb-4">
                <span
                  className={`relative z-10 shrink-0 h-4 w-4 sm:h-5 sm:w-5 rounded-full ring-4 ring-canvas ${
                    isEmpty ? "bg-canvas-line" : "bg-accent"
                  }`}
                  aria-hidden
                />
                <span className="font-display text-2xl sm:text-3xl">{decade}s</span>
                {isEmpty && (
                  <span className="text-xs text-ink-faint">
                    No case on this site is dated to this decade
                  </span>
                )}
              </div>
              {!isEmpty && (
                <div className="ml-8 sm:ml-9 space-y-4">
                  {cases.map((inv) => {
                    const meta = STATUS_META[inv.status];
                    const year = new Date(inv.promise.date).getFullYear();
                    return (
                      <Link
                        key={inv.slug}
                        href={`/investigations/${inv.slug}`}
                        className="group flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 rounded-xl border border-canvas-line p-4 hover:border-ink-faint transition-colors"
                      >
                        <span className="font-mono-data text-sm text-ink-faint w-14 shrink-0">
                          {year}
                        </span>
                        <div className="flex-1 min-w-0">
                          <span className="font-medium group-hover:text-accent transition-colors">
                            {inv.title}
                          </span>
                          <span className="hidden sm:inline text-ink-faint text-sm">
                            {" "}
                            — {inv.category}
                          </span>
                        </div>
                        <span
                          className={`shrink-0 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-mono-data ${meta.border} ${meta.color} ${meta.bg}`}
                        >
                          <span aria-hidden>{meta.emoji}</span>
                          {meta.label}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
