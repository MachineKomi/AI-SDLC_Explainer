"""Simulation view screen showing stage timeline with questions, gates, and artifacts."""

import json
from pathlib import Path
from typing import Any

from textual.app import ComposeResult
from textual.containers import Container, Vertical, Horizontal, ScrollableContainer
from textual.widgets import Static, Button, ListView, ListItem, RadioSet, RadioButton, Checkbox
from textual.reactive import reactive

from aidlc_explainer.screens.base import ExplorerScreen


def load_stages() -> dict[str, Any]:
    """Load stage definitions from JSON."""
    content_path = Path(__file__).parent.parent / "content" / "simulator" / "stages.json"
    with open(content_path, encoding="utf-8") as f:
        return json.load(f)


class StageItem(ListItem):
    """A stage item in the timeline."""
    
    def __init__(self, stage: dict, status: str, phase_icon: str) -> None:
        super().__init__()
        self.stage = stage
        self.status = status  # "execute", "skip", "conditional"
        self.phase_icon = phase_icon
    
    def compose(self) -> ComposeResult:
        status_icon = "●" if self.status == "execute" else "○" if self.status == "skip" else "◐"
        color_class = "execute" if self.status == "execute" else "skip" if self.status == "skip" else "conditional"
        yield Static(f"  {self.phase_icon} {status_icon} {self.stage['name']}", classes=f"stage-{color_class}")


class QuestionItem(ListItem):
    """A question item for interactive Q&A."""
    
    def __init__(self, question: dict, index: int) -> None:
        super().__init__()
        self.question = question
        self.index = index
        self.selected_options: set[str] = set()
    
    def compose(self) -> ComposeResult:
        q = self.question
        yield Static(f"Q{self.index + 1}: {q['text']}", classes="question-text")


