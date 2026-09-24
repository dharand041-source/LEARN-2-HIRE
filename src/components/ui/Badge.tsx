import React from "react";
import { cn } from "@/lib/constants";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "imperial" | "champagne" | "navy" | "rose" | "night" | "neutral" | "success" | "outline";
  size?: "sm" | "md";
}

export function Badge({ className, variant = "neutral", size = "sm", children, ...props }: BadgeProps) {
  const baseStyles = "inline-flex items-center font-medium rounded-full transition-colors select-none";

  const variants = {
    imperial: "bg-imperial-50 text-imperial border border-imperial-200",
    champagne: "bg-imperial-50 text-imperial border border-imperial-200", // backward compat map
    navy: "bg-night text-white border border-night", // backward compat map
    rose: "bg-imperial-50 text-imperial border border-imperial-200", // backward compat map
    night: "bg-night text-white border border-night",
    neutral: "bg-surface-subtle text-night-muted border border-surface-border",
    success: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    outline: "bg-transparent text-night-muted border border-surface-border",
  };

  const sizes = {
    sm: "text-[11px] px-2.5 py-0.5 gap-1 tracking-wide font-medium",
    md: "text-xs px-3 py-1 gap-1.5 font-medium",
  };

  return (
    <span className={cn(baseStyles, variants[variant], sizes[size], className)} {...props}>
      {children}
    </span>
  );
}
