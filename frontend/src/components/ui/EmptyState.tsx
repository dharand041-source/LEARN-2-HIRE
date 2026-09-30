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
    <div className={cn("flex flex-col items-center justify-center p-12 text-center rounded-xl bg-white border border-border", className)}>
      <div className="w-14 h-14 rounded-lg bg-surface border-2 border-foreground flex items-center justify-center text-foreground mb-4 shadow-editorial-sm">
        <Icon className="w-6 h-6 text-foreground" />
      </div>
      <h3 className="text-base font-extrabold text-foreground tracking-tight">{title}</h3>
      <p className="text-xs text-muted max-w-sm mt-1.5 leading-relaxed">{description}</p>
      {actionLabel && onAction && (
        <Button onClick={onAction} variant="secondary" size="sm" className="mt-5 font-bold">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}

