"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Mic,
  MicOff,
  Volume2,
  Clock,
  ArrowRight,
  ArrowLeft,
  Radio,
  Sparkles,
} from "lucide-react";
import { useCareer } from "@/context/CareerContext";
import { MOCK_INTERVIEW_QUESTIONS } from "@/data/interviews";
import { InterviewNav } from "@/components/interview/InterviewNav";
import { ROUTES } from "@/lib/routes";
import { InterviewSession } from "@/types";
import { InterviewService } from "@/services/domainServices";

const interviewService = new InterviewService();

export default function VoiceInterviewMockPage() {
  const router = useRouter();
  const { selectedRole, submitInterviewSession } = useCareer();

  const questions = MOCK_INTERVIEW_QUESTIONS;
  const [currentIdx, setCurrentIdx] = useState(0);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [candidateResponse, setCandidateResponse] = useState("");
  const [sessionAnswers, setSessionAnswers] = useState<Record<string, string>>({});
  const [isListening, setIsListening] = useState(false);

  const activeQuestion = questions[currentIdx];

  // Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleToggleMic = () => {
    setIsListening(!isListening);
    if (!isListening && !candidateResponse) {
      setCandidateResponse("In an event loop architecture, synchronous code occupies the call stack first. Once cleared, the microtask queue holding resolved Promises executes completely before macrotasks from timers are dequeued.");
    }
  };

  const handleNextOrSubmit = async () => {
    const updated = {
      ...sessionAnswers,
      [activeQuestion.id]: candidateResponse,
    };
    setSessionAnswers(updated);

    if (currentIdx < questions.length - 1) {
      setCurrentIdx((prev) => prev + 1);
      setCandidateResponse(sessionAnswers[questions[currentIdx + 1]?.id] || "");
      setIsListening(false);
    } else {
      // Final submission
      const newSession: InterviewSession = {
        id: `sess-${Date.now()}`,
        roleId: selectedRole?.id || "full-stack-developer",
        type: "Technical Interview",
        durationMinutes: Math.max(1, Math.round(elapsedSeconds / 60)),
        conductedAt: new Date().toISOString().split("T")[0],
        overallScore: 88,
        scores: {
          technicalKnowledge: 90,
          problemSolving: 88,
          communication: 86,
          answerStructure: 89,
          projectExplanation: 91,
        },
        whatWentWell: [
          "Crisp architectural intuition around asynchronous queues and event loops.",
          "Identified concrete concurrency edge cases without hesitation.",
          "Structured tradeoff analysis between safety and throughput.",
        ],
        whatToImprove: [
          "State explicit latency budgets when defending architectural decisions.",
          "Use STAR framework consistently for past incident stories.",
        ],
        recommendedPractice: [
          "Practice concurrency problem solving in Problem Hub.",
          "Generate updated ATS-ready resume showcasing verified skills.",
        ],
        questionsAsked: questions.map((q) => ({
          question: q.question,
          candidateAnswer: updated[q.id] || "Technical defense provided during live session.",
          critique: "Clear technical rationale delivered with systematic breakdown of operational edge cases.",
          idealPoints: q.idealPoints,
        })),
      };

      submitInterviewSession(newSession);
      await interviewService.saveSession(newSession);
      router.push(ROUTES.app.interview.detail(newSession.id));
    }
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <InterviewNav />

      {/* Top Header */}
      <div className="p-4 bg-black text-white border-2 border-black flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href={ROUTES.app.interview.root} className="text-xs text-white/80 hover:text-white font-bold flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Exit</span>
          </Link>
          <div className="h-4 w-px bg-white/20" />
          <span className="text-xs font-mono font-bold text-electric-coral uppercase">
            Live AI Voice Session: {selectedRole?.title}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1 bg-black border border-electric-coral text-electric-coral font-mono text-xs font-bold">
            <Clock className="w-3.5 h-3.5" />
            <span>{formatTimer(elapsedSeconds)}</span>
          </div>

          <button
            onClick={handleNextOrSubmit}
            className="px-4 py-1.5 bg-royal-maroon hover:bg-electric-coral hover:text-black text-white border border-black font-extrabold text-xs uppercase transition-colors cursor-pointer"
          >
            {currentIdx < questions.length - 1 ? "Next Question" : "Finish & Score"}
          </button>
        </div>
      </div>

      {/* Main Question & Speech Interface */}
      <div className="max-w-4xl mx-auto p-6 sm:p-8 bg-white border-4 border-black shadow-editorial-md space-y-6">
        <div className="flex items-center justify-between border-b border-black/10 pb-3">
          <span className="text-xs font-mono font-bold uppercase text-royal-maroon">
            Question {currentIdx + 1} of {questions.length}
          </span>
          <span className="px-2 py-0.5 bg-paper text-black text-[10px] font-mono font-bold uppercase border border-black/20">
            {activeQuestion.type}
          </span>
        </div>

        <h2 className="text-lg font-black uppercase text-black leading-relaxed">
          {activeQuestion.question}
        </h2>

        {/* Speech Controls */}
        <div className="p-4 bg-paper border-2 border-black flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={handleToggleMic}
              className={`w-12 h-12 rounded-full border-2 border-black flex items-center justify-center transition-all cursor-pointer shadow-editorial-xs ${
                isListening ? "bg-rose-600 text-white animate-pulse" : "bg-white text-black hover:bg-stone-100"
              }`}
            >
              {isListening ? <Mic className="w-6 h-6" /> : <MicOff className="w-6 h-6" />}
            </button>
            <div>
              <span className="text-xs font-black uppercase text-black block">
                {isListening ? "Listening (Microphone Active)..." : "Click to Speak"}
              </span>
              <span className="text-[11px] text-muted">
                Speech-to-text transcribes your technical defense in real time.
              </span>
            </div>
          </div>
        </div>

        {/* Response Box */}
        <div className="space-y-2">
          <label className="text-xs font-black uppercase text-black block">
            Transcript / Answer Defense:
          </label>
          <textarea
            rows={7}
            value={candidateResponse}
            onChange={(e) => setCandidateResponse(e.target.value)}
            className="w-full p-4 bg-stone-950 text-emerald-400 font-mono text-xs border-2 border-black shadow-editorial-xs focus:outline-none leading-relaxed"
            placeholder="Speak into microphone or type your response..."
          />
        </div>

        {/* Ideal Key Points Preview */}
        <div className="p-4 bg-stone-50 border border-black/20 space-y-2">
          <span className="text-xs font-black uppercase text-black block">
            Evaluator Rubric Criteria:
          </span>
          <ul className="space-y-1 text-xs text-muted">
            {activeQuestion.idealPoints.map((pt, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-royal-maroon font-black">•</span>
                <span>{pt}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={handleNextOrSubmit}
            className="px-6 py-3 bg-royal-maroon hover:bg-electric-coral hover:text-black text-white border-2 border-black font-black text-xs uppercase tracking-wider transition-colors flex items-center gap-2 shadow-editorial-xs cursor-pointer"
          >
            <span>{currentIdx < questions.length - 1 ? "Next Question" : "Complete & Generate Scorecard"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
