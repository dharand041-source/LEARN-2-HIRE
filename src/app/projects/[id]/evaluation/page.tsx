"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Award,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  FolderGit2,
  FileText,
  Sparkles,
  Zap,
  RotateCcw,
  Github,
  Globe,
} from "lucide-react";
import { useCareer } from "@/context/CareerContext";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { getScoreColor } from "@/lib/constants";

export default function ProjectEvaluationPage() {
  const params = useParams();
  const router = useRouter();
  const { projects, userProfile } = useCareer();

  const projectId = params.id as string;
  const project = projects.find((p) => p.id === projectId) || projects[0];

  const evaluation = project.evaluation || {
    overallScore: 82,
    evaluatedAt: "2026-09-22",
    rubric: [
      { criterion: "System Functionality & Completeness", score: 17, maxScore: 20, feedback: "State machine handles core workflows accurately." },
      { criterion: "Code Quality & TypeScript Strictness", score: 17, maxScore: 20, feedback: "Clean modular repository with strict type checking." },
      { criterion: "UI / UX & Responsive Design", score: 18, maxScore: 20, feedback: "Polished dark theme, high contrast, WCAG accessible." },
      { criterion: "Database Schema & Query Performance", score: 15, maxScore: 20, feedback: "Proper relations; consider adding composite indexes for queries." },
      { criterion: "Testing & DevOps Pipeline", score: 15, maxScore: 20, feedback: "GitHub Actions CI pipeline operational." },
    ],
    strengths: [
      "Atomic transaction locks prevent race condition payout glitches.",
      "Clean separation of Server and Client components in Next.js App Router.",
      "Responsive UI tested across desktop and mobile viewports.",
    ],
    areasToImprove: [
      "Add composite covering indexes to active queries to eliminate table scans.",
      "Increase Playwright E2E test coverage for failure rollback scenarios.",
    ],
    recommendedNextSteps: [
      "Add this project to your ATS Resume under Featured Projects.",
      "Complete 'PostgreSQL Query Optimization' module to close indexing gap.",
    ],
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="border-b border-surface-border pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <Link
            href={`/projects/${project.id}`}
            className="p-2 rounded-lg bg-surface-card hover:bg-navy-800 border border-surface-border text-pearl-muted hover:text-pearl-primary transition-colors mt-1"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="champagne" size="sm">Phase 07</Badge>
              <span className="text-xs text-pearl-muted font-mono uppercase tracking-wider">
                Production Rubric Evaluation
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-pearl-primary">
              {project.title} • Scorecard
            </h1>
            <p className="text-xs sm:text-sm text-pearl-muted mt-1">
              Evaluated on {evaluation.evaluatedAt} against industry production standards.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/resume">
            <Button size="sm" className="gap-2">
              <FileText className="w-3.5 h-3.5" />
              <span>Sync with ATS Resume</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Overall Score Card (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 rounded-2xl bg-surface-card border border-champagne/40 shadow-card-navy space-y-6 text-center">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-pearl-muted">
              Overall Project Score
            </span>

            <div className="relative inline-flex items-center justify-center">
              <div className="w-36 h-36 rounded-full border-4 border-navy-800 flex flex-col items-center justify-center bg-navy-950/80 shadow-inner">
                <span className={`text-4xl font-display font-extrabold font-mono ${getScoreColor(evaluation.overallScore)}`}>
                  {evaluation.overallScore}
                </span>
                <span className="text-[11px] text-pearl-muted uppercase font-mono">/ 100</span>
              </div>
            </div>

            <div className="p-3.5 rounded-lg bg-navy-950 border border-white/5 text-xs text-pearl-muted text-left space-y-1.5 leading-relaxed">
              <p className="font-semibold text-pearl-primary flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-champagne" />
                Employment Portfolio Verdict
              </p>
              <p className="text-[11px]">
                {evaluation.overallScore >= 85
                  ? "Production-Grade Certified: This project demonstrates enterprise competence and gives you strong interview leverage."
                  : "Solid Prototype: Refine the suggested SQL indexes and add E2E tests to push this score to 90+."}
              </p>
            </div>

            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-pearl-muted">
              <span>Status: Verified</span>
              <span className="text-champagne font-mono">+350 XP Awarded</span>
            </div>

            <Link href={`/projects/${project.id}`} className="block w-full">
              <Button variant="outline" size="sm" className="w-full gap-2 text-xs">
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Update Project Artifacts</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Right Column: 5-Criterion Rubric Breakdown & Recommendations (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Rubric Breakdown */}
          <div className="p-6 rounded-xl bg-surface-card border border-surface-border space-y-5">
            <div className="flex items-center justify-between border-b border-surface-border pb-3">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-pearl-primary">
                Technical Rubric Breakdown
              </h2>
              <span className="text-xs text-pearl-muted font-mono">5 Rubric Criteria (20 pts each)</span>
            </div>

            <div className="space-y-4">
              {evaluation.rubric.map((item, i) => (
                <div key={i} className="p-3.5 rounded-lg bg-navy-950/80 border border-white/5 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-pearl-primary">{item.criterion}</span>
                    <span className="font-mono text-champagne font-bold">{item.score} / {item.maxScore}</span>
                  </div>
                  <ProgressBar value={(item.score / item.maxScore) * 100} size="sm" variant="champagne" />
                  <p className="text-[11px] text-pearl-muted leading-relaxed">{item.feedback}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Strengths & Improvement Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl bg-surface-card border border-emerald-500/20 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
                <h3 className="text-xs font-semibold uppercase tracking-wider">
                  Verified Strengths
                </h3>
              </div>
              <ul className="space-y-2 text-xs text-pearl-muted">
                {evaluation.strengths.map((str, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">•</span>
                    <span>{str}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-5 rounded-xl bg-surface-card border border-rose/30 space-y-3">
              <div className="flex items-center gap-2 text-rose">
                <AlertTriangle className="w-4 h-4" />
                <h3 className="text-xs font-semibold uppercase tracking-wider">
                  Areas For Improvement
                </h3>
              </div>
              <ul className="space-y-2 text-xs text-pearl-muted">
                {evaluation.areasToImprove.map((area, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-rose font-bold">•</span>
                    <span>{area}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Recommended Next Actions */}
          <div className="p-5 rounded-xl bg-navy-950 border border-white/5 space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-champagne flex items-center gap-2">
              <Zap className="w-3.5 h-3.5" />
              Recommended Next Career Steps
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {evaluation.recommendedNextSteps.map((step, i) => (
                <div key={i} className="p-3.5 rounded-lg bg-surface-card border border-surface-border text-xs flex flex-col justify-between">
                  <p className="text-pearl-muted leading-relaxed">{step}</p>
                  <Link
                    href={i === 0 ? "/resume" : "/learning/databases-sql"}
                    className="mt-3 text-[11px] font-semibold text-champagne hover:underline flex items-center gap-1"
                  >
                    <span>{i === 0 ? "Open Resume Builder" : "Start SQL Module"}</span>
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
