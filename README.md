# KNOWBASE

A sourced, ranked record of India's largest financial frauds and governance failures — from
headline-scale national scandals down to smaller, systemic ones. Built with Next.js (App
Router), TypeScript, and Tailwind CSS.

Every case currently published (`content/investigations/*.json`) is real, drawn from CAG
performance audits, court records, and named journalism, with sources linked on each case page.
Disputed figures, contested legal outcomes, and open questions are flagged directly in the
content rather than smoothed over — see `/methodology` for the full editorial standard.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build, statically generates every case + its share card
npm run start   # serve the production build
```

**Content changes require a dev-server restart to show up.** `lib/data.ts` caches parsed
investigation data at module scope for the life of the process, and file edits under
`content/investigations/` aren't tracked by Next's dev-server file watcher the way source files
are. After editing a JSON file, restart `npm run dev` (or just re-run `npm run build`) to see
the change.

## Adding or updating a case

Every case is one JSON file in `content/investigations/`, validated against the schema in
`lib/types.ts` (`InvestigationSchema`) when the site builds or starts. To add one:

1. Copy an existing file in `content/investigations/` as a starting point.
2. Fill in every section: `promise`, `target` (the standard/rule that should have applied),
   `reality`, `gap`, `money` (or `null` if there's no reliable, comparable spending data —
   several real cases here use `null` rather than force a number that doesn't exist),
   `timeline`, `legalStatus` (optional, but strongly recommended whenever named individuals are
   involved), `verdict`, `incomplete`, and `sources`.
3. Set `severity` and `severityRank` deliberately — ranking is editorial judgment (scale of money
   implicated + strength of official finding + national significance), not a pure sort by rupee
   amount. See the "Ranking" section of `/methodology` before assigning a new case's rank.
4. Every number in `gap` or `money` should trace to an entry in `sources` via a `sourceIds` array
   elsewhere in the file. The schema doesn't enforce this automatically — check it by hand.
5. If a figure is disputed between sources, report the range or both figures (see
   `saradha-chit-fund-scam.json` or `commonwealth-games-2010-scam.json` for examples) rather than
   picking one. Use `gap.note` to explain the discrepancy.
6. If real, named individuals are involved and a case is not yet finally resolved, write
   `legalStatus.keyIndividuals[].outcome` in language a court would recognize as accurate —
   "chargesheeted," "granted bail," "acquitted, appeal pending" — never language implying guilt
   beyond what has actually been adjudicated.
7. Run `npm run build` — a malformed file will fail the build with a clear validation error
   naming the file and the missing/invalid field.

No database or CMS is required: the site reads every file in that folder at build time
(`lib/data.ts`), validates it, and statically generates a page, an Open Graph share card, and a
`ClaimReview` structured-data block for it automatically.

## Structure

- `content/investigations/*.json` — the content, one file per case
- `lib/types.ts` — the zod schema and TypeScript types every case is validated against, including
  the `Status` taxonomy (convicted / confirmed-unresolved / under-trial / acquitted-or-closed /
  disputed) and `Severity` ranking
- `lib/data.ts` — loads, validates, and indexes the content at build time; default sort is by
  `severityRank`, not publish date
- `app/` — routes: homepage, `/investigations` (searchable, filterable ranking),
  `/investigations/[slug]` (individual case + auto-generated share card), `/methodology`, `/about`
- `components/` — UI building blocks (status badges, the gap chart, timeline, share buttons, the
  search/filter database view)

## Editorial standards

The full methodology is published at `/methodology`. In short: CAG audits, court records, and
official filings are cited first; reputable, named journalism fills documented gaps; every
verdict carries a confidence rating; case-status labels describe legal/institutional status, not
guilt; under-trial individuals are written about as presumed innocent; and charts always use a
shared zero-based scale.
