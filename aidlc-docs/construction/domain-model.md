# Domain Model: AI-SDLC Explainer Web Application

## Document Information

| Attribute | Value |
|-----------|-------|
| Version | 1.0.0 |
| Created | 2026-02-04 |
| Author | AI-SDLC Methodology |
| Status | Active |

---

## 1. Strategic Design

### 1.1 Domain Vision Statement

The AI-SDLC Explainer is an **interactive learning platform** that teaches the AI-Driven Software Development Lifecycle methodology. The domain centers on **educational content delivery** combined with **gamified progress tracking** to motivate learners through XP, levels, and achievements.

### 1.2 Bounded Contexts

The application is decomposed into the following bounded contexts:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        AI-SDLC EXPLAINER DOMAIN                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌──────────────────┐    ┌──────────────────┐    ┌──────────────────┐      │
│  │   LEARNING       │    │   GAMIFICATION   │    │   SIMULATION     │      │
│  │   CONTEXT        │    │   CONTEXT        │    │   CONTEXT        │      │
│  │                  │    │                  │    │                  │      │
│  │  • Lessons       │    │  • XP System     │    │  • Workflow Sim  │      │
│  │  • Glossary      │    │  • Levels        │    │  • Methodology   │      │
│  │  • Reference     │    │  • Achievements  │    │    Comparison    │      │
│  │  • Sources       │    │  • Progress      │    │  • Transition    │      │
│  └────────┬─────────┘    └────────┬─────────┘    │    Mapping       │      │
│           │                       │              └────────┬─────────┘      │
│           │                       │                       │                │
│  ┌────────┴───────────────────────┴───────────────────────┴─────────┐      │
│  │                      ASSESSMENT CONTEXT                           │      │
│  │                                                                   │      │
│  │  • Quiz Engine        • Gatekeeper Scenarios                     │      │
│  │  • Answer Validation  • Decision Evaluation                      │      │
│  └───────────────────────────────────────────────────────────────────┘      │
│                                                                              │
│  ┌───────────────────────────────────────────────────────────────────┐      │
│  │                      INFRASTRUCTURE CONTEXT                        │      │
│  │                                                                   │      │
│  │  • State Persistence (localStorage)  • Theme Management          │      │
│  │  • Navigation System                 • Keyboard Handling         │      │
│  └───────────────────────────────────────────────────────────────────┘      │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```


### 1.3 Context Map

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           CONTEXT MAP                                        │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│   LEARNING ──────────────────────────────────────────────► GAMIFICATION     │
│   CONTEXT                 [Upstream/Downstream]              CONTEXT        │
│      │                    Lesson completion                     │           │
│      │                    triggers XP awards                    │           │
│      │                                                          │           │
│      │                                                          │           │
│   ASSESSMENT ────────────────────────────────────────────► GAMIFICATION     │
│   CONTEXT                 [Upstream/Downstream]              CONTEXT        │
│      │                    Quiz/Gatekeeper results               │           │
│      │                    trigger XP and achievements           │           │
│      │                                                          │           │
│      │                                                          │           │
│   SIMULATION ────────────────────────────────────────────► GAMIFICATION     │
│   CONTEXT                 [Upstream/Downstream]              CONTEXT        │
│                           Simulation runs                                   │
│                           trigger XP awards                                 │
│                                                                              │
│   ALL CONTEXTS ──────────────────────────────────────────► INFRASTRUCTURE   │
│                           [Shared Kernel]                    CONTEXT        │
│                           State persistence,                                │
│                           Navigation, Theme                                 │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Tactical Design: Core Domain Models

### 2.1 Gamification Context (Core Subdomain)

The Gamification Context is the **core subdomain** as it drives user engagement and retention. It tracks all progress and rewards.

#### 2.1.1 Aggregates

```typescript
/**
 * AGGREGATE: LearnerProgress
 * 
 * The root aggregate for tracking a learner's entire journey through
 * the AI-SDLC Explainer. This is the central entity that coordinates
 * XP, levels, achievements, and activity completion.
 */
```

#### 2.1.2 Entity: LearnerProgress (Aggregate Root)

```typescript
interface LearnerProgress {
  // Identity
  id: string;                    // Implicit (single user per browser)
  
  // XP & Level State
  xp: XP;                        // Value Object
  level: Level;                  // Value Object
  
  // Activity Completion Tracking
  lessonProgress: LessonProgress;      // Entity
  quizProgress: QuizProgress;          // Entity
  gatekeeperProgress: GatekeeperProgress; // Entity
  simulatorProgress: SimulatorProgress;   // Entity
  gymProgress: GymProgress;            // Entity
  transitionProgress: TransitionProgress; // Entity
  
  // Achievements
  achievements: Achievement[];   // Value Objects (unlocked)
  
  // Metadata
  firstOpened: Timestamp;
  lastUpdated: Timestamp;
}
```


#### 2.1.3 Value Objects

```typescript
/**
 * VALUE OBJECT: XP (Experience Points)
 * 
 * Immutable representation of experience points.
 * XP can only increase (never decrease) through learning activities.
 */
interface XP {
  readonly value: number;        // Non-negative integer
  
  // Factory methods
  static zero(): XP;
  static fromValue(value: number): XP;
  
  // Operations (return new XP instances)
  add(amount: number): XP;
  
  // Invariants
  // - value >= 0
  // - value <= MAX_XP (10000)
}

/**
 * VALUE OBJECT: Level
 * 
 * Derived from XP using threshold table.
 * Represents learner's progression tier.
 */
interface Level {
  readonly number: number;       // 1-8
  readonly title: LevelTitle;    // Value Object
  readonly threshold: number;    // XP required for this level
  
  // Factory
  static fromXP(xp: XP): Level;
}

/**
 * VALUE OBJECT: LevelTitle
 * 
 * Enumeration of progression titles.
 */
type LevelTitle = 
  | 'Novice'           // Level 1, XP >= 0
  | 'Apprentice'       // Level 2, XP >= 100
  | 'Practitioner'     // Level 3, XP >= 300
  | 'Specialist'       // Level 4, XP >= 600
  | 'Expert'           // Level 5, XP >= 1000
  | 'Master'           // Level 6, XP >= 1500
  | 'Grandmaster'      // Level 7, XP >= 2500
  | 'AI-SDLC Champion'; // Level 8, XP >= 4000

/**
 * VALUE OBJECT: XPReward
 * 
 * Defines XP amounts for different learning activities.
 */
interface XPReward {
  readonly action: XPAction;
  readonly baseAmount: number;
  
  calculate(multiplier?: number): number;
}

