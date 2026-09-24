"use client";

import React, { useState } from "react";
import {
  Settings,
  User,
  Globe,
  Bell,
  Shield,
  RotateCcw,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { useCareer } from "@/context/CareerContext";
import { SUPPORTED_LANGUAGES, CAREER_CATEGORIES } from "@/lib/constants";
import { CAREER_ROLES } from "@/data/careers";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export default function SettingsPage() {
  const { userProfile, updateUserProfile, selectRole, resetToDefaults } = useCareer();

  const [name, setName] = useState(userProfile.name);
  const [email, setEmail] = useState(userProfile.email);
  const [targetRoleId, setTargetRoleId] = useState("full-stack-dev");
  const [selectedLang, setSelectedLang] = useState(userProfile.selectedLanguage);
  const [isSaved, setIsSaved] = useState(false);
  const [isResetDone, setIsResetDone] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({
      name,
      email,
      selectedLanguage: selectedLang,
    });
    selectRole(targetRoleId);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleReset = () => {
    resetToDefaults();
    setIsResetDone(true);
    setTimeout(() => setIsResetDone(false), 2000);
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-4xl mx-auto">
      {/* Header */}
      <div className="border-b border-surface-border pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="champagne" size="sm">System Configuration</Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-pearl-primary tracking-tight">
            User Preferences & Target Configuration
          </h1>
          <p className="text-xs sm:text-sm text-pearl-muted mt-1">
            Configure your candidate profile, target specialization track, and multilingual learning preferences.
          </p>
        </div>

        <Button onClick={handleSave} size="sm" className="gap-1.5 font-semibold">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>{isSaved ? "Saved Successfully!" : "Save Preferences"}</span>
        </Button>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Candidate Profile Info */}
        <div className="p-6 rounded-2xl bg-surface-card border border-surface-border space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-pearl-primary flex items-center gap-2">
            <User className="w-4 h-4 text-champagne" />
            Candidate Identity
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <label className="text-pearl-muted font-medium">Candidate Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2.5 rounded-lg bg-black border border-white/10 text-xs text-pearl-primary focus:outline-none focus:border-champagne"
              />
            </div>

            <div className="space-y-1">
              <label className="text-pearl-muted font-medium">Contact Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2.5 rounded-lg bg-black border border-white/10 text-xs text-pearl-primary focus:outline-none focus:border-champagne"
              />
            </div>
          </div>
        </div>

        {/* Target Career Track */}
        <div className="p-6 rounded-2xl bg-surface-card border border-surface-border space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-pearl-primary flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-champagne" />
            Target Specialization Pathway
          </h2>

          <div className="space-y-2 text-xs">
            <label className="text-pearl-muted font-medium">Active Track</label>
            <select
              value={targetRoleId}
              onChange={(e) => setTargetRoleId(e.target.value)}
              className="w-full p-2.5 rounded-lg bg-black border border-white/10 text-xs text-pearl-primary focus:outline-none focus:border-champagne cursor-pointer"
            >
              {CAREER_ROLES.map((role) => (
                <option key={role.id} value={role.id} className="bg-navy-950 text-pearl-primary">
                  {role.category} — {role.title} ({role.averageSalary})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Multilingual Learning Preference */}
        <div className="p-6 rounded-2xl bg-surface-card border border-surface-border space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-pearl-primary flex items-center gap-2">
            <Globe className="w-4 h-4 text-champagne" />
            Language Preference for Learning Notes
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {SUPPORTED_LANGUAGES.map((lang) => (
              <div
                key={lang.code}
                onClick={() => setSelectedLang(lang.code as any)}
                className={`p-3 rounded-xl border transition-all cursor-pointer text-xs ${
                  selectedLang === lang.code
                    ? "bg-navy-800 border-champagne text-pearl-primary ring-1 ring-champagne/30"
                    : "bg-surface-subtle border-white/5 text-pearl-muted hover:border-pearl/20"
                }`}
              >
                <p className="font-bold text-sm text-champagne">{lang.nativeName}</p>
                <p className="text-[11px] text-pearl-muted mt-0.5">{lang.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Danger Zone: Reset State */}
        <div className="p-6 rounded-2xl bg-surface-card border border-rose/30 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-rose flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-rose" />
                Reset Prototype Data
              </h2>
              <p className="text-xs text-pearl-muted mt-0.5">
                Restores default candidate metrics, assessment states, projects, and applications.
              </p>
            </div>

            <Button
              type="button"
              variant="danger"
              size="sm"
              onClick={handleReset}
              className="text-xs"
            >
              {isResetDone ? "Data Reset!" : "Reset Demo Data"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
