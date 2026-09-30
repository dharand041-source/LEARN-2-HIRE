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
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { SectionHeader } from "@/components/ui/SectionHeader";

export default function InterviewResultsPage() {
  const { interviewSessions } = useCareer();
  const session = interviewSessions[0];

  if (!session) {
    return (
      <div className="max-w-3xl w-full mx-auto py-16 px-4 text-center space-y-6 animate-fade-in">
        <Card variant="editorial" className="p-10 space-y-6">
          <div className="w-16 h-16 rounded-lg bg-royal-maroon text-white flex items-center justify-center mx-auto shadow-editorial-sm">
            <Mic className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <Badge variant="maroon" size="sm">Phase 10 // Voice Defense</Badge>
            <h1 className="text-3xl font-extrabold text-foreground tracking-tight">
              NO INTERVIEW SESSIONS FOUND
            </h1>
            <p className="text-sm text-muted-foreground max-w-lg mx-auto leading-relaxed">
              Rehearse technical architecture and behavioral questions in a realistic voice simulation with audio waveforms, pacing analysis, and STAR critique.
            </p>
          </div>
          <div className="pt-2">
            <Link href="/interview">
              <Button variant="coral" size="lg" className="gap-2 font-bold shadow-editorial-sm">
                <span>Start Voice Interview Simulation</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in bg-background text-foreground min-h-screen">
      {/* Header */}
      <div className="border-b-2 border-border pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <SectionHeader
          eyebrow="PHASE 10 // EVALUATION SCORECARD"
          title="Interview Performance Scorecard"
          description={`Conducted on ${session.conductedAt || "Today"} • Comprehensive Technical Defense & STAR Behavioral Critique.`}
          accent="maroon"
        />

        <div className="flex items-center gap-3">
          <Link href="/interview/session">
            <Button variant="secondary" size="sm" className="gap-1.5 font-bold">
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Practice Again</span>
            </Button>
          </Link>
          <Link href="/opportunities">
            <Button variant="coral" size="sm" className="gap-1.5 font-bold shadow-editorial-sm">
              <span>View Matching Jobs</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Overall Score & 5 Dimensions (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <Card variant="editorial" className="p-6 space-y-6 text-center">
            <span className="text-[11px] font-bold uppercase font-mono tracking-wider text-muted-foreground">
              Overall Benchmark Score
            </span>

            <div className="relative inline-flex items-center justify-center">
              <div className="w-36 h-36 rounded-lg border-3 border-foreground flex flex-col items-center justify-center bg-surface shadow-editorial-md">
                <span className="text-5xl font-extrabold font-mono text-royal-maroon">
                  {session.overallScore}
                </span>
                <span className="text-[11px] text-muted-foreground uppercase font-mono font-bold">/ 100</span>
              </div>
            </div>

            {/* Scorecard Breakdown */}
            <div className="space-y-3.5 text-left border-t-2 border-border pt-4">
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-mono font-bold">
                  <span className="text-muted-foreground">Technical Knowledge</span>
                  <span className="text-foreground">{session.scores.technicalKnowledge}%</span>
                </div>
                <ProgressBar value={session.scores.technicalKnowledge} size="sm" variant="maroon" />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs font-mono font-bold">
                  <span className="text-muted-foreground">Problem Solving</span>
                  <span className="text-foreground">{session.scores.problemSolving}%</span>
                </div>
                <ProgressBar value={session.scores.problemSolving} size="sm" variant="coral" />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs font-mono font-bold">
                  <span className="text-muted-foreground">Communication Clarity</span>
                  <span className="text-foreground">{session.scores.communication}%</span>
                </div>
                <ProgressBar value={session.scores.communication} size="sm" variant="maroon" />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs font-mono font-bold">
                  <span className="text-muted-foreground">Answer Structure (STAR)</span>
                  <span className="text-royal-maroon">{session.scores.answerStructure}%</span>
                </div>
                <ProgressBar value={session.scores.answerStructure} size="sm" variant="coral" />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs font-mono font-bold">
                  <span className="text-muted-foreground">Project Defense</span>
                  <span className="text-foreground">{session.scores.projectExplanation}%</span>
                </div>
                <ProgressBar value={session.scores.projectExplanation} size="sm" variant="maroon" />
              </div>
            </div>

            <Link href="/interview/session" className="block w-full pt-2">
              <Button variant="coral" size="lg" className="w-full gap-2 text-xs font-bold shadow-editorial-sm">
                <Mic className="w-4 h-4" />
                <span>Retake Voice Simulation</span>
              </Button>
            </Link>
          </Card>
        </div>

        {/* Right Column: Question-by-Question Feedback & Strengths/Improvements (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Strengths & Improvement Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card variant="editorial" className="p-5 space-y-3 border-l-4 border-l-royal-maroon">
              <div className="flex items-center gap-2 text-royal-maroon">
                <CheckCircle2 className="w-4 h-4" />
                <h3 className="text-xs font-bold uppercase font-mono tracking-wider">
                  Demonstrated Strengths
                </h3>
              </div>
              <ul className="space-y-2 text-xs text-foreground font-medium">
                {session.whatWentWell?.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-royal-maroon font-bold font-mono">✓</span>
                    <span>{item}</span>
                  </li>
                )) || (
                  <li className="text-muted-foreground">Consistent technical rationale.</li>
                )}
              </ul>
            </Card>

            <Card variant="editorial" className="p-5 space-y-3 border-l-4 border-l-electric-coral">
              <div className="flex items-center gap-2 text-electric-coral">
                <AlertTriangle className="w-4 h-4" />
                <h3 className="text-xs font-bold uppercase font-mono tracking-wider">
                  Targeted Improvements
                </h3>
              </div>
              <ul className="space-y-2 text-xs text-foreground font-medium">
                {session.whatToImprove?.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-electric-coral font-bold font-mono">▶</span>
                    <span>{item}</span>
                  </li>
                )) || (
                  <li className="text-muted-foreground">Quantify architectural scale metrics.</li>
                )}
              </ul>
            </Card>
          </div>

          {/* Detailed Question Critiques */}
          {session.questionsAsked && session.questionsAsked.length > 0 && (
            <Card variant="editorial" className="p-6 space-y-4">
              <h3 className="text-sm font-bold uppercase font-mono tracking-wider text-foreground flex items-center gap-2 border-b-2 border-border pb-3">
                <MessageSquare className="w-4 h-4 text-royal-maroon" />
                Question-by-Question Rubric Critiques
              </h3>

              <div className="space-y-3">
                {session.questionsAsked.map((qa, i) => (
                  <div key={i} className="p-4 rounded-lg bg-surface border-2 border-border space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-foreground">
                        Q{i + 1}: &ldquo;{qa.question}&rdquo;
                      </span>
                    </div>
                    {qa.candidateAnswer && (
                      <div className="p-2.5 rounded bg-white border border-border text-xs italic text-muted-foreground">
                        &ldquo;{qa.candidateAnswer}&rdquo;
                      </div>
                    )}
                    <p className="text-xs text-foreground font-medium leading-relaxed">
                      <strong className="text-royal-maroon font-mono uppercase text-[10px] block mb-0.5">Evaluator Feedback:</strong>
                      {qa.critique}
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Next Steps CTA */}
          <Card variant="editorial" className="p-6 space-y-4 border-2 border-border">
            <h4 className="text-xs font-bold uppercase font-mono tracking-wider text-royal-maroon flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Recommended Next Stage
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-lg bg-surface border-2 border-border text-xs flex items-center justify-between font-mono">
                <span className="text-foreground font-bold">Refine Technical Problem Solving</span>
                <Link href="/problem-solving" className="text-xs text-royal-maroon hover:underline font-bold">
                  Practice →
                </Link>
              </div>
              <div className="p-3.5 rounded-lg bg-surface border-2 border-border text-xs flex items-center justify-between font-mono">
                <span className="text-foreground font-bold">Apply to High-Match Jobs</span>
                <Link href="/opportunities" className="text-xs text-royal-maroon hover:underline font-bold">
                  Explore →
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
