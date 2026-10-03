"use client";

import React, { useState, memo } from "react";
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
  LogOut,
} from "lucide-react";
import { PRODUCT_NAME, SUPPORTED_LANGUAGES } from "@/lib/constants";
import { useCareer } from "@/context/CareerContext";
import { Badge } from "@/components/ui/Badge";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { ROUTES } from "@/lib/routes";

interface NavbarProps {
  sidebarOpen?: boolean;
  onToggleSidebar?: () => void;
}

function NavbarComponent({ sidebarOpen = true, onToggleSidebar }: NavbarProps) {
  const pathname = usePathname();
  const {
    userProfile,
    selectedRole,
    notifications,
    unreadNotificationCount,
    markNotificationAsRead,
    clearAllNotifications,
    setLanguage,
    isAuthenticated,
    signOut,
  } = useCareer();

  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const currentLang = SUPPORTED_LANGUAGES.find((l) => l.code === userProfile.selectedLanguage) || SUPPORTED_LANGUAGES[0];

  return (
    <header className="sticky top-0 z-40 w-full border-b-2 border-ink-black bg-paper-white text-ink-black">
      <div className="flex h-16 items-center justify-between px-3 sm:px-6 lg:px-8">
        {/* Left Section: Hamburger Menu & Logo & Active Track */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Hamburger menu button */}
          <button
            onClick={onToggleSidebar}
            className="p-1.5 sm:p-2 text-ink-black hover:text-primary-orange rounded-lg hover:bg-warm-cream transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-orange cursor-pointer"
            aria-expanded={sidebarOpen}
            aria-label={sidebarOpen ? "Close navigation" : "Open navigation"}
            title={sidebarOpen ? "Collapse navigation" : "Expand navigation"}
          >
            <Menu className="w-5 h-5 text-ink-black" />
          </button>

          <BrandLogo size="md" theme="light" href={ROUTES.app.dashboard} />

          {/* Active Target Career Track Pill */}
          <div className="hidden md:flex items-center gap-2 ml-4 pl-4 border-l border-ink-black/20">
            <Link
              href={ROUTES.app.career.discover}
              prefetch={true}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-warm-cream hover:bg-warm-cream/80 border border-ink-black/20 hover:border-primary-orange transition-colors text-xs text-ink-black"
            >
              <Compass className="w-3.5 h-3.5 text-primary-orange" />
              <span>Track: <strong className="text-primary-orange font-extrabold">{selectedRole.title}</strong></span>
              <ChevronDown className="w-3 h-3 text-ink-black/60 ml-0.5" />
            </Link>
          </div>
        </div>

        {/* Right Section: Streak, XP, Language, Notifications, Profile */}
        <div className="flex items-center gap-2.5 sm:gap-3.5">
          {/* Gamified Streak & XP */}
          <div className="hidden sm:flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-warm-cream border border-ink-black/20 text-xs text-ink-black">
              <Flame className="w-3.5 h-3.5 text-primary-orange fill-primary-orange" />
              <span className="font-extrabold text-ink-black">{userProfile.streakDays}</span>
              <span className="text-[10px] text-ink-black/70 uppercase tracking-wider font-bold">Days</span>
            </div>

            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-golden-yellow border-2 border-ink-black text-xs text-ink-black font-black shadow-editorial-xs">
              <Sparkles className="w-3.5 h-3.5 text-ink-black fill-ink-black" />
              <span className="font-extrabold text-ink-black font-mono">{userProfile.xp}</span>
              <span className="text-[10px] text-ink-black uppercase tracking-wider font-extrabold">XP</span>
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
              className="flex items-center gap-1.5 p-2 sm:px-2.5 sm:py-1.5 rounded-lg bg-warm-cream hover:bg-warm-cream/80 border border-ink-black/20 hover:border-primary-orange text-xs text-ink-black transition-colors cursor-pointer"
              title="Select Language"
            >
              <Globe className="w-3.5 h-3.5 text-primary-orange" />
              <span className="hidden sm:inline font-bold text-ink-black">{currentLang.nativeName}</span>
              <ChevronDown className="w-3 h-3 text-ink-black/70" />
            </button>

            {isLangOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-xl bg-paper-white border-2 border-ink-black shadow-editorial-md py-1.5 z-50 animate-slide-up">
                <div className="px-3 py-1.5 text-[10px] uppercase tracking-wider font-extrabold text-ink-black/70 border-b border-ink-black/15">
                  Multilingual Learning
                </div>
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code as any);
                      setIsLangOpen(false);
                    }}
                    className="w-full flex items-center justify-between px-3 py-2 text-xs text-left text-ink-black hover:bg-warm-cream transition-colors cursor-pointer font-medium"
                  >
                    <span>{lang.nativeName} <span className="text-ink-black/60">({lang.name})</span></span>
                    {userProfile.selectedLanguage === lang.code && <Check className="w-3.5 h-3.5 text-primary-orange stroke-[3]" />}
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
              className="relative p-2 rounded-lg bg-warm-cream hover:bg-warm-cream/80 border border-ink-black/20 hover:border-primary-orange text-ink-black transition-colors cursor-pointer"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4 text-ink-black" />
              {unreadNotificationCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary-orange text-[9px] font-black text-paper-white ring-2 ring-paper-white">
                  {unreadNotificationCount}
                </span>
              )}
            </button>

            {isNotifOpen && (
              <div className="absolute right-0 mt-2 w-[calc(100vw-1.5rem)] sm:w-96 max-w-sm rounded-xl bg-paper-white border-2 border-ink-black shadow-editorial-md z-50 animate-slide-up overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 border-b border-ink-black/15 bg-warm-cream">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-extrabold text-ink-black uppercase tracking-wider">Notifications</span>
                    {unreadNotificationCount > 0 && (
                      <Badge variant="coral" size="sm">
                        {unreadNotificationCount} new
                      </Badge>
                    )}
                  </div>
                  {notifications.length > 0 && (
                    <button
                      onClick={clearAllNotifications}
                      className="text-[11px] text-ink-black/70 hover:text-rose transition-colors font-bold cursor-pointer"
                    >
                      Clear all
                    </button>
                  )}
                </div>

                <div className="max-h-80 overflow-y-auto divide-y divide-ink-black/15">
                  {notifications.length === 0 ? (
                    <div className="p-6 text-center text-xs text-ink-black/70">No notifications at this time.</div>
                  ) : (
                    notifications.map((notif) => (
                      <div
                        key={notif.id}
                        onClick={() => markNotificationAsRead(notif.id)}
                        className={`p-3.5 hover:bg-warm-cream transition-colors cursor-pointer ${
                          !notif.read ? "bg-soft-pink/30" : ""
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-xs font-bold text-ink-black">{notif.title}</h4>
                          <span className="text-[10px] text-ink-black/60 whitespace-nowrap font-mono font-bold">{notif.timestamp}</span>
                        </div>
                        <p className="text-xs text-ink-black/70 mt-1 leading-relaxed">{notif.message}</p>
                        {notif.link && (
                          <Link
                            href={notif.link}
                            onClick={() => setIsNotifOpen(false)}
                            className="inline-block mt-2 text-[11px] text-primary-orange font-bold hover:underline"
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
              className="flex items-center gap-2 p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg bg-warm-cream hover:bg-warm-cream/80 border border-ink-black/20 hover:border-primary-orange transition-colors cursor-pointer text-ink-black"
            >
              <div className="w-6 h-6 rounded bg-primary-orange flex items-center justify-center text-[11px] font-extrabold text-paper-white">
                {userProfile.name.charAt(0)}
              </div>
              <div className="hidden md:flex flex-col text-left">
                <span className="text-xs font-extrabold text-ink-black leading-none">{userProfile.name}</span>
                <span className="text-[10px] text-primary-orange font-extrabold font-mono mt-0.5">{userProfile.readinessScore}% Ready</span>
              </div>
              <ChevronDown className="w-3 h-3 text-ink-black/70" />
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-56 rounded-xl bg-paper-white border-2 border-ink-black shadow-editorial-md py-2 z-50 animate-slide-up">
                <div className="px-4 py-2 border-b border-ink-black/15">
                  <p className="text-xs font-extrabold text-ink-black">{userProfile.name}</p>
                  <p className="text-[11px] text-ink-black/70 truncate">{userProfile.email}</p>
                  <div className="mt-2 flex items-center justify-between text-[11px] bg-warm-cream p-1.5 rounded border border-ink-black/15">
                    <span className="text-ink-black/70 font-bold">Readiness:</span>
                    <span className="text-primary-orange font-extrabold font-mono">{userProfile.readinessScore}/100</span>
                  </div>
                </div>

                <div className="py-1">
                  <Link
                    href={ROUTES.app.profile}
                    prefetch={true}
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2 text-xs text-ink-black font-medium hover:bg-warm-cream transition-colors"
                  >
                    <User className="w-4 h-4 text-ink-black/70" />
                    <span>Candidate Profile</span>
                  </Link>
                  <Link
                    href={ROUTES.app.settings}
                    prefetch={true}
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2 text-xs text-ink-black font-medium hover:bg-warm-cream transition-colors"
                  >
                    <Settings className="w-4 h-4 text-ink-black/70" />
                    <span>Preferences & Settings</span>
                  </Link>
                  <Link
                    href={ROUTES.app.notifications}
                    prefetch={true}
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2 text-xs text-ink-black font-medium hover:bg-warm-cream transition-colors"
                  >
                    <Bell className="w-4 h-4 text-ink-black/70" />
                    <span>All Notifications</span>
                  </Link>
                  {isAuthenticated ? (
                    <button
                      onClick={async () => {
                        setIsProfileOpen(false);
                        await signOut();
                      }}
                      className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-rose font-extrabold hover:bg-warm-cream transition-colors border-t border-ink-black/15 mt-1 text-left cursor-pointer"
                    >
                      <LogOut className="w-4 h-4 text-rose" />
                      <span>Sign Out</span>
                    </button>
                  ) : (
                    <Link
                      href={ROUTES.auth.login}
                      prefetch={true}
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-xs text-primary-orange font-extrabold hover:bg-warm-cream transition-colors border-t border-ink-black/15 mt-1"
                    >
                      <Sparkles className="w-4 h-4 text-primary-orange" />
                      <span>Sign In with Google</span>
                    </Link>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export const Navbar = memo(NavbarComponent);
