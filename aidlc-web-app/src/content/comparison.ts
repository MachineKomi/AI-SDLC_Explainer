// Methodology comparison data for Waterfall, Agile, and AI-SDLC

export interface Phase {
  id: string;
  name: string;
  durationUnits: number;
  description: string;
  handoffs: number;
  waitTime: number;
}

export interface Methodology {
  id: string;
  name: string;
  description: string;
  phases: Phase[];
  cycleTimeFactor: number;
  costFactor: number;
  feedbackLoopTime: string;
  keyCharacteristics: string[];
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
  requirementsStability: 'stable' | 'evolving' | 'volatile';
  teamSize: number;
  baselineWeeks: number;
}

export interface SimulationResult {
  methodologyId: string;
  totalWeeks: number;
  totalCostUnits: number;
  feedbackPoints: number;
  handoffs: number;
  riskEvents: string[];
}

// === METHODOLOGY DEFINITIONS ===

export const WATERFALL: Methodology = {
  id: 'waterfall',
  name: 'Waterfall',
  description: 'Sequential, document-driven approach where each phase must complete before the next begins.',
  phases: [
    { id: 'req', name: 'Requirements', durationUnits: 4, description: 'Gather and document all requirements upfront', handoffs: 2, waitTime: 1 },
    { id: 'design', name: 'Design', durationUnits: 3, description: 'Create comprehensive system design', handoffs: 2, waitTime: 1 },
    { id: 'impl', name: 'Implementation', durationUnits: 6, description: 'Code the entire system', handoffs: 1, waitTime: 0 },
    { id: 'test', name: 'Testing', durationUnits: 4, description: 'Test the complete system', handoffs: 2, waitTime: 1 },
    { id: 'deploy', name: 'Deployment', durationUnits: 2, description: 'Deploy to production', handoffs: 1, waitTime: 0 },
    { id: 'maint', name: 'Maintenance', durationUnits: 0, description: 'Ongoing maintenance', handoffs: 0, waitTime: 0 },
  ],
  cycleTimeFactor: 1.0,
  costFactor: 1.0,
  feedbackLoopTime: 'Months (end of project)',
  keyCharacteristics: [
    'Sequential phases',
    'Heavy documentation',
    'Big bang delivery',
    'Change is expensive',
  ],
  strengths: [
    'Clear milestones',
    'Comprehensive documentation',
    'Predictable for well-known domains',
  ],
  weaknesses: [
    'Late feedback',
    'Rigid to change',
    'High risk of building wrong thing',
    'Long time to value',
  ],
};

export const AGILE: Methodology = {
  id: 'agile',
  name: 'Agile/Scrum',
  description: 'Iterative approach with short sprints and continuous feedback.',
  phases: [
    { id: 'plan', name: 'Sprint Planning', durationUnits: 1, description: 'Plan sprint backlog', handoffs: 1, waitTime: 0 },
    { id: 'dev', name: 'Development', durationUnits: 3, description: 'Develop features', handoffs: 1, waitTime: 0 },
    { id: 'review', name: 'Review', durationUnits: 1, description: 'Demo and get feedback', handoffs: 1, waitTime: 0 },
    { id: 'retro', name: 'Retrospective', durationUnits: 1, description: 'Reflect and improve', handoffs: 1, waitTime: 0 },
  ],
  cycleTimeFactor: 0.5,
  costFactor: 0.8,
  feedbackLoopTime: '2-4 weeks (per sprint)',
  keyCharacteristics: [
    'Iterative sprints',
    'Customer collaboration',
    'Working software over docs',
    'Embrace change',
  ],
  strengths: [
    'Regular feedback',
    'Adaptable to change',
    'Faster time to value',
    'Team empowerment',
  ],
  weaknesses: [
    'Can lack documentation',
    'Scope creep risk',
    'Requires engaged stakeholders',
    'Scaling challenges',
  ],
};

export const AIDLC: Methodology = {
  id: 'aidlc',
  name: 'AI-SDLC',
  description: 'AI-augmented software development with human oversight at critical gates.',
  phases: [
    { id: 'inception', name: 'Inception', durationUnits: 1, description: 'Intent → Units via Mob Elaboration', handoffs: 0, waitTime: 0 },
    { id: 'construct', name: 'Construction', durationUnits: 2, description: 'Bolts with AI + Human Validation', handoffs: 0, waitTime: 0 },
    { id: 'ops', name: 'Operations', durationUnits: 1, description: 'Deploy with evidence', handoffs: 0, waitTime: 0 },
  ],
  cycleTimeFactor: 0.15,
  costFactor: 0.3,
  feedbackLoopTime: 'Hours (per bolt)',
  keyCharacteristics: [
    'AI generates, humans validate',
    'Proof over prose',
    'Adaptive depth',
    'Evidence at gates',
  ],
  strengths: [
    'Dramatically faster delivery',
    'Lower cost',
    'Built-in quality gates',
    'Continuous validation',
    'Scalable with AI',
  ],
  weaknesses: [
    'Requires AI tooling',
    'Learning curve for teams',
    'New collaboration patterns',
  ],
};

