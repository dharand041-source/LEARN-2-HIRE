"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  TrendingUp,
  AlertTriangle,
  Building,
  CheckCircle2,
  ArrowRight,
  BookOpen,
  FolderGit2,
  Mic,
  FileText,
  Sparkles,
  Zap,
  Calendar,
  Check,
  RotateCcw,
  ShieldCheck,
} from "lucide-react";
import { useCareer } from "@/context/CareerContext";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";

export default function RejectionAnalysisPage() {
  const { applications, userProfile } = useCareer();

  const rejectedApp = applications.find((a) => a.status === "Rejected" && a.feedback) || applications[3];
  const feedback = rejectedApp?.feedback;

  const [completedTasks, setCompletedTasks] = useState<Record<number, boolean>>({});

  const toggleTask = (idx: number) => {
    setCompletedTasks((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const completedCount = Object.values(completedTasks).filter(Boolean).length;
  const totalTasks = feedback?.retrainingPlan.length || 4;
  const recoveryProgress = Math.round((completedCount / totalTasks) * 100);

  if (!feedback) {
    return (
      <div className="p-12 text-center text-pearl-muted">
        No rejection outcome data available at this time.
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="border-b border-surface-border pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="rose" size="sm">Phase 15</Badge>
            <span className="text-xs text-pearl-muted font-mono uppercase tracking-wider">
              Root-Cause Outcome Remediation
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-pearl-primary tracking-tight">
            Outcome Diagnostic & Retraining Engine
          </h1>
          <p className="text-xs sm:text-sm text-pearl-muted mt-1 max-w-2xl">
            Learn-2-Hire turns rejections into structured engineering gains. We separate employer feedback from algorithmic system analysis to prescribe a daily recovery plan.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/applications">
            <Button variant="outline" size="sm" className="gap-1.5">
              <span>Back to Kanban Tracker</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Outcome Snapshot Banner */}
      <div className="p-6 rounded-2xl bg-surface-card border border-rose/40 shadow-card-navy space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-surface-border pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-navy-800 border border-rose/40 flex items-center justify-center text-rose font-bold">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono tracking-wider text-rose font-bold">
                Application Outcome: Turn-Down Analysis
              </span>
              <h2 className="text-lg font-bold text-pearl-primary">
                {feedback.role} at {feedback.company}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-pearl-muted">
            <Calendar className="w-3.5 h-3.5 text-champagne" />
            <span>Analyzed on {feedback.outcomeDate}</span>
          </div>
        </div>

        {/* SECTION 1: EMPLOYER DIRECT FEEDBACK (Distinguished clearly) */}
        {feedback.employerFeedbackProvided && (
          <div className="p-4 rounded-xl bg-navy-950 border border-rose/30 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-rose uppercase tracking-wider flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" />
                Verified Employer Feedback:
              </span>
              <Badge variant="rose" size="sm">Direct Feedback</Badge>
            </div>
            <p className="text-xs text-pearl-primary italic leading-relaxed">
              &quot;{feedback.employerFeedbackText}&quot;
            </p>
          </div>
        )}
      </div>

      {/* Main Grid: Left Diagnostic Analysis (7 cols) & Right Priority Retraining Plan (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: System Analysis Breakdown */}
        <div className="lg:col-span-7 space-y-6">
          {/* System Synthesis Card */}
          <div className="p-6 rounded-2xl bg-surface-card border border-surface-border space-y-4">
            <div className="flex items-center justify-between border-b border-surface-border pb-3">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-pearl-primary flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-champagne" />
                Learn-2-Hire System Diagnostic Synthesis
              </h3>
              <Badge variant="champagne" size="sm">Algorithmic Correlation</Badge>
            </div>
            <p className="text-xs text-pearl-muted leading-relaxed">
              {feedback.systemAnalysis.summary}
            </p>
          </div>

          {/* 3 Core Vector Gaps */}
          <div className="space-y-4">
            {/* Vector 1: Technical & SQL Gaps */}
            <div className="p-5 rounded-xl bg-surface-card border border-surface-border space-y-2.5">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-champagne flex items-center gap-2">
                <AlertTriangle className="w-3.5 h-3.5 text-rose" />
                Primary Technical Competency Gaps
              </h4>
              <ul className="space-y-1.5 text-xs text-pearl-muted pl-1">
                {feedback.systemAnalysis.potentialSkillGaps.map((gap, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-rose font-bold">•</span>
                    <span>{gap}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Vector 2: Interview Performance Factors */}
            <div className="p-5 rounded-xl bg-surface-card border border-surface-border space-y-2.5">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-champagne flex items-center gap-2">
                <Mic className="w-3.5 h-3.5 text-champagne" />
                Interview Defense Factors
              </h4>
              <ul className="space-y-1.5 text-xs text-pearl-muted pl-1">
                {feedback.systemAnalysis.interviewPerformanceFactors.map((factor, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-champagne font-bold">•</span>
                    <span>{factor}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Vector 3: Resume Presentation */}
            <div className="p-5 rounded-xl bg-surface-card border border-surface-border space-y-2.5">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-champagne flex items-center gap-2">
                <FileText className="w-3.5 h-3.5 text-champagne" />
                Resume & Portfolio Evidence Deficiencies
              </h4>
              <ul className="space-y-1.5 text-xs text-pearl-muted pl-1">
                {feedback.systemAnalysis.resumeDeficiencies.map((def, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-pearl-muted font-bold">•</span>
                    <span>{def}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Right Column: Priority Retraining Roadmap */}
        <div className="lg:col-span-5 sticky top-20 space-y-6">
          <div className="p-6 rounded-2xl bg-surface-card border border-champagne/40 shadow-card-navy space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <Badge variant="champagne" size="sm">Actionable Roadmap</Badge>
                <span className="text-xs font-mono text-champagne font-bold">{recoveryProgress}% Complete</span>
              </div>
              <h3 className="text-base font-bold text-pearl-primary">
                Personalized Retraining Plan
              </h3>
              <p className="text-xs text-pearl-muted mt-1 leading-relaxed">
                Complete these 4 targeted tasks to eliminate identified deficiencies and increase your candidate readiness to 85%+.
              </p>
            </div>

            <ProgressBar value={recoveryProgress} size="sm" variant="champagne" />

            {/* Tasks Checklist */}
            <div className="space-y-3">
              {feedback.retrainingPlan.map((task, idx) => {
                const isChecked = !!completedTasks[idx];
                return (
                  <div
                    key={idx}
                    className={`p-3.5 rounded-xl border transition-all space-y-2 ${
                      isChecked
                        ? "bg-navy-900/90 border-champagne/30 text-pearl-primary"
                        : "bg-surface-subtle border-white/10"
                    }`}
                  >
                    <div className="flex items-start gap-2.5">
                      <button
                        onClick={() => toggleTask(idx)}
                        className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                          isChecked
                            ? "bg-champagne border-champagne text-black"
                            : "border-pearl-muted/40"
                        }`}
                      >
                        {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                      </button>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span
                            className={`text-[10px] font-mono uppercase font-bold ${
                              task.priority === "High" ? "text-rose" : "text-champagne"
                            }`}
                          >
                            [{task.priority} Priority] • {task.estimatedDays} Days
                          </span>
                        </div>
                        <p className={`text-xs mt-1 leading-relaxed ${isChecked ? "line-through text-pearl-muted" : "text-pearl-primary"}`}>
                          {task.task}
                        </p>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-white/5 flex items-center justify-end">
                      <Link
                        href={task.actionLink}
                        className="text-[11px] text-champagne hover:underline flex items-center gap-1 font-semibold"
                      >
                        <span>{task.actionLabel}</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Complete State */}
            {recoveryProgress === 100 && (
              <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs text-center space-y-2 animate-slide-up">
                <p className="font-bold">✓ Retraining Roadmap Completed!</p>
                <p className="text-[11px]">Your profile has resolved the SQL and concurrency deficiencies. Ready to re-apply.</p>
                <Link href="/opportunities" className="block pt-1">
                  <Button size="sm" className="w-full">Explore Opportunities</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
