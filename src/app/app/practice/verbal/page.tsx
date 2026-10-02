"use client";

import React, { useState } from "react";
import { MessageSquare, CheckCircle2 } from "lucide-react";
import { PracticeNav } from "@/components/practice/PracticeNav";

const VERBAL_QUESTIONS = [
  {
    id: "v-01",
    category: "Reading Comprehension & Critical Analysis",
    question: "Read the premise: 'A distributed consensus protocol guarantees safety if no two valid nodes commit different values for the same slot. However, during network partition, FLP impossibility states that deterministic asynchronous consensus cannot guarantee liveness.' Which statement logically follows?",
    options: [
      "Network partitions cause data corruption in all distributed systems.",
      "In an asynchronous network, a system must choose between guaranteeing termination and preventing conflicting commits.",
      "FLP impossibility only applies to synchronous leader election protocols.",
      "Consensus protocols must prioritize liveness over safety at all times.",
    ],
    correctAnswer: 1,
    explanation: "Under FLP impossibility and the CAP theorem, an asynchronous distributed system experiencing partitions cannot guarantee both termination (liveness) and safety.",
  },
  {
    id: "v-02",
    category: "Sentence Correction & Technical Grammar",
    question: "Select the sentence with impeccable technical articulation:",
    options: [
      "The microservices communicates between each other via gRPC protocol efficiently.",
      "Neither the database replicas nor the primary node were responsive during the failover event.",
      "The server crash was due to that the memory was exhausted.",
      "Each of the microservice endpoints are secured with JSON Web Tokens.",
    ],
    correctAnswer: 1,
    explanation: "'Neither the database replicas nor the primary node were responsive' correctly aligns plural/singular compound subject agreement with the nearest subject.",
  },
];

export default function PracticeVerbalPage() {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [showExplanation, setShowExplanation] = useState<Record<string, boolean>>({});

  const handleSelect = (qid: string, idx: number) => {
    setSelectedAnswers((prev) => ({ ...prev, [qid]: idx }));
    setShowExplanation((prev) => ({ ...prev, [qid]: true }));
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <PracticeNav />

      <div className="rounded-2xl bg-royal-maroon text-white border-4 border-black p-6 sm:p-8 shadow-editorial-md flex items-center justify-between">
        <div>
          <span className="px-2.5 py-0.5 rounded bg-black text-electric-coral text-xs font-mono font-black border border-black uppercase tracking-wider">
            Verbal Ability
          </span>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight uppercase leading-snug mt-2">
            Verbal Ability & Professional Communication
          </h1>
          <p className="text-xs sm:text-sm text-white/80 mt-1">
            Technical comprehension, grammar correction, and reasoning drills tested by MNC hiring panels.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {VERBAL_QUESTIONS.map((q, idx) => {
          const selectedIdx = selectedAnswers[q.id];
          const isAnswered = selectedIdx !== undefined;
          const isCorrect = selectedIdx === q.correctAnswer;

          return (
            <div key={q.id} className="p-6 bg-white border-2 border-black shadow-editorial-sm space-y-4">
              <span className="px-2 py-0.5 bg-paper text-black text-[10px] font-mono font-bold uppercase border border-black/20">
                Exercise 0{idx + 1} • {q.category}
              </span>

              <h2 className="text-base font-bold text-black leading-relaxed">{q.question}</h2>

              <div className="space-y-2 pt-2">
                {q.options.map((opt, oIdx) => {
                  let btnClass = "bg-white border-black/20 hover:border-black";
                  if (isAnswered) {
                    if (oIdx === q.correctAnswer) btnClass = "bg-emerald-100 border-emerald-600 text-emerald-950 font-bold";
                    else if (selectedIdx === oIdx) btnClass = "bg-rose-100 border-rose-600 text-rose-950 font-bold";
                  }

                  return (
                    <button
                      key={oIdx}
                      onClick={() => handleSelect(q.id, oIdx)}
                      className={`w-full p-3.5 border-2 text-left text-xs transition-all flex items-center gap-3 cursor-pointer ${btnClass}`}
                    >
                      <span className="w-5 h-5 rounded-full border border-black/30 font-mono text-[10px] flex items-center justify-center shrink-0">
                        {String.fromCharCode(65 + oIdx)}
                      </span>
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>

              {showExplanation[q.id] && (
                <div className={`p-4 border-2 text-xs leading-relaxed space-y-1 ${isCorrect ? "bg-emerald-50 border-emerald-500 text-emerald-950" : "bg-rose-50 border-rose-500 text-rose-950"}`}>
                  <span className="font-bold block uppercase">{isCorrect ? "✓ Valid Grammatical Inference" : "✗ Incorrect Option"}</span>
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
