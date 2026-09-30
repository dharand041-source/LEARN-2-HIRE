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
  const [liveUrl, setLiveUrl] = useState(project.liveUrl || "https://project.learn-2-hire.live");
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
    <div className="space-y-8 animate-fade-in bg-white">
      {/* Top Header */}
      <div className="border-b border-border pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <Link
            href="/projects"
            className="p-2 rounded-lg bg-white hover:bg-surface-subtle border border-border text-night transition-colors mt-1"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="imperial" size="sm">Workspace</Badge>
              <Badge variant="night" size="sm">{project.difficulty}</Badge>
              <span className="text-xs text-muted font-mono font-semibold">{project.estimatedDuration}</span>
            </div>
            <h1 className="text-2xl font-extrabold text-night uppercase">
              {project.title}
            </h1>
            <p className="text-xs text-muted mt-1 max-w-2xl leading-relaxed font-medium">
              {project.tagline}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {project.evaluation ? (
            <Link href={`/projects/${project.id}/evaluation`}>
              <Button size="sm" variant="secondary" className="gap-2 text-night font-bold">
                <Award className="w-3.5 h-3.5 text-imperial" />
                <span>View Evaluation ({project.evaluation.overallScore}/100)</span>
              </Button>
            </Link>
          ) : (
            <Button
              onClick={() => setIsSubmitModalOpen(true)}
              size="sm"
              className="gap-2 font-bold shadow-sm"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit for Evaluation</span>
            </Button>
          )}
        </div>
      </div>

      {/* 5-Phase Project Progress Pipeline Tracker */}
      <div className="p-5 rounded-xl bg-white border border-border shadow-card">
        <div className="flex items-center justify-between mb-3 text-xs">
          <span className="font-bold text-night uppercase tracking-wider text-[11px]">
            Project Lifecycle Phase
          </span>
          <span className="font-mono text-imperial font-extrabold">{project.progressPercentage}% Completed</span>
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
                    ? "bg-imperial border-imperial text-white font-bold shadow-sm"
                    : isPassed
                    ? "bg-night border-night text-white font-medium"
                    : "bg-surface-subtle border-border text-muted opacity-60"
                }`}
              >
                <div className="flex items-center justify-center gap-1 text-[11px]">
                  {isPassed ? (
                    <Check className={`w-3 h-3 ${isCurrent ? "text-white" : "text-white"}`} />
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
          <div className="p-6 rounded-xl bg-white border border-border space-y-3 shadow-card">
            <h2 className="text-sm font-bold uppercase tracking-wider text-night flex items-center gap-2">
              <FolderGit2 className="w-4 h-4 text-imperial" />
              Industry Problem Statement
            </h2>
            <p className="text-xs text-muted leading-relaxed font-medium">
              {project.problemStatement}
            </p>
          </div>

          {/* Functional Requirements Checklist */}
          <div className="p-6 rounded-xl bg-white border border-border space-y-4 shadow-card">
            <h2 className="text-sm font-bold uppercase tracking-wider text-night">
              Functional & Technical Requirements
            </h2>
            <div className="space-y-2.5">
              {project.requirements.map((req, i) => (
                <div key={i} className="flex items-start gap-3 p-3.5 rounded-lg bg-surface-subtle border border-border text-xs text-night leading-relaxed font-medium">
                  <span className="w-5 h-5 rounded-full bg-night text-white flex items-center justify-center font-mono text-[10px] font-bold shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span>{req}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Suggested Architecture & Tech Stack */}
          <div className="p-6 rounded-xl bg-white border border-border space-y-4 shadow-card">
            <h2 className="text-sm font-bold uppercase tracking-wider text-night">
              Recommended Architectural Stack
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-lg bg-surface-subtle border border-border space-y-1">
                <span className="text-[10px] uppercase font-bold text-imperial">Frontend Layer:</span>
                <p className="text-night font-bold">{project.suggestedStack.frontend}</p>
              </div>
              <div className="p-3.5 rounded-lg bg-surface-subtle border border-border space-y-1">
                <span className="text-[10px] uppercase font-bold text-imperial">Backend Layer:</span>
                <p className="text-night font-bold">{project.suggestedStack.backend}</p>
              </div>
              <div className="p-3.5 rounded-lg bg-surface-subtle border border-border space-y-1">
                <span className="text-[10px] uppercase font-bold text-imperial">Database & Caching:</span>
                <p className="text-night font-bold">{project.suggestedStack.database}</p>
              </div>
              <div className="p-3.5 rounded-lg bg-surface-subtle border border-border space-y-1">
                <span className="text-[10px] uppercase font-bold text-imperial">DevOps & CI/CD:</span>
                <p className="text-night font-bold">{project.suggestedStack.devops}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Milestones Checklist & Submission Form */}
        <div className="lg:col-span-5 space-y-6">
          {/* Milestones Checklist */}
          <div className="p-6 rounded-xl bg-white border border-border space-y-4 shadow-card">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <h2 className="text-xs font-bold uppercase tracking-wider text-night">
                Milestone Verification
              </h2>
              <span className="text-xs font-mono text-imperial font-extrabold">
                {completedMilestones} / {project.milestones.length}
              </span>
            </div>

            <div className="space-y-2.5">
              {project.milestones.map((m) => (
                <div
                  key={m.id}
                  onClick={() => updateProjectMilestone(project.id, m.id, !m.completed)}
                  className={`p-3.5 rounded-lg border transition-all cursor-pointer flex items-start gap-3 ${
                    m.completed
                      ? "bg-surface-subtle border-night text-night"
                      : "bg-white border-border text-muted hover:border-night"
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                      m.completed
                        ? "bg-night border-night text-white"
                        : "border-border"
                    }`}
                  >
                    {m.completed && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                  <div>
                    <h3 className={`text-xs font-bold leading-tight ${m.completed ? "text-night" : "text-muted"}`}>
                      {m.title}
                    </h3>
                    <p className="text-[11px] text-muted mt-1 leading-relaxed font-medium">
                      {m.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Submission Form Card */}
          <div className="p-6 rounded-xl bg-white border border-border shadow-card space-y-5">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-night">
                Production Artifacts & Links
              </h2>
              <p className="text-[11px] text-muted mt-0.5 font-medium">
                Provide public URLs for automated rubric and test pipeline evaluation.
              </p>
            </div>

            <div className="space-y-3.5 text-xs">
              <div className="space-y-1">
                <label className="text-[11px] text-night flex items-center gap-1.5 font-bold">
                  <Github className="w-3.5 h-3.5 text-imperial" /> GitHub Repository URL
                </label>
                <input
                  type="url"
                  value={repoUrl}
                  onChange={(e) => setRepoUrl(e.target.value)}
                  placeholder="https://github.com/username/project"
                  className="w-full p-2.5 rounded-lg bg-surface-subtle border border-border text-xs text-night focus:outline-none focus:border-imperial font-mono font-medium"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] text-night flex items-center gap-1.5 font-bold">
                  <Globe className="w-3.5 h-3.5 text-imperial" /> Live Deployment URL
                </label>
                <input
                  type="url"
                  value={liveUrl}
                  onChange={(e) => setLiveUrl(e.target.value)}
                  placeholder="https://project-demo.vercel.app"
                  className="w-full p-2.5 rounded-lg bg-surface-subtle border border-border text-xs text-night focus:outline-none focus:border-imperial font-mono font-medium"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] text-night flex items-center gap-1.5 font-bold">
                  <FileText className="w-3.5 h-3.5 text-imperial" /> Architecture Documentation
                </label>
                <input
                  type="url"
                  value={docsUrl}
                  onChange={(e) => setDocsUrl(e.target.value)}
                  placeholder="https://github.com/username/project/wiki"
                  className="w-full p-2.5 rounded-lg bg-surface-subtle border border-border text-xs text-night focus:outline-none focus:border-imperial font-mono font-medium"
                />
              </div>
            </div>

            <Button
              onClick={() => setIsSubmitModalOpen(true)}
              size="lg"
              className="w-full gap-2 text-xs font-bold shadow-sm"
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
          <div className="p-4 rounded-lg bg-surface-subtle border border-border space-y-2">
            <div className="flex justify-between">
              <span className="text-muted font-medium">Project:</span>
              <span className="text-night font-bold">{project.title}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted font-medium">Milestones Done:</span>
              <span className="text-imperial font-bold font-mono">{completedMilestones} of {project.milestones.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted font-medium">Repository:</span>
              <span className="text-night font-mono font-semibold truncate max-w-[200px]">{repoUrl}</span>
            </div>
          </div>

          <p className="text-muted leading-relaxed text-[11px] font-medium">
            Submitting this project increases your global career readiness score by up to <strong>+5%</strong> and generates a detailed rubric breakdown.
          </p>

          <div className="flex items-center justify-end gap-3 pt-2">
            <Button variant="secondary" size="sm" onClick={() => setIsSubmitModalOpen(false)} className="font-bold">
              Cancel
            </Button>
            <Button
              size="sm"
              isLoading={isSubmitting}
              onClick={handleSubmitEvaluation}
              className="gap-1.5 font-bold shadow-sm"
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
