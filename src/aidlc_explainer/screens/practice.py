"""Practice menu screen with Quiz and Gatekeeper options."""

from textual.app import ComposeResult
from textual.widgets import Static, ListItem, ListView

from aidlc_explainer.screens.base import ExplorerScreen


class PracticeMenuItem(ListItem):
    """A practice menu item."""
    
    def __init__(self, number: int, title: str, description: str, screen_id: str, stats: str = "") -> None:
        super().__init__()
        self.number = number
        self.title = title
        self.description = description
        self.screen_id = screen_id
        self.stats = stats
    
    def compose(self) -> ComposeResult:
        stats_text = f" • {self.stats}" if self.stats else ""
        yield Static(f"  [{self.number}]  {self.title:<20} {self.description}{stats_text}")


class PracticeScreen(ExplorerScreen):
    """Practice mode menu screen."""
    
    DEFAULT_CSS = """
    PracticeScreen ListView {
        height: auto;
        margin: 1 4;
        background: $surface;
        border: solid $primary;
        padding: 1;
    }
    
    PracticeScreen ListView > ListItem {
        padding: 0 1;
    }
    
    PracticeScreen ListView > ListItem:hover {
        background: $primary 20%;
    }
    
    PracticeScreen ListView > ListItem.-selected {
        background: $primary 40%;
    }
    
    PracticeScreen #practice-intro {
        text-align: center;
        margin: 1 4;
        padding: 1;
        border: round $primary;
        background: $surface;
    }
    
    PracticeScreen #menu-title {
        text-align: center;
        text-style: bold;
        margin: 1 0;
    }
    
    PracticeScreen #reset-hint {
        text-align: center;
        color: $text-muted;
        margin-top: 1;
    }
    """
    
    BINDINGS = [
        ("1", "select_item(0)", "Quiz"),
        ("2", "select_item(1)", "Gatekeeper"),
        ("r", "reset_progress", "Reset"),
    ]
    
    def __init__(self) -> None:
        super().__init__(title="Practice")
        self._load_stats()
    
    def _load_stats(self) -> None:
        """Load progress stats from state file."""
        try:
            from aidlc_explainer.state import StateManager
            state = StateManager()
            quiz_data = state.get_quiz_stats()
            gate_data = state.get_gate_stats()
            
            self.quiz_stats = f"Best: {quiz_data['last_score']}/{quiz_data['total']}" if quiz_data['completed'] else "Not started"
            self.gate_stats = f"Best: {gate_data['last_score']}/{gate_data['total']}" if gate_data['completed'] else "Not started"
        except Exception:
            self.quiz_stats = "12 questions"
            self.gate_stats = "4 scenarios"
    
    def compose_content(self) -> ComposeResult:
        yield Static(
            "╭─ Practice Mode ─────────────────────────────────────────────────────╮\n"
            "│                                                                     │\n"
            "│   Test your understanding of AI-DLC concepts through interactive   │\n"
            "│   quizzes and real-world gatekeeper scenarios.                      │\n"
            "│                                                                     │\n"
            "╰─────────────────────────────────────────────────────────────────────╯",
            id="practice-intro"
        )
        
        yield Static("Select a practice mode:", id="menu-title")
        
        with ListView(id="menu"):
            yield PracticeMenuItem(1, "Quiz", "Multiple-choice questions", "quiz", self.quiz_stats)
            yield PracticeMenuItem(2, "Gatekeeper", "Review AI-generated plans", "gatekeeper", self.gate_stats)
        
        yield Static("[r] Reset Progress", id="reset-hint")
    
    def on_list_view_selected(self, event: ListView.Selected) -> None:
        """Handle menu item selection."""
        if isinstance(event.item, PracticeMenuItem):
            self.app.navigate_to(event.item.screen_id, event.item.title)
    
    def action_select_item(self, index: int) -> None:
        """Select menu item by index."""
        items = [("quiz", "Quiz"), ("gatekeeper", "Gatekeeper")]
        if 0 <= index < len(items):
            screen_id, title = items[index]
            self.app.navigate_to(screen_id, title)
    
    def action_reset_progress(self) -> None:
        """Reset all progress."""
        try:
            from aidlc_explainer.state import StateManager
            state = StateManager()
            state.reset()
            self._load_stats()
            self.notify("Progress reset!", title="Reset Complete")
            # Refresh the screen
            self.refresh()
        except Exception as e:
            self.notify(f"Could not reset: {e}", title="Error")
