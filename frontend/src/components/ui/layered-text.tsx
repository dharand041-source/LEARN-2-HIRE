"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { cn } from "@/lib/constants";

export interface LayeredTextProps {
  lines?: string[];
  fontSize?: string;
  fontSizeMd?: string;
  lineHeight?: string;
  lineHeightMd?: string;
  className?: string;
  autoPlay?: boolean;
  duration?: number;
  onComplete?: () => void;
}

const DEFAULT_LINES = [
  "INFINITE",
  "PROGRESS",
  "INNOVATION",
  "FUTURE",
  "DREAMS",
  "ACHIEVEMENT",
];

export function LayeredText({
  lines = DEFAULT_LINES,
  fontSize = "clamp(2rem, 5.5vw, 5.25rem)",
  fontSizeMd = "clamp(1.5rem, 7.5vw, 2.85rem)",
  lineHeight = "0.98",
  lineHeightMd = "1.05",
  className,
  autoPlay = false,
  duration = 4.8,
  onComplete,
}: LayeredTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      if (onComplete) {
        const timer = setTimeout(() => {
          onComplete();
        }, 1200);
        return () => clearTimeout(timer);
      }
      return;
    }

    const ctx = gsap.context(() => {
      const validLines = lineRefs.current.filter(Boolean) as HTMLParagraphElement[];
      if (validLines.length === 0) return;

      if (autoPlay) {
        // Auto-play mode for post-login intro sequence
        // Total target duration: duration (default 4.8s)
        const tl = gsap.timeline({
          onComplete: () => {
            if (onComplete) onComplete();
          },
        });

        // Initial setup
        gsap.set(validLines, {
          opacity: 0,
          y: 25,
          skewX: -12,
          x: (i) => (i % 2 === 0 ? -40 : 40),
        });

        // 0.0s - 0.8s: Staggered smooth entrance
        tl.to(validLines, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.08,
          ease: "power3.out",
        })
          // 0.8s - 3.8s: Layered kinetic movement across layers (left / right staggered shift)
          .to(
            validLines,
            {
              x: (i) => (i % 2 === 0 ? 35 : -35),
              skewX: -8,
              duration: 1.6,
              ease: "sine.inOut",
            },
            "+=0.1"
          )
          .to(validLines, {
            x: (i) => (i % 2 === 0 ? -15 : 15),
            skewX: -12,
            duration: 1.3,
            ease: "sine.inOut",
          })
          // 3.8s - 4.6s: Settle smoothly into final perfect alignment
          .to(validLines, {
            x: 0,
            skewX: -10,
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.04,
            ease: "power2.out",
          });
      } else {
        // Interactive mouse-hover driven mode
        const handleMouseMove = (e: MouseEvent) => {
          if (!containerRef.current) return;
          const rect = containerRef.current.getBoundingClientRect();
          const relX = (e.clientX - rect.left) / rect.width - 0.5;
          const relY = (e.clientY - rect.top) / rect.height - 0.5;

          validLines.forEach((line, i) => {
            const factor = (i - validLines.length / 2) * 18;
            gsap.to(line, {
              x: relX * factor * 2,
              skewX: -10 + relX * 10,
              duration: 0.4,
              ease: "power1.out",
            });
          });
        };

        const handleMouseLeave = () => {
          validLines.forEach((line) => {
            gsap.to(line, {
              x: 0,
              skewX: -10,
              duration: 0.6,
              ease: "power2.out",
            });
          });
        };

        const container = containerRef.current;
        if (!container) return;
        container.addEventListener("mousemove", handleMouseMove);
        container.addEventListener("mouseleave", handleMouseLeave);

        return () => {
          container.removeEventListener("mousemove", handleMouseMove);
          container.removeEventListener("mouseleave", handleMouseLeave);
        };
      }
    }, containerRef);

    return () => ctx.revert();
  }, [autoPlay, duration, onComplete]);

  const instanceId = React.useId().replace(/:/g, "");

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative flex flex-col items-center justify-center select-none overflow-hidden",
        className
      )}
      style={{
        perspective: "1000px",
      }}
    >
      <style>{`
        .layered-line-${instanceId} {
          font-size: ${fontSizeMd};
          line-height: ${lineHeightMd};
        }
        @media (min-width: 768px) {
          .layered-line-${instanceId} {
            font-size: ${fontSize};
            line-height: ${lineHeight};
          }
        }
      `}</style>

      {lines.map((text, idx) => (
        <p
          key={`${text}-${idx}`}
          ref={(el) => {
            lineRefs.current[idx] = el;
          }}
          className={`layered-line-${instanceId} font-display font-extrabold text-foreground uppercase tracking-tight text-center will-change-transform`}
          style={{
            transform: "skewX(-10deg)",
            letterSpacing: "-0.03em",
          }}
        >
          {text}
        </p>
      ))}
    </div>
  );
}
