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
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="border-b border-surface-border pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="champagne" size="sm">Phase 05</Badge>
            <span className="text-xs text-pearl-muted font-mono uppercase tracking-wider">
              Advanced Technical Verification
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-pearl-primary tracking-tight">
            Advanced Technical & System Assessments
          </h1>
          <p className="text-xs sm:text-sm text-pearl-muted mt-1 max-w-2xl">
            Simulated live production scenarios, memory profiling flamegraphs, and distributed architecture evaluations that elevate your profile to senior candidate readiness.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/projects">
            <Button size="sm" className="gap-1.5">
              <span>View Production Projects</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Readiness Qualification Status Banner */}
      <div className="p-5 rounded-xl bg-surface-card border border-champagne/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-lg bg-navy-800 border border-champagne/40 flex items-center justify-center text-champagne shrink-0">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-semibold text-pearl-primary">
              Candidate Readiness Threshold: {userProfile.readinessScore}% / 70% Required
            </p>
            <p className="text-[11px] text-pearl-muted mt-0.5">
              You have met the foundational benchmark for <strong>{selectedRole.title}</strong>. 2 of 4 advanced assessments are unlocked.
            </p>
          </div>
        </div>

        <Badge variant="champagne" size="md">
          Senior Verification Track
        </Badge>
      </div>

      {/* Advanced Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {ADVANCED_ASSESSMENT_MODULES.map((mod) => (
          <div
            key={mod.id}
            className={`p-6 rounded-xl border flex flex-col justify-between transition-all duration-200 ${
              mod.unlocked
                ? "bg-surface-card border-surface-border hover:border-champagne/40 shadow-card-subtle"
                : "bg-surface-subtle/60 border-white/5 opacity-75"
            }`}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Badge variant={mod.unlocked ? "champagne" : "neutral"} size="sm">
                  {mod.category}
                </Badge>
                <div className="flex items-center gap-2 text-xs font-mono text-pearl-muted">
                  <Clock className="w-3.5 h-3.5 text-champagne" />
                  <span>{mod.duration}</span>
                </div>
              </div>

              <div>
                <h3 className="text-base font-semibold text-pearl-primary leading-snug">
                  {mod.title}
                </h3>
                <p className="text-xs text-pearl-muted mt-1 leading-relaxed">
                  {mod.scenario}
                </p>
              </div>

              {/* Skills covered */}
              <div className="space-y-1.5">
                <p className="text-[10px] uppercase font-semibold text-pearl-muted">
                  Skills & Vectors Evaluated:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {mod.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded bg-navy-900 border border-white/5 text-[10px] font-mono text-pearl-muted"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Min Passing Score */}
              <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs text-pearl-muted">
                <span>Passing Threshold:</span>
                <span className="font-mono text-champagne font-bold">{mod.minPassingScore}%</span>
              </div>
            </div>

            {/* Bottom Button / Lock Notice */}
            <div className="mt-6 pt-4 border-t border-white/5">
              {mod.unlocked ? (
                <Button
                  onClick={() => handleLaunchTest(mod)}
                  variant="primary"
                  size="sm"
                  className="w-full gap-2 text-xs font-semibold"
                >
                  <Unlock className="w-3.5 h-3.5" />
                  <span>Launch Advanced Assessment</span>
                </Button>
              ) : (
                <div className="p-3 rounded-lg bg-navy-950 border border-white/5 flex items-center gap-2 text-xs text-pearl-muted">
                  <Lock className="w-4 h-4 text-pearl-muted shrink-0" />
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
            <div className="p-4 rounded-lg bg-navy-950 border border-champagne/30 space-y-2 text-xs">
              <p className="font-semibold text-pearl-primary">Simulated Incident Scenario:</p>
              <p className="text-pearl-muted leading-relaxed">{selectedModule.scenario}</p>
            </div>

            <div className="space-y-2 text-xs text-pearl-muted">
              <p className="font-semibold text-pearl-primary uppercase tracking-wider text-[11px]">
                Evaluation Environment Capabilities:
              </p>
              <ul className="space-y-1.5 pl-1">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-champagne" />
                  <span>Real V8 CPU flamegraph and memory snapshot visualizer.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-champagne" />
                  <span>PostgreSQL sandbox with 1,000,000 synthetic rows for EXPLAIN ANALYZE tuning.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-champagne" />
                  <span>Isolated sandbox container with automated timeout enforcement.</span>
                </li>
              </ul>
            </div>

            {simulatedTestProgress && (
              <div className="p-4 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs space-y-1 animate-slide-up">
                <p className="font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Assessment Simulation Passed (Score: 86%)!
                </p>
                <p className="text-[11px] text-emerald-300/80">
                  Idempotent state machine and B-Tree index optimization verified. Added +250 XP to your profile.
                </p>
              </div>
            )}

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-surface-border">
              <Button variant="outline" size="sm" onClick={() => setIsTestModalOpen(false)}>
                Close
              </Button>
              {!simulatedTestProgress ? (
                <Button
                  size="sm"
                  onClick={() => setSimulatedTestProgress(true)}
                  className="gap-2"
                >
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Simulate Test Execution</span>
                </Button>
              ) : (
                <Link href="/projects">
                  <Button size="sm" className="gap-2">
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
