"""Artifact Explorer screen for browsing aidlc-docs/ structure."""

from dataclasses import dataclass
from pathlib import Path
from textual.app import ComposeResult
from textual.containers import Horizontal, Vertical, VerticalScroll
from textual.widgets import Tree, Static, Button, TabbedContent, TabPane
from textual.widgets.tree import TreeNode
from textual.binding import Binding

from aidlc_explainer.screens.base import ExplorerScreen


@dataclass
class ArtifactDefinition:
    """Definition of an AI-DLC artifact."""
    path: str
    name: str
    phase: str
    stage: str
    mandatory: bool
    purpose: str
    template: str
    source: str


# Artifact definitions based on AWS AI-DLC methodology
ARTIFACTS = [
    # Root artifacts
    ArtifactDefinition(
        path="aidlc-docs/aidlc-state.md",
        name="State Tracker",
        phase="all",
        stage="all",
        mandatory=True,
        purpose="Tracks current phase, stage, and completion status. Updated after every significant action.",
        template="""# AI-DLC State

## Current Status
| Field | Value |
|-------|-------|
| Phase | Inception |
| Stage | Requirements Analysis |
| Status | IN PROGRESS |
| Last Updated | YYYY-MM-DD |

## What Changed
- [Description of recent changes]

## What's Next
1. [Next steps]
""",
        source="AI-SDLC_best-practice_method_principles.md#L156",
    ),
    ArtifactDefinition(
        path="aidlc-docs/execution-plan.md",
        name="Execution Plan",
        phase="inception",
        stage="workflow-planning",
        mandatory=True,
        purpose="Documents the planned stages, their sequence, and rationale for inclusion or exclusion.",
        template="""# Execution Plan

## Overview
- **Request Type:** Greenfield/Brownfield/Frontend/Bugfix
- **Risk Level:** Low/Medium/High
- **Estimated Stages:** X

## Stage Checklist

### Inception
- [ ] Workspace Detection
- [ ] Requirements Analysis
- [ ] Workflow Planning

### Construction
- [ ] Functional Design
- [ ] Code Generation
- [ ] Build and Test

## Rationale
[Why these stages were selected]
""",
        source="AI-SDLC_best-practice_method_principles.md#L96-97",
    ),
    ArtifactDefinition(
        path="aidlc-docs/audit.md",
        name="Audit Log",
        phase="all",
        stage="all",
        mandatory=True,
        purpose="Append-only log of timestamped decisions, approvals, and evidence. Never edited, only appended.",
        template="""# Audit Log

Append-only record of decisions, approvals, and evidence.

---

## YYYY-MM-DD | [Action Title]

**Action:** [What was done]
**Decision:** [What was decided]
**Evidence:** [Proof/references]
**Status:** [APPROVED/PENDING/REJECTED]

---
""",
        source="AI-SDLC_best-practice_method_principles.md#L157",
    ),
    
    # Inception artifacts
    ArtifactDefinition(
        path="aidlc-docs/inception/intent.md",
        name="Intent Document",
        phase="inception",
        stage="requirements-analysis",
        mandatory=True,
        purpose="Captures the high-level goal in one paragraph plus success metrics and explicit non-goals.",
        template="""# Intent

[One paragraph describing the business goal, feature, or technical outcome]

## Success Metrics
| Metric | Target | Measurement |
|--------|--------|-------------|
| [Metric 1] | [Target] | [How measured] |

## Non-Goals
- [Explicit exclusions]
""",
        source="aidlc-method-definition.md#L68-69",
    ),
    ArtifactDefinition(
        path="aidlc-docs/inception/requirements.md",
        name="Requirements Document",
        phase="inception",
        stage="requirements-analysis",
        mandatory=True,
        purpose="Documents functional requirements including user stories, acceptance criteria, and constraints.",
        template="""# Requirements

## User Stories

### US-01: [Story Title]
**As a** [role]
**I want to** [action]
**So that** [benefit]

**Acceptance Criteria:**
- [ ] [Criterion 1]
- [ ] [Criterion 2]

## Constraints
- [Constraint 1]
- [Constraint 2]
""",
        source="AI-SDLC_best-practice_method_principles.md#L93-94",
    ),
    ArtifactDefinition(
        path="aidlc-docs/inception/nfr.md",
        name="NFR Document",
        phase="inception",
        stage="requirements-analysis",
        mandatory=True,
        purpose="Documents non-functional requirements: availability, latency, security, compliance, scalability.",
        template="""# Non-Functional Requirements

## Availability
- Target: 99.9% uptime
- RTO: [Recovery Time Objective]
- RPO: [Recovery Point Objective]

## Performance
- Latency p99: < 200ms
- Throughput: X req/sec

## Security
- Authentication: [Method]
- Authorization: [Method]
- Encryption: [Requirements]

## Compliance
- [Applicable standards: GDPR, SOC2, HIPAA, etc.]
""",
        source="AI-SDLC_best-practice_method_principles.md#L95-96",
    ),
    ArtifactDefinition(
        path="aidlc-docs/inception/user-stories.md",
        name="User Stories",
        phase="inception",
        stage="user-stories",
        mandatory=False,
        purpose="Detailed user stories with personas, acceptance criteria, and validation approach.",
        template="""# User Stories

## Personas
- **[Persona Name]:** [Description]

## Stories

### US-01: [Title]
**Persona:** [Name]
**Story:** As a [role], I want to [action] so that [benefit]
**Acceptance Criteria:**
1. [Criterion]
**Validation:** [How to test]
""",
        source="aidlc-workflows/inception/user-stories.md",
    ),
    ArtifactDefinition(
        path="aidlc-docs/inception/application-design.md",
        name="Application Design",
        phase="inception",
        stage="application-design",
        mandatory=False,
        purpose="High-level component identification and service layer design (optional for simple projects).",
        template="""# Application Design

## Components
- **[Component 1]:** [Responsibility]
- **[Component 2]:** [Responsibility]

## Component Diagram
```
[ASCII or description of component relationships]
```

## Service Boundaries
[How components interact]
""",
        source="aidlc-workflows/inception/application-design.md",
    ),
    ArtifactDefinition(
        path="aidlc-docs/inception/units/unit-01.md",
        name="Unit Definition",
        phase="inception",
        stage="units-generation",
        mandatory=False,
        purpose="Defines a cohesive unit of work with scope, stories, acceptance criteria, and dependencies.",
        template="""# Unit 01: [Unit Name]

## Scope
[What this unit includes and excludes]

## User Stories
- US-01: [Story]
- US-02: [Story]

## Acceptance Criteria
- [ ] [Criterion 1]
- [ ] [Criterion 2]

## Dependencies
- Depends on: [Other units or external systems]
- Depended on by: [Units that need this]

## Estimated Bolts
[Number of iterations expected]
""",
        source="aidlc-method-definition.md#L71-75",
    ),
    
    # Construction artifacts
    ArtifactDefinition(
        path="aidlc-docs/construction/<unit>/design.md",
        name="Unit Design",
        phase="construction",
        stage="functional-design",
        mandatory=True,
        purpose="Domain model, API design, data model, and key tradeoffs for the unit.",
        template="""# Unit Design: [Unit Name]

## Domain Model
- **Entities:** [List]
- **Value Objects:** [List]
- **Aggregates:** [List]

## API Design
| Endpoint | Method | Description |
|----------|--------|-------------|
| /api/v1/resource | GET | [Description] |

## Data Model
[Schema or description]

## Key Tradeoffs
- [Decision]: [Rationale]
""",
        source="AI-SDLC_best-practice_method_principles.md#L116-117",
    ),
    ArtifactDefinition(
        path="aidlc-docs/construction/<unit>/tasks-plan.md",
        name="Tasks Plan",
        phase="construction",
        stage="code-generation",
        mandatory=True,
        purpose="Checkboxed task list for implementing the unit. Must be approved before execution.",
        template="""# Tasks Plan: [Unit Name]

## Phase 1: Setup
- [ ] Create project structure
- [ ] Configure dependencies

## Phase 2: Implementation
- [ ] Implement [Component 1]
- [ ] Implement [Component 2]

## Phase 3: Testing
- [ ] Write unit tests
- [ ] Write integration tests

## Phase 4: Validation
- [ ] Run full test suite
- [ ] Update validation report
""",
        source="AI-SDLC_best-practice_method_principles.md#L118",
    ),
    ArtifactDefinition(
        path="aidlc-docs/construction/<unit>/validation-report.md",
        name="Validation Report",
        phase="construction",
        stage="build-and-test",
        mandatory=True,
        purpose="Documents what tests/checks ran, results, fixes applied, and final acceptance criteria status.",
        template="""# Validation Report: [Unit Name]

## Commands Executed
```
pip install -r requirements.txt
pytest tests/ -v
ruff check src/
```

## Results
- Tests: X passed, Y failed
- Lint: X errors
- Security: X issues

## Fixes Applied
- [Fix 1]

## Acceptance Criteria Status
- [x] AC1: [Description] ✓
- [ ] AC2: [Description] ✗

## Final Status
[PASS/FAIL]
""",
        source="AI-SDLC_best-practice_method_principles.md#L119",
    ),
    
    # Operations artifacts
    ArtifactDefinition(
        path="aidlc-docs/operations/deployment-plan.md",
        name="Deployment Plan",
        phase="operations",
        stage="deployment",
        mandatory=True,
        purpose="Environment topology, infrastructure requirements, deployment sequence, and rollback procedure.",
        template="""# Deployment Plan

## Environment Topology
- Dev: [Description]
- Staging: [Description]
- Production: [Description]

## Infrastructure
- Compute: [Requirements]
- Database: [Requirements]
- Network: [Requirements]

## Deployment Sequence
1. [Step 1]
2. [Step 2]

## Rollback Procedure
1. [Step 1]
2. [Step 2]
""",
        source="AI-SDLC_best-practice_method_principles.md#L131",
    ),
    ArtifactDefinition(
        path="aidlc-docs/operations/observability.md",
        name="Observability Plan",
        phase="operations",
        stage="observability",
        mandatory=True,
        purpose="Defines SLOs, metrics list, log schema, dashboard templates, and alert definitions.",
        template="""# Observability Plan

## SLOs
| SLO | Target | Error Budget |
|-----|--------|--------------|
| Availability | 99.9% | 0.1%/month |
| Latency p99 | < 200ms | - |

## Metrics
- [Metric 1]: [Description]
- [Metric 2]: [Description]

## Log Schema
```json
{"timestamp": "", "level": "", "message": "", "correlation_id": ""}
```

## Alerts
| Alert | Condition | Severity |
|-------|-----------|----------|
| High Error Rate | > 1% for 5m | P1 |
""",
        source="operations observability best practices",
    ),
    ArtifactDefinition(
        path="aidlc-docs/operations/runbooks.md",
        name="Runbooks",
        phase="operations",
        stage="incident-response",
        mandatory=True,
        purpose="Documents incident types, triage steps, resolution procedures, and escalation paths.",
        template="""# Runbooks

## Runbook: [Incident Type]

### Trigger
[What triggers this runbook]

### Severity
[P1/P2/P3/P4]

### Symptoms
- [Symptom 1]
- [Symptom 2]

### Triage Steps
1. [Step 1]
2. [Step 2]

### Resolution Steps
1. [Step 1]
2. [Step 2]

### Rollback Steps
1. [Step 1]

### Escalation
- [Contact info]
""",
        source="operations runbook best practices",
    ),
    ArtifactDefinition(
        path="aidlc-docs/operations/cost.md",
        name="Cost Model",
        phase="operations",
        stage="cost-modeling",
        mandatory=False,
        purpose="Documents load assumptions, cost drivers, scaling strategy, and cost guardrails.",
        template="""# Cost Model

## Load Assumptions
- Baseline: X req/min
- Peak: Xx baseline
- Growth: X% month-over-month

## Cost Breakdown
| Resource | Monthly Cost |
|----------|--------------|
| Compute | $X |
| Database | $X |
| Network | $X |
| **Total** | **$X** |

## Scaling Strategy
- Scale up: [Condition]
- Scale down: [Condition]

## Guardrails
- Alert at: 120% of budget
- Hard cap: 150% of budget
""",
        source="cost modeling best practices",
    ),
]


