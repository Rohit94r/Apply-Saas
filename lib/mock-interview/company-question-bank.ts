import {
  allCompanyGuides,
  type CompanyCategory,
  type CompanyCodingGuide
} from "@/content/coding-questions";
import type { CodingProblemKey } from "@/lib/mock-interview/coding-problems";

export type CompanyTier =
  | "faang-like"
  | "global-product"
  | "indian-product"
  | "fintech-payments"
  | "bfsi"
  | "it-services-volume"
  | "it-services-premium";

export type BankCoverage = "full" | "tier-template";

export type CompanyInterviewBankEntry = {
  slug: string;
  name: string;
  category: CompanyCategory;
  tier: CompanyTier;
  aliases: string[];
  introHints: string[];
  roleHints: string[];
  companyBehavioral: string[];
  technicalTopics: string[];
  codingPatterns: string[];
  codingProblemKeys: CodingProblemKey[];
  sourceNotes: string[];
  coverage: BankCoverage;
};

type TierDefaults = Omit<
  CompanyInterviewBankEntry,
  "slug" | "name" | "category" | "aliases" | "sourceNotes" | "coverage"
>;

const TIER_DEFAULTS: Record<CompanyTier, TierDefaults> = {
  "faang-like": {
    tier: "faang-like",
    introHints: [
      "Open with impact + ownership on a hard technical project",
      "Signal curiosity and learning velocity, not brand-name dropping"
    ],
    roleHints: [
      "Depth on data structures, complexity, and debugging stories",
      "Explain trade-offs when designing APIs or services"
    ],
    companyBehavioral: [
      "Leadership / ownership examples with measurable outcomes",
      "Handling ambiguity and disagreeing constructively"
    ],
    technicalTopics: [
      "Arrays, hashing, trees/graphs, recursion/DP",
      "System design lite for new grads: APIs, caching, scaling basics"
    ],
    codingPatterns: [
      "Medium DSA: two pointers, BFS/DFS, heaps, intervals",
      "Timed OA with 1–2 medium problems"
    ],
    codingProblemKeys: ["reverse", "wordCount", "square"]
  },
  "global-product": {
    tier: "global-product",
    introHints: [
      "Connect product thinking to engineering craft",
      "Highlight collaboration across product/design/QA"
    ],
    roleHints: [
      "Solid coding + CS fundamentals + one deep project",
      "Reliability, testing, and customer impact language"
    ],
    companyBehavioral: [
      "Customer obsession / quality bar stories",
      "Shipping under constraints"
    ],
    technicalTopics: [
      "DSA medium, OOP, SQL, REST",
      "Debugging production issues end-to-end"
    ],
    codingPatterns: [
      "Arrays/strings/trees medium OA style",
      "Clean code and edge cases matter"
    ],
    codingProblemKeys: ["reverse", "wordCount", "square"]
  },
  "indian-product": {
    tier: "indian-product",
    introHints: [
      "Show hustle on real products used at Indian scale",
      "Be concrete about users, metrics, and reliability"
    ],
    roleHints: [
      "Backend/API strength, data modeling, and on-call mindset",
      "Campus challenge / Grid / Hackathon experience is a plus"
    ],
    companyBehavioral: [
      "Ownership when systems break during peak traffic",
      "Learning from failed experiments"
    ],
    technicalTopics: [
      "DSA (arrays, graphs, DP basics), databases, caching",
      "High-throughput APIs and consistency trade-offs"
    ],
    codingPatterns: [
      "Hiring-challenge style DSA under time pressure",
      "Medium problems with careful I/O parsing"
    ],
    codingProblemKeys: ["reverse", "wordCount", "upper"]
  },
  "fintech-payments": {
    tier: "fintech-payments",
    introHints: [
      "Mention trust, correctness, and money-movement caution",
      "Show comfort with distributed systems vocabulary"
    ],
    roleHints: [
      "Idempotency, retries, reconciliation, and audit trails",
      "Security/privacy awareness without fear-mongering"
    ],
    companyBehavioral: [
      "Decision under incomplete information with financial risk",
      "Partnering with risk/compliance stakeholders"
    ],
    technicalTopics: [
      "Concurrency, transactions, queues, API design",
      "DSA for OAs plus payments domain questions"
    ],
    codingPatterns: [
      "Medium DSA + correctness-focused coding",
      "String/number parsing similar to settlement/reference ids"
    ],
    codingProblemKeys: ["reverse", "double", "square", "wordCount"]
  },
  bfsi: {
    tier: "bfsi",
    introHints: [
      "Emphasize reliability, compliance awareness, and clear communication",
      "Structured STAR stories over flashy claims"
    ],
    roleHints: [
      "Java/Python + SQL + basic DSA for analyst/SDE tracks",
      "Explain how you test and document work"
    ],
    companyBehavioral: [
      "Ethics, confidentiality, and handling pressure in deadlines",
      "Working with global teams / overlapping time zones"
    ],
    technicalTopics: [
      "OOP, SQL joins, REST, basic DSA",
      "Occasionally markets/domain vocabulary for tech roles"
    ],
    codingPatterns: [
      "Easy–medium coding + aptitude-adjacent numeric reasoning",
      "Clean edge-case handling over exotic algorithms"
    ],
    codingProblemKeys: ["double", "square", "reverse", "wordCount"]
  },
  "it-services-volume": {
    tier: "it-services-volume",
    introHints: [
      "2-minute resume walkthrough: education → projects → strengths",
      "Why this company + willingness to learn / relocate"
    ],
    roleHints: [
      "OOPs, SQL, basic DSA, and crystal-clear project ownership",
      "Language fundamentals (Java/Python/C) over LeetCode hard"
    ],
    companyBehavioral: [
      "Team conflict, deadline pressure, gap years, bonding questions",
      "Why IT services / why this city / notice period realism"
    ],
    technicalTopics: [
      "Arrays, strings, loops, sorting/searching",
      "OOPs pillars, DBMS, OS/Networks light"
    ],
    codingPatterns: [
      "NQT/NLTH-style: easy arrays/strings + aptitude",
      "1–2 coding problems, approach clarity matters"
    ],
    codingProblemKeys: ["reverse", "upper", "length", "wordCount", "double"]
  },
  "it-services-premium": {
    tier: "it-services-premium",
    introHints: [
      "Blend services professionalism with stronger coding signal",
      "Highlight automation, cloud, or client-facing delivery"
    ],
    roleHints: [
      "Stronger DSA than volume hiring plus system fundamentals",
      "Client communication examples"
    ],
    companyBehavioral: [
      "Handling client change requests",
      "Quality vs speed trade-offs"
    ],
    technicalTopics: [
      "Medium DSA, OOP, SQL, basic cloud",
      "Debugging and code review mindset"
    ],
    codingPatterns: [
      "Easy–medium coding rounds with clearer DSA expectations",
      "String/array parsing under time limits"
    ],
    codingProblemKeys: ["reverse", "wordCount", "square"]
  }
};

