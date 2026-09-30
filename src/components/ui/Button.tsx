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
      primary: "bg-fire-red text-white hover:bg-fire-red-600 shadow-sm border border-fire-red-700",
      // Secondary: Crisp white with bold black border
      secondary: "bg-white text-foreground hover:bg-foreground hover:text-white border-2 border-foreground",
      // Outline: Subtle border, clean editorial
      outline: "bg-transparent text-foreground border border-border hover:border-foreground hover:bg-surface",
      // Ghost: Text-only button
      ghost: "bg-transparent text-muted hover:text-foreground hover:bg-surface",
      // Dark: Solid black editorial block
      dark: "bg-foreground text-white hover:bg-night-800 border-2 border-foreground",
      // Danger / Alert
      danger: "bg-fire-red-50 text-fire-red border border-fire-red hover:bg-fire-red hover:text-white",
      // Specific Section Accents
      red: "bg-editorial-red text-white hover:bg-black border-2 border-editorial-red font-bold",
      yellow: "bg-electric-yellow text-foreground hover:bg-electric-yellow-600 border-2 border-foreground font-bold",
      gold: "bg-honey-gold text-foreground hover:bg-honey-gold-600 border-2 border-foreground font-bold",
      acid: "bg-editorial-acid text-foreground hover:brightness-95 border-2 border-foreground font-bold",
      navy: "bg-deep-navy text-white hover:bg-black border-2 border-deep-navy font-bold",
      violet: "bg-ultra-violet text-white hover:bg-ultra-violet-600 border-2 border-ultra-violet font-bold",
      // Backward compat
      rose: "bg-fire-red-50 text-fire-red border border-fire-red-200 hover:bg-fire-red hover:text-white",
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
