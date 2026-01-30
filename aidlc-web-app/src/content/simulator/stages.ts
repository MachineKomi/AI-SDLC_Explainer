// AI-DLC stage definitions derived from AWS aidlc-workflows

export interface SimulatorPhase {
  id: string;
  name: string;
  goal: string;
  ritual: string;
  color: string;
  icon: string;
}

export interface StageGate {
  name: string;
  criteria: string[];
  evidenceRequired: string[];
}

export interface StageArtifact {
  path: string;
  description: string;
}

export interface Stage {
  id: string;
  phase: string;
  name: string;
  description: string;
  alwaysExecute: boolean;
  condition?: string;
  artifacts: StageArtifact[];
  gate: StageGate;
}

export const PHASES: SimulatorPhase[] = [
  {
    id: 'inception',
    name: 'INCEPTION',
    goal: 'Convert intent into testable, decomposed work (WHAT + WHY)',
    ritual: 'Mob Elaboration - team reviews AI\'s proposed breakdown into stories and units',
    color: 'blue',
    icon: '🔵',
  },
  {
    id: 'construction',
    name: 'CONSTRUCTION',
    goal: 'Build units with proof (HOW) via Bolts (rapid iterations)',
    ritual: 'Mob Construction - teams collocated, delivering Bolts, AI generates + humans validate',
    color: 'green',
    icon: '🟢',
  },
  {
    id: 'operations',
    name: 'OPERATIONS',
    goal: 'Productionize with safety and observability (WHERE/WHEN)',
    ritual: 'AI-driven operational efficiency with human oversight for SLA/compliance',
    color: 'yellow',
    icon: '🟡',
  },
];

