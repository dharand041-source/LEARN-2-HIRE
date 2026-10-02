"use client";

import React, { useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { MobileNav } from "@/components/layout/MobileNav";
import { ROUTES } from "@/lib/routes";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  const handleToggleSidebar = useCallback(() => {
    setSidebarOpen((prev) => !prev);
  }, []);

  const handleCloseSidebar = useCallback(() => {
    setSidebarOpen(false);
  }, []);

  // Close sidebar immediately upon any route change
  React.useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  // Full-focus pages (active test runner or interview session or auth views)
  const isFocusMode =
    (pathname.startsWith("/app/assessments/") && !pathname.includes("/results")) ||
    (pathname.startsWith("/assessment") && pathname !== "/assessment/results");
  const isInterviewSession =
    pathname === "/app/interview/mock" ||
    pathname === "/interview/session";
  const isAuthPage =
    pathname === "/login" ||
    pathname === "/signup" ||
    pathname.startsWith("/auth");

  // Public Marketing & informational pages that have their own navigation
  const isPublicMarketingPage =
    pathname === "/" ||
    pathname === "/how-it-works" ||
    pathname === "/careers" ||
    pathname === "/resources" ||
    pathname === "/about";

  if (isFocusMode || isInterviewSession || isAuthPage || isPublicMarketingPage) {
    return (
      <div className="min-h-screen bg-white text-black flex flex-col">
        <main className="flex-1 min-w-0">{children}</main>
      </div>
    );
  }

  const isDashboard =
    pathname === ROUTES.app.dashboard ||
    pathname === "/dashboard";

  return (
    <div className="min-h-screen bg-white text-black flex flex-col">
      <Navbar
        sidebarOpen={sidebarOpen}
        onToggleSidebar={handleToggleSidebar}
      />
      <div className="flex flex-1 relative min-h-0 bg-white">
        <Sidebar isOpen={sidebarOpen} onClose={handleCloseSidebar} />
        <main className="flex-1 min-w-0 flex flex-col bg-white w-full">
          <div
            className={
              isDashboard
                ? "flex-1 min-w-0 flex flex-col pb-16 lg:pb-0 bg-white w-full"
                : "flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto pb-20 lg:pb-8"
            }
          >
            {children}
          </div>
        </main>
      </div>
      <MobileNav />
    </div>
  );
}
