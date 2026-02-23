/**
 * Simulation Task Sequences
 * 
 * Defines realistic task sequences for each methodology that model
 * actual SDLC workflows. Tasks are designed to show the fundamental
 * differences in how work flows through each approach.
 * 
 * Time values are in milliseconds and will be scaled by the simulation
 * engine to achieve the target 45-second total duration.
 */

import { SimulationTask, MethodologyId, TimeCompressionConfig } from '@/types/simulation';

/**
 * Waterfall Task Sequence
 * 
 * Models sequential phases with handoffs and wait times between teams.
 * Key characteristics:
 * - Long requirements and design phases upfront
 * - Explicit handoffs between teams (causing wait time)
 * - Testing happens after all development is complete
 * - Approval gates cause delays
 */
export const WATERFALL_TASKS: SimulationTask[] = [
  // Requirements Phase
  { 
    id: 'w1', 
    name: 'Gather Requirements', 
    description: 'Interview stakeholders and document all requirements upfront',
    durationMs: 4000, 
    team: 'Business Analysts', 
    type: 'work', 
    icon: 'FileText' 
  },
  { 
    id: 'w2', 
    name: 'Document Requirements', 
    description: 'Create comprehensive requirements specification',
    durationMs: 3000, 
    team: 'Business Analysts', 
    type: 'work', 
    icon: 'FileEdit' 
  },
  { 
    id: 'w3', 
    name: 'Requirements Review', 
    description: 'Stakeholders review and provide feedback',
    durationMs: 2000, 
    team: 'Stakeholders', 
    type: 'review', 
    icon: 'Users' 
  },
  { 
    id: 'w4', 
    name: 'Waiting for Sign-off', 
    description: 'Awaiting management approval from 3 stakeholders to proceed',
    durationMs: 2500, 
    team: 'Management', 
    type: 'wait', 
    icon: 'Clock' 
  },
  
  // Design Phase
  { 
    id: 'w5', 
    name: 'System Architecture', 
    description: 'Design high-level system architecture',
    durationMs: 3500, 
    team: 'Architects', 
    type: 'work', 
    icon: 'Boxes' 
  },
  { 
    id: 'w6', 
    name: 'Detailed Design', 
    description: 'Create detailed technical design documents',
    durationMs: 3000, 
    team: 'Architects', 
    type: 'work', 
    icon: 'PenTool' 
  },
  { 
    id: 'w7', 
    name: 'Design Review', 
    description: 'Technical lead reviews design documents',
    durationMs: 1500, 
    team: 'Tech Lead', 
    type: 'review', 
    icon: 'Search' 
  },
  {
    id: 'w7b',
    name: 'Knowledge Transfer Meeting',
    description: 'Architects explain design decisions to dev team — context lost in translation',
    durationMs: 1500,
    team: 'Architects → Devs',
    type: 'ceremony',
    icon: 'Users'
  },
  { 
    id: 'w8', 
    name: 'Handoff to Dev Team', 
    description: 'Transfer design documents and context to developers',
    durationMs: 2000, 
    team: 'Dev Team', 
    type: 'handoff', 
    icon: 'ArrowRight' 
  },
  
  // Implementation Phase
  { 
    id: 'w9', 
    name: 'Setup Environment', 
    description: 'Configure development and build environments',
    durationMs: 1500, 
    team: 'DevOps', 
    type: 'work', 
    icon: 'Server' 
  },
  {
    id: 'w9b',
    name: 'Waiting for Environment',
    description: 'Dev environment provisioning blocked on infrastructure team',
    durationMs: 1500,
    team: 'Infrastructure',
    type: 'wait',
    icon: 'Clock'
  },
  { 
    id: 'w10', 
    name: 'Code Implementation', 
    description: 'Implement all features according to design',
    durationMs: 6000, 
    team: 'Developers', 
    type: 'work', 
    icon: 'Code' 
  },
  { 
    id: 'w11', 
    name: 'Code Review', 
    description: 'Senior developers review all code',
    durationMs: 2000, 
    team: 'Senior Devs', 
    type: 'review', 
    icon: 'GitPullRequest' 
  },
  { 
    id: 'w12', 
    name: 'Handoff to QA', 
    description: 'Transfer completed code to QA team',
    durationMs: 1500, 
    team: 'QA Team', 
    type: 'handoff', 
    icon: 'ArrowRight' 
  },
  
  // Testing Phase
  { 
    id: 'w13', 
    name: 'Test Planning', 
    description: 'Create test plans and test cases',
    durationMs: 1500, 
    team: 'QA Team', 
    type: 'work', 
    icon: 'ClipboardList' 
  },
  { 
    id: 'w14', 
    name: 'Execute Tests', 
    description: 'Run all test cases against the system',
    durationMs: 4000, 
    team: 'QA Team', 
    type: 'work', 
    icon: 'TestTube' 
  },
  {
    id: 'w14b',
    name: 'Requirements Change Request',
    description: 'Stakeholder realizes requirements were wrong — change request filed mid-testing',
    durationMs: 2000,
    team: 'Stakeholders',
    type: 'wait',
    icon: 'AlertTriangle'
  },
  { 
    id: 'w15', 
    name: 'Bug Fixes', 
    description: 'Developers fix discovered bugs',
    durationMs: 2500, 
    team: 'Developers', 
    type: 'work', 
    icon: 'Bug' 
  },
  { 
    id: 'w16', 
    name: 'Regression Testing', 
    description: 'Re-test after bug fixes',
    durationMs: 2000, 
    team: 'QA Team', 
    type: 'work', 
    icon: 'RefreshCw' 
  },
  
  // Deployment Phase
  { 
    id: 'w17', 
    name: 'Deployment Approval', 
    description: 'Awaiting management approval for production deployment',
    durationMs: 2000, 
    team: 'Management', 
    type: 'wait', 
    icon: 'Clock' 
  },
  { 
    id: 'w18', 
    name: 'Deploy to Production', 
    description: 'Deploy the complete system to production',
    durationMs: 1500, 
    team: 'DevOps', 
    type: 'work', 
    icon: 'Rocket' 
  },
];

