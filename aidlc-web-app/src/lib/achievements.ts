// Achievement definitions and checking logic

import { Achievement, ProgressState } from '@/types';

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first-steps',
    name: 'First Steps',
    description: 'Complete your first lesson',
    icon: '🎯',
    check: (state: ProgressState) => state.lessons.completed.length >= 1,
  },
  {
    id: 'scholar',
    name: 'Scholar',
    description: 'Complete all lessons',
    icon: '📚',
    check: (state: ProgressState) => state.lessons.completed.length >= 3,
  },
  {
    id: 'quiz-master',
    name: 'Quiz Master',
    description: 'Score 80%+ on the quiz',
    icon: '🏆',
    check: (state: ProgressState) => state.quiz.bestScore >= 20, // 80% of 24
  },
  {
    id: 'perfect-score',
    name: 'Perfect Score',
    description: 'Get 100% on the quiz',
    icon: '⭐',
    check: (state: ProgressState) => state.quiz.bestScore >= 24,
  },
  {
    id: 'gatekeeper',
    name: 'Gatekeeper',
    description: 'Score 80%+ on gatekeeper scenarios',
    icon: '🚪',
    check: (state: ProgressState) => state.gatekeeper.bestScore >= 8, // 80% of 10
  },
  {
    id: 'simulator-explorer',
    name: 'Simulator Explorer',
    description: 'Explore all 4 request types',
    icon: '🔬',
    check: (state: ProgressState) => state.simulator.requestTypesExplored.length >= 4,
  },
  {
    id: 'completionist',
    name: 'Completionist',
    description: 'Complete everything',
    icon: '👑',
    check: (state: ProgressState) => {
      const hasAllLessons = state.lessons.completed.length >= 3;
      const hasQuizMaster = state.quiz.bestScore >= 20;
      const hasGatekeeper = state.gatekeeper.bestScore >= 8;
      const hasSimulator = state.simulator.requestTypesExplored.length >= 4;
      return hasAllLessons && hasQuizMaster && hasGatekeeper && hasSimulator;
    },
  },
];

export function checkAchievements(state: ProgressState): string[] {
  const newlyUnlocked: string[] = [];
  
  for (const achievement of ACHIEVEMENTS) {
    if (!state.achievements.includes(achievement.id) && achievement.check(state)) {
      newlyUnlocked.push(achievement.id);
    }
  }
  
  return newlyUnlocked;
}

export function getAchievementById(id: string): Achievement | undefined {
  return ACHIEVEMENTS.find(a => a.id === id);
}

export function getAllAchievements(): Achievement[] {
  return ACHIEVEMENTS;
}

export function getUnlockedAchievements(state: ProgressState): Achievement[] {
  return ACHIEVEMENTS.filter(a => state.achievements.includes(a.id));
}

export function getLockedAchievements(state: ProgressState): Achievement[] {
  return ACHIEVEMENTS.filter(a => !state.achievements.includes(a.id));
}

export function getAchievementProgress(state: ProgressState): {
  unlocked: number;
  total: number;
  percentage: number;
} {
  const unlocked = state.achievements.length;
  const total = ACHIEVEMENTS.length;
  return {
    unlocked,
    total,
    percentage: Math.floor((unlocked / total) * 100),
  };
}

/** Get a user-friendly hint for how to unlock a specific achievement */
export function getUnlockHint(achievementId: string): string {
  switch (achievementId) {
    case 'first-steps': return 'Complete any lesson to unlock';
    case 'scholar': return 'Complete all 3 lessons to unlock';
    case 'quiz-master': return 'Score 80%+ on the quiz to unlock';
    case 'perfect-score': return 'Get 100% on the quiz to unlock';
    case 'gatekeeper': return 'Score 80%+ on gatekeeper scenarios to unlock';
    case 'simulator-explorer': return 'Explore all 4 simulator request types to unlock';
    case 'completionist': return 'Unlock all other achievements to unlock';
    default: return 'Keep learning to unlock';
  }
}
