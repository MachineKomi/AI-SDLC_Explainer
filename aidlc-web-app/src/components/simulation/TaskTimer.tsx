'use client';

/**
 * TaskTimer Component
 * 
 * Displays a countdown timer for the currently active task,
 * showing remaining time and task name.
 */

import { Clock } from 'lucide-react';

interface TaskTimerProps {
  remainingMs: number;
  isPaused: boolean;
  taskName: string;
}

/**
 * Format remaining time as seconds with one decimal
 */
function formatRemainingTime(ms: number): string {
  if (ms <= 0) return '0.0s';
  const seconds = ms / 1000;
  if (seconds < 10) {
    return `${seconds.toFixed(1)}s`;
  }
  return `${Math.round(seconds)}s`;
}

/**
 * TaskTimer Component
 */
export default function TaskTimer({ remainingMs, isPaused, taskName }: TaskTimerProps) {
  const formattedTime = formatRemainingTime(remainingMs);
  
  return (
    <div className={`
      flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-mono
      bg-background/80 border border-white/10 backdrop-blur-sm
      ${isPaused ? 'opacity-50' : ''}
    `}>
      <Clock className={`w-3 h-3 ${isPaused ? 'text-foreground-muted' : 'text-accent-secondary'}`} />
      <span className={`tabular-nums ${isPaused ? 'text-foreground-muted' : 'text-foreground'}`}>
        {formattedTime}
      </span>
    </div>
  );
}
