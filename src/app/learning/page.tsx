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
    <div className="space-y-8 animate-fade-in">
      {/* Header with Track Overview */}
      <div className="border-b border-surface-border pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="champagne" size="sm">Phase 04</Badge>
            <span className="text-xs text-pearl-muted font-mono uppercase tracking-wider">
              Curated Training Track
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-pearl-primary tracking-tight">
            Personalized Learning Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-pearl-muted mt-1">
            Target Track: <strong className="text-pearl-primary">{selectedRole.title}</strong> • Curated with NPTEL, IITs & Official Documentation.
          </p>
        </div>

        {/* Language Quick Selector */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-card border border-surface-border text-xs">
            <Globe className="w-3.5 h-3.5 text-champagne" />
            <span className="text-pearl-muted">Language:</span>
            <select
              value={userProfile.selectedLanguage}
              onChange={(e) => setLanguage(e.target.value as any)}
              className="bg-transparent text-pearl-primary font-semibold text-xs focus:outline-none cursor-pointer"
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code} className="bg-navy-900 text-pearl-primary">
                  {lang.nativeName} ({lang.name})
                </option>
              ))}
            </select>
          </div>

          <Link href="/advanced-assessment">
            <Button variant="secondary" size="sm" className="gap-1.5">
              <span>Advanced Assessment</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Track Metric Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-xl bg-surface-card border border-surface-border space-y-2">
          <div className="flex justify-between items-center text-xs text-pearl-muted">
            <span>Overall Curriculum Progress</span>
            <span className="text-champagne font-mono font-bold">{totalTrackProgress}%</span>
          </div>
          <ProgressBar value={totalTrackProgress} size="sm" variant="champagne" />
          <p className="text-[11px] text-pearl-muted mt-1">
            {completedModules.length} of {learningModules.length} modules completed
          </p>
        </div>

        <div className="p-5 rounded-xl bg-surface-card border border-surface-border flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-lg bg-navy-800 border border-champagne/30 flex items-center justify-center text-champagne">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-pearl-muted">Current Proficiency Level</p>
            <p className="text-sm font-bold text-pearl-primary">Intermediate</p>
            <p className="text-[10px] text-champagne">3 modules to Advanced</p>
          </div>
        </div>

        <div className="p-5 rounded-xl bg-surface-card border border-surface-border flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-lg bg-navy-800 border border-rose/30 flex items-center justify-center text-rose">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-pearl-muted">Priority Recommended Focus</p>
            <p className="text-sm font-bold text-pearl-primary">SQL & PostgreSQL</p>
            <p className="text-[10px] text-rose">Addresses 48% gap</p>
          </div>
        </div>

        <div className="p-5 rounded-xl bg-surface-card border border-surface-border flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-lg bg-navy-800 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Flame className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-pearl-muted">Learning Streak</p>
            <p className="text-sm font-bold text-pearl-primary">{userProfile.streakDays} Days Continuous</p>
            <p className="text-[10px] text-emerald-400">+150 XP bonus active</p>
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
        />

        <div className="text-xs text-pearl-muted">
          Showing <strong className="text-pearl-primary">{filteredModules.length}</strong> modules
        </div>
      </div>

      {/* Learning Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredModules.map((mod) => {
          const isCompleted = mod.status === "Completed";
          const isRecommended = mod.status === "Recommended";
          const isLocked = mod.status === "Locked";

          return (
            <div
              key={mod.id}
              className={`p-5 rounded-xl border flex flex-col justify-between transition-all duration-200 hover:shadow-card-hover ${
                isRecommended
                  ? "bg-surface-card border-rose/40 hover:border-rose"
                  : isCompleted
                  ? "bg-surface-card border-emerald-500/20"
                  : "bg-surface-card border-surface-border hover:border-champagne/40"
              }`}
            >
              <div>
                {/* Module Header */}
                <div className="flex items-center justify-between mb-3">
                  <Badge
                    variant={
                      isCompleted
                        ? "success"
                        : isRecommended
                        ? "rose"
                        : "navy"
                    }
                    size="sm"
                  >
                    {mod.status}
                  </Badge>

                  <span className="text-[11px] text-pearl-muted font-mono flex items-center gap-1">
                    <Clock className="w-3 h-3 text-champagne" /> {mod.estimatedTime}
                  </span>
                </div>

                <h3 className="text-sm font-semibold text-pearl-primary leading-snug mb-1">
                  {mod.title}
                </h3>
                <p className="text-[11px] text-pearl-muted line-clamp-2 leading-relaxed">
                  {mod.description}
                </p>

                {/* Progress Bar */}
                <div className="mt-4 space-y-1">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-pearl-muted">Progress</span>
                    <span className="font-mono text-pearl-primary font-bold">{mod.progress}%</span>
                  </div>
                  <ProgressBar
                    value={mod.progress}
                    size="sm"
                    variant={isCompleted ? "success" : isRecommended ? "rose" : "champagne"}
                  />
                </div>

                {/* Skills tags */}
                <div className="mt-3 flex flex-wrap gap-1">
                  {mod.skillsCovered.slice(0, 3).map((skill, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded bg-navy-950 border border-white/5 text-[10px] font-mono text-pearl-muted"
                    >
                      {skill}
                    </span>
                  ))}
                  {mod.skillsCovered.length > 3 && (
                    <span className="px-1.5 py-0.5 text-[10px] text-pearl-muted">
                      +{mod.skillsCovered.length - 3}
                    </span>
                  )}
                </div>

                {/* Resource Providers */}
                <div className="mt-4 pt-3 border-t border-white/5 space-y-1.5">
                  <p className="text-[10px] uppercase font-semibold text-pearl-muted">
                    Curated Materials:
                  </p>
                  <div className="space-y-1">
                    {mod.resources.slice(0, 2).map((res) => (
                      <div key={res.id} className="flex items-center justify-between text-[11px] text-pearl-muted">
                        <span className="truncate max-w-[190px]">{res.title}</span>
                        <span className="text-[10px] text-champagne font-mono shrink-0">[{res.provider}]</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-5 pt-3 border-t border-white/5">
                <Link href={`/learning/${mod.id}`}>
                  <Button
                    variant={isCompleted ? "secondary" : isRecommended ? "rose" : "primary"}
                    size="sm"
                    className="w-full gap-2 text-xs"
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
