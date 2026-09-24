"use client";

import React from "react";
import Link from "next/link";
import {
  User,
  Award,
  Sparkles,
  Flame,
  CheckCircle2,
  FolderGit2,
  Mic,
  FileText,
  Briefcase,
  ExternalLink,
  Github,
  Mail,
  MapPin,
  Calendar,
  Layers,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { useCareer } from "@/context/CareerContext";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { getScoreColor } from "@/lib/constants";

export default function CandidateProfilePage() {
  const { userProfile, selectedRole, projects, achievements, applications, resumeData } = useCareer();

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Candidate Profile Header Card */}
      <div className="p-6 sm:p-8 rounded-2xl bg-surface-card border border-champagne/40 shadow-card-navy">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-2xl bg-navy-800 border-2 border-champagne flex items-center justify-center font-bold text-2xl text-champagne shrink-0 shadow-gold-btn/20">
              {userProfile.name.charAt(0)}
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-bold text-pearl-primary font-display">
                  {userProfile.name}
                </h1>
                <Badge variant="champagne" size="sm">Verified Candidate</Badge>
              </div>
              <p className="text-xs sm:text-sm text-champagne font-medium">
                Target Role: {userProfile.targetRole}
              </p>
              <div className="flex flex-wrap items-center gap-3 text-xs text-pearl-muted pt-1">
                <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5 text-champagne" /> {userProfile.email}</span>
                <span>•</span>
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-champagne" /> Bengaluru / Chennai</span>
                <span>•</span>
                <span className="flex items-center gap-1 font-mono text-champagne"><Flame className="w-3.5 h-3.5 text-amber-400" /> {userProfile.streakDays}-Day Streak</span>
              </div>
            </div>
          </div>

          <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 pt-3 sm:pt-0 border-t sm:border-t-0 border-white/5">
            <div className="text-right">
              <span className="text-3xl font-bold font-mono text-champagne">{userProfile.readinessScore}%</span>
              <p className="text-[10px] text-pearl-muted uppercase font-mono">Job Readiness Score</p>
            </div>
            <Link href="/settings">
              <Button variant="outline" size="sm" className="text-xs">
                Edit Profile Settings
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Grid: 6-Dimension Readiness Matrix (4 cols) & Verified Portfolio (8 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Readiness Matrix & Badges */}
        <div className="lg:col-span-4 space-y-6">
          {/* Readiness Category Breakdown */}
          <div className="p-6 rounded-xl bg-surface-card border border-surface-border space-y-4">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-pearl-primary">
              6-Dimension Competency Matrix
            </h2>

            <div className="space-y-3 text-xs">
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-pearl-muted">Technical Diagnostics</span>
                  <span className="font-mono text-champagne font-bold">{userProfile.readinessBreakdown.technicalSkills}%</span>
                </div>
                <ProgressBar value={userProfile.readinessBreakdown.technicalSkills} size="sm" variant="champagne" />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-pearl-muted">Production Projects</span>
                  <span className="font-mono text-champagne font-bold">{userProfile.readinessBreakdown.projects}%</span>
                </div>
                <ProgressBar value={userProfile.readinessBreakdown.projects} size="sm" variant="champagne" />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-pearl-muted">Problem Solving & Algorithms</span>
                  <span className="font-mono text-pearl-primary font-bold">{userProfile.readinessBreakdown.problemSolving}%</span>
                </div>
                <ProgressBar value={userProfile.readinessBreakdown.problemSolving} size="sm" variant="navy" />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-pearl-muted">Interview Defense (STAR)</span>
                  <span className="font-mono text-pearl-primary font-bold">{userProfile.readinessBreakdown.interview}%</span>
                </div>
                <ProgressBar value={userProfile.readinessBreakdown.interview} size="sm" variant="champagne" />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-pearl-muted">ATS Resume Quality</span>
                  <span className="font-mono text-emerald-400 font-bold">{userProfile.readinessBreakdown.resume}%</span>
                </div>
                <ProgressBar value={userProfile.readinessBreakdown.resume} size="sm" variant="success" />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-pearl-muted">Role & Skill Match Fit</span>
                  <span className="font-mono text-champagne font-bold">{userProfile.readinessBreakdown.careerFit}%</span>
                </div>
                <ProgressBar value={userProfile.readinessBreakdown.careerFit} size="sm" variant="champagne" />
              </div>
            </div>
          </div>

          {/* Gamified Achievements & Badges */}
          <div className="p-6 rounded-xl bg-surface-card border border-surface-border space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-pearl-primary">
                Milestones & Badges
              </h2>
              <span className="text-xs font-mono text-champagne font-bold">{userProfile.xp} XP</span>
            </div>

            <div className="space-y-2.5">
              {achievements.map((ach) => (
                <div
                  key={ach.id}
                  className="p-3 rounded-lg bg-navy-950 border border-white/5 flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-md bg-navy-800 border border-champagne/30 flex items-center justify-center text-champagne shrink-0">
                      <Award className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-pearl-primary leading-snug">{ach.title}</h3>
                      <p className="text-[10px] text-pearl-muted mt-0.5">{ach.description}</p>
                    </div>
                  </div>
                  {ach.unlockedAt ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 ml-2" />
                  ) : (
                    <span className="text-[10px] font-mono text-pearl-muted">{ach.progress}/{ach.maxProgress}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Verified Projects, Skills Matrix & Application History (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Verified Projects Showcase */}
          <div className="p-6 rounded-xl bg-surface-card border border-surface-border space-y-4">
            <div className="flex items-center justify-between border-b border-surface-border pb-3">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-pearl-primary flex items-center gap-2">
                <FolderGit2 className="w-4 h-4 text-champagne" />
                Verified Production Projects
              </h2>
              <Link href="/projects" className="text-xs text-champagne hover:underline">
                View Marketplace →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {projects.slice(0, 2).map((proj) => (
                <div key={proj.id} className="p-4 rounded-xl bg-navy-950/80 border border-white/5 space-y-3 text-xs">
                  <div className="flex items-start justify-between gap-1">
                    <h3 className="font-bold text-pearl-primary leading-tight">{proj.title}</h3>
                    {proj.evaluation && (
                      <span className="px-2 py-0.5 rounded bg-champagne/20 text-champagne border border-champagne/40 font-mono font-bold text-[10px] shrink-0">
                        {proj.evaluation.overallScore}/100
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-pearl-muted line-clamp-2 leading-relaxed">
                    {proj.tagline}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {proj.technologies.slice(0, 3).map((t, i) => (
                      <span key={i} className="px-1.5 py-0.5 rounded bg-black border border-white/5 text-[9px] font-mono text-pearl-muted">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="pt-2 border-t border-white/5 flex items-center justify-between">
                    <Link href={`/projects/${proj.id}`} className="text-[11px] text-champagne hover:underline">
                      Workspace →
                    </Link>
                    {proj.evaluation && (
                      <Link href={`/projects/${proj.id}/evaluation`} className="text-[11px] text-emerald-400 hover:underline">
                        Evaluation →
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Skills Matrix */}
          <div className="p-6 rounded-xl bg-surface-card border border-surface-border space-y-4">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-pearl-primary">
              Verified Technical Skill Matrix
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                { name: "TypeScript & JS", score: "85%", status: "Verified" },
                { name: "React & Next.js", score: "82%", status: "Verified" },
                { name: "Node.js & APIs", score: "75%", status: "Verified" },
                { name: "PostgreSQL & SQL", score: "68%", status: "In Training" },
                { name: "Git & CI/CD", score: "90%", status: "Verified" },
                { name: "Docker & Cloud", score: "72%", status: "Verified" },
              ].map((skill, i) => (
                <div key={i} className="p-3 rounded-lg bg-navy-950 border border-white/5 space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="font-semibold text-pearl-primary">{skill.name}</span>
                    <span className="font-mono text-champagne font-bold">{skill.score}</span>
                  </div>
                  <span className={`text-[10px] ${skill.status === "Verified" ? "text-emerald-400" : "text-rose"}`}>
                    • {skill.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Applications Pipeline Summary */}
          <div className="p-6 rounded-xl bg-surface-card border border-surface-border space-y-4">
            <div className="flex items-center justify-between border-b border-surface-border pb-3">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-pearl-primary flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-champagne" />
                Active Applications ({applications.length})
              </h2>
              <Link href="/applications" className="text-xs text-champagne hover:underline">
                View Kanban →
              </Link>
            </div>

            <div className="space-y-2">
              {applications.slice(0, 3).map((app) => (
                <div key={app.id} className="p-3.5 rounded-lg bg-navy-950 border border-white/5 flex items-center justify-between text-xs">
                  <div>
                    <h3 className="font-semibold text-pearl-primary">{app.role}</h3>
                    <p className="text-[11px] text-pearl-muted">{app.company} • {app.location}</p>
                  </div>
                  <Badge variant={app.status === "Applied" ? "champagne" : app.status === "Interview" ? "champagne" : "navy"} size="sm">
                    {app.status}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
