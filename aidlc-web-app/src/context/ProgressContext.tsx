'use client';

import React, { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react';
import { ProgressState, ProgressContextValue, StoredState } from '@/types';
import { loadState, saveState, toProgressState, DEFAULT_STATE } from '@/lib/storage';
import { calculateXpReward, calculateLevel } from '@/lib/xp';
import { checkAchievements, getAchievementById } from '@/lib/achievements';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';
import AchievementToast from '@/components/AchievementToast';
import LevelUpModal from '@/components/LevelUpModal';

const ProgressContext = createContext<ProgressContextValue | undefined>(undefined);

// Update DEFAULT_PROGRESS
const DEFAULT_PROGRESS: ProgressState = {
  xp: 0,
  level: 1,
  title: 'Novice',
  lessons: { completed: [], inProgress: {} },
  quiz: { completed: false, lastScore: 0, bestScore: 0, attempts: 0 },
  gatekeeper: { completed: false, lastScore: 0, bestScore: 0, attempts: 0 },
  simulator: { runs: 0, requestTypesExplored: [], lastRun: null },
  gym: { completedTasks: [] },
  transition: { checklist: [] },
  glossary: { viewedTerms: [] },
  reference: { viewed: false },
  videos: { watched: [] },
  achievements: [],
};

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<ProgressState>(DEFAULT_PROGRESS);
  const [storedState, setStoredState] = useState<StoredState>(DEFAULT_STATE);
  const [mounted, setMounted] = useState(false);
  
  // Level-up modal state
  const [levelUpModal, setLevelUpModal] = useState<{
    isOpen: boolean;
    newLevel: number;
    newTitle: string;
    totalXp: number;
  }>({ isOpen: false, newLevel: 1, newTitle: 'Novice', totalXp: 0 });
  
  // Track previous level to detect level-ups
  const previousLevelRef = useRef<number>(1);
  
  // Ref to track current stored state for callbacks (avoids stale closure issues)
  const storedStateRef = useRef<StoredState>(DEFAULT_STATE);

  useEffect(() => {
    const loaded = loadState();
    setStoredState(loaded);
    storedStateRef.current = loaded;
    setState(toProgressState(loaded));
    previousLevelRef.current = loaded.gamification.level;
    setMounted(true);
  }, []);

  const persistState = useCallback((newStoredState: StoredState) => {
    setStoredState(newStoredState);
    storedStateRef.current = newStoredState;
    setState(toProgressState(newStoredState));
    saveState(newStoredState);
  }, []);

  // Function to trigger confetti celebration
  const triggerConfetti = useCallback(() => {
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval = window.setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#f97316', '#8b5cf6', '#22c55e', '#eab308'],
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#f97316', '#8b5cf6', '#22c55e', '#eab308'],
      });
    }, 250);
  }, []);

  // Function to show achievement notification
  const showAchievementNotification = useCallback((achievementId: string, xpAwarded: number) => {
    const achievement = getAchievementById(achievementId);
    if (!achievement) return;

    // Trigger confetti for special achievements
    const specialAchievements = ['completionist', 'perfect-score', 'scholar'];
    if (specialAchievements.includes(achievementId)) {
      triggerConfetti();
    }

    // Show toast notification with custom component
    toast.custom(
      (t) => (
        <AchievementToast
          achievement={achievement}
          xpAwarded={xpAwarded}
          onClose={() => toast.dismiss(t)}
        />
      ),
      {
        duration: 6000,
        position: 'bottom-right',
      }
    );
  }, [triggerConfetti]);

  // Function to show level-up celebration
  const showLevelUpCelebration = useCallback((newLevel: number, newTitle: string, totalXp: number) => {
    // Trigger confetti for level up
    triggerConfetti();
    
    // Show the modal
    setLevelUpModal({
      isOpen: true,
      newLevel,
      newTitle,
      totalXp,
    });
  }, [triggerConfetti]);

  const closeLevelUpModal = useCallback(() => {
    setLevelUpModal(prev => ({ ...prev, isOpen: false }));
  }, []);

  const addXp = useCallback((action: string, multiplier: number = 1): number => {
    const currentState = storedStateRef.current;
    const xpGained = calculateXpReward(action, multiplier);
    const newXp = currentState.gamification.xp + xpGained;
    const { level, title } = calculateLevel(newXp);
    const previousLevel = previousLevelRef.current;

    const newState: StoredState = {
      ...currentState,
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
      const achievementXpPerUnlock = calculateXpReward('achievement_unlocked');
      const totalAchievementXp = newAchievements.length * achievementXpPerUnlock;
      newState.gamification.xp += totalAchievementXp;
      const updated = calculateLevel(newState.gamification.xp);
      newState.gamification.level = updated.level;
      newState.gamification.title = updated.title;

      // Show notification for each new achievement
      newAchievements.forEach((achievementId) => {
        // Use setTimeout to stagger notifications if multiple achievements
        setTimeout(() => {
          showAchievementNotification(achievementId, achievementXpPerUnlock);
        }, newAchievements.indexOf(achievementId) * 500);
      });
    }

    persistState(newState);

    // Check for level up (after persisting state)
    const finalLevel = newState.gamification.level;
    if (finalLevel > previousLevel) {
      previousLevelRef.current = finalLevel;
      // Delay slightly to let state update
      setTimeout(() => {
        showLevelUpCelebration(finalLevel, newState.gamification.title, newState.gamification.xp);
      }, 300);
    }

    return xpGained;
  }, [persistState, showAchievementNotification, showLevelUpCelebration]);

  const markLessonCompleted = useCallback((lessonId: string) => {
    const currentState = storedStateRef.current;
    if (currentState.lessons.completed.includes(lessonId)) return;

    const newState: StoredState = {
      ...currentState,
      lessons: {
        ...currentState.lessons,
        completed: [...currentState.lessons.completed, lessonId],
        inProgress: { ...currentState.lessons.inProgress },
      },
    };

    // Remove from in-progress
    delete newState.lessons.inProgress[lessonId];

    persistState(newState);
    addXp('lesson_completed');
  }, [persistState, addXp]);

  const updateLessonProgress = useCallback((lessonId: string, sectionIndex: number) => {
    const currentState = storedStateRef.current;
    const newState: StoredState = {
      ...currentState,
      lessons: {
        ...currentState.lessons,
        inProgress: {
          ...currentState.lessons.inProgress,
          [lessonId]: {
            startedAt: currentState.lessons.inProgress[lessonId]?.startedAt || new Date().toISOString(),
            lastSection: sectionIndex,
          },
        },
      },
    };

    persistState(newState);
    addXp('lesson_section');
  }, [persistState, addXp]);

  const saveQuizResult = useCallback((score: number, total: number) => {
    const currentState = storedStateRef.current;
    const newState: StoredState = {
      ...currentState,
      quiz: {
        completed: true,
        lastScore: score,
        totalQuestions: total,
        attempts: currentState.quiz.attempts + 1,
        bestScore: Math.max(currentState.quiz.bestScore, score),
      },
    };

    persistState(newState);

    // Award XP
    addXp('quiz_correct', score);
    addXp('quiz_completed');
    if (score === total) {
      addXp('quiz_perfect');
    }
  }, [persistState, addXp]);

  const saveGatekeeperResult = useCallback((score: number, total: number) => {
    const currentState = storedStateRef.current;
    const newState: StoredState = {
      ...currentState,
      gatekeeper: {
        completed: true,
        lastScore: score,
        totalScenarios: total,
        attempts: currentState.gatekeeper.attempts + 1,
        bestScore: Math.max(currentState.gatekeeper.bestScore, score),
      },
    };

    persistState(newState);

    // Award XP
    addXp('gate_correct', score);
    addXp('gate_completed');
  }, [persistState, addXp]);

  const recordSimulationRun = useCallback((requestType: string) => {
    const currentState = storedStateRef.current;
    const explored = currentState.simulator.requestTypesExplored;
    const isNewType = !explored.includes(requestType);

    const newState: StoredState = {
      ...currentState,
      simulator: {
        runs: currentState.simulator.runs + 1,
        requestTypesExplored: isNewType ? [...explored, requestType] : explored,
        lastRun: new Date().toISOString(),
      },
    };

    persistState(newState);

    addXp('simulator_run');
    if (isNewType) {
      addXp('simulator_new_type');
    }
  }, [persistState, addXp]);

  const toggleGymTask = useCallback((taskId: string) => {
    const currentState = storedStateRef.current;
    const isCompleted = currentState.gym?.completedTasks?.includes(taskId) ?? false;
    let newCompletedTasks: string[];
    let shouldAwardXp = false;

    if (isCompleted) {
      newCompletedTasks = (currentState.gym?.completedTasks || []).filter(id => id !== taskId);
    } else {
      newCompletedTasks = [...(currentState.gym?.completedTasks || []), taskId];
      shouldAwardXp = true;
    }

    const newState: StoredState = {
      ...currentState,
      gym: {
        completedTasks: newCompletedTasks
      }
    };
    // IMPORTANT: persistState first, then addXp reads from updated storedStateRef
    persistState(newState);
    
    if (shouldAwardXp) {
      addXp('gym_task');
    }
  }, [persistState, addXp]);

  const toggleTransitionItem = useCallback((itemId: string) => {
    const currentState = storedStateRef.current;
    const isCompleted = currentState.transition?.checklist?.includes(itemId) ?? false;
    let newChecklist: string[];
    let shouldAwardXp = false;

    if (isCompleted) {
      newChecklist = (currentState.transition?.checklist || []).filter(id => id !== itemId);
    } else {
      newChecklist = [...(currentState.transition?.checklist || []), itemId];
      shouldAwardXp = true;
    }

    const newState: StoredState = {
      ...currentState,
      transition: {
        checklist: newChecklist
      }
    };
    // IMPORTANT: persistState first, then addXp reads from updated storedStateRef
    persistState(newState);
    
    if (shouldAwardXp) {
      addXp('transition_check');
    }
  }, [persistState, addXp]);

  const markGlossaryTermViewed = useCallback((termId: string) => {
    const currentState = storedStateRef.current;
    const viewedTerms = currentState.glossary?.viewedTerms || [];
    if (viewedTerms.includes(termId)) return; // Already viewed

    const newState: StoredState = {
      ...currentState,
      glossary: {
        viewedTerms: [...viewedTerms, termId]
      }
    };
    persistState(newState);
    addXp('glossary_term_viewed');
  }, [persistState, addXp]);

  const markReferenceViewed = useCallback(() => {
    const currentState = storedStateRef.current;
    if (currentState.reference?.viewed) return; // Already viewed

    const newState: StoredState = {
      ...currentState,
      reference: {
        viewed: true
      }
    };
    persistState(newState);
    addXp('reference_section_viewed');
  }, [persistState, addXp]);

  const markVideoWatched = useCallback((videoId: string) => {
    const currentState = storedStateRef.current;
    const watchedVideos = currentState.videos?.watched || [];
    if (watchedVideos.includes(videoId)) return; // Already watched, no duplicate XP

    const newState: StoredState = {
      ...currentState,
      videos: {
        watched: [...watchedVideos, videoId]
      }
    };
    persistState(newState);
    addXp('video_watched');
  }, [persistState, addXp]);

  const resetProgress = useCallback(() => {
    const currentState = storedStateRef.current;
    const newState: StoredState = {
      ...DEFAULT_STATE,
      firstOpened: currentState.firstOpened,
      theme: currentState.theme,
      gym: { completedTasks: [] },
      transition: { checklist: [] },
      glossary: { viewedTerms: [] },
      reference: { viewed: false },
    };
    persistState(newState);
  }, [persistState]);

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
        toggleGymTask,
        toggleTransitionItem,
        markGlossaryTermViewed,
        markReferenceViewed,
        markVideoWatched,
        resetProgress,
      }}
    >
      {children}
      <LevelUpModal
        isOpen={levelUpModal.isOpen}
        newLevel={levelUpModal.newLevel}
        newTitle={levelUpModal.newTitle}
        totalXp={levelUpModal.totalXp}
        onClose={closeLevelUpModal}
      />
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
