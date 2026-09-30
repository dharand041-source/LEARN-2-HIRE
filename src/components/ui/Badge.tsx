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
    // Electric Coral (Energetic / Primary Accent) - Black text
    "electric-coral": "bg-electric-coral text-black border border-black font-black",
    coral: "bg-electric-coral text-black border border-black font-black",
    // Royal Maroon (Deep Primary Surface) - White text
    "royal-maroon": "bg-royal-maroon text-white border border-black font-extrabold",
    maroon: "bg-royal-maroon text-white border border-black font-extrabold",
    "deep-navy": "bg-royal-maroon text-white border border-black font-extrabold",
    navy: "bg-royal-maroon text-white border border-black font-extrabold",
    // Fallback mappings for old tokens mapped strictly to Coral or Maroon
    "ultra-violet": "bg-royal-maroon text-white border border-black font-extrabold",
    violet: "bg-royal-maroon text-white border border-black font-extrabold",
    "acid-yellow": "bg-electric-coral text-black border border-black font-black",
    acid: "bg-electric-coral text-black border border-black font-black",
    "fire-red": "bg-royal-maroon text-white border border-black font-extrabold",
    red: "bg-royal-maroon text-white border border-black font-extrabold",
    imperial: "bg-royal-maroon text-white border border-black font-extrabold",
    rose: "bg-royal-maroon text-white border border-black font-extrabold",
    "electric-yellow": "bg-electric-coral text-black border border-black font-black",
    yellow: "bg-electric-coral text-black border border-black font-black",
    "honey-gold": "bg-electric-coral text-black border border-black font-black",
    gold: "bg-electric-coral text-black border border-black font-black",
    champagne: "bg-electric-coral text-black border border-black font-black",
    // Neutrals: Black, White, Outline
    night: "bg-black text-white border border-black font-extrabold",
    neutral: "bg-white text-black border border-black font-bold",
    success: "bg-electric-coral text-black border border-black font-black",
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
