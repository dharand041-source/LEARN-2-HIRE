import React from "react";
import { cn } from "@/lib/constants";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
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
    | "neutral"
    | "success"
    | "outline";
  size?: "sm" | "md";
}

export function Badge({ className, variant = "neutral", size = "sm", children, ...props }: BadgeProps) {
  const baseStyles = "inline-flex items-center font-bold rounded-md transition-colors select-none";

  const variants = {
    // Red (Fire Red)
    "fire-red": "bg-editorial-red/10 text-editorial-red border border-editorial-red font-bold",
    red: "bg-editorial-red/10 text-editorial-red border border-editorial-red font-bold",
    imperial: "bg-editorial-red/10 text-editorial-red border border-editorial-red font-bold",
    rose: "bg-editorial-red/10 text-editorial-red border border-editorial-red font-bold",
    // Electric Yellow (Accessible black text on yellow)
    "electric-yellow": "bg-editorial-yellow text-foreground border border-foreground font-bold",
    yellow: "bg-editorial-yellow text-foreground border border-foreground font-bold",
    // Acid Yellow (Accessible black text on yellow)
    "acid-yellow": "bg-editorial-acid text-foreground border border-foreground font-bold",
    acid: "bg-editorial-acid text-foreground border border-foreground font-bold",
    // Honey Gold (Accessible black text on gold)
    "honey-gold": "bg-editorial-gold text-foreground border border-foreground font-bold",
    gold: "bg-editorial-gold text-foreground border border-foreground font-bold",
    champagne: "bg-editorial-gold/25 text-foreground border border-foreground font-bold",
    // Deep Navy (Accessible white text on navy)
    "deep-navy": "bg-editorial-navy text-white border border-editorial-navy font-bold",
    navy: "bg-editorial-navy text-white border border-editorial-navy font-bold",
    // Ultra Violet (Accessible white text on violet)
    "ultra-violet": "bg-editorial-violet text-white border border-editorial-violet font-bold",
    violet: "bg-editorial-violet text-white border border-editorial-violet font-bold",
    // Neutrals
    night: "bg-foreground text-background border border-foreground font-bold",
    neutral: "bg-surface text-foreground border border-border font-medium",
    success: "bg-emerald-50 text-emerald-800 border border-emerald-600 font-bold",
    outline: "bg-transparent text-foreground border border-border font-medium",
  };

  const sizes = {
    sm: "text-[10px] uppercase px-2 py-0.5 gap-1 tracking-wider font-bold",
    md: "text-xs px-2.5 py-1 gap-1.5 font-bold",
  };

  return (
    <span className={cn(baseStyles, variants[variant], sizes[size], className)} {...props}>
      {children}
    </span>
  );
}
