import Link from "next/link";
import { getAllInvestigations, getInvestigationBySlug } from "@/lib/data";
import { getSummaryStats } from "@/lib/summary";
import { SpotlightCases } from "@/components/SpotlightCases";
import { ExploreCTA } from "@/components/ExploreCTA";
import { RandomCaseButton } from "@/components/RandomCaseButton";
import { TickerStrip } from "@/components/TickerStrip";
import { InstitutionBar } from "@/components/InstitutionBar";
import { CountUp } from "@/components/CountUp";
import { Reveal } from "@/components/Reveal";
import { RecentAdditions } from "@/components/RecentAdditions";

const SPOTLIGHT_LEAD = { slug: "coal-block-allocation-scam", tag: "The biggest ever" };
const SPOTLIGHT_SUPPORTING = [
  { slug: "adani-group-hindenburg-doj-case", tag: "The one everyone's watching" },
  { slug: "byjus-financial-collapse", tag: "From $22B to zero" },
];

export default function HomePage() {
  const all = getAllInvestigations();
  const stats = getSummaryStats();

  const lead = getInvestigationBySlug(SPOTLIGHT_LEAD.slug);
  const supporting = SPOTLIGHT_SUPPORTING.map((s) => ({
    investigation: getInvestigationBySlug(s.slug)!,
    tag: s.tag,
  })).filter((s) => s.investigation);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-canvas-line">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="animate-drift absolute -top-24 left-[8%] h-72 w-72 rounded-full bg-accent/15 blur-[100px]" />
          <div className="animate-drift-slow absolute top-10 right-[6%] h-96 w-96 rounded-full bg-accent/10 blur-[120px]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_0%,var(--color-canvas)_75%)]" />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 pt-24 pb-16 sm:pt-32 sm:pb-20 text-center">
          <div className="animate-rise-in">
            <div className="inline-flex items-center gap-2 rounded-full border border-canvas-line bg-canvas-raised/80 px-3.5 py-1.5 mb-7 font-mono-data text-[11px] uppercase tracking-[0.15em] text-ink-dim">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
              </span>
              Live database — updated as cases develop
            </div>
            <h1 className="font-display font-semibold tracking-tight text-6xl sm:text-8xl leading-[0.95]">
              KNOW<span className="text-accent">BASE</span>
            </h1>
            <p className="mt-7 text-xl sm:text-2xl text-ink-dim leading-snug">
              What was promised. What happened.
            </p>
            <p className="mt-5 mx-auto max-w-xl text-ink-faint leading-relaxed">
              A sourced record of India&apos;s biggest financial frauds and governance failures —
              from the first one on record after independence to the ones still in court today.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 font-mono-data text-xs uppercase tracking-wider text-ink-faint">
              <span><CountUp end={stats.totalCases} format="int" /> cases</span>
              <span aria-hidden>·</span>
              <span>{stats.earliestYear}–{stats.latestYear}</span>
              <span aria-hidden>·</span>
              <span>every figure sourced</span>
            </div>

            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/investigations"
                className="group rounded-full bg-ink text-canvas px-6 py-3 font-medium hover:bg-accent hover:text-accent-ink transition-all hover:scale-[1.03] active:scale-[0.98]"
              >
                Browse every case
                <span className="inline-block transition-transform group-hover:translate-x-0.5"> →</span>
              </Link>
              <RandomCaseButton slugs={all.map((i) => i.slug)} />
            </div>
          </div>
        </div>
      </section>

      <TickerStrip investigations={all} />

      {/* Total loot */}
      <section className="relative overflow-hidden border-b border-canvas-line bg-canvas-raised/40">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 py-14 sm:py-16 text-center">
          <Reveal>
            <div className="font-mono-data text-xs uppercase tracking-[0.2em] text-ink-faint mb-3">
              Across all {stats.totalCases} cases
            </div>
            <div className="font-display text-3xl sm:text-5xl font-semibold text-accent leading-none font-mono-data break-all sm:break-normal">
              <CountUp
                end={stats.money.totalAllegedINRCr}
                format="rupees"
                duration={2000}
              />
            </div>
            <div className="text-ink-dim mt-3">
              total alleged loot — every case&apos;s own headline figure, added up
            </div>
            <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-sm text-ink-faint">
              <span>
                Only{" "}
                <span className="font-mono-data text-ink-dim">
                  <CountUp
                    end={stats.money.comparableRecoveredINRCr}
                    format="rupees"
                    duration={2000}
                  />
                </span>{" "}
                confirmed recovered across the {stats.money.comparableCaseSlugs.length} cases
                where that&apos;s even measurable
              </span>
            </div>
            <p className="mt-4 text-xs text-ink-faint max-w-xl mx-auto leading-relaxed">
              This total mixes CAG presumptive-loss estimates, CBI/ED alleged-fraud figures, and
              Ponzi-scheme estimates — measurements that aren&apos;t directly comparable, added here
              only to show scale. See{" "}
              <Link href="/methodology#numbers" className="underline hover:text-ink-dim">
                how we count this
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </section>

      {/* At a glance */}
      <section className="border-b border-canvas-line">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-20">
          <Reveal>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <StatTile value={<CountUp end={stats.totalCases} format="int" />} label="Cases tracked" />
              <StatTile
                value={`${stats.byStatus.find((s) => s.status === "convicted")?.count ?? 0}`}
                label={`Of ${stats.totalCases} with at least one conviction`}
              />
              <StatTile value={`${stats.latestYear - stats.earliestYear}`} label="Years of documented history" />
              <StatTile value={`~${stats.money.recoveryRatePct.toFixed(0)}%`} label="Confirmed recovery rate*" />
            </div>
            <p className="mt-8 text-xs text-ink-faint max-w-2xl">
              * Compares alleged and recovered figures only for the cases where both exist on a
              like-for-like basis — see{" "}
              <Link href="/methodology#numbers" className="underline hover:text-ink-dim">methodology</Link>.
            </p>
          </Reveal>
        </div>
      </section>

      <InstitutionBar />

      {/* Recently added */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-20">
        <Reveal>
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="font-mono-data text-xs uppercase tracking-[0.2em] text-accent mb-2">
                Just in
              </div>
              <h2 className="font-display text-3xl sm:text-4xl">The freshest scandals on record</h2>
            </div>
            <Link href="/investigations" className="text-sm font-medium text-accent underline underline-offset-4 whitespace-nowrap">
              See the full latest-first list →
            </Link>
          </div>
          <RecentAdditions investigations={all} />
        </Reveal>
      </section>

      {/* Spotlight */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-24">
        <Reveal>
          <div className="mb-8">
            <div className="font-mono-data text-xs uppercase tracking-[0.2em] text-accent mb-2">
              Start here
            </div>
            <h2 className="font-display text-3xl sm:text-4xl">Three worth your ten minutes</h2>
          </div>
          {lead && <SpotlightCases lead={{ investigation: lead, tag: SPOTLIGHT_LEAD.tag }} supporting={supporting} />}
        </Reveal>
      </section>

      {/* Explore */}
      <section className="border-y border-canvas-line bg-canvas-raised/40">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-20">
          <Reveal>
            <div className="mb-8">
              <h2 className="font-display text-3xl sm:text-4xl mb-2">However you want to look at it</h2>
              <p className="text-ink-dim max-w-2xl">
                All {stats.totalCases} cases live in one searchable database — this is just three
                ways into it.
              </p>
            </div>
            <ExploreCTA />
          </Reveal>
        </div>
      </section>

      {/* Trust strip */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-14 sm:py-16">
        <Reveal className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-10">
          <p className="text-sm text-ink-dim leading-relaxed sm:max-w-xs">
            CAG reports and court records first. Disputed facts and pending trials are flagged,
            not smoothed over. Accused individuals are presumed innocent.
          </p>
          <div className="hidden sm:block h-10 w-px bg-canvas-line" />
          <Link
            href="/methodology"
            className="text-sm font-medium text-accent underline underline-offset-4 whitespace-nowrap"
          >
            Read the full methodology →
          </Link>
        </Reveal>
      </section>
    </>
  );
}

function StatTile({ value, label }: { value: React.ReactNode; label: string }) {
  return (
    <div className="rounded-xl border border-canvas-line bg-canvas-raised p-4">
      <div className="font-mono-data text-2xl sm:text-3xl font-semibold text-ink">{value}</div>
      <div className="text-xs text-ink-faint mt-1 leading-snug">{label}</div>
    </div>
  );
}
