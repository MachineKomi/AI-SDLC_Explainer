"""Methodology comparison data for Waterfall, Agile, and AI-DLC."""

from dataclasses import dataclass, field


@dataclass
class Phase:
    """A phase in a methodology."""
    id: str
    name: str
    duration_units: int  # Relative duration units for visualization
    description: str
    handoffs: int  # Number of handoffs to next phase
    wait_time: int  # Relative wait time before next phase starts


@dataclass 
class Methodology:
    """A software development methodology."""
    id: str
    name: str
    description: str
    phases: list[Phase]
    cycle_time_factor: float  # Relative to baseline (Waterfall = 1.0)
    cost_factor: float  # Relative to baseline
    feedback_loop_time: str  # Time to get feedback
    key_characteristics: list[str]
    strengths: list[str]
    weaknesses: list[str]


# === METHODOLOGY DEFINITIONS ===

WATERFALL = Methodology(
    id="waterfall",
    name="Waterfall",
    description="Sequential, document-driven approach where each phase must complete before the next begins.",
    phases=[
        Phase("req", "Requirements", 4, "Gather and document all requirements upfront", 2, 1),
        Phase("design", "Design", 3, "Create comprehensive system design", 2, 1),
        Phase("impl", "Implementation", 6, "Code the entire system", 1, 0),
        Phase("test", "Testing", 4, "Test the complete system", 2, 1),
        Phase("deploy", "Deployment", 2, "Deploy to production", 1, 0),
        Phase("maint", "Maintenance", 0, "Ongoing maintenance", 0, 0),
    ],
    cycle_time_factor=1.0,
    cost_factor=1.0,
    feedback_loop_time="Months (end of project)",
    key_characteristics=[
        "Sequential phases",
        "Heavy documentation",
        "Big bang delivery",
        "Change is expensive",
    ],
    strengths=[
        "Clear milestones",
        "Comprehensive documentation",
        "Predictable for well-known domains",
    ],
    weaknesses=[
        "Late feedback",
        "Rigid to change",
        "High risk of building wrong thing",
        "Long time to value",
    ],
)

AGILE = Methodology(
    id="agile",
    name="Agile/Scrum",
    description="Iterative approach with short sprints and continuous feedback.",
    phases=[
        Phase("plan", "Sprint Planning", 1, "Plan sprint backlog", 1, 0),
        Phase("dev", "Development", 3, "Develop features", 1, 0),
        Phase("review", "Review", 1, "Demo and get feedback", 1, 0),
        Phase("retro", "Retrospective", 1, "Reflect and improve", 1, 0),
    ],
    cycle_time_factor=0.5,
    cost_factor=0.8,
    feedback_loop_time="2-4 weeks (per sprint)",
    key_characteristics=[
        "Iterative sprints",
        "Customer collaboration",
        "Working software over docs",
        "Embrace change",
    ],
    strengths=[
        "Regular feedback",
        "Adaptable to change",
        "Faster time to value",
        "Team empowerment",
    ],
    weaknesses=[
        "Can lack documentation",
        "Scope creep risk",
        "Requires engaged stakeholders",
        "Scaling challenges",
    ],
)

AIDLC = Methodology(
    id="aidlc",
    name="AI-DLC",
    description="AI-augmented development with human oversight at critical gates.",
    phases=[
        Phase("inception", "Inception", 1, "Intent → Units via Mob Elaboration", 0, 0),
        Phase("construct", "Construction", 2, "Bolts with AI + Human Validation", 0, 0),
        Phase("ops", "Operations", 1, "Deploy with evidence", 0, 0),
    ],
    cycle_time_factor=0.15,
    cost_factor=0.3,
    feedback_loop_time="Hours (per bolt)",
    key_characteristics=[
        "AI generates, humans validate",
        "Proof over prose",
        "Adaptive depth",
        "Evidence at gates",
    ],
    strengths=[
        "Dramatically faster delivery",
        "Lower cost",
        "Built-in quality gates",
        "Continuous validation",
        "Scalable with AI",
    ],
    weaknesses=[
        "Requires AI tooling",
        "Learning curve for teams",
        "New collaboration patterns",
    ],
)

METHODOLOGIES = [WATERFALL, AGILE, AIDLC]


def get_methodology(method_id: str) -> Methodology | None:
    """Get a methodology by ID."""
    for m in METHODOLOGIES:
        if m.id == method_id:
            return m
    return None


def get_all_methodologies() -> list[Methodology]:
    """Get all methodologies."""
    return METHODOLOGIES.copy()


# === COMPARISON METRICS ===

@dataclass
class ComparisonMetric:
    """A metric comparing methodologies."""
    name: str
    description: str
    waterfall: str
    agile: str
    aidlc: str
    winner: str  # methodology id


