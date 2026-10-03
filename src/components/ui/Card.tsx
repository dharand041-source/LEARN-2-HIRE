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
    | "maroon"
    | "orange"
    | "rose"
    | "pink"
    | "soft";
  glowing?: boolean;
}

export function Card({ className, variant = "default", glowing = false, children, ...props }: CardProps) {
  const baseStyles = "rounded-xl transition-all duration-150";

  const variants = {
    // Standard card: Paper White + Ink Black
    default: "bg-paper-white text-ink-black border border-ink-black/15 shadow-card-clean",
    // Editorial card: 2px bold border, subtle lift
    editorial: "bg-paper-white text-ink-black border-2 border-ink-black shadow-editorial-sm",
    // Hero card: 3px bold border
    hero: "bg-paper-white text-ink-black border-3 border-ink-black shadow-editorial-md",
    // Dark card: Ink Black + Paper White
    navy: "bg-ink-black text-paper-white border-2 border-ink-black shadow-editorial-sm",
    dark: "bg-ink-black text-paper-white border-2 border-ink-black shadow-editorial-sm",
    // Interactive card
    interactive:
      "bg-paper-white text-ink-black border-2 border-ink-black hover:shadow-editorial-sm cursor-pointer transition-all duration-150",
    // Subtle surface card
    subtle: "bg-warm-cream text-ink-black border border-ink-black/15",
    // Highlighted card: Paper White with Primary Orange border
    highlighted: "bg-paper-white text-ink-black border-2 border-primary-orange shadow-sm",
    // Featured / Primary: Primary Orange + Paper White
    coral: "bg-primary-orange text-paper-white border-2 border-ink-black shadow-editorial-sm",
    orange: "bg-primary-orange text-paper-white border-2 border-ink-black shadow-editorial-sm",
    // Secondary: Rose + Paper White
    maroon: "bg-rose text-paper-white border-2 border-ink-black shadow-editorial-sm",
    rose: "bg-rose text-paper-white border-2 border-ink-black shadow-editorial-sm",
    violet: "bg-rose text-paper-white border-2 border-ink-black shadow-editorial-sm",
    red: "bg-primary-orange text-paper-white border-2 border-ink-black shadow-editorial-sm",
    // Highlight: Golden Yellow + Ink Black
    yellow: "bg-golden-yellow text-ink-black border-2 border-ink-black shadow-editorial-sm",
    gold: "bg-golden-yellow text-ink-black border-2 border-ink-black shadow-editorial-sm",
    acid: "bg-golden-yellow text-ink-black border-2 border-ink-black shadow-editorial-sm",
    // Soft: Soft Pink + Ink Black
    pink: "bg-soft-pink text-ink-black border-2 border-ink-black shadow-editorial-sm",
    soft: "bg-soft-pink text-ink-black border-2 border-ink-black shadow-editorial-sm",
  };

  return (
    <div
      className={cn(
        baseStyles,
        variants[variant],
        glowing && "border-2 border-primary-orange shadow-editorial-sm",
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

