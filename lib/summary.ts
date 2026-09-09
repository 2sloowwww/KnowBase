import { getAllInvestigations } from "./data";
import { CATEGORY_VALUES, STATUS_VALUES, Category, Status } from "./types";

/**
 * Aggregate stats for the site's "by the numbers" summary.
 *
 * These figures are deliberately NOT a single blended "total fraud amount." A CAG
 * presumptive-loss estimate, a CBI chargesheet's alleged-fraud figure, and a court-confirmed
 * cost overrun are three different kinds of number (see /methodology). Summing them into one
 * headline would itself be a distortion of the kind this site is built to call out elsewhere.
 *
 * Instead, each case is explicitly assigned (by slug, by hand) to at most one "alleged/estimated"
 * figure and at most one "confirmed recovered/established" figure, only where that case's own
 * numbers genuinely represent that concept. Cases whose gap measures something else entirely
 * (a draft-vs-final estimate revision, a time-in-custody count, a unit count of jeeps) are
 * excluded from the money totals rather than coerced into them.
 */

export { formatCr, formatCrFull, formatCrDigits, formatRupeesFull } from "./format";

interface MoneyEntry {
  slug: string;
  allegedINRCr: number | null;
  recoveredINRCr: number | null;
}

// Hand-curated, not inferred — see comment above.
const MONEY_ENTRIES: MoneyEntry[] = [
  { slug: "coal-block-allocation-scam", allegedINRCr: 186000, recoveredINRCr: null },
  { slug: "telgi-stamp-paper-scam", allegedINRCr: 20000, recoveredINRCr: null },
  { slug: "rajasthan-jal-jeevan-mission-scam", allegedINRCr: 900, recoveredINRCr: null },
  { slug: "sunil-kedar-nagpur-cooperative-bank-scam", allegedINRCr: 150, recoveredINRCr: null },
  { slug: "new-india-cooperative-bank-fraud", allegedINRCr: 122, recoveredINRCr: null },
  { slug: "2g-spectrum-allocation-case", allegedINRCr: 176000, recoveredINRCr: 0 },
  { slug: "bofors-scandal", allegedINRCr: 41, recoveredINRCr: 0 },
  { slug: "dhfl-bank-fraud", allegedINRCr: 34615, recoveredINRCr: 1020 },
  { slug: "abg-shipyard-bank-fraud", allegedINRCr: 22842, recoveredINRCr: 2747.69 },
  { slug: "commonwealth-games-2010-scam", allegedINRCr: null, recoveredINRCr: null },
  { slug: "pnb-nirav-modi-fraud", allegedINRCr: 14357, recoveredINRCr: 692.9 },
  { slug: "agustawestland-chopper-scam", allegedINRCr: null, recoveredINRCr: null },
  { slug: "saradha-chit-fund-scam", allegedINRCr: 1900, recoveredINRCr: null },
  { slug: "mgnrega-fund-misappropriation", allegedINRCr: 169.75, recoveredINRCr: 20.93 },
  { slug: "jeep-scandal-1948", allegedINRCr: null, recoveredINRCr: null },
  { slug: "ilfs-crisis", allegedINRCr: 91000, recoveredINRCr: null },
  { slug: "vijay-mallya-kingfisher-default", allegedINRCr: 9000, recoveredINRCr: 14000 },
  { slug: "pmc-bank-hdil-fraud", allegedINRCr: 4355, recoveredINRCr: 3500 },
  { slug: "vyapam-scam", allegedINRCr: null, recoveredINRCr: null },
  { slug: "karvy-stock-broking-scam", allegedINRCr: 2700, recoveredINRCr: 1984 },
  { slug: "icici-videocon-loan-case", allegedINRCr: null, recoveredINRCr: null },
  { slug: "satyam-computers-scam", allegedINRCr: 7000, recoveredINRCr: null },
  { slug: "sahara-sebi-case", allegedINRCr: 25781, recoveredINRCr: 138 },
  { slug: "harshad-mehta-securities-scam", allegedINRCr: 4000, recoveredINRCr: null },
  { slug: "rose-valley-chit-fund-scam", allegedINRCr: 12000, recoveredINRCr: 1172 },
  { slug: "nsel-scam", allegedINRCr: 5574, recoveredINRCr: null },
  { slug: "yes-bank-rana-kapoor-fraud", allegedINRCr: null, recoveredINRCr: null },
  { slug: "fodder-scam", allegedINRCr: 950, recoveredINRCr: null },
  { slug: "ketan-parekh-securities-scam", allegedINRCr: 3218, recoveredINRCr: null },
  { slug: "fortis-religare-singh-brothers-fraud", allegedINRCr: 2397, recoveredINRCr: null },
  { slug: "adarsh-housing-society-scam", allegedINRCr: null, recoveredINRCr: null },
  { slug: "delhi-excise-policy-case", allegedINRCr: null, recoveredINRCr: null },
  { slug: "west-bengal-teacher-recruitment-scam", allegedINRCr: 641, recoveredINRCr: 49.8 },
  { slug: "up-nrhm-scam", allegedINRCr: 5000, recoveredINRCr: null },
  { slug: "land-for-jobs-scam", allegedINRCr: 4.39, recoveredINRCr: 6 },
  { slug: "mahadev-betting-app-scam", allegedINRCr: 6000, recoveredINRCr: 2426 },
  { slug: "neet-ug-2026-controversy", allegedINRCr: null, recoveredINRCr: null },
  { slug: "rhfl-bank-fraud", allegedINRCr: 3526.35, recoveredINRCr: null },
  { slug: "haryana-government-funds-fraud", allegedINRCr: 950, recoveredINRCr: null },
  { slug: "prayag-group-chit-fund-scam", allegedINRCr: 2800, recoveredINRCr: null },
  { slug: "yes-bank-anil-ambani-fraud", allegedINRCr: 13000, recoveredINRCr: null },
  { slug: "reliance-communications-bob-fraud", allegedINRCr: 2220, recoveredINRCr: null },
  { slug: "karti-chidambaram-inx-media-case", allegedINRCr: 65.88, recoveredINRCr: 64.97 },
  { slug: "bhushan-power-steel-bank-fraud", allegedINRCr: 47204, recoveredINRCr: 4025 },
  { slug: "sterling-biotech-bank-fraud", allegedINRCr: 8100, recoveredINRCr: null },
  { slug: "winsome-diamond-bank-fraud", allegedINRCr: 4627, recoveredINRCr: null },
  { slug: "rotomac-loan-fraud", allegedINRCr: 3695, recoveredINRCr: null },
  { slug: "reliance-communications-ericsson-contempt", allegedINRCr: 550, recoveredINRCr: 453 },
  { slug: "srei-infrastructure-finance-collapse", allegedINRCr: 13110, recoveredINRCr: null },
  { slug: "pacl-ponzi-scheme", allegedINRCr: 49100, recoveredINRCr: 1022 },
  { slug: "karnataka-illegal-mining-scam", allegedINRCr: 884, recoveredINRCr: null },
  { slug: "odisha-illegal-mining-scam", allegedINRCr: 59200, recoveredINRCr: null },
  { slug: "aircel-maxis-deal", allegedINRCr: 742, recoveredINRCr: 0 },
  // Batch added when the database grew past 130 cases — same rules: only a case's own
  // genuine alleged/estimated and confirmed-recovered figures, in ₹ crore. USD-denominated
  // cases (Adani, Antrix-Devas, Byju's, GainBitcoin) and cases with no defensible single
  // rupee figure are deliberately left out entirely, not coerced to null/null noise.
  { slug: "amrapali-group-homebuyers-fraud", allegedINRCr: 11500, recoveredINRCr: null },
  { slug: "amtek-auto-insolvency-case", allegedINRCr: 12700, recoveredINRCr: 2650 },
  { slug: "andhra-pradesh-fibernet-scam", allegedINRCr: 114, recoveredINRCr: 0 },
  { slug: "andhra-pradesh-skill-development-corporation-scam", allegedINRCr: 176.27, recoveredINRCr: 0 },
  { slug: "army-colonel-defence-tender-bribery-case", allegedINRCr: 0.5, recoveredINRCr: null },
  { slug: "assam-sarba-siksha-abhiyan-scam", allegedINRCr: 200, recoveredINRCr: null },
  { slug: "ayushman-bharat-pmjay-fraud", allegedINRCr: 643, recoveredINRCr: 231 },
  { slug: "bharatpe-ashneer-grover-dispute", allegedINRCr: 81, recoveredINRCr: null },
  { slug: "paytm-ipo-listing-crash", allegedINRCr: 97000, recoveredINRCr: null },
  { slug: "sebi-shell-companies-bogus-ltcg-crackdown", allegedINRCr: 38000, recoveredINRCr: null },
  { slug: "sebi-superior-finlease-pump-and-dump", allegedINRCr: 11.9, recoveredINRCr: 3.89 },
  { slug: "bihar-illegal-sand-mining-scam", allegedINRCr: 131, recoveredINRCr: 1.53 },
  { slug: "bihar-srijan-scam", allegedINRCr: 1000, recoveredINRCr: null },
  { slug: "bmc-covid-ppe-mask-procurement-scam", allegedINRCr: 4000, recoveredINRCr: null },
  { slug: "chhattisgarh-coal-levy-scam", allegedINRCr: 540, recoveredINRCr: 150 },
  { slug: "chhattisgarh-liquor-scam", allegedINRCr: 2883, recoveredINRCr: 420 },
  { slug: "citibank-gurgaon-relationship-manager-fraud", allegedINRCr: 400, recoveredINRCr: null },
  { slug: "concast-steel-power-bank-fraud", allegedINRCr: 6210, recoveredINRCr: 434 },
  { slug: "cox-and-kings-fund-diversion-case", allegedINRCr: 6968, recoveredINRCr: null },
  { slug: "crb-capital-markets-scam", allegedINRCr: 1200, recoveredINRCr: null },
  { slug: "deccan-chronicle-bank-loan-fraud-case", allegedINRCr: 8180, recoveredINRCr: 386.17 },
  { slug: "delhi-jal-board-tanker-scam", allegedINRCr: 400, recoveredINRCr: null },
  { slug: "digital-arrest-cyber-fraud-money-trail", allegedINRCr: 417.49, recoveredINRCr: 3.25 },
  { slug: "dsk-group-real-estate-ponzi-case", allegedINRCr: 2043.18, recoveredINRCr: null },
  { slug: "emu-farming-scam", allegedINRCr: 97.48, recoveredINRCr: null },
  { slug: "essar-steel-insolvency-case", allegedINRCr: 55000, recoveredINRCr: 42000 },
  { slug: "franklin-templeton-mutual-fund-wind-up", allegedINRCr: 512, recoveredINRCr: 250 },
  { slug: "go-first-airlines-insolvency", allegedINRCr: 11000, recoveredINRCr: null },
  { slug: "hdw-submarine-scam", allegedINRCr: 32.5, recoveredINRCr: null },
  { slug: "home-trade-dot-com-scam", allegedINRCr: 600, recoveredINRCr: null },
  { slug: "ima-ponzi-scheme", allegedINRCr: 1500, recoveredINRCr: null },
  { slug: "jharkhand-bengal-gst-fake-invoice-scam", allegedINRCr: 750, recoveredINRCr: 15 },
  { slug: "kaleshwaram-lift-irrigation-project-scam", allegedINRCr: 2684.73, recoveredINRCr: null },
  { slug: "karnataka-psi-recruitment-scam", allegedINRCr: 5, recoveredINRCr: null },
  { slug: "karuvannur-cooperative-bank-scam", allegedINRCr: 180, recoveredINRCr: 128 },
  { slug: "lic-housing-finance-loan-for-bribe-scam", allegedINRCr: 1000, recoveredINRCr: null },
  { slug: "madhya-pradesh-e-tendering-scam", allegedINRCr: 3000, recoveredINRCr: null },
  { slug: "madhya-pradesh-ppe-kit-procurement-scam", allegedINRCr: 0.33, recoveredINRCr: null },
  { slug: "madhya-pradesh-scholarship-scam", allegedINRCr: 144.33, recoveredINRCr: 0.43 },
  { slug: "maharashtra-irrigation-scam", allegedINRCr: 35000, recoveredINRCr: null },
  { slug: "maharashtra-state-cooperative-bank-scam", allegedINRCr: 1000, recoveredINRCr: null },
  { slug: "national-herald-case", allegedINRCr: 2000, recoveredINRCr: null },
  { slug: "odisha-seashore-chit-fund-scam", allegedINRCr: 578, recoveredINRCr: 650 },
  { slug: "pincon-group-ponzi-scheme", allegedINRCr: 1600, recoveredINRCr: null },
  { slug: "pm-awas-yojana-fake-beneficiaries-scam", allegedINRCr: 1.59, recoveredINRCr: null },
  { slug: "pm-kisan-scheme-irregularities", allegedINRCr: 416, recoveredINRCr: 416 },
  { slug: "punjab-foodgrain-procurement-tender-scam", allegedINRCr: 2000, recoveredINRCr: null },
  { slug: "reebok-india-accounting-fraud", allegedINRCr: 870, recoveredINRCr: null },
  { slug: "religare-finvest-fund-diversion-case", allegedINRCr: 2397, recoveredINRCr: 60 },
  { slug: "sebi-hanif-shekh-pump-and-dump-scam", allegedINRCr: 143.79, recoveredINRCr: 10 },
  { slug: "snc-lavalin-kerala-hydroelectric-case", allegedINRCr: 374.5, recoveredINRCr: null },
  { slug: "speak-asia-online-ponzi-scheme", allegedINRCr: 2200, recoveredINRCr: null },
  { slug: "srs-group-ponzi-scheme", allegedINRCr: 2215.98, recoveredINRCr: 650 },
  { slug: "tamil-nadu-beach-sand-mining-scam", allegedINRCr: 5832, recoveredINRCr: null },
  { slug: "tasmac-liquor-corporation-scam", allegedINRCr: 1000, recoveredINRCr: null },
  { slug: "tatra-truck-scam", allegedINRCr: 750, recoveredINRCr: null },
  { slug: "tspsc-paper-leak-case", allegedINRCr: 1.63, recoveredINRCr: null },
  { slug: "unitech-group-homebuyers-fraud", allegedINRCr: 14270, recoveredINRCr: null },
  { slug: "uti-us64-scheme-scandal", allegedINRCr: 14500, recoveredINRCr: null },
  { slug: "uttar-pradesh-food-grain-scam", allegedINRCr: 35000, recoveredINRCr: null },
  { slug: "videocon-group-insolvency-collapse", allegedINRCr: 61773, recoveredINRCr: 2962 },
  { slug: "vodafone-idea-agr-dues-crisis", allegedINRCr: 87695, recoveredINRCr: 53083 },
];

