"use client";

import React from "react";
import Link from "next/link";
import {
  Award,
  Flame,
  CheckCircle2,
  FolderGit2,
  Briefcase,
  Mail,
  MapPin,
} from "lucide-react";
import { useCareer } from "@/context/CareerContext";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";

export default function CandidateProfilePage() {
  const { userProfile, projects, achievements, applications, resumeData } = useCareer();

  return (
    <div className="space-y-8 animate-fade-in bg-background text-foreground min-h-screen">
      {/* Candidate Profile Royal Maroon Hero Header */}
      <div className="rounded-2xl bg-royal-maroon text-white border-4 border-black p-8 sm:p-10 shadow-editorial-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-xl bg-acid-yellow text-black flex items-center justify-center font-black text-2xl font-mono shrink-0 border-2 border-black shadow-editorial-xs">
              {userProfile.name.charAt(0)}
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {userProfile.name}
                </h1>
                <span className="px-2 py-0.5 rounded bg-fire-red text-white text-[11px] font-mono font-extrabold border border-black">
                  Verified Candidate
                </span>
              </div>
              <p className="text-xs sm:text-sm text-acid-yellow font-mono font-extrabold">
                Target Role: {userProfile.targetRole}
              </p>
              <div className="flex flex-wrap items-center gap-3 text-xs text-white/70 pt-1 font-mono font-medium">
                <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5 text-acid-yellow" /> {userProfile.email}</span>
                <span>•</span>
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-white" /> {resumeData.personalInfo.location || "India"}</span>
                <span>•</span>
                <span className="flex items-center gap-1 text-fire-red font-bold"><Flame className="w-3.5 h-3.5 text-fire-red fill-fire-red" /> {userProfile.streakDays}-Day Streak</span>
              </div>
            </div>
          </div>

          <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3 pt-3 sm:pt-0 border-t sm:border-t-0 border-white/20">
            <div className="text-right">
              <span className="text-4xl sm:text-5xl font-extrabold font-mono text-acid-yellow">{userProfile.readinessScore}%</span>
              <p className="text-[10px] text-white/70 uppercase font-mono font-extrabold tracking-wider">Readiness Score</p>
            </div>
            <Link href="/settings">
              <button className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white border-2 border-white/40 font-bold text-xs transition-colors cursor-pointer">
                Edit Settings
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Grid: 6-Dimension Readiness Matrix (4 cols) & Verified Portfolio (8 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Readiness Matrix & Badges */}
        <div className="lg:col-span-4 space-y-6">
          {/* Readiness Category Breakdown */}
          <Card variant="editorial" className="p-6 space-y-4">
            <h2 className="text-xs font-bold uppercase font-mono tracking-wider text-foreground">
              6-Dimension Readiness Matrix
            </h2>

            <div className="space-y-3 text-xs">
              <div className="space-y-1">
                <div className="flex justify-between font-mono font-bold">
                  <span className="text-muted-foreground">Technical Assessment</span>
                  <span className="text-foreground">{userProfile.readinessBreakdown.technicalSkills}%</span>
                </div>
                <ProgressBar value={userProfile.readinessBreakdown.technicalSkills} size="sm" variant="yellow" />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between font-mono font-bold">
                  <span className="text-muted-foreground">Production Projects</span>
                  <span className="text-foreground">{userProfile.readinessBreakdown.projects}%</span>
                </div>
                <ProgressBar value={userProfile.readinessBreakdown.projects} size="sm" variant="maroon" />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between font-mono font-bold">
                  <span className="text-muted-foreground">Problem Solving & Algorithms</span>
                  <span className="text-foreground">{userProfile.readinessBreakdown.problemSolving}%</span>
                </div>
                <ProgressBar value={userProfile.readinessBreakdown.problemSolving} size="sm" variant="maroon" />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between font-mono font-bold">
                  <span className="text-muted-foreground">Voice Defense (STAR)</span>
                  <span className="text-foreground">{userProfile.readinessBreakdown.interview}%</span>
                </div>
                <ProgressBar value={userProfile.readinessBreakdown.interview} size="sm" variant="violet" />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between font-mono font-bold">
                  <span className="text-muted-foreground">ATS Resume Quality</span>
                  <span className="text-foreground">{userProfile.readinessBreakdown.resume}%</span>
                </div>
                <ProgressBar value={userProfile.readinessBreakdown.resume} size="sm" variant="red" />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between font-mono font-bold">
                  <span className="text-muted-foreground">Career & Skill Match Fit</span>
                  <span className="text-foreground">{userProfile.readinessBreakdown.careerFit}%</span>
                </div>
                <ProgressBar value={userProfile.readinessBreakdown.careerFit} size="sm" variant="yellow" />
              </div>
            </div>
          </Card>

          {/* Gamified Achievements & Badges */}
          <Card variant="editorial" className="p-6 space-y-4">
            <div className="flex items-center justify-between border-b-2 border-border pb-3">
              <h2 className="text-xs font-bold uppercase font-mono tracking-wider text-foreground">
                Milestones & Badges
              </h2>
              <span className="text-xs font-mono font-extrabold text-foreground">{userProfile.xp} XP</span>
            </div>

            <div className="space-y-2.5">
              {achievements.map((ach) => (
                <div
                  key={ach.id}
                  className="p-3 rounded-md bg-surface border-2 border-border flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-sm bg-white border border-border flex items-center justify-center text-foreground shrink-0 font-bold">
                      <Award className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground leading-snug">{ach.title}</h3>
                      <p className="text-[10px] text-muted-foreground mt-0.5">{ach.description}</p>
                    </div>
                  </div>
                  {ach.unlockedAt ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 ml-2" />
                  ) : (
                    <span className="text-[10px] font-mono font-bold text-muted-foreground">{ach.progress}/{ach.maxProgress}</span>
                  )}
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Column: Verified Projects, Skills Matrix & Application History (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Verified Projects Showcase */}
          <Card variant="editorial" className="p-6 space-y-4">
            <div className="flex items-center justify-between border-b-2 border-border pb-3">
              <h2 className="text-xs font-bold uppercase font-mono tracking-wider text-foreground flex items-center gap-2">
                <FolderGit2 className="w-4 h-4 text-foreground" />
                Verified Production Projects
              </h2>
              <Link href="/projects" className="text-xs text-foreground font-bold hover:underline font-mono">
                View All →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {projects.slice(0, 2).map((proj) => (
                <div key={proj.id} className="p-4 rounded-lg bg-surface border-2 border-border space-y-3 text-xs">
                  <div className="flex items-start justify-between gap-1">
                    <h3 className="font-bold text-foreground leading-tight">{proj.title}</h3>
                    {proj.evaluation && (
                      <span className="px-2 py-0.5 rounded-sm bg-royal-maroon text-white font-mono font-bold text-[10px] shrink-0 border border-black">
                        {proj.evaluation.overallScore}/100
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-muted-foreground line-clamp-2 leading-relaxed">
                    {proj.tagline}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {proj.technologies.slice(0, 3).map((t, i) => (
                      <span key={i} className="px-1.5 py-0.5 rounded-sm bg-white border border-border text-[9px] font-mono text-foreground font-semibold">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="pt-2 border-t-2 border-border flex items-center justify-between font-mono font-bold">
                    <Link href={`/projects/${proj.id}`} className="text-[11px] text-foreground hover:underline">
                      Workspace →
                    </Link>
                    {proj.evaluation && (
                      <Link href={`/projects/${proj.id}/evaluation`} className="text-[11px] text-foreground hover:underline">
                        Evaluation →
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Technical Skills Matrix */}
          <Card variant="editorial" className="p-6 space-y-4">
            <h2 className="text-xs font-bold uppercase font-mono tracking-wider text-foreground border-b-2 border-border pb-3">
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
                <div key={i} className="p-3 rounded-md bg-surface border-2 border-border space-y-1 text-xs">
                  <div className="flex justify-between font-mono">
                    <span className="font-bold text-foreground">{skill.name}</span>
                    <span className="font-extrabold text-foreground">{skill.score}</span>
                  </div>
                  <span className={`text-[10px] font-mono font-bold ${skill.status === "Verified" ? "text-foreground font-black" : "text-fire-red font-black"}`}>
                    • {skill.status}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          {/* Applications Pipeline Summary */}
          <Card variant="editorial" className="p-6 space-y-4">
            <div className="flex items-center justify-between border-b-2 border-border pb-3">
              <h2 className="text-xs font-bold uppercase font-mono tracking-wider text-foreground flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-foreground" />
                Active Applications ({applications.length})
              </h2>
              <Link href="/applications" className="text-xs text-foreground font-bold hover:underline font-mono">
                View Kanban →
              </Link>
            </div>

            <div className="space-y-2">
              {applications.slice(0, 3).map((app) => (
                <div key={app.id} className="p-3.5 rounded-lg bg-surface border-2 border-border flex items-center justify-between text-xs">
                  <div>
                    <h3 className="font-bold text-foreground">{app.role}</h3>
                    <p className="text-[11px] text-muted-foreground font-mono">{app.company} • {app.location}</p>
                  </div>
                  <Badge variant="maroon" size="sm">
                    {app.status}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
