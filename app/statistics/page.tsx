import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "India, By the Numbers",
  description:
    "Union Budget 2026-27 expenditure and taxes, the national debt since 1947, court backlog, elected representatives and election costs, and where India ranks globally on human development, quality of life, sanitation, and press freedom.",
};

const DEBT_HISTORY = [
  { year: "1960", pct: 36.8 },
  { year: "1970", pct: 41.2 },
  { year: "1980", pct: 41.6 },
  { year: "1990", pct: 55.3 },
  { year: "1999", pct: 53.4 },
  { year: "2010", pct: 66.0 },
  { year: "2015", pct: 68.8 },
  { year: "2019", pct: 72.3 },
  { year: "2021", pct: 91.0 },
  { year: "2027 (est.)", pct: 55.6 },
];

const INFLATION_DECADES = [
  { label: "1990s", pct: "~9%" },
  { label: "2000s", pct: "~5.5%" },
  { label: "2010s", pct: "~6.5%" },
  { label: "2020s (post-2020)", pct: "~5%" },
  { label: "2025 (latest full year)", pct: "2.09%" },
];

const THEN_VS_NOW = [
  { label: "Petrol", then: "~₹25 / litre (2000)", now: "~₹100 / litre (2026)", note: "Roughly quadrupled." },
  { label: "Domestic LPG cylinder", then: "~₹157 (2000)", now: "~₹912 (2026)", note: "Nearly 6× higher." },
];

const GLOBAL_RANKINGS = [
  { label: "Human Development Index", value: "130 of 193", note: "“Medium human development” category (HDI 0.685) — per UNDP's most recent Human Development Report." },
  { label: "Quality of Life Index", value: "63 of 89", note: "Below the global average on this index's mix of cost of living, healthcare, safety, and pollution measures." },
  { label: "World Press Freedom Index", value: "157 of 180", note: "Reporters Without Borders rates India “very serious” for press freedom — down from 151st the year before, a historic low." },
  { label: "Safely managed sanitation access", value: "62.8%", note: "WHO/UNICEF's Joint Monitoring Programme. About one-sixth of rural India still practices open defecation despite the government's 2019 “open-defecation-free” declaration." },
];

const REPRESENTATIVES = [
  { label: "Lok Sabha members", value: "543" },
  { label: "Rajya Sabha members", value: "245" },
  { label: "State & UT legislative assembly (MLA) seats, combined", value: "4,123" },
];

const MINISTRIES = [
  { label: "Defence", pct: 15.0, value: "₹7,84,678 cr" },
  { label: "Road Transport & Highways", pct: 6.0, value: "~₹3,20,839 cr" },
  { label: "Railways", pct: 5.0, value: "~₹2,67,366 cr" },
  { label: "Home Affairs", pct: 5.0, value: "~₹2,67,366 cr" },
  { label: "Education", pct: 2.6, value: "₹1,39,000 cr" },
  { label: "Health & Family Welfare", pct: 2.0, value: "₹1,06,530 cr" },
  { label: "Housing & Urban Affairs", pct: 1.6, value: "₹85,522 cr" },
  { label: "Every other ministry & head combined", pct: 62.8, value: "~₹33,58,154 cr" },
];

const RUPEE_COMES_FROM = [
  { label: "Borrowings & other liabilities", pct: 24, note: "The government spends more than it collects, so it borrows the rest. This becomes national debt — repaid, with interest, by future taxpayers." },
  { label: "Income tax", pct: 21, note: "Tax you pay directly on your personal income." },
  { label: "Corporation tax", pct: 18, note: "Tax companies pay on their profits." },
  { label: "GST & other indirect taxes", pct: 15, note: "Tax on goods and services you buy, folded into the price rather than billed to you separately." },
  { label: "Non-tax revenue", pct: 10, note: "Money that isn't tax at all — dividends from government-owned companies and the RBI, spectrum auction proceeds, interest the government itself earns." },
  { label: "Union excise duties", pct: 6, note: "Mostly tax on the production of petrol and diesel." },
  { label: "Customs duties", pct: 4, note: "Tax on goods imported into India." },
  { label: "Non-debt capital receipts", pct: 2, note: "One-off money — selling government assets, or recovering old loans the government had made." },
];

