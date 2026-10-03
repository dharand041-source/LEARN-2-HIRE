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

      {/* Rose Hero Section */}
      <div className="rounded-2xl bg-rose text-paper-white border-4 border-ink-black p-6 sm:p-10 shadow-editorial-md space-y-6">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-ink-black text-paper-white border-2 border-ink-black text-xs font-mono font-extrabold uppercase tracking-widest">
              <span>Phase 04 // Personalized Curriculum</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold uppercase tracking-tight text-paper-white leading-tight">
              Learning Ecosystem
            </h1>
            <p className="text-paper-white/95 text-sm sm:text-base leading-relaxed">
              Target Track: <strong className="text-golden-yellow font-extrabold">{selectedRole.title}</strong> • Sequenced from verified skill gaps using Free & Open Educational Resources.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <div className="flex items-center gap-1.5 px-3 py-2 bg-ink-black text-paper-white border-2 border-ink-black text-xs shadow-xs">
              <Globe className="w-3.5 h-3.5 text-golden-yellow" />
              <span className="text-paper-white/80 font-bold">Language:</span>
              <select
                value={userProfile.selectedLanguage}
                onChange={(e) => setLanguage(e.target.value as any)}
                className="bg-ink-black text-golden-yellow font-extrabold text-xs focus:outline-none cursor-pointer"
              >
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code} className="bg-ink-black text-paper-white">
                    {lang.nativeName} ({lang.name})
                  </option>
                ))}
              </select>
            </div>

            <Link href={ROUTES.app.learning.roadmap}>
              <button className="px-5 py-2.5 bg-primary-orange hover:bg-paper-white hover:text-ink-black text-paper-white border-2 border-ink-black font-extrabold text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-editorial-xs">
                <span>View Full Roadmap</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </Link>
          </div>
        </div>

        {/* Quick Stats Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-paper-white/20">
          <div className="p-4 bg-ink-black/25 border border-paper-white/20">
            <span className="text-[10px] font-mono uppercase tracking-widest text-paper-white/80 font-bold block">
              Curriculum Progress
            </span>
            <span className="text-2xl font-black text-golden-yellow">{totalTrackProgress}%</span>
          </div>
          <div className="p-4 bg-ink-black/25 border border-paper-white/20">
            <span className="text-[10px] font-mono uppercase tracking-widest text-paper-white/80 font-bold block">
              In Progress
            </span>
            <span className="text-2xl font-black text-paper-white">{inProgressModules.length} Modules</span>
          </div>
          <div className="p-4 bg-ink-black/25 border border-paper-white/20">
            <span className="text-[10px] font-mono uppercase tracking-widest text-paper-white/80 font-bold block">
              Completed
            </span>
            <span className="text-2xl font-black text-golden-yellow">{completedModules.length} Modules</span>
          </div>
          <div className="p-4 bg-ink-black/25 border border-paper-white/20">
            <span className="text-[10px] font-mono uppercase tracking-widest text-paper-white/80 font-bold block">
              Target Career
            </span>
            <span className="text-sm font-black text-paper-white truncate block">{selectedRole.title}</span>
          </div>
        </div>
      </div>

      {/* Tabs Filter */}
      <div className="flex items-center justify-between gap-4 flex-wrap bg-paper-white p-4 border-2 border-ink-black shadow-editorial-xs">
        <div className="flex items-center gap-2">
          {["all", "in_progress", "recommended", "completed"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 text-xs font-black uppercase tracking-wider transition-colors cursor-pointer border ${
                activeTab === tab
                  ? "bg-rose text-paper-white border-ink-black"
                  : "bg-warm-cream text-ink-black hover:bg-soft-pink border-ink-black/20"
              }`}
            >
              {tab.replace("_", " ")}
            </button>
          ))}
        </div>

        <Link href={ROUTES.app.learning.resources}>
          <span className="text-xs font-black text-primary-orange uppercase tracking-wider hover:underline flex items-center gap-1">
            Browse 100% Free Resources Catalog <ArrowRight className="w-3 h-3" />
          </span>
        </Link>
      </div>

      {/* Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredModules.map((module) => (
          <div
            key={module.id}
            className="p-6 bg-paper-white border-2 border-ink-black shadow-editorial-sm flex flex-col justify-between space-y-4 hover:border-primary-orange transition-all text-ink-black"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span className="px-2 py-0.5 bg-warm-cream text-ink-black text-[10px] font-mono font-bold uppercase border border-ink-black/20">
                  {module.difficulty}
                </span>
                <span
                  className={`px-2 py-0.5 text-[10px] font-black uppercase border ${
                    module.status === "Completed"
                      ? "bg-golden-yellow text-ink-black border-ink-black"
                      : module.status === "In Progress"
                      ? "bg-soft-pink text-ink-black border-ink-black"
                      : "bg-warm-cream text-ink-black border-ink-black/20"
                  }`}
                >
                  {module.status}
                </span>
              </div>

              <h3 className="text-base font-black uppercase tracking-tight text-ink-black leading-snug">
                {module.title}
              </h3>
              <p className="text-xs text-ink-black/75 leading-relaxed line-clamp-2">
                {module.description}
              </p>
            </div>

            <div className="space-y-3 pt-2 border-t border-ink-black/10">
              <div className="flex items-center justify-between text-xs font-mono font-bold text-ink-black/70">
                <span>{module.estimatedTime}</span>
                <span>{module.progress}% Complete</span>
              </div>

              <div className="w-full h-2 bg-warm-cream border border-ink-black/20 overflow-hidden">
                <div
                  className="h-full bg-rose"
                  style={{ width: `${module.progress}%` }}
                />
              </div>

              <Link href={ROUTES.app.learning.lessons} className="w-full block">
                <button className="w-full py-2 bg-paper-white hover:bg-primary-orange hover:text-paper-white text-ink-black font-extrabold text-xs uppercase tracking-wider border-2 border-ink-black transition-colors flex items-center justify-center gap-1.5 cursor-pointer">
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
