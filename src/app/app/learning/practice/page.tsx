"use client";

import React from "react";
import Link from "next/link";
import { Code2, ArrowRight, CheckCircle2, Play } from "lucide-react";
import { useCareer } from "@/context/CareerContext";
import { LearningNav } from "@/components/learning/LearningNav";
import { ROUTES } from "@/lib/routes";

const PRACTICE_DRILLS = [
  {
    id: "drill-01",
    title: "Array Flattening with Depth Parameter",
    skill: "JavaScript",
    difficulty: "Medium",
    category: "Coding",
    route: ROUTES.app.practice.coding,
  },
  {
    id: "drill-02",
    title: "Balanced Parentheses & Bracket Validation",
    skill: "Data Structures",
    difficulty: "Medium",
    category: "DSA",
    route: ROUTES.app.practice.dsa,
  },
  {
    id: "drill-03",
    title: "Employee Highest Salary Department Join",
    skill: "SQL",
    difficulty: "Medium",
    category: "SQL",
    route: ROUTES.app.practice.sql,
  },
  {
    id: "drill-04",
    title: "Diagnose Memory Leak in Event Listeners",
    skill: "Debugging",
    difficulty: "Hard",
    category: "Debugging",
    route: ROUTES.app.practice.debugging,
  },
];

export default function LearningPracticePage() {
  const { selectedRole } = useCareer();

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <LearningNav />

      <div className="rounded-2xl bg-royal-maroon text-white border-4 border-black p-6 sm:p-8 shadow-editorial-md flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span className="px-2.5 py-0.5 rounded bg-black text-electric-coral text-xs font-mono font-black border border-black uppercase tracking-wider">
            In-Curriculum Practice
          </span>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight uppercase leading-snug mt-2">
            Reinforcement Drills & Exercises
          </h1>
          <p className="text-xs sm:text-sm text-white/80 mt-1">
            Validate conceptual lessons with hands-on technical problem solving directly tied to your roadmap.
          </p>
        </div>

        <Link href={ROUTES.app.practice.root}>
          <button className="px-5 py-2.5 bg-electric-coral hover:bg-black hover:text-white text-black border-2 border-black font-black text-xs uppercase tracking-wider transition-colors flex items-center gap-2 cursor-pointer shadow-editorial-xs">
            <span>Open Practice Hub</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {PRACTICE_DRILLS.map((drill) => (
          <div
            key={drill.id}
            className="p-6 bg-white border-2 border-black shadow-editorial-sm flex flex-col justify-between space-y-4 hover:border-royal-maroon transition-all"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 bg-paper text-black text-[10px] font-mono font-bold uppercase border border-black/20">
                  {drill.category}
                </span>
                <span className="px-2 py-0.5 bg-amber-50 text-amber-900 border border-amber-400 text-[10px] font-black uppercase">
                  {drill.difficulty}
                </span>
              </div>
              <h3 className="text-base font-black uppercase tracking-tight text-black">
                {drill.title}
              </h3>
              <p className="text-xs text-muted">
                Tested Competency: <strong className="text-black">{drill.skill}</strong>
              </p>
            </div>

            <div className="pt-4 border-t border-black/10 flex items-center justify-end">
              <Link href={drill.route}>
                <button className="px-4 py-2 bg-royal-maroon hover:bg-electric-coral hover:text-black text-white font-extrabold text-xs uppercase tracking-wider border border-black transition-colors flex items-center gap-1.5 shadow-editorial-xs">
                  <span>Solve Challenge</span>
                  <Play className="w-3.5 h-3.5" />
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