class SimulationViewScreen(ExplorerScreen):
    """Interactive simulation view with stages, questions, gates, and artifacts."""
    
    DEFAULT_CSS = """
    SimulationViewScreen #sim-container {
        layout: horizontal;
        height: 100%;
    }
    
    SimulationViewScreen #timeline-panel {
        width: 35%;
        border-right: solid $primary;
        padding: 1;
    }
    
    SimulationViewScreen #detail-panel {
        width: 65%;
        padding: 1;
    }
    
    SimulationViewScreen .panel-title {
        text-style: bold;
        color: $primary;
        margin: 0 0 1 0;
    }
    
    SimulationViewScreen .phase-header {
        text-style: bold;
        margin: 1 0 0 0;
        padding: 0 1;
        background: $surface;
    }
    
    SimulationViewScreen #stage-list {
        height: auto;
        max-height: 20;
        background: $surface;
        margin: 0 0 1 0;
    }
    
    SimulationViewScreen #stage-list > ListItem {
        padding: 0;
    }
    
    SimulationViewScreen #stage-list > ListItem.-selected {
        background: $primary 30%;
    }
    
    SimulationViewScreen .stage-execute {
        color: $success;
    }
    
    SimulationViewScreen .stage-skip {
        color: $text-muted;
    }
    
    SimulationViewScreen .stage-conditional {
        color: $warning;
    }
    
    SimulationViewScreen #stage-detail {
        background: $surface;
        border: solid $secondary;
        padding: 1;
        margin: 0 0 1 0;
    }
    
    SimulationViewScreen .detail-section {
        margin: 1 0;
        padding: 1;
        background: $background;
        border: round $secondary;
    }
    
    SimulationViewScreen .section-header {
        text-style: bold;
        color: $secondary;
        margin: 0 0 1 0;
    }
    
    SimulationViewScreen .question-text {
        margin: 0 0 1 0;
    }
    
    SimulationViewScreen .option-item {
        padding: 0 2;
    }
    
    SimulationViewScreen .artifact-item {
        color: $text;
        padding: 0 1;
    }
    
    SimulationViewScreen .gate-criteria {
        padding: 0 2;
    }
    
    SimulationViewScreen #gate-actions {
        layout: horizontal;
        margin: 1 0;
        height: auto;
    }
    
    SimulationViewScreen #gate-actions Button {
        margin: 0 1 0 0;
    }
    
    SimulationViewScreen #sources-panel {
        margin: 1 0;
        padding: 1;
        background: $surface;
        border: solid $accent;
    }
    
    SimulationViewScreen .source-link {
        color: $accent;
    }
    
    SimulationViewScreen #nav-buttons {
        layout: horizontal;
        margin: 1 0;
        height: auto;
        dock: bottom;
    }
    
    SimulationViewScreen #nav-buttons Button {
        margin: 0 1 0 0;
    }
    
    SimulationViewScreen .evidence-warning {
        color: $error;
        text-style: bold;
        margin: 1 0;
    }
    
    SimulationViewScreen .feedback-success {
        color: $success;
        margin: 1 0;
    }
    
    SimulationViewScreen .feedback-error {
        color: $error;
        margin: 1 0;
    }
    """
    
    BINDINGS = [
        ("left", "prev_stage", "Previous"),
        ("right", "next_stage", "Next"),
        ("h", "prev_stage", "Previous"),
        ("l", "next_stage", "Next"),
        ("a", "approve_gate", "Approve"),
        ("r", "reject_gate", "Reject"),
        ("s", "show_sources", "Sources"),
    ]
    
    current_stage_index = reactive(0)
    
    def __init__(self, context: dict) -> None:
        super().__init__(title="Simulation")
        self.context = context
        self.stage_data = load_stages()
        self.request_type = context.get("type", {})
        self.risk_profile = context.get("risk", "medium")
        self.constraints = set(context.get("constraints", []))
        
        # Calculate which stages execute based on request type, risk, and constraints
        self.active_stages = self._calculate_active_stages()
        self.stage_answers: dict[str, dict] = {}  # stage_id -> {question_id: answer}
        self.gate_decisions: dict[str, str] = {}  # stage_id -> "approved" | "rejected"
    
    def _calculate_active_stages(self) -> list[dict]:
        """Calculate which stages are active based on configuration."""
        stages = []
        type_stages = self.request_type.get("stages", {})
        
        # Get risk and constraint modifiers
        risk_modifiers = {}
        constraint_modifiers = {}
        
        for profile in self.context.get("risk_profiles", []):
            if profile["id"] == self.risk_profile:
                risk_modifiers = profile.get("stage_modifiers", {})
                break
        
        for c in self.context.get("constraint_data", []):
            if c["id"] in self.constraints:
                for stage_id, mods in c.get("stage_modifiers", {}).items():
                    constraint_modifiers[stage_id] = mods
        
        # Get phase info for icons
        phase_icons = {p["id"]: p.get("icon", "") for p in self.stage_data.get("phases", [])}
        
        for stage in self.stage_data.get("stages", []):
            stage_id = stage["id"]
            type_config = type_stages.get(stage_id, {"execute": "conditional"})
            
            # Determine execution status
            base_execute = type_config.get("execute", "conditional")
            
            # Check if constraints force execution
            if stage_id in constraint_modifiers:
                if constraint_modifiers[stage_id].get("force_execute"):
                    base_execute = True
            
            # Check if risk profile affects execution
            if stage_id in risk_modifiers:
                if risk_modifiers[stage_id].get("force_execute"):
                    base_execute = True
            
            # Determine status string
            if base_execute is True:
                status = "execute"
            elif base_execute is False:
                status = "skip"
            else:
                status = "conditional"
            
            stages.append({
                **stage,
                "status": status,
                "reason": type_config.get("reason", ""),
                "phase_icon": phase_icons.get(stage["phase"], ""),
            })
        
        return stages
    
    def compose_content(self) -> ComposeResult:
        with Container(id="sim-container"):
            # Timeline Panel (left)
            with ScrollableContainer(id="timeline-panel"):
                type_icon = self.request_type.get("icon", "")
                type_name = self.request_type.get("name", "Unknown")
                yield Static(f"{type_icon} {type_name}", classes="panel-title")
                
                # Group stages by phase
                current_phase = None
                with ListView(id="stage-list"):
                    for stage in self.active_stages:
                        if stage["phase"] != current_phase:
                            current_phase = stage["phase"]
                        yield StageItem(stage, stage["status"], stage.get("phase_icon", ""))
                
                # Legend
                yield Static("\n── Legend ──", classes="panel-title")
                yield Static("● Execute  ○ Skip  ◐ Conditional")
            
            # Detail Panel (right)
            with ScrollableContainer(id="detail-panel"):
                yield Static("", id="stage-detail")
                
                # Navigation buttons
                with Horizontal(id="nav-buttons"):
                    yield Button("← Previous", id="prev-btn", variant="default")
                    yield Button("Next →", id="next-btn", variant="primary")
                    yield Button("📚 Sources", id="sources-btn", variant="default")
    
    def on_mount(self) -> None:
        """Initialize the view with first stage."""
        self._update_stage_detail()
        # Select first item in list
        stage_list = self.query_one("#stage-list", ListView)
        if len(self.active_stages) > 0:
            stage_list.index = 0
    
    def on_list_view_selected(self, event: ListView.Selected) -> None:
        """Handle stage selection from timeline."""
        if isinstance(event.item, StageItem):
            # Find the index of this stage
            for i, stage in enumerate(self.active_stages):
                if stage["id"] == event.item.stage["id"]:
                    self.current_stage_index = i
                    self._update_stage_detail()
                    break
    
    def on_button_pressed(self, event: Button.Pressed) -> None:
        """Handle button presses."""
        if event.button.id == "prev-btn":
            self.action_prev_stage()
        elif event.button.id == "next-btn":
            self.action_next_stage()
        elif event.button.id == "sources-btn":
            self.action_show_sources()
        elif event.button.id == "approve-btn":
            self.action_approve_gate()
        elif event.button.id == "reject-btn":
            self.action_reject_gate()
    
    def action_prev_stage(self) -> None:
        """Go to previous stage."""
        if self.current_stage_index > 0:
            self.current_stage_index -= 1
            self._update_stage_detail()
            self._sync_list_selection()
    
    def action_next_stage(self) -> None:
        """Go to next stage."""
        if self.current_stage_index < len(self.active_stages) - 1:
            self.current_stage_index += 1
            self._update_stage_detail()
            self._sync_list_selection()
    
    def action_approve_gate(self) -> None:
        """Approve the current gate."""
        stage = self.active_stages[self.current_stage_index]
        stage_id = stage["id"]
        
        # Check if evidence is provided (simulate "proof over prose" rule)
        gate = stage.get("gate", {})
        evidence_required = gate.get("evidence_required", [])
        
        if evidence_required and stage_id not in self.gate_decisions:
            # Show warning about evidence
            self.notify(
                "⚠️ Proof over prose: Evidence required before approval!\n"
                f"Required: {', '.join(evidence_required[:2])}...",
                title="Evidence Required",
                severity="warning"
            )
            return
        
        self.gate_decisions[stage_id] = "approved"
        self.notify(f"✅ Gate '{gate.get('name', 'Unknown')}' approved", severity="information")
        self._update_stage_detail()
    
    def action_reject_gate(self) -> None:
        """Reject the current gate."""
        stage = self.active_stages[self.current_stage_index]
        stage_id = stage["id"]
        gate = stage.get("gate", {})
        
        self.gate_decisions[stage_id] = "rejected"
        self.notify(f"❌ Gate '{gate.get('name', 'Unknown')}' rejected - revise and resubmit", severity="warning")
        self._update_stage_detail()
    
    def action_show_sources(self) -> None:
        """Show sources for current stage."""
        stage = self.active_stages[self.current_stage_index]
        source = stage.get("source", {})
        local = source.get("local", "Not available")
        upstream = source.get("upstream", "Not available")
        
        self.notify(
            f"📁 Local: {local}\n"
            f"🌐 Upstream: {upstream}",
            title=f"Sources: {stage['name']}",
            timeout=10
        )
    
    def _sync_list_selection(self) -> None:
        """Sync list view selection with current stage index."""
        try:
            stage_list = self.query_one("#stage-list", ListView)
            stage_list.index = self.current_stage_index
        except Exception:
            pass
    
    def _update_stage_detail(self) -> None:
        """Update the detail panel for current stage."""
        detail = self.query_one("#stage-detail", Static)
        
        if self.current_stage_index >= len(self.active_stages):
            detail.update("No stage selected")
            return
        
        stage = self.active_stages[self.current_stage_index]
        stage_num = self.current_stage_index + 1
        total = len(self.active_stages)
        
        # Build detail content
        lines = []
        
        # Header
        phase_icon = stage.get("phase_icon", "")
        status = stage.get("status", "conditional")
        status_text = "EXECUTE" if status == "execute" else "SKIP" if status == "skip" else "CONDITIONAL"
        lines.append(f"╭─ {stage['name']} ({stage_num}/{total}) ──────────────────────────────────")
        lines.append(f"│  Phase: {phase_icon} {stage['phase'].upper()}")
        lines.append(f"│  Status: {status_text}")
        lines.append(f"│  {stage['description']}")
        lines.append(f"│  Reason: {stage.get('reason', 'N/A')}")
        
        # Show phase ritual if available
        phase_data = next((p for p in self.stage_data.get("phases", []) 
                         if p["id"] == stage["phase"]), None)
        if phase_data and "ritual" in phase_data:
            lines.append(f"│  Ritual: {phase_data['ritual']}")
        
        lines.append("╰" + "─" * 60)
        lines.append("")
        
        # Questions Section
        questions = stage.get("questions", [])
        if questions:
            lines.append("── Structured Questions ──────────────────────────────────────")
            lines.append("")
            for i, q in enumerate(questions):
                lines.append(f"  Q{i+1}: {q['text']}")
                q_type = q.get("type", "single")
                options = q.get("options", [])
                if options:
                    type_hint = "[select one]" if q_type == "single" else "[select multiple]"
                    lines.append(f"      {type_hint}")
                    for opt in options[:4]:  # Show max 4 options
                        label = opt.get("label", opt) if isinstance(opt, dict) else opt
                        lines.append(f"      [ ] {label}")
                    if len(options) > 4:
                        lines.append(f"      ... and {len(options) - 4} more")
                lines.append("")
        
        # Artifacts Section
        artifacts = stage.get("artifacts", [])
        if artifacts:
            lines.append("── Artifacts Produced ────────────────────────────────────────")
            lines.append("")
            for artifact in artifacts:
                path = artifact.get("path", artifact) if isinstance(artifact, dict) else artifact
                desc = artifact.get("description", "") if isinstance(artifact, dict) else ""
                lines.append(f"  📄 {path}")
                if desc:
                    lines.append(f"      └─ {desc}")
            lines.append("")
        
        # Gate Section
        gate = stage.get("gate", {})
        if gate:
            gate_name = gate.get("name", "Approval Gate")
            stage_id = stage["id"]
            decision = self.gate_decisions.get(stage_id, None)
            
            lines.append("── Approval Gate ─────────────────────────────────────────────")
            lines.append("")
            lines.append(f"  🚧 {gate_name}")
            
            if decision == "approved":
                lines.append("  ✅ Status: APPROVED")
            elif decision == "rejected":
                lines.append("  ❌ Status: REJECTED - Revision needed")
            else:
                lines.append("  ⏳ Status: PENDING")
            
            lines.append("")
            lines.append("  Criteria:")
            for criterion in gate.get("criteria", []):
                check = "✓" if decision == "approved" else "☐"
                lines.append(f"    {check} {criterion}")
            
            lines.append("")
            lines.append("  Evidence Required:")
            for evidence in gate.get("evidence_required", []):
                lines.append(f"    • {evidence}")
            
            if not decision:
                lines.append("")
                lines.append("  ⚠️  Press [A] to Approve or [R] to Reject")
            lines.append("")
        
        # Source reference
        source = stage.get("source", {})
        if source:
            lines.append("── Source Reference ──────────────────────────────────────────")
            lines.append("")
            lines.append(f"  📁 Local: {source.get('local', 'N/A')}")
            lines.append(f"  🌐 Upstream: {source.get('upstream', 'N/A')}")
        
        detail.update("\n".join(lines))
