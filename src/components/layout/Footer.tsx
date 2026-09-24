import React from "react";
import Link from "next/link";
import { PRODUCT_NAME, PRODUCT_TAGLINE } from "@/lib/constants";
import { Sparkles, Shield, Compass, BookOpen, Briefcase, Award } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t border-surface-border bg-black py-12 px-4 sm:px-6 lg:px-8 text-pearl-muted text-xs">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
        {/* Brand Col */}
        <div className="md:col-span-1 space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-navy-800 border border-champagne/40 flex items-center justify-center text-champagne">
              <Sparkles className="w-3.5 h-3.5 text-champagne" />
            </div>
            <span className="font-display font-bold text-base text-pearl-primary tracking-tight">{PRODUCT_NAME}</span>
          </div>
          <p className="text-pearl-muted text-xs leading-relaxed max-w-xs">
            {PRODUCT_TAGLINE}
          </p>
          <div className="pt-2 flex items-center gap-2 text-[11px] text-pearl-subtle">
            <Shield className="w-3.5 h-3.5 text-champagne" />
            <span>Honest career progression platform</span>
          </div>
        </div>

        {/* Skill Tracks */}
        <div>
          <h4 className="font-semibold text-pearl-primary text-xs uppercase tracking-wider mb-3">
            Career Pathways
          </h4>
          <ul className="space-y-2">
            <li><Link href="/onboarding" className="hover:text-champagne transition-colors">Software Development</Link></li>
            <li><Link href="/onboarding" className="hover:text-champagne transition-colors">Data & AI Engineering</Link></li>
            <li><Link href="/onboarding" className="hover:text-champagne transition-colors">Cloud & DevOps</Link></li>
            <li><Link href="/onboarding" className="hover:text-champagne transition-colors">Cybersecurity</Link></li>
            <li><Link href="/onboarding" className="hover:text-champagne transition-colors">Systems & Embedded</Link></li>
          </ul>
        </div>

        {/* Core Product */}
        <div>
          <h4 className="font-semibold text-pearl-primary text-xs uppercase tracking-wider mb-3">
            Product Journey
          </h4>
          <ul className="space-y-2">
            <li><Link href="/assessment" className="hover:text-champagne transition-colors">Technical Assessment</Link></li>
            <li><Link href="/learning" className="hover:text-champagne transition-colors">Personalized Training</Link></li>
            <li><Link href="/projects" className="hover:text-champagne transition-colors">Production Projects</Link></li>
            <li><Link href="/interview" className="hover:text-champagne transition-colors">Voice Interview Simulation</Link></li>
            <li><Link href="/resume" className="hover:text-champagne transition-colors">ATS Resume Engine</Link></li>
            <li><Link href="/feedback" className="hover:text-champagne transition-colors">Rejection Analysis & Retraining</Link></li>
          </ul>
        </div>

        {/* Standards & Trust */}
        <div>
          <h4 className="font-semibold text-pearl-primary text-xs uppercase tracking-wider mb-3">
            Philosophy
          </h4>
          <p className="text-[11px] leading-relaxed text-pearl-muted">
            Designed for students, freshers, and career-changers seeking real technical mastery. No hollow promises, no generic AI templates—only verified skill evidence and targeted retraining.
          </p>
          <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[10px] text-pearl-subtle">
            <span>Prototype Version 1.0</span>
            <span className="text-champagne font-mono">Status: Active</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-6 border-t border-surface-border flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
        <p>© {new Date().getFullYear()} {PRODUCT_NAME}. All rights reserved.</p>
        <p className="text-pearl-subtle">Precision engineering for employment readiness.</p>
      </div>
    </footer>
  );
}
