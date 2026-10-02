"use client";

import React, { useState } from "react";
import { Compass, CheckCircle2, ArrowRight } from "lucide-react";
import { InterviewNav } from "@/components/interview/InterviewNav";

export default function InterviewBehavioralPage() {
  const [situation, setSituation] = useState("");
  const [task, setTask] = useState("");
  const [action, setAction] = useState("");
  const [result, setResult] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleEvaluate = () => {
    setFeedback(
      `✓ STAR Structure Analysis (Score: 92/100)\n• Situation & Task: Clearly established business context and deadlines.\n• Action: Emphasized individual engineering contributions without neglecting team collaboration.\n• Result: Strong quantified metrics (e.g. latency decreased, delivered ahead of sprint).`
    );
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <InterviewNav />

      <div className="rounded-2xl bg-royal-maroon text-white border-4 border-black p-6 sm:p-8 shadow-editorial-md flex items-center justify-between">
        <div>
          <span className="px-2.5 py-0.5 rounded bg-black text-electric-coral text-xs font-mono font-black border border-black uppercase tracking-wider">
            Behavioral Modeling
          </span>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight uppercase leading-snug mt-2">
            STAR Method Behavioral Defense
          </h1>
          <p className="text-xs sm:text-sm text-white/80 mt-1">
            Frame past project achievements and challenges using Situation, Task, Action, and Result.
          </p>
        </div>
      </div>

      <div className="p-6 sm:p-8 bg-white border-2 border-black shadow-editorial-sm space-y-6">
        <div className="p-4 bg-paper border border-black/20">
          <span className="text-[10px] font-mono text-royal-maroon uppercase font-bold block">
            Behavioral Challenge Prompt
          </span>
          <h2 className="text-base font-black uppercase text-black mt-1">
            &quot;Tell me about a time you encountered a severe production bug or critical blocker right before a product deadline. How did you resolve it?&quot;
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-black uppercase text-black">1. Situation</label>
            <textarea
              rows={3}
              value={situation}
              onChange={(e) => setSituation(e.target.value)}
              className="w-full p-3 bg-paper border border-black text-xs font-medium focus:outline-none"
              placeholder="What was the context, stakeholder expectations, or system environment?"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-black uppercase text-black">2. Task</label>
            <textarea
              rows={3}
              value={task}
              onChange={(e) => setTask(e.target.value)}
              className="w-full p-3 bg-paper border border-black text-xs font-medium focus:outline-none"
              placeholder="What specifically was your responsibility to diagnose or rectify?"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-black uppercase text-black">3. Action</label>
            <textarea
              rows={3}
              value={action}
              onChange={(e) => setAction(e.target.value)}
              className="w-full p-3 bg-paper border border-black text-xs font-medium focus:outline-none"
              placeholder="What exact engineering steps, debugging tools, and communication did you execute?"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-black uppercase text-black">4. Result (Quantified)</label>
            <textarea
              rows={3}
              value={result}
              onChange={(e) => setResult(e.target.value)}
              className="w-full p-3 bg-paper border border-black text-xs font-medium focus:outline-none"
              placeholder="What was the measurable outcome, post-mortem finding, or prevention rule created?"
            />
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={handleEvaluate}
            className="px-6 py-2.5 bg-royal-maroon hover:bg-electric-coral hover:text-black text-white border-2 border-black font-extrabold text-xs uppercase tracking-wider transition-colors shadow-editorial-xs cursor-pointer"
          >
            Score STAR Response
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
