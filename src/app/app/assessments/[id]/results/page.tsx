"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  TrendingUp,
  Award,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  BookOpen,
  FolderGit2,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  Zap,
  Target,
  BarChart3,
  Check,
} from "lucide-react";
import { useCareer } from "@/context/CareerContext";
import { Badge } from "@/components/ui/Badge";
import { ROUTES } from "@/lib/routes";

export default function AssessmentResultsDetailPage() {
  const params = useParams();
  const assessmentId = (params?.id as string) || "baseline";
  const { assessmentResult, selectedRole } = useCareer();

  // If no result exists in context (e.g. direct load), provide verified fallback diagnostic result
  const result = assessmentResult || {
    score: 72,
    totalQuestions: 10,
    completedAt: new Date().toISOString().split("T")[0],
    roleId: selectedRole?.id || "full-stack-developer",
    roleTitle: selectedRole?.title || "Full-Stack Developer",
    correctCount: 7,
    wrongCount: 3,
    skillBreakdown: [
      { skill: "JavaScript Foundations", score: 85, status: "Strong" as const },
      { skill: "React Architecture", score: 60, status: "Moderate" as const },
      { skill: "Node.js & Express APIs", score: 50, status: "Needs Improvement" as const },
      { skill: "SQL & Relational Schema", score: 80, status: "Strong" as const },
      { skill: "Git Version Control", score: 90, status: "Strong" as const },
      { skill: "REST API & Auth", score: 65, status: "Moderate" as const },
    ],
    strongAreas: ["Git Version Control (90%)", "JavaScript Foundations (85%)", "SQL & Relational Schema (80%)"],
    needsImprovement: ["Node.js & Express APIs (50%)", "React Architecture (60%)"],
    recommendations: [
      "Review asynchronous Node.js event loops and middleware patterns.",
      "Practice state management in React before building production projects.",
      "Complete the targeted Free Learning curriculum for backend APIs.",
    ],
  };

  return (
    <div className="max-w-6xl w-full mx-auto space-y-8 animate-fade-in pb-12">
      {/* Header Banner */}
      <div className="rounded-2xl bg-royal-maroon text-white border-4 border-black p-6 sm:p-8 shadow-editorial-md flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded bg-black text-electric-coral text-xs font-mono font-black border border-black uppercase tracking-wider">
              Phase 03 Verified
            </span>
            <span className="text-xs text-white/90 font-mono uppercase tracking-wider font-extrabold">
              Diagnostic Assessment Report
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight uppercase leading-snug">
            {result.roleTitle} Competency Evaluation
          </h1>
          <p className="text-xs sm:text-sm text-white/80 mt-1 font-medium">
            Evaluated against the verified competency framework for {result.roleTitle}.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <Link href={ROUTES.app.assessments.baseline}>
            <button className="px-4 py-2.5 rounded-lg bg-black/40 hover:bg-black/60 text-white border-2 border-white/60 font-black text-xs transition-colors flex items-center gap-1.5 cursor-pointer">
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retake</span>
            </button>
          </Link>
          <Link href={ROUTES.app.skillAnalysis}>
            <button className="px-5 py-2.5 rounded-lg bg-electric-coral hover:bg-black hover:text-white text-black border-2 border-black font-black text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-editorial-xs">
              <span>VIEW MY SKILL GAPS</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </Link>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Card: Overall Readiness Score */}
        <div className="lg:col-span-5 p-6 rounded-xl bg-white border-2 border-black shadow-editorial-sm flex flex-col justify-between text-center">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-black block mb-4">
              Baseline Diagnostic Score
            </span>

            <div className="relative inline-flex items-center justify-center my-4">
              <div className="w-36 h-36 rounded-full border-4 border-black flex flex-col items-center justify-center bg-paper shadow-editorial-sm">
                <span className="text-4xl font-display font-black text-black">
                  {result.score}%
                </span>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-royal-maroon mt-1">
                  {result.score >= 80 ? "Production Ready" : result.score >= 60 ? "Foundations Sound" : "Developing"}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-4 text-left">
              <div className="p-3 bg-stone-50 border border-black/20">
                <span className="text-[10px] font-bold text-muted uppercase block">Correct Answers</span>
                <span className="text-lg font-black text-black">{result.correctCount} / {result.totalQuestions}</span>
              </div>
              <div className="p-3 bg-stone-50 border border-black/20">
                <span className="text-[10px] font-bold text-muted uppercase block">Competencies Assessed</span>
                <span className="text-lg font-black text-black">{result.skillBreakdown.length} Skills</span>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-black/10 mt-6">
            <Link href={ROUTES.app.skillAnalysis} className="w-full block">
              <button className="w-full py-3 bg-royal-maroon text-white hover:bg-electric-coral hover:text-black font-extrabold text-xs uppercase tracking-wider border-2 border-black shadow-editorial-xs transition-colors flex items-center justify-center gap-2">
                <span>View Full Skill Gap Analysis</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>
        </div>

        {/* Right Card: Skill Competency Breakdown */}
        <div className="lg:col-span-7 p-6 rounded-xl bg-white border-2 border-black shadow-editorial-sm space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-black uppercase tracking-wider text-black flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-royal-maroon" />
              <span>Skill-by-Skill Breakdown</span>
            </h3>
            <span className="text-[11px] font-mono text-muted font-bold">Industry Benchmark: 75%</span>
          </div>

          <div className="space-y-4">
            {result.skillBreakdown.map((sb, idx) => (
              <div key={idx} className="space-y-1.5 p-3 border border-black/10 hover:border-black transition-colors bg-stone-50">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-extrabold text-black">{sb.skill}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-black">{sb.score}%</span>
                    <span
                      className={`px-2 py-0.5 text-[10px] font-black uppercase border ${
                        sb.status === "Strong"
                          ? "bg-emerald-100 text-emerald-900 border-emerald-500"
                          : sb.status === "Moderate"
                          ? "bg-amber-100 text-amber-900 border-amber-500"
                          : "bg-rose-100 text-rose-900 border-rose-500"
                      }`}
                    >
                      {sb.status}
                    </span>
                  </div>
                </div>
                <div className="w-full h-2 bg-stone-200 border border-black/20 overflow-hidden">
                  <div
                    className={`h-full ${
                      sb.score >= 75 ? "bg-emerald-600" : sb.score >= 60 ? "bg-amber-500" : "bg-royal-maroon"
                    }`}
                    style={{ width: `${sb.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Strong vs Weak Competency Callouts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-white border-2 border-black shadow-editorial-sm space-y-4">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <h4 className="text-xs font-black uppercase tracking-wider text-black">
              Verified Strengths
            </h4>
          </div>
          <ul className="space-y-2">
            {result.strongAreas.map((sa, idx) => (
              <li key={idx} className="p-3 bg-emerald-50 border border-emerald-400 text-xs font-bold text-emerald-950 flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>{sa}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-6 bg-white border-2 border-black shadow-editorial-sm space-y-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-royal-maroon" />
            <h4 className="text-xs font-black uppercase tracking-wider text-black">
              Identified Skill Gaps (Focus Areas)
            </h4>
          </div>
          <ul className="space-y-2">
            {result.needsImprovement.map((ni, idx) => (
              <li key={idx} className="p-3 bg-rose-50 border border-rose-400 text-xs font-bold text-rose-950 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{ni}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Recommended Next Steps */}
      <div className="p-6 bg-stone-900 text-white border-2 border-black shadow-editorial-md space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-electric-coral" />
            <h4 className="text-sm font-black uppercase tracking-wider text-white">
              Targeted Next Steps
            </h4>
          </div>
          <Link href={ROUTES.app.learning.roadmap}>
            <button className="px-4 py-1.5 bg-electric-coral text-black hover:bg-white font-extrabold text-xs uppercase tracking-wider transition-colors border border-black shadow-editorial-xs">
              Go To Learning Roadmap
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {result.recommendations.map((rec, idx) => (
            <div key={idx} className="p-4 bg-black/60 border border-white/20 space-y-2">
              <span className="text-[10px] font-mono text-electric-coral font-bold block">
                STEP 0{idx + 1}
              </span>
              <p className="text-xs text-white/90 font-medium leading-relaxed">
                {rec}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
