/**
 * Simulation Engine
 * 
 * Core logic for the comparison page simulation that models realistic
 * SDLC task execution for Waterfall, Agile, and AI-SDLC methodologies.
 */

import {
  SimulationState,
  SimulationAction,
  SimulationPhase,
  TrackState,
  SimulationTask,
  LogEntry,
  MethodologyId,
} from '@/types/simulation';
import { getScaledTasks, DEFAULT_TIME_CONFIG } from '@/content/simulation-tasks';

// Get scaled tasks for the simulation
const SCALED_TASKS = getScaledTasks(DEFAULT_TIME_CONFIG);

/**
 * Create initial track state for a methodology
 */
export function createInitialTrackState(methodologyId: MethodologyId): TrackState {
  const tasks = SCALED_TASKS[methodologyId];
  const firstTask = tasks[0] || null;
  
  return {
    methodologyId,
    currentTaskIndex: 0,
    currentTask: firstTask,
    taskProgress: 0,
    isWaiting: firstTask?.type === 'wait' || firstTask?.type === 'handoff',
    waitReason: firstTask?.type === 'wait' || firstTask?.type === 'handoff' ? firstTask.name : null,
    waitElapsed: 0,
    totalElapsed: 0,
    workTime: 0,
    waitTime: 0,
    isComplete: false,
    logEntries: firstTask ? [createTaskStartEntry(firstTask, 0)] : [],
  };
}

/**
 * Create initial simulation state
 */
export function createInitialState(): SimulationState {
  return {
    phase: 'idle',
    startTime: null,
    pausedAt: null,
    totalPausedTime: 0,
    elapsedMs: 0,
    tracks: {
      waterfall: createInitialTrackState('waterfall'),
      agile: createInitialTrackState('agile'),
      aidlc: createInitialTrackState('aidlc'),
    },
  };
}

/**
 * Create a log entry for task start
 */