type XPAction =
  | 'lesson_completed'      // 100 XP
  | 'lesson_section'        // 10 XP
  | 'quiz_correct'          // 25 XP per correct answer
  | 'quiz_completed'        // 50 XP
  | 'quiz_perfect'          // 200 XP bonus
  | 'gate_correct'          // 30 XP per correct decision
  | 'gate_completed'        // 75 XP
  | 'simulator_run'         // 20 XP
  | 'simulator_new_type'    // 50 XP
  | 'achievement_unlocked'  // 100 XP
  | 'gym_task'              // 15 XP
  | 'transition_check';     // 10 XP
```


#### 2.1.4 Achievement System

```typescript
/**
 * VALUE OBJECT: Achievement
 * 
 * Represents an unlockable achievement with criteria.
 * Achievements are immutable definitions; unlocking is tracked separately.
 */
interface Achievement {
  readonly id: AchievementId;
  readonly name: string;
  readonly description: string;
  readonly icon: string;          // Emoji
  readonly criteria: AchievementCriteria;
}

type AchievementId =
  | 'first-steps'         // Complete first lesson
  | 'scholar'             // Complete all lessons
  | 'quiz-master'         // Score 80%+ on quiz
  | 'perfect-score'       // Score 100% on quiz
  | 'gatekeeper'          // Score 80%+ on gatekeeper
  | 'simulator-explorer'  // Explore all 4 request types
  | 'completionist';      // Complete everything

/**
 * VALUE OBJECT: AchievementCriteria
 * 
 * Defines the condition for unlocking an achievement.
 */
interface AchievementCriteria {
  check(progress: LearnerProgress): boolean;
}

// Achievement Criteria Implementations
const ACHIEVEMENT_CRITERIA: Record<AchievementId, AchievementCriteria> = {
  'first-steps': {
    check: (p) => p.lessonProgress.completedLessons.length >= 1
  },
  'scholar': {
    check: (p) => p.lessonProgress.completedLessons.length >= 3
  },
  'quiz-master': {
    check: (p) => p.quizProgress.bestScore >= 20  // 80% of 24
  },
  'perfect-score': {
    check: (p) => p.quizProgress.bestScore >= 24
  },
  'gatekeeper': {
    check: (p) => p.gatekeeperProgress.bestScore >= 8  // 80% of 10
  },
  'simulator-explorer': {
    check: (p) => p.simulatorProgress.requestTypesExplored.length >= 4
  },
  'completionist': {
    check: (p) => {
      const hasAllLessons = p.lessonProgress.completedLessons.length >= 3;
      const hasQuizMaster = p.quizProgress.bestScore >= 20;
      const hasGatekeeper = p.gatekeeperProgress.bestScore >= 8;
      const hasSimulator = p.simulatorProgress.requestTypesExplored.length >= 4;
      return hasAllLessons && hasQuizMaster && hasGatekeeper && hasSimulator;
    }
  }
};
```


#### 2.1.5 Progress Tracking Entities

```typescript
/**
 * ENTITY: LessonProgress
 * 
 * Tracks completion and in-progress state for lessons.
 */
interface LessonProgress {
  completedLessons: LessonId[];
  inProgressLessons: Map<LessonId, LessonProgressState>;
}

interface LessonProgressState {
  lessonId: LessonId;
  lastSectionIndex: number;
  startedAt: Timestamp;
}

/**
 * ENTITY: QuizProgress
 * 
 * Tracks quiz attempts and scores.
 */
interface QuizProgress {
  completed: boolean;
  lastScore: Score;
  bestScore: Score;
  attempts: number;
}

/**
 * ENTITY: GatekeeperProgress
 * 
 * Tracks gatekeeper scenario attempts and scores.
 */
interface GatekeeperProgress {
  completed: boolean;
  lastScore: Score;
  bestScore: Score;
  attempts: number;
}

/**
 * ENTITY: SimulatorProgress
 * 
 * Tracks workflow simulator usage.
 */
interface SimulatorProgress {
  runs: number;
  requestTypesExplored: RequestTypeId[];
  lastRun: Timestamp | null;
}

/**
 * ENTITY: GymProgress
 * 
 * Tracks completion of gym practice tasks.
 */
interface GymProgress {
  completedTasks: GymTaskId[];
}

/**
 * ENTITY: TransitionProgress
 * 
 * Tracks completion of transition readiness checklist items.
 */
interface TransitionProgress {
  checklist: ReadinessItemId[];
}

/**
 * VALUE OBJECT: Score
 * 
 * Represents a score from an assessment.
 */
interface Score {
  readonly value: number;
  readonly total: number;
  
  percentage(): number;
  isPassing(threshold: number): boolean;
  isPerfect(): boolean;
}
```


### 2.2 Learning Context (Supporting Subdomain)

The Learning Context manages educational content delivery.

#### 2.2.1 Aggregates

```typescript
/**
 * AGGREGATE: Lesson
 * 
 * A structured learning unit with multiple sections.
 */
interface Lesson {
  readonly id: LessonId;
  readonly title: string;
  readonly description: string;
  readonly sections: Section[];
  
  getSectionCount(): number;
  getSection(index: number): Section | undefined;
  isLastSection(index: number): boolean;
}

/**
 * VALUE OBJECT: Section
 * 
 * A single section within a lesson.
 */
interface Section {
  readonly id: string;
  readonly title: string;
  readonly content: string;
  readonly diagram?: Diagram;
}

/**
 * VALUE OBJECT: Diagram
 * 
 * Visual representation within a section.
 */
interface Diagram {
  readonly type: DiagramType;
  readonly content?: string;  // For ASCII diagrams
}

type DiagramType =
  | 'phases'
  | 'phases-flow'
  | 'gate-loop'
  | 'construction-loop'
  | 'artifact-tree'
  | 'lesson-complete'
  | 'principles-list'
  | 'plan-first-comparison'
  | 'accountability-table'
  | 'small-batches'
  | 'adaptive-depth'
  | 'structured-qa'
  | 'proof-over-prose'
  | 'audit-trail'
  | 'context-persistence'
  | 'fail-fast'
  | 'prompts-as-code'
  | 'inception-flow';
```

#### 2.2.2 Glossary Aggregate

```typescript
/**
 * AGGREGATE: Glossary
 * 
 * Collection of AI-SDLC terminology.
 */
interface Glossary {
  readonly terms: GlossaryTerm[];
  
  findById(id: string): GlossaryTerm | undefined;
  search(query: string): GlossaryTerm[];
  getByLetter(letter: string): GlossaryTerm[];
  getRelatedTerms(term: GlossaryTerm): GlossaryTerm[];
}

/**
 * VALUE OBJECT: GlossaryTerm
 * 
 * A single glossary entry.
 */
interface GlossaryTerm {
  readonly id: string;
  readonly term: string;
  readonly definition: string;
  readonly example: string;
  readonly relatedTermIds: string[];
  readonly source: string;
}
```


### 2.3 Assessment Context (Supporting Subdomain)

The Assessment Context handles knowledge validation through quizzes and gatekeeper scenarios.

#### 2.3.1 Quiz Aggregate

```typescript
/**
 * AGGREGATE: Quiz
 * 
 * A collection of questions for knowledge assessment.
 */
