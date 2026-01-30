"""Interactive simulator with question-driven workflow adaptation."""

import json
from pathlib import Path
from typing import Any

from textual.app import ComposeResult
from textual.binding import Binding
from textual.containers import Vertical, Horizontal, ScrollableContainer
from textual.widgets import Static, Button
from textual.message import Message

from aidlc_explainer.screens.base import ExplorerScreen


def load_questions() -> dict[str, Any]:
    """Load simulator questions from JSON."""
    path = Path(__file__).parent.parent / "content" / "simulator" / "questions.json"
    with open(path, encoding="utf-8") as f:
        return json.load(f)


def load_stages() -> dict[str, Any]:
    """Load stages data from JSON."""
    path = Path(__file__).parent.parent / "content" / "simulator" / "stages.json"
    with open(path, encoding="utf-8") as f:
        return json.load(f)


class QuestionOption(Static):
    """A clickable question option."""
    
    class Selected(Message):
        """Message when an option is selected."""
        def __init__(self, question_id: str, option_id: str) -> None:
            super().__init__()
            self.question_id = question_id
            self.option_id = option_id
    
    def __init__(self, question_id: str, option_id: str, label: str, index: int, **kwargs) -> None:
        labels = ['A', 'B', 'C', 'D']
        display_label = labels[index] if index < len(labels) else str(index + 1)
        super().__init__(f"  [{display_label}]  {label}", **kwargs)
        self.question_id = question_id
        self.option_id = option_id
        self.can_focus = True
    
    def on_click(self) -> None:
        """Handle mouse click."""
        self.post_message(self.Selected(self.question_id, self.option_id))


