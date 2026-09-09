import Link from "next/link";
import { Investigation, STATUS_META } from "@/lib/types";

function formatDate(iso: string) {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function RecentAdditions({ investigations }: { investigations: Investigation[] }) {
  const recent = [...investigations]
    .sort((a, b) => new Date(b.firstReportedDate).getTime() - new Date(a.firstReportedDate).getTime())
    .slice(0, 6);

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {recent.map((inv) => {
        const meta = STATUS_META[inv.status];
        return (
          <Link
            key={inv.slug}
            href={`/investigations/${inv.slug}`}
            className="group flex items-start gap-3 rounded-xl border border-canvas-line bg-canvas-raised/60 p-4 transition-all duration-300 hover:border-accent/50 hover:bg-canvas-raised hover:-translate-y-0.5"
          >
            <span
              className={`mt-0.5 shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-mono-data uppercase ${meta.border} ${meta.color} ${meta.bg}`}
            >
              {meta.emoji}
            </span>
            <div className="min-w-0 flex-1">
              <div className="font-mono-data text-[11px] text-accent mb-1">
                First reported {formatDate(inv.firstReportedDate)}
              </div>
              <div className="font-medium text-sm leading-snug group-hover:text-accent transition-colors line-clamp-2">
                {inv.title}
              </div>
              <div className="text-xs text-ink-faint mt-1">{inv.category}</div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
