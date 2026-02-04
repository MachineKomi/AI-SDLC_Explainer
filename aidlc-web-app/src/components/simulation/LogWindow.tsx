'use client';

/**
 * LogWindow Component
 * 
 * Displays a scrolling activity log for a methodology track,
 * showing task starts, completions, waits, and handoffs.
 */

import { useEffect, useRef } from 'react';
import { LogEntry, MethodologyId } from '@/types/simulation';
import { 
  getEntryPrefix, 
  getEntryClasses, 
  formatTimestamp,
  formatDuration,
} from '@/lib/simulation-log';
import { METHODOLOGY_CONFIG } from '@/content/simulation-tasks';

interface LogWindowProps {
  entries: LogEntry[];
  maxVisible?: number;
  autoScroll?: boolean;
  methodologyId: MethodologyId;
}

/**
 * Single log entry row
 */
function LogEntryRow({ entry }: { entry: LogEntry }) {
  const prefix = getEntryPrefix(entry.type);
  const colorClass = getEntryClasses(entry.type);
  
  return (
    <div className="flex items-start gap-2 py-1 text-xs font-mono border-b border-white/5 last:border-0">
      <span className="text-foreground-muted/60 shrink-0">
        [{formatTimestamp(entry.timestamp)}]
      </span>
      <span className={`shrink-0 ${colorClass}`}>
        {prefix}
      </span>
      <div className="flex-1 min-w-0">
        <span className={`${colorClass}`}>
          {entry.message}
        </span>
        {entry.duration !== undefined && (
          <span className="text-foreground-muted/60 ml-1">
            ({formatDuration(entry.duration)})
          </span>
        )}
        {entry.team && entry.type === 'task-start' && (
          <div className="text-foreground-muted/50 text-[10px] truncate">
            Team: {entry.team}
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * LogWindow Component
 */
export default function LogWindow({ 
  entries, 
  maxVisible = 6, 
  autoScroll = true,
  methodologyId,
}: LogWindowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const config = METHODOLOGY_CONFIG[methodologyId];
  
  // Auto-scroll to bottom when new entries are added
  useEffect(() => {
    if (autoScroll && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [entries.length, autoScroll]);
  
  // Get recent entries for display
  const displayEntries = entries.slice(-(maxVisible * 2));
  
  return (
    <div className="mt-2 rounded-lg bg-background-tertiary/30 border border-white/5 overflow-hidden">
      {/* Header */}
      <div className={`px-3 py-1.5 border-b border-white/5 flex items-center justify-between ${config.bgColor}`}>
        <span className={`text-[10px] font-mono uppercase tracking-wider ${config.color}`}>
          Activity Log
        </span>
        <span className="text-[10px] text-foreground-muted/50 font-mono">
          {entries.length} events
        </span>
      </div>
      
      {/* Log entries */}
      <div 
        ref={scrollRef}
        className="px-3 py-2 max-h-32 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent"
      >
        {displayEntries.length === 0 ? (
          <div className="text-xs text-foreground-muted/50 font-mono py-2 text-center">
            Waiting to start...
          </div>
        ) : (
          displayEntries.map((entry) => (
            <LogEntryRow key={entry.id} entry={entry} />
          ))
        )}
      </div>
    </div>
  );
}
