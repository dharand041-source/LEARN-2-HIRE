"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Compass,
  CheckSquare,
  BookOpen,
  FolderGit2,
  Mic,
  Briefcase,
  TrendingUp,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  Terminal,
  Zap,
  Award,
  Layers,
  Check,
  Flame,
  Globe,
} from "lucide-react";
import { PRODUCT_NAME, PRODUCT_TAGLINE, formatCurrency } from "@/lib/constants";
import { useCareer } from "@/context/CareerContext";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { CAREER_ROLES } from "@/data/careers";

export default function LandingPage() {
  const { userProfile, selectedRole, selectRole } = useCareer();
  const [activeStepTab, setActiveStepTab] = useState(0);
  const [previewRole, setPreviewRole] = useState(selectedRole);

  const journeySteps = [
    {
      num: "01",
      title: "Choose Your Career",
      desc: "Explore 24+ high-demand technical pathways across Software Engineering, AI/ML, DevOps, and Cybersecurity with transparent skill requirements and salary data.",
      route: "/onboarding",
      badge: "Career Discovery",
    },
    {
      num: "02",
      title: "Assess Your Real Skills",
      desc: "Take focused, anti-distraction technical assessments with real code snippets, logic traps, and architectural questions—not simplistic school tests.",
      route: "/assessment",
      badge: "Diagnostics",
    },
    {
      num: "03",
      title: "Identify Skill Gaps",
      desc: "Get an uncompromising diagnostic breakdown of your strengths and specific blind spots with actionable next steps mapped directly to your target role.",
      route: "/assessment/results",
      badge: "Gap Analysis",
    },
    {
      num: "04",
      title: "Learn & Practice Multilingually",
      desc: "Personalized curated modules from NPTEL, IITs, and official documentation with interactive code challenges and multi-language support (Tamil, Hindi, Telugu, etc.).",
      route: "/learning",
      badge: "Curated Training",
    },
    {
      num: "05",
      title: "Build Real-World Projects",
      desc: "Implement production-grade applications—from escrow marketplaces to multi-tenant inventory SaaS—with milestone checkpoints and automated rubric evaluation.",
      route: "/projects",
      badge: "Verified Proof",
    },
    {
      num: "06",
      title: "Prepare for Interviews",
      desc: "Rehearse technical architecture and behavioral questions in a realistic voice simulation with audio waveforms, pacing analysis, and STAR critique.",
      route: "/interview",
      badge: "Mock Simulation",
    },
    {
      num: "07",
      title: "Find Matching Opportunities",
      desc: "Access verified jobs, internships, and YC startups matched strictly against your demonstrated skill proficiencies and verified project portfolio.",
      route: "/opportunities",
      badge: "Targeted Placement",
    },
    {
      num: "08",
      title: "Improve From Every Outcome",
      desc: "If an application is rejected, our engine conducts rejection analysis, highlights root-cause skill deficiencies, and generates an actionable retraining plan.",
      route: "/feedback",
      badge: "Continuous Retraining",
    },
  ];

  return (
    <div className="space-y-24 bg-white">
      {/* ====================================================
          1. HERO SECTION (High Craft Editorial Journey)
         ==================================================== */}
      <section className="relative pt-12 pb-8 sm:pt-20 sm:pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-subtle border border-border text-xs text-night animate-fade-in shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-imperial" />
            <span className="font-bold tracking-wider uppercase text-[11px]">The Career-Readiness Standard</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold tracking-tight text-night leading-[1.08] uppercase">
            BUILD SKILLS. <br />
            <span className="text-imperial">
              PROVE YOUR
            </span> <br />
            ABILITY. GET READY.
          </h1>

          <p className="text-base sm:text-lg text-muted max-w-2xl mx-auto leading-relaxed">
            One cohesive career platform from verified skill assessment to real-world production projects, voice interview simulations, and targeted employment matching with automated rejection retraining.
          </p>

          {/* Action CTAs */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/assessment">
              <Button size="lg" className="w-full sm:w-auto px-8 gap-2.5 text-base font-bold shadow-sm">
                <span>Start Initial Assessment</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/onboarding">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto px-7 text-base font-bold">
                <span>Explore 24+ Career Tracks</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* 6-NODE PIPELINE */}
        <div className="mt-16 sm:mt-20 pt-8 border-t border-border">
          <div className="text-center mb-8">
            <p className="text-xs uppercase tracking-widest text-muted font-bold">
              The 6-Node Verified Career Pipeline
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 relative">
            {[
              { title: "1. Assessment", sub: "10-question diagnostic", icon: CheckSquare, score: "72/100", route: "/assessment" },
              { title: "2. Gap Analysis", sub: "Targeted blindspots", icon: TrendingUp, score: "SQL Gap Found", route: "/assessment/results" },
              { title: "3. Learning Track", sub: "NPTEL / IIT modules", icon: BookOpen, score: "58% Complete", route: "/learning" },
              { title: "4. Capstone Build", sub: "Escrow & SaaS build", icon: FolderGit2, score: "92/100 Evaluated", route: "/projects" },
              { title: "5. Voice Defense", sub: "STAR & architecture", icon: Mic, score: "77/100 Ready", route: "/interview" },
              { title: "6. Match Engine", sub: "Direct applications", icon: Briefcase, score: "91% Top Match", route: "/opportunities" },
            ].map((node, i) => {
              const Icon = node.icon;
              return (
                <Link
                  key={i}
                  href={node.route}
                  className="group relative p-4 rounded-xl bg-white border border-border hover:border-imperial transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card-hover flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-8 h-8 rounded-lg bg-surface-subtle border border-border flex items-center justify-center text-night group-hover:bg-imperial group-hover:text-white transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-mono font-bold text-muted">0{i + 1}</span>
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-night group-hover:text-imperial transition-colors leading-snug">
                      {node.title}
                    </h3>
                    <p className="text-[11px] text-muted mt-0.5">{node.sub}</p>
                  </div>
                  <div className="mt-3 pt-2.5 border-t border-border flex items-center justify-between">
                    <span className="text-[10px] text-imperial font-mono font-bold">{node.score}</span>
                    <ChevronRight className="w-3 h-3 text-muted group-hover:text-imperial group-hover:translate-x-0.5 transition-all" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ====================================================
          2. HOW IT WORKS: 8-STEP STRUCTURED JOURNEY
         ==================================================== */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4 border-b border-border pb-6">
          <div>
            <Badge variant="imperial" size="sm" className="mb-2">Structured Progression</Badge>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-night tracking-tight">
              HOW SKILLFORGE WORKS
            </h2>
            <p className="text-xs sm:text-sm text-muted mt-1 max-w-xl">
              An evidence-based pipeline that continuously converts effort into verifiable technical readiness and job offers.
            </p>
          </div>
          <Link href="/onboarding">
            <Button variant="secondary" size="sm" className="gap-2 font-bold">
              <span>View All Career Paths</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {journeySteps.map((step, idx) => (
            <Link
              key={step.num}
              href={step.route}
              className="group p-5 rounded-xl bg-white border border-border hover:border-imperial transition-all duration-200 flex flex-col justify-between hover:shadow-card-hover"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl font-mono font-extrabold text-border group-hover:text-imperial transition-colors">
                    {step.num}
                  </span>
                  <Badge variant="night" size="sm">
                    {step.badge}
                  </Badge>
                </div>
                <h3 className="text-sm font-bold text-night group-hover:text-imperial transition-colors mb-2">
                  {step.title}
                </h3>
                <p className="text-xs text-muted leading-relaxed">
                  {step.desc}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-xs text-muted group-hover:text-imperial">
                <span className="font-semibold text-[11px]">Explore Step</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ====================================================
          3. LIVE READINESS & CAREER SELECTOR DEMO
         ==================================================== */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="rounded-2xl bg-white border border-border p-6 sm:p-10 relative overflow-hidden shadow-card">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Col: Career Track Switcher */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <Badge variant="imperial" size="sm" className="mb-2">Capability Engine</Badge>
                <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-night tracking-tight uppercase">
                  TAILORED TO YOUR TECHNICAL TARGET
                </h2>
                <p className="text-xs sm:text-sm text-muted mt-1 leading-relaxed">
                  Select a target role below to see how SkillForge calculates expected skill weights, assessment benchmarks, and customized learning paths.
                </p>
              </div>

              {/* Role Quick Selector */}
              <div className="grid grid-cols-2 gap-2.5">
                {CAREER_ROLES.slice(0, 4).map((role) => (
                  <button
                    key={role.id}
                    onClick={() => {
                      setPreviewRole(role);
                      selectRole(role.id);
                    }}
                    className={`p-3.5 rounded-lg text-left transition-all text-xs border ${
                      previewRole.id === role.id
                        ? "bg-night border-night text-white shadow-md"
                        : "bg-surface-subtle border-border text-night hover:border-night"
                    }`}
                  >
                    <p className={`font-bold ${previewRole.id === role.id ? "text-white" : "text-night"}`}>{role.title}</p>
                    <p className={`text-[11px] font-semibold mt-0.5 ${previewRole.id === role.id ? "text-imperial" : "text-muted"}`}>{role.averageSalary}</p>
                  </button>
                ))}
              </div>

              <div className="pt-2 flex items-center gap-4">
                <Link href="/assessment">
                  <Button size="md" className="gap-2 font-bold shadow-sm">
                    <span>Assess for {previewRole.title}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/onboarding">
                  <Button variant="secondary" size="md" className="font-bold">
                    <span>All 24 Tracks</span>
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Col: Readiness Matrix Card (Night High Contrast Card) */}
            <div className="lg:col-span-6 rounded-xl bg-night p-6 border border-night text-white space-y-5 shadow-xl">
              <div className="flex items-center justify-between border-b border-white/15 pb-4">
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-muted">
                    Target Readiness Score
                  </span>
                  <h3 className="text-lg font-bold text-white">{previewRole.title}</h3>
                </div>
                <div className="text-right">
                  <span className="text-3xl font-extrabold font-mono text-imperial">
                    {userProfile.readinessScore}%
                  </span>
                  <p className="text-[10px] text-white/70 font-semibold uppercase tracking-wider">Verified State</p>
                </div>
              </div>

              {/* Breakdown Bars */}
              <div className="space-y-3">
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-white/80 font-medium">Technical Assessments</span>
                    <span className="text-white font-bold">{userProfile.readinessBreakdown.technicalSkills}%</span>
                  </div>
                  <ProgressBar value={userProfile.readinessBreakdown.technicalSkills} size="sm" variant="imperial" />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-white/80 font-medium">Production Projects</span>
                    <span className="text-white font-bold">{userProfile.readinessBreakdown.projects}%</span>
                  </div>
                  <ProgressBar value={userProfile.readinessBreakdown.projects} size="sm" variant="imperial" />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-white/80 font-medium">Problem Solving & SQL</span>
                    <span className="text-white font-bold">{userProfile.readinessBreakdown.problemSolving}%</span>
                  </div>
                  <ProgressBar value={userProfile.readinessBreakdown.problemSolving} size="sm" variant="imperial" />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-white/80 font-medium">Interview Defense & STAR</span>
                    <span className="text-white font-bold">{userProfile.readinessBreakdown.interview}%</span>
                  </div>
                  <ProgressBar value={userProfile.readinessBreakdown.interview} size="sm" variant="imperial" />
                </div>
              </div>

              {/* Verified Highlights */}
              <div className="pt-3 border-t border-white/15 grid grid-cols-2 gap-2 text-xs">
                <div className="flex items-center gap-2 text-white/90">
                  <Check className="w-3.5 h-3.5 text-imperial" />
                  <span className="font-medium">2 Verified Capstones</span>
                </div>
                <div className="flex items-center gap-2 text-white/90">
                  <Check className="w-3.5 h-3.5 text-imperial" />
                  <span className="font-medium">91% ATS Resume Match</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          4. EDITORIAL CALLOUT SECTION (Bold block visual style)
         ==================================================== */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="rounded-2xl bg-imperial p-8 sm:p-14 text-white shadow-xl relative overflow-hidden">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs uppercase font-mono tracking-widest text-night font-bold">
              VERIFIABLE PROOF OVER CLAIMS
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-night leading-tight uppercase">
              YOUR NEXT LEVEL STARTS HERE.
            </h2>
            <p className="text-sm sm:text-base text-night/85 font-medium leading-relaxed">
              No generic certificates. Build verifiable repositories, practice live voice architecture rounds, and apply directly to matching employers with transparent scorecards.
            </p>
            <div className="pt-4 flex flex-wrap gap-4">
              <Link href="/assessment">
                <Button variant="dark" size="lg" className="font-bold">
                  <span>Take Free Assessment</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          5. FOUR CORE PLATFORM PILLARS
         ==================================================== */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Badge variant="night" size="sm" className="mb-2">Platform Foundations</Badge>
          <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-night uppercase tracking-tight">
            ENGINEERED FOR GENUINE COMPETENCE
          </h2>
          <p className="text-xs sm:text-sm text-muted mt-1">
            Built to overcome the shortcomings of generic tutorials and superficial coding tests.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Pillar 1: Multilingual Curriculum */}
          <div className="p-6 rounded-xl bg-white border border-border space-y-4 shadow-sm hover:shadow-card transition-all">
            <div className="w-10 h-10 rounded-lg bg-night flex items-center justify-center text-imperial">
              <Globe className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-night">
              Multilingual Technical Learning (6 Indic Languages)
            </h3>
            <p className="text-xs text-muted leading-relaxed">
              Complex concepts in system architecture, V8 microtasks, and PostgreSQL isolation levels summarized natively in Tamil, Hindi, Telugu, Malayalam, Kannada, and English.
            </p>
            <div className="pt-2 flex flex-wrap gap-2 text-[11px]">
              <span className="px-2.5 py-1 rounded bg-surface-subtle text-night font-medium border border-border">தமிழ்</span>
              <span className="px-2.5 py-1 rounded bg-surface-subtle text-night font-medium border border-border">हिन्दी</span>
              <span className="px-2.5 py-1 rounded bg-surface-subtle text-night font-medium border border-border">తెలుగు</span>
              <span className="px-2.5 py-1 rounded bg-surface-subtle text-night font-medium border border-border">മലയാളം</span>
              <span className="px-2.5 py-1 rounded bg-surface-subtle text-night font-medium border border-border">ಕನ್ನಡ</span>
            </div>
          </div>

          {/* Pillar 2: Production Projects & Rubrics */}
          <div className="p-6 rounded-xl bg-white border border-border space-y-4 shadow-sm hover:shadow-card transition-all">
            <div className="w-10 h-10 rounded-lg bg-night flex items-center justify-center text-imperial">
              <FolderGit2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-night">
              Production Capstones with Rubric Evaluations
            </h3>
            <p className="text-xs text-muted leading-relaxed">
              No generic to-do apps. Build multi-tenant inventory systems, WebRTC telehealth portals, and milestone escrow ledgers evaluated on TypeScript strictness, DB query plans, and CI/CD.
            </p>
            <div className="pt-2 flex items-center gap-3 text-xs text-imperial font-bold">
              <Link href="/projects" className="hover:underline flex items-center gap-1">
                <span>View Project Marketplace</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Pillar 3: Realistic Voice Interview Simulator */}
          <div className="p-6 rounded-xl bg-white border border-border space-y-4 shadow-sm hover:shadow-card transition-all">
            <div className="w-10 h-10 rounded-lg bg-night flex items-center justify-center text-imperial">
              <Mic className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-night">
              Voice Technical & Behavioral Simulation
            </h3>
            <p className="text-xs text-muted leading-relaxed">
              Real-time speech evaluation measuring technical depth, verbal conciseness, pacing, and STAR framework adherence for system design and behavioral rounds.
            </p>
            <div className="pt-2 flex items-center gap-3 text-xs text-imperial font-bold">
              <Link href="/interview" className="hover:underline flex items-center gap-1">
                <span>Try Voice Simulation</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Pillar 4: Outcome & Rejection Retraining */}
          <div className="p-6 rounded-xl bg-white border border-border space-y-4 shadow-sm hover:shadow-card transition-all">
            <div className="w-10 h-10 rounded-lg bg-night flex items-center justify-center text-imperial">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-night">
              Root-Cause Rejection Analysis & Retraining Plan
            </h3>
            <p className="text-xs text-muted leading-relaxed">
              Turn rejections into targeted acceleration. If an application is turned down, our engine compares requirements, isolates missing skills, and prescribes a daily recovery roadmap.
            </p>
            <div className="pt-2 flex items-center gap-3 text-xs text-imperial font-bold">
              <Link href="/feedback" className="hover:underline flex items-center gap-1">
                <span>Inspect Retraining Engine</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          6. BOTTOM CALL TO ACTION
         ==================================================== */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-12">
        <div className="p-8 sm:p-12 rounded-2xl bg-white border border-border text-center space-y-5 relative shadow-card">
          <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-night uppercase tracking-tight">
            READY TO PROVE YOUR TECHNICAL ABILITY?
          </h2>
          <p className="text-xs sm:text-sm text-muted max-w-xl mx-auto">
            Take your initial technical assessment in under 20 minutes, discover your exact skill gaps, and begin your personalized path to employment.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/assessment">
              <Button size="lg" className="w-full sm:w-auto px-8 gap-2 font-bold shadow-sm">
                <span>Start Initial Assessment</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/onboarding">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto px-6 font-bold">
                <span>Choose Career Track</span>
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
