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
import { MetricCard } from "@/components/ui/MetricCard";
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
      accent: "border-t-4 border-t-electric-yellow",
      iconBg: "bg-electric-yellow text-foreground",
      badge: "Electric Yellow",
    },
    {
      title: "2. Gap Analysis",
      sub: "Targeted blindspots",
      icon: TrendingUp,
      score: gapAnalysisStr,
      route: "/assessment/results",
      accent: "border-t-4 border-t-honey-gold",
      iconBg: "bg-honey-gold text-foreground",
      badge: "Honey Gold",
    },
    {
      title: "3. Learning Track",
      sub: "NPTEL & IIT modules",
      icon: BookOpen,
      score: `${completedModules}/${learningModules.length} Done`,
      route: "/learning",
      accent: "border-t-4 border-t-acid-yellow",
      iconBg: "bg-acid-yellow text-foreground",
      badge: "Acid Yellow",
    },
    {
      title: "4. Capstone Build",
      sub: "Production-grade apps",
      icon: FolderGit2,
      score: capstoneScoreStr,
      route: "/projects",
      accent: "border-t-4 border-t-deep-navy",
      iconBg: "bg-deep-navy text-white",
      badge: "Deep Navy",
    },
    {
      title: "5. Voice Defense",
      sub: "STAR & architecture",
      icon: Mic,
      score: voiceScoreStr,
      route: "/interview",
      accent: "border-t-4 border-t-ultra-violet",
      iconBg: "bg-ultra-violet text-white",
      badge: "Ultra Violet",
    },
    {
      title: "6. Match Engine",
      sub: "Direct applications",
      icon: Briefcase,
      score: topMatchStr,
      route: "/opportunities",
      accent: "border-t-4 border-t-honey-gold",
      iconBg: "bg-honey-gold text-foreground",
      badge: "Honey Gold",
    },
  ];

  const journeySteps = [
    {
      num: "01",
      title: "Choose Your Career",
      desc: "Explore 24+ high-demand technical pathways across Software Engineering, AI/ML, DevOps, and Cybersecurity with transparent skill requirements and salary data.",
      route: "/onboarding",
      badge: "Career Discovery",
      accentClass: "border-honey-gold text-[#DDA300]",
    },
    {
      num: "02",
      title: "Assess Your Real Skills",
      desc: "Take focused, anti-distraction technical assessments with real code snippets, logic traps, and architectural questions—not simplistic school tests.",
      route: "/assessment",
      badge: "Diagnostics",
      accentClass: "border-electric-yellow text-[#B8A000]",
    },
    {
      num: "03",
      title: "Identify Skill Gaps",
      desc: "Get an uncompromising diagnostic breakdown of your strengths and specific blind spots with actionable next steps mapped directly to your target role.",
      route: "/assessment/results",
      badge: "Gap Analysis",
      accentClass: "border-honey-gold text-[#DDA300]",
    },
    {
      num: "04",
      title: "Learn & Practice Multilingually",
      desc: "Personalized curated modules from NPTEL, IITs, and official documentation with interactive code challenges and multi-language support (Tamil, Hindi, Telugu, etc.).",
      route: "/learning",
      badge: "Curated Training",
      accentClass: "border-acid-yellow text-[#97A700]",
    },
    {
      num: "05",
      title: "Build Real-World Projects",
      desc: "Implement production-grade applications—from escrow marketplaces to multi-tenant inventory SaaS—with milestone checkpoints and automated rubric evaluation.",
      route: "/projects",
      badge: "Verified Proof",
      accentClass: "border-deep-navy text-deep-navy",
    },
    {
      num: "06",
      title: "Prepare for Interviews",
      desc: "Rehearse technical architecture and behavioral questions in a realistic voice simulation with audio waveforms, pacing analysis, and STAR critique.",
      route: "/interview",
      badge: "Mock Simulation",
      accentClass: "border-ultra-violet text-ultra-violet",
    },
    {
      num: "07",
      title: "Find Matching Opportunities",
      desc: "Access verified jobs, internships, and YC startups matched strictly against your demonstrated skill proficiencies and verified project portfolio.",
      route: "/opportunities",
      badge: "Targeted Placement",
      accentClass: "border-honey-gold text-[#DDA300]",
    },
    {
      num: "08",
      title: "Improve From Every Outcome",
      desc: "If an application is rejected, our engine conducts rejection analysis, highlights root-cause skill deficiencies, and generates an actionable retraining plan.",
      route: "/feedback",
      badge: "Continuous Retraining",
      accentClass: "border-ultra-violet text-ultra-violet",
    },
  ];

  return (
    <>
      {showIntro && <LoginIntro onComplete={() => setShowIntro(false)} />}
      <div className="space-y-16 sm:space-y-20 bg-white">
      {/* ====================================================
          1. HERO EDITORIAL HEADLINE
         ==================================================== */}
      <section className="relative pt-10 pb-4 sm:pt-16 sm:pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-surface border border-border text-xs text-foreground animate-fade-in shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-fire-red" />
            <span className="font-extrabold tracking-wider uppercase text-[10px] sm:text-[11px]">The Career-Readiness Standard</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-7xl font-display font-extrabold tracking-tight text-foreground leading-[1.08] uppercase break-words">
            BUILD SKILLS. <br />
            <span className="text-fire-red">PROVE YOUR ABILITY.</span> <br />
            GET READY.
          </h1>

          <p className="text-sm sm:text-base lg:text-lg text-muted max-w-2xl mx-auto leading-relaxed font-normal">
            One cohesive career platform from verified skill assessment to real-world production projects, voice interview simulations, and targeted employment matching with automated rejection retraining.
          </p>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 max-w-md sm:max-w-none mx-auto w-full">
            <Link href="/assessment" className="w-full sm:w-auto">
              <Button size="lg" variant="primary" className="w-full sm:w-auto px-6 sm:px-8 gap-2.5 text-sm sm:text-base font-extrabold shadow-sm">
                <span>Start Initial Assessment</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/onboarding" className="w-full sm:w-auto">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto px-6 sm:px-7 text-sm sm:text-base font-extrabold">
                <span>Explore 24+ Career Tracks</span>
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ====================================================
          2. BOLD EDITORIAL METRIC SYSTEM (9 Core Cards)
         ==================================================== */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-3 border-b border-border pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="fire-red" size="sm">Live Telemetry</Badge>
              <span className="text-[11px] font-mono uppercase tracking-wider text-muted font-bold">
                Candidate Competency Engine
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-foreground tracking-tight uppercase">
              READINESS & PROGRESS OVERVIEW
            </h2>
          </div>
          <p className="text-xs text-muted max-w-md font-medium">
            Controlled high-saturation metric cards representing each tier of your verified readiness profile.
          </p>
        </div>

        {/* 9-Card Editorial Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* 1. READINESS CARD (Fire Red Hero Metric) */}
          <div className="p-6 rounded-xl bg-white border-2 border-foreground shadow-editorial-sm flex flex-col justify-between relative overflow-hidden border-l-8 border-l-fire-red">
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-foreground uppercase tracking-wider">
                  Target Readiness
                </span>
                <Badge variant="fire-red" size="sm">Dashboard Accent</Badge>
              </div>
              <div className="flex items-baseline gap-2 pt-2">
                <span className="text-5xl font-mono font-extrabold text-fire-red tracking-tight">
                  {userProfile.readinessScore}%
                </span>
                <span className="text-xs text-muted font-bold uppercase">/ 100</span>
              </div>
            </div>

            <div className="pt-4 space-y-2.5 border-t border-border mt-4">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted font-medium">Target Track:</span>
                <span className="font-extrabold text-foreground truncate max-w-[160px]">
                  {selectedRole.title}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted font-medium">Primary Skill Gap:</span>
                <span className="font-extrabold text-fire-red font-mono truncate max-w-[160px]">
                  {userProfile.focusArea ? userProfile.focusArea.split("&")[0].trim() : "Pending Diagnostics"}
                </span>
              </div>
              <ProgressBar value={userProfile.readinessScore} size="sm" variant="fire-red" />
            </div>
          </div>

          {/* 2. XP & STREAK CARD (Honey Gold / Yellow Accent) */}
          <MetricCard
            label="Candidate Experience"
            value={`${userProfile.xp} XP`}
            subValue={`${userProfile.streakDays} Days Continuous Learning Streak`}
            accent="honey-gold"
            icon={Flame}
            badge="Gamified Mastery"
            footer={
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted font-medium">Daily Streak Target:</span>
                <span className="font-bold text-foreground">Completed Today</span>
              </div>
            }
          />

          {/* 3. CAREER TRACK CARD (Honey Gold) */}
          <div className="p-5 rounded-xl bg-white border border-border border-l-4 border-l-honey-gold shadow-card-clean flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-muted uppercase tracking-wider">
                  Target Pathway
                </span>
                <div className="w-8 h-8 rounded-lg bg-honey-gold/20 text-foreground flex items-center justify-center font-bold">
                  <Target className="w-4 h-4 text-[#DDA300]" />
                </div>
              </div>
              <h3 className="text-lg font-extrabold text-foreground leading-snug">
                {selectedRole.title}
              </h3>
              <p className="text-xs font-mono font-bold text-[#DDA300] mt-1">
                {selectedRole.averageSalary}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-xs">
              <span className="text-muted font-medium">24+ Paths</span>
              <Link href="/onboarding" className="font-extrabold text-foreground hover:text-fire-red flex items-center gap-1">
                <span>Switch Track</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* 4. TECHNICAL ASSESSMENT CARD (Electric Yellow) */}
          <MetricCard
            label="Diagnostic Assessment"
            value={assessmentScoreStr}
            subValue={assessmentResult ? `${assessmentResult.totalQuestions} Questions Verified` : "10 Diagnostic Questions Ready"}
            accent="electric-yellow"
            icon={CheckSquare}
            badge="Electric Yellow"
            footer={
              <Link href="/assessment" className="flex items-center justify-between text-xs font-extrabold text-foreground hover:text-fire-red">
                <span>{assessmentResult ? "Retake Diagnostic" : "Start 20-min Test"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            }
          />

          {/* 5. PERSONALIZED LEARNING (Acid Yellow) */}
          <div className="p-5 rounded-xl bg-white border border-border border-l-4 border-l-acid-yellow shadow-card-clean flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-muted uppercase tracking-wider">
                  Personalized Learning
                </span>
                <div className="w-8 h-8 rounded-lg bg-acid-yellow text-foreground flex items-center justify-center font-bold">
                  <BookOpen className="w-4 h-4 text-foreground" />
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold font-mono text-foreground">
                  {learningProgressStr}
                </span>
                <span className="text-xs text-muted font-bold">Curriculum</span>
              </div>
              <p className="text-xs text-muted mt-1">
                {completedModules} of {learningModules.length} curated modules finished
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-border space-y-2">
              <ProgressBar value={completedModules} max={learningModules.length || 1} size="sm" variant="acid-yellow" />
              <Link href="/learning" className="flex items-center justify-between text-xs font-extrabold text-foreground hover:text-fire-red pt-1">
                <span>Continue Modules</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* 6. PRODUCTION PROJECTS (Deep Navy) */}
          <div className="p-5 rounded-xl bg-white border border-border border-l-4 border-l-deep-navy shadow-card-clean flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-muted uppercase tracking-wider">
                  Real-World Projects
                </span>
                <div className="w-8 h-8 rounded-lg bg-deep-navy text-white flex items-center justify-center font-bold">
                  <FolderGit2 className="w-4 h-4 text-white" />
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold font-mono text-deep-navy">
                  {completedProjects.length}
                </span>
                <span className="text-xs text-muted font-bold">Verified Repos</span>
              </div>
              <p className="text-xs text-muted mt-1">
                {projects.length} production capstones available in catalog
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-xs">
              <span className="text-deep-navy font-bold font-mono">Rubric Graded</span>
              <Link href="/projects" className="font-extrabold text-deep-navy hover:underline flex items-center gap-1">
                <span>Open Catalog</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* 7. INTERVIEW SIMULATION (Ultra Violet) */}
          <div className="p-5 rounded-xl bg-white border border-border border-l-4 border-l-ultra-violet shadow-card-clean flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-muted uppercase tracking-wider">
                  Interview Defense
                </span>
                <div className="w-8 h-8 rounded-lg bg-ultra-violet-50 text-ultra-violet border border-ultra-violet-200 flex items-center justify-center font-bold">
                  <Mic className="w-4 h-4 text-ultra-violet" />
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold font-mono text-ultra-violet">
                  {voiceScoreStr}
                </span>
              </div>
              <p className="text-xs text-muted mt-1">
                Real-time voice evaluation with STAR framework critique
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-xs">
              <span className="text-muted font-medium">Architecture & Logic</span>
              <Link href="/interview" className="font-extrabold text-ultra-violet hover:underline flex items-center gap-1">
                <span>Launch Session</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* 8. RESUME & ATS ENGINE (Fire Red) */}
          <div className="p-5 rounded-xl bg-white border border-border border-l-4 border-l-fire-red shadow-card-clean flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-muted uppercase tracking-wider">
                  Resume & ATS Engine
                </span>
                <div className="w-8 h-8 rounded-lg bg-fire-red-50 text-fire-red border border-fire-red-200 flex items-center justify-center font-bold">
                  <FileText className="w-4 h-4 text-fire-red" />
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold font-mono text-fire-red">
                  {atsAnalysis ? `${atsAnalysis.overallScore}%` : "Not Scanned"}
                </span>
                <span className="text-xs text-muted font-bold">ATS Score</span>
              </div>
              <p className="text-xs text-muted mt-1">
                Single-column, keyword-verified format for hiring systems
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-xs">
              <span className="text-muted font-medium">PDF & DOCX Parser</span>
              <Link href="/resume" className="font-extrabold text-fire-red hover:underline flex items-center gap-1">
                <span>Edit Resume</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* 9. APPLICATIONS TRACKER (Acid Yellow) */}
          <div className="p-5 rounded-xl bg-white border border-border border-l-4 border-l-acid-yellow shadow-card-clean flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-muted uppercase tracking-wider">
                  Application Tracker
                </span>
                <div className="w-8 h-8 rounded-lg bg-acid-yellow text-foreground flex items-center justify-center font-bold">
                  <Kanban className="w-4 h-4 text-foreground" />
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold font-mono text-foreground">
                  {applications.length}
                </span>
                <span className="text-xs text-muted font-bold">Active Submissions</span>
              </div>
              <p className="text-xs text-muted mt-1">
                Automated root-cause analysis for any rejected submission
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-xs">
              <span className="text-muted font-medium">7 Kanban Stages</span>
              <Link href="/applications" className="font-extrabold text-foreground hover:text-fire-red flex items-center gap-1">
                <span>Open Tracker</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          3. 6-NODE VERIFIED PIPELINE
         ==================================================== */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-8 border-b border-border pb-4">
          <p className="text-xs uppercase tracking-widest text-muted font-extrabold">
            The 6-Node Verified Career Pipeline
          </p>
          <h2 className="text-xl sm:text-2xl font-display font-extrabold text-foreground uppercase tracking-tight mt-1">
            Progressive Skill Verification
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-4 relative">
          {pipelineNodes.map((node, i) => {
            const Icon = node.icon;
            return (
              <Link
                key={i}
                href={node.route}
                className={`group relative p-3 sm:p-4 rounded-xl bg-white border border-border hover:border-foreground transition-all duration-150 flex flex-col justify-between shadow-card-clean hover:shadow-editorial-sm ${node.accent}`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold ${node.iconBg}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono font-extrabold text-muted">0{i + 1}</span>
                </div>
                <div>
                  <h3 className="text-xs font-extrabold text-foreground group-hover:text-fire-red transition-colors leading-snug">
                    {node.title}
                  </h3>
                  <p className="text-[11px] text-muted mt-0.5">{node.sub}</p>
                </div>
                <div className="mt-3 pt-2.5 border-t border-border flex items-center justify-between">
                  <span className="text-[10px] text-foreground font-mono font-extrabold truncate max-w-[100px]">{node.score}</span>
                  <ChevronRight className="w-3 h-3 text-muted group-hover:text-foreground group-hover:translate-x-0.5 transition-all shrink-0" />
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
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-border pb-6">
          <div>
            <Badge variant="fire-red" size="sm" className="mb-2">Progression Framework</Badge>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-foreground tracking-tight uppercase">
              HOW LEARN-2-HIRE WORKS
            </h2>
            <p className="text-xs sm:text-sm text-muted mt-1 max-w-xl">
              An evidence-based pipeline that continuously converts effort into verifiable technical readiness and job offers.
            </p>
          </div>
          <Link href="/onboarding">
            <Button variant="secondary" size="sm" className="gap-2 font-extrabold">
              <span>View All 24 Tracks</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {journeySteps.map((step) => (
            <Link
              key={step.num}
              href={step.route}
              className="group p-5 rounded-xl bg-white border border-border hover:border-foreground transition-all duration-150 flex flex-col justify-between hover:shadow-editorial-sm"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl font-mono font-extrabold text-border group-hover:text-foreground transition-colors">
                    {step.num}
                  </span>
                  <Badge variant="neutral" size="sm">
                    {step.badge}
                  </Badge>
                </div>
                <h3 className="text-sm font-extrabold text-foreground group-hover:text-fire-red transition-colors mb-2">
                  {step.title}
                </h3>
                <p className="text-xs text-muted leading-relaxed font-normal">
                  {step.desc}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-xs text-muted group-hover:text-foreground">
                <span className="font-extrabold text-[11px]">Explore Step</span>
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
        <div className="rounded-2xl bg-white border-2 border-foreground p-6 sm:p-10 relative overflow-hidden shadow-editorial-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Col: Career Track Switcher */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <Badge variant="honey-gold" size="sm" className="mb-2">Capability Engine</Badge>
                <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-foreground tracking-tight uppercase">
                  TAILORED TO YOUR TECHNICAL TARGET
                </h2>
                <p className="text-xs sm:text-sm text-muted mt-1 leading-relaxed">
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
                    className={`p-3 sm:p-3.5 rounded-lg text-left transition-all text-xs border ${
                      previewRole.id === role.id
                        ? "bg-foreground border-foreground text-white shadow-sm"
                        : "bg-surface border-border text-foreground hover:border-foreground"
                    }`}
                  >
                    <p className={`font-extrabold ${previewRole.id === role.id ? "text-white" : "text-foreground"}`}>{role.title}</p>
                    <p className={`text-[11px] font-bold mt-0.5 ${previewRole.id === role.id ? "text-fire-red" : "text-muted"}`}>{role.averageSalary}</p>
                  </button>
                ))}
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                <Link href="/assessment" className="w-full sm:w-auto">
                  <Button size="md" variant="primary" className="w-full sm:w-auto gap-2 font-extrabold shadow-sm">
                    <span>Assess for {previewRole.title}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/onboarding" className="w-full sm:w-auto">
                  <Button variant="secondary" size="md" className="w-full sm:w-auto font-extrabold">
                    <span>All 24 Tracks</span>
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Col: Readiness Matrix Card (High Contrast Dark Block) */}
            <div className="lg:col-span-6 rounded-xl bg-foreground p-6 border-2 border-foreground text-white space-y-5 shadow-editorial-sm">
              <div className="flex items-center justify-between border-b border-white/20 pb-4">
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-white/70 font-bold">
                    Target Readiness Score
                  </span>
                  <h3 className="text-lg font-extrabold text-white">{previewRole.title}</h3>
                </div>
                <div className="text-right">
                  <span className="text-3xl font-extrabold font-mono text-fire-red">
                    {userProfile.readinessScore}%
                  </span>
                  <p className="text-[10px] text-white/70 font-extrabold uppercase tracking-wider font-mono">
                    {userProfile.readinessScore > 0 ? "Verified State" : "Unverified"}
                  </p>
                </div>
              </div>

              {/* Breakdown Bars */}
              <div className="space-y-3">
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-white/90 font-medium">Technical Assessments</span>
                    <span className="text-white font-extrabold">{userProfile.readinessBreakdown.technicalSkills}%</span>
                  </div>
                  <ProgressBar value={userProfile.readinessBreakdown.technicalSkills} size="sm" variant="fire-red" />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-white/90 font-medium">Production Projects</span>
                    <span className="text-white font-extrabold">{userProfile.readinessBreakdown.projects}%</span>
                  </div>
                  <ProgressBar value={userProfile.readinessBreakdown.projects} size="sm" variant="deep-navy" />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-white/90 font-medium">Problem Solving & SQL</span>
                    <span className="text-white font-extrabold">{userProfile.readinessBreakdown.problemSolving}%</span>
                  </div>
                  <ProgressBar value={userProfile.readinessBreakdown.problemSolving} size="sm" variant="fire-red" />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-white/90 font-medium">Interview Defense & STAR</span>
                    <span className="text-white font-extrabold">{userProfile.readinessBreakdown.interview}%</span>
                  </div>
                  <ProgressBar value={userProfile.readinessBreakdown.interview} size="sm" variant="ultra-violet" />
                </div>
              </div>

              {/* Verified Highlights */}
              <div className="pt-3 border-t border-white/20 grid grid-cols-2 gap-2 text-xs">
                <div className="flex items-center gap-2 text-white/90">
                  <Check className="w-3.5 h-3.5 text-fire-red stroke-[3]" />
                  <span className="font-bold">
                    {completedProjects.length > 0 ? `${completedProjects.length} Verified Capstones` : "0 Capstones Completed"}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-white/90">
                  <Check className="w-3.5 h-3.5 text-fire-red stroke-[3]" />
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
          6. SOLID RECTANGULAR HERO FEATURE BLOCK (Fire Red)
         ==================================================== */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="rounded-2xl bg-fire-red p-8 sm:p-14 text-white shadow-editorial-md relative overflow-hidden border-2 border-foreground">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs uppercase font-mono tracking-widest text-white font-extrabold bg-foreground px-2.5 py-1 rounded inline-block">
              VERIFIABLE PROOF OVER CLAIMS
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white leading-tight uppercase">
              YOUR NEXT LEVEL STARTS HERE.
            </h2>
            <p className="text-sm sm:text-base text-white font-medium leading-relaxed">
              No generic certificates. Build verifiable repositories, practice live voice architecture rounds, and apply directly to matching employers with transparent scorecards.
            </p>
            <div className="pt-4 flex flex-wrap gap-4">
              <Link href="/assessment">
                <Button variant="dark" size="lg" className="font-extrabold shadow-sm">
                  <span>Take Free Assessment</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          7. PLATFORM PILLARS (Semantic Accents)
         ==================================================== */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-12">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Badge variant="night" size="sm" className="mb-2">Platform Foundations</Badge>
          <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-foreground uppercase tracking-tight">
            ENGINEERED FOR GENUINE COMPETENCE
          </h2>
          <p className="text-xs sm:text-sm text-muted mt-1">
            Built to overcome the shortcomings of generic tutorials and superficial coding tests.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Pillar 1: Multilingual Curriculum (Acid Yellow) */}
          <div className="p-6 rounded-xl bg-white border border-border border-l-4 border-l-acid-yellow space-y-4 shadow-card-clean hover:shadow-editorial-sm transition-all">
            <div className="w-10 h-10 rounded-lg bg-acid-yellow flex items-center justify-center text-foreground font-bold">
              <Globe className="w-5 h-5" />
            </div>
            <h3 className="text-base font-extrabold text-foreground">
              Multilingual Technical Learning (6 Indic Languages)
            </h3>
            <p className="text-xs text-muted leading-relaxed">
              Complex concepts in system architecture, V8 microtasks, and PostgreSQL isolation levels summarized natively in Tamil, Hindi, Telugu, Malayalam, Kannada, and English.
            </p>
            <div className="pt-2 flex flex-wrap gap-2 text-[11px]">
              <span className="px-2.5 py-1 rounded bg-surface text-foreground font-bold border border-border">தமிழ்</span>
              <span className="px-2.5 py-1 rounded bg-surface text-foreground font-bold border border-border">हिन्दी</span>
              <span className="px-2.5 py-1 rounded bg-surface text-foreground font-bold border border-border">తెలుగు</span>
              <span className="px-2.5 py-1 rounded bg-surface text-foreground font-bold border border-border">മലയാളം</span>
              <span className="px-2.5 py-1 rounded bg-surface text-foreground font-bold border border-border">ಕನ್ನಡ</span>
            </div>
          </div>

          {/* Pillar 2: Production Projects (Deep Navy) */}
          <div className="p-6 rounded-xl bg-white border border-border border-l-4 border-l-deep-navy space-y-4 shadow-card-clean hover:shadow-editorial-sm transition-all">
            <div className="w-10 h-10 rounded-lg bg-deep-navy flex items-center justify-center text-white font-bold">
              <FolderGit2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-extrabold text-foreground">
              Production Capstones with Rubric Evaluations
            </h3>
            <p className="text-xs text-muted leading-relaxed">
              No generic to-do apps. Build multi-tenant inventory systems, WebRTC telehealth portals, and milestone escrow ledgers evaluated on TypeScript strictness, DB query plans, and CI/CD.
            </p>
            <div className="pt-2 flex items-center gap-3 text-xs text-deep-navy font-extrabold">
              <Link href="/projects" className="hover:underline flex items-center gap-1">
                <span>View Project Marketplace</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Pillar 3: Voice Interview Simulation (Ultra Violet) */}
          <div className="p-6 rounded-xl bg-white border border-border border-l-4 border-l-ultra-violet space-y-4 shadow-card-clean hover:shadow-editorial-sm transition-all">
            <div className="w-10 h-10 rounded-lg bg-ultra-violet-50 text-ultra-violet border border-ultra-violet-200 flex items-center justify-center font-bold">
              <Mic className="w-5 h-5" />
            </div>
            <h3 className="text-base font-extrabold text-foreground">
              Voice Technical & Behavioral Simulation
            </h3>
            <p className="text-xs text-muted leading-relaxed">
              Real-time speech evaluation measuring technical depth, verbal conciseness, pacing, and STAR framework adherence for system design and behavioral rounds.
            </p>
            <div className="pt-2 flex items-center gap-3 text-xs text-ultra-violet font-extrabold">
              <Link href="/interview" className="hover:underline flex items-center gap-1">
                <span>Try Voice Simulation</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Pillar 4: Outcome & Rejection Retraining (Ultra Violet / Fire Red) */}
          <div className="p-6 rounded-xl bg-white border border-border border-l-4 border-l-ultra-violet space-y-4 shadow-card-clean hover:shadow-editorial-sm transition-all">
            <div className="w-10 h-10 rounded-lg bg-ultra-violet flex items-center justify-center text-white font-bold">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="text-base font-extrabold text-foreground">
              Root-Cause Rejection Analysis & Retraining Plan
            </h3>
            <p className="text-xs text-muted leading-relaxed">
              Turn rejections into targeted acceleration. If an application is turned down, our engine compares requirements, isolates missing skills, and prescribes a daily recovery roadmap.
            </p>
            <div className="pt-2 flex items-center gap-3 text-xs text-ultra-violet font-extrabold">
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
