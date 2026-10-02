"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Brain,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  BookOpen,
  Code2,
  Layers,
  ShieldCheck,
  Target,
  BarChart3,
  Clock,
  Filter,
} from "lucide-react";
import { useCareer } from "@/context/CareerContext";
import { Badge } from "@/components/ui/Badge";
import { ROUTES } from "@/lib/routes";
import { SkillGapItem } from "@/lib/repositories/types";
import { SkillAnalysisService } from "@/services/domainServices";

const skillAnalysisService = new SkillAnalysisService();

export default function SkillAnalysisPage() {
  const { selectedRole, assessmentResult } = useCareer();
  const [skillGaps, setSkillGaps] = useState<SkillGapItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterPriority, setFilterPriority] = useState<"ALL" | "HIGH" | "MEDIUM" | "LOW">("ALL");

  useEffect(() => {
    async function loadGaps() {
      setLoading(true);
      try {
        const gaps = await skillAnalysisService.getSkillGaps(selectedRole?.id || "full-stack-developer");
        setSkillGaps(gaps);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadGaps();
  }, [selectedRole, assessmentResult]);

  const filteredGaps = skillGaps.filter((g) => {
    if (filterPriority === "ALL") return true;
    return g.priority.toUpperCase() === filterPriority;
  });

  const highPriorityCount = skillGaps.filter((g) => g.priority === "High").length;
  const mediumPriorityCount = skillGaps.filter((g) => g.priority === "Medium").length;
  const closedCount = skillGaps.filter((g) => g.gap === "None").length;

  return (
    <div className="max-w-6xl w-full mx-auto space-y-8 animate-fade-in pb-12">
      {/* Top Banner */}
      <div className="rounded-2xl bg-royal-maroon text-white border-4 border-black p-6 sm:p-8 shadow-editorial-md flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded bg-black text-electric-coral text-xs font-mono font-black border border-black uppercase tracking-wider">
              Central Intelligence
            </span>
            <span className="text-xs text-white/90 font-mono uppercase tracking-wider font-extrabold">
              Skill Gap & Competency Engine
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight uppercase leading-snug">
            {selectedRole?.title || "Full-Stack Developer"} Skill Analysis
          </h1>
          <p className="text-xs sm:text-sm text-white/80 mt-1 font-medium">
            Explainable comparison of your verified evidence against target role industry benchmarks.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <Link href={ROUTES.app.learning.roadmap}>
            <button className="px-6 py-3 rounded-lg bg-electric-coral hover:bg-black hover:text-white text-black border-2 border-black font-black text-xs uppercase tracking-wider transition-colors flex items-center gap-2 cursor-pointer shadow-editorial-sm">
              <span>START PERSONALIZED ROADMAP</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="p-5 bg-white border-2 border-black shadow-editorial-sm space-y-1">
          <span className="text-[10px] font-mono text-muted uppercase tracking-wider font-bold block">
            Competencies Tracked
          </span>
          <span className="text-2xl font-black text-black">{skillGaps.length} Skills</span>
          <span className="text-[11px] text-muted block">Direct role taxonomy</span>
        </div>

        <div className="p-5 bg-white border-2 border-black shadow-editorial-sm space-y-1">
          <span className="text-[10px] font-mono text-royal-maroon uppercase tracking-wider font-bold block">
            High Priority Gaps
          </span>
          <span className="text-2xl font-black text-royal-maroon">{highPriorityCount} Skills</span>
          <span className="text-[11px] text-muted block">Immediate blocker for hiring</span>
        </div>

        <div className="p-5 bg-white border-2 border-black shadow-editorial-sm space-y-1">
          <span className="text-[10px] font-mono text-amber-700 uppercase tracking-wider font-bold block">
            Medium Priority
          </span>
          <span className="text-2xl font-black text-amber-600">{mediumPriorityCount} Skills</span>
          <span className="text-[11px] text-muted block">Reinforce through practice</span>
        </div>

        <div className="p-5 bg-white border-2 border-black shadow-editorial-sm space-y-1">
          <span className="text-[10px] font-mono text-emerald-700 uppercase tracking-wider font-bold block">
            Verified / Closed
          </span>
          <span className="text-2xl font-black text-emerald-700">{closedCount} Skills</span>
          <span className="text-[11px] text-muted block">Sufficient evidence present</span>
        </div>
      </div>

      {/* Controls & Filter Strip */}
      <div className="p-4 bg-white border-2 border-black shadow-editorial-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-black" />
          <span className="text-xs font-black uppercase tracking-wider text-black">Filter Priority:</span>
          <div className="flex items-center gap-1.5 ml-2">
            {(["ALL", "HIGH", "MEDIUM", "LOW"] as const).map((p) => (
              <button
                key={p}
                onClick={() => setFilterPriority(p)}
                className={`px-3 py-1 text-xs font-bold uppercase transition-colors cursor-pointer border ${
                  filterPriority === p
                    ? "bg-royal-maroon text-white border-black"
                    : "bg-surface-subtle text-muted hover:text-black border-black/20"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        <div className="text-xs font-mono font-bold text-muted">
          Showing {filteredGaps.length} of {skillGaps.length} skills
        </div>
      </div>

      {/* Main Skill Matrix Table */}
      <div className="space-y-4">
        {loading ? (
          <div className="p-12 text-center bg-white border-2 border-black">
            <div className="w-8 h-8 border-4 border-royal-maroon border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-xs font-bold uppercase tracking-wider text-muted">Computing explainable skill telemetry...</p>
          </div>
        ) : filteredGaps.length === 0 ? (
          <div className="p-8 text-center bg-white border-2 border-black">
            <p className="text-sm font-bold text-black">No skills match the selected filter.</p>
          </div>
        ) : (
          filteredGaps.map((item) => (
            <div
              key={item.skill}
              className="p-6 bg-white border-2 border-black shadow-editorial-sm hover:border-royal-maroon transition-all space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-black/10 pb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-base font-black uppercase tracking-tight text-black">
                      {item.skill}
                    </h3>
                    <span
                      className={`px-2 py-0.5 text-[10px] font-black uppercase border ${
                        item.priority === "High"
                          ? "bg-rose-100 text-rose-900 border-rose-500"
                          : item.priority === "Medium"
                          ? "bg-amber-100 text-amber-900 border-amber-500"
                          : "bg-stone-100 text-stone-800 border-stone-400"
                      }`}
                    >
                      Priority: {item.priority}
                    </span>
                    <span
                      className={`px-2 py-0.5 text-[10px] font-mono font-bold uppercase border ${
                        item.gap === "Large"
                          ? "bg-rose-50 text-rose-700 border-rose-300"
                          : item.gap === "Moderate"
                          ? "bg-amber-50 text-amber-700 border-amber-300"
                          : item.gap === "Small"
                          ? "bg-blue-50 text-blue-700 border-blue-300"
                          : "bg-emerald-50 text-emerald-700 border-emerald-300"
                      }`}
                    >
                      Gap: {item.gap}
                    </span>
                  </div>
                  <p className="text-xs text-muted">
                    Confidence: <span className="font-bold text-black">{item.confidence}</span> | Evidence: <span className="font-bold text-black">{item.evidence}</span>
                  </p>
                </div>

                <div className="flex items-center gap-4 text-xs">
                  <div className="text-right">
                    <span className="text-[10px] font-mono text-muted uppercase block">Current</span>
                    <span className="font-black text-black">{item.currentLevel}</span>
                  </div>
                  <div className="text-muted font-black">→</div>
                  <div>
                    <span className="text-[10px] font-mono text-muted uppercase block">Required</span>
                    <span className="font-black text-royal-maroon">{item.requiredLevel}</span>
                  </div>
                </div>
              </div>

              {/* Recommendations & Action Plan */}
              <div className="space-y-2">
                <span className="text-[11px] font-mono uppercase tracking-wider text-muted font-bold block">
                  Recommended Action Plan:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
                  {item.recommendedActions.map((action, aIdx) => (
                    <div
                      key={aIdx}
                      className="p-2.5 bg-paper border border-black/20 text-xs font-semibold text-black flex items-center gap-2"
                    >
                      <span className="w-4 h-4 rounded-full bg-royal-maroon text-white text-[10px] font-mono flex items-center justify-center shrink-0">
                        {aIdx + 1}
                      </span>
                      <span className="truncate">{action.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Bottom CTA Card */}
      <div className="p-8 bg-stone-900 text-white border-4 border-black shadow-editorial-md flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <h3 className="text-lg font-black uppercase tracking-tight text-white">
            Ready to Close These Skill Gaps?
          </h3>
          <p className="text-xs text-white/80 max-w-xl">
            Your personalized learning roadmap sequences topics in direct order of urgency, prioritizing high-impact gaps first with free, accredited resources.
          </p>
        </div>

        <Link href={ROUTES.app.learning.roadmap}>
          <button className="px-8 py-3.5 bg-electric-coral hover:bg-white text-black font-black text-xs uppercase tracking-wider transition-colors border-2 border-black shadow-editorial-sm flex items-center gap-2 whitespace-nowrap cursor-pointer">
            <span>START PERSONALIZED ROADMAP</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </Link>
      </div>
    </div>
  );
}
