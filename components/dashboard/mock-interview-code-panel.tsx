"use client";

import { useState } from "react";
import { CheckCircle, CircleNotch, Play, TerminalWindow, XCircle } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { MockCodeProblem } from "@/lib/data/mock-interviews";
import {
  DEFAULT_STARTER_CODE,
  runJavaScriptTests,
  type CodeTestResult
} from "@/lib/mock-interview/code-runner";

export function MockInterviewCodePanel({
  problem,
  onTestsPassed
}: {
  problem: MockCodeProblem;
  onTestsPassed?: (passed: boolean) => void;
}) {
  const [code, setCode] = useState(problem.starterCode || DEFAULT_STARTER_CODE);
  const [result, setResult] = useState<CodeTestResult | null>(null);
  const [running, setRunning] = useState(false);

  function runTests() {
    setRunning(true);
    const testResult = runJavaScriptTests(code, problem.testCases);
    setResult(testResult);
    onTestsPassed?.(testResult.passed);
    setRunning(false);
  }

  return (
    <div className="border-t border-border bg-[#0f1419] text-[#e6edf3]">
      <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-2">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-[#8b949e]">
          <TerminalWindow className="h-4 w-4 text-[#7fd9c7]" weight="fill" />
          Coding — {problem.title}
        </div>
        <Button
          type="button"
          size="sm"
          variant="outline"
          className="h-8 border-white/15 bg-white/5 text-xs text-white hover:bg-white/10"
          onClick={runTests}
          disabled={running}
        >
          {running ? (
            <CircleNotch className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <Play className="h-3.5 w-3.5" weight="fill" />
          )}
          Run tests
        </Button>
      </div>

      <div className="grid gap-0 lg:grid-cols-[1fr_280px]">
        <div className="border-b border-white/10 p-3 lg:border-b-0 lg:border-r">
          <p className="mb-2 text-xs leading-5 text-[#8b949e]">{problem.description}</p>
          <textarea
            value={code}
            onChange={(event) => setCode(event.target.value)}
            spellCheck={false}
            className="h-44 w-full resize-y rounded-lg border border-white/10 bg-[#161b22] p-3 font-mono text-xs leading-5 text-[#e6edf3] outline-none focus:border-[#7fd9c7]/50"
          />
        </div>

        <div className="max-h-56 overflow-y-auto p-3">
          <p className="mb-2 text-[10px] font-bold uppercase tracking-wide text-[#8b949e]">
            Test output
          </p>
          {!result ? (
            <p className="text-xs text-[#8b949e]">Run tests to verify your solution.</p>
          ) : (
            <ul className="space-y-2">
              {result.cases.map((testCase) => (
                <li
                  key={testCase.label}
                  className={cn(
                    "rounded-lg border px-2.5 py-2 text-[11px]",
                    testCase.passed
                      ? "border-emerald-500/30 bg-emerald-500/10"
                      : "border-red-500/30 bg-red-500/10"
                  )}
                >
                  <div className="flex items-center gap-1.5 font-semibold">
                    {testCase.passed ? (
                      <CheckCircle className="h-3.5 w-3.5 text-emerald-400" weight="fill" />
                    ) : (
                      <XCircle className="h-3.5 w-3.5 text-red-400" weight="fill" />
                    )}
                    {testCase.label}
                  </div>
                  {!testCase.passed ? (
                    <p className="mt-1 text-[#8b949e]">
                      expected {testCase.expected}
                      {testCase.actual ? ` · got ${testCase.actual}` : ""}
                      {testCase.error ? ` · ${testCase.error}` : ""}
                    </p>
                  ) : null}
                </li>
              ))}
              <li className="pt-1 text-xs font-semibold text-[#7fd9c7]">
                {result.passedCount}/{result.total} passed
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
