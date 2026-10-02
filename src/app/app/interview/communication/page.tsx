"use client";

import React from "react";
import { Volume2, CheckCircle2, Mic, ArrowRight } from "lucide-react";
import { InterviewNav } from "@/components/interview/InterviewNav";

const METRICS = [
  { label: "Speech Pacing", score: "142 WPM", status: "Optimal (130-155 WPM calibrated)" },
  { label: "Filler Words Detected", score: "1.2%", status: "Excellent (< 3% target)" },
  { label: "Technical Precision", score: "94/100", status: "Accurate terminology used" },
  { label: "Brevity & Conciseness", score: "89/100", status: "Direct answers without rambling" },
];

export default function InterviewCommunicationPage() {
  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <InterviewNav />

      <div className="rounded-2xl bg-royal-maroon text-white border-4 border-black p-6 sm:p-8 shadow-editorial-md flex items-center justify-between">
        <div>
          <span className="px-2.5 py-0.5 rounded bg-black text-electric-coral text-xs font-mono font-black border border-black uppercase tracking-wider">
            Speech & Tone
          </span>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight uppercase leading-snug mt-2">
            Communication & Articulation Telemetry
          </h1>
          <p className="text-xs sm:text-sm text-white/80 mt-1">
            Browser speech-to-text analysis measuring pacing, filler word frequency, and technical delivery clarity.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {METRICS.map((m) => (
          <div key={m.label} className="p-6 bg-white border-2 border-black shadow-editorial-sm space-y-2">
            <span className="text-[10px] font-mono text-muted uppercase font-bold block">{m.label}</span>
            <div className="text-3xl font-black text-black">{m.score}</div>
            <p className="text-xs font-bold text-emerald-700">{m.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
