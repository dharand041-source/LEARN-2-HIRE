"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  TrendingUp,
  AlertTriangle,
  ArrowRight,
  Mic,
  FileText,
  Sparkles,
  Calendar,
  Check,
} from "lucide-react";
import { useCareer } from "@/context/CareerContext";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { SectionHeader } from "@/components/ui/SectionHeader";

export default function RejectionAnalysisPage() {
  const { applications } = useCareer();

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
      <div className="p-12 text-center text-black/70 font-mono">
        No rejection outcome data available at this time.
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in bg-white text-black min-h-screen">
      {/* Editorial Header */}
      <div className="border-b-2 border-black pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <SectionHeader
          eyebrow="PHASE 15 // ROOT-CAUSE REMEDIATION"
          title="Outcome Diagnostics & Retraining Engine"
          description="Learn-2-Hire converts rejection outcomes into structured engineering milestones. We separate employer feedback from algorithmic system analysis to prescribe a daily recovery plan."
          accent="maroon"
        />

        <div className="flex items-center gap-3">
          <Link href="/applications">
            <Button variant="secondary" size="sm" className="gap-1.5 font-black">
              <span>Back to Kanban Tracker</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Outcome Snapshot Banner */}
      <Card variant="editorial" className="p-6 md:p-8 space-y-5 border-l-8 border-l-royal-maroon bg-white border-2 border-black">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-black pb-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-lg bg-royal-maroon text-white flex items-center justify-center font-bold shadow-editorial-sm border-2 border-black shrink-0">
              <TrendingUp className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-royal-maroon font-black">
                Application Outcome: Turn-Down Analysis
              </span>
              <h2 className="text-xl font-black text-black tracking-tight">
                {feedback.role} at {feedback.company}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-black/70 font-bold">
            <Calendar className="w-3.5 h-3.5 text-royal-maroon" />
            <span>Analyzed on {feedback.outcomeDate}</span>
          </div>
        </div>

        {/* SECTION 1: EMPLOYER DIRECT FEEDBACK */}
        {feedback.employerFeedbackProvided && (
          <div className="p-4 rounded-lg bg-surface border-2 border-black space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-black uppercase font-mono tracking-wider flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-royal-maroon" />
                Verified Employer Feedback:
              </span>
              <Badge variant="maroon" size="sm">Direct Feedback</Badge>
            </div>
            <p className="text-xs text-black italic leading-relaxed font-medium">
              &quot;{feedback.employerFeedbackText}&quot;
            </p>
          </div>
        )}
      </Card>

      {/* Main Grid: Left Diagnostic Analysis (7 cols) & Right Priority Retraining Plan (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: System Analysis Breakdown */}
        <div className="lg:col-span-7 space-y-6">
          {/* System Synthesis Card */}
          <Card variant="editorial" className="p-6 space-y-4 bg-white border-2 border-black">
            <div className="flex items-center justify-between border-b-2 border-black pb-3">
              <h3 className="text-sm font-black uppercase font-mono tracking-wider text-black flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-electric-coral" />
                Learn-2-Hire Algorithmic Synthesis
              </h3>
              <Badge variant="coral" size="sm">Correlated Deficiencies</Badge>
            </div>
            <p className="text-xs text-black/80 leading-relaxed font-medium">
              {feedback.systemAnalysis.summary}
            </p>
          </Card>

          {/* 3 Core Vector Gaps */}
          <div className="space-y-4">
            {/* Vector 1: Technical & SQL Gaps */}
            <Card variant="editorial" className="p-5 space-y-2.5 border-l-8 border-l-royal-maroon bg-white border-2 border-black">
              <h4 className="text-xs font-black uppercase font-mono tracking-wider text-royal-maroon flex items-center gap-2">
                <AlertTriangle className="w-3.5 h-3.5 text-royal-maroon" />
                Primary Technical Competency Gaps
              </h4>
              <ul className="space-y-1.5 text-xs text-black pl-1 font-medium">
                {feedback.systemAnalysis.potentialSkillGaps.map((gap, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-royal-maroon font-bold font-mono">▶</span>
                    <span>{gap}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Vector 2: Interview Performance Factors */}
            <Card variant="editorial" className="p-5 space-y-2.5 border-l-8 border-l-black bg-white border-2 border-black">
              <h4 className="text-xs font-black uppercase font-mono tracking-wider text-black flex items-center gap-2">
                <Mic className="w-3.5 h-3.5 text-black" />
                Interview Defense & Articulation Factors
              </h4>
              <ul className="space-y-1.5 text-xs text-black pl-1 font-medium">
                {feedback.systemAnalysis.interviewPerformanceFactors.map((factor, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-black font-bold font-mono">▶</span>
                    <span>{factor}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Vector 3: Resume Presentation */}
            <Card variant="editorial" className="p-5 space-y-2.5 border-l-8 border-l-electric-coral bg-white border-2 border-black">
              <h4 className="text-xs font-black uppercase font-mono tracking-wider text-black flex items-center gap-2">
                <FileText className="w-3.5 h-3.5 text-black" />
                Resume & Portfolio Proof Deficiencies
              </h4>
              <ul className="space-y-1.5 text-xs text-black pl-1 font-medium">
                {feedback.systemAnalysis.resumeDeficiencies.map((def, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-royal-maroon font-bold font-mono">▶</span>
                    <span>{def}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>

        {/* Right Column: Priority Retraining Roadmap */}
        <div className="lg:col-span-5 sticky top-20 space-y-6">
          <Card variant="editorial" className="p-6 md:p-7 space-y-6 bg-white border-2 border-black">
            <div>
              <div className="flex items-center justify-between mb-2">
                <Badge variant="maroon" size="sm">Actionable Roadmap</Badge>
                <span className="text-xs font-mono text-royal-maroon font-black">{recoveryProgress}% Complete</span>
              </div>
              <h3 className="text-xl font-black text-black tracking-tight">
                Personalized Retraining Plan
              </h3>
              <p className="text-xs text-black/70 mt-1 leading-relaxed font-medium">
                Complete these targeted exercises to eliminate identified deficiencies and lift your verified readiness to 85%+.
              </p>
            </div>

            <ProgressBar value={recoveryProgress} size="sm" variant="maroon" />

            {/* Tasks Checklist */}
            <div className="space-y-3">
              {feedback.retrainingPlan.map((task, idx) => {
                const isChecked = !!completedTasks[idx];
                return (
                  <div
                    key={idx}
                    className={`p-3.5 rounded-lg border-2 transition-all space-y-2 ${
                      isChecked
                        ? "bg-surface border-black/30 text-black/60 opacity-80"
                        : "bg-white border-2 border-black hover:shadow-editorial-xs"
                    }`}
                  >
                    <div className="flex items-start gap-2.5">
                      <button
                        onClick={() => toggleTask(idx)}
                        className={`w-4 h-4 rounded-sm border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors cursor-pointer ${
                          isChecked
                            ? "bg-royal-maroon border-royal-maroon text-white"
                            : "border-black bg-white"
                        }`}
                      >
                        {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                      </button>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span
                            className={`text-[10px] font-mono uppercase font-black ${
                              task.priority === "High" ? "text-royal-maroon" : "text-black"
                            }`}
                          >
                            [{task.priority} Priority] • {task.estimatedDays} Days
                          </span>
                        </div>
                        <p className={`text-xs mt-1 leading-relaxed font-medium ${isChecked ? "line-through text-black/50" : "text-black"}`}>
                          {task.task}
                        </p>
                      </div>
                    </div>

                    <div className="pt-2 border-t-2 border-black/10 flex items-center justify-end">
                      <Link
                        href={task.actionLink}
                        className="text-[11px] text-royal-maroon hover:underline flex items-center gap-1 font-black font-mono"
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
              <div className="p-4 rounded-lg bg-surface border-2 border-black text-black text-xs text-center space-y-2 animate-slide-up">
                <p className="font-black uppercase font-mono text-royal-maroon">✓ Retraining Roadmap Completed!</p>
                <p className="text-[11px] font-medium text-black">Your profile has remediated the identified architecture deficiencies. Ready to re-apply.</p>
                <Link href="/opportunities" className="block pt-1">
                  <Button variant="coral" size="sm" className="w-full font-black shadow-editorial-xs">Explore Matched Jobs</Button>
                </Link>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
