"use client";

import HeroSection from "@/components/HeroSection";
import NavigationGrid from "@/components/NavigationGrid";
import XPBar from "@/components/XPBar";
import ProgressDashboard from "@/components/ProgressDashboard";
import { APP_VERSION } from "@/lib/version";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden relative">
      {/* Enhanced grid background */}
      <div className="fixed inset-0 z-0 opacity-50 bg-grid-pattern pointer-events-none" />

      {/* Subtle scanlines for retro feel */}
      <div className="fixed inset-0 z-0 scanlines opacity-30 pointer-events-none" />

      {/* Main content */}
      <div className="relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <XPBar />
        </div>
        <HeroSection />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <ProgressDashboard />
          <NavigationGrid />
        </div>
      </div>

      {/* Version footer */}
      <footer className="relative z-10 text-center py-4 text-xs text-muted-foreground/60">
        <span className="font-mono">{APP_VERSION}</span>
      </footer>
    </div>
  );
}
