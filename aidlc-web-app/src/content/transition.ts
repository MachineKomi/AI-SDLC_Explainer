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

// === ROSETTA STONE MAPPINGS ===

export interface RosettaStoneEntry {
  agile: string;
  aidlc: string;
  whatChanged: string;
}

export const ROSETTA_STONE: RosettaStoneEntry[] = [
  {
    agile: 'Epic / Project Brief',
    aidlc: 'Intent',
    whatChanged: 'A high-level goal statement. AI decomposes it — you don\'t manually break it down anymore.',
  },
  {
    agile: 'Epic / Subdomain',
    aidlc: 'Unit',
    whatChanged: 'A cohesive, independently deployable work block. Think bounded context (DDD) — loosely coupled, team-assignable.',
  },
  {
    agile: 'Sprint (2–6 weeks)',
    aidlc: 'Bolt (hours–days)',
    whatChanged: 'Same iteration concept, radically compressed. AI handles planning; you validate.',
  },
  {
    agile: 'User Story',
    aidlc: 'User Story (retained)',
    whatChanged: 'Kept as-is — the contract between human intent and AI execution. AI drafts them; you refine.',
  },
  {
    agile: 'Sprint Planning',
    aidlc: 'Mob Elaboration',
    whatChanged: 'One-room, shared-screen session. AI proposes decomposition; the full team challenges and refines in real-time.',
  },
  {
    agile: 'Sprint Execution',
    aidlc: 'Mob Construction',
    whatChanged: 'Collocated teams build Bolts. AI generates domain models → logical design → code → tests. Devs validate at each gate.',
  },
  {
    agile: 'Daily Standup',
    aidlc: 'Not required',
    whatChanged: 'With hour/day cycles and real-time AI context, async status is built into the flow.',
  },
  {
    agile: 'Retrospective',
    aidlc: 'Continuous (embedded)',
    whatChanged: 'Each human validation point is a mini-retro. Feedback is continuous, not batched.',
  },
  {
    agile: 'Velocity (story points)',
    aidlc: 'Business Value Delivered',
    whatChanged: 'When AI flattens effort differences, measuring effort is less meaningful. Measure outcomes.',
  },
  {
    agile: 'Scrum Master',
    aidlc: 'Role absorbed',
    whatChanged: 'Process facilitation is handled by AI orchestration. Impediment removal shifts to real-time AI + dev collaboration.',
  },
  {
    agile: 'Separate design phase',
    aidlc: 'Integrated (DDD baked in)',
    whatChanged: 'Domain-Driven Design is part of the method core, not an optional add-on. AI applies it during decomposition.',
  },
];

// === RACI MATRIX ===

export interface RaciEntry {
  activity: string;
  aiAgent: 'R' | 'A' | 'C' | 'I';
  developer: 'R' | 'A' | 'C' | 'I';
  productOwner: 'R' | 'A' | 'C' | 'I';
}

export const RACI_MATRIX: RaciEntry[] = [
  { activity: 'Intent Clarification', aiAgent: 'R', developer: 'C', productOwner: 'A' },
  { activity: 'Story & NFR Generation', aiAgent: 'R', developer: 'A', productOwner: 'A' },
  { activity: 'Unit Decomposition', aiAgent: 'R', developer: 'A', productOwner: 'C' },
  { activity: 'Bolt Planning', aiAgent: 'R', developer: 'A', productOwner: 'I' },
  { activity: 'Domain Model Design', aiAgent: 'R', developer: 'A', productOwner: 'I' },
  { activity: 'Logical Design + ADRs', aiAgent: 'R', developer: 'A', productOwner: 'I' },
  { activity: 'Code Generation', aiAgent: 'R', developer: 'A', productOwner: 'I' },
  { activity: 'Test Execution + Fix Proposals', aiAgent: 'R', developer: 'A', productOwner: 'I' },
  { activity: 'Deployment Approval', aiAgent: 'C', developer: 'A', productOwner: 'I' },
  { activity: 'Ops Monitoring + Remediation', aiAgent: 'R', developer: 'A', productOwner: 'I' },
];

// === ANTI-PATTERNS ===

export interface AntiPattern {
  id: string;
  name: string;
  icon: string;
  problem: string;
  instead: string;
}

export const ANTI_PATTERNS: AntiPattern[] = [
  {
    id: 'retrofit-scrum',
    name: 'Retrofitting AI Into Existing Scrum',
    icon: '🔄',
    problem: 'Adding an AI tool to your existing sprint workflow misses the point. The conversation direction must reverse: AI proposes, humans validate.',
    instead: 'Run AI-SDLC as a parallel workstream for your pilot. Don\'t hybridize — replace ceremonies on the pilot team.',
  },
  {
    id: 'rubber-stamping',
    name: 'Rubber-Stamping AI Output',
    icon: '🪧',
    problem: 'Developers clicking "approve" without meaningful review creates "quick-cement" — code that\'s fast to generate but rigid and hard to maintain.',
    instead: 'Track Override Rate. If it drops below 5%, that\'s a red flag — likely insufficient scrutiny, not perfect AI.',
  },
  {
    id: 'skip-design',
    name: 'Skipping Domain Design',
    icon: '⏭️',
    problem: 'Jumping from Intent to code skips the quality mechanism. Design adds minutes, not days, to each Bolt.',
    instead: 'Enforce Domain Model → Logical Design → Code. This prevents structural debt that compounds exponentially.',
  },
  {
    id: 'over-engineer-simple',
    name: 'Applying AI-SDLC to Simple Systems',
    icon: '🔨',
    problem: 'AI-SDLC is for complex systems. Using it for a CRUD app is over-engineering.',
    instead: 'Use low-code/no-code for simple systems. Reserve AI-SDLC for architectural complexity, scalability, or regulatory constraints.',
  },
  {
    id: 'legacy-ceremonies',
    name: 'Keeping All Legacy Ceremonies',
    icon: '📋',
    problem: 'Running standups, sprint planning, and retros alongside Bolts creates ceremony fatigue and slows the rapid cadence.',
    instead: 'Sunset legacy ceremonies progressively on AI-SDLC workstreams. Mob Elaboration replaces planning. Continuous validation replaces retros.',
  },
  {
    id: 'skip-elevation',
    name: 'Ignoring Brownfield Context Elevation',
    icon: '🏚️',
    problem: 'Letting AI modify legacy code without creating static/dynamic models first leads to fragile, context-blind changes.',
    instead: 'Always run the Elevation step. AI reverse-engineers into component models. Devs validate before any changes begin.',
  },
];
