"use client";

import React from "react";
import Link from "next/link";
import {
  CheckSquare,
  BookOpen,
  FolderGit2,
  Mic,
  Briefcase,
  TrendingUp,
  ArrowRight,
  ShieldCheck,
  Award,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import { PublicHeader } from "@/components/layout/PublicHeader";
import { Footer } from "@/components/layout/Footer";
import { Badge } from "@/components/ui/Badge";
import { ROUTES } from "@/lib/routes";

export default function HowItWorksPage() {
  const steps = [
    {
      num: "01",
      title: "Choose Target Career",
      desc: "Select from 22+ engineering specializations. Learn-2-Hire maps out the explicit industry requirements, skill weights, and market salary expectations.",
      route: ROUTES.app.career.discover,
      badge: "Discovery",
    },
    {
      num: "02",
      title: "Baseline Diagnostic Assessment",
      desc: "Complete a timed, role-specific diagnostic covering core syntax, framework architecture, SQL data queries, and debugging traps.",
      route: ROUTES.app.assessments.baseline,
      badge: "Diagnostics",
    },
    {
      num: "03",
      title: "Targeted Skill-Gap Analysis",
      desc: "Our engine isolates the exact competencies where you fall below the verified benchmark, assigning clear confidence and priority ratings.",
      route: ROUTES.app.skillAnalysis,
      badge: "Skill Intelligence",
    },
    {
      num: "04",
      title: "Personalized Roadmap & Free Learning",
      desc: "Follow an ordered curriculum connecting free educational sources (Harvard CS50, MDN, freeCodeCamp, NPTEL) prioritized by your identified gaps.",
      route: ROUTES.app.learning.roadmap,
      badge: "Curriculum",
    },
    {
      num: "05",
      title: "Real-World Production Projects",
      desc: "Build real full-stack systems—not simple tutorial to-dos. Every project is submitted with GitHub repo, live URL, and rubric-graded evaluation.",
      route: ROUTES.app.projects.root,
      badge: "Verifiable Proof",
    },
    {
      num: "06",
      title: "Voice Interview Simulation",
      desc: "Rehearse technical architecture and STAR behavioral rounds with interactive voice evaluation, audio waveforms, and feedback critique.",
      route: ROUTES.app.interview.root,
      badge: "Mock Rounds",
    },
    {
      num: "07",
      title: "ATS-Ready Resume & Opportunity Match",
      desc: "Generate a clean, single-column resume scored against our compatibility standard. Unlock direct applications to verified employer job postings.",
      route: ROUTES.app.opportunities.jobs,
      badge: "Direct Apply",
    },
    {
      num: "08",
      title: "Rejection Retraining & Reassessment Loop",
      desc: "If an application or interview doesn't succeed, our recovery engine identifies the root cause and prescribes an adaptive retraining loop.",
      route: ROUTES.app.improve.root,
      badge: "Continuous Loop",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-black flex flex-col">
      <PublicHeader />

      <main className="flex-1 space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        {/* Header Hero */}
        <div className="rounded-2xl bg-royal-maroon text-white border-4 border-black p-8 sm:p-12 shadow-editorial-md space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-black text-electric-coral border-2 border-black text-xs font-mono font-black uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Candidate Progression Pipeline</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-display font-black text-white uppercase tracking-tight">
            How Learn-2-Hire Works
          </h1>
          <p className="text-white/90 text-sm sm:text-base max-w-2xl leading-relaxed">
            A comprehensive, evidence-based career accelerator that guides you through diagnosis, targeted learning, production proof, interview rehearsal, and verified employer matching.
          </p>
          <div className="pt-2">
            <Link href={ROUTES.onboarding}>
              <button className="px-6 py-3 rounded-lg bg-electric-coral text-black border-2 border-black font-black text-xs sm:text-sm hover:bg-white transition-colors flex items-center gap-2 shadow-editorial-xs cursor-pointer">
                <span>Start Your Candidate Journey</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>
        </div>

        {/* 8-Step Progression Grid */}
        <section className="space-y-6">
          <div className="border-b-2 border-black pb-3">
            <h2 className="text-2xl font-display font-black text-black uppercase tracking-tight">
              The 8 Structured Phases
            </h2>
            <p className="text-xs text-black/70 font-medium">
              Every phase is connected to real evidence and verifiable skills.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {steps.map((step) => (
              <div
                key={step.num}
                className="p-5 rounded-xl border-2 border-black bg-white shadow-editorial-sm flex flex-col justify-between hover:bg-royal-maroon hover:text-white transition-colors group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl font-mono font-black">{step.num}</span>
                    <Badge variant="coral" size="sm">{step.badge}</Badge>
                  </div>
                  <h3 className="text-sm font-black mb-2">{step.title}</h3>
                  <p className="text-xs opacity-80 leading-relaxed">{step.desc}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-current/20 flex items-center justify-between text-xs">
                  <Link href={step.route} className="font-bold flex items-center gap-1 group-hover:underline">
                    <span>Explore Phase</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Trust & Ethics Banner */}
        <section className="rounded-2xl bg-black text-white border-3 border-electric-coral p-8 shadow-editorial-md space-y-4">
          <div className="flex items-center gap-2 text-electric-coral">
            <ShieldCheck className="w-6 h-6" />
            <span className="text-xs font-mono font-black uppercase tracking-wider">Zero Fake Claims Guarantee</span>
          </div>
          <h3 className="text-2xl font-display font-black text-white uppercase">
            No Automated Guarantees. Only Verifiable Competence.
          </h3>
          <p className="text-xs sm:text-sm text-white/80 leading-relaxed max-w-3xl">
            Learn-2-Hire never fabricates assessment scores, job postings, salary figures, or ATS percentages. All job matches are direct links to authentic employer career pages, and all projects require genuine GitHub repositories and live deployments.
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
}