const RUPEE_GOES_TO = [
  { label: "States' share of taxes", pct: 22, note: "By law, a fixed share of central taxes is automatically handed to state governments to spend as they choose." },
  { label: "Interest payments", pct: 20, note: "The cost of servicing money already borrowed in past years. This funds nothing new — it just pays for old debt." },
  { label: "Central sector schemes", pct: 17, note: "Programmes designed, funded, and run entirely by the central government — e.g. PM-KISAN, highway construction, defence procurement." },
  { label: "Defence", pct: 11, note: "Armed forces' salaries, pensions, and equipment. (Some defence spending also sits inside central sector schemes above.)" },
  { label: "Centrally sponsored schemes", pct: 8, note: "Programmes jointly funded by the Centre and states, but carried out by state governments — e.g. MGNREGA, Ayushman Bharat." },
  { label: "Finance Commission & other transfers", pct: 7, note: "Extra grants to states on top of their automatic tax share, decided by the Finance Commission." },
  { label: "Other expenditure", pct: 7, note: "Everything that doesn't fit the categories above." },
  { label: "Major subsidies", pct: 6, note: "Food, fertiliser, and fuel/LPG subsidies." },
  { label: "Civil pensions", pct: 2, note: "Pensions for retired central government employees." },
];

const NEW_REGIME_SLABS = [
  { range: "Up to ₹4,00,000", rate: "Nil" },
  { range: "₹4,00,001 – ₹8,00,000", rate: "5%" },
  { range: "₹8,00,001 – ₹12,00,000", rate: "10%" },
  { range: "₹12,00,001 – ₹16,00,000", rate: "15%" },
  { range: "₹16,00,001 – ₹20,00,000", rate: "20%" },
  { range: "₹20,00,001 – ₹24,00,000", rate: "25%" },
  { range: "Above ₹24,00,000", rate: "30%" },
];

const OLD_REGIME_SLABS = [
  { range: "Up to ₹2,50,000", rate: "Nil" },
  { range: "₹2,50,001 – ₹5,00,000", rate: "5%" },
  { range: "₹5,00,001 – ₹10,00,000", rate: "20%" },
  { range: "Above ₹10,00,000", rate: "30%" },
];

const CORPORATE_RATES = [
  { label: "Domestic company, turnover ≤ ₹400 cr in FY 2024-25", rate: "25%" },
  { label: "Domestic company, turnover > ₹400 cr", rate: "30%" },
  { label: "Concessional regime (Sec. 115BAA, no exemptions claimed)", rate: "22%" },
  { label: "New manufacturing company incorporated after 1 Oct 2019 (Sec. 115BAB)", rate: "15%" },
  { label: "Foreign company", rate: "35%" },
];

const GST_SLABS = [
  { rate: "0%", desc: "Unbranded food staples, individual health/life insurance, lifesaving medicines, educational stationery" },
  { rate: "5%", desc: "Packaged food items, basic household goods (soap, toothpaste), essential services" },
  { rate: "18%", desc: "The default/standard rate — most goods and services, including many items moved down from the pre-2025 28% slab" },
  { rate: "40%", desc: "Sin and luxury goods — tobacco, pan masala, certain carbonated drinks, select luxury vehicles" },
  { rate: "3% / 0.25%", desc: "Special rates: gold, silver & jewellery (3%); rough diamonds (0.25%)" },
];

function StatTile({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-xl border border-canvas-line bg-canvas-raised p-4 sm:p-5">
      <div className="font-mono-data text-2xl sm:text-3xl font-semibold text-ink">{value}</div>
      <div className="text-xs text-ink-faint mt-1 leading-snug">{label}</div>
    </div>
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
    <section className="mb-14 sm:mb-16">
      <div className="flex items-baseline gap-3 mb-5">
        <span className="font-mono-data text-xs text-accent">{eyebrow}</span>
        <h2 className="font-display text-2xl sm:text-3xl">{title}</h2>
      </div>
      {children}
    </section>
  );
}

