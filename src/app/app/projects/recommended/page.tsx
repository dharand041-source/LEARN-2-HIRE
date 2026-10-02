"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, CheckCircle2, Clock } from "lucide-react";
import { useCareer } from "@/context/CareerContext";
import { ProjectsNav } from "@/components/projects/ProjectsNav";
import { ROUTES } from "@/lib/routes";

const RECOMMENDED_PROJECTS = [
  {
    id: "proj-auth",
    title: "Multi-Tenant Enterprise Authentication Platform",
    role: "Full-Stack Developer",
    difficulty: "Advanced",
    estimatedHours: 40,
    skills: ["React", "Node.js", "OAuth2", "JWT", "PostgreSQL", "Docker"],
    description: "Build an enterprise authentication engine featuring SSO, role-based access control (RBAC), multi-factor authentication (TOTP), and session revocation telemetry.",
    whyRecommended: "Directly validates backend API security and database schema modeling.",
  },
  {
    id: "proj-job-board",
    title: "Real-Time Job Board with ATS Resume Matcher",
    role: "Full-Stack Developer",
    difficulty: "Advanced",
    estimatedHours: 45,
    skills: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL", "Full-Text Search"],
    description: "Architect a high-performance opportunity board with dynamic keyword indexing, eligibility scoring algorithms, and employer application tracking pipelines.",
    whyRecommended: "Matches your target career focus and proves production data pipeline experience.",
  },
  {
    id: "proj-collab",
    title: "Real-Time Collaborative Document Canvas",
    role: "Full-Stack Developer",
    difficulty: "Hard",
    estimatedHours: 50,
    skills: ["WebSockets", "CRDTs", "React", "Node.js", "Redis"],
    description: "Implement a collaborative markdown editor with presence cursors, conflict-free replicated data types, and revision history snapshots.",
    whyRecommended: "Demonstrates advanced concurrency handling and distributed state synchronization.",
  },
];

export default function RecommendedProjectsPage() {
  const { selectedRole } = useCareer();

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <ProjectsNav />

      <div className="rounded-2xl bg-royal-maroon text-white border-4 border-black p-6 sm:p-8 shadow-editorial-md flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span className="px-2.5 py-0.5 rounded bg-black text-electric-coral text-xs font-mono font-black border border-black uppercase tracking-wider">
            Curated Recommendations
          </span>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight uppercase leading-snug mt-2">
            Recommended Capstone Projects for {selectedRole?.title}
          </h1>
          <p className="text-xs sm:text-sm text-white/80 mt-1">
            Engineered to specifically demonstrate competencies required by top tech employers and hiring managers.
          </p>
        </div>

        <Link href={ROUTES.app.projects.myProjects}>
          <button className="px-5 py-2.5 bg-electric-coral hover:bg-black hover:text-white text-black border-2 border-black font-black text-xs uppercase tracking-wider transition-colors flex items-center gap-2 cursor-pointer shadow-editorial-xs">
            <span>View Active Projects</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </Link>
      </div>

      <div className="space-y-6">
        {RECOMMENDED_PROJECTS.map((proj) => (
          <div
            key={proj.id}
            className="p-6 bg-white border-2 border-black shadow-editorial-sm flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-royal-maroon transition-all"
          >
            <div className="space-y-2 max-w-3xl">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2 py-0.5 bg-paper text-black text-[10px] font-mono font-bold uppercase border border-black/20">
                  {proj.estimatedHours} hrs • {proj.difficulty}
                </span>
                <span className="px-2 py-0.5 bg-electric-coral/20 text-black border border-black/20 text-[10px] font-bold uppercase">
                  {proj.whyRecommended}
                </span>
              </div>
              <h3 className="text-lg font-black uppercase text-black">
                {proj.title}
              </h3>
              <p className="text-xs text-muted leading-relaxed">
                {proj.description}
              </p>
              <div className="flex items-center gap-1.5 flex-wrap pt-1">
                {proj.skills.map((s) => (
                  <span key={s} className="px-2 py-0.5 bg-stone-100 text-[10px] font-mono font-bold border border-black/20">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
              <Link href={ROUTES.app.projects.workspace(proj.id)}>
                <button className="w-full sm:w-auto px-4 py-2 bg-stone-100 hover:bg-black hover:text-white text-black border border-black font-bold text-xs uppercase tracking-wider transition-colors">
                  View Rubric
                </button>
              </Link>
              <Link href={ROUTES.app.projects.submit(proj.id)}>
                <button className="w-full sm:w-auto px-5 py-2.5 bg-royal-maroon hover:bg-electric-coral hover:text-black text-white border border-black font-extrabold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 shadow-editorial-xs">
                  <span>Start & Submit</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
