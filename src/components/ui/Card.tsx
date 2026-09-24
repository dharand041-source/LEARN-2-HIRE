import React from "react";
import { cn } from "@/lib/constants";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "navy" | "interactive" | "subtle";
  glowing?: boolean;
}

export function Card({ className, variant = "default", glowing = false, children, ...props }: CardProps) {
  const baseStyles = "rounded-lg transition-all duration-200";

  const variants = {
    default: "bg-surface-card border border-surface-border shadow-card-subtle",
    navy: "bg-navy-800/90 border border-pearl/10 shadow-card-navy",
    interactive: "bg-surface-card border border-surface-border hover:border-champagne/40 hover:shadow-card-hover cursor-pointer",
    subtle: "bg-surface-subtle/80 border border-white/5",
  };

  return (
    <div
      className={cn(
        baseStyles,
        variants[variant],
        glowing && "border-champagne-subtle shadow-gold-btn/20",
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
    <h3 className={cn("text-base font-semibold text-pearl-primary tracking-tight", className)} {...props}>
      {children}
    </h3>
  );
}

export function CardDescription({ className, children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("text-xs text-pearl-muted mt-1 leading-relaxed", className)} {...props}>
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
