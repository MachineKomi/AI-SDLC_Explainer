// localStorage utilities for state persistence

import { StoredState, Theme, ColorTheme, ProgressState } from '@/types';

const STORAGE_KEY = 'aidlc-explainer-state';
const SCHEMA_VERSION = 'state-v1';

export const DEFAULT_STATE: StoredState = {
  $schema: SCHEMA_VERSION,
  version: '1.0.0',
  lastUpdated: new Date().toISOString(),
  firstOpened: new Date().toISOString(),
  quiz: {
    completed: false,
    lastScore: 0,
    totalQuestions: 24,
    attempts: 0,
    bestScore: 0,
  },
  gatekeeper: {
    completed: false,
    lastScore: 0,
    totalScenarios: 10,
    attempts: 0,
    bestScore: 0,
  },
  lessons: {
    completed: [],
    inProgress: {},
  },
  simulator: {
    runs: 0,
    requestTypesExplored: [],
    lastRun: null,
  },
  achievements: {
    unlocked: [],
  },
  gamification: {
    xp: 0,
    level: 1,
    title: 'Novice',
  },
  theme: 'dark',
  colorTheme: 'sunset',
};

export function isLocalStorageAvailable(): boolean {
  try {
    const test = '__storage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch {
    return false;
  }
}

export function loadState(): StoredState {
  if (!isLocalStorageAvailable()) {
    console.warn('localStorage not available, using default state');
    return { ...DEFAULT_STATE };
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return { ...DEFAULT_STATE, firstOpened: new Date().toISOString() };
    }

    const parsed = JSON.parse(stored) as StoredState;

    // Validate schema version
    if (parsed.$schema !== SCHEMA_VERSION) {
      console.warn('Invalid state schema, resetting to defaults');
      return { ...DEFAULT_STATE };
    }

    return migrateState(parsed);
  } catch (error) {
    console.error('Failed to load state:', error);
    return { ...DEFAULT_STATE };
  }
}

export function saveState(state: StoredState): boolean {
  if (!isLocalStorageAvailable()) {
    console.warn('localStorage not available, state not persisted');
    return false;
  }

  try {
    const serialized = JSON.stringify({
      ...state,
      $schema: SCHEMA_VERSION,
      lastUpdated: new Date().toISOString(),
    });
    localStorage.setItem(STORAGE_KEY, serialized);
    return true;
  } catch (error) {
    console.error('Failed to save state:', error);
    return false;
  }
}

export function resetState(): StoredState {
  const newState = {
    ...DEFAULT_STATE,
    firstOpened: new Date().toISOString(),
    lastUpdated: new Date().toISOString(),
  };
  saveState(newState);
  return newState;
}

function migrateState(state: StoredState): StoredState {
  // Handle any schema migrations here
  // For now, just ensure all required fields exist
  return {
    ...DEFAULT_STATE,
    ...state,
    quiz: { ...DEFAULT_STATE.quiz, ...state.quiz },
    gatekeeper: { ...DEFAULT_STATE.gatekeeper, ...state.gatekeeper },
    lessons: { ...DEFAULT_STATE.lessons, ...state.lessons },
    simulator: { ...DEFAULT_STATE.simulator, ...state.simulator },
    achievements: { ...DEFAULT_STATE.achievements, ...state.achievements },
    gamification: { ...DEFAULT_STATE.gamification, ...state.gamification },
  };
}

// Convert StoredState to ProgressState for context
export function toProgressState(stored: StoredState): ProgressState {
  return {
    xp: stored.gamification.xp,
    level: stored.gamification.level,
    title: stored.gamification.title,
    lessons: {
      completed: stored.lessons.completed,
      inProgress: Object.fromEntries(
        Object.entries(stored.lessons.inProgress).map(([k, v]) => [
          k,
          { lastSection: v.lastSection },
        ])
      ),
    },
    quiz: {
      completed: stored.quiz.completed,
      lastScore: stored.quiz.lastScore,
      bestScore: stored.quiz.bestScore,
      attempts: stored.quiz.attempts,
    },
    gatekeeper: {
      completed: stored.gatekeeper.completed,
      lastScore: stored.gatekeeper.lastScore,
      bestScore: stored.gatekeeper.bestScore,
      attempts: stored.gatekeeper.attempts,
    },
    simulator: {
      runs: stored.simulator.runs,
      requestTypesExplored: stored.simulator.requestTypesExplored,
      lastRun: stored.simulator.lastRun,
    },
    achievements: stored.achievements.unlocked,
  };
}

// Theme helpers
export function loadTheme(): Theme {
  const state = loadState();
  return state.theme;
}

export function saveTheme(theme: Theme): void {
  const state = loadState();
  state.theme = theme;
  saveState(state);
}

// Color theme helpers
export function loadColorTheme(): ColorTheme {
  const state = loadState();
  return state.colorTheme || 'sunset';
}

export function saveColorTheme(colorTheme: ColorTheme): void {
  const state = loadState();
  state.colorTheme = colorTheme;
  saveState(state);
}
