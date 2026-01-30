"""Home screen with main menu and progress dashboard."""

from textual.app import ComposeResult
from textual.containers import Horizontal, Vertical
from textual.widgets import Static, ListItem, ListView, ProgressBar

from aidlc_explainer.screens.base import ExplorerScreen
from aidlc_explainer.state import StateManager


WELCOME_BANNER = """\
╔═════════════════════════════════════════════════════════════════════════════╗
║                                                                             ║
║       █████╗ ██╗      ███████╗██████╗ ██╗      ██████╗                      ║
║      ██╔══██╗██║      ██╔════╝██╔══██╗██║     ██╔════╝                      ║
║      ███████║██║█████╗███████╗██║  ██║██║     ██║                           ║
║      ██╔══██║██║╚════╝╚════██║██║  ██║██║     ██║                           ║
║      ██║  ██║██║      ███████║██████╔╝███████╗╚██████╗                      ║
║      ╚═╝  ╚═╝╚═╝      ╚══════╝╚═════╝ ╚══════╝ ╚═════╝                      ║
║                                                                             ║
║                    AI-Driven Development Lifecycle                          ║
║                         Interactive Explainer                               ║
║                                                                             ║
║        Learn how humans and AI collaborate to build software better         ║
╚═════════════════════════════════════════════════════════════════════════════╝
"""


class MenuItem(ListItem):
    """A menu item with number, title, and description."""
    
    def __init__(self, number: int, title: str, description: str, screen_id: str, enabled: bool = True) -> None:
        super().__init__()
        self.number = number
        self.title = title
        self.description = description
        self.screen_id = screen_id
        self.enabled = enabled
    
    def compose(self) -> ComposeResult:
        status = "" if self.enabled else " [dim](coming soon)[/dim]"
        # Format: number, icon+title (left-aligned), description (right-aligned)
        yield Static(f"  [{self.number}]  {self.title:<18}  {self.description}{status}")