interface Quiz {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly questions: QuizQuestion[];
  
  getTotalQuestions(): number;
  getQuestion(index: number): QuizQuestion | undefined;
}

/**
 * ENTITY: QuizQuestion
 * 
 * A single quiz question with multiple choice answers.
 */
interface QuizQuestion {
  readonly id: string;
  readonly prompt: string;
  readonly options: string[];
  readonly correctIndex: number;
  readonly explanation: string;
  readonly sources: QuestionSources;
  
  isCorrect(selectedIndex: number): boolean;
  getCorrectAnswer(): string;
}

/**
 * VALUE OBJECT: QuestionSources
 * 
 * References for question content.
 */
interface QuestionSources {
  readonly local: string[];     // Local file references
  readonly upstream: string[];  // External URLs
}

/**
 * ENTITY: QuizSession
 * 
 * An active quiz attempt.
 */
interface QuizSession {
  readonly quizId: string;
  currentQuestionIndex: number;
  answers: QuizAnswer[];
  
  answerQuestion(questionIndex: number, selectedOption: number): QuizAnswer;
  getScore(): Score;
  isComplete(): boolean;
  getNextQuestion(): QuizQuestion | null;
}

/**
 * VALUE OBJECT: QuizAnswer
 * 
 * A recorded answer to a quiz question.
 */
interface QuizAnswer {
  readonly questionId: string;
  readonly selectedIndex: number;
  readonly isCorrect: boolean;
  readonly answeredAt: Timestamp;
}
```


#### 2.3.2 Gatekeeper Aggregate

```typescript
/**
 * AGGREGATE: GatekeeperPractice
 * 
 * Collection of gate approval scenarios for practice.
 */
interface GatekeeperPractice {
  readonly scenarios: GatekeeperScenario[];
  
  getScenario(index: number): GatekeeperScenario | undefined;
  getTotalScenarios(): number;
}

/**
 * ENTITY: GatekeeperScenario
 * 
 * A single gate approval scenario.
 */
interface GatekeeperScenario {
  readonly id: string;
  readonly phase: Phase;
  readonly stage: string;
  readonly context: string;
  readonly aiPlan: string;
  readonly flaws: string[];
  readonly decisions: GatekeeperDecisions;
  readonly evidenceChecklist: string[];
  
  isCorrectDecision(decision: GateDecision): boolean;
  hasFlaws(): boolean;
}

/**
 * VALUE OBJECT: GatekeeperDecisions
 * 
 * Defines correct and incorrect decision options.
 */
interface GatekeeperDecisions {
  readonly correctAction: GateDecision;
  readonly validReasons: string[];
  readonly invalidReasons: string[];
}

type GateDecision = 'approve' | 'reject';

/**
 * ENTITY: GatekeeperSession
 * 
 * An active gatekeeper practice session.
 */
interface GatekeeperSession {
  currentScenarioIndex: number;
  decisions: GatekeeperAnswer[];
  
  makeDecision(scenarioId: string, decision: GateDecision): GatekeeperAnswer;
  getScore(): Score;
  isComplete(): boolean;
  getIncorrectScenarios(): GatekeeperScenario[];
}

/**
 * VALUE OBJECT: GatekeeperAnswer
 * 
 * A recorded decision for a scenario.
 */
interface GatekeeperAnswer {
  readonly scenarioId: string;
  readonly decision: GateDecision;
  readonly isCorrect: boolean;
  readonly decidedAt: Timestamp;
}
```


### 2.4 Simulation Context (Supporting Subdomain)

The Simulation Context handles interactive workflow simulation and methodology comparison.

#### 2.4.1 Workflow Simulator Aggregate

```typescript
/**
 * AGGREGATE: WorkflowSimulator
 * 
 * Interactive simulator for AI-SDLC workflow adaptation.
 */
interface WorkflowSimulator {
  readonly questions: SimulatorQuestion[];
  readonly stages: Stage[];
  readonly phases: Phase[];
  readonly requestTypes: RequestType[];
  
  createSession(requestType?: RequestTypeId): SimulatorSession;
}

/**
 * ENTITY: SimulatorSession
 * 
 * An active simulation session.
 */
interface SimulatorSession {
  readonly requestType: RequestType | null;
  currentQuestionIndex: number;
  answers: SimulatorAnswer[];
  stageExecutionPlan: StageExecutionPlan;
  
  answerQuestion(questionId: string, optionId: string): void;
  getActiveStages(): Stage[];
  getSkippedStages(): Stage[];
  isComplete(): boolean;
  getWorkflowRationale(): WorkflowRationale[];
}

/**
 * VALUE OBJECT: SimulatorQuestion
 * 
 * A question that affects workflow stage execution.
 */
interface SimulatorQuestion {
  readonly id: string;
  readonly prompt: string;
  readonly options: SimulatorOption[];
  readonly effects: Map<string, StageEffect>;
  readonly principle: string;
}

/**
 * VALUE OBJECT: SimulatorOption
 */
interface SimulatorOption {
  readonly id: string;
  readonly label: string;
}

/**
 * VALUE OBJECT: StageEffect
 * 
 * Describes how an answer affects stage execution.
 */
interface StageEffect {
  readonly addStages?: StageId[];
  readonly removeStages?: StageId[];
  readonly prioritize?: StageId[];
  readonly depth?: DepthLevel;
  readonly ceremony?: CeremonyLevel;
  readonly skipOptional?: boolean;
  readonly explanation: string;
}

type DepthLevel = 'minimal' | 'standard' | 'full' | 'thorough';
type CeremonyLevel = 'minimal' | 'standard' | 'full';
```


#### 2.4.2 Stage and Phase Value Objects

```typescript
/**
 * VALUE OBJECT: Phase
 * 
 * One of the three AI-SDLC phases.
 */
interface Phase {
  readonly id: PhaseId;
  readonly name: string;
  readonly goal: string;
  readonly ritual: string;
  readonly color: string;
  readonly icon: string;
}

type PhaseId = 'inception' | 'construction' | 'operations';

/**
 * VALUE OBJECT: Stage
 * 
 * A stage within a phase.
 */
interface Stage {
  readonly id: StageId;
  readonly phase: PhaseId;
  readonly name: string;
  readonly description: string;
  readonly alwaysExecute: boolean;
  readonly condition?: string;
  readonly artifacts: StageArtifact[];
  readonly gate: StageGate;
}

/**
 * VALUE OBJECT: StageArtifact
 */
interface StageArtifact {
  readonly path: string;
  readonly description: string;
}

/**
 * VALUE OBJECT: StageGate
 */
interface StageGate {
  readonly name: string;
  readonly criteria: string[];
  readonly evidenceRequired: string[];
}

