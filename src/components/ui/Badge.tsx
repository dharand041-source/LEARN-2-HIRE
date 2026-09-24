import React from "react";
import { cn } from "@/lib/constants";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "champagne" | "navy" | "rose" | "neutral" | "success" | "outline";
  size?: "sm" | "md";
}

export function Badge({ className, variant = "neutral", size = "sm", children, ...props }: BadgeProps) {
  const baseStyles = "inline-flex items-center font-medium rounded-full transition-colors select-none";

  const variants = {
    champagne: "bg-champagne/15 text-champagne border border-champagne/30",
    navy: "bg-navy-800 text-pearl-primary border border-navy-600",
    rose: "bg-rose/15 text-rose border border-rose/30",
    neutral: "bg-white/5 text-pearl-muted border border-white/10",
    success: "bg-emerald-950/60 text-emerald-300 border border-emerald-800/40",
    outline: "bg-transparent text-pearl-muted border border-pearl/20",
  };

  const sizes = {
    sm: "text-[11px] px-2.5 py-0.5 gap-1 tracking-wide",
    md: "text-xs px-3 py-1 gap-1.5",
  };

  return (
    <span className={cn(baseStyles, variants[variant], sizes[size], className)} {...props}>
      {children}
    </span>
  );
}
