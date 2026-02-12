'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useProgress } from '@/context/ProgressContext';
import { ACHIEVEMENTS, getAchievementProgress, getUnlockHint } from '@/lib/achievements';
import { 
    Trophy, Zap, BookOpen, Target, Cpu, ArrowRightLeft, 
    BookMarked, FileText, Sparkles, Lock, CheckCircle, Info
} from 'lucide-react';

/**
 * Completion thresholds for tracking activity progress.
 * These values should match the actual content counts.
 */
const THRESHOLDS = {
    TOTAL_LESSONS: 3,
    TOTAL_QUIZ_QUESTIONS: 26,
    QUIZ_PASS_THRESHOLD: 0.8,
    TOTAL_GATEKEEPER_SCENARIOS: 10,
    GATEKEEPER_PASS_THRESHOLD: 0.8,
    TOTAL_SIMULATOR_TYPES: 4,
    TOTAL_GYM_TASKS: 8,
    TOTAL_TRANSITION_ITEMS: 15,
    TOTAL_GLOSSARY_TERMS: 40,
};

/**
 * Represents progress for a single learning activity.
 */
interface ActivityProgress {
    id: string;
    name: string;
    icon: React.ElementType;
    current: number;
    total: number;
    href: string;
    color: string;
}

/**
 * ProgressDashboard - A comprehensive progress overview for the home page.
 * 
 * Displays:
 * - Overall completion percentage across all activities
 * - Individual activity cards with progress bars (Lessons, Quiz, Gatekeeper, Simulator, Transition, Glossary)
 * - Achievement showcase with unlocked/locked status
 * - Smart "Recommended" action based on learning progress
 * 
 * Features:
 * - Animated progress bars with framer-motion
 * - Clickable activity cards linking to respective sections
 * - Achievement grid with tooltips
 * - Responsive layout (2-column on desktop, stacked on mobile)
 * 
 * @example
 * ```tsx
 * // On home page
 * <ProgressDashboard />
 * ```
 */
