# Design Document: AI-DLC Web Application

## Overview

This design document describes the architecture and implementation approach for converting the AI-SDLC Explainer TUI application to a modern Next.js web application. The application will be a fully static, client-side React application that teaches the AI-Driven Development Lifecycle methodology through interactive learning modules.

The web application preserves all functionality from the TUI while enhancing the user experience with modern GUI affordances, smooth animations, and responsive design. All content is embedded at build time, enabling deployment to Vercel as a static site with no backend dependencies.

## Architecture

The application follows a component-based architecture using Next.js App Router with the following key architectural decisions:

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        Next.js App Router                        │
├─────────────────────────────────────────────────────────────────┤
│  Pages (Routes)                                                  │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐   │
│  │  Home   │ │ Lessons │ │  Quiz   │ │Simulator│ │ Glossary│   │
│  └────┬────┘ └────┬────┘ └────┬────┘ └────┬────┘ └────┬────┘   │
│       │           │           │           │           │         │
├───────┴───────────┴───────────┴───────────┴───────────┴─────────┤
│  Shared Components                                               │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐           │
│  │Navigation│ │ Progress │ │  Theme   │ │ Keyboard │           │
│  │  Header  │ │ Dashboard│ │  Toggle  │ │  Handler │           │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘           │
├─────────────────────────────────────────────────────────────────┤
│  Hooks & Context                                                 │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐           │
│  │useProgress│ │ useTheme │ │useKeyboard│ │useContent│          │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘           │
├─────────────────────────────────────────────────────────────────┤
│  Content Layer (Static JSON/TypeScript)                          │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐           │
│  │ Lessons  │ │  Quiz    │ │ Glossary │ │ Simulator│           │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘           │
├─────────────────────────────────────────────────────────────────┤
│  localStorage (Client-Side Persistence)                          │
└─────────────────────────────────────────────────────────────────┘
```

### Technology Stack

- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom design tokens
- **State Management**: React Context + localStorage
- **Animations**: CSS transitions + Framer Motion (optional)
- **Build**: Static Site Generation (SSG)
- **Deployment**: Vercel

### Directory Structure

```
src/
├── app/                          # Next.js App Router pages
│   ├── layout.tsx               # Root layout with providers
│   ├── page.tsx                 # Home page
│   ├── lessons/
│   │   ├── page.tsx             # Lessons list
│   │   └── [lessonId]/
│   │       └── page.tsx         # Individual lesson view
│   ├── practice/
│   │   ├── page.tsx             # Practice mode selection
│   │   ├── quiz/
│   │   │   └── page.tsx         # Quiz interface
│   │   └── gatekeeper/
│   │       └── page.tsx         # Gatekeeper scenarios
│   ├── simulator/
│   │   └── page.tsx             # Interactive simulator
│   ├── comparison/
│   │   └── page.tsx             # Methodology comparison
│   ├── transition/
│   │   └── page.tsx             # Transition mapping
│   ├── glossary/
│   │   └── page.tsx             # Glossary browser
│   ├── reference/
│   │   └── page.tsx             # Quick reference
│   ├── artifacts/
│   │   └── page.tsx             # Artifact explorer
│   └── sources/
│       └── page.tsx             # Sources and references
├── components/
│   ├── layout/
│   │   ├── Header.tsx           # Navigation header
│   │   ├── Sidebar.tsx          # Optional sidebar navigation
│   │   └── Footer.tsx           # Footer with keyboard hints
│   ├── home/
│   │   ├── MenuGrid.tsx         # Main menu grid
│   │   └── ProgressDashboard.tsx # XP/level/achievements display
│   ├── lessons/
│   │   ├── LessonCard.tsx       # Lesson list item
│   │   ├── LessonViewer.tsx     # Lesson content display
│   │   ├── SectionNav.tsx       # Section navigation
│   │   └── AsciiDiagram.tsx     # Monospace diagram renderer
│   ├── practice/
│   │   ├── QuizQuestion.tsx     # Quiz question display
│   │   ├── QuizResults.tsx      # Quiz results summary
│   │   ├── GatekeeperScenario.tsx # Scenario display
│   │   └── GatekeeperResults.tsx  # Gatekeeper results
│   ├── simulator/
│   │   ├── QuestionFlow.tsx     # Question presentation
│   │   ├── WorkflowDiagram.tsx  # Stage visualization
│   │   └── RequestTypeSelector.tsx # Request type selection
│   ├── comparison/
│   │   ├── TimelineAnimation.tsx # Animated methodology timeline
│   │   ├── MetricsTable.tsx     # Comparison metrics table
│   │   └── ProjectSimulator.tsx # Project scenario simulator
│   ├── transition/
│   │   ├── RoleMappingCard.tsx  # Role mapping display
│   │   ├── ProcessMappingTable.tsx # Process comparison
│   │   └── ReadinessChecklist.tsx # Transition checklist
│   ├── glossary/
│   │   ├── TermList.tsx         # Alphabetical term list
│   │   ├── TermDetail.tsx       # Term definition display
│   │   └── SearchInput.tsx      # Search/filter input
│   └── shared/
│       ├── Button.tsx           # Styled button component
│       ├── Card.tsx             # Content card component
│       ├── Modal.tsx            # Modal dialog
│       ├── ThemeToggle.tsx      # Dark/light mode toggle
│       └── KeyboardHint.tsx     # Keyboard shortcut hints
├── content/
│   ├── lessons.ts               # Embedded lesson content
│   ├── quiz.ts                  # Quiz questions
│   ├── gates.ts                 # Gatekeeper scenarios
│   ├── glossary.ts              # Glossary terms
│   ├── simulator/
│   │   ├── questions.ts         # Simulator questions
│   │   ├── stages.ts            # Stage definitions
│   │   └── requestTypes.ts      # Request type definitions
│   ├── comparison.ts            # Methodology comparison data
│   └── transition.ts            # Transition mapping data
├── hooks/
│   ├── useProgress.ts           # Progress/XP management
│   ├── useTheme.ts              # Theme management
│   ├── useKeyboard.ts           # Keyboard navigation
│   └── useLocalStorage.ts       # localStorage wrapper
├── context/
│   ├── ProgressContext.tsx      # Progress state provider
│   └── ThemeContext.tsx         # Theme state provider
├── lib/
│   ├── storage.ts               # localStorage utilities
│   ├── xp.ts                    # XP calculation logic
│   └── achievements.ts          # Achievement checking logic
├── types/
│   └── index.ts                 # TypeScript type definitions
└── styles/
    └── globals.css              # Global styles + Tailwind
