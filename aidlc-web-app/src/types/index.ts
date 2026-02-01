// ============================================
// Core Type Definitions for AI-SDLC Web App
// ============================================

// === Lesson Types ===
export interface Section {
  id: string;
  title: string;
  content: string;
  diagram?: string;
  diagramType?: 'phases' | 'phases-flow' | 'gate-loop' | 'construction-loop' | 'artifact-tree' |
  'lesson-complete' | 'principles-list' | 'plan-first-comparison' |
  'accountability-table' | 'small-batches' | 'adaptive-depth' |
  'structured-qa' | 'proof-over-prose' | 'audit-trail' |
  'context-persistence' | 'fail-fast' | 'prompts-as-code' | 'inception-flow';
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  sections: Section[];
}

// === Quiz Types ===
export interface QuizQuestion {
  id: string;
  prompt: string;
  options: string[];
  correct: number;
  explanation: string;
  sources: {
    local: string[];
    upstream: string[];
  };
}

export interface QuizState {
  currentQuestion: number;
  answers: number[];
  score: number;
  completed: boolean;
}

// === Gatekeeper Types ===
export interface GatekeeperScenario {
  id: string;
  phase: string;
  stage: string;
  context: string;
  ai_plan: string;
  flaws: string[];
  decisions: {
    correct_action: 'approve' | 'reject';
    valid_reasons: string[];
    invalid_reasons: string[];
  };
  evidence_checklist: string[];
  sources?: {
    local: string[];
    upstream: string[];
  };
}

// === Simulator Types ===
export interface SimulatorOption {
  id: string;
  label: string;
}

export interface SimulatorQuestion {
  id: string;
  prompt: string;
  options: SimulatorOption[];
  effects: Record<string, {
    add_stages?: string[];
    remove_stages?: string[];
    prioritize?: string[];
    depth?: string;
    ceremony?: string;
    skip_optional?: boolean;
    explanation: string;
  }>;
  principle?: string;
}

export interface Stage {
  id: string;
  phase: string;
  name: string;
  description: string;
  always_execute: boolean;
  condition?: string;
  artifacts?: { path: string; description: string }[];
  gate?: {
    name: string;
    criteria: string[];
    evidence_required: string[];
  };
}

export interface Phase {
  id: string;
  name: string;
  goal: string;
  ritual: string;
  color: string;
  icon: string;
}

export interface RequestType {
  id: string;
  name: string;
  description: string;
  icon: string;
  default_risk: string;
  stages: Record<string, { execute: boolean | 'conditional'; reason: string }>;
  typical_questions: string[];
  key_gates: string[];
}

// === Glossary Types ===
export interface GlossaryTerm {
  id: string;
  term: string;
  definition: string;
  example: string;
  related: string[];
  source: string;
}

// === Methodology Comparison Types ===
export interface MethodologyPhase {
  id: string;
  name: string;
  duration_units: number;
  description: string;
  handoffs: number;
  wait_time: number;
}

export interface Methodology {
  id: string;
  name: string;
  description: string;
  phases: MethodologyPhase[];
  cycle_time_factor: number;
  cost_factor: number;
  feedback_loop_time: string;
  key_characteristics: string[];
  strengths: string[];
  weaknesses: string[];
}

export interface ComparisonMetric {
  name: string;
  description: string;
  waterfall: string;
  agile: string;
  aidlc: string;
  winner: string;
}

export interface ProjectScenario {
  id: string;
  name: string;
  description: string;
  complexity: 'low' | 'medium' | 'high';
  requirements_stability: 'stable' | 'evolving' | 'volatile';
  team_size: number;
  baseline_weeks: number;
}

export interface SimulationResult {
  methodology_id: string;
  total_weeks: number;
  total_cost_units: number;
  feedback_points: number;
  handoffs: number;
  risk_events: string[];
}

