"use client";

import React from "react";
import Link from "next/link";
import { Briefcase, ArrowRight, Code2 } from "lucide-react";
import { useCareer } from "@/context/CareerContext";
import { InterviewNav } from "@/components/interview/InterviewNav";
import { ROUTES } from "@/lib/routes";

const ROLE_PROMPTS = [
  {
    title: "Full-Stack System Architecture Design",
    desc: "Design a URL shortener with 10M daily active users. Discuss schema, hashing, caching, and rate limiting.",
    duration: "40 min",
    difficulty: "Advanced",
  },
  {
    title: "Frontend State Synchronization & Rendering Optimization",
    desc: "Explain how React reconciliation computes virtual DOM diffs and how to profile expensive layout shifts.",
    duration: "30 min",
    difficulty: "Intermediate",
  },
  {
    title: "Backend Concurrency & Transaction Isolation",
    desc: "Defend your choice between optimistic concurrency control and pessimistic row locks in an e-commerce checkout flow.",
    duration: "35 min",
    difficulty: "Advanced",
  },
];

export default function InterviewRolePage() {
  const { selectedRole } = useCareer();

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <InterviewNav />

      <div className="rounded-2xl bg-royal-maroon text-white border-4 border-black p-6 sm:p-8 shadow-editorial-md flex items-center justify-between">
        <div>
          <span className="px-2.5 py-0.5 rounded bg-black text-electric-coral text-xs font-mono font-black border border-black uppercase tracking-wider">
            Role Questions
          </span>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight uppercase leading-snug mt-2">
            {selectedRole?.title || "Full-Stack Developer"} Role Interview
          </h1>
          <p className="text-xs sm:text-sm text-white/80 mt-1">
            Questions tailored to the daily responsibilities and architectural choices of {selectedRole?.title}.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {ROLE_PROMPTS.map((p, idx) => (
          <div key={idx} className="p-6 bg-white border-2 border-black shadow-editorial-sm flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-royal-maroon transition-all">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-paper text-black text-[10px] font-mono font-bold uppercase border border-black/20">
                  {p.duration} • {p.difficulty}
                </span>
              </div>
              <h3 className="text-base font-black uppercase text-black">{p.title}</h3>
              <p className="text-xs text-muted max-w-2xl">{p.desc}</p>
            </div>

            <Link href={ROUTES.app.interview.mock}>
              <button className="px-5 py-2.5 bg-royal-maroon hover:bg-electric-coral hover:text-black text-white font-extrabold text-xs uppercase tracking-wider border border-black transition-colors flex items-center gap-1.5 shadow-editorial-xs">
                <span>Start Simulation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
