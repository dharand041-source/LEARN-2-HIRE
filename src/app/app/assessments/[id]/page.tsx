"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import {
  Clock,
  ArrowRight,
  ArrowLeft,
  Eye,
  Check,
  Flag,
  Target,
  AlertTriangle,
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

export default function AssessmentDetailPage() {
  const router = useRouter();
  const params = useParams();
  const assessmentId = (params?.id as string) || "baseline";
  const { selectedRole, assessmentAnswers, setAssessmentAnswer, submitAssessment } = useCareer();

  const [questions, setQuestions] = useState<TechnicalQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flaggedIndices, setFlaggedIndices] = useState<Set<number>>(new Set());
  const [secondsRemaining, setSecondsRemaining] = useState(1200);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (assessmentId === "aptitude") {
      const aptQuestions: TechnicalQuestion[] = APTITUDE_QUESTION_BANK.map((aq) => ({
        id: aq.id,
        roleId: "aptitude",
        role: "Quantitative Aptitude",
        skill: aq.category,
        subSkill: "Arithmetic & Logic",
        topic: aq.category,
        difficulty: aq.difficulty,
        type: "mcq" as const,
        question: aq.question,
        options: aq.options,
        correctAnswer: aq.correctAnswer,
        explanation: aq.explanation,
        source: aq.source || "Quantitative Aptitude Standard Curriculum",
        sourceUrl: aq.sourceUrl || "https://openstax.org",
        sourceType: aq.sourceType || "educational_reference",
        version: aq.version || "1.0",
      }));
      setQuestions(aptQuestions);
    } else if (assessmentId === "logical") {
      const logQuestions: TechnicalQuestion[] = LOGICAL_QUESTION_BANK.map((lq) => ({
        id: lq.id,
        roleId: "logical",
        role: "Logical Reasoning",
        skill: lq.category,
        subSkill: "Analytical Deduction",
        topic: lq.category,
        difficulty: lq.difficulty,
        type: "mcq" as const,
        question: lq.question,
        options: lq.options,
        correctAnswer: lq.correctAnswer,
        explanation: lq.explanation,
        source: lq.source || "Logical Reasoning Deductive Framework",
        sourceUrl: lq.sourceUrl || "https://openstax.org",
        sourceType: lq.sourceType || "educational_reference",
        version: lq.version || "1.0",
      }));
      setQuestions(logQuestions);
    } else {
      const roleId = selectedRole?.id || "full-stack-developer";
      const loaded = getQuestionsForRole(roleId, {
        shuffle: true,
      }).slice(0, 10);
      setQuestions(loaded);
    }
    setCurrentIndex(0);
  }, [assessmentId, selectedRole]);

  useEffect(() => {
    if (secondsRemaining <= 0) {
      handleConfirmSubmit();
      return;
    }
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [secondsRemaining]);

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

  const handleConfirmSubmit = async () => {
    setIsSubmitting(true);
    try {
      submitAssessment(assessmentAnswers, questions);
      router.push(ROUTES.app.assessments.results(assessmentId));
    } catch {
      router.push(ROUTES.app.assessments.results(assessmentId));
    }
  };

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const answeredCount = questions.filter((q) => assessmentAnswers[q.id] !== undefined).length;

  if (!currentQ) {
    return (
      <div className="min-h-screen bg-paper flex flex-col items-center justify-center p-6 text-foreground">
        <div className="w-8 h-8 border-4 border-royal-maroon border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-sm font-bold uppercase tracking-wider text-black">
          Loading diagnostic module...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-paper text-foreground flex flex-col">
      <header className="h-16 border-b-2 border-black bg-black text-white px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <Link href={ROUTES.app.assessments.root} className="text-xs text-white/80 hover:text-white font-bold flex items-center gap-1.5 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Assessments</span>
          </Link>
          <div className="h-4 w-px bg-white/20 mx-1 hidden sm:block" />
          <div className="flex items-center gap-2">
            <h1 className="text-xs sm:text-sm font-extrabold text-white uppercase tracking-tight">
              Assessment: {assessmentId.toUpperCase()}
            </h1>
            <Badge variant="coral" size="sm">Active Session</Badge>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <div className="flex items-center gap-1.5 px-2 sm:px-3 py-1 bg-black border-2 border-electric-coral text-electric-coral font-mono text-xs font-extrabold shadow-editorial-sm">
            <Clock className="w-3.5 h-3.5 text-electric-coral" />
            <span>{formatTimer(secondsRemaining)}</span>
          </div>

          <button
            onClick={() => setIsSubmitModalOpen(true)}
            className="px-3 sm:px-4 py-1.5 bg-royal-maroon hover:bg-electric-coral hover:text-black text-white border-2 border-black font-extrabold text-xs transition-colors cursor-pointer shadow-editorial-xs"
          >
            Submit
          </button>
        </div>
      </header>

      <div className="border-b-2 border-black bg-white px-4 sm:px-8 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between text-xs font-bold uppercase tracking-wider">
          <span className="text-muted">
            Question {currentIndex + 1} of {questions.length}
          </span>
          <span className="text-royal-maroon font-black">
            {answeredCount} Answered ({Math.round((answeredCount / questions.length) * 100)}%)
          </span>
        </div>
      </div>

      <main className="flex-1 max-w-6xl w-full mx-auto p-4 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-6">
          <div className="p-6 sm:p-8 bg-white border-2 border-black shadow-editorial-md space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 bg-black text-white text-[11px] font-mono font-bold">
                  Q{currentIndex + 1}
                </span>
                <span className="px-2.5 py-1 bg-royal-maroon/10 text-royal-maroon border border-royal-maroon text-[11px] font-bold uppercase">
                  {currentQ.skill}
                </span>
                <span className="px-2.5 py-1 bg-surface-subtle text-muted text-[11px] font-bold uppercase">
                  {currentQ.difficulty}
                </span>
              </div>
              <button
                onClick={() => toggleFlag(currentIndex)}
                className={`text-xs font-bold flex items-center gap-1.5 px-3 py-1 border transition-colors ${
                  flaggedIndices.has(currentIndex)
                    ? "bg-amber-100 border-amber-500 text-amber-900"
                    : "bg-white border-black/20 text-muted hover:border-black"
                }`}
              >
                <Flag className="w-3.5 h-3.5" />
                <span>{flaggedIndices.has(currentIndex) ? "Flagged" : "Flag"}</span>
              </button>
            </div>

            <h2 className="text-base sm:text-lg font-bold text-black leading-relaxed">
              {currentQ.question}
            </h2>

            {currentQ.codeSnippet && (
              <pre className="p-4 bg-black text-electric-coral font-mono text-xs overflow-x-auto border-2 border-black">
                <code>{currentQ.codeSnippet}</code>
              </pre>
            )}

            <div className="space-y-3 pt-2">
              {currentQ.options?.map((opt, idx) => {
                const isSelected = assessmentAnswers[currentQ.id] === opt.label || assessmentAnswers[currentQ.id] === idx.toString();
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(opt.label)}
                    className={`w-full text-left p-4 border-2 transition-all flex items-start gap-4 cursor-pointer ${
                      isSelected
                        ? "bg-electric-coral/10 border-black shadow-editorial-xs ring-2 ring-black"
                        : "bg-white border-black/30 hover:border-black hover:bg-stone-50"
                    }`}
                  >
                    <span
                      className={`w-6 h-6 shrink-0 rounded flex items-center justify-center font-mono font-bold text-xs border ${
                        isSelected
                          ? "bg-royal-maroon text-white border-black"
                          : "bg-surface-subtle text-muted border-black/20"
                      }`}
                    >
                      {opt.label}
                    </span>
                    <span className="text-sm font-semibold text-black leading-relaxed pt-0.5">
                      {opt.text}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
              disabled={currentIndex === 0}
              className="px-5 py-2.5 bg-white border-2 border-black font-extrabold text-xs uppercase tracking-wider disabled:opacity-30 disabled:cursor-not-allowed hover:bg-stone-100 transition-colors shadow-editorial-xs"
            >
              Previous
            </button>

            {currentIndex < questions.length - 1 ? (
              <button
                onClick={() => setCurrentIndex((prev) => prev + 1)}
                className="px-6 py-2.5 bg-royal-maroon text-white border-2 border-black font-extrabold text-xs uppercase tracking-wider hover:bg-electric-coral hover:text-black transition-colors shadow-editorial-xs flex items-center gap-2"
              >
                <span>Next</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => setIsSubmitModalOpen(true)}
                className="px-6 py-2.5 bg-electric-coral text-black border-2 border-black font-black text-xs uppercase tracking-wider hover:bg-black hover:text-white transition-colors shadow-editorial-xs flex items-center gap-2"
              >
                <span>Submit</span>
                <Check className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 bg-white border-2 border-black shadow-editorial-sm space-y-4">
            <h3 className="text-xs font-black uppercase tracking-wider text-black">
              Questions
            </h3>
            <div className="grid grid-cols-5 gap-2">
              {questions.map((q, idx) => {
                const isCurrent = idx === currentIndex;
                const isAnswered = assessmentAnswers[q.id] !== undefined;
                const isFlagged = flaggedIndices.has(idx);

                let bgClass = "bg-white text-black border-black/30";
                if (isAnswered) bgClass = "bg-royal-maroon text-white border-black font-bold";
                if (isFlagged) bgClass = "bg-amber-400 text-black border-black font-bold";
                if (isCurrent) bgClass += " ring-2 ring-black ring-offset-2";

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
          </div>
        </div>
      </main>

      {isSubmitModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white border-4 border-black shadow-editorial-lg max-w-md w-full p-6 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-royal-maroon text-white flex items-center justify-center border-2 border-black">
                <Target className="w-5 h-5 text-electric-coral" />
              </div>
              <div>
                <h3 className="text-base font-black uppercase tracking-tight text-black">
                  Submit Assessment?
                </h3>
                <p className="text-xs text-muted">
                  Answered: {answeredCount} / {questions.length}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setIsSubmitModalOpen(false)}
                className="px-4 py-2 bg-white border-2 border-black font-extrabold text-xs uppercase tracking-wider"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmSubmit}
                disabled={isSubmitting}
                className="px-5 py-2 bg-royal-maroon text-white border-2 border-black font-black text-xs uppercase tracking-wider hover:bg-electric-coral hover:text-black"
              >
                {isSubmitting ? "Submitting..." : "Confirm & Submit"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
