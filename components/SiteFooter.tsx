import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-canvas-line mt-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12 grid gap-10 sm:grid-cols-3 text-sm">
        <div>
          <div className="font-display text-lg mb-2">
            KNOW<span className="text-accent">BASE</span>
          </div>
          <p className="text-ink-dim leading-relaxed">
            A sourced record of India&apos;s largest financial frauds and governance failures,
            ranked from biggest to smallest. Evidence-first, source-linked, no partisan framing.
          </p>
        </div>
        <div>
          <div className="text-ink-faint uppercase tracking-wider text-xs mb-3">Site</div>
          <ul className="space-y-2 text-ink-dim">
            <li><Link href="/investigations" className="hover:text-ink">Database</Link></li>
            <li><Link href="/methodology" className="hover:text-ink">Methodology</Link></li>
            <li><Link href="/about" className="hover:text-ink">About</Link></li>
            <li><Link href="/terms" className="hover:text-ink">Terms of Use</Link></li>
            <li><Link href="/privacy" className="hover:text-ink">Privacy Policy</Link></li>
            <li><a href="/feed.xml" className="hover:text-ink">RSS Feed</a></li>
          </ul>
        </div>
        <div>
          <div className="text-ink-faint uppercase tracking-wider text-xs mb-3">Standards</div>
          <ul className="space-y-2 text-ink-dim leading-relaxed">
            <li>Every figure is source-linked to a CAG report, court record, or named publication.</li>
            <li>Disputed or unresolved facts are flagged, not smoothed over.</li>
            <li>Under-trial individuals are presumed innocent; we report case status, not guilt.</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-canvas-line py-6 text-xs text-ink-faint text-center px-4">
        Case statuses reflect the most recent reporting available at time of publication and can
        change as trials, appeals, and audits proceed. See{" "}
        <Link href="/methodology" className="underline hover:text-ink">
          methodology
        </Link>{" "}
        for sourcing standards.
      </div>
    </footer>
  );
}
