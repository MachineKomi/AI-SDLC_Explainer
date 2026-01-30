# Feature Plan: Animated Methodology Comparison

**Feature ID:** FEATURE-01  
**Priority:** High (Core Feature)  
**Estimated Effort:** 3-4 days  
**Created:** 2026-01-28

---

## Vision

Create an engaging, animated visualization that compares software development methodologies (Waterfall, Agile/Scrum, AI-DLC) to help learners understand the paradigm shift AI-DLC represents. This should be the "hero feature" that immediately communicates value on the home screen.

---

## User Stories

### US-MC-01: Home Screen Animation
**As a** first-time visitor  
**I want to** see an animated comparison of methodologies on the home screen  
**So that** I immediately understand what makes AI-DLC different

**Acceptance Criteria:**
- [ ] Animation plays automatically on home screen
- [ ] Shows 3 methodologies side-by-side
- [ ] Visualizes key metrics (time, handoffs, delivery)
- [ ] Can be paused/resumed
- [ ] Clicking opens full comparison screen

### US-MC-02: Full Comparison Screen
**As a** learner exploring AI-DLC  
**I want to** see detailed methodology comparisons with interactive controls  
**So that** I can understand the specific differences

**Acceptance Criteria:**
- [ ] Timeline view showing all phases
- [ ] Metrics comparison panel
- [ ] Speed controls (1x, 2x, 5x)
- [ ] Step-by-step mode
- [ ] Tooltips explaining each phase

### US-MC-03: Project Scenario Simulation
**As a** team lead evaluating AI-DLC  
**I want to** input a project scenario and see projected timelines  
**So that** I can estimate the impact of adopting AI-DLC

**Acceptance Criteria:**
- [ ] Input form for project parameters (team size, complexity)
- [ ] Calculated timelines for each methodology
- [ ] Cost comparison estimates
- [ ] Risk factor adjustments

### US-MC-04: Export Comparison Report
**As a** change manager  
**I want to** export the comparison as a document  
**So that** I can share with stakeholders

**Acceptance Criteria:**
- [ ] Export to markdown format
- [ ] Include all metrics and visualizations (ASCII)
- [ ] Professional formatting
- [ ] Customizable with project name

---

## Technical Design

### Data Models

```python
# content/methodology_comparison.py

from dataclasses import dataclass, field
from typing import Literal

MethodologyType = Literal["waterfall", "agile", "ai-dlc"]

@dataclass
class Phase:
    """A phase within a methodology."""
    id: str
    name: str
    description: str
    duration_days: int
    wait_before_days: int = 0
    handoff_to: str | None = None
    deliverables: list[str] = field(default_factory=list)
    roles_involved: list[str] = field(default_factory=list)
    
@dataclass
class Methodology:
    """A software development methodology."""
    id: MethodologyType
    name: str
    description: str
    icon: str
    phases: list[Phase]
    characteristics: list[str]
    pros: list[str]
    cons: list[str]
    best_for: list[str]
    
    @property
    def total_duration(self) -> int:
        """Calculate total duration including wait times."""
        return sum(p.duration_days + p.wait_before_days for p in self.phases)
    
    @property
    def total_wait_time(self) -> int:
        """Calculate total wait/handoff time."""
        return sum(p.wait_before_days for p in self.phases)
    
    @property
    def delivery_frequency(self) -> str:
        """Human-readable delivery frequency."""
        if self.id == "waterfall":
            return "Once at end"
        elif self.id == "agile":
            return "Every 2-4 weeks"
        else:
            return "Continuous (daily)"

@dataclass
class ProjectScenario:
    """A project scenario for comparison."""
    name: str
    team_size: int
    complexity: Literal["low", "medium", "high"]
    has_existing_code: bool
    regulatory_requirements: bool
    
@dataclass
class ComparisonResult:
    """Results of comparing methodologies for a scenario."""
    scenario: ProjectScenario
    methodologies: dict[MethodologyType, dict]  # metrics per methodology
```

### Methodology Data (Content)