// === Transition Mapping Types ===
export interface RoleMapping {
  agile_role: string;
  agile_responsibilities: string[];
  aidlc_role: string;
  aidlc_responsibilities: string[];
  key_changes: string[];
  skills_to_develop: string[];
}

export interface ProcessMapping {
  agile_process: string;
  agile_frequency: string;
  agile_duration: string;
  agile_purpose: string;
  aidlc_process: string;
  aidlc_frequency: string;
  aidlc_duration: string;
  aidlc_purpose: string;
  key_differences: string[];
}

export interface ArtifactMapping {
  agile_artifact: string;
  agile_purpose: string;
  aidlc_artifact: string;
  aidlc_purpose: string;
  key_differences: string[];
}

export interface TransitionPhase {
  id: string;
  name: string;
  duration: string;
  focus: string;
  activities: string[];
  success_criteria: string[];
  risks: string[];
}

export interface ReadinessItem {
  category: string;
  item: string;
  description: string;
  importance: 'critical' | 'high' | 'medium';
}

// === Progress & Gamification Types ===
export interface LessonProgress {
  completed: string[];
  inProgress: Record<string, { lastSection: number; startedAt?: string }>;
}

export interface QuizProgress {
  completed: boolean;
  lastScore: number;
  bestScore: number;
  attempts: number;
}

export interface GatekeeperProgress {
  completed: boolean;
  lastScore: number;
  bestScore: number;
  attempts: number;
}

export interface SimulatorProgress {
  runs: number;
  requestTypesExplored: string[];
  lastRun: string | null;
}

export interface ProgressState {
  xp: number;
  level: number;
  title: string;
  lessons: LessonProgress;
  quiz: QuizProgress;
  gatekeeper: GatekeeperProgress;
  simulator: SimulatorProgress;
  achievements: string[];
}

// === Storage Types ===
export interface StoredState {
  $schema: 'state-v1';
  version: string;
  lastUpdated: string;
  firstOpened: string;
  quiz: {
    completed: boolean;
    lastScore: number;
    totalQuestions: number;
    attempts: number;
    bestScore: number;
  };
  gatekeeper: {
    completed: boolean;
    lastScore: number;
    totalScenarios: number;
    attempts: number;
    bestScore: number;
  };
  lessons: {
    completed: string[];
    inProgress: Record<string, {
      startedAt: string;
      lastSection: number;
    }>;
  };
  simulator: {
    runs: number;
    requestTypesExplored: string[];
    lastRun: string | null;
  };
  achievements: {
    unlocked: string[];
  };
  gamification: {
    xp: number;
    level: number;
    title: string;
  };
  theme: Theme;
  colorTheme: ColorTheme;
}

// === Theme Types ===
export type Theme = 'dark' | 'light';
export type ColorTheme = 'sunset' | 'matrix' | 'ocean' | 'mono';

// === Achievement Types ===
export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  check: (state: ProgressState) => boolean;
}

// === Context Types ===
export interface ProgressContextValue {
  state: ProgressState;
  addXp: (action: string, multiplier?: number) => number;
  markLessonCompleted: (lessonId: string) => void;
  updateLessonProgress: (lessonId: string, sectionIndex: number) => void;
  saveQuizResult: (score: number, total: number) => void;
  saveGatekeeperResult: (score: number, total: number) => void;
  recordSimulationRun: (requestType: string) => void;
  resetProgress: () => void;
}

export interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
  colorTheme: ColorTheme;
  setColorTheme: (theme: ColorTheme) => void;
}

// === Keyboard Hook Types ===
export interface UseKeyboardOptions {
  onEscape?: () => void;
  onArrowLeft?: () => void;
  onArrowRight?: () => void;
  onArrowUp?: () => void;
  onArrowDown?: () => void;
  onEnter?: () => void;
  onNumber?: (num: number) => void;
  enabled?: boolean;
}

// === Navigation Types ===
export interface MenuItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  href: string;
  shortcut: number;
}