class InteractiveSimulatorScreen(ExplorerScreen):
    """Interactive simulator that asks questions to determine workflow."""
    
    DEFAULT_CSS = """
    InteractiveSimulatorScreen #intro {
        margin: 1 2;
        text-align: center;
    }
    
    InteractiveSimulatorScreen #main-container {
        layout: horizontal;
        height: 1fr;
    }
    
    InteractiveSimulatorScreen #question-panel {
        width: 55%;
        padding: 1;
        margin: 0 1 0 0;
    }
    
    InteractiveSimulatorScreen #workflow-panel {
        width: 45%;
        padding: 1;
        background: $surface;
        border: round $primary;
    }
    
    InteractiveSimulatorScreen .question-box {
        background: $surface;
        border: round $primary;
        padding: 1;
        margin: 1 0;
    }
    
    InteractiveSimulatorScreen .question-title {
        text-style: bold;
        color: $primary-lighten-2;
    }
    
    InteractiveSimulatorScreen .question-text {
        margin: 1 0;
    }
    
    InteractiveSimulatorScreen .option {
        padding: 0 1;
        margin: 0 0 0 2;
    }
    
    InteractiveSimulatorScreen .option:hover {
        background: $primary 20%;
    }
    
    InteractiveSimulatorScreen .option:focus {
        background: $primary 30%;
    }
    
    InteractiveSimulatorScreen .impact-box {
        background: $success 10%;
        border: solid $success;
        padding: 1;
        margin: 1 0;
    }
    
    InteractiveSimulatorScreen .impact-title {
        text-style: bold;
        color: $success;
    }
    
    InteractiveSimulatorScreen .stage-added {
        color: $success;
    }
    
    InteractiveSimulatorScreen .stage-removed {
        color: $error;
    }
    
    InteractiveSimulatorScreen .stage-unchanged {
        color: $text-muted;
    }
    
    InteractiveSimulatorScreen .workflow-title {
        text-style: bold;
        color: $warning;
        text-align: center;
        margin-bottom: 1;
    }
    
    InteractiveSimulatorScreen .phase-header {
        text-style: bold;
        color: $primary-lighten-2;
        margin-top: 1;
    }
    
    InteractiveSimulatorScreen #progress {
        margin: 1 0;
        text-align: center;
        color: $text-muted;
    }
    
    InteractiveSimulatorScreen #nav-buttons {
        margin: 1 0;
    }
    """
    
    BINDINGS = [
        Binding("a", "select_option(0)", "A", show=True),
        Binding("b", "select_option(1)", "B", show=True),
        Binding("c", "select_option(2)", "C", show=True),
        Binding("d", "select_option(3)", "D", show=False),
        Binding("enter", "next_question", "Next", show=True),
        Binding("r", "restart", "Restart", show=True),
    ]
    
    def __init__(self, request_type: str = "greenfield") -> None:
        super().__init__(title="Interactive Simulator")
        self.request_type = request_type
        self.questions_data = load_questions()
        self.stages_data = load_stages()
        self.questions = self.questions_data["questions"]
        self.current_index = 0
        self.answers: dict[str, str] = {}
        self.active_stages: set[str] = set()
        self.stage_reasons: dict[str, str] = {}
        self.last_impact: dict[str, Any] | None = None
        self.completed = False
        
        # Initialize with base stages for request type
        self._initialize_stages()
    
    def _initialize_stages(self) -> None:
        """Initialize active stages based on request type."""
        # Start with mandatory stages
        for stage in self.stages_data["stages"]:
            if stage.get("mandatory", False):
                self.active_stages.add(stage["id"])
                self.stage_reasons[stage["id"]] = "Mandatory for all workflows"
    
    def compose_content(self) -> ComposeResult:
        yield Static(
            "╭─ Interactive Workflow Simulator ────────────────────────────────────────╮\n"
            "│  Answer questions to see how AI-DLC adapts the workflow to your needs  │\n"
            "│  Watch the workflow panel on the right update with each answer         │\n"
            "╰────────────────────────────────────────────────────────────────────────╯",
            id="intro"
        )
        
        with Horizontal(id="main-container"):
            # Question panel (left)
            with Vertical(id="question-panel"):
                yield Static("", id="question-content")
                yield Static("", id="progress")
                with Horizontal(id="nav-buttons"):
                    yield Button("← Previous", id="prev-btn", variant="default")
                    yield Button("Next →", id="next-btn", variant="primary")
                    yield Button("Restart", id="restart-btn", variant="warning")
            
            # Workflow panel (right)
            with ScrollableContainer(id="workflow-panel"):
                yield Static("─── Resulting Workflow ───", classes="workflow-title")
                yield Static("", id="workflow-content")
    
    def on_mount(self) -> None:
        """Initialize display."""
        self._refresh_question()
        self._refresh_workflow()
    
    def _refresh_question(self) -> None:
        """Refresh the question display."""
        content = self.query_one("#question-content", Static)
        
        if self.completed:
            self._show_results(content)
            return
        
        q = self.questions[self.current_index]
        
        lines = []
        lines.append(f"╭─ Question {self.current_index + 1} of {len(self.questions)} ─────────────────────────────────────╮")
        lines.append(f"│")
        lines.append(f"│  {q['prompt']}")
        lines.append(f"│")
        
        labels = ['A', 'B', 'C', 'D']
        for i, opt in enumerate(q['options']):
            marker = "●" if self.answers.get(q['id']) == opt['id'] else "○"
            label = labels[i] if i < len(labels) else str(i+1)
            lines.append(f"│  [{label}] {marker} {opt['label']}")
        
        lines.append(f"│")
        lines.append(f"╰────────────────────────────────────────────────────────────────────────╯")
        
        # Show last impact if any
        if self.last_impact:
            lines.append("")
            lines.append("┌─ Impact of Your Answer ─────────────────────────────────────────────┐")
            lines.append(f"│")
            lines.append(f"│  {self.last_impact.get('explanation', '')}")
            lines.append(f"│")
            
            if 'add_stages' in self.last_impact and self.last_impact['add_stages']:
                for stage in self.last_impact['add_stages']:
                    lines.append(f"│  ➕ Added: {stage}")
            
            if 'remove_stages' in self.last_impact and self.last_impact['remove_stages']:
                for stage in self.last_impact['remove_stages']:
                    lines.append(f"│  ➖ Removed: {stage}")
            
            lines.append(f"│")
            lines.append(f"│  💡 Principle: {self.questions[max(0, self.current_index-1)]['principle']}")
            lines.append(f"└────────────────────────────────────────────────────────────────────┘")
        
        content.update("\n".join(lines))
        
        # Update progress
        progress = self.query_one("#progress", Static)
        answered = len(self.answers)
        total = len(self.questions)
        bar_width = 30
        filled = int((answered / total) * bar_width)
        bar = "█" * filled + "░" * (bar_width - filled)
        progress.update(f"[{bar}] {answered}/{total} questions answered")
    
    def _show_results(self, content: Static) -> None:
        """Show final results."""
        lines = []
        lines.append("╭─ Simulation Complete ──────────────────────────────────────────────────╮")
        lines.append("│")
        lines.append("│  Based on your answers, AI-DLC has configured the optimal workflow:")
        lines.append("│")
        lines.append(f"│  📊 {len(self.active_stages)} stages will run")
        lines.append("│")
        lines.append("│  Your Configuration:")
        
        for q in self.questions:
            answer = self.answers.get(q['id'])
            if answer:
                for opt in q['options']:
                    if opt['id'] == answer:
                        lines.append(f"│    • {q['prompt'][:40]}... → {opt['label'][:25]}")
                        break
        
        lines.append("│")
        lines.append("│  Press [R] to restart with different answers")
        lines.append("│  Press [Esc] to go back")
        lines.append("│")
        lines.append("╰────────────────────────────────────────────────────────────────────────╯")
        
        content.update("\n".join(lines))
    
    def _refresh_workflow(self) -> None:
        """Refresh the workflow display."""
        content = self.query_one("#workflow-content", Static)
        
        lines = []
        
        # Group stages by phase
        phases = {"inception": [], "construction": [], "operations": []}
        
        for stage in self.stages_data["stages"]:
            phase = stage.get("phase", "construction")
            if phase in phases:
                phases[phase].append(stage)
        
        phase_names = {
            "inception": "🔵 INCEPTION",
            "construction": "🟢 CONSTRUCTION", 
            "operations": "🟣 OPERATIONS"
        }
        
        for phase_id, phase_name in phase_names.items():
            phase_stages = phases.get(phase_id, [])
            if not phase_stages:
                continue
            
            lines.append(f"\n{phase_name}")
            lines.append("─" * 35)
            
            for stage in phase_stages:
                stage_id = stage["id"]
                is_active = stage_id in self.active_stages
                
                if is_active:
                    marker = "✓"
                    reason = self.stage_reasons.get(stage_id, "")
                    short_reason = f"({reason[:20]}...)" if len(reason) > 20 else f"({reason})" if reason else ""
                    lines.append(f"  {marker} {stage['name']}")
                    if short_reason:
                        lines.append(f"      {short_reason}")
                else:
                    lines.append(f"  ○ {stage['name']} [dim]skipped[/dim]")
        
        lines.append("\n─── Summary ───")
        lines.append(f"Total active stages: {len(self.active_stages)}")
        lines.append(f"Questions answered: {len(self.answers)}/{len(self.questions)}")
        
        content.update("\n".join(lines))
    
    def on_question_option_selected(self, event: QuestionOption.Selected) -> None:
        """Handle option selection via click."""
        self._answer_question(event.question_id, event.option_id)
    
    def action_select_option(self, index: int) -> None:
        """Handle option selection via keyboard."""
        if self.completed:
            return
        
        q = self.questions[self.current_index]
        if index < len(q['options']):
            option_id = q['options'][index]['id']
            self._answer_question(q['id'], option_id)
    
    def _answer_question(self, question_id: str, option_id: str) -> None:
        """Process an answer and update workflow."""
        # Find the question
        question = None
        for q in self.questions:
            if q['id'] == question_id:
                question = q
                break
        
        if not question:
            return
        
        # Store answer
        self.answers[question_id] = option_id
        
        # Apply effects
        effects = question['effects'].get(option_id, {})
        self.last_impact = effects
        
        # Add stages
        for stage_id in effects.get('add_stages', []):
            self.active_stages.add(stage_id)
            self.stage_reasons[stage_id] = effects.get('explanation', 'Added by answer')[:50]
        
        # Remove stages
        for stage_id in effects.get('remove_stages', []):
            self.active_stages.discard(stage_id)
            if stage_id in self.stage_reasons:
                del self.stage_reasons[stage_id]
        
        # Refresh display
        self._refresh_question()
        self._refresh_workflow()
    
    def action_next_question(self) -> None:
        """Move to next question."""
        if self.completed:
            return
        
        if self.current_index < len(self.questions) - 1:
            self.current_index += 1
            self.last_impact = None
            self._refresh_question()
        else:
            self.completed = True
            self._refresh_question()
    
    def on_button_pressed(self, event: Button.Pressed) -> None:
        """Handle button presses."""
        if event.button.id == "next-btn":
            self.action_next_question()
        elif event.button.id == "prev-btn":
            if self.current_index > 0:
                self.current_index -= 1
                self.completed = False
                self.last_impact = None
                self._refresh_question()
        elif event.button.id == "restart-btn":
            self.action_restart()
    
    def action_restart(self) -> None:
        """Restart the simulation."""
        self.current_index = 0
        self.answers = {}
        self.active_stages = set()
        self.stage_reasons = {}
        self.last_impact = None
        self.completed = False
        self._initialize_stages()
        self._refresh_question()
        self._refresh_workflow()
