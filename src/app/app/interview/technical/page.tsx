"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Code2, ArrowRight, Mic, CheckCircle2 } from "lucide-react";
import { InterviewNav } from "@/components/interview/InterviewNav";
import { ROUTES } from "@/lib/routes";

const TECH_QUESTIONS = [
  {
    id: "tq-1",
    q: "How does the V8 engine optimize asynchronous promises in the microtask queue versus setTimeout in the macrotask queue?",
    topics: ["Node.js", "V8", "Concurrency", "Event Loop"],
  },
  {
    id: "tq-2",
    q: "Explain database ACID properties and how PostgreSQL isolation levels prevent phantom reads and dirty reads.",
    topics: ["PostgreSQL", "Transactions", "Isolation Levels"],
  },
  {
    id: "tq-3",
    q: "Describe an idempotent API architecture for payment processing. How do idempotency keys and distributed locks prevent double charges?",
    topics: ["API Design", "Distributed Systems", "Redis"],
  },
];

export default function InterviewTechnicalPage() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [candidateResponse, setCandidateResponse] = useState("");
  const [submittedFeedback, setSubmittedFeedback] = useState<string | null>(null);

  const currentQ = TECH_QUESTIONS[selectedIdx];

  const handleSubmit = () => {
    setSubmittedFeedback(
      `✓ Technical Defense Evaluated (Score: 88/100)\n• Strong mention of event loop phases and queue prioritization.\n• Recommendation: Mention the behavior of Promise.allSettled versus Promise.all when discussing network error tolerance.`
    );
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <InterviewNav />

      <div className="rounded-2xl bg-royal-maroon text-white border-4 border-black p-6 sm:p-8 shadow-editorial-md flex items-center justify-between">
        <div>
          <span className="px-2.5 py-0.5 rounded bg-black text-electric-coral text-xs font-mono font-black border border-black uppercase tracking-wider">
            Technical Defense
          </span>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight uppercase leading-snug mt-2">
            Technical Architecture & Deep-Dive
          </h1>
          <p className="text-xs sm:text-sm text-white/80 mt-1">
            System design, concurrency, database indexing, and scalability tradeoff defenses.
          </p>
        </div>
      </div>

      <div className="p-6 bg-white border-2 border-black shadow-editorial-sm space-y-6">
        <div className="flex items-center justify-between border-b border-black/10 pb-3">
          <span className="text-xs font-black uppercase text-black">
            Question 0{selectedIdx + 1} of {TECH_QUESTIONS.length}
          </span>
          <div className="flex gap-1.5">
            {currentQ.topics.map((t) => (
              <span key={t} className="px-2 py-0.5 bg-paper text-black text-[10px] font-mono font-bold uppercase border border-black/20">
                {t}
              </span>
            ))}
          </div>
        </div>

        <h2 className="text-lg font-black uppercase text-black leading-relaxed">
          {currentQ.q}
        </h2>

        <div className="space-y-2">
          <label className="text-xs font-black uppercase text-black block">
            Your Spoken or Written Technical Defense:
          </label>
          <textarea
            rows={6}
            value={candidateResponse}
            onChange={(e) => setCandidateResponse(e.target.value)}
            className="w-full p-4 bg-paper border-2 border-black text-xs font-medium focus:outline-none leading-relaxed"
            placeholder="Structure your answer: 1. Core definition, 2. Internal mechanics, 3. Production tradeoffs..."
          />
        </div>

        <div className="flex items-center justify-between pt-2">
          <button
            onClick={() => setSelectedIdx((prev) => Math.max(0, prev - 1))}
            disabled={selectedIdx === 0}
            className="px-4 py-2 bg-white border border-black text-xs font-bold uppercase disabled:opacity-30 disabled:cursor-not-allowed hover:bg-stone-100"
          >
            Previous
          </button>

          <button
            onClick={handleSubmit}
            className="px-6 py-2.5 bg-royal-maroon hover:bg-electric-coral hover:text-black text-white border-2 border-black font-extrabold text-xs uppercase tracking-wider transition-colors shadow-editorial-xs cursor-pointer"
          >
            Submit for AI Feedback
          </button>

          <button
            onClick={() => {
              setSelectedIdx((prev) => Math.min(TECH_QUESTIONS.length - 1, prev + 1));
              setCandidateResponse("");
              setSubmittedFeedback(null);
            }}
            disabled={selectedIdx === TECH_QUESTIONS.length - 1}
            className="px-4 py-2 bg-white border border-black text-xs font-bold uppercase disabled:opacity-30 disabled:cursor-not-allowed hover:bg-stone-100"
          >
            Next
          </button>
        </div>

        {submittedFeedback && (
          <pre className="p-4 bg-emerald-950 text-emerald-300 font-mono text-xs border-2 border-emerald-500 whitespace-pre-line">
            {submittedFeedback}
          </pre>
        )}
      </div>
    </div>
  );
}
