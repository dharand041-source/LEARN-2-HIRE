"use client";

import React from "react";
import Link from "next/link";
import { Trophy, Award, Sparkles, CheckCircle2 } from "lucide-react";
import { SkillProofNav } from "@/components/skill-proof/SkillProofNav";

const ACHIEVEMENTS = [
  {
    id: "ach-01",
    title: "Diagnostic Pioneer",
    desc: "Completed role baseline diagnostic test with >70% accuracy.",
    date: "2026-10-01",
    tier: "Gold",
  },
  {
    id: "ach-02",
    title: "Full-Stack Builder",
    desc: "Submitted production-grade capstone project repository with live URL.",
    date: "2026-10-02",
    tier: "Platinum",
  },
  {
    id: "ach-03",
    title: "SQL Practitioner",
    desc: "Mastered window functions and complex joins with optimal execution plans.",
    date: "2026-10-02",
    tier: "Silver",
  },
];

export default function SkillProofAchievementsPage() {
  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <SkillProofNav />

      <div className="rounded-2xl bg-royal-maroon text-white border-4 border-black p-6 sm:p-8 shadow-editorial-md flex items-center justify-between">
        <div>
          <span className="px-2.5 py-0.5 rounded bg-black text-electric-coral text-xs font-mono font-black border border-black uppercase tracking-wider">
            Milestones & Badges
          </span>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight uppercase leading-snug mt-2">
            Candidate Milestones & Badges
          </h1>
          <p className="text-xs sm:text-sm text-white/80 mt-1">
            Proven achievements accumulated along the candidate preparation lifecycle.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {ACHIEVEMENTS.map((ach) => (
          <div key={ach.id} className="p-6 bg-white border-2 border-black shadow-editorial-sm space-y-3">
            <div className="w-10 h-10 bg-amber-100 text-amber-800 border border-amber-400 flex items-center justify-center">
              <Trophy className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-mono uppercase font-bold text-amber-700 block">
              Tier: {ach.tier}
            </span>
            <h3 className="text-base font-black uppercase text-black">{ach.title}</h3>
            <p className="text-xs text-muted leading-relaxed">{ach.desc}</p>
            <div className="text-[10px] font-mono text-muted pt-2 border-t border-black/10">
              Unlocked on {ach.date}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
