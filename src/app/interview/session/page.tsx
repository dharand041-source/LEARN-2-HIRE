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
  HelpCircle,
  Radio,
  Pause,
  Trash2,
  AlertCircle,
  Globe,
} from "lucide-react";
import { useCareer } from "@/context/CareerContext";
import { MOCK_INTERVIEW_QUESTIONS } from "@/data/interviews";
import { SUPPORTED_LANGUAGES } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { InterviewSession } from "@/types";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";
import { useSpeechSynthesis } from "@/hooks/useSpeechSynthesis";

const BCP47_LANG_MAP: Record<string, string> = {
  en: "en-US",
  ta: "ta-IN",
  hi: "hi-IN",
  te: "te-IN",
  ml: "ml-IN",
  kn: "kn-IN",
};

export default function VoiceInterviewSessionPage() {
  const router = useRouter();
  const { selectedRole, submitInterviewSession, userProfile } = useCareer();

  const questions = MOCK_INTERVIEW_QUESTIONS;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [candidateResponse, setCandidateResponse] = useState("");
  const [showKeyPoints, setShowKeyPoints] = useState(false);
  const [sessionAnswers, setSessionAnswers] = useState<Record<string, string>>({});
  const [interviewLang, setInterviewLang] = useState<string>(userProfile.selectedLanguage || "en");

  const activeQuestion = questions[currentQuestionIndex];
  const bcp47Lang = BCP47_LANG_MAP[interviewLang] || "en-US";

  // Speech Recognition Hook
  const handleFinalTranscript = useCallback((finalChunk: string) => {
    if (!finalChunk || !finalChunk.trim()) return;

    setCandidateResponse((prev) => {
      const trimmed = prev.trim();
      return trimmed ? `${trimmed} ${finalChunk.trim()}` : finalChunk.trim();
    });
  }, []);

  const {
    micState,
    statusMessage: micStatusMessage,
    interimTranscript,
    errorMessage: micErrorMessage,
    stopListening,
    toggleListening,
    clearError: clearMicError,
  } = useSpeechRecognition({
    lang: bcp47Lang,
    onFinalTranscript: handleFinalTranscript,
  });

  // Speech Synthesis Hook (Question Replay)
  const {
    isPlaying: isQuestionPlaying,
    errorMessage: synthErrorMessage,
    stop: stopSpeaking,
    toggle: toggleQuestionSpeech,
  } = useSpeechSynthesis({
    lang: bcp47Lang,
  });

  // Session timer
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Format timer mm:ss
  const formatTimer = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Next / Submit Question Handler
  const handleNextOrSubmit = () => {
    stopListening();
    stopSpeaking();

    const updated = {
      ...sessionAnswers,
      [activeQuestion.id]: candidateResponse,
    };
    setSessionAnswers(updated);

    if (currentQuestionIndex < questions.length - 1) {
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
      setCandidateResponse(updated[questions[nextIndex].id] || "");
      setShowKeyPoints(false);
    } else {
      // Evaluate session
      const filledCount = Object.values(updated).filter((a) => a && a.trim().length > 10).length;
      const baseScore = Math.min(94, 60 + filledCount * 8 + Math.floor(Math.random() * 6));

      const newSession: InterviewSession = {
        id: `sess-${Date.now()}`,
        roleId: selectedRole.id,
        type: "Technical Interview",
        durationMinutes: Math.max(1, Math.round(elapsedSeconds / 60)),
        conductedAt: "Just now",
        overallScore: baseScore,
        scores: {
          technicalKnowledge: Math.min(96, baseScore + 2),
          problemSolving: Math.min(95, baseScore - 1),
          communication: Math.min(92, baseScore - 4),
          answerStructure: Math.min(90, baseScore - 2),
          projectExplanation: Math.min(94, baseScore + 1),
        },
        whatWentWell: [
          "Demonstrated crisp architectural intuition around distributed state.",
          "Identified concrete concurrency edge cases and boundary conditions.",
          "Clear, structured rationale when evaluating performance tradeoffs.",
        ],
        whatToImprove: [
          "Include concrete SLA/SLO latency numbers when defending architectural decisions.",
          "Use STAR method more rigorously for contextual project explanations.",
        ],
        recommendedPractice: [
          "Practice concurrency and distributed locking algorithms in Problem Solving Hub.",
          "Rehearse STAR responses for architectural failure post-mortems.",
        ],
        questionsAsked: questions.map((q) => ({
          question: q.question,
          candidateAnswer: updated[q.id] || "Oral technical defense provided in live session.",
          critique: "Clear technical rationale delivered with systematic breakdown of operational edge cases.",
          idealPoints: q.idealPoints,
        })),
      };

      submitInterviewSession(newSession);
      router.push("/interview/results");
    }
  };

  // Previous Question
  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      stopListening();
      stopSpeaking();

      const updated = {
        ...sessionAnswers,
        [activeQuestion.id]: candidateResponse,
      };
      setSessionAnswers(updated);

      const prevIndex = currentQuestionIndex - 1;
      setCurrentQuestionIndex(prevIndex);
      setCandidateResponse(updated[questions[prevIndex].id] || "");
      setShowKeyPoints(false);
    }
  };

  // Clear answer
  const handleClearAnswer = () => {
    stopListening();
    setCandidateResponse("");
    setSessionAnswers((prev) => ({ ...prev, [activeQuestion.id]: "" }));
  };

  const isRecording = micState === "listening";

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
      {/* Session Top Bar */}
      <header className="h-16 border-b-2 border-border bg-white px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30 shadow-editorial-sm">
        <div className="flex items-center gap-4">
          <Link
            href="/interview"
            onClick={() => {
              stopListening();
              stopSpeaking();
            }}
            className="text-xs text-muted-foreground hover:text-foreground font-bold flex items-center gap-1.5 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>EXIT SIMULATION</span>
          </Link>
          <div className="h-5 w-[2px] bg-border" />
          <div className="flex items-center gap-2">
            <Radio className="w-3.5 h-3.5 text-editorial-violet animate-pulse" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-foreground">
              Voice Technical Simulation
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          {/* Language Selector */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-surface border-2 border-border text-xs font-mono">
            <Globe className="w-3.5 h-3.5 text-muted-foreground" />
            <select
              value={interviewLang}
              onChange={(e) => {
                stopListening();
                stopSpeaking();
                setInterviewLang(e.target.value);
              }}
              className="bg-transparent text-foreground text-xs font-bold focus:outline-none cursor-pointer"
              title="Interview Spoken Language"
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code} className="bg-white text-foreground">
                  {lang.name}
                </option>
              ))}
            </select>
          </div>

          {/* Session Timer */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-sm bg-surface border-2 border-border text-foreground font-mono text-xs font-extrabold">
            <Clock className="w-3.5 h-3.5 text-editorial-violet" />
            <span>{formatTimer(elapsedSeconds)}</span>
          </div>

          {/* Next / Submit */}
          <Button
            onClick={handleNextOrSubmit}
            variant="violet"
            size="sm"
            className="text-xs font-bold shadow-editorial-sm"
          >
            {currentQuestionIndex < questions.length - 1 ? "Next Question" : "Complete & Evaluate"}
          </Button>
        </div>
      </header>

      {/* Main Simulation Container */}
      <div className="flex-1 max-w-5xl w-full mx-auto p-4 sm:p-8 flex flex-col justify-between space-y-6">
        {/* Error Notification Banners */}
        {micErrorMessage && (
          <div className="p-3.5 rounded-lg bg-editorial-red/10 border-2 border-editorial-red text-xs text-foreground flex items-center justify-between gap-3 font-medium">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-editorial-red" />
              <span>{micErrorMessage}</span>
            </div>
            <button
              onClick={clearMicError}
              className="text-editorial-red hover:underline font-bold text-xs uppercase font-mono"
            >
              Dismiss
            </button>
          </div>
        )}

        {synthErrorMessage && (
          <div className="p-3.5 rounded-lg bg-editorial-gold/15 border-2 border-editorial-gold text-xs text-foreground flex items-center gap-2 font-medium">
            <AlertCircle className="w-4 h-4 shrink-0 text-foreground" />
            <span>{synthErrorMessage}</span>
          </div>
        )}

        {/* Interviewer Persona & Audio Waveform Visualizer Card */}
        <Card variant="editorial" className="p-6 md:p-8 space-y-6 text-center">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b-2 border-border pb-4 text-left">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-lg bg-foreground text-background flex items-center justify-center font-bold text-sm font-mono shadow-editorial-sm">
                AR
              </div>
              <div>
                <h3 className="text-sm font-bold text-foreground">Dr. Arvind Ramesh</h3>
                <p className="text-xs text-muted-foreground font-mono">Principal Systems Architect & Evaluator</p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono font-bold text-muted-foreground">
              <span>QUESTION {currentQuestionIndex + 1} OF {questions.length}</span>
              <Badge variant="violet" size="sm">{activeQuestion.type}</Badge>
            </div>
          </div>

          {/* Question Text */}
          <div className="max-w-3xl mx-auto space-y-5">
            <p className="text-lg sm:text-xl font-bold text-foreground leading-relaxed">
              &ldquo;{activeQuestion.question}&rdquo;
            </p>

            {/* Audio Waveform Simulator */}
            <div className="flex items-center justify-center gap-1.5 h-12 py-2">
              {[40, 65, 25, 80, 50, 95, 30, 70, 45, 90, 60, 35, 85, 55, 75, 40, 60, 80, 30, 65].map((height, i) => (
                <div
                  key={i}
                  className={`w-1 rounded-none transition-all duration-200 ${
                    isRecording
                      ? "bg-editorial-violet animate-pulse"
                      : isQuestionPlaying
                      ? "bg-editorial-navy animate-pulse"
                      : "bg-border"
                  }`}
                  style={{
                    height: isRecording || isQuestionPlaying ? `${height}%` : "20%",
                  }}
                />
              ))}
            </div>

            {/* Replay Question Button */}
            <div className="flex items-center justify-center gap-3 pt-1">
              <button
                type="button"
                onClick={() => toggleQuestionSpeech(activeQuestion.question)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 text-xs font-bold transition-all shadow-editorial-sm ${
                  isQuestionPlaying
                    ? "bg-editorial-violet text-white border-editorial-violet"
                    : "bg-white hover:bg-surface border-border text-foreground"
                }`}
                title="Listen to the question read aloud"
              >
                {isQuestionPlaying ? (
                  <>
                    <Pause className="w-3.5 h-3.5 text-white" />
                    <span>Pause Question Audio</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-3.5 h-3.5 text-editorial-violet" />
                    <span>Replay Question Audio</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </Card>

        {/* Candidate Response Workspace Card */}
        <Card variant="editorial" className="p-6 md:p-8 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <span className="text-xs font-bold uppercase font-mono tracking-wider text-foreground">
                Your Spoken / Typed Response
              </span>

              {/* Status Indicator */}
              {isRecording ? (
                <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-sm bg-editorial-violet text-white text-xs font-bold animate-pulse">
                  <span className="w-2 h-2 rounded-full bg-white" /> Recording Live...
                </span>
              ) : (
                <span className="text-xs text-muted-foreground font-mono font-medium">
                  {micStatusMessage}
                </span>
              )}
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setShowKeyPoints(!showKeyPoints)}
                className="text-xs text-editorial-violet hover:underline flex items-center gap-1 font-bold"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>{showKeyPoints ? "Hide Key Points" : "View Expected Key Points"}</span>
              </button>

              {candidateResponse && (
                <button
                  type="button"
                  onClick={handleClearAnswer}
                  className="text-xs text-muted-foreground hover:text-editorial-red flex items-center gap-1 font-bold transition-colors font-mono"
                  title="Clear typed and spoken answer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>CLEAR</span>
                </button>
              )}
            </div>
          </div>

          {/* Key Points Hint Accordion */}
          {showKeyPoints && (
            <div className="p-4 rounded-lg bg-surface border-2 border-border space-y-2 text-xs text-foreground animate-slide-up">
              <p className="font-bold uppercase font-mono text-muted-foreground">Rubric Criteria:</p>
              <ul className="space-y-1 pl-1 text-[11px] text-foreground font-medium">
                {activeQuestion.idealPoints.map((pt, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-editorial-violet font-bold font-mono">▶</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Textarea for Candidate Answer */}
          <div className="relative">
            <textarea
              value={candidateResponse}
              onChange={(e) => setCandidateResponse(e.target.value)}
              rows={6}
              placeholder="Click 'Record Voice Answer' below to speak your response, or type your technical answer directly here..."
              className="w-full p-4 rounded-lg bg-white border-2 border-border text-sm text-foreground focus:outline-none focus:border-editorial-violet resize-y leading-relaxed font-sans placeholder:text-muted-foreground shadow-inner"
            />

            {/* Interim Speech Preview */}
            {interimTranscript && isRecording && (
              <div className="mt-2 p-3 rounded-lg bg-surface border-2 border-editorial-violet text-xs text-foreground flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-editorial-violet animate-ping mt-1 shrink-0" />
                <div className="leading-relaxed">
                  <span className="font-bold text-editorial-violet mr-1.5 uppercase font-mono">Live Stream:</span>
                  <span className="italic font-medium">{interimTranscript}</span>
                </div>
              </div>
            )}
          </div>

          {/* Recording & Submission Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-3 border-t-2 border-border">
            {/* Microphone Controls */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={toggleListening}
                className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg font-bold text-xs transition-all shadow-editorial-sm ${
                  isRecording
                    ? "bg-editorial-violet text-white animate-pulse"
                    : "bg-white text-foreground hover:bg-surface border-2 border-border hover:border-editorial-violet"
                }`}
                title={isRecording ? "Stop recording speech" : "Start speaking your answer"}
              >
                {isRecording ? (
                  <>
                    <MicOff className="w-4 h-4 text-white" />
                    <span>STOP RECORDING VOICE</span>
                  </>
                ) : (
                  <>
                    <Mic className="w-4 h-4 text-editorial-violet" />
                    <span>RECORD VOICE ANSWER</span>
                  </>
                )}
              </button>

              <span className="text-[11px] text-muted-foreground font-mono font-medium">
                {isRecording
                  ? "Transcribing your voice in real time..."
                  : micStatusMessage === "No speech detected."
                  ? "No speech detected."
                  : "Speech recognition converts spoken answer to text"}
              </span>
            </div>

            {/* Navigation & Submit Buttons */}
            <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
              {currentQuestionIndex > 0 && (
                <Button
                  type="button"
                  variant="secondary"
                  size="md"
                  onClick={handlePreviousQuestion}
                  className="gap-1.5 text-xs font-bold"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Previous</span>
                </Button>
              )}

              <Button
                type="button"
                variant="violet"
                onClick={handleNextOrSubmit}
                size="md"
                className="gap-2 font-bold text-xs shadow-editorial-sm"
              >
                <span>
                  {currentQuestionIndex < questions.length - 1
                    ? "Submit & Next"
                    : "Finish Interview"}
                </span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
