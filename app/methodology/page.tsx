import type { Metadata } from "next";
import Link from "next/link";
import { STATUS_VALUES, STATUS_META } from "@/lib/types";

export const metadata: Metadata = {
  title: "Methodology",
  description: "How KNOWBASE sources, verifies, ranks, and labels every case.",
};

export default function MethodologyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-14 sm:py-20">
      <div className="font-mono-data text-xs uppercase tracking-[0.2em] text-accent mb-3">
        Methodology
      </div>
      <h1 className="font-display text-4xl sm:text-5xl mb-6">How we build a case</h1>
      <p className="text-ink-dim leading-relaxed mb-12">
        This page describes the standard every case on this site is held to. It exists so any
        claim we make can be checked against the same process, rather than taken on trust.
      </p>

      <div className="space-y-10">
        <Block n="01" title="What counts as a case">
          We cover financial frauds, procurement scandals, and systemic governance failures that
          are backed by an official finding — a CAG audit, a court order, a filed chargesheet, or
          a government body&apos;s own review — not by rumour or unverified allegation alone.
        </Block>

        <Block n="02" title="Source hierarchy">
          <p className="mb-3">Sources are used in this order of priority:</p>
          <ol className="list-decimal list-inside space-y-1.5 text-ink-dim">
            <li>CAG performance audits and other official government reports</li>
            <li>Court orders, judgments, and filed chargesheets</li>
            <li>Parliamentary records and ministry disclosures</li>
            <li>Reputable, named journalism and legal-affairs reporting</li>
          </ol>
          <p className="mt-3 text-sm text-ink-faint">
            We were not able to link directly to a certified court judgment for every case — where
            we rely on journalism&apos;s reporting of a court order rather than the order itself,
            that source is labelled &ldquo;independent,&rdquo; not &ldquo;primary,&rdquo; even
            though it concerns an official action.
          </p>
        </Block>

        <Block n="03" title="Confidence levels">
          <p className="mb-3">
            Every verdict carries a confidence rating, because not all evidence is equally solid:
          </p>
          <ul className="space-y-2 text-ink-dim">
            <li><strong className="text-ink">High</strong> — Multiple independent sources agree, including at least one primary source, and the core facts are not seriously contested.</li>
            <li><strong className="text-ink">Medium</strong> — The core facts are documented, but a key figure is a disputed estimate, or the matter&apos;s legal outcome is still pending.</li>
            <li><strong className="text-ink">Low</strong> — Sources conflict materially on scale or on basic facts, and no institutional finding has resolved the disagreement. We report the conflict rather than pick a side.</li>
          </ul>
        </Block>

        <Block n="04" title="Case status labels" >
          <p className="mb-4 text-ink-dim">
            These labels describe an institutional or legal status, not a moral judgment. In
            particular, &ldquo;Wrongdoing Confirmed&rdquo; and &ldquo;Convicted&rdquo; are
            different claims — the first
            means an official body found irregularity or illegality; the second means a court
            found a specific person criminally guilty. A case can have the first without the
            second, as several on this site do.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {STATUS_VALUES.map((s) => (
              <div key={s} className={`rounded-lg border p-3 text-sm ${STATUS_META[s].border} ${STATUS_META[s].bg}`}>
                <div>
                  <span className="mr-2">{STATUS_META[s].emoji}</span>
                  <span className={STATUS_META[s].color}>{STATUS_META[s].label}</span>
                </div>
                <p className="text-xs text-ink-faint mt-1.5 leading-snug">{STATUS_META[s].description}</p>
              </div>
            ))}
          </div>
        </Block>

        <Block n="05" title="Presumption of innocence" >
          Under Indian law, an accused person is presumed innocent until convicted by a court.
          Several cases on this site are under trial, on appeal, or contested in extradition
          proceedings abroad. We report what has actually been filed, charged, or decided — a
          chargesheet, an arrest, a bail order, a conviction, an acquittal — and we do not use
          language implying guilt beyond what a court has established. Where we quote a serious
          allegation that has not been judicially tested, we attribute it to its source (a CBI
          FIR, an ED complaint, a CAG finding) rather than stating it as this site&apos;s own
          finding of fact.
        </Block>

        <Block n="06" title="Ranking: biggest to smallest" >
          <div id="ranking" className="scroll-mt-20">
            <p className="text-ink-dim leading-relaxed mb-3">
              Cases are ordered using editorial judgment that weighs three things together: the
              scale of public money implicated, the strength of the official finding (a Supreme
              Court ruling carries more weight than a single contested estimate), and the
              case&apos;s national significance. This is deliberately not a pure sort by rupee
              amount, because the figures involved are not measured the same way — a CAG
              &ldquo;presumptive loss&rdquo; estimate (an opportunity-cost calculation), a CBI
              chargesheet&apos;s alleged fraud amount, and a court-confirmed cost overrun are three
              different kinds of number, and treating them as directly comparable would itself be
              a distortion.
            </p>
            <p className="text-ink-dim leading-relaxed">
              Where a case&apos;s headline figure is disputed or methodology-dependent, that is flagged
              directly on the case page, usually in the Gap section.
            </p>
          </div>
        </Block>

        <Block n="07" title="Three ways to browse">
          The database can be sorted three ways, and none of them is the &ldquo;real&rdquo; order
          — they answer different questions. &ldquo;Latest first&rdquo; sorts by when the
          wrongdoing was <em>first</em> publicly reported or put on record — an FIR, a CAG or
          audit report, a raid, or the first news exposé — not by its most recent verdict, bail
          order, or update, and not by when we happened to publish or last edit the page. That
          deliberately means an old case can still surface a fresh instance (a newly reported
          scandal), while a decades-old case that just received a new bail order stays where its
          scandal actually broke. &ldquo;Timeline, since 1947&rdquo; orders cases by when the
          underlying promise, policy, or deal dates from — earlier still, and often years before
          the scandal was exposed — including a visible marker for decades with no case tracked on
          this site yet, so the gaps in coverage are honest rather than hidden.
          &ldquo;Ranked, biggest first&rdquo; uses the editorial ranking described above.
        </Block>

        <Block n="08" title="The homepage summary numbers">
          <div id="numbers" className="scroll-mt-20">
            <p className="text-ink-dim leading-relaxed mb-3">
              The &ldquo;By the numbers&rdquo; section totals two things that should not be
              confused with each other. The first — a sum of each case&apos;s own headline
              alleged or estimated figure — mixes a CAG presumptive-loss estimate, several CBI/ED
              alleged-fraud amounts, and a chit-fund estimate into one number purely to give a
              rough sense of combined scale. It is explicitly <em>not</em> a claim that this
              amount of money was actually stolen, and it excludes cases (like Commonwealth Games
              2010, AgustaWestland, and the Jeep Scandal) whose headline figure is not this kind of
              amount at all.
            </p>
            <p className="text-ink-dim leading-relaxed">
              The recovery-rate figure is narrower and more defensible: it compares alleged and
              recovered amounts only for the specific cases where both exist on a like-for-like
              basis, and says so. A low recovery rate across those cases is a real, checkable
              pattern — a single grand &ldquo;total India has lost to fraud&rdquo; number would
              not be.
            </p>
          </div>
        </Block>

        <Block n="09" title="Charting standards">
          Every chart uses a shared, zero-based scale for the values being compared. We do not
          truncate axes or use inconsistent scales to make a gap look larger or smaller than the
          underlying numbers support. Where two numbers being compared are not directly
          commensurable — for example, two competing loss estimates rather than a target versus an
          actual outcome — the chart&apos;s note says so explicitly.
        </Block>

        <Block n="08" title="What we don't do">
          <ul className="list-disc list-inside space-y-1.5 text-ink-dim">
            <li>We do not fabricate statistics, quotes, or documents.</li>
            <li>We do not present a chargesheet, FIR, or allegation as a proven fact.</li>
            <li>We do not speculate about a person&apos;s motives or state of mind.</li>
            <li>We evaluate documented decisions, spending, and legal outcomes — not unverified character claims.</li>
          </ul>
        </Block>

        <Block n="09" title="Corrections">
          If a source is found to be wrong, outdated, or superseded by a later ruling, the case is
          updated and the change is reflected in its &ldquo;Updated&rdquo; date. Case status in particular can
          change quickly — bail orders, chargesheets, and appeal outcomes are common — and we aim
          to revisit high-profile cases when a significant development is reported.
        </Block>
      </div>

      <div className="mt-10">
        <Link href="/investigations" className="text-sm text-ink-dim hover:text-ink underline">
          ← Browse the ranking
        </Link>
      </div>
    </div>
  );
}

function Block({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <section>
      <div className="flex items-baseline gap-3 mb-3">
        <span className="font-mono-data text-xs text-accent">{n}</span>
        <h2 className="font-display text-2xl">{title}</h2>
      </div>
      <div className="text-ink-dim leading-relaxed">{children}</div>
    </section>
  );
}