export const STAGES: Stage[] = [
  {
    id: 'workspace-detection',
    phase: 'inception',
    name: 'Workspace Detection',
    description: 'Analyze project structure to determine if greenfield or brownfield',
    alwaysExecute: true,
    artifacts: [
      { path: 'aidlc-docs/aidlc-state.md', description: 'Project state tracking initialized' },
    ],
    gate: {
      name: 'Project Type Confirmed',
      criteria: [
        'Project type determined (greenfield/brownfield)',
        'Technology stack identified',
        'Workspace structure analyzed',
      ],
      evidenceRequired: ['aidlc-state.md exists with project type'],
    },
  },
  {
    id: 'reverse-engineering',
    phase: 'inception',
    name: 'Reverse Engineering',
    description: 'Analyze existing codebase structure, architecture, and dependencies',
    alwaysExecute: false,
    condition: 'brownfield projects only',
    artifacts: [
      { path: 'aidlc-docs/inception/architecture.md', description: 'Current architecture documentation' },
      { path: 'aidlc-docs/inception/component-inventory.md', description: 'Component and dependency inventory' },
      { path: 'aidlc-docs/inception/technology-stack.md', description: 'Technology stack analysis' },
    ],
    gate: {
      name: 'Codebase Understood',
      criteria: ['Architecture documented', 'Dependencies mapped', 'Impact areas identified'],
      evidenceRequired: ['architecture.md exists', 'component-inventory.md exists'],
    },
  },
  {
    id: 'requirements-analysis',
    phase: 'inception',
    name: 'Requirements Analysis',
    description: 'Elaborate intent into detailed functional and non-functional requirements',
    alwaysExecute: true,
    artifacts: [
      { path: 'aidlc-docs/inception/intent.md', description: 'One paragraph intent + success metrics' },
      { path: 'aidlc-docs/inception/requirements.md', description: 'Functional requirements + constraints' },
    ],
    gate: {
      name: 'Requirements Approved',
      criteria: ['Intent clearly stated', 'Requirements documented', 'All clarifying questions answered', 'Stakeholder approval obtained'],
      evidenceRequired: ['intent.md exists', 'requirements.md reviewed and approved'],
    },
  },
  {
    id: 'user-stories',
    phase: 'inception',
    name: 'User Stories',
    description: 'Define user personas and their journeys through the system',
    alwaysExecute: false,
    condition: 'UI/UX involved or multiple user types',
    artifacts: [
      { path: 'aidlc-docs/inception/user-stories.md', description: 'User stories with acceptance criteria' },
      { path: 'aidlc-docs/inception/personas.md', description: 'User persona definitions' },
    ],
    gate: {
      name: 'User Stories Approved',
      criteria: ['Personas defined', 'User journeys documented', 'Acceptance criteria clear'],
      evidenceRequired: ['user-stories.md exists', 'personas reviewed'],
    },
  },
  {
    id: 'workflow-planning',
    phase: 'inception',
    name: 'Workflow Planning',
    description: 'Determine which stages to execute and create execution plan',
    alwaysExecute: true,
    artifacts: [
      { path: 'aidlc-docs/execution-plan.md', description: 'Stage sequence with rationale' },
      { path: 'aidlc-docs/aidlc-state.md', description: 'Updated state with planned stages' },
    ],
    gate: {
      name: 'Execution Plan Approved',
      criteria: ['All stages determined (execute/skip)', 'Rationale documented for each decision', 'Risk assessment complete'],
      evidenceRequired: ['execution-plan.md reviewed and approved'],
    },
  },
  {
    id: 'application-design',
    phase: 'inception',
    name: 'Application Design',
    description: 'High-level component design and architecture decisions',
    alwaysExecute: false,
    condition: 'new components or architectural changes',
    artifacts: [
      { path: 'aidlc-docs/inception/application-design.md', description: 'Component architecture and design decisions' },
    ],
    gate: {
      name: 'Application Design Approved',
      criteria: ['Architecture documented', 'Component responsibilities clear', 'Integration points identified'],
      evidenceRequired: ['application-design.md reviewed and approved'],
    },
  },
  {
    id: 'units-generation',
    phase: 'inception',
    name: 'Units Generation',
    description: 'Break work into parallel units with acceptance criteria',
    alwaysExecute: false,
    condition: 'multiple components or parallel work possible',
    artifacts: [
      { path: 'aidlc-docs/inception/units/', description: 'Unit definitions with scope and acceptance criteria' },
    ],
    gate: {
      name: 'INCEPTION EXIT',
      criteria: ['All units defined with clear scope', 'Acceptance criteria for each unit', 'Dependencies documented', 'Ready to enter Construction'],
      evidenceRequired: ['units/*.md files exist', 'All units have acceptance criteria'],
    },
  },
  {
    id: 'functional-design',
    phase: 'construction',
    name: 'Functional Design',
    description: 'Detailed component design including APIs, data models, and algorithms',
    alwaysExecute: false,
    condition: 'complex components or API design needed',
    artifacts: [
      { path: 'aidlc-docs/construction/unit-XX/design.md', description: 'Domain model, APIs, data model, key tradeoffs' },
    ],
    gate: {
      name: 'Design Approved',
      criteria: ['Design document complete', 'API contracts defined', 'Data models documented', 'Tradeoffs explained'],
      evidenceRequired: ['design.md reviewed and approved'],
    },
  },
  {
    id: 'nfr-requirements',
    phase: 'construction',
    name: 'NFR Requirements',
    description: 'Document non-functional requirements (security, performance, availability)',
    alwaysExecute: false,
    condition: 'performance, security, or compliance requirements',
    artifacts: [
      { path: 'aidlc-docs/inception/nfr.md', description: 'Non-functional requirements (security, performance, availability, compliance)' },
    ],
    gate: {
      name: 'NFR Requirements Approved',
      criteria: ['Performance targets defined', 'Security requirements documented', 'Compliance requirements identified'],
      evidenceRequired: ['nfr.md reviewed and approved'],
    },
  },
  {
    id: 'nfr-design',
    phase: 'construction',
    name: 'NFR Design',
    description: 'Design solutions for non-functional requirements',
    alwaysExecute: false,
    condition: 'NFR requirements defined',
    artifacts: [
      { path: 'aidlc-docs/construction/unit-XX/nfr-design.md', description: 'NFR implementation design' },
    ],
    gate: {
      name: 'NFR Design Approved',
      criteria: ['Performance design documented', 'Security design documented', 'Trade-offs explained'],
      evidenceRequired: ['nfr-design.md reviewed and approved'],
    },
  },
  {
    id: 'infrastructure-design',
    phase: 'construction',
    name: 'Infrastructure Design',
    description: 'Design infrastructure and deployment architecture',
    alwaysExecute: false,
    condition: 'infrastructure changes or new deployments',
    artifacts: [
      { path: 'aidlc-docs/construction/unit-XX/infrastructure-design.md', description: 'Infrastructure architecture and IaC approach' },
    ],
    gate: {
      name: 'Infrastructure Design Approved',
      criteria: ['Deployment architecture documented', 'IaC approach defined', 'Resource requirements estimated'],
      evidenceRequired: ['infrastructure-design.md reviewed and approved'],
    },
  },
  {
    id: 'code-generation',
    phase: 'construction',
    name: 'Code Generation',
    description: 'Implement the code according to design specifications',
    alwaysExecute: true,
    artifacts: [
      { path: 'src/', description: 'Source code implementation' },
      { path: 'aidlc-docs/construction/unit-XX/tasks-plan.md', description: 'Checkbox plan with completion status' },
    ],
    gate: {
      name: 'Code Complete',
      criteria: ['All planned features implemented', 'Code follows standards', 'No blocking issues'],
      evidenceRequired: ['Code committed', 'tasks-plan.md checkboxes complete'],
    },
  },
  {
    id: 'build-and-test',
    phase: 'construction',
    name: 'Build and Test',
    description: 'Validate implementation through building, testing, and verification',
    alwaysExecute: true,
    artifacts: [
      { path: 'aidlc-docs/construction/unit-XX/validation-report.md', description: 'What ran, results, gaps' },
    ],
    gate: {
      name: 'UNIT COMPLETE',
      criteria: ['Tests passing (green)', 'Acceptance criteria met', 'Review complete', 'Validation report written'],
      evidenceRequired: ['Test results showing pass', 'validation-report.md exists', 'Acceptance criteria checklist complete'],
    },
  },
  {
    id: 'operations',
    phase: 'operations',
    name: 'Operations',
    description: 'Productionize with safety and observability',
    alwaysExecute: false,
    condition: 'production deployment required',
    artifacts: [
      { path: 'aidlc-docs/operations/deployment-plan.md', description: 'Deployment plan' },
      { path: 'aidlc-docs/operations/runbooks.md', description: 'Operational runbooks' },
      { path: 'aidlc-docs/operations/observability.md', description: 'Monitoring and alerting setup' },
    ],
    gate: {
      name: 'PRODUCTION READY',
      criteria: ['Deployable', 'Observable', 'Rollbackable', 'Security review complete'],
      evidenceRequired: ['Deployment successful', 'Monitoring active', 'Rollback tested'],
    },
  },
];

export function getStagesByPhase(phaseId: string): Stage[] {
  return STAGES.filter(s => s.phase === phaseId);
}

export function getStageById(stageId: string): Stage | undefined {
  return STAGES.find(s => s.id === stageId);
}

export function getPhaseById(phaseId: string): SimulatorPhase | undefined {
  return PHASES.find(p => p.id === phaseId);
}
