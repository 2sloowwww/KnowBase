import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getRepeatOffenders, getPersonBySlug } from "@/lib/people";
import { STATUS_META } from "@/lib/types";

export async function generateStaticParams() {
  return getRepeatOffenders().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const person = getPersonBySlug(slug);
  if (!person) return {};
  return {
    title: person.name,
    description: `${person.name} is named in ${person.totalCases} separate cases on KNOWBASE, with ${person.convictedCount} resulting in a conviction.`,
  };
}

export default async function PersonPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const person = getPersonBySlug(slug);
  if (!person || person.totalCases < 2) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-14 sm:py-20">
      <div className="font-mono-data text-xs uppercase tracking-[0.2em] text-accent mb-3">
        Profile
      </div>
      <h1 className="font-display text-4xl sm:text-5xl mb-6">{person.name}</h1>
      <div className="flex flex-wrap gap-4 mb-10">
        <div className="rounded-xl border border-canvas-line bg-canvas-raised p-4">
          <div className="font-mono-data text-2xl font-semibold text-ink">
            {person.totalCases}
          </div>
          <div className="text-xs text-ink-faint mt-1">Separate cases named in</div>
        </div>
        <div className="rounded-xl border border-canvas-line bg-canvas-raised p-4">
          <div className="font-mono-data text-2xl font-semibold text-ink">
            {person.convictedCount}
          </div>
          <div className="text-xs text-ink-faint mt-1">
            Resulted in a conviction
          </div>
        </div>
      </div>

      <p className="text-sm text-ink-faint leading-relaxed mb-10">
        This profile is generated from the &ldquo;key individuals&rdquo; named in each case
        below — it reflects how many separate investigations name this person, not a standalone
        finding of guilt. Presumption of innocence applies to any case not marked convicted.
      </p>

      <div className="space-y-5">
        {person.appearances.map((a) => {
          const meta = STATUS_META[a.caseStatus];
          return (
            <Link
              key={a.caseSlug}
              href={`/investigations/${a.caseSlug}`}
              className="group block rounded-2xl border border-canvas-line bg-canvas-raised p-6 transition-all duration-300 hover:border-accent/50 hover:-translate-y-0.5"
            >
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-mono-data ${meta.border} ${meta.color} ${meta.bg}`}
                >
                  <span aria-hidden>{meta.emoji}</span>
                  {meta.label}
                </span>
                <span className="text-xs text-ink-faint">{a.role}</span>
              </div>
              <div className="font-display text-xl mb-2 group-hover:text-accent transition-colors">
                {a.caseTitle}
              </div>
              <p className="text-sm text-ink-dim leading-relaxed">{a.outcome}</p>
            </Link>
          );
        })}
      </div>

      <div className="mt-12">
        <Link href="/people" className="text-sm text-ink-dim hover:text-ink underline">
          ← Back to repeat offenders
        </Link>
      </div>
    </div>
  );
}
