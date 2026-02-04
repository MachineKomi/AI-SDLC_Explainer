'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Sparkles, Star, ChevronRight, Zap } from 'lucide-react';
import { LEVEL_THRESHOLDS } from '@/lib/xp';

/**
 * Props for the LevelUpModal component.
 */
interface LevelUpModalProps {
  /** Whether the modal is visible */
  isOpen: boolean;
  /** The new level number achieved */
  newLevel: number;
  /** The title for the new level (e.g., "Expert") */
  newTitle: string;
  /** Total XP accumulated */
  totalXp: number;
  /** Callback when modal is closed */
  onClose: () => void;
}

/**
 * Gets level-specific theme colors and emoji.
 * Each level has a unique gradient, glow color, and representative emoji.
 */
function getLevelTheme(level: number) {
  const themes = [
    { gradient: 'from-gray-400 to-gray-600', glow: 'rgba(156, 163, 175, 0.3)', emoji: '🌱' },      // Novice
    { gradient: 'from-green-400 to-emerald-600', glow: 'rgba(34, 197, 94, 0.3)', emoji: '📖' },   // Apprentice
    { gradient: 'from-blue-400 to-cyan-600', glow: 'rgba(6, 182, 212, 0.3)', emoji: '⚡' },       // Practitioner
    { gradient: 'from-purple-400 to-violet-600', glow: 'rgba(139, 92, 246, 0.3)', emoji: '🎯' },  // Specialist
    { gradient: 'from-orange-400 to-amber-600', glow: 'rgba(245, 158, 11, 0.3)', emoji: '🔥' },   // Expert
    { gradient: 'from-pink-400 to-rose-600', glow: 'rgba(236, 72, 153, 0.3)', emoji: '💎' },      // Master
    { gradient: 'from-yellow-400 to-orange-500', glow: 'rgba(234, 179, 8, 0.4)', emoji: '👑' },   // Grandmaster
    { gradient: 'from-cyan-400 via-purple-500 to-pink-500', glow: 'rgba(168, 85, 247, 0.4)', emoji: '🏆' }, // Champion
  ];
  return themes[Math.min(level - 1, themes.length - 1)];
}

/**
 * LevelUpModal - A full-screen celebration modal for level-up events.
 * 
 * Displays when a user reaches a new level with:
 * - Animated backdrop with blur
 * - Floating particle effects
 * - Level-specific gradient themes (8 unique themes)
 * - Level badge with pulse animation
 * - XP stats display
 * - "Continue Learning" button
 * 
 * Triggered automatically by ProgressContext when XP crosses a level threshold.
 * 
 * @example
 * ```tsx
 * <LevelUpModal
 *   isOpen={true}
 *   newLevel={5}
 *   newTitle="Expert"
 *   totalXp={1250}
 *   onClose={() => setIsOpen(false)}
 * />
 * ```
 */
export default function LevelUpModal({ 
  isOpen, 
  newLevel, 
  newTitle, 
  totalXp,
  onClose 
}: LevelUpModalProps) {
  const theme = getLevelTheme(newLevel);
  const isMaxLevel = newLevel >= LEVEL_THRESHOLDS.length;
  const nextThreshold = !isMaxLevel ? LEVEL_THRESHOLDS[newLevel]?.threshold : null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none"
          >
            <div 
              className="relative w-full max-w-md pointer-events-auto overflow-hidden rounded-2xl bg-gradient-to-b from-background-secondary to-background border border-white/10 shadow-2xl"
              style={{ boxShadow: `0 0 60px ${theme.glow}, 0 0 100px ${theme.glow}` }}
            >
              {/* Animated background particles */}
              <div className="absolute inset-0 overflow-hidden">
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ 
                      opacity: 0,
                      y: '100%',
                      x: `${Math.random() * 100}%`,
                    }}
                    animate={{ 
                      opacity: [0, 1, 0],
                      y: '-100%',
                    }}
                    transition={{
                      duration: 2 + Math.random() * 2,
                      repeat: Infinity,
                      delay: Math.random() * 2,
                      ease: 'linear',
                    }}
                    className="absolute w-1 h-1 rounded-full bg-accent-primary/50"
                  />
                ))}
              </div>

              {/* Glow effect at top */}
              <div 
                className={`absolute -top-20 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full blur-3xl opacity-30 bg-gradient-to-r ${theme.gradient}`}
              />

              {/* Content */}
              <div className="relative p-8 text-center">
                {/* Header badge */}
                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-secondary/10 border border-accent-secondary/30 text-accent-secondary text-sm font-semibold mb-6"
                >
                  <Sparkles className="w-4 h-4" />
                  LEVEL UP!
                  <Sparkles className="w-4 h-4" />
                </motion.div>

                {/* Level badge */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', delay: 0.3, damping: 15 }}
                  className="relative mx-auto mb-6"
                >
                  <div 
                    className={`w-28 h-28 rounded-2xl bg-gradient-to-br ${theme.gradient} flex items-center justify-center shadow-lg`}
                    style={{ boxShadow: `0 0 30px ${theme.glow}` }}
                  >
                    <span className="text-5xl">{theme.emoji}</span>
                  </div>
                  
                  {/* Level number badge */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, type: 'spring' }}
                    className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-background border-2 border-accent-primary flex items-center justify-center"
                  >
                    <span className="font-bold text-accent-primary">{newLevel}</span>
                  </motion.div>

                  {/* Pulse rings */}
                  <div className={`absolute inset-0 rounded-2xl border-2 border-current opacity-50 animate-ping bg-gradient-to-br ${theme.gradient}`} style={{ animationDuration: '2s' }} />
                </motion.div>

                {/* Title */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <h2 className="text-3xl font-bold mb-2">
                    <span className={`bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent`}>
                      {newTitle}
                    </span>
                  </h2>
                  <p className="text-foreground-muted">
                    You&apos;ve reached Level {newLevel}!
                  </p>
                </motion.div>

                {/* Stats */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mt-6 p-4 rounded-xl bg-background-tertiary/50 border border-white/5"
                >
                  <div className="flex items-center justify-center gap-6">
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 text-accent-primary">
                        <Zap className="w-4 h-4" />
                        <span className="font-mono font-bold text-xl">{totalXp}</span>
                      </div>
                      <div className="text-xs text-foreground-muted">Total XP</div>
                    </div>
                    
                    {!isMaxLevel && nextThreshold && (
                      <>
                        <div className="w-px h-8 bg-white/10" />
                        <div className="text-center">
                          <div className="flex items-center justify-center gap-1 text-foreground-muted">
                            <Star className="w-4 h-4" />
                            <span className="font-mono font-bold text-xl">{nextThreshold - totalXp}</span>
                          </div>
                          <div className="text-xs text-foreground-muted">XP to next</div>
                        </div>
                      </>
                    )}
                  </div>

                  {isMaxLevel && (
                    <div className="mt-3 pt-3 border-t border-white/5 text-sm text-accent-secondary">
                      🎉 Maximum level achieved!
                    </div>
                  )}
                </motion.div>

                {/* Continue button */}
                <motion.button
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  onClick={onClose}
                  className={`mt-6 w-full py-3 px-6 rounded-xl bg-gradient-to-r ${theme.gradient} text-white font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity`}
                >
                  Continue Learning
                  <ChevronRight className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
