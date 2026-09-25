"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Mic,
  Zap,
  MessageSquare,
} from "lucide-react";
import { useCareer } from "@/context/CareerContext";
import { RECENT_INTERVIEW_RESULT } from "@/data/interviews";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { getScoreColor } from "@/lib/constants";

export default function InterviewResultsPage() {
  const { interviewSessions } = useCareer();
  const session = interviewSessions[0] || RECENT_INTERVIEW_RESULT;

  return (
    <div
      className="space-y-8 animate-fade-in bg-white text-night min-h-screen font-sans"
      style={{ backgroundColor: "#FFFFFF" }}
    >
      {/* Header */}
      <div className="border-b border-surface-border pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="imperial" size="sm">Phase 10</Badge>
            <span className="text-xs text-night-muted font-mono uppercase tracking-wider">
              Speech & Technical Critique
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-night tracking-tight">
            Interview Performance Scorecard
          </h1>
          <p className="text-xs sm:text-sm text-night-muted mt-1">
            Conducted on {session?.conductedAt || "Today"} • Simulated Technical & Behavioral Architecture Round.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/interview/session">
            <Button variant="outline" size="sm" className="gap-1.5 font-semibold">
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Practice Again</span>
            </Button>
          </Link>
          <Link href="/opportunities">
            <Button size="sm" className="gap-1.5 font-semibold shadow-imperial-btn">
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
          <div className="p-6 rounded-2xl bg-white border border-surface-border shadow-sm space-y-6 text-center">
            <span className="text-[11px] font-bold uppercase tracking-wider text-night-muted">
              Overall Practice Score
            </span>

            <div className="relative inline-flex items-center justify-center">
              <div className="w-36 h-36 rounded-full border-4 border-surface-border flex flex-col items-center justify-center bg-surface-subtle shadow-xs">
                <span className={`text-4xl font-display font-extrabold font-mono ${getScoreColor(session.overallScore)}`}>
                  {session.overallScore}
                </span>
                <span className="text-[11px] text-night-muted uppercase font-mono font-bold">/ 100</span>
              </div>
            </div>

            {/* Scorecard Breakdown */}
            <div className="space-y-3.5 text-left">
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-night-muted font-medium">Technical Knowledge</span>
                  <span className="font-mono text-night font-bold">{session.scores.technicalKnowledge}%</span>
                </div>
                <ProgressBar value={session.scores.technicalKnowledge} size="sm" variant="champagne" />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-night-muted font-medium">Problem Solving</span>
                  <span className="font-mono text-night font-bold">{session.scores.problemSolving}%</span>
                </div>
                <ProgressBar value={session.scores.problemSolving} size="sm" variant="champagne" />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-night-muted font-medium">Communication Clarity</span>
                  <span className="font-mono text-night font-bold">{session.scores.communication}%</span>
                </div>
                <ProgressBar value={session.scores.communication} size="sm" variant="navy" />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-night-muted font-medium">Answer Structure (STAR)</span>
                  <span className="font-mono text-imperial font-bold">{session.scores.answerStructure}%</span>
                </div>
                <ProgressBar value={session.scores.answerStructure} size="sm" variant="rose" />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-night-muted font-medium">Project Defense</span>
                  <span className="font-mono text-night font-bold">{session.scores.projectExplanation}%</span>
                </div>
                <ProgressBar value={session.scores.projectExplanation} size="sm" variant="champagne" />
              </div>
            </div>

            <Link href="/interview/session" className="block w-full">
              <Button size="lg" className="w-full gap-2 text-xs font-semibold shadow-imperial-btn">
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
            <div className="p-5 rounded-2xl bg-white border border-emerald-200 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-emerald-700">
                <CheckCircle2 className="w-4 h-4" />
                <h3 className="text-xs font-bold uppercase tracking-wider">
                  What Went Well
                </h3>
              </div>
              <ul className="space-y-2 text-xs text-night-muted">
                {session.whatWentWell.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-emerald-500 font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-imperial-200 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-imperial">
                <AlertTriangle className="w-4 h-4" />
                <h3 className="text-xs font-bold uppercase tracking-wider">
                  What To Improve
                </h3>
              </div>
              <ul className="space-y-2 text-xs text-night-muted">
                {session.whatToImprove.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-imperial font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Question by Question Breakdown */}
          <div className="p-6 rounded-2xl bg-white border border-surface-border shadow-sm space-y-5">
            <h3 className="text-sm font-bold uppercase tracking-wider text-night flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-imperial" />
              Detailed Question Critiques
            </h3>

            <div className="space-y-4">
              {session.questionsAsked.map((qa, i) => (
                <div key={i} className="p-5 rounded-xl bg-surface-subtle border border-surface-border space-y-3 text-xs shadow-xs">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-bold text-night leading-relaxed">
                      Q{i + 1}: &ldquo;{qa.question}&rdquo;
                    </h4>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white border border-surface-border shadow-xs space-y-1">
                    <span className="text-[10px] uppercase font-bold text-night-muted tracking-wider">Your Response:</span>
                    <p className="text-night italic leading-relaxed text-xs">&ldquo;{qa.candidateAnswer}&rdquo;</p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-imperial-50/70 border border-imperial-200 space-y-1">
                    <span className="text-[10px] uppercase font-bold text-imperial tracking-wider">Evaluator Critique:</span>
                    <p className="text-night text-xs leading-relaxed">{qa.critique}</p>
                  </div>

                  <div className="pt-1">
                    <span className="text-[10px] uppercase font-bold text-night-muted tracking-wider">Key Points Assessed:</span>
                    <div className="mt-1.5 flex flex-wrap gap-1.5">
                      {qa.idealPoints.map((pt, idx) => (
                        <span key={idx} className="px-2.5 py-1 rounded-md bg-white border border-surface-border text-[10px] font-mono text-night font-medium shadow-xs">
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
          <div className="p-6 rounded-2xl bg-white border border-surface-border shadow-sm space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-imperial flex items-center gap-2">
              <Zap className="w-3.5 h-3.5" />
              Targeted Practice Next Steps
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {session.recommendedPractice.map((rec, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-surface-subtle border border-surface-border text-xs flex items-center justify-between shadow-xs">
                  <span className="text-night font-medium">{rec}</span>
                  <Link href="/problem-solving" className="text-[11px] text-imperial hover:underline shrink-0 ml-2 font-bold">
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
