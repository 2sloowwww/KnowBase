import Link from "next/link";
import { Investigation } from "@/lib/types";
import { STATUS_META } from "@/lib/types";

export function TickerStrip({ investigations }: { investigations: Investigation[] }) {
  const items = [...investigations]
    .sort((a, b) => new Date(b.firstReportedDate).getTime() - new Date(a.firstReportedDate).getTime())
    .slice(0, 14);

  const row = (
    <>
      {items.map((inv) => (
        <Link
          key={inv.slug}
          href={`/investigations/${inv.slug}`}
          className="group flex shrink-0 items-center gap-2.5 px-6 py-3.5 hover:text-ink transition-colors"
        >
          <span aria-hidden className="text-sm">
            {STATUS_META[inv.status].emoji}
          </span>
          <span className="font-mono-data text-xs text-ink-faint whitespace-nowrap">
            {new Date(inv.firstReportedDate).getFullYear()}
          </span>
          <span className="text-sm text-ink-dim group-hover:text-ink whitespace-nowrap transition-colors">
            {inv.title}
          </span>
          <span className="font-mono-data text-xs text-accent whitespace-nowrap">
            {inv.heroStat.value}
          </span>
          <span aria-hidden className="text-ink-faint/40 pl-3.5">
            /
          </span>
        </Link>
      ))}
    </>
  );

  return (
    <div className="relative border-b border-canvas-line bg-canvas-raised/60 overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 z-10 bg-gradient-to-r from-canvas to-transparent" aria-hidden />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 z-10 bg-gradient-to-l from-canvas to-transparent" aria-hidden />
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        {row}
        {row}
      </div>
    </div>
  );
}
