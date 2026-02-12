'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
    Cpu, BookOpen, Dumbbell, ChevronLeft, ChevronRight,
    Menu,
    X,
    FolderOpen,
    ArrowRightLeft,
    GitCompare,
    Target,
    BookMarked,
    FileText,
    Link2,
    Home as HomeIcon,
    Moon,
    Sun,
    CheckCircle,
    Circle,
    Trophy
} from 'lucide-react';
import { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import { useTheme } from "@/context/ThemeContext";
import ThemePicker from "@/components/ThemePicker";
import MiniXPIndicator from "@/components/MiniXPIndicator";
import { useProgress } from "@/context/ProgressContext";

// Completion thresholds - centralized for easy updates
const COMPLETION_THRESHOLDS = {
    TOTAL_LESSONS: 3,           // From lessons.ts - 3 lessons
    TOTAL_QUIZ_QUESTIONS: 26,   // From quiz.ts - 26 questions
    QUIZ_PASS_THRESHOLD: 0.8,   // 80% to pass
    TOTAL_GATEKEEPER_SCENARIOS: 10, // From gates.ts - 10 scenarios
    GATEKEEPER_PASS_THRESHOLD: 0.8, // 80% to pass
    TOTAL_SIMULATOR_TYPES: 4,   // 4 request types
    TOTAL_GYM_TASKS: 8,         // 8 gym tasks
    TOTAL_TRANSITION_ITEMS: 15, // From transition.ts - 15 readiness items
};

export default function Sidebar() {
    const pathname = usePathname();
    // Start collapsed by default to avoid overlap
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [isPinned, setIsPinned] = useState(false); // User manually expanded
    const [isOpen, setIsOpen] = useState(false); // Mobile menu state
    const [mounted, setMounted] = useState(false);
    const { theme, toggleTheme } = useTheme();
    const { state } = useProgress();

    const sidebarRef = useRef<HTMLDivElement>(null);
    const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const sidebarWidth = 256; // 16rem

    useEffect(() => setMounted(true), []);

    // Handle mouse enter - expand on hover
    const handleMouseEnter = () => {
        if (hoverTimeoutRef.current) {
            clearTimeout(hoverTimeoutRef.current);
        }
        if (!isPinned) {
            setIsCollapsed(false);
        }
    };

    // Handle mouse leave - collapse if not pinned
    const handleMouseLeave = () => {
        if (!isPinned) {
            hoverTimeoutRef.current = setTimeout(() => {
                setIsCollapsed(true);
            }, 200); // Small delay to prevent flicker
        }
    };

    // Toggle pin state
    const handleTogglePin = () => {
        if (isPinned) {
            // Unpin and collapse
            setIsPinned(false);
            setIsCollapsed(true);
        } else {
            // Pin in expanded state
            setIsPinned(true);
            setIsCollapsed(false);
        }
    };

    const links = [
        { href: "/", label: "Home", icon: HomeIcon },
        { href: "/lessons", label: "Lessons", icon: BookOpen },
        { href: "/comparison", label: "Compare", icon: GitCompare },
        { href: "/transition", label: "Transition", icon: ArrowRightLeft },
        { href: "/practice", label: "Practice", icon: Target },
        { href: "/simulator", label: "Simulator", icon: Cpu },
        { href: "/gym", label: "The Gym", icon: Dumbbell },
        { href: "/artifacts", label: "Artifacts", icon: FolderOpen },
        { href: "/glossary", label: "Glossary", icon: BookMarked },
        { href: "/reference", label: "Reference", icon: FileText },
        { href: "/sources", label: "Sources", icon: Link2 },
        { href: "/progress", label: "Progress", icon: Trophy },
    ];

    // Check completion status helper - returns { completed: boolean, progress?: number }
    const getCompletionStatus = (href: string): { completed: boolean; progress?: number; inProgress?: boolean } => {
        if (!state) return { completed: false };

        switch (href) {
            case '/':
                // Home is never "completed"
                return { completed: false };
                
            case '/lessons':
                // All lessons completed
                const lessonsCompleted = state.lessons.completed.length;
                const lessonsTotal = COMPLETION_THRESHOLDS.TOTAL_LESSONS;
                return { 
                    completed: lessonsCompleted >= lessonsTotal,
                    progress: Math.round((lessonsCompleted / lessonsTotal) * 100),
                    inProgress: lessonsCompleted > 0 && lessonsCompleted < lessonsTotal
                };
                
            case '/practice':
                // Quiz 80%+ AND Gatekeeper 80%+
                const quizPassed = state.quiz.bestScore >= Math.ceil(COMPLETION_THRESHOLDS.TOTAL_QUIZ_QUESTIONS * COMPLETION_THRESHOLDS.QUIZ_PASS_THRESHOLD);
                const gatekeeperPassed = state.gatekeeper.bestScore >= Math.ceil(COMPLETION_THRESHOLDS.TOTAL_GATEKEEPER_SCENARIOS * COMPLETION_THRESHOLDS.GATEKEEPER_PASS_THRESHOLD);
                const practiceProgress = ((quizPassed ? 50 : 0) + (gatekeeperPassed ? 50 : 0));
                return { 
                    completed: quizPassed && gatekeeperPassed,
                    progress: practiceProgress,
                    inProgress: (state.quiz.attempts > 0 || state.gatekeeper.attempts > 0) && !quizPassed && !gatekeeperPassed
                };
                
            case '/simulator':
                // All 4 request types explored
                const typesExplored = state.simulator.requestTypesExplored.length;
                const typesTotal = COMPLETION_THRESHOLDS.TOTAL_SIMULATOR_TYPES;
                return { 
                    completed: typesExplored >= typesTotal,
                    progress: Math.round((typesExplored / typesTotal) * 100),
                    inProgress: typesExplored > 0 && typesExplored < typesTotal
                };
                
            case '/gym':
                // All 8 tasks completed
                const gymCompleted = state.gym?.completedTasks?.length || 0;
                const gymTotal = COMPLETION_THRESHOLDS.TOTAL_GYM_TASKS;
                return { 
                    completed: gymCompleted >= gymTotal,
                    progress: Math.round((gymCompleted / gymTotal) * 100),
                    inProgress: gymCompleted > 0 && gymCompleted < gymTotal
                };
                
            case '/transition':
                // All checklist items checked
                const transitionCompleted = state.transition?.checklist?.length || 0;
                const transitionTotal = COMPLETION_THRESHOLDS.TOTAL_TRANSITION_ITEMS;
                return { 
                    completed: transitionCompleted >= transitionTotal,
                    progress: Math.round((transitionCompleted / transitionTotal) * 100),
                    inProgress: transitionCompleted > 0 && transitionCompleted < transitionTotal
                };
                
            // Reference sections - no completion tracking (informational)
            case '/comparison':
            case '/artifacts':
            case '/glossary':
            case '/reference':
            case '/sources':
                return { completed: false };
                
            default:
                return { completed: false };
        }
    };

    if (!mounted) return null;

    return (
        <>
            {/* Mobile Toggle */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-background-secondary border border-white/10 rounded-lg shadow-lg"
            >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Mobile Sidebar Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                        className="fixed inset-0 z-30 bg-black/50 lg:hidden"
                    />
                )}
            </AnimatePresence>

            {/* Mobile Sidebar */}
            <aside
                className={clsx(
                    "fixed inset-y-0 left-0 z-40 w-64 bg-background-secondary/95 backdrop-blur-md border-r border-white/10 transition-transform duration-300 lg:hidden",
                    isOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                <div className="p-6 h-full flex flex-col">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-8 h-8 rounded bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center">
                            <Cpu className="w-5 h-5 text-white" />
                        </div>
                        <h1 className="font-bold text-lg tracking-tight">
                            AI-SDLC <span className="text-accent-primary">Explainer</span>
                        </h1>
                    </div>

                    <nav className="space-y-1 flex-1 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/10">
                        {links.map((link) => {
                            const LinkIcon = link.icon;
                            const isActive = link.href === '/'
                                ? pathname === '/'
                                : pathname.startsWith(link.href);
                            const status = getCompletionStatus(link.href);

                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className={clsx(
                                        "flex items-center justify-between px-3 py-2 rounded-lg transition-all duration-200 group text-sm font-medium",
                                        isActive
                                            ? "bg-accent-primary/10 text-accent-primary border border-accent-primary/10"
                                            : "text-foreground-muted hover:text-foreground hover:bg-white/5 border border-transparent"
                                    )}
                                >
                                    <div className="flex items-center gap-3">
                                        <LinkIcon className={clsx(
                                            "w-4 h-4 transition-colors",
                                            isActive ? "text-accent-primary" : "text-foreground-muted group-hover:text-foreground"
                                        )} />
                                        {link.label}
                                    </div>
                                    {/* Completion indicator */}
                                    {status.completed ? (
                                        <CheckCircle className="w-4 h-4 text-status-success" />
                                    ) : status.inProgress ? (
                                        <div className="flex items-center gap-1.5">
                                            <span className="text-xs text-foreground-muted font-mono">{status.progress}%</span>
                                            <Circle className="w-3 h-3 text-accent-secondary" />
                                        </div>
                                    ) : null}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Mobile XP Indicator */}
                    <div className="pt-4 border-t border-white/10">
                        <MiniXPIndicator variant="sidebar" />
                    </div>
                </div>
            </aside>

            {/* Desktop Sidebar */}
            <motion.div
                ref={sidebarRef}
                animate={{ width: isCollapsed ? 80 : sidebarWidth }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="hidden lg:flex fixed top-0 left-0 bottom-0 z-40 bg-background-secondary/80 backdrop-blur-xl border-r border-white/5 flex-col overflow-hidden"
            >
                <div className="h-20 flex items-center px-6 border-b border-white/5 whitespace-nowrap">
                    <div className={clsx("flex items-center gap-3 transition-all duration-300", isCollapsed && "justify-center w-full")}>
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-primary to-accent-secondary flex-shrink-0 flex items-center justify-center">
                            <Cpu className="w-5 h-5 text-white" />
                        </div>
                        {!isCollapsed && (
                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="font-bold text-lg tracking-tight"
                            >
                                AI-SDLC <span className="text-accent-primary">Explainer</span>
                            </motion.span>
                        )}
                    </div>
                </div>

                <div className="flex-1 py-8 px-4 flex flex-col gap-2 overflow-y-auto overflow-x-hidden">
                    {links.map((link) => {
                        const isActive = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);
                        const status = getCompletionStatus(link.href);

                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={clsx(
                                    "flex items-center justify-between px-3 py-3 rounded-lg transition-all duration-200 group relative",
                                    isActive
                                        ? "bg-accent-primary/10 text-accent-primary"
                                        : "text-foreground-muted hover:text-foreground hover:bg-white/5",
                                    isCollapsed && "justify-center"
                                )}
                            >
                                <div className="flex items-center gap-3">
                                    <link.icon className={clsx("w-5 h-5 flex-shrink-0 transition-colors", isActive ? "text-accent-primary" : "group-hover:text-accent-primary")} />
                                    {!isCollapsed && <span className="font-medium whitespace-nowrap">{link.label}</span>}
                                </div>

                                {/* Completion indicator - expanded state */}
                                {!isCollapsed && status.completed && (
                                    <CheckCircle className="w-4 h-4 text-status-success" />
                                )}
                                {!isCollapsed && status.inProgress && (
                                    <div className="flex items-center gap-1.5">
                                        <span className="text-xs text-foreground-muted font-mono">{status.progress}%</span>
                                        <Circle className="w-3 h-3 text-accent-secondary" />
                                    </div>
                                )}

                                {/* Tooltip for collapsed state */}
                                {isCollapsed && (
                                    <div className="absolute left-full ml-4 px-3 py-1.5 bg-background-tertiary border border-white/10 rounded-md text-sm text-foreground opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 shadow-xl">
                                        {link.label}
                                        {status.completed && " ✓"}
                                        {status.inProgress && ` (${status.progress}%)`}
                                    </div>
                                )}
                            </Link>
                        );
                    })}
                </div>

                <div className="p-4 border-t border-white/5 space-y-3">
                    {/* XP Indicator */}
                    {isCollapsed ? (
                        <MiniXPIndicator variant="sidebar-collapsed" />
                    ) : (
                        <MiniXPIndicator variant="sidebar" />
                    )}

                    {/* Theme Picker - Desktop */}
                    <ThemePicker collapsed={isCollapsed} />

                    {/* Theme Toggle */}
                    <button
                        onClick={toggleTheme}
                        className={clsx(
                            "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-foreground-muted hover:text-foreground hover:bg-white/5 transition-colors",
                            isCollapsed && "justify-center"
                        )}
                        title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                    >
                        {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        {!isCollapsed && <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>}
                    </button>

                    {/* Pin/Unpin Toggle */}
                    <button
                        onClick={handleTogglePin}
                        className={clsx(
                            "w-full flex items-center justify-center gap-2 p-2 rounded-lg transition-colors",
                            isPinned
                                ? "text-accent-primary bg-accent-primary/10 hover:bg-accent-primary/20"
                                : "text-foreground-muted hover:bg-white/5"
                        )}
                        title={isPinned ? "Unpin sidebar (auto-collapse)" : "Pin sidebar open"}
                    >
                        {isCollapsed ? (
                            <ChevronRight className="w-5 h-5" />
                        ) : (
                            <div className="flex items-center gap-2">
                                <ChevronLeft className="w-5 h-5" />
                                <span>{isPinned ? "Unpin" : "Pin"}</span>
                            </div>
                        )}
                    </button>
                </div>
            </motion.div>

            {/* Spacer for content - prevents overlap on desktop */}
            <div
                className="hidden lg:block flex-shrink-0 transition-all duration-200"
                style={{ width: isPinned ? sidebarWidth : 80 }}
            />
        </>
    );
}

