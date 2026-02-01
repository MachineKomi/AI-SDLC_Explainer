// Transition mapping from Agile/Scrum to AI-SDLC

export interface RoleMapping {
  agileRole: string;
  agileResponsibilities: string[];
  aidlcRole: string;
  aidlcResponsibilities: string[];
  keyChanges: string[];
  skillsToDevelop: string[];
}

export interface ProcessMapping {
  agileProcess: string;
  agileFrequency: string;
  agileDuration: string;
  agilePurpose: string;
  aidlcProcess: string;
  aidlcFrequency: string;
  aidlcDuration: string;
  aidlcPurpose: string;
  keyDifferences: string[];
}

export interface ArtifactMapping {
  agileArtifact: string;
  agilePurpose: string;
  aidlcArtifact: string;
  aidlcPurpose: string;
  keyDifferences: string[];
}

export interface TransitionPhase {
  id: string;
  name: string;
  duration: string;
  focus: string;
  activities: string[];
  successCriteria: string[];
  risks: string[];
}

export interface ReadinessItem {
  category: string;
  item: string;
  description: string;
  importance: 'critical' | 'high' | 'medium';
}

// === ROLE MAPPINGS ===

export const ROLE_MAPPINGS: RoleMapping[] = [
  {
    agileRole: 'Product Owner',
    agileResponsibilities: [
      'Define and prioritize backlog',
      'Accept/reject sprint deliverables',
      'Stakeholder communication',
      'Define acceptance criteria',
    ],
    aidlcRole: 'Intent Owner',
    aidlcResponsibilities: [
      'Define Intent (high-level outcome)',
      'Approve Units at Inception gate',
      'Validate evidence at gates',
      'Business outcome accountability',
    ],
    keyChanges: [
      'Focus shifts from features to outcomes',
      'Approvals based on evidence, not demos',
      'Works with AI-generated artifacts',
      'Faster feedback cycles',
    ],
    skillsToDevelop: [
      'Evidence-based validation',
      'Intent writing (clear, measurable)',
      'AI output interpretation',
    ],
  },
  {
    agileRole: 'Scrum Master',
    agileResponsibilities: [
      'Facilitate ceremonies',
      'Remove blockers',
      'Coach team on Agile',
      'Track velocity/metrics',
    ],
    aidlcRole: 'AI Facilitator',
    aidlcResponsibilities: [
      'Orchestrate Mob sessions',
      'Manage AI tool interactions',
      'Ensure gate criteria met',
      'Coach team on AI collaboration',
    ],
    keyChanges: [
      'From process facilitation to AI orchestration',
      'Focus on prompt quality and context',
      'Guardrail management',
      'Evidence gathering coordination',
    ],
    skillsToDevelop: [
      'Prompt engineering',
      'AI tool expertise',
      'Gate criteria evaluation',
      'Guardrail definition',
    ],
  },
  {
    agileRole: 'Developer',
    agileResponsibilities: [
      'Write code',
      'Estimate stories',
      'Attend ceremonies',
      'Code review peers',
    ],
    aidlcRole: 'Human Validator',
    aidlcResponsibilities: [
      'Review AI-generated code',
      'Provide context to AI',
      'Validate proofs/evidence',
      'Refine AI output',
    ],
    keyChanges: [
      'From code author to code reviewer',
      'More time validating, less typing',
      'Focus on edge cases and quality',
      'Guardrail retros after bolts',
    ],
    skillsToDevelop: [
      'AI code review patterns',
      'Context preparation',
      'Prompt refinement',
      'Evidence validation',
    ],
  },
  {
    agileRole: 'QA Engineer',
    agileResponsibilities: [
      'Write test cases',
      'Manual testing',
      'Automation scripts',
      'Bug reporting',
    ],
    aidlcRole: 'Validation Specialist',
    aidlcResponsibilities: [
      'Define validation criteria',
      'Review AI-generated tests',
      'Evidence gathering',
      'Gate readiness assessment',
    ],
    keyChanges: [
      'AI generates test code',
      'Focus on criteria definition',
      'Continuous validation vs end-of-sprint',
      'Evidence-based quality assurance',
    ],
    skillsToDevelop: [
      'Validation criteria writing',
      'AI test output review',
      'Evidence documentation',
    ],
  },
];

// === PROCESS MAPPINGS ===

