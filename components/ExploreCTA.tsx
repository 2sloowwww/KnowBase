import Link from "next/link";

const TILES = [
  {
    href: "/investigations",
    eyebrow: "Chronological",
    title: "Since 1947",
    body: "Every case in the order it happened, decade by decade — including the gaps.",
  },
  {
    href: "/investigations",
    eyebrow: "By scale",
    title: "Ranked, biggest first",
    body: "Ordered by public money implicated and the strength of the official finding.",
  },
  {
    href: "/investigations",
    eyebrow: "By keyword",
    title: "Search everything",
    body: "Find a case by name, ministry, individual, or sector.",
  },
];

export function ExploreCTA() {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {TILES.map((tile) => (
        <Link
          key={tile.title}
          href={tile.href}
          className="group rounded-2xl border border-canvas-line p-6 transition-all duration-300 hover:border-accent/60 hover:bg-canvas-raised hover:-translate-y-1"
        >
          <div className="font-mono-data text-xs uppercase tracking-[0.2em] text-ink-faint mb-3">
            {tile.eyebrow}
          </div>
          <div className="font-display text-2xl mb-2 group-hover:text-accent transition-colors">
            {tile.title}
          </div>
          <p className="text-sm text-ink-dim leading-relaxed">{tile.body}</p>
          <div className="mt-4 text-sm text-ink-faint group-hover:text-accent transition-colors">
            Open the database →
          </div>
        </Link>
      ))}
    </div>
  );
}