/** Explicit tier assignment for PYQs library slugs. */
const SLUG_TIER: Record<string, CompanyTier> = {
  google: "faang-like",
  meta: "faang-like",
  apple: "faang-like",
  amazon: "faang-like",
  microsoft: "faang-like",
  nvidia: "global-product",
  adobe: "global-product",
  qualcomm: "global-product",
  uber: "global-product",
  walmart: "global-product",
  samsung: "global-product",
  atlassian: "global-product",
  intuit: "global-product",
  salesforce: "global-product",
  sap: "global-product",
  servicenow: "global-product",
  browserstack: "global-product",
  rubrik: "global-product",
  "amazon-ml-school": "faang-like",
  flipkart: "indian-product",
  zoho: "indian-product",
  swiggy: "indian-product",
  zomato: "indian-product",
  myntra: "indian-product",
  tredence: "indian-product",
  phonepe: "fintech-payments",
  razorpay: "fintech-payments",
  paytm: "fintech-payments",
  juspay: "fintech-payments",
  paypal: "fintech-payments",
  "goldman-sachs": "bfsi",
  "morgan-stanley": "bfsi",
  "jp-morgan": "bfsi",
  "de-shaw": "bfsi",
  deloitte: "bfsi",
  "deloitte-nla": "bfsi",
  "american-express": "bfsi",
  barclays: "bfsi",
  visa: "bfsi",
  "wells-fargo": "bfsi",
  ubs: "bfsi",
  "ion-group": "bfsi",
  bny: "bfsi",
  "tcs-nqt": "it-services-volume",
  "tcs-nqt-aptitude": "it-services-volume",
  "tcs-codevita": "it-services-volume",
  infosys: "it-services-volume",
  wipro: "it-services-volume",
  cognizant: "it-services-volume",
  accenture: "it-services-volume",
  ibm: "it-services-premium",
  capgemini: "it-services-volume",
  hcl: "it-services-volume",
  virtusa: "it-services-volume",
  epam: "it-services-premium",
  oracle: "it-services-premium",
  cisco: "it-services-premium",
  "larsen-toubro": "it-services-volume",
  ltimindtree: "it-services-volume",
  hexaware: "it-services-volume",
  "tech-mahindra": "it-services-volume",
  "persistent-systems": "it-services-volume",
  coforge: "it-services-volume",
  "sopra-steria": "it-services-volume"
};

