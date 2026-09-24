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
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="border-b border-surface-border pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="champagne" size="sm">Phase 06</Badge>
            <span className="text-xs text-pearl-muted font-mono uppercase tracking-wider">
              Verifiable Evidence Marketplace
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-pearl-primary tracking-tight">
            Production-Grade Real-World Projects
          </h1>
          <p className="text-xs sm:text-sm text-pearl-muted mt-1 max-w-2xl">
            Build, deploy, and defend production-quality full-stack applications. Completed projects undergo strict rubric grading and feed directly into your verified ATS resume.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/problem-solving">
            <Button variant="secondary" size="sm" className="gap-1.5">
              <span>Problem Solving Hub</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Project Portfolio Stats Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-xl bg-surface-card border border-surface-border flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-lg bg-navy-800 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-pearl-muted">Verified Completed Projects</p>
            <p className="text-lg font-bold text-pearl-primary">{completedCount} Production Apps</p>
            <p className="text-[10px] text-champagne">Average Score: 92/100</p>
          </div>
        </div>

        <div className="p-5 rounded-xl bg-surface-card border border-surface-border flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-lg bg-navy-800 border border-champagne/30 flex items-center justify-center text-champagne">
            <FolderGit2 className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-pearl-muted">Active In-Development</p>
            <p className="text-lg font-bold text-pearl-primary">{inProgressCount} Projects Active</p>
            <p className="text-[10px] text-pearl-muted">Escrow Marketplace (65%)</p>
          </div>
        </div>

        <div className="p-5 rounded-xl bg-surface-card border border-surface-border flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-lg bg-navy-800 border border-rose/30 flex items-center justify-center text-rose">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-pearl-muted">Portfolio Readiness Weight</p>
            <p className="text-lg font-bold text-pearl-primary">{userProfile.readinessBreakdown.projects}%</p>
            <p className="text-[10px] text-emerald-400">+8% boost upon submission</p>
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

        <span className="text-xs text-pearl-muted">
          Showing <strong className="text-pearl-primary">{filteredProjects.length}</strong> project specifications
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
              className={`p-6 rounded-2xl border flex flex-col justify-between transition-all duration-200 hover:shadow-card-hover ${
                isCompleted
                  ? "bg-surface-card border-emerald-500/30"
                  : isInProgress
                  ? "bg-surface-card border-champagne/40"
                  : "bg-surface-card border-surface-border hover:border-pearl/30"
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
                            ? "success"
                            : isInProgress
                            ? "champagne"
                            : "navy"
                        }
                        size="sm"
                      >
                        {proj.status}
                      </Badge>
                      <Badge variant="neutral" size="sm">{proj.difficulty}</Badge>
                    </div>
                    <h3 className="text-base font-bold text-pearl-primary leading-snug">
                      {proj.title}
                    </h3>
                  </div>

                  <span className="text-xs text-pearl-muted font-mono flex items-center gap-1 shrink-0">
                    <Clock className="w-3.5 h-3.5 text-champagne" /> {proj.estimatedDuration}
                  </span>
                </div>

                <p className="text-xs text-pearl-muted leading-relaxed">
                  {proj.description}
                </p>

                {/* Progress Bar & Phase */}
                <div className="space-y-1.5 p-3 rounded-lg bg-navy-950 border border-white/5">
                  <div className="flex justify-between text-xs">
                    <span className="text-pearl-muted">Current Phase: <strong className="text-pearl-primary">{proj.currentPhase}</strong></span>
                    <span className="font-mono text-champagne font-bold">{proj.progressPercentage}%</span>
                  </div>
                  <ProgressBar
                    value={proj.progressPercentage}
                    size="sm"
                    variant={isCompleted ? "success" : "champagne"}
                  />
                  <div className="flex items-center justify-between text-[10px] text-pearl-subtle pt-1">
                    <span>{proj.milestones.filter((m) => m.completed).length} of {proj.milestones.length} milestones done</span>
                    {hasEvaluation && (
                      <span className="text-emerald-400 font-bold font-mono">Score: {proj.evaluation?.overallScore}/100</span>
                    )}
                  </div>
                </div>

                {/* Tech Stack Badges */}
                <div className="space-y-1.5">
                  <p className="text-[10px] uppercase font-semibold text-pearl-muted">
                    Technologies & Architecture:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {proj.technologies.map((t, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded bg-navy-900 border border-white/5 text-[10px] font-mono text-pearl-muted"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Links */}
              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between gap-3">
                <Link href={`/projects/${proj.id}`} className="flex-1">
                  <Button
                    variant={isInProgress ? "primary" : isCompleted ? "secondary" : "outline"}
                    size="sm"
                    className="w-full gap-2 text-xs"
                  >
                    <span>{isInProgress ? "Open Workspace" : isCompleted ? "View Submission Specs" : "Start Project"}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </Link>

                {hasEvaluation && (
                  <Link href={`/projects/${proj.id}/evaluation`}>
                    <Button variant="outline" size="sm" className="gap-1.5 text-xs text-champagne border-champagne/30 hover:bg-champagne/10">
                      <Award className="w-3.5 h-3.5" />
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
