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
            <Badge variant="imperial" size="sm">System Configuration</Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-night tracking-tight">
            User Preferences & Target Configuration
          </h1>
          <p className="text-xs sm:text-sm text-night-muted mt-1">
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
        <div className="p-6 rounded-2xl bg-surface-card border border-surface-border space-y-4 shadow-sm">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-night flex items-center gap-2">
            <User className="w-4 h-4 text-imperial" />
            Candidate Identity
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1.5">
              <label className="text-night-muted font-medium text-xs">Candidate Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Candidate Name"
                className="w-full px-3.5 py-2.5 rounded-lg bg-surface-subtle/60 hover:bg-white focus:bg-white border border-surface-border text-xs text-night font-medium placeholder:text-night-muted/50 focus:outline-none focus:border-imperial focus:ring-2 focus:ring-imperial/10 transition-all shadow-sm"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-night-muted font-medium text-xs">Contact Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="candidate@example.com"
                className="w-full px-3.5 py-2.5 rounded-lg bg-surface-subtle/60 hover:bg-white focus:bg-white border border-surface-border text-xs text-night font-medium placeholder:text-night-muted/50 focus:outline-none focus:border-imperial focus:ring-2 focus:ring-imperial/10 transition-all shadow-sm"
              />
            </div>
          </div>
        </div>

        {/* Target Career Track */}
        <div className="p-6 rounded-2xl bg-surface-card border border-surface-border space-y-4 shadow-sm">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-night flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-imperial" />
            Target Specialization Pathway
          </h2>

          <div className="space-y-2 text-xs">
            <label className="text-night-muted font-medium">Active Track</label>
            <select
              value={targetRoleId}
              onChange={(e) => setTargetRoleId(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-surface-subtle/60 hover:bg-white focus:bg-white border border-surface-border text-xs text-night font-medium focus:outline-none focus:border-imperial focus:ring-2 focus:ring-imperial/10 shadow-sm cursor-pointer transition-all"
            >
              {CAREER_ROLES.map((role) => (
                <option key={role.id} value={role.id} className="bg-white text-night">
                  {role.category} — {role.title} ({role.averageSalary})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Multilingual Learning Preference */}
        <div className="p-6 rounded-2xl bg-surface-card border border-surface-border space-y-4 shadow-sm">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-night flex items-center gap-2">
            <Globe className="w-4 h-4 text-imperial" />
            Language Preference for Learning Notes
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {SUPPORTED_LANGUAGES.map((lang) => (
              <div
                key={lang.code}
                onClick={() => setSelectedLang(lang.code as any)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer text-xs ${
                  selectedLang === lang.code
                    ? "bg-white border-imperial text-night ring-2 ring-imperial/20 shadow-sm font-semibold"
                    : "bg-surface-subtle/60 border-surface-border text-night-muted hover:border-night/20 hover:bg-white"
                }`}
              >
                <p className="font-bold text-sm text-imperial">{lang.nativeName}</p>
                <p className="text-[11px] text-night-muted mt-0.5">{lang.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Danger Zone: Reset State */}
        <div className="p-6 rounded-2xl bg-surface-card border border-imperial/25 space-y-4 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-sm font-semibold text-imperial flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-imperial" />
                Reset Prototype Data
              </h2>
              <p className="text-xs text-night-muted mt-0.5">
                Restores default candidate metrics, assessment states, projects, and applications.
              </p>
            </div>

            <Button
              type="button"
              variant="danger"
              size="sm"
              onClick={handleReset}
              className="text-xs font-semibold"
            >
              {isResetDone ? "Data Reset!" : "Reset Demo Data"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
