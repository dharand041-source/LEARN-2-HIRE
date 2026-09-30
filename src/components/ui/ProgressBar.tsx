import React from "react";
import { cn } from "@/lib/constants";

export interface ProgressBarProps {
  value: number; // 0 to 100
  max?: number;
  variant?:
    | "imperial"
    | "fire-red"
    | "red"
    | "electric-yellow"
    | "yellow"
    | "ultra-violet"
    | "violet"
    | "acid-yellow"
    | "acid"
    | "honey-gold"
    | "gold"
    | "deep-navy"
    | "navy"
    | "electric-coral"
    | "coral"
    | "royal-maroon"
    | "maroon"
    | "night"
    | "success";
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  label?: string;
  className?: string;
}

export function ProgressBar({
  value,
  max = 100,
  variant = "fire-red",
  size = "md",
  showLabel = false,
  label,
  className,
}: ProgressBarProps) {
  const percentage = Math.min(100, Math.max(0, Math.round((value / max) * 100)));

  const sizeClasses = {
    sm: "h-2",
    md: "h-3",
    lg: "h-4",
  };

  const fillVariants = {
    "electric-coral": "bg-electric-coral",
    coral: "bg-electric-coral",
    "royal-maroon": "bg-royal-maroon",
    maroon: "bg-royal-maroon",
    "deep-navy": "bg-royal-maroon",
    navy: "bg-royal-maroon",
    "fire-red": "bg-royal-maroon",
    red: "bg-royal-maroon",
    imperial: "bg-royal-maroon",
    rose: "bg-royal-maroon",
    "electric-yellow": "bg-electric-coral",
    yellow: "bg-electric-coral",
    "acid-yellow": "bg-electric-coral",
    acid: "bg-electric-coral",
    "honey-gold": "bg-electric-coral",
    gold: "bg-electric-coral",
    "ultra-violet": "bg-royal-maroon",
    violet: "bg-royal-maroon",
    night: "bg-black",
    gradient: "bg-electric-coral",
    success: "bg-electric-coral",
  };

  return (
    <div className={cn("w-full", className)}>
      {(showLabel || label) && (
        <div className="flex justify-between items-center text-xs font-bold text-muted mb-1.5 font-mono">
          <span>{label || "Progress"}</span>
          <span className="text-foreground font-mono font-extrabold">{percentage}%</span>
        </div>
      )}
      <div className={cn("w-full bg-surface rounded-sm overflow-hidden border border-border", sizeClasses[size])}>
        <div
          className={cn("h-full transition-all duration-300 ease-out", fillVariants[variant])}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
