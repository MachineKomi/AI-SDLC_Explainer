// Request type definitions with adaptive stage execution

export interface StageConfig {
  execute: boolean | 'conditional';
  reason: string;
}

export interface RequestType {
  id: string;
  name: string;
  description: string;
  icon: string;
  defaultRisk: 'low' | 'medium' | 'high';
  stages: Record<string, StageConfig>;
  typicalQuestions: string[];
  keyGates: string[];
}

export interface RiskProfile {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export const RISK_PROFILES: RiskProfile[] = [
  {
    id: 'low',
    name: 'Low Risk',
    description: 'Isolated change, easy rollback, well-understood',
    icon: '🟢',
  },
  {
    id: 'medium',
    name: 'Medium Risk',
    description: 'Multiple components, moderate rollback complexity',
    icon: '🟡',
  },
  {
    id: 'high',
    name: 'High Risk',
    description: 'System-wide impact, complex rollback, significant unknowns',
    icon: '🔴',
  },
];

export const REQUEST_TYPES: RequestType[] = [
  {
    id: 'greenfield',
    name: 'Greenfield Project',
    description: 'Building a new application from scratch',
    icon: '🌱',
    defaultRisk: 'medium',
    stages: {
      'workspace-detection': { execute: true, reason: 'Detect empty project, initialize state' },
      'reverse-engineering': { execute: false, reason: 'No existing code to analyze' },
      'requirements-analysis': { execute: true, reason: 'Define what to build' },
      'user-stories': { execute: true, reason: 'Define user journeys for new system' },
      'workflow-planning': { execute: true, reason: 'Plan execution stages' },
      'application-design': { execute: true, reason: 'Design new architecture' },
      'units-generation': { execute: true, reason: 'Parallel work breakdown' },
      'functional-design': { execute: true, reason: 'Detailed component design' },
      'nfr-requirements': { execute: 'conditional', reason: 'If performance/security concerns' },
      'nfr-design': { execute: 'conditional', reason: 'If NFR requirements defined' },
      'infrastructure-design': { execute: 'conditional', reason: 'If deployment needed' },
      'code-generation': { execute: true, reason: 'Always required' },
      'build-and-test': { execute: true, reason: 'Always required' },
      'operations': { execute: 'conditional', reason: 'If production deployment' },
    },
    typicalQuestions: [
      'What is the primary business goal?',
      'Who are the target users?',
      'What technology stack?',
      'What are the key constraints?',
    ],
    keyGates: [
      'Requirements Approved',
      'INCEPTION EXIT (units approved)',
      'Design Approved',
      'UNIT COMPLETE',
    ],
  },
  {
    id: 'brownfield',
    name: 'Brownfield Enhancement',
    description: 'Enhance or modify an existing codebase',
    icon: '🔧',
    defaultRisk: 'medium',
    stages: {
      'workspace-detection': { execute: true, reason: 'Detect existing project structure' },
      'reverse-engineering': { execute: true, reason: 'Understand existing architecture' },
      'requirements-analysis': { execute: true, reason: 'Define enhancement scope' },
      'user-stories': { execute: 'conditional', reason: 'If user-facing changes' },
      'workflow-planning': { execute: true, reason: 'Includes impact analysis' },
      'application-design': { execute: 'conditional', reason: 'If new components needed' },
      'units-generation': { execute: 'conditional', reason: 'If multiple changes needed' },
      'functional-design': { execute: 'conditional', reason: 'If component changes' },
      'nfr-requirements': { execute: 'conditional', reason: 'If NFR impact' },
      'nfr-design': { execute: 'conditional', reason: 'If NFR requirements defined' },
      'infrastructure-design': { execute: 'conditional', reason: 'If infra changes' },
      'code-generation': { execute: true, reason: 'Always required' },
      'build-and-test': { execute: true, reason: 'Always required' },
      'operations': { execute: 'conditional', reason: 'If deployment changes' },
    },
    typicalQuestions: [
      'What aspects of existing code need analysis?',
      'Are there known technical debt areas?',
      'What is the impact scope?',
      'Are there breaking changes?',
    ],
    keyGates: [
      'Codebase Understood',
      'Requirements Approved',
      'Execution Plan Approved',
      'UNIT COMPLETE',
    ],
  },
  {
    id: 'frontend',
    name: 'Frontend / UI Changes',
    description: 'UI/UX focused changes with user experience impact',
    icon: '🎨',
    defaultRisk: 'low',
    stages: {
      'workspace-detection': { execute: true, reason: 'Detect UI framework and structure' },
      'reverse-engineering': { execute: 'conditional', reason: 'If modifying existing UI' },
      'requirements-analysis': { execute: true, reason: 'Define UI requirements' },
      'user-stories': { execute: true, reason: 'Critical for UX changes' },
      'workflow-planning': { execute: true, reason: 'Plan UI implementation' },
      'application-design': { execute: 'conditional', reason: 'If new pages/components' },
      'units-generation': { execute: 'conditional', reason: 'If multiple UI areas' },
      'functional-design': { execute: true, reason: 'UI component design' },
      'nfr-requirements': { execute: false, reason: 'Typically not needed for UI' },
      'nfr-design': { execute: false, reason: 'Typically not needed for UI' },
      'infrastructure-design': { execute: false, reason: 'UI changes don\'t need infra' },
      'code-generation': { execute: true, reason: 'Always required' },
      'build-and-test': { execute: true, reason: 'Includes visual testing' },
      'operations': { execute: false, reason: 'UI deployment is standard' },
    },
    typicalQuestions: [
      'What is the primary interaction mode?',
      'How many user personas?',
      'What accessibility requirements?',
      'Is responsive design needed?',
    ],
    keyGates: [
      'User Stories Approved',
      'Design Approved (UI mockups)',
      'UNIT COMPLETE (visual verification)',
    ],
  },
  {
    id: 'bugfix',
    name: 'Bug Fix',
    description: 'Fix a specific issue with minimal scope',
    icon: '🐛',
    defaultRisk: 'low',
    stages: {
      'workspace-detection': { execute: true, reason: 'Identify affected area' },
      'reverse-engineering': { execute: true, reason: 'Understand bug context' },
      'requirements-analysis': { execute: true, reason: 'Bug reproduction criteria' },
      'user-stories': { execute: false, reason: 'Not needed for bug fix' },
      'workflow-planning': { execute: true, reason: 'Minimal - focused plan' },
      'application-design': { execute: false, reason: 'No new architecture' },
      'units-generation': { execute: false, reason: 'Single fix, no decomposition' },
      'functional-design': { execute: false, reason: 'No new design needed' },
      'nfr-requirements': { execute: false, reason: 'Not applicable' },
      'nfr-design': { execute: false, reason: 'Not applicable' },
      'infrastructure-design': { execute: false, reason: 'Not applicable' },
      'code-generation': { execute: true, reason: 'Implement fix' },
      'build-and-test': { execute: true, reason: 'Verify fix + regression tests' },
      'operations': { execute: false, reason: 'Standard deployment' },
    },
    typicalQuestions: [
      'What is the bug reproduction steps?',
      'What is the expected vs actual behavior?',
      'Are there related issues?',
      'What tests verify the fix?',
    ],
    keyGates: [
      'Bug Understood (reproduction confirmed)',
      'Fix Implemented',
      'UNIT COMPLETE (fix verified, no regression)',
    ],
  },
];

export function getRequestTypeById(typeId: string): RequestType | undefined {
  return REQUEST_TYPES.find(t => t.id === typeId);
}

export function getRiskProfileById(riskId: string): RiskProfile | undefined {
  return RISK_PROFILES.find(r => r.id === riskId);
}