def get_artifacts_by_phase(phase: str) -> list[ArtifactDefinition]:
    """Get artifacts filtered by phase."""
    if phase == "all":
        return ARTIFACTS
    return [a for a in ARTIFACTS if a.phase == phase or a.phase == "all"]


class ArtifactExplorerScreen(ExplorerScreen):
    """Screen for exploring AI-DLC artifact structure."""
    
    BINDINGS = [
        Binding("escape", "go_back", "Back"),
        Binding("i", "filter_inception", "Inception"),
        Binding("c", "filter_construction", "Construction"),
        Binding("o", "filter_operations", "Operations"),
        Binding("a", "filter_all", "All"),
        Binding("t", "switch_tab", "Toggle Tab"),
    ]
    
    DEFAULT_CSS = """
    ArtifactExplorerScreen {
        height: 100%;
    }
    
    ArtifactExplorerScreen TabbedContent {
        height: 1fr;
    }
    
    ArtifactExplorerScreen #explorer-container {
        layout: horizontal;
        height: 1fr;
        min-height: 20;
    }
    
    ArtifactExplorerScreen #tree-panel {
        width: 40%;
        height: 100%;
        border: round $primary;
        padding: 1;
    }
    
    ArtifactExplorerScreen #detail-panel {
        width: 60%;
        height: 100%;
        border: round $secondary;
        padding: 1;
    }
    
    ArtifactExplorerScreen #files-container {
        layout: horizontal;
        height: 1fr;
        min-height: 20;
    }
    
    ArtifactExplorerScreen #files-tree-panel {
        width: 40%;
        height: 100%;
        border: round $primary;
        padding: 1;
    }
    
    ArtifactExplorerScreen #files-detail-panel {
        width: 60%;
        height: 100%;
        border: round $secondary;
        padding: 1;
    }
    
    ArtifactExplorerScreen .panel-title {
        text-style: bold;
        color: $primary-lighten-2;
        margin-bottom: 1;
    }
    
    ArtifactExplorerScreen .filter-bar {
        dock: top;
        height: 3;
        margin-bottom: 1;
    }
    
    ArtifactExplorerScreen .filter-bar Button {
        margin-right: 1;
    }
    
    ArtifactExplorerScreen #artifact-tree {
        height: 1fr;
        min-height: 10;
    }
    
    ArtifactExplorerScreen #files-tree {
        height: 1fr;
        min-height: 10;
    }
    
    ArtifactExplorerScreen .mandatory {
        color: $success;
    }
    
    ArtifactExplorerScreen .optional {
        color: $text-muted;
    }
    
    ArtifactExplorerScreen .section-header {
        text-style: bold;
        color: $secondary;
        margin-top: 1;
    }
    
    ArtifactExplorerScreen .template-box {
        background: $surface;
        border: solid $accent;
        padding: 1;
        margin: 1 0;
    }
    
    ArtifactExplorerScreen .file-content {
        background: $surface-darken-1;
        padding: 1;
    }
    """
    
    def __init__(self) -> None:
        super().__init__(title="Artifact Explorer")
        self.current_filter = "all"
        self.selected_artifact: ArtifactDefinition | None = None
        self.selected_file_path: str | None = None
    
    def compose_content(self) -> ComposeResult:
        with TabbedContent():
            with TabPane("Templates", id="templates-tab"):
                with Horizontal(id="explorer-container"):
                    # Tree panel (left)
                    with Vertical(id="tree-panel"):
                        yield Static("── Artifact Templates ──", classes="panel-title")
                        with Horizontal(classes="filter-bar"):
                            yield Button("All", id="btn-all", variant="primary")
                            yield Button("🔵 Inc", id="btn-inception")
                            yield Button("🟢 Con", id="btn-construction")
                            yield Button("🟡 Ops", id="btn-operations")
                        with VerticalScroll():
                            yield Tree("aidlc-docs/", id="artifact-tree")
                    
                    # Detail panel (right)
                    with VerticalScroll(id="detail-panel"):
                        yield Static("Select an artifact to view details", id="artifact-detail")
            
            with TabPane("Actual Files", id="files-tab"):
                with Horizontal(id="files-container"):
                    # Files tree panel (left)
                    with Vertical(id="files-tree-panel"):
                        yield Static("── aidlc-docs/ Files ──", classes="panel-title")
                        with VerticalScroll():
                            yield Tree("aidlc-docs/", id="files-tree")
                    
                    # File content panel (right)
                    with VerticalScroll(id="files-detail-panel"):
                        yield Static("Select a file to view its contents", id="file-content")
    
    def on_mount(self) -> None:
        """Build the artifact tree on mount."""
        self._build_tree()
        self._build_files_tree()
    
    def _build_files_tree(self) -> None:
        """Build the actual files tree from aidlc-docs/ directory."""
        tree = self.query_one("#files-tree", Tree)
        tree.clear()
        tree.root.expand()
        
        # Find aidlc-docs directory
        aidlc_docs = Path("aidlc-docs")
        if not aidlc_docs.exists():
            tree.root.add_leaf("(aidlc-docs/ not found)")
            return
        
        def add_path_nodes(parent: TreeNode, path: Path) -> None:
            """Recursively add nodes for files and directories."""
            try:
                items = sorted(path.iterdir(), key=lambda p: (not p.is_dir(), p.name.lower()))
                for item in items:
                    if item.name.startswith("."):
                        continue  # Skip hidden files
                    
                    if item.is_dir():
                        node = parent.add(f"📁 {item.name}/", data=str(item))
                        node.expand()
                        add_path_nodes(node, item)
                    else:
                        icon = "📄" if item.suffix == ".md" else "📋"
                        parent.add_leaf(f"{icon} {item.name}", data=str(item))
            except PermissionError:
                pass
        
        add_path_nodes(tree.root, aidlc_docs)
    
    def _build_tree(self) -> None:
        """Build the artifact tree based on current filter."""
        tree = self.query_one("#artifact-tree", Tree)
        tree.clear()
        tree.root.expand()
        
        artifacts = get_artifacts_by_phase(self.current_filter)
        
        # Group by directory structure
        structure: dict = {}
        for artifact in artifacts:
            parts = artifact.path.replace("aidlc-docs/", "").split("/")
            current = structure
            for part in parts[:-1]:
                if part not in current:
                    current[part] = {}
                current = current[part]
            filename = parts[-1]
            current[filename] = artifact
        
        # Build tree nodes
        def add_nodes(parent: TreeNode, data: dict, path_prefix: str = "") -> None:
            for key, value in sorted(data.items()):
                full_path = f"{path_prefix}/{key}" if path_prefix else key
                if isinstance(value, ArtifactDefinition):
                    # Leaf node (file)
                    marker = "★" if value.mandatory else "○"
                    label = f"{marker} {key}"
                    node = parent.add_leaf(label, data=value)
                else:
                    # Directory node
                    node = parent.add(f"📁 {key}/")
                    node.expand()
                    add_nodes(node, value, full_path)
        
        add_nodes(tree.root, structure)
    
    def on_tree_node_selected(self, event: Tree.NodeSelected) -> None:
        """Handle artifact or file selection."""
        # Get tree ID from the node's tree, not from event directly
        tree_id = event.node.tree.id if event.node and event.node.tree else None
        
        if tree_id == "artifact-tree":
            # Template tree selection
            if event.node.data and isinstance(event.node.data, ArtifactDefinition):
                self.selected_artifact = event.node.data
                self._update_detail()
        elif tree_id == "files-tree":
            # Actual files tree selection
            if event.node.data and isinstance(event.node.data, str):
                file_path = Path(event.node.data)
                if file_path.is_file():
                    self.selected_file_path = str(file_path)
                    self._update_file_content()
    
    def _update_file_content(self) -> None:
        """Update the file content panel."""
        content_widget = self.query_one("#file-content", Static)
        
        if not self.selected_file_path:
            content_widget.update("Select a file to view its contents")
            return
        
        file_path = Path(self.selected_file_path)
        
        try:
            content = file_path.read_text(encoding="utf-8")
            
            lines = []
            lines.append(f"╭─ {file_path.name} {'─' * max(0, 50 - len(file_path.name))}╮")
            lines.append(f"│  Path: {self.selected_file_path}")
            lines.append(f"│  Size: {file_path.stat().st_size} bytes")
            lines.append(f"╰{'─' * 55}╯")
            lines.append("")
            lines.append("── Content ──")
            lines.append("")
            
            # Show content (limit to 100 lines)
            content_lines = content.split("\n")
            for i, line in enumerate(content_lines[:100]):
                # Truncate long lines
                if len(line) > 70:
                    line = line[:67] + "..."
                lines.append(line)
            
            if len(content_lines) > 100:
                lines.append("")
                lines.append(f"... ({len(content_lines) - 100} more lines)")
            
            content_widget.update("\n".join(lines))
        except Exception as e:
            content_widget.update(f"Error reading file: {e}")
    
    def _update_detail(self) -> None:
        """Update the detail panel."""
        detail = self.query_one("#artifact-detail", Static)
        
        if not self.selected_artifact:
            detail.update("Select an artifact to view details")
            return
        
        a = self.selected_artifact
        mandatory = "MANDATORY" if a.mandatory else "OPTIONAL"
        mandatory_style = "★" if a.mandatory else "○"
        
        lines = []
        lines.append(f"╭{'─' * 56}╮")
        lines.append(f"│  {a.name.center(52)}  │")
        lines.append(f"│  {mandatory_style} {mandatory.center(50)}  │")
        lines.append(f"╰{'─' * 56}╯")
        lines.append("")
        lines.append(f"📄 Path: {a.path}")
        lines.append(f"🔵 Phase: {a.phase.upper()}")
        lines.append(f"⚙️  Stage: {a.stage}")
        lines.append("")
        
        # Purpose
        lines.append("── Purpose ──")
        lines.append("")
        # Word wrap
        words = a.purpose.split()
        line = "  "
        for word in words:
            if len(line) + len(word) + 1 > 55:
                lines.append(line)
                line = "  " + word
            else:
                line += " " + word if line.strip() else "  " + word
        if line.strip():
            lines.append(line)
        lines.append("")
        
        # Template
        lines.append("── Template ──")
        lines.append("")
        lines.append("┌" + "─" * 54 + "┐")
        for tline in a.template.split("\n")[:20]:  # Limit to 20 lines
            truncated = tline[:52] if len(tline) > 52 else tline
            lines.append(f"│ {truncated:<52} │")
        if len(a.template.split("\n")) > 20:
            lines.append(f"│ {'... (truncated)':^52} │")
        lines.append("└" + "─" * 54 + "┘")
        lines.append("")
        
        # Source
        lines.append("── Source ──")
        lines.append(f"  📚 {a.source}")
        
        detail.update("\n".join(lines))
    
    def on_button_pressed(self, event: Button.Pressed) -> None:
        """Handle filter button presses."""
        btn_id = event.button.id
        if btn_id == "btn-all":
            self.action_filter_all()
        elif btn_id == "btn-inception":
            self.action_filter_inception()
        elif btn_id == "btn-construction":
            self.action_filter_construction()
        elif btn_id == "btn-operations":
            self.action_filter_operations()
    
    def _update_button_states(self) -> None:
        """Update button variants based on current filter."""
        for btn_id, filter_val in [
            ("btn-all", "all"),
            ("btn-inception", "inception"),
            ("btn-construction", "construction"),
            ("btn-operations", "operations"),
        ]:
            btn = self.query_one(f"#{btn_id}", Button)
            btn.variant = "primary" if self.current_filter == filter_val else "default"
    
    def action_filter_all(self) -> None:
        """Show all artifacts."""
        self.current_filter = "all"
        self._build_tree()
        self._update_button_states()
    
    def action_filter_inception(self) -> None:
        """Show inception artifacts."""
        self.current_filter = "inception"
        self._build_tree()
        self._update_button_states()
    
    def action_filter_construction(self) -> None:
        """Show construction artifacts."""
        self.current_filter = "construction"
        self._build_tree()
        self._update_button_states()
    
    def action_filter_operations(self) -> None:
        """Show operations artifacts."""
        self.current_filter = "operations"
        self._build_tree()
        self._update_button_states()
    
    def action_switch_tab(self) -> None:
        """Toggle between Templates and Actual Files tabs."""
        try:
            tabbed_content = self.query_one(TabbedContent)
            if tabbed_content.active == "templates-tab":
                tabbed_content.active = "files-tab"
            else:
                tabbed_content.active = "templates-tab"
        except Exception:
            pass
