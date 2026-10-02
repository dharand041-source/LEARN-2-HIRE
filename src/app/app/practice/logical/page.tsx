"use client";

import React, { useState } from "react";
import { Brain, CheckCircle2 } from "lucide-react";
import { PracticeNav } from "@/components/practice/PracticeNav";
import { LOGICAL_QUESTION_BANK } from "@/data/questions";

export default function PracticeLogicalPage() {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [showExplanation, setShowExplanation] = useState<Record<string, boolean>>({});

  const handleSelect = (qid: string, label: string) => {
    setSelectedAnswers((prev) => ({ ...prev, [qid]: label }));
    setShowExplanation((prev) => ({ ...prev, [qid]: true }));
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <PracticeNav />

      <div className="rounded-2xl bg-royal-maroon text-white border-4 border-black p-6 sm:p-8 shadow-editorial-md flex items-center justify-between">
        <div>
          <span className="px-2.5 py-0.5 rounded bg-black text-electric-coral text-xs font-mono font-black border border-black uppercase tracking-wider">
            Analytical Reasoning
          </span>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight uppercase leading-snug mt-2">
            Logical Deduction & Pattern Recognition
          </h1>
          <p className="text-xs sm:text-sm text-white/80 mt-1">
            Syllogisms, Blood Relations, Seating Arrangements, and Critical Path analysis.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {LOGICAL_QUESTION_BANK.map((q, idx) => {
          const selectedAns = selectedAnswers[q.id];
          const isAnswered = selectedAns !== undefined;
          const isCorrect = selectedAns === q.correctAnswer;

          return (
            <div key={q.id} className="p-6 bg-white border-2 border-black shadow-editorial-sm space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 bg-paper text-black text-[10px] font-mono font-bold uppercase border border-black/20">
                  Question {idx + 1} • {q.category}
                </span>
                <span className="text-xs font-mono text-muted uppercase">{q.difficulty}</span>
              </div>

              <h2 className="text-base font-bold text-black leading-relaxed">{q.question}</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {q.options.map((opt, oIdx) => {
                  const isSelected = selectedAns === opt.label;
                  let btnClass = "bg-white border-black/20 hover:border-black";
                  if (isAnswered) {
                    if (opt.label === q.correctAnswer) btnClass = "bg-emerald-100 border-emerald-600 text-emerald-950 font-bold";
                    else if (isSelected) btnClass = "bg-rose-100 border-rose-600 text-rose-950 font-bold";
                  }

                  return (
                    <button
                      key={oIdx}
                      onClick={() => handleSelect(q.id, opt.label)}
                      className={`p-3.5 border-2 text-left text-xs transition-all flex items-center gap-3 cursor-pointer ${btnClass}`}
                    >
                      <span className="w-5 h-5 rounded-full border border-black/30 font-mono text-[10px] flex items-center justify-center shrink-0">
                        {opt.label}
                      </span>
                      <span>{opt.text}</span>
                    </button>
                  );
                })}
              </div>

              {showExplanation[q.id] && (
                <div className={`p-4 border-2 text-xs leading-relaxed space-y-1 ${isCorrect ? "bg-emerald-50 border-emerald-500 text-emerald-950" : "bg-rose-50 border-rose-500 text-rose-950"}`}>
                  <span className="font-bold block uppercase">{isCorrect ? "✓ Logical Deduction Validated" : "✗ Invalid Deduction"}</span>
                  <p>{q.explanation}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