export const PROCESS_MAPPINGS: ProcessMapping[] = [
  {
    agileProcess: 'Sprint Planning',
    agileFrequency: 'Every 2 weeks',
    agileDuration: '2-4 hours',
    agilePurpose: 'Select stories, estimate, plan sprint',
    aidlcProcess: 'Mob Elaboration',
    aidlcFrequency: 'Per Intent',
    aidlcDuration: '60 minutes',
    aidlcPurpose: 'Convert Intent to validated Units',
    keyDifferences: [
      'AI assists in breakdown',
      'Output is Units, not stories',
      'Immediate gate approval',
      'No estimation (AI adjusts)',
    ],
  },
  {
    agileProcess: 'Daily Standup',
    agileFrequency: 'Daily',
    agileDuration: '15 minutes',
    agilePurpose: 'Sync, blockers, coordination',
    aidlcProcess: 'Bolt Sync (optional)',
    aidlcFrequency: 'As needed',
    aidlcDuration: '5-10 minutes',
    aidlcPurpose: 'Coordinate parallel bolts',
    keyDifferences: [
      'Less formal, more async',
      'AI tracks progress',
      'Focus on gate readiness',
      'Shorter cycles reduce need',
    ],
  },
  {
    agileProcess: 'Sprint Development',
    agileFrequency: '2-week sprints',
    agileDuration: '10 working days',
    agilePurpose: 'Build features',
    aidlcProcess: 'Mob Construction',
    aidlcFrequency: 'Per Bolt (4-8 hours)',
    aidlcDuration: 'Hours, not days',
    aidlcPurpose: 'AI builds, humans validate',
    keyDifferences: [
      'Dramatically faster cycles',
      'AI generates, humans review',
      'Evidence gathered per bolt',
      'Continuous gate checks',
    ],
  },
  {
    agileProcess: 'Sprint Review',
    agileFrequency: 'End of sprint',
    agileDuration: '1-2 hours',
    agilePurpose: 'Demo to stakeholders',
    aidlcProcess: 'Gate Approval',
    aidlcFrequency: 'Per Unit completion',
    aidlcDuration: '15-30 minutes',
    aidlcPurpose: 'Evidence-based approval',
    keyDifferences: [
      'Proof over prose',
      'Evidence replaces demos',
      'Faster feedback',
      'Clear go/no-go criteria',
    ],
  },
  {
    agileProcess: 'Retrospective',
    agileFrequency: 'End of sprint',
    agileDuration: '1-2 hours',
    agilePurpose: 'Team improvement',
    aidlcProcess: 'Guardrail Retro',
    aidlcFrequency: 'Per Bolt',
    aidlcDuration: '15 minutes',
    aidlcPurpose: 'Improve AI collaboration',
    keyDifferences: [
      'Focus on AI effectiveness',
      'Update guardrails/rules',
      'Continuous improvement',
      'Faster feedback loop',
    ],
  },
];

// === ARTIFACT MAPPINGS ===

export const ARTIFACT_MAPPINGS: ArtifactMapping[] = [
  {
    agileArtifact: 'Product Backlog',
    agilePurpose: 'Prioritized list of features/stories',
    aidlcArtifact: 'Intent + Units',
    aidlcPurpose: 'Outcome-focused breakdown',
    keyDifferences: [
      "Intent captures 'why'",
      'Units have acceptance criteria',
      'AI-validated decomposition',
    ],
  },
  {
    agileArtifact: 'User Stories',
    agilePurpose: 'Feature description from user perspective',
    aidlcArtifact: 'Unit Specification',
    aidlcPurpose: 'Buildable chunk with criteria',
    keyDifferences: [
      'More structured format',
      'AI-parseable',
      'Clear acceptance tests',
    ],
  },
  {
    agileArtifact: 'Sprint Backlog',
    agilePurpose: 'Stories committed for sprint',
    aidlcArtifact: 'Bolt Queue',
    aidlcPurpose: 'Next bolts to execute',
    keyDifferences: [
      'Smaller increments',
      'Hours not days',
      'Dynamic reordering',
    ],
  },
  {
    agileArtifact: 'Definition of Done',
    agilePurpose: 'Criteria for story completion',
    aidlcArtifact: 'Gate Criteria + Evidence',
    aidlcPurpose: 'Provable completion requirements',
    keyDifferences: [
      'Evidence required',
      'AI-verifiable',
      'Per-unit gates',
    ],
  },
  {
    agileArtifact: 'Burndown Chart',
    agilePurpose: 'Track sprint progress',
    aidlcArtifact: 'Unit/Bolt Progress',
    aidlcPurpose: 'Real-time completion status',
    keyDifferences: [
      'Faster updates',
      'Evidence-based progress',
      'AI-tracked metrics',
    ],
  },
];

