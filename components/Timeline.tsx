import { TimelineEvent } from "@/lib/types";

const TYPE_LABEL: Record<TimelineEvent["type"], string> = {
  announcement: "Announcement",
  milestone: "Milestone",
  delay: "Delay",
  status: "Status",
  revision: "Revision",
};

const TYPE_COLOR: Record<TimelineEvent["type"], string> = {
  announcement: "bg-ink",
  milestone: "bg-ink-dim",
  delay: "bg-orange-400",
  status: "bg-accent",
  revision: "bg-amber-300",
};

function formatDate(iso: string) {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function Timeline({ events }: { events: TimelineEvent[] }) {
  return (
    <ol className="relative border-l border-canvas-line ml-2 space-y-8">
      {events.map((event, i) => (
        <li key={i} className="pl-6 relative">
          <span
            className={`absolute -left-[7px] top-1 h-3 w-3 rounded-full ring-4 ring-canvas ${TYPE_COLOR[event.type]}`}
            aria-hidden
          />
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <time className="font-mono-data text-xs text-ink-faint">{formatDate(event.date)}</time>
            <span className="text-[10px] uppercase tracking-wider text-ink-faint border border-canvas-line rounded-full px-2 py-0.5">
              {TYPE_LABEL[event.type]}
            </span>
          </div>
          <div className="font-medium mt-1.5">{event.label}</div>
          {event.detail && (
            <p className="text-sm text-ink-dim mt-1 leading-relaxed">{event.detail}</p>
          )}
        </li>
      ))}
    </ol>
  );
}
