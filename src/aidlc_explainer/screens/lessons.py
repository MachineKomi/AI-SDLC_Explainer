"""Lessons picker screen for selecting which lesson to take."""

from textual.app import ComposeResult
from textual.widgets import Static, ListItem, ListView

from aidlc_explainer.screens.base import ExplorerScreen
from aidlc_explainer.content import get_all_lessons
from aidlc_explainer.state import StateManager


class LessonItem(ListItem):
    """A selectable lesson item."""
    
    def __init__(self, lesson_data: dict, index: int, completed: bool = False) -> None:
        super().__init__()
        self.lesson_data = lesson_data
        self.index = index
        self.completed = completed
    
    def compose(self) -> ComposeResult:
        num = self.index + 1
        title = self.lesson_data["title"]
        desc = self.lesson_data["description"]
        status = "✓" if self.completed else "○"
        yield Static(f"  [{num}] {status} {title:<25} {desc}")


class LessonsScreen(ExplorerScreen):
    """Screen for selecting a lesson to take."""
    
    DEFAULT_CSS = """
    LessonsScreen #lessons-intro {
        text-align: center;
        margin: 1 0;
    }
    
    LessonsScreen ListView {
        height: auto;
        margin: 1 4;
        background: $surface;
        border: solid $primary;
        padding: 1;
    }
    
    LessonsScreen ListView > ListItem {
        padding: 0 1;
    }
    
    LessonsScreen ListView > ListItem:hover {
        background: $primary 20%;
    }
    
    LessonsScreen ListView > ListItem.-selected {
        background: $primary 40%;
    }
    
    LessonsScreen #lessons-footer {
        text-align: center;
        color: $text-muted;
        margin: 1 0;
    }
    """
    
    BINDINGS = [
        ("1", "select_lesson(0)", "Lesson 1"),
        ("2", "select_lesson(1)", "Lesson 2"),
        ("3", "select_lesson(2)", "Lesson 3"),
    ]
    
    def __init__(self) -> None:
        super().__init__(title="Lessons")
        self.lessons = get_all_lessons()
        self.state = StateManager()
        self.completed_lessons: list[str] = []
    
    def on_mount(self) -> None:
        """Refresh completion status on mount."""
        self._refresh_completion_status()
    
    def on_screen_resume(self) -> None:
        """Refresh when returning to this screen."""
        self._refresh_completion_status()
        self._refresh_display()
    
    def _refresh_completion_status(self) -> None:
        """Refresh the list of completed lessons from state."""
        self.completed_lessons = self.state.get_lessons_stats()["completed"]
    
    def _refresh_display(self) -> None:
        """Refresh the entire display."""
        try:
            content = self.query_one("#content")
            content.remove_children()
            for widget in self.compose_content():
                content.mount(widget)
        except Exception:
            pass
    
    def compose_content(self) -> ComposeResult:
        # Refresh completion status before composing
        self._refresh_completion_status()
        
        completed_count = len(self.completed_lessons)
        total = len(self.lessons)
        
        yield Static(
            f"╭─ AI-DLC Lessons ─────────────────────────────────────────────────────────╮\n"
            f"│  Select a lesson to begin your learning journey.                        │\n"
            f"│  Progress: {completed_count}/{total} lessons completed                                       │\n"
            f"╰──────────────────────────────────────────────────────────────────────────╯",
            id="lessons-intro"
        )
        
        with ListView(id="lesson-list"):
            for i, lesson in enumerate(self.lessons):
                completed = lesson["id"] in self.completed_lessons
                yield LessonItem(lesson, i, completed)
        
        yield Static("Use number keys or Enter to select a lesson", id="lessons-footer")
    
    def on_list_view_selected(self, event: ListView.Selected) -> None:
        """Handle lesson selection."""
        if isinstance(event.item, LessonItem):
            lesson_id = event.item.lesson_data["id"]
            title = event.item.lesson_data["title"]
            self.app.navigate_to("lesson", title, {"lesson_id": lesson_id})
    
    def action_select_lesson(self, index: int) -> None:
        """Select lesson by index."""
        if 0 <= index < len(self.lessons):
            lesson = self.lessons[index]
            self.app.navigate_to("lesson", lesson["title"], {"lesson_id": lesson["id"]})