```

## Components and Interfaces

### Core Type Definitions

```typescript
// types/index.ts

// Lesson Types
interface Section {
  id: string;
  title: string;
  content: string;
  diagram?: string;
}

interface Lesson {
  id: string;
  title: string;
  description: string;
  sections: Section[];
}

// Quiz Types
interface QuizQuestion {
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

interface QuizState {
  currentQuestion: number;
  answers: number[];
  score: number;
  completed: boolean;
}

// Gatekeeper Types
interface GatekeeperScenario {
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
}

// Simulator Types
interface SimulatorQuestion {
  id: string;
  prompt: string;
  options: { id: string; label: string }[];
  effects: Record<string, {
    add_stages?: string[];
    remove_stages?: string[];
    explanation: string;
  }>;
}

interface Stage {
  id: string;
  phase: string;
  name: string;
  description: string;
  always_execute: boolean;
  condition?: string;
}

// Glossary Types
interface GlossaryTerm {
  id: string;
  term: string;
  definition: string;
  example: string;
  related: string[];
  source: string;
}

// Progress Types
interface ProgressState {
  xp: number;
  level: number;
  title: string;
  lessons: {
    completed: string[];
    inProgress: Record<string, { lastSection: number }>;
  };
  quiz: {
    completed: boolean;
    lastScore: number;
    bestScore: number;
    attempts: number;
  };
  gatekeeper: {
    completed: boolean;
    lastScore: number;
    bestScore: number;
    attempts: number;
  };
  simulator: {
    runs: number;
    requestTypesExplored: string[];
  };
  achievements: string[];
}

// Theme Types
type Theme = 'dark' | 'light';
```

### Key Component Interfaces

```typescript
// Progress Context
interface ProgressContextValue {
  state: ProgressState;
  addXp: (action: string, multiplier?: number) => number;
  markLessonCompleted: (lessonId: string) => void;
  updateLessonProgress: (lessonId: string, sectionIndex: number) => void;
  saveQuizResult: (score: number, total: number) => void;
  saveGatekeeperResult: (score: number, total: number) => void;
  recordSimulationRun: (requestType: string) => void;
  resetProgress: () => void;
}

// Theme Context
interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

// Keyboard Hook
interface UseKeyboardOptions {
  onEscape?: () => void;
  onArrowLeft?: () => void;
  onArrowRight?: () => void;
  onArrowUp?: () => void;
  onArrowDown?: () => void;
  onEnter?: () => void;
  onNumber?: (num: number) => void;
  enabled?: boolean;
}
```

### Component Specifications

#### Header Component
- Displays app title and current location breadcrumb
- Contains theme toggle button
- Shows XP/level indicator (compact)
- Provides home navigation link

#### MenuGrid Component
- Renders 9 navigation options in a responsive grid
- Each option shows icon, title, and brief description
- Highlights keyboard shortcut (1-9)
- Shows completion status indicator where applicable

#### ProgressDashboard Component
- Displays current XP with progress bar to next level
- Shows current level and title
- Lists unlocked achievements with icons
- Provides overall completion percentage

#### LessonViewer Component
- Renders lesson content with markdown-like formatting
- Displays ASCII diagrams in monospace font with proper spacing
- Shows section navigation (previous/next)
- Displays progress indicator (section X of Y)

#### QuizQuestion Component
- Displays question prompt
- Renders randomized answer options as clickable cards
- Highlights selected answer
- Shows correct/incorrect feedback with explanation
- Supports keyboard selection (1-4)

#### GatekeeperScenario Component
- Displays scenario context and AI plan
- Renders Approve/Reject decision buttons
- Shows flaws list and evidence checklist on reveal
- Provides explanation of correct decision

#### WorkflowDiagram Component
- Visualizes three phases (Inception, Construction, Operations)
- Shows stages within each phase
- Indicates execute/skip status with visual styling
- Displays rationale tooltips on hover

#### TimelineAnimation Component
- Animates methodology phases sequentially
- Shows relative duration through bar width
- Highlights handoff points between phases
- Supports play/pause/reset controls

## Data Models

### localStorage Schema

```typescript
// Storage key: 'aidlc-explainer-state'
interface StoredState {
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
}
```

### XP Rewards Configuration

```typescript
const XP_REWARDS = {
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
};

const LEVEL_THRESHOLDS = [
  { threshold: 0, title: 'Novice' },
  { threshold: 100, title: 'Apprentice' },
  { threshold: 300, title: 'Practitioner' },
  { threshold: 600, title: 'Specialist' },
  { threshold: 1000, title: 'Expert' },
  { threshold: 1500, title: 'Master' },
  { threshold: 2500, title: 'Grandmaster' },
  { threshold: 4000, title: 'AI-DLC Champion' },
];
```

### Achievement Definitions

```typescript
const ACHIEVEMENTS = [
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
    check: (state: ProgressState) => state.quiz.bestScore >= 20,
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
    check: (state: ProgressState) => state.gatekeeper.bestScore >= 8,
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
    check: (state: ProgressState) => /* all other achievements unlocked */,
  },
];
```

### Content Embedding Strategy

All content from the TUI application will be converted to TypeScript modules:

```typescript
// content/lessons.ts
export const LESSONS: Lesson[] = [
  {
    id: 'aidlc-overview',
    title: 'AI-DLC Overview',
    description: 'Learn the fundamentals of AI-Driven Development Lifecycle',
    sections: [
      {
        id: 'what-is-aidlc',
        title: 'What is AI-DLC?',
        content: `AI-DLC (AI-Driven Development Lifecycle) is a transformative approach...`,
        diagram: undefined,
      },
      // ... more sections
    ],
  },
  // ... more lessons
];

