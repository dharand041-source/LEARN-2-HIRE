"use client";

import React from "react";
import Link from "next/link";
import { AlertTriangle, ArrowRight, BookOpen, RotateCcw, Sparkles } from "lucide-react";
import { useCareer } from "@/context/CareerContext";
import { LearningNav } from "@/components/learning/LearningNav";
import { ROUTES } from "@/lib/routes";

export default function LearningWeakTopicsPage() {
  const { assessmentResult, selectedRole } = useCareer();

  const weakTopics = assessmentResult?.needsImprovement || [
    "Node.js & Express REST APIs (50%)",
    "React Architecture & State (60%)",
    "Relational Normalization & SQL Queries (55%)",
  ];

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <LearningNav />

      <div className="rounded-2xl bg-royal-maroon text-white border-4 border-black p-6 sm:p-8 shadow-editorial-md flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span className="px-2.5 py-0.5 rounded bg-black text-electric-coral text-xs font-mono font-black border border-black uppercase tracking-wider">
            Targeted Remediation
          </span>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight uppercase leading-snug mt-2">
            Identified Weak Topics & Blindspots
          </h1>
          <p className="text-xs sm:text-sm text-white/80 mt-1">
            Focus areas scored below industry benchmark on your diagnostic. Master these before proceeding to production capstone projects.
          </p>
        </div>

        <Link href={ROUTES.app.improve.retraining}>
          <button className="px-5 py-2.5 bg-electric-coral hover:bg-black hover:text-white text-black border-2 border-black font-black text-xs uppercase tracking-wider transition-colors flex items-center gap-2 cursor-pointer shadow-editorial-xs">
            <span>Retraining Program</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </Link>
      </div>

      <div className="space-y-4">
        {weakTopics.map((topic, idx) => (
          <div
            key={idx}
            className="p-6 bg-white border-2 border-black shadow-editorial-sm flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-royal-maroon transition-all"
          >
            <div className="flex items-start gap-4">
              <div className="w-9 h-9 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center shrink-0 border border-rose-300">
                <AlertTriangle className="w-5 h-5 text-rose-600" />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase font-bold text-rose-700 block">
                  Priority Gap 0{idx + 1}
                </span>
                <h3 className="text-base font-black uppercase tracking-tight text-black">
                  {topic}
                </h3>
                <p className="text-xs text-muted">
                  Requires 2 dedicated tutorial hours and 1 coding drill to qualify for verified mastery.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <Link href={ROUTES.app.learning.lessons}>
                <button className="px-4 py-2 bg-stone-100 hover:bg-black hover:text-white text-black border border-black font-bold text-xs uppercase tracking-wider transition-colors">
                  Review Lesson
                </button>
              </Link>
              <Link href={ROUTES.app.practice.root}>
                <button className="px-4 py-2 bg-royal-maroon hover:bg-electric-coral hover:text-black text-white border border-black font-extrabold text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5 shadow-editorial-xs">
                  <span>Practice Drills</span>
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
