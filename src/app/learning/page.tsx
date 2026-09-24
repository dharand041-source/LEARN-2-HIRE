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
      {/* Header with Track Overview */}
      <div className="border-b border-border pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="imperial" size="sm">Phase 04</Badge>
            <span className="text-xs text-muted font-mono uppercase tracking-wider font-bold">
              Curated Training Track
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-night tracking-tight uppercase">
            Personalized Learning Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-muted mt-1">
            Target Track: <strong className="text-night font-bold">{selectedRole.title}</strong> • Curated with NPTEL, IITs & Official Documentation.
          </p>
        </div>

        {/* Language Quick Selector */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-border text-xs shadow-sm">
            <Globe className="w-3.5 h-3.5 text-imperial" />
            <span className="text-muted font-medium">Language:</span>
            <select
              value={userProfile.selectedLanguage}
              onChange={(e) => setLanguage(e.target.value as any)}
              className="bg-transparent text-night font-bold text-xs focus:outline-none cursor-pointer"
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code} className="bg-white text-night">
                  {lang.nativeName} ({lang.name})
                </option>
              ))}
            </select>
          </div>

          <Link href="/advanced-assessment">
            <Button variant="secondary" size="sm" className="gap-1.5 font-bold">
              <span>Advanced Assessment</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Track Metric Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-xl bg-white border border-border space-y-2 shadow-sm">
          <div className="flex justify-between items-center text-xs text-muted font-medium">
            <span>Overall Curriculum Progress</span>
            <span className="text-imperial font-mono font-extrabold">{totalTrackProgress}%</span>
          </div>
          <ProgressBar value={totalTrackProgress} size="sm" variant="imperial" />
          <p className="text-[11px] text-muted mt-1 font-semibold">
            {completedModules.length} of {learningModules.length} modules completed
          </p>
        </div>

        <div className="p-5 rounded-xl bg-white border border-border flex items-center gap-3.5 shadow-sm">
          <div className="w-10 h-10 rounded-lg bg-surface-subtle border border-border flex items-center justify-center text-imperial">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-muted font-medium">Current Proficiency Level</p>
            <p className="text-sm font-extrabold text-night">Intermediate</p>
            <p className="text-[10px] text-imperial font-bold">3 modules to Advanced</p>
          </div>
        </div>

        <div className="p-5 rounded-xl bg-white border border-border flex items-center gap-3.5 shadow-sm">
          <div className="w-10 h-10 rounded-lg bg-surface-subtle border border-border flex items-center justify-center text-imperial">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-muted font-medium">Priority Recommended Focus</p>
            <p className="text-sm font-extrabold text-night">SQL & PostgreSQL</p>
            <p className="text-[10px] text-imperial font-bold">Addresses 48% gap</p>
          </div>
        </div>

        <div className="p-5 rounded-xl bg-white border border-border flex items-center gap-3.5 shadow-sm">
          <div className="w-10 h-10 rounded-lg bg-surface-subtle border border-border flex items-center justify-center text-imperial">
            <Flame className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-muted font-medium">Learning Streak</p>
            <p className="text-sm font-extrabold text-night">{userProfile.streakDays} Days Continuous</p>
            <p className="text-[10px] text-night font-bold">+150 XP bonus active</p>
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

        <div className="text-xs text-muted font-medium">
          Showing <strong className="text-night">{filteredModules.length}</strong> modules
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
              className={`p-5 rounded-xl border flex flex-col justify-between transition-all duration-200 hover:shadow-card-hover bg-white ${
                isRecommended
                  ? "border-imperial/50 hover:border-imperial shadow-sm"
                  : isCompleted
                  ? "border-border"
                  : "border-border hover:border-imperial"
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
                        ? "imperial"
                        : "neutral"
                    }
                    size="sm"
                  >
                    {mod.status}
                  </Badge>

                  <span className="text-[11px] text-muted font-mono font-semibold flex items-center gap-1">
                    <Clock className="w-3 h-3 text-imperial" /> {mod.estimatedTime}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-night leading-snug mb-1">
                  {mod.title}
                </h3>
                <p className="text-[11px] text-muted line-clamp-2 leading-relaxed">
                  {mod.description}
                </p>

                {/* Progress Bar */}
                <div className="mt-4 space-y-1">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-muted font-medium">Progress</span>
                    <span className="font-mono text-night font-bold">{mod.progress}%</span>
                  </div>
                  <ProgressBar
                    value={mod.progress}
                    size="sm"
                    variant="imperial"
                  />
                </div>

                {/* Skills tags */}
                <div className="mt-3 flex flex-wrap gap-1">
                  {mod.skillsCovered.slice(0, 3).map((skill, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded bg-surface-subtle border border-border text-[10px] font-mono font-semibold text-night"
                    >
                      {skill}
                    </span>
                  ))}
                  {mod.skillsCovered.length > 3 && (
                    <span className="px-1.5 py-0.5 text-[10px] text-muted font-semibold">
                      +{mod.skillsCovered.length - 3}
                    </span>
                  )}
                </div>

                {/* Resource Providers */}
                <div className="mt-4 pt-3 border-t border-border space-y-1.5">
                  <p className="text-[10px] uppercase font-bold text-night">
                    Curated Materials:
                  </p>
                  <div className="space-y-1">
                    {mod.resources.slice(0, 2).map((res) => (
                      <div key={res.id} className="flex items-center justify-between text-[11px] text-muted">
                        <span className="truncate max-w-[190px] font-medium">{res.title}</span>
                        <span className="text-[10px] text-imperial font-mono font-bold shrink-0">[{res.provider}]</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-5 pt-3 border-t border-border">
                <Link href={`/learning/${mod.id}`}>
                  <Button
                    variant={isCompleted ? "secondary" : isRecommended ? "primary" : "primary"}
                    size="sm"
                    className="w-full gap-2 text-xs font-bold shadow-sm"
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
