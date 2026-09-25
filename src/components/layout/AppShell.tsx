"use client";

import React, { useState, useCallback, memo } from "react";
import { usePathname } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { MobileNav } from "@/components/layout/MobileNav";
import { Footer } from "@/components/layout/Footer";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();

  const handleToggleSidebar = useCallback(() => {
    setSidebarOpen((prev) => !prev);
  }, []);

  const handleCloseSidebar = useCallback(() => {
    setSidebarOpen(false);
  }, []);

  // Full-focus pages (e.g. active assessment or interview session or login)
  const isFocusMode = pathname.startsWith("/assessment") && pathname !== "/assessment/results";
  const isInterviewSession = pathname === "/interview/session";
  const isAuthPage = pathname === "/login" || pathname.startsWith("/auth");
  const isLanding = pathname === "/";

  if (isFocusMode || isInterviewSession || isAuthPage) {
    return (
      <div className="min-h-screen bg-white text-night flex flex-col">
        <main className="flex-1 min-w-0">{children}</main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-night flex flex-col">
      <Navbar
        sidebarOpen={sidebarOpen}
        onToggleSidebar={handleToggleSidebar}
      />
      <div className="flex flex-1 relative overflow-x-hidden min-h-0 bg-white">
        <Sidebar isOpen={sidebarOpen} onClose={handleCloseSidebar} />
        <main className="flex-1 min-w-0 flex flex-col transition-all duration-300 ease-out bg-white">
          <div
            className={
              isLanding
                ? "flex-1 min-w-0 flex flex-col pb-16 lg:pb-0 bg-white"
                : "flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto pb-20 lg:pb-8"
            }
          >
            {children}
          </div>
          <Footer />
        </main>
      </div>
      <MobileNav />
    </div>
  );
}
