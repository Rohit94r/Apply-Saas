import type { MockCodeProblem, MockDifficulty } from "@/lib/ai/mock-interview";

/**
 * Coding problems must use the safe local JavaScript subset in code-runner.ts.
 * Framing is company-style practice inspired by reported OA patterns — not
 * copyrighted LeetCode/PYQ statements.
 */
export type CodingProblemKey =
  | "reverse"
  | "wordCount"
  | "length"
  | "upper"
  | "square"
  | "double";

export type CompanyCodingFlavor = {
  name: string;
  tier:
    | "faang-like"
    | "global-product"
    | "indian-product"
    | "fintech-payments"
    | "bfsi"
    | "it-services-volume"
    | "it-services-premium";
  codingPatterns: string[];
  codingProblemKeys: CodingProblemKey[];
};
const PROBLEM_DEFS: Record<
  CodingProblemKey,
  {
    difficultyBias: MockDifficulty[];
    title: string;
    description: string;
    starterCode: string;
    testCases: MockCodeProblem["testCases"];
    signatures: string[];
  }
> = {
  reverse: {
    difficultyBias: ["easy", "medium"],
    title: "Reverse a string token",
    description:
      "Return the trimmed input string in reverse order. Company-style warm-up for string handling in OAs.",
    starterCode: `function solve(input) {
  return input.trim();
}`,
    testCases: [
      { input: "hello", expected: "olleh", label: "Basic word" },
      { input: "racecar", expected: "racecar", label: "Palindrome" },
      { input: " apply ", expected: "ylppa", label: "Trim spaces" }
    ],
    signatures: [
      "returninput.trim().split('').reverse().join('')",
      'returninput.trim().split("").reverse().join("")'
    ]
  },
  wordCount: {
    difficultyBias: ["medium", "hard"],
    title: "Count whitespace-separated tokens",
    description:
      "Return the number of whitespace-separated words in the trimmed input. Use split(/\\s+/).",
    starterCode: `function solve(input) {
  return input.trim().length;
}`,
    testCases: [
      { input: "one two three", expected: "3", label: "Three words" },
      { input: "single", expected: "1", label: "Single word" },
      { input: "space   between", expected: "2", label: "Repeated spaces" }
    ],
    signatures: ["returninput.trim().split(/\\s+/).length"]
  },
  length: {
    difficultyBias: ["easy"],
    title: "Measure trimmed length",
    description:
      "Return the character length of the trimmed input string.",
    starterCode: `function solve(input) {
  return input;
}`,
    testCases: [
      { input: "abc", expected: "3", label: "Three chars" },
      { input: "  hi ", expected: "2", label: "Trimmed" },
      { input: "", expected: "0", label: "Empty" }
    ],
    signatures: ["returninput.trim().length", "returninput.length"]
  },
  upper: {
    difficultyBias: ["easy", "medium"],
    title: "Normalize to uppercase",
    description:
      "Return the trimmed input converted to uppercase — common string cleanup in service-company OAs.",
    starterCode: `function solve(input) {
  return input.trim();
}`,
    testCases: [
      { input: "tcs", expected: "TCS", label: "Lowercase" },
      { input: " Apply ", expected: "APPLY", label: "Trim + upper" },
      { input: "NQT", expected: "NQT", label: "Already upper" }
    ],
    signatures: ["returninput.trim().toUpperCase()", "returninput.toUpperCase()"]
  },
  square: {
    difficultyBias: ["medium", "hard"],
    title: "Square a number",
    description:
      "Parse the trimmed numeric input and return its square (Number(input.trim()) ** 2).",
    starterCode: `function solve(input) {
  return Number(input.trim());
}`,
    testCases: [
      { input: "7", expected: "49", label: "Positive" },
      { input: "-4", expected: "16", label: "Negative" },
      { input: " 12 ", expected: "144", label: "Trimmed input" }
    ],
    signatures: [
      "returnNumber(input.trim())**2",
      "returnMath.pow(Number(input.trim()),2)"
    ]
  },
  double: {
    difficultyBias: ["easy", "medium"],
    title: "Double a number",
    description:
      "Parse the trimmed numeric input and return twice its value.",
    starterCode: `function solve(input) {
  return Number(input.trim());
}`,
    testCases: [
      { input: "5", expected: "10", label: "Positive" },
      { input: "-3", expected: "-6", label: "Negative" },
      { input: " 8 ", expected: "16", label: "Trimmed" }
    ],
    signatures: ["returnNumber(input.trim())*2", "returnNumber(input)*2"]
  }
};