/**
 * VALUE OBJECT: RequestType
 * 
 * A project type that pre-configures stage execution.
 */
interface RequestType {
  readonly id: RequestTypeId;
  readonly name: string;
  readonly description: string;
  readonly icon: string;
  readonly defaultRisk: RiskLevel;
  readonly stageConfig: Map<StageId, StageConfig>;
  readonly typicalQuestions: string[];
  readonly keyGates: string[];
}

type RequestTypeId = 'greenfield' | 'brownfield' | 'frontend' | 'bugfix';
type RiskLevel = 'low' | 'medium' | 'high';

/**
 * VALUE OBJECT: StageConfig
 */
interface StageConfig {
  readonly execute: boolean | 'conditional';
  readonly reason: string;
}
```


#### 2.4.3 Methodology Comparison Aggregate

```typescript
/**
 * AGGREGATE: MethodologyComparison
 * 
 * Compares Waterfall, Agile, and AI-SDLC methodologies.
 */
interface MethodologyComparison {
  readonly methodologies: Methodology[];
  readonly metrics: ComparisonMetric[];
  readonly scenarios: ProjectScenario[];
  
  getMethodology(id: string): Methodology | undefined;
  simulateProject(scenario: ProjectScenario, methodology: Methodology): SimulationResult;
}

/**
 * VALUE OBJECT: Methodology
 */
interface Methodology {
  readonly id: MethodologyId;
  readonly name: string;
  readonly description: string;
  readonly phases: MethodologyPhase[];
  readonly cycleTimeFactor: number;
  readonly costFactor: number;
  readonly feedbackLoopTime: string;
  readonly keyCharacteristics: string[];
  readonly strengths: string[];
  readonly weaknesses: string[];
}

type MethodologyId = 'waterfall' | 'agile' | 'aidlc';

/**
 * VALUE OBJECT: MethodologyPhase
 */
interface MethodologyPhase {
  readonly id: string;
  readonly name: string;
  readonly durationUnits: number;
  readonly description: string;
  readonly handoffs: number;
  readonly waitTime: number;
}

/**
 * VALUE OBJECT: ComparisonMetric
 */
interface ComparisonMetric {
  readonly name: string;
  readonly description: string;
  readonly waterfall: string;
  readonly agile: string;
  readonly aidlc: string;
  readonly winner: MethodologyId;
}

/**
 * VALUE OBJECT: ProjectScenario
 */
interface ProjectScenario {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly complexity: 'low' | 'medium' | 'high';
  readonly requirementsStability: 'stable' | 'evolving' | 'volatile';
  readonly teamSize: number;
  readonly baselineWeeks: number;
}

/**
 * VALUE OBJECT: SimulationResult
 */
interface SimulationResult {
  readonly methodologyId: MethodologyId;
  readonly totalWeeks: number;
  readonly totalCostUnits: number;
  readonly feedbackPoints: number;
  readonly handoffs: number;
  readonly riskEvents: string[];
}
```


### 2.5 Infrastructure Context (Generic Subdomain)

The Infrastructure Context handles cross-cutting concerns.

#### 2.5.1 State Persistence

```typescript
/**
 * AGGREGATE: PersistedState
 * 
 * The complete persisted state in localStorage.
 */
interface PersistedState {
  readonly $schema: 'state-v1';
  readonly version: string;
  readonly lastUpdated: Timestamp;
  readonly firstOpened: Timestamp;
  
  // Progress data
  readonly quiz: QuizProgressData;
  readonly gatekeeper: GatekeeperProgressData;
  readonly lessons: LessonProgressData;
  readonly simulator: SimulatorProgressData;
  readonly gym: GymProgressData;
  readonly transition: TransitionProgressData;
  readonly achievements: AchievementData;
  readonly gamification: GamificationData;
  
  // Preferences
  readonly theme: Theme;
  readonly colorTheme: ColorTheme;
}

/**
 * REPOSITORY: StateRepository
 * 
 * Handles persistence to localStorage.
 */
interface StateRepository {
  load(): PersistedState;
  save(state: PersistedState): boolean;
  reset(): PersistedState;
  isAvailable(): boolean;
}
```

#### 2.5.2 Theme Management

```typescript
/**
 * VALUE OBJECT: Theme
 * 
 * Light/dark mode preference.
 */
type Theme = 'dark' | 'light';

/**
 * VALUE OBJECT: ColorTheme
 * 
 * Color scheme preference.
 */
type ColorTheme = 'sunset' | 'matrix' | 'ocean' | 'mono';

/**
 * SERVICE: ThemeService
 * 
 * Manages theme state and persistence.
 */
interface ThemeService {
  getTheme(): Theme;
  setTheme(theme: Theme): void;
  toggleTheme(): void;
  getColorTheme(): ColorTheme;
  setColorTheme(colorTheme: ColorTheme): void;
}
```


---

## 3. Domain Events

Domain events capture significant state changes in the system.

```typescript
/**
 * DOMAIN EVENTS
 * 
 * Events that trigger side effects (XP awards, achievement checks).
 */

// Learning Events
interface LessonStartedEvent {
  type: 'LESSON_STARTED';
  lessonId: LessonId;
  timestamp: Timestamp;
}

interface LessonSectionCompletedEvent {
  type: 'LESSON_SECTION_COMPLETED';
  lessonId: LessonId;
  sectionIndex: number;
  timestamp: Timestamp;
}

interface LessonCompletedEvent {
  type: 'LESSON_COMPLETED';
  lessonId: LessonId;
  timestamp: Timestamp;
  // Triggers: +100 XP, achievement check
}

// Assessment Events
interface QuizAnsweredEvent {
  type: 'QUIZ_ANSWERED';
  questionId: string;
  isCorrect: boolean;
  timestamp: Timestamp;
  // Triggers: +25 XP if correct
}

interface QuizCompletedEvent {
  type: 'QUIZ_COMPLETED';
  score: Score;
  timestamp: Timestamp;
  // Triggers: +50 XP, +200 XP if perfect, achievement check
}

interface GatekeeperDecisionMadeEvent {
  type: 'GATEKEEPER_DECISION_MADE';
  scenarioId: string;
  isCorrect: boolean;
  timestamp: Timestamp;
  // Triggers: +30 XP if correct
}

interface GatekeeperCompletedEvent {
  type: 'GATEKEEPER_COMPLETED';
  score: Score;
  timestamp: Timestamp;
  // Triggers: +75 XP, achievement check
}

// Simulation Events
interface SimulationRunEvent {
  type: 'SIMULATION_RUN';
  requestType: RequestTypeId;
  isNewType: boolean;
  timestamp: Timestamp;
  // Triggers: +20 XP, +50 XP if new type, achievement check
}

// Achievement Events
interface AchievementUnlockedEvent {
  type: 'ACHIEVEMENT_UNLOCKED';
  achievementId: AchievementId;
  timestamp: Timestamp;
  // Triggers: +100 XP, notification
}

