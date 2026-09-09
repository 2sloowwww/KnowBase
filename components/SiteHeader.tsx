import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-canvas-line/80 bg-canvas/85 backdrop-blur supports-[backdrop-filter]:bg-canvas/70">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-display font-semibold text-lg sm:text-xl tracking-tight">
          KNOW<span className="text-accent">BASE</span>
        </Link>
        <nav className="flex items-center gap-5 sm:gap-7 text-sm text-ink-dim">
          <Link href="/investigations" className="hover:text-ink transition-colors">
            Database
          </Link>
          <Link href="/people" className="hover:text-ink transition-colors whitespace-nowrap">
            <span className="sm:hidden">Offenders</span>
            <span className="hidden sm:inline">Repeat Offenders</span>
          </Link>
          <Link href="/statistics" className="hidden sm:inline hover:text-ink transition-colors">
            Statistics
          </Link>
          <Link href="/methodology" className="hidden sm:inline hover:text-ink transition-colors">
            Methodology
          </Link>
          <Link href="/about" className="hidden sm:inline hover:text-ink transition-colors">
            About
          </Link>
        </nav>
      </div>
    </header>
  );
}
