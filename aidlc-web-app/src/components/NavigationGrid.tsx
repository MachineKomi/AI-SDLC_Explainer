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
    Link2,
    CheckCircle,
    Circle,
    Sparkles
} from 'lucide-react';
import { useProgress } from '@/context/ProgressContext';

// Completion thresholds - same as Sidebar.tsx
const COMPLETION_THRESHOLDS = {
    TOTAL_LESSONS: 3,
    TOTAL_QUIZ_QUESTIONS: 26,
    QUIZ_PASS_THRESHOLD: 0.8,
    TOTAL_GATEKEEPER_SCENARIOS: 10,
    GATEKEEPER_PASS_THRESHOLD: 0.8,
    TOTAL_SIMULATOR_TYPES: 4,
    TOTAL_GYM_TASKS: 8,
    TOTAL_TRANSITION_ITEMS: 15,
};

interface NavItem {
    id: string;
    title: string;
    description: string;
    href: string;
    icon: React.ElementType;
    shortcut: number;
    trackable: boolean; // Whether this section has completion tracking
}

const navItems: NavItem[] = [
    {
        id: 'lessons',
        title: 'Lessons',
        description: 'Learn AI-SDLC fundamentals',
        href: '/lessons',
        icon: BookOpen,
        shortcut: 1,
        trackable: true,
    },
    {
        id: 'compare',
        title: 'Compare',
        description: 'Waterfall vs Agile vs AI-SDLC',
        href: '/comparison',
        icon: GitCompare,
        shortcut: 2,
        trackable: false,
    },
    {
        id: 'transition',
        title: 'Transition',
        description: 'Agile → AI-SDLC mapping',
        href: '/transition',
        icon: ArrowRightLeft,
        shortcut: 3,
        trackable: true,
    },
    {
        id: 'practice',
        title: 'Practice',
        description: 'Quiz & Gatekeeper modes',
        href: '/practice',
        icon: Target,
        shortcut: 4,
        trackable: true,
    },
    {
        id: 'simulator',
        title: 'Simulator',
        description: 'Interactive workflow sim',
        href: '/simulator',
        icon: Cpu,
        shortcut: 5,
        trackable: true,
    },
    {
        id: 'artifacts',
        title: 'Artifacts',
        description: 'Explore aidlc-docs',
        href: '/artifacts',
        icon: FolderOpen,
        shortcut: 6,
        trackable: false,
    },
    {
        id: 'glossary',
        title: 'Glossary',
        description: 'AI-SDLC terminology',
        href: '/glossary',
        icon: BookMarked,
        shortcut: 7,
        trackable: false,
    },
    {
        id: 'reference',
        title: 'Reference',
        description: 'Quick reference card',
        href: '/reference',
        icon: FileText,
        shortcut: 8,
        trackable: false,
    },
    {
        id: 'sources',
        title: 'Sources',
        description: 'Official references',
        href: '/sources',
        icon: Link2,
        shortcut: 9,
        trackable: false,
    },
];

