"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Compass,
  Bell,
  Flame,
  Sparkles,
  Globe,
  ChevronDown,
  User,
  Settings,
  LogOut,
  Menu,
  X,
  ShieldCheck,
  Check,
} from "lucide-react";
import { PRODUCT_NAME, SUPPORTED_LANGUAGES } from "@/lib/constants";
import { useCareer } from "@/context/CareerContext";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export function Navbar({ onToggleSidebar }: { onToggleSidebar?: () => void }) {
  const pathname = usePathname();
  const {
    userProfile,
    selectedRole,
    notifications,
    unreadNotificationCount,
    markNotificationAsRead,
    clearAllNotifications,
    setLanguage,
  } = useCareer();

  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const currentLang = SUPPORTED_LANGUAGES.find((l) => l.code === userProfile.selectedLanguage) || SUPPORTED_LANGUAGES[0];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-surface-border bg-black/90 backdrop-blur-md">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left Section: Mobile Menu & Logo & Active Role */}
        <div className="flex items-center gap-4">
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-2 text-pearl-muted hover:text-pearl-primary rounded-lg hover:bg-navy-800 transition-colors"
            aria-label="Toggle Navigation"
          >
            <Menu className="w-5 h-5" />
          </button>

          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-navy-800 border border-champagne/40 flex items-center justify-center text-champagne shadow-gold-btn/20 transition-all group-hover:scale-105">
              <Sparkles className="w-4 h-4 text-champagne fill-champagne/20" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-lg tracking-tight text-pearl-primary group-hover:text-champagne transition-colors">
                {PRODUCT_NAME}
              </span>
            </div>
          </Link>

          {/* Active Target Career Track Pill */}
          <div className="hidden md:flex items-center gap-2 ml-4 pl-4 border-l border-white/10">
            <Link
              href="/onboarding"
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-navy-900/80 hover:bg-navy-800 border border-pearl/10 transition-colors text-xs text-pearl-muted hover:text-pearl-primary"
            >
              <Compass className="w-3.5 h-3.5 text-champagne" />
              <span>Track: <strong className="text-pearl-primary font-medium">{selectedRole.title}</strong></span>
              <ChevronDown className="w-3 h-3 text-pearl-muted ml-0.5" />
            </Link>
          </div>
        </div>

        {/* Right Section: Streak, XP, Language, Notifications, Profile */}
        <div className="flex items-center gap-2.5 sm:gap-3.5">
          {/* Gamified Streak & XP */}
          <div className="hidden sm:flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-navy-900 border border-orange-500/20 text-xs">
              <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400/30 animate-pulse" />
              <span className="font-semibold text-pearl-primary">{userProfile.streakDays}</span>
              <span className="text-[10px] text-pearl-muted uppercase tracking-wider">Days</span>
            </div>

            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-navy-900 border border-champagne/20 text-xs">
              <Sparkles className="w-3.5 h-3.5 text-champagne" />
              <span className="font-semibold text-champagne">{userProfile.xp}</span>
              <span className="text-[10px] text-pearl-muted uppercase tracking-wider">XP</span>
            </div>
          </div>

          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => {
                setIsLangOpen(!isLangOpen);
                setIsNotifOpen(false);
                setIsProfileOpen(false);
              }}
              className="flex items-center gap-1.5 p-2 sm:px-2.5 sm:py-1.5 rounded-lg bg-surface-subtle hover:bg-navy-800 border border-surface-border text-xs text-pearl-muted hover:text-pearl-primary transition-colors"
              title="Select Language"
            >
              <Globe className="w-3.5 h-3.5 text-champagne" />
              <span className="hidden sm:inline font-medium">{currentLang.nativeName}</span>
              <ChevronDown className="w-3 h-3 text-pearl-muted" />
            </button>

            {isLangOpen && (
              <div className="absolute right-0 mt-2 w-44 rounded-xl bg-surface-card border border-pearl/15 shadow-2xl py-1.5 z-50 animate-slide-up">
                <div className="px-3 py-1.5 text-[10px] uppercase tracking-wider font-semibold text-pearl-muted border-b border-white/5">
                  Multilingual Learning
                </div>
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code as any);
                      setIsLangOpen(false);
                    }}
                    className="w-full flex items-center justify-between px-3 py-2 text-xs text-left text-pearl-primary hover:bg-navy-800 transition-colors"
                  >
                    <span>{lang.nativeName} <span className="text-pearl-muted">({lang.name})</span></span>
                    {userProfile.selectedLanguage === lang.code && <Check className="w-3.5 h-3.5 text-champagne" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Notifications Bell */}
          <div className="relative">
            <button
              onClick={() => {
                setIsNotifOpen(!isNotifOpen);
                setIsLangOpen(false);
                setIsProfileOpen(false);
              }}
              className="relative p-2 rounded-lg bg-surface-subtle hover:bg-navy-800 border border-surface-border text-pearl-muted hover:text-pearl-primary transition-colors"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadNotificationCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose text-[9px] font-bold text-black ring-2 ring-black">
                  {unreadNotificationCount}
                </span>
              )}
            </button>

            {isNotifOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-xl bg-surface-card border border-pearl/15 shadow-2xl z-50 animate-slide-up overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 border-b border-surface-border bg-navy-950">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-pearl-primary">Notifications</span>
                    {unreadNotificationCount > 0 && (
                      <Badge variant="rose" size="sm">
                        {unreadNotificationCount} new
                      </Badge>
                    )}
                  </div>
                  {notifications.length > 0 && (
                    <button
                      onClick={clearAllNotifications}
                      className="text-[11px] text-pearl-muted hover:text-champagne transition-colors"
                    >
                      Clear all
                    </button>
                  )}
                </div>

                <div className="max-h-80 overflow-y-auto divide-y divide-white/5">
                  {notifications.length === 0 ? (
                    <div className="p-6 text-center text-xs text-pearl-muted">No notifications at this time.</div>
                  ) : (
                    notifications.map((notif) => (
                      <div
                        key={notif.id}
                        onClick={() => markNotificationAsRead(notif.id)}
                        className={`p-3.5 hover:bg-navy-800/60 transition-colors cursor-pointer ${
                          !notif.read ? "bg-navy-900/50" : ""
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-xs font-semibold text-pearl-primary">{notif.title}</h4>
                          <span className="text-[10px] text-pearl-muted whitespace-nowrap">{notif.timestamp}</span>
                        </div>
                        <p className="text-xs text-pearl-muted mt-1 leading-relaxed">{notif.message}</p>
                        {notif.link && (
                          <Link
                            href={notif.link}
                            onClick={() => setIsNotifOpen(false)}
                            className="inline-block mt-2 text-[11px] text-champagne hover:underline"
                          >
                            View details →
                          </Link>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setIsProfileOpen(!isProfileOpen);
                setIsLangOpen(false);
                setIsNotifOpen(false);
              }}
              className="flex items-center gap-2 p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg bg-navy-900 hover:bg-navy-800 border border-pearl/10 transition-colors"
            >
              <div className="w-6 h-6 rounded-full bg-champagne/20 border border-champagne/40 flex items-center justify-center text-[11px] font-bold text-champagne">
                {userProfile.name.charAt(0)}
              </div>
              <div className="hidden md:flex flex-col text-left">
                <span className="text-xs font-semibold text-pearl-primary leading-none">{userProfile.name}</span>
                <span className="text-[10px] text-champagne mt-0.5">{userProfile.readinessScore}% Ready</span>
              </div>
              <ChevronDown className="w-3 h-3 text-pearl-muted" />
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-56 rounded-xl bg-surface-card border border-pearl/15 shadow-2xl py-2 z-50 animate-slide-up">
                <div className="px-4 py-2 border-b border-surface-border">
                  <p className="text-xs font-semibold text-pearl-primary">{userProfile.name}</p>
                  <p className="text-[11px] text-pearl-muted truncate">{userProfile.email}</p>
                  <div className="mt-2 flex items-center justify-between text-[11px] bg-navy-950 p-1.5 rounded border border-white/5">
                    <span className="text-pearl-muted">Readiness:</span>
                    <span className="text-champagne font-bold">{userProfile.readinessScore}/100</span>
                  </div>
                </div>

                <div className="py-1">
                  <Link
                    href="/profile"
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2 text-xs text-pearl-primary hover:bg-navy-800 transition-colors"
                  >
                    <User className="w-4 h-4 text-pearl-muted" />
                    <span>Candidate Profile</span>
                  </Link>
                  <Link
                    href="/settings"
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2 text-xs text-pearl-primary hover:bg-navy-800 transition-colors"
                  >
                    <Settings className="w-4 h-4 text-pearl-muted" />
                    <span>Preferences & Settings</span>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