export const METHODOLOGIES: Methodology[] = [WATERFALL, AGILE, AIDLC];

export function getMethodology(methodId: string): Methodology | undefined {
  return METHODOLOGIES.find(m => m.id === methodId);
}

// === COMPARISON METRICS ===

export const COMPARISON_METRICS: ComparisonMetric[] = [
  {
    name: 'Time to First Delivery',
    description: 'How long until first working software is delivered',
    waterfall: '6-12 months',
    agile: '2-4 weeks',
    aidlc: 'Hours to days',
    winner: 'aidlc',
  },
  {
    name: 'Feedback Loop',
    description: 'Time between building and validating',
    waterfall: 'End of project',
    agile: 'End of sprint',
    aidlc: 'Per bolt (hours)',
    winner: 'aidlc',
  },
  {
    name: 'Cost of Change',
    description: 'Expense of changing requirements mid-project',
    waterfall: 'Very High',
    agile: 'Medium',
    aidlc: 'Low',
    winner: 'aidlc',
  },
  {
    name: 'Documentation',
    description: 'Quality and completeness of documentation',
    waterfall: 'Comprehensive',
    agile: 'Minimal',
    aidlc: 'Auto-generated + Contextual',
    winner: 'aidlc',
  },
  {
    name: 'Quality Assurance',
    description: 'How quality is ensured',
    waterfall: 'Test phase at end',
    agile: 'Testing in sprint',
    aidlc: 'Proof at every gate + holdout scenarios',
    winner: 'aidlc',
  },
  {
    name: 'Coordination Overhead',
    description: 'Roles, ceremonies, and handoffs required',
    waterfall: 'High (many roles, handoffs)',
    agile: 'Medium (ceremonies, Scrum Master)',
    aidlc: 'Minimal (3 actors, AI orchestrates)',
    winner: 'aidlc',
  },
  {
    name: 'Spec Quality Dependency',
    description: 'How much output quality depends on specification precision',
    waterfall: 'Low (humans fill gaps)',
    agile: 'Low (conversations fill gaps)',
    aidlc: 'Critical (machines build what you describe)',
    winner: 'waterfall',
  },
  {
    name: 'Brownfield Readiness',
    description: 'How existing codebases are handled',
    waterfall: 'Manual analysis',
    agile: 'Sprint-based discovery',
    aidlc: 'AI Elevation (reverse-engineer into models)',
    winner: 'aidlc',
  },
  {
    name: 'Team Scaling',
    description: 'Ability to scale team size',
    waterfall: 'Linear (more people = more cost)',
    agile: 'Sub-linear (communication overhead)',
    aidlc: 'AI scales, humans validate',
    winner: 'aidlc',
  },
  {
    name: 'Risk Management',
    description: 'How risk is identified and managed',
    waterfall: 'Late discovery',
    agile: 'Sprint-level visibility',
    aidlc: 'Continuous with gates + external scenarios',
    winner: 'aidlc',
  },
  {
    name: 'AI Maturity Ceiling',
    description: 'Maximum level of AI integration achievable',
    waterfall: 'L1 (autocomplete only)',
    agile: 'L2-L3 (human-centric review)',
    aidlc: 'L4-L5 (spec-driven, autonomous)',
    winner: 'aidlc',
  },
  {
    name: 'Best For',
    description: 'Ideal use cases',
    waterfall: 'Fixed requirements, regulated',
    agile: 'Evolving products, startups',
    aidlc: 'Any, especially AI-assisted',
    winner: 'aidlc',
  },
];

// === PROJECT SCENARIO SIMULATION ===

