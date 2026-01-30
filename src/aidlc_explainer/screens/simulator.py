"""Simulator screen for request type and configuration selection."""

import json
from pathlib import Path
from typing import Any

from textual.app import ComposeResult
from textual.containers import Container, Vertical, Horizontal
from textual.widgets import Static, ListItem, ListView, Button, RadioSet, RadioButton

from aidlc_explainer.screens.base import ExplorerScreen


def load_request_types() -> dict[str, Any]:
    """Load request types from JSON."""
    content_path = Path(__file__).parent.parent / "content" / "simulator" / "request-types.json"
    with open(content_path, encoding="utf-8") as f:
        return json.load(f)


class RequestTypeItem(ListItem):
    """A selectable request type item."""
    
    def __init__(self, type_data: dict) -> None:
        super().__init__()
        self.type_data = type_data
        self.type_id = type_data["id"]
    
    def compose(self) -> ComposeResult:
        icon = self.type_data.get("icon", "")
        name = self.type_data["name"]
        desc = self.type_data["description"]
        yield Static(f"  {icon}  {name:<25} {desc}")


class SimulatorScreen(ExplorerScreen):
    """Simulator configuration screen - select request type and risk profile."""
    
    DEFAULT_CSS = """
    SimulatorScreen #intro {
        margin: 1 2;
        text-align: center;
    }
    
    SimulatorScreen #config-container {
        margin: 1 4;
        height: auto;
    }
    
    SimulatorScreen .section-title {
        text-style: bold;
        color: $primary;
        margin: 1 0 0 0;
    }
    
    SimulatorScreen .section-desc {
        color: $text-muted;
        margin: 0 0 1 0;
    }
    
    SimulatorScreen ListView {
        height: auto;
        background: $surface;
        border: solid $primary;
        padding: 1;
        margin: 0 0 1 0;
    }
    
    SimulatorScreen ListView > ListItem {
        padding: 0 1;
    }
    
    SimulatorScreen ListView > ListItem:hover {
        background: $primary 20%;
    }
    
    SimulatorScreen ListView > ListItem.-selected {
        background: $primary 40%;
    }
    
    SimulatorScreen #risk-section {
        margin: 1 0;
        padding: 1;
        background: $surface;
        border: solid $secondary;
    }
    
    SimulatorScreen RadioSet {
        layout: horizontal;
        width: auto;
        margin: 1 0;
    }
    
    SimulatorScreen #constraints-section {
        margin: 1 0;
        padding: 1;
        background: $surface;
        border: solid $secondary;
    }
    
    SimulatorScreen .constraint-btn {
        margin: 0 1 0 0;
    }
    
    SimulatorScreen #start-btn {
        margin: 2 0;
        width: 100%;
    }
    
    SimulatorScreen #selection-summary {
        margin: 1 0;
        padding: 1;
        background: $primary 10%;
        border: round $primary;
    }
    """
    
    BINDINGS = [
        ("1", "select_type(0)", "Greenfield"),
        ("2", "select_type(1)", "Brownfield"),
        ("3", "select_type(2)", "Frontend"),
        ("4", "select_type(3)", "Bugfix"),
        ("enter", "start_simulation", "Start"),
    ]
    
    def __init__(self) -> None:
        super().__init__(title="Stage Simulator")
        self.data = load_request_types()
        self.selected_type: dict | None = None
        self.selected_risk: str = "medium"
        self.selected_constraints: set[str] = set()
    
    def compose_content(self) -> ComposeResult:
        yield Static(
            "╭─ AI-DLC Stage Simulator ─────────────────────────────────────────────────╮\n"
            "│  Simulate how AI-DLC adapts its workflow based on your request type.    │\n"
            "│  See which stages run, questions asked, gates, and artifacts produced.  │\n"
            "╰──────────────────────────────────────────────────────────────────────────╯",
            id="intro"
        )
        
        yield Button("🎯 Try Interactive Q&A Mode →", id="interactive-btn", variant="warning")
        
        with Container(id="config-container"):
            # Request Type Selection
            yield Static("Step 1: Select Request Type", classes="section-title")
            yield Static("Choose the type of work you're simulating:", classes="section-desc")
            
            with ListView(id="type-list"):
                for type_data in self.data["types"]:
                    yield RequestTypeItem(type_data)
            
            # Risk Profile Selection
            yield Static("Step 2: Select Risk Profile", classes="section-title")
            yield Static("Risk level affects which optional stages run:", classes="section-desc")
            
            with Container(id="risk-section"):
                with RadioSet(id="risk-radio"):
                    for profile in self.data["risk_profiles"]:
                        icon = profile.get("icon", "")
                        checked = profile["id"] == "medium"
                        yield RadioButton(
                            f"{icon} {profile['name']} - {profile['description']}", 
                            id=f"risk-{profile['id']}",
                            value=checked
                        )
            
            # Constraints Selection
            yield Static("Step 3: Select Constraints (optional)", classes="section-title")
            yield Static("Additional constraints that force certain stages:", classes="section-desc")
            
            with Horizontal(id="constraints-section"):
                for constraint in self.data["constraints"]:
                    icon = constraint.get("icon", "")
                    yield Button(
                        f"{icon} {constraint['name']}", 
                        id=f"constraint-{constraint['id']}",
                        classes="constraint-btn",
                        variant="default"
                    )
            
            # Selection Summary
            yield Static("", id="selection-summary")
            
            # Start Button
            yield Button("Start Simulation →", id="start-btn", variant="primary")
    
    def on_mount(self) -> None:
        """Initialize selection summary."""
        self._update_summary()
    
    def on_list_view_selected(self, event: ListView.Selected) -> None:
        """Handle request type selection.
        
        If the same item is selected again (re-selected), start the simulation.
        This allows Enter key to both select AND start when item is already selected.
        """
        if isinstance(event.item, RequestTypeItem):
            # Check if this is a re-selection (same item selected again)
            if self.selected_type and self.selected_type["id"] == event.item.type_data["id"]:
                # Same item selected again - start simulation
                self._start_simulation()
            else:
                # New selection - update selected type
                self.selected_type = event.item.type_data
                self._update_summary()
    
    def on_radio_set_changed(self, event: RadioSet.Changed) -> None:
        """Handle risk profile selection."""
        if event.pressed and event.pressed.id:
            risk_id = event.pressed.id.replace("risk-", "")
            self.selected_risk = risk_id
            self._update_summary()
    
    def on_button_pressed(self, event: Button.Pressed) -> None:
        """Handle button presses."""
        if event.button.id == "interactive-btn":
            self.app.navigate_to("interactive-simulator", "Interactive Simulator")
        elif event.button.id == "start-btn":
            self._start_simulation()
        elif event.button.id and event.button.id.startswith("constraint-"):
            constraint_id = event.button.id.replace("constraint-", "")
            if constraint_id in self.selected_constraints:
                self.selected_constraints.remove(constraint_id)
                event.button.variant = "default"
            else:
                self.selected_constraints.add(constraint_id)
                event.button.variant = "primary"
            self._update_summary()
    
    def action_select_type(self, index: int) -> None:
        """Select request type by index."""
        types = self.data["types"]
        if 0 <= index < len(types):
            self.selected_type = types[index]
            list_view = self.query_one("#type-list", ListView)
            list_view.index = index
            self._update_summary()
    
    def action_start_simulation(self) -> None:
        """Start the simulation."""
        self._start_simulation()
    
    def _update_summary(self) -> None:
        """Update the selection summary display."""
        summary = self.query_one("#selection-summary", Static)
        
        if not self.selected_type:
            summary.update("ℹ️  Select a request type to begin")
            return
        
        type_icon = self.selected_type.get("icon", "")
        type_name = self.selected_type["name"]
        
        risk_icon = "🟡"
        risk_name = "Medium"
        for profile in self.data["risk_profiles"]:
            if profile["id"] == self.selected_risk:
                risk_icon = profile.get("icon", "")
                risk_name = profile["name"]
                break
        
        constraints_text = ""
        if self.selected_constraints:
            constraint_names = []
            for c in self.data["constraints"]:
                if c["id"] in self.selected_constraints:
                    constraint_names.append(c["name"])
            constraints_text = f"\n  Constraints: {', '.join(constraint_names)}"
        
        summary.update(
            f"📋 Selection Summary:\n"
            f"  Request Type: {type_icon} {type_name}\n"
            f"  Risk Profile: {risk_icon} {risk_name}{constraints_text}\n\n"
            f"  Press Enter or click 'Start Simulation' to begin"
        )
    
    def _start_simulation(self) -> None:
        """Navigate to simulation view."""
        if not self.selected_type:
            self.notify("Please select a request type first", severity="warning")
            return
        
        context = {
            "type": self.selected_type,
            "risk": self.selected_risk,
            "constraints": list(self.selected_constraints),
            "risk_profiles": self.data["risk_profiles"],
            "constraint_data": self.data["constraints"],
        }
        
        self.app.navigate_to(
            "simulation-view", 
            f"Simulate: {self.selected_type['name']}", 
            context
        )