/**
 * Agile Task Sequence
 * 
 * Models sprint-based cycles with ceremonies and iterations.
 * Key characteristics:
 * - Work organized into sprints
 * - Regular ceremonies (planning, standups, reviews, retros)
 * - Incremental delivery
 * - Continuous feedback but ceremony overhead
 */
export const AGILE_TASKS: SimulationTask[] = [
  // Sprint 1
  { 
    id: 'a1', 
    name: 'Sprint Planning', 
    description: 'Plan sprint backlog and assign stories',
    durationMs: 1500, 
    team: 'Scrum Team', 
    type: 'ceremony', 
    icon: 'Calendar' 
  },
  { 
    id: 'a2', 
    name: 'Daily Standup', 
    description: 'Team sync on progress and blockers',
    durationMs: 500, 
    team: 'Scrum Team', 
    type: 'ceremony', 
    icon: 'Users' 
  },
  { 
    id: 'a3', 
    name: 'Development Work', 
    description: 'Implement user stories',
    durationMs: 3000, 
    team: 'Developers', 
    type: 'work', 
    icon: 'Code' 
  },
  { 
    id: 'a4', 
    name: 'Code Review', 
    description: 'Peer review of completed work',
    durationMs: 1000, 
    team: 'Developers', 
    type: 'review', 
    icon: 'GitPullRequest' 
  },
  { 
    id: 'a5', 
    name: 'Sprint Review', 
    description: 'Demo completed work to stakeholders',
    durationMs: 1000, 
    team: 'Stakeholders', 
    type: 'ceremony', 
    icon: 'Presentation' 
  },
  { 
    id: 'a6', 
    name: 'Retrospective', 
    description: 'Reflect on sprint and identify improvements',
    durationMs: 800, 
    team: 'Scrum Team', 
    type: 'ceremony', 
    icon: 'MessageCircle' 
  },
  
  // Sprint 2 — J-curve friction: team bolted on AI tools without redesigning workflow
  { 
    id: 'a7', 
    name: 'Sprint Planning', 
    description: 'Plan sprint 2 backlog',
    durationMs: 1200, 
    team: 'Scrum Team', 
    type: 'ceremony', 
    icon: 'Calendar' 
  },
  { 
    id: 'a8', 
    name: 'Daily Standup', 
    description: 'Team sync on progress',
    durationMs: 500, 
    team: 'Scrum Team', 
    type: 'ceremony', 
    icon: 'Users' 
  },
  { 
    id: 'a9', 
    name: 'Development + AI Assist', 
    description: 'Implement stories — AI generates code, devs evaluate suggestions',
    durationMs: 2500, 
    team: 'Developers', 
    type: 'work', 
    icon: 'Code' 
  },
  {
    id: 'a9b',
    name: 'Review AI Output',
    description: 'Developer spent 45 min evaluating AI suggestions — "writing code cheaper, owning it more expensive"',
    durationMs: 1500,
    team: 'Developers',
    type: 'review',
    icon: 'Search'
  },
  {
    id: 'a9c',
    name: 'Context Switching',
    description: 'Switching between own mental model and AI output — debugging subtle AI-introduced errors',
    durationMs: 1000,
    team: 'Developers',
    type: 'wait',
    icon: 'RefreshCw'
  },
  { 
    id: 'a10', 
    name: 'Testing', 
    description: 'QA testing of sprint work',
    durationMs: 1500, 
    team: 'QA', 
    type: 'work', 
    icon: 'TestTube' 
  },
  { 
    id: 'a11', 
    name: 'Sprint Review', 
    description: 'Demo sprint 2 work',
    durationMs: 1000, 
    team: 'Stakeholders', 
    type: 'ceremony', 
    icon: 'Presentation' 
  },
  { 
    id: 'a12', 
    name: 'Retrospective', 
    description: 'Sprint 2 retrospective',
    durationMs: 800, 
    team: 'Scrum Team', 
    type: 'ceremony', 
    icon: 'MessageCircle' 
  },
  
  // Sprint 3 (Final)
  { 
    id: 'a13', 
    name: 'Sprint Planning', 
    description: 'Plan final sprint',
    durationMs: 1000, 
    team: 'Scrum Team', 
    type: 'ceremony', 
    icon: 'Calendar' 
  },
  {
    id: 'a13b',
    name: 'Scope Creep Discussion',
    description: 'PM wants to add features — 30 min debate on what fits in the sprint',
    durationMs: 800,
    team: 'Scrum Team',
    type: 'ceremony',
    icon: 'MessageCircle'
  },
  { 
    id: 'a14', 
    name: 'Development Work', 
    description: 'Complete remaining features',
    durationMs: 2500, 
    team: 'Developers', 
    type: 'work', 
    icon: 'Code' 
  },
  { 
    id: 'a15', 
    name: 'Integration Testing', 
    description: 'Full system integration testing',
    durationMs: 1500, 
    team: 'QA', 
    type: 'work', 
    icon: 'Layers' 
  },
  { 
    id: 'a16', 
    name: 'Sprint Review', 
    description: 'Final demo to stakeholders',
    durationMs: 1000, 
    team: 'Stakeholders', 
    type: 'ceremony', 
    icon: 'Presentation' 
  },
  { 
    id: 'a17', 
    name: 'Release Prep', 
    description: 'Prepare release artifacts',
    durationMs: 1000, 
    team: 'DevOps', 
    type: 'work', 
    icon: 'Package' 
  },
  { 
    id: 'a18', 
    name: 'Deploy', 
    description: 'Deploy to production',
    durationMs: 800, 
    team: 'DevOps', 
    type: 'work', 
    icon: 'Rocket' 
  },
];

