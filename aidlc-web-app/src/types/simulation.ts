/**
 * Simulation Engine Types
 * 
 * Type definitions for the comparison page simulation engine that models
 * realistic SDLC task execution for Waterfall, Agile, and AI-SDLC methodologies.
 */

// Methodology identifiers
export type MethodologyId = 'waterfall' | 'agile' | 'aidlc';

// Task types that determine visual styling and time categorization
export type TaskType = 
  | 'work'       // Active productive work
  | 'ceremony'   // Agile ceremonies (standups, retros, etc.)
  | 'review'     // Code/design reviews
  | 'wait'       // Waiting for approval/sign-off
  | 'handoff'    // Transition between teams
  | 'validation' // AI-SDLC human validation gates
  | 'scenario';  // External holdout scenario validation (AI-SDLC)

/**
 * A discrete unit of work within a methodology simulation
 */
export interface SimulationTask {
  /** Unique identifier for the task */
  id: string;
  /** Display name for the task */
  name: string;
  /** Brief description of what happens in this task */
  description: string;
  /** Duration in milliseconds (compressed simulation time) */
  durationMs: number;
  /** Team or role performing this task */
  team: string;
  /** Type of task - determines styling and time categorization */
  type: TaskType;
  /** Lucide icon name for visual display */
  icon: string;
}

/**
 * Log entry types for the activity log
 */
export type LogEntryType = 
  | 'task-start'
  | 'task-complete'
  | 'wait-start'
  | 'wait-end'
  | 'handoff'
  | 'milestone';

/**
 * A single entry in the simulation activity log
 */
export interface LogEntry {
  /** Unique identifier */
  id: string;
  /** Simulation time in milliseconds when this entry was created */
  timestamp: number;
  /** Type of log entry - determines prefix and styling */
  type: LogEntryType;
  /** Main message text */
  message: string;
  /** Optional additional details */
  details?: string;
  /** Team involved (if applicable) */
  team?: string;
  /** Duration in ms (for task-complete entries) */
  duration?: number;
}

/**
 * Current state of a single methodology track
 */
export interface TrackState {
  /** Which methodology this track represents */
  methodologyId: MethodologyId;
  /** Index of current task in the task sequence */
  currentTaskIndex: number;
  /** The currently executing task (null if complete) */
  currentTask: SimulationTask | null;
  /** Progress through current task (0-100) */
  taskProgress: number;
  /** Whether track is currently in a wait state */
  isWaiting: boolean;
  /** Reason for waiting (if isWaiting) */
  waitReason: string | null;
  /** Time spent in current wait state */
  waitElapsed: number;
  /** Total elapsed simulation time for this track */
  totalElapsed: number;
  /** Time spent on productive work */
  workTime: number;
  /** Time spent waiting/in handoffs */
  waitTime: number;
  /** Whether this track has completed all tasks */
  isComplete: boolean;
  /** Activity log entries for this track */
  logEntries: LogEntry[];
}

/**
 * Simulation phase states
 */
export type SimulationPhase = 'idle' | 'running' | 'paused' | 'complete';

/**
 * Global simulation state
 */
export interface SimulationState {
  /** Current phase of the simulation */
  phase: SimulationPhase;
  /** Timestamp when simulation started (null if not started) */
  startTime: number | null;
  /** Timestamp when simulation was paused (null if not paused) */
  pausedAt: number | null;
  /** Total time spent paused */
  totalPausedTime: number;
  /** Current simulation elapsed time in ms */
  elapsedMs: number;
  /** State of each methodology track */
  tracks: Record<MethodologyId, TrackState>;
}

/**
 * Actions that can be dispatched to the simulation reducer
 */
export type SimulationAction =
  | { type: 'PLAY' }
  | { type: 'PAUSE' }
  | { type: 'RESET' }
  | { type: 'TICK'; deltaMs: number }
  | { type: 'TRACK_COMPLETE'; methodologyId: MethodologyId };

/**
 * Wait state visualization configuration
 */
export interface WaitVisualization {
  /** Runner opacity during wait (0.5 = dimmed) */
  runnerOpacity: number;
  /** CSS animation for runner during wait */
  runnerAnimation: string;
  /** Whether to show striped overlay on track */
  trackOverlay: boolean;
  /** Wait badge configuration */
  waitBadge: {
    visible: boolean;
    text: string;
    icon: string;
  };
}

/**
 * Methodology-specific wait styling
 */
export interface WaitStyleConfig {
  color: string;
  bgColor: string;
  borderColor: string;
  label: string;
}

/**
 * Time compression configuration
 */
export interface TimeCompressionConfig {
  /** Target total simulation duration in milliseconds */
  targetDurationMs: number;
  /** Tick interval for animation updates */
  tickIntervalMs: number;
  /** Methodology completion targets (relative to waterfall = 1.0) */
  completionTargets: {
    waterfall: number;
    agile: number;
    aidlc: number;
  };
}

/**
 * Props for simulation components
 */
export interface MethodologyTrackProps {
  methodologyId: MethodologyId;
  trackState: TrackState;
  isHighlighted: boolean;
}

export interface LogWindowProps {
  entries: LogEntry[];
  maxVisible?: number;
  autoScroll?: boolean;
  methodologyId: MethodologyId;
}

export interface TaskTimerProps {
  remainingMs: number;
  isPaused: boolean;
  taskName: string;
}

export interface WaitStateIndicatorProps {
  isWaiting: boolean;
  reason: string | null;
  elapsedMs: number;
  methodologyId: MethodologyId;
}

export interface TimeBreakdownProps {
  totalElapsed: number;
  workTime: number;
  waitTime: number;
  isComplete: boolean;
}
