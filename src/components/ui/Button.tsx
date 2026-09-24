"use client";

import React, { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/constants";
import { Loader2 } from "lucide-react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "dark" | "danger" | "rose";
  size?: "sm" | "md" | "lg" | "icon";
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", isLoading = false, children, disabled, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center font-medium rounded-md transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-imperial focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:opacity-50 disabled:pointer-events-none select-none cursor-pointer active:scale-[0.98]";

    const variants = {
      primary: "bg-imperial text-white hover:bg-imperial-600 font-semibold shadow-imperial-btn border border-imperial-600",
      secondary: "bg-white text-night hover:bg-night hover:text-white border border-night",
      outline: "bg-transparent text-night border border-surface-border hover:border-imperial hover:text-imperial hover:bg-imperial-50",
      ghost: "bg-transparent text-night-muted hover:text-night hover:bg-surface-subtle",
      dark: "bg-night text-white hover:bg-night-900 border border-night shadow-night-btn",
      danger: "bg-imperial-50 text-imperial border border-imperial hover:bg-imperial hover:text-white",
      rose: "bg-imperial-50 text-imperial border border-imperial-200 hover:bg-imperial-100",
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
