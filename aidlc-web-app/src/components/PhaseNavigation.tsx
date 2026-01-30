"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight, Home } from "lucide-react";
import { motion } from "framer-motion";

interface PhaseInfo {
    id: string;
    name: string;
    path: string;
    emoji: string;
}

const PHASES: PhaseInfo[] = [
    { id: "inception", name: "Inception", path: "/methodology/inception", emoji: "💡" },
    { id: "construction", name: "Construction", path: "/methodology/construction", emoji: "🔨" },
    { id: "operations", name: "Operations", path: "/methodology/operations", emoji: "🚀" },
];

interface PhaseNavigationProps {
    currentPhase: "inception" | "construction" | "operations";
}

export default function PhaseNavigation({ currentPhase }: PhaseNavigationProps) {
    const currentIndex = PHASES.findIndex(p => p.id === currentPhase);
    const prevPhase = currentIndex > 0 ? PHASES[currentIndex - 1] : null;
    const nextPhase = currentIndex < PHASES.length - 1 ? PHASES[currentIndex + 1] : null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-16 pt-8 border-t border-white/10"
        >
            {/* Progress Indicator */}
            <div className="flex justify-center items-center gap-2 mb-8">
                {PHASES.map((phase, index) => (
                    <div key={phase.id} className="flex items-center">
                        <Link
                            href={phase.path}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm transition-all ${phase.id === currentPhase
                                    ? "bg-accent-primary text-white font-medium"
                                    : "bg-white/5 text-foreground-muted hover:bg-white/10"
                                }`}
                        >
                            <span>{phase.emoji}</span>
                            <span className="hidden sm:inline">{phase.name}</span>
                        </Link>
                        {index < PHASES.length - 1 && (
                            <ChevronRight className="w-4 h-4 text-foreground-muted mx-1" />
                        )}
                    </div>
                ))}
            </div>

            {/* Navigation Links */}
            <div className="flex justify-between items-center gap-4">
                {prevPhase ? (
                    <Link
                        href={prevPhase.path}
                        className="group flex items-center gap-3 p-4 rounded-xl glass-card hover:border-accent-primary/50 transition-all flex-1 max-w-xs"
                    >
                        <ChevronLeft className="w-5 h-5 text-foreground-muted group-hover:text-accent-primary transition-colors" />
                        <div>
                            <div className="text-xs text-foreground-muted">Previous</div>
                            <div className="font-medium">{prevPhase.emoji} {prevPhase.name}</div>
                        </div>
                    </Link>
                ) : (
                    <div className="flex-1 max-w-xs" />
                )}

                <Link
                    href="/"
                    className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-foreground-muted hover:text-foreground hover:bg-white/5 transition-all"
                >
                    <Home className="w-4 h-4" />
                    <span className="text-sm">Home</span>
                </Link>

                {nextPhase ? (
                    <Link
                        href={nextPhase.path}
                        className="group flex items-center justify-end gap-3 p-4 rounded-xl glass-card hover:border-accent-primary/50 transition-all flex-1 max-w-xs text-right"
                    >
                        <div>
                            <div className="text-xs text-foreground-muted">Next</div>
                            <div className="font-medium">{nextPhase.emoji} {nextPhase.name}</div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-foreground-muted group-hover:text-accent-primary transition-colors" />
                    </Link>
                ) : (
                    <Link
                        href="/gym"
                        className="group flex items-center justify-end gap-3 p-4 rounded-xl glass-card hover:border-accent-secondary/50 transition-all flex-1 max-w-xs text-right bg-accent-secondary/5 border-accent-secondary/20"
                    >
                        <div>
                            <div className="text-xs text-accent-secondary">Ready to Practice?</div>
                            <div className="font-medium">🏋️ The Gym</div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-accent-secondary group-hover:text-accent-secondary transition-colors" />
                    </Link>
                )}
            </div>
        </motion.div>
    );
}