class HomeScreen(ExplorerScreen):
    """Main menu home screen with progress dashboard."""
    
    DEFAULT_CSS = """
    HomeScreen #main-container {
        layout: horizontal;
        height: 1fr;
        min-height: 20;
    }
    
    HomeScreen #menu-panel {
        width: 60%;
        height: 100%;
        overflow-y: auto;
    }
    
    HomeScreen #progress-panel {
        width: 40%;
        height: 100%;
        overflow-y: auto;
        border: round $secondary;
        padding: 1;
        margin: 1;
    }
    
    HomeScreen ListView {
        height: auto;
        margin: 1 2;
        background: $surface;
        border: solid $primary;
        padding: 1;
    }
    
    HomeScreen ListView > ListItem {
        padding: 0 1;
    }
    
    HomeScreen ListView > ListItem:hover {
        background: $primary 20%;
    }
    
    HomeScreen ListView > ListItem.-selected {
        background: $primary 40%;
    }
    
    HomeScreen #welcome {
        text-align: center;
        color: $primary-lighten-2;
        margin: 0 0 1 0;
    }
    
    HomeScreen #menu-title {
        text-align: center;
        text-style: bold;
        margin: 1 0;
    }
    
    HomeScreen .progress-title {
        text-style: bold;
        color: $secondary;
        text-align: center;
        margin-bottom: 1;
    }
    
    HomeScreen .progress-item {
        margin: 0 0 1 0;
    }
    
    HomeScreen .progress-label {
        color: $text;
    }
    
    HomeScreen .progress-value {
        color: $success;
        text-align: right;
    }
    
    HomeScreen .achievement-item {
        color: $warning;
    }
    
    HomeScreen .overall-progress {
        text-style: bold;
        color: $primary-lighten-2;
        text-align: center;
        margin-top: 1;
    }
    """
    
    BINDINGS = [
        ("1", "select_item(0)", "Lessons"),
        ("2", "select_item(1)", "Compare"),
        ("3", "select_item(2)", "Transition"),
        ("4", "select_item(3)", "Practice"),
        ("5", "select_item(4)", "Simulator"),
        ("6", "select_item(5)", "Artifacts"),
        ("7", "select_item(6)", "Glossary"),
        ("8", "select_item(7)", "Quick Ref"),
        ("9", "select_item(8)", "Sources"),
    ]
    
    MENU_ITEMS = [
        (1, "📖 Lessons", "Learn AI-DLC phases, principles & rituals", "lesson", True),
        (2, "⚖️ Compare", "Waterfall vs Agile vs AI-DLC", "methodology-comparison", True),
        (3, "🔄 Transition", "Agile→AI-DLC migration guide", "transition-mapping", True),
        (4, "🎯 Practice", "Quiz & Gatekeeper scenarios", "practice", True),
        (5, "🔬 Simulator", "Simulate adaptive AI-DLC workflows", "simulator", True),
        (6, "📁 Artifacts", "Explore aidlc-docs/ structure", "artifact-explorer", True),
        (7, "📚 Glossary", "37 AI-DLC terms & definitions", "glossary", True),
        (8, "📋 Quick Ref", "Single-screen cheat sheet", "quick-reference", True),
        (9, "🔗 Sources", "View official reference sources", "sources", True),
    ]
    
    ACHIEVEMENT_NAMES = {
        "first-steps": "🎓 First Steps",
        "scholar": "📚 Scholar",
        "quiz-master": "🎯 Quiz Master",
        "perfect-score": "⭐ Perfect Score",
        "gatekeeper": "🚧 Gatekeeper",
        "simulator-explorer": "🔬 Explorer",
        "completionist": "🏆 Completionist",
    }
    
    def __init__(self) -> None:
        super().__init__(title="Home")
        self.state = StateManager()
    
    def compose_content(self) -> ComposeResult:
        with Horizontal(id="main-container"):
            # Menu panel (left)
            with Vertical(id="menu-panel"):
                yield Static(WELCOME_BANNER, id="welcome")
                yield Static("Select a topic to explore:", id="menu-title")
                
                with ListView(id="menu"):
                    for num, title, desc, screen_id, enabled in self.MENU_ITEMS:
                        yield MenuItem(num, title, desc, screen_id, enabled)
            
            # Progress panel (right)
            with Vertical(id="progress-panel"):
                yield Static("── Your Progress ──", classes="progress-title")
                yield Static("", id="progress-content")
    
    def on_mount(self) -> None:
        """Update progress display on mount."""
        self._update_progress()
    
    def _update_progress(self) -> None:
        """Update the progress panel content."""
        progress = self.state.get_overall_progress()
        achievements = self.state.get_achievements()
        
        lines = []
        
        # XP and Level (gamification)
        gam = progress.get("gamification", {})
        xp = gam.get("xp", 0)
        level = gam.get("level", 1)
        title = gam.get("title", "Novice")
        xp_to_next = gam.get("xp_to_next", 0)
        
        lines.append(f"⭐ Level {level}: {title}")
        lines.append(f"   XP: {xp}")
        if xp_to_next > 0:
            lines.append(f"   Next level: {xp_to_next} XP")
        lines.append("")
        
        # Overall progress
        overall = progress["overall_percent"]
        bar = self._make_bar(overall)
        lines.append(f"Overall: {bar} {overall:.0f}%")
        lines.append("")
        
        # Lessons
        l = progress["lessons"]
        bar = self._make_bar(l["percent"])
        lines.append(f"📖 Lessons:    {l['completed']}/{l['total']}")
        lines.append(f"   {bar}")
        lines.append("")
        
        # Quiz
        q = progress["quiz"]
        bar = self._make_bar(q["percent"])
        lines.append(f"❓ Quiz:       {q['score']}/{q['total']}")
        lines.append(f"   {bar}")
        if q["attempts"] > 0:
            lines.append(f"   Attempts: {q['attempts']}")
        lines.append("")
        
        # Gatekeeper
        g = progress["gatekeeper"]
        bar = self._make_bar(g["percent"])
        lines.append(f"🚧 Gatekeeper: {g['score']}/{g['total']}")
        lines.append(f"   {bar}")
        lines.append("")
        
        # Simulator
        s = progress["simulator"]
        bar = self._make_bar(s["percent"])
        lines.append(f"🔬 Simulator:  {s['types_explored']}/4 types")
        lines.append(f"   {bar}")
        lines.append(f"   Runs: {s['runs']}")
        lines.append("")
        
        # Achievements
        lines.append("── Achievements ──")
        ach_count = progress["achievements"]["unlocked"]
        ach_total = progress["achievements"]["total"]
        lines.append(f"🏆 {ach_count}/{ach_total} unlocked")
        lines.append("")
        
        if achievements["unlocked"]:
            for ach_id in achievements["unlocked"]:
                name = self.ACHIEVEMENT_NAMES.get(ach_id, ach_id)
                lines.append(f"  {name}")
        else:
            lines.append("  Complete activities to")
            lines.append("  unlock achievements!")
        
        content = self.query_one("#progress-content", Static)
        content.update("\n".join(lines))
    
    def _make_bar(self, percent: float, width: int = 15) -> str:
        """Create a text progress bar."""
        filled = int((percent / 100) * width)
        empty = width - filled
        return f"[{'█' * filled}{'░' * empty}]"
    
    def on_list_view_selected(self, event: ListView.Selected) -> None:
        """Handle menu item selection."""
        if isinstance(event.item, MenuItem):
            if event.item.enabled:
                self._navigate_to(event.item.screen_id, event.item.title)
            else:
                self.notify(f"'{event.item.title}' coming in future updates!", title="Coming Soon")
    
    def action_select_item(self, index: int) -> None:
        """Select menu item by index (0-based)."""
        if 0 <= index < len(self.MENU_ITEMS):
            _, title, _, screen_id, enabled = self.MENU_ITEMS[index]
            if enabled:
                self._navigate_to(screen_id, title)
            else:
                self.notify(f"'{title}' coming in future updates!", title="Coming Soon")
    
    def _navigate_to(self, screen_id: str, title: str) -> None:
        """Navigate to a screen."""
        if screen_id == "lesson":
            # Go to lessons picker instead of directly to a lesson
            self.app.navigate_to("lessons", "Lessons")
        else:
            self.app.navigate_to(screen_id, title)