const TIER_DEFAULT_KEYS: Record<
  CompanyCodingFlavor["tier"],
  { basic: CodingProblemKey[]; company: CodingProblemKey[] }
> = {
  "faang-like": { basic: ["reverse", "wordCount"], company: ["wordCount", "square"] },
  "global-product": { basic: ["reverse", "length"], company: ["wordCount", "square"] },
  "indian-product": { basic: ["reverse", "upper"], company: ["wordCount", "square"] },
  "fintech-payments": { basic: ["reverse", "double"], company: ["square", "wordCount"] },
  bfsi: { basic: ["double", "reverse"], company: ["square", "wordCount"] },
  "it-services-volume": { basic: ["reverse", "upper", "length"], company: ["wordCount", "double"] },
  "it-services-premium": { basic: ["reverse", "wordCount"], company: ["square", "wordCount"] }
};

function pickKey(
  keys: CodingProblemKey[],
  difficulty: MockDifficulty,
  flavor: "basic" | "company"
): CodingProblemKey {
  const preferred = keys.filter((key) =>
    PROBLEM_DEFS[key].difficultyBias.includes(difficulty)
  );
  const pool = preferred.length > 0 ? preferred : keys;
  if (flavor === "basic") return pool[0] ?? "reverse";
  return pool[Math.min(1, pool.length - 1)] ?? pool[0] ?? "wordCount";
}

function flavorProblem(
  base: (typeof PROBLEM_DEFS)[CodingProblemKey],
  key: CodingProblemKey,
  company: CompanyCodingFlavor,
  flavor: "basic" | "company"
): MockCodeProblem {
  const patternHint =
    company.codingPatterns[0] ??
    "arrays/strings warm-up common in campus OAs";

  if (flavor === "basic") {
    return {
      title: `${base.title} (warm-up)`,
      description: `${base.description} Keep it simple before we go deeper for ${company.name}.`,
      starterCode: base.starterCode,
      testCases: base.testCases
    };
  }

  const framed: Record<CodingProblemKey, { title: string; description: string }> = {
    reverse: {
      title: `${company.name}-style: reverse a reference id`,
      description: `Company-style practice inspired by reported ${company.name} OA string patterns (${patternHint}). Trim the input, then return it reversed. Not a copyrighted PYQ — practice framing only.`
    },
    wordCount: {
      title: `${company.name}-style: count tokens in a log line`,
      description: `Inspired by ${company.name} OA patterns around parsing short strings (${patternHint}). Return how many whitespace-separated tokens remain after trim.`
    },
    length: {
      title: `${company.name}-style: measure payload length`,
      description: `Lightweight ${company.name}-flavored string check. Return the trimmed input length.`
    },
    upper: {
      title: `${company.name}-style: normalize ticket code`,
      description: `Service/OA-style cleanup inspired by ${company.name} campus patterns. Return trimmed uppercase text.`
    },
    square: {
      title: `${company.name}-style: square a numeric field`,
      description: `Numeric warm-up inspired by ${company.name} assessment patterns (${patternHint}). Parse the trimmed number and return its square.`
    },
    double: {
      title: `${company.name}-style: double a numeric field`,
      description: `Aptitude-adjacent numeric step inspired by ${company.name} hiring screens. Return twice the parsed number.`
    }
  };

  const frame = framed[key];
  return {
    title: frame.title,
    description: frame.description,
    starterCode: base.starterCode,
    testCases: base.testCases
  };
}

export function pickCodeProblem(input: {
  difficulty: MockDifficulty;
  flavor: "basic" | "company";
  company: CompanyCodingFlavor;
}): MockCodeProblem {
  const defaults = TIER_DEFAULT_KEYS[input.company.tier];
  const preferredKeys =
    input.company.codingProblemKeys?.length > 0
      ? input.company.codingProblemKeys
      : input.flavor === "basic"
        ? defaults.basic
        : defaults.company;

  const key = pickKey(preferredKeys, input.difficulty, input.flavor);
  const base = PROBLEM_DEFS[key];
  return flavorProblem(base, key, input.company, input.flavor);
}

/** Fallback when no company bank entry is available. */
export function supportedCodeProblem(difficulty: MockDifficulty): MockCodeProblem {
  if (difficulty === "easy") return { ...PROBLEM_DEFS.reverse, title: PROBLEM_DEFS.reverse.title };
  if (difficulty === "hard") return { ...PROBLEM_DEFS.square, title: PROBLEM_DEFS.square.title };
  return { ...PROBLEM_DEFS.wordCount, title: PROBLEM_DEFS.wordCount.title };
}
