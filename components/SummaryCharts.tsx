import Link from "next/link";
import { SummaryStats, formatCr } from "@/lib/summary";
import { STATUS_META } from "@/lib/types";

function Bar({ label, count, max }: { label: string; count: number; max: number }) {
  const pct = Math.max((count / max) * 100, 4);
  return (
    <div className="flex items-center gap-3">
      <div className="w-16 shrink-0 text-xs text-ink-dim font-mono-data">{label}</div>
      <div className="flex-1 h-6 rounded bg-canvas-line/60 overflow-hidden">
        <div className="h-full rounded bg-accent" style={{ width: `${pct}%` }} />
      </div>
      <div className="w-6 shrink-0 text-right text-sm font-mono-data text-ink">{count}</div>
    </div>
  );
}

export function SummaryCharts({ stats }: { stats: SummaryStats }) {
  const maxDecadeCount = Math.max(...stats.byDecade.map((d) => d.count));
  const maxCategoryCount = Math.max(...stats.byCategory.map((c) => c.count));
  const convictedCount = stats.byStatus.find((s) => s.status === "convicted")?.count ?? 0;

  return (
    <div>
      {/* Headline stat tiles */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-10">
        <StatTile value={String(stats.totalCases)} label="Cases tracked" />
        <StatTile
          value={`${stats.earliestYear}–${stats.latestYear}`}
          label={`${stats.latestYear - stats.earliestYear} years of documented cases`}
        />
        <StatTile
          value={`${convictedCount} of ${stats.totalCases}`}
          label="Cases with at least one criminal conviction on record"
        />
        <StatTile
          value={`~${stats.money.recoveryRatePct.toFixed(1)}%`}
          label="Confirmed recovery rate, where comparable figures exist*"
        />
      </div>

      <div className="grid gap-10 lg:grid-cols-2 mb-10">
        <div>
          <h3 className="text-sm font-medium mb-4">Cases by decade since 1947</h3>
          <div className="space-y-2.5">
            {stats.byDecade.map((d) => (
              <Bar key={d.decade} label={d.decade} count={d.count} max={maxDecadeCount} />
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-sm font-medium mb-4">Cases by sector</h3>
          <div className="space-y-2.5">
            {stats.byCategory.map((c) => (
              <Bar key={c.category} label={c.category} count={c.count} max={maxCategoryCount} />
            ))}
          </div>
        </div>
      </div>

      <div className="mb-10">
        <h3 className="text-sm font-medium mb-4">Cases by legal status</h3>
        <div className="flex flex-wrap gap-3">
          {stats.byStatus
            .filter((s) => s.count > 0)
            .map((s) => {
              const meta = STATUS_META[s.status];
              return (
                <div
                  key={s.status}
                  className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm ${meta.border} ${meta.bg}`}
                >
                  <span aria-hidden>{meta.emoji}</span>
                  <span className={meta.color}>{meta.label}</span>
                  <span className="font-mono-data text-ink-faint">{s.count}</span>
                </div>
              );
            })}
        </div>
      </div>

      <div className="rounded-2xl border border-canvas-line bg-canvas-raised p-6 sm:p-8 mb-10">
        <h3 className="text-sm font-medium mb-2">A pattern worth naming — and its exceptions</h3>
        <p className="text-sm text-ink-dim leading-relaxed mb-3">
          Most cases exposed decades ago have reached some legal resolution — a conviction,
          acquittal, or closure — even when it took an unusually long time: Bofors took 40 years,
          the Jeep Scandal seven, Harshad Mehta&apos;s case concluded only after his death. Most
          large bank-fraud cases exposed in the 2018–2022 window (DHFL, ABG Shipyard, PMC Bank,
          Yes Bank–Rana Kapoor) are still awaiting even a first verdict.
        </p>
        <p className="text-sm text-ink-dim leading-relaxed">
          But time alone doesn&apos;t guarantee resolution, and speed isn&apos;t impossible either
          — both real exceptions worth naming rather than smoothing over. The Adarsh Housing
          Society case (exposed 2010) and the Sahara–SEBI dispute (exposed 2011) remain formally
          unresolved 15 years later; Sahara&apos;s only ended because its central figure died
          before trial. Meanwhile Vyapam, exposed in 2013, produced its first convictions within
          about four years — faster than several cases exposed years earlier. There is no clean
          rule here, only real, checkable variation in how long accountability actually takes.
        </p>
      </div>

      {/* Money — deliberately not one blended total */}
      <div className="rounded-2xl border border-canvas-line bg-canvas-raised p-6 sm:p-8">
        <h3 className="text-sm font-medium mb-4">The money, added up carefully</h3>
        <div className="grid gap-6 sm:grid-cols-2 mb-5">
          <div>
            <div className="font-mono-data text-2xl sm:text-3xl font-semibold text-ink">
              {formatCr(stats.money.totalAllegedINRCr)}
            </div>
            <div className="text-xs text-ink-faint mt-1">
              Sum of each case&apos;s own headline alleged/estimated figure
            </div>
          </div>
          <div>
            <div className="font-mono-data text-2xl sm:text-3xl font-semibold text-accent">
              {formatCr(stats.money.comparableRecoveredINRCr)}
            </div>
            <div className="text-xs text-ink-faint mt-1">
              Confirmed recovered/attached/established, across the{" "}
              {stats.money.comparableCaseSlugs.length} cases with a comparable figure*
            </div>
          </div>
        </div>
        <p className="text-xs text-ink-faint leading-relaxed">
          * The first number sums a CAG presumptive-loss estimate, several CBI/ED alleged-fraud
          figures, and a chit-fund estimate — measurements that are not directly comparable to
          each other, added here only to give a rough sense of scale. The recovery rate compares
          alleged and recovered figures only for the{" "}
          {stats.money.comparableCaseSlugs.length} cases where both exist on a like-for-like
          basis; it excludes cases like Coal, Commonwealth Games, and AgustaWestland, where no
          comparable recovery figure exists. See{" "}
          <Link href="/methodology#numbers" className="underline hover:text-ink-dim">
            methodology
          </Link>{" "}
          for the full reasoning.
        </p>
      </div>
    </div>
  );
}

function StatTile({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-xl border border-canvas-line bg-canvas-raised p-4 sm:p-5">
      <div className="font-mono-data text-2xl sm:text-3xl font-semibold text-ink">{value}</div>
      <div className="text-xs text-ink-faint mt-1 leading-snug">{label}</div>
    </div>
  );
}
