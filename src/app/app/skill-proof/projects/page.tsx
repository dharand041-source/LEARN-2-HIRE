"use client";

import React from "react";
import Link from "next/link";
import { FolderGit2, CheckCircle2, ExternalLink, ArrowRight } from "lucide-react";
import { useCareer } from "@/context/CareerContext";
import { SkillProofNav } from "@/components/skill-proof/SkillProofNav";
import { ROUTES } from "@/lib/routes";

export default function SkillProofProjectsPage() {
  const { projects } = useCareer();
  const completedProjects = projects.filter((p) => p.status === "Completed");

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <SkillProofNav />

      <div className="rounded-2xl bg-royal-maroon text-white border-4 border-black p-6 sm:p-8 shadow-editorial-md flex items-center justify-between">
        <div>
          <span className="px-2.5 py-0.5 rounded bg-black text-electric-coral text-xs font-mono font-black border border-black uppercase tracking-wider">
            Verified Projects
          </span>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight uppercase leading-snug mt-2">
            Production Project Proof
          </h1>
          <p className="text-xs sm:text-sm text-white/80 mt-1">
            Projects evaluated by rubric criteria that count as tangible work experience.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {completedProjects.map((proj) => (
          <div key={proj.id} className="p-6 bg-white border-2 border-black shadow-editorial-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 bg-emerald-100 text-emerald-900 border border-emerald-500 text-[10px] font-mono font-bold uppercase">
                Verified Production App
              </span>
              <span className="text-xs font-mono font-bold text-muted">Grade: 92/100</span>
            </div>
            <h3 className="text-base font-black uppercase text-black">{proj.title}</h3>
            <p className="text-xs text-muted leading-relaxed">{proj.description}</p>
            <div className="flex items-center gap-1.5 flex-wrap pt-1">
              {proj.skillsTested.map((s) => (
                <span key={s} className="px-2 py-0.5 bg-stone-100 text-[10px] font-mono font-bold border border-black/20">
                  {s}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
