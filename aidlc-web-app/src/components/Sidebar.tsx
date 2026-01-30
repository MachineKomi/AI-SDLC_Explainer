"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, BookOpen, Calculator, BarChart3, Dumbbell, ChevronLeft, ChevronRight, Menu, X, Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";
import clsx from "clsx";
import { useTheme } from "@/context/ThemeContext";

export default function Sidebar() {
    const pathname = usePathname();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const { theme, toggleTheme } = useTheme();

    useEffect(() => setMounted(true), []);

    const links = [
        { href: "/", label: "Home", icon: Cpu },
        { href: "/methodology/inception", label: "Methodology", icon: BookOpen },
        { href: "/gym", label: "The Gym", icon: Dumbbell },
        { href: "/simulator", label: "Simulator", icon: Calculator },
        { href: "/comparison", label: "Comparison", icon: BarChart3 },
    ];

    if (!mounted) return null;

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
                animate={{ width: isCollapsed ? 80 : 280 }}
                className="hidden md:flex fixed top-0 left-0 bottom-0 z-40 bg-background-secondary/50 backdrop-blur-xl border-r border-white/5 flex-col"
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

                <div className="flex-1 py-8 px-4 flex flex-col gap-2">
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

                    {/* Collapse Toggle */}
                    <button
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className="w-full flex items-center justify-center p-2 rounded-lg text-foreground-muted hover:bg-white/5 transition-colors"
                    >
                        {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <div className="flex items-center gap-2"><ChevronLeft className="w-5 h-5" /> <span>Collapse</span></div>}
                    </button>
                </div>
            </motion.div>
        </>
    );
}

