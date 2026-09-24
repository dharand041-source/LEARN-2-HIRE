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
import { getScoreColor } from "@/lib/constants";

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
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="border-b border-surface-border pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="champagne" size="sm">Phase 03</Badge>
            <span className="text-xs text-pearl-muted font-mono uppercase tracking-wider">
              Diagnostic Skill-Gap Analysis
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-pearl-primary tracking-tight">
            Assessment Results & Competency Map
          </h1>
          <p className="text-xs sm:text-sm text-pearl-muted mt-1">
            Evaluated against the verified industry benchmark for <strong>{result.roleTitle}</strong>.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/assessment">
            <Button variant="outline" size="sm" className="gap-1.5">
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retake Diagnostic</span>
            </Button>
          </Link>
          <Link href="/learning">
            <Button size="sm" className="gap-1.5">
              <span>Start Personalized Training</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Overall Readiness Score Card (4 cols) */}
        <div className="lg:col-span-4 space-y-5">
          <div className="p-6 rounded-2xl bg-surface-card border border-champagne/40 shadow-card-navy space-y-6 text-center">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-pearl-muted">
              Current Career Readiness
            </span>

            <div className="relative inline-flex items-center justify-center">
              {/* Outer Ring Visual */}
              <div className="w-36 h-36 rounded-full border-4 border-navy-800 flex flex-col items-center justify-center bg-navy-950/80 shadow-inner">
                <span className="text-4xl font-display font-extrabold text-champagne font-mono">
                  {result.score}
                </span>
                <span className="text-[11px] text-pearl-muted uppercase font-mono">/ 100</span>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-navy-950 border border-white/5 text-xs text-pearl-muted leading-relaxed text-left space-y-1.5">
              <p className="font-semibold text-pearl-primary flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-champagne" />
                Readiness Level: Intermediate
              </p>
              <p className="text-[11px]">
                You have validated strong fundamentals in JavaScript and React. Closing your SQL and Node.js gaps will elevate your score to 85%+ (Job Ready).
              </p>
            </div>

            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-pearl-muted">
              <span>Completed: {result.completedAt}</span>
              <span className="text-emerald-400 font-medium">Valid Diagnostic</span>
            </div>

            <Link href="/learning" className="block w-full">
              <Button size="lg" className="w-full gap-2 text-sm font-semibold">
                <span>Unlock Recommended Modules</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Right Column: Skill Breakdown & Gaps (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Horizontal Skill Breakdown Bars */}
          <div className="p-6 rounded-xl bg-surface-card border border-surface-border space-y-5">
            <div className="flex items-center justify-between border-b border-surface-border pb-3">
              <h3 className="text-sm font-semibold text-pearl-primary uppercase tracking-wider">
                Technical Skill Breakdown
              </h3>
              <span className="text-xs text-pearl-muted">6 Core Dimensions Evaluated</span>
            </div>

            <div className="space-y-4">
              {result.skillBreakdown.map((item, i) => (
                <div key={i} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="text-pearl-primary font-medium">{item.skill}</span>
                      <Badge
                        variant={
                          item.status === "Strong"
                            ? "champagne"
                            : item.status === "Moderate"
                            ? "navy"
                            : "rose"
                        }
                        size="sm"
                      >
                        {item.status}
                      </Badge>
                    </div>
                    <span className={`font-mono font-bold ${getScoreColor(item.score)}`}>
                      {item.score}%
                    </span>
                  </div>
                  <ProgressBar
                    value={item.score}
                    size="sm"
                    variant={item.score >= 75 ? "champagne" : item.score >= 60 ? "navy" : "rose"}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* 2-Column Cards: Strong Areas vs Critical Gaps */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Strong Areas */}
            <div className="p-5 rounded-xl bg-surface-card border border-emerald-500/20 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
                <h4 className="text-xs font-semibold uppercase tracking-wider">
                  Demonstrated Strengths
                </h4>
              </div>
              <ul className="space-y-2 text-xs text-pearl-muted">
                {result.strongAreas.map((area, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">•</span>
                    <span>{area}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Critical Skill Gaps */}
            <div className="p-5 rounded-xl bg-surface-card border border-rose/30 space-y-3">
              <div className="flex items-center gap-2 text-rose">
                <AlertTriangle className="w-4 h-4" />
                <h4 className="text-xs font-semibold uppercase tracking-wider">
                  Identified Skill Gaps
                </h4>
              </div>
              <ul className="space-y-2 text-xs text-pearl-muted">
                {result.needsImprovement.map((gap, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-rose font-bold">•</span>
                    <span>{gap}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Actionable Next Steps */}
          <div className="p-5 rounded-xl bg-navy-950 border border-white/5 space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-champagne flex items-center gap-2">
              <Zap className="w-3.5 h-3.5" />
              Recommended Immediate Action Plan
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {result.recommendations.map((rec, i) => (
                <div key={i} className="p-3 rounded-lg bg-surface-card border border-surface-border text-xs flex flex-col justify-between">
                  <p className="text-pearl-muted leading-relaxed">{rec}</p>
                  <Link
                    href={i === 0 ? "/learning" : i === 1 ? "/problem-solving" : "/interview"}
                    className="mt-3 text-[11px] font-semibold text-champagne hover:underline flex items-center gap-1"
                  >
                    <span>{i === 0 ? "Start Module" : i === 1 ? "Solve Problems" : "Practice Mock"}</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
