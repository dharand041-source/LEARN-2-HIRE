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
      {/* Header */}
      <div className="border-b border-border pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="imperial" size="sm">Phase 05</Badge>
            <span className="text-xs text-muted font-mono uppercase tracking-wider font-bold">
              Advanced Technical Verification
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-night tracking-tight uppercase">
            Advanced Technical & System Assessments
          </h1>
          <p className="text-xs sm:text-sm text-muted mt-1 max-w-2xl">
            Simulated live production scenarios, memory profiling flamegraphs, and distributed architecture evaluations that elevate your profile to senior candidate readiness.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/projects">
            <Button size="sm" className="gap-1.5 font-bold shadow-sm">
              <span>View Production Projects</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Readiness Qualification Status Banner */}
      <div className="p-5 rounded-xl bg-white border border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-lg bg-surface-subtle border border-border flex items-center justify-center text-imperial shrink-0">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-bold text-night">
              Candidate Readiness Threshold: {userProfile.readinessScore}% / 70% Required
            </p>
            <p className="text-[11px] text-muted mt-0.5 font-medium">
              You have met the foundational benchmark for <strong>{selectedRole.title}</strong>. 2 of 4 advanced assessments are unlocked.
            </p>
          </div>
        </div>

        <Badge variant="imperial" size="md">
          Senior Verification Track
        </Badge>
      </div>

      {/* Advanced Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {ADVANCED_ASSESSMENT_MODULES.map((mod) => (
          <div
            key={mod.id}
            className={`p-6 rounded-xl border flex flex-col justify-between transition-all duration-200 bg-white ${
              mod.unlocked
                ? "border-border hover:border-imperial shadow-card"
                : "border-border/60 opacity-60 bg-surface-subtle"
            }`}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Badge variant={mod.unlocked ? "night" : "neutral"} size="sm">
                  {mod.category}
                </Badge>
                <div className="flex items-center gap-2 text-xs font-mono text-muted font-semibold">
                  <Clock className="w-3.5 h-3.5 text-imperial" />
                  <span>{mod.duration}</span>
                </div>
              </div>

              <div>
                <h3 className="text-base font-extrabold text-night leading-snug">
                  {mod.title}
                </h3>
                <p className="text-xs text-muted mt-1 leading-relaxed font-medium">
                  {mod.scenario}
                </p>
              </div>

              {/* Skills covered */}
              <div className="space-y-1.5">
                <p className="text-[10px] uppercase font-bold text-night">
                  Skills & Vectors Evaluated:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {mod.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded bg-surface-subtle border border-border text-[10px] font-mono font-semibold text-night"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Min Passing Score */}
              <div className="pt-2 border-t border-border flex items-center justify-between text-xs text-muted font-medium">
                <span>Passing Threshold:</span>
                <span className="font-mono text-imperial font-extrabold">{mod.minPassingScore}%</span>
              </div>
            </div>

            {/* Bottom Button / Lock Notice */}
            <div className="mt-6 pt-4 border-t border-border">
              {mod.unlocked ? (
                <Button
                  onClick={() => handleLaunchTest(mod)}
                  variant="primary"
                  size="sm"
                  className="w-full gap-2 text-xs font-bold shadow-sm"
                >
                  <Unlock className="w-3.5 h-3.5" />
                  <span>Launch Advanced Assessment</span>
                </Button>
              ) : (
                <div className="p-3 rounded-lg bg-surface-subtle border border-border flex items-center gap-2 text-xs text-muted font-medium">
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