const PEER_GROUPS: Record<CompanyTier, string[]> = {
  "faang-like": ["google", "meta", "apple", "amazon", "microsoft"],
  "global-product": [
    "adobe",
    "uber",
    "salesforce",
    "atlassian",
    "walmart",
    "intuit"
  ],
  "indian-product": ["flipkart", "zoho", "swiggy", "zomato", "myntra"],
  "fintech-payments": ["phonepe", "razorpay", "paytm", "juspay", "paypal"],
  bfsi: [
    "goldman-sachs",
    "jp-morgan",
    "morgan-stanley",
    "deloitte",
    "barclays",
    "visa"
  ],
  "it-services-volume": [
    "tcs-nqt",
    "infosys",
    "wipro",
    "cognizant",
    "accenture",
    "capgemini",
    "hcl"
  ],
  "it-services-premium": ["ibm", "oracle", "cisco", "epam"]
};

type RichOverride = Partial<
  Pick<
    CompanyInterviewBankEntry,
    | "introHints"
    | "roleHints"
    | "companyBehavioral"
    | "technicalTopics"
    | "codingPatterns"
    | "codingProblemKeys"
    | "aliases"
    | "sourceNotes"
  >
> & { coverage?: BankCoverage };

/** Company-specific intelligence layered on tier defaults. */
const RICH_OVERRIDES: Record<string, RichOverride> = {
  google: {
    coverage: "full",
    aliases: ["Alphabet", "Google India"],
    companyBehavioral: [
      "Googleyness: humility, collaboration, comfort with ambiguity",
      "Impact stories with scale and clarity of thought"
    ],
    technicalTopics: [
      "Medium–hard DSA, coding interviews, follow-ups on complexity",
      "Systems intuition: latency, consistency, sharding basics"
    ],
    codingPatterns: [
      "Classic coding interviews: graphs, DP, design-minded follow-ups"
    ],
    sourceNotes: ["/pyqs#google"]
  },
  meta: {
    coverage: "full",
    aliases: ["Facebook", "Meta Platforms"],
    technicalTopics: [
      "Coding speed + correctness; product sense lite for some roles",
      "Distributed systems vocabulary for infra-ish tracks"
    ],
    codingPatterns: ["Timed coding: arrays, graphs, string manipulation"],
    sourceNotes: ["/pyqs#meta"]
  },
  apple: {
    coverage: "full",
    companyBehavioral: [
      "Attention to detail and craftsmanship",
      "Privacy / user trust awareness"
    ],
    technicalTopics: ["DSA + OS/low-level curiosity for some teams"],
    sourceNotes: ["/pyqs#apple"]
  },
  amazon: {
    coverage: "full",
    aliases: ["AWS", "Amazon India"],
    companyBehavioral: [
      "Leadership Principles: Ownership, Customer Obsession, Dive Deep",
      "STAR stories with metrics"
    ],
    technicalTopics: ["OA medium DSA + LP behavioral deep dives"],
    codingPatterns: [
      "Amazon OA-style: 1–2 medium DSA problems under time pressure"
    ],
    sourceNotes: ["/pyqs#amazon", "/prepare/amazon-oa-questions"]
  },
  microsoft: {
    coverage: "full",
    aliases: ["MSFT", "Microsoft India"],
    companyBehavioral: [
      "Growth mindset and inclusive collaboration",
      "Shipping customer value"
    ],
    technicalTopics: ["Medium DSA, debugging, design lite"],
    sourceNotes: ["/pyqs#microsoft"]
  },
  flipkart: {
    coverage: "full",
    aliases: ["Flipkart Grid"],
    codingPatterns: [
      "Flipkart Grid / OA flavored DSA: graphs, DP, greedy under timer"
    ],
    technicalTopics: ["High-scale commerce: inventory, search, payments touchpoints"],
    sourceNotes: ["/pyqs#flipkart"]
  },
  zoho: {
    coverage: "full",
    codingPatterns: [
      "Multi-round Zoho-style: aptitude → basic coding → advanced coding → tech"
    ],
    technicalTopics: ["Long coding rounds; clean modular code preferred"],
    sourceNotes: ["/pyqs#zoho"]
  },
  phonepe: {
    coverage: "full",
    aliases: ["Phone Pe"],
    codingPatterns: ["Payments-scale DSA + backend correctness"],
    technicalTopics: ["Idempotent APIs, queues, reconciliation stories"],
    sourceNotes: ["/pyqs#phonepe"]
  },
  razorpay: {
    coverage: "full",
    codingPatterns: ["Fintech OA medium DSA + API design chat"],
    sourceNotes: ["/pyqs#razorpay"]
  },
  paytm: {
    coverage: "full",
    codingPatterns: ["Campus OA arrays/strings + payments domain awareness"],
    sourceNotes: ["/pyqs#paytm"]
  },
  "goldman-sachs": {
    coverage: "full",
    aliases: ["GS", "Goldman"],
    companyBehavioral: ["Integrity, teamwork, pressure handling"],
    codingPatterns: ["HackerRank-style easy–medium + puzzles sometimes"],
    sourceNotes: ["/pyqs#goldman-sachs"]
  },
  "jp-morgan": {
    coverage: "full",
    aliases: ["JPMorgan", "JP Morgan Chase", "JPM", "Chase"],
    codingPatterns: ["Code for Good / OA style easy–medium coding"],
    sourceNotes: ["/pyqs#jp-morgan"]
  },
  deloitte: {
    coverage: "full",
    aliases: ["Deloitte USI"],
    codingPatterns: ["Aptitude + basic coding; communication heavy interviews"],
    sourceNotes: ["/pyqs#deloitte"]
  },
  "deloitte-nla": {
    coverage: "full",
    aliases: ["Deloitte NLA"],
    codingPatterns: ["NLA aptitude + coding fundamentals"],
    sourceNotes: ["/pyqs#deloitte-nla"]
  },
  "tcs-nqt": {
    coverage: "full",
    aliases: ["TCS", "Tata Consultancy Services", "TCS NQT", "TCS Ninja"],
    introHints: [
      "Why TCS / IT services; relocate; 2-minute resume walkthrough"
    ],
    roleHints: [
      "OOPs, SQL, project deep-dive — not LeetCode hard"
    ],
    codingPatterns: [
      "NQT-style: aptitude + 1–2 easy array/string/math coding problems"
    ],
    codingProblemKeys: ["reverse", "upper", "double", "length"],
    sourceNotes: [
      "/pyqs#tcs-nqt",
      "/prepare/tcs-interview-questions-2026",
      "/prepare/tcs-nqt-preparation"
    ]
  },
  "tcs-nqt-aptitude": {
    coverage: "full",
    aliases: ["TCS Aptitude", "NQT Aptitude"],
    codingPatterns: ["Aptitude-first; light coding follow-ups"],
    sourceNotes: ["/pyqs#tcs-nqt-aptitude", "/prepare/tcs-nqt-preparation"]
  },
  "tcs-codevita": {
    coverage: "full",
    aliases: ["CodeVita", "TCS Code Vita"],
    codingPatterns: [
      "Competitive CodeVita-style problem solving (practice framing only)"
    ],
    codingProblemKeys: ["wordCount", "square", "reverse"],
    sourceNotes: ["/pyqs#tcs-codevita"]
  },
  infosys: {
    coverage: "full",
    aliases: ["Infy", "Infosys SP", "Infosys DSE", "InfyTQ"],
    codingPatterns: [
      "SP/DSE harder coding than SES; arrays/strings/DP basics reported"
    ],
    sourceNotes: ["/pyqs#infosys", "/prepare/infosys-resume-format"]
  },
  wipro: {
    coverage: "full",
    aliases: ["Wipro NLTH", "Wipro Elite"],
    codingPatterns: ["NLTH-style aptitude + easy coding"],
    sourceNotes: ["/pyqs#wipro", "/prepare/wipro-technical-interview"]
  },
  cognizant: {
    coverage: "full",
    aliases: ["CTS", "GenC", "GenC Next"],
    codingPatterns: ["GenC: aptitude + basic coding; GenC Next stronger DSA"],
    sourceNotes: ["/pyqs#cognizant", "/prepare/cognizant-aptitude-questions"]
  },
  accenture: {
    coverage: "full",
    aliases: ["Accenture ASE"],
    codingPatterns: ["Cognitive + coding fundamentals; communication focus"],
    sourceNotes: ["/pyqs#accenture", "/prepare/accenture-resume-template"]
  },
  uber: {
    coverage: "full",
    codingPatterns: ["Medium–hard DSA; marketplace systems intuition"],
    sourceNotes: ["/pyqs#uber"]
  },
  swiggy: {
    coverage: "full",
    codingPatterns: ["Product startup OA: DSA + delivery-systems chat"],
    sourceNotes: ["/pyqs#swiggy"]
  },
  zomato: {
    coverage: "full",
    codingPatterns: ["Backend/DSA medium; peak-load stories"],
    sourceNotes: ["/pyqs#zomato"]
  },
  juspay: {
    coverage: "full",
    codingPatterns: ["Hiring challenge DSA under strict timers"],
    sourceNotes: ["/pyqs#juspay"]
  },
  "de-shaw": {
    coverage: "full",
    aliases: ["D. E. Shaw", "DESIS"],
    codingPatterns: ["Harder DSA / quant-flavored problem solving"],
    sourceNotes: ["/pyqs#de-shaw"]
  },
  ibm: {
    coverage: "full",
    codingPatterns: ["Cognitive + coding; cloud/AI awareness for some tracks"],
    sourceNotes: ["/pyqs#ibm"]
  },
  oracle: {
    coverage: "full",
    codingPatterns: ["OA coding + SQL/database strength"],
    sourceNotes: ["/pyqs#oracle"]
  },
  cisco: {
    coverage: "full",
    codingPatterns: ["Coding + networking fundamentals"],
    sourceNotes: ["/pyqs#cisco"]
  },
  epam: {
    coverage: "full",
    codingPatterns: ["Stronger coding bar than volume IT services"],
    sourceNotes: ["/pyqs#epam"]
  }
};