// Gym Events
interface GymTaskCompletedEvent {
  type: 'GYM_TASK_COMPLETED';
  taskId: string;
  timestamp: Timestamp;
  // Triggers: +15 XP
}

// Transition Events
interface TransitionItemCheckedEvent {
  type: 'TRANSITION_ITEM_CHECKED';
  itemId: string;
  timestamp: Timestamp;
  // Triggers: +10 XP
}

type DomainEvent =
  | LessonStartedEvent
  | LessonSectionCompletedEvent
  | LessonCompletedEvent
  | QuizAnsweredEvent
  | QuizCompletedEvent
  | GatekeeperDecisionMadeEvent
  | GatekeeperCompletedEvent
  | SimulationRunEvent
  | AchievementUnlockedEvent
  | GymTaskCompletedEvent
  | TransitionItemCheckedEvent;
```


---

## 4. Domain Services

Domain services encapsulate business logic that doesn't belong to a single entity.

```typescript
/**
 * SERVICE: XPCalculationService
 * 
 * Calculates XP rewards for actions.
 */
interface XPCalculationService {
  calculateReward(action: XPAction, multiplier?: number): number;
  calculateLevel(xp: XP): Level;
  getProgressToNextLevel(xp: XP): number;
  getXpToNextLevel(xp: XP): { xpToNext: number; nextThreshold: number };
}

/**
 * SERVICE: AchievementService
 * 
 * Checks and unlocks achievements.
 */
interface AchievementService {
  checkForNewAchievements(progress: LearnerProgress): Achievement[];
  getUnlockedAchievements(progress: LearnerProgress): Achievement[];
  getLockedAchievements(progress: LearnerProgress): Achievement[];
  getAchievementProgress(progress: LearnerProgress): {
    unlocked: number;
    total: number;
    percentage: number;
  };
}

/**
 * SERVICE: QuizRandomizationService
 * 
 * Randomizes quiz answer options while tracking correct answer.
 */
interface QuizRandomizationService {
  randomizeOptions(question: QuizQuestion): {
    options: string[];
    correctIndex: number;
  };
}

/**
 * SERVICE: GlossarySearchService
 * 
 * Searches glossary terms.
 */
interface GlossarySearchService {
  search(query: string, terms: GlossaryTerm[]): GlossaryTerm[];
  filterByLetter(letter: string, terms: GlossaryTerm[]): GlossaryTerm[];
}

/**
 * SERVICE: WorkflowCalculationService
 * 
 * Calculates stage execution based on simulator answers.
 */
interface WorkflowCalculationService {
  calculateStageExecution(
    answers: SimulatorAnswer[],
    requestType: RequestType | null,
    stages: Stage[]
  ): StageExecutionPlan;
  
  getStageRationale(
    stageId: StageId,
    answers: SimulatorAnswer[]
  ): string;
}

/**
 * SERVICE: ProjectSimulationService
 * 
 * Simulates project outcomes for different methodologies.
 */
interface ProjectSimulationService {
  simulate(
    scenario: ProjectScenario,
    methodology: Methodology
  ): SimulationResult;
}
```


---

## 5. Application Services (Use Cases)

Application services orchestrate domain objects to fulfill use cases.

```typescript
/**
 * APPLICATION SERVICE: ProgressService
 * 
 * Orchestrates progress tracking and XP awards.
 */
interface ProgressService {
  // XP Operations
  addXp(action: XPAction, multiplier?: number): number;
  
  // Lesson Operations
  startLesson(lessonId: LessonId): void;
  updateLessonProgress(lessonId: LessonId, sectionIndex: number): void;
  completeLesson(lessonId: LessonId): void;
  
  // Quiz Operations
  saveQuizResult(score: number, total: number): void;
  
  // Gatekeeper Operations
  saveGatekeeperResult(score: number, total: number): void;
  
  // Simulator Operations
  recordSimulationRun(requestType: RequestTypeId): void;
  
  // Gym Operations
  toggleGymTask(taskId: string): void;
  
  // Transition Operations
  toggleTransitionItem(itemId: string): void;
  
  // Reset
  resetProgress(): void;
  
  // Queries
  getProgress(): LearnerProgress;
}

/**
 * APPLICATION SERVICE: QuizService
 * 
 * Manages quiz sessions.
 */
interface QuizService {
  startQuiz(): QuizSession;
  answerQuestion(session: QuizSession, questionIndex: number, selectedOption: number): QuizAnswer;
  completeQuiz(session: QuizSession): Score;
  getQuestions(): QuizQuestion[];
}

/**
 * APPLICATION SERVICE: GatekeeperService
 * 
 * Manages gatekeeper practice sessions.
 */
interface GatekeeperService {
  startSession(): GatekeeperSession;
  makeDecision(session: GatekeeperSession, scenarioId: string, decision: GateDecision): GatekeeperAnswer;
  completeSession(session: GatekeeperSession): Score;
  getScenarios(): GatekeeperScenario[];
}

/**
 * APPLICATION SERVICE: SimulatorService
 * 
 * Manages workflow simulation sessions.
 */
interface SimulatorService {
  startSimulation(requestType?: RequestTypeId): SimulatorSession;
  answerQuestion(session: SimulatorSession, questionId: string, optionId: string): void;
  getWorkflowResult(session: SimulatorSession): WorkflowResult;
  getRequestTypes(): RequestType[];
  getQuestions(): SimulatorQuestion[];
}

/**
 * APPLICATION SERVICE: LessonService
 * 
 * Manages lesson navigation and progress.
 */
interface LessonService {
  getLessons(): Lesson[];
  getLesson(id: LessonId): Lesson | undefined;
  getLessonProgress(lessonId: LessonId): LessonProgressState | undefined;
  isLessonCompleted(lessonId: LessonId): boolean;
}
```


---

## 6. Invariants and Business Rules

### 6.1 XP System Invariants

```typescript
/**
 * XP INVARIANTS
 */
const XP_INVARIANTS = {
  // XP can never be negative
  XP_NON_NEGATIVE: (xp: number) => xp >= 0,
  
  // XP can only increase (no deductions)
  XP_MONOTONIC_INCREASE: (oldXp: number, newXp: number) => newXp >= oldXp,
  
  // Level must match XP thresholds
  LEVEL_MATCHES_XP: (xp: number, level: number) => {
    const thresholds = [0, 100, 300, 600, 1000, 1500, 2500, 4000];
    const expectedLevel = thresholds.filter(t => xp >= t).length;
    return level === expectedLevel;
  },
  
  // XP rewards are positive
  XP_REWARD_POSITIVE: (reward: number) => reward > 0,
};
```

### 6.2 Achievement Invariants

```typescript
/**
 * ACHIEVEMENT INVARIANTS
 */
