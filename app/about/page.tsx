import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description: "What KNOWBASE is, and what it isn't.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 py-14 sm:py-20">
      <div className="font-mono-data text-xs uppercase tracking-[0.2em] text-accent mb-3">
        About
      </div>
      <h1 className="font-display text-4xl sm:text-5xl mb-8">What this is</h1>

      <div className="space-y-6 text-ink-dim leading-relaxed">
        <p>
          KNOWBASE is a ranked, sourced record of India&apos;s largest financial frauds and
          governance failures — from headline-scale national scandals down to smaller, systemic
          ones. Each case traces its central facts to a CAG report, a court record, or named,
          dated journalism, and states plainly when those sources disagree or when a matter is
          still legally unresolved.
        </p>
        <p>
          It is not affiliated with any political party, government agency, or law enforcement
          body, and it does not take a position on any pending case beyond what courts and
          official audits have themselves found. Its subject is documented decisions, spending,
          and legal outcomes — not speculation about any individual&apos;s character or motives.
        </p>
        <p>
          Several cases here are under trial, on appeal, or in extradition proceedings. Under
          Indian law, an accused person is presumed innocent until convicted, and this site&apos;s
          language reflects that: we report what has been filed, charged, or decided, and we
          say so clearly when no verdict exists yet.
        </p>
        <p>
          Where the evidence is incomplete or contradictory — and on a few cases here, it
          genuinely is — that is stated with a confidence rating rather than resolved into a
          cleaner story than the sources support. The full standard is on the{" "}
          <Link href="/methodology" className="text-accent underline">
            methodology page
          </Link>
          .
        </p>
        <p className="text-sm text-ink-faint">
          Found an error, an outdated case status, or a source that no longer supports a claim
          made here? Case statuses in particular change quickly as trials and appeals proceed —
          see the methodology page for how corrections are handled.
        </p>
      </div>
    </div>
  );
}
