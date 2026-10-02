"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { FolderGit2, ArrowRight, ArrowLeft, Clock, CheckCircle2, ShieldCheck, Code2 } from "lucide-react";
import { useCareer } from "@/context/CareerContext";
import { ProjectsNav } from "@/components/projects/ProjectsNav";
import { ROUTES } from "@/lib/routes";

export default function ProjectDetailPage() {
  const params = useParams();
  const projectId = (params?.id as string) || "proj-1";
  const { projects } = useCareer();

  const project = projects.find((p) => p.id === projectId) || {
    id: projectId,
    title: "Production Authentication & Access Control Engine",
    description: "Architect a robust full-stack authentication system with JWT access tokens, rotating HTTP-only refresh cookies, bcrypt hashing, and rate-limited brute force protection.",
    difficulty: "Advanced" as const,
    estimatedDuration: "35 Hours",
    skillsTested: ["Node.js", "Express", "React", "PostgreSQL", "JWT", "Security"],
    status: "In Progress" as const,
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <ProjectsNav />

      <div className="flex items-center gap-2">
        <Link href={ROUTES.app.projects.root} className="text-xs font-bold text-muted hover:text-black flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Projects</span>
        </Link>
      </div>

      <div className="rounded-2xl bg-royal-maroon text-white border-4 border-black p-6 sm:p-8 shadow-editorial-md flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded bg-black text-electric-coral text-xs font-mono font-black border border-black uppercase tracking-wider">
              {project.difficulty}
            </span>
            <span className="text-xs font-mono font-bold text-white/80">
              Estimated: {(project as any).estimatedDuration || (project as any).estimatedHours || "35 Hours"}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight uppercase leading-snug">
            {project.title}
          </h1>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Link href={ROUTES.app.projects.workspace(project.id)}>
            <button className="px-5 py-2.5 bg-electric-coral hover:bg-black hover:text-white text-black border-2 border-black font-black text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5 shadow-editorial-xs">
              <span>Go to Workspace</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </Link>
        </div>
      </div>

      {/* Specification and Rubric */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-8 p-6 bg-white border-2 border-black shadow-editorial-sm space-y-6">
          <div className="space-y-2">
            <h2 className="text-sm font-black uppercase text-black">Project Overview & Specifications</h2>
            <p className="text-xs text-muted leading-relaxed">{project.description}</p>
          </div>

          <div className="space-y-2">
            <h2 className="text-sm font-black uppercase text-black">Technical Requirements</h2>
            <ul className="space-y-1.5 text-xs text-black/90">
              <li className="flex items-start gap-2">
                <span className="text-royal-maroon font-black">•</span>
                <span>REST API endpoints for register, login, refresh, logout, and user profile.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-royal-maroon font-black">•</span>
                <span>Secure password hashing using bcrypt with configurable work factor.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-royal-maroon font-black">•</span>
                <span>Unit and integration tests covering positive and attack/fail cases.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-royal-maroon font-black">•</span>
                <span>Public GitHub repository with complete README and deployment instructions.</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="lg:col-span-4 p-6 bg-white border-2 border-black shadow-editorial-sm space-y-4">
          <h3 className="text-xs font-black uppercase tracking-wider text-black">Skills Validated</h3>
          <div className="flex flex-wrap gap-2">
            {project.skillsTested.map((s) => (
              <span key={s} className="px-2.5 py-1 bg-paper text-black text-xs font-mono font-bold border border-black/20">
                {s}
              </span>
            ))}
          </div>

          <div className="pt-4 border-t border-black/10">
            <Link href={ROUTES.app.projects.submit(project.id)} className="w-full block">
              <button className="w-full py-3 bg-royal-maroon text-white hover:bg-electric-coral hover:text-black font-extrabold text-xs uppercase tracking-wider border-2 border-black shadow-editorial-xs transition-colors flex items-center justify-center gap-2">
                <span>Submit Repository</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
