"use client";

import React, { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { LayeredText } from "./layered-text";

export interface LoginIntroProps {
  onComplete: () => void;
}

export function LoginIntro({ onComplete }: LoginIntroProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const hasFinishedRef = useRef(false);

  const safeComplete = useCallback(() => {
    if (hasFinishedRef.current) return;
    hasFinishedRef.current = true;
    onComplete();
  }, [onComplete]);

  // Handle completion of LayeredText animation
  const handleLayeredComplete = useCallback(() => {
    if (hasFinishedRef.current || !overlayRef.current) return;

    // Timeline: 4.8s (LayeredText complete) -> hold 0.6s -> fade out 0.6s -> complete at ~6.0s
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.6,
      delay: 0.5,
      ease: "power2.inOut",
      onComplete: () => {
        safeComplete();
      },
    });
  }, [safeComplete]);

  useEffect(() => {
    // Watchdog fallback: never keep user stuck on intro screen
    const fallbackTimer = setTimeout(() => {
      safeComplete();
    }, 6500);

    return () => {
      clearTimeout(fallbackTimer);
    };
  }, [safeComplete]);

  return (
    <div
      ref={overlayRef}
      role="status"
      aria-label="Welcome to Learn-2-Hire"
      className="fixed inset-0 z-[99999] w-screen h-screen bg-white text-black overflow-hidden flex flex-col items-center justify-center pointer-events-auto select-none font-sans"
      style={{
        backgroundColor: "#FFFFFF",
      }}
    >
      {/* Subtle Top Brand Mark */}
      <div className="absolute top-6 left-6 sm:top-10 sm:left-10 flex items-center gap-2.5 z-10">
        <span className="w-2.5 h-2.5 rounded-full bg-editorial-red" />
        <span className="text-[11px] font-mono font-extrabold uppercase tracking-widest text-foreground">
          LEARN-2-HIRE // CAREER READINESS
        </span>
      </div>

      {/* Main Core Animation */}
      <div className="w-full max-w-5xl px-4 flex items-center justify-center">
        <LayeredText
          autoPlay
          duration={4.8}
          onComplete={handleLayeredComplete}
        />
      </div>

      {/* Subtle Bottom Status Indicator */}
      <div className="absolute bottom-6 sm:bottom-10 flex items-center gap-2 text-[10px] font-mono font-bold tracking-widest text-muted-foreground uppercase z-10">
        <span>AUTHENTICATION VERIFIED</span>
        <span className="w-1.5 h-1.5 rounded-full bg-foreground animate-ping" />
      </div>
    </div>
  );
}
