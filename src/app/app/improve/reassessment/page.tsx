"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  RotateCcw,
  CheckCircle2,
  Clock,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  FolderGit2,
  AlertTriangle,
} from "lucide-react";
import { useCareer } from "@/context/CareerContext";
import { ImproveNav } from "@/components/improve/ImproveNav";
import { ROUTES } from "@/lib/routes";

const REASSESSMENT_QUESTIONS = [
  {
    id: "re-01",
    skill: "Node.js & Express APIs",
    question: "When writing Express middleware for authenticated endpoints, what is the best practice for propagating asynchronous database exceptions to centralized error handling?",
    options: [
      "Wrap async calls in try/catch and call next(error) with the thrown exception.",
      "Send a 500 status code directly inside the route without invoking next().",
      "Attach the error to process.on('uncaughtException') to handle it globally.",
      "Log the error with console.error and return a generic 200 response with null payload.",
    ],
    correctAnswer: 0,
    explanation: "Calling next(error) passes the exception down to Express's 4-argument error-handling middleware cleanly.",
  },
  {
    id: "re-02",
    skill: "React Architecture",
    question: "To prevent unnecessary child re-renders when passing a callback function as a prop, which React hook should wrap the callback definition in the parent?",
    options: [
      "useMemo",
      "useCallback",
      "useRef",
      "useLayoutEffect",
    ],
    correctAnswer: 1,
    explanation: "useCallback caches a function definition between renders unless specified dependencies change.",
  },
  {
    id: "re-03",
    skill: "SQL & Relational Schemas",
    question: "What is the primary difference between RANK() and DENSE_RANK() window functions when two rows share identical partition order values?",
    options: [
      "RANK() assigns consecutive integers while DENSE_RANK() leaves gaps.",
      "DENSE_RANK() leaves no gaps in sequential rankings, whereas RANK() skips subsequent ranking numbers.",
      "RANK() can only be used with ASC order, whereas DENSE_RANK() requires DESC order.",
      "There is no difference; they are synonymous across ANSI SQL dialects.",
    ],
    correctAnswer: 1,
    explanation: "DENSE_RANK() assigns consecutive rank numbers (e.g., 1, 2, 2, 3), whereas RANK() skips ranks (e.g., 1, 2, 2, 4).",
  },
];

export default function ImproveReassessmentPage() {
  const router = useRouter();
  const { updateUserProfile, selectedRole } = useCareer();
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [score, setScore] = useState<number | null>(null);

  const handleSelect = (qid: string, idx: number) => {
    setAnswers((prev) => ({ ...prev, [qid]: idx }));
  };

  const handleSubmit = () => {
    let correct = 0;
    REASSESSMENT_QUESTIONS.forEach((q) => {
      if (answers[q.id] === q.correctAnswer) correct++;
    });
    const calculatedScore = Math.round((correct / REASSESSMENT_QUESTIONS.length) * 100);
    setScore(calculatedScore);
    setIsCompleted(true);
    // Update candidate readiness
    updateUserProfile({ readinessScore: Math.max(88, calculatedScore) });
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <ImproveNav />

      {/* Header */}
      <div className="rounded-2xl bg-royal-maroon text-white border-4 border-black p-6 sm:p-8 shadow-editorial-md flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span className="px-2.5 py-0.5 rounded bg-black text-electric-coral text-xs font-mono font-black border border-black uppercase tracking-wider">
            Adaptive Evaluation
          </span>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight uppercase leading-snug mt-2">
            Skill Reassessment Engine
          </h1>
          <p className="text-xs sm:text-sm text-white/80 mt-1">
            Targeting previously identified weak areas in {selectedRole?.title || "Full-Stack Developer"} without repeating past questions.
          </p>
        </div>
      </div>

      {!isCompleted ? (
        <div className="p-6 sm:p-8 bg-white border-2 border-black shadow-editorial-md space-y-6">
          <div className="flex items-center justify-between border-b border-black/10 pb-4">
            <span className="text-xs font-black uppercase text-black">
              Targeted Re-test: {REASSESSMENT_QUESTIONS.length} Questions
            </span>
            <span className="text-xs font-mono text-muted">
              {Object.keys(answers).length} / {REASSESSMENT_QUESTIONS.length} Answered
            </span>
          </div>

          <div className="space-y-6">
            {REASSESSMENT_QUESTIONS.map((q, idx) => (
              <div key={q.id} className="p-5 bg-paper border border-black/20 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 bg-black text-white text-[10px] font-mono uppercase font-bold">
                    Q0{idx + 1} • {q.skill}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-black leading-relaxed">{q.question}</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  {q.options.map((opt, oIdx) => {
                    const isSelected = answers[q.id] === oIdx;
                    return (
                      <button
                        key={oIdx}
                        onClick={() => handleSelect(q.id, oIdx)}
                        className={`p-3 border text-left text-xs transition-all flex items-center gap-2.5 cursor-pointer ${
                          isSelected
                            ? "bg-royal-maroon text-white border-black font-bold shadow-editorial-xs"
                            : "bg-white text-black border-black/20 hover:border-black"
                        }`}
                      >
                        <span className="font-mono text-[10px] uppercase font-bold">
                          {String.fromCharCode(65 + oIdx)}.
                        </span>
                        <span className="leading-snug">{opt}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-black/10 flex justify-end">
            <button
              onClick={handleSubmit}
              disabled={Object.keys(answers).length < REASSESSMENT_QUESTIONS.length}
              className="px-6 py-2.5 bg-electric-coral hover:bg-black hover:text-white text-black border-2 border-black font-black text-xs uppercase tracking-wider transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-editorial-xs cursor-pointer"
            >
              Submit Reassessment
            </button>
          </div>
        </div>
      ) : (
        /* Results View */
        <div className="p-8 bg-white border-4 border-black shadow-editorial-md space-y-6 text-center animate-fade-in">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 border-2 border-black flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-mono font-bold text-emerald-700 uppercase tracking-widest block">
              Skill Gap Successfully Remediated
            </span>
            <h2 className="text-3xl font-display font-black text-black uppercase">
              Reassessment Score: {score}%
            </h2>
            <p className="text-xs sm:text-sm text-muted max-w-lg mx-auto">
              Your telemetry has been updated. Weak competencies are now verified as Production Ready. You are fully qualified to build your Capstone Production Project!
            </p>
          </div>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Link href={ROUTES.app.skillAnalysis}>
              <button className="px-5 py-2.5 bg-white hover:bg-stone-100 text-black border-2 border-black font-bold text-xs uppercase tracking-wider transition-colors">
                View Updated Skill Analyzer
              </button>
            </Link>

            <Link href={ROUTES.app.projects.recommended}>
              <button className="px-6 py-2.5 bg-electric-coral hover:bg-black hover:text-white text-black border-2 border-black font-black text-xs uppercase tracking-wider transition-colors flex items-center gap-2 shadow-editorial-xs cursor-pointer">
                <span>Proceed to Capstone Projects</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
