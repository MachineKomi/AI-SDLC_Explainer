'use client';

/**
 * Simulation Context
 * 
 * Provides global simulation state and controls for the comparison page
 * race visualization. Manages the animation loop and state updates.
 */

import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
  useEffect,
} from 'react';
import {
  SimulationState,
  SimulationAction,
  MethodologyId,
  TrackState,
} from '@/types/simulation';
import {
  simulationReducer,
  createInitialState,
  calculateTrackProgress,
  formatTime,
  getRemainingTime,
  getTasksForMethodology,
} from '@/lib/simulation-engine';
import { DEFAULT_TIME_CONFIG } from '@/content/simulation-tasks';

/**
 * Context value interface
 */
interface SimulationContextValue {
  // State
  state: SimulationState;
  
  // Controls
  play: () => void;
  pause: () => void;
  reset: () => void;
  
  // Computed values
  getTrackProgress: (methodologyId: MethodologyId) => number;
  getTrackState: (methodologyId: MethodologyId) => TrackState;
  getRemainingTimeForTrack: (methodologyId: MethodologyId) => number;
  getFormattedElapsed: () => string;
  
  // Status
  isPlaying: boolean;
  isPaused: boolean;
  isComplete: boolean;
}

const SimulationContext = createContext<SimulationContextValue | undefined>(undefined);

/**
 * Simulation Provider Component
 */
export function SimulationProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(simulationReducer, undefined, createInitialState);
  
  // Control functions
  const play = useCallback(() => {
    dispatch({ type: 'PLAY' });
  }, []);
  
  const pause = useCallback(() => {
    dispatch({ type: 'PAUSE' });
  }, []);
  
  const reset = useCallback(() => {
    dispatch({ type: 'RESET' });
  }, []);
  
  // Animation loop using setInterval for consistent timing
  useEffect(() => {
    if (state.phase !== 'running') {
      return;
    }
    
    // Use setInterval for consistent tick rate
    const intervalId = setInterval(() => {
      dispatch({ type: 'TICK', deltaMs: DEFAULT_TIME_CONFIG.tickIntervalMs });
    }, DEFAULT_TIME_CONFIG.tickIntervalMs);
    
    // Cleanup
    return () => {
      clearInterval(intervalId);
    };
  }, [state.phase]);
  
  // Computed value functions
  const getTrackProgress = useCallback((methodologyId: MethodologyId): number => {
    return calculateTrackProgress(state.tracks[methodologyId], methodologyId);
  }, [state.tracks]);
  
  const getTrackState = useCallback((methodologyId: MethodologyId): TrackState => {
    return state.tracks[methodologyId];
  }, [state.tracks]);
  
  const getRemainingTimeForTrack = useCallback((methodologyId: MethodologyId): number => {
    return getRemainingTime(state.tracks[methodologyId]);
  }, [state.tracks]);
  
  const getFormattedElapsed = useCallback((): string => {
    return formatTime(state.elapsedMs);
  }, [state.elapsedMs]);
  
  // Status flags
  const isPlaying = state.phase === 'running';
  const isPaused = state.phase === 'paused';
  const isComplete = state.phase === 'complete';
  
  const value: SimulationContextValue = {
    state,
    play,
    pause,
    reset,
    getTrackProgress,
    getTrackState,
    getRemainingTimeForTrack,
    getFormattedElapsed,
    isPlaying,
    isPaused,
    isComplete,
  };
  
  return (
    <SimulationContext.Provider value={value}>
      {children}
    </SimulationContext.Provider>
  );
}

/**
 * Hook to use simulation context
 */
export function useSimulation(): SimulationContextValue {
  const context = useContext(SimulationContext);
  if (context === undefined) {
    throw new Error('useSimulation must be used within a SimulationProvider');
  }
  return context;
}

/**
 * Hook to get a specific track's state
 */
export function useTrackState(methodologyId: MethodologyId): TrackState {
  const { getTrackState } = useSimulation();
  return getTrackState(methodologyId);
}

/**
 * Hook to get track progress
 */
export function useTrackProgress(methodologyId: MethodologyId): number {
  const { getTrackProgress } = useSimulation();
  return getTrackProgress(methodologyId);
}

/**
 * Export tasks getter for components
 */
export { getTasksForMethodology };
