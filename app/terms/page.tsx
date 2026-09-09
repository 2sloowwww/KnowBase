import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "The terms governing use of KNOWBASE, including how the site reports allegations, its correction process, and limits on liability.",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-14 sm:py-20">
      <div className="font-mono-data text-xs uppercase tracking-[0.2em] text-accent mb-3">
        Legal
      </div>
      <h1 className="font-display text-4xl sm:text-5xl mb-6">Terms of Use</h1>
      <p className="text-ink-dim leading-relaxed mb-10">
        This page describes the terms under which KNOWBASE is made available. It is written in
        plain language rather than dense legal boilerplate, but it is the operative agreement
        between this site and anyone who reads or uses it.
      </p>

      <div className="space-y-10">
        <Block title="1. What this site is">
          KNOWBASE is an independent, editorially-curated reference site documenting financial
          frauds, governance failures, and related public-interest cases in India, drawn from
          government reports, court records, regulatory orders, and reputable published
          journalism. It is not a news outlet, not a certified fact-checking organisation, and
          not a government or regulatory body. See{" "}
          <Link href="/methodology" className="text-accent underline">
            methodology
          </Link>{" "}
          for how entries are researched, sourced, and rated for confidence.
        </Block>

        <Block title="2. Allegations are reported as allegations">
          Where this site describes a chargesheet, FIR, regulatory order, or other allegation
          against a named person or entity, that description is an accurate report of what a
          named institution has alleged or found — it is not this site&apos;s own assertion that
          the underlying conduct occurred. Status labels (such as &ldquo;under trial,&rdquo;
          &ldquo;confirmed-unresolved,&rdquo; or &ldquo;disputed&rdquo;) reflect the current
          procedural or institutional status of a matter, not a judgment of guilt. Only
          &ldquo;convicted&rdquo; reflects an actual criminal conviction, and even then an appeal
          may be pending. Every person is presumed innocent until a court of competent
          jurisdiction determines otherwise.
        </Block>

        <Block title="3. Accuracy, and what to do if something is wrong">
          Every reasonable effort is made to verify facts against primary sources before
          publication, and known gaps or disputes are disclosed directly on each entry rather than
          smoothed over. Even so, this site is a human-researched project and can contain errors —
          a source can be outdated, a status can change after publication, or a fact can simply be
          wrong.
          <p className="mt-3">
            <strong className="text-ink">
              If you believe an entry about you, your organisation, or any matter is inaccurate,
              outdated, or unfair, you are entitled to request a correction.
            </strong>{" "}
            A dedicated contact channel for correction requests is being finalised and is not yet
            published on this site — this is a known gap, noted here rather than hidden, and will
            be resolved before or shortly after this notice is removed.
          </p>
        </Block>

        <Block title="4. No professional advice">
          Nothing on this site constitutes legal, financial, investment, or other professional
          advice. Figures on the{" "}
          <Link href="/statistics" className="text-accent underline">
            statistics
          </Link>{" "}
          page and elsewhere are for general reference only and should not be relied upon for any
          decision without independently verifying the current, authoritative source.
        </Block>

        <Block title="5. External links and third-party sources">
          Case entries link to external primary and independent sources for verification. This
          site does not control, endorse, or guarantee the continued availability or accuracy of
          third-party content, and is not responsible for it. If a linked source becomes
          unavailable or is later corrected, the entry citing it may not immediately reflect that
          change.
        </Block>

        <Block title="6. Intellectual property">
          Original writing, structure, and design on this site are the property of its operator.
          Quoted material from third-party sources is used for commentary, criticism, and factual
          reporting purposes and is attributed to its original publisher. If you believe content
          on this site infringes a copyright you hold, a resolution process will be published
          alongside the correction-request channel referenced in Section 3.
        </Block>

        <Block title="7. Limitation of liability">
          This site is provided on an &ldquo;as is&rdquo; basis. To the fullest extent permitted
          by law, the site&apos;s operator disclaims liability for any loss or damage arising from
          reliance on its content, from errors or omissions, or from the unavailability of the
          site. Nothing in these terms limits liability that cannot be excluded under applicable
          law.
        </Block>

        <Block title="8. Changes to these terms">
          These terms may be updated as the site develops — for example, once a correction-request
          channel is published. Material changes will be reflected by an updated revision date.
        </Block>

        <Block title="9. Governing law">
          These terms are governed by the laws of India. Any dispute arising from use of this site
          is subject to the exclusive jurisdiction of the courts of India.
        </Block>
      </div>

      <p className="text-xs text-ink-faint mt-12">Last updated: September 2026.</p>

      <div className="mt-8 flex gap-6">
        <Link href="/privacy" className="text-sm text-ink-dim hover:text-ink underline">
          Privacy Policy
        </Link>
        <Link href="/methodology" className="text-sm text-ink-dim hover:text-ink underline">
          Methodology
        </Link>
      </div>
    </div>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="font-display text-xl mb-3">{title}</h2>
      <div className="text-ink-dim leading-relaxed">{children}</div>
    </section>
  );
}
