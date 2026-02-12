'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useProgress } from '@/context/ProgressContext';
import { ACHIEVEMENTS, getAchievementProgress, getUnlockHint } from '@/lib/achievements';
import { getProgressToNextLevel, getXpToNextLevel, LEVEL_THRESHOLDS } from '@/lib/xp';
import { toast } from 'sonner';
import {
  Trophy, Zap, BookOpen, Target, Cpu, ArrowRightLeft,
  BookMarked, Sparkles, Lock, CheckCircle, RotateCcw,
  AlertTriangle, Info,
} from 'lucide-react';

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

interface ActivityProgress {
  id: string;
  name: string;
  icon: React.ElementType;
  current: number;
  total: number;
  href: string;
}

export default function ProgressPage() {
  const router = useRouter();
  const { state, resetProgress } = useProgress();
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const achievementProgress = getAchievementProgress(state);
  const progressToNext = getProgressToNextLevel(state.xp);
  const { xpToNext, nextThreshold } = getXpToNextLevel(state.xp);
  const isMaxLevel = state.level >= LEVEL_THRESHOLDS.length;

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') router.push('/');
  }, [router]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const handleReset = () => {
    resetProgress();
    setShowResetConfirm(false);
    toast.success('Progress reset to zero');
  };

  const activities: ActivityProgress[] = [
    { id: 'lessons', name: 'Lessons', icon: BookOpen, current: state.lessons.completed.length, total: THRESHOLDS.TOTAL_LESSONS, href: '/lessons' },
    { id: 'quiz', name: 'Quiz', icon: Target, current: Math.min(state.quiz.bestScore, THRESHOLDS.TOTAL_QUIZ_QUESTIONS), total: Math.ceil(THRESHOLDS.TOTAL_QUIZ_QUESTIONS * THRESHOLDS.QUIZ_PASS_THRESHOLD), href: '/practice/quiz' },
    { id: 'gatekeeper', name: 'Gatekeeper', icon: Target, current: Math.min(state.gatekeeper.bestScore, THRESHOLDS.TOTAL_GATEKEEPER_SCENARIOS), total: Math.ceil(THRESHOLDS.TOTAL_GATEKEEPER_SCENARIOS * THRESHOLDS.GATEKEEPER_PASS_THRESHOLD), href: '/practice/gatekeeper' },
    { id: 'simulator', name: 'Simulator', icon: Cpu, current: state.simulator.requestTypesExplored.length, total: THRESHOLDS.TOTAL_SIMULATOR_TYPES, href: '/simulator' },
    { id: 'transition', name: 'Transition', icon: ArrowRightLeft, current: state.transition?.checklist?.length || 0, total: THRESHOLDS.TOTAL_TRANSITION_ITEMS, href: '/transition' },
    { id: 'glossary', name: 'Glossary', icon: BookMarked, current: state.glossary?.viewedTerms?.length || 0, total: THRESHOLDS.TOTAL_GLOSSARY_TERMS, href: '/glossary' },
  ];

  const completedActivities = activities.filter(a => a.current >= a.total).length;
  const overallProgress = Math.round((completedActivities / activities.length) * 100);

  return (
    <main className="min-h-screen p-4 md:p-8 max-w-5xl mx-auto">
      <header className="mb-6">
        <Link href="/" className="text-foreground-muted hover:text-foreground text-sm mb-2 inline-block">
          ← Back to Home
        </Link>
        <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
          <Trophy className="w-7 h-7 text-accent-secondary" />
          Your Progress
        </h1>
      </header>

      {/* Level & XP Card */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card rounded-xl p-6 mb-6"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-accent-secondary/20 border border-accent-secondary/30 flex items-center justify-center">
                <Trophy className="w-6 h-6 text-accent-secondary" />
              </div>
              <div>
                <p className="text-2xl font-bold">Level {state.level}</p>
                <p className="text-foreground-muted">{state.title}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-accent-primary">
            <Zap className="w-5 h-5" />
            <span className="text-2xl font-mono font-bold">{state.xp}</span>
            <span className="text-foreground-muted">XP</span>
          </div>
        </div>

        {!isMaxLevel && (
          <div>
            <div className="flex justify-between text-sm text-foreground-muted mb-1">
              <span>Progress to Level {state.level + 1}</span>
              <span>{xpToNext} XP to go</span>
            </div>
            <div className="h-3 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressToNext}%` }}
                transition={{ duration: 0.8 }}
                className="h-full rounded-full"
                style={{ background: 'linear-gradient(90deg, rgb(var(--accent-primary)), rgb(var(--accent-secondary)))' }}
              />
            </div>
          </div>
        )}
        {isMaxLevel && (
          <p className="text-sm text-accent-secondary">Max level reached — you are an AI-SDLC Champion!</p>
        )}
      </motion.section>

      {/* Learning Progress */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card rounded-xl p-6 mb-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-lg flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-accent-primary" />
            Learning Progress
          </h2>
          <span className="text-2xl font-bold text-gradient">{overallProgress}%</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {activities.map((activity, idx) => {
            const progress = Math.round((activity.current / activity.total) * 100);
            const isComplete = activity.current >= activity.total;
            return (
              <Link key={activity.id} href={activity.href}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  className={`p-3 rounded-lg border transition-all hover:scale-[1.02] cursor-pointer ${
                    isComplete ? 'bg-status-success/10 border-status-success/30' : 'bg-background-tertiary/50 border-white/5 hover:border-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <activity.icon className={`w-4 h-4 ${isComplete ? 'text-status-success' : 'text-foreground-muted'}`} />
                    {isComplete ? <CheckCircle className="w-4 h-4 text-status-success" /> : <span className="text-xs font-mono text-foreground-muted">{progress}%</span>}
                  </div>
                  <p className={`text-sm font-medium ${isComplete ? 'text-status-success' : 'text-foreground'}`}>{activity.name}</p>
                  <p className="text-xs text-foreground-muted">{activity.current}/{activity.total}</p>
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
      </motion.section>

      {/* Achievements */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card rounded-xl p-6 mb-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-lg flex items-center gap-2">
            <Zap className="w-5 h-5 text-accent-primary" />
            Achievements
          </h2>
          <span className="text-sm font-mono text-foreground-muted">{achievementProgress.unlocked}/{achievementProgress.total}</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {ACHIEVEMENTS.map((achievement, idx) => {
            const isUnlocked = state.achievements.includes(achievement.id);
            return (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                className={`p-4 rounded-lg border flex items-start gap-3 ${
                  isUnlocked
                    ? 'bg-accent-primary/10 border-accent-primary/30'
                    : 'bg-background-tertiary/30 border-white/5'
                }`}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl flex-shrink-0 ${
                  isUnlocked ? 'bg-accent-primary/20' : 'bg-white/5'
                }`}>
                  {isUnlocked ? achievement.icon : <Lock className="w-4 h-4 text-foreground-muted" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`font-medium text-sm ${isUnlocked ? 'text-foreground' : 'text-foreground-muted'}`}>
                    {achievement.name}
                  </p>
                  <p className="text-xs text-foreground-muted">{achievement.description}</p>
                  {!isUnlocked && (
                    <p className="text-xs text-accent-primary mt-1 flex items-center gap-1">
                      <Info className="w-3 h-3" />
                      {getUnlockHint(achievement.id)}
                    </p>
                  )}
                </div>
                {isUnlocked && <CheckCircle className="w-4 h-4 text-accent-primary flex-shrink-0 mt-1" />}
              </motion.div>
            );
          })}
        </div>

        <div className="mt-4">
          <div className="flex justify-between text-xs text-foreground-muted mb-1">
            <span>Achievement Progress</span>
            <span>{achievementProgress.percentage}%</span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${achievementProgress.percentage}%` }}
              transition={{ duration: 0.8 }}
              className="h-full rounded-full bg-gradient-to-r from-accent-primary to-accent-secondary"
            />
          </div>
        </div>
      </motion.section>

      {/* Reset Progress */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-card rounded-xl p-6"
      >
        <h2 className="font-semibold text-lg flex items-center gap-2 mb-3">
          <RotateCcw className="w-5 h-5 text-foreground-muted" />
          Reset Progress
        </h2>
        <p className="text-sm text-foreground-muted mb-4">
          This will reset all your XP, levels, achievements, and activity progress. This action cannot be undone.
        </p>

        {!showResetConfirm ? (
          <button
            onClick={() => setShowResetConfirm(true)}
            className="px-4 py-2 rounded-lg border border-accent-error/30 text-accent-error hover:bg-accent-error/10 transition-colors text-sm"
          >
            Reset All Progress
          </button>
        ) : (
          <div className="p-4 rounded-lg bg-accent-error/10 border border-accent-error/30">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="w-5 h-5 text-accent-error" />
              <span className="font-medium text-accent-error">Are you sure?</span>
            </div>
            <p className="text-sm text-foreground-muted mb-3">All progress will be permanently deleted.</p>
            <div className="flex gap-3">
              <button
                onClick={handleReset}
                className="px-4 py-2 rounded-lg bg-accent-error text-white hover:bg-accent-error/80 transition-colors text-sm"
              >
                Yes, Reset Everything
              </button>
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-4 py-2 rounded-lg border border-white/10 text-foreground-muted hover:text-foreground transition-colors text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </motion.section>

      <footer className="mt-8 pt-4 border-t border-background-tertiary text-sm text-foreground-muted">
        <div className="flex justify-center gap-4">
          <span><kbd className="kbd">Esc</kbd> Home</span>
        </div>
      </footer>
    </main>
  );
}
