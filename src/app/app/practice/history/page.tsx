"use client";

import React from "react";
import Link from "next/link";
import { History, CheckCircle2, XCircle, ArrowRight, Code2 } from "lucide-react";
import { PracticeNav } from "@/components/practice/PracticeNav";
import { ROUTES } from "@/lib/routes";

const PRACTICE_HISTORY = [
  {
    id: "att-01",
    title: "Array Two Sum with Hash Map",
    category: "Coding",
    status: "Passed",
    runtime: "4ms",
    memory: "12.2MB",
    submittedAt: "2026-10-01 14:32",
  },
  {
    id: "att-02",
    title: "Second Highest Salary from Employee Records",
    category: "SQL",
    status: "Passed",
    runtime: "2ms",
    memory: "6.8MB",
    submittedAt: "2026-10-01 15:10",
  },
  {
    id: "att-03",
    title: "Fix Infinite State Update Loop in React useEffect",
    category: "Debugging",
    status: "Passed",
    runtime: "8ms",
    memory: "15.4MB",
    submittedAt: "2026-10-02 09:45",
  },
  {
    id: "att-04",
    title: "Reverse a Linked List in Place",
    category: "DSA",
    status: "Passed",
    runtime: "3ms",
    memory: "11.1MB",
    submittedAt: "2026-10-02 11:20",
  },
];

export default function PracticeHistoryPage() {
  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <PracticeNav />

      <div className="rounded-2xl bg-royal-maroon text-white border-4 border-black p-6 sm:p-8 shadow-editorial-md flex items-center justify-between">
        <div>
          <span className="px-2.5 py-0.5 rounded bg-black text-electric-coral text-xs font-mono font-black border border-black uppercase tracking-wider">
            Execution Log
          </span>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight uppercase leading-snug mt-2">
            Practice Submission History
          </h1>
          <p className="text-xs sm:text-sm text-white/80 mt-1">
            Chronological audit of code execution attempts, test outcomes, and execution telemetry.
          </p>
        </div>

        <Link href={ROUTES.app.practice.root}>
          <button className="px-5 py-2.5 bg-electric-coral hover:bg-black hover:text-white text-black border-2 border-black font-black text-xs uppercase tracking-wider transition-colors flex items-center gap-2 cursor-pointer shadow-editorial-xs">
            <span>Solve New Problem</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </Link>
      </div>

      <div className="p-6 bg-white border-2 border-black shadow-editorial-sm space-y-4">
        <h2 className="text-xs font-black uppercase tracking-wider text-black">
          Recent Attempts ({PRACTICE_HISTORY.length})
        </h2>

        <div className="divide-y divide-black/10">
          {PRACTICE_HISTORY.map((h) => (
            <div key={h.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 bg-paper text-black text-[10px] font-mono font-bold uppercase border border-black/20">
                    {h.category}
                  </span>
                  <span className="text-xs font-mono text-muted">{h.submittedAt}</span>
                </div>
                <h3 className="text-sm font-black uppercase text-black">{h.title}</h3>
              </div>

              <div className="flex items-center gap-4 text-xs font-mono font-bold">
                <span className="text-muted">Runtime: {h.runtime}</span>
                <span className="text-muted">Memory: {h.memory}</span>
                <span className="flex items-center gap-1 text-emerald-600 bg-emerald-50 px-2 py-1 border border-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{h.status}</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
