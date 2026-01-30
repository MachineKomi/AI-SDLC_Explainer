// Interactive Simulator Questions - dynamically affect which stages run

export interface QuestionOption {
  id: string;
  label: string;
}

export interface QuestionEffect {
  addStages?: string[];
  removeStages?: string[];
  prioritize?: string[];
  depth?: 'minimal' | 'standard' | 'full' | 'thorough';
  ceremony?: 'minimal' | 'standard' | 'full';
  skipOptional?: boolean;
  explanation: string;
}

export interface SimulatorQuestion {
  id: string;
  prompt: string;
  options: QuestionOption[];
  effects: Record<string, QuestionEffect>;
  principle: string;
}

export const SIMULATOR_QUESTIONS: SimulatorQuestion[] = [
  {
    id: 'q-existing-code',
    prompt: 'Does this project have existing code to work with?',
    options: [
      { id: 'yes', label: 'Yes - modifying or extending existing system' },
      { id: 'no', label: 'No - building from scratch (greenfield)' },
    ],
    effects: {
      yes: {
        addStages: ['reverse-engineering'],
        removeStages: [],
        explanation: 'Reverse Engineering stage added to understand existing codebase before making changes.',
      },
      no: {
        addStages: [],
        removeStages: ['reverse-engineering'],
        explanation: 'Reverse Engineering skipped - no existing code to analyze.',
      },
    },
    principle: 'Adaptive Depth - workflow adjusts based on project context',
  },
  {
    id: 'q-frontend',
    prompt: 'Does this work include user interface changes?',
    options: [
      { id: 'yes', label: 'Yes - UI/UX work is involved' },
      { id: 'no', label: 'No - backend/API only, no UI' },
    ],
    effects: {
      yes: {
        addStages: ['browser-validation'],
        prioritize: ['user-stories'],
        explanation: 'Browser Validation stage added to verify UI behavior. User Stories prioritized for UX flows.',
      },
      no: {
        addStages: [],
        prioritize: [],
        explanation: 'Browser Validation skipped - no UI to validate.',
      },
    },
    principle: 'Adaptive Depth - only run stages that add value',
  },
  {
    id: 'q-security',
    prompt: 'Does this system handle sensitive data?',
    options: [
      { id: 'high', label: 'Highly sensitive (PII, financial, health data)' },
      { id: 'moderate', label: 'Moderately sensitive (user accounts, preferences)' },
      { id: 'low', label: 'Low sensitivity (public data, no authentication)' },
    ],
    effects: {
      high: {
        addStages: ['nfr-requirements', 'nfr-design', 'security-review'],
        depth: 'full',
        explanation: 'Full NFR stages + Security Review added. Compliance evidence required at all gates.',
      },
      moderate: {
        addStages: ['nfr-requirements'],
        depth: 'standard',
        explanation: 'NFR Requirements added for security baseline. Standard depth applies.',
      },
      low: {
        addStages: [],
        depth: 'minimal',
        explanation: 'Minimal security overhead - standard security practices apply automatically.',
      },
    },
    principle: 'Risk-Based Depth - more rigor for higher-risk work',
  },
  {
    id: 'q-team-size',
    prompt: 'How many people will collaborate on this work?',
    options: [
      { id: 'solo', label: 'Solo (1 person with AI)' },
      { id: 'small', label: 'Small team (2-4 people)' },
      { id: 'large', label: 'Large team (5+ people)' },
    ],
    effects: {
      solo: {
        ceremony: 'minimal',
        explanation: 'Minimal ceremony - less coordination overhead needed.',
      },
      small: {
        ceremony: 'standard',
        explanation: 'Standard ceremony - balance of speed and coordination.',
      },
      large: {
        addStages: ['application-design'],
        ceremony: 'full',
        explanation: 'Full ceremony + Application Design - clear boundaries needed for parallel work.',
      },
    },
    principle: 'Mob Collaboration - ceremony scales with team complexity',
  },
  {
    id: 'q-timeline',
    prompt: "What's the timeline pressure for this work?",
    options: [
      { id: 'urgent', label: 'Urgent - need it as soon as possible' },
      { id: 'normal', label: 'Normal - reasonable schedule' },
      { id: 'flexible', label: 'Flexible - quality over speed' },
    ],
    effects: {
      urgent: {
        skipOptional: true,
        explanation: 'Optional stages skipped to accelerate delivery. Risk accepted via expedited gate.',
      },
      normal: {
        skipOptional: false,
        explanation: 'Balanced approach - all recommended stages run.',
      },
      flexible: {
        addStages: ['comprehensive-testing'],
        depth: 'thorough',
        explanation: 'Comprehensive testing added. All stages run at thorough depth.',
      },
    },
    principle: 'Adaptive Depth - flex based on constraints',
  },
];

export function getQuestionById(questionId: string): SimulatorQuestion | undefined {
  return SIMULATOR_QUESTIONS.find(q => q.id === questionId);
}
