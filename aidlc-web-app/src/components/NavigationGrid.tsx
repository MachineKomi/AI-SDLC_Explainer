'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    BookOpen,
    GitCompare,
    ArrowRightLeft,
    Target,
    Cpu,
    FolderOpen,
    BookMarked,
    FileText,
    Link2
} from 'lucide-react';

interface NavItem {
    id: string;
    title: string;
    description: string;
    href: string;
    icon: React.ElementType;
    shortcut: number;
}

const navItems: NavItem[] = [
    {
        id: 'lessons',
        title: 'Lessons',
        description: 'Learn AI-SDLC fundamentals',
        href: '/lessons',
        icon: BookOpen,
        shortcut: 1,
    },
    {
        id: 'compare',
        title: 'Compare',
        description: 'Waterfall vs Agile vs AI-SDLC',
        href: '/comparison',
        icon: GitCompare,
        shortcut: 2,
    },
    {
        id: 'transition',
        title: 'Transition',
        description: 'Agile → AI-SDLC mapping',
        href: '/transition',
        icon: ArrowRightLeft,
        shortcut: 3,
    },
    {
        id: 'practice',
        title: 'Practice',
        description: 'Quiz & Gatekeeper modes',
        href: '/practice',
        icon: Target,
        shortcut: 4,
    },
    {
        id: 'simulator',
        title: 'Simulator',
        description: 'Interactive workflow sim',
        href: '/simulator',
        icon: Cpu,
        shortcut: 5,
    },
    {
        id: 'artifacts',
        title: 'Artifacts',
        description: 'Explore aidlc-docs',
        href: '/artifacts',
        icon: FolderOpen,
        shortcut: 6,
    },
    {
        id: 'glossary',
        title: 'Glossary',
        description: 'AI-SDLC terminology',
        href: '/glossary',
        icon: BookMarked,
        shortcut: 7,
    },
    {
        id: 'reference',
        title: 'Reference',
        description: 'Quick reference card',
        href: '/reference',
        icon: FileText,
        shortcut: 8,
    },
    {
        id: 'sources',
        title: 'Sources',
        description: 'Official references',
        href: '/sources',
        icon: Link2,
        shortcut: 9,
    },
];

export default function NavigationGrid() {
    return (
        <section className="py-12">
            <div className="terminal-header mb-6">
                <div className="terminal-dot bg-red-500" />
                <div className="terminal-dot bg-yellow-500" />
                <div className="terminal-dot bg-green-500" />
                <span className="ml-2 text-sm font-mono text-foreground-muted">~/ai-dlc/modules</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {navItems.map((item, idx) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: idx * 0.05 }}
                    >
                        <Link href={item.href} className="block">
                            <div className="feature-tile group cursor-pointer h-full">
                                <div className="flex items-start gap-3">
                                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-accent-primary/10 border border-accent-primary/20 flex items-center justify-center group-hover:bg-accent-primary/20 group-hover:border-accent-primary/40 transition-all">
                                        <item.icon className="w-5 h-5 text-accent-primary" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                            <h3 className="font-semibold text-foreground group-hover:text-accent-primary transition-colors">
                                                {item.title}
                                            </h3>
                                            <span className="kbd">{item.shortcut}</span>
                                        </div>
                                        <p className="text-sm text-foreground-muted mt-1 line-clamp-1">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>

            {/* Keyboard shortcuts hint */}
            <div className="mt-8 flex items-center justify-center gap-6 text-sm text-foreground-muted font-mono">
                <span><span className="kbd">1-9</span> Navigate</span>
                <span><span className="kbd">t</span> Toggle theme</span>
                <span><span className="kbd">?</span> Help</span>
            </div>
        </section>
    );
}
