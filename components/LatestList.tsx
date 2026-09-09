import Link from "next/link";
import { Investigation, STATUS_META } from "@/lib/types";

function formatDate(iso: string) {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function LatestList({ investigations }: { investigations: Investigation[] }) {
  const sorted = [...investigations].sort(
    (a, b) => new Date(b.firstReportedDate).getTime() - new Date(a.firstReportedDate).getTime()
  );

  if (sorted.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-canvas-line py-16 text-center text-ink-dim">
        No cases match these filters yet.
      </div>
    );
  }

  return (
    <ol className="divide-y divide-canvas-line border-y border-canvas-line">
      {sorted.map((inv) => {
        const meta = STATUS_META[inv.status];
        return (
          <li key={inv.slug}>
            <Link
              href={`/investigations/${inv.slug}`}
              className="group flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 py-4 hover:bg-canvas-raised/60 transition-colors -mx-4 px-4"
            >
              <span className="font-mono-data text-xs text-accent w-24 shrink-0">
                {formatDate(inv.firstReportedDate)}
              </span>
              <div className="flex-1 min-w-0">
                <span className="font-medium group-hover:text-accent transition-colors">
                  {inv.title}
                </span>
                <span className="hidden sm:inline text-ink-faint text-sm"> — {inv.category}</span>
              </div>
              <span
                className={`shrink-0 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-mono-data ${meta.border} ${meta.color} ${meta.bg}`}
              >
                <span aria-hidden>{meta.emoji}</span>
                {meta.label}
              </span>
            </Link>
          </li>
        );
      })}
    </ol>
  );
}
