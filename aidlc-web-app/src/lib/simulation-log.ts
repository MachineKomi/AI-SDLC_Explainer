/**
 * Simulation Log Utilities
 * 
 * Functions for creating, formatting, and displaying log entries
 * in the simulation activity log.
 */

import { LogEntry, LogEntryType, SimulationTask } from '@/types/simulation';

/**
 * Get visual prefix for log entry type
 */
export function getEntryPrefix(type: LogEntryType): string {
  switch (type) {
    case 'task-start':
      return '▶';
    case 'task-complete':
      return '✓';
    case 'wait-start':
      return '⏳';
    case 'wait-end':
      return '⏱';
    case 'handoff':
      return '→';
    case 'milestone':
      return '🎯';
    default:
      return '•';
  }
}

/**
 * Get CSS classes for log entry type
 */
export function getEntryClasses(type: LogEntryType): string {
  switch (type) {
    case 'task-start':
      return 'text-blue-400';
    case 'task-complete':
      return 'text-green-400';
    case 'wait-start':
      return 'text-amber-400';
    case 'wait-end':
      return 'text-amber-300';
    case 'handoff':
      return 'text-purple-400';
    case 'milestone':
      return 'text-accent-primary';
    default:
      return 'text-foreground-muted';
  }
}

/**
 * Format timestamp as MM:SS
 */
export function formatTimestamp(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

/**
 * Format duration in a human-readable way
 */
export function formatDuration(ms: number): string {
  if (ms < 1000) {
    return `${ms}ms`;
  }
  const seconds = ms / 1000;
  if (seconds < 60) {
    return `${seconds.toFixed(1)}s`;
  }
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.round(seconds % 60);
  return `${minutes}m ${remainingSeconds}s`;
}

/**
 * Format a log entry as a display string
 */
export function formatLogEntry(entry: LogEntry): string {
  const timestamp = formatTimestamp(entry.timestamp);
  const prefix = getEntryPrefix(entry.type);
  
  let message = `[${timestamp}] ${prefix} ${entry.message}`;
  
  if (entry.duration !== undefined) {
    message += ` (${formatDuration(entry.duration)})`;
  }
  
  return message;
}

/**
 * Create a task start log entry
 */
export function createTaskStartLog(
  task: SimulationTask,
  timestamp: number
): LogEntry {
  return {
    id: `${task.id}-start-${timestamp}`,
    timestamp,
    type: 'task-start',
    message: task.name,
    details: task.description,
    team: task.team,
  };
}

/**
 * Create a task complete log entry
 */
export function createTaskCompleteLog(
  task: SimulationTask,
  timestamp: number,
  duration: number
): LogEntry {
  return {
    id: `${task.id}-complete-${timestamp}`,
    timestamp,
    type: 'task-complete',
    message: task.name,
    team: task.team,
    duration,
  };
}

/**
 * Create a wait start log entry
 */
export function createWaitStartLog(
  reason: string,
  waitingFor: string,
  timestamp: number
): LogEntry {
  return {
    id: `wait-start-${timestamp}`,
    timestamp,
    type: 'wait-start',
    message: reason,
    details: `Waiting for: ${waitingFor}`,
  };
}

/**
 * Create a wait end log entry
 */
export function createWaitEndLog(
  reason: string,
  timestamp: number,
  duration: number
): LogEntry {
  return {
    id: `wait-end-${timestamp}`,
    timestamp,
    type: 'wait-end',
    message: `${reason} complete`,
    duration,
  };
}

/**
 * Create a handoff log entry
 */
export function createHandoffLog(
  fromTeam: string,
  toTeam: string,
  timestamp: number
): LogEntry {
  return {
    id: `handoff-${timestamp}`,
    timestamp,
    type: 'handoff',
    message: `Handoff: ${fromTeam} → ${toTeam}`,
  };
}

/**
 * Create a milestone log entry
 */
export function createMilestoneLog(
  milestone: string,
  timestamp: number
): LogEntry {
  return {
    id: `milestone-${timestamp}`,
    timestamp,
    type: 'milestone',
    message: milestone,
  };
}

/**
 * Limit log entries to prevent memory issues
 */
export function limitLogEntries(entries: LogEntry[], maxEntries: number = 100): LogEntry[] {
  if (entries.length <= maxEntries) {
    return entries;
  }
  return entries.slice(-maxEntries);
}

/**
 * Check if timestamps are monotonically increasing
 */
export function areTimestampsMonotonic(entries: LogEntry[]): boolean {
  for (let i = 1; i < entries.length; i++) {
    if (entries[i].timestamp < entries[i - 1].timestamp) {
      return false;
    }
  }
  return true;
}

/**
 * Get the most recent entries for display
 */
export function getRecentEntries(entries: LogEntry[], count: number = 10): LogEntry[] {
  return entries.slice(-count);
}
