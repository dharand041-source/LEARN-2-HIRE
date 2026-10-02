"use client";

import React, { useState } from "react";
import {
  Settings,
  User,
  Globe,
  Bell,
  RotateCcw,
  CheckCircle2,
  Save,
} from "lucide-react";
import { useCareer } from "@/context/CareerContext";
import { SUPPORTED_LANGUAGES } from "@/lib/constants";
import { CAREER_ROLES } from "@/data/careers";

export default function SettingsPage() {
  const { userProfile, updateUserProfile, selectRole, resetToDefaults } = useCareer();

  const [name, setName] = useState(userProfile.name);
  const [email, setEmail] = useState(userProfile.email);
  const [targetRoleId, setTargetRoleId] = useState("full-stack-developer");
  const [selectedLang, setSelectedLang] = useState(userProfile.selectedLanguage);
  const [isSaved, setIsSaved] = useState(false);

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

  return (
    <div className="space-y-6 animate-fade-in pb-12 max-w-4xl mx-auto">
      <div className="rounded-2xl bg-royal-maroon text-white border-4 border-black p-6 sm:p-8 shadow-editorial-md flex items-center justify-between">
        <div>
          <span className="px-2.5 py-0.5 rounded bg-black text-electric-coral text-xs font-mono font-black border border-black uppercase tracking-wider">
            Configuration
          </span>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight uppercase leading-snug mt-2">
            Account Preferences & Target Career
          </h1>
          <p className="text-xs sm:text-sm text-white/80 mt-1">
            Manage your candidate profile, target specialization track, and multilingual preferences.
          </p>
        </div>
      </div>

      <form onSubmit={handleSave} className="p-6 sm:p-8 bg-white border-2 border-black shadow-editorial-sm space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-black uppercase text-black block">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2.5 bg-paper border border-black text-xs font-bold focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-black uppercase text-black block">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2.5 bg-paper border border-black text-xs font-mono focus:outline-none"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-black uppercase text-black block">Target Specialization Role</label>
          <select
            value={targetRoleId}
            onChange={(e) => setTargetRoleId(e.target.value)}
            className="w-full p-2.5 bg-paper border border-black text-xs font-bold focus:outline-none"
          >
            {CAREER_ROLES.map((role) => (
              <option key={role.id} value={role.id}>
                {role.title} ({role.category})
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-black uppercase text-black block">Preferred Learning Language</label>
          <select
            value={selectedLang}
            onChange={(e) => setSelectedLang(e.target.value as any)}
            className="w-full p-2.5 bg-paper border border-black text-xs font-bold focus:outline-none"
          >
            {SUPPORTED_LANGUAGES.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.nativeName} ({lang.name})
              </option>
            ))}
          </select>
        </div>

        <div className="pt-4 border-t border-black/10 flex items-center justify-between">
          <button
            type="button"
            onClick={resetToDefaults}
            className="px-4 py-2 bg-white border border-black text-xs font-bold uppercase hover:bg-stone-100"
          >
            Reset Defaults
          </button>

          <button
            type="submit"
            className="px-6 py-2.5 bg-royal-maroon hover:bg-electric-coral hover:text-black text-white border-2 border-black font-extrabold text-xs uppercase tracking-wider transition-colors shadow-editorial-xs cursor-pointer"
          >
            {isSaved ? "Preferences Saved!" : "Save Preferences"}
          </button>
        </div>
      </form>
    </div>
  );
}