// content/quiz.ts
export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    prompt: 'What are the three phases of AI-DLC?',
    options: [
      'Planning, Development, Testing',
      'Inception, Construction, Operations',
      'Design, Build, Deploy',
      'Analysis, Implementation, Maintenance',
    ],
    correct: 1,
    explanation: 'AI-DLC has three phases: Inception (what/why), Construction (how), and Operations (run/monitor).',
    sources: {
      local: ['AI-SDLC_best-practice_method_principles.md#L76'],
      upstream: ['https://aws.amazon.com/blogs/devops/ai-driven-development-life-cycle/'],
    },
  },
  // ... 23 more questions
];

// content/glossary.ts
export const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    id: 'aidlc',
    term: 'AI-DLC',
    definition: 'AI-Driven Development Lifecycle. A methodology where AI is a central collaborator...',
    example: 'In AI-DLC, the AI generates a requirements plan, humans approve it, then AI implements.',
    related: ['sdlc', 'inception', 'construction', 'operations'],
    source: 'AI-SDLC_best-practice_method_principles.md#L24-26',
  },
  // ... 36 more terms
];
```



## UI/UX Design

### Visual Design System

#### Color Palette

```css
/* Dark Theme (Default) */
--bg-primary: #0f172a;      /* Slate 900 */
--bg-secondary: #1e293b;    /* Slate 800 */
--bg-tertiary: #334155;     /* Slate 700 */
--text-primary: #f8fafc;    /* Slate 50 */
--text-secondary: #94a3b8;  /* Slate 400 */
--accent-primary: #3b82f6;  /* Blue 500 */
--accent-success: #22c55e;  /* Green 500 */
--accent-warning: #f59e0b;  /* Amber 500 */
--accent-error: #ef4444;    /* Red 500 */

