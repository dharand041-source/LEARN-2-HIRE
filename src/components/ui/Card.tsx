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
    | "acid"
    | "violet"
    | "coral"
    | "maroon";
  glowing?: boolean;
}

export function Card({ className, variant = "default", glowing = false, children, ...props }: CardProps) {
  const baseStyles = "rounded-xl transition-all duration-150";

  const variants = {
    // Standard card: 1px clean border, white background
    default: "bg-white border border-border shadow-card-clean",
    // Editorial card: 2px bold border, subtle lift
    editorial: "bg-white text-black border-2 border-black shadow-editorial-sm",
    // Hero card: 3px bold border
    hero: "bg-white text-black border-3 border-black shadow-editorial-md",
    // Deep Navy / Maroon solid block
    navy: "bg-royal-maroon text-white border-2 border-black shadow-editorial-sm",
    // Dark editorial block
    dark: "bg-black text-white border-2 border-black shadow-editorial-sm",
    // Interactive card
    interactive:
      "bg-white text-black border-2 border-black hover:shadow-editorial-sm cursor-pointer transition-all duration-150",
    // Subtle surface card
    subtle: "bg-surface border border-border",
    // Highlighted card
    highlighted: "bg-white border-2 border-electric-coral shadow-sm",
    // Approved Solid Surfaces
    coral: "bg-electric-coral text-black border-2 border-black shadow-editorial-sm",
    maroon: "bg-royal-maroon text-white border-2 border-black shadow-editorial-sm",
    // Aliases mapped strictly to Coral or Maroon
    violet: "bg-royal-maroon text-white border-2 border-black shadow-editorial-sm",
    acid: "bg-electric-coral text-black border-2 border-black shadow-editorial-sm",
    red: "bg-royal-maroon text-white border-2 border-black shadow-editorial-sm",
    yellow: "bg-electric-coral text-black border-2 border-black shadow-editorial-sm",
    gold: "bg-electric-coral text-black border-2 border-black shadow-editorial-sm",
  };

  return (
    <div
      className={cn(
        baseStyles,
        variants[variant],
        glowing && "border-2 border-electric-coral shadow-editorial-sm",
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

