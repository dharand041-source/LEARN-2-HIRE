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
      {/* Header */}
      <div className="border-b-2 border-border pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <SectionHeader
          eyebrow="PHASE 06 // PRODUCTION EVIDENCE"
          title="Production-Grade Real-World Projects"
          description="Build, deploy, and defend production-grade full-stack applications. Completed projects undergo strict rubric grading and feed directly into verified ATS resumes."
          accent="navy"
        />

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
        <Card variant="editorial" className="p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-editorial-navy text-white flex items-center justify-center shrink-0 shadow-editorial-sm">
            <CheckCircle2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-[10px] text-muted-foreground uppercase font-mono font-bold tracking-wider">Verified Projects</p>
            <p className="text-xl font-extrabold text-foreground font-mono">{completedCount} Production Apps</p>
            <p className="text-[10px] text-editorial-navy font-bold font-mono">Average Rubric: 92/100</p>
          </div>
        </Card>

        <Card variant="editorial" className="p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-editorial-navy text-white flex items-center justify-center shrink-0 shadow-editorial-sm">
            <FolderGit2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-[10px] text-muted-foreground uppercase font-mono font-bold tracking-wider">Active Development</p>
            <p className="text-xl font-extrabold text-foreground font-mono">{inProgressCount} Projects Active</p>
            <p className="text-[10px] text-muted-foreground font-mono font-bold">Escrow Verification Phase</p>
          </div>
        </Card>

        <Card variant="editorial" className="p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-editorial-navy text-white flex items-center justify-center shrink-0 shadow-editorial-sm">
            <Award className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-[10px] text-muted-foreground uppercase font-mono font-bold tracking-wider">Portfolio Readiness Weight</p>
            <p className="text-xl font-extrabold text-foreground font-mono">{userProfile.readinessBreakdown.projects}%</p>
            <p className="text-[10px] text-foreground font-bold font-mono">+8% boost on milestone completion</p>
          </div>
        </Card>
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
              className={`p-6 md:p-7 flex flex-col justify-between transition-all group ${
                isInProgress ? "border-l-4 border-l-editorial-navy" : ""
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
                            ? "navy"
                            : "neutral"
                        }
                        size="sm"
                      >
                        {proj.status}
                      </Badge>
                      <Badge variant="neutral" size="sm">{proj.difficulty}</Badge>
                    </div>
                    <h3 className="text-lg font-bold text-foreground leading-snug tracking-tight">
                      {proj.title}
                    </h3>
                  </div>

                  <span className="text-xs text-muted-foreground font-mono flex items-center gap-1 shrink-0 font-bold">
                    <Clock className="w-3.5 h-3.5 text-editorial-navy" /> {proj.estimatedDuration}
                  </span>
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed">
                  {proj.description}
                </p>

                {/* Progress Bar & Phase */}
                <div className="space-y-2 p-3.5 rounded-lg bg-surface border-2 border-border">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-muted-foreground font-medium">Phase: <strong className="text-foreground">{proj.currentPhase}</strong></span>
                    <span className="font-extrabold text-editorial-navy">{proj.progressPercentage}%</span>
                  </div>
                  <ProgressBar
                    value={proj.progressPercentage}
                    size="sm"
                    variant="navy"
                  />
                  <div className="flex items-center justify-between text-[10px] text-muted-foreground pt-0.5 font-mono font-bold">
                    <span>{proj.milestones.filter((m) => m.completed).length} of {proj.milestones.length} milestones complete</span>
                    {hasEvaluation && (
                      <span className="text-foreground">Score: {proj.evaluation?.overallScore}/100</span>
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
                        className="px-2.5 py-0.5 rounded-sm bg-surface border border-border text-[10px] font-mono font-bold text-foreground"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Links */}
              <div className="mt-6 pt-4 border-t-2 border-border flex items-center justify-between gap-3">
                <Link href={`/projects/${proj.id}`} className="flex-1">
                  <Button
                    variant={isInProgress ? "navy" : "secondary"}
                    size="sm"
                    className="w-full gap-2 text-xs font-bold shadow-editorial-sm"
                  >
                    <span>{isInProgress ? "Open Workspace" : isCompleted ? "View Submission Specs" : "Start Project"}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </Link>

                {hasEvaluation && (
                  <Link href={`/projects/${proj.id}/evaluation`}>
                    <Button variant="secondary" size="sm" className="gap-1.5 text-xs text-foreground font-bold">
                      <Award className="w-3.5 h-3.5 text-editorial-navy" />
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