export interface SummaryStats {
  totalCases: number;
  earliestYear: number;
  latestYear: number;
  byStatus: { status: Status; count: number }[];
  byCategory: { category: Category; count: number }[];
  byDecade: { decade: string; count: number }[];
  money: {
    /** Sum of each case's own headline alleged/estimated figure, in ₹ crore. Not directly comparable across cases — see module comment. */
    totalAllegedINRCr: number;
    /** Sum of each case's own confirmed recovered/attached/established figure, in ₹ crore. */
    totalRecoveredINRCr: number;
    /** Cases contributing to both figures above (used for an apples-to-apples recovery rate). */
    comparableCaseSlugs: string[];
    comparableAllegedINRCr: number;
    comparableRecoveredINRCr: number;
    recoveryRatePct: number;
    casesWithoutComparableFigures: string[];
  };
}

function decadeLabel(year: number): string {
  const decadeStart = Math.floor(year / 10) * 10;
  return `${decadeStart}s`;
}

export function getSummaryStats(): SummaryStats {
  const all = getAllInvestigations();

  const years = all.map((inv) => new Date(inv.promise.date).getFullYear());
  const earliestYear = Math.min(...years);
  const latestYear = Math.max(...years);

  const byStatus = STATUS_VALUES.map((status) => ({
    status,
    count: all.filter((inv) => inv.status === status).length,
  }));

  const byCategory = CATEGORY_VALUES.map((category) => ({
    category,
    count: all.filter((inv) => inv.category === category).length,
  })).filter((c) => c.count > 0);

  const decadeCounts = new Map<string, number>();
  for (const year of years) {
    const label = decadeLabel(year);
    decadeCounts.set(label, (decadeCounts.get(label) ?? 0) + 1);
  }
  const byDecade = Array.from(decadeCounts.entries())
    .map(([decade, count]) => ({ decade, count }))
    .sort((a, b) => parseInt(a.decade) - parseInt(b.decade));

  const totalAllegedINRCr = MONEY_ENTRIES.reduce(
    (sum, e) => sum + (e.allegedINRCr ?? 0),
    0
  );
  const totalRecoveredINRCr = MONEY_ENTRIES.reduce(
    (sum, e) => sum + (e.recoveredINRCr ?? 0),
    0
  );

  const comparable = MONEY_ENTRIES.filter(
    (e) => e.allegedINRCr !== null && e.recoveredINRCr !== null
  );
  const comparableAllegedINRCr = comparable.reduce((sum, e) => sum + (e.allegedINRCr ?? 0), 0);
  const comparableRecoveredINRCr = comparable.reduce((sum, e) => sum + (e.recoveredINRCr ?? 0), 0);
  const recoveryRatePct =
    comparableAllegedINRCr > 0 ? (comparableRecoveredINRCr / comparableAllegedINRCr) * 100 : 0;

  const casesWithoutComparableFigures = MONEY_ENTRIES.filter(
    (e) => e.allegedINRCr === null || e.recoveredINRCr === null
  ).map((e) => e.slug);

  return {
    totalCases: all.length,
    earliestYear,
    latestYear,
    byStatus,
    byCategory,
    byDecade,
    money: {
      totalAllegedINRCr,
      totalRecoveredINRCr,
      comparableCaseSlugs: comparable.map((e) => e.slug),
      comparableAllegedINRCr,
      comparableRecoveredINRCr,
      recoveryRatePct,
      casesWithoutComparableFigures,
    },
  };
}