```python
WATERFALL = Methodology(
    id="waterfall",
    name="Waterfall",
    description="Sequential phases, each completing before the next begins",
    icon="💧",
    phases=[
        Phase(
            id="requirements",
            name="Requirements",
            description="Gather and document all requirements upfront",
            duration_days=30,
            wait_before_days=0,
            handoff_to="design",
            deliverables=["Requirements Document", "Sign-off"],
            roles_involved=["Business Analyst", "Product Manager", "Stakeholders"]
        ),
        Phase(
            id="design",
            name="Design",
            description="Create detailed system design",
            duration_days=30,
            wait_before_days=10,  # Wait for sign-off
            handoff_to="implementation",
            deliverables=["Design Document", "Architecture Diagrams"],
            roles_involved=["Architect", "Lead Developer"]
        ),
        Phase(
            id="implementation",
            name="Implementation",
            description="Build the complete system",
            duration_days=90,
            wait_before_days=5,
            handoff_to="testing",
            deliverables=["Code", "Unit Tests"],
            roles_involved=["Development Team"]
        ),
        Phase(
            id="testing",
            name="Testing",
            description="System and integration testing",
            duration_days=30,
            wait_before_days=0,
            handoff_to="deployment",
            deliverables=["Test Reports", "Bug Fixes"],
            roles_involved=["QA Team"]
        ),
        Phase(
            id="deployment",
            name="Deployment",
            description="Release to production",
            duration_days=15,
            wait_before_days=5,
            handoff_to=None,
            deliverables=["Production System", "Documentation"],
            roles_involved=["DevOps", "Support"]
        ),
    ],
    characteristics=[
        "Linear, sequential flow",
        "Each phase completes before next starts",
        "Heavy documentation",
        "Change is expensive",
        "Single delivery at end"
    ],
    pros=["Clear milestones", "Comprehensive documentation", "Predictable for well-understood projects"],
    cons=["Late feedback", "Expensive changes", "Long time to value", "Risk concentrated at end"],
    best_for=["Fixed requirements", "Regulatory projects", "Hardware integration"]
)

AGILE = Methodology(
    id="agile",
    name="Agile/Scrum",
    description="Iterative sprints with continuous feedback",
    icon="🔄",
    phases=[
        Phase(
            id="sprint1",
            name="Sprint 1",
            description="MVP features",
            duration_days=14,
            wait_before_days=0,
            handoff_to="sprint2",
            deliverables=["Working increment", "Sprint Review"],
            roles_involved=["Product Owner", "Scrum Master", "Dev Team"]
        ),
        # ... more sprints
    ],
    characteristics=[
        "2-4 week iterations",
        "Continuous feedback",
        "Working software each sprint",
        "Team self-organization",
        "Embrace change"
    ],
    pros=["Early feedback", "Adaptable to change", "Regular delivery", "Team empowerment"],
    cons=["Scope creep risk", "Requires customer involvement", "Can lack long-term vision"],
    best_for=["Evolving requirements", "Customer-facing products", "Innovation projects"]
)

AIDLC = Methodology(
    id="ai-dlc",
    name="AI-DLC",
    description="AI-accelerated development with human gates",
    icon="🤖",
    phases=[
        Phase(
            id="inception",
            name="Inception",
            description="Mob Elaboration - AI decomposes intent into units",
            duration_days=1,
            wait_before_days=0,
            handoff_to="construction",
            deliverables=["Intent", "Units", "Requirements"],
            roles_involved=["Intent Owner", "AI", "SMEs"]
        ),
        Phase(
            id="unit1",
            name="Unit 1 Construction",
            description="AI builds, humans validate with proof",
            duration_days=2,
            wait_before_days=0,
            handoff_to="unit2",
            deliverables=["Tested Code", "Validation Report"],
            roles_involved=["AI", "Human Validators"]
        ),
        # ... more units
    ],
    characteristics=[
        "AI proposes, humans approve",
        "Continuous delivery (days not weeks)",
        "Proof over prose",
        "Gates enforce quality",
        "10x velocity potential"
    ],
    pros=["Dramatic speed increase", "Built-in quality gates", "Human oversight", "Audit trail"],
    cons=["Requires AI tooling", "New skills needed", "Change management effort"],
    best_for=["Greenfield projects", "Teams with AI tools", "Fast-moving domains"]
)
```

### Widget: MethodologyTimeline

