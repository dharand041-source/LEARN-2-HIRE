"use client";

import { useState, useEffect, useRef, useCallback } from "react";

// Web Speech API Types
interface SpeechRecognitionResultItem {
  readonly transcript: string;
  readonly confidence: number;
}

interface SpeechRecognitionResult {
  readonly isFinal: boolean;
  readonly length: number;
  [index: number]: SpeechRecognitionResultItem;
}

interface SpeechRecognitionResultList {
  readonly length: number;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionEvent extends Event {
  readonly resultIndex: number;
  readonly results: SpeechRecognitionResultList;
}

interface SpeechRecognitionErrorEvent extends Event {
  readonly error: string;
  readonly message?: string;
}

interface SpeechRecognitionInstance extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  maxAlternatives: number;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
  onstart: (() => void) | null;
}

type SpeechRecognitionConstructor = new () => SpeechRecognitionInstance;

interface IWindowWithSpeech extends Window {
  SpeechRecognition?: SpeechRecognitionConstructor;
  webkitSpeechRecognition?: SpeechRecognitionConstructor;
}

export type MicState = "idle" | "listening" | "stopped";

interface UseSpeechRecognitionOptions {
  lang?: string;
  onFinalTranscript?: (transcript: string) => void;
}

export function useSpeechRecognition({
  lang = "en-US",
  onFinalTranscript,
}: UseSpeechRecognitionOptions = {}) {
  const [isSupported, setIsSupported] = useState(true);
  const [micState, setMicState] = useState<MicState>("idle");
  const [statusMessage, setStatusMessage] = useState<string>("Idle");
  const [interimTranscript, setInterimTranscript] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);
  const shouldListenRef = useRef(false);
  const onFinalTranscriptRef = useRef(onFinalTranscript);
  onFinalTranscriptRef.current = onFinalTranscript;
  const langRef = useRef(lang);
  langRef.current = lang;

  // Check support on mount
  useEffect(() => {
    if (typeof window === "undefined") return;

    const win = window as unknown as IWindowWithSpeech;
    const SpeechRec = win.SpeechRecognition || win.webkitSpeechRecognition;

    if (!SpeechRec) {
      setIsSupported(false);
      setStatusMessage("Speech recognition not supported");
      setErrorMessage(
        "Speech recognition is not supported in this browser. Please use Google Chrome or Microsoft Edge."
      );
    }
  }, []);

  const stopListening = useCallback(() => {
    shouldListenRef.current = false;
    setMicState("stopped");
    setStatusMessage("Stopped");
    setInterimTranscript("");

    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        // Ignore stop errors if already stopped
      }
    }
  }, []);

  const startListening = useCallback(() => {
    if (typeof window === "undefined") return;

    const win = window as unknown as IWindowWithSpeech;
    const SpeechRec = win.SpeechRecognition || win.webkitSpeechRecognition;

    if (!SpeechRec) {
      setIsSupported(false);
      setErrorMessage(
        "Speech recognition is not supported in this browser. Please use Google Chrome or Microsoft Edge."
      );
      return;
    }

    setErrorMessage(null);
    shouldListenRef.current = true;
    setInterimTranscript("");

    // If an instance exists, clean it up before creating or restarting
    if (recognitionRef.current) {
      try {
        recognitionRef.current.abort();
      } catch {
        // Ignore abort errors
      }
      recognitionRef.current = null;
    }

    try {
      const recognition = new SpeechRec();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.maxAlternatives = 1;
      recognition.lang = langRef.current || "en-US";

      recognition.onstart = () => {
        setMicState("listening");
        setStatusMessage("Listening...");
        setErrorMessage(null);
      };

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        let currentInterim = "";

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const result = event.results[i];
          const transcriptChunk = result[0]?.transcript || "";

          if (result.isFinal) {
            const finalChunk = transcriptChunk.trim();
            if (finalChunk && onFinalTranscriptRef.current) {
              onFinalTranscriptRef.current(finalChunk);
            }
          } else {
            currentInterim += transcriptChunk;
          }
        }

        setInterimTranscript(currentInterim);
        if (currentInterim.trim()) {
          setStatusMessage("Listening...");
        }
      };

      recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        const error = event.error;

        if (error === "no-speech") {
          // If no speech detected, do not insert text or call AI
          setStatusMessage("No speech detected.");
          return;
        }

        if (error === "not-allowed" || error === "permission-denied") {
          shouldListenRef.current = false;
          setMicState("stopped");
          setStatusMessage("Permission denied");
          setErrorMessage(
            "Microphone permission is required for voice interview. Please allow microphone access in your browser settings."
          );
          return;
        }

        if (error === "audio-capture") {
          shouldListenRef.current = false;
          setMicState("stopped");
          setStatusMessage("No microphone");
          setErrorMessage("No microphone was found. Please ensure a microphone is connected.");
          return;
        }

        if (error === "network") {
          shouldListenRef.current = false;
          setMicState("stopped");
          setStatusMessage("Network error");
          setErrorMessage("Network error occurred during speech recognition. Please check your connection.");
          return;
        }

        if (error === "aborted") {
          // User or programmatic abort
          return;
        }

        setStatusMessage(`Error: ${error}`);
      };

      recognition.onend = () => {
        // If user still intends to listen (e.g. Chrome 10-15s silence auto-cutoff)
        if (shouldListenRef.current) {
          try {
            recognition.start();
          } catch {
            // If restart fails, update state cleanly
            setMicState("stopped");
            setStatusMessage("Stopped");
          }
        } else {
          setMicState("stopped");
          setStatusMessage("Stopped");
          setInterimTranscript("");
        }
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err: unknown) {
      shouldListenRef.current = false;
      setMicState("stopped");
      setStatusMessage("Error starting microphone");
      const errObj = err as Error;
      if (errObj?.name === "NotAllowedError") {
        setErrorMessage(
          "Microphone permission is required for voice interview. Please allow microphone access in your browser settings."
        );
      } else {
        setErrorMessage(errObj?.message || "Failed to start speech recognition.");
      }
    }
  }, []);

  const toggleListening = useCallback(() => {
    if (micState === "listening") {
      stopListening();
    } else {
      startListening();
    }
  }, [micState, startListening, stopListening]);

  // Clean up on unmount or language change
  useEffect(() => {
    return () => {
      shouldListenRef.current = false;
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch {
          // Ignore
        }
        recognitionRef.current = null;
      }
    };
  }, []);

  return {
    isSupported,
    micState,
    statusMessage,
    interimTranscript,
    errorMessage,
    startListening,
    stopListening,
    toggleListening,
    clearError: () => setErrorMessage(null),
  };
}
