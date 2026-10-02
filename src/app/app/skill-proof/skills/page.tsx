"use client";

import React from "react";
import Link from "next/link";
import { CheckCircle2, ArrowRight, ShieldCheck } from "lucide-react";
import { useCareer } from "@/context/CareerContext";
import { SkillProofNav } from "@/components/skill-proof/SkillProofNav";
import { ROUTES } from "@/lib/routes";

const VERIFIED_SKILLS = [
  { name: "JavaScript / TypeScript", level: "Production", evidenceCount: 3, verifiedDate: "2026-10-01" },
  { name: "React & Next.js", level: "Production", evidenceCount: 2, verifiedDate: "2026-10-02" },
  { name: "Node.js & Express", level: "Competent", evidenceCount: 2, verifiedDate: "2026-10-02" },
  { name: "SQL & Relational Schema", level: "Production", evidenceCount: 2, verifiedDate: "2026-09-30" },
  { name: "Git Version Control", level: "Advanced", evidenceCount: 4, verifiedDate: "2026-09-28" },
];

export default function SkillProofSkillsPage() {
  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <SkillProofNav />

      <div className="rounded-2xl bg-royal-maroon text-white border-4 border-black p-6 sm:p-8 shadow-editorial-md flex items-center justify-between">
        <div>
          <span className="px-2.5 py-0.5 rounded bg-black text-electric-coral text-xs font-mono font-black border border-black uppercase tracking-wider">
            Verified Competencies
          </span>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight uppercase leading-snug mt-2">
            Verifiable Skills Matrix
          </h1>
          <p className="text-xs sm:text-sm text-white/80 mt-1">
            Every listed skill links to immutable diagnostic results and code repositories.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {VERIFIED_SKILLS.map((s) => (
          <div key={s.name} className="p-5 bg-white border-2 border-black shadow-editorial-sm space-y-2">
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 text-[10px] font-mono font-bold uppercase bg-emerald-100 text-emerald-900 border border-emerald-500">
                {s.level}
              </span>
              <span className="text-xs font-mono text-muted">{s.evidenceCount} Verified Artifacts</span>
            </div>
            <h3 className="text-base font-black uppercase text-black">{s.name}</h3>
            <p className="text-xs text-muted">Verified on {s.verifiedDate} via Capstone Project evaluation.</p>
          </div>
        ))}
      </div>
    </div>
  );
}
