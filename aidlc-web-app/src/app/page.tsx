"use client";

import HeroSection from "@/components/HeroSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <div className="fixed inset-0 z-0 opacity-20 bg-grid-pattern pointer-events-none" />
      <HeroSection />
    </div>
  );
}
