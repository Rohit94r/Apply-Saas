"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  CheckCircle,
  CircleNotch,
  Code,
  Play,
  TerminalWindow,
  XCircle
} from "@phosphor-icons/react";
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
  const reduceMotion = useReducedMotion();
  const lineCount = useMemo(() => code.split("\n").length, [code]);

  useEffect(() => {
    setCode(problem.starterCode || DEFAULT_STARTER_CODE);
    setResult(null);
  }, [problem]);

  function runTests() {
    setRunning(true);
    window.setTimeout(() => {
      const testResult = runJavaScriptTests(code, problem.testCases);
      setResult(testResult);
      onTestsPassed?.(testResult.passed);
      setRunning(false);
    }, reduceMotion ? 0 : 240);
  }

  return (
    <motion.section
      aria-label={`Coding exercise: ${problem.title}`}
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="border-t border-border bg-[#0d1117] text-[#e6edf3]"
    >
      <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-2">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          </div>
          <div className="flex min-w-0 items-center gap-2 text-xs font-semibold text-[#b7c3d0]">
            <Code className="h-4 w-4 text-[#7fd9c7]" weight="bold" />
            <span className="truncate">solution.js — {problem.title}</span>
          </div>
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
          Run local tests
        </Button>
      </div>

      <div className="grid max-h-[42vh] gap-0 overflow-auto lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="border-b border-white/10 lg:border-b-0 lg:border-r">
          <div className="border-b border-white/10 bg-[#161b22] px-4 py-2">
            <p className="text-[11px] font-semibold text-[#e6edf3]">{problem.title}</p>
            <p className="mt-1 text-xs leading-5 text-[#b7c3d0]">{problem.description}</p>
            <p className="mt-1.5 text-[10px] text-[#7d8996]">
              Write your solution in the editor · run local tests in the terminal ·
              safe subset (one return expression, no arbitrary execution)
            </p>
          </div>

          <div className="grid grid-cols-[2.5rem_minmax(0,1fr)] bg-[#0d1117]">
            <div
              aria-hidden="true"
              className="select-none border-r border-white/5 px-2 py-3 text-right font-mono text-xs leading-5 text-[#4f5b66]"
            >
              {Array.from({ length: lineCount }, (_, index) => (
                <div key={index}>{index + 1}</div>
              ))}
            </div>
            <textarea
              aria-label="JavaScript solution editor"
              value={code}
              onChange={(event) => {
                setCode(event.target.value);
                setResult(null);
              }}
              onKeyDown={(event) => {
                if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
                  event.preventDefault();
                  runTests();
                }
              }}
              spellCheck={false}
              className="h-44 w-full resize-y bg-transparent p-3 font-mono text-xs leading-5 text-[#e6edf3] outline-none focus:bg-white/[0.02]"
            />
          </div>
        </div>

        <div className="min-h-44 overflow-y-auto bg-[#090c10] p-3 font-mono" aria-live="polite">
          <p className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-wide text-[#8b949e]">
            <TerminalWindow className="h-3.5 w-3.5 text-[#7fd9c7]" weight="fill" />
            Terminal · test results
          </p>
          {!result ? (
            <div className="space-y-1 text-xs text-[#7d8996]">
              <p><span className="text-[#7fd9c7]">$</span> npm test -- solution.js</p>
              <p>Ready. Press ⌘/Ctrl + Enter to run.</p>
            </div>
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
                  <p className="mt-1 break-words text-[#8b949e]">
                    input {JSON.stringify(testCase.input)} · expected{" "}
                    {JSON.stringify(testCase.expected)}
                    {!testCase.passed && testCase.actual
                      ? ` · received ${JSON.stringify(testCase.actual)}`
                      : ""}
                  </p>
                  {testCase.error ? (
                    <p className="mt-1 break-words text-red-300">{testCase.error}</p>
                  ) : null}
                </li>
              ))}
              <li className="pt-1 text-xs font-semibold text-[#7fd9c7]">
                {result.passed ? "PASS" : "FAIL"} · {result.passedCount}/{result.total} passed · local
              </li>
            </ul>
          )}
        </div>
      </div>
    </motion.section>
  );
}
