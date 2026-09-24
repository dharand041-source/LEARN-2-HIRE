"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FolderGit2,
  Clock,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
  Github,
  Award,
  Sparkles,
  Layers,
  ChevronRight,
  Code2,
} from "lucide-react";
import { useCareer } from "@/context/CareerContext";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Tabs } from "@/components/ui/Tabs";

export default function ProjectsDashboardPage() {
  const { projects, userProfile } = useCareer();
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const completedCount = projects.filter((p) => p.status === "Completed").length;
  const inProgressCount = projects.filter((p) => p.status === "In Progress").length;

  const filteredProjects = projects.filter((p) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "in_progress") return p.status === "In Progress";
    if (activeFilter === "completed") return p.status === "Completed";
    if (activeFilter === "not_started") return p.status === "Not Started";
    return true;
  });

  return (
    <div className="space-y-8 animate-fade-in bg-white">
      {/* Header */}
      <div className="border-b border-border pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="imperial" size="sm">Phase 06</Badge>
            <span className="text-xs text-muted font-mono uppercase tracking-wider font-bold">
              Verifiable Evidence Marketplace
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-night tracking-tight uppercase">
            Production-Grade Real-World Projects
          </h1>
          <p className="text-xs sm:text-sm text-muted mt-1 max-w-2xl">
            Build, deploy, and defend production-quality full-stack applications. Completed projects undergo strict rubric grading and feed directly into your verified ATS resume.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/problem-solving">
            <Button variant="secondary" size="sm" className="gap-1.5 font-bold">
              <span>Problem Solving Hub</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Project Portfolio Stats Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-xl bg-white border border-border flex items-center gap-3.5 shadow-sm">
          <div className="w-10 h-10 rounded-lg bg-surface-subtle border border-border flex items-center justify-center text-night">
            <CheckCircle2 className="w-5 h-5 text-imperial" />
          </div>
          <div>
            <p className="text-xs text-muted font-medium">Verified Completed Projects</p>
            <p className="text-lg font-extrabold text-night">{completedCount} Production Apps</p>
            <p className="text-[10px] text-imperial font-bold">Average Score: 92/100</p>
          </div>
        </div>

        <div className="p-5 rounded-xl bg-white border border-border flex items-center gap-3.5 shadow-sm">
          <div className="w-10 h-10 rounded-lg bg-surface-subtle border border-border flex items-center justify-center text-imperial">
            <FolderGit2 className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-muted font-medium">Active In-Development</p>
            <p className="text-lg font-extrabold text-night">{inProgressCount} Projects Active</p>
            <p className="text-[10px] text-muted font-semibold">Escrow Marketplace (65%)</p>
          </div>
        </div>

        <div className="p-5 rounded-xl bg-white border border-border flex items-center gap-3.5 shadow-sm">
          <div className="w-10 h-10 rounded-lg bg-surface-subtle border border-border flex items-center justify-center text-imperial">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-muted font-medium">Portfolio Readiness Weight</p>
            <p className="text-lg font-extrabold text-night">{userProfile.readinessBreakdown.projects}%</p>
            <p className="text-[10px] text-night font-bold">+8% boost upon submission</p>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <Tabs
          tabs={[
            { id: "all", label: "All Projects", count: projects.length },
            { id: "in_progress", label: "In Progress", count: inProgressCount },
            { id: "completed", label: "Completed & Evaluated", count: completedCount },
            { id: "not_started", label: "Available to Build", count: projects.filter((p) => p.status === "Not Started").length },
          ]}
          activeTab={activeFilter}
          onChange={setActiveFilter}
        />

        <span className="text-xs text-muted font-medium">
          Showing <strong className="text-night">{filteredProjects.length}</strong> project specifications
        </span>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredProjects.map((proj) => {
          const isCompleted = proj.status === "Completed";
          const isInProgress = proj.status === "In Progress";
          const hasEvaluation = !!proj.evaluation;

          return (
            <div
              key={proj.id}
              className={`p-6 rounded-2xl border flex flex-col justify-between transition-all duration-200 hover:shadow-card-hover bg-white ${
                isCompleted
                  ? "border-border"
                  : isInProgress
                  ? "border-imperial/50 hover:border-imperial shadow-sm"
                  : "border-border hover:border-imperial"
              }`}
            >
              <div className="space-y-4">
                {/* Card Header */}
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={
                          isCompleted
                            ? "night"
                            : isInProgress
                            ? "imperial"
                            : "neutral"
                        }
                        size="sm"
                      >
                        {proj.status}
                      </Badge>
                      <Badge variant="neutral" size="sm">{proj.difficulty}</Badge>
                    </div>
                    <h3 className="text-base font-extrabold text-night leading-snug">
                      {proj.title}
                    </h3>
                  </div>

                  <span className="text-xs text-muted font-mono flex items-center gap-1 shrink-0 font-semibold">
                    <Clock className="w-3.5 h-3.5 text-imperial" /> {proj.estimatedDuration}
                  </span>
                </div>

                <p className="text-xs text-muted leading-relaxed font-medium">
                  {proj.description}
                </p>

                {/* Progress Bar & Phase */}
                <div className="space-y-1.5 p-3.5 rounded-lg bg-surface-subtle border border-border">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted font-medium">Current Phase: <strong className="text-night">{proj.currentPhase}</strong></span>
                    <span className="font-mono text-imperial font-extrabold">{proj.progressPercentage}%</span>
                  </div>
                  <ProgressBar
                    value={proj.progressPercentage}
                    size="sm"
                    variant="imperial"
                  />
                  <div className="flex items-center justify-between text-[10px] text-muted pt-1 font-semibold">
                    <span>{proj.milestones.filter((m) => m.completed).length} of {proj.milestones.length} milestones done</span>
                    {hasEvaluation && (
                      <span className="text-night font-bold font-mono">Score: {proj.evaluation?.overallScore}/100</span>
                    )}
                  </div>
                </div>

                {/* Tech Stack Badges */}
                <div className="space-y-1.5">
                  <p className="text-[10px] uppercase font-bold text-night">
                    Technologies & Architecture:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {proj.technologies.map((t, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded bg-surface-subtle border border-border text-[10px] font-mono font-semibold text-night"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Links */}
              <div className="mt-6 pt-4 border-t border-border flex items-center justify-between gap-3">
                <Link href={`/projects/${proj.id}`} className="flex-1">
                  <Button
                    variant={isInProgress ? "primary" : isCompleted ? "secondary" : "secondary"}
                    size="sm"
                    className="w-full gap-2 text-xs font-bold shadow-sm"
                  >
                    <span>{isInProgress ? "Open Workspace" : isCompleted ? "View Submission Specs" : "Start Project"}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </Link>

                {hasEvaluation && (
                  <Link href={`/projects/${proj.id}/evaluation`}>
                    <Button variant="secondary" size="sm" className="gap-1.5 text-xs text-night font-bold">
                      <Award className="w-3.5 h-3.5 text-imperial" />
                      <span>Evaluation ({proj.evaluation?.overallScore})</span>
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