const ACHIEVEMENT_INVARIANTS = {
  // Once unlocked, achievements cannot be re-locked
  ACHIEVEMENT_PERMANENT: (
    previousAchievements: string[],
    currentAchievements: string[]
  ) => previousAchievements.every(a => currentAchievements.includes(a)),
  
  // Achievement can only be unlocked if criteria is met
  ACHIEVEMENT_CRITERIA_MET: (
    achievementId: string,
    progress: LearnerProgress
  ) => {
    const criteria = ACHIEVEMENT_CRITERIA[achievementId];
    return criteria ? criteria.check(progress) : false;
  },
  
  // No duplicate achievements
  ACHIEVEMENT_UNIQUE: (achievements: string[]) => 
    new Set(achievements).size === achievements.length,
};
```

### 6.3 Quiz Invariants

```typescript
/**
 * QUIZ INVARIANTS
 */
const QUIZ_INVARIANTS = {
  // Score cannot exceed total questions
  SCORE_BOUNDED: (score: number, total: number) => 
    score >= 0 && score <= total,
  
  // Best score is always >= last score (if last was better)
  BEST_SCORE_MAINTAINED: (lastScore: number, bestScore: number) =>
    bestScore >= lastScore || bestScore >= 0,
  
  // Attempts only increase
  ATTEMPTS_MONOTONIC: (oldAttempts: number, newAttempts: number) =>
    newAttempts >= oldAttempts,
  
  // Answer index must be valid
  ANSWER_INDEX_VALID: (index: number, optionsCount: number) =>
    index >= 0 && index < optionsCount,
};
```

### 6.4 Lesson Progress Invariants

```typescript
/**
 * LESSON PROGRESS INVARIANTS
 */
const LESSON_INVARIANTS = {
  // Section index must be within bounds
  SECTION_INDEX_VALID: (index: number, sectionCount: number) =>
    index >= 0 && index < sectionCount,
  
  // Completed lessons cannot be in-progress
  COMPLETED_NOT_IN_PROGRESS: (
    completed: string[],
    inProgress: Map<string, unknown>
  ) => !completed.some(id => inProgress.has(id)),
  
  // Lesson can only be completed if all sections visited
  COMPLETION_REQUIRES_ALL_SECTIONS: (
    lessonId: string,
    lastSection: number,
    totalSections: number
  ) => lastSection === totalSections - 1,
};
```


---

## 7. State Machine: Learner Journey

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        LEARNER JOURNEY STATE MACHINE                         │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│                              ┌─────────────┐                                │
│                              │   NEW USER  │                                │
│                              │  (Novice)   │                                │
│                              └──────┬──────┘                                │
│                                     │                                        │
│                                     ▼                                        │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │                         LEARNING ACTIVITIES                           │   │
│  │                                                                       │   │
│  │   ┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐          │   │
│  │   │ LESSONS │    │  QUIZ   │    │  GATE   │    │SIMULATOR│          │   │
│  │   │         │    │         │    │ KEEPER  │    │         │          │   │
│  │   └────┬────┘    └────┬────┘    └────┬────┘    └────┬────┘          │   │
│  │        │              │              │              │                │   │
│  │        └──────────────┴──────────────┴──────────────┘                │   │
│  │                              │                                        │   │
│  │                              ▼                                        │   │
│  │                    ┌─────────────────┐                               │   │
│  │                    │   XP AWARDED    │                               │   │
│  │                    └────────┬────────┘                               │   │
│  │                             │                                        │   │
│  └─────────────────────────────┼────────────────────────────────────────┘   │
│                                │                                             │
│                                ▼                                             │
│                    ┌─────────────────────┐                                  │
│                    │  ACHIEVEMENT CHECK  │                                  │
│                    └────────┬────────────┘                                  │
│                             │                                                │
│              ┌──────────────┴──────────────┐                                │
│              │                             │                                 │
│              ▼                             ▼                                 │
│    ┌─────────────────┐          ┌─────────────────┐                        │
│    │  NO NEW UNLOCK  │          │ ACHIEVEMENT     │                        │
│    │                 │          │ UNLOCKED        │                        │
│    └─────────────────┘          │ (+100 XP)       │                        │
│                                 └────────┬────────┘                        │
│                                          │                                  │
│                                          ▼                                  │
│                              ┌─────────────────────┐                       │
│                              │   LEVEL UP CHECK    │                       │
│                              └────────┬────────────┘                       │
│                                       │                                     │
│                        ┌──────────────┴──────────────┐                     │
│                        │                             │                      │
│                        ▼                             ▼                      │
│              ┌─────────────────┐          ┌─────────────────┐              │
│              │  SAME LEVEL     │          │  LEVEL UP!      │              │
│              │                 │          │  New Title      │              │
│              └─────────────────┘          └─────────────────┘              │
│                                                                              │
│                                                                              │
│  LEVEL PROGRESSION:                                                         │
│  ─────────────────                                                          │
│  Novice (0) → Apprentice (100) → Practitioner (300) → Specialist (600)     │
│  → Expert (1000) → Master (1500) → Grandmaster (2500) → Champion (4000)    │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```


---