```python
# widgets/methodology_timeline.py

from textual.widget import Widget
from textual.reactive import reactive
from rich.text import Text

class MethodologyTimeline(Widget):
    """Animated timeline comparing methodologies."""
    
    DEFAULT_CSS = """
    MethodologyTimeline {
        height: auto;
        border: round $primary;
        padding: 1;
    }
    """
    
    # Animation state
    current_day = reactive(0)
    playing = reactive(True)
    speed = reactive(1)
    
    def __init__(self, methodologies: list[Methodology]) -> None:
        super().__init__()
        self.methodologies = methodologies
        self.max_days = max(m.total_duration for m in methodologies)
        
    def render(self) -> Text:
        """Render the timeline visualization."""
        lines = []
        
        for m in self.methodologies:
            # Header
            lines.append(f"{m.icon} {m.name} ({m.total_duration} days)")
            
            # Timeline bar
            bar = self._render_timeline_bar(m)
            lines.append(bar)
            lines.append("")
        
        # Legend
        lines.append("▓ = Working  ░ = Waiting  █ = Complete")
        
        return Text("\n".join(lines))
    
    def _render_timeline_bar(self, methodology: Methodology) -> str:
        """Render a single methodology's timeline."""
        width = 60
        scale = width / self.max_days
        
        bar = []
        day = 0
        
        for phase in methodology.phases:
            # Wait time
            if phase.wait_before_days > 0:
                wait_chars = int(phase.wait_before_days * scale)
                if day < self.current_day:
                    bar.append("░" * wait_chars)
                else:
                    bar.append(" " * wait_chars)
                day += phase.wait_before_days
            
            # Phase duration
            phase_chars = int(phase.duration_days * scale)
            if day + phase.duration_days <= self.current_day:
                bar.append("█" * phase_chars)  # Complete
            elif day < self.current_day:
                progress = min(phase_chars, int((self.current_day - day) * scale))
                bar.append("▓" * progress + "░" * (phase_chars - progress))
            else:
                bar.append("░" * phase_chars)
            day += phase.duration_days
        
        return "[" + "".join(bar) + "]"
    
    def on_mount(self) -> None:
        """Start animation timer."""
        self.set_interval(0.1 / self.speed, self._tick)
    
    def _tick(self) -> None:
        """Advance animation by one frame."""
        if self.playing and self.current_day < self.max_days:
            self.current_day += 1
        elif self.current_day >= self.max_days:
            self.current_day = 0  # Loop
```

### Screen: MethodologyComparisonScreen

```python
# screens/methodology_comparison.py

class MethodologyComparisonScreen(ExplorerScreen):
    """Full methodology comparison screen."""
    
    BINDINGS = [
        Binding("space", "toggle_play", "Play/Pause"),
        Binding("r", "reset", "Reset"),
        Binding("1", "speed_1x", "1x Speed"),
        Binding("2", "speed_2x", "2x Speed"),
        Binding("5", "speed_5x", "5x Speed"),
        Binding("s", "step", "Step"),
    ]
    
    def compose_content(self) -> ComposeResult:
        yield Static("╭─ Methodology Comparison ─╮", id="title")
        
        # Timeline visualization
        yield MethodologyTimeline([WATERFALL, AGILE, AIDLC])
        
        # Metrics panel
        with Horizontal(id="metrics-panel"):
            yield MetricsCard("waterfall", WATERFALL)
            yield MetricsCard("agile", AGILE)
            yield MetricsCard("ai-dlc", AIDLC)
        
        # Controls
        with Horizontal(id="controls"):
            yield Button("⏸ Pause", id="play-btn")
            yield Button("⏮ Reset", id="reset-btn")
            yield Select([("1x", 1), ("2x", 2), ("5x", 5)], id="speed-select")
            yield Button("⏭ Step", id="step-btn")
```

---

## ASCII Art Visualization Mockups

### Home Screen Mini-Animation
```
╭───────────────────────────────────────────────────────────────╮
│                    HOW AI-DLC COMPARES                        │
├───────────────────────────────────────────────────────────────┤
│                                                               │
│  💧 Waterfall   [██████████████████░░░░░░░░]  180 days       │
│                 │ wait │  wait  │ wait │                     │
│                                                               │
│  🔄 Agile       [████▓▓▓▓░░░░░░░░░░░░░░░░░]   90 days       │
│                 ↺ continuous feedback                        │
│                                                               │
│  🤖 AI-DLC     [████████████░░░░░░░░░░░░░░]   28 days       │
│                 ↺ AI-accelerated + gates                     │
│                                                               │
│              [Click to explore full comparison]              │
╰───────────────────────────────────────────────────────────────╯
```

