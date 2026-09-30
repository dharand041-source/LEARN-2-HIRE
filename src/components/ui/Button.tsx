"use client";

import React, { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/constants";
import { Loader2 } from "lucide-react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "primary"
    | "secondary"
    | "outline"
    | "ghost"
    | "dark"
    | "danger"
    | "red"
    | "yellow"
    | "gold"
    | "acid"
    | "navy"
    | "violet"
    | "coral"
    | "maroon"
    | "rose";
  size?: "sm" | "md" | "lg" | "icon";
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", isLoading = false, children, disabled, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-bold rounded-lg transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:opacity-50 disabled:pointer-events-none select-none cursor-pointer active:scale-[0.98]";

    const variants = {
      // Primary: Fire Red section accent with white text
      primary: "bg-fire-red text-white hover:bg-black shadow-sm border-2 border-black font-extrabold",
      // Secondary: Crisp white with bold black border
      secondary: "bg-white text-black hover:bg-black hover:text-white border-2 border-black font-extrabold",
      // Outline: Subtle border, clean editorial
      outline: "bg-transparent text-foreground border border-black hover:border-black hover:bg-surface font-bold",
      // Ghost: Text-only button
      ghost: "bg-transparent text-muted hover:text-foreground hover:bg-surface font-bold",
      // Dark: Solid black editorial block
      dark: "bg-black text-white hover:bg-ultra-violet border-2 border-black font-extrabold",
      // Danger / Alert
      danger: "bg-fire-red-50 text-fire-red border-2 border-fire-red hover:bg-fire-red hover:text-white font-extrabold",
      // Approved 6-Color System Variants
      red: "bg-fire-red text-white hover:bg-black border-2 border-black font-extrabold shadow-sm",
      yellow: "bg-electric-yellow text-black hover:bg-black hover:text-electric-yellow border-2 border-black font-extrabold shadow-sm",
      gold: "bg-electric-yellow text-black hover:bg-black hover:text-electric-yellow border-2 border-black font-extrabold shadow-sm",
      acid: "bg-acid-yellow text-black hover:bg-black hover:text-acid-yellow border-2 border-black font-extrabold shadow-sm",
      violet: "bg-ultra-violet text-white hover:bg-acid-yellow hover:text-black border-2 border-black font-extrabold shadow-sm",
      coral: "bg-electric-coral text-white hover:bg-black border-2 border-black font-extrabold shadow-sm",
      maroon: "bg-royal-maroon text-white hover:bg-black border-2 border-black font-extrabold shadow-sm",
      navy: "bg-royal-maroon text-white hover:bg-black border-2 border-black font-extrabold shadow-sm",
      // Backward compat
      rose: "bg-fire-red-50 text-fire-red border border-fire-red-200 hover:bg-fire-red hover:text-white font-bold",
    };

    const sizes = {
      sm: "text-xs px-3.5 py-1.5 gap-1.5",
      md: "text-xs sm:text-sm px-4 py-2 gap-2",
      lg: "text-sm sm:text-base px-6 py-3 gap-2.5 font-bold tracking-tight",
      icon: "h-9 w-9 p-0",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && <Loader2 className="w-4 h-4 animate-spin mr-1.5" />}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
