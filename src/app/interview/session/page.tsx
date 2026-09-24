"use client";

import React, { useState, useEffect } from "react";
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
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  HelpCircle,
  Eye,
  Radio,
  FileText,
  Play,
  Pause,
} from "lucide-react";
import { useCareer } from "@/context/CareerContext";
import { MOCK_INTERVIEW_QUESTIONS } from "@/data/interviews";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { InterviewSession } from "@/types";

export default function VoiceInterviewSessionPage() {
  const router = useRouter();
  const { selectedRole, submitInterviewSession } = useCareer();

  const questions = MOCK_INTERVIEW_QUESTIONS;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [candidateResponse, setCandidateResponse] = useState("");
  const [showKeyPoints, setShowKeyPoints] = useState(false);
  const [sessionAnswers, setSessionAnswers] = useState<Record<string, string>>({});

  const activeQuestion = questions[currentQuestionIndex];

  // Session timer
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleToggleRecording = () => {
    if (!isRecording) {
      setIsRecording(true);
      // Simulate real-time speech transcription
      if (!candidateResponse) {
        setTimeout(() => {
          setCandidateResponse(
            "In Node.js and V8, synchronous code runs on the Call Stack immediately. When a Promise resolves, its then callback is placed in the Microtask Queue. Conversely, setTimeout callbacks go into the Macrotask Queue. The Event Loop drains all pending microtasks after every synchronous execution frame before touching any macrotask."
          );
        }, 1800);
      }
    } else {
      setIsRecording(false);
    }
  };

  const handleNextOrSubmit = () => {
    const updated = { ...sessionAnswers, [activeQuestion.id]: candidateResponse };
    setSessionAnswers(updated);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setCandidateResponse("");
      setIsRecording(false);
      setShowKeyPoints(false);
    } else {
      // Complete Session
      const newSession: InterviewSession = {
        id: `session-${Date.now()}`,
        roleId: selectedRole.id,
        type: "Technical Interview",
        durationMinutes: Math.ceil(elapsedSeconds / 60),
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
          critique: "Well structured with clear distinction between call stack, microtask queue, and macrotasks. Strong articulation.",
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

  return (
    <div className="min-h-screen bg-black text-pearl-primary flex flex-col">
      {/* Session Top Bar */}
      <header className="h-16 border-b border-surface-border bg-navy-950 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <Link href="/interview" className="text-xs text-pearl-muted hover:text-pearl-primary flex items-center gap-1.5">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Exit Interview</span>
          </Link>
          <div className="h-4 w-px bg-white/10 mx-1" />
          <div className="flex items-center gap-2">
            <Radio className="w-3.5 h-3.5 text-rose animate-pulse" />
            <span className="text-xs font-semibold text-pearl-primary">
              Live Voice Technical Simulation
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded bg-surface-card border border-champagne/30 text-champagne font-mono text-xs font-bold">
            <Clock className="w-3.5 h-3.5" />
            <span>{formatTimer(elapsedSeconds)}</span>
          </div>

          <Button onClick={handleNextOrSubmit} size="sm" className="text-xs font-semibold">
            {currentQuestionIndex < questions.length - 1 ? "Next Question" : "Complete & Evaluate"}
          </Button>
        </div>
      </header>

      {/* Main Simulation Container */}
      <div className="flex-1 max-w-5xl w-full mx-auto p-4 sm:p-8 flex flex-col justify-between space-y-6">
        {/* Interviewer Persona & Audio Waveform Visualizer */}
        <div className="p-6 rounded-2xl bg-surface-card border border-surface-border space-y-6 text-center shadow-card-subtle">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-surface-border pb-4 text-left">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-navy-800 border border-champagne/40 flex items-center justify-center text-champagne font-bold text-base">
                AR
              </div>
              <div>
                <h3 className="text-sm font-bold text-pearl-primary">Dr. Arvind Ramesh</h3>
                <p className="text-xs text-pearl-muted">Principal Engineer & Technical Evaluator</p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-pearl-muted">
              <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
              <Badge variant="champagne" size="sm">{activeQuestion.type}</Badge>
            </div>
          </div>

          {/* Question Text */}
          <div className="max-w-2xl mx-auto space-y-3">
            <p className="text-base sm:text-lg font-medium text-pearl-primary leading-relaxed">
              "{activeQuestion.question}"
            </p>

            {/* Audio Waveform Simulator */}
            <div className="flex items-center justify-center gap-1.5 h-12 py-2">
              {[40, 65, 25, 80, 50, 95, 30, 70, 45, 90, 60, 35, 85, 55, 75, 40, 60, 80, 30, 65].map((height, i) => (
                <div
                  key={i}
                  className={`w-1 rounded-full transition-all duration-300 ${
                    isRecording
                      ? "bg-rose animate-pulse"
                      : isPlayingAudio
                      ? "bg-champagne animate-pulse"
                      : "bg-navy-700"
                  }`}
                  style={{
                    height: isRecording || isPlayingAudio ? `${height}%` : "20%",
                  }}
                />
              ))}
            </div>

            <div className="flex items-center justify-center gap-3 pt-1">
              <button
                onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-navy-900 hover:bg-navy-800 border border-white/10 text-xs text-pearl-muted hover:text-pearl-primary transition-colors"
              >
                {isPlayingAudio ? <Pause className="w-3.5 h-3.5 text-champagne" /> : <Play className="w-3.5 h-3.5 text-champagne" />}
                <span>{isPlayingAudio ? "Pause Question Audio" : "Replay Question Audio"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Candidate Response Workspace */}
        <div className="p-6 rounded-2xl bg-surface-card border border-surface-border space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-pearl-primary">
                Your Spoken / Typed Response
              </span>
              {isRecording && (
                <span className="flex items-center gap-1.5 text-xs text-rose font-medium animate-pulse">
                  <span className="w-2 h-2 rounded-full bg-rose" /> Recording Active
                </span>
              )}
            </div>

            <button
              onClick={() => setShowKeyPoints(!showKeyPoints)}
              className="text-xs text-champagne hover:underline flex items-center gap-1"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>{showKeyPoints ? "Hide Key Points" : "View Expected Key Points"}</span>
            </button>
          </div>

          {/* Key Points Hint Accordion */}
          {showKeyPoints && (
            <div className="p-4 rounded-lg bg-navy-950 border border-champagne/20 space-y-1.5 text-xs text-champagne animate-slide-up">
              <p className="font-semibold">Ideal Answer Should Cover:</p>
              <ul className="space-y-1 pl-1 text-[11px] text-pearl-muted">
                {activeQuestion.idealPoints.map((pt, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-champagne font-bold">•</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Textarea for Candidate Answer */}
          <textarea
            value={candidateResponse}
            onChange={(e) => setCandidateResponse(e.target.value)}
            rows={5}
            placeholder="Click the microphone below to speak your answer, or type your technical response here..."
            className="w-full p-4 rounded-xl bg-black border border-white/10 text-xs text-pearl-primary focus:outline-none focus:border-champagne resize-y leading-relaxed font-sans"
          />

          {/* Recording & Submission Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <div className="flex items-center gap-3">
              <button
                onClick={handleToggleRecording}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs transition-all shadow-md ${
                  isRecording
                    ? "bg-rose text-black animate-pulse shadow-rose/20"
                    : "bg-navy-800 text-pearl-primary hover:bg-navy-700 border border-white/10"
                }`}
              >
                {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4 text-champagne" />}
                <span>{isRecording ? "Stop Recording Voice" : "Record Voice Answer"}</span>
              </button>

              <span className="text-[11px] text-pearl-muted">
                {isRecording ? "Listening & transcribing..." : "Speech-to-text auto-populates"}
              </span>
            </div>

            <Button
              onClick={handleNextOrSubmit}
              size="md"
              className="w-full sm:w-auto gap-2 font-semibold"
            >
              <span>{currentQuestionIndex < questions.length - 1 ? "Submit Answer & Next" : "Finish Interview"}</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