function tierForGuide(guide: CompanyCodingGuide): CompanyTier {
  if (SLUG_TIER[guide.slug]) return SLUG_TIER[guide.slug];
  if (guide.category === "bfsi-consulting") return "bfsi";
  if (guide.category === "it-services") return "it-services-volume";
  return "global-product";
}

function buildEntry(guide: CompanyCodingGuide): CompanyInterviewBankEntry {
  const tier = tierForGuide(guide);
  const defaults = TIER_DEFAULTS[tier];
  const rich = RICH_OVERRIDES[guide.slug] ?? {};
  const pyqNote = `/pyqs#${guide.slug}`;

  return {
    slug: guide.slug,
    name: guide.company,
    category: guide.category,
    tier,
    aliases: rich.aliases ?? [],
    introHints: rich.introHints ?? defaults.introHints,
    roleHints: rich.roleHints ?? defaults.roleHints,
    companyBehavioral: rich.companyBehavioral ?? defaults.companyBehavioral,
    technicalTopics: rich.technicalTopics ?? defaults.technicalTopics,
    codingPatterns: rich.codingPatterns ?? defaults.codingPatterns,
    codingProblemKeys: rich.codingProblemKeys ?? defaults.codingProblemKeys,
    sourceNotes: Array.from(
      new Set([...(rich.sourceNotes ?? []), pyqNote, guide.url])
    ),
    coverage: rich.coverage ?? "tier-template"
  };
}

