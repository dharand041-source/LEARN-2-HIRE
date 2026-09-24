import React from "react";
import Link from "next/link";
import { PRODUCT_NAME, PRODUCT_TAGLINE } from "@/lib/constants";
import { Sparkles, Shield, Compass, BookOpen, Briefcase, Award } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t border-border bg-white py-12 px-4 sm:px-6 lg:px-8 text-muted text-xs">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
        {/* Brand Col */}
        <div className="md:col-span-1 space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-night flex items-center justify-center text-imperial">
              <Sparkles className="w-3.5 h-3.5 text-imperial" />
            </div>
            <span className="font-display font-bold text-base text-night tracking-tight">{PRODUCT_NAME}</span>
          </div>
          <p className="text-muted text-xs leading-relaxed max-w-xs">
            {PRODUCT_TAGLINE}
          </p>
          <div className="pt-2 flex items-center gap-2 text-[11px] text-muted">
            <Shield className="w-3.5 h-3.5 text-imperial" />
            <span>Honest career progression platform</span>
          </div>
        </div>

        {/* Skill Tracks */}
        <div>
          <h4 className="font-bold text-night text-xs uppercase tracking-wider mb-3">
            Career Pathways
          </h4>
          <ul className="space-y-2">
            <li><Link href="/onboarding" className="hover:text-imperial transition-colors">Software Development</Link></li>
            <li><Link href="/onboarding" className="hover:text-imperial transition-colors">Data & AI Engineering</Link></li>
            <li><Link href="/onboarding" className="hover:text-imperial transition-colors">Cloud & DevOps</Link></li>
            <li><Link href="/onboarding" className="hover:text-imperial transition-colors">Cybersecurity</Link></li>
            <li><Link href="/onboarding" className="hover:text-imperial transition-colors">Systems & Embedded</Link></li>
          </ul>
        </div>

        {/* Core Product */}
        <div>
          <h4 className="font-bold text-night text-xs uppercase tracking-wider mb-3">
            Product Journey
          </h4>
          <ul className="space-y-2">
            <li><Link href="/assessment" className="hover:text-imperial transition-colors">Technical Assessment</Link></li>
            <li><Link href="/learning" className="hover:text-imperial transition-colors">Personalized Training</Link></li>
            <li><Link href="/projects" className="hover:text-imperial transition-colors">Production Projects</Link></li>
            <li><Link href="/interview" className="hover:text-imperial transition-colors">Voice Interview Simulation</Link></li>
            <li><Link href="/resume" className="hover:text-imperial transition-colors">ATS Resume Engine</Link></li>
            <li><Link href="/feedback" className="hover:text-imperial transition-colors">Rejection Analysis & Retraining</Link></li>
          </ul>
        </div>

        {/* Standards & Trust */}
        <div>
          <h4 className="font-bold text-night text-xs uppercase tracking-wider mb-3">
            Philosophy
          </h4>
          <p className="text-[11px] leading-relaxed text-muted">
            Designed for students, freshers, and career-changers seeking real technical mastery. No hollow promises, no generic AI templates—only verified skill evidence and targeted retraining.
          </p>
          <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-[10px] text-muted">
            <span>Prototype Version 1.0</span>
            <span className="text-imperial font-mono font-semibold">Status: Active</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
        <p>© {new Date().getFullYear()} {PRODUCT_NAME}. All rights reserved.</p>
        <p className="text-muted">Precision engineering for employment readiness.</p>
      </div>
    </footer>
  );
}
