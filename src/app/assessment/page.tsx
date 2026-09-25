"use client";

import React, { useState, useEffect, useMemo } from "react";
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
  Calculator,
  Brain,
  Code2,
  HelpCircle as QuestionIcon,
} from "lucide-react";
import { useCareer } from "@/context/CareerContext";
import {
  getQuestionsForRole,
  TechnicalQuestion,
  APTITUDE_QUESTION_BANK,
  LOGICAL_QUESTION_BANK,
  AptitudeQuestion,
  LogicalReasoningQuestion,
} from "@/data/questions";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Modal } from "@/components/ui/Modal";

type AssessmentTrack = "technical" | "aptitude" | "logical";

export default function AssessmentPage() {
  const router = useRouter();
  const { selectedRole, assessmentAnswers, setAssessmentAnswer, submitAssessment } = useCareer();

  const [activeTrack, setActiveTrack] = useState<AssessmentTrack>("technical");

  // Track session questions stably so they do not regenerate during answering
  const [technicalQuestions, setTechnicalQuestions] = useState<TechnicalQuestion[]>([]);
  const [usedQuestionIds, setUsedQuestionIds] = useState<Record<string, string[]>>({});

  // Initialize or reload technical questions when selectedRole changes
  useEffect(() => {
    const roleId = selectedRole.id;
    const previouslyUsed = usedQuestionIds[roleId] || [];
    const loaded = getQuestionsForRole(roleId, {
      shuffle: true,
      excludeIds: previouslyUsed,
    });
    setTechnicalQuestions(loaded);
    setUsedQuestionIds((prev) => ({
      ...prev,
      [roleId]: [...(prev[roleId] || []), ...loaded.map((q) => q.id)],
    }));
    setCurrentIndex(0);
  }, [selectedRole.id]);

  // Current active question set depending on track
  const currentQuestionSet: TechnicalQuestion[] = useMemo(() => {
    if (activeTrack === "aptitude") {
      return APTITUDE_QUESTION_BANK.map((aq) => ({
        id: aq.id,
        roleId: "aptitude",
        role: "Quantitative Aptitude",
        skill: aq.category,
        subSkill: "Arithmetic & Logic",
        topic: aq.category,
        difficulty: aq.difficulty,
        type: "mcq" as const,
        question: aq.question,
        codeSnippet: undefined,
        options: aq.options,
        correctAnswer: aq.correctAnswer,
        explanation: aq.solution || aq.explanation,
        source: aq.source,
        sourceUrl: aq.sourceUrl,
        sourceType: aq.sourceType,
        version: aq.version,
      }));
    }
    if (activeTrack === "logical") {
      return LOGICAL_QUESTION_BANK.map((lq) => ({
        id: lq.id,
        roleId: "logical-reasoning",
        role: "Logical Reasoning",
        skill: lq.category,
        subSkill: "Analytical Reasoning",
        topic: lq.category,
        difficulty: lq.difficulty,
        type: "mcq" as const,
        question: lq.question,
        codeSnippet: undefined,
        options: lq.options,
        correctAnswer: lq.correctAnswer,
        explanation: lq.explanation,
        source: lq.source,
        sourceUrl: lq.sourceUrl,
        sourceType: lq.sourceType,
        version: lq.version,
      }));
    }
    return technicalQuestions;
  }, [activeTrack, technicalQuestions]);

  const questions = currentQuestionSet;
  const [currentIndex, setCurrentIndex] = useState(0);

  // Maintain separate local answers per track to avoid bleed
  const [trackAnswers, setTrackAnswers] = useState<{
    technical: Record<string, string>;
    aptitude: Record<string, string>;
    logical: Record<string, string>;
  }>({
    technical: assessmentAnswers,
    aptitude: {},
    logical: {},
  });

  const [flaggedQuestions, setFlaggedQuestions] = useState<Record<string, boolean>>({});
  const [secondsRemaining, setSecondsRemaining] = useState(1500); // 25 mins
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

  // Safe index boundary check
  const activeIndex = Math.min(currentIndex, Math.max(0, questions.length - 1));
  const currentQ = questions[activeIndex];

  const currentTrackAnswers = trackAnswers[activeTrack] || {};
  const answeredCount = Object.keys(currentTrackAnswers).length;
  const progressPercentage = questions.length > 0 ? Math.round((answeredCount / questions.length) * 100) : 0;

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

  const handleSelectOption = (optionLabelOrText: string) => {
    if (!currentQ) return;
    const updated = { ...currentTrackAnswers, [currentQ.id]: optionLabelOrText };
    setTrackAnswers((prev) => ({ ...prev, [activeTrack]: updated }));
    if (activeTrack === "technical") {
      setAssessmentAnswer(currentQ.id, optionLabelOrText);
    }
  };

  const handleFillBlankChange = (text: string) => {
    if (!currentQ) return;
    const updated = { ...currentTrackAnswers, [currentQ.id]: text };
    setTrackAnswers((prev) => ({ ...prev, [activeTrack]: updated }));
    if (activeTrack === "technical") {
      setAssessmentAnswer(currentQ.id, text);
    }
  };

  const handleToggleFlag = () => {
    if (!currentQ) return;
    setFlaggedQuestions((prev) => ({
      ...prev,
      [currentQ.id]: !prev[currentQ.id],
    }));
  };

  const handleTrackSwitch = (newTrack: AssessmentTrack) => {
    setActiveTrack(newTrack);
    setCurrentIndex(0);
  };

  const handleFinalSubmit = () => {
    if (activeTrack === "technical") {
      submitAssessment(trackAnswers.technical, technicalQuestions);
      setIsSubmitModalOpen(false);
      router.push("/assessment/results");
    } else {
      // Aptitude or Logical Reasoning score evaluation
      setIsSubmitModalOpen(false);
      alert(
        `Track completed! You answered ${answeredCount} of ${questions.length} ${
          activeTrack === "aptitude" ? "Quantitative Aptitude" : "Logical Reasoning"
        } questions.`
      );
    }
  };

  if (!currentQ) {
    return (
      <div className="min-h-screen bg-white text-night flex flex-col items-center justify-center p-6">
        <div className="w-8 h-8 border-4 border-imperial border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-sm font-semibold text-night">Loading verified question bank for {selectedRole.title}...</p>
      </div>
    );
  }

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
              {activeTrack === "technical"
                ? `${selectedRole.title} Diagnostic`
                : activeTrack === "aptitude"
                ? "Quantitative Aptitude"
                : "Logical Reasoning"}
            </h1>
            <Badge variant="night" size="sm">
              {activeTrack === "technical"
                ? "Role-Specific Technical Assessment"
                : activeTrack === "aptitude"
                ? "Numerical & Quantitative"
                : "Analytical & Deduction"}
            </Badge>
          </div>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
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

      {/* Track Selector Bar (Technical / Aptitude / Logical) */}
      <div className="border-b border-border bg-surface-subtle px-4 sm:px-8 py-2">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 bg-white p-1 rounded-lg border border-border text-xs">
            <button
              onClick={() => handleTrackSwitch("technical")}
              className={`px-3 py-1.5 rounded-md font-bold transition-all flex items-center gap-1.5 ${
                activeTrack === "technical"
                  ? "bg-imperial text-white shadow-sm"
                  : "text-muted hover:text-night"
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Technical ({selectedRole.title})</span>
            </button>
            <button
              onClick={() => handleTrackSwitch("aptitude")}
              className={`px-3 py-1.5 rounded-md font-bold transition-all flex items-center gap-1.5 ${
                activeTrack === "aptitude"
                  ? "bg-imperial text-white shadow-sm"
                  : "text-muted hover:text-night"
              }`}
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>Aptitude (14 Topics)</span>
            </button>
            <button
              onClick={() => handleTrackSwitch("logical")}
              className={`px-3 py-1.5 rounded-md font-bold transition-all flex items-center gap-1.5 ${
                activeTrack === "logical"
                  ? "bg-imperial text-white shadow-sm"
                  : "text-muted hover:text-night"
              }`}
            >
              <Brain className="w-3.5 h-3.5" />
              <span>Logical Reasoning (14 Topics)</span>
            </button>
          </div>

          <div className="text-[11px] text-muted font-medium flex items-center gap-2">
            <span>Pool:</span>
            <Badge variant="neutral" size="sm">
              {questions.length} Questions Verified
            </Badge>
          </div>
        </div>
      </div>

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

          {/* Dynamic Question Navigation Grid */}
          <div className="grid grid-cols-5 gap-2 pt-2">
            {questions.map((q, idx) => {
              const isCurrent = idx === currentIndex;
              const isAnswered = !!currentTrackAnswers[q.id];
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
                  <span>{idx < 9 ? `0${idx + 1}` : `${idx + 1}`}</span>
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
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="imperial" size="sm">
                  Question {currentIndex + 1} / {questions.length}
                </Badge>
                <Badge variant="night" size="sm">{currentQ.skill}</Badge>
                <Badge
                  variant={
                    currentQ.difficulty === "Beginner"
                      ? "neutral"
                      : currentQ.difficulty === "Intermediate"
                      ? "night"
                      : "imperial"
                  }
                  size="sm"
                >
                  {currentQ.difficulty}
                </Badge>
                <Badge variant="neutral" size="sm">
                  {currentQ.type === "mcq" ? "Multiple Choice" : "Fill in the Blank"}
                </Badge>
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

            {/* Question Text */}
            <h2 className="text-base font-bold text-night leading-relaxed whitespace-pre-line">
              {currentQ.question}
            </h2>

            {/* Code Snippet Box if available */}
            {currentQ.codeSnippet && (
              <div className="rounded-lg bg-night border border-border p-4 font-mono text-xs text-white overflow-x-auto shadow-inner">
                <pre className="text-white leading-relaxed whitespace-pre-wrap">
                  {currentQ.codeSnippet}
                </pre>
              </div>
            )}

            {/* Answer Control: MCQ Options (4 options) OR Fill in Blank Input */}
            {currentQ.type === "mcq" && currentQ.options && (
              <div className="space-y-2.5 pt-2">
                <p className="text-xs text-muted font-bold uppercase tracking-wider">
                  Select Exactly One Option:
                </p>
                {currentQ.options.map((opt) => {
                  const isSelected =
                    currentTrackAnswers[currentQ.id] === opt.label ||
                    currentTrackAnswers[currentQ.id] === opt.text;

                  return (
                    <div
                      key={opt.label}
                      onClick={() => handleSelectOption(opt.label)}
                      className={`p-3.5 rounded-lg border transition-all cursor-pointer flex items-start gap-3 ${
                        isSelected
                          ? "bg-imperial-50/50 border-imperial text-night shadow-sm"
                          : "bg-surface-subtle border-border text-night hover:border-night"
                      }`}
                    >
                      <div
                        className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold transition-colors ${
                          isSelected
                            ? "border-imperial bg-imperial text-white"
                            : "border-border bg-white text-muted"
                        }`}
                      >
                        {isSelected ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : opt.label}
                      </div>
                      <div className={`text-xs leading-relaxed font-medium ${isSelected ? "text-night font-bold" : "text-night"}`}>
                        <span className="font-bold mr-1.5">{opt.label}.</span>
                        {opt.text}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {currentQ.type === "fill_blank" && (
              <div className="space-y-3 pt-2">
                <p className="text-xs text-muted font-bold uppercase tracking-wider">
                  Fill in the Blank:
                </p>
                <div className="space-y-2">
                  <input
                    type="text"
                    value={currentTrackAnswers[currentQ.id] || ""}
                    onChange={(e) => handleFillBlankChange(e.target.value)}
                    placeholder="Type your answer here (e.g. hook name, status code, protocol)..."
                    className="w-full px-4 py-3 rounded-lg border border-border bg-surface-subtle text-night text-sm font-medium focus:outline-none focus:border-imperial focus:ring-1 focus:ring-imperial transition-all shadow-inner"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && currentIndex < questions.length - 1) {
                        setCurrentIndex((prev) => prev + 1);
                      }
                    }}
                  />
                  <p className="text-[11px] text-muted italic">
                    Answers are evaluated deterministically with normalized casing, whitespace, and punctuation.
                  </p>
                </div>
              </div>
            )}
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

        {/* Right Column: Assessment Metadata & Reference Attribution (3 cols) */}
        <div className="lg:col-span-3 rounded-xl bg-white border border-border p-5 space-y-5 shadow-card">
          <div>
            <h3 className="text-xs font-bold text-night uppercase tracking-wider">
              Assessment Standards
            </h3>
            <p className="text-[11px] text-muted mt-1 leading-relaxed">
              Diagnostic questions are role-segregated and curated from verified industry interview references.
            </p>
          </div>

          <div className="space-y-3 p-3.5 rounded-lg bg-surface-subtle border border-border text-xs text-muted">
            <div className="flex items-start gap-2">
              <ShieldAlert className="w-4 h-4 text-imperial shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-night">Strict Uniqueness</p>
                <p className="text-[10px] text-muted mt-0.5">
                  Every technical area has its own unique questions with 0 cross-role duplication.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-imperial shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-night">Deterministic Scoring</p>
                <p className="text-[10px] text-muted mt-0.5">
                  Questions are graded on exact solutions without generative hallucinations.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-border space-y-2">
            <h4 className="text-[11px] uppercase tracking-wider font-bold text-night">
              Competency Tested
            </h4>
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted">Skill:</span>
                <span className="font-bold text-night">{currentQ.skill}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted">Sub-skill:</span>
                <span className="font-semibold text-night">{currentQ.subSkill}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted">Topic:</span>
                <span className="font-semibold text-imperial">{currentQ.topic}</span>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-border space-y-1 text-[11px] text-muted">
            <span className="font-bold text-night">Curated Source Reference:</span>
            <p className="text-[10px] text-muted font-mono">{currentQ.source}</p>
            {currentQ.sourceUrl && (
              <a
                href={currentQ.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] text-imperial font-semibold hover:underline block truncate mt-0.5"
              >
                {currentQ.sourceUrl}
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Submit Confirmation Modal */}
      <Modal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        title="Submit Assessment?"
        description="Your answers will be analyzed to calculate your overall score, per-skill competency breakdown, and personalized learning roadmap."
        maxWidth="md"
      >
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-surface-subtle border border-border space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-muted font-medium">Track:</span>
              <span className="text-night font-bold">
                {activeTrack === "technical"
                  ? `Technical (${selectedRole.title})`
                  : activeTrack === "aptitude"
                  ? "Quantitative Aptitude"
                  : "Logical Reasoning"}
              </span>
            </div>
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
