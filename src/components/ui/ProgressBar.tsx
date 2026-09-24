import React from "react";
import { cn } from "@/lib/constants";

export interface ProgressBarProps {
  value: number; // 0 to 100
  max?: number;
  variant?: "champagne" | "navy" | "rose" | "gradient" | "success";
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  label?: string;
  className?: string;
}

export function ProgressBar({
  value,
  max = 100,
  variant = "champagne",
  size = "md",
  showLabel = false,
  label,
  className,
}: ProgressBarProps) {
  const percentage = Math.min(100, Math.max(0, Math.round((value / max) * 100)));

  const sizeClasses = {
    sm: "h-1.5",
    md: "h-2.5",
    lg: "h-4",
  };

  const fillVariants = {
    champagne: "bg-champagne",
    navy: "bg-navy-500",
    rose: "bg-rose",
    gradient: "bg-gradient-to-r from-navy-500 via-rose to-champagne",
    success: "bg-emerald-400",
  };

  return (
    <div className={cn("w-full", className)}>
      {(showLabel || label) && (
        <div className="flex justify-between items-center text-xs font-medium text-pearl-muted mb-1.5">
          <span>{label || "Progress"}</span>
          <span className="text-pearl-primary font-semibold">{percentage}%</span>
        </div>
      )}
      <div className={cn("w-full bg-navy-900/90 rounded-full overflow-hidden border border-white/5", sizeClasses[size])}>
        <div
          className={cn("h-full rounded-full transition-all duration-500 ease-out", fillVariants[variant])}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
