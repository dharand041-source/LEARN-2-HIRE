"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Mic,
  Clock,
  ArrowRight,
  Radio,
  CheckCircle2,
  Volume2,
  Sparkles,
} from "lucide-react";
import { useCareer } from "@/context/CareerContext";
import { INTERVIEW_TYPES } from "@/data/interviews";
import { InterviewNav } from "@/components/interview/InterviewNav";
import { ROUTES } from "@/lib/routes";

export default function InterviewHubPage() {
  const { interviewSessions, selectedRole } = useCareer();
  const [selectedDifficulty, setSelectedDifficulty] = useState<"Beginner" | "Intermediate" | "Advanced" | "Expert">("Intermediate");

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <InterviewNav />

      {/* Top Banner */}
      <div className="rounded-2xl bg-royal-maroon text-white border-4 border-black p-6 sm:p-8 shadow-editorial-md flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded bg-black text-electric-coral text-xs font-mono font-black border border-black uppercase tracking-wider">
              Phase 09 Defense
            </span>
            <span className="text-xs text-white/90 font-mono uppercase tracking-wider font-extrabold">
              AI Voice & Technical Simulation
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight uppercase leading-snug">
            Interview Preparation & Voice Defense
          </h1>
          <p className="text-xs sm:text-sm text-white/80 mt-1 font-medium">
            Defend architecture tradeoffs, answer STAR behavioral questions, and practice speech articulation for {selectedRole?.title || "Full-Stack Developer"}.
          </p>
        </div>

        <Link href={ROUTES.app.interview.mock}>
          <button className="px-6 py-3 bg-electric-coral hover:bg-black hover:text-white text-black border-2 border-black font-black text-xs uppercase tracking-wider transition-colors flex items-center gap-2 cursor-pointer shadow-editorial-xs">
            <Radio className="w-4 h-4 animate-pulse" />
            <span>Launch Mock Simulation</span>
          </button>
        </Link>
      </div>

      {/* Difficulty Level Selector */}
      <div className="p-4 bg-white border-2 border-black shadow-editorial-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-black uppercase text-black">Select Difficulty Level:</span>
          <div className="flex items-center gap-1.5 ml-2">
            {(["Beginner", "Intermediate", "Advanced", "Expert"] as const).map((diff) => (
              <button
                key={diff}
                onClick={() => setSelectedDifficulty(diff)}
                className={`px-3 py-1 text-xs font-bold uppercase transition-colors cursor-pointer border ${
                  selectedDifficulty === diff
                    ? "bg-royal-maroon text-white border-black"
                    : "bg-surface-subtle text-muted hover:text-black border-black/20"
                }`}
              >
                {diff}
              </button>
            ))}
          </div>
        </div>

        <span className="text-xs font-mono font-bold text-muted">
          Mode: {selectedDifficulty === "Beginner" ? "Fundamentals" : selectedDifficulty === "Intermediate" ? "Application" : selectedDifficulty === "Advanced" ? "Complex Problems" : "Architecture & Tradeoffs"}
        </span>
      </div>

      {/* Interview Tracks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {INTERVIEW_TYPES.map((track) => (
          <div
            key={track.id}
            className="p-6 bg-white border-2 border-black shadow-editorial-sm flex flex-col justify-between space-y-4 hover:border-royal-maroon transition-all"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 bg-paper text-black text-[10px] font-mono font-bold uppercase border border-black/20">
                  {track.type}
                </span>
                <span className="text-xs font-mono font-bold text-muted">
                  {track.duration}
                </span>
              </div>

              <h3 className="text-lg font-black uppercase tracking-tight text-black">
                {track.title}
              </h3>
              <p className="text-xs text-muted leading-relaxed">
                {track.description}
              </p>

              <div className="pt-2 text-xs text-black font-semibold">
                <span>Interviewer: </span>
                <span className="text-royal-maroon font-bold">{track.interviewerName}</span>
                <span className="text-muted"> ({track.interviewerRole})</span>
              </div>
            </div>

            <div className="pt-4 border-t border-black/10 flex items-center justify-between">
              <span className="text-[10px] font-mono text-muted uppercase font-bold">
                Level: {selectedDifficulty}
              </span>
              <Link href={ROUTES.app.interview.mock}>
                <button className="px-4 py-2 bg-royal-maroon hover:bg-electric-coral hover:text-black text-white font-extrabold text-xs uppercase tracking-wider border border-black transition-colors flex items-center gap-1.5 shadow-editorial-xs">
                  <span>Start Track</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
