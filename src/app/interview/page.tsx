"use client";

import React from "react";
import Link from "next/link";
import {
  Mic,
  Clock,
  ArrowRight,
  PlayCircle,
  Radio,
} from "lucide-react";
import { useCareer } from "@/context/CareerContext";
import { INTERVIEW_TYPES } from "@/data/interviews";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";

export default function InterviewHubPage() {
  const { interviewSessions } = useCareer();
  const latestSession = interviewSessions[0];

  return (
    <div
      className="space-y-8 animate-fade-in bg-white text-night min-h-screen font-sans"
      style={{ backgroundColor: "#FFFFFF" }}
    >
      {/* Header */}
      <div className="border-b border-surface-border pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="imperial" size="sm">Phase 09</Badge>
            <span className="text-xs text-night-muted font-mono uppercase tracking-wider">
              Technical Defense & STAR Voice Simulation
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-night tracking-tight">
            Interview Preparation & Voice Simulation
          </h1>
          <p className="text-xs sm:text-sm text-night-muted mt-1 max-w-2xl leading-relaxed">
            Practice real-time technical architecture defenses, algorithmic tradeoffs, and behavioral STAR questions with real browser speech-to-text transcription and question audio replay.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/interview/session">
            <Button size="md" className="gap-2 font-semibold shadow-imperial-btn">
              <Radio className="w-4 h-4 text-white animate-pulse" />
              <span>Launch Voice Interview</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Latest Scorecard Banner */}
      {latestSession && (
        <div className="p-6 rounded-2xl bg-white border border-surface-border shadow-sm space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-surface-border pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-imperial-50 border border-imperial-200 flex items-center justify-center text-imperial">
                <Mic className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-mono tracking-wider text-night-muted">
                  Latest Interview Scorecard ({latestSession.conductedAt})
                </span>
                <h2 className="text-base font-bold text-night">{latestSession.type}</h2>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <span className="text-3xl font-bold font-mono text-imperial">{latestSession.overallScore}</span>
                <span className="text-xs text-night-muted font-mono"> / 100</span>
                <p className="text-[10px] text-emerald-600 font-bold">Interview Ready</p>
              </div>

              <Link href="/interview/results">
                <Button variant="secondary" size="sm" className="gap-1 text-xs font-semibold">
                  <span>Full Critique</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </Link>
            </div>
          </div>

          {/* 5-Metric Breakdown */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-surface-subtle border border-surface-border space-y-1.5 shadow-xs">
              <span className="text-[11px] text-night-muted font-medium">Technical Depth:</span>
              <p className="text-sm font-bold text-night font-mono">{latestSession.scores.technicalKnowledge}%</p>
              <ProgressBar value={latestSession.scores.technicalKnowledge} size="sm" variant="champagne" />
            </div>

            <div className="p-3.5 rounded-xl bg-surface-subtle border border-surface-border space-y-1.5 shadow-xs">
              <span className="text-[11px] text-night-muted font-medium">Problem Solving:</span>
              <p className="text-sm font-bold text-night font-mono">{latestSession.scores.problemSolving}%</p>
              <ProgressBar value={latestSession.scores.problemSolving} size="sm" variant="champagne" />
            </div>

            <div className="p-3.5 rounded-xl bg-surface-subtle border border-surface-border space-y-1.5 shadow-xs">
              <span className="text-[11px] text-night-muted font-medium">Communication:</span>
              <p className="text-sm font-bold text-night font-mono">{latestSession.scores.communication}%</p>
              <ProgressBar value={latestSession.scores.communication} size="sm" variant="navy" />
            </div>

            <div className="p-3.5 rounded-xl bg-surface-subtle border border-surface-border space-y-1.5 shadow-xs">
              <span className="text-[11px] text-night-muted font-medium">Answer Structure:</span>
              <p className="text-sm font-bold text-imperial font-mono">{latestSession.scores.answerStructure}%</p>
              <ProgressBar value={latestSession.scores.answerStructure} size="sm" variant="rose" />
            </div>

            <div className="p-3.5 rounded-xl bg-surface-subtle border border-surface-border space-y-1.5 shadow-xs">
              <span className="text-[11px] text-night-muted font-medium">Project Defense:</span>
              <p className="text-sm font-bold text-night font-mono">{latestSession.scores.projectExplanation}%</p>
              <ProgressBar value={latestSession.scores.projectExplanation} size="sm" variant="champagne" />
            </div>
          </div>
        </div>
      )}

      {/* 4 Interview Simulation Modes */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold uppercase tracking-wider text-night">
            Choose Interview Simulation Format
          </h2>
          <span className="text-xs text-night-muted font-medium">4 Professional Evaluator Modes</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {INTERVIEW_TYPES.map((intType) => (
            <div
              key={intType.id}
              className="p-6 rounded-2xl bg-white border border-surface-border hover:border-imperial/40 transition-all duration-200 flex flex-col justify-between hover:shadow-card-hover space-y-5 shadow-card-subtle"
            >
              <div className="space-y-3.5">
                <div className="flex items-center justify-between">
                  <Badge variant="imperial" size="sm">{intType.type}</Badge>
                  <span className="text-xs text-night-muted font-mono flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-imperial" /> {intType.duration}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-night leading-snug">
                    {intType.title}
                  </h3>
                  <p className="text-xs text-night-muted mt-1.5 leading-relaxed">
                    {intType.description}
                  </p>
                </div>

                {/* Interviewer Persona */}
                <div className="p-3 rounded-xl bg-surface-subtle border border-surface-border flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white border border-surface-border flex items-center justify-center text-xs font-bold text-night shadow-xs">
                    {intType.interviewerName.charAt(0)}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-night">{intType.interviewerName}</p>
                    <p className="text-[11px] text-night-muted">{intType.interviewerRole}</p>
                  </div>
                </div>

                {/* Evaluated Skills */}
                <div className="space-y-1.5">
                  <p className="text-[10px] uppercase font-bold text-night-muted tracking-wider">Evaluation Vector:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {intType.skillsEvaluated.map((skill, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-0.5 rounded-md bg-surface-subtle border border-surface-border text-[10px] font-mono text-night font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Launch CTA */}
              <div className="pt-3 border-t border-surface-border">
                <Link href="/interview/session">
                  <Button variant="primary" size="sm" className="w-full gap-2 text-xs font-semibold">
                    <PlayCircle className="w-4 h-4" />
                    <span>Start {intType.title.split(" ")[0]} Interview</span>
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