export const PROJECT_SCENARIOS: ProjectScenario[] = [
  {
    id: 'banking-app',
    name: 'Banking Mobile App',
    description: 'New mobile banking app with authentication, payments, and account management.',
    complexity: 'high',
    requirementsStability: 'stable',
    teamSize: 8,
    baselineWeeks: 24,
  },
  {
    id: 'startup-mvp',
    name: 'Startup MVP',
    description: 'Minimum viable product for a new SaaS startup with unclear requirements.',
    complexity: 'medium',
    requirementsStability: 'volatile',
    teamSize: 4,
    baselineWeeks: 16,
  },
  {
    id: 'api-integration',
    name: 'API Integration',
    description: 'Integrate with three third-party APIs for an existing platform.',
    complexity: 'low',
    requirementsStability: 'stable',
    teamSize: 3,
    baselineWeeks: 8,
  },
  {
    id: 'legacy-rewrite',
    name: 'Legacy System Rewrite',
    description: 'Rewrite a 10-year-old monolith to microservices.',
    complexity: 'high',
    requirementsStability: 'evolving',
    teamSize: 12,
    baselineWeeks: 52,
  },
  {
    id: 'dark-factory-greenfield',
    name: 'Dark Factory Greenfield',
    description: 'Small L5 team building a new service autonomously. Specs in, software out. No human writes or reviews code.',
    complexity: 'high',
    requirementsStability: 'stable',
    teamSize: 3,
    baselineWeeks: 20,
  },
  {
    id: 'legacy-ai-bolton',
    name: 'Legacy Monolith + AI Bolt-On',
    description: 'Large team adding AI tools to a 15-year monolith without redesigning workflows. The J-curve in action.',
    complexity: 'high',
    requirementsStability: 'evolving',
    teamSize: 15,
    baselineWeeks: 40,
  },
];

export function simulateProject(scenario: ProjectScenario, methodology: Methodology): SimulationResult {
  const baseWeeks = scenario.baselineWeeks;

  // Calculate time
  let timeFactor = methodology.cycleTimeFactor;
  if (scenario.requirementsStability === 'volatile') {
    if (methodology.id === 'waterfall') {
      timeFactor *= 1.5;
    } else if (methodology.id === 'aidlc') {
      timeFactor *= 0.9;
    }
  }

  // J-curve: AI bolt-on scenario penalizes Agile (workflow disruption without redesign)
  if (scenario.id === 'legacy-ai-bolton' && methodology.id === 'agile') {
    timeFactor *= 1.25; // 25% slower — AI tools + old workflows = friction
  }

  // Dark factory greenfield: AI-SDLC is dramatically faster at L5
  if (scenario.id === 'dark-factory-greenfield' && methodology.id === 'aidlc') {
    timeFactor *= 0.4; // 3-person team, fully autonomous
  }

  const totalWeeks = Math.round(baseWeeks * timeFactor);

  // Calculate cost
  let costFactor = methodology.costFactor;
  if (scenario.complexity === 'high') {
    costFactor *= 1.2;
  }
  // Dark factory: tiny team = much lower cost
  if (scenario.id === 'dark-factory-greenfield' && methodology.id === 'aidlc') {
    costFactor *= 0.5;
  }
  // AI bolt-on: added tooling cost + disruption overhead
  if (scenario.id === 'legacy-ai-bolton' && methodology.id === 'agile') {
    costFactor *= 1.15;
  }
  const totalCost = Math.round(baseWeeks * 10 * costFactor);

  // Calculate feedback points
  let feedbackPoints: number;
  if (methodology.id === 'waterfall') {
    feedbackPoints = 2;
  } else if (methodology.id === 'agile') {
    feedbackPoints = Math.max(1, Math.floor(totalWeeks / 2));
  } else {
    feedbackPoints = Math.max(1, totalWeeks * 5);
  }

  // Calculate handoffs
  let handoffs = methodology.phases.reduce((sum, p) => sum + p.handoffs, 0);
  if (methodology.id === 'agile') {
    handoffs *= Math.max(1, Math.floor(totalWeeks / 2));
  }

  // Risk events
  const riskEvents: string[] = [];
  if (methodology.id === 'waterfall') {
    if (scenario.requirementsStability !== 'stable') {
      riskEvents.push('Requirements changed during implementation');
    }
    if (scenario.complexity === 'high') {
      riskEvents.push('Integration issues discovered late');
    }
  } else if (methodology.id === 'agile') {
    if (scenario.requirementsStability === 'volatile') {
      riskEvents.push('Scope creep across sprints');
    }
    if (scenario.id === 'legacy-ai-bolton') {
      riskEvents.push('J-curve: AI tools slowed team before workflows adapted');
      riskEvents.push('Context switching between AI suggestions and manual coding');
      riskEvents.push('Review overhead: reading AI output costs more than writing it');
    }
  } else if (methodology.id === 'aidlc') {
    if (scenario.id === 'legacy-ai-bolton') {
      riskEvents.push('Elevation step required: AI must model existing architecture first');
    }
  }

  return {
    methodologyId: methodology.id,
    totalWeeks,
    totalCostUnits: totalCost,
    feedbackPoints,
    handoffs,
    riskEvents,
  };
}
