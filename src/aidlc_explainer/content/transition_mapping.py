"""Transition mapping from Agile/Scrum to AI-DLC."""

from dataclasses import dataclass, field


@dataclass
class RoleMapping:
    """Maps an Agile role to its AI-DLC equivalent."""
    agile_role: str
    agile_responsibilities: list[str]
    aidlc_role: str
    aidlc_responsibilities: list[str]
    key_changes: list[str]
    skills_to_develop: list[str]


ROLE_MAPPINGS = [
    RoleMapping(
        agile_role="Product Owner",
        agile_responsibilities=[
            "Define and prioritize backlog",
            "Accept/reject sprint deliverables",
            "Stakeholder communication",
            "Define acceptance criteria",
        ],
        aidlc_role="Intent Owner",
        aidlc_responsibilities=[
            "Define Intent (high-level outcome)",
            "Approve Units at Inception gate",
            "Validate evidence at gates",
            "Business outcome accountability",
        ],
        key_changes=[
            "Focus shifts from features to outcomes",
            "Approvals based on evidence, not demos",
            "Works with AI-generated artifacts",
            "Faster feedback cycles",
        ],
        skills_to_develop=[
            "Evidence-based validation",
            "Intent writing (clear, measurable)",
            "AI output interpretation",
        ],
    ),
    RoleMapping(
        agile_role="Scrum Master",
        agile_responsibilities=[
            "Facilitate ceremonies",
            "Remove blockers",
            "Coach team on Agile",
            "Track velocity/metrics",
        ],
        aidlc_role="AI Facilitator",
        aidlc_responsibilities=[
            "Orchestrate Mob sessions",
            "Manage AI tool interactions",
            "Ensure gate criteria met",
            "Coach team on AI collaboration",
        ],
        key_changes=[
            "From process facilitation to AI orchestration",
            "Focus on prompt quality and context",
            "Guardrail management",
            "Evidence gathering coordination",
        ],
        skills_to_develop=[
            "Prompt engineering",
            "AI tool expertise",
            "Gate criteria evaluation",
            "Guardrail definition",
        ],
    ),
    RoleMapping(
        agile_role="Developer",
        agile_responsibilities=[
            "Write code",
            "Estimate stories",
            "Attend ceremonies",
            "Code review peers",
        ],
        aidlc_role="Human Validator",
        aidlc_responsibilities=[
            "Review AI-generated code",
            "Provide context to AI",
            "Validate proofs/evidence",
            "Refine AI output",
        ],
        key_changes=[
            "From code author to code reviewer",
            "More time validating, less typing",
            "Focus on edge cases and quality",
            "Guardrail retros after bolts",
        ],
        skills_to_develop=[
            "AI code review patterns",
            "Context preparation",
            "Prompt refinement",
            "Evidence validation",
        ],
    ),
    RoleMapping(
        agile_role="QA Engineer",
        agile_responsibilities=[
            "Write test cases",
            "Manual testing",
            "Automation scripts",
            "Bug reporting",
        ],
        aidlc_role="Validation Specialist",
        aidlc_responsibilities=[
            "Define validation criteria",
            "Review AI-generated tests",
            "Evidence gathering",
            "Gate readiness assessment",
        ],
        key_changes=[
            "AI generates test code",
            "Focus on criteria definition",
            "Continuous validation vs end-of-sprint",
            "Evidence-based quality assurance",
        ],
        skills_to_develop=[
            "Validation criteria writing",
            "AI test output review",
            "Evidence documentation",
        ],
    ),
]


@dataclass
class ProcessMapping:
    """Maps an Agile ceremony/process to AI-DLC equivalent."""
    agile_process: str
    agile_frequency: str
    agile_duration: str
    agile_purpose: str
    aidlc_process: str
    aidlc_frequency: str
    aidlc_duration: str
    aidlc_purpose: str
    key_differences: list[str]


