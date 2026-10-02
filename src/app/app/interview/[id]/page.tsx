"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Mic, ArrowRight, ArrowLeft, CheckCircle2, AlertTriangle, Sparkles, Award } from "lucide-react";
import { useCareer } from "@/context/CareerContext";
import { InterviewNav } from "@/components/interview/InterviewNav";
import { ROUTES } from "@/lib/routes";

export default function InterviewSessionDetailPage() {
  const params = useParams();
  const sessionId = (params?.id as string) || "mock-1";
  const { interviewSessions, selectedRole } = useCareer();

  const session = interviewSessions.find((s) => s.id === sessionId) || {
    id: sessionId,
    roleId: selectedRole?.id || "full-stack-developer",
    type: "Technical & Voice Mock Interview",
    conductedAt: "Recent",
    durationMinutes: 20,
    overallScore: 88,
    scores: {
      technicalKnowledge: 90,
      problemSolving: 88,
      communication: 86,
      answerStructure: 89,
      projectExplanation: 91,
    },
    whatWentWell: [
      "Demonstrated crisp architectural intuition around asynchronous queues and event loops.",
      "Identified concrete concurrency edge cases without hesitation.",
      "Structured tradeoff analysis between safety and throughput.",
    ],
    whatToImprove: [
      "State explicit latency budgets when defending architectural decisions.",
      "Use STAR framework consistently for past incident stories.",
    ],
    recommendedPractice: [
      "Practice concurrency problem solving in Problem Hub.",
      "Generate updated ATS-ready resume showcasing verified skills.",
    ],
    questionsAsked: [
      {
        question: "Walk me through how the JavaScript V8 engine handles asynchronous promises versus setTimeout with 0 milliseconds.",
        candidateAnswer: "In an event loop architecture, synchronous code occupies the call stack first. Once cleared, the microtask queue holding resolved Promises executes completely before macrotasks from timers are dequeued.",
        critique: "Clear technical rationale delivered with systematic breakdown of operational edge cases.",
      },
    ],
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <InterviewNav />

      <div className="flex items-center gap-2">
        <Link href={ROUTES.app.interview.history} className="text-xs font-bold text-muted hover:text-black flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Interview History</span>
        </Link>
      </div>

      <div className="rounded-2xl bg-royal-maroon text-white border-4 border-black p-6 sm:p-8 shadow-editorial-md flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span className="px-2.5 py-0.5 rounded bg-black text-electric-coral text-xs font-mono font-black border border-black uppercase tracking-wider">
            Verified Scorecard
          </span>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight uppercase leading-snug mt-2">
            Interview Defense Evaluation: {session.overallScore}/100
          </h1>
          <p className="text-xs sm:text-sm text-white/80 mt-1">
            Conducted: {session.conductedAt} • Role: {selectedRole?.title}
          </p>
        </div>

        <Link href={ROUTES.app.resume.builder}>
          <button className="px-5 py-2.5 bg-electric-coral hover:bg-black hover:text-white text-black border-2 border-black font-black text-xs uppercase tracking-wider transition-colors flex items-center gap-2 cursor-pointer shadow-editorial-xs">
            <span>Proceed to Resume Builder</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </Link>
      </div>

      {/* Score Breakdown Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        {Object.entries(session.scores).map(([category, score]) => (
          <div key={category} className="p-4 bg-white border-2 border-black shadow-editorial-sm space-y-1">
            <span className="text-[10px] font-mono uppercase text-muted font-bold block truncate">
              {category}
            </span>
            <span className="text-2xl font-black text-black">{score}%</span>
          </div>
        ))}
      </div>

      {/* Strengths & Improvements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-white border-2 border-black shadow-editorial-sm space-y-3">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <h3 className="text-xs font-black uppercase text-black">Evaluator Commendations</h3>
          </div>
          <ul className="space-y-1.5 text-xs text-black">
            {session.whatWentWell.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-emerald-700 font-bold">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-6 bg-white border-2 border-black shadow-editorial-sm space-y-3">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-royal-maroon" />
            <h3 className="text-xs font-black uppercase text-black">Targeted Growth Areas</h3>
          </div>
          <ul className="space-y-1.5 text-xs text-black">
            {session.whatToImprove.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-royal-maroon font-bold">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
