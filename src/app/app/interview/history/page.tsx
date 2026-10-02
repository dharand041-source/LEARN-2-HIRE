"use client";

import React from "react";
import Link from "next/link";
import { History, CheckCircle2, ArrowRight, Award } from "lucide-react";
import { useCareer } from "@/context/CareerContext";
import { InterviewNav } from "@/components/interview/InterviewNav";
import { ROUTES } from "@/lib/routes";

export default function InterviewHistoryPage() {
  const { interviewSessions } = useCareer();

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <InterviewNav />

      <div className="rounded-2xl bg-royal-maroon text-white border-4 border-black p-6 sm:p-8 shadow-editorial-md flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span className="px-2.5 py-0.5 rounded bg-black text-electric-coral text-xs font-mono font-black border border-black uppercase tracking-wider">
            Evaluation Archive
          </span>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight uppercase leading-snug mt-2">
            Interview Transcripts & Scorecards
          </h1>
          <p className="text-xs sm:text-sm text-white/80 mt-1">
            Review past mock interview critiques, score breakdowns, and evaluator advice.
          </p>
        </div>

        <Link href={ROUTES.app.interview.mock}>
          <button className="px-5 py-2.5 bg-electric-coral hover:bg-black hover:text-white text-black border-2 border-black font-black text-xs uppercase tracking-wider transition-colors flex items-center gap-2 cursor-pointer shadow-editorial-xs">
            <span>Take New Mock Session</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </Link>
      </div>

      <div className="space-y-4">
        {interviewSessions.map((session) => (
          <div
            key={session.id}
            className="p-6 bg-white border-2 border-black shadow-editorial-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-royal-maroon transition-all"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-paper text-black text-[10px] font-mono font-bold uppercase border border-black/20">
                  {session.type}
                </span>
                <span className="text-xs font-mono text-muted">{session.conductedAt}</span>
              </div>
              <h3 className="text-base font-black uppercase text-black">
                Mock Simulation • Score: {session.overallScore}/100
              </h3>
              <p className="text-xs text-muted">
                Duration: {session.durationMinutes} mins • {session.questionsAsked.length} Questions Answered
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <Link href={ROUTES.app.interview.detail(session.id)}>
                <button className="px-4 py-2 bg-royal-maroon hover:bg-electric-coral hover:text-black text-white font-extrabold text-xs uppercase tracking-wider border border-black transition-colors flex items-center gap-1.5 shadow-editorial-xs">
                  <span>View Scorecard</span>
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
