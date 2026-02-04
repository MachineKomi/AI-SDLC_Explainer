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
  useRef,
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
  
  // Animation frame reference
  const animationFrameRef = useRef<number | null>(null);
  const lastTickRef = useRef<number>(0);
  
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
  
  // Animation loop
  useEffect(() => {
    if (state.phase !== 'running') {
      // Cancel any pending animation frame
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      return;
    }
    
    // Initialize last tick time
    if (lastTickRef.current === 0) {
      lastTickRef.current = performance.now();
    }
    
    const tick = (currentTime: number) => {
      const deltaMs = currentTime - lastTickRef.current;
      lastTickRef.current = currentTime;
      
      // Only dispatch if enough time has passed (target ~20fps = 50ms)
      if (deltaMs >= DEFAULT_TIME_CONFIG.tickIntervalMs) {
        dispatch({ type: 'TICK', deltaMs });
      }
      
      // Continue animation loop
      animationFrameRef.current = requestAnimationFrame(tick);
    };
    
    // Start animation loop
    animationFrameRef.current = requestAnimationFrame(tick);
    
    // Cleanup
    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, [state.phase]);
  
  // Reset last tick when starting
  useEffect(() => {
    if (state.phase === 'running' && lastTickRef.current === 0) {
      lastTickRef.current = performance.now();
    }
    if (state.phase === 'idle') {
      lastTickRef.current = 0;
    }
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
