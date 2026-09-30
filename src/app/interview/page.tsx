"use client";

import React from "react";
import Link from "next/link";
import {
  Mic,
  Clock,
  ArrowRight,
  PlayCircle,
  Radio,
  CheckCircle2,
  Volume2,
} from "lucide-react";
import { useCareer } from "@/context/CareerContext";
import { INTERVIEW_TYPES } from "@/data/interviews";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { SectionHeader } from "@/components/ui/SectionHeader";

export default function InterviewHubPage() {
  const { interviewSessions } = useCareer();
  const latestSession = interviewSessions[0];

  return (
    <div className="space-y-8 animate-fade-in bg-background text-foreground min-h-screen">
      {/* Editorial Header */}
      <div className="border-b-2 border-border pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <SectionHeader
          eyebrow="PHASE 09 // VOICE DEFENSE"
          title="Interview Simulation & Voice Defense"
          description="Practice real-time technical architecture defenses, algorithmic tradeoffs, and STAR behavioral questions with browser speech-to-text and instant AI rubric critique."
          accent="violet"
        />

        <div className="flex items-center gap-3">
          <Link href="/interview/session">
            <Button variant="violet" size="md" className="gap-2 font-bold shadow-editorial-sm">
              <Radio className="w-4 h-4 text-white animate-pulse" />
              <span>Launch Voice Interview</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Latest Scorecard Hero Banner */}
      {latestSession && (
        <Card variant="editorial" className="p-6 md:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-border pb-5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-editorial-violet text-white flex items-center justify-center font-bold shadow-editorial-sm">
                <Mic className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-muted-foreground font-bold">
                  LATEST BENCHMARK SCORECARD // {latestSession.conductedAt}
                </span>
                <h2 className="text-xl font-bold tracking-tight text-foreground">{latestSession.type}</h2>
              </div>
            </div>

            <div className="flex items-center gap-5">
              <div className="text-right">
                <div className="flex items-baseline justify-end gap-1">
                  <span className="text-4xl font-extrabold font-mono text-editorial-violet">
                    {latestSession.overallScore}
                  </span>
                  <span className="text-xs text-muted-foreground font-mono font-bold">/ 100</span>
                </div>
                <Badge variant="violet" size="sm" className="mt-1">
                  Ready for Defense
                </Badge>
              </div>

              <Link href="/interview/results">
                <Button variant="secondary" size="sm" className="gap-1.5 text-xs font-bold">
                  <span>Full Critique</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </Link>
            </div>
          </div>

          {/* 5-Metric Breakdown Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            <div className="p-3.5 rounded-lg bg-surface border-2 border-border space-y-2">
              <span className="text-[10px] uppercase font-mono font-bold text-muted-foreground">Technical Depth</span>
              <p className="text-base font-extrabold text-foreground font-mono">{latestSession.scores.technicalKnowledge}%</p>
              <ProgressBar value={latestSession.scores.technicalKnowledge} size="sm" variant="violet" />
            </div>

            <div className="p-3.5 rounded-lg bg-surface border-2 border-border space-y-2">
              <span className="text-[10px] uppercase font-mono font-bold text-muted-foreground">Problem Solving</span>
              <p className="text-base font-extrabold text-foreground font-mono">{latestSession.scores.problemSolving}%</p>
              <ProgressBar value={latestSession.scores.problemSolving} size="sm" variant="navy" />
            </div>

            <div className="p-3.5 rounded-lg bg-surface border-2 border-border space-y-2">
              <span className="text-[10px] uppercase font-mono font-bold text-muted-foreground">Communication</span>
              <p className="text-base font-extrabold text-foreground font-mono">{latestSession.scores.communication}%</p>
              <ProgressBar value={latestSession.scores.communication} size="sm" variant="gold" />
            </div>

            <div className="p-3.5 rounded-lg bg-surface border-2 border-border space-y-2">
              <span className="text-[10px] uppercase font-mono font-bold text-muted-foreground">Answer Structure</span>
              <p className="text-base font-extrabold text-editorial-violet font-mono">{latestSession.scores.answerStructure}%</p>
              <ProgressBar value={latestSession.scores.answerStructure} size="sm" variant="violet" />
            </div>

            <div className="p-3.5 rounded-lg bg-surface border-2 border-border space-y-2">
              <span className="text-[10px] uppercase font-mono font-bold text-muted-foreground">Project Defense</span>
              <p className="text-base font-extrabold text-foreground font-mono">{latestSession.scores.projectExplanation}%</p>
              <ProgressBar value={latestSession.scores.projectExplanation} size="sm" variant="red" />
            </div>
          </div>
        </Card>
      )}

      {/* 4 Interview Simulation Modes */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-border pb-2">
          <h2 className="text-xs font-bold uppercase tracking-wider text-foreground">
            SELECT SIMULATION TRACK
          </h2>
          <span className="text-xs text-muted-foreground font-mono font-medium">4 Rigorous Evaluator Formats</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {INTERVIEW_TYPES.map((intType) => (
            <Card
              key={intType.id}
              variant="editorial"
              className="p-6 flex flex-col justify-between hover:border-editorial-violet transition-colors group space-y-5"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Badge variant="violet" size="sm">{intType.type}</Badge>
                  <span className="text-xs text-muted-foreground font-mono flex items-center gap-1 font-bold">
                    <Clock className="w-3.5 h-3.5 text-editorial-violet" /> {intType.duration}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-foreground leading-snug group-hover:text-editorial-violet transition-colors">
                    {intType.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                    {intType.description}
                  </p>
                </div>

                {/* Interviewer Persona Block */}
                <div className="p-3 rounded-lg bg-surface border-2 border-border flex items-center gap-3">
                  <div className="w-9 h-9 rounded-md bg-foreground text-background flex items-center justify-center text-xs font-bold font-mono">
                    {intType.interviewerName.charAt(0)}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-foreground">{intType.interviewerName}</p>
                    <p className="text-[11px] text-muted-foreground font-mono">{intType.interviewerRole}</p>
                  </div>
                </div>

                {/* Evaluated Skills */}
                <div className="space-y-1.5">
                  <p className="text-[10px] uppercase font-mono font-bold text-muted-foreground tracking-wider">Evaluation Rubric:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {intType.skillsEvaluated.map((skill, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-sm bg-surface border border-border text-[10px] font-mono text-foreground font-semibold"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Launch CTA */}
              <div className="pt-4 border-t-2 border-border">
                <Link href="/interview/session" className="block">
                  <Button variant="violet" size="sm" className="w-full gap-2 text-xs font-bold">
                    <PlayCircle className="w-4 h-4" />
                    <span>Launch {intType.title.split(" ")[0]} Simulation</span>
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
