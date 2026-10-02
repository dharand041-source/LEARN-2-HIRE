"use client";

import React from "react";
import Link from "next/link";
import { Briefcase, ArrowRight, Code2, Database, Shield } from "lucide-react";
import { useCareer } from "@/context/CareerContext";
import { PracticeNav } from "@/components/practice/PracticeNav";
import { ROUTES } from "@/lib/routes";

export default function PracticeRolePage() {
  const { selectedRole } = useCareer();

  const roleDrills = [
    {
      title: "Full-Stack Authentication Cookie vs Token Simulation",
      skills: ["Auth", "JWT", "Security"],
      difficulty: "Advanced",
      duration: "40 min",
    },
    {
      title: "Optimistic UI Updates with TanStack Query / React",
      skills: ["React", "Client State", "UX"],
      difficulty: "Medium",
      duration: "30 min",
    },
    {
      title: "RESTful Error Middleware with RFC 7807 Problem Details",
      skills: ["Node.js", "Express", "REST"],
      difficulty: "Intermediate",
      duration: "35 min",
    },
    {
      title: "PostgreSQL Database Migration with Zero-Downtime Column Addition",
      skills: ["SQL", "Migrations", "DevOps"],
      difficulty: "Advanced",
      duration: "45 min",
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <PracticeNav />

      <div className="rounded-2xl bg-royal-maroon text-white border-4 border-black p-6 sm:p-8 shadow-editorial-md flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span className="px-2.5 py-0.5 rounded bg-black text-electric-coral text-xs font-mono font-black border border-black uppercase tracking-wider">
            Target Role Alignment
          </span>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight uppercase leading-snug mt-2">
            {selectedRole?.title || "Full-Stack Developer"} Role Drills
          </h1>
          <p className="text-xs sm:text-sm text-white/80 mt-1">
            Specialized challenges simulating scenarios routinely encountered on the job.
          </p>
        </div>

        <Link href={ROUTES.app.projects.recommended}>
          <button className="px-5 py-2.5 bg-electric-coral hover:bg-black hover:text-white text-black border-2 border-black font-black text-xs uppercase tracking-wider transition-colors flex items-center gap-2 cursor-pointer shadow-editorial-xs">
            <span>Explore Real Projects</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {roleDrills.map((drill, idx) => (
          <div
            key={idx}
            className="p-6 bg-white border-2 border-black shadow-editorial-sm flex flex-col justify-between space-y-4 hover:border-royal-maroon transition-all"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 bg-paper text-black text-[10px] font-mono font-bold uppercase border border-black/20">
                  {drill.duration}
                </span>
                <span className="px-2 py-0.5 bg-amber-100 text-amber-900 border border-amber-500 text-[10px] font-black uppercase">
                  {drill.difficulty}
                </span>
              </div>
              <h3 className="text-base font-black uppercase tracking-tight text-black">
                {drill.title}
              </h3>
              <div className="flex items-center gap-1.5 flex-wrap pt-1">
                {drill.skills.map((s) => (
                  <span key={s} className="px-2 py-0.5 bg-stone-100 text-[10px] font-mono font-bold border border-black/20">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-black/10 flex justify-end">
              <Link href={ROUTES.app.practice.root}>
                <button className="px-4 py-2 bg-royal-maroon hover:bg-electric-coral hover:text-black text-white font-extrabold text-xs uppercase tracking-wider border border-black transition-colors flex items-center gap-1.5 shadow-editorial-xs">
                  <span>Solve Drill</span>
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
