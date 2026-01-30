'use client';

import { useProgress } from '@/context/ProgressContext';
import { motion } from 'framer-motion';
import { Zap, Trophy } from 'lucide-react';

// Level titles and thresholds
const LEVELS = [
    { level: 1, title: 'Novice', xpRequired: 0 },
    { level: 2, title: 'Apprentice', xpRequired: 100 },
    { level: 3, title: 'Practitioner', xpRequired: 250 },
    { level: 4, title: 'Specialist', xpRequired: 500 },
    { level: 5, title: 'Expert', xpRequired: 1000 },
    { level: 6, title: 'Master', xpRequired: 2000 },
    { level: 7, title: 'Grandmaster', xpRequired: 5000 },
];

function getLevelInfo(xp: number) {
    let currentLevel = LEVELS[0];
    let nextLevel = LEVELS[1];

    for (let i = LEVELS.length - 1; i >= 0; i--) {
        if (xp >= LEVELS[i].xpRequired) {
            currentLevel = LEVELS[i];
            nextLevel = LEVELS[i + 1] || LEVELS[i];
            break;
        }
    }

    const xpInCurrentLevel = xp - currentLevel.xpRequired;
    const xpForNextLevel = nextLevel.xpRequired - currentLevel.xpRequired;
    const progress = xpForNextLevel > 0 ? (xpInCurrentLevel / xpForNextLevel) * 100 : 100;

    return {
        level: currentLevel.level,
        title: currentLevel.title,
        xpToNext: nextLevel.xpRequired - xp,
        progress: Math.min(progress, 100),
        isMaxLevel: currentLevel.level === LEVELS[LEVELS.length - 1].level,
    };
}

export default function XPBar() {
    const { state } = useProgress();
    const levelInfo = getLevelInfo(state.xp);

    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="glass-card rounded-lg p-4 mb-8"
        >
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-accent-secondary/10 border border-accent-secondary/20 flex items-center justify-center">
                        <Trophy className="w-5 h-5 text-accent-secondary" />
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-mono text-foreground-muted">Level {levelInfo.level}:</span>
                            <span className="font-semibold text-gradient">{levelInfo.title}</span>
                        </div>
                        <p className="text-xs text-foreground-muted font-mono">
                            {levelInfo.isMaxLevel
                                ? 'Maximum level reached!'
                                : `${levelInfo.xpToNext} XP to next level`}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-accent-primary/10 border border-accent-primary/20">
                    <Zap className="w-4 h-4 text-accent-primary" />
                    <span className="font-mono font-semibold text-accent-primary">{state.xp} XP</span>
                </div>
            </div>

            {/* Progress bar */}
            <div className="relative h-2 bg-background-tertiary rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${levelInfo.progress}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className="absolute inset-y-0 left-0 rounded-full xp-bar-glow"
                    style={{
                        background: 'linear-gradient(90deg, rgb(var(--accent-primary)), rgb(var(--accent-secondary)))',
                    }}
                />
            </div>
        </motion.div>
    );
}