### Full Comparison Screen
```
╭──────────────────────────────────────────────────────────────────────────╮
│                      METHODOLOGY COMPARISON                               │
│                   ⏸ Playing   Speed: 2x   Day: 47/180                   │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  💧 WATERFALL (180 days)                                                │
│  ┌─────────────────────────────────────────────────────────────────┐    │
│  │[Req: 30d]░░[Design: 30d]░░[Build: 90d]░░░░░░░░[Test: 30d][Deploy]│   │
│  │ ██████████░░████████████                                        │    │
│  └─────────────────────────────────────────────────────────────────┘    │
│  Status: In Design phase │ Delivered: 0% │ Wait time: 15 days           │
│                                                                          │
│  🔄 AGILE (90 days to MVP)                                              │
│  ┌─────────────────────────────────────────────────────────────────┐    │
│  │[S1][S2][S3][S4][S5][S6]...                                      │    │
│  │ ███████████████████████▓▓▓▓▓░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │    │
│  └─────────────────────────────────────────────────────────────────┘    │
│  Status: Sprint 4 │ Delivered: 60% (3 increments) │ Wait time: 0 days   │
│                                                                          │
│  🤖 AI-DLC (28 days to MVP)                                             │
│  ┌─────────────────────────────────────────────────────────────────┐    │
│  │[Mob Elab][U1][U2][U3][U4][U5][Ops]                              │    │
│  │ ███████████████████████████████████████████████████████████████ │    │
│  └─────────────────────────────────────────────────────────────────┘    │
│  Status: COMPLETE │ Delivered: 100% │ Gates passed: 7/7                  │
│                                                                          │
├──────────────────────────────────────────────────────────────────────────┤
│  METRICS COMPARISON                                                      │
│  ┌──────────────────┬──────────────────┬──────────────────┐             │
│  │    WATERFALL     │      AGILE       │     AI-DLC       │             │
│  ├──────────────────┼──────────────────┼──────────────────┤             │
│  │ Time: 180 days   │ Time: 90 days    │ Time: 28 days    │             │
│  │ Wait: 20 days    │ Wait: 0 days     │ Wait: 0 days     │             │
│  │ Handoffs: 5      │ Handoffs: 12     │ Handoffs: 0      │             │
│  │ First value: 180d│ First value: 14d │ First value: 4d  │             │
│  │ Cost: $$$$$      │ Cost: $$$$       │ Cost: $$         │             │
│  └──────────────────┴──────────────────┴──────────────────┘             │
│                                                                          │
│  [⏸ Pause] [⏮ Reset] [Speed: 1x 2x 5x] [⏭ Step] [📊 Export]           │
╰──────────────────────────────────────────────────────────────────────────╯
```

---

## Implementation Checklist

### Phase 1: Data Layer
- [ ] Create `content/methodology_comparison.py`
- [ ] Define `Phase`, `Methodology`, `ProjectScenario` dataclasses
- [ ] Populate data for Waterfall, Agile, AI-DLC
- [ ] Add unit tests for data models

### Phase 2: Timeline Widget
- [ ] Create `widgets/methodology_timeline.py`
- [ ] Implement basic rendering
- [ ] Add animation timer
- [ ] Add speed controls
- [ ] Add step mode

### Phase 3: Home Screen Integration
- [ ] Create mini-animation widget
- [ ] Add to HomeScreen layout
- [ ] Add click handler to open full screen
- [ ] Ensure animation doesn't block navigation

### Phase 4: Full Comparison Screen
- [ ] Create `screens/methodology_comparison.py`
- [ ] Implement timeline view with controls
- [ ] Add metrics panel
- [ ] Add phase detail tooltips
- [ ] Add keyboard bindings

### Phase 5: Project Scenario Calculator
- [ ] Add input form for project parameters
- [ ] Implement calculation logic
- [ ] Display comparison results
- [ ] Add export functionality

### Phase 6: Polish & Testing
- [ ] Visual refinement
- [ ] Performance optimization
- [ ] Accessibility review
- [ ] Documentation

---

## Success Metrics

1. **Engagement:** Users click from home animation to full screen (>50%)
2. **Understanding:** Users can explain AI-DLC speed advantage after viewing
3. **Shareability:** Export feature used in demos
4. **Performance:** Animation runs smoothly at 60fps equivalent

---

**Document Status:** COMPLETE  
**Ready for Implementation:** Yes
