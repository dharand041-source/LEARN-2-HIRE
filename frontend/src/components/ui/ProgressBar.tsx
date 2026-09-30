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
    | "champagne"
    | "rose"
    | "night"
    | "gradient"
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
    "fire-red": "bg-editorial-red",
    red: "bg-editorial-red",
    imperial: "bg-editorial-red",
    rose: "bg-editorial-red",
    "electric-yellow": "bg-editorial-yellow",
    yellow: "bg-editorial-yellow",
    "acid-yellow": "bg-editorial-acid",
    acid: "bg-editorial-acid",
    "honey-gold": "bg-editorial-gold",
    gold: "bg-editorial-gold",
    champagne: "bg-editorial-gold",
    "deep-navy": "bg-editorial-navy",
    navy: "bg-editorial-navy",
    "ultra-violet": "bg-editorial-violet",
    violet: "bg-editorial-violet",
    night: "bg-foreground",
    gradient: "bg-editorial-red",
    success: "bg-emerald-600",
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
