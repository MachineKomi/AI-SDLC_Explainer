"""Gatekeeper screen for scenario-based approval practice."""

import json
from pathlib import Path
from typing import Any

from textual.app import ComposeResult
from textual.binding import Binding
from textual.containers import Vertical, VerticalScroll
from textual.widgets import Static, Checkbox

from aidlc_explainer.screens.base import ExplorerScreen


def load_gates() -> dict[str, Any]:
    """Load gatekeeper scenarios from JSON file."""
    gates_path = Path(__file__).parent.parent / "content" / "practice" / "gates.json"
    with open(gates_path, "r", encoding="utf-8") as f:
        return json.load(f)


class GatekeeperScreen(ExplorerScreen):
    """Screen for practicing gate approval decisions."""
    
    DEFAULT_CSS = """
    GatekeeperScreen VerticalScroll {
        height: 100%;
    }
    
    GatekeeperScreen #context-box {
        border: solid $secondary;
        padding: 1;
        margin: 0 2 1 2;
        background: $surface;
    }
    
    GatekeeperScreen #phase-stage {
        color: $warning;
        text-style: bold;
        margin-bottom: 1;
    }
    
    GatekeeperScreen #plan-box {
        border: round $primary;
        padding: 1;
        margin: 0 2;
        background: $surface;
    }
    
    GatekeeperScreen #plan-title {
        text-style: bold;
        color: $primary-lighten-2;
    }
    
    GatekeeperScreen #decision-box {
        margin: 1 2;
        padding: 1;
    }
    
    GatekeeperScreen #reasons-box {
        border: solid $primary;
        padding: 1;
        margin: 0 2;
        background: $surface;
    }
    
    GatekeeperScreen #feedback-box {
        border: double $secondary;
        padding: 1;
        margin: 1 2;
        background: $surface;
    }
    
    GatekeeperScreen .feedback-correct {
        color: $success;
    }
    
    GatekeeperScreen .feedback-wrong {
        color: $error;
    }
    
    GatekeeperScreen #evidence-box {
        border: solid $success;
        padding: 1;
        margin: 1 2;
        background: $surface;
    }
    
    GatekeeperScreen #progress {
        text-align: center;
        margin-top: 1;
        color: $text-muted;
    }
    
    GatekeeperScreen #score-box {
        border: double $primary;
        padding: 2;
        margin: 1 4;
        background: $surface;
        text-align: center;
    }
    
    GatekeeperScreen Checkbox {
        margin: 0 2;
        padding: 0;
    }
    """
    
    BINDINGS = [
        Binding("a", "approve", "Approve", show=True),
        Binding("r", "reject", "Reject", show=True),
        Binding("space", "toggle_reason", "Toggle", show=False),
        Binding("enter", "submit", "Submit", show=True),
        Binding("right", "next_scenario", "Next", show=False),
    ]
    
    def __init__(self) -> None:
        super().__init__(title="Gatekeeper")
        self.gates_data = load_gates()
        self.scenarios = self.gates_data["scenarios"]
        self.current_index = 0
        self.score = 0
        self.mistakes: list[str] = []
        
        # Decision state
        self.decision: str | None = None  # "approve" or "reject"
        self.showing_reasons = False
        self.selected_reasons: set[int] = set()
        self.submitted = False
        self.showing_results = False
    
    def compose_content(self) -> ComposeResult:
        if self.showing_results:
            yield from self._compose_results()
        elif self.submitted:
            yield from self._compose_feedback()
        elif self.showing_reasons:
            yield from self._compose_reasons()
        else:
            yield from self._compose_scenario()
    
    def _compose_scenario(self) -> ComposeResult:
        """Compose the scenario display."""
        s = self.scenarios[self.current_index]
        
        with VerticalScroll():
            yield Static(f"Phase: {s['phase']}  │  Stage: {s['stage']}", id="phase-stage")
            
            with Vertical(id="context-box"):
                yield Static(s['context'])
            
            with Vertical(id="plan-box"):
                yield Static("╭─ AI Proposed Plan ─────────────────────────────────────────────────╮", id="plan-title")
                yield Static(s['ai_plan'])
            
            with Vertical(id="decision-box"):
                yield Static("\nYour Decision:  [a] Approve    [r] Reject")
            
            yield Static(f"[{self.current_index + 1}/{len(self.scenarios)}]", id="progress")
    
    def _compose_reasons(self) -> ComposeResult:
        """Compose the reasons selection screen."""
        s = self.scenarios[self.current_index]
        all_reasons = s['decisions']['valid_reasons'] + s['decisions']['invalid_reasons']
        
        with VerticalScroll():
            yield Static(f"You chose: {self.decision.upper()}\n", id="phase-stage")
            yield Static("Select your reasons (space to toggle, enter to submit):\n")
            
            with Vertical(id="reasons-box"):
                for i, reason in enumerate(all_reasons):
                    checked = i in self.selected_reasons
                    yield Checkbox(reason, value=checked, id=f"reason-{i}")
            
            yield Static("\n[Space] Toggle  [Enter] Submit  [Esc] Back", id="progress")
    
    def _compose_feedback(self) -> ComposeResult:
        """Compose the feedback display."""
        s = self.scenarios[self.current_index]
        correct_action = s['decisions']['correct_action']
        valid_reasons = set(s['decisions']['valid_reasons'])
        all_reasons = s['decisions']['valid_reasons'] + s['decisions']['invalid_reasons']
        
        # Check if decision was correct
        decision_correct = self.decision == correct_action
        
        # Check reasons
        selected_reason_texts = {all_reasons[i] for i in self.selected_reasons}
        correct_reasons = selected_reason_texts & valid_reasons
        wrong_reasons = selected_reason_texts - valid_reasons
        missed_reasons = valid_reasons - selected_reason_texts
        
        # Calculate score for this scenario
        reason_score = len(correct_reasons) - len(wrong_reasons)
        scenario_passed = decision_correct and reason_score > 0
        
        with VerticalScroll():
            with Vertical(id="feedback-box"):
                if decision_correct:
                    yield Static(f"✓ Correct decision: {correct_action.upper()}", classes="feedback-correct")
                else:
                    yield Static(f"✗ Wrong decision. Should have been: {correct_action.upper()}", classes="feedback-wrong")
                
                yield Static("")
                
                if correct_reasons:
                    yield Static("✓ Correct reasons identified:", classes="feedback-correct")
                    for r in correct_reasons:
                        yield Static(f"  • {r}")
                
                if wrong_reasons:
                    yield Static("\n✗ Invalid reasons selected:", classes="feedback-wrong")
                    for r in wrong_reasons:
                        yield Static(f"  • {r}")
                
                if missed_reasons:
                    yield Static("\n⚠ Missed reasons:")
                    for r in missed_reasons:
                        yield Static(f"  • {r}")
            
            with Vertical(id="evidence-box"):
                yield Static("Evidence required to approve this gate:\n")
                for item in s['evidence_checklist']:
                    yield Static(f"  ☐ {item}")
            
            yield Static(f"\nSource: {s['sources']['local'][0]}")
            
            hint = "[Enter/→] Next scenario" if self.current_index < len(self.scenarios) - 1 else "[Enter] See results"
            yield Static(f"\n{hint}  [Esc] Back", id="progress")
    
    def _compose_results(self) -> ComposeResult:
        """Compose the final results screen."""
        total = len(self.scenarios)
        pct = int((self.score / total) * 100)
        
        grade = "🎉 Expert Gatekeeper!" if pct >= 75 else "👍 Good judgment!" if pct >= 50 else "📚 Review the principles"
        
        with Vertical(id="score-box"):
            yield Static(f"╭─ Gatekeeper Practice Complete {'─' * 30}╮\n")
            yield Static(f"Score: {self.score}/{total} scenarios ({pct}%)\n")
            yield Static(f"{grade}\n")
            
            if self.mistakes:
                yield Static(f"\nStruggled with {len(self.mistakes)} scenario(s)")
            else:
                yield Static("\nPerfect gate decisions! 🌟")
            
            yield Static("\n[r] Restart  [Esc] Back")
    
    def action_approve(self) -> None:
        """Choose to approve the plan."""
        if self.submitted or self.showing_results or self.showing_reasons:
            return
        self.decision = "approve"
        self.showing_reasons = True
        self._refresh_display()
    
    def action_reject(self) -> None:
        """Choose to reject the plan."""
        if self.submitted or self.showing_results or self.showing_reasons:
            return
        self.decision = "reject"
        self.showing_reasons = True
        self._refresh_display()
    
    def on_checkbox_changed(self, event: Checkbox.Changed) -> None:
        """Handle checkbox toggle."""
        checkbox_id = event.checkbox.id
        if checkbox_id and checkbox_id.startswith("reason-"):
            idx = int(checkbox_id.split("-")[1])
            if event.value:
                self.selected_reasons.add(idx)
            else:
                self.selected_reasons.discard(idx)
    
    def action_toggle_reason(self) -> None:
        """Toggle currently focused reason (for keyboard navigation)."""
        pass  # Handled by checkbox focus
    
    def action_submit(self) -> None:
        """Submit reasons and show feedback."""
        if self.showing_results:
            return
        
        if self.showing_reasons and not self.submitted:
            self._evaluate_scenario()
            self.submitted = True
            self._refresh_display()
        elif self.submitted:
            self.action_next_scenario()
    
    def action_next_scenario(self) -> None:
        """Move to next scenario or show results."""
        if not self.submitted:
            return
        
        self.current_index += 1
        self.decision = None
        self.showing_reasons = False
        self.selected_reasons = set()
        self.submitted = False
        
        if self.current_index >= len(self.scenarios):
            self._save_results()
            self.showing_results = True
        
        self._refresh_display()
    
    def _evaluate_scenario(self) -> None:
        """Evaluate the current scenario response."""
        s = self.scenarios[self.current_index]
        correct_action = s['decisions']['correct_action']
        valid_reasons = set(s['decisions']['valid_reasons'])
        all_reasons = s['decisions']['valid_reasons'] + s['decisions']['invalid_reasons']
        
        decision_correct = self.decision == correct_action
        selected_reason_texts = {all_reasons[i] for i in self.selected_reasons}
        correct_reasons = selected_reason_texts & valid_reasons
        wrong_reasons = selected_reason_texts - valid_reasons
        
        # Score: correct decision + more correct reasons than wrong
        if decision_correct and len(correct_reasons) > len(wrong_reasons):
            self.score += 1
        else:
            self.mistakes.append(s['id'])
    
    def _save_results(self) -> None:
        """Save gatekeeper results to state."""
        try:
            from aidlc_explainer.state import StateManager
            state = StateManager()
            state.save_gate_result(self.score, len(self.scenarios), self.mistakes)
        except Exception:
            pass
    
    def action_restart(self) -> None:
        """Restart gatekeeper practice."""
        self.current_index = 0
        self.score = 0
        self.mistakes = []
        self.decision = None
        self.showing_reasons = False
        self.selected_reasons = set()
        self.submitted = False
        self.showing_results = False
        self._refresh_display()
    
    def _refresh_display(self) -> None:
        """Refresh the screen content."""
        content = self.query_one("#content")
        content.remove_children()
        
        for widget in self.compose_content():
            content.mount(widget)
