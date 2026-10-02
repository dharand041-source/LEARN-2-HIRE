"use client";

import React from "react";
import Link from "next/link";
import { TrendingUp, Clock, CheckCircle2, Award, ArrowRight, BarChart2 } from "lucide-react";
import { useCareer } from "@/context/CareerContext";
import { LearningNav } from "@/components/learning/LearningNav";
import { ROUTES } from "@/lib/routes";

export default function LearningProgressPage() {
  const { learningModules, selectedRole, assessmentResult } = useCareer();

  const totalModules = learningModules.length || 1;
  const completedModules = learningModules.filter((m) => m.status === "Completed").length;
  const inProgressModules = learningModules.filter((m) => m.status === "In Progress").length;
  const percent = Math.round(
    learningModules.reduce((acc, m) => acc + m.progress, 0) / totalModules
  );

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <LearningNav />

      <div className="rounded-2xl bg-royal-maroon text-white border-4 border-black p-6 sm:p-8 shadow-editorial-md flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span className="px-2.5 py-0.5 rounded bg-black text-electric-coral text-xs font-mono font-black border border-black uppercase tracking-wider">
            Learning Telemetry
          </span>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight uppercase leading-snug mt-2">
            Curriculum Progress & Milestones
          </h1>
          <p className="text-xs sm:text-sm text-white/80 mt-1">
            Real-time tracking of completed hours, module mastery, and reassessment readiness.
          </p>
        </div>

        <Link href={ROUTES.app.improve.reassessment}>
          <button className="px-5 py-2.5 bg-electric-coral hover:bg-black hover:text-white text-black border-2 border-black font-black text-xs uppercase tracking-wider transition-colors flex items-center gap-2 cursor-pointer shadow-editorial-xs">
            <span>Check Reassessment Status</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 bg-white border-2 border-black shadow-editorial-sm space-y-2">
          <span className="text-[10px] font-mono text-muted uppercase font-bold block">
            Overall Completion
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-black text-black">{percent}%</span>
            <span className="text-xs text-muted font-bold">of track</span>
          </div>
          <div className="w-full h-2 bg-stone-200 border border-black/20 overflow-hidden mt-2">
            <div className="h-full bg-royal-maroon" style={{ width: `${percent}%` }} />
          </div>
        </div>

        <div className="p-6 bg-white border-2 border-black shadow-editorial-sm space-y-2">
          <span className="text-[10px] font-mono text-muted uppercase font-bold block">
            Active Study Units
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-black text-amber-600">{inProgressModules}</span>
            <span className="text-xs text-muted font-bold">in progress</span>
          </div>
          <p className="text-xs text-muted">Currently undergoing skill practice</p>
        </div>

        <div className="p-6 bg-white border-2 border-black shadow-editorial-sm space-y-2">
          <span className="text-[10px] font-mono text-muted uppercase font-bold block">
            Mastered Modules
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-black text-emerald-700">{completedModules}</span>
            <span className="text-xs text-muted font-bold">of {totalModules} modules</span>
          </div>
          <p className="text-xs text-muted">Verified through diagnostic criteria</p>
        </div>
      </div>

      {/* Module by Module Progress Table */}
      <div className="p-6 bg-white border-2 border-black shadow-editorial-sm space-y-4">
        <h2 className="text-xs font-black uppercase tracking-wider text-black">
          Detailed Module Progress
        </h2>

        <div className="space-y-3">
          {learningModules.map((m) => (
            <div key={m.id} className="p-4 bg-paper border border-black/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase text-muted font-bold">{m.difficulty}</span>
                <h3 className="text-sm font-black text-black uppercase">{m.title}</h3>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-32 h-2 bg-stone-200 border border-black/20 overflow-hidden">
                  <div className="h-full bg-royal-maroon" style={{ width: `${m.progress}%` }} />
                </div>
                <span className="font-mono text-xs font-bold text-black min-w-[40px] text-right">{m.progress}%</span>
                <span className="px-2 py-0.5 text-[10px] font-bold uppercase bg-white border border-black/20">
                  {m.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