/**
 * AI-SDLC Task Sequence
 * 
 * Models AI-driven development with human validation gates.
 * Key characteristics:
 * - AI generates artifacts rapidly
 * - Human validation at key gates (not blocking)
 * - Parallel execution where possible
 * - Minimal wait time, instant feedback
 */
export const AIDLC_TASKS: SimulationTask[] = [
  // Inception
  { 
    id: 'ai1', 
    name: 'Intent Capture', 
    description: 'Product owner describes intent and goals',
    durationMs: 800, 
    team: 'Product Owner', 
    type: 'work', 
    icon: 'Lightbulb' 
  },
  { 
    id: 'ai2', 
    name: 'AI: Generate Spec', 
    description: 'AI generates requirements, stories, NFRs, and risk descriptions',
    durationMs: 600, 
    team: 'AI Agent', 
    type: 'work', 
    icon: 'Bot' 
  },
  { 
    id: 'ai3', 
    name: 'Human Validation', 
    description: 'Human reviews and approves spec — Gate Pass on first review',
    durationMs: 500, 
    team: 'Human', 
    type: 'validation', 
    icon: 'UserCheck' 
  },
  { 
    id: 'ai4', 
    name: 'AI: Elaborate Units', 
    description: 'AI breaks down into implementation units with DDD domain models',
    durationMs: 700, 
    team: 'AI Agent', 
    type: 'work', 
    icon: 'Bot' 
  },
  { 
    id: 'ai5', 
    name: 'Human Validation', 
    description: 'Human validates unit breakdown and domain boundaries',
    durationMs: 400, 
    team: 'Human', 
    type: 'validation', 
    icon: 'UserCheck' 
  },
  
  // Construction - Bolt 1
  { 
    id: 'ai6', 
    name: 'AI: Generate Code', 
    description: 'AI generates implementation from domain model → logical design → code',
    durationMs: 1200, 
    team: 'AI Agent', 
    type: 'work', 
    icon: 'Bot' 
  },
  { 
    id: 'ai7', 
    name: 'AI: Generate Tests', 
    description: 'AI generates test suite concurrent with implementation',
    durationMs: 800, 
    team: 'AI Agent', 
    type: 'work', 
    icon: 'Bot' 
  },
  {
    id: 'ai7b',
    name: 'Scenario Validation',
    description: 'External holdout scenarios evaluate software — agent never saw these criteria',
    durationMs: 400,
    team: 'Scenario Runner',
    type: 'scenario',
    icon: 'Shield'
  },
  { 
    id: 'ai8', 
    name: 'Human Review', 
    description: 'Human reviews generated code at gate — Override Rate: 18%',
    durationMs: 600, 
    team: 'Human', 
    type: 'validation', 
    icon: 'UserCheck' 
  },
  { 
    id: 'ai9', 
    name: 'AI: Fix Issues', 
    description: 'AI addresses review feedback',
    durationMs: 400, 
    team: 'AI Agent', 
    type: 'work', 
    icon: 'Bot' 
  },
  { 
    id: 'ai10', 
    name: 'Tests Pass', 
    description: 'CI runs and all tests pass — proof over prose',
    durationMs: 300, 
    team: 'CI', 
    type: 'work', 
    icon: 'CheckCircle' 
  },
  
  // Construction - Bolt 2
  { 
    id: 'ai11', 
    name: 'AI: Generate More', 
    description: 'AI generates next unit — parallel execution',
    durationMs: 1000, 
    team: 'AI Agent', 
    type: 'work', 
    icon: 'Bot' 
  },
  {
    id: 'ai11b',
    name: 'Scenario Validation',
    description: 'External scenarios verify integration behavior across units',
    durationMs: 350,
    team: 'Scenario Runner',
    type: 'scenario',
    icon: 'Shield'
  },
  { 
    id: 'ai12', 
    name: 'Human Validation', 
    description: 'Human validates implementation — Gate Pass first review',
    durationMs: 500, 
    team: 'Human', 
    type: 'validation', 
    icon: 'UserCheck' 
  },
  { 
    id: 'ai13', 
    name: 'AI: Integration', 
    description: 'AI integrates all components against digital twin environment',
    durationMs: 600, 
    team: 'AI Agent', 
    type: 'work', 
    icon: 'Bot' 
  },
  { 
    id: 'ai14', 
    name: 'All Tests Pass', 
    description: 'Full test suite + scenario holdout set passes',
    durationMs: 400, 
    team: 'CI', 
    type: 'work', 
    icon: 'CheckCircle' 
  },
  
  // Operations
  { 
    id: 'ai15', 
    name: 'AI: Deploy Config', 
    description: 'AI generates deployment configuration and IaC',
    durationMs: 400, 
    team: 'AI Agent', 
    type: 'work', 
    icon: 'Bot' 
  },
  { 
    id: 'ai16', 
    name: 'Human Approval', 
    description: 'Human approves deployment — evidence reviewed',
    durationMs: 300, 
    team: 'Human', 
    type: 'validation', 
    icon: 'UserCheck' 
  },
  { 
    id: 'ai17', 
    name: 'Deploy', 
    description: 'Automated deployment to production',
    durationMs: 500, 
    team: 'CI/CD', 
    type: 'work', 
    icon: 'Rocket' 
  },
];

