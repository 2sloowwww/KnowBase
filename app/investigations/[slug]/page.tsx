import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllSlugs,
  getInvestigationBySlug,
  getRelatedInvestigations,
} from "@/lib/data";
import { STATUS_META, CONFIDENCE_VALUES } from "@/lib/types";
import { getPersonBySlug, slugifyName } from "@/lib/people";
import { StatusBadge } from "@/components/StatusBadge";
import { GapChart } from "@/components/GapChart";
import { Timeline } from "@/components/Timeline";
import { ShareButtons } from "@/components/ShareButtons";
import { InvestigationCard } from "@/components/InvestigationCard";

const SITE_URL = "https://knowbase.xyz";

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const inv = getInvestigationBySlug(slug);
  if (!inv) return {};

  const title = inv.title;
  const description = inv.dek;
  const url = `${SITE_URL}/investigations/${inv.slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

function formatDate(iso: string) {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function formatMoney(value: number | null | undefined, currency: string, unit: string) {
  if (value === null || value === undefined) return "Not disclosed";
  return `${currency === "INR" ? "₹" : currency} ${value.toLocaleString("en-IN")} ${unit}`;
}

const CONFIDENCE_LABEL: Record<(typeof CONFIDENCE_VALUES)[number], string> = {
  high: "High confidence",
  medium: "Medium confidence",
  low: "Low confidence",
};

export default async function InvestigationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const inv = getInvestigationBySlug(slug);
  if (!inv) notFound();

  const url = `${SITE_URL}/investigations/${inv.slug}`;
  const related = getRelatedInvestigations(inv);
  const statusMeta = STATUS_META[inv.status];

  // Deliberately NOT schema.org/ClaimReview: that markup is reserved for recognised
  // fact-checking organisations and implies a formal, authoritative "true/false" rating.
  // This site reports sourced facts and institutional findings, not adjudicated verdicts —
  // a plain Article schema avoids overstating that distinction to search engines or readers.
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    url,
    headline: inv.title,
    description: inv.dek,
    author: {
      "@type": "Organization",
      name: "KNOWBASE",
      url: SITE_URL,
    },
    datePublished: inv.publishedDate,
    dateModified: inv.updatedDate,
  };

  // Sections after Reality/Gap are conditionally present (money, legal status),
  // so eyebrow numbers are assigned sequentially rather than hardcoded.
  let sectionNumber = 4;
  const nextEyebrow = () => String(++sectionNumber).padStart(2, "0");

  return (
    <article className="mx-auto max-w-3xl px-4 sm:px-6 py-14 sm:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <div className="flex items-center gap-3 mb-5">
        <span className="font-mono-data text-xs text-ink-faint">{inv.id}</span>
        <StatusBadge status={inv.status} />
      </div>

      <h1 className="font-display text-4xl sm:text-5xl leading-[1.05] mb-4">{inv.title}</h1>
      <p className="text-lg text-ink-dim leading-relaxed mb-8">{inv.dek}</p>

      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-ink-faint font-mono-data mb-8">
        <span>{inv.category}</span>
        <span>Published {formatDate(inv.publishedDate)}</span>
        <span>Updated {formatDate(inv.updatedDate)}</span>
      </div>

      <div className="rounded-2xl border border-canvas-line bg-canvas-raised p-6 sm:p-8 mb-10">
        <div className="font-mono-data text-4xl sm:text-5xl font-semibold text-accent">
          {inv.heroStat.value}
        </div>
        <div className="text-ink-dim mt-1">{inv.heroStat.label}</div>
      </div>

      <div className="mb-10">
        <ShareButtons url={url} title={inv.title} stat={inv.heroStat.value} />
      </div>

      {/* THE PROMISE */}
      <Section eyebrow="01" title="The Promise">
        <blockquote className="font-display text-2xl sm:text-3xl leading-snug border-l-2 border-accent pl-5 sm:pl-6 mb-4">
          &ldquo;{inv.promise.quote}&rdquo;
        </blockquote>
        <p className="text-sm text-ink-dim">
          — {inv.promise.madeBy}, {inv.promise.role} · {formatDate(inv.promise.date)}
        </p>
        {inv.promise.context && (
          <p className="text-ink-dim leading-relaxed mt-4">{inv.promise.context}</p>
        )}
      </Section>

      {/* THE TARGET */}
      <Section eyebrow="02" title="The Standard">
        <p className="text-ink leading-relaxed">{inv.target.description}</p>
        <p className="text-sm text-ink-faint mt-3">{inv.target.standard}</p>
        {inv.target.referenceDate && (
          <p className="text-sm text-ink-faint mt-1 font-mono-data">
            In force from {formatDate(inv.target.referenceDate)}
          </p>
        )}
      </Section>

      {/* THE REALITY */}
      <Section eyebrow="03" title="The Reality">
        <p className="text-ink leading-relaxed">{inv.reality.description}</p>
        <p className="text-sm text-ink-faint mt-3 font-mono-data">
          As of {formatDate(inv.reality.asOfDate)}
        </p>
      </Section>

      {/* THE GAP */}
      <Section eyebrow="04" title="The Gap">
        <GapChart gap={inv.gap} />
      </Section>

      {/* MONEY */}
      {inv.money && (
        <Section eyebrow={nextEyebrow()} title="Money">
          <div className="grid grid-cols-3 gap-4 mb-5">
            <MoneyStat
              label={inv.money.allocatedLabel ?? "Allocated"}
              value={formatMoney(inv.money.allocated, inv.money.currency, inv.money.unit)}
            />
            <MoneyStat
              label={inv.money.releasedLabel ?? "Released"}
              value={formatMoney(inv.money.released, inv.money.currency, inv.money.unit)}
            />
            <MoneyStat
              label={inv.money.spentLabel ?? "Spent"}
              value={formatMoney(inv.money.spent, inv.money.currency, inv.money.unit)}
            />
          </div>
          <p className="text-ink-dim leading-relaxed text-sm">{inv.money.notes}</p>
        </Section>
      )}

      {/* TIMELINE */}
      <Section eyebrow={nextEyebrow()} title="Timeline">
        <Timeline events={inv.timeline} />
      </Section>

      {/* LEGAL STATUS */}
      {inv.legalStatus && (
        <Section eyebrow={nextEyebrow()} title="Legal Status">
          <p className="text-ink-dim leading-relaxed mb-5">{inv.legalStatus.summary}</p>
          {inv.legalStatus.keyIndividuals && inv.legalStatus.keyIndividuals.length > 0 && (
            <div className="space-y-3">
              {inv.legalStatus.keyIndividuals.map((person, i) => {
                const profile = getPersonBySlug(slugifyName(person.name));
                const isRepeat = profile && profile.totalCases >= 2;
                return (
                  <div key={i} className="rounded-lg border border-canvas-line p-4">
                    <div className="flex items-center gap-2 flex-wrap">
                      {isRepeat ? (
                        <Link
                          href={`/people/${profile!.slug}`}
                          className="font-medium text-accent underline underline-offset-2 hover:text-ink transition-colors"
                        >
                          {person.name}
                        </Link>
                      ) : (
                        <span className="font-medium">{person.name}</span>
                      )}
                      {isRepeat && (
                        <span className="font-mono-data text-[10px] uppercase tracking-wider rounded-full border border-canvas-line px-2 py-0.5 text-ink-faint">
                          Named in {profile!.totalCases} cases
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-ink-faint mb-2 mt-0.5">{person.role}</div>
                    <p className="text-sm text-ink-dim leading-relaxed">{person.outcome}</p>
                  </div>
                );
              })}
            </div>
          )}
        </Section>
      )}

      {/* VERDICT */}
      <Section eyebrow={nextEyebrow()} title="Verdict">
        <div className={`rounded-2xl border p-6 sm:p-8 ${statusMeta.border} ${statusMeta.bg}`}>
          <div className="flex items-center gap-3 mb-4">
            <StatusBadge status={inv.status} size="lg" />
            <span className="text-xs font-mono-data text-ink-faint uppercase tracking-wider">
              {CONFIDENCE_LABEL[inv.verdict.confidence]}
            </span>
          </div>
          <p className="text-lg leading-relaxed mb-4">{inv.verdict.summary}</p>
          <p className="text-sm text-ink-dim leading-relaxed">{inv.verdict.reasoning}</p>
        </div>
      </Section>

      {/* WHAT REMAINS INCOMPLETE */}
      <Section eyebrow={nextEyebrow()} title="What remains incomplete">
        <ul className="space-y-2 list-disc list-inside text-ink-dim leading-relaxed">
          {inv.incomplete.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </Section>

      {/* SOURCES */}
      <Section eyebrow={nextEyebrow()} title="Sources">
        <div className="space-y-3">
          {inv.sources
            .slice()
            .sort((a, b) => (a.type === b.type ? 0 : a.type === "primary" ? -1 : 1))
            .map((source) => (
              <div
                key={source.id}
                className="rounded-lg border border-canvas-line p-4 text-sm"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className={`text-[10px] uppercase tracking-wider rounded-full px-2 py-0.5 border ${
                      source.type === "primary"
                        ? "border-emerald-500/30 text-emerald-400 bg-emerald-500/10"
                        : "border-sky-500/30 text-sky-300 bg-sky-500/10"
                    }`}
                  >
                    {source.type === "primary" ? "Primary source" : "Independent source"}
                  </span>
                  <span className="text-ink-faint font-mono-data text-xs">
                    {formatDate(source.date)}
                  </span>
                </div>
                <div className="font-medium">{source.label}</div>
                <div className="text-ink-faint text-xs mt-0.5">{source.publisher}</div>
                {source.note && <p className="text-ink-faint text-xs mt-2">{source.note}</p>}
                {source.url && (
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent text-xs underline mt-2 inline-block"
                  >
                    View source
                  </a>
                )}
              </div>
            ))}
        </div>
      </Section>

      {related.length > 0 && (
        <div className="mt-16 pt-10 border-t border-canvas-line">
          <h2 className="font-display text-2xl mb-6">Related investigations</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <InvestigationCard key={r.slug} investigation={r} />
            ))}
          </div>
        </div>
      )}

      <div className="mt-12">
        <Link href="/investigations" className="text-sm text-ink-dim hover:text-ink underline">
          ← Back to the database
        </Link>
      </div>
    </article>
  );
}

function Section({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-12 sm:mb-14">
      <div className="flex items-baseline gap-3 mb-4">
        <span className="font-mono-data text-xs text-accent">{eyebrow}</span>
        <h2 className="font-display text-2xl sm:text-3xl">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function MoneyStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-canvas-line p-3 sm:p-4">
      <div className="text-[11px] uppercase tracking-wider text-ink-faint mb-1">{label}</div>
      <div className="font-mono-data text-sm sm:text-base text-ink leading-tight">{value}</div>
    </div>
  );
}
