"use client";

import React from "react";
import Link from "next/link";
import {
  Award,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Mic,
  FileText,
  Sparkles,
  Zap,
  MessageSquare,
} from "lucide-react";
import { useCareer } from "@/context/CareerContext";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { getScoreColor } from "@/lib/constants";

export default function InterviewResultsPage() {
  const { interviewSessions } = useCareer();
  const session = interviewSessions[0];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="border-b border-surface-border pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="champagne" size="sm">Phase 10</Badge>
            <span className="text-xs text-pearl-muted font-mono uppercase tracking-wider">
              Speech & Technical Critique
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-pearl-primary tracking-tight">
            Interview Performance Scorecard
          </h1>
          <p className="text-xs sm:text-sm text-pearl-muted mt-1">
            Conducted on {session?.conductedAt || "Today"} • Simulated Technical & Behavioral Architecture Round.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/interview/session">
            <Button variant="outline" size="sm" className="gap-1.5">
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Practice Again</span>
            </Button>
          </Link>
          <Link href="/opportunities">
            <Button size="sm" className="gap-1.5">
              <span>View Matching Jobs</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Overall Score & 5 Dimensions (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 rounded-2xl bg-surface-card border border-champagne/40 shadow-card-navy space-y-6 text-center">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-pearl-muted">
              Overall Practice Score
            </span>

            <div className="relative inline-flex items-center justify-center">
              <div className="w-36 h-36 rounded-full border-4 border-navy-800 flex flex-col items-center justify-center bg-navy-950/80 shadow-inner">
                <span className={`text-4xl font-display font-extrabold font-mono ${getScoreColor(session.overallScore)}`}>
                  {session.overallScore}
                </span>
                <span className="text-[11px] text-pearl-muted uppercase font-mono">/ 100</span>
              </div>
            </div>

            {/* Scorecard Breakdown */}
            <div className="space-y-3 text-left">
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-pearl-muted">Technical Knowledge</span>
                  <span className="font-mono text-pearl-primary font-bold">{session.scores.technicalKnowledge}%</span>
                </div>
                <ProgressBar value={session.scores.technicalKnowledge} size="sm" variant="champagne" />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-pearl-muted">Problem Solving</span>
                  <span className="font-mono text-pearl-primary font-bold">{session.scores.problemSolving}%</span>
                </div>
                <ProgressBar value={session.scores.problemSolving} size="sm" variant="champagne" />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-pearl-muted">Communication Clarity</span>
                  <span className="font-mono text-pearl-primary font-bold">{session.scores.communication}%</span>
                </div>
                <ProgressBar value={session.scores.communication} size="sm" variant="navy" />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-pearl-muted">Answer Structure (STAR)</span>
                  <span className="font-mono text-rose font-bold">{session.scores.answerStructure}%</span>
                </div>
                <ProgressBar value={session.scores.answerStructure} size="sm" variant="rose" />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-pearl-muted">Project Defense</span>
                  <span className="font-mono text-pearl-primary font-bold">{session.scores.projectExplanation}%</span>
                </div>
                <ProgressBar value={session.scores.projectExplanation} size="sm" variant="champagne" />
              </div>
            </div>

            <Link href="/interview/session" className="block w-full">
              <Button size="lg" className="w-full gap-2 text-xs font-semibold">
                <Mic className="w-4 h-4" />
                <span>Re-Take Voice Simulation</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Right Column: Question-by-Question Feedback & What to Improve (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Strengths & Improvement Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl bg-surface-card border border-emerald-500/20 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
                <h3 className="text-xs font-semibold uppercase tracking-wider">
                  What Went Well
                </h3>
              </div>
              <ul className="space-y-2 text-xs text-pearl-muted">
                {session.whatWentWell.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-5 rounded-xl bg-surface-card border border-rose/30 space-y-3">
              <div className="flex items-center gap-2 text-rose">
                <AlertTriangle className="w-4 h-4" />
                <h3 className="text-xs font-semibold uppercase tracking-wider">
                  What To Improve
                </h3>
              </div>
              <ul className="space-y-2 text-xs text-pearl-muted">
                {session.whatToImprove.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-rose font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Question by Question Breakdown */}
          <div className="p-6 rounded-xl bg-surface-card border border-surface-border space-y-5">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-pearl-primary flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-champagne" />
              Detailed Question Critiques
            </h3>

            <div className="space-y-4">
              {session.questionsAsked.map((qa, i) => (
                <div key={i} className="p-4 rounded-xl bg-navy-950/80 border border-white/5 space-y-3 text-xs">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-semibold text-pearl-primary leading-relaxed">
                      Q{i + 1}: "{qa.question}"
                    </h4>
                  </div>

                  <div className="p-3 rounded-lg bg-black/60 border border-white/5 space-y-1">
                    <span className="text-[10px] uppercase font-semibold text-pearl-muted">Your Response:</span>
                    <p className="text-pearl-primary italic leading-relaxed">"{qa.candidateAnswer}"</p>
                  </div>

                  <div className="p-3 rounded-lg bg-navy-900 border border-champagne/20 space-y-1">
                    <span className="text-[10px] uppercase font-semibold text-champagne">Evaluator Critique:</span>
                    <p className="text-pearl-muted leading-relaxed">{qa.critique}</p>
                  </div>

                  <div className="pt-1">
                    <span className="text-[10px] uppercase font-semibold text-pearl-muted">Key Points Assessed:</span>
                    <div className="mt-1 flex flex-wrap gap-1.5">
                      {qa.idealPoints.map((pt, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded bg-black border border-white/5 text-[10px] font-mono text-pearl-muted">
                          {pt}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Practice Actions */}
          <div className="p-5 rounded-xl bg-navy-950 border border-white/5 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-champagne flex items-center gap-2">
              <Zap className="w-3.5 h-3.5" />
              Targeted Practice Next Steps
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {session.recommendedPractice.map((rec, i) => (
                <div key={i} className="p-3 rounded-lg bg-surface-card border border-surface-border text-xs flex items-center justify-between">
                  <span className="text-pearl-muted">{rec}</span>
                  <Link href="/problem-solving" className="text-[11px] text-champagne hover:underline shrink-0 ml-2 font-semibold">
                    Practice →
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
