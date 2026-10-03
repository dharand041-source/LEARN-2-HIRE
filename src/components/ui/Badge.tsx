import React from "react";
import { cn } from "@/lib/constants";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?:
    | "primary"
    | "secondary"
    | "soft"
    | "dark"
    | "golden-yellow"
    | "rose"
    | "soft-pink"
    | "orange"
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
    | "progress"
    | "outline";
  size?: "sm" | "md";
}

export function Badge({ className, variant = "neutral", size = "sm", children, ...props }: BadgeProps) {
  const baseStyles = "inline-flex items-center font-bold rounded-md transition-colors select-none";

  const variants: Record<string, string> = {
    // Primary: Primary Orange + Paper White
    primary: "bg-primary-orange text-paper-white border border-ink-black font-black",
    "electric-coral": "bg-primary-orange text-paper-white border border-ink-black font-black",
    coral: "bg-primary-orange text-paper-white border border-ink-black font-black",
    orange: "bg-primary-orange text-paper-white border border-ink-black font-black",
    // Secondary: Rose + Paper White
    secondary: "bg-rose text-paper-white border border-ink-black font-extrabold",
    rose: "bg-rose text-paper-white border border-ink-black font-extrabold",
    "royal-maroon": "bg-rose text-paper-white border border-ink-black font-extrabold",
    maroon: "bg-rose text-paper-white border border-ink-black font-extrabold",
    "ultra-violet": "bg-rose text-paper-white border border-ink-black font-extrabold",
    violet: "bg-rose text-paper-white border border-ink-black font-extrabold",
    imperial: "bg-rose text-paper-white border border-ink-black font-extrabold",
    "fire-red": "bg-primary-orange text-paper-white border border-ink-black font-extrabold",
    red: "bg-primary-orange text-paper-white border border-ink-black font-extrabold",
    // Success / Progress / Achievement: Golden Yellow + Ink Black
    success: "bg-golden-yellow text-ink-black border border-ink-black font-black",
    progress: "bg-golden-yellow text-ink-black border border-ink-black font-black",
    "golden-yellow": "bg-golden-yellow text-ink-black border border-ink-black font-black",
    "acid-yellow": "bg-golden-yellow text-ink-black border border-ink-black font-black",
    acid: "bg-golden-yellow text-ink-black border border-ink-black font-black",
    "electric-yellow": "bg-golden-yellow text-ink-black border border-ink-black font-black",
    yellow: "bg-golden-yellow text-ink-black border border-ink-black font-black",
    "honey-gold": "bg-golden-yellow text-ink-black border border-ink-black font-black",
    gold: "bg-golden-yellow text-ink-black border border-ink-black font-black",
    champagne: "bg-golden-yellow text-ink-black border border-ink-black font-black",
    // Soft: Soft Pink + Ink Black
    soft: "bg-soft-pink text-ink-black border border-ink-black font-bold",
    pink: "bg-soft-pink text-ink-black border border-ink-black font-bold",
    "soft-pink": "bg-soft-pink text-ink-black border border-ink-black font-bold",
    // Dark: Ink Black + Paper White
    dark: "bg-ink-black text-paper-white border border-ink-black font-extrabold",
    night: "bg-ink-black text-paper-white border border-ink-black font-extrabold",
    "deep-navy": "bg-ink-black text-paper-white border border-ink-black font-extrabold",
    navy: "bg-ink-black text-paper-white border border-ink-black font-extrabold",
    // Standard Neutrals: Paper White / Warm Cream
    neutral: "bg-paper-white text-ink-black border border-ink-black font-bold",
    cream: "bg-warm-cream text-ink-black border border-ink-black font-bold",
    outline: "bg-transparent text-ink-black border border-ink-black font-bold",
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
