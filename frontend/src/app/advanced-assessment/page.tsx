"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldAlert,
  Lock,
  Unlock,
  Clock,
  Award,
  ArrowRight,
  Terminal,
  Layers,
  Sparkles,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { useCareer } from "@/context/CareerContext";
import { ADVANCED_ASSESSMENT_MODULES } from "@/data/assessments";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";

export default function AdvancedAssessmentPage() {
  const { userProfile, selectedRole } = useCareer();
  const [selectedModule, setSelectedModule] = useState<typeof ADVANCED_ASSESSMENT_MODULES[0] | null>(null);
  const [isTestModalOpen, setIsTestModalOpen] = useState(false);
  const [simulatedTestProgress, setSimulatedTestProgress] = useState(false);

  const handleLaunchTest = (mod: typeof ADVANCED_ASSESSMENT_MODULES[0]) => {
    setSelectedModule(mod);
    setIsTestModalOpen(true);
    setSimulatedTestProgress(false);
  };

  return (
    <div className="space-y-8 animate-fade-in bg-white">
      {/* Bold Fire Red Hero Section */}
      <div className="rounded-2xl bg-fire-red text-white border-4 border-black p-8 sm:p-10 shadow-editorial-md space-y-6">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-black text-electric-yellow border-2 border-black text-xs font-mono font-extrabold uppercase tracking-widest">
              <span>Phase 05 // Verification</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold uppercase tracking-tight text-white leading-tight">
              Advanced Technical & System Assessments
            </h1>
            <p className="text-white/90 text-sm sm:text-base leading-relaxed">
              Simulated live production scenarios, memory profiling flamegraphs, and distributed architecture evaluations that elevate your profile to senior candidate readiness.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link href="/projects">
              <button className="px-5 py-3 rounded-lg bg-electric-yellow hover:bg-white text-black border-2 border-black font-extrabold text-xs sm:text-sm transition-colors flex items-center gap-2 cursor-pointer shadow-editorial-sm">
                <span>View Production Projects</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>
        </div>

        {/* Readiness Qualification Status Banner inside Hero */}
        <div className="p-4 sm:p-5 rounded-xl bg-black border-2 border-electric-yellow text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-electric-yellow text-black flex items-center justify-center font-bold shrink-0">
              <ShieldAlert className="w-5 h-5 text-black" />
            </div>
            <div>
              <p className="text-xs font-extrabold text-white">
                Candidate Readiness Threshold: <span className="text-electric-yellow font-mono text-sm">{userProfile.readinessScore}%</span> / 70% Required
              </p>
              <p className="text-[11px] text-white/70 mt-0.5 font-medium">
                You have met the foundational benchmark for <strong className="text-electric-yellow">{selectedRole.title}</strong>. 2 of 4 advanced assessments are unlocked.
              </p>
            </div>
          </div>

          <div className="px-3 py-1 rounded-md bg-electric-yellow text-black text-xs font-mono font-extrabold border border-black shrink-0">
            Senior Verification Track
          </div>
        </div>
      </div>

      {/* Advanced Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {ADVANCED_ASSESSMENT_MODULES.map((mod) => (
          <div
            key={mod.id}
            className={`p-6 rounded-xl border flex flex-col justify-between transition-all duration-150 bg-white ${
              mod.unlocked
                ? "border-border hover:border-foreground shadow-card-clean hover:shadow-editorial-sm border-l-4 border-l-electric-yellow"
                : "border-border/60 opacity-60 bg-surface"
            }`}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Badge variant={mod.unlocked ? "electric-yellow" : "neutral"} size="sm">
                  {mod.category}
                </Badge>
                <div className="flex items-center gap-2 text-xs font-mono text-muted font-bold">
                  <Clock className="w-3.5 h-3.5 text-foreground" />
                  <span>{mod.duration}</span>
                </div>
              </div>

              <div>
                <h3 className="text-base font-extrabold text-foreground leading-snug">
                  {mod.title}
                </h3>
                <p className="text-xs text-muted mt-1 leading-relaxed font-normal">
                  {mod.scenario}
                </p>
              </div>

              {/* Skills covered */}
              <div className="space-y-1.5">
                <p className="text-[10px] uppercase font-bold text-muted tracking-wider">
                  Skills & Vectors Evaluated:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {mod.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded bg-surface border border-border text-[10px] font-mono font-bold text-foreground"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Min Passing Score */}
              <div className="pt-2 border-t border-border flex items-center justify-between text-xs text-muted font-medium">
                <span>Passing Threshold:</span>
                <span className="font-mono text-foreground font-extrabold">{mod.minPassingScore}%</span>
              </div>
            </div>

            {/* Bottom Button / Lock Notice */}
            <div className="mt-6 pt-4 border-t border-border">
              {mod.unlocked ? (
                <Button
                  onClick={() => handleLaunchTest(mod)}
                  variant="dark"
                  size="sm"
                  className="w-full gap-2 text-xs font-extrabold"
                >
                  <Unlock className="w-3.5 h-3.5 text-electric-yellow" />
                  <span>Launch Advanced Assessment</span>
                </Button>
              ) : (
                <div className="p-3 rounded-lg bg-surface border border-border flex items-center gap-2 text-xs text-muted font-medium">
                  <Lock className="w-4 h-4 text-muted shrink-0" />
                  <span className="text-[11px] leading-tight">{mod.prerequisiteText}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Advanced Assessment Simulation Modal */}
      {selectedModule && (
        <Modal
          isOpen={isTestModalOpen}
          onClose={() => setIsTestModalOpen(false)}
          title={selectedModule.title}
          description={`Passing Benchmark: ${selectedModule.minPassingScore}% • Duration: ${selectedModule.duration}`}
          maxWidth="lg"
        >
          <div className="space-y-5">
            <div className="p-4 rounded-lg bg-surface-subtle border border-border space-y-2 text-xs">
              <p className="font-bold text-night">Simulated Incident Scenario:</p>
              <p className="text-muted leading-relaxed font-medium">{selectedModule.scenario}</p>
            </div>

            <div className="space-y-2 text-xs text-muted">
              <p className="font-bold text-night uppercase tracking-wider text-[11px]">
                Evaluation Environment Capabilities:
              </p>
              <ul className="space-y-1.5 pl-1 font-medium">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-imperial" />
                  <span>Real V8 CPU flamegraph and memory snapshot visualizer.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-imperial" />
                  <span>PostgreSQL sandbox with 1,000,000 synthetic rows for EXPLAIN ANALYZE tuning.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-imperial" />
                  <span>Isolated sandbox container with automated timeout enforcement.</span>
                </li>
              </ul>
            </div>

            {simulatedTestProgress && (
              <div className="p-4 rounded-lg bg-surface-subtle border border-night text-night text-xs space-y-1 animate-slide-up shadow-sm">
                <p className="font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-imperial" />
                  Assessment Simulation Passed (Score: 86%)!
                </p>
                <p className="text-[11px] text-muted font-medium">
                  Idempotent state machine and B-Tree index optimization verified. Added +250 XP to your profile.
                </p>
              </div>
            )}

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-border">
              <Button variant="secondary" size="sm" onClick={() => setIsTestModalOpen(false)} className="font-bold">
                Close
              </Button>
              {!simulatedTestProgress ? (
                <Button
                  size="sm"
                  onClick={() => setSimulatedTestProgress(true)}
                  className="gap-2 font-bold shadow-sm"
                >
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Simulate Test Execution</span>
                </Button>
              ) : (
                <Link href="/projects">
                  <Button size="sm" className="gap-2 font-bold shadow-sm">
                    <span>Proceed to Production Projects</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
