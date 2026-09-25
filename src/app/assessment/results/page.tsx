"use client";

import React from "react";
import Link from "next/link";
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
} from "lucide-react";
import { useCareer } from "@/context/CareerContext";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";

export default function AssessmentResultsPage() {
  const { assessmentResult, selectedRole } = useCareer();

  const result = assessmentResult || {
    score: 72,
    totalQuestions: 10,
    completedAt: "2026-09-18",
    roleId: selectedRole.id,
    roleTitle: selectedRole.title,
    skillBreakdown: [
      { skill: "JavaScript", score: 82, status: "Strong" },
      { skill: "React & Next.js", score: 76, status: "Strong" },
      { skill: "Node.js & Express", score: 61, status: "Moderate" },
      { skill: "PostgreSQL & SQL", score: 48, status: "Needs Improvement" },
      { skill: "Git & Version Control", score: 88, status: "Strong" },
      { skill: "REST APIs & Security", score: 69, status: "Moderate" },
    ],
    strongAreas: [
      "Git & branching workflows (88%)",
      "JavaScript asynchronous microtask loop (82%)",
      "React state hooks & Server Component separation (76%)",
    ],
    needsImprovement: [
      "SQL composite indexing, execution plans & query tuning (48%)",
      "Node.js streams & memory leak prevention (61%)",
      "REST cursor-based pagination & error envelope contracts (69%)",
    ],
    recommendations: [
      "Complete the 'Relational Databases & PostgreSQL Query Optimization' learning module.",
      "Solve the 3 recommended SQL & Debugging algorithmic problems.",
      "Practice database transaction lock questions in the Voice Interview simulator.",
    ],
  };

  return (
    <div className="max-w-6xl w-full mx-auto space-y-8 animate-fade-in bg-white pb-12">
      {/* Header */}
      <div className="border-b border-surface-border pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <Badge variant="imperial" size="sm">Phase 03</Badge>
            <span className="text-xs text-night-muted font-mono uppercase tracking-wider font-bold">
              Diagnostic Skill-Gap Analysis
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-night tracking-tight uppercase">
            Assessment Results & Competency Map
          </h1>
          <p className="text-xs sm:text-sm text-night-muted mt-1">
            Evaluated against the verified industry benchmark for <strong className="text-night font-semibold">{result.roleTitle}</strong>.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/assessment">
            <Button variant="secondary" size="sm" className="gap-1.5 font-bold">
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retake Diagnostic</span>
            </Button>
          </Link>
          <Link href="/learning">
            <Button size="sm" className="gap-1.5 font-bold shadow-sm">
              <span>Start Personalized Training</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Section 1: Top 2-Column Overview (Readiness Score & Skill Breakdown) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Card: Overall Career Readiness (5 cols) */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-white border border-surface-border shadow-card-subtle flex flex-col justify-between text-center">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-night block mb-6">
              Current Career Readiness
            </span>

            <div className="relative inline-flex items-center justify-center my-2">
              <div className="w-36 h-36 rounded-full border-4 border-imperial flex flex-col items-center justify-center bg-surface-subtle shadow-inner">
                <span className="text-4xl font-display font-extrabold text-night font-mono">
                  {result.score}
                </span>
                <span className="text-xs text-night-muted uppercase font-mono font-bold">/ 100</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-surface-subtle border border-surface-border text-xs text-night leading-relaxed text-left space-y-1.5 mt-6">
              <p className="font-bold text-night flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-imperial" />
                Readiness Level: {result.score >= 80 ? "Advanced" : result.score >= 60 ? "Intermediate" : "Foundational"}
              </p>
              <p className="text-[11px] text-night-muted font-medium">
                {result.score >= 80
                  ? "You have validated production-grade competencies across core domains. You are well-positioned for top tech roles."
                  : "You have validated foundational principles. Closing your identified critical gaps will rapidly elevate your score to 85%+ (Job Ready)."}
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-surface-border mt-6 space-y-4">
            <div className="flex items-center justify-between text-xs text-night-muted font-semibold">
              <span>Completed: {result.completedAt}</span>
              <span className="text-night font-bold">Valid Diagnostic</span>
            </div>

            <Link href="/learning" className="block w-full">
              <Button size="lg" className="w-full gap-2 text-sm font-bold shadow-sm">
                <span>Unlock Recommended Modules</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Right Card: Technical Skill Breakdown (7 cols) */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-white border border-surface-border shadow-card-subtle flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-surface-border pb-3 mb-5">
              <h3 className="text-xs font-bold text-night uppercase tracking-wider">
                Technical Skill Breakdown
              </h3>
              <span className="text-xs text-night-muted font-semibold">
                {result.skillBreakdown?.length || 6} Core Dimensions Evaluated
              </span>
            </div>

            <div className="space-y-4">
              {result.skillBreakdown.map((item, i) => {
                const band = (item as any).band || item.status || "Moderate";
                const isStrong = band === "Advanced" || band === "Strong" || item.score >= 75;
                const isCritical = item.score < 50 || band === "Needs Improvement" || band === "Critical Gap";

                return (
                  <div key={i} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="text-night font-bold">{item.skill}</span>
                        <Badge
                          variant={isStrong ? "night" : isCritical ? "imperial" : "neutral"}
                          size="sm"
                        >
                          {band}
                        </Badge>
                      </div>
                      <span className="font-mono font-extrabold text-imperial">
                        {item.score}%
                      </span>
                    </div>
                    <ProgressBar
                      value={item.score}
                      size="sm"
                      variant={isStrong ? "night" : "imperial"}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-4 border-t border-surface-border mt-6 flex items-center justify-between text-xs text-night-muted">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Skill-benchmarked against hiring requirements
            </span>
            <span className="font-mono font-bold text-night">{result.totalQuestions} Questions Evaluated</span>
          </div>
        </div>
      </div>

      {/* Section 2: Full-Width 2-Column Cards (Demonstrated Strengths vs Critical Skill Gaps) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        {/* Demonstrated Strengths */}
        <div className="p-6 rounded-2xl bg-white border border-surface-border shadow-card-subtle space-y-4">
          <div className="flex items-center gap-2 text-night border-b border-surface-border pb-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <h4 className="text-xs font-bold uppercase tracking-wider">
              Demonstrated Strengths
            </h4>
          </div>
          <ul className="space-y-2.5 text-xs text-night-muted font-medium">
            {result.strongAreas && result.strongAreas.length > 0 ? (
              result.strongAreas.map((area, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="text-emerald-600 font-bold">•</span>
                  <span className="text-night">{area}</span>
                </li>
              ))
            ) : (
              <li className="text-night-muted italic">Complete more modules to unlock highlighted strengths.</li>
            )}
          </ul>
        </div>

        {/* Critical Skill Gaps */}
        <div className="p-6 rounded-2xl bg-imperial-50/40 border border-imperial-200 space-y-4 shadow-card-subtle">
          <div className="flex items-center gap-2 text-imperial border-b border-imperial-200 pb-3">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <h4 className="text-xs font-bold uppercase tracking-wider">
              Identified Skill Gaps
            </h4>
          </div>
          <ul className="space-y-2.5 text-xs text-night font-medium">
            {result.needsImprovement && result.needsImprovement.length > 0 ? (
              result.needsImprovement.map((gap, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="text-imperial font-bold">•</span>
                  <span>{gap}</span>
                </li>
              ))
            ) : (
              <li className="text-night-muted italic">No critical gaps identified in this evaluation.</li>
            )}
          </ul>
        </div>
      </div>

      {/* Section 3: Full-Width Recommended Immediate Action Plan */}
      <div className="p-6 rounded-2xl bg-surface-subtle border border-surface-border shadow-card-subtle space-y-5 w-full">
        <div className="flex items-center justify-between border-b border-surface-border pb-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-night flex items-center gap-2">
            <Zap className="w-4 h-4 text-imperial" />
            Recommended Immediate Action Plan
          </h4>
          <span className="text-xs text-night-muted font-semibold">Priority Retraining Steps</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {result.recommendations.map((rec, i) => (
            <div key={i} className="p-4 rounded-xl bg-white border border-surface-border text-xs flex flex-col justify-between shadow-sm hover:border-imperial/40 transition-colors">
              <p className="text-night-muted leading-relaxed font-medium">{rec}</p>
              <Link
                href={i === 0 ? "/learning" : i === 1 ? "/problem-solving" : "/interview"}
                className="mt-4 text-xs font-bold text-imperial hover:underline flex items-center gap-1.5 group"
              >
                <span>{i === 0 ? "Start Module" : i === 1 ? "Solve Problems" : "Practice Mock"}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Section 4: Full-Width Detailed Question Review */}
      {result.questionResults && result.questionResults.length > 0 && (
        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-surface-border shadow-card-subtle space-y-6 w-full">
          <div className="flex items-center justify-between border-b border-surface-border pb-4">
            <div>
              <h3 className="text-sm font-bold text-night uppercase tracking-wider">
                Diagnostic Item Breakdown
              </h3>
              <p className="text-xs text-night-muted mt-0.5">
                Deterministic answer validation with verified technical explanations
              </p>
            </div>
            <Badge variant="imperial" size="sm">
              {result.correctCount || 0} / {result.totalQuestions} Correct
            </Badge>
          </div>

          <div className="space-y-4">
            {result.questionResults.map((qr, idx) => (
              <div
                key={idx}
                className={`p-5 rounded-xl border text-xs space-y-3 transition-all ${
                  qr.isCorrect
                    ? "bg-surface-subtle/50 border-surface-border"
                    : "bg-imperial-50/20 border-imperial-200"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-night-muted">
                        Q{idx < 9 ? `0${idx + 1}` : idx + 1}
                      </span>
                      <Badge variant="neutral" size="sm">
                        {qr.skill}
                      </Badge>
                    </div>
                    <p className="font-semibold text-night text-sm leading-relaxed">
                      {qr.question}
                    </p>
                  </div>

                  <div className="shrink-0 flex items-center gap-1 font-bold">
                    {qr.isCorrect ? (
                      <span className="text-emerald-700 flex items-center gap-1 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Correct</span>
                      </span>
                    ) : (
                      <span className="text-imperial flex items-center gap-1 bg-imperial-50 px-2.5 py-1 rounded-md border border-imperial-200">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        <span>Review</span>
                      </span>
                    )}
                  </div>
                </div>

                <div className="pt-3 border-t border-surface-border grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-night-muted font-medium">Your Submitted Answer: </span>
                    <span
                      className={`font-semibold ${
                        qr.isCorrect ? "text-night" : "text-imperial"
                      }`}
                    >
                      {qr.userAnswer || "(Unanswered)"}
                    </span>
                  </div>
                  <div>
                    <span className="text-night-muted font-medium">Canonical Solution: </span>
                    <span className="text-night font-bold">
                      {qr.correctAnswer}
                    </span>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-white border border-surface-border text-xs text-night-muted leading-relaxed font-normal">
                  <span className="font-bold text-night">Explanation: </span>
                  {qr.explanation}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
