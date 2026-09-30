"use client";

import React, { useState } from "react";
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
  Award,
  Kanban,
  ShieldAlert,
} from "lucide-react";
import { useCareer } from "@/context/CareerContext";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { CAREER_ROLES } from "@/data/careers";
import { LoginIntro } from "@/components/ui/login-intro";
import { Footer } from "@/components/layout/Footer";

export default function DashboardPage() {
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

  React.useEffect(() => {
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
      // Fallback in case storage access is restricted
    }
  }, []);

  const completedModules = learningModules.filter((m) => m.status === "Completed").length;
  const completedProjects = projects.filter((p) => p.status === "Completed");

  const assessmentScoreStr = assessmentResult ? `${assessmentResult.score}/100` : "Not Started";
  const gapAnalysisStr = userProfile.focusArea
    ? `Gap: ${userProfile.focusArea.split('&')[0].trim()}`
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
      route: "/assessment",
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
      route: "/assessment/results",
      cardBg: "bg-electric-coral text-black border-2 border-black",
      iconBg: "bg-black text-electric-coral",
      numColor: "text-black",
      scoreColor: "text-black",
    },
    {
      title: "3. Learning Track",
      sub: "NPTEL & IIT modules",
      icon: BookOpen,
      score: `${completedModules}/${learningModules.length} Done`,
      route: "/learning",
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
      route: "/projects",
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
      route: "/interview",
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
      route: "/opportunities",
      cardBg: "bg-electric-coral text-black border-2 border-black",
      iconBg: "bg-black text-electric-coral",
      numColor: "text-black",
      scoreColor: "text-black",
    },
  ];

  const journeySteps = [
    {
      num: "01",
      title: "Choose Your Career",
      desc: "Explore 24+ high-demand technical pathways across Software Engineering, AI/ML, DevOps, and Cybersecurity with transparent skill requirements and salary data.",
      route: "/onboarding",
      badge: "Career Discovery",
      cardClass: "bg-white text-black border-2 border-black hover:bg-royal-maroon hover:text-white group",
      badgeVariant: "maroon" as const,
    },
    {
      num: "02",
      title: "Assess Your Real Skills",
      desc: "Take focused, anti-distraction technical assessments with real code snippets, logic traps, and architectural questions—not simplistic school tests.",
      route: "/assessment",
      badge: "Diagnostics",
      cardClass: "bg-white text-black border-2 border-black hover:bg-electric-coral hover:text-black group",
      badgeVariant: "coral" as const,
    },
    {
      num: "03",
      title: "Identify Skill Gaps",
      desc: "Get an uncompromising diagnostic breakdown of your strengths and specific blind spots with actionable next steps mapped directly to your target role.",
      route: "/assessment/results",
      badge: "Gap Analysis",
      cardClass: "bg-white text-black border-2 border-black hover:bg-black hover:text-white group",
      badgeVariant: "night" as const,
    },
    {
      num: "04",
      title: "Learn & Practice Multilingually",
      desc: "Personalized curated modules from NPTEL, IITs, and official documentation with interactive code challenges and multi-language support (Tamil, Hindi, Telugu, etc.).",
      route: "/learning",
      badge: "Curated Training",
      cardClass: "bg-white text-black border-2 border-black hover:bg-royal-maroon hover:text-white group",
      badgeVariant: "maroon" as const,
    },
    {
      num: "05",
      title: "Build Real-World Projects",
      desc: "Implement production-grade applications—from escrow marketplaces to multi-tenant inventory SaaS—with milestone checkpoints and automated rubric evaluation.",
      route: "/projects",
      badge: "Verified Proof",
      cardClass: "bg-white text-black border-2 border-black hover:bg-electric-coral hover:text-black group",
      badgeVariant: "coral" as const,
    },
    {
      num: "06",
      title: "Prepare for Interviews",
      desc: "Rehearse technical architecture and behavioral questions in a realistic voice simulation with audio waveforms, pacing analysis, and STAR critique.",
      route: "/interview",
      badge: "Mock Simulation",
      cardClass: "bg-white text-black border-2 border-black hover:bg-black hover:text-white group",
      badgeVariant: "night" as const,
    },
    {
      num: "07",
      title: "Find Matching Opportunities",
      desc: "Access verified jobs, internships, and YC startups matched strictly against your demonstrated skill proficiencies and verified project portfolio.",
      route: "/opportunities",
      badge: "Targeted Placement",
      cardClass: "bg-white text-black border-2 border-black hover:bg-royal-maroon hover:text-white group",
      badgeVariant: "maroon" as const,
    },
    {
      num: "08",
      title: "Improve From Every Outcome",
      desc: "If an application is rejected, our engine conducts rejection analysis, highlights root-cause skill deficiencies, and generates an actionable retraining plan.",
      route: "/feedback",
      badge: "Continuous Retraining",
      cardClass: "bg-white text-black border-2 border-black hover:bg-electric-coral hover:text-black group",
      badgeVariant: "coral" as const,
    },
  ];

  return (
    <>
      {showIntro && <LoginIntro onComplete={() => setShowIntro(false)} />}
      <div className="space-y-14 sm:space-y-18 bg-white w-full">
      {/* ====================================================
          1. HERO SECTION (SOLID ROYAL MAROON #5E0000 HERO)
         ==================================================== */}
      <section className="relative w-full bg-royal-maroon text-white border-b-4 border-black py-12 sm:py-18 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-black text-electric-coral border-2 border-black text-xs font-mono font-black uppercase tracking-widest shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-electric-coral" />
              <span>The Career-Readiness Standard</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black tracking-tight text-white leading-[1.08] uppercase break-words">
              BUILD SKILLS. <br />
              <span className="text-electric-coral underline decoration-black decoration-4 underline-offset-8">PROVE YOUR ABILITY.</span> <br />
              GET HIRED.
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-white/90 font-medium max-w-2xl leading-relaxed">
              One cohesive career platform from verified skill assessment to real-world production projects, voice interview simulations, and targeted employment matching with automated rejection retraining.
            </p>

            {/* Action CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 max-w-md sm:max-w-none w-full">
              <Link href="/assessment" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto px-7 sm:px-8 py-3.5 rounded-lg bg-electric-coral hover:bg-white text-black border-2 border-black font-black text-sm sm:text-base transition-colors flex items-center justify-center gap-2.5 cursor-pointer shadow-editorial-sm">
                  <span>Start Initial Assessment</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </button>
              </Link>
              <Link href="/onboarding" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto px-7 sm:px-8 py-3.5 rounded-lg bg-black hover:bg-electric-coral hover:text-black text-white border-2 border-black font-black text-sm sm:text-base transition-colors flex items-center justify-center cursor-pointer shadow-editorial-sm">
                  <span>Explore 24+ Career Tracks</span>
                </button>
              </Link>
            </div>
          </div>

          {/* Right Hero Readiness High-Contrast Surface */}
          <div className="lg:col-span-5 rounded-2xl bg-black border-3 border-electric-coral p-6 sm:p-7 text-white shadow-editorial-md space-y-4">
            <div className="flex items-center justify-between border-b-2 border-white/20 pb-3">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-electric-coral font-black">Active Pathway</span>
                <h3 className="text-base font-extrabold text-white truncate max-w-[200px]">{selectedRole.title}</h3>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-mono uppercase tracking-widest text-white/70 font-bold">Salary Avg</span>
                <p className="text-xs font-mono font-black text-electric-coral">{selectedRole.averageSalary}</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-baseline justify-between">
                <span className="text-xs text-white/90 font-bold uppercase tracking-wider">Candidate Readiness</span>
                <span className="text-4xl font-mono font-black text-electric-coral">{userProfile.readinessScore}%</span>
              </div>
              <ProgressBar value={userProfile.readinessScore} size="md" variant="electric-coral" />
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
              <div className="p-3 rounded-lg bg-white/10 border border-white/20">
                <span className="text-[10px] text-white/70 font-mono uppercase font-bold block">Gamified XP</span>
                <span className="text-base font-mono font-black text-electric-coral">{userProfile.xp} XP</span>
              </div>
              <div className="p-3 rounded-lg bg-white/10 border border-white/20">
                <span className="text-[10px] text-white/70 font-mono uppercase font-bold block">Streak Count</span>
                <span className="text-base font-mono font-black text-white">{userProfile.streakDays} Days</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          2. COLOR-BLOCKED METRIC SYSTEM (RHYTHMIC 9-CARD GRID)
         ==================================================== */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Section Headline Banner in Electric Coral */}
        <div className="p-6 sm:p-8 rounded-2xl bg-electric-coral text-black border-3 border-black shadow-editorial-md mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-black text-white text-[10px] font-mono font-black uppercase tracking-wider mb-2">
              <span>Telemetry Engine // 9 Core Competency Tiers</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-black text-black tracking-tight uppercase leading-none">
              READINESS & PROGRESS OVERVIEW
            </h2>
          </div>
          <p className="text-xs font-black text-black max-w-md leading-relaxed">
            High-contrast visual cards representing each tier of your verified readiness profile across assessments, capstones, and interviews.
          </p>
        </div>

        {/* 9-Card Deliberate Color Mixture Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Card 1: READINESS (ROYAL MAROON BRAND SURFACE) */}
          <div className="p-6 rounded-xl bg-royal-maroon text-white border-2 border-black shadow-editorial-sm flex flex-col justify-between">
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-white">
                  Target Readiness
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-black bg-electric-coral text-black uppercase">
                  Primary Score
                </span>
              </div>
              <div className="flex items-baseline gap-2 pt-2">
                <span className="text-5xl font-mono font-black text-electric-coral tracking-tight">
                  {userProfile.readinessScore}%
                </span>
                <span className="text-xs text-white/80 font-bold uppercase">/ 100</span>
              </div>
            </div>

            <div className="pt-4 space-y-2 border-t border-white/20 mt-4">
              <div className="flex items-center justify-between text-xs">
                <span className="text-white/80 font-medium">Target Track:</span>
                <span className="font-black text-white truncate max-w-[160px]">
                  {selectedRole.title}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-white/80 font-medium">Primary Skill Gap:</span>
                <span className="font-black text-electric-coral font-mono truncate max-w-[160px]">
                  {userProfile.focusArea ? userProfile.focusArea.split("&")[0].trim() : "Pending Diagnostics"}
                </span>
              </div>
              <ProgressBar value={userProfile.readinessScore} size="sm" variant="electric-coral" />
            </div>
          </div>

          {/* Card 2: XP & STREAK (ELECTRIC CORAL BRAND SURFACE) */}
          <div className="p-6 rounded-xl bg-electric-coral text-black border-2 border-black shadow-editorial-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-black uppercase tracking-wider text-black">
                  Candidate Experience
                </span>
                <div className="w-8 h-8 rounded-lg bg-black text-electric-coral flex items-center justify-center font-bold">
                  <Flame className="w-4 h-4 fill-electric-coral" />
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-mono font-black text-black">
                  {userProfile.xp} XP
                </span>
              </div>
              <p className="text-xs text-black font-black mt-1">
                {userProfile.streakDays} Days Continuous Learning Streak
              </p>
            </div>

            <div className="mt-4 pt-3 border-t-2 border-black/20 flex items-center justify-between text-xs">
              <span className="text-black/80 font-bold">Daily Milestone:</span>
              <span className="font-black text-black uppercase font-mono">Active Today</span>
            </div>
          </div>

          {/* Card 3: CAREER TRACK (SOLID BLACK SURFACE) */}
          <div className="p-6 rounded-xl bg-black text-white border-2 border-black shadow-editorial-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-white/70 uppercase tracking-wider">
                  Target Pathway
                </span>
                <div className="w-8 h-8 rounded-lg bg-electric-coral text-black flex items-center justify-center font-bold">
                  <Target className="w-4 h-4" />
                </div>
              </div>
              <h3 className="text-lg font-black text-white leading-snug">
                {selectedRole.title}
              </h3>
              <p className="text-xs font-mono font-black text-electric-coral mt-1">
                {selectedRole.averageSalary}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-white/20 flex items-center justify-between text-xs">
              <span className="text-white/70 font-medium">24+ Paths</span>
              <Link href="/onboarding" className="font-black text-electric-coral hover:underline flex items-center gap-1">
                <span>Switch Track</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 4: TECHNICAL ASSESSMENT (WHITE SURFACE WITH MAROON ACCENTS) */}
          <div className="p-6 rounded-xl bg-white text-black border-2 border-black shadow-editorial-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-black/70 uppercase tracking-wider">
                  Diagnostic Assessment
                </span>
                <div className="w-8 h-8 rounded-lg bg-royal-maroon text-white flex items-center justify-center font-bold">
                  <CheckSquare className="w-4 h-4" />
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-mono font-black text-royal-maroon">
                  {assessmentScoreStr}
                </span>
              </div>
              <p className="text-xs text-black/70 font-medium mt-1">
                {assessmentResult ? `${assessmentResult.totalQuestions} Questions Verified` : "10 Diagnostic Questions Ready"}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t-2 border-black flex items-center justify-between text-xs">
              <Link href="/assessment" className="flex items-center justify-between w-full font-black text-black hover:text-electric-coral transition-colors">
                <span>{assessmentResult ? "Retake Diagnostic" : "Start 20-min Test"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 5: PERSONALIZED LEARNING (ROYAL MAROON SURFACE) */}
          <div className="p-6 rounded-xl bg-royal-maroon text-white border-2 border-black shadow-editorial-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-white/80 uppercase tracking-wider">
                  Personalized Learning
                </span>
                <div className="w-8 h-8 rounded-lg bg-electric-coral text-black flex items-center justify-center font-bold">
                  <BookOpen className="w-4 h-4" />
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-mono font-black text-electric-coral">
                  {learningProgressStr}
                </span>
                <span className="text-xs text-white/80 font-bold">Curriculum</span>
              </div>
              <p className="text-xs text-white/80 mt-1">
                {completedModules} of {learningModules.length} curated modules finished
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-white/20 space-y-2">
              <ProgressBar value={completedModules} max={learningModules.length || 1} size="sm" variant="electric-coral" />
              <Link href="/learning" className="flex items-center justify-between text-xs font-black text-electric-coral hover:underline pt-1">
                <span>Continue Modules</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 6: PRODUCTION PROJECTS (ELECTRIC CORAL SURFACE) */}
          <div className="p-6 rounded-xl bg-electric-coral text-black border-2 border-black shadow-editorial-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-black uppercase tracking-wider text-black">
                  Real-World Projects
                </span>
                <div className="w-8 h-8 rounded-lg bg-black text-electric-coral flex items-center justify-center font-bold">
                  <FolderGit2 className="w-4 h-4" />
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-mono font-black text-black">
                  {completedProjects.length}
                </span>
                <span className="text-xs text-black/80 font-bold">Verified Repos</span>
              </div>
              <p className="text-xs text-black/80 font-bold mt-1">
                {projects.length} production capstones available in catalog
              </p>
            </div>

            <div className="mt-4 pt-3 border-t-2 border-black/20 flex items-center justify-between text-xs">
              <span className="text-black font-mono font-black">Rubric Graded</span>
              <Link href="/projects" className="font-black text-black hover:text-white flex items-center gap-1 transition-colors">
                <span>Open Catalog</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 7: INTERVIEW SIMULATION (SOLID BLACK SURFACE) */}
          <div className="p-6 rounded-xl bg-black text-white border-2 border-black shadow-editorial-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-white/70 uppercase tracking-wider">
                  Interview Defense
                </span>
                <div className="w-8 h-8 rounded-lg bg-electric-coral text-black flex items-center justify-center font-bold">
                  <Mic className="w-4 h-4" />
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-mono font-black text-electric-coral">
                  {voiceScoreStr}
                </span>
              </div>
              <p className="text-xs text-white/80 mt-1">
                Real-time voice evaluation with STAR framework critique
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-white/20 flex items-center justify-between text-xs">
              <span className="text-white/70 font-medium">Architecture & Logic</span>
              <Link href="/interview" className="font-black text-electric-coral hover:underline flex items-center gap-1">
                <span>Launch Session</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 8: RESUME & ATS ENGINE (WHITE SURFACE WITH MAROON ACCENT) */}
          <div className="p-6 rounded-xl bg-white text-black border-2 border-black shadow-editorial-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-black/70 uppercase tracking-wider">
                  Resume & ATS Engine
                </span>
                <div className="w-8 h-8 rounded-lg bg-royal-maroon text-white flex items-center justify-center font-bold">
                  <FileText className="w-4 h-4" />
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-mono font-black text-royal-maroon">
                  {atsAnalysis ? `${atsAnalysis.overallScore}%` : "Not Scanned"}
                </span>
                <span className="text-xs text-black/70 font-bold">ATS Score</span>
              </div>
              <p className="text-xs text-black/70 mt-1">
                Single-column, keyword-verified format for hiring systems
              </p>
            </div>

            <div className="mt-4 pt-3 border-t-2 border-black flex items-center justify-between text-xs">
              <span className="text-black/70 font-bold">PDF & DOCX Parser</span>
              <Link href="/resume" className="font-black text-royal-maroon hover:text-electric-coral flex items-center gap-1 transition-colors">
                <span>Edit Resume</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 9: APPLICATION TRACKER (ROYAL MAROON SURFACE) */}
          <div className="p-6 rounded-xl bg-royal-maroon text-white border-2 border-black shadow-editorial-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-white/80 uppercase tracking-wider">
                  Application Tracker
                </span>
                <div className="w-8 h-8 rounded-lg bg-electric-coral text-black flex items-center justify-center font-bold">
                  <Kanban className="w-4 h-4" />
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-mono font-black text-electric-coral">
                  {applications.length}
                </span>
                <span className="text-xs text-white/80 font-bold">Submissions</span>
              </div>
              <p className="text-xs text-white/80 mt-1">
                Automated root-cause analysis for any rejected submission
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-white/20 flex items-center justify-between text-xs">
              <span className="text-white/80 font-medium">7 Kanban Stages</span>
              <Link href="/applications" className="font-black text-electric-coral hover:underline flex items-center gap-1">
                <span>Open Tracker</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          3. 6-NODE VERIFIED PIPELINE (RHYTHMIC COLOR BLOCKS)
         ==================================================== */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-8 border-b-2 border-black pb-4">
          <p className="text-xs uppercase tracking-widest text-black font-black font-mono">
            The 6-Node Verified Career Pipeline
          </p>
          <h2 className="text-2xl sm:text-3xl font-display font-black text-black uppercase tracking-tight mt-1">
            Progressive Skill Verification
          </h2>
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
                  <h3 className="text-xs font-black leading-snug">
                    {node.title}
                  </h3>
                  <p className="text-[11px] opacity-80 mt-0.5">{node.sub}</p>
                </div>
                <div className="mt-3 pt-2.5 border-t border-current/20 flex items-center justify-between">
                  <span className={`text-[10px] font-mono font-black truncate max-w-[100px] ${node.scoreColor}`}>{node.score}</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform shrink-0" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ====================================================
          4. 8-STEP STRUCTURED JOURNEY
         ==================================================== */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b-2 border-black pb-6">
          <div>
            <span className="px-2.5 py-1 rounded bg-black text-electric-coral text-[10px] font-mono font-black uppercase tracking-wider mb-2 inline-block">
              Progression Framework
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-black text-black tracking-tight uppercase">
              HOW LEARN-2-HIRE WORKS
            </h2>
            <p className="text-xs sm:text-sm text-black/70 mt-1 max-w-xl font-medium">
              An evidence-based pipeline that continuously converts effort into verifiable technical readiness and job offers.
            </p>
          </div>
          <Link href="/onboarding">
            <button className="px-5 py-2.5 rounded-lg bg-white text-black hover:bg-black hover:text-white border-2 border-black font-black text-xs transition-colors flex items-center gap-2 cursor-pointer shadow-editorial-xs">
              <span>View All 24 Tracks</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {journeySteps.map((step) => (
            <Link
              key={step.num}
              href={step.route}
              className={`p-5 rounded-xl transition-all duration-150 flex flex-col justify-between shadow-editorial-sm ${step.cardClass}`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl font-mono font-black">
                    {step.num}
                  </span>
                  <Badge variant={step.badgeVariant} size="sm">
                    {step.badge}
                  </Badge>
                </div>
                <h3 className="text-sm font-black mb-2">
                  {step.title}
                </h3>
                <p className="text-xs opacity-80 leading-relaxed font-normal">
                  {step.desc}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-current/20 flex items-center justify-between text-xs">
                <span className="font-black text-[11px]">Explore Step</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ====================================================
          5. LIVE READINESS & CAREER SELECTOR DEMO
         ==================================================== */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="rounded-2xl bg-white border-3 border-black p-6 sm:p-10 relative overflow-hidden shadow-editorial-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Col: Career Track Switcher */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <Badge variant="coral" size="sm" className="mb-2">Capability Engine</Badge>
                <h2 className="text-2xl sm:text-3xl font-display font-black text-black tracking-tight uppercase">
                  TAILORED TO YOUR TECHNICAL TARGET
                </h2>
                <p className="text-xs sm:text-sm text-black/70 mt-1 leading-relaxed font-medium">
                  Select a target role below to see how Learn-2-Hire calculates expected skill weights, assessment benchmarks, and customized learning paths.
                </p>
              </div>

              {/* Role Quick Selector */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {CAREER_ROLES.slice(0, 4).map((role) => (
                  <button
                    key={role.id}
                    onClick={() => {
                      setPreviewRole(role);
                      selectRole(role.id);
                    }}
                    className={`p-3 sm:p-3.5 rounded-lg text-left transition-all text-xs border-2 ${
                      previewRole.id === role.id
                        ? "bg-black border-black text-white shadow-editorial-xs"
                        : "bg-surface border-black/30 text-black hover:border-black"
                    }`}
                  >
                    <p className={`font-black ${previewRole.id === role.id ? "text-white" : "text-black"}`}>{role.title}</p>
                    <p className={`text-[11px] font-bold font-mono mt-0.5 ${previewRole.id === role.id ? "text-electric-coral" : "text-black/60"}`}>{role.averageSalary}</p>
                  </button>
                ))}
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                <Link href="/assessment" className="w-full sm:w-auto">
                  <button className="w-full sm:w-auto px-6 py-3 rounded-lg bg-royal-maroon hover:bg-electric-coral hover:text-black text-white border-2 border-black font-black text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-editorial-xs">
                    <span>Assess for {previewRole.title}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
                <Link href="/onboarding" className="w-full sm:w-auto">
                  <button className="w-full sm:w-auto px-6 py-3 rounded-lg bg-white text-black hover:bg-black hover:text-white border-2 border-black font-black text-xs sm:text-sm transition-colors flex items-center justify-center cursor-pointer shadow-editorial-xs">
                    <span>All 24 Tracks</span>
                  </button>
                </Link>
              </div>
            </div>

            {/* Right Col: Readiness Matrix Card (High Contrast Dark Block) */}
            <div className="lg:col-span-6 rounded-xl bg-black p-6 border-2 border-black text-white space-y-5 shadow-editorial-sm">
              <div className="flex items-center justify-between border-b border-white/20 pb-4">
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-white/70 font-bold">
                    Target Readiness Score
                  </span>
                  <h3 className="text-lg font-black text-white">{previewRole.title}</h3>
                </div>
                <div className="text-right">
                  <span className="text-3xl font-black font-mono text-electric-coral">
                    {userProfile.readinessScore}%
                  </span>
                  <p className="text-[10px] text-white/70 font-black uppercase tracking-wider font-mono">
                    {userProfile.readinessScore > 0 ? "Verified State" : "Unverified"}
                  </p>
                </div>
              </div>

              {/* Breakdown Bars */}
              <div className="space-y-3">
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-white/90 font-medium">Technical Assessments</span>
                    <span className="text-white font-black">{userProfile.readinessBreakdown.technicalSkills}%</span>
                  </div>
                  <ProgressBar value={userProfile.readinessBreakdown.technicalSkills} size="sm" variant="electric-coral" />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-white/90 font-medium">Production Projects</span>
                    <span className="text-white font-black">{userProfile.readinessBreakdown.projects}%</span>
                  </div>
                  <ProgressBar value={userProfile.readinessBreakdown.projects} size="sm" variant="royal-maroon" />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-white/90 font-medium">Problem Solving & SQL</span>
                    <span className="text-white font-black">{userProfile.readinessBreakdown.problemSolving}%</span>
                  </div>
                  <ProgressBar value={userProfile.readinessBreakdown.problemSolving} size="sm" variant="electric-coral" />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-white/90 font-medium">Interview Defense & STAR</span>
                    <span className="text-white font-black">{userProfile.readinessBreakdown.interview}%</span>
                  </div>
                  <ProgressBar value={userProfile.readinessBreakdown.interview} size="sm" variant="royal-maroon" />
                </div>
              </div>

              {/* Verified Highlights */}
              <div className="pt-3 border-t border-white/20 grid grid-cols-2 gap-2 text-xs">
                <div className="flex items-center gap-2 text-white/90">
                  <Check className="w-3.5 h-3.5 text-electric-coral stroke-[3]" />
                  <span className="font-bold">
                    {completedProjects.length > 0 ? `${completedProjects.length} Verified Capstones` : "0 Capstones Completed"}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-white/90">
                  <Check className="w-3.5 h-3.5 text-electric-coral stroke-[3]" />
                  <span className="font-bold">
                    {atsAnalysis ? `${atsAnalysis.overallScore}% ATS Match` : "Resume Pending"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          6. SOLID RECTANGULAR HERO FEATURE BLOCK (ROYAL MAROON)
         ==================================================== */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="rounded-2xl bg-royal-maroon p-8 sm:p-14 text-white shadow-editorial-md relative overflow-hidden border-3 border-black">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs uppercase font-mono tracking-widest text-black font-black bg-electric-coral px-3 py-1 rounded inline-block border-2 border-black">
              VERIFIABLE PROOF OVER CLAIMS
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-black text-white leading-tight uppercase">
              YOUR NEXT LEVEL STARTS HERE.
            </h2>
            <p className="text-sm sm:text-base text-white/95 font-medium leading-relaxed">
              No generic certificates. Build verifiable repositories, practice live voice architecture rounds, and apply directly to matching employers with transparent scorecards.
            </p>
            <div className="pt-4 flex flex-wrap gap-4">
              <Link href="/assessment">
                <button className="px-8 py-3.5 rounded-lg bg-electric-coral hover:bg-white text-black font-black border-2 border-black text-sm sm:text-base transition-colors flex items-center gap-2 cursor-pointer shadow-editorial-sm">
                  <span>Take Free Assessment</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          7. PLATFORM PILLARS (HIGH-CONTRAST COLOR BLOCKS)
         ==================================================== */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-12">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="px-3 py-1 rounded bg-black text-electric-coral text-xs font-mono font-black uppercase tracking-wider mb-2 inline-block border border-black">
            Platform Foundations
          </span>
          <h2 className="text-2xl sm:text-3xl font-display font-black text-black uppercase tracking-tight mt-2">
            ENGINEERED FOR GENUINE COMPETENCE
          </h2>
          <p className="text-xs sm:text-sm text-black/70 mt-1 font-medium">
            Built to overcome the shortcomings of generic tutorials and superficial coding tests.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Pillar 1: Multilingual Curriculum (Electric Coral Block) */}
          <div className="p-7 rounded-2xl bg-electric-coral border-3 border-black text-black space-y-4 shadow-editorial-sm hover:-translate-y-1 transition-transform">
            <div className="w-10 h-10 rounded-lg bg-black text-electric-coral flex items-center justify-center font-bold">
              <Globe className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-black text-black">
              Multilingual Technical Learning (6 Indic Languages)
            </h3>
            <p className="text-xs text-black/90 font-medium leading-relaxed">
              Complex concepts in system architecture, V8 microtasks, and PostgreSQL isolation levels summarized natively in Tamil, Hindi, Telugu, Malayalam, Kannada, and English.
            </p>
            <div className="pt-2 flex flex-wrap gap-2 text-[11px]">
              <span className="px-2.5 py-1 rounded bg-black text-white font-black border border-black">தமிழ்</span>
              <span className="px-2.5 py-1 rounded bg-black text-white font-black border border-black">हिन्दी</span>
              <span className="px-2.5 py-1 rounded bg-black text-white font-black border border-black">తెలుగు</span>
              <span className="px-2.5 py-1 rounded bg-black text-white font-black border border-black">മലയാളം</span>
              <span className="px-2.5 py-1 rounded bg-black text-white font-black border border-black">ಕನ್ನಡ</span>
            </div>
          </div>

          {/* Pillar 2: Production Projects (Black Block with Electric Coral CTA) */}
          <div className="p-7 rounded-2xl bg-black border-3 border-black text-white space-y-4 shadow-editorial-sm hover:-translate-y-1 transition-transform">
            <div className="w-10 h-10 rounded-lg bg-electric-coral text-black flex items-center justify-center font-bold">
              <FolderGit2 className="w-5 h-5 text-black" />
            </div>
            <h3 className="text-lg font-black text-white">
              Production Capstones with Rubric Evaluations
            </h3>
            <p className="text-xs text-white/80 font-normal leading-relaxed">
              No generic to-do apps. Build multi-tenant inventory systems, WebRTC telehealth portals, and milestone escrow ledgers evaluated on TypeScript strictness, DB query plans, and CI/CD.
            </p>
            <div className="pt-2 flex items-center gap-3 text-xs font-black text-electric-coral">
              <Link href="/projects" className="hover:underline flex items-center gap-1">
                <span>View Project Marketplace</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Pillar 3: Voice Interview Simulation (Royal Maroon Block) */}
          <div className="p-7 rounded-2xl bg-royal-maroon border-3 border-black text-white space-y-4 shadow-editorial-sm hover:-translate-y-1 transition-transform">
            <div className="w-10 h-10 rounded-lg bg-electric-coral text-black flex items-center justify-center font-bold">
              <Mic className="w-5 h-5 text-black" />
            </div>
            <h3 className="text-lg font-black text-white">
              Voice Technical & Behavioral Simulation
            </h3>
            <p className="text-xs text-white/90 font-medium leading-relaxed">
              Real-time speech evaluation measuring technical depth, verbal conciseness, pacing, and STAR framework adherence for system design and behavioral rounds.
            </p>
            <div className="pt-2 flex items-center gap-3 text-xs font-black text-electric-coral">
              <Link href="/interview" className="hover:underline flex items-center gap-1">
                <span>Try Voice Simulation</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Pillar 4: Outcome & Rejection Retraining (White Block with 3px Black Border) */}
          <div className="p-7 rounded-2xl bg-white border-3 border-black text-black space-y-4 shadow-editorial-sm hover:-translate-y-1 transition-transform">
            <div className="w-10 h-10 rounded-lg bg-black text-white flex items-center justify-center font-bold">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-black text-black">
              Root-Cause Rejection Analysis & Retraining Plan
            </h3>
            <p className="text-xs text-black/80 font-medium leading-relaxed">
              Turn rejections into targeted acceleration. If an application is turned down, our engine compares requirements, isolates missing skills, and prescribes a daily recovery roadmap.
            </p>
            <div className="pt-2 flex items-center gap-3 text-xs font-black text-royal-maroon hover:text-electric-coral">
              <Link href="/feedback" className="hover:underline flex items-center gap-1">
                <span>Inspect Retraining Engine</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Learn-2-Hire Dashboard Dedicated Footer */}
      <Footer />
    </div>
    </>
  );
}
