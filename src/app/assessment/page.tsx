"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ShieldAlert,
  Clock,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  HelpCircle,
  Eye,
  Check,
  Flag,
} from "lucide-react";
import { useCareer } from "@/context/CareerContext";
import { INITIAL_ASSESSMENT_QUESTIONS } from "@/data/assessments";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Modal } from "@/components/ui/Modal";

export default function AssessmentPage() {
  const router = useRouter();
  const { selectedRole, assessmentAnswers, setAssessmentAnswer, submitAssessment } = useCareer();

  const questions = INITIAL_ASSESSMENT_QUESTIONS;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [localAnswers, setLocalAnswers] = useState<Record<string, string>>(assessmentAnswers);
  const [flaggedQuestions, setFlaggedQuestions] = useState<Record<string, boolean>>({});
  const [secondsRemaining, setSecondsRemaining] = useState(1500); // 25 mins
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [focusWarningCount, setFocusWarningCount] = useState(0);

  const currentQ = questions[currentIndex];
  const answeredCount = Object.keys(localAnswers).length;
  const progressPercentage = Math.round((answeredCount / questions.length) * 100);

  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleSelectOption = (optionId: string) => {
    const updated = { ...localAnswers, [currentQ.id]: optionId };
    setLocalAnswers(updated);
    setAssessmentAnswer(currentQ.id, optionId);
  };

  const handleToggleFlag = () => {
    setFlaggedQuestions((prev) => ({
      ...prev,
      [currentQ.id]: !prev[currentQ.id],
    }));
  };

  const handleFinalSubmit = () => {
    submitAssessment(localAnswers);
    setIsSubmitModalOpen(false);
    router.push("/assessment/results");
  };

  return (
    <div className="min-h-screen bg-white text-night flex flex-col">
      {/* Top Assessment Header */}
      <header className="h-16 border-b border-border bg-white px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <Link href="/onboarding" className="text-xs text-muted hover:text-night font-semibold flex items-center gap-1.5">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Exit</span>
          </Link>
          <div className="h-4 w-px bg-border mx-1 hidden sm:block" />
          <div className="flex items-center gap-2">
            <h1 className="text-xs sm:text-sm font-bold text-night">
              {selectedRole.title} Diagnostic Assessment
            </h1>
            <Badge variant="night" size="sm">
              Standard Technical Evaluation
            </Badge>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Integrity Badge */}
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded bg-surface-subtle border border-border text-night text-[11px] font-mono font-semibold">
            <Eye className="w-3.5 h-3.5 text-imperial" />
            <span>Focus Active</span>
          </div>

          {/* Timer Display */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded bg-surface-subtle border border-border text-night font-mono text-xs font-extrabold shadow-sm">
            <Clock className="w-3.5 h-3.5 text-imperial" />
            <span>{formatTimer(secondsRemaining)}</span>
          </div>

          {/* Submit CTA */}
          <Button
            onClick={() => setIsSubmitModalOpen(true)}
            variant="primary"
            size="sm"
            className="text-xs font-bold shadow-sm"
          >
            Submit Assessment
          </Button>
        </div>
      </header>

      {/* Main 3-Column Assessment Body */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Question Navigator Matrix (3 cols) */}
        <div className="lg:col-span-3 rounded-xl bg-white border border-border p-5 space-y-4 shadow-card">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <h3 className="text-xs font-bold text-night uppercase tracking-wider">
              Question Navigator
            </h3>
            <span className="text-xs font-mono font-bold text-imperial">
              {answeredCount} / {questions.length} Solved
            </span>
          </div>

          <ProgressBar value={progressPercentage} size="sm" variant="imperial" />

          {/* 10 Question Navigation Grid */}
          <div className="grid grid-cols-5 gap-2 pt-2">
            {questions.map((q, idx) => {
              const isCurrent = idx === currentIndex;
              const isAnswered = !!localAnswers[q.id];
              const isFlagged = !!flaggedQuestions[q.id];

              let buttonStyles = "bg-surface-subtle border-border text-muted hover:border-night hover:text-night";
              if (isCurrent) {
                buttonStyles = "bg-imperial border-imperial text-white font-bold shadow-sm";
              } else if (isFlagged) {
                buttonStyles = "bg-imperial-50 border-imperial text-imperial font-bold";
              } else if (isAnswered) {
                buttonStyles = "bg-night border-night text-white font-semibold";
              }

              return (
                <button
                  key={q.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-10 rounded-lg border text-xs font-mono transition-all flex flex-col items-center justify-center relative ${buttonStyles}`}
                >
                  <span>0{idx + 1}</span>
                  {isAnswered && !isCurrent && (
                    <span className="w-1.5 h-1.5 rounded-full bg-imperial absolute bottom-1" />
                  )}
                  {isFlagged && !isCurrent && (
                    <span className="w-1.5 h-1.5 rounded-full bg-imperial absolute top-1 right-1" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Legend */}
          <div className="pt-4 border-t border-border space-y-2 text-[11px] text-muted font-medium">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded bg-imperial" />
              <span className="text-night font-semibold">Current Question</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded bg-night" />
              <span>Answered</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded bg-imperial-50 border border-imperial" />
              <span>Flagged for Review</span>
            </div>
          </div>
        </div>

        {/* Center Column: Question & Option Cards (6 cols) */}
        <div className="lg:col-span-6 space-y-5">
          <div className="p-6 rounded-xl bg-white border border-border space-y-5 shadow-card">
            {/* Question Header & Badges */}
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div className="flex items-center gap-2">
                <Badge variant="imperial" size="sm">Question 0{currentIndex + 1} of 10</Badge>
                <Badge variant="night" size="sm">{currentQ.category}</Badge>
              </div>
              <button
                onClick={handleToggleFlag}
                className={`flex items-center gap-1.5 text-xs px-2.5 py-1 rounded transition-colors font-semibold ${
                  flaggedQuestions[currentQ.id]
                    ? "bg-imperial text-white border border-imperial"
                    : "text-night hover:text-imperial bg-surface-subtle border border-border"
                }`}
              >
                <Flag className="w-3.5 h-3.5" />
                <span>{flaggedQuestions[currentQ.id] ? "Flagged" : "Flag for Review"}</span>
              </button>
            </div>

            {/* Question Title */}
            <h2 className="text-base font-bold text-night leading-relaxed">
              {currentQ.title}
            </h2>

            {/* Code Snippet Box if available */}
            {currentQ.codeSnippet && (
              <div className="rounded-lg bg-night border border-border p-4 font-mono text-xs text-white overflow-x-auto shadow-inner">
                <pre className="text-white leading-relaxed whitespace-pre-wrap">
                  {currentQ.codeSnippet}
                </pre>
              </div>
            )}

            {/* Options List */}
            <div className="space-y-2.5 pt-2">
              <p className="text-xs text-muted font-bold uppercase tracking-wider">
                Select One Option:
              </p>
              {currentQ.options.map((opt) => {
                const isSelected = localAnswers[currentQ.id] === opt.id;
                return (
                  <div
                    key={opt.id}
                    onClick={() => handleSelectOption(opt.id)}
                    className={`p-3.5 rounded-lg border transition-all cursor-pointer flex items-start gap-3 ${
                      isSelected
                        ? "bg-imperial-50/50 border-imperial text-night shadow-sm"
                        : "bg-surface-subtle border-border text-night hover:border-night"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                        isSelected
                          ? "border-imperial bg-imperial text-white"
                          : "border-border bg-white"
                      }`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                    <div className={`text-xs leading-relaxed font-medium ${isSelected ? "text-night font-bold" : "text-night"}`}>
                      {opt.text}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Pagination Controls */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-white border border-border shadow-sm">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
              disabled={currentIndex === 0}
              className="gap-2 font-bold"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Previous</span>
            </Button>

            <span className="text-xs text-muted font-mono font-bold">
              Question {currentIndex + 1} / {questions.length}
            </span>

            {currentIndex < questions.length - 1 ? (
              <Button
                variant="dark"
                size="sm"
                onClick={() => setCurrentIndex((prev) => Math.min(questions.length - 1, prev + 1))}
                className="gap-2 font-bold"
              >
                <span>Next Question</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            ) : (
              <Button
                variant="primary"
                size="sm"
                onClick={() => setIsSubmitModalOpen(true)}
                className="gap-2 font-bold shadow-sm"
              >
                <span>Complete Assessment</span>
                <CheckCircle2 className="w-3.5 h-3.5" />
              </Button>
            )}
          </div>
        </div>

        {/* Right Column: Assessment Rules & Integrity (3 cols) */}
        <div className="lg:col-span-3 rounded-xl bg-white border border-border p-5 space-y-5 shadow-card">
          <div>
            <h3 className="text-xs font-bold text-night uppercase tracking-wider">
              Assessment Standards
            </h3>
            <p className="text-[11px] text-muted mt-1 leading-relaxed">
              Technical diagnostics evaluate mental models, runtime nuances, and code comprehension.
            </p>
          </div>

          <div className="space-y-3 p-3.5 rounded-lg bg-surface-subtle border border-border text-xs text-muted">
            <div className="flex items-start gap-2">
              <ShieldAlert className="w-4 h-4 text-imperial shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-night">Honest Integrity</p>
                <p className="text-[10px] text-muted mt-0.5">
                  Leaving full screen or switching tabs is recorded in session telemetry.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-imperial shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-night">No Guessing Penalty</p>
                <p className="text-[10px] text-muted mt-0.5">
                  Answer every question to receive the most accurate personalized curriculum.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-border">
            <h4 className="text-[11px] uppercase tracking-wider font-bold text-night mb-2">
              Skill Tested in Current Question
            </h4>
            <Badge variant="imperial" size="sm">{currentQ.skillTested}</Badge>
          </div>
        </div>
      </div>

      {/* Submit Confirmation Modal */}
      <Modal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        title="Submit Technical Assessment?"
        description="Your answers will be analyzed to generate your Skill Gap breakdown and custom learning track."
        maxWidth="md"
      >
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-surface-subtle border border-border space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-muted font-medium">Questions Answered:</span>
              <span className="text-night font-bold">{answeredCount} of {questions.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted font-medium">Flagged for Review:</span>
              <span className="text-imperial font-bold">{Object.values(flaggedQuestions).filter(Boolean).length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted font-medium">Time Remaining:</span>
              <span className="text-night font-bold font-mono">{formatTimer(secondsRemaining)}</span>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <Button variant="secondary" size="sm" onClick={() => setIsSubmitModalOpen(false)} className="font-bold">
              Continue Assessment
            </Button>
            <Button variant="primary" size="sm" onClick={handleFinalSubmit} className="gap-1.5 font-bold shadow-sm">
              <span>Confirm & View Results</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
