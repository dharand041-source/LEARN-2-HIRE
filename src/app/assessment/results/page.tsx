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
  Target,
} from "lucide-react";
import { useCareer } from "@/context/CareerContext";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";

export default function AssessmentResultsPage() {
  const { assessmentResult, selectedRole } = useCareer();

  if (!assessmentResult) {
    return (
      <div className="max-w-4xl w-full mx-auto py-16 px-4 text-center space-y-6 animate-fade-in bg-white">
        <div className="w-16 h-16 rounded-2xl bg-surface-subtle border border-border flex items-center justify-center mx-auto text-imperial">
          <Target className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <Badge variant="imperial" size="sm">Phase 03 Diagnostics</Badge>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-night uppercase tracking-tight">
            No Assessment Taken Yet
          </h1>
          <p className="text-sm text-muted max-w-lg mx-auto">
            Take the initial technical diagnostic for <span className="font-semibold text-night">{selectedRole.title}</span> to evaluate your core skills, identify blind spots, and generate your customized learning roadmap.
          </p>
        </div>
        <div className="pt-2">
          <Link href="/assessment">
            <Button size="lg" className="gap-2 font-bold shadow-sm">
              <span>Start Initial Assessment</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const result = assessmentResult;

  return (
    <div className="max-w-6xl w-full mx-auto space-y-8 animate-fade-in bg-white pb-12">
      {/* Bold Royal Maroon Header Section */}
      <div className="rounded-2xl bg-royal-maroon text-white border-4 border-black p-6 sm:p-8 shadow-editorial-md flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded bg-black text-electric-coral text-xs font-mono font-black border border-black uppercase tracking-wider">Phase 03</span>
            <span className="text-xs text-white/90 font-mono uppercase tracking-wider font-extrabold">
              Diagnostic Skill-Gap Analysis
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight uppercase leading-snug">
            Assessment Results & Competency Map
          </h1>
          <p className="text-xs sm:text-sm text-white/80 mt-1 font-medium">
            Evaluated against the verified industry benchmark for <strong className="text-white font-extrabold">{result.roleTitle}</strong>.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Link href="/assessment">
            <button className="px-4 py-2.5 rounded-lg bg-black/40 hover:bg-black/60 text-white border-2 border-white/60 font-black text-xs transition-colors flex items-center gap-1.5 cursor-pointer">
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retake Diagnostic</span>
            </button>
          </Link>
          <Link href="/learning">
            <button className="px-5 py-2.5 rounded-lg bg-electric-coral hover:bg-black hover:text-white text-black border-2 border-black font-black text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-editorial-xs">
              <span>Start Personalized Training</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </Link>
        </div>
      </div>

      {/* Section 1: Top 2-Column Overview (Readiness Score & Skill Breakdown) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Card: Overall Career Readiness (5 cols) */}
        <div className="lg:col-span-5 p-6 rounded-xl bg-white border-2 border-foreground shadow-editorial-sm flex flex-col justify-between text-center">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-foreground block mb-6">
              Current Diagnostic Score
            </span>

            <div className="relative inline-flex items-center justify-center my-2">
              <div className="w-36 h-36 rounded-xl border-3 border-foreground flex flex-col items-center justify-center bg-royal-maroon/10 shadow-xs">
                <span className="text-4xl font-display font-extrabold text-foreground font-mono">
                  {result.score}
                </span>
                <span className="text-xs text-foreground uppercase font-mono font-extrabold">/ 100</span>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-surface border border-border text-xs text-foreground leading-relaxed text-left space-y-1.5 mt-6">
              <p className="font-extrabold text-foreground flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-royal-maroon" />
                Readiness Tier: {result.score >= 80 ? "Advanced Mastery" : result.score >= 60 ? "Intermediate Competent" : "Foundational Discovery"}
              </p>
              <p className="text-[11px] text-muted font-normal">
                {result.score >= 80
                  ? "You have validated production-grade competencies across core domains. You are well-positioned for top tech roles."
                  : "You have validated foundational principles. Closing your identified critical gaps will rapidly elevate your score to 85%+ (Job Ready)."}
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-border mt-6 space-y-4">
            <div className="flex items-center justify-between text-xs text-muted font-bold">
              <span>Completed: {result.completedAt}</span>
              <span className="text-foreground font-extrabold">Valid Diagnostic</span>
            </div>

            <Link href="/learning" className="block w-full">
              <Button size="lg" variant="primary" className="w-full gap-2 text-sm font-extrabold shadow-sm">
                <span>Unlock Recommended Modules</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Right Card: Technical Skill Breakdown (7 cols) */}
        <div className="lg:col-span-7 p-6 rounded-xl bg-white border border-border shadow-card-clean flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-border pb-3 mb-5">
              <h3 className="text-xs font-extrabold text-foreground uppercase tracking-wider">
                Technical Skill Breakdown
              </h3>
              <span className="text-xs text-muted font-bold font-mono">
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
                        <span className="text-foreground font-extrabold">{item.skill}</span>
                        <Badge
                          variant={isStrong ? "night" : isCritical ? "maroon" : "coral"}
                          size="sm"
                        >
                          {band}
                        </Badge>
                      </div>
                      <span className="font-mono font-extrabold text-foreground">
                        {item.score}%
                      </span>
                    </div>
                    <ProgressBar
                      value={item.score}
                      size="sm"
                      variant={isStrong ? "maroon" : isCritical ? "coral" : "coral"}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-4 border-t border-border mt-6 flex items-center justify-between text-xs text-muted">
            <span className="flex items-center gap-1.5 font-medium">
              <ShieldCheck className="w-4 h-4 text-royal-maroon" />
              Skill-benchmarked against hiring requirements
            </span>
            <span className="font-mono font-extrabold text-foreground">{result.totalQuestions} Questions Evaluated</span>
          </div>
        </div>
      </div>

      {/* Section 2: Full-Width 2-Column Cards (Demonstrated Strengths vs Critical Skill Gaps) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        {/* Demonstrated Strengths */}
        <div className="p-6 rounded-2xl bg-white border border-surface-border shadow-card-subtle space-y-4">
          <div className="flex items-center gap-2 text-night border-b border-surface-border pb-3">
            <CheckCircle2 className="w-4 h-4 text-royal-maroon shrink-0" />
            <h4 className="text-xs font-bold uppercase tracking-wider">
              Demonstrated Strengths
            </h4>
          </div>
          <ul className="space-y-2.5 text-xs text-night-muted font-medium">
            {result.strongAreas && result.strongAreas.length > 0 ? (
              result.strongAreas.map((area, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="text-royal-maroon font-bold">•</span>
                  <span className="text-night">{area}</span>
                </li>
              ))
            ) : (
              <li className="text-night-muted italic">Complete more modules to unlock highlighted strengths.</li>
            )}
          </ul>
        </div>

        {/* Critical Skill Gaps */}
        <div className="p-6 rounded-2xl bg-surface border-2 border-border space-y-4 shadow-card-subtle">
          <div className="flex items-center gap-2 text-royal-maroon border-b border-border pb-3">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <h4 className="text-xs font-bold uppercase tracking-wider">
              Identified Skill Gaps
            </h4>
          </div>
          <ul className="space-y-2.5 text-xs text-night font-medium">
            {result.needsImprovement && result.needsImprovement.length > 0 ? (
              result.needsImprovement.map((gap, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="text-royal-maroon font-bold">•</span>
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
