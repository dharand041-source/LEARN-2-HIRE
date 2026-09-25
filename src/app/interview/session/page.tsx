"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Clock,
  ArrowRight,
  ArrowLeft,
  HelpCircle,
  Radio,
  Play,
  Pause,
  Trash2,
  AlertCircle,
  CheckCircle2,
  Globe,
} from "lucide-react";
import { useCareer } from "@/context/CareerContext";
import { MOCK_INTERVIEW_QUESTIONS } from "@/data/interviews";
import { SUPPORTED_LANGUAGES } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
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
    isSupported: isSpeechRecSupported,
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
    isSupported: isSpeechSynthSupported,
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

  // Switch to next or submit
  const handleNextOrSubmit = () => {
    stopListening();
    stopSpeaking();

    const updated = { ...sessionAnswers, [activeQuestion.id]: candidateResponse };
    setSessionAnswers(updated);

    if (currentQuestionIndex < questions.length - 1) {
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
      setCandidateResponse(updated[questions[nextIndex].id] || "");
      setShowKeyPoints(false);
    } else {
      // Complete Session - preserve existing evaluation scoring pipeline
      const newSession: InterviewSession = {
        id: `session-${Date.now()}`,
        roleId: selectedRole.id,
        type: "Technical Interview",
        durationMinutes: Math.ceil(elapsedSeconds / 60) || 1,
        conductedAt: new Date().toISOString().split("T")[0],
        overallScore: 82,
        scores: {
          technicalKnowledge: 84,
          problemSolving: 82,
          communication: 78,
          answerStructure: 76,
          projectExplanation: 85,
        },
        questionsAsked: questions.map((q) => ({
          question: q.question,
          candidateAnswer: updated[q.id] || q.sampleGoodAnswer,
          critique:
            "Well structured with clear distinction between call stack, microtask queue, and macrotasks. Strong articulation.",
          idealPoints: q.idealPoints,
        })),
        whatWentWell: [
          "Crisp breakdown of V8 microtask draining priorities.",
          "Clear explanation of database ACID locks and connection pooling.",
          "Confident tone with minimal filler words.",
        ],
        whatToImprove: [
          "State constraints explicitly before diving into database solutions.",
          "Use STAR framework more deliberately when narrating behavioral challenges.",
        ],
        recommendedPractice: [
          "Practice SQL window function problems.",
          "Review System Design caching invalidation patterns.",
        ],
      };

      submitInterviewSession(newSession);
      router.push("/interview/results");
    }
  };

  // Switch to previous question
  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      stopListening();
      stopSpeaking();

      const updated = { ...sessionAnswers, [activeQuestion.id]: candidateResponse };
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
    <div
      className="min-h-screen bg-white text-night flex flex-col font-sans"
      style={{ backgroundColor: "#FFFFFF" }}
    >
      {/* Session Top Bar */}
      <header className="h-16 border-b border-surface-border bg-white px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30 shadow-xs">
        <div className="flex items-center gap-3">
          <Link
            href="/interview"
            onClick={() => {
              stopListening();
              stopSpeaking();
            }}
            className="text-xs text-night-muted hover:text-night font-medium flex items-center gap-1.5 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Exit Interview</span>
          </Link>
          <div className="h-4 w-px bg-surface-border mx-1" />
          <div className="flex items-center gap-2">
            <Radio className="w-3.5 h-3.5 text-imperial animate-pulse" />
            <span className="text-xs font-bold text-night">
              Live Voice Technical Simulation
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          {/* Language Selector */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-surface-subtle border border-surface-border text-xs text-night">
            <Globe className="w-3.5 h-3.5 text-night-muted" />
            <select
              value={interviewLang}
              onChange={(e) => {
                stopListening();
                stopSpeaking();
                setInterviewLang(e.target.value);
              }}
              className="bg-transparent text-night text-xs font-medium focus:outline-none cursor-pointer"
              title="Interview Spoken Language"
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code} className="bg-white text-night">
                  {lang.name}
                </option>
              ))}
            </select>
          </div>

          {/* Session Timer */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-surface-subtle border border-surface-border text-night font-mono text-xs font-bold">
            <Clock className="w-3.5 h-3.5 text-imperial" />
            <span>{formatTimer(elapsedSeconds)}</span>
          </div>

          {/* Next / Submit */}
          <Button onClick={handleNextOrSubmit} size="sm" className="text-xs font-semibold">
            {currentQuestionIndex < questions.length - 1 ? "Next Question" : "Complete & Evaluate"}
          </Button>
        </div>
      </header>

      {/* Main Simulation Container */}
      <div className="flex-1 max-w-5xl w-full mx-auto p-4 sm:p-8 flex flex-col justify-between space-y-6 bg-white">
        {/* Error Notification Banners */}
        {micErrorMessage && (
          <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center justify-between gap-3 shadow-xs">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{micErrorMessage}</span>
            </div>
            <button
              onClick={clearMicError}
              className="text-red-600 hover:text-red-800 font-bold text-xs"
            >
              Dismiss
            </button>
          </div>
        )}

        {synthErrorMessage && (
          <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-800 flex items-center gap-2 shadow-xs">
            <AlertCircle className="w-4 h-4 shrink-0 text-amber-600" />
            <span>{synthErrorMessage}</span>
          </div>
        )}

        {/* Interviewer Persona & Audio Waveform Visualizer Card */}
        <div className="p-6 rounded-2xl bg-white border border-surface-border space-y-6 text-center shadow-card-subtle">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-surface-border pb-4 text-left">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-surface-subtle border border-surface-border flex items-center justify-center text-night font-bold text-base shadow-xs">
                AR
              </div>
              <div>
                <h3 className="text-sm font-bold text-night">Dr. Arvind Ramesh</h3>
                <p className="text-xs text-night-muted">Principal Engineer & Technical Evaluator</p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-night-muted">
              <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
              <Badge variant="imperial" size="sm">{activeQuestion.type}</Badge>
            </div>
          </div>

          {/* Question Text */}
          <div className="max-w-3xl mx-auto space-y-4">
            <p className="text-base sm:text-lg font-semibold text-night leading-relaxed">
              &ldquo;{activeQuestion.question}&rdquo;
            </p>

            {/* Audio Waveform Simulator */}
            <div className="flex items-center justify-center gap-1.5 h-12 py-2">
              {[40, 65, 25, 80, 50, 95, 30, 70, 45, 90, 60, 35, 85, 55, 75, 40, 60, 80, 30, 65].map((height, i) => (
                <div
                  key={i}
                  className={`w-1 rounded-full transition-all duration-300 ${
                    isRecording
                      ? "bg-imperial animate-pulse"
                      : isQuestionPlaying
                      ? "bg-indigo-600 animate-pulse"
                      : "bg-surface-border"
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
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-xs font-semibold transition-all shadow-xs ${
                  isQuestionPlaying
                    ? "bg-indigo-50 border-indigo-300 text-indigo-700"
                    : "bg-white hover:bg-surface-subtle border-surface-border text-night"
                }`}
                title="Listen to the question read aloud"
              >
                {isQuestionPlaying ? (
                  <>
                    <Pause className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Pause Question Audio</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-3.5 h-3.5 text-imperial" />
                    <span>Replay Question Audio</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Candidate Response Workspace Card */}
        <div className="p-6 rounded-2xl bg-white border border-surface-border space-y-4 shadow-card-subtle">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <span className="text-xs font-bold uppercase tracking-wider text-night">
                Your Spoken / Typed Response
              </span>

              {/* Status Indicator */}
              {isRecording ? (
                <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-imperial-50 border border-imperial-200 text-xs text-imperial font-semibold animate-pulse">
                  <span className="w-2 h-2 rounded-full bg-imperial" /> Listening...
                </span>
              ) : (
                <span className="text-xs text-night-muted font-medium">
                  {micStatusMessage}
                </span>
              )}
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setShowKeyPoints(!showKeyPoints)}
                className="text-xs text-imperial hover:underline flex items-center gap-1 font-semibold"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>{showKeyPoints ? "Hide Key Points" : "View Expected Key Points"}</span>
              </button>

              {candidateResponse && (
                <button
                  type="button"
                  onClick={handleClearAnswer}
                  className="text-xs text-night-muted hover:text-imperial flex items-center gap-1 font-medium transition-colors"
                  title="Clear typed and spoken answer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear</span>
                </button>
              )}
            </div>
          </div>

          {/* Key Points Hint Accordion */}
          {showKeyPoints && (
            <div className="p-4 rounded-xl bg-surface-subtle border border-surface-border space-y-2 text-xs text-night animate-slide-up">
              <p className="font-bold text-night">Ideal Answer Should Cover:</p>
              <ul className="space-y-1 pl-1 text-[11px] text-night-muted">
                {activeQuestion.idealPoints.map((pt, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-imperial font-bold">•</span>
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
              placeholder="Click 'Record Voice Answer' below to speak your response, or type your answer directly here..."
              className="w-full p-4 rounded-xl bg-white border border-surface-border text-sm text-night focus:outline-none focus:ring-2 focus:ring-imperial/20 focus:border-imperial resize-y leading-relaxed font-sans placeholder:text-muted-light shadow-inner"
            />

            {/* Interim Speech Preview (Real-time live transcript display while speaking) */}
            {interimTranscript && isRecording && (
              <div className="mt-2 p-3 rounded-lg bg-imperial-50/70 border border-imperial-200 text-xs text-night flex items-start gap-2.5 animate-fadeIn">
                <span className="w-2 h-2 rounded-full bg-imperial animate-ping mt-1 shrink-0" />
                <div className="leading-relaxed">
                  <span className="font-bold text-imperial mr-1.5">Live Speech:</span>
                  <span className="italic text-night">{interimTranscript}</span>
                </div>
              </div>
            )}
          </div>

          {/* Recording & Submission Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-surface-border">
            {/* Microphone Controls */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={toggleListening}
                className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs transition-all shadow-sm ${
                  isRecording
                    ? "bg-imperial text-white shadow-imperial-btn animate-pulse"
                    : "bg-white text-night hover:bg-surface-subtle border border-surface-border hover:border-imperial hover:text-imperial"
                }`}
                title={isRecording ? "Stop recording speech" : "Start speaking your answer"}
              >
                {isRecording ? (
                  <>
                    <MicOff className="w-4 h-4 text-white" />
                    <span>Stop Recording Voice</span>
                  </>
                ) : (
                  <>
                    <Mic className="w-4 h-4 text-imperial" />
                    <span>Record Voice Answer</span>
                  </>
                )}
              </button>

              <span className="text-[11px] text-night-muted font-medium">
                {isRecording
                  ? "Transcribing your actual words..."
                  : micStatusMessage === "No speech detected."
                  ? "No speech detected."
                  : "Speech recognition converts words to text"}
              </span>
            </div>

            {/* Navigation & Submit Buttons */}
            <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
              {currentQuestionIndex > 0 && (
                <Button
                  type="button"
                  variant="outline"
                  size="md"
                  onClick={handlePreviousQuestion}
                  className="gap-1.5 text-xs font-semibold"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Previous</span>
                </Button>
              )}

              <Button
                type="button"
                onClick={handleNextOrSubmit}
                size="md"
                className="gap-2 font-semibold text-xs shadow-imperial-btn"
              >
                <span>
                  {currentQuestionIndex < questions.length - 1
                    ? "Submit Answer & Next"
                    : "Finish Interview"}
                </span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
