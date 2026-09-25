"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface UseSpeechSynthesisOptions {
  lang?: string;
}

export function useSpeechSynthesis({ lang = "en-US" }: UseSpeechSynthesisOptions = {}) {
  const [isSupported, setIsSupported] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const langRef = useRef(lang);
  langRef.current = lang;

  // Initialize and load voices
  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      setIsSupported(false);
      setErrorMessage("Text-to-speech is not supported in this browser.");
      return;
    }

    const updateVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      if (availableVoices.length > 0) {
        setVoices(availableVoices);
      }
    };

    updateVoices();
    window.speechSynthesis.onvoiceschanged = updateVoices;

    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  const stop = useCallback(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    }
  }, []);

  const speak = useCallback(
    (text: string) => {
      if (typeof window === "undefined" || !("speechSynthesis" in window)) {
        setIsSupported(false);
        setErrorMessage("Text-to-speech is not supported in this browser.");
        return;
      }

      if (!text || !text.trim()) return;

      // Stop previous audio to avoid stacking audio readings
      window.speechSynthesis.cancel();

      try {
        const utterance = new SpeechSynthesisUtterance(text.trim());
        const targetLang = langRef.current || "en-US";
        utterance.lang = targetLang;

        // Find best matching voice
        const currentVoices = voices.length > 0 ? voices : window.speechSynthesis.getVoices();
        const matchingVoice =
          currentVoices.find((v) => v.lang === targetLang) ||
          currentVoices.find((v) => v.lang.startsWith(targetLang.slice(0, 2))) ||
          currentVoices.find((v) => v.default) ||
          currentVoices[0];

        if (matchingVoice) {
          utterance.voice = matchingVoice;
        }

        utterance.rate = 0.95;
        utterance.pitch = 1.0;

        utterance.onstart = () => {
          setIsPlaying(true);
          setErrorMessage(null);
        };

        utterance.onend = () => {
          setIsPlaying(false);
        };

        utterance.onerror = (e) => {
          // If canceled intentionally, don't show error
          if (e.error !== "canceled" && e.error !== "interrupted") {
            setErrorMessage(`Speech synthesis error: ${e.error}`);
          }
          setIsPlaying(false);
        };

        window.speechSynthesis.speak(utterance);
      } catch (err) {
        setIsPlaying(false);
        setErrorMessage("Failed to play question audio.");
      }
    },
    [voices]
  );

  const toggle = useCallback(
    (text: string) => {
      if (isPlaying) {
        stop();
      } else {
        speak(text);
      }
    },
    [isPlaying, speak, stop]
  );

  return {
    isSupported,
    isPlaying,
    errorMessage,
    speak,
    stop,
    toggle,
  };
}