/* Light Theme */
--bg-primary: #ffffff;
--bg-secondary: #f8fafc;
--bg-tertiary: #e2e8f0;
--text-primary: #0f172a;
--text-secondary: #64748b;
/* Accent colors remain the same */
```

#### Typography

```css
/* Headings */
font-family: 'Inter', system-ui, sans-serif;

/* Body text */
font-family: 'Inter', system-ui, sans-serif;

/* Code/Diagrams */
font-family: 'JetBrains Mono', 'Fira Code', monospace;
```

#### Spacing Scale

```css
--space-1: 0.25rem;  /* 4px */
--space-2: 0.5rem;   /* 8px */
--space-3: 0.75rem;  /* 12px */
--space-4: 1rem;     /* 16px */
--space-6: 1.5rem;   /* 24px */
--space-8: 2rem;     /* 32px */
--space-12: 3rem;    /* 48px */
```

### Layout Patterns

#### Home Screen Layout

```
┌─────────────────────────────────────────────────────────────┐
│  Header: Logo | Title | Theme Toggle | XP Badge             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Progress Dashboard                                  │   │
│  │  Level 3: Practitioner | 450 XP | ████████░░ 600   │   │
│  │  Achievements: 🎯 📚 🏆                              │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐                       │
│  │ 1       │ │ 2       │ │ 3       │                       │
│  │ Lessons │ │ Compare │ │Transition│                      │
│  │ 📖      │ │ ⚖️      │ │ 🔄      │                       │
│  └─────────┘ └─────────┘ └─────────┘                       │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐                       │
│  │ 4       │ │ 5       │ │ 6       │                       │
│  │Practice │ │Simulator│ │Artifacts│                       │
│  │ 🎯      │ │ 🔬      │ │ 📁      │                       │
│  └─────────┘ └─────────┘ └─────────┘                       │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐                       │
│  │ 7       │ │ 8       │ │ 9       │                       │
│  │Glossary │ │Reference│ │ Sources │                       │
│  │ 📚      │ │ 📋      │ │ 🔗      │                       │
│  └─────────┘ └─────────┘ └─────────┘                       │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│  Footer: Keyboard hints (1-9 Navigate | Esc Home | ? Help) │
└─────────────────────────────────────────────────────────────┘
```

#### Lesson Viewer Layout

```
┌─────────────────────────────────────────────────────────────┐
│  Header: ← Back | Lesson Title | Section 3/7 | Theme       │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Section Title                                       │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  Content area with formatted text...                        │
│                                                             │
│  Key characteristics:                                       │
│  • Point one                                                │
│  • Point two                                                │
│  • Point three                                              │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  ┌─────────────┐      ┌─────────────┐              │   │
│  │  │  INCEPTION  │ ───▶ │CONSTRUCTION │              │   │
│  │  │  (What/Why) │      │    (How)    │              │   │
│  │  └─────────────┘      └─────────────┘              │   │
│  │                 ASCII Diagram                       │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│  ← Previous Section    ●●●○○○○    Next Section →           │
│  Footer: ←/→ or h/l Navigate | Esc Exit                    │
└─────────────────────────────────────────────────────────────┘
```

#### Quiz Layout

```
┌─────────────────────────────────────────────────────────────┐
│  Header: Quiz | Question 5/24 | Score: 4/4                  │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  What are the three phases of AI-DLC?               │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  1  Planning, Development, Testing                  │   │
│  └─────────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  2  Inception, Construction, Operations      ✓      │   │
│  └─────────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  3  Design, Build, Deploy                           │   │
│  └─────────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  4  Analysis, Implementation, Maintenance           │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  ✓ Correct! AI-DLC has three phases...              │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│  Footer: 1-4 Select | Enter Confirm | Esc Exit             │
└─────────────────────────────────────────────────────────────┘
```

### Responsive Breakpoints

```css
/* Mobile first approach */
/* Base: 320px - 767px (mobile) */
/* md: 768px - 1023px (tablet) */
/* lg: 1024px+ (desktop) */

