'use client';

import { useProgress } from '@/context/ProgressContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Trophy, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { getProgressToNextLevel, LEVEL_THRESHOLDS } from '@/lib/xp';

/**
 * Props for the MiniXPIndicator component.
 */
interface MiniXPIndicatorProps {
  /** Display variant: 'header' (compact horizontal), 'sidebar' (expanded), or 'sidebar-collapsed' (icon only) */
  variant?: 'header' | 'sidebar' | 'sidebar-collapsed';
  /** Whether to show the progress bar to next level */
  showProgress?: boolean;
}

/**
 * MiniXPIndicator - A compact XP and level display component.
 * 
 * Provides three display variants for different contexts:
 * - `header`: Compact horizontal display for fixed headers
 * - `sidebar`: Expanded display with full progress bar for sidebar
 * - `sidebar-collapsed`: Icon-only with tooltip for collapsed sidebar
 * 
 * Features:
 * - Animated XP gain popup when XP increases
 * - Progress bar showing progress to next level
 * - Level badge with title
 * 
 * @example
 * ```tsx
 * // In header
 * <MiniXPIndicator variant="header" />
 * 
 * // In sidebar
 * <MiniXPIndicator variant="sidebar" showProgress={true} />
 * ```
 */
export default function MiniXPIndicator({ 
  variant = 'header', 
  showProgress = true 
}: MiniXPIndicatorProps) {
  const { state } = useProgress();
  const [xpGained, setXpGained] = useState<number | null>(null);
  const prevXpRef = useRef(state.xp);

  // Detect XP changes and trigger animation
  useEffect(() => {
    if (state.xp > prevXpRef.current) {
      const gained = state.xp - prevXpRef.current;
      setXpGained(gained);
      
      // Clear animation after delay
      const timer = setTimeout(() => setXpGained(null), 2000);
      return () => clearTimeout(timer);
    }
    prevXpRef.current = state.xp;
  }, [state.xp]);

  const progress = getProgressToNextLevel(state.xp);
  const isMaxLevel = state.level >= LEVEL_THRESHOLDS.length;

  // Sidebar collapsed variant - icon only with tooltip
  if (variant === 'sidebar-collapsed') {
    return (
      <Link href="/progress" className="relative group block">
        <div className="w-10 h-10 rounded-lg bg-accent-primary/10 border border-accent-primary/20 flex items-center justify-center cursor-pointer hover:bg-accent-primary/20 transition-colors">
          <Trophy className="w-5 h-5 text-accent-primary" />
        </div>
        
        {/* Tooltip */}
        <div className="absolute left-full ml-3 px-3 py-2 bg-background-tertiary border border-white/10 rounded-lg text-sm opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 shadow-xl transition-opacity">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-semibold text-accent-primary">{state.xp} XP</span>
            <span className="text-foreground-muted">•</span>
            <span className="text-foreground">Level {state.level}</span>
          </div>
          <div className="text-xs text-foreground-muted">{state.title}</div>
        </div>

        {/* XP Gain Animation */}
        <AnimatePresence>
          {xpGained && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.8 }}
              animate={{ opacity: 1, y: -5, scale: 1 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute -top-2 -right-2 px-2 py-0.5 bg-accent-primary text-white text-xs font-bold rounded-full shadow-lg"
            >
              +{xpGained}
            </motion.div>
          )}
        </AnimatePresence>
      </Link>
    );
  }

  // Sidebar expanded variant
  if (variant === 'sidebar') {
    return (
      <Link href="/progress" className="block px-3 py-3 rounded-lg bg-background-tertiary/50 border border-white/5 hover:border-white/10 transition-colors cursor-pointer">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-accent-secondary" />
            <span className="text-sm font-medium text-foreground">Level {state.level}</span>
          </div>
          <div className="flex items-center gap-1.5 text-accent-primary">
            <Zap className="w-3.5 h-3.5" />
            <span className="text-sm font-mono font-semibold">{state.xp}</span>
          </div>
        </div>
        
        <div className="text-xs text-foreground-muted mb-2">{state.title}</div>
        
        {showProgress && !isMaxLevel && (
          <div className="relative h-1.5 bg-background-tertiary rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="absolute inset-y-0 left-0 rounded-full"
              style={{
                background: 'linear-gradient(90deg, rgb(var(--accent-primary)), rgb(var(--accent-secondary)))',
              }}
            />
          </div>
        )}

        {/* XP Gain Animation */}
        <AnimatePresence>
          {xpGained && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="mt-2 flex items-center gap-1 text-xs text-accent-primary font-medium"
            >
              <TrendingUp className="w-3 h-3" />
              +{xpGained} XP
            </motion.div>
          )}
        </AnimatePresence>
      </Link>
    );
  }

  // Header variant (default) - compact horizontal display
  return (
    <Link href="/progress">
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative flex items-center gap-3 px-3 py-2 rounded-lg bg-background-secondary/80 backdrop-blur-sm border border-white/10 shadow-lg cursor-pointer hover:border-white/20 transition-colors"
    >
      {/* Level Badge */}
      <div className="flex items-center gap-1.5">
        <div className="w-7 h-7 rounded-md bg-accent-secondary/10 border border-accent-secondary/20 flex items-center justify-center">
          <Trophy className="w-4 h-4 text-accent-secondary" />
        </div>
        <div className="hidden sm:block">
          <div className="text-xs text-foreground-muted font-mono">Lv.{state.level}</div>
          <div className="text-xs font-medium text-foreground leading-tight">{state.title}</div>
        </div>
      </div>

      {/* Divider */}
      <div className="w-px h-6 bg-white/10" />

      {/* XP Display */}
      <div className="flex items-center gap-1.5">
        <Zap className="w-4 h-4 text-accent-primary" />
        <span className="font-mono font-semibold text-accent-primary text-sm">{state.xp}</span>
        <span className="text-xs text-foreground-muted hidden sm:inline">XP</span>
      </div>

      {/* Progress bar (optional) */}
      {showProgress && !isMaxLevel && (
        <div className="hidden md:block w-16 h-1.5 bg-background-tertiary rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="h-full rounded-full"
            style={{
              background: 'linear-gradient(90deg, rgb(var(--accent-primary)), rgb(var(--accent-secondary)))',
            }}
          />
        </div>
      )}

      {/* XP Gain Animation */}
      <AnimatePresence>
        {xpGained && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: -8, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.8 }}
            className="absolute -top-3 right-2 px-2 py-0.5 bg-accent-primary text-white text-xs font-bold rounded-full shadow-lg"
          >
            +{xpGained} XP
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
    </Link>
  );
}
