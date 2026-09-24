import React from "react";
import { cn } from "@/lib/constants";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "navy" | "dark" | "interactive" | "subtle" | "highlighted";
  glowing?: boolean;
}

export function Card({ className, variant = "default", glowing = false, children, ...props }: CardProps) {
  const baseStyles = "rounded-xl transition-all duration-200";

  const variants = {
    default: "bg-white border border-surface-border shadow-card-subtle",
    navy: "bg-night text-white border border-night shadow-card-dark",
    dark: "bg-night text-white border border-night shadow-card-dark",
    interactive: "bg-white border border-surface-border hover:border-imperial/40 hover:shadow-card-hover cursor-pointer",
    subtle: "bg-surface-subtle border border-surface-border",
    highlighted: "bg-imperial-50 border border-imperial-200 shadow-card-subtle",
  };

  return (
    <div
      className={cn(
        baseStyles,
        variants[variant],
        glowing && "border-imperial shadow-imperial-btn",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("p-5 pb-3 border-b border-surface-border", className)} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={cn("text-base font-semibold text-night tracking-tight", className)} {...props}>
      {children}
    </h3>
  );
}

export function CardDescription({ className, children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("text-xs text-night-muted mt-1 leading-relaxed", className)} {...props}>
      {children}
    </p>
  );
}

export function CardContent({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("p-5", className)} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("p-5 pt-3 border-t border-surface-border flex items-center justify-between", className)} {...props}>
      {children}
    </div>
  );
}
