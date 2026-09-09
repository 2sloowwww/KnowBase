import Link from "next/link";
import { Investigation } from "@/lib/types";
import { StatusBadge } from "./StatusBadge";

export function SpotlightCases({
  lead,
  supporting,
}: {
  lead: { investigation: Investigation; tag: string };
  supporting: { investigation: Investigation; tag: string }[];
}) {
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <Link
        href={`/investigations/${lead.investigation.slug}`}
        className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-canvas-line bg-canvas-raised p-7 sm:p-9 transition-all duration-300 hover:border-accent/60 hover:-translate-y-1 hover:shadow-[0_20px_60px_-15px_rgba(255,90,60,0.25)] lg:row-span-2"
      >
        <div
          className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-accent/10 blur-3xl transition-opacity group-hover:opacity-100 opacity-60"
          aria-hidden
        />
        <div className="relative">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-6">
            <span className="font-mono-data text-xs uppercase tracking-[0.15em] text-accent whitespace-nowrap">
              {lead.tag}
            </span>
            <StatusBadge status={lead.investigation.status} size="sm" />
          </div>
          <h3 className="font-display text-3xl sm:text-4xl leading-[1.05] mb-4 group-hover:text-accent transition-colors">
            {lead.investigation.title}
          </h3>
          <p className="text-ink-dim leading-relaxed max-w-md">{lead.investigation.dek}</p>
        </div>
        <div className="relative mt-10 pt-6 border-t border-canvas-line">
          <div className="font-mono-data text-4xl sm:text-5xl font-semibold text-ink">
            {lead.investigation.heroStat.value}
          </div>
          <div className="text-sm text-ink-faint mt-1">{lead.investigation.heroStat.label}</div>
        </div>
      </Link>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
        {supporting.map(({ investigation, tag }) => (
          <Link
            key={investigation.slug}
            href={`/investigations/${investigation.slug}`}
            className="group flex flex-col rounded-2xl border border-canvas-line bg-canvas-raised p-6 transition-all duration-300 hover:border-ink-faint hover:-translate-y-1 hover:shadow-[0_16px_40px_-18px_rgba(0,0,0,0.6)]"
          >
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-3">
              <span className="font-mono-data text-xs uppercase tracking-[0.15em] text-accent whitespace-nowrap">
                {tag}
              </span>
              <StatusBadge status={investigation.status} size="sm" />
            </div>
            <h3 className="font-display text-xl leading-snug mb-2 group-hover:text-accent transition-colors">
              {investigation.title}
            </h3>
            <p className="text-ink-dim text-sm leading-relaxed line-clamp-2 mb-4">
              {investigation.dek}
            </p>
            <div className="mt-auto flex items-baseline gap-2">
              <span className="font-mono-data text-xl font-semibold text-ink">
                {investigation.heroStat.value}
              </span>
              <span className="text-xs text-ink-faint">{investigation.heroStat.label}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
