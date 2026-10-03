import React from "react";
import { cn } from "@/lib/constants";

export interface ProgressBarProps {
  value: number; // 0 to 100
  max?: number;
  variant?:
    | "primary-orange"
    | "golden-yellow"
    | "rose"
    | "soft-pink"
    | "ink-black"
    | "paper-white"
    | "primary"
    | "secondary"
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

  const fillVariants: Record<string, string> = {
    "primary-orange": "bg-primary-orange",
    "electric-coral": "bg-primary-orange",
    coral: "bg-primary-orange",
    orange: "bg-primary-orange",
    "golden-yellow": "bg-golden-yellow",
    "electric-yellow": "bg-golden-yellow",
    yellow: "bg-golden-yellow",
    "acid-yellow": "bg-golden-yellow",
    acid: "bg-golden-yellow",
    "honey-gold": "bg-golden-yellow",
    gold: "bg-golden-yellow",
    success: "bg-golden-yellow",
    rose: "bg-rose",
    "royal-maroon": "bg-rose",
    maroon: "bg-rose",
    "ultra-violet": "bg-rose",
    violet: "bg-rose",
    "soft-pink": "bg-soft-pink",
    pink: "bg-soft-pink",
    "fire-red": "bg-primary-orange",
    red: "bg-primary-orange",
    imperial: "bg-primary-orange",
    "deep-navy": "bg-ink-black",
    navy: "bg-ink-black",
    night: "bg-ink-black",
    dark: "bg-ink-black",
    gradient: "bg-primary-orange",
  };

  return (
    <div className={cn("w-full", className)}>
      {(showLabel || label) && (
        <div className="flex justify-between items-center text-xs font-bold text-ink-black/70 mb-1.5 font-mono">
          <span>{label || "Progress"}</span>
          <span className="text-ink-black font-mono font-extrabold">{percentage}%</span>
        </div>
      )}
      <div className={cn("w-full bg-warm-cream rounded-sm overflow-hidden border border-ink-black/20", sizeClasses[size])}>
        <div
          className={cn("h-full transition-all duration-300 ease-out", fillVariants[variant] || "bg-primary-orange")}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
