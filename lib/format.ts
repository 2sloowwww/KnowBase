/** Pure formatting helpers with zero other imports — safe to use from client components. */

export function formatCr(value: number): string {
  if (value >= 100000) return `₹${(value / 100000).toFixed(2)} lakh cr`;
  if (value >= 1000) return `₹${value.toLocaleString("en-IN", { maximumFractionDigits: 0 })} cr`;
  return `₹${value.toLocaleString("en-IN", { maximumFractionDigits: 2 })} cr`;
}

/** Full numeric form, no "lakh" abbreviation — e.g. ₹6,04,276 crore. */
export function formatCrFull(value: number): string {
  return `₹${Math.round(value).toLocaleString("en-IN")} crore`;
}

/** Digits only (plus the ₹ sign) — no unit word, e.g. ₹6,04,276. Pair with a "crore" label nearby. */
export function formatCrDigits(value: number): string {
  return `₹${Math.round(value).toLocaleString("en-IN")}`;
}

/** The full rupee value, no "crore" word and no abbreviation — every zero spelled out, e.g. ₹6,04,27,60,00,00,000. */
export function formatRupeesFull(crValue: number): string {
  const rupees = Math.round(crValue) * 1e7;
  return `₹${rupees.toLocaleString("en-IN")}`;
}
