'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { ProgressState, ProgressContextValue, StoredState } from '@/types';
import { loadState, saveState, toProgressState, DEFAULT_STATE } from '@/lib/storage';
import { calculateXpReward, calculateLevel } from '@/lib/xp';
import { checkAchievements, getAchievementById } from '@/lib/achievements';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';

const ProgressContext = createContext<ProgressContextValue | undefined>(undefined);

const DEFAULT_PROGRESS: ProgressState = {
  xp: 0,
  level: 1,
  title: 'Novice',
  lessons: { completed: [], inProgress: {} },
  quiz: { completed: false, lastScore: 0, bestScore: 0, attempts: 0 },
  gatekeeper: { completed: false, lastScore: 0, bestScore: 0, attempts: 0 },
  simulator: { runs: 0, requestTypesExplored: [], lastRun: null },
  achievements: [],
};

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<ProgressState>(DEFAULT_PROGRESS);
  const [storedState, setStoredState] = useState<StoredState>(DEFAULT_STATE);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const loaded = loadState();
    setStoredState(loaded);
    setState(toProgressState(loaded));
    setMounted(true);
  }, []);

  const persistState = useCallback((newStoredState: StoredState) => {
    setStoredState(newStoredState);
    setState(toProgressState(newStoredState));
    saveState(newStoredState);
  }, []);

  const addXp = useCallback((action: string, multiplier: number = 1): number => {
    const xpGained = calculateXpReward(action, multiplier);
    const newXp = storedState.gamification.xp + xpGained;
    const { level, title } = calculateLevel(newXp);

    const newState: StoredState = {
      ...storedState,
      gamification: { xp: newXp, level, title },
    };

    // Check for new achievements
    const progressState = toProgressState(newState);
    const newAchievements = checkAchievements(progressState);
    if (newAchievements.length > 0) {
      newState.achievements.unlocked = [
        ...newState.achievements.unlocked,
        ...newAchievements,
      ];
      // Award XP for achievements
      const achievementXp = newAchievements.length * calculateXpReward('achievement_unlocked');
      newState.gamification.xp += achievementXp;
      const updated = calculateLevel(newState.gamification.xp);
      newState.gamification.level = updated.level;
      newState.gamification.title = updated.title;
    }

    persistState(newState);
    return xpGained;
  }, [storedState, persistState]);

  const markLessonCompleted = useCallback((lessonId: string) => {
    if (storedState.lessons.completed.includes(lessonId)) return;

    const newState: StoredState = {
      ...storedState,
      lessons: {
        ...storedState.lessons,
        completed: [...storedState.lessons.completed, lessonId],
        inProgress: { ...storedState.lessons.inProgress },
      },
    };

    // Remove from in-progress
    delete newState.lessons.inProgress[lessonId];

    persistState(newState);
    addXp('lesson_completed');
  }, [storedState, persistState, addXp]);

  const updateLessonProgress = useCallback((lessonId: string, sectionIndex: number) => {
    const newState: StoredState = {
      ...storedState,
      lessons: {
        ...storedState.lessons,
        inProgress: {
          ...storedState.lessons.inProgress,
          [lessonId]: {
            startedAt: storedState.lessons.inProgress[lessonId]?.startedAt || new Date().toISOString(),
            lastSection: sectionIndex,
          },
        },
      },
    };

    persistState(newState);
    addXp('lesson_section');
  }, [storedState, persistState, addXp]);

  const saveQuizResult = useCallback((score: number, total: number) => {
    const newState: StoredState = {
      ...storedState,
      quiz: {
        completed: true,
        lastScore: score,
        totalQuestions: total,
        attempts: storedState.quiz.attempts + 1,
        bestScore: Math.max(storedState.quiz.bestScore, score),
      },
    };

    persistState(newState);

    // Award XP
    addXp('quiz_correct', score);
    addXp('quiz_completed');
    if (score === total) {
      addXp('quiz_perfect');
    }
  }, [storedState, persistState, addXp]);

  const saveGatekeeperResult = useCallback((score: number, total: number) => {
    const newState: StoredState = {
      ...storedState,
      gatekeeper: {
        completed: true,
        lastScore: score,
        totalScenarios: total,
        attempts: storedState.gatekeeper.attempts + 1,
        bestScore: Math.max(storedState.gatekeeper.bestScore, score),
      },
    };

    persistState(newState);

    // Award XP
    addXp('gate_correct', score);
    addXp('gate_completed');
  }, [storedState, persistState, addXp]);

  const recordSimulationRun = useCallback((requestType: string) => {
    const explored = storedState.simulator.requestTypesExplored;
    const isNewType = !explored.includes(requestType);

    const newState: StoredState = {
      ...storedState,
      simulator: {
        runs: storedState.simulator.runs + 1,
        requestTypesExplored: isNewType ? [...explored, requestType] : explored,
        lastRun: new Date().toISOString(),
      },
    };

    persistState(newState);

    addXp('simulator_run');
    if (isNewType) {
      addXp('simulator_new_type');
    }
  }, [storedState, persistState, addXp]);

  const resetProgress = useCallback(() => {
    const newState: StoredState = {
      ...DEFAULT_STATE,
      firstOpened: storedState.firstOpened,
      theme: storedState.theme,
    };
    persistState(newState);
  }, [storedState, persistState]);

  if (!mounted) {
    return null;
  }

  return (
    <ProgressContext.Provider
      value={{
        state,
        addXp,
        markLessonCompleted,
        updateLessonProgress,
        saveQuizResult,
        saveGatekeeperResult,
        recordSimulationRun,
        resetProgress,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress(): ProgressContextValue {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
}
