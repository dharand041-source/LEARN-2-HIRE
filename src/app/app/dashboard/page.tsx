"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  CheckSquare,
  BookOpen,
  FolderGit2,
  Mic,
  Briefcase,
  TrendingUp,
  ArrowRight,
  Sparkles,
  ChevronRight,
  Check,
  Globe,
  Flame,
  FileText,
  Target,
  Kanban,
  ShieldAlert,
  Activity,
  Award,
} from "lucide-react";
import { useCareer } from "@/context/CareerContext";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { CAREER_ROLES } from "@/data/careers";
import { LoginIntro } from "@/components/ui/login-intro";
import { nextActionService, userRepo } from "@/services/domainServices";
import { ROUTES } from "@/lib/routes";

export default function AppDashboardPage() {
  const {
    userProfile,
    selectedRole,
    selectRole,
    assessmentResult,
    learningModules,
    projects,
    interviewSessions,
    liveJobMatches,
    atsAnalysis,
    applications,
  } = useCareer();

  const [previewRole, setPreviewRole] = useState(selectedRole);
  const [showIntro, setShowIntro] = useState(false);
  const hasCheckedIntro = React.useRef(false);

  const [nextAction, setNextAction] = useState<{
    stage: string;
    actionLabel: string;
    actionDescription: string;
    actionRoute: string;
    badgeText: string;
  }>({
    stage: "CAREER_SELECTED",
    actionLabel: "Take Baseline Assessment",
    actionDescription: "Evaluate your technical foundation with our diagnostic questions.",
    actionRoute: ROUTES.app.assessments.baseline,
    badgeText: "Recommended Next Step",
  });

  useEffect(() => {
    nextActionService.determineNextAction().then(setNextAction);
  }, [userProfile, assessmentResult, projects, applications]);

  useEffect(() => {
    if (hasCheckedIntro.current) return;
    hasCheckedIntro.current = true;
    try {
      if (typeof window !== "undefined") {
        const isPending = sessionStorage.getItem("l2h_post_login_intro") === "pending";
        if (isPending) {
          sessionStorage.removeItem("l2h_post_login_intro");
          setShowIntro(true);
        }
      }
    } catch {
      // Ignore storage restrictions
    }
  }, []);

  const completedModules = learningModules.filter((m) => m.status === "Completed").length;
  const completedProjects = projects.filter((p) => p.status === "Completed");

  const assessmentScoreStr = assessmentResult ? `${assessmentResult.score}/100` : "Not Started";
  const gapAnalysisStr = userProfile.focusArea
    ? `Gap: ${userProfile.focusArea.split("&")[0].trim()}`
    : assessmentResult
    ? "Gaps Diagnosed"
    : "Pending Assessment";
  const learningProgressStr =
    learningModules.length > 0
      ? `${Math.round((completedModules / learningModules.length) * 100)}%`
      : "0%";
  const capstoneScoreStr =
    completedProjects.length > 0 && completedProjects[0].evaluation?.overallScore
      ? `${completedProjects[0].evaluation.overallScore}/100`
      : completedProjects.length > 0
      ? `${completedProjects.length} Verified`
      : "0 Apps";
  const voiceScoreStr =
    interviewSessions.length > 0 && interviewSessions[0].overallScore
      ? `${interviewSessions[0].overallScore}/100`
      : "Not Practiced";
  const topMatchStr =
    liveJobMatches.length > 0 ? `${liveJobMatches[0].matchScore}% Top Match` : "Pending Analysis";

  const pipelineNodes = [
    {
      title: "1. Diagnostic",
      sub: "10-question test",
      icon: CheckSquare,
      score: assessmentScoreStr,
      route: ROUTES.app.assessments.baseline,
      cardBg: "bg-royal-maroon text-white border-2 border-black",
      iconBg: "bg-electric-coral text-black",
      numColor: "text-electric-coral",
      scoreColor: "text-electric-coral",
    },
    {
      title: "2. Gap Analysis",
      sub: "Targeted blindspots",
      icon: TrendingUp,
      score: gapAnalysisStr,
      route: ROUTES.app.skillAnalysis,
      cardBg: "bg-electric-coral text-black border-2 border-black",
      iconBg: "bg-black text-electric-coral",
      numColor: "text-black",
      scoreColor: "text-black",
    },
    {
      title: "3. Learning Track",
      sub: "Curated modules",
      icon: BookOpen,
      score: `${completedModules}/${learningModules.length} Done`,
      route: ROUTES.app.learning.roadmap,
      cardBg: "bg-black text-white border-2 border-black",
      iconBg: "bg-electric-coral text-black",
      numColor: "text-electric-coral",
      scoreColor: "text-electric-coral",
    },
    {
      title: "4. Capstone Build",
      sub: "Production-grade apps",
      icon: FolderGit2,
      score: capstoneScoreStr,
      route: ROUTES.app.projects.root,
      cardBg: "bg-white text-black border-2 border-black",
      iconBg: "bg-royal-maroon text-white",
      numColor: "text-black",
      scoreColor: "text-black",
    },
    {
      title: "5. Voice Defense",
      sub: "STAR & architecture",
      icon: Mic,
      score: voiceScoreStr,
      route: ROUTES.app.interview.root,
      cardBg: "bg-royal-maroon text-white border-2 border-black",
      iconBg: "bg-electric-coral text-black",
      numColor: "text-electric-coral",
      scoreColor: "text-electric-coral",
    },
    {
      title: "6. Match Engine",
      sub: "Direct applications",
      icon: Briefcase,
      score: topMatchStr,
      route: ROUTES.app.opportunities.jobs,
      cardBg: "bg-electric-coral text-black border-2 border-black",
      iconBg: "bg-black text-electric-coral",
      numColor: "text-black",
      scoreColor: "text-black",
    },
  ];

  return (
    <>
      {showIntro && <LoginIntro onComplete={() => setShowIntro(false)} />}

      <div className="space-y-10 sm:space-y-14 bg-white w-full animate-fade-in">
        {/* Next Recommended Action Banner */}
        <div className="p-5 sm:p-6 rounded-2xl bg-electric-coral text-black border-3 border-black shadow-editorial-md flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded bg-black text-white text-[10px] font-mono font-black uppercase tracking-wider">
                {nextAction.badgeText}
              </span>
              <span className="text-xs font-mono font-black text-black uppercase">
                Stage: {nextAction.stage}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-display font-black text-black uppercase tracking-tight">
              {nextAction.actionLabel}
            </h2>
            <p className="text-xs font-bold text-black/80 max-w-xl">
              {nextAction.actionDescription}
            </p>
          </div>

          <Link href={nextAction.actionRoute} className="shrink-0">
            <button className="px-6 py-3 rounded-xl bg-black hover:bg-white hover:text-black text-white font-black text-xs sm:text-sm border-2 border-black transition-colors flex items-center gap-2 shadow-editorial-xs cursor-pointer">
              <span>Execute Action</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </Link>
        </div>

        {/* Hero Section */}
        <section className="relative w-full bg-royal-maroon text-white border-3 border-black rounded-2xl p-6 sm:p-10 shadow-editorial-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-black text-electric-coral border border-black text-xs font-mono font-black uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Candidate Telemetry</span>
              </div>

              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-display font-black tracking-tight text-white uppercase leading-tight">
                {userProfile.name}&apos;S READINESS COCKPIT
              </h1>

              <p className="text-xs sm:text-sm text-white/90 leading-relaxed font-medium max-w-xl">
                Track your real-time verified competencies for <strong className="text-electric-coral">{selectedRole.title}</strong>, review your prioritized skill gaps, and execute capstones.
              </p>

              <div className="pt-2 flex flex-wrap gap-3">
                <Link href={ROUTES.app.assessments.baseline}>
                  <button className="px-5 py-2.5 rounded-lg bg-electric-coral hover:bg-white text-black font-black text-xs border-2 border-black transition-colors flex items-center gap-2 cursor-pointer shadow-editorial-xs">
                    <span>{assessmentResult ? "Retake Diagnostic" : "Start Baseline Diagnostic"}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </Link>
                <Link href={ROUTES.app.career.discover}>
                  <button className="px-5 py-2.5 rounded-lg bg-black hover:bg-electric-coral hover:text-black text-white font-black text-xs border-2 border-black transition-colors flex items-center gap-2 cursor-pointer shadow-editorial-xs">
                    <span>Switch Career Pathway</span>
                  </button>
                </Link>
              </div>
            </div>

            {/* Right Card: Real Readiness Breakdown */}
            <div className="lg:col-span-5 rounded-xl bg-black border-2 border-electric-coral p-6 text-white space-y-4 shadow-editorial-sm">
              <div className="flex items-center justify-between border-b border-white/20 pb-3">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-electric-coral font-bold">
                    Target Track
                  </span>
                  <h3 className="text-base font-extrabold text-white truncate max-w-[200px]">
                    {selectedRole.title}
                  </h3>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-mono font-black text-electric-coral">
                    {userProfile.readinessScore}%
                  </span>
                  <span className="text-[9px] font-mono text-white/60 block uppercase">Overall Ready</span>
                </div>
              </div>

              <div className="space-y-2">
                <ProgressBar value={userProfile.readinessScore} size="sm" variant="electric-coral" />
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
                <div className="p-2.5 rounded-lg bg-white/10 border border-white/20">
                  <span className="text-[9px] text-white/60 font-mono uppercase block">Active Streak</span>
                  <span className="text-sm font-mono font-black text-white">{userProfile.streakDays} Days</span>
                </div>
                <div className="p-2.5 rounded-lg bg-white/10 border border-white/20">
                  <span className="text-[9px] text-white/60 font-mono uppercase block">Candidate XP</span>
                  <span className="text-sm font-mono font-black text-electric-coral">{userProfile.xp} XP</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 9-Card Telemetry Grid with Canonical Routes */}
        <section className="space-y-4">
          <div className="border-b-2 border-black pb-2 flex items-center justify-between">
            <h2 className="text-lg font-display font-black uppercase text-black">
              Candidate Module Overview
            </h2>
            <span className="text-xs font-mono font-bold text-black/60">9 System Pillars</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Card 1: Career Goals */}
            <div className="p-5 rounded-xl bg-royal-maroon text-white border-2 border-black shadow-editorial-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-white">Target Pathway</span>
                  <Target className="w-4 h-4 text-electric-coral" />
                </div>
                <h3 className="text-base font-black text-white">{selectedRole.title}</h3>
                <p className="text-xs font-mono font-black text-electric-coral mt-1">{selectedRole.averageSalary}</p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/20 flex items-center justify-between text-xs">
                <Link href={ROUTES.app.career.goals} className="font-black text-electric-coral hover:underline flex items-center gap-1">
                  <span>Manage Career Goals</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Card 2: Skill Analysis */}
            <div className="p-5 rounded-xl bg-electric-coral text-black border-2 border-black shadow-editorial-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-black uppercase tracking-wider text-black">Skill Intelligence</span>
                  <Activity className="w-4 h-4 text-black" />
                </div>
                <h3 className="text-base font-black text-black">Competency Gap Map</h3>
                <p className="text-xs font-bold text-black/80 mt-1">{gapAnalysisStr}</p>
              </div>
              <div className="mt-4 pt-3 border-t-2 border-black/20 flex items-center justify-between text-xs">
                <Link href={ROUTES.app.skillAnalysis} className="font-black text-black hover:underline flex items-center gap-1">
                  <span>View Skill Analysis</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Card 3: Assessments */}
            <div className="p-5 rounded-xl bg-black text-white border-2 border-black shadow-editorial-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-white/70">Technical Diagnostics</span>
                  <CheckSquare className="w-4 h-4 text-electric-coral" />
                </div>
                <span className="text-3xl font-mono font-black text-electric-coral">{assessmentScoreStr}</span>
                <p className="text-xs text-white/70 mt-1">{assessmentResult ? `${assessmentResult.totalQuestions} Questions Evaluated` : "10 Diagnostic Questions"}</p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/20 flex items-center justify-between text-xs">
                <Link href={ROUTES.app.assessments.root} className="font-black text-electric-coral hover:underline flex items-center gap-1">
                  <span>Open Assessment Hub</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Card 4: Learning Roadmap */}
            <div className="p-5 rounded-xl bg-white text-black border-2 border-black shadow-editorial-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-black/70">Personalized Roadmap</span>
                  <BookOpen className="w-4 h-4 text-royal-maroon" />
                </div>
                <span className="text-3xl font-mono font-black text-royal-maroon">{learningProgressStr}</span>
                <p className="text-xs text-black/70 mt-1">{completedModules} of {learningModules.length} curriculum modules completed</p>
              </div>
              <div className="mt-4 pt-3 border-t-2 border-black flex items-center justify-between text-xs">
                <Link href={ROUTES.app.learning.roadmap} className="font-black text-royal-maroon hover:text-electric-coral flex items-center gap-1">
                  <span>Open Learning Roadmap</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Card 5: Practice Sandbox */}
            <div className="p-5 rounded-xl bg-royal-maroon text-white border-2 border-black shadow-editorial-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-white/80">Hands-On Practice</span>
                  <Sparkles className="w-4 h-4 text-electric-coral" />
                </div>
                <h3 className="text-base font-black text-white">Coding, DSA & SQL</h3>
                <p className="text-xs text-white/80 mt-1">Interactive code sandboxes and company interview questions</p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/20 flex items-center justify-between text-xs">
                <Link href={ROUTES.app.practice.root} className="font-black text-electric-coral hover:underline flex items-center gap-1">
                  <span>Practice Challenges</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Card 6: Production Projects */}
            <div className="p-5 rounded-xl bg-electric-coral text-black border-2 border-black shadow-editorial-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-black uppercase tracking-wider text-black">Real-World Projects</span>
                  <FolderGit2 className="w-4 h-4 text-black" />
                </div>
                <span className="text-3xl font-mono font-black text-black">{completedProjects.length} Verified</span>
                <p className="text-xs font-bold text-black/80 mt-1">{projects.length} production capstones available</p>
              </div>
              <div className="mt-4 pt-3 border-t-2 border-black/20 flex items-center justify-between text-xs">
                <Link href={ROUTES.app.projects.root} className="font-black text-black hover:underline flex items-center gap-1">
                  <span>Project Marketplace</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Card 7: Voice Interview Defense */}
            <div className="p-5 rounded-xl bg-black text-white border-2 border-black shadow-editorial-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-white/70">Interview Defense</span>
                  <Mic className="w-4 h-4 text-electric-coral" />
                </div>
                <span className="text-3xl font-mono font-black text-electric-coral">{voiceScoreStr}</span>
                <p className="text-xs text-white/70 mt-1">Interactive speech evaluation with STAR critique</p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/20 flex items-center justify-between text-xs">
                <Link href={ROUTES.app.interview.root} className="font-black text-electric-coral hover:underline flex items-center gap-1">
                  <span>Launch Interview Simulation</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Card 8: ATS Resume */}
            <div className="p-5 rounded-xl bg-white text-black border-2 border-black shadow-editorial-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-black/70">ATS Resume Engine</span>
                  <FileText className="w-4 h-4 text-royal-maroon" />
                </div>
                <span className="text-3xl font-mono font-black text-royal-maroon">{atsAnalysis ? `${atsAnalysis.overallScore}%` : "Not Scanned"}</span>
                <p className="text-xs text-black/70 mt-1">Single-column format verified for hiring platforms</p>
              </div>
              <div className="mt-4 pt-3 border-t-2 border-black flex items-center justify-between text-xs">
                <Link href={ROUTES.app.resume.root} className="font-black text-royal-maroon hover:text-electric-coral flex items-center gap-1">
                  <span>Builder & ATS Scan</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Card 9: Applications & Opportunities */}
            <div className="p-5 rounded-xl bg-royal-maroon text-white border-2 border-black shadow-editorial-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-white/80">Application Tracker</span>
                  <Kanban className="w-4 h-4 text-electric-coral" />
                </div>
                <span className="text-3xl font-mono font-black text-electric-coral">{applications.length} Active</span>
                <p className="text-xs text-white/80 mt-1">7-stage Kanban board with automated rejection retraining</p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/20 flex items-center justify-between text-xs">
                <Link href={ROUTES.app.applications.root} className="font-black text-electric-coral hover:underline flex items-center gap-1">
                  <span>Track Applications</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 6-Node Pipeline with Canonical Routes */}
        <section className="space-y-4">
          <div className="border-b-2 border-black pb-2 flex items-center justify-between">
            <h2 className="text-lg font-display font-black uppercase text-black">
              The 6-Node Verified Career Pipeline
            </h2>
            <span className="text-xs font-mono font-bold text-black/60">Execution Stages</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 relative">
            {pipelineNodes.map((node, i) => {
              const Icon = node.icon;
              return (
                <Link
                  key={i}
                  href={node.route}
                  className={`group relative p-4 rounded-xl transition-transform duration-150 hover:-translate-y-1 flex flex-col justify-between shadow-editorial-sm ${node.cardBg}`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold ${node.iconBg}`}>
                      <Icon className="w-4 h-4 stroke-[2.5]" />
                    </div>
                    <span className={`text-[11px] font-mono font-black ${node.numColor}`}>0{i + 1}</span>
                  </div>
                  <div>
                    <h3 className="text-xs font-black leading-snug">{node.title}</h3>
                    <p className="text-[11px] opacity-80 mt-0.5">{node.sub}</p>
                  </div>
                  <div className="mt-3 pt-2.5 border-t border-current/20 flex items-center justify-between">
                    <span className={`text-[10px] font-mono font-black truncate max-w-[90px] ${node.scoreColor}`}>{node.score}</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform shrink-0" />
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </>
  );
}
