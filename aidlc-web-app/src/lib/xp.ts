// XP and Level calculation utilities

export const XP_REWARDS: Record<string, number> = {
  lesson_completed: 100,
  lesson_section: 10,
  quiz_correct: 25,
  quiz_completed: 50,
  quiz_perfect: 200,
  gate_correct: 30,
  gate_completed: 75,
  simulator_run: 20,
  simulator_new_type: 50,
  achievement_unlocked: 100,
  gym_task_completed: 15,
  gym_phase_completed: 50,
};

export const LEVEL_THRESHOLDS: Array<{ threshold: number; title: string }> = [
  { threshold: 0, title: 'Novice' },
  { threshold: 100, title: 'Apprentice' },
  { threshold: 300, title: 'Practitioner' },
  { threshold: 600, title: 'Specialist' },
  { threshold: 1000, title: 'Expert' },
  { threshold: 1500, title: 'Master' },
  { threshold: 2500, title: 'Grandmaster' },
  { threshold: 4000, title: 'AI-SDLC Champion' },
];

export function calculateXpReward(action: string, multiplier: number = 1): number {
  const baseXp = XP_REWARDS[action] || 0;
  return Math.floor(baseXp * multiplier);
}

export function calculateLevel(xp: number): { level: number; title: string } {
  let level = 1;
  let title = 'Novice';

  for (let i = 0; i < LEVEL_THRESHOLDS.length; i++) {
    if (xp >= LEVEL_THRESHOLDS[i].threshold) {
      level = i + 1;
      title = LEVEL_THRESHOLDS[i].title;
    } else {
      break;
    }
  }

  return { level, title };
}

export function getXpToNextLevel(xp: number): { xpToNext: number; nextThreshold: number } {
  for (const { threshold } of LEVEL_THRESHOLDS) {
    if (threshold > xp) {
      return {
        xpToNext: threshold - xp,
        nextThreshold: threshold,
      };
    }
  }

  // Max level reached
  return {
    xpToNext: 0,
    nextThreshold: LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1].threshold,
  };
}

export function getProgressToNextLevel(xp: number): number {
  const { level } = calculateLevel(xp);

  if (level >= LEVEL_THRESHOLDS.length) {
    return 100; // Max level
  }

  const currentThreshold = LEVEL_THRESHOLDS[level - 1].threshold;
  const nextThreshold = LEVEL_THRESHOLDS[level].threshold;
  const xpInLevel = xp - currentThreshold;
  const xpNeeded = nextThreshold - currentThreshold;

  return Math.min(100, Math.floor((xpInLevel / xpNeeded) * 100));
}
