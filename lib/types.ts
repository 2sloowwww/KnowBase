import { z } from "zod";

export const STATUS_VALUES = [
  "convicted",
  "confirmed-unresolved",
  "under-trial",
  "acquitted-or-closed",
  "disputed",
] as const;

export type Status = (typeof STATUS_VALUES)[number];

export const STATUS_META: Record<
  Status,
  { label: string; emoji: string; color: string; bg: string; border: string; description: string }
> = {
  convicted: {
    label: "Convicted",
    emoji: "\u{1F534}",
    color: "text-red-400",
    bg: "bg-red-500/10",
    border: "border-red-500/30",
    description: "At least one accused has been convicted by a court. Appeals may still be pending.",
  },
  "confirmed-unresolved": {
    label: "Wrongdoing Confirmed",
    emoji: "\u{1F7E0}",
    color: "text-orange-400",
    bg: "bg-orange-500/10",
    border: "border-orange-500/30",
    description: "An official body (CAG, Supreme Court, a ministry audit) has found irregularity or illegality, but no criminal conviction has been secured.",
  },
  "under-trial": {
    label: "Under Trial",
    emoji: "\u{1F7E1}",
    color: "text-amber-300",
    bg: "bg-amber-400/10",
    border: "border-amber-400/30",
    description: "Charges have been filed and proceedings are active. No verdict yet — the accused are presumed innocent.",
  },
  "acquitted-or-closed": {
    label: "Acquitted / Closed",
    emoji: "⚪",
    color: "text-zinc-300",
    bg: "bg-zinc-500/10",
    border: "border-zinc-500/30",
    description: "A court acquitted the accused, or the case was closed/discharged without a conviction. An appeal may still be pending.",
  },
  disputed: {
    label: "Disputed Facts",
    emoji: "\u{1F7E3}",
    color: "text-fuchsia-300",
    bg: "bg-fuchsia-500/10",
    border: "border-fuchsia-400/30",
    description: "Key figures or claims are genuinely contested between sources, with no institutional finding to settle them.",
  },
};

export const CATEGORY_VALUES = [
  "Banking & Finance",
  "Natural Resources",
  "Telecom & Digital",
  "Defence & Security",
  "Public Spending",
  "Employment & Welfare",
] as const;

export type Category = (typeof CATEGORY_VALUES)[number];

export const SEVERITY_VALUES = ["critical", "major", "moderate", "minor"] as const;
export type Severity = (typeof SEVERITY_VALUES)[number];

export const SEVERITY_META: Record<Severity, { label: string }> = {
  critical: { label: "Critical" },
  major: { label: "Major" },
  moderate: { label: "Moderate" },
  minor: { label: "Minor" },
};

export const CONFIDENCE_VALUES = ["high", "medium", "low"] as const;
export type Confidence = (typeof CONFIDENCE_VALUES)[number];

const SourceSchema = z.object({
  id: z.string(),
  label: z.string(),
  type: z.enum(["primary", "independent"]),
  publisher: z.string(),
  date: z.string(),
  url: z.string().url().optional(),
  note: z.string().optional(),
});

const TimelineEventSchema = z.object({
  date: z.string(),
  label: z.string(),
  detail: z.string().optional(),
  type: z.enum(["announcement", "milestone", "delay", "status", "revision"]),
});

const MoneySchema = z.object({
  currency: z.string(),
  allocated: z.number().nullable().optional(),
  allocatedLabel: z.string().optional(),
  released: z.number().nullable().optional(),
  releasedLabel: z.string().optional(),
  spent: z.number().nullable().optional(),
  spentLabel: z.string().optional(),
  unit: z.string(),
  notes: z.string(),
  sourceIds: z.array(z.string()),
});

const KeyIndividualSchema = z.object({
  name: z.string(),
  role: z.string(),
  outcome: z.string(),
});

export const InvestigationSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  dek: z.string(),
  category: z.enum(CATEGORY_VALUES),
  status: z.enum(STATUS_VALUES),
  severity: z.enum(SEVERITY_VALUES),
  severityRank: z.number(),
  featured: z.boolean().default(false),
  publishedDate: z.string(),
  updatedDate: z.string(),
  firstReportedDate: z.string(),
  heroStat: z.object({
    value: z.string(),
    label: z.string(),
  }),
  promise: z.object({
    quote: z.string(),
    madeBy: z.string(),
    role: z.string(),
    date: z.string(),
    context: z.string().optional(),
    sourceIds: z.array(z.string()),
  }),
  target: z.object({
    description: z.string(),
    standard: z.string(),
    referenceDate: z.string().optional(),
  }),
  reality: z.object({
    description: z.string(),
    asOfDate: z.string(),
    sourceIds: z.array(z.string()),
  }),
  gap: z.object({
    metricLabel: z.string(),
    unit: z.string(),
    targetValue: z.number(),
    actualValue: z.number(),
    targetDisplay: z.string().optional(),
    actualDisplay: z.string().optional(),
    targetLabel: z.string().optional(),
    actualLabel: z.string().optional(),
    note: z.string().optional(),
  }),
  money: MoneySchema.nullable(),
  timeline: z.array(TimelineEventSchema),
  legalStatus: z
    .object({
      summary: z.string(),
      keyIndividuals: z.array(KeyIndividualSchema).optional(),
    })
    .optional(),
  verdict: z.object({
    summary: z.string(),
    confidence: z.enum(CONFIDENCE_VALUES),
    reasoning: z.string(),
  }),
  incomplete: z.array(z.string()),
  sources: z.array(SourceSchema),
});

export type Investigation = z.infer<typeof InvestigationSchema>;
export type Source = z.infer<typeof SourceSchema>;
export type TimelineEvent = z.infer<typeof TimelineEventSchema>;
export type KeyIndividual = z.infer<typeof KeyIndividualSchema>;