export const companyInterviewBank: CompanyInterviewBankEntry[] =
  allCompanyGuides.map(buildEntry);

const bySlug = new Map(
  companyInterviewBank.map((entry) => [entry.slug, entry] as const)
);

function normalizeCompanyQuery(value: string): string {
  return value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, " ");
}

function scoreMatch(entry: CompanyInterviewBankEntry, query: string): number {
  const q = normalizeCompanyQuery(query);
  if (!q) return 0;
  const names = [entry.name, entry.slug.replace(/-/g, " "), ...entry.aliases].map(
    normalizeCompanyQuery
  );
  if (names.some((n) => n === q)) return 100;
  if (names.some((n) => n.includes(q) || q.includes(n))) return 80;
  // Token overlap (e.g. "TCS Ninja" → tcs-nqt)
  const qTokens = new Set(q.split(" "));
  let best = 0;
  for (const name of names) {
    const tokens = name.split(" ");
    const hits = tokens.filter((t) => qTokens.has(t)).length;
    best = Math.max(best, hits * 20);
  }
  return best;
}

export function findCompanyInBank(
  companyQuery: string
): CompanyInterviewBankEntry | null {
  if (!companyQuery.trim()) return null;
  let best: CompanyInterviewBankEntry | null = null;
  let bestScore = 0;
  for (const entry of companyInterviewBank) {
    const score = scoreMatch(entry, companyQuery);
    if (score > bestScore) {
      best = entry;
      bestScore = score;
    }
  }
  return bestScore >= 40 ? best : null;
}

