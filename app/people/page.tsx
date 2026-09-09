import type { Metadata } from "next";
import Link from "next/link";
import { getRepeatOffenders } from "@/lib/people";

export const metadata: Metadata = {
  title: "Repeat Offenders",
  description:
    "Individuals named as key individuals in two or more separate cases on KNOWBASE, cross-referenced with each case's own status.",
};

export default function PeoplePage() {
  const people = getRepeatOffenders();

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-14 sm:py-20">
      <div className="font-mono-data text-xs uppercase tracking-[0.2em] text-accent mb-3">
        Cross-referenced
      </div>
      <h1 className="font-display text-4xl sm:text-5xl mb-4">Repeat Offenders</h1>
      <p className="text-ink-dim max-w-2xl leading-relaxed mb-10">
        {people.length} people are named as a key individual in two or more separate cases on
        this site. Appearing here reflects how many investigations name someone — it is not a
        finding of guilt. Check each case&apos;s own status before drawing conclusions; several
        entries below include people who were acquitted, discharged, or are still presumed
        innocent under active trial.
      </p>
      {people.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-canvas-line py-16 text-center text-ink-dim">
          No one currently appears in two or more cases.
        </div>
      ) : (
        <ol className="divide-y divide-canvas-line border-y border-canvas-line">
          {people.map((p, i) => (
            <li key={p.slug}>
              <Link
                href={`/people/${p.slug}`}
                className="group flex items-center gap-4 py-4 hover:bg-canvas-raised/60 transition-colors -mx-4 px-4"
              >
                <span className="font-mono-data text-xs text-ink-faint w-6 shrink-0">
                  {i + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="font-medium group-hover:text-accent transition-colors">
                    {p.name}
                  </div>
                  <div className="text-xs text-ink-faint mt-1 truncate">
                    {p.appearances.map((a) => a.caseTitle).join(" · ")}
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0 font-mono-data text-xs">
                  {p.convictedCount > 0 && (
                    <span className="text-red-400">
                      {p.convictedCount} convicted
                    </span>
                  )}
                  <span className="text-ink-dim">{p.totalCases} cases</span>
                </div>
              </Link>
            </li>
          ))}
        </ol>
      )}

      <div className="mt-12">
        <Link href="/investigations" className="text-sm text-ink-dim hover:text-ink underline">
          ← Back to the database
        </Link>
      </div>
    </div>
  );
}
