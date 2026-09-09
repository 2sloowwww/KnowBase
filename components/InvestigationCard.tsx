import Link from "next/link";
import { Investigation } from "@/lib/types";
import { StatusBadge } from "./StatusBadge";

export function InvestigationCard({ investigation }: { investigation: Investigation }) {
  return (
    <Link
      href={`/investigations/${investigation.slug}`}
      className="group block rounded-2xl border border-canvas-line bg-canvas-raised p-5 sm:p-6 transition-all hover:border-ink-faint hover:-translate-y-0.5"
    >
      <div className="flex items-start justify-between gap-3 mb-4">
        <span className="font-mono-data text-xs text-ink-faint">
          #{investigation.severityRank} · {investigation.id}
        </span>
        <StatusBadge status={investigation.status} size="sm" />
      </div>

      <h3 className="font-display text-xl sm:text-2xl leading-snug mb-2 group-hover:text-accent transition-colors">
        {investigation.title}
      </h3>

      <p className="text-ink-dim text-sm leading-relaxed mb-5 line-clamp-3">
        {investigation.dek}
      </p>

      <div className="flex items-end justify-between gap-3 pt-4 border-t border-canvas-line">
        <div>
          <div className="font-mono-data text-2xl sm:text-3xl font-semibold text-ink">
            {investigation.heroStat.value}
          </div>
          <div className="text-xs text-ink-faint mt-0.5">{investigation.heroStat.label}</div>
        </div>
        <span className="text-xs uppercase tracking-wider text-ink-faint">
          {investigation.category}
        </span>
      </div>
    </Link>
  );
}
