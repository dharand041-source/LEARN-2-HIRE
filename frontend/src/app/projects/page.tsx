"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FolderGit2,
  Clock,
  CheckCircle2,
  ArrowRight,
  Award,
} from "lucide-react";
import { useCareer } from "@/context/CareerContext";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Tabs } from "@/components/ui/Tabs";
import { SectionHeader } from "@/components/ui/SectionHeader";

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
    <div className="space-y-8 animate-fade-in bg-background text-foreground min-h-screen">
      {/* Deep Navy Hero Section */}
      <div className="rounded-2xl bg-deep-navy text-white border-4 border-black p-8 sm:p-10 shadow-editorial-md space-y-6">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-white/10 border border-honey-gold/40 text-honey-gold text-xs font-mono font-extrabold uppercase tracking-widest">
              <span>Phase 06 // Production Evidence</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold uppercase tracking-tight text-white leading-tight">
              Production-Grade Real-World Projects
            </h1>
            <p className="text-white/80 text-sm sm:text-base leading-relaxed">
              Build, deploy, and defend production-grade full-stack applications. Completed projects undergo strict rubric grading and feed directly into verified ATS resumes.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <Link href="/problem-solving">
              <button className="px-5 py-3 rounded-lg bg-honey-gold hover:bg-electric-yellow text-black border-2 border-black font-extrabold text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-editorial-sm">
                <span>Problem Solving Hub</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>
        </div>

        {/* Hero Embedded Stats Bar (Honey Gold & White Accents) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/20">
          <div className="p-4 rounded-xl bg-black border-2 border-honey-gold text-white flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-honey-gold text-black flex items-center justify-center shrink-0 font-bold">
              <CheckCircle2 className="w-6 h-6 text-black" />
            </div>
            <div>
              <p className="text-[10px] text-white/70 uppercase font-mono font-bold tracking-wider">Verified Projects</p>
              <p className="text-xl font-extrabold text-honey-gold font-mono">{completedCount} Production Apps</p>
              <p className="text-[10px] text-white/80 font-bold font-mono">Average Rubric: 92/100</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-black border-2 border-white/40 text-white flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-white/10 text-white border border-white/20 flex items-center justify-center shrink-0 font-bold">
              <FolderGit2 className="w-6 h-6 text-electric-yellow" />
            </div>
            <div>
              <p className="text-[10px] text-white/70 uppercase font-mono font-bold tracking-wider">Active Development</p>
              <p className="text-xl font-extrabold text-electric-yellow font-mono">{inProgressCount} Projects Active</p>
              <p className="text-[10px] text-white/70 font-mono font-bold">Escrow Verification Phase</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-black border-2 border-honey-gold text-white flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-honey-gold text-black flex items-center justify-center shrink-0 font-bold">
              <Award className="w-6 h-6 text-black" />
            </div>
            <div>
              <p className="text-[10px] text-white/70 uppercase font-mono font-bold tracking-wider">Readiness Weight</p>
              <p className="text-xl font-extrabold text-honey-gold font-mono">{userProfile.readinessBreakdown.projects}%</p>
              <p className="text-[10px] text-white/80 font-bold font-mono">+8% boost on milestone</p>
            </div>
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
          accent="navy"
        />

        <span className="text-xs text-muted-foreground font-mono font-bold">
          Showing <strong className="text-foreground">{filteredProjects.length}</strong> project specifications
        </span>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredProjects.map((proj) => {
          const isCompleted = proj.status === "Completed";
          const isInProgress = proj.status === "In Progress";
          const hasEvaluation = !!proj.evaluation;

          return (
            <Card
              key={proj.id}
              variant="editorial"
              className={`p-6 md:p-7 flex flex-col justify-between transition-all group border-2 border-black bg-white ${
                isInProgress
                  ? "border-l-8 border-l-honey-gold shadow-editorial-md ring-2 ring-electric-yellow/50"
                  : "shadow-editorial-sm hover:shadow-editorial-md"
              }`}
            >
              <div className="space-y-4">
                {/* Card Header */}
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={
                          isCompleted
                            ? "navy"
                            : isInProgress
                            ? "honey-gold"
                            : "neutral"
                        }
                        size="sm"
                      >
                        {proj.status}
                      </Badge>
                      <Badge variant="neutral" size="sm">{proj.difficulty}</Badge>
                    </div>
                    <h3 className="text-lg font-bold text-black leading-snug tracking-tight">
                      {proj.title}
                    </h3>
                  </div>

                  <span className="text-xs text-muted-foreground font-mono flex items-center gap-1 shrink-0 font-bold">
                    <Clock className="w-3.5 h-3.5 text-deep-navy" /> {proj.estimatedDuration}
                  </span>
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed">
                  {proj.description}
                </p>

                {/* Progress Bar & Phase */}
                <div className="space-y-2 p-3.5 rounded-lg bg-surface border-2 border-black/10">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-muted-foreground font-medium">Phase: <strong className="text-black font-extrabold">{proj.currentPhase}</strong></span>
                    <span className="font-extrabold text-deep-navy font-mono">{proj.progressPercentage}%</span>
                  </div>
                  <ProgressBar
                    value={proj.progressPercentage}
                    size="sm"
                    variant="navy"
                  />
                  <div className="flex items-center justify-between text-[10px] text-muted-foreground pt-0.5 font-mono font-bold">
                    <span>{proj.milestones.filter((m) => m.completed).length} of {proj.milestones.length} milestones complete</span>
                    {hasEvaluation && (
                      <span className="text-black font-extrabold font-mono">Score: {proj.evaluation?.overallScore}/100</span>
                    )}
                  </div>
                </div>

                {/* Tech Stack Badges */}
                <div className="space-y-1.5">
                  <p className="text-[10px] uppercase font-mono font-bold text-muted-foreground tracking-wider">
                    Technologies & Architecture:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {proj.technologies.map((t, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-0.5 rounded-sm bg-surface border border-black/20 text-[10px] font-mono font-bold text-black"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Links */}
              <div className="mt-6 pt-4 border-t-2 border-black/10 flex items-center justify-between gap-3">
                <Link href={`/projects/${proj.id}`} className="flex-1">
                  <Button
                    variant={isInProgress ? "navy" : "secondary"}
                    size="sm"
                    className="w-full gap-2 text-xs font-extrabold shadow-editorial-sm cursor-pointer"
                  >
                    <span>{isInProgress ? "Open Workspace" : isCompleted ? "View Submission Specs" : "Start Project"}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </Link>

                {hasEvaluation && (
                  <Link href={`/projects/${proj.id}/evaluation`}>
                    <Button variant="secondary" size="sm" className="gap-1.5 text-xs text-black font-bold border-2 border-black">
                      <Award className="w-3.5 h-3.5 text-deep-navy" />
                      <span>Rubric ({proj.evaluation?.overallScore})</span>
                    </Button>
                  </Link>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
