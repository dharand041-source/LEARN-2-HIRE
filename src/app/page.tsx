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
    <div className="space-y-24">
      {/* ====================================================
          1. HERO SECTION (High Craft Architectural Journey)
         ==================================================== */}
      <section className="relative pt-12 pb-8 sm:pt-20 sm:pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-navy-900/90 border border-champagne/30 text-xs text-champagne animate-fade-in shadow-gold-btn/10">
            <Sparkles className="w-3.5 h-3.5 text-champagne" />
            <span className="font-semibold tracking-wide uppercase text-[11px]">The Employment-Readiness Standard</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold tracking-tight text-pearl-primary leading-[1.1]">
            Build the skills. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-champagne via-champagne-300 to-rose">
              Prove your ability.
            </span> <br />
            Find your opportunity.
          </h1>

          <p className="text-base sm:text-lg text-pearl-muted max-w-2xl mx-auto leading-relaxed">
            One cohesive career journey from skill assessment to real-world production projects, voice interview simulations, and verified employment matching with automated rejection retraining.
          </p>

          {/* Action CTAs */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/assessment">
              <Button size="lg" className="w-full sm:w-auto px-8 gap-2.5 text-base">
                <span>Start Your Assessment</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/onboarding">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto px-7 text-base">
                <span>Explore Career Tracks</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* REFINED CONNECTED JOURNEY VISUAL (No generic dashboard mockup) */}
        <div className="mt-16 sm:mt-20 pt-8 border-t border-surface-border">
          <div className="text-center mb-8">
            <p className="text-xs uppercase tracking-widest text-pearl-muted font-semibold">
              The 6-Node Verified Career Pipeline
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 relative">
            {[
              { title: "1. Skill Assessment", sub: "10-question diagnostic", icon: CheckSquare, score: "72/100", route: "/assessment" },
              { title: "2. Skill Gap Analysis", sub: "Gaps & strong areas", icon: TrendingUp, score: "SQL Gap Found", route: "/assessment/results" },
              { title: "3. Learning Track", sub: "NPTEL / IIT modules", icon: BookOpen, score: "58% Complete", route: "/learning" },
              { title: "4. Production Project", sub: "Escrow & SaaS build", icon: FolderGit2, score: "92/100 Evaluated", route: "/projects" },
              { title: "5. Voice Interview", sub: "STAR & architecture", icon: Mic, score: "77/100 Ready", route: "/interview" },
              { title: "6. Opportunity Match", sub: "Direct applications", icon: Briefcase, score: "91% Top Match", route: "/opportunities" },
            ].map((node, i) => {
              const Icon = node.icon;
              return (
                <Link
                  key={i}
                  href={node.route}
                  className="group relative p-4 rounded-xl bg-surface-card border border-surface-border hover:border-champagne/40 transition-all duration-200 hover:-translate-y-1 hover:shadow-card-hover flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-8 h-8 rounded-lg bg-navy-800 border border-pearl/10 flex items-center justify-center text-champagne group-hover:border-champagne/40 transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-mono text-pearl-muted">0{i + 1}</span>
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-pearl-primary group-hover:text-champagne transition-colors leading-snug">
                      {node.title}
                    </h3>
                    <p className="text-[11px] text-pearl-muted mt-0.5">{node.sub}</p>
                  </div>
                  <div className="mt-3 pt-2.5 border-t border-white/5 flex items-center justify-between">
                    <span className="text-[10px] text-champagne font-mono font-medium">{node.score}</span>
                    <ChevronRight className="w-3 h-3 text-pearl-muted group-hover:text-champagne group-hover:translate-x-0.5 transition-all" />
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
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4 border-b border-surface-border pb-6">
          <div>
            <Badge variant="champagne" size="sm" className="mb-2">Structured Progression</Badge>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-pearl-primary">
              How SkillForge Works
            </h2>
            <p className="text-xs sm:text-sm text-pearl-muted mt-1 max-w-xl">
              An evidence-based pipeline that continuously converts effort into verifiable technical readiness and job offers.
            </p>
          </div>
          <Link href="/onboarding">
            <Button variant="secondary" size="sm" className="gap-2">
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
              className="group p-5 rounded-xl bg-surface-card border border-surface-border hover:border-champagne/40 transition-all duration-200 flex flex-col justify-between hover:shadow-card-hover"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl font-mono font-bold text-champagne/40 group-hover:text-champagne transition-colors">
                    {step.num}
                  </span>
                  <Badge variant="navy" size="sm">
                    {step.badge}
                  </Badge>
                </div>
                <h3 className="text-sm font-semibold text-pearl-primary group-hover:text-champagne transition-colors mb-2">
                  {step.title}
                </h3>
                <p className="text-xs text-pearl-muted leading-relaxed">
                  {step.desc}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-pearl-muted group-hover:text-champagne">
                <span className="font-medium text-[11px]">Explore Step</span>
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
        <div className="rounded-2xl bg-surface-card border border-surface-border p-6 sm:p-10 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Col: Career Track Switcher */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <Badge variant="champagne" size="sm" className="mb-2">Interactive Capability Engine</Badge>
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-pearl-primary">
                  Tailored To Your Specific Technical Target
                </h2>
                <p className="text-xs sm:text-sm text-pearl-muted mt-1 leading-relaxed">
                  Select a target role below to see how SkillForge calculates expected skill weights, assessment benchmarks, and customized learning paths.
                </p>
              </div>

              {/* Role Quick Selector */}
              <div className="grid grid-cols-2 gap-2">
                {CAREER_ROLES.slice(0, 4).map((role) => (
                  <button
                    key={role.id}
                    onClick={() => {
                      setPreviewRole(role);
                      selectRole(role.id);
                    }}
                    className={`p-3 rounded-lg text-left transition-all text-xs border ${
                      previewRole.id === role.id
                        ? "bg-navy-800 border-champagne text-pearl-primary shadow-sm"
                        : "bg-surface-subtle border-white/5 text-pearl-muted hover:border-pearl/20 hover:text-pearl-primary"
                    }`}
                  >
                    <p className="font-semibold">{role.title}</p>
                    <p className="text-[10px] text-champagne mt-0.5">{role.averageSalary}</p>
                  </button>
                ))}
              </div>

              <div className="pt-2 flex items-center gap-4">
                <Link href="/assessment">
                  <Button size="md" className="gap-2">
                    <span>Assess for {previewRole.title}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/onboarding">
                  <Button variant="outline" size="md">
                    <span>All 24 Tracks</span>
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Col: Readiness Matrix Card */}
            <div className="lg:col-span-6 rounded-xl bg-navy-950 p-6 border border-pearl/10 space-y-5">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-pearl-muted">
                    Demonstrated Readiness Score
                  </span>
                  <h3 className="text-lg font-bold text-pearl-primary">{previewRole.title}</h3>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold font-mono text-champagne">
                    {userProfile.readinessScore}%
                  </span>
                  <p className="text-[10px] text-emerald-400 font-medium">Verified Ready</p>
                </div>
              </div>

              {/* Breakdown Bars */}
              <div className="space-y-3">
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-pearl-muted">Technical Assessments</span>
                    <span className="text-pearl-primary font-semibold">{userProfile.readinessBreakdown.technicalSkills}%</span>
                  </div>
                  <ProgressBar value={userProfile.readinessBreakdown.technicalSkills} size="sm" variant="champagne" />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-pearl-muted">Production Projects</span>
                    <span className="text-pearl-primary font-semibold">{userProfile.readinessBreakdown.projects}%</span>
                  </div>
                  <ProgressBar value={userProfile.readinessBreakdown.projects} size="sm" variant="champagne" />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-pearl-muted">Problem Solving & SQL</span>
                    <span className="text-pearl-primary font-semibold">{userProfile.readinessBreakdown.problemSolving}%</span>
                  </div>
                  <ProgressBar value={userProfile.readinessBreakdown.problemSolving} size="sm" variant="rose" />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-pearl-muted">Interview Defense & STAR</span>
                    <span className="text-pearl-primary font-semibold">{userProfile.readinessBreakdown.interview}%</span>
                  </div>
                  <ProgressBar value={userProfile.readinessBreakdown.interview} size="sm" variant="champagne" />
                </div>
              </div>

              {/* Verified Highlights */}
              <div className="pt-3 border-t border-white/10 grid grid-cols-2 gap-2 text-xs">
                <div className="flex items-center gap-2 text-pearl-muted">
                  <Check className="w-3.5 h-3.5 text-champagne" />
                  <span>2 Verified Projects</span>
                </div>
                <div className="flex items-center gap-2 text-pearl-muted">
                  <Check className="w-3.5 h-3.5 text-champagne" />
                  <span>91% ATS Resume Match</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          4. FOUR CORE PLATFORM PILLARS
         ==================================================== */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Badge variant="champagne" size="sm" className="mb-2">Original Architecture</Badge>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-pearl-primary">
            Engineered For Genuine Competence
          </h2>
          <p className="text-xs sm:text-sm text-pearl-muted mt-1">
            Built from scratch to overcome the shortcomings of generic tutorials and superficial coding tests.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Pillar 1: Multilingual Curriculum */}
          <div className="p-6 rounded-xl bg-surface-card border border-surface-border space-y-4">
            <div className="w-10 h-10 rounded-lg bg-navy-800 border border-champagne/30 flex items-center justify-center text-champagne">
              <Globe className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-pearl-primary">
              Multilingual Technical Learning (6 Indic Languages)
            </h3>
            <p className="text-xs text-pearl-muted leading-relaxed">
              Complex concepts in system architecture, V8 microtasks, and PostgreSQL isolation levels summarized natively in Tamil, Hindi, Telugu, Malayalam, Kannada, and English.
            </p>
            <div className="pt-2 flex flex-wrap gap-2 text-[11px]">
              <span className="px-2 py-0.5 rounded bg-navy-900 text-pearl-muted border border-white/5">தமிழ்</span>
              <span className="px-2 py-0.5 rounded bg-navy-900 text-pearl-muted border border-white/5">हिन्दी</span>
              <span className="px-2 py-0.5 rounded bg-navy-900 text-pearl-muted border border-white/5">తెలుగు</span>
              <span className="px-2 py-0.5 rounded bg-navy-900 text-pearl-muted border border-white/5">മലയാളം</span>
              <span className="px-2 py-0.5 rounded bg-navy-900 text-pearl-muted border border-white/5">ಕನ್ನಡ</span>
            </div>
          </div>

          {/* Pillar 2: Production Projects & Rubrics */}
          <div className="p-6 rounded-xl bg-surface-card border border-surface-border space-y-4">
            <div className="w-10 h-10 rounded-lg bg-navy-800 border border-champagne/30 flex items-center justify-center text-champagne">
              <FolderGit2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-pearl-primary">
              Production Capstones with Rubric Evaluations
            </h3>
            <p className="text-xs text-pearl-muted leading-relaxed">
              No generic to-do apps. Build multi-tenant inventory systems, WebRTC telehealth portals, and milestone escrow ledgers evaluated on TypeScript strictness, DB query plans, and CI/CD.
            </p>
            <div className="pt-2 flex items-center gap-3 text-xs text-champagne font-medium">
              <Link href="/projects" className="hover:underline flex items-center gap-1">
                <span>View Project Marketplace</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Pillar 3: Realistic Voice Interview Simulator */}
          <div className="p-6 rounded-xl bg-surface-card border border-surface-border space-y-4">
            <div className="w-10 h-10 rounded-lg bg-navy-800 border border-champagne/30 flex items-center justify-center text-champagne">
              <Mic className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-pearl-primary">
              Voice Technical & Behavioral Simulation
            </h3>
            <p className="text-xs text-pearl-muted leading-relaxed">
              Real-time speech evaluation measuring technical depth, verbal conciseness, pacing, and STAR framework adherence for system design and behavioral rounds.
            </p>
            <div className="pt-2 flex items-center gap-3 text-xs text-champagne font-medium">
              <Link href="/interview" className="hover:underline flex items-center gap-1">
                <span>Try Voice Simulation</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Pillar 4: Outcome & Rejection Retraining */}
          <div className="p-6 rounded-xl bg-surface-card border border-surface-border space-y-4">
            <div className="w-10 h-10 rounded-lg bg-navy-800 border border-rose/30 flex items-center justify-center text-rose">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-pearl-primary">
              Root-Cause Rejection Analysis & Retraining Plan
            </h3>
            <p className="text-xs text-pearl-muted leading-relaxed">
              Turn rejections into targeted acceleration. If an application is turned down, our engine compares requirements, isolates missing skills, and prescribes a daily recovery roadmap.
            </p>
            <div className="pt-2 flex items-center gap-3 text-xs text-rose font-medium">
              <Link href="/feedback" className="hover:underline flex items-center gap-1">
                <span>Inspect Retraining Engine</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          5. BOTTOM CALL TO ACTION
         ==================================================== */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-12">
        <div className="p-8 sm:p-12 rounded-2xl bg-surface-card border border-champagne/30 text-center space-y-5 relative shadow-gold-btn/10">
          <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-pearl-primary">
            Ready to prove your technical ability?
          </h2>
          <p className="text-xs sm:text-sm text-pearl-muted max-w-xl mx-auto">
            Take your initial technical assessment in under 20 minutes, discover your exact skill gaps, and begin your personalized path to employment.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/assessment">
              <Button size="lg" className="w-full sm:w-auto px-8 gap-2">
                <span>Start Initial Assessment</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/onboarding">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto px-6">
                <span>Choose Career Track</span>
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
