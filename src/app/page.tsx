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
  Kanban,
  Compass,
} from "lucide-react";
import { PublicHeader } from "@/components/layout/PublicHeader";
import { Footer } from "@/components/layout/Footer";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { CAREER_ROLES } from "@/data/careers";
import { ROUTES } from "@/lib/routes";

export default function RootHomePage() {
  const [selectedTrack, setSelectedTrack] = useState(CAREER_ROLES[0]);

  const pipelineNodes = [
    {
      title: "1. Diagnostic",
      sub: "10-question test",
      icon: CheckSquare,
      score: "Ready",
      route: ROUTES.app.assessments.baseline,
      cardBg: "bg-paper-white text-ink-black border-2 border-ink-black",
      iconBg: "bg-primary-orange text-paper-white",
      numColor: "text-primary-orange",
      scoreColor: "text-primary-orange",
    },
    {
      title: "2. Gap Analysis",
      sub: "Targeted blindspots",
      icon: TrendingUp,
      score: "Automated",
      route: ROUTES.app.skillAnalysis,
      cardBg: "bg-paper-white text-ink-black border-2 border-ink-black",
      iconBg: "bg-golden-yellow text-ink-black",
      numColor: "text-ink-black",
      scoreColor: "text-ink-black",
    },
    {
      title: "3. Learning Track",
      sub: "Free curated modules",
      icon: BookOpen,
      score: "12 Weeks",
      route: ROUTES.app.learning.root,
      cardBg: "bg-paper-white text-ink-black border-2 border-ink-black",
      iconBg: "bg-rose text-paper-white",
      numColor: "text-rose",
      scoreColor: "text-rose",
    },
    {
      title: "4. Capstone Build",
      sub: "Production apps",
      icon: FolderGit2,
      score: "Rubric Graded",
      route: ROUTES.app.projects.root,
      cardBg: "bg-paper-white text-ink-black border-2 border-ink-black",
      iconBg: "bg-primary-orange text-paper-white",
      numColor: "text-primary-orange",
      scoreColor: "text-primary-orange",
    },
    {
      title: "5. Voice Defense",
      sub: "STAR architecture",
      icon: Mic,
      score: "AI Critique",
      route: ROUTES.app.interview.root,
      cardBg: "bg-paper-white text-ink-black border-2 border-ink-black",
      iconBg: "bg-rose text-paper-white",
      numColor: "text-rose",
      scoreColor: "text-rose",
    },
    {
      title: "6. Match Engine",
      sub: "Direct applications",
      icon: Briefcase,
      score: "Verified Jobs",
      route: ROUTES.app.opportunities.jobs,
      cardBg: "bg-paper-white text-ink-black border-2 border-ink-black",
      iconBg: "bg-golden-yellow text-ink-black",
      numColor: "text-ink-black",
      scoreColor: "text-ink-black",
    },
  ];

  const journeySteps = [
    {
      num: "01",
      title: "Choose Your Career",
      desc: "Explore 22+ high-demand engineering pathways across Software Engineering, AI/ML, DevOps, and Cybersecurity with transparent skill requirements.",
      route: ROUTES.app.career.discover,
      badge: "Career Discovery",
      cardClass: "bg-paper-white text-ink-black border-2 border-ink-black hover:border-primary-orange hover:bg-soft-pink/20 group",
      badgeVariant: "rose" as const,
    },
    {
      num: "02",
      title: "Assess Your Real Skills",
      desc: "Take focused technical diagnostics with real code snippets, logic traps, and architectural questions—not simplistic multiple-choice tests.",
      route: ROUTES.app.assessments.baseline,
      badge: "Diagnostics",
      cardClass: "bg-paper-white text-ink-black border-2 border-ink-black hover:border-primary-orange hover:bg-soft-pink/20 group",
      badgeVariant: "primary" as const,
    },
    {
      num: "03",
      title: "Identify Skill Gaps",
      desc: "Get an uncompromising diagnostic breakdown of your strengths and specific blind spots with actionable next steps mapped directly to your target role.",
      route: ROUTES.app.skillAnalysis,
      badge: "Gap Analysis",
      cardClass: "bg-paper-white text-ink-black border-2 border-ink-black hover:border-primary-orange hover:bg-soft-pink/20 group",
      badgeVariant: "dark" as const,
    },
    {
      num: "04",
      title: "Learn & Practice Multilingually",
      desc: "Personalized curated modules from MDN, freeCodeCamp, CS50, and NPTEL with interactive code challenges and multi-language support.",
      route: ROUTES.app.learning.root,
      badge: "Curated Training",
      cardClass: "bg-paper-white text-ink-black border-2 border-ink-black hover:border-primary-orange hover:bg-soft-pink/20 group",
      badgeVariant: "rose" as const,
    },
    {
      num: "05",
      title: "Build Real-World Projects",
      desc: "Implement production-grade applications—from authentication platforms to job boards—with milestone checkpoints and automated rubric evaluation.",
      route: ROUTES.app.projects.root,
      badge: "Verified Proof",
      cardClass: "bg-paper-white text-ink-black border-2 border-ink-black hover:border-primary-orange hover:bg-soft-pink/20 group",
      badgeVariant: "primary" as const,
    },
    {
      num: "06",
      title: "Prepare for Interviews",
      desc: "Rehearse technical architecture and behavioral questions in a realistic voice simulation with audio waveforms and STAR critique.",
      route: ROUTES.app.interview.root,
      badge: "Mock Simulation",
      cardClass: "bg-paper-white text-ink-black border-2 border-ink-black hover:border-primary-orange hover:bg-soft-pink/20 group",
      badgeVariant: "dark" as const,
    },
    {
      num: "07",
      title: "Find Matching Opportunities",
      desc: "Access verified jobs, internships, and YC startups matched strictly against your demonstrated skill proficiencies and verified project portfolio.",
      route: ROUTES.app.opportunities.jobs,
      badge: "Targeted Placement",
      cardClass: "bg-paper-white text-ink-black border-2 border-ink-black hover:border-primary-orange hover:bg-soft-pink/20 group",
      badgeVariant: "primary" as const,
    },
    {
      num: "08",
      title: "Improve From Every Outcome",
      desc: "If an application is rejected, our engine conducts rejection analysis, highlights root-cause skill deficiencies, and generates an actionable retraining plan.",
      route: ROUTES.app.improve.root,
      badge: "Continuous Retraining",
      cardClass: "bg-paper-white text-ink-black border-2 border-ink-black hover:border-primary-orange hover:bg-soft-pink/20 group",
      badgeVariant: "rose" as const,
    },
  ];

  return (
    <div className="min-h-screen bg-warm-cream text-ink-black flex flex-col">
      <PublicHeader />

      <main className="flex-1 space-y-14 sm:space-y-18 bg-warm-cream w-full">
        {/* ====================================================
            1. HERO SECTION (SOLID INK BLACK HERO)
           ==================================================== */}
        <section className="relative w-full bg-ink-black text-paper-white border-b-4 border-ink-black py-12 sm:py-18 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-paper-white/10 text-primary-orange border-2 border-primary-orange text-xs font-mono font-black uppercase tracking-widest shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-primary-orange" />
                <span>The Career-Readiness Standard</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black tracking-tight text-paper-white leading-[1.08] uppercase break-words">
                BUILD SKILLS. <br />
                <span className="text-primary-orange underline decoration-golden-yellow decoration-4 underline-offset-8">
                  PROVE YOUR ABILITY.
                </span>{" "}
                <br />
                GET HIRED.
              </h1>

              <p className="text-sm sm:text-base lg:text-lg text-paper-white/90 font-medium max-w-2xl leading-relaxed">
                One cohesive career platform from verified skill assessment to real-world production projects, voice interview simulations, and targeted employment matching with automated rejection retraining.
              </p>

              {/* Action CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 max-w-md sm:max-w-none w-full">
                <Link href={ROUTES.onboarding} className="w-full sm:w-auto">
                  <button className="w-full sm:w-auto px-7 sm:px-8 py-3.5 rounded-lg bg-primary-orange hover:bg-rose text-paper-white border-2 border-ink-black font-black text-sm sm:text-base transition-colors flex items-center justify-center gap-2.5 cursor-pointer shadow-editorial-sm">
                    <span>Start Career Journey</span>
                    <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                  </button>
                </Link>
                <Link href={ROUTES.careers} className="w-full sm:w-auto">
                  <button className="w-full sm:w-auto px-7 sm:px-8 py-3.5 rounded-lg bg-paper-white hover:bg-soft-pink text-ink-black border-2 border-ink-black font-black text-sm sm:text-base transition-colors flex items-center justify-center cursor-pointer shadow-editorial-sm">
                    <span>Explore 22+ Career Tracks</span>
                  </button>
                </Link>
              </div>
            </div>

            {/* Right Hero Readiness Card */}
            <div className="lg:col-span-5 rounded-2xl bg-paper-white border-3 border-primary-orange p-6 sm:p-7 text-ink-black shadow-editorial-md space-y-4">
              <div className="flex items-center justify-between border-b-2 border-ink-black/20 pb-3">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-primary-orange font-black">
                    Featured Career Pathway
                  </span>
                  <h3 className="text-base font-extrabold text-ink-black truncate max-w-[200px]">
                    {selectedTrack.title}
                  </h3>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-ink-black/70 font-bold">
                    Avg Benchmark
                  </span>
                  <p className="text-xs font-mono font-black text-primary-orange">
                    {selectedTrack.averageSalary}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs text-ink-black/80 font-bold uppercase tracking-wider">
                    Target Readiness Target
                  </span>
                  <span className="text-4xl font-mono font-black text-golden-yellow">
                    100%
                  </span>
                </div>
                <ProgressBar value={85} size="md" variant="golden-yellow" />
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                <div className="p-3 rounded-lg bg-warm-cream border border-ink-black/20 text-ink-black">
                  <span className="text-[10px] text-ink-black/70 font-mono uppercase font-bold block">
                    Active Openings
                  </span>
                  <span className="text-base font-mono font-black text-primary-orange">
                    {selectedTrack.openRolesCount}+ Roles
                  </span>
                </div>
                <div className="p-3 rounded-lg bg-warm-cream border border-ink-black/20 text-ink-black">
                  <span className="text-[10px] text-ink-black/70 font-mono uppercase font-bold block">
                    Curriculum Path
                  </span>
                  <span className="text-base font-mono font-black text-ink-black">
                    {selectedTrack.learningPathLength}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ====================================================
            2. COLOR-BLOCKED METRIC SYSTEM (RHYTHMIC 6-CARD GRID)
           ==================================================== */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="p-6 sm:p-8 rounded-2xl bg-primary-orange text-paper-white border-3 border-ink-black shadow-editorial-md mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-ink-black text-paper-white text-[10px] font-mono font-black uppercase tracking-wider mb-2">
                <span>Telemetry Engine // 6 Core Pillars</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-black text-paper-white tracking-tight uppercase leading-none">
                EVIDENCE-BASED COMPETENCY MATRIX
              </h2>
            </div>
            <p className="text-xs font-bold text-paper-white/95 max-w-md leading-relaxed">
              High-contrast visual stages representing each tier of your verified readiness profile across diagnostics, capstones, and interviews.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Card 1 */}
            <div className="p-6 rounded-xl bg-paper-white text-ink-black border-2 border-ink-black shadow-editorial-sm flex flex-col justify-between">
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-ink-black/70">1. Diagnostic Baseline</span>
                <p className="text-2xl font-mono font-black text-primary-orange mt-2">10 Questions</p>
                <p className="text-xs text-ink-black/75 mt-1">Role-specific technical questions testing code, SQL, APIs, and debugging.</p>
              </div>
              <div className="mt-4 pt-3 border-t border-ink-black/15">
                <Link href={ROUTES.app.assessments.baseline} className="text-xs font-black text-primary-orange hover:underline flex items-center justify-between">
                  <span>Take Diagnostic</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Card 2 */}
            <div className="p-6 rounded-xl bg-paper-white text-ink-black border-2 border-ink-black shadow-editorial-sm flex flex-col justify-between">
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-ink-black/70">2. Skill Gap Analysis</span>
                <p className="text-2xl font-mono font-black text-rose mt-2">Competency Map</p>
                <p className="text-xs text-ink-black/75 mt-1">Identifies required vs current proficiency with clear prioritization.</p>
              </div>
              <div className="mt-4 pt-3 border-t border-ink-black/15">
                <Link href={ROUTES.app.skillAnalysis} className="text-xs font-black text-rose hover:underline flex items-center justify-between">
                  <span>View Gap Analyzer</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Card 3 */}
            <div className="p-6 rounded-xl bg-paper-white text-ink-black border-2 border-ink-black shadow-editorial-sm flex flex-col justify-between">
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-ink-black/70">3. Free Curated Learning</span>
                <p className="text-2xl font-mono font-black text-golden-yellow mt-2">Verified Sources</p>
                <p className="text-xs text-ink-black/75 mt-1">Harvard CS50, MDN, freeCodeCamp, and NPTEL organized by skill gaps.</p>
              </div>
              <div className="mt-4 pt-3 border-t border-ink-black/15">
                <Link href={ROUTES.resources} className="text-xs font-black text-ink-black hover:text-primary-orange flex items-center justify-between">
                  <span>Explore Resources</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Card 4 */}
            <div className="p-6 rounded-xl bg-paper-white text-ink-black border-2 border-ink-black shadow-editorial-sm flex flex-col justify-between">
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-ink-black/70">4. Production Projects</span>
                <p className="text-2xl font-mono font-black text-primary-orange mt-2">Rubric Graded</p>
                <p className="text-xs text-ink-black/75 mt-1">Full-stack applications with GitHub repos, live deployments, and automated evaluation.</p>
              </div>
              <div className="mt-4 pt-3 border-t border-ink-black/15">
                <Link href={ROUTES.app.projects.root} className="text-xs font-black text-primary-orange hover:underline flex items-center justify-between">
                  <span>View Project Specs</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Card 5 */}
            <div className="p-6 rounded-xl bg-paper-white text-ink-black border-2 border-ink-black shadow-editorial-sm flex flex-col justify-between">
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-ink-black/70">5. Voice Interview Defense</span>
                <p className="text-2xl font-mono font-black text-rose mt-2">STAR Evaluation</p>
                <p className="text-xs text-ink-black/75 mt-1">Interactive speech evaluation for system design, behavioral, and architecture questions.</p>
              </div>
              <div className="mt-4 pt-3 border-t border-ink-black/15">
                <Link href={ROUTES.app.interview.root} className="text-xs font-black text-rose hover:underline flex items-center justify-between">
                  <span>Try Interview Prep</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Card 6 */}
            <div className="p-6 rounded-xl bg-paper-white text-ink-black border-2 border-ink-black shadow-editorial-sm flex flex-col justify-between">
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-ink-black/70">6. Matching Opportunities</span>
                <p className="text-2xl font-mono font-black text-golden-yellow mt-2">Direct Apply</p>
                <p className="text-xs text-ink-black/75 mt-1">Verified jobs with resume compatibility and direct links to employer portals.</p>
              </div>
              <div className="mt-4 pt-3 border-t border-ink-black/15">
                <Link href={ROUTES.app.opportunities.jobs} className="text-xs font-black text-ink-black hover:text-primary-orange flex items-center justify-between">
                  <span>Search Opportunities</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ====================================================
            3. 6-NODE PIPELINE
           ==================================================== */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-8 border-b-2 border-ink-black pb-4">
            <p className="text-xs uppercase tracking-widest text-ink-black font-black font-mono">
              The 6-Node Verified Career Pipeline
            </p>
            <h2 className="text-2xl sm:text-3xl font-display font-black text-ink-black uppercase tracking-tight mt-1">
              PROGRESSIVE SKILL VERIFICATION
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
                    <h3 className="text-xs font-black leading-snug">{node.title}</h3>
                    <p className="text-[11px] opacity-80 mt-0.5">{node.sub}</p>
                  </div>
                  <div className="mt-3 pt-2.5 border-t border-current/20 flex items-center justify-between">
                    <span className={`text-[10px] font-mono font-black ${node.scoreColor}`}>{node.score}</span>
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
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b-2 border-ink-black pb-6">
            <div>
              <span className="px-2.5 py-1 rounded bg-ink-black text-golden-yellow text-[10px] font-mono font-black uppercase tracking-wider mb-2 inline-block">
                Progression Framework
              </span>
              <h2 className="text-2xl sm:text-3xl font-display font-black text-ink-black tracking-tight uppercase">
                HOW LEARN-2-HIRE WORKS
              </h2>
              <p className="text-xs sm:text-sm text-ink-black/75 mt-1 max-w-xl font-medium">
                An evidence-based pipeline that continuously converts effort into verifiable technical readiness and job offers.
              </p>
            </div>
            <Link href={ROUTES.careers}>
              <button className="px-5 py-2.5 rounded-lg bg-paper-white text-ink-black hover:bg-soft-pink border-2 border-ink-black font-black text-xs transition-colors flex items-center gap-2 cursor-pointer shadow-editorial-xs">
                <span>View All 22 Tracks</span>
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
                    <span className="text-2xl font-mono font-black">{step.num}</span>
                    <Badge variant={step.badgeVariant} size="sm">{step.badge}</Badge>
                  </div>
                  <h3 className="text-sm font-black mb-2">{step.title}</h3>
                  <p className="text-xs opacity-80 leading-relaxed font-normal">{step.desc}</p>
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
            5. CAREER ATLAS DEMO
           ==================================================== */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="rounded-2xl bg-paper-white border-3 border-ink-black p-6 sm:p-10 relative overflow-hidden shadow-editorial-md">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6 space-y-6">
                <div>
                  <Badge variant="primary" size="sm" className="mb-2">Career Atlas</Badge>
                  <h2 className="text-2xl sm:text-3xl font-display font-black text-ink-black tracking-tight uppercase">
                    EXPLORE SPECIALIZATIONS
                  </h2>
                  <p className="text-xs sm:text-sm text-ink-black/75 mt-1 leading-relaxed font-medium">
                    Select a target role below to see how Learn-2-Hire benchmarks skills, assessment requirements, and salary expectations.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {CAREER_ROLES.slice(0, 4).map((role) => (
                    <button
                      key={role.id}
                      onClick={() => setSelectedTrack(role)}
                      className={`p-3 sm:p-3.5 rounded-lg text-left transition-all text-xs border-2 ${
                        selectedTrack.id === role.id
                          ? "bg-ink-black border-ink-black text-paper-white shadow-editorial-xs"
                          : "bg-warm-cream border-ink-black/30 text-ink-black hover:border-ink-black"
                      }`}
                    >
                      <p className={`font-black ${selectedTrack.id === role.id ? "text-paper-white" : "text-ink-black"}`}>
                        {role.title}
                      </p>
                      <p className={`text-[11px] font-bold font-mono mt-0.5 ${selectedTrack.id === role.id ? "text-golden-yellow" : "text-ink-black/70"}`}>
                        {role.averageSalary}
                      </p>
                    </button>
                  ))}
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                  <Link href={`/app/career/${selectedTrack.id}`} className="w-full sm:w-auto">
                    <button className="w-full sm:w-auto px-6 py-3 rounded-lg bg-primary-orange hover:bg-rose text-paper-white border-2 border-ink-black font-black text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-editorial-xs">
                      <span>View {selectedTrack.title} Detail</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </Link>
                  <Link href={ROUTES.careers} className="w-full sm:w-auto">
                    <button className="w-full sm:w-auto px-6 py-3 rounded-lg bg-paper-white text-ink-black hover:bg-soft-pink border-2 border-ink-black font-black text-xs sm:text-sm transition-colors flex items-center justify-center cursor-pointer shadow-editorial-xs">
                      <span>All 22 Career Tracks</span>
                    </button>
                  </Link>
                </div>
              </div>

              {/* Right Col: Track Preview */}
              <div className="lg:col-span-6 rounded-xl bg-ink-black p-6 border-2 border-ink-black text-paper-white space-y-4 shadow-editorial-sm">
                <div className="flex items-center justify-between border-b border-paper-white/20 pb-3">
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-wider text-paper-white/70 font-bold">
                      Track Overview
                    </span>
                    <h3 className="text-lg font-black text-paper-white">{selectedTrack.title}</h3>
                  </div>
                  <span className="text-sm font-black font-mono text-golden-yellow">
                    {selectedTrack.averageSalary}
                  </span>
                </div>

                <p className="text-xs text-paper-white/80 leading-relaxed font-medium">
                  {selectedTrack.description}
                </p>

                <div className="pt-2">
                  <span className="text-[11px] font-mono font-bold text-primary-orange uppercase tracking-wider block mb-2">
                    Primary Required Skills:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedTrack.primarySkills.map((skill) => (
                      <span key={skill} className="px-2.5 py-1 rounded bg-paper-white/10 text-paper-white border border-paper-white/20 text-xs font-mono">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ====================================================
            6. DARK CTA SECTION
           ==================================================== */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="rounded-2xl bg-rose p-8 sm:p-14 text-paper-white shadow-editorial-md relative overflow-hidden border-3 border-ink-black">
            <div className="max-w-3xl space-y-4">
              <span className="text-xs uppercase font-mono tracking-widest text-ink-black font-black bg-golden-yellow px-3 py-1 rounded inline-block border-2 border-ink-black">
                VERIFIABLE PROOF OVER CLAIMS
              </span>
              <h2 className="text-3xl sm:text-5xl font-display font-black text-paper-white leading-tight uppercase">
                YOUR NEXT LEVEL STARTS HERE.
              </h2>
              <p className="text-sm sm:text-base text-paper-white/95 font-medium leading-relaxed">
                No generic certificates. Build verifiable repositories, practice live voice architecture rounds, and apply directly to matching employers with transparent scorecards.
              </p>
              <div className="pt-4 flex flex-wrap gap-4">
                <Link href={ROUTES.onboarding}>
                  <button className="px-8 py-3.5 rounded-lg bg-primary-orange hover:bg-paper-white hover:text-ink-black text-paper-white font-black border-2 border-ink-black text-sm sm:text-base transition-colors flex items-center gap-2 cursor-pointer shadow-editorial-sm">
                    <span>Get Started Free</span>
                    <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                  </button>
                </Link>
                <Link href={ROUTES.auth.login}>
                  <button className="px-8 py-3.5 rounded-lg bg-ink-black hover:bg-paper-white hover:text-ink-black text-paper-white font-black border-2 border-ink-black text-sm sm:text-base transition-colors flex items-center gap-2 cursor-pointer shadow-editorial-sm">
                    <span>Sign In</span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
