"use client";

import React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  FileText,
  Sparkles,
  Zap,
  RotateCcw,
} from "lucide-react";
import { useCareer } from "@/context/CareerContext";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";

export default function ProjectEvaluationPage() {
  const params = useParams();
  const { projects } = useCareer();

  const projectId = params.id as string;
  const project = projects.find((p) => p.id === projectId) || projects[0];

  const evaluation = project.evaluation || {
    overallScore: 82,
    evaluatedAt: "2026-09-22",
    rubric: [
      { criterion: "System Functionality & Completeness", score: 17, maxScore: 20, feedback: "State machine handles core workflows accurately." },
      { criterion: "Code Quality & TypeScript Strictness", score: 17, maxScore: 20, feedback: "Clean modular repository with strict type checking." },
      { criterion: "UI / UX & Responsive Design", score: 18, maxScore: 20, feedback: "Polished editorial theme, high contrast, WCAG accessible." },
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
    <div className="space-y-8 animate-fade-in bg-background text-foreground min-h-screen">
      {/* Header */}
      <div className="border-b-2 border-border pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <Link
            href={`/projects/${project.id}`}
            className="p-2 rounded-md bg-white hover:bg-surface border-2 border-border text-muted-foreground hover:text-foreground transition-colors mt-1"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="navy" size="sm">Phase 07</Badge>
              <span className="text-xs text-muted-foreground font-mono uppercase tracking-wider font-bold">
                Production Rubric Evaluation
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-foreground tracking-tight">
              {project.title} • Scorecard
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1 font-mono">
              Evaluated on {evaluation.evaluatedAt} against industry engineering standards.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/resume">
            <Button variant="navy" size="sm" className="gap-2 font-bold shadow-editorial-sm">
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
          <Card variant="editorial" className="p-6 space-y-6 text-center">
            <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground font-mono">
              Overall Project Benchmark
            </span>

            <div className="relative inline-flex items-center justify-center">
              <div className="w-36 h-36 rounded-lg border-3 border-foreground flex flex-col items-center justify-center bg-surface shadow-editorial-md">
                <span className="text-5xl font-extrabold font-mono text-editorial-navy">
                  {evaluation.overallScore}
                </span>
                <span className="text-[11px] text-muted-foreground uppercase font-mono font-bold">/ 100</span>
              </div>
            </div>

            <div className="p-3.5 rounded-lg bg-surface border-2 border-border text-xs text-foreground text-left space-y-1.5 leading-relaxed">
              <p className="font-bold uppercase font-mono text-[11px] flex items-center gap-1.5 text-editorial-navy">
                <Sparkles className="w-3.5 h-3.5" />
                Employment Portfolio Verdict
              </p>
              <p className="text-[11px] font-medium text-muted-foreground">
                {evaluation.overallScore >= 85
                  ? "Production-Grade Certified: Demonstrates enterprise architectural competence and strong interview leverage."
                  : "Solid Production Prototype: Refine suggested SQL indexes and add E2E test assertions to reach 90+."}
              </p>
            </div>

            <div className="pt-2 border-t-2 border-border flex items-center justify-between text-xs font-mono font-bold">
              <span className="text-muted-foreground">Status: Verified</span>
              <span className="text-editorial-navy">+350 XP Awarded</span>
            </div>

            <Link href={`/projects/${project.id}`} className="block w-full">
              <Button variant="secondary" size="sm" className="w-full gap-2 text-xs font-bold">
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Return to Workspace</span>
              </Button>
            </Link>
          </Card>
        </div>

        {/* Right Column: 5-Criterion Rubric Breakdown & Recommendations (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Rubric Breakdown */}
          <Card variant="editorial" className="p-6 space-y-5">
            <div className="flex items-center justify-between border-b-2 border-border pb-3">
              <h2 className="text-xs font-bold uppercase font-mono tracking-wider text-foreground">
                Technical Rubric Breakdown
              </h2>
              <span className="text-xs text-muted-foreground font-mono font-bold">5 Rubric Criteria (20 pts each)</span>
            </div>

            <div className="space-y-4">
              {evaluation.rubric.map((item, i) => (
                <div key={i} className="p-3.5 rounded-lg bg-surface border-2 border-border space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono font-bold">
                    <span className="text-foreground">{item.criterion}</span>
                    <span className="text-editorial-navy">{item.score} / {item.maxScore}</span>
                  </div>
                  <ProgressBar value={(item.score / item.maxScore) * 100} size="sm" variant="navy" />
                  <p className="text-[11px] text-muted-foreground leading-relaxed">{item.feedback}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Strengths & Improvement Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card variant="editorial" className="p-5 space-y-3 border-l-4 border-l-emerald-600">
              <div className="flex items-center gap-2 text-emerald-700">
                <CheckCircle2 className="w-4 h-4" />
                <h3 className="text-xs font-bold uppercase font-mono tracking-wider">
                  Verified Strengths
                </h3>
              </div>
              <ul className="space-y-2 text-xs text-foreground font-medium">
                {evaluation.strengths.map((str, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold font-mono">✓</span>
                    <span>{str}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card variant="editorial" className="p-5 space-y-3 border-l-4 border-l-editorial-red">
              <div className="flex items-center gap-2 text-editorial-red">
                <AlertTriangle className="w-4 h-4" />
                <h3 className="text-xs font-bold uppercase font-mono tracking-wider">
                  Areas For Improvement
                </h3>
              </div>
              <ul className="space-y-2 text-xs text-foreground font-medium">
                {evaluation.areasToImprove.map((area, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-editorial-red font-bold font-mono">▶</span>
                    <span>{area}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          {/* Recommended Next Actions */}
          <Card variant="editorial" className="p-5 space-y-4">
            <h3 className="text-xs font-bold uppercase font-mono tracking-wider text-editorial-navy flex items-center gap-2 border-b-2 border-border pb-3">
              <Zap className="w-4 h-4" />
              Recommended Next Career Steps
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {evaluation.recommendedNextSteps.map((step, i) => (
                <div key={i} className="p-3.5 rounded-lg bg-surface border-2 border-border text-xs flex flex-col justify-between">
                  <p className="text-foreground font-medium leading-relaxed">{step}</p>
                  <Link
                    href={i === 0 ? "/resume" : "/learning"}
                    className="mt-3 text-[11px] font-bold text-editorial-navy hover:underline flex items-center gap-1 font-mono"
                  >
                    <span>{i === 0 ? "Open Resume Builder" : "Start Learning Path"}</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