export default function StatisticsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-14 sm:py-20">
      <div className="font-mono-data text-xs uppercase tracking-[0.2em] text-accent mb-3">
        Reference · Not an investigation
      </div>
      <h1 className="font-display text-4xl sm:text-5xl mb-4">India, By the Numbers</h1>
      <p className="text-ink-dim leading-relaxed mb-4">
        A plain reference page — no promise-vs-reality gap is being argued here, just sourced
        figures. Budget and tax numbers are the government&apos;s own Union Budget 2026-27
        figures (presented 1 February 2026); global rankings come from the organisations that
        publish them. Every figure is sourced at the bottom of the page.
      </p>
      <p className="text-sm text-ink-faint leading-relaxed mb-10">
        These figures change every Budget and every time an index is re-published. Percentages
        for ministries beyond the four the government itself publishes a share for (Defence,
        Roads, Railways, Home Affairs) are this site&apos;s own calculation — each ministry&apos;s
        disclosed crore figure divided by total expenditure — not a government-published
        percentage.
      </p>

      <Section eyebrow="01" title="The budget at a glance">
        <div className="grid grid-cols-2 gap-4">
          <StatTile value="₹53,47,315 cr" label="Total budgeted expenditure, 2026-27 (+7.7% over FY26 revised estimate)" />
          <StatTile value="₹12.2 lakh cr" label="Capital expenditure (+~9% year-on-year)" />
          <StatTile value="4.3%" label="Fiscal deficit target, as a share of GDP" />
          <StatTile value="55.6%" label="Total government debt, as a share of GDP" />
        </div>
      </Section>

      <Section eyebrow="02" title="Where every rupee comes from">
        <p className="text-sm text-ink-dim leading-relaxed mb-6">
          This is the standard breakdown the Budget itself publishes, in the order it usually
          appears — for every ₹100 the central government raised in 2026-27, here&apos;s where
          it came from, with a plain-language note on what each line actually means.
        </p>
        <div className="space-y-5">
          {RUPEE_COMES_FROM.map((r) => (
            <div key={r.label}>
              <div className="flex items-baseline justify-between gap-3 mb-1.5">
                <span className="text-sm text-ink font-medium">{r.label}</span>
                <span className="shrink-0 font-mono-data text-sm text-accent">₹{r.pct}</span>
              </div>
              <div className="h-2 rounded-full bg-canvas-line/60 overflow-hidden mb-2">
                <div className="h-full rounded-full bg-accent" style={{ width: `${r.pct}%` }} />
              </div>
              <p className="text-xs text-ink-faint leading-relaxed">{r.note}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="03" title="Where every rupee goes">
        <p className="text-sm text-ink-dim leading-relaxed mb-6">
          The same ₹100, spent. This is a different cut from the ministry-by-ministry table
          further down — this one is by budget head (who the money legally must go to, or what
          kind of spending it is), not by which ministry administers it.
        </p>
        <div className="space-y-5">
          {RUPEE_GOES_TO.map((r) => (
            <div key={r.label}>
              <div className="flex items-baseline justify-between gap-3 mb-1.5">
                <span className="text-sm text-ink font-medium">{r.label}</span>
                <span className="shrink-0 font-mono-data text-sm text-accent">₹{r.pct}</span>
              </div>
              <div className="h-2 rounded-full bg-canvas-line/60 overflow-hidden mb-2">
                <div className="h-full rounded-full bg-accent" style={{ width: `${r.pct}%` }} />
              </div>
              <p className="text-xs text-ink-faint leading-relaxed">{r.note}</p>
            </div>
          ))}
        </div>
        <p className="text-xs text-ink-faint mt-2 leading-relaxed">
          Note the two biggest lines — states&apos; share of taxes (22%) and interest payments
          (20%) — together are 42% of all spending, and neither is discretionary: one is a
          constitutional/legal obligation to states, the other is the bill for past borrowing.
          Less than 6 rupees in 10 are actually available for the government&apos;s own new
          spending choices in a given year.
        </p>
      </Section>

      <Section eyebrow="04" title="A closer look, by ministry">
        <div className="space-y-4">
          {MINISTRIES.map((m) => (
            <div key={m.label}>
              <div className="flex items-baseline justify-between gap-3 mb-1.5">
                <span className="text-sm text-ink-dim">{m.label}</span>
                <span className="shrink-0 font-mono-data text-xs text-ink whitespace-nowrap">
                  {m.value}
                  <span className="text-ink-faint"> · {m.pct.toFixed(1)}%</span>
                </span>
              </div>
              <div className="h-2 rounded-full bg-canvas-line/60 overflow-hidden">
                <div
                  className="h-full rounded-full bg-accent"
                  style={{ width: `${Math.max(m.pct, 2)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-ink-faint mt-4 leading-relaxed">
          Defence, Roads, Railways, and Home Affairs are the four ministries with government-
          disclosed expenditure shares; the rest above are derived by dividing each disclosed
          crore figure by total expenditure. This table mixes ministry budgets with the budget-head
          view above — a rupee inside &ldquo;Defence&rdquo; here also counts inside &ldquo;Central
          sector schemes&rdquo; or &ldquo;Defence&rdquo; above, so do not add the two sections
          together.
        </p>
      </Section>

      <Section eyebrow="05" title="How it's funded">
        <div className="grid grid-cols-2 gap-4">
          <StatTile value="1.5%" label="Revenue deficit, as a share of GDP" />
          <StatTile value="₹17.2 lakh cr" label="Gross market borrowing planned for the year" />
          <StatTile value="₹11.7 lakh cr" label="Net market borrowing (dated securities)" />
          <StatTile value="4.4% → 4.3%" label="Fiscal deficit: FY26 revised estimate versus the FY27 target" />
        </div>
      </Section>

      <Section eyebrow="06" title="Personal income tax — new regime (default, FY 2026-27)">
        <div className="overflow-x-auto rounded-xl border border-canvas-line">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-canvas-line bg-canvas-raised text-left text-ink-faint text-xs uppercase tracking-wider">
                <th className="px-4 py-3 font-medium">Income slab</th>
                <th className="px-4 py-3 font-medium">Rate</th>
              </tr>
            </thead>
            <tbody>
              {NEW_REGIME_SLABS.map((s) => (
                <tr key={s.range} className="border-b border-canvas-line last:border-0">
                  <td className="px-4 py-3 font-mono-data text-ink-dim">{s.range}</td>
                  <td className="px-4 py-3 font-mono-data text-ink">{s.rate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-sm text-ink-dim leading-relaxed mt-4">
          A Section 87A rebate of ₹60,000 brings tax liability to zero for taxable income up to
          ₹12 lakh. With the ₹75,000 standard deduction for salaried taxpayers, gross salary up
          to roughly ₹12.75 lakh is effectively tax-free under this regime. These slabs were
          unchanged in the 2026 Budget, carried over from the prior year.
        </p>
      </Section>

      <Section eyebrow="07" title="Personal income tax — old regime (optional)">
        <div className="overflow-x-auto rounded-xl border border-canvas-line">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-canvas-line bg-canvas-raised text-left text-ink-faint text-xs uppercase tracking-wider">
                <th className="px-4 py-3 font-medium">Income slab</th>
                <th className="px-4 py-3 font-medium">Rate</th>
              </tr>
            </thead>
            <tbody>
              {OLD_REGIME_SLABS.map((s) => (
                <tr key={s.range} className="border-b border-canvas-line last:border-0">
                  <td className="px-4 py-3 font-mono-data text-ink-dim">{s.range}</td>
                  <td className="px-4 py-3 font-mono-data text-ink">{s.rate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-sm text-ink-dim leading-relaxed mt-4">
          Taxpayers may still elect the old regime, which allows deductions (Section 80C, HRA,
          home-loan interest, and others) the new regime does not. The new regime is the default
          if no election is made.
        </p>
      </Section>

      <Section eyebrow="08" title="Corporate tax rates">
        <div className="space-y-3">
          {CORPORATE_RATES.map((c) => (
            <div key={c.label} className="flex items-center justify-between gap-4 rounded-lg border border-canvas-line p-4">
              <span className="text-sm text-ink-dim">{c.label}</span>
              <span className="font-mono-data text-lg text-ink shrink-0">{c.rate}</span>
            </div>
          ))}
        </div>
        <p className="text-xs text-ink-faint mt-4 leading-relaxed">
          A surcharge (7% or 12%, depending on income level) and a 4% Health & Education Cess
          apply on top of these base rates.
        </p>
      </Section>

      <Section eyebrow="09" title="GST rate slabs (post-2025 reform)">
        <div className="space-y-3">
          {GST_SLABS.map((g) => (
            <div key={g.rate} className="flex items-start gap-4 rounded-lg border border-canvas-line p-4">
              <span className="font-mono-data text-lg text-accent shrink-0 w-20">{g.rate}</span>
              <span className="text-sm text-ink-dim leading-relaxed">{g.desc}</span>
            </div>
          ))}
        </div>
        <p className="text-xs text-ink-faint mt-4 leading-relaxed">
          The September 2025 &ldquo;GST 2.0&rdquo; reform collapsed the previous four-slab structure
          (5% / 12% / 18% / 28%) into essentially two working slabs (5% and 18%) plus a new 40%
          slab for sin/luxury goods, moving most items previously taxed at 12% or 28% into the
          5% or 18% bands respectively.
        </p>
      </Section>

      <Section eyebrow="10" title="The justice system's backlog">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <StatTile value="5.39 cr" label="Total cases pending across Supreme Court, High Courts, and district/subordinate courts, as of 31 Dec 2025" />
          <StatTile value="4.76 cr" label="Pending in district & subordinate courts alone — the vast majority of the backlog" />
          <StatTile value="63.66 lakh" label="Pending across all 25 High Courts" />
          <StatTile value="92,101" label="Pending in the Supreme Court itself — up 11.4% from 82,674 two years earlier" />
        </div>
        <p className="text-sm text-ink-dim leading-relaxed">
          This site could not find a single official &ldquo;resolution rate&rdquo; percentage
          published alongside these figures, so none is asserted here — inventing one would
          violate this site&apos;s own sourcing standard. What the data does show directly: the
          backlog is <strong className="text-ink">growing, not shrinking</strong> — Supreme Court
          pendency rose 11.4% and High Court pendency rose 4.75% over the periods measured — which
          means courts are disposing of cases more slowly than new ones arrive, not that a fixed
          share of cases goes unresolved forever.
        </p>
      </Section>

      <Section eyebrow="11" title="India's national debt">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <StatTile value="₹214.82 lakh cr" label="Total Union Government debt, projected end of FY 2026-27" />
          <StatTile value="₹197.18 lakh cr" label="Total Union Government debt, revised estimate end of FY 2025-26" />
          <StatTile value="~95%" label="Share that is internal — owed to lenders inside India" />
          <StatTile value="~5%" label="Share that is external — mostly low-cost multilateral/bilateral loans" />
        </div>
        <p className="text-sm text-ink-dim leading-relaxed mb-4">
          &ldquo;Internal&rdquo; debt is rupee-denominated borrowing from domestic lenders —
          banks, insurers, provident funds, the RBI, and retail investors — mainly through
          government bonds and treasury bills sold at auction (the ₹17.2 lakh crore of gross
          market borrowing planned for 2026-27, above, is the single biggest addition to this
          pile each year). This is who the 20% of every rupee spent on &ldquo;interest
          payments&rdquo; above is actually paid to.
        </p>
        <p className="text-sm text-ink-dim leading-relaxed">
          This is a separate, narrower number from <strong className="text-ink">India&apos;s
          total external debt</strong> — a broader national-accounts measure that also counts
          foreign borrowing by Indian companies and banks, not just the government — which stood
          at roughly $762.8 billion as of March 2026, over half of it denominated in US dollars.
        </p>
      </Section>

      <Section eyebrow="12" title="Debt since Independence">
        <p className="text-sm text-ink-dim leading-relaxed mb-6">
          Absolute rupee figures from decades ago are not meaningful on their own — inflation and
          a much smaller economy make old rupee amounts incomparable to today&apos;s. Debt as a
          share of GDP is the standard way this is tracked over time. Reliable year-by-year
          figures going all the way back to 1947 were not found in the sources reviewed for this
          page; the series below starts from 1960, the earliest point with consistent data.
        </p>
        <div className="space-y-4">
          {DEBT_HISTORY.map((d) => (
            <div key={d.year}>
              <div className="flex items-baseline justify-between gap-3 mb-1.5">
                <span className="text-sm text-ink-dim font-mono-data">{d.year}</span>
                <span className="font-mono-data text-sm text-ink">{d.pct.toFixed(1)}% of GDP</span>
              </div>
              <div className="h-2 rounded-full bg-canvas-line/60 overflow-hidden">
                <div
                  className="h-full rounded-full bg-accent"
                  style={{ width: `${Math.min(d.pct, 100)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-ink-faint mt-4 leading-relaxed">
          The debt ratio was relatively stable through the 1960s–80s (37–42%), climbed steadily
          from the 1990s liberalisation era through the 2010s (53% to 72%), then spiked sharply in
          2020–21 as COVID-19 shrank the economy while emergency spending rose — the single
          largest one-year jump in India&apos;s post-reform history — before easing back down
          toward the mid-50s in the years since.
        </p>
      </Section>

      <Section eyebrow="13" title="Where India ranks globally">
        <div className="space-y-5">
          {GLOBAL_RANKINGS.map((r) => (
            <div key={r.label} className="rounded-lg border border-canvas-line p-4">
              <div className="flex items-baseline justify-between gap-3 mb-1.5">
                <span className="text-sm text-ink font-medium">{r.label}</span>
                <span className="font-mono-data text-sm text-accent shrink-0">{r.value}</span>
              </div>
              <p className="text-xs text-ink-faint leading-relaxed">{r.note}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="14" title="Who represents you, and what it costs">
        <div className="grid grid-cols-3 gap-4 mb-6">
          {REPRESENTATIVES.map((r) => (
            <StatTile key={r.label} value={r.value} label={r.label} />
          ))}
        </div>
        <p className="text-sm text-ink-dim leading-relaxed mb-4">
          India does not hold all elections on a fixed 4-year cycle — Lok Sabha and most state
          assembly terms run 5 years, and state elections are staggered across different years
          rather than held together. A Delimitation Bill introduced in 2026 proposes raising the
          Lok Sabha from 543 to 850 seats; it has not taken effect as of this page&apos;s
          publication.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <StatTile value="~₹1.35 lakh cr" label="Estimated total cost of the 2024 Lok Sabha election — more than double the ~₹60,000 cr spent in 2019" />
          <StatTile value="₹3,352.81 cr" label="Reported by 32 national/regional parties combined for the 2024 Lok Sabha + 4 state assembly elections" />
          <StatTile value="44.6%" label="Share of that party spending reported by a single party (BJP, ₹1,493.91 cr)" />
          <StatTile value="~₹57.2 lakh" label="Average campaign spend reported by a winning 2024 Lok Sabha candidate" />
        </div>
      </Section>

      <Section eyebrow="15" title="The cost of living, then and now">
        <p className="text-sm text-ink-dim leading-relaxed mb-6">
          Prices have not just risen — they have compounded, year after year, for decades. Overall,
          consumer prices in 2026 are estimated at roughly <strong className="text-ink">4.55×</strong> their
          2000 level — a cumulative rise of about 354.57% (roughly a 6.00% average annual rate) —
          meaning ₹100 in 2000 bought what takes about ₹455 today.
        </p>
        <div className="space-y-3 mb-8">
          {INFLATION_DECADES.map((d) => (
            <div key={d.label} className="flex items-center justify-between gap-3 rounded-lg border border-canvas-line px-4 py-3">
              <span className="text-sm text-ink">{d.label}</span>
              <span className="font-mono-data text-sm text-accent">{d.pct} avg. annual inflation</span>
            </div>
          ))}
        </div>
        <p className="text-xs text-ink-faint leading-relaxed mb-6">
          Inflation has actually been trending down, not up — 2025&apos;s average of 2.09% is one of
          the lowest on record, well below the long-run (1960-2025) average of roughly 7.2-7.4%, and
          far below the 12.4% peak hit in 2009-10. The complaint that &ldquo;everything is expensive&rdquo;
          is consistent with this data: prices keep rising every year, they just rise more slowly now
          than in past decades. A slower rate of increase is not the same as prices coming down.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          {THEN_VS_NOW.map((t) => (
            <div key={t.label} className="rounded-lg border border-canvas-line p-4">
              <div className="text-sm text-ink font-medium mb-2">{t.label}</div>
              <div className="flex items-baseline justify-between gap-3 font-mono-data text-sm">
                <span className="text-ink-dim">{t.then}</span>
                <span className="text-ink-faint">→</span>
                <span className="text-accent">{t.now}</span>
              </div>
              <p className="text-xs text-ink-faint leading-relaxed mt-2">{t.note}</p>
            </div>
          ))}
        </div>
        <p className="text-xs text-ink-faint leading-relaxed mt-6">
          Reliable, cleanly comparable 2000-vs-2026 figures for milk, rice, and gold were not found in
          the sources reviewed for this page and are deliberately left out rather than estimated. What
          could be confirmed for gold: the price per 10 grams rose from roughly ₹4,400 (2000) to over
          ₹1,60,000 by 2026 — a rise of well over 30×, making gold one of the few assets that has
          outpaced, not just tracked, the cost of living.
        </p>
      </Section>

      <div className="rounded-2xl border border-canvas-line bg-canvas-raised p-6 sm:p-8">
        <h3 className="text-sm font-medium mb-3">Sources</h3>
        <ul className="space-y-2 text-sm text-ink-dim leading-relaxed list-disc list-inside">
          <li>PIB — Highlights of Union Budget 2026-27 (pib.gov.in)</li>
          <li>The &ldquo;rupee comes from / rupee goes to&rdquo; breakdown — the Union Budget&apos;s own standard receipts and expenditure charts for 2026-27</li>
          <li>Court pendency figures — Ministry of Law and Justice reply to the Lok Sabha, citing the National Judicial Data Grid (NJDG), data as of 31 December 2025</li>
          <li>Government debt figures — Receipt Budget 2026-27, &ldquo;Debt Position of the Government of India&rdquo; (indiabudget.gov.in); India&apos;s total external debt — RBI data as of March 2026</li>
          <li>PRS Legislative Research — Union Budget 2026-27 Analysis of Expenditure by Ministries</li>
          <li>Income tax slabs and corporate tax rates — Income Tax Department provisions for AY 2027-28, as summarised by ClearTax and IndiaFilings</li>
          <li>GST 2.0 rate structure — CBIC notifications effective September 2025, as summarised by ClearTax and Razorpay</li>
          <li>Historical debt-to-GDP figures — academic and financial-press estimates for 1960–2021, as no single official series covering the full period was located</li>
          <li>Human Development Index — UNDP Human Development Report; Quality of Life Index — an independent cross-country index; World Press Freedom Index — Reporters Without Borders (RSF), 2026 edition; sanitation access — WHO/UNICEF Joint Monitoring Programme</li>
          <li>Elected representatives — Election Commission of India seat counts; 2024 election cost estimates — Business Standard reporting and the Association for Democratic Reforms&apos; (ADR) analysis of party and candidate expenditure disclosures</li>
          <li>Decade-wise CPI inflation averages, 2025 average, and historical peak/low — Ministry of Statistics and Programme Implementation (MOSPI) data as summarised by financial-press reporting; petrol and LPG then-vs-now prices and cumulative 2000-2026 price index — retail-price reporting and inflation-calculator analyses; gold price history — ClearTax and BankBazaar historical gold-rate data</li>
        </ul>
        <p className="text-xs text-ink-faint mt-4">
          This page will need updating at the next Union Budget and with any mid-year tax
          notification. Figures here were current as of September 2026.
        </p>
      </div>

      <div className="mt-12">
        <Link href="/" className="text-sm text-ink-dim hover:text-ink underline">
          ← Back to home
        </Link>
      </div>
    </div>
  );
}