export function getPeerCompanies(
  entry: CompanyInterviewBankEntry,
  limit = 3
): CompanyInterviewBankEntry[] {
  const peers = PEER_GROUPS[entry.tier] ?? [];
  return peers
    .filter((slug) => slug !== entry.slug)
    .map((slug) => bySlug.get(slug))
    .filter((e): e is CompanyInterviewBankEntry => Boolean(e))
    .slice(0, limit);
}

export type ResolvedCompanyIntelligence = {
  primary: CompanyInterviewBankEntry;
  peers: CompanyInterviewBankEntry[];
  matchedExact: boolean;
  usedPeerFallback: boolean;
};

const GENERIC_FALLBACK: CompanyInterviewBankEntry = {
  ...TIER_DEFAULTS["global-product"],
  slug: "generic-product",
  name: "Target company",
  category: "product-tech",
  aliases: [],
  sourceNotes: ["/pyqs"],
  coverage: "tier-template"
};

/**
 * Prefer exact/alias match; if thin or missing, attach same-tier peers.
 * Unknown companies fall back to category peers via a generic product template
 * plus IT-services peers when the name looks like a services firm.
 */
export function resolveCompanyIntelligence(
  companyQuery: string
): ResolvedCompanyIntelligence {
  const matched = findCompanyInBank(companyQuery);
  if (matched) {
    const peers = getPeerCompanies(matched, 3);
    const usedPeerFallback = matched.coverage === "tier-template";
    return {
      primary: matched,
      peers,
      matchedExact: matched.coverage === "full",
      usedPeerFallback
    };
  }

  const q = normalizeCompanyQuery(companyQuery);
  const servicesHint =
    /\b(tcs|infosys|wipro|cognizant|accenture|capgemini|hcl|tech mahindra|ltimindtree)\b/.test(
      q
    );
  const bfsiHint =
    /\b(bank|finance|capital|securities|deloitte|goldman|morgan|jpmorgan|visa)\b/.test(
      q
    );

  const seedTier: CompanyTier = servicesHint
    ? "it-services-volume"
    : bfsiHint
      ? "bfsi"
      : "global-product";

  const primary: CompanyInterviewBankEntry = {
    ...GENERIC_FALLBACK,
    ...TIER_DEFAULTS[seedTier],
    name: companyQuery.trim() || GENERIC_FALLBACK.name,
    tier: seedTier,
    category: servicesHint
      ? "it-services"
      : bfsiHint
        ? "bfsi-consulting"
        : "product-tech"
  };

  const peers = (PEER_GROUPS[seedTier] ?? [])
    .map((slug) => bySlug.get(slug))
    .filter((e): e is CompanyInterviewBankEntry => Boolean(e))
    .slice(0, 3);

  return {
    primary,
    peers,
    matchedExact: false,
    usedPeerFallback: true
  };
}

