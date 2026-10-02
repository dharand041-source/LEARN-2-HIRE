"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { FolderGit2, ArrowRight, ArrowLeft, CheckCircle2, Send, ShieldCheck } from "lucide-react";
import { useCareer } from "@/context/CareerContext";
import { ProjectsNav } from "@/components/projects/ProjectsNav";
import { ROUTES } from "@/lib/routes";
import { ProjectService } from "@/services/domainServices";

const projectService = new ProjectService();

export default function ProjectSubmitPage() {
  const router = useRouter();
  const params = useParams();
  const projectId = (params?.id as string) || "proj-1";
  const { projects } = useCareer();

  const [repoUrl, setRepoUrl] = useState("https://github.com/alexmorgan/enterprise-auth-platform");
  const [liveUrl, setLiveUrl] = useState("https://auth-platform.alexmorgan.dev");
  const [docsUrl, setDocsUrl] = useState("https://github.com/alexmorgan/enterprise-auth-platform#readme");
  const [techStack, setTechStack] = useState("React, Node.js, Express, PostgreSQL, Docker, JWT, Redis");
  const [explanation, setExplanation] = useState(
    "Implemented clean architecture with repository pattern, HTTP-only refresh cookies, role-based access control, and rate limiting with Redis."
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const project = projects.find((p) => p.id === projectId) || {
    id: projectId,
    title: "Production Authentication & Access Control Engine",
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await projectService.submitProject(projectId, {
        repoUrl,
        liveUrl,
        docsUrl,
        explanation,
      });
      router.push(ROUTES.app.skillProof.root);
    } catch {
      router.push(ROUTES.app.skillProof.root);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <ProjectsNav />

      <div className="flex items-center gap-2">
        <Link href={ROUTES.app.projects.workspace(projectId)} className="text-xs font-bold text-muted hover:text-black flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Workspace</span>
        </Link>
      </div>

      <div className="rounded-2xl bg-royal-maroon text-white border-4 border-black p-6 sm:p-8 shadow-editorial-md flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span className="px-2.5 py-0.5 rounded bg-black text-electric-coral text-xs font-mono font-black border border-black uppercase tracking-wider">
            Verification Gate
          </span>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight uppercase leading-snug mt-2">
            Submit Capstone: {project.title}
          </h1>
          <p className="text-xs sm:text-sm text-white/80 mt-1">
            Submitting verified code repositories establishes tangible proof of skill on your candidate profile.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-6 sm:p-8 bg-white border-2 border-black shadow-editorial-md space-y-6 max-w-4xl mx-auto">
        <div className="space-y-1">
          <label className="text-xs font-black uppercase text-black block">
            GitHub Repository URL *
          </label>
          <input
            type="url"
            required
            value={repoUrl}
            onChange={(e) => setRepoUrl(e.target.value)}
            className="w-full p-3 bg-paper border-2 border-black text-xs font-mono focus:outline-none focus:border-royal-maroon"
            placeholder="https://github.com/username/project-repo"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-black uppercase text-black block">
              Live Hosted Application URL
            </label>
            <input
              type="url"
              value={liveUrl}
              onChange={(e) => setLiveUrl(e.target.value)}
              className="w-full p-3 bg-paper border-2 border-black text-xs font-mono focus:outline-none focus:border-royal-maroon"
              placeholder="https://my-app.vercel.app"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-black uppercase text-black block">
              Documentation / Architecture Link
            </label>
            <input
              type="url"
              value={docsUrl}
              onChange={(e) => setDocsUrl(e.target.value)}
              className="w-full p-3 bg-paper border-2 border-black text-xs font-mono focus:outline-none focus:border-royal-maroon"
              placeholder="https://github.com/username/project#architecture"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-black uppercase text-black block">
            Technology Stack Employed
          </label>
          <input
            type="text"
            value={techStack}
            onChange={(e) => setTechStack(e.target.value)}
            className="w-full p-3 bg-paper border-2 border-black text-xs font-medium focus:outline-none"
            placeholder="e.g. React, TypeScript, Node.js, PostgreSQL, Docker"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-black uppercase text-black block">
            Technical Architecture & Tradeoff Defense
          </label>
          <textarea
            rows={4}
            value={explanation}
            onChange={(e) => setExplanation(e.target.value)}
            className="w-full p-3 bg-paper border-2 border-black text-xs font-medium focus:outline-none"
            placeholder="Describe key engineering decisions, database schema choices, and security considerations..."
          />
        </div>

        <div className="pt-4 border-t border-black/10 flex items-center justify-between">
          <p className="text-[11px] text-muted font-mono">
            Submission initiates automated repository analysis and generates verifiable skill evidence.
          </p>

          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-3 bg-royal-maroon hover:bg-electric-coral hover:text-black text-white border-2 border-black font-black text-xs uppercase tracking-wider transition-colors flex items-center gap-2 shadow-editorial-xs cursor-pointer"
          >
            <span>{isSubmitting ? "Verifying..." : "Submit & Generate Proof"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
}
