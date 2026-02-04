'use client';

/**
 * WaitStateIndicator Component
 * 
 * Displays a visual indicator when a track is in a wait state,
 * showing the reason and accumulated wait time.
 */

import { Clock, Hourglass } from 'lucide-react';
import { MethodologyId } from '@/types/simulation';
import { WAIT_STYLES } from '@/content/simulation-tasks';

interface WaitStateIndicatorProps {
  isWaiting: boolean;
  reason: string | null;
  elapsedMs: number;
  methodologyId: MethodologyId;
}

/**
 * Format wait time
 */
function formatWaitTime(ms: number): string {
  const seconds = ms / 1000;
  return `${seconds.toFixed(1)}s`;
}

/**
 * WaitStateIndicator Component
 */
export default function WaitStateIndicator({
  isWaiting,
  reason,
  elapsedMs,
  methodologyId,
}: WaitStateIndicatorProps) {
  if (!isWaiting || !reason) {
    return null;
  }
  
  const styles = WAIT_STYLES[methodologyId];
  
  return (
    <div className={`
      flex items-center gap-2 px-2 py-1 rounded-md text-xs font-mono
      ${styles.bgColor} ${styles.borderColor} border
      animate-pulse
    `}>
      <Hourglass className={`w-3 h-3 ${styles.color}`} />
      <span className={styles.color}>
        {reason}
      </span>
      <span className="text-foreground-muted/60 tabular-nums">
        +{formatWaitTime(elapsedMs)}
      </span>
    </div>
  );
}