/**
 * Get tasks for a specific methodology
 */
export function getTasksForMethodology(methodologyId: MethodologyId): SimulationTask[] {
  switch (methodologyId) {
    case 'waterfall':
      return WATERFALL_TASKS;
    case 'agile':
      return AGILE_TASKS;
    case 'aidlc':
      return AIDLC_TASKS;
  }
}

/**
 * Calculate total raw duration for a task sequence
 */
export function calculateTotalDuration(tasks: SimulationTask[]): number {
  return tasks.reduce((sum, task) => sum + task.durationMs, 0);
}

/**
 * Default time compression configuration
 * Target: 45 seconds total simulation, AI-SDLC finishes at ~35%, Agile at ~65%
 */
export const DEFAULT_TIME_CONFIG: TimeCompressionConfig = {
  targetDurationMs: 45000, // 45 seconds
  tickIntervalMs: 50,      // 20 fps
  completionTargets: {
    waterfall: 1.0,  // Baseline - finishes last
    agile: 0.65,     // Finishes at 65% of waterfall time
    aidlc: 0.35,     // Finishes at 35% of waterfall time
  },
};

/**
 * Scale task durations to achieve target completion times
 */
export function scaleTasksForTarget(
  tasks: SimulationTask[],
  targetCompletionRatio: number,
  baselineDurationMs: number
): SimulationTask[] {
  const totalTaskTime = calculateTotalDuration(tasks);
  const targetDuration = baselineDurationMs * targetCompletionRatio;
  const scaleFactor = targetDuration / totalTaskTime;
  
  return tasks.map(task => ({
    ...task,
    durationMs: Math.max(100, Math.round(task.durationMs * scaleFactor)) // Minimum 100ms
  }));
}

