'use client';

/**
 * TimeBreakdown Component
 * 
 * Displays cumulative time breakdown showing total elapsed,
 * work time, and wait time for a methodology track.
 */

import { Clock, Zap, Hourglass, CheckCircle2 } from 'lucide-react';

interface TimeBreakdownProps {
  totalElapsed: number;
  workTime: number;
  waitTime: number;
  isComplete: boolean;
}

/**
 * Format time as seconds
 */
function formatTime(ms: number): string {
  const seconds = ms / 1000;
  if (seconds < 60) {
    return `${seconds.toFixed(1)}s`;
  }
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.round(seconds % 60);
  return `${minutes}m ${remainingSeconds}s`;
}

/**
 * Calculate percentage
 */
function calculatePercentage(part: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((part / total) * 100);
}

/**
 * TimeBreakdown Component
 */
export default function TimeBreakdown({
  totalElapsed,
  workTime,
  waitTime,
  isComplete,
}: TimeBreakdownProps) {
  const workPercent = calculatePercentage(workTime, totalElapsed);
  const waitPercent = calculatePercentage(waitTime, totalElapsed);
  
  return (
    <div className="flex items-center gap-4 text-xs font-mono text-foreground-muted">
      {/* Total Time */}
      <div className="flex items-center gap-1.5">
        <Clock className="w-3 h-3" />
        <span className={isComplete ? 'text-accent-success font-bold' : ''}>
          {formatTime(totalElapsed)}
        </span>
        {isComplete && (
          <CheckCircle2 className="w-3 h-3 text-accent-success" />
        )}
      </div>
      
      {/* Work Time */}
      <div className="flex items-center gap-1.5" title="Active work time">
        <Zap className="w-3 h-3 text-green-400" />
        <span className="text-green-400/80">
          {formatTime(workTime)}
        </span>
        <span className="text-foreground-muted/40">
          ({workPercent}%)
        </span>
      </div>
      
      {/* Wait Time */}
      <div className="flex items-center gap-1.5" title="Wait/handoff time">
        <Hourglass className="w-3 h-3 text-amber-400" />
        <span className="text-amber-400/80">
          {formatTime(waitTime)}
        </span>
        <span className="text-foreground-muted/40">
          ({waitPercent}%)
        </span>
      </div>
    </div>
  );
}
