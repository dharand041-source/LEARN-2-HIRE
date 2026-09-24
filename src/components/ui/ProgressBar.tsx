import React from "react";
import { cn } from "@/lib/constants";

export interface ProgressBarProps {
  value: number; // 0 to 100
  max?: number;
  variant?: "imperial" | "champagne" | "navy" | "rose" | "night" | "gradient" | "success";
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  label?: string;
  className?: string;
}

export function ProgressBar({
  value,
  max = 100,
  variant = "imperial",
  size = "md",
  showLabel = false,
  label,
  className,
}: ProgressBarProps) {
  const percentage = Math.min(100, Math.max(0, Math.round((value / max) * 100)));

  const sizeClasses = {
    sm: "h-1.5",
    md: "h-2.5",
    lg: "h-3.5",
  };

  const fillVariants = {
    imperial: "bg-imperial",
    champagne: "bg-imperial", // backward compat map
    navy: "bg-night",
    rose: "bg-imperial",
    night: "bg-night",
    gradient: "bg-imperial",
    success: "bg-imperial",
  };

  return (
    <div className={cn("w-full", className)}>
      {(showLabel || label) && (
        <div className="flex justify-between items-center text-xs font-medium text-night-muted mb-1.5">
          <span>{label || "Progress"}</span>
          <span className="text-night font-semibold">{percentage}%</span>
        </div>
      )}
      <div className={cn("w-full bg-surface-subtle rounded-full overflow-hidden border border-surface-border", sizeClasses[size])}>
        <div
          className={cn("h-full rounded-full transition-all duration-500 ease-out", fillVariants[variant])}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