## 8. Data Flow: XP Award Sequence

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        XP AWARD SEQUENCE DIAGRAM                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  User          UI Component      ProgressService    XPService    Storage    │
│   │                 │                  │               │            │       │
│   │  Complete       │                  │               │            │       │
│   │  Activity       │                  │               │            │       │
│   │────────────────►│                  │               │            │       │
│   │                 │                  │               │            │       │
│   │                 │  addXp(action)   │               │            │       │
│   │                 │─────────────────►│               │            │       │
│   │                 │                  │               │            │       │
│   │                 │                  │ calculateReward│            │       │
│   │                 │                  │──────────────►│            │       │
│   │                 │                  │               │            │       │
│   │                 │                  │◄──────────────│            │       │
│   │                 │                  │  xpAmount     │            │       │
│   │                 │                  │               │            │       │
│   │                 │                  │ calculateLevel│            │       │
│   │                 │                  │──────────────►│            │       │
│   │                 │                  │               │            │       │
│   │                 │                  │◄──────────────│            │       │
│   │                 │                  │  {level,title}│            │       │
│   │                 │                  │               │            │       │
│   │                 │                  │ checkAchievements          │       │
│   │                 │                  │───────────────────────────►│       │
│   │                 │                  │               │            │       │
│   │                 │                  │◄───────────────────────────│       │
│   │                 │                  │  newAchievements           │       │
│   │                 │                  │               │            │       │
│   │                 │                  │ persistState  │            │       │
│   │                 │                  │───────────────────────────►│       │
│   │                 │                  │               │            │       │
│   │                 │◄─────────────────│               │            │       │
│   │                 │  xpGained        │               │            │       │
│   │                 │                  │               │            │       │
│   │◄────────────────│                  │               │            │       │
│   │  Update UI      │                  │               │            │       │
│   │  (XP bar,       │                  │               │            │       │
│   │   notifications)│                  │               │            │       │
│   │                 │                  │               │            │       │
└─────────────────────────────────────────────────────────────────────────────┘
```


---

## 9. Entity Relationship Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        ENTITY RELATIONSHIP DIAGRAM                           │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                        LEARNER PROGRESS                              │    │
│  │                        (Aggregate Root)                              │    │
│  ├─────────────────────────────────────────────────────────────────────┤    │
│  │  xp: XP                                                              │    │
│  │  level: Level                                                        │    │
│  │  firstOpened: Timestamp                                              │    │
│  │  lastUpdated: Timestamp                                              │    │
│  └───────────────────────────────┬─────────────────────────────────────┘    │
│                                  │                                           │
│          ┌───────────────────────┼───────────────────────┐                  │
│          │                       │                       │                   │
│          ▼                       ▼                       ▼                   │
│  ┌───────────────┐      ┌───────────────┐      ┌───────────────┐           │
│  │ LessonProgress│      │ QuizProgress  │      │GatekeeperProg │           │
│  ├───────────────┤      ├───────────────┤      ├───────────────┤           │
│  │ completed[]   │      │ completed     │      │ completed     │           │
│  │ inProgress{}  │      │ lastScore     │      │ lastScore     │           │
│  └───────┬───────┘      │ bestScore     │      │ bestScore     │           │
│          │              │ attempts      │      │ attempts      │           │
│          │              └───────────────┘      └───────────────┘           │
│          │                                                                   │
│          ▼                                                                   │
│  ┌───────────────┐                                                          │
│  │LessonProgState│                                                          │
│  ├───────────────┤                                                          │
│  │ lessonId      │                                                          │
│  │ lastSection   │                                                          │
│  │ startedAt     │                                                          │
│  └───────────────┘                                                          │
│                                                                              │
│          ┌───────────────────────┼───────────────────────┐                  │
│          │                       │                       │                   │
│          ▼                       ▼                       ▼                   │
│  ┌───────────────┐      ┌───────────────┐      ┌───────────────┐           │
│  │SimulatorProg  │      │  GymProgress  │      │TransitionProg │           │
│  ├───────────────┤      ├───────────────┤      ├───────────────┤           │
│  │ runs          │      │completedTasks │      │ checklist[]   │           │
│  │ typesExplored │      └───────────────┘      └───────────────┘           │
│  │ lastRun       │                                                          │
│  └───────────────┘                                                          │
│                                                                              │
│                                  │                                           │
│                                  ▼                                           │
│                         ┌───────────────┐                                   │
│                         │ Achievement[] │                                   │
│                         ├───────────────┤                                   │
│                         │ id            │                                   │
│                         │ name          │                                   │
│                         │ description   │                                   │
│                         │ icon          │                                   │
│                         │ criteria      │                                   │
│                         └───────────────┘                                   │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```


---

