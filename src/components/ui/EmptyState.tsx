import React from "react";
import { Button } from "./Button";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/constants";

export interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
  className,
}: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center p-12 text-center rounded-xl bg-surface-card border border-surface-border", className)}>
      <div className="w-14 h-14 rounded-full bg-navy-800/80 border border-pearl/10 flex items-center justify-center text-pearl-muted mb-4 shadow-inner">
        <Icon className="w-6 h-6 text-champagne/80" />
      </div>
      <h3 className="text-base font-semibold text-pearl-primary">{title}</h3>
      <p className="text-xs text-pearl-muted max-w-sm mt-1.5 leading-relaxed">{description}</p>
      {actionLabel && onAction && (
        <Button onClick={onAction} variant="secondary" size="sm" className="mt-5">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