PROCESS_MAPPINGS = [
    ProcessMapping(
        agile_process="Sprint Planning",
        agile_frequency="Every 2 weeks",
        agile_duration="2-4 hours",
        agile_purpose="Select stories, estimate, plan sprint",
        aidlc_process="Mob Elaboration",
        aidlc_frequency="Per Intent",
        aidlc_duration="60 minutes",
        aidlc_purpose="Convert Intent to validated Units",
        key_differences=[
            "AI assists in breakdown",
            "Output is Units, not stories",
            "Immediate gate approval",
            "No estimation (AI adjusts)",
        ],
    ),
    ProcessMapping(
        agile_process="Daily Standup",
        agile_frequency="Daily",
        agile_duration="15 minutes",
        agile_purpose="Sync, blockers, coordination",
        aidlc_process="Bolt Sync (optional)",
        aidlc_frequency="As needed",
        aidlc_duration="5-10 minutes",
        aidlc_purpose="Coordinate parallel bolts",
        key_differences=[
            "Less formal, more async",
            "AI tracks progress",
            "Focus on gate readiness",
            "Shorter cycles reduce need",
        ],
    ),
    ProcessMapping(
        agile_process="Sprint Development",
        agile_frequency="2-week sprints",
        agile_duration="10 working days",
        agile_purpose="Build features",
        aidlc_process="Mob Construction",
        aidlc_frequency="Per Bolt (4-8 hours)",
        aidlc_duration="Hours, not days",
        aidlc_purpose="AI builds, humans validate",
        key_differences=[
            "Dramatically faster cycles",
            "AI generates, humans review",
            "Evidence gathered per bolt",
            "Continuous gate checks",
        ],
    ),
    ProcessMapping(
        agile_process="Sprint Review",
        agile_frequency="End of sprint",
        agile_duration="1-2 hours",
        agile_purpose="Demo to stakeholders",
        aidlc_process="Gate Approval",
        aidlc_frequency="Per Unit completion",
        aidlc_duration="15-30 minutes",
        aidlc_purpose="Evidence-based approval",
        key_differences=[
            "Proof over prose",
            "Evidence replaces demos",
            "Faster feedback",
            "Clear go/no-go criteria",
        ],
    ),
    ProcessMapping(
        agile_process="Retrospective",
        agile_frequency="End of sprint",
        agile_duration="1-2 hours",
        agile_purpose="Team improvement",
        aidlc_process="Guardrail Retro",
        aidlc_frequency="Per Bolt",
        aidlc_duration="15 minutes",
        aidlc_purpose="Improve AI collaboration",
        key_differences=[
            "Focus on AI effectiveness",
            "Update guardrails/rules",
            "Continuous improvement",
            "Faster feedback loop",
        ],
    ),
]


@dataclass
class ArtifactMapping:
    """Maps an Agile artifact to AI-DLC equivalent."""
    agile_artifact: str
    agile_purpose: str
    aidlc_artifact: str
    aidlc_purpose: str
    key_differences: list[str]


ARTIFACT_MAPPINGS = [
    ArtifactMapping(
        agile_artifact="Product Backlog",
        agile_purpose="Prioritized list of features/stories",
        aidlc_artifact="Intent + Units",
        aidlc_purpose="Outcome-focused breakdown",
        key_differences=[
            "Intent captures 'why'",
            "Units have acceptance criteria",
            "AI-validated decomposition",
        ],
    ),
    ArtifactMapping(
        agile_artifact="User Stories",
        agile_purpose="Feature description from user perspective",
        aidlc_artifact="Unit Specification",
        aidlc_purpose="Buildable chunk with criteria",
        key_differences=[
            "More structured format",
            "AI-parseable",
            "Clear acceptance tests",
        ],
    ),
    ArtifactMapping(
        agile_artifact="Sprint Backlog",
        agile_purpose="Stories committed for sprint",
        aidlc_artifact="Bolt Queue",
        aidlc_purpose="Next bolts to execute",
        key_differences=[
            "Smaller increments",
            "Hours not days",
            "Dynamic reordering",
        ],
    ),
    ArtifactMapping(
        agile_artifact="Definition of Done",
        agile_purpose="Criteria for story completion",
        aidlc_artifact="Gate Criteria + Evidence",
        aidlc_purpose="Provable completion requirements",
        key_differences=[
            "Evidence required",
            "AI-verifiable",
            "Per-unit gates",
        ],
    ),
    ArtifactMapping(
        agile_artifact="Burndown Chart",
        agile_purpose="Track sprint progress",
        aidlc_artifact="Unit/Bolt Progress",
        aidlc_purpose="Real-time completion status",
        key_differences=[
            "Faster updates",
            "Evidence-based progress",
            "AI-tracked metrics",
        ],
    ),
]


@dataclass
class TransitionPhase:
    """A phase in the transition journey."""
    id: str
    name: str
    duration: str
    focus: str
    activities: list[str]
    success_criteria: list[str]
    risks: list[str]