## 10. Content Domain Model

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        CONTENT DOMAIN MODEL                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  LEARNING CONTENT                                                            │
│  ────────────────                                                            │
│                                                                              │
│  ┌─────────────┐         ┌─────────────┐         ┌─────────────┐           │
│  │   LESSON    │ 1───* │   SECTION   │ 0..1──1 │   DIAGRAM   │           │
│  ├─────────────┤         ├─────────────┤         ├─────────────┤           │
│  │ id          │         │ id          │         │ type        │           │
│  │ title       │         │ title       │         │ content?    │           │
│  │ description │         │ content     │         └─────────────┘           │
│  └─────────────┘         └─────────────┘                                    │
│                                                                              │
│  ┌─────────────┐                                                            │
│  │  GLOSSARY   │                                                            │
│  │   TERM      │                                                            │
│  ├─────────────┤                                                            │
│  │ id          │                                                            │
│  │ term        │◄────────────────────────────────────────────┐              │
│  │ definition  │                                              │              │
│  │ example     │         ┌─────────────┐                     │              │
│  │ related[]   │─────────│ RELATED     │─────────────────────┘              │
│  │ source      │         │ TERMS       │  (self-referential)               │
│  └─────────────┘         └─────────────┘                                    │
│                                                                              │
│  ASSESSMENT CONTENT                                                          │
│  ──────────────────                                                          │
│                                                                              │
│  ┌─────────────┐         ┌─────────────┐                                    │
│  │    QUIZ     │ 1───* │  QUESTION   │                                    │
│  ├─────────────┤         ├─────────────┤                                    │
│  │ id          │         │ id          │                                    │
│  │ title       │         │ prompt      │                                    │
│  │ description │         │ options[]   │                                    │
│  └─────────────┘         │ correct     │                                    │
│                          │ explanation │                                    │
│                          │ sources     │                                    │
│                          └─────────────┘                                    │
│                                                                              │
│  ┌─────────────┐                                                            │
│  │ GATEKEEPER  │                                                            │
│  │  SCENARIO   │                                                            │
│  ├─────────────┤                                                            │
│  │ id          │                                                            │
│  │ phase       │                                                            │
│  │ stage       │                                                            │
│  │ context     │                                                            │
│  │ aiPlan      │                                                            │
│  │ flaws[]     │                                                            │
│  │ decisions   │                                                            │
│  │ evidence[]  │                                                            │
│  └─────────────┘                                                            │
│                                                                              │
│  SIMULATION CONTENT                                                          │
│  ──────────────────                                                          │
│                                                                              │
│  ┌─────────────┐         ┌─────────────┐         ┌─────────────┐           │
│  │   PHASE     │ 1───* │   STAGE     │ 1───1 │    GATE     │           │
│  ├─────────────┤         ├─────────────┤         ├─────────────┤           │
│  │ id          │         │ id          │         │ name        │           │
│  │ name        │         │ name        │         │ criteria[]  │           │
│  │ goal        │         │ description │         │ evidence[]  │           │
│  │ ritual      │         │ alwaysExec  │         └─────────────┘           │
│  │ color       │         │ condition?  │                                    │
│  │ icon        │         │ artifacts[] │                                    │
│  └─────────────┘         └─────────────┘                                    │
│                                                                              │
│  ┌─────────────┐         ┌─────────────┐                                    │
│  │ REQUEST     │ 1───* │STAGE CONFIG │                                    │
│  │   TYPE      │         ├─────────────┤                                    │
│  ├─────────────┤         │ execute     │                                    │
│  │ id          │         │ reason      │                                    │
│  │ name        │         └─────────────┘                                    │
│  │ description │                                                            │
│  │ icon        │                                                            │
│  │ defaultRisk │                                                            │
│  │ keyGates[]  │                                                            │
│  └─────────────┘                                                            │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```


---

## 11. Implementation Mapping

### 11.1 Current Implementation vs Domain Model

| Domain Concept | Current Implementation | Location |
|----------------|----------------------|----------|
| LearnerProgress | `ProgressState` | `src/types/index.ts` |
| XP | `number` (should be Value Object) | `src/lib/xp.ts` |
| Level | `{ level, title }` | `src/lib/xp.ts` |
| Achievement | `Achievement` interface | `src/lib/achievements.ts` |
| LessonProgress | `LessonProgress` | `src/types/index.ts` |
| QuizProgress | `QuizProgress` | `src/types/index.ts` |
| GatekeeperProgress | `GatekeeperProgress` | `src/types/index.ts` |
| SimulatorProgress | `SimulatorProgress` | `src/types/index.ts` |
| PersistedState | `StoredState` | `src/lib/storage.ts` |
| StateRepository | `loadState/saveState` | `src/lib/storage.ts` |
| ProgressService | `ProgressContext` | `src/context/ProgressContext.tsx` |
| ThemeService | `ThemeContext` | `src/context/ThemeContext.tsx` |
| Lesson | `Lesson` | `src/content/lessons.ts` |
| QuizQuestion | `QuizQuestion` | `src/content/quiz.ts` |
| GatekeeperScenario | `GatekeeperScenario` | `src/content/gates.ts` |
| GlossaryTerm | `GlossaryTerm` | `src/content/glossary.ts` |
| Stage | `Stage` | `src/content/simulator/stages.ts` |
| RequestType | `RequestType` | `src/content/simulator/requestTypes.ts` |
| Methodology | `Methodology` | `src/content/comparison.ts` |

### 11.2 Recommended Refactoring

1. **Extract Value Objects**: Create proper XP and Level value objects with validation
2. **Domain Events**: Implement event-driven XP awards instead of direct calls
3. **Repository Pattern**: Formalize StateRepository interface
4. **Service Layer**: Extract domain services from context providers
5. **Invariant Enforcement**: Add runtime validation for business rules


---

## 12. Ubiquitous Language

The following terms form the ubiquitous language of the AI-SDLC Explainer domain:

| Term | Definition |
|------|------------|
| **Learner** | A user of the AI-SDLC Explainer who is learning the methodology |
| **XP (Experience Points)** | Numeric reward earned by completing learning activities |
| **Level** | Progression tier (1-8) determined by accumulated XP |
| **Title** | Human-readable name for a level (Novice, Apprentice, etc.) |
| **Achievement** | A badge unlocked by meeting specific criteria |
| **Lesson** | A structured learning unit with multiple sections |
| **Section** | A single page of content within a lesson |
| **Quiz** | A knowledge assessment with multiple-choice questions |
| **Gatekeeper Scenario** | A practice exercise for gate approval decisions |
| **Gate Decision** | An approve/reject choice for an AI-generated plan |
| **Simulator** | Interactive tool for exploring workflow adaptation |
| **Request Type** | A project category (greenfield, brownfield, frontend, bugfix) |
| **Stage** | A step in the AI-SDLC workflow |
| **Phase** | One of three AI-SDLC phases (Inception, Construction, Operations) |
| **Glossary Term** | A definition of AI-SDLC terminology |
| **Progress** | The learner's completion state across all activities |
| **Gym Task** | A practice exercise in the learning gym |
| **Transition Checklist** | Readiness items for Agile→AI-SDLC transition |

---

## 13. Implementation Notes (Post-Gamification Enhancement)

### 13.1 Components Implemented

The following React components implement the gamification domain model:

| Component | Purpose | Location |
|-----------|---------|----------|
| `MiniXPIndicator` | Compact XP/level display (3 variants) | `src/components/MiniXPIndicator.tsx` |
| `GlobalXPHeader` | Fixed header XP indicator | `src/components/GlobalXPHeader.tsx` |
| `AchievementToast` | Achievement unlock notification | `src/components/AchievementToast.tsx` |
| `LevelUpModal` | Level-up celebration modal | `src/components/LevelUpModal.tsx` |
| `ProgressDashboard` | Home page progress overview | `src/components/ProgressDashboard.tsx` |
| `XPBar` | Full XP bar with level info | `src/components/XPBar.tsx` |

### 13.2 State Management

The `ProgressContext` (`src/context/ProgressContext.tsx`) implements the LearnerProgress aggregate:

- **State**: Maps to `ProgressState` type
- **Persistence**: localStorage via `StoredState`
- **XP Calculation**: Uses `src/lib/xp.ts`
- **Achievement Checking**: Uses `src/lib/achievements.ts`

### 13.3 XP Rewards Implemented

| Action | XP | Implementation |
|--------|-----|----------------|
| `lesson_completed` | 100 | LessonClient.tsx |
| `lesson_section` | 10 | LessonClient.tsx |
| `quiz_correct` | 25 × score | quiz/page.tsx |
| `quiz_completed` | 50 | quiz/page.tsx |
| `quiz_perfect` | 200 | quiz/page.tsx |
| `gate_correct` | 30 × score | gatekeeper/page.tsx |
| `gate_completed` | 75 | gatekeeper/page.tsx |
| `simulator_run` | 20 | simulator/page.tsx |
| `simulator_new_type` | 50 | simulator/page.tsx |
| `gym_task` | 15 | gym/page.tsx |
| `transition_check` | 5 | transition/page.tsx |
| `glossary_term_viewed` | 3 | glossary/page.tsx |
| `reference_section_viewed` | 10 | reference/page.tsx |
| `achievement_unlocked` | 100 | ProgressContext.tsx |

### 13.4 Domain Events Implementation

Domain events are implemented as side effects in `ProgressContext`:

- **Achievement Unlocked**: Triggers `showAchievementNotification()` with toast + optional confetti
- **Level Up**: Triggers `showLevelUpCelebration()` with modal + confetti
- **XP Gained**: Triggers animated `+XP` popup in `MiniXPIndicator`

---

## 14. Summary

This domain model provides a comprehensive DDD-based design for the AI-SDLC Explainer web application. Key highlights:

1. **Five Bounded Contexts**: Learning, Gamification, Assessment, Simulation, Infrastructure
2. **Core Subdomain**: Gamification (drives engagement and retention)
3. **Aggregate Root**: LearnerProgress (coordinates all progress tracking)
4. **Value Objects**: XP, Level, Score, Achievement, etc.
5. **Domain Events**: Trigger XP awards and achievement checks
6. **Invariants**: Ensure XP monotonicity, achievement permanence, score bounds
7. **Services**: XP calculation, achievement checking, quiz randomization

The model emphasizes the gamification elements that motivate learners through:
- Progressive XP accumulation
- Level-based progression with titles
- Achievement unlocking with criteria
- Activity completion tracking across lessons, quizzes, gatekeeper, and simulator

---

*Document generated following AI-SDLC methodology principles.*
*Last updated: 2026-02-04 (Post-Gamification Enhancement)*