/* Menu grid */
.menu-grid {
  grid-template-columns: repeat(1, 1fr);  /* mobile: 1 column */
}
@media (min-width: 768px) {
  .menu-grid {
    grid-template-columns: repeat(2, 1fr);  /* tablet: 2 columns */
  }
}
@media (min-width: 1024px) {
  .menu-grid {
    grid-template-columns: repeat(3, 1fr);  /* desktop: 3 columns */
  }
}
```

### Animation Specifications

```css
/* Transitions */
--transition-fast: 150ms ease-out;
--transition-normal: 250ms ease-out;
--transition-slow: 400ms ease-out;

/* Page transitions */
.page-enter {
  opacity: 0;
  transform: translateY(10px);
}
.page-enter-active {
  opacity: 1;
  transform: translateY(0);
  transition: opacity var(--transition-normal), transform var(--transition-normal);
}

/* Card hover */
.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: all var(--transition-fast);
}

/* Timeline animation */
.timeline-bar {
  animation: grow-width 1s ease-out forwards;
}
@keyframes grow-width {
  from { width: 0; }
  to { width: var(--target-width); }
}
```

### Keyboard Navigation Map

| Context | Key | Action |
|---------|-----|--------|
| Global | `Esc` | Return to home / Close modal |
| Global | `?` | Show keyboard shortcuts help |
| Global | `t` | Toggle theme |
| Home | `1-9` | Navigate to menu item |
| Lesson | `←` / `h` | Previous section |
| Lesson | `→` / `l` | Next section |
| Quiz | `1-4` | Select answer option |
| Quiz | `Enter` | Confirm selection / Next question |
| List views | `j` / `↓` | Move down |
| List views | `k` / `↑` | Move up |
| List views | `Enter` | Select item |
| Glossary | `/` | Focus search input |



## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

Based on the acceptance criteria analysis, the following correctness properties have been identified for property-based testing:

### Property 1: State Persistence Round-Trip

*For any* valid progress state (XP, level, lesson progress, quiz results, achievements, theme preference), serializing to localStorage and then deserializing should produce an equivalent state object.

**Validates: Requirements 2.4, 3.5, 4.5, 5.6, 12.4, 12.5, 13.3, 13.4**

### Property 2: XP and Level Calculation Correctness

*For any* XP value from 0 to 10000, the calculated level and title should match the defined threshold table (Novice at 0, Apprentice at 100, Practitioner at 300, Specialist at 600, Expert at 1000, Master at 1500, Grandmaster at 2500, AI-DLC Champion at 4000).

**Validates: Requirements 12.1, 12.2**

### Property 3: Quiz Answer Randomization

*For any* quiz question, the presented answer options should be a permutation of the original options (same elements, potentially different order), and the correct answer index should be updated to match the new position.

**Validates: Requirements 3.2**

### Property 4: Glossary Search Filtering

*For any* search query string and the full glossary term list, the filtered results should contain only terms where the query appears in the term name, definition, or ID (case-insensitive), and no matching terms should be excluded.

**Validates: Requirements 8.2**

### Property 5: Simulator Stage Calculation

*For any* combination of simulator question answers, the resulting stage execution flags should match the cumulative effects defined in the question configuration (stages added, removed, or conditionally included based on answers).

**Validates: Requirements 5.2, 5.5**

### Property 6: Keyboard Number Navigation

*For any* number key press (1-9) on the home screen, the navigation should route to the menu item at that index, and for any number key press (1-4) during a quiz question, the corresponding answer option should be selected.

**Validates: Requirements 1.5, 3.7**

### Property 7: Lesson Section Navigation Bounds

*For any* lesson with N sections, navigating forward from section N-1 should not exceed section N-1, and navigating backward from section 0 should not go below section 0.

**Validates: Requirements 2.6**

### Property 8: Achievement Unlock Correctness

*For any* progress state, an achievement should be unlocked if and only if its check function returns true for that state, and once unlocked, achievements should remain unlocked regardless of subsequent state changes.

**Validates: Requirements 12.3**

### Property 9: Related Term Navigation

*For any* glossary term with related terms, each related term ID should correspond to an existing term in the glossary, enabling valid navigation.

**Validates: Requirements 8.4**

### Property 10: Project Scenario Simulation Consistency

*For any* project scenario and methodology combination, the simulation should produce deterministic results (same inputs always produce same outputs for weeks, cost, feedback points, and risk events).

**Validates: Requirements 6.5**

## Error Handling

### Client-Side Error Handling

| Error Type | Handling Strategy |
|------------|-------------------|
| localStorage unavailable | Fall back to in-memory state with warning message |
| localStorage quota exceeded | Warn user, continue with current session state |
| Invalid stored state | Reset to default state, log warning |
| Missing content | Display error message with fallback content |
| Navigation to invalid route | Redirect to home with error toast |

### State Recovery

```typescript
// lib/storage.ts
export function loadState(): ProgressState {
  try {
    const stored = localStorage.getItem('aidlc-explainer-state');
    if (!stored) return DEFAULT_STATE;
    
    const parsed = JSON.parse(stored);
    if (parsed.$schema !== 'state-v1') {
      console.warn('Invalid state schema, resetting to defaults');
      return DEFAULT_STATE;
    }
    
    return migrateState(parsed);
  } catch (error) {
    console.error('Failed to load state:', error);
    return DEFAULT_STATE;
  }
}

