"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
    Cpu, BookOpen, Calculator, BarChart3, Dumbbell, ChevronLeft, ChevronRight,
    Menu, X, Sun, Moon, ArrowRightLeft, Target, BookMarked, FileText, Link2, FolderOpen
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import { useTheme } from "@/context/ThemeContext";

export default function Sidebar() {
    const pathname = usePathname();
    // Start collapsed by default to avoid overlap
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [isPinned, setIsPinned] = useState(false); // User manually expanded
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const { theme, toggleTheme } = useTheme();
    const sidebarRef = useRef<HTMLDivElement>(null);
    const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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
        { href: "/", label: "Home", icon: Cpu },
        { href: "/lessons", label: "Lessons", icon: BookOpen },
        { href: "/methodology/inception", label: "Methodology", icon: FileText },
        { href: "/practice", label: "Practice", icon: Target },
        { href: "/gym", label: "The Gym", icon: Dumbbell },
        { href: "/simulator", label: "Simulator", icon: Calculator },
        { href: "/comparison", label: "Compare", icon: BarChart3 },
        { href: "/transition", label: "Transition", icon: ArrowRightLeft },
        { href: "/glossary", label: "Glossary", icon: BookMarked },
        { href: "/reference", label: "Reference", icon: FileText },
        { href: "/artifacts", label: "Artifacts", icon: FolderOpen },
        { href: "/sources", label: "Sources", icon: Link2 },
    ];

    if (!mounted) return null;

    const sidebarWidth = isCollapsed ? 80 : 280;

    return (
        <>
            {/* Mobile Toggle */}
            <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-white/5 px-4 h-16 flex items-center justify-between">
                <span className="font-bold text-lg tracking-tight">AI-SDLC <span className="text-accent-primary">Explainer</span></span>
                <div className="flex items-center gap-2">
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-lg text-foreground-muted hover:text-foreground hover:bg-white/5 transition-colors"
                        title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                    >
                        {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                    </button>
                    <button onClick={() => setIsMobileOpen(true)} className="p-2">
                        <Menu className="w-6 h-6 text-foreground-muted" />
                    </button>
                </div>
            </div>

            {/* Mobile Drawer */}
            <AnimatePresence>
                {isMobileOpen && (
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 20 }}
                        className="fixed inset-0 z-50 bg-background-secondary md:hidden flex flex-col"
                    >
                        <div className="flex justify-between p-4">
                            <button
                                onClick={toggleTheme}
                                className="flex items-center gap-2 px-3 py-2 rounded-lg text-foreground-muted hover:text-foreground hover:bg-white/5 transition-colors"
                            >
                                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                                <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
                            </button>
                            <button onClick={() => setIsMobileOpen(false)} className="p-2">
                                <X className="w-6 h-6 text-foreground-muted" />
                            </button>
                        </div>
                        <div className="flex flex-col gap-2 p-4">
                            {links.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsMobileOpen(false)}
                                    className={clsx(
                                        "flex items-center gap-4 p-4 rounded-xl text-lg font-medium transition-colors",
                                        pathname === link.href ? "bg-accent-primary/10 text-accent-primary" : "text-foreground-muted hover:bg-white/5"
                                    )}
                                >
                                    <link.icon className="w-6 h-6" />
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Desktop Sidebar */}
            <motion.div
                ref={sidebarRef}
                animate={{ width: sidebarWidth }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="hidden md:flex fixed top-0 left-0 bottom-0 z-40 bg-background-secondary/80 backdrop-blur-xl border-r border-white/5 flex-col"
            >
                <div className="h-20 flex items-center px-6 border-b border-white/5">
                    <div className={clsx("flex items-center gap-3 overflow-hidden transition-all", isCollapsed && "justify-center w-full")}>
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-primary to-accent-secondary flex-shrink-0 flex items-center justify-center">
                            <Cpu className="w-5 h-5 text-white" />
                        </div>
                        {!isCollapsed && (
                            <span className="font-bold text-lg tracking-tight whitespace-nowrap">
                                AI-SDLC <span className="text-accent-primary">Explainer</span>
                            </span>
                        )}
                    </div>
                </div>

                <div className="flex-1 py-8 px-4 flex flex-col gap-2 overflow-y-auto">
                    {links.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={clsx(
                                    "flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 group relative",
                                    isActive
                                        ? "bg-accent-primary/10 text-accent-primary"
                                        : "text-foreground-muted hover:text-foreground hover:bg-white/5",
                                    isCollapsed && "justify-center"
                                )}
                            >
                                <link.icon className={clsx("w-5 h-5 flex-shrink-0 transition-colors", isActive ? "text-accent-primary" : "group-hover:text-accent-primary")} />
                                {!isCollapsed && <span className="font-medium whitespace-nowrap">{link.label}</span>}

                                {/* Tooltip for collapsed state */}
                                {isCollapsed && (
                                    <div className="absolute left-full ml-4 px-3 py-1.5 bg-background-tertiary border border-white/10 rounded-md text-sm text-foreground opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50">
                                        {link.label}
                                    </div>
                                )}
                            </Link>
                        );
                    })}
                </div>

                <div className="p-4 border-t border-white/5 space-y-2">
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

            {/* Spacer for content - prevents overlap */}
            <div
                className="hidden md:block flex-shrink-0 transition-all duration-200"
                style={{ width: isPinned ? sidebarWidth : 80 }}
            />
        </>
    );
}

