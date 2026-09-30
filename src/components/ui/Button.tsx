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
      // Primary: Electric Coral with Black text
      primary: "bg-electric-coral text-black hover:bg-black hover:text-white border-2 border-black font-black shadow-editorial-xs",
      // Secondary: Royal Maroon with White text
      secondary: "bg-royal-maroon text-white hover:bg-black border-2 border-black font-extrabold shadow-editorial-xs",
      // Outline: Electric Coral border and text
      outline: "bg-transparent text-electric-coral border-2 border-electric-coral hover:bg-electric-coral hover:text-black font-extrabold",
      // Ghost: Text-only button
      ghost: "bg-transparent text-muted hover:text-black hover:bg-surface font-bold",
      // Dark: Solid black editorial block
      dark: "bg-black text-white hover:bg-electric-coral hover:text-black border-2 border-black font-extrabold",
      // Danger / Alert: Royal Maroon
      danger: "bg-royal-maroon text-white border-2 border-black hover:bg-black font-extrabold",
      // Explicit Coral & Maroon
      coral: "bg-electric-coral text-black hover:bg-black hover:text-white border-2 border-black font-black shadow-editorial-xs",
      maroon: "bg-royal-maroon text-white hover:bg-black border-2 border-black font-extrabold shadow-editorial-xs",
      navy: "bg-royal-maroon text-white hover:bg-black border-2 border-black font-extrabold shadow-editorial-xs",
      // Mappings for older aliases strictly using Coral or Maroon
      red: "bg-royal-maroon text-white hover:bg-black border-2 border-black font-extrabold",
      yellow: "bg-electric-coral text-black hover:bg-black hover:text-white border-2 border-black font-black",
      gold: "bg-electric-coral text-black hover:bg-black hover:text-white border-2 border-black font-black",
      acid: "bg-electric-coral text-black hover:bg-black hover:text-white border-2 border-black font-black",
      violet: "bg-royal-maroon text-white hover:bg-black border-2 border-black font-extrabold",
      rose: "bg-royal-maroon text-white hover:bg-black border-2 border-black font-extrabold",
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