export default function ProgressDashboard() {
    const { state } = useProgress();
    const achievementProgress = getAchievementProgress(state);

    // Calculate activity progress
    const activities: ActivityProgress[] = [
        {
            id: 'lessons',
            name: 'Lessons',
            icon: BookOpen,
            current: state.lessons.completed.length,
            total: THRESHOLDS.TOTAL_LESSONS,
            href: '/lessons',
            color: 'accent-primary',
        },
        {
            id: 'quiz',
            name: 'Quiz',
            icon: Target,
            current: Math.min(state.quiz.bestScore, THRESHOLDS.TOTAL_QUIZ_QUESTIONS),
            total: Math.ceil(THRESHOLDS.TOTAL_QUIZ_QUESTIONS * THRESHOLDS.QUIZ_PASS_THRESHOLD),
            href: '/practice/quiz',
            color: 'accent-secondary',
        },
        {
            id: 'gatekeeper',
            name: 'Gatekeeper',
            icon: Target,
            current: Math.min(state.gatekeeper.bestScore, THRESHOLDS.TOTAL_GATEKEEPER_SCENARIOS),
            total: Math.ceil(THRESHOLDS.TOTAL_GATEKEEPER_SCENARIOS * THRESHOLDS.GATEKEEPER_PASS_THRESHOLD),
            href: '/practice/gatekeeper',
            color: 'status-success',
        },
        {
            id: 'simulator',
            name: 'Simulator',
            icon: Cpu,
            current: state.simulator.requestTypesExplored.length,
            total: THRESHOLDS.TOTAL_SIMULATOR_TYPES,
            href: '/simulator',
            color: 'accent-warning',
        },
        {
            id: 'transition',
            name: 'Transition',
            icon: ArrowRightLeft,
            current: state.transition?.checklist?.length || 0,
            total: THRESHOLDS.TOTAL_TRANSITION_ITEMS,
            href: '/transition',
            color: 'accent-primary',
        },
        {
            id: 'glossary',
            name: 'Glossary',
            icon: BookMarked,
            current: state.glossary?.viewedTerms?.length || 0,
            total: THRESHOLDS.TOTAL_GLOSSARY_TERMS,
            href: '/glossary',
            color: 'accent-secondary',
        },
    ];

    // Find next recommended activity
    const getNextRecommended = () => {
        // Priority: Lessons > Quiz > Gatekeeper > Simulator > Transition
        if (state.lessons.completed.length < THRESHOLDS.TOTAL_LESSONS) {
            return { name: 'Continue Lessons', href: '/lessons', icon: BookOpen };
        }
        if (state.quiz.bestScore < Math.ceil(THRESHOLDS.TOTAL_QUIZ_QUESTIONS * THRESHOLDS.QUIZ_PASS_THRESHOLD)) {
            return { name: 'Take the Quiz', href: '/practice/quiz', icon: Target };
        }
        if (state.gatekeeper.bestScore < Math.ceil(THRESHOLDS.TOTAL_GATEKEEPER_SCENARIOS * THRESHOLDS.GATEKEEPER_PASS_THRESHOLD)) {
            return { name: 'Try Gatekeeper', href: '/practice/gatekeeper', icon: Target };
        }
        if (state.simulator.requestTypesExplored.length < THRESHOLDS.TOTAL_SIMULATOR_TYPES) {
            return { name: 'Explore Simulator', href: '/simulator', icon: Cpu };
        }
        if ((state.transition?.checklist?.length || 0) < THRESHOLDS.TOTAL_TRANSITION_ITEMS) {
            return { name: 'Complete Transition', href: '/transition', icon: ArrowRightLeft };
        }
        return null;
    };

    const nextAction = getNextRecommended();

    // Calculate overall completion
    const completedActivities = activities.filter(a => a.current >= a.total).length;
    const overallProgress = Math.round((completedActivities / activities.length) * 100);

    return (
        <section className="py-8">
            <div className="terminal-header mb-6">
                <div className="terminal-dot bg-red-500" />
                <div className="terminal-dot bg-yellow-500" />
                <div className="terminal-dot bg-green-500" />
                <span className="ml-2 text-sm font-mono text-foreground-muted">~/ai-dlc/progress</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Overall Progress Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="lg:col-span-2 glass-card rounded-xl p-6"
                >
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-lg flex items-center gap-2">
                            <Trophy className="w-5 h-5 text-accent-secondary" />
                            Learning Progress
                        </h3>
                        <span className="text-2xl font-bold text-gradient">{overallProgress}%</span>
                    </div>

                    {/* Activity Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {activities.map((activity, idx) => {
                            const progress = Math.round((activity.current / activity.total) * 100);
                            const isComplete = activity.current >= activity.total;
                            
                            return (
                                <Link key={activity.id} href={activity.href}>
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.3, delay: idx * 0.05 }}
                                        className={`p-3 rounded-lg border transition-all hover:scale-[1.02] cursor-pointer ${
                                            isComplete 
                                                ? 'bg-status-success/10 border-status-success/30' 
                                                : 'bg-background-tertiary/50 border-white/5 hover:border-white/10'
                                        }`}
                                    >
                                        <div className="flex items-center justify-between mb-2">
                                            <activity.icon className={`w-4 h-4 ${isComplete ? 'text-status-success' : 'text-foreground-muted'}`} />
                                            {isComplete ? (
                                                <CheckCircle className="w-4 h-4 text-status-success" />
                                            ) : (
                                                <span className="text-xs font-mono text-foreground-muted">{progress}%</span>
                                            )}
                                        </div>
                                        <p className={`text-sm font-medium ${isComplete ? 'text-status-success' : 'text-foreground'}`}>
                                            {activity.name}
                                        </p>
                                        <p className="text-xs text-foreground-muted">
                                            {activity.current}/{activity.total}
                                        </p>
                                        {/* Mini progress bar */}
                                        <div className="mt-2 h-1 bg-white/10 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${Math.min(progress, 100)}%` }}
                                                transition={{ duration: 0.5, delay: idx * 0.05 + 0.2 }}
                                                className={`h-full rounded-full ${isComplete ? 'bg-status-success' : 'bg-accent-secondary'}`}
                                            />
                                        </div>
                                    </motion.div>
                                </Link>
                            );
                        })}
                    </div>

                    {/* Next Action */}
                    {nextAction && (
                        <Link href={nextAction.href}>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="mt-4 p-3 rounded-lg bg-accent-primary/10 border border-accent-primary/30 flex items-center justify-between group hover:bg-accent-primary/20 transition-colors"
                            >
                                <div className="flex items-center gap-3">
                                    <Sparkles className="w-5 h-5 text-accent-primary" />
                                    <span className="font-medium">Recommended: {nextAction.name}</span>
                                </div>
                                <span className="text-accent-primary group-hover:translate-x-1 transition-transform">→</span>
                            </motion.div>
                        </Link>
                    )}
                </motion.div>

                {/* Achievements Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="glass-card rounded-xl p-6"
                >
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-lg flex items-center gap-2">
                            <Zap className="w-5 h-5 text-accent-primary" />
                            Achievements
                        </h3>
                        <span className="text-sm font-mono text-foreground-muted">
                            {achievementProgress.unlocked}/{achievementProgress.total}
                        </span>
                    </div>

                    {/* Achievement Grid */}
                    <div className="grid grid-cols-4 gap-2">
                        {ACHIEVEMENTS.map((achievement, idx) => {
                            const isUnlocked = state.achievements.includes(achievement.id);
                            
                            return (
                                <motion.div
                                    key={achievement.id}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.2, delay: idx * 0.05 }}
                                    className={`relative aspect-square rounded-lg flex items-center justify-center text-2xl transition-all group ${
                                        isUnlocked 
                                            ? 'bg-accent-primary/20 border border-accent-primary/30' 
                                            : 'bg-background-tertiary/50 border border-white/5 grayscale opacity-50 hover:opacity-75'
                                    }`}
                                    title={isUnlocked ? `${achievement.name}: ${achievement.description}` : getUnlockHint(achievement.id)}
                                >
                                    {isUnlocked ? (
                                        <span>{achievement.icon}</span>
                                    ) : (
                                        <Lock className="w-4 h-4 text-foreground-muted" />
                                    )}
                                    {/* Unlock hint tooltip for locked achievements */}
                                    {!isUnlocked && (
                                        <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1.5 bg-background-tertiary border border-white/10 rounded-md text-xs text-accent-primary opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 shadow-xl transition-opacity flex items-center gap-1">
                                            <Info className="w-3 h-3 flex-shrink-0" />
                                            {getUnlockHint(achievement.id)}
                                        </div>
                                    )}
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Achievement Progress Bar */}
                    <div className="mt-4">
                        <div className="flex justify-between text-xs text-foreground-muted mb-1">
                            <span>Progress</span>
                            <span>{achievementProgress.percentage}%</span>
                        </div>
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${achievementProgress.percentage}%` }}
                                transition={{ duration: 0.8, delay: 0.3 }}
                                className="h-full rounded-full bg-gradient-to-r from-accent-primary to-accent-secondary"
                            />
                        </div>
                    </div>

                    {/* Next Achievement Hint */}
                    {achievementProgress.unlocked < achievementProgress.total && (
                        <div className="mt-4 text-xs text-foreground-muted">
                            <span className="text-accent-primary">Next:</span>{' '}
                            {ACHIEVEMENTS.find(a => !state.achievements.includes(a.id))?.description}
                        </div>
                    )}
                </motion.div>
            </div>
        </section>
    );
}
