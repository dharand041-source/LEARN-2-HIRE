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
    | "electric-coral"
    | "coral"
    | "royal-maroon"
    | "maroon"
    | "night"
    | "neutral"
    | "success"
    | "outline";
  size?: "sm" | "md";
}

export function Badge({ className, variant = "neutral", size = "sm", children, ...props }: BadgeProps) {
  const baseStyles = "inline-flex items-center font-bold rounded-md transition-colors select-none";

  const variants = {
    // Ultra Violet
    "ultra-violet": "bg-ultra-violet text-white border border-black font-extrabold",
    violet: "bg-ultra-violet text-white border border-black font-extrabold",
    // Acid Yellow
    "acid-yellow": "bg-acid-yellow text-black border border-black font-extrabold",
    acid: "bg-acid-yellow text-black border border-black font-extrabold",
    // Fire Red
    "fire-red": "bg-fire-red text-white border border-black font-extrabold",
    red: "bg-fire-red text-white border border-black font-extrabold",
    imperial: "bg-fire-red text-white border border-black font-extrabold",
    rose: "bg-fire-red text-white border border-black font-extrabold",
    // Electric Yellow
    "electric-yellow": "bg-electric-yellow text-black border border-black font-extrabold",
    yellow: "bg-electric-yellow text-black border border-black font-extrabold",
    "honey-gold": "bg-electric-yellow text-black border border-black font-extrabold",
    gold: "bg-electric-yellow text-black border border-black font-extrabold",
    champagne: "bg-electric-yellow text-black border border-black font-extrabold",
    // Electric Coral
    "electric-coral": "bg-electric-coral text-white border border-black font-extrabold",
    coral: "bg-electric-coral text-white border border-black font-extrabold",
    // Royal Maroon
    "royal-maroon": "bg-royal-maroon text-white border border-black font-extrabold",
    maroon: "bg-royal-maroon text-white border border-black font-extrabold",
    "deep-navy": "bg-royal-maroon text-white border border-black font-extrabold",
    navy: "bg-royal-maroon text-white border border-black font-extrabold",
    // Neutrals
    night: "bg-black text-white border border-black font-extrabold",
    neutral: "bg-surface text-black border border-black font-bold",
    success: "bg-white text-black border border-black font-extrabold",
    outline: "bg-transparent text-foreground border border-black font-bold",
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
