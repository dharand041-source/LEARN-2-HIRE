"use client";

import React from "react";
import Link from "next/link";
import { History, CheckCircle2, ArrowRight } from "lucide-react";
import { ResumeNav } from "@/components/resume/ResumeNav";
import { ROUTES } from "@/lib/routes";

const ANALYSIS_RUNS = [
  {
    id: "run-01",
    targetRole: "Full-Stack Developer",
    score: 84,
    rating: "High",
    date: "2026-10-02 16:30",
  },
  {
    id: "run-02",
    targetRole: "Backend Developer",
    score: 78,
    rating: "Moderate",
    date: "2026-10-01 11:20",
  },
];

export default function ResumeHistoryPage() {
  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <ResumeNav />

      <div className="rounded-2xl bg-royal-maroon text-white border-4 border-black p-6 sm:p-8 shadow-editorial-md flex items-center justify-between">
        <div>
          <span className="px-2.5 py-0.5 rounded bg-black text-electric-coral text-xs font-mono font-black border border-black uppercase tracking-wider">
            Analysis Audit
          </span>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight uppercase leading-snug mt-2">
            Resume Analysis History
          </h1>
          <p className="text-xs sm:text-sm text-white/80 mt-1">
            Historical compatibility audit runs and improvement progression over time.
          </p>
        </div>
      </div>

      <div className="p-6 bg-white border-2 border-black shadow-editorial-sm space-y-4">
        <h2 className="text-xs font-black uppercase text-black">Past Audit Scans</h2>

        <div className="divide-y divide-black/10">
          {ANALYSIS_RUNS.map((run) => (
            <div key={run.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-muted uppercase font-bold">{run.date}</span>
                <h3 className="text-sm font-black uppercase text-black">{run.targetRole}</h3>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-sm font-black text-black">
                  Score: {run.score}/100 ({run.rating})
                </span>
                <Link href={ROUTES.app.resume.analyzer}>
                  <button className="px-4 py-1.5 bg-royal-maroon hover:bg-electric-coral hover:text-black text-white text-xs font-bold uppercase transition-colors shadow-editorial-xs">
                    View Run
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
