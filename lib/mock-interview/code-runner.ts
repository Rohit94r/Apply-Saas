export type CodeTestCase = {
  input: string;
  expected: string;
  label?: string;
};

export type CodeTestResult = {
  passed: boolean;
  total: number;
  passedCount: number;
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
 * Run user JavaScript against simple I/O test cases (client-side sandbox).
 * Expects user code to define `function solve(input) { ... }` or export default.
 */
export function runJavaScriptTests(
  userCode: string,
  testCases: CodeTestCase[]
): CodeTestResult {
  const cases: CodeTestResult["cases"] = [];
  let passedCount = 0;

  let solveFn: (input: string) => unknown;
  try {
    const wrapped = `
      ${userCode}
      if (typeof solve === 'function') return solve;
      if (typeof module !== 'undefined' && module.exports) return module.exports;
      throw new Error('Define function solve(input) { ... }');
    `;
    // eslint-disable-next-line no-new-func
    solveFn = new Function(wrapped)() as (input: string) => unknown;
    if (typeof solveFn !== "function") {
      throw new Error("Define function solve(input) { ... }");
    }
  } catch (error) {
    return {
      passed: false,
      total: testCases.length,
      passedCount: 0,
      cases: testCases.map((tc, i) => ({
        label: tc.label ?? `Test ${i + 1}`,
        passed: false,
        input: tc.input,
        expected: tc.expected,
        actual: "",
        error: error instanceof Error ? error.message : "Invalid code"
      }))
    };
  }

  testCases.forEach((tc, index) => {
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
    passed: passedCount === testCases.length && testCases.length > 0,
    total: testCases.length,
    passedCount,
    cases
  };
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
