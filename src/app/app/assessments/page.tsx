"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  CheckSquare,
  ArrowRight,
  Clock,
  ShieldCheck,
  TrendingUp,
  Brain,
  Code2,
  Sparkles,
  RotateCcw,
} from "lucide-react";
import { useCareer } from "@/context/CareerContext";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { ROUTES } from "@/lib/routes";

export default function AssessmentsHubPage() {
  const { selectedRole, assessmentResult } = useCareer();

  return (
    <div className="space-y-8 animate-fade-in bg-white pb-12">
      {/* Header Banner */}
      <div className="rounded-2xl bg-royal-maroon text-white border-4 border-black p-6 sm:p-8 shadow-editorial-md space-y-3">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded bg-black text-electric-coral text-xs font-mono font-black border border-black uppercase tracking-wider">
            Evaluation Engine
          </span>
          <span className="text-xs text-white/90 font-mono uppercase tracking-wider font-extrabold">
            Standardized Diagnostics
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight uppercase leading-snug">
          Technical & Cognitive Assessments
        </h1>
        <p className="text-xs sm:text-sm text-white/80 max-w-2xl leading-relaxed">
          Verify your competence with anti-distraction, timed assessments designed to diagnose conceptual depth, debugging reflexes, and architectural decision-making.
        </p>
      </div>

      {/* Target Role Baseline Card */}
      <div className="p-6 rounded-2xl bg-white border-3 border-black shadow-editorial-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-2 border-black pb-4">
          <div>
            <span className="text-xs font-mono font-extrabold text-royal-maroon uppercase">
              Primary Diagnostic
            </span>
            <h2 className="text-xl font-display font-black text-black uppercase">
              {selectedRole.title} Baseline Assessment
            </h2>
            <p className="text-xs text-black/70 mt-1 max-w-xl">
              10 role-specific questions evaluating modern syntax, frameworks, API design, database schemas, and version control.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            <Link href={ROUTES.app.assessments.baseline}>
              <button className="px-6 py-3 rounded-lg bg-electric-coral text-black font-black text-xs sm:text-sm border-2 border-black hover:bg-black hover:text-white transition-colors flex items-center gap-2 shadow-editorial-xs cursor-pointer">
                <span>{assessmentResult ? "Retake Assessment" : "Launch Baseline Test"}</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            </Link>
          </div>
        </div>

        {assessmentResult && (
          <div className="p-4 rounded-xl bg-surface border border-black/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div>
              <span className="font-bold text-black">Latest Result: </span>
              <span className="font-mono font-black text-royal-maroon text-sm">{assessmentResult.score}/100</span>
              <span className="text-black/60 ml-2">({assessmentResult.completedAt})</span>
            </div>
            <Link
              href={ROUTES.app.assessments.results("baseline")}
              className="font-black text-royal-maroon hover:underline flex items-center gap-1"
            >
              <span>View Full Skill Breakdown</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}
      </div>

      {/* 3 Core Assessment Tracks */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Track 1 */}
        <div className="p-6 rounded-xl border-2 border-black bg-white shadow-editorial-sm flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-lg bg-royal-maroon text-white flex items-center justify-center font-bold">
              <Code2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-black text-black">Technical & Architecture</h3>
            <p className="text-xs text-black/80 leading-relaxed">
              Code analysis, output prediction, async microtasks, REST idempotency, and SQL query plans.
            </p>
            <div className="pt-2 text-xs font-mono text-black/60">
              <span>Time: 20-30 mins • 10 Questions</span>
            </div>
          </div>
          <Link href={ROUTES.app.assessments.baseline} className="block w-full">
            <button className="w-full py-2.5 rounded-lg bg-black text-white hover:bg-electric-coral hover:text-black font-black text-xs border border-black transition-colors">
              Start Technical Track
            </button>
          </Link>
        </div>

        {/* Track 2 */}
        <div className="p-6 rounded-xl border-2 border-black bg-white shadow-editorial-sm flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-lg bg-electric-coral text-black flex items-center justify-center font-bold">
              <Brain className="w-5 h-5" />
            </div>
            <h3 className="text-base font-black text-black">Quantitative Aptitude</h3>
            <p className="text-xs text-black/80 leading-relaxed">
              Arithmetic reasoning, percentage algebra, probability, and speed-distance formulas used in hiring tests.
            </p>
            <div className="pt-2 text-xs font-mono text-black/60">
              <span>Time: 15 mins • 10 Questions</span>
            </div>
          </div>
          <Link href={ROUTES.app.assessments.detail("aptitude")} className="block w-full">
            <button className="w-full py-2.5 rounded-lg bg-black text-white hover:bg-electric-coral hover:text-black font-black text-xs border border-black transition-colors">
              Start Aptitude Track
            </button>
          </Link>
        </div>

        {/* Track 3 */}
        <div className="p-6 rounded-xl border-2 border-black bg-white shadow-editorial-sm flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-lg bg-surface text-black flex items-center justify-center font-bold border border-black">
              <Sparkles className="w-5 h-5 text-royal-maroon" />
            </div>
            <h3 className="text-base font-black text-black">Logical & Analytical</h3>
            <p className="text-xs text-black/80 leading-relaxed">
              Pattern series, deductive logic, coding-decoding, and syllogisms for enterprise recruitment rounds.
            </p>
            <div className="pt-2 text-xs font-mono text-black/60">
              <span>Time: 15 mins • 10 Questions</span>
            </div>
          </div>
          <Link href={ROUTES.app.assessments.detail("logical")} className="block w-full">
            <button className="w-full py-2.5 rounded-lg bg-black text-white hover:bg-electric-coral hover:text-black font-black text-xs border border-black transition-colors">
              Start Logical Track
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
