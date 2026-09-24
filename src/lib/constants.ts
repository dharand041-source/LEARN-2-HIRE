import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const PRODUCT_NAME = "SkillForge";
export const PRODUCT_TAGLINE = "Build the skills. Prove your ability. Find your opportunity.";

export const SUPPORTED_LANGUAGES = [
  { code: "en", name: "English", nativeName: "English" },
  { code: "ta", name: "Tamil", nativeName: "தமிழ்" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी" },
  { code: "te", name: "Telugu", nativeName: "తెలుగు" },
  { code: "ml", name: "Malayalam", nativeName: "മലയാളം" },
  { code: "kn", name: "Kannada", nativeName: "ಕನ್ನಡ" },
] as const;

export const CAREER_CATEGORIES = [
  "Software Development & Engineering",
  "Data, AI & Machine Learning",
  "Cloud, Infrastructure & DevOps",
  "Cybersecurity",
  "Architecture & Leadership",
  "Hardware & Systems Engineering",
] as const;

export const NAV_LINKS = [
  { label: "Dashboard", href: "/", icon: "LayoutDashboard" },
  { label: "Career Path", href: "/onboarding", icon: "Compass" },
  { label: "Assessment", href: "/assessment", icon: "CheckSquare" },
  { label: "Learning", href: "/learning", icon: "BookOpen" },
  { label: "Projects", href: "/projects", icon: "FolderGit2" },
  { label: "Problem Solving", href: "/problem-solving", icon: "Code2" },
  { label: "Interview", href: "/interview", icon: "Mic" },
  { label: "Resume", href: "/resume", icon: "FileText" },
  { label: "Opportunities", href: "/opportunities", icon: "Briefcase" },
  { label: "Applications", href: "/applications", icon: "Kanban" },
  { label: "Outcome Analysis", href: "/feedback", icon: "TrendingUp" },
] as const;

export function formatCurrency(amount: string | number): string {
  if (typeof amount === "number") {
    return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(amount);
  }
  return amount;
}

export function getScoreColor(score: number): string {
  if (score >= 80) return "text-imperial";
  if (score >= 60) return "text-night";
  return "text-night-muted";
}

export function getScoreBgColor(score: number): string {
  if (score >= 80) return "bg-imperial-50 border-imperial-200 text-imperial";
  if (score >= 60) return "bg-surface-subtle border-surface-border text-night";
  return "bg-surface-subtle border-surface-border text-night-muted";
}
