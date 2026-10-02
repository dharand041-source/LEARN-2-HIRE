"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Award,
  ArrowRight,
  FolderGit2,
  FileCode,
  Trophy,
} from "lucide-react";
import { useCareer } from "@/context/CareerContext";
import { SkillProofNav } from "@/components/skill-proof/SkillProofNav";
import { ROUTES } from "@/lib/routes";
import { EvidenceService } from "@/services/domainServices";

const evidenceService = new EvidenceService();

export default function SkillProofOverviewPage() {
  const { userProfile, selectedRole } = useCareer();
  const [evidenceList, setEvidenceList] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      const data = await evidenceService.getAll();
      setEvidenceList(data);
    }
    load();
  }, []);

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <SkillProofNav />

      {/* Hero Banner */}
      <div className="rounded-2xl bg-royal-maroon text-white border-4 border-black p-6 sm:p-8 shadow-editorial-md flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded bg-black text-electric-coral text-xs font-mono font-black border border-black uppercase tracking-wider">
              Verifiable Proof
            </span>
            <span className="text-xs text-white/90 font-mono uppercase tracking-wider font-extrabold">
              Proof-Over-Claims Ledger
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight uppercase leading-snug">
            Skill Evidence & Artifacts Vault
          </h1>
          <p className="text-xs sm:text-sm text-white/80 mt-1 font-medium">
            Verifiable evidence connecting directly to assessed skills. Every claim on your resume is backed by diagnostic logs or code repositories.
          </p>
        </div>

        <Link href={ROUTES.app.interview.root}>
          <button className="px-5 py-2.5 bg-electric-coral hover:bg-black hover:text-white text-black border-2 border-black font-black text-xs uppercase tracking-wider transition-colors flex items-center gap-2 cursor-pointer shadow-editorial-xs">
            <span>Prepare for Mock Interview</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </Link>
      </div>

      {/* Verified Artifacts Matrix */}
      <div className="space-y-4">
        <h2 className="text-sm font-black uppercase text-black">
          Verified Evidence Ledger ({evidenceList.length} Artifacts)
        </h2>

        <div className="space-y-4">
          {evidenceList.map((item) => (
            <div
              key={item.id}
              className="p-6 bg-white border-2 border-black shadow-editorial-sm flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-royal-maroon transition-all"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2 py-0.5 text-[10px] font-black uppercase bg-emerald-100 text-emerald-900 border border-emerald-500 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>{item.status}</span>
                  </span>
                  <span className="px-2 py-0.5 text-[10px] font-mono font-bold uppercase bg-stone-100 border border-black/20">
                    Skill: {item.skill}
                  </span>
                  <span className="px-2 py-0.5 text-[10px] font-mono font-bold uppercase bg-paper border border-black/20">
                    Type: {item.evidenceType}
                  </span>
                </div>

                <h3 className="text-base font-black uppercase tracking-tight text-black mt-1">
                  {item.title}
                </h3>
                <p className="text-xs text-muted max-w-2xl leading-relaxed">
                  {item.description}
                </p>
                <div className="text-[11px] font-mono text-muted pt-1">
                  Verified Date: {item.verifiedAt} • Rubric Grade: <strong className="text-black">{item.score}/100</strong>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <a
                  href={item.url || "https://github.com"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-royal-maroon hover:bg-electric-coral hover:text-black text-white font-extrabold text-xs uppercase tracking-wider border border-black transition-colors flex items-center gap-1.5 shadow-editorial-xs"
                >
                  <span>Inspect Source</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
