"use client";

import React, { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/constants";
import { Loader2 } from "lucide-react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger" | "rose";
  size?: "sm" | "md" | "lg" | "icon";
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", isLoading = false, children, disabled, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center font-medium rounded-md transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:opacity-50 disabled:pointer-events-none select-none cursor-pointer active:scale-[0.98]";

    const variants = {
      primary: "bg-champagne text-black hover:bg-champagne-300 font-semibold shadow-gold-btn border border-champagne-400",
      secondary: "bg-navy-800 text-pearl-primary hover:bg-navy-700 border border-pearl/15 hover:border-pearl/30",
      outline: "bg-transparent text-pearl-primary border border-pearl/20 hover:border-champagne hover:text-champagne hover:bg-champagne/5",
      ghost: "bg-transparent text-pearl-muted hover:text-pearl-primary hover:bg-navy-800/60",
      rose: "bg-rose/15 text-rose border border-rose/30 hover:bg-rose/25",
      danger: "bg-red-950/80 text-red-200 border border-red-800/40 hover:bg-red-900",
    };

    const sizes = {
      sm: "text-xs px-3 py-1.5 gap-1.5",
      md: "text-sm px-4 py-2 gap-2",
      lg: "text-base px-6 py-3 gap-2.5 font-semibold",
      icon: "h-9 w-9 p-0",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