COMPARISON_METRICS = [
    ComparisonMetric(
        "Time to First Delivery",
        "How long until first working software is delivered",
        "6-12 months",
        "2-4 weeks",
        "Hours to days",
        "aidlc"
    ),
    ComparisonMetric(
        "Feedback Loop",
        "Time between building and validating",
        "End of project",
        "End of sprint",
        "Per bolt (hours)",
        "aidlc"
    ),
    ComparisonMetric(
        "Cost of Change",
        "Expense of changing requirements mid-project",
        "Very High",
        "Medium",
        "Low",
        "aidlc"
    ),
    ComparisonMetric(
        "Documentation",
        "Quality and completeness of documentation",
        "Comprehensive",
        "Minimal",
        "Auto-generated + Contextual",
        "aidlc"
    ),
    ComparisonMetric(
        "Quality Assurance",
        "How quality is ensured",
        "Test phase at end",
        "Testing in sprint",
        "Proof at every gate",
        "aidlc"
    ),
    ComparisonMetric(
        "Team Scaling",
        "Ability to scale team size",
        "Linear (more people = more cost)",
        "Sub-linear (communication overhead)",
        "AI scales, humans validate",
        "aidlc"
    ),
    ComparisonMetric(
        "Risk Management",
        "How risk is identified and managed",
        "Late discovery",
        "Sprint-level visibility",
        "Continuous with gates",
        "aidlc"
    ),
    ComparisonMetric(
        "Best For",
        "Ideal use cases",
        "Fixed requirements, regulated",
        "Evolving products, startups",
        "Any, especially AI-assisted",
        "aidlc"
    ),
]


def get_comparison_metrics() -> list[ComparisonMetric]:
    """Get all comparison metrics."""
    return COMPARISON_METRICS.copy()


# === PROJECT SCENARIO SIMULATION ===

@dataclass
class SimulationResult:
    """Result of simulating a project with a methodology."""
    methodology_id: str
    total_weeks: int
    total_cost_units: int
    feedback_points: int  # Number of times feedback was received
    handoffs: int
    risk_events: list[str]


@dataclass
class ProjectScenario:
    """A project scenario for simulation."""
    id: str
    name: str
    description: str
    complexity: str  # low, medium, high
    requirements_stability: str  # stable, evolving, volatile
    team_size: int
    baseline_weeks: int  # Waterfall baseline


PROJECT_SCENARIOS = [
    ProjectScenario(
        "banking-app",
        "Banking Mobile App",
        "New mobile banking app with authentication, payments, and account management.",
        "high",
        "stable",
        8,
        24
    ),
    ProjectScenario(
        "startup-mvp",
        "Startup MVP",
        "Minimum viable product for a new SaaS startup with unclear requirements.",
        "medium",
        "volatile",
        4,
        16
    ),
    ProjectScenario(
        "api-integration",
        "API Integration",
        "Integrate with three third-party APIs for an existing platform.",
        "low",
        "stable",
        3,
        8
    ),
    ProjectScenario(
        "legacy-rewrite",
        "Legacy System Rewrite",
        "Rewrite a 10-year-old monolith to microservices.",
        "high",
        "evolving",
        12,
        52
    ),
]


def simulate_project(scenario: ProjectScenario, methodology: Methodology) -> SimulationResult:
    """Simulate a project scenario with a given methodology."""
    base_weeks = scenario.baseline_weeks
    
    # Calculate time
    time_factor = methodology.cycle_time_factor
    if scenario.requirements_stability == "volatile":
        # Waterfall suffers more from volatility
        if methodology.id == "waterfall":
            time_factor *= 1.5
        elif methodology.id == "aidlc":
            time_factor *= 0.9  # AI-DLC handles change better
    
    total_weeks = int(base_weeks * time_factor)
    
    # Calculate cost
    cost_factor = methodology.cost_factor
    if scenario.complexity == "high":
        cost_factor *= 1.2
    total_cost = int(base_weeks * 10 * cost_factor)  # 10 units per week baseline
    
    # Calculate feedback points
    if methodology.id == "waterfall":
        feedback_points = 2  # Requirements review + final delivery
    elif methodology.id == "agile":
        feedback_points = max(1, total_weeks // 2)  # Every 2 weeks
    else:  # aidlc
        feedback_points = max(1, total_weeks * 5)  # Multiple per week
    
    # Calculate handoffs
    handoffs = sum(p.handoffs for p in methodology.phases)
    if methodology.id == "agile":
        handoffs *= max(1, total_weeks // 2)  # Per sprint
    
    # Risk events
    risk_events = []
    if methodology.id == "waterfall":
        if scenario.requirements_stability != "stable":
            risk_events.append("Requirements changed during implementation")
        if scenario.complexity == "high":
            risk_events.append("Integration issues discovered late")
    elif methodology.id == "agile":
        if scenario.requirements_stability == "volatile":
            risk_events.append("Scope creep across sprints")
    # AI-DLC has fewer risk events due to continuous validation
    
    return SimulationResult(
        methodology_id=methodology.id,
        total_weeks=total_weeks,
        total_cost_units=total_cost,
        feedback_points=feedback_points,
        handoffs=handoffs,
        risk_events=risk_events
    )


def get_project_scenarios() -> list[ProjectScenario]:
    """Get all project scenarios."""
    return PROJECT_SCENARIOS.copy()
