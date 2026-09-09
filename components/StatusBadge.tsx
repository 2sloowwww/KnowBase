import { STATUS_META, Status } from "@/lib/types";

export function StatusBadge({
  status,
  size = "md",
}: {
  status: Status;
  size?: "sm" | "md" | "lg";
}) {
  const meta = STATUS_META[status];
  const sizeClasses =
    size === "sm"
      ? "text-[11px] px-2 py-0.5 gap-1"
      : size === "lg"
      ? "text-sm px-3.5 py-1.5 gap-2"
      : "text-xs px-2.5 py-1 gap-1.5";

  return (
    <span
      className={`inline-flex items-center rounded-full border font-mono-data uppercase tracking-wider whitespace-nowrap ${meta.bg} ${meta.border} ${meta.color} ${sizeClasses}`}
    >
      <span aria-hidden>{meta.emoji}</span>
      {meta.label}
    </span>
  );
}
