"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FileCode, ExternalLink, CheckCircle2 } from "lucide-react";
import { SkillProofNav } from "@/components/skill-proof/SkillProofNav";
import { EvidenceService } from "@/services/domainServices";

const evidenceService = new EvidenceService();

export default function SkillProofEvidencePage() {
  const [evidence, setEvidence] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      const data = await evidenceService.getAll();
      setEvidence(data);
    }
    load();
  }, []);

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <SkillProofNav />

      <div className="rounded-2xl bg-royal-maroon text-white border-4 border-black p-6 sm:p-8 shadow-editorial-md flex items-center justify-between">
        <div>
          <span className="px-2.5 py-0.5 rounded bg-black text-electric-coral text-xs font-mono font-black border border-black uppercase tracking-wider">
            Evidence Vault
          </span>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight uppercase leading-snug mt-2">
            Verifiable Code Artifacts & Evidence
          </h1>
          <p className="text-xs sm:text-sm text-white/80 mt-1">
            Raw diagnostic telemetry, git hashes, and pull requests verified through rubric assessment.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {evidence.map((item) => (
          <div key={item.id} className="p-5 bg-white border-2 border-black shadow-editorial-sm flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-royal-maroon font-bold uppercase">{item.skill} • {item.evidenceType}</span>
              <h3 className="text-sm font-black uppercase text-black">{item.title}</h3>
              <p className="text-xs text-muted">{item.description}</p>
            </div>
            <a href={item.url || "https://github.com"} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-royal-maroon hover:bg-electric-coral hover:text-black text-white text-xs font-bold uppercase flex items-center gap-1.5 shadow-editorial-xs">
              <span>View Artifact</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
