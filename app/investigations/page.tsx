import type { Metadata } from "next";
import { getAllInvestigations } from "@/lib/data";
import { getSummaryStats } from "@/lib/summary";
import { InvestigationDatabase } from "@/components/InvestigationDatabase";
import { SummaryCharts } from "@/components/SummaryCharts";

export const metadata: Metadata = {
  title: "Database",
  description: "Every case, latest first — or since 1947, or ranked from the biggest fraud to the smallest. Searchable and filterable.",
};

export default function InvestigationsPage() {
  const all = getAllInvestigations();
  const stats = getSummaryStats();

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-14 sm:py-20">
      <div className="mb-10">
        <div className="font-mono-data text-xs uppercase tracking-[0.2em] text-accent mb-3">
          Every case
        </div>
        <h1 className="font-display text-4xl sm:text-5xl mb-4">Latest first, by default</h1>
        <p className="text-ink-dim max-w-2xl leading-relaxed">
          Search by keyword or name, filter by sector and legal status, and switch between the
          most recently broken scandals, a chronological timeline since 1947, and a ranking by
          scale and significance — see the{" "}
          <a href="/methodology#ranking" className="text-accent underline">
            methodology
          </a>{" "}
          for how that ranking is decided. Each entry links to the full case with sources,
          timeline, and current legal status.
        </p>
      </div>
      <InvestigationDatabase investigations={all} />

      <details className="group mt-20 border-t border-canvas-line pt-10">
        <summary className="cursor-pointer list-none flex items-center justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl inline">By the numbers</h2>
            <p className="text-ink-dim text-sm mt-2 max-w-2xl">
              A direct tally of the cases above — decade, sector, legal status, and the money,
              added up carefully.
            </p>
          </div>
          <span className="shrink-0 rounded-full border border-canvas-line h-9 w-9 flex items-center justify-center text-ink-dim group-open:rotate-45 transition-transform">
            +
          </span>
        </summary>
        <div className="mt-8">
          <SummaryCharts stats={stats} />
        </div>
      </details>
    </div>
  );
}
