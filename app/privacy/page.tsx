import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "What data KNOWBASE collects from visitors (currently none via cookies or analytics), and how information about public figures in case entries is sourced and used.",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-14 sm:py-20">
      <div className="font-mono-data text-xs uppercase tracking-[0.2em] text-accent mb-3">
        Legal
      </div>
      <h1 className="font-display text-4xl sm:text-5xl mb-6">Privacy Policy</h1>
      <p className="text-ink-dim leading-relaxed mb-10">
        This page covers two different things people usually mean by &ldquo;privacy&rdquo; on a
        site like this: data collected from you as a visitor, and how the site handles
        information about the people named in its case entries.
      </p>

      <div className="space-y-10">
        <Block title="1. Data collected from visitors">
          As of this writing, this site does not run analytics, advertising, or tracking
          scripts, and does not set cookies of its own. Your hosting/CDN provider may keep
          standard server-access logs (IP address, request time, user agent) purely for security
          and operational purposes, on whatever retention schedule that provider applies — this
          site does not separately collect, sell, or share that data. If analytics are added in
          future, this policy will be updated first, and a consent mechanism will be added where
          required by law.
        </Block>

        <Block title="2. Data stored in your browser">
          Where interactive features store a preference locally (for example, a remembered filter
          or a collapsed section), that data is saved only in your own browser&apos;s local
          storage. It is never transmitted to this site&apos;s operator and is not accessible to
          anyone but you on your own device.
        </Block>

        <Block title="3. Information about people named in case entries">
          Case entries on this site discuss real people and organisations in their public or
          professional capacity — as officials, executives, or parties to legal or regulatory
          proceedings — drawn entirely from information already on the public record: government
          reports, court filings, regulatory orders, and published journalism. This is not
          personal data collected from you or about private individuals; it concerns matters of
          public record and public interest, reported with attribution to the original source.
          See{" "}
          <Link href="/methodology" className="text-accent underline">
            methodology
          </Link>{" "}
          for how these entries are sourced, and{" "}
          <Link href="/terms" className="text-accent underline">
            terms of use
          </Link>{" "}
          for how to request a correction.
        </Block>

        <Block title="4. Your rights under Indian law">
          Under India&apos;s Digital Personal Data Protection Act, 2023, individuals have rights
          regarding personal data collected about them. Because this site does not currently
          collect personal data from visitors (Section 1), there is presently little to exercise
          those rights against on the visitor side. For concerns about how a case entry describes
          you personally, use the correction process referenced in the{" "}
          <Link href="/terms" className="text-accent underline">
            Terms of Use
          </Link>{" "}
          — a dedicated contact channel for this is being finalised and is not yet published,
          which is noted here rather than concealed.
        </Block>

        <Block title="5. Children's privacy">
          This site is not directed at children and does not knowingly collect data from them.
          Where a case entry concerns a minor, this site&apos;s editorial policy is to withhold
          the minor&apos;s name and identifying details consistent with Indian law and standard
          reporting practice, regardless of whether that information is otherwise available
          elsewhere.
        </Block>

        <Block title="6. Changes to this policy">
          This policy will be updated if the site&apos;s data practices change — for instance, if
          analytics are introduced, or once a correction-request channel is published. Material
          changes will be reflected by an updated revision date below.
        </Block>
      </div>

      <p className="text-xs text-ink-faint mt-12">Last updated: September 2026.</p>

      <div className="mt-8 flex gap-6">
        <Link href="/terms" className="text-sm text-ink-dim hover:text-ink underline">
          Terms of Use
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
