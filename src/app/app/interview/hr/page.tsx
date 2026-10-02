"use client";

import React, { useState } from "react";
import { Users, CheckCircle2, ArrowRight } from "lucide-react";
import { InterviewNav } from "@/components/interview/InterviewNav";

const HR_QUESTIONS = [
  {
    q: "Why are you interested in pursuing a career as a Full-Stack Developer with high-growth technology companies?",
    focus: "Career alignment, self-directed learning, passion for software engineering.",
  },
  {
    q: "How do you handle ambiguous requirements when product managers change feature scopes midway through a sprint?",
    focus: "Adaptability, proactive communication, prioritization.",
  },
  {
    q: "Describe your preferred work environment and how you maintain high productivity during remote or hybrid work.",
    focus: "Discipline, asynchronous communication, accountability.",
  },
];

export default function InterviewHrPage() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [response, setResponse] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleEvaluate = () => {
    setFeedback(
      `✓ HR & Culture Evaluation (Rating: Strong Hire)\n• Articulated clear motivation and engineering growth orientation.\n• Demonstrated structured thought process without rambling.`
    );
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <InterviewNav />

      <div className="rounded-2xl bg-royal-maroon text-white border-4 border-black p-6 sm:p-8 shadow-editorial-md flex items-center justify-between">
        <div>
          <span className="px-2.5 py-0.5 rounded bg-black text-electric-coral text-xs font-mono font-black border border-black uppercase tracking-wider">
            HR & Culture
          </span>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight uppercase leading-snug mt-2">
            HR & Values Alignment Interview
          </h1>
          <p className="text-xs sm:text-sm text-white/80 mt-1">
            Motivation, company culture, compensation discussion, and career vision questions.
          </p>
        </div>
      </div>

      <div className="p-6 bg-white border-2 border-black shadow-editorial-sm space-y-4">
        <span className="text-[10px] font-mono uppercase font-bold text-royal-maroon">
          Prompt 0{currentIdx + 1} • {HR_QUESTIONS[currentIdx].focus}
        </span>
        <h2 className="text-base font-black uppercase text-black">
          {HR_QUESTIONS[currentIdx].q}
        </h2>

        <textarea
          rows={5}
          value={response}
          onChange={(e) => setResponse(e.target.value)}
          className="w-full p-4 bg-paper border-2 border-black text-xs font-medium focus:outline-none"
          placeholder="Frame your answer honestly and with professional enthusiasm..."
        />

        <div className="flex justify-end">
          <button
            onClick={handleEvaluate}
            className="px-6 py-2 bg-electric-coral hover:bg-black hover:text-white text-black border-2 border-black font-black text-xs uppercase tracking-wider transition-colors shadow-editorial-xs cursor-pointer"
          >
            Evaluate Answer
          </button>
        </div>

        {feedback && (
          <pre className="p-4 bg-emerald-950 text-emerald-300 font-mono text-xs border-2 border-emerald-500 whitespace-pre-line">
            {feedback}
          </pre>
        )}
      </div>
    </div>
  );
}