export function createTaskStartEntry(task: SimulationTask, timestamp: number): LogEntry {
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
 * Create a log entry for task completion
 */
export function createTaskCompleteEntry(task: SimulationTask, timestamp: number, duration: number): LogEntry {
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
 * Determine if a task type counts as wait time
 */
export function isWaitTaskType(type: SimulationTask['type']): boolean {
  return type === 'wait' || type === 'handoff' || type === 'ceremony';
}

/**
 * Update a single track's state based on elapsed time
 */
export function updateTrackState(
  track: TrackState,
  deltaMs: number,
  tasks: SimulationTask[]
): TrackState {
  // If already complete, no updates needed
  if (track.isComplete) {
    return track;
  }
  
  const currentTask = tasks[track.currentTaskIndex];
  
  // If no current task, mark as complete
  if (!currentTask) {
    return { ...track, isComplete: true, currentTask: null };
  }
  
  // Calculate new progress
  const progressIncrement = (deltaMs / currentTask.durationMs) * 100;
  const newProgress = track.taskProgress + progressIncrement;
  
  // Determine if this is wait time
  const isWaitTime = isWaitTaskType(currentTask.type);
  
  // Task not yet complete
  if (newProgress < 100) {
    return {
      ...track,
      taskProgress: newProgress,
      totalElapsed: track.totalElapsed + deltaMs,
      workTime: isWaitTime ? track.workTime : track.workTime + deltaMs,
      waitTime: isWaitTime ? track.waitTime + deltaMs : track.waitTime,
      isWaiting: currentTask.type === 'wait' || currentTask.type === 'handoff',
      waitReason: currentTask.type === 'wait' || currentTask.type === 'handoff' ? currentTask.name : null,
      waitElapsed: currentTask.type === 'wait' || currentTask.type === 'handoff' 
        ? track.waitElapsed + deltaMs 
        : 0,
    };
  }
  
  // Task complete - calculate overflow and move to next task
  const overflow = ((newProgress - 100) / 100) * currentTask.durationMs;
  const taskDuration = currentTask.durationMs;
  const nextIndex = track.currentTaskIndex + 1;
  const nextTask = tasks[nextIndex] || null;
  const isComplete = nextIndex >= tasks.length;
  
  // Create log entries
  const newLogEntries = [
    ...track.logEntries,
    createTaskCompleteEntry(currentTask, track.totalElapsed + deltaMs - overflow, taskDuration),
  ];
  
  // Add start entry for next task if not complete
  if (nextTask) {
    newLogEntries.push(createTaskStartEntry(nextTask, track.totalElapsed + deltaMs - overflow));
  }
  
  const newTrack: TrackState = {
    ...track,
    currentTaskIndex: nextIndex,
    currentTask: nextTask,
    taskProgress: 0,
    totalElapsed: track.totalElapsed + deltaMs,
    workTime: isWaitTime ? track.workTime : track.workTime + (deltaMs - overflow),
    waitTime: isWaitTime ? track.waitTime + (deltaMs - overflow) : track.waitTime,
    isComplete,
    isWaiting: nextTask?.type === 'wait' || nextTask?.type === 'handoff',
    waitReason: nextTask?.type === 'wait' || nextTask?.type === 'handoff' ? nextTask.name : null,
    waitElapsed: 0,
    logEntries: newLogEntries,
  };
  
  // If there's overflow and next task exists, recursively process
  if (overflow > 0 && nextTask && !isComplete) {
    return updateTrackState(newTrack, overflow, tasks);
  }
  
  return newTrack;
}

/**
 * Check if all tracks are complete
 */
export function areAllTracksComplete(tracks: Record<MethodologyId, TrackState>): boolean {
  return Object.values(tracks).every(track => track.isComplete);
}

/**
 * Simulation state reducer
 */
export function simulationReducer(
  state: SimulationState,
  action: SimulationAction
): SimulationState {
  switch (action.type) {
    case 'PLAY': {
      if (state.phase === 'complete') {
        return state;
      }
      
      const now = Date.now();
      
      if (state.phase === 'paused' && state.pausedAt !== null) {
        // Resuming from pause
        const pauseDuration = now - state.pausedAt;
        return {
          ...state,
          phase: 'running',
          pausedAt: null,
          totalPausedTime: state.totalPausedTime + pauseDuration,
        };
      }
      
      // Starting fresh
      return {
        ...state,
        phase: 'running',
        startTime: now,
        pausedAt: null,
        totalPausedTime: 0,
      };
    }
    
    case 'PAUSE': {
      if (state.phase !== 'running') {
        return state;
      }
      
      return {
        ...state,
        phase: 'paused',
        pausedAt: Date.now(),
      };
    }
    
    case 'RESET': {
      return createInitialState();
    }
    
    case 'TICK': {
      if (state.phase !== 'running') {
        return state;
      }
      
      const { deltaMs } = action;
      
      // Update each track
      const newTracks: Record<MethodologyId, TrackState> = {
        waterfall: updateTrackState(
          state.tracks.waterfall,
          deltaMs,
          SCALED_TASKS.waterfall
        ),
        agile: updateTrackState(
          state.tracks.agile,
          deltaMs,
          SCALED_TASKS.agile
        ),
        aidlc: updateTrackState(
          state.tracks.aidlc,
          deltaMs,
          SCALED_TASKS.aidlc
        ),
      };
      
      // Check if all complete
      const allComplete = areAllTracksComplete(newTracks);
      
      return {
        ...state,
        elapsedMs: state.elapsedMs + deltaMs,
        tracks: newTracks,
        phase: allComplete ? 'complete' : 'running',
      };
    }
    
    case 'TRACK_COMPLETE': {
      // This action is handled implicitly by TICK
      return state;
    }
    
    default:
      return state;
  }
}

/**
 * Calculate track progress as percentage (0-100)
 */
export function calculateTrackProgress(track: TrackState, methodologyId: MethodologyId): number {
  const tasks = SCALED_TASKS[methodologyId];
  const totalTasks = tasks.length;
  
  if (track.isComplete) {
    return 100;
  }
  
  const completedTasks = track.currentTaskIndex;
  const currentTaskProgress = track.taskProgress / 100;
  
  return ((completedTasks + currentTaskProgress) / totalTasks) * 100;
}

/**
 * Format milliseconds as MM:SS
 */
export function formatTime(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

/**
 * Format milliseconds as seconds with decimal
 */
export function formatTimeSeconds(ms: number): string {
  const seconds = ms / 1000;
  return `${seconds.toFixed(1)}s`;
}

/**
 * Get remaining time for current task
 */
export function getRemainingTime(track: TrackState): number {
  if (!track.currentTask || track.isComplete) {
    return 0;
  }
  
  const elapsed = (track.taskProgress / 100) * track.currentTask.durationMs;
  return Math.max(0, track.currentTask.durationMs - elapsed);
}

/**
 * Get tasks for a methodology (scaled)
 */
export function getTasksForMethodology(methodologyId: MethodologyId): SimulationTask[] {
  return SCALED_TASKS[methodologyId];
}

/**
 * Validate state transition
 */
export function isValidTransition(
  currentPhase: SimulationPhase,
  actionType: SimulationAction['type']
): boolean {
  const validTransitions: Record<SimulationPhase, SimulationAction['type'][]> = {
    idle: ['PLAY', 'RESET'],
    running: ['PAUSE', 'RESET', 'TICK', 'TRACK_COMPLETE'],
    paused: ['PLAY', 'RESET'],
    complete: ['RESET'],
  };
  
  return validTransitions[currentPhase].includes(actionType);
}