/**
 * Get scaled tasks for all methodologies based on config
 */
export function getScaledTasks(config: TimeCompressionConfig = DEFAULT_TIME_CONFIG): Record<MethodologyId, SimulationTask[]> {
  const baselineDuration = config.targetDurationMs;
  
  return {
    waterfall: scaleTasksForTarget(
      WATERFALL_TASKS, 
      config.completionTargets.waterfall, 
      baselineDuration
    ),
    agile: scaleTasksForTarget(
      AGILE_TASKS, 
      config.completionTargets.agile, 
      baselineDuration
    ),
    aidlc: scaleTasksForTarget(
      AIDLC_TASKS, 
      config.completionTargets.aidlc, 
      baselineDuration
    ),
  };
}

/**
 * Methodology display names and colors
 */
export const METHODOLOGY_CONFIG: Record<MethodologyId, {
  name: string;
  color: string;
  bgColor: string;
  borderColor: string;
}> = {
  waterfall: {
    name: 'Waterfall',
    color: 'text-foreground-muted',
    bgColor: 'bg-foreground-muted/10',
    borderColor: 'border-foreground-muted/30',
  },
  agile: {
    name: 'Agile/Scrum',
    color: 'text-blue-400',
    bgColor: 'bg-blue-400/10',
    borderColor: 'border-blue-400/30',
  },
  aidlc: {
    name: 'AI-SDLC',
    color: 'text-accent-primary',
    bgColor: 'bg-accent-primary/10',
    borderColor: 'border-accent-primary/30',
  },
};

/**
 * Wait state styling per methodology
 */
export const WAIT_STYLES: Record<MethodologyId, {
  color: string;
  bgColor: string;
  borderColor: string;
  label: string;
}> = {
  waterfall: {
    color: 'text-amber-400',
    bgColor: 'bg-amber-400/10',
    borderColor: 'border-amber-400/30',
    label: 'Waiting for approval...',
  },
  agile: {
    color: 'text-blue-400',
    bgColor: 'bg-blue-400/10',
    borderColor: 'border-blue-400/30',
    label: 'In ceremony...',
  },
  aidlc: {
    color: 'text-accent-primary',
    bgColor: 'bg-accent-primary/10',
    borderColor: 'border-accent-primary/30',
    label: 'Human validation...',
  },
};
