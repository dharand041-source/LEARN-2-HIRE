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

export default function InterviewHubPage() {
  const { interviewSessions } = useCareer();
  const latestSession = interviewSessions[0];

  return (
    <div className="space-y-8 animate-fade-in bg-white text-black min-h-screen">
      {/* Royal Maroon Hero Section */}
      <div className="rounded-2xl bg-royal-maroon text-white border-4 border-black p-8 sm:p-10 shadow-editorial-md space-y-6">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-black text-electric-yellow border-2 border-black text-xs font-mono font-black uppercase tracking-widest">
              <span>Phase 09 // Voice Defense</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black uppercase tracking-tight text-white leading-tight">
              Interview Simulation & Voice Defense
            </h1>
            <p className="text-white/95 text-sm sm:text-base leading-relaxed font-medium">
              Practice real-time technical architecture defenses, algorithmic tradeoffs, and STAR behavioral questions with browser speech-to-text and instant AI rubric critique.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link href="/interview/session">
              <button className="px-6 py-3.5 rounded-lg bg-electric-yellow hover:bg-white text-black border-2 border-black font-black text-xs sm:text-sm transition-colors flex items-center gap-2 cursor-pointer shadow-editorial-sm">
                <Radio className="w-4 h-4 text-black animate-pulse stroke-[2.5]" />
                <span>Launch Voice Interview</span>
              </button>
            </Link>
          </div>
        </div>

        {/* Live Audio & Readiness Telemetry Bar (High Contrast Black Surfaces) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t-2 border-white/20">
          <div className="p-4 rounded-xl bg-black border-2 border-black text-white flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-electric-yellow text-black flex items-center justify-center font-bold shrink-0">
              <Mic className="w-5 h-5 text-black stroke-[2.5]" />
            </div>
            <div>
              <p className="text-[10px] text-white/70 uppercase font-mono font-bold tracking-wider">Voice Analyzer</p>
              <p className="text-sm font-black text-electric-yellow font-mono">STAR + Architecture Mode</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-black border-2 border-black text-white flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-white text-black flex items-center justify-center font-bold shrink-0">
              <Volume2 className="w-5 h-5 text-black stroke-[2.5]" />
            </div>
            <div>
              <p className="text-[10px] text-white/70 uppercase font-mono font-bold tracking-wider">Pacing & Audio</p>
              <p className="text-sm font-black text-white font-mono">130-150 WPM Calibrated</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-black border-2 border-black text-white flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-electric-yellow text-black flex items-center justify-center font-bold shrink-0">
              <CheckCircle2 className="w-5 h-5 text-black stroke-[2.5]" />
            </div>
            <div>
              <p className="text-[10px] text-white/70 uppercase font-mono font-bold tracking-wider">Candidate Defense</p>
              <p className="text-sm font-black text-electric-yellow font-mono">Verified Scorecards</p>
            </div>
          </div>
        </div>
      </div>

      {/* Latest Scorecard Hero Banner */}
      {latestSession && (
        <Card variant="editorial" className="p-6 md:p-8 space-y-6 bg-white border-2 border-black">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-black pb-5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-royal-maroon text-white flex items-center justify-center font-bold shadow-editorial-sm border-2 border-black">
                <Mic className="w-6 h-6 stroke-[2.5]" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-black/70 font-black">
                  LATEST BENCHMARK SCORECARD // {latestSession.conductedAt}
                </span>
                <h2 className="text-xl font-black tracking-tight text-black">{latestSession.type}</h2>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between sm:justify-end gap-3 sm:gap-5">
              <div className="text-left sm:text-right">
                <div className="flex items-baseline sm:justify-end gap-1">
                  <span className="text-3xl sm:text-4xl font-black font-mono text-royal-maroon">
                    {latestSession.overallScore}
                  </span>
                  <span className="text-xs text-black/70 font-mono font-bold">/ 100</span>
                </div>
                <Badge variant="maroon" size="sm" className="mt-1">
                  Ready for Defense
                </Badge>
              </div>

              <Link href="/interview/results">
                <Button variant="secondary" size="sm" className="gap-1.5 text-xs font-black">
                  <span>Full Critique</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </Link>
            </div>
          </div>

          {/* 5-Metric Breakdown Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3">
            <div className="p-3.5 rounded-lg bg-surface border-2 border-black space-y-2">
              <span className="text-[10px] uppercase font-mono font-bold text-black/70">Technical Depth</span>
              <p className="text-base font-black text-black font-mono">{latestSession.scores.technicalKnowledge}%</p>
              <ProgressBar value={latestSession.scores.technicalKnowledge} size="sm" variant="maroon" />
            </div>

            <div className="p-3.5 rounded-lg bg-surface border-2 border-black space-y-2">
              <span className="text-[10px] uppercase font-mono font-bold text-black/70">Problem Solving</span>
              <p className="text-base font-black text-black font-mono">{latestSession.scores.problemSolving}%</p>
              <ProgressBar value={latestSession.scores.problemSolving} size="sm" variant="fire-red" />
            </div>

            <div className="p-3.5 rounded-lg bg-surface border-2 border-black space-y-2">
              <span className="text-[10px] uppercase font-mono font-bold text-black/70">Communication</span>
              <p className="text-base font-black text-black font-mono">{latestSession.scores.communication}%</p>
              <ProgressBar value={latestSession.scores.communication} size="sm" variant="yellow" />
            </div>

            <div className="p-3.5 rounded-lg bg-surface border-2 border-black space-y-2">
              <span className="text-[10px] uppercase font-mono font-bold text-black/70">Answer Structure</span>
              <p className="text-base font-black text-royal-maroon font-mono">{latestSession.scores.answerStructure}%</p>
              <ProgressBar value={latestSession.scores.answerStructure} size="sm" variant="maroon" />
            </div>

            <div className="p-3.5 rounded-lg bg-surface border-2 border-black space-y-2">
              <span className="text-[10px] uppercase font-mono font-bold text-black/70">Project Defense</span>
              <p className="text-base font-black text-black font-mono">{latestSession.scores.projectExplanation}%</p>
              <ProgressBar value={latestSession.scores.projectExplanation} size="sm" variant="fire-red" />
            </div>
          </div>
        </Card>
      )}

      {/* 4 Interview Simulation Modes */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b-2 border-black pb-2">
          <h2 className="text-xs font-black uppercase tracking-wider text-black">
            SELECT SIMULATION TRACK
          </h2>
          <span className="text-xs text-black/70 font-mono font-bold">4 Rigorous Evaluator Formats</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {INTERVIEW_TYPES.map((intType) => (
            <Card
              key={intType.id}
              variant="editorial"
              className="p-6 flex flex-col justify-between hover:border-black transition-colors group space-y-5 bg-white border-2 border-black"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Badge variant="maroon" size="sm">{intType.type}</Badge>
                  <span className="text-xs text-black/70 font-mono flex items-center gap-1 font-bold">
                    <Clock className="w-3.5 h-3.5 text-royal-maroon" /> {intType.duration}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-black text-black leading-snug group-hover:text-royal-maroon transition-colors">
                    {intType.title}
                  </h3>
                  <p className="text-xs text-black/70 mt-1.5 leading-relaxed font-medium">
                    {intType.description}
                  </p>
                </div>

                {/* Interviewer Persona Block */}
                <div className="p-3 rounded-lg bg-surface border-2 border-black flex items-center gap-3">
                  <div className="w-9 h-9 rounded-md bg-black text-white flex items-center justify-center text-xs font-black font-mono">
                    {intType.interviewerName.charAt(0)}
                  </div>
                  <div>
                    <p className="text-xs font-black text-black">{intType.interviewerName}</p>
                    <p className="text-[11px] text-black/60 font-mono font-medium">{intType.interviewerRole}</p>
                  </div>
                </div>

                {/* Evaluated Skills */}
                <div className="space-y-1.5">
                  <p className="text-[10px] uppercase font-mono font-bold text-black/70 tracking-wider">Evaluation Rubric:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {intType.skillsEvaluated.map((skill, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-sm bg-white border border-black text-[10px] font-mono text-black font-bold"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Launch CTA */}
              <div className="pt-4 border-t-2 border-black">
                <Link href="/interview/session" className="block">
                  <Button variant="maroon" size="sm" className="w-full gap-2 text-xs font-black shadow-editorial-xs">
                    <PlayCircle className="w-4 h-4 stroke-[2.5]" />
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
