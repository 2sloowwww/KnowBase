const INSTITUTIONS = [
  "Comptroller & Auditor General",
  "Supreme Court of India",
  "Reserve Bank of India",
  "SEBI",
  "CBI",
  "Enforcement Directorate",
  "Parliament of India",
];

export function InstitutionBar() {
  return (
    <div className="border-b border-canvas-line">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-6">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          <span className="font-mono-data text-[11px] uppercase tracking-[0.2em] text-ink-faint mr-2">
            Sourced against records from
          </span>
          {INSTITUTIONS.map((name) => (
            <span
              key={name}
              className="text-sm text-ink-faint whitespace-nowrap"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
