"use client";

import React from "react";
import Link from "next/link";
import {
  TrendingUp,
  BarChart3,
  Award,
  CheckCircle2,
  Clock,
  ArrowRight,
  Flame,
} from "lucide-react";
import { useCareer } from "@/context/CareerContext";
import { ROUTES } from "@/lib/routes";

export default function AnalyticsPage() {
  const { userProfile, selectedRole, learningModules, problems, projects } = useCareer();

  const solvedProblems = problems.filter((p) => p.solved).length;
  const completedProjects = projects.filter((p) => p.status === "Completed").length;

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Top Banner */}
      <div className="rounded-2xl bg-royal-maroon text-white border-4 border-black p-6 sm:p-8 shadow-editorial-md flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded bg-black text-electric-coral text-xs font-mono font-black border border-black uppercase tracking-wider">
              Telemetry
            </span>
            <span className="text-xs text-white/90 font-mono uppercase tracking-wider font-extrabold">
              Performance Intelligence
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight uppercase leading-snug">
            Candidate Analytics & Growth Vector
          </h1>
          <p className="text-xs sm:text-sm text-white/80 mt-1 font-medium">
            Quantitative velocity tracking across diagnostic assessments, coding practice, and project completion.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Link href={ROUTES.app.dashboard}>
            <button className="px-5 py-2.5 bg-electric-coral hover:bg-black hover:text-white text-black border-2 border-black font-black text-xs uppercase tracking-wider transition-colors shadow-editorial-xs cursor-pointer">
              Cockpit View
            </button>
          </Link>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-5 bg-white border-2 border-black shadow-editorial-sm space-y-1">
          <span className="text-[10px] font-mono text-muted uppercase font-bold block">Career Readiness</span>
          <span className="text-3xl font-black text-black">{userProfile.readinessScore}%</span>
          <span className="text-xs font-bold text-emerald-700 block">Production Calibrated</span>
        </div>

        <div className="p-5 bg-white border-2 border-black shadow-editorial-sm space-y-1">
          <span className="text-[10px] font-mono text-muted uppercase font-bold block">Consistency Streak</span>
          <span className="text-3xl font-black text-royal-maroon flex items-center gap-1">
            <Flame className="w-6 h-6 text-royal-maroon fill-royal-maroon" />
            <span>{userProfile.streakDays} Days</span>
          </span>
          <span className="text-xs text-muted block">Daily practice maintained</span>
        </div>

        <div className="p-5 bg-white border-2 border-black shadow-editorial-sm space-y-1">
          <span className="text-[10px] font-mono text-muted uppercase font-bold block">Drills Completed</span>
          <span className="text-3xl font-black text-black">{solvedProblems} Problems</span>
          <span className="text-xs text-muted block">Algorithmic assertions passed</span>
        </div>

        <div className="p-5 bg-white border-2 border-black shadow-editorial-sm space-y-1">
          <span className="text-[10px] font-mono text-muted uppercase font-bold block">Verified Projects</span>
          <span className="text-3xl font-black text-black">{completedProjects} Apps</span>
          <span className="text-xs text-emerald-700 font-bold block">Rubric grade verified</span>
        </div>
      </div>

      {/* Growth Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-white border-2 border-black shadow-editorial-sm space-y-4">
          <h2 className="text-xs font-black uppercase text-black">Curriculum Velocity</h2>
          <div className="space-y-3">
            {learningModules.slice(0, 4).map((mod) => (
              <div key={mod.id} className="space-y-1 text-xs">
                <div className="flex justify-between font-bold">
                  <span>{mod.title}</span>
                  <span className="font-mono">{mod.progress}%</span>
                </div>
                <div className="w-full h-2 bg-stone-200 border border-black/20 overflow-hidden">
                  <div className="h-full bg-royal-maroon" style={{ width: `${mod.progress}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 bg-white border-2 border-black shadow-editorial-sm space-y-4">
          <h2 className="text-xs font-black uppercase text-black">Readiness Milestones</h2>
          <div className="space-y-3 text-xs">
            <div className="p-3 bg-paper border border-black/20 flex items-center justify-between">
              <span>Baseline Assessment Completed</span>
              <span className="font-bold text-emerald-700 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Passed
              </span>
            </div>
            <div className="p-3 bg-paper border border-black/20 flex items-center justify-between">
              <span>Skill Gap Remediation Loop</span>
              <span className="font-bold text-emerald-700 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Remediated
              </span>
            </div>
            <div className="p-3 bg-paper border border-black/20 flex items-center justify-between">
              <span>Capstone Project Verified</span>
              <span className="font-bold text-emerald-700 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Approved
              </span>
            </div>
            <div className="p-3 bg-paper border border-black/20 flex items-center justify-between">
              <span>Resume Approval Gate</span>
              <span className="font-bold text-emerald-700 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Ready for Direct Apply
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