export function saveState(state: ProgressState): boolean {
  try {
    const serialized = JSON.stringify({
      ...state,
      $schema: 'state-v1',
      lastUpdated: new Date().toISOString(),
    });
    localStorage.setItem('aidlc-explainer-state', serialized);
    return true;
  } catch (error) {
    console.error('Failed to save state:', error);
    return false;
  }
}
```

### Graceful Degradation

- If localStorage is unavailable, the app functions normally but progress is not persisted
- If a content file fails to load, display a user-friendly error with retry option
- If keyboard events fail to register, mouse/touch navigation remains fully functional

## Testing Strategy

### Dual Testing Approach

The testing strategy employs both unit tests and property-based tests for comprehensive coverage:

**Unit Tests** (Jest + React Testing Library):
- Component rendering tests
- User interaction tests (click, keyboard)
- Integration tests between components
- Edge cases and error conditions
- Specific examples from acceptance criteria

**Property-Based Tests** (fast-check):
- Universal properties that hold for all valid inputs
- State management correctness
- Calculation logic verification
- Data transformation consistency

### Test Configuration

```typescript
// jest.config.js
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};
```

### Property-Based Test Configuration

```typescript
// Property tests should run minimum 100 iterations
import * as fc from 'fast-check';

fc.configureGlobal({
  numRuns: 100,
  verbose: true,
});
```

### Test File Organization

```
tests/
├── unit/
│   ├── components/
│   │   ├── Header.test.tsx
│   │   ├── MenuGrid.test.tsx
│   │   ├── LessonViewer.test.tsx
│   │   ├── QuizQuestion.test.tsx
│   │   └── ...
│   ├── hooks/
│   │   ├── useProgress.test.ts
│   │   ├── useTheme.test.ts
│   │   └── useKeyboard.test.ts
│   └── lib/
│       ├── storage.test.ts
│       ├── xp.test.ts
│       └── achievements.test.ts
├── property/
│   ├── state-persistence.property.ts
│   ├── xp-calculation.property.ts
│   ├── quiz-randomization.property.ts
│   ├── glossary-search.property.ts
│   ├── simulator-stages.property.ts
│   ├── keyboard-navigation.property.ts
│   ├── lesson-navigation.property.ts
│   ├── achievements.property.ts
│   ├── related-terms.property.ts
│   └── simulation-consistency.property.ts
└── integration/
    ├── lesson-flow.test.tsx
    ├── quiz-flow.test.tsx
    └── navigation.test.tsx
