"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  Globe,
  Layers,
  GraduationCap,
  ExternalLink,
  ShieldCheck,
  Compass,
  AlertTriangle,
} from "lucide-react";
import { useCareer } from "@/context/CareerContext";
import { SUPPORTED_LANGUAGES } from "@/lib/constants";
import { Badge } from "@/components/ui/Badge";
import { LearningNav } from "@/components/learning/LearningNav";
import { ROUTES } from "@/lib/routes";

export default function LearningOverviewPage() {
  const { userProfile, selectedRole, learningModules, setLanguage } = useCareer();
  const [activeTab, setActiveTab] = useState<string>("all");

  const completedModules = learningModules.filter((m) => m.status === "Completed");
  const inProgressModules = learningModules.filter((m) => m.status === "In Progress");

  const totalTrackProgress = Math.round(
    learningModules.reduce((acc, m) => acc + m.progress, 0) / (learningModules.length || 1)
  );

  const filteredModules = learningModules.filter((mod) => {
    if (activeTab === "all") return true;
    if (activeTab === "in_progress") return mod.status === "In Progress";
    if (activeTab === "recommended") return mod.status === "Recommended";
    if (activeTab === "completed") return mod.status === "Completed";
    return true;
  });

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <LearningNav />

      {/* Royal Maroon Hero Section */}
      <div className="rounded-2xl bg-royal-maroon text-white border-4 border-black p-6 sm:p-10 shadow-editorial-md space-y-6">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-black text-electric-coral border-2 border-black text-xs font-mono font-extrabold uppercase tracking-widest">
              <span>Phase 04 // Personalized Curriculum</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold uppercase tracking-tight text-white leading-tight">
              Learning Ecosystem
            </h1>
            <p className="text-white/90 text-sm sm:text-base leading-relaxed">
              Target Track: <strong className="text-electric-coral font-extrabold">{selectedRole.title}</strong> • Sequenced from verified skill gaps using Free & Open Educational Resources.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <div className="flex items-center gap-1.5 px-3 py-2 bg-black text-white border-2 border-electric-coral text-xs shadow-xs">
              <Globe className="w-3.5 h-3.5 text-electric-coral" />
              <span className="text-white/80 font-bold">Language:</span>
              <select
                value={userProfile.selectedLanguage}
                onChange={(e) => setLanguage(e.target.value as any)}
                className="bg-black text-electric-coral font-extrabold text-xs focus:outline-none cursor-pointer"
              >
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code} className="bg-black text-white">
                    {lang.nativeName} ({lang.name})
                  </option>
                ))}
              </select>
            </div>

            <Link href={ROUTES.app.learning.roadmap}>
              <button className="px-5 py-2.5 bg-electric-coral hover:bg-white text-black border-2 border-black font-extrabold text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-editorial-xs">
                <span>View Full Roadmap</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </Link>
          </div>
        </div>

        {/* Quick Stats Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/20">
          <div className="p-4 bg-black/40 border border-white/10">
            <span className="text-[10px] font-mono uppercase tracking-widest text-electric-coral font-bold block">
              Curriculum Progress
            </span>
            <span className="text-2xl font-black text-white">{totalTrackProgress}%</span>
          </div>
          <div className="p-4 bg-black/40 border border-white/10">
            <span className="text-[10px] font-mono uppercase tracking-widest text-electric-coral font-bold block">
              In Progress
            </span>
            <span className="text-2xl font-black text-white">{inProgressModules.length} Modules</span>
          </div>
          <div className="p-4 bg-black/40 border border-white/10">
            <span className="text-[10px] font-mono uppercase tracking-widest text-electric-coral font-bold block">
              Completed
            </span>
            <span className="text-2xl font-black text-white">{completedModules.length} Modules</span>
          </div>
          <div className="p-4 bg-black/40 border border-white/10">
            <span className="text-[10px] font-mono uppercase tracking-widest text-electric-coral font-bold block">
              Target Career
            </span>
            <span className="text-sm font-black text-white truncate block">{selectedRole.title}</span>
          </div>
        </div>
      </div>

      {/* Tabs Filter */}
      <div className="flex items-center justify-between gap-4 flex-wrap bg-white p-4 border-2 border-black shadow-editorial-xs">
        <div className="flex items-center gap-2">
          {["all", "in_progress", "recommended", "completed"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 text-xs font-black uppercase tracking-wider transition-colors cursor-pointer border ${
                activeTab === tab
                  ? "bg-royal-maroon text-white border-black"
                  : "bg-surface-subtle text-muted hover:text-black border-black/20"
              }`}
            >
              {tab.replace("_", " ")}
            </button>
          ))}
        </div>

        <Link href={ROUTES.app.learning.resources}>
          <span className="text-xs font-black text-royal-maroon uppercase tracking-wider hover:underline flex items-center gap-1">
            Browse 100% Free Resources Catalog <ArrowRight className="w-3 h-3" />
          </span>
        </Link>
      </div>

      {/* Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredModules.map((module) => (
          <div
            key={module.id}
            className="p-6 bg-white border-2 border-black shadow-editorial-sm flex flex-col justify-between space-y-4 hover:border-royal-maroon transition-all"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span className="px-2 py-0.5 bg-paper text-black text-[10px] font-mono font-bold uppercase border border-black/20">
                  {module.difficulty}
                </span>
                <span
                  className={`px-2 py-0.5 text-[10px] font-black uppercase border ${
                    module.status === "Completed"
                      ? "bg-emerald-100 text-emerald-900 border-emerald-500"
                      : module.status === "In Progress"
                      ? "bg-amber-100 text-amber-900 border-amber-500"
                      : "bg-stone-100 text-stone-800 border-stone-400"
                  }`}
                >
                  {module.status}
                </span>
              </div>

              <h3 className="text-base font-black uppercase tracking-tight text-black leading-snug">
                {module.title}
              </h3>
              <p className="text-xs text-muted leading-relaxed line-clamp-2">
                {module.description}
              </p>
            </div>

            <div className="space-y-3 pt-2 border-t border-black/10">
              <div className="flex items-center justify-between text-xs font-mono font-bold text-muted">
                <span>{module.estimatedTime}</span>
                <span>{module.progress}% Complete</span>
              </div>

              <div className="w-full h-2 bg-stone-200 border border-black/20 overflow-hidden">
                <div
                  className="h-full bg-royal-maroon"
                  style={{ width: `${module.progress}%` }}
                />
              </div>

              <Link href={ROUTES.app.learning.lessons} className="w-full block">
                <button className="w-full py-2 bg-stone-100 hover:bg-royal-maroon hover:text-white text-black font-extrabold text-xs uppercase tracking-wider border border-black transition-colors flex items-center justify-center gap-1.5 cursor-pointer">
                  <span>Open Module</span>
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
