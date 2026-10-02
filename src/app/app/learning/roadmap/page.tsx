"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Compass,
  ArrowRight,
  CheckCircle2,
  Lock,
  Clock,
  ExternalLink,
  BookOpen,
  Sparkles,
  AlertTriangle,
} from "lucide-react";
import { useCareer } from "@/context/CareerContext";
import { LearningNav } from "@/components/learning/LearningNav";
import { ROUTES } from "@/lib/routes";
import { LearningService } from "@/services/domainServices";

const learningService = new LearningService();

export default function LearningRoadmapPage() {
  const { selectedRole } = useCareer();
  const [roadmap, setRoadmap] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadRoadmap() {
      setLoading(true);
      try {
        const data = await learningService.getRoadmap(selectedRole?.id || "full-stack-developer");
        setRoadmap(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadRoadmap();
  }, [selectedRole]);

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <LearningNav />

      {/* Top Banner */}
      <div className="rounded-2xl bg-royal-maroon text-white border-4 border-black p-6 sm:p-8 shadow-editorial-md flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded bg-black text-electric-coral text-xs font-mono font-black border border-black uppercase tracking-wider">
              Sequenced Progression
            </span>
            <span className="text-xs text-white/90 font-mono uppercase tracking-wider font-extrabold">
              Personalized Career Roadmap
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight uppercase leading-snug">
            {selectedRole?.title || "Full-Stack Developer"} Curriculum Roadmap
          </h1>
          <p className="text-xs sm:text-sm text-white/80 mt-1 font-medium">
            Generated directly from your verified diagnostic evidence, ordering highest priority skill gaps first.
          </p>
        </div>

        <Link href={ROUTES.app.learning.resources}>
          <button className="px-5 py-2.5 bg-electric-coral hover:bg-black hover:text-white text-black border-2 border-black font-black text-xs uppercase tracking-wider transition-colors flex items-center gap-2 cursor-pointer shadow-editorial-xs">
            <span>Free Resources Catalog</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </Link>
      </div>

      {/* Step by Step Timeline */}
      <div className="p-6 sm:p-8 bg-white border-2 border-black shadow-editorial-md space-y-6">
        <div className="flex items-center justify-between border-b border-black/10 pb-4">
          <h2 className="text-sm font-black uppercase tracking-wider text-black flex items-center gap-2">
            <Compass className="w-4 h-4 text-royal-maroon" />
            <span>Optimal Learning Sequence ({roadmap.length} Milestone Modules)</span>
          </h2>
          <span className="text-xs font-mono font-bold text-muted">
            100% Free Legitimate Sources
          </span>
        </div>

        {loading ? (
          <div className="p-8 text-center">
            <div className="w-8 h-8 border-4 border-royal-maroon border-t-transparent rounded-full animate-spin mx-auto mb-2" />
            <p className="text-xs font-bold uppercase tracking-wider text-muted">Sequencing optimal roadmap...</p>
          </div>
        ) : (
          <div className="space-y-4">
            {roadmap.map((step, idx) => (
              <div
                key={step.id || idx}
                className="p-5 bg-paper border-2 border-black shadow-editorial-xs flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-royal-maroon transition-all"
              >
                <div className="flex items-start gap-4">
                  <span className="w-8 h-8 rounded-full bg-royal-maroon text-white font-mono font-bold text-xs flex items-center justify-center shrink-0 border border-black shadow-editorial-xs">
                    {idx + 1}
                  </span>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-base font-black uppercase tracking-tight text-black">
                        {step.title}
                      </h3>
                      <span className="px-2 py-0.5 bg-white text-black border border-black/20 text-[10px] font-mono font-bold uppercase">
                        {step.source}
                      </span>
                      {step.isGapPriority && (
                        <span className="px-2 py-0.5 bg-rose-100 text-rose-900 border border-rose-500 text-[10px] font-black uppercase">
                          Gap Priority
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted max-w-2xl leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-right hidden sm:block">
                    <span className="text-[10px] font-mono text-muted uppercase block">Estimated Time</span>
                    <span className="text-xs font-bold text-black">{step.estimatedHours || 12} hrs</span>
                  </div>

                  <a
                    href={step.url || "https://developer.mozilla.org"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-white hover:bg-royal-maroon hover:text-white text-black border-2 border-black font-extrabold text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5 shadow-editorial-xs"
                  >
                    <span>Start Source</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
