import React from "react";
import { cn } from "@/lib/constants";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?:
    | "default"
    | "editorial"
    | "hero"
    | "navy"
    | "dark"
    | "interactive"
    | "subtle"
    | "highlighted"
    | "red"
    | "yellow"
    | "gold"
    | "violet";
  glowing?: boolean;
}

export function Card({ className, variant = "default", glowing = false, children, ...props }: CardProps) {
  const baseStyles = "rounded-xl transition-all duration-150";

  const variants = {
    // Standard card: 1px clean border, white background
    default: "bg-white border border-border shadow-card-clean",
    // Editorial card: 2px bold border, subtle lift
    editorial: "bg-white border-2 border-foreground shadow-editorial-sm",
    // Hero card: 3px bold border
    hero: "bg-white border-3 border-foreground shadow-editorial-md",
    // Deep Navy solid block (for Projects / Problem Solving)
    navy: "bg-deep-navy text-white border-2 border-deep-navy shadow-sm",
    // Dark editorial block
    dark: "bg-foreground text-white border-2 border-foreground shadow-sm",
    // Interactive card
    interactive:
      "bg-white border border-border hover:border-foreground hover:shadow-editorial-sm cursor-pointer transition-all duration-150",
    // Subtle surface card
    subtle: "bg-surface border border-border",
    // Highlighted card
    highlighted: "bg-fire-red-50 border-2 border-fire-red shadow-sm",
    // Section color block variants
    red: "bg-fire-red text-white border-2 border-fire-red shadow-sm",
    yellow: "bg-electric-yellow text-foreground border-2 border-foreground shadow-sm",
    gold: "bg-honey-gold text-foreground border-2 border-foreground shadow-sm",
    violet: "bg-ultra-violet text-white border-2 border-ultra-violet shadow-sm",
  };

  return (
    <div
      className={cn(
        baseStyles,
        variants[variant],
        glowing && "border-2 border-fire-red shadow-editorial-red",
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
    <div className={cn("p-5 pb-3 border-b border-border", className)} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={cn("text-base font-bold text-foreground tracking-tight leading-snug", className)} {...props}>
      {children}
    </h3>
  );
}

export function CardDescription({ className, children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("text-xs text-muted mt-1 leading-relaxed", className)} {...props}>
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
    <div className={cn("p-5 pt-3 border-t border-border flex items-center justify-between", className)} {...props}>
      {children}
    </div>
  );
}

