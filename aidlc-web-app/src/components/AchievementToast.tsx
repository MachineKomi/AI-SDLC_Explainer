'use client';

import { motion } from 'framer-motion';
import { Trophy, Sparkles, X } from 'lucide-react';
import { Achievement } from '@/types';

/**
 * Props for the AchievementToast component.
 */
interface AchievementToastProps {
  /** The achievement that was unlocked */
  achievement: Achievement;
  /** Amount of XP awarded for this achievement */
  xpAwarded: number;
  /** Callback to dismiss the toast */
  onClose?: () => void;
}

/**
 * AchievementToast - A celebratory toast notification for unlocked achievements.
 * 
 * Displays when a user unlocks an achievement with:
 * - Shimmer animation effect
 * - Glow effects
 * - Achievement icon with pulse ring animation
 * - Achievement name and description
 * - XP reward display
 * 
 * Used by ProgressContext to show achievement notifications via sonner toast.
 * 
 * @example
 * ```tsx
 * toast.custom((t) => (
 *   <AchievementToast
 *     achievement={achievement}
 *     xpAwarded={100}
 *     onClose={() => toast.dismiss(t)}
 *   />
 * ));
 * ```
 */
export default function AchievementToast({ 
  achievement, 
  xpAwarded,
  onClose 
}: AchievementToastProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.9 }}
      className="relative overflow-hidden rounded-xl bg-gradient-to-br from-background-secondary to-background-tertiary border border-accent-secondary/30 shadow-2xl max-w-sm"
    >
      {/* Shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-shimmer" />
      
      {/* Glow effect */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-accent-secondary/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-accent-primary/20 rounded-full blur-3xl" />

      <div className="relative p-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2 text-accent-secondary">
            <Sparkles className="w-4 h-4" />
            <span className="text-xs font-semibold uppercase tracking-wider">Achievement Unlocked!</span>
          </div>
          {onClose && (
            <button 
              onClick={onClose}
              className="text-foreground-muted hover:text-foreground transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Achievement Content */}
        <div className="flex items-center gap-4">
          {/* Icon */}
          <div className="relative">
            <div className="w-14 h-14 rounded-xl bg-accent-secondary/10 border border-accent-secondary/30 flex items-center justify-center text-3xl">
              {achievement.icon}
            </div>
            {/* Pulse ring */}
            <div className="absolute inset-0 rounded-xl border-2 border-accent-secondary/50 animate-ping opacity-75" />
          </div>

          {/* Details */}
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-lg text-foreground truncate">
              {achievement.name}
            </h3>
            <p className="text-sm text-foreground-muted line-clamp-2">
              {achievement.description}
            </p>
          </div>
        </div>

        {/* XP Reward */}
        <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-accent-primary" />
            <span className="text-sm text-foreground-muted">Reward</span>
          </div>
          <span className="font-mono font-bold text-accent-primary">+{xpAwarded} XP</span>
        </div>
      </div>
    </motion.div>
  );
}

// Custom styles for shimmer animation - add to globals.css
export const achievementStyles = `
@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}

.animate-shimmer {
  animation: shimmer 2s infinite;
}
`;
