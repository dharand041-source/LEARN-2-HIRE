"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, ArrowRight, BookOpen, RotateCcw } from "lucide-react";
import { useCareer } from "@/context/CareerContext";
import { ImproveNav } from "@/components/improve/ImproveNav";
import { ROUTES } from "@/lib/routes";
import { SkillAnalysisService } from "@/services/domainServices";
import { SkillGapItem } from "@/lib/repositories/types";

const skillAnalysisService = new SkillAnalysisService();

export default function ImproveSkillGapsPage() {
  const { selectedRole } = useCareer();
  const [gaps, setGaps] = useState<SkillGapItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const res = await skillAnalysisService.getSkillGaps(selectedRole?.id || "full-stack-developer");
        setGaps(res.filter((g) => g.gap !== "None"));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [selectedRole]);

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <ImproveNav />

      <div className="rounded-2xl bg-royal-maroon text-white border-4 border-black p-6 sm:p-8 shadow-editorial-md flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span className="px-2.5 py-0.5 rounded bg-black text-electric-coral text-xs font-mono font-black border border-black uppercase tracking-wider">
            Active Deficits
          </span>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight uppercase leading-snug mt-2">
            Targeted Skill Gaps Requiring Remediation
          </h1>
          <p className="text-xs sm:text-sm text-white/80 mt-1">
            Gaps identified from baseline tests or employer feedback. Closing these unlocks higher job matching compatibility.
          </p>
        </div>

        <Link href={ROUTES.app.improve.retraining}>
          <button className="px-5 py-2.5 bg-electric-coral hover:bg-black hover:text-white text-black border-2 border-black font-black text-xs uppercase tracking-wider transition-colors flex items-center gap-2 cursor-pointer shadow-editorial-xs">
            <span>View Retraining Schedule</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </Link>
      </div>

      <div className="space-y-4">
        {loading ? (
          <div className="p-8 text-center bg-white border-2 border-black">
            <p className="text-xs font-bold uppercase text-muted">Loading active gaps...</p>
          </div>
        ) : (
          gaps.map((item) => (
            <div
              key={item.skill}
              className="p-6 bg-white border-2 border-black shadow-editorial-sm flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-royal-maroon transition-all"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-black uppercase text-black">{item.skill}</h3>
                  <span className="px-2 py-0.5 text-[10px] font-black uppercase bg-rose-100 text-rose-900 border border-rose-500">
                    Gap: {item.gap}
                  </span>
                  <span className="px-2 py-0.5 text-[10px] font-mono font-bold uppercase bg-stone-100 border border-black/20">
                    Priority: {item.priority}
                  </span>
                </div>
                <p className="text-xs text-muted">
                  Current Level: <strong className="text-black">{item.currentLevel}</strong> → Required: <strong className="text-royal-maroon">{item.requiredLevel}</strong>
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <Link href={ROUTES.app.learning.roadmap}>
                  <button className="px-4 py-2 bg-royal-maroon hover:bg-electric-coral hover:text-black text-white font-extrabold text-xs uppercase tracking-wider border border-black transition-colors flex items-center gap-1.5 shadow-editorial-xs">
                    <span>Study Module</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