export function companiesWithTierTemplateCoverage(): CompanyInterviewBankEntry[] {
  return companyInterviewBank.filter((e) => e.coverage === "tier-template");
}

export function buildCompanyPromptSnippet(
  intelligence: ResolvedCompanyIntelligence,
  phase:
    | "intro"
    | "role"
    | "company"
    | "coding-basic"
    | "coding-company"
    | "closing"
): string {
  const { primary, peers, matchedExact, usedPeerFallback } = intelligence;
  const peerNames = peers.map((p) => p.name).join(", ");
  const lines: string[] = [
    `Company intelligence (${matchedExact ? "exact bank match" : usedPeerFallback ? "tier/peer fallback" : "alias/partial match"}):`,
    `- Target: ${primary.name} [${primary.slug}] · category=${primary.category} · tier=${primary.tier}`,
    peerNames
      ? `- Peer companies for similar hiring style: ${peerNames}`
      : "- Peer companies: (none)"
  ];

  const pick = (items: string[], n: number) => items.slice(0, n).join(" | ");

  if (phase === "intro") {
    lines.push(`- Intro hints: ${pick(primary.introHints, 2)}`);
  } else if (phase === "role") {
    lines.push(`- Role hints: ${pick(primary.roleHints, 2)}`);
    lines.push(`- Technical topics: ${pick(primary.technicalTopics, 2)}`);
  } else if (phase === "company" || phase === "closing") {
    lines.push(`- Company behavioral: ${pick(primary.companyBehavioral, 2)}`);
    if (peers[0]) {
      lines.push(
        `- Peer behavioral color (${peers[0].name}): ${pick(peers[0].companyBehavioral, 1)}`
      );
    }
    lines.push(`- Technical topics: ${pick(primary.technicalTopics, 2)}`);
  } else {
    lines.push(`- Coding patterns: ${pick(primary.codingPatterns, 2)}`);
    if (peers[0]) {
      lines.push(
        `- Peer OA flavor (${peers[0].name}): ${pick(peers[0].codingPatterns, 1)}`
      );
    }
  }

  if (primary.sourceNotes[0]) {
    lines.push(
      `- Source notes (in-repo / PYQ guides): ${primary.sourceNotes.slice(0, 3).join(", ")}`
    );
  }

  lines.push(
    "- Phrase company-style practice questions inspired by reported OA patterns. Do NOT invent fake copyrighted LeetCode/PYQ problem statements as exact past questions."
  );

  return lines.join("\n");
}

export const companyInterviewBankCount = companyInterviewBank.length;
