"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  FolderGit2,
  Github,
  Globe,
  FileText,
  Clock,
  Layers,
  Sparkles,
  Award,
  ArrowRight,
  ExternalLink,
  Check,
  Send,
  AlertCircle,
} from "lucide-react";
import { useCareer } from "@/context/CareerContext";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Modal } from "@/components/ui/Modal";

export default function ProjectWorkspacePage() {
  const params = useParams();
  const router = useRouter();
  const { projects, updateProjectMilestone, updateProjectDetails, submitProjectForEvaluation } = useCareer();

  const projectId = params.id as string;
  const project = projects.find((p) => p.id === projectId) || projects[0];

  const [repoUrl, setRepoUrl] = useState(project.repoUrl || "https://github.com/hamenath-dev/project-repo");
  const [liveUrl, setLiveUrl] = useState(project.liveUrl || "https://project.skillforge.live");
  const [docsUrl, setDocsUrl] = useState(project.docsUrl || "https://github.com/hamenath-dev/project-repo/wiki");
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const completedMilestones = project.milestones.filter((m) => m.completed).length;
  const allMilestonesDone = completedMilestones === project.milestones.length;

  const phases = ["Planning", "Development", "Testing", "Deployment", "Submitted"] as const;

  const handleSubmitEvaluation = () => {
    setIsSubmitting(true);
    updateProjectDetails(project.id, {
      repoUrl,
      liveUrl,
      docsUrl,
    });

    setTimeout(() => {
      submitProjectForEvaluation(project.id);
      setIsSubmitting(false);
      setIsSubmitModalOpen(false);
      router.push(`/projects/${project.id}/evaluation`);
    }, 1200);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Top Header */}
      <div className="border-b border-surface-border pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <Link
            href="/projects"
            className="p-2 rounded-lg bg-surface-card hover:bg-navy-800 border border-surface-border text-pearl-muted hover:text-pearl-primary transition-colors mt-1"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="champagne" size="sm">Workspace</Badge>
              <Badge variant="navy" size="sm">{project.difficulty}</Badge>
              <span className="text-xs text-pearl-muted font-mono">{project.estimatedDuration}</span>
            </div>
            <h1 className="text-2xl font-bold text-pearl-primary">
              {project.title}
            </h1>
            <p className="text-xs text-pearl-muted mt-1 max-w-2xl leading-relaxed">
              {project.tagline}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {project.evaluation ? (
            <Link href={`/projects/${project.id}/evaluation`}>
              <Button size="sm" variant="secondary" className="gap-2 text-champagne border-champagne/30">
                <Award className="w-3.5 h-3.5" />
                <span>View Evaluation ({project.evaluation.overallScore}/100)</span>
              </Button>
            </Link>
          ) : (
            <Button
              onClick={() => setIsSubmitModalOpen(true)}
              size="sm"
              className="gap-2"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit for Evaluation</span>
            </Button>
          )}
        </div>
      </div>

      {/* 5-Phase Project Progress Pipeline Tracker */}
      <div className="p-5 rounded-xl bg-surface-card border border-surface-border">
        <div className="flex items-center justify-between mb-3 text-xs">
          <span className="font-semibold text-pearl-primary uppercase tracking-wider text-[11px]">
            Project Lifecycle Phase
          </span>
          <span className="font-mono text-champagne font-bold">{project.progressPercentage}% Completed</span>
        </div>

        {/* Pipeline Step Indicators */}
        <div className="grid grid-cols-5 gap-2">
          {phases.map((phase, idx) => {
            const isCurrent = project.currentPhase === phase;
            const phaseIndex = phases.indexOf(project.currentPhase);
            const isPassed = idx <= phaseIndex;

            return (
              <div
                key={phase}
                className={`p-2.5 rounded-lg border text-center transition-all ${
                  isCurrent
                    ? "bg-navy-800 border-champagne text-champagne font-bold shadow-sm ring-1 ring-champagne/30"
                    : isPassed
                    ? "bg-navy-950 border-white/10 text-pearl-primary"
                    : "bg-surface-subtle border-white/5 text-pearl-muted opacity-60"
                }`}
              >
                <div className="flex items-center justify-center gap-1 text-[11px]">
                  {isPassed ? (
                    <Check className="w-3 h-3 text-champagne" />
                  ) : (
                    <span className="text-[10px] font-mono">0{idx + 1}</span>
                  )}
                  <span>{phase}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Grid: Left Spec (7 cols) & Right Milestones/Submission (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Problem & Requirements */}
        <div className="lg:col-span-7 space-y-6">
          {/* Problem Statement Card */}
          <div className="p-6 rounded-xl bg-surface-card border border-surface-border space-y-3">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-pearl-primary flex items-center gap-2">
              <FolderGit2 className="w-4 h-4 text-champagne" />
              Industry Problem Statement
            </h2>
            <p className="text-xs text-pearl-muted leading-relaxed">
              {project.problemStatement}
            </p>
          </div>

          {/* Functional Requirements Checklist */}
          <div className="p-6 rounded-xl bg-surface-card border border-surface-border space-y-4">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-pearl-primary">
              Functional & Technical Requirements
            </h2>
            <div className="space-y-2.5">
              {project.requirements.map((req, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-navy-950/80 border border-white/5 text-xs text-pearl-muted leading-relaxed">
                  <span className="w-5 h-5 rounded-full bg-navy-800 border border-white/10 flex items-center justify-center font-mono text-[10px] text-champagne shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span>{req}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Suggested Architecture & Tech Stack */}
          <div className="p-6 rounded-xl bg-surface-card border border-surface-border space-y-4">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-pearl-primary">
              Recommended Architectural Stack
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-lg bg-navy-950 border border-white/5 space-y-1">
                <span className="text-[10px] uppercase font-semibold text-champagne">Frontend Layer:</span>
                <p className="text-pearl-primary font-medium">{project.suggestedStack.frontend}</p>
              </div>
              <div className="p-3.5 rounded-lg bg-navy-950 border border-white/5 space-y-1">
                <span className="text-[10px] uppercase font-semibold text-champagne">Backend Layer:</span>
                <p className="text-pearl-primary font-medium">{project.suggestedStack.backend}</p>
              </div>
              <div className="p-3.5 rounded-lg bg-navy-950 border border-white/5 space-y-1">
                <span className="text-[10px] uppercase font-semibold text-champagne">Database & Caching:</span>
                <p className="text-pearl-primary font-medium">{project.suggestedStack.database}</p>
              </div>
              <div className="p-3.5 rounded-lg bg-navy-950 border border-white/5 space-y-1">
                <span className="text-[10px] uppercase font-semibold text-champagne">DevOps & CI/CD:</span>
                <p className="text-pearl-primary font-medium">{project.suggestedStack.devops}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Milestones Checklist & Submission Form */}
        <div className="lg:col-span-5 space-y-6">
          {/* Milestones Checklist */}
          <div className="p-6 rounded-xl bg-surface-card border border-surface-border space-y-4">
            <div className="flex items-center justify-between border-b border-surface-border pb-3">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-pearl-primary">
                Milestone Verification
              </h2>
              <span className="text-xs font-mono text-champagne font-bold">
                {completedMilestones} / {project.milestones.length}
              </span>
            </div>

            <div className="space-y-2.5">
              {project.milestones.map((m) => (
                <div
                  key={m.id}
                  onClick={() => updateProjectMilestone(project.id, m.id, !m.completed)}
                  className={`p-3 rounded-lg border transition-all cursor-pointer flex items-start gap-3 ${
                    m.completed
                      ? "bg-navy-900/90 border-champagne/30 text-pearl-primary"
                      : "bg-surface-subtle border-white/5 text-pearl-muted hover:border-pearl/20"
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                      m.completed
                        ? "bg-champagne border-champagne text-black"
                        : "border-pearl-muted/40"
                    }`}
                  >
                    {m.completed && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                  <div>
                    <h3 className={`text-xs font-semibold leading-tight ${m.completed ? "text-pearl-primary" : "text-pearl-muted"}`}>
                      {m.title}
                    </h3>
                    <p className="text-[11px] text-pearl-muted mt-1 leading-relaxed">
                      {m.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Submission Form Card */}
          <div className="p-6 rounded-xl bg-surface-card border border-champagne/30 shadow-card-navy space-y-5">
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-wider text-pearl-primary">
                Production Artifacts & Links
              </h2>
              <p className="text-[11px] text-pearl-muted mt-0.5">
                Provide public URLs for automated rubric and test pipeline evaluation.
              </p>
            </div>

            <div className="space-y-3.5 text-xs">
              <div className="space-y-1">
                <label className="text-[11px] text-pearl-muted flex items-center gap-1.5 font-medium">
                  <Github className="w-3.5 h-3.5 text-champagne" /> GitHub Repository URL
                </label>
                <input
                  type="url"
                  value={repoUrl}
                  onChange={(e) => setRepoUrl(e.target.value)}
                  placeholder="https://github.com/username/project"
                  className="w-full p-2.5 rounded-lg bg-black border border-white/10 text-xs text-pearl-primary focus:outline-none focus:border-champagne font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] text-pearl-muted flex items-center gap-1.5 font-medium">
                  <Globe className="w-3.5 h-3.5 text-champagne" /> Live Deployment URL
                </label>
                <input
                  type="url"
                  value={liveUrl}
                  onChange={(e) => setLiveUrl(e.target.value)}
                  placeholder="https://project-demo.vercel.app"
                  className="w-full p-2.5 rounded-lg bg-black border border-white/10 text-xs text-pearl-primary focus:outline-none focus:border-champagne font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] text-pearl-muted flex items-center gap-1.5 font-medium">
                  <FileText className="w-3.5 h-3.5 text-champagne" /> Architecture Documentation
                </label>
                <input
                  type="url"
                  value={docsUrl}
                  onChange={(e) => setDocsUrl(e.target.value)}
                  placeholder="https://github.com/username/project/wiki"
                  className="w-full p-2.5 rounded-lg bg-black border border-white/10 text-xs text-pearl-primary focus:outline-none focus:border-champagne font-mono"
                />
              </div>
            </div>

            <Button
              onClick={() => setIsSubmitModalOpen(true)}
              size="lg"
              className="w-full gap-2 text-xs font-semibold"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit Project for Evaluation</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Submit Modal */}
      <Modal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        title="Submit Project for Rubric Evaluation?"
        description="Our automated evaluator will analyze your TypeScript strictness, database schema indexing, UI/UX accessibility, and CI/CD pipelines."
        maxWidth="md"
      >
        <div className="space-y-4 text-xs">
          <div className="p-4 rounded-lg bg-navy-950 border border-white/5 space-y-2">
            <div className="flex justify-between">
              <span className="text-pearl-muted">Project:</span>
              <span className="text-pearl-primary font-semibold">{project.title}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-pearl-muted">Milestones Done:</span>
              <span className="text-champagne font-bold font-mono">{completedMilestones} of {project.milestones.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-pearl-muted">Repository:</span>
              <span className="text-pearl-primary font-mono truncate max-w-[200px]">{repoUrl}</span>
            </div>
          </div>

          <p className="text-pearl-muted leading-relaxed text-[11px]">
            Submitting this project increases your global career readiness score by up to <strong>+5%</strong> and generates a detailed rubric breakdown.
          </p>

          <div className="flex items-center justify-end gap-3 pt-2">
            <Button variant="outline" size="sm" onClick={() => setIsSubmitModalOpen(false)}>
              Cancel
            </Button>
            <Button
              size="sm"
              isLoading={isSubmitting}
              onClick={handleSubmitEvaluation}
              className="gap-1.5"
            >
              <span>Confirm & Evaluate</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
