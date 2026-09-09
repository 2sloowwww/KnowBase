"use client";

import { useMemo, useState } from "react";
import { CATEGORY_VALUES, Investigation, STATUS_META, STATUS_VALUES, Status } from "@/lib/types";
import { InvestigationCard } from "./InvestigationCard";
import { HistoryTimeline } from "./HistoryTimeline";
import { LatestList } from "./LatestList";

type SortMode = "latest" | "timeline" | "ranked";

export function InvestigationDatabase({ investigations }: { investigations: Investigation[] }) {
  const [query, setQuery] = useState("");
  const [categories, setCategories] = useState<Set<string>>(new Set());
  const [statuses, setStatuses] = useState<Set<Status>>(new Set());
  const [sortMode, setSortMode] = useState<SortMode>("latest");

  function toggle<T>(set: Set<T>, setSet: (s: Set<T>) => void, value: T) {
    const next = new Set(set);
    if (next.has(value)) next.delete(value);
    else next.add(value);
    setSet(next);
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const results = investigations.filter((inv) => {
      if (categories.size > 0 && !categories.has(inv.category)) return false;
      if (statuses.size > 0 && !statuses.has(inv.status)) return false;
      if (!q) return true;
      const individuals = inv.legalStatus?.keyIndividuals?.map((p) => p.name).join(" ") ?? "";
      const haystack =
        `${inv.title} ${inv.dek} ${inv.category} ${inv.promise.madeBy} ${inv.promise.quote} ${individuals}`.toLowerCase();
      return haystack.includes(q);
    });
    return sortMode === "ranked"
      ? [...results].sort((a, b) => a.severityRank - b.severityRank)
      : results;
  }, [investigations, query, categories, statuses, sortMode]);

  return (
    <div>
      <div className="mb-6">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search cases, individuals, ministries, keywords…"
          className="w-full rounded-xl border border-canvas-line bg-canvas-raised px-4 py-3 text-ink placeholder:text-ink-faint focus:outline-none focus:border-accent transition-colors"
          aria-label="Search investigations"
        />
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {CATEGORY_VALUES.map((cat) => (
          <button
            key={cat}
            onClick={() => toggle(categories, setCategories, cat)}
            className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${
              categories.has(cat)
                ? "border-accent text-accent bg-accent/10"
                : "border-canvas-line text-ink-dim hover:text-ink"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {STATUS_VALUES.map((status) => (
          <button
            key={status}
            onClick={() => toggle(statuses, setStatuses, status)}
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs transition-colors ${
              statuses.has(status)
                ? `${STATUS_META[status].border} ${STATUS_META[status].color} ${STATUS_META[status].bg}`
                : "border-canvas-line text-ink-dim hover:text-ink"
            }`}
          >
            <span aria-hidden>{STATUS_META[status].emoji}</span>
            {STATUS_META[status].label}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div className="inline-flex flex-wrap rounded-full border border-canvas-line p-1 text-sm">
          <button
            onClick={() => setSortMode("latest")}
            className={`rounded-full px-4 py-1.5 transition-colors ${
              sortMode === "latest" ? "bg-ink text-canvas" : "text-ink-dim hover:text-ink"
            }`}
          >
            Latest first
          </button>
          <button
            onClick={() => setSortMode("timeline")}
            className={`rounded-full px-4 py-1.5 transition-colors ${
              sortMode === "timeline" ? "bg-ink text-canvas" : "text-ink-dim hover:text-ink"
            }`}
          >
            Timeline, since 1947
          </button>
          <button
            onClick={() => setSortMode("ranked")}
            className={`rounded-full px-4 py-1.5 transition-colors ${
              sortMode === "ranked" ? "bg-ink text-canvas" : "text-ink-dim hover:text-ink"
            }`}
          >
            Ranked, biggest first
          </button>
        </div>
        <div className="flex items-center gap-4 text-sm text-ink-faint">
          <span>
            {filtered.length} case{filtered.length === 1 ? "" : "s"}
          </span>
          {(categories.size > 0 || statuses.size > 0 || query) && (
            <button
              onClick={() => {
                setQuery("");
                setCategories(new Set());
                setStatuses(new Set());
              }}
              className="underline hover:text-ink"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      {sortMode === "latest" ? (
        <LatestList investigations={filtered} />
      ) : sortMode === "timeline" ? (
        <HistoryTimeline investigations={filtered} />
      ) : filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-canvas-line py-16 text-center text-ink-dim">
          No cases match these filters yet.
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((inv) => (
            <InvestigationCard key={inv.slug} investigation={inv} />
          ))}
        </div>
      )}
    </div>
  );
}
