"use client";

import React from "react";
import Link from "next/link";
import { GraduationCap, ArrowRight, CheckCircle2, RotateCcw } from "lucide-react";
import { useCareer } from "@/context/CareerContext";
import { ImproveNav } from "@/components/improve/ImproveNav";
import { ROUTES } from "@/lib/routes";

const RETRAINING_PHASES = [
  {
    phase: "Week 01",
    title: "Node.js & Asynchronous API Architecture",
    focus: "Deep dive into Express middleware, async error boundaries, and connection pooling.",
    action: "Complete University of Helsinki Part 3 & 2 Coding Drills.",
    status: "Active",
  },
  {
    phase: "Week 02",
    title: "State Reconciliation & Component Lifecycle in React",
    focus: "Eliminate infinite re-render bugs and master immutable state updating patterns.",
    action: "Solve 3 debugging challenges & refactor component props.",
    status: "Upcoming",
  },
  {
    phase: "Week 03",
    title: "SQL Window Functions & Relational Indexing",
    focus: "DENSE_RANK(), CTEs, and optimizing slow table scans with composite indexes.",
    action: "Complete SQLBolt Advanced lessons and query drill.",
    status: "Upcoming",
  },
];

export default function ImproveRetrainingPage() {
  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <ImproveNav />

      <div className="rounded-2xl bg-royal-maroon text-white border-4 border-black p-6 sm:p-8 shadow-editorial-md flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span className="px-2.5 py-0.5 rounded bg-black text-electric-coral text-xs font-mono font-black border border-black uppercase tracking-wider">
            Remediation Plan
          </span>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight uppercase leading-snug mt-2">
            Targeted Retraining Schedule
          </h1>
          <p className="text-xs sm:text-sm text-white/80 mt-1">
            Structured 3-week acceleration sprint to recover from rejection blindspots and qualify for reassessment.
          </p>
        </div>

        <Link href={ROUTES.app.improve.reassessment}>
          <button className="px-5 py-2.5 bg-electric-coral hover:bg-black hover:text-white text-black border-2 border-black font-black text-xs uppercase tracking-wider transition-colors flex items-center gap-2 cursor-pointer shadow-editorial-xs">
            <span>Ready for Reassessment</span>
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </Link>
      </div>

      <div className="space-y-4">
        {RETRAINING_PHASES.map((p, idx) => (
          <div
            key={idx}
            className="p-6 bg-white border-2 border-black shadow-editorial-sm flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-royal-maroon transition-all"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-black text-white text-[10px] font-mono font-bold uppercase">
                  {p.phase}
                </span>
                <h3 className="text-base font-black uppercase text-black">{p.title}</h3>
                <span className="px-2 py-0.5 text-[10px] font-black uppercase bg-paper border border-black/20">
                  {p.status}
                </span>
              </div>
              <p className="text-xs text-muted max-w-2xl">{p.focus}</p>
              <p className="text-xs text-royal-maroon font-bold pt-1">
                Action Required: {p.action}
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <Link href={ROUTES.app.learning.lessons}>
                <button className="px-4 py-2 bg-royal-maroon hover:bg-electric-coral hover:text-black text-white font-extrabold text-xs uppercase tracking-wider border border-black transition-colors flex items-center gap-1.5 shadow-editorial-xs">
                  <span>Start Sprint</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
