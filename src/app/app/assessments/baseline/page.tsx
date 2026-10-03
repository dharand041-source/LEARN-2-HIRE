"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Clock,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Eye,
  Check,
  Flag,
  Calculator,
  Brain,
  Code2,
  Target,
} from "lucide-react";
import { useCareer } from "@/context/CareerContext";
import {
  getQuestionsForRole,
  TechnicalQuestion,
  APTITUDE_QUESTION_BANK,
  LOGICAL_QUESTION_BANK,
} from "@/data/questions";
import { Badge } from "@/components/ui/Badge";
import { ROUTES } from "@/lib/routes";

export default function BaselineAssessmentPage() {
  const router = useRouter();
  const { selectedRole, assessmentAnswers, setAssessmentAnswer, submitAssessment } = useCareer();

  const [activeTrack, setActiveTrack] = useState<"technical" | "aptitude" | "logical">("technical");
  const [questions, setQuestions] = useState<TechnicalQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flaggedIndices, setFlaggedIndices] = useState<Set<number>>(new Set());
  const [secondsRemaining, setSecondsRemaining] = useState(1500); // 25 min
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const roleId = selectedRole?.id || "full-stack-developer";
    const loaded = getQuestionsForRole(roleId, {
      shuffle: true,
    }).slice(0, 10);
    setQuestions(loaded);
    setCurrentIndex(0);
  }, [selectedRole]);

  const handleConfirmSubmit = useCallback(async () => {
    setIsSubmitting(true);
    try {
      submitAssessment(assessmentAnswers, questions);
      router.push(ROUTES.app.assessments.results("baseline"));
    } catch {
      router.push(ROUTES.app.assessments.results("baseline"));
    }
  }, [assessmentAnswers, questions, router, submitAssessment]);

  // Timer countdown
  useEffect(() => {
    if (secondsRemaining <= 0) {
      handleConfirmSubmit();
      return;
    }
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [secondsRemaining, handleConfirmSubmit]);

  const currentQ = questions[currentIndex];

  const handleSelectOption = (label: string) => {
    if (!currentQ) return;
    setAssessmentAnswer(currentQ.id, label);
  };

  const toggleFlag = (index: number) => {
    setFlaggedIndices((prev) => {
      const updated = new Set(prev);
      if (updated.has(index)) updated.delete(index);
      else updated.add(index);
      return updated;
    });
  };

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const answeredCount = questions.filter((q) => assessmentAnswers[q.id] !== undefined).length;

  if (!currentQ) {
    return (
      <div className="min-h-screen bg-warm-cream flex flex-col items-center justify-center p-6 text-ink-black">
        <div className="w-8 h-8 border-4 border-primary-orange border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-sm font-bold uppercase tracking-wider text-ink-black">
          Generating role-specific diagnostic for {selectedRole?.title || "Full-Stack Developer"}...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-warm-cream text-ink-black flex flex-col">
      {/* Top Assessment Header */}
      <header className="h-16 border-b-2 border-ink-black bg-ink-black text-paper-white px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <Link href={ROUTES.app.dashboard} className="text-xs text-paper-white/80 hover:text-paper-white font-bold flex items-center gap-1.5 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Dashboard</span>
          </Link>
          <div className="h-4 w-px bg-paper-white/20 mx-1 hidden sm:block" />
          <div className="flex items-center gap-2">
            <h1 className="text-xs sm:text-sm font-extrabold text-paper-white uppercase tracking-tight">
              Baseline Role Diagnostic: {selectedRole?.title || "Full-Stack Developer"}
            </h1>
            <div className="hidden sm:inline-flex">
              <Badge variant="primary" size="sm">
                Candidate Baseline
              </Badge>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded bg-paper-white/10 border border-paper-white/20 text-paper-white text-[11px] font-mono font-bold">
            <Eye className="w-3.5 h-3.5 text-primary-orange" />
            <span>Integrity Guard Active</span>
          </div>

          <div className="flex items-center gap-1.5 px-2 sm:px-3 py-1 bg-golden-yellow border-2 border-ink-black text-ink-black font-mono text-xs font-extrabold shadow-editorial-sm">
            <Clock className="w-3.5 h-3.5 text-ink-black" />
            <span>{formatTimer(secondsRemaining)}</span>
          </div>

          <button
            onClick={() => setIsSubmitModalOpen(true)}
            className="px-3 sm:px-4 py-1.5 bg-primary-orange hover:bg-rose text-paper-white border-2 border-ink-black font-extrabold text-xs transition-colors cursor-pointer shadow-editorial-xs"
          >
            Submit Diagnostic
          </button>
        </div>
      </header>

      {/* Progress Strip */}
      <div className="border-b-2 border-ink-black bg-paper-white px-4 sm:px-8 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between text-xs font-bold uppercase tracking-wider">
          <span className="text-ink-black/70">
            Question {currentIndex + 1} of {questions.length}
          </span>
          <span className="text-primary-orange font-black">
            {answeredCount} Answered ({Math.round((answeredCount / questions.length) * 100)}%)
          </span>
        </div>
      </div>

      {/* Main Question Interface */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-4 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Question Details (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="p-6 sm:p-8 bg-paper-white border-2 border-ink-black shadow-editorial-md space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 bg-ink-black text-paper-white text-[11px] font-mono font-bold">
                  Q{currentIndex + 1}
                </span>
                <span className="px-2.5 py-1 bg-soft-pink/30 text-rose border border-rose text-[11px] font-bold uppercase">
                  {currentQ.skill}
                </span>
                <span className="px-2.5 py-1 bg-warm-cream text-ink-black border border-ink-black/20 text-[11px] font-bold uppercase">
                  {currentQ.difficulty}
                </span>
              </div>
              <button
                onClick={() => toggleFlag(currentIndex)}
                className={`text-xs font-bold flex items-center gap-1.5 px-3 py-1 border transition-colors ${
                  flaggedIndices.has(currentIndex)
                    ? "bg-golden-yellow border-ink-black text-ink-black font-bold"
                    : "bg-paper-white border-ink-black/20 text-ink-black/70 hover:border-ink-black"
                }`}
              >
                <Flag className="w-3.5 h-3.5" />
                <span>{flaggedIndices.has(currentIndex) ? "Flagged for Review" : "Flag Question"}</span>
              </button>
            </div>

            <h2 className="text-base sm:text-lg font-bold text-ink-black leading-relaxed">
              {currentQ.question}
            </h2>

            {currentQ.codeSnippet && (
              <pre className="p-4 bg-ink-black text-paper-white font-mono text-xs overflow-x-auto border-2 border-ink-black">
                <code>{currentQ.codeSnippet}</code>
              </pre>
            )}

            {/* Answer Options */}
            <div className="space-y-3 pt-2">
              {currentQ.options?.map((opt, idx) => {
                const isSelected = assessmentAnswers[currentQ.id] === opt.label || assessmentAnswers[currentQ.id] === idx.toString();
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(opt.label)}
                    className={`w-full text-left p-4 border-2 transition-all flex items-start gap-4 cursor-pointer ${
                      isSelected
                        ? "bg-soft-pink/30 border-primary-orange shadow-editorial-xs ring-2 ring-primary-orange"
                        : "bg-paper-white border-ink-black/30 hover:border-ink-black hover:bg-warm-cream/50"
                    }`}
                  >
                    <span
                      className={`w-6 h-6 shrink-0 rounded flex items-center justify-center font-mono font-bold text-xs border ${
                        isSelected
                          ? "bg-primary-orange text-paper-white border-ink-black"
                          : "bg-warm-cream text-ink-black border-ink-black/20"
                      }`}
                    >
                      {opt.label}
                    </span>
                    <span className="text-sm font-semibold text-ink-black leading-relaxed pt-0.5">
                      {opt.text}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
              disabled={currentIndex === 0}
              className="px-5 py-2.5 bg-paper-white text-ink-black border-2 border-ink-black font-extrabold text-xs uppercase tracking-wider disabled:opacity-30 disabled:cursor-not-allowed hover:bg-soft-pink transition-colors shadow-editorial-xs"
            >
              Previous
            </button>

            {currentIndex < questions.length - 1 ? (
              <button
                onClick={() => setCurrentIndex((prev) => prev + 1)}
                className="px-6 py-2.5 bg-primary-orange text-paper-white border-2 border-ink-black font-extrabold text-xs uppercase tracking-wider hover:bg-rose transition-colors shadow-editorial-xs flex items-center gap-2"
              >
                <span>Next Question</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => setIsSubmitModalOpen(true)}
                className="px-6 py-2.5 bg-primary-orange text-paper-white border-2 border-ink-black font-black text-xs uppercase tracking-wider hover:bg-rose transition-colors shadow-editorial-xs flex items-center gap-2"
              >
                <span>Submit Diagnostic</span>
                <Check className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Right Column: Question Grid Palette (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 bg-paper-white border-2 border-ink-black shadow-editorial-sm space-y-4">
            <h3 className="text-xs font-black uppercase tracking-wider text-ink-black">
              Assessment Matrix
            </h3>

            <div className="grid grid-cols-5 gap-2">
              {questions.map((q, idx) => {
                const isCurrent = idx === currentIndex;
                const isAnswered = assessmentAnswers[q.id] !== undefined;
                const isFlagged = flaggedIndices.has(idx);

                let bgClass = "bg-paper-white text-ink-black border-ink-black/30";
                if (isAnswered) bgClass = "bg-primary-orange text-paper-white border-ink-black font-bold";
                if (isFlagged) bgClass = "bg-golden-yellow text-ink-black border-ink-black font-bold";
                if (isCurrent) bgClass += " ring-2 ring-primary-orange ring-offset-2";

                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-10 border-2 font-mono text-xs flex items-center justify-center transition-all cursor-pointer ${bgClass}`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            <div className="pt-4 border-t border-ink-black/10 space-y-2 text-[11px] font-bold">
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 bg-primary-orange border border-ink-black inline-block" />
                <span className="text-ink-black">Answered</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 bg-golden-yellow border border-ink-black inline-block" />
                <span className="text-ink-black">Flagged for Review</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 bg-paper-white border border-ink-black/30 inline-block" />
                <span className="text-ink-black/70">Unanswered</span>
              </div>
            </div>
          </div>

          <div className="p-5 bg-ink-black text-paper-white border-2 border-ink-black shadow-editorial-sm space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-primary-orange block font-bold">
              Diagnostic Integrity
            </span>
            <p className="text-xs leading-relaxed text-paper-white/90">
              Questions are drawn dynamically to evaluate role readiness. Upon submission, an explainable Skill Analysis will be generated.
            </p>
          </div>
        </div>
      </main>

      {/* Confirmation Modal */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 z-50 bg-ink-black/70 flex items-center justify-center p-4">
          <div className="bg-paper-white border-4 border-ink-black shadow-editorial-lg max-w-md w-full p-6 space-y-6 text-ink-black">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-orange text-paper-white flex items-center justify-center border-2 border-ink-black">
                <Target className="w-5 h-5 text-paper-white" />
              </div>
              <div>
                <h3 className="text-base font-black uppercase tracking-tight text-ink-black">
                  Submit Baseline Assessment?
                </h3>
                <p className="text-xs text-ink-black/70">
                  You have answered {answeredCount} of {questions.length} questions.
                </p>
              </div>
            </div>

            {answeredCount < questions.length && (
              <div className="p-3 bg-golden-yellow/20 border-2 border-golden-yellow text-ink-black text-xs font-semibold flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0 text-ink-black" />
                <span>You have {questions.length - answeredCount} unanswered questions remaining.</span>
              </div>
            )}

            <p className="text-xs text-ink-black/80 leading-relaxed">
              Submitting now will grade your answers, evaluate competency strengths and weaknesses, and direct you to the Skill Gap Analyzer.
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setIsSubmitModalOpen(false)}
                className="px-4 py-2 bg-paper-white text-ink-black border-2 border-ink-black font-extrabold text-xs uppercase tracking-wider hover:bg-warm-cream transition-colors"
              >
                Continue Test
              </button>
              <button
                onClick={handleConfirmSubmit}
                disabled={isSubmitting}
                className="px-5 py-2 bg-primary-orange text-paper-white border-2 border-ink-black font-black text-xs uppercase tracking-wider hover:bg-rose transition-colors shadow-editorial-xs"
              >
                {isSubmitting ? "Grading..." : "Confirm & Grade"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