// === TRANSITION PHASES ===

export const TRANSITION_PHASES: TransitionPhase[] = [
  {
    id: 'awareness',
    name: 'Awareness & Education',
    duration: '1-2 weeks',
    focus: 'Build understanding of AI-SDLC',
    activities: [
      'Leadership briefing',
      'Team training sessions',
      'Pilot team selection',
      'Tool procurement',
    ],
    successCriteria: [
      'All team members understand AI-SDLC basics',
      'Pilot team identified and committed',
      'AI tools available',
    ],
    risks: [
      'Resistance to change',
      'Misunderstanding AI capabilities',
    ],
  },
  {
    id: 'pilot',
    name: 'Pilot Project',
    duration: '2-4 weeks',
    focus: 'Test AI-SDLC on real work',
    activities: [
      'Select low-risk pilot project',
      'Run first Mob Elaboration',
      'Execute bolts with coaching',
      'Gather feedback',
    ],
    successCriteria: [
      'One Intent → Production cycle completed',
      'Team confidence increased',
      'Lessons documented',
    ],
    risks: [
      'Pilot scope too large',
      'Insufficient AI tool familiarity',
    ],
  },
  {
    id: 'expand',
    name: 'Team Expansion',
    duration: '4-8 weeks',
    focus: 'Roll out to more teams',
    activities: [
      'Train additional teams',
      'Define guardrails and templates',
      'Establish community of practice',
      'Refine tooling',
    ],
    successCriteria: [
      '3+ teams using AI-SDLC',
      'Guardrails documented',
      'Metrics showing improvement',
    ],
    risks: [
      'Inconsistent adoption',
      'Tool scaling issues',
    ],
  },
  {
    id: 'optimize',
    name: 'Optimization',
    duration: 'Ongoing',
    focus: 'Continuous improvement',
    activities: [
      'Cross-team learning',
      'Guardrail evolution',
      'Process refinement',
      'Advanced AI patterns',
    ],
    successCriteria: [
      'Consistent delivery improvements',
      'Self-sustaining practice',
      'Innovation in AI use',
    ],
    risks: [
      'Complacency',
      'AI tool changes',
    ],
  },
];

// === READINESS CHECKLIST ===

export const READINESS_CHECKLIST: ReadinessItem[] = [
  // Leadership
  { category: 'Leadership', item: 'Executive Sponsor', description: 'Leader who champions the transition', importance: 'critical' },
  { category: 'Leadership', item: 'Budget Allocated', description: 'Funding for tools and training', importance: 'critical' },
  { category: 'Leadership', item: 'Success Metrics Defined', description: 'How will we measure success?', importance: 'high' },

  // Team
  { category: 'Team', item: 'Pilot Team Identified', description: 'Team eager to try AI-SDLC', importance: 'critical' },
  { category: 'Team', item: 'AI Facilitator Appointed', description: 'Person to lead Mob sessions', importance: 'critical' },
  { category: 'Team', item: 'Training Plan', description: 'How will team learn AI-SDLC?', importance: 'high' },

  // Tooling
  { category: 'Tooling', item: 'AI Coding Assistant', description: 'Tool for code generation (e.g., Amazon Q, GitHub Copilot)', importance: 'critical' },
  { category: 'Tooling', item: 'IDE Integration', description: 'AI assistant integrated with dev environment', importance: 'high' },
  { category: 'Tooling', item: 'Guardrail Rules', description: 'Initial .ai-rules or similar', importance: 'medium' },

  // Process
  { category: 'Process', item: 'Pilot Project Selected', description: 'Low-risk, bounded project for pilot', importance: 'critical' },
  { category: 'Process', item: 'Gate Criteria Defined', description: 'What evidence needed at gates?', importance: 'high' },
  { category: 'Process', item: 'Mob Session Schedule', description: 'When will Mob Elaboration/Construction happen?', importance: 'medium' },

  // Culture
  { category: 'Culture', item: 'Growth Mindset', description: 'Team open to new ways of working', importance: 'high' },
  { category: 'Culture', item: 'Psychological Safety', description: 'Safe to experiment and fail', importance: 'high' },
  { category: 'Culture', item: 'Documentation Culture', description: 'Willingness to document evidence', importance: 'medium' },
];

// Helper functions
export function getReadinessItemsByCategory(category: string): ReadinessItem[] {
  return READINESS_CHECKLIST.filter(item => item.category === category);
}

export function getReadinessCategories(): string[] {
  return [...new Set(READINESS_CHECKLIST.map(item => item.category))];
}