TRANSITION_PHASES = [
    TransitionPhase(
        id="awareness",
        name="Awareness & Education",
        duration="1-2 weeks",
        focus="Build understanding of AI-DLC",
        activities=[
            "Leadership briefing",
            "Team training sessions",
            "Pilot team selection",
            "Tool procurement",
        ],
        success_criteria=[
            "All team members understand AI-DLC basics",
            "Pilot team identified and committed",
            "AI tools available",
        ],
        risks=[
            "Resistance to change",
            "Misunderstanding AI capabilities",
        ],
    ),
    TransitionPhase(
        id="pilot",
        name="Pilot Project",
        duration="2-4 weeks",
        focus="Test AI-DLC on real work",
        activities=[
            "Select low-risk pilot project",
            "Run first Mob Elaboration",
            "Execute bolts with coaching",
            "Gather feedback",
        ],
        success_criteria=[
            "One Intent → Production cycle completed",
            "Team confidence increased",
            "Lessons documented",
        ],
        risks=[
            "Pilot scope too large",
            "Insufficient AI tool familiarity",
        ],
    ),
    TransitionPhase(
        id="expand",
        name="Team Expansion",
        duration="4-8 weeks",
        focus="Roll out to more teams",
        activities=[
            "Train additional teams",
            "Define guardrails and templates",
            "Establish community of practice",
            "Refine tooling",
        ],
        success_criteria=[
            "3+ teams using AI-DLC",
            "Guardrails documented",
            "Metrics showing improvement",
        ],
        risks=[
            "Inconsistent adoption",
            "Tool scaling issues",
        ],
    ),
    TransitionPhase(
        id="optimize",
        name="Optimization",
        duration="Ongoing",
        focus="Continuous improvement",
        activities=[
            "Cross-team learning",
            "Guardrail evolution",
            "Process refinement",
            "Advanced AI patterns",
        ],
        success_criteria=[
            "Consistent delivery improvements",
            "Self-sustaining practice",
            "Innovation in AI use",
        ],
        risks=[
            "Complacency",
            "AI tool changes",
        ],
    ),
]


@dataclass
class ReadinessItem:
    """An item in the transition readiness checklist."""
    category: str
    item: str
    description: str
    importance: str  # critical, high, medium


READINESS_CHECKLIST = [
    # Leadership
    ReadinessItem("Leadership", "Executive Sponsor", "Leader who champions the transition", "critical"),
    ReadinessItem("Leadership", "Budget Allocated", "Funding for tools and training", "critical"),
    ReadinessItem("Leadership", "Success Metrics Defined", "How will we measure success?", "high"),
    
    # Team
    ReadinessItem("Team", "Pilot Team Identified", "Team eager to try AI-DLC", "critical"),
    ReadinessItem("Team", "AI Facilitator Appointed", "Person to lead Mob sessions", "critical"),
    ReadinessItem("Team", "Training Plan", "How will team learn AI-DLC?", "high"),
    
    # Tooling
    ReadinessItem("Tooling", "AI Coding Assistant", "Tool for code generation (e.g., Amazon Q, GitHub Copilot)", "critical"),
    ReadinessItem("Tooling", "IDE Integration", "AI assistant integrated with dev environment", "high"),
    ReadinessItem("Tooling", "Guardrail Rules", "Initial .ai-rules or similar", "medium"),
    
    # Process
    ReadinessItem("Process", "Pilot Project Selected", "Low-risk, bounded project for pilot", "critical"),
    ReadinessItem("Process", "Gate Criteria Defined", "What evidence needed at gates?", "high"),
    ReadinessItem("Process", "Mob Session Schedule", "When will Mob Elaboration/Construction happen?", "medium"),
    
    # Culture
    ReadinessItem("Culture", "Growth Mindset", "Team open to new ways of working", "high"),
    ReadinessItem("Culture", "Psychological Safety", "Safe to experiment and fail", "high"),
    ReadinessItem("Culture", "Documentation Culture", "Willingness to document evidence", "medium"),
]


def get_role_mappings() -> list[RoleMapping]:
    """Get all role mappings."""
    return ROLE_MAPPINGS.copy()


def get_process_mappings() -> list[ProcessMapping]:
    """Get all process mappings."""
    return PROCESS_MAPPINGS.copy()


def get_artifact_mappings() -> list[ArtifactMapping]:
    """Get all artifact mappings."""
    return ARTIFACT_MAPPINGS.copy()


def get_transition_phases() -> list[TransitionPhase]:
    """Get all transition phases."""
    return TRANSITION_PHASES.copy()


def get_readiness_checklist() -> list[ReadinessItem]:
    """Get the readiness checklist."""
    return READINESS_CHECKLIST.copy()
