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
  Menu,
  Check,
} from "lucide-react";
import { PRODUCT_NAME, SUPPORTED_LANGUAGES } from "@/lib/constants";
import { useCareer } from "@/context/CareerContext";
import { Badge } from "@/components/ui/Badge";

interface NavbarProps {
  sidebarOpen?: boolean;
  onToggleSidebar?: () => void;
}

export function Navbar({ sidebarOpen = true, onToggleSidebar }: NavbarProps) {
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
    <header className="sticky top-0 z-40 w-full border-b border-surface-border bg-white backdrop-blur-md">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left Section: Hamburger Menu & Logo & Active Track */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Hamburger menu button */}
          <button
            onClick={onToggleSidebar}
            className="p-2 text-night hover:text-imperial rounded-lg hover:bg-surface-subtle transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-imperial focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            aria-label={sidebarOpen ? "Close navigation" : "Open navigation"}
            title={sidebarOpen ? "Collapse navigation" : "Expand navigation"}
          >
            <Menu className="w-5 h-5 text-night" />
          </button>

          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-night flex items-center justify-center text-white shadow-sm transition-all group-hover:scale-105">
              <Sparkles className="w-4 h-4 text-imperial fill-imperial" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-extrabold text-lg tracking-tight text-night group-hover:text-imperial transition-colors">
                {PRODUCT_NAME}
              </span>
            </div>
          </Link>

          {/* Active Target Career Track Pill */}
          <div className="hidden md:flex items-center gap-2 ml-4 pl-4 border-l border-surface-border">
            <Link
              href="/onboarding"
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-surface-subtle hover:bg-white border border-surface-border transition-colors text-xs text-night-muted hover:text-night"
            >
              <Compass className="w-3.5 h-3.5 text-imperial" />
              <span>Track: <strong className="text-night font-semibold">{selectedRole.title}</strong></span>
              <ChevronDown className="w-3 h-3 text-night-muted ml-0.5" />
            </Link>
          </div>
        </div>

        {/* Right Section: Streak, XP, Language, Notifications, Profile */}
        <div className="flex items-center gap-2.5 sm:gap-3.5">
          {/* Gamified Streak & XP */}
          <div className="hidden sm:flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-subtle border border-surface-border text-xs">
              <Flame className="w-3.5 h-3.5 text-imperial fill-imperial animate-pulse" />
              <span className="font-bold text-night">{userProfile.streakDays}</span>
              <span className="text-[10px] text-night-muted uppercase tracking-wider font-semibold">Days</span>
            </div>

            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-imperial-50 border border-imperial-200 text-xs">
              <Sparkles className="w-3.5 h-3.5 text-imperial" />
              <span className="font-bold text-imperial font-mono">{userProfile.xp}</span>
              <span className="text-[10px] text-imperial uppercase tracking-wider font-semibold">XP</span>
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
              className="flex items-center gap-1.5 p-2 sm:px-2.5 sm:py-1.5 rounded-lg bg-surface-subtle hover:bg-white border border-surface-border text-xs text-night-muted hover:text-night transition-colors"
              title="Select Language"
            >
              <Globe className="w-3.5 h-3.5 text-imperial" />
              <span className="hidden sm:inline font-semibold text-night">{currentLang.nativeName}</span>
              <ChevronDown className="w-3 h-3 text-night-muted" />
            </button>

            {isLangOpen && (
              <div className="absolute right-0 mt-2 w-44 rounded-xl bg-white border border-surface-border shadow-xl py-1.5 z-50 animate-slide-up">
                <div className="px-3 py-1.5 text-[10px] uppercase tracking-wider font-bold text-night-muted border-b border-surface-border">
                  Multilingual Learning
                </div>
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code as any);
                      setIsLangOpen(false);
                    }}
                    className="w-full flex items-center justify-between px-3 py-2 text-xs text-left text-night hover:bg-imperial-50 hover:text-imperial transition-colors"
                  >
                    <span className="font-medium">{lang.nativeName} <span className="text-night-muted">({lang.name})</span></span>
                    {userProfile.selectedLanguage === lang.code && <Check className="w-3.5 h-3.5 text-imperial" />}
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
              className="relative p-2 rounded-lg bg-surface-subtle hover:bg-white border border-surface-border text-night hover:text-imperial transition-colors"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadNotificationCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-imperial text-[9px] font-bold text-white ring-2 ring-white">
                  {unreadNotificationCount}
                </span>
              )}
            </button>

            {isNotifOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-xl bg-white border border-surface-border shadow-2xl z-50 animate-slide-up overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 border-b border-surface-border bg-surface-subtle">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-night">Notifications</span>
                    {unreadNotificationCount > 0 && (
                      <Badge variant="imperial" size="sm">
                        {unreadNotificationCount} new
                      </Badge>
                    )}
                  </div>
                  {notifications.length > 0 && (
                    <button
                      onClick={clearAllNotifications}
                      className="text-[11px] text-night-muted hover:text-imperial transition-colors font-medium"
                    >
                      Clear all
                    </button>
                  )}
                </div>

                <div className="max-h-80 overflow-y-auto divide-y divide-surface-border">
                  {notifications.length === 0 ? (
                    <div className="p-6 text-center text-xs text-night-muted">No notifications at this time.</div>
                  ) : (
                    notifications.map((notif) => (
                      <div
                        key={notif.id}
                        onClick={() => markNotificationAsRead(notif.id)}
                        className={`p-3.5 hover:bg-surface-subtle transition-colors cursor-pointer ${
                          !notif.read ? "bg-imperial-50/50" : ""
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-xs font-bold text-night">{notif.title}</h4>
                          <span className="text-[10px] text-night-muted whitespace-nowrap font-mono">{notif.timestamp}</span>
                        </div>
                        <p className="text-xs text-night-muted mt-1 leading-relaxed">{notif.message}</p>
                        {notif.link && (
                          <Link
                            href={notif.link}
                            onClick={() => setIsNotifOpen(false)}
                            className="inline-block mt-2 text-[11px] text-imperial font-semibold hover:underline"
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
              className="flex items-center gap-2 p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg bg-surface-subtle hover:bg-white border border-surface-border transition-colors"
            >
              <div className="w-6 h-6 rounded-full bg-night flex items-center justify-center text-[11px] font-bold text-white">
                {userProfile.name.charAt(0)}
              </div>
              <div className="hidden md:flex flex-col text-left">
                <span className="text-xs font-bold text-night leading-none">{userProfile.name}</span>
                <span className="text-[10px] text-imperial font-semibold mt-0.5">{userProfile.readinessScore}% Ready</span>
              </div>
              <ChevronDown className="w-3 h-3 text-night-muted" />
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-56 rounded-xl bg-white border border-surface-border shadow-2xl py-2 z-50 animate-slide-up">
                <div className="px-4 py-2 border-b border-surface-border">
                  <p className="text-xs font-bold text-night">{userProfile.name}</p>
                  <p className="text-[11px] text-night-muted truncate">{userProfile.email}</p>
                  <div className="mt-2 flex items-center justify-between text-[11px] bg-surface-subtle p-1.5 rounded border border-surface-border">
                    <span className="text-night-muted font-medium">Readiness:</span>
                    <span className="text-imperial font-bold font-mono">{userProfile.readinessScore}/100</span>
                  </div>
                </div>

                <div className="py-1">
                  <Link
                    href="/profile"
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2 text-xs text-night hover:bg-surface-subtle hover:text-imperial transition-colors"
                  >
                    <User className="w-4 h-4 text-night-muted" />
                    <span>Candidate Profile</span>
                  </Link>
                  <Link
                    href="/settings"
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2 text-xs text-night hover:bg-surface-subtle hover:text-imperial transition-colors"
                  >
                    <Settings className="w-4 h-4 text-night-muted" />
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