export default function NavigationGrid() {
    const { state } = useProgress();

    // Get completion status for a route - mirrors Sidebar logic
    const getCompletionStatus = (href: string): { completed: boolean; progress?: number; inProgress?: boolean } => {
        if (!state) return { completed: false };

        switch (href) {
            case '/lessons':
                const lessonsCompleted = state.lessons.completed.length;
                const lessonsTotal = COMPLETION_THRESHOLDS.TOTAL_LESSONS;
                return { 
                    completed: lessonsCompleted >= lessonsTotal,
                    progress: Math.round((lessonsCompleted / lessonsTotal) * 100),
                    inProgress: lessonsCompleted > 0 && lessonsCompleted < lessonsTotal
                };
                
            case '/practice':
                const quizPassed = state.quiz.bestScore >= Math.ceil(COMPLETION_THRESHOLDS.TOTAL_QUIZ_QUESTIONS * COMPLETION_THRESHOLDS.QUIZ_PASS_THRESHOLD);
                const gatekeeperPassed = state.gatekeeper.bestScore >= Math.ceil(COMPLETION_THRESHOLDS.TOTAL_GATEKEEPER_SCENARIOS * COMPLETION_THRESHOLDS.GATEKEEPER_PASS_THRESHOLD);
                const practiceProgress = ((quizPassed ? 50 : 0) + (gatekeeperPassed ? 50 : 0));
                return { 
                    completed: quizPassed && gatekeeperPassed,
                    progress: practiceProgress,
                    inProgress: (state.quiz.attempts > 0 || state.gatekeeper.attempts > 0) && !(quizPassed && gatekeeperPassed)
                };
                
            case '/simulator':
                const typesExplored = state.simulator.requestTypesExplored.length;
                const typesTotal = COMPLETION_THRESHOLDS.TOTAL_SIMULATOR_TYPES;
                return { 
                    completed: typesExplored >= typesTotal,
                    progress: Math.round((typesExplored / typesTotal) * 100),
                    inProgress: typesExplored > 0 && typesExplored < typesTotal
                };
                
            case '/transition':
                const transitionCompleted = state.transition?.checklist?.length || 0;
                const transitionTotal = COMPLETION_THRESHOLDS.TOTAL_TRANSITION_ITEMS;
                return { 
                    completed: transitionCompleted >= transitionTotal,
                    progress: Math.round((transitionCompleted / transitionTotal) * 100),
                    inProgress: transitionCompleted > 0 && transitionCompleted < transitionTotal
                };
                
            default:
                return { completed: false };
        }
    };

    // Find the next recommended section (first incomplete trackable item)
    const getNextRecommended = (): string | null => {
        for (const item of navItems) {
            if (item.trackable) {
                const status = getCompletionStatus(item.href);
                if (!status.completed) {
                    return item.id;
                }
            }
        }
        return null;
    };

    const nextRecommended = getNextRecommended();

    // Keyboard shortcuts are now handled globally in GlobalKeyboardShortcuts.tsx

    return (
        <section className="py-12">
            <div className="terminal-header mb-6">
                <div className="terminal-dot bg-red-500" />
                <div className="terminal-dot bg-yellow-500" />
                <div className="terminal-dot bg-green-500" />
                <span className="ml-2 text-sm font-mono text-foreground-muted">~/ai-dlc/modules</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {navItems.map((item, idx) => {
                    const status = item.trackable ? getCompletionStatus(item.href) : { completed: false };
                    const isRecommended = item.id === nextRecommended;

                    return (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: idx * 0.05 }}
                        >
                            <Link href={item.href} className="block">
                                <div className={`feature-tile group cursor-pointer h-full relative ${
                                    status.completed ? 'ring-1 ring-status-success/30' : ''
                                } ${isRecommended ? 'ring-2 ring-accent-primary/50' : ''}`}>
                                    {/* Recommended badge */}
                                    {isRecommended && (
                                        <div className="absolute -top-2 -right-2 flex items-center gap-1 px-2 py-0.5 bg-accent-primary text-white text-xs font-medium rounded-full shadow-lg">
                                            <Sparkles className="w-3 h-3" />
                                            Next
                                        </div>
                                    )}
                                    
                                    {/* Completed badge */}
                                    {status.completed && (
                                        <div className="absolute -top-2 -right-2 flex items-center gap-1 px-2 py-0.5 bg-status-success text-white text-xs font-medium rounded-full shadow-lg">
                                            <CheckCircle className="w-3 h-3" />
                                            Done
                                        </div>
                                    )}

                                    <div className="flex items-start gap-3">
                                        <div className={`flex-shrink-0 w-10 h-10 rounded-lg border flex items-center justify-center transition-all ${
                                            status.completed 
                                                ? 'bg-status-success/10 border-status-success/30 group-hover:bg-status-success/20' 
                                                : 'bg-accent-primary/10 border-accent-primary/20 group-hover:bg-accent-primary/20 group-hover:border-accent-primary/40'
                                        }`}>
                                            <item.icon className={`w-5 h-5 ${status.completed ? 'text-status-success' : 'text-accent-primary'}`} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2">
                                                <h3 className={`font-semibold transition-colors ${
                                                    status.completed 
                                                        ? 'text-status-success' 
                                                        : 'text-foreground group-hover:text-accent-primary'
                                                }`}>
                                                    {item.title}
                                                </h3>
                                                <span className="kbd">{item.shortcut}</span>
                                            </div>
                                            <p className="text-sm text-foreground-muted mt-1 line-clamp-1">
                                                {item.description}
                                            </p>
                                            
                                            {/* Progress indicator for trackable items */}
                                            {item.trackable && !status.completed && (
                                                <div className="mt-2 flex items-center gap-2">
                                                    {status.inProgress ? (
                                                        <>
                                                            <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                                                                <motion.div 
                                                                    className="h-full bg-accent-secondary rounded-full"
                                                                    initial={{ width: 0 }}
                                                                    animate={{ width: `${status.progress}%` }}
                                                                    transition={{ duration: 0.5, delay: idx * 0.05 + 0.3 }}
                                                                />
                                                            </div>
                                                            <span className="text-xs text-foreground-muted font-mono">{status.progress}%</span>
                                                        </>
                                                    ) : (
                                                        <div className="flex items-center gap-1.5 text-xs text-foreground-muted">
                                                            <Circle className="w-3 h-3" />
                                                            <span>Not started</span>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    );
                })}
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
