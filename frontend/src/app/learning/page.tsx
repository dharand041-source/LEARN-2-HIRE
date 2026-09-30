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
  Lock,
  Flame,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";
import { useCareer } from "@/context/CareerContext";
import { SUPPORTED_LANGUAGES } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Tabs } from "@/components/ui/Tabs";

export default function LearningDashboardPage() {
  const { userProfile, selectedRole, learningModules, setLanguage } = useCareer();
  const [activeTab, setActiveTab] = useState<string>("all");

  const completedModules = learningModules.filter((m) => m.status === "Completed");
  const inProgressModules = learningModules.filter((m) => m.status === "In Progress");
  const recommendedModules = learningModules.filter((m) => m.status === "Recommended");

  // Calculate overall track progress
  const totalTrackProgress = Math.round(
    learningModules.reduce((acc, m) => acc + m.progress, 0) / learningModules.length
  );

  const filteredModules = learningModules.filter((mod) => {
    if (activeTab === "all") return true;
    if (activeTab === "in_progress") return mod.status === "In Progress";
    if (activeTab === "recommended") return mod.status === "Recommended";
    if (activeTab === "completed") return mod.status === "Completed";
    return true;
  });

  const currentLang = SUPPORTED_LANGUAGES.find((l) => l.code === userProfile.selectedLanguage) || SUPPORTED_LANGUAGES[0];

  return (
    <div className="space-y-8 animate-fade-in bg-white">
      {/* Ultra Violet Learning Hero Section */}
      <div className="rounded-2xl bg-ultra-violet text-white border-4 border-black p-8 sm:p-10 shadow-editorial-md space-y-6">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-black text-acid-yellow border-2 border-black text-xs font-mono font-extrabold uppercase tracking-widest">
              <span>Phase 04 // Curated Track</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold uppercase tracking-tight text-white leading-tight">
              Personalized Learning Dashboard
            </h1>
            <p className="text-white/90 text-sm sm:text-base leading-relaxed">
              Target Track: <strong className="text-acid-yellow font-extrabold">{selectedRole.title}</strong> • Curated with NPTEL, IITs & Official Documentation.
            </p>
          </div>

          {/* Language Quick Selector & Navigation */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <div className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-black text-white border-2 border-acid-yellow text-xs shadow-xs">
              <Globe className="w-3.5 h-3.5 text-acid-yellow" />
              <span className="text-white/80 font-bold">Language:</span>
              <select
                value={userProfile.selectedLanguage}
                onChange={(e) => setLanguage(e.target.value as any)}
                className="bg-black text-acid-yellow font-extrabold text-xs focus:outline-none cursor-pointer"
              >
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code} className="bg-black text-white">
                    {lang.nativeName} ({lang.name})
                  </option>
                ))}
              </select>
            </div>

            <Link href="/advanced-assessment">
              <button className="px-4 py-2.5 rounded-lg bg-acid-yellow hover:bg-white text-black border-2 border-black font-extrabold text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-editorial-xs">
                <span>Advanced Assessment</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </Link>
          </div>
        </div>

        {/* Embedded Curriculum Progress Bar */}
        <div className="p-4 rounded-xl bg-black border-2 border-acid-yellow text-white space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="text-white/80 font-extrabold uppercase tracking-wider font-mono">Curriculum Completion Rate</span>
            <span className="text-acid-yellow font-mono font-black text-base">{totalTrackProgress}%</span>
          </div>
          <ProgressBar value={totalTrackProgress} size="md" variant="acid-yellow" />
          <div className="flex justify-between text-[11px] text-white/70 font-mono font-bold pt-1">
            <span>{completedModules.length} of {learningModules.length} verified modules finished</span>
            <span className="text-acid-yellow">{learningModules.length - completedModules.length} modules remaining</span>
          </div>
        </div>
      </div>

      {/* Track Metric Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-xl bg-white border border-border border-l-4 border-l-acid-yellow space-y-2 shadow-card-clean">
          <div className="flex justify-between items-center text-xs text-muted font-bold">
            <span>Overall Curriculum Progress</span>
            <span className="text-foreground font-mono font-extrabold">{totalTrackProgress}%</span>
          </div>
          <ProgressBar value={totalTrackProgress} size="sm" variant="acid-yellow" />
          <p className="text-[11px] text-muted mt-1 font-medium">
            {completedModules.length} of {learningModules.length} modules completed
          </p>
        </div>

        <div className="p-5 rounded-xl bg-white border border-border border-l-4 border-l-acid-yellow flex items-center gap-3.5 shadow-card-clean">
          <div className="w-10 h-10 rounded-lg bg-acid-yellow text-foreground flex items-center justify-center font-bold">
            <Sparkles className="w-5 h-5 text-foreground" />
          </div>
          <div>
            <p className="text-xs text-muted font-bold">Current Proficiency Level</p>
            <p className="text-sm font-extrabold text-foreground">Intermediate</p>
            <p className="text-[10px] text-foreground font-extrabold font-mono">3 modules to Advanced</p>
          </div>
        </div>

        <div className="p-5 rounded-xl bg-white border border-border border-l-4 border-l-acid-yellow flex items-center gap-3.5 shadow-card-clean">
          <div className="w-10 h-10 rounded-lg bg-acid-yellow text-foreground flex items-center justify-center font-bold">
            <GraduationCap className="w-5 h-5 text-foreground" />
          </div>
          <div>
            <p className="text-xs text-muted font-bold">Priority Recommended Focus</p>
            <p className="text-sm font-extrabold text-foreground">SQL & PostgreSQL</p>
            <p className="text-[10px] text-fire-red font-bold font-mono">Addresses 48% gap</p>
          </div>
        </div>

        <div className="p-5 rounded-xl bg-white border border-border border-l-4 border-l-acid-yellow flex items-center gap-3.5 shadow-card-clean">
          <div className="w-10 h-10 rounded-lg bg-surface border border-border flex items-center justify-center text-foreground font-bold">
            <Flame className="w-5 h-5 text-fire-red" />
          </div>
          <div>
            <p className="text-xs text-muted font-bold">Learning Streak</p>
            <p className="text-sm font-extrabold text-foreground">{userProfile.streakDays} Days Continuous</p>
            <p className="text-[10px] text-foreground font-bold">+150 XP bonus active</p>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <Tabs
          tabs={[
            { id: "all", label: "All Modules", count: learningModules.length },
            { id: "in_progress", label: "In Progress", count: inProgressModules.length },
            { id: "recommended", label: "Recommended", count: recommendedModules.length },
            { id: "completed", label: "Completed", count: completedModules.length },
          ]}
          activeTab={activeTab}
          onChange={setActiveTab}
          accent="acid-yellow"
        />

        <div className="text-xs text-muted font-bold">
          Showing <strong className="text-foreground">{filteredModules.length}</strong> modules
        </div>
      </div>

      {/* Learning Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredModules.map((mod) => {
          const isCompleted = mod.status === "Completed";
          const isRecommended = mod.status === "Recommended";

          return (
            <div
              key={mod.id}
              className={`p-5 rounded-xl border flex flex-col justify-between transition-all duration-150 bg-white ${
                isRecommended
                  ? "border-2 border-foreground shadow-editorial-sm border-l-8 border-l-acid-yellow"
                  : isCompleted
                  ? "border-border shadow-card-clean"
                  : "border-border hover:border-foreground shadow-card-clean hover:shadow-editorial-sm"
              }`}
            >
              <div>
                {/* Module Header */}
                <div className="flex items-center justify-between mb-3">
                  <Badge
                    variant={
                      isCompleted
                        ? "night"
                        : isRecommended
                        ? "acid-yellow"
                        : "neutral"
                    }
                    size="sm"
                  >
                    {mod.status}
                  </Badge>

                  <span className="text-[11px] text-muted font-mono font-bold flex items-center gap-1">
                    <Clock className="w-3 h-3 text-foreground" /> {mod.estimatedTime}
                  </span>
                </div>

                <h3 className="text-sm font-extrabold text-foreground leading-snug mb-1">
                  {mod.title}
                </h3>
                <p className="text-[11px] text-muted line-clamp-2 leading-relaxed font-normal">
                  {mod.description}
                </p>

                {/* Progress Bar */}
                <div className="mt-4 space-y-1">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-muted font-bold">Progress</span>
                    <span className="font-mono text-foreground font-extrabold">{mod.progress}%</span>
                  </div>
                  <ProgressBar
                    value={mod.progress}
                    size="sm"
                    variant="acid-yellow"
                  />
                </div>

                {/* Skills tags */}
                <div className="mt-3 flex flex-wrap gap-1">
                  {mod.skillsCovered.slice(0, 3).map((skill, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded bg-surface border border-border text-[10px] font-mono font-bold text-foreground"
                    >
                      {skill}
                    </span>
                  ))}
                  {mod.skillsCovered.length > 3 && (
                    <span className="px-1.5 py-0.5 text-[10px] text-muted font-bold">
                      +{mod.skillsCovered.length - 3}
                    </span>
                  )}
                </div>

                {/* Resource Providers */}
                <div className="mt-4 pt-3 border-t border-border space-y-1.5">
                  <p className="text-[10px] uppercase font-bold text-foreground tracking-wider">
                    Curated Materials:
                  </p>
                  <div className="space-y-1">
                    {mod.resources.slice(0, 2).map((res) => (
                      <div key={res.id} className="flex items-center justify-between text-[11px] text-muted">
                        <span className="truncate max-w-[190px] font-medium">{res.title}</span>
                        <span className="text-[10px] text-foreground font-mono font-bold shrink-0">[{res.provider}]</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-5 pt-3 border-t border-border">
                <Link href={`/learning/${mod.id}`}>
                  <Button
                    variant={isCompleted ? "secondary" : "primary"}
                    size="sm"
                    className="w-full gap-2 text-xs font-extrabold shadow-sm"
                  >
                    <span>{isCompleted ? "Review Curriculum" : isRecommended ? "Start Required Module" : "Continue Learning"}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
