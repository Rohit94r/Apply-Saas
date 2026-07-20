export type CodeTestCase = {
  input: string;
  expected: string;
  label?: string;
};

export type CodeTestResult = {
  passed: boolean;
  total: number;
  passedCount: number;
  mode: "deterministic-local";
  cases: Array<{
    label: string;
    passed: boolean;
    input: string;
    expected: string;
    actual: string;
    error?: string;
  }>;
};

/**
 * Evaluate a deliberately small JavaScript subset without executing user code.
 * This is local and deterministic: no eval, Function, network, filesystem, or
 * arbitrary JavaScript execution is involved.
 */
export function runJavaScriptTests(
  userCode: string,
  testCases: CodeTestCase[]
): CodeTestResult {
  const safeCases = testCases.slice(0, 5);
  const cases: CodeTestResult["cases"] = [];
  let passedCount = 0;

  let solveFn: (input: string) => unknown;
  try {
    solveFn = compileSupportedSolution(userCode);
  } catch (error) {
    return {
      passed: false,
      total: safeCases.length,
      passedCount: 0,
      mode: "deterministic-local",
      cases: safeCases.map((tc, i) => ({
        label: tc.label ?? `Test ${i + 1}`,
        passed: false,
        input: tc.input,
        expected: tc.expected,
        actual: "",
        error: error instanceof Error ? error.message : "Invalid code"
      }))
    };
  }

  safeCases.forEach((tc, index) => {
    const label = tc.label ?? `Test ${index + 1}`;
    try {
      const actual = solveFn(tc.input);
      const actualStr = stringifyOutput(actual);
      const passed = actualStr.trim() === tc.expected.trim();
      if (passed) passedCount += 1;
      cases.push({
        label,
        passed,
        input: tc.input,
        expected: tc.expected,
        actual: actualStr
      });
    } catch (error) {
      cases.push({
        label,
        passed: false,
        input: tc.input,
        expected: tc.expected,
        actual: "",
        error: error instanceof Error ? error.message : "Runtime error"
      });
    }
  });

  return {
    passed: passedCount === safeCases.length && safeCases.length > 0,
    total: safeCases.length,
    passedCount,
    mode: "deterministic-local",
    cases
  };
}

function compileSupportedSolution(userCode: string): (input: string) => unknown {
  if (!userCode.trim() || userCode.length > 4000) {
    throw new Error("Solution must contain 1–4,000 characters");
  }
  if (
    /\b(?:eval|Function|fetch|XMLHttpRequest|WebSocket|import|require|process|globalThis|window|document|constructor|__proto__|while|for|class|new)\b/.test(
      userCode
    )
  ) {
    throw new Error("Only the safe local JavaScript subset is supported");
  }

  const withoutComments = userCode
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\/\/.*$/gm, "");
  const match = withoutComments.match(
    /function\s+solve\s*\(\s*input\s*\)\s*\{([\s\S]*)\}\s*$/
  );
  if (!match) {
    throw new Error("Define function solve(input) { return ...; }");
  }

  const body = match[1].replace(/\s+/g, "").replace(/;+$/, "");
  const operations: Array<[string[], (input: string) => unknown]> = [
    [["returninput", "returninput.trim()"], (input) => input.trim()],
    [
      ["returninput.split('').reverse().join('')", 'returninput.split("").reverse().join("")',
       "returninput.trim().split('').reverse().join('')", 'returninput.trim().split("").reverse().join("")'],
      (input) => input.trim().split("").reverse().join("")
    ],
    [["returninput.toUpperCase()", "returninput.trim().toUpperCase()"], (input) => input.trim().toUpperCase()],
    [["returninput.toLowerCase()", "returninput.trim().toLowerCase()"], (input) => input.trim().toLowerCase()],
    [["returninput.length", "returninput.trim().length"], (input) => input.trim().length],
    [
      ["returninput.trim().split(/\\s+/).length"],
      (input) => (input.trim() ? input.trim().split(/\s+/).length : 0)
    ],
    [
      [
        "returnNumber(input)*2",
        "returnNumber(input.trim())*2",
        "returnNumber(input)**2",
        "returnNumber(input.trim())**2",
        "returnMath.pow(Number(input),2)",
        "returnMath.pow(Number(input.trim()),2)"
      ],
      (input) => {
        const value = Number(input.trim());
        if (!Number.isFinite(value)) throw new Error("Input is not a finite number");
        return body.includes("*2") && !body.includes("**2") ? value * 2 : value ** 2;
      }
    ]
  ];

  const operation = operations.find(([signatures]) => signatures.includes(body));
  if (!operation) {
    throw new Error(
      "Unsupported syntax. Use one return expression from the Supported subset."
    );
  }
  return operation[1];
}

function stringifyOutput(value: unknown): string {
  if (value === null || value === undefined) return "";
  if (typeof value === "string") return value;
  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }
  try {
    return JSON.stringify(value);
  } catch {
    return String(value);
  }
}

export const DEFAULT_STARTER_CODE = `function solve(input) {
  // Write your solution here
  // input is a string — return your answer as string/number/array
  return input;
}
`;

export const SAMPLE_CODING_TESTS: CodeTestCase[] = [
  { input: "hello", expected: "hello", label: "Echo sample" }
];