```

### Property Test Tagging

Each property test must reference its design document property:

```typescript
// tests/property/state-persistence.property.ts
import * as fc from 'fast-check';
import { loadState, saveState } from '@/lib/storage';

/**
 * Feature: aidlc-web-app, Property 1: State Persistence Round-Trip
 * For any valid progress state, serializing to localStorage and then
 * deserializing should produce an equivalent state object.
 * Validates: Requirements 2.4, 3.5, 4.5, 5.6, 12.4, 12.5, 13.3, 13.4
 */
describe('Property 1: State Persistence Round-Trip', () => {
  const progressStateArb = fc.record({
    xp: fc.integer({ min: 0, max: 10000 }),
    level: fc.integer({ min: 1, max: 8 }),
    title: fc.constantFrom('Novice', 'Apprentice', 'Practitioner', 'Specialist', 'Expert', 'Master', 'Grandmaster', 'AI-DLC Champion'),
    lessons: fc.record({
      completed: fc.array(fc.constantFrom('aidlc-overview', 'principles', 'inception-deep-dive')),
      inProgress: fc.dictionary(
        fc.constantFrom('aidlc-overview', 'principles', 'inception-deep-dive'),
        fc.record({ lastSection: fc.integer({ min: 0, max: 10 }) })
      ),
    }),
    quiz: fc.record({
      completed: fc.boolean(),
      lastScore: fc.integer({ min: 0, max: 24 }),
      bestScore: fc.integer({ min: 0, max: 24 }),
      attempts: fc.integer({ min: 0, max: 100 }),
    }),
    gatekeeper: fc.record({
      completed: fc.boolean(),
      lastScore: fc.integer({ min: 0, max: 10 }),
      bestScore: fc.integer({ min: 0, max: 10 }),
      attempts: fc.integer({ min: 0, max: 100 }),
    }),
    simulator: fc.record({
      runs: fc.integer({ min: 0, max: 100 }),
      requestTypesExplored: fc.array(fc.constantFrom('greenfield', 'brownfield', 'frontend', 'bugfix')),
    }),
    achievements: fc.array(fc.constantFrom('first-steps', 'scholar', 'quiz-master', 'perfect-score', 'gatekeeper', 'simulator-explorer', 'completionist')),
  });

  it('should preserve state through save/load cycle', () => {
    fc.assert(
      fc.property(progressStateArb, (state) => {
        saveState(state);
        const loaded = loadState();
        expect(loaded).toEqual(state);
      })
    );
  });
});
```
