"""Lesson screen for displaying educational content."""

from textual.app import ComposeResult
from textual.binding import Binding
from textual.containers import Vertical, Horizontal, ScrollableContainer
from textual.widgets import Static, Button

from aidlc_explainer.screens.base import ExplorerScreen
from aidlc_explainer.content import load_lesson, Lesson, get_all_lessons
from aidlc_explainer.state import StateManager


class LessonScreen(ExplorerScreen):
    """Screen for displaying lesson content with sections."""
    
    DEFAULT_CSS = """
    LessonScreen {
        height: 100%;
    }
    
    LessonScreen #lesson-scroll {
        height: 1fr;
        margin: 0 2;
        min-height: 20;
        max-height: 100%;
    }
    
    LessonScreen #lesson-content {
        border: round $primary;
        padding: 1 2;
        background: $surface;
        height: auto;
        min-height: 15;
    }
    
    LessonScreen .section-title {
        text-style: bold;
        text-align: left;
        margin-bottom: 1;
        color: $primary-lighten-2;
    }
    
    LessonScreen .section-text {
        margin: 1 0;
    }
    
    LessonScreen .diagram-box {
        border: dashed $secondary;
        padding: 1;
        margin: 1 0;
        background: $surface-darken-1;
        color: $success;
    }
    
    LessonScreen #progress {
        text-align: center;
        height: auto;
        margin-top: 1;
        color: $text-muted;
        dock: bottom;
    }
    
    LessonScreen .nav-hint {
        text-align: center;
        color: $text-muted;
        margin-top: 1;
    }
    
    LessonScreen .lesson-body {
        height: auto;
    }
    
    LessonScreen #lesson-nav-buttons {
        margin: 1 0;
        height: auto;
    }
    
    LessonScreen #lesson-nav-buttons Button {
        margin: 0 1 0 0;
    }
    """
    
    BINDINGS = [
        Binding("left", "prev_section", "Previous", show=True),
        Binding("right", "next_section", "Next", show=True),
        Binding("h", "prev_section", "Previous", show=False),
        Binding("l", "next_section", "Next", show=False),
        Binding("home", "first_section", "First", show=False),
        Binding("end", "last_section", "Last", show=False),
    ]
    
    def __init__(self, lesson_id: str) -> None:
        self.lesson_id = lesson_id
        self.lesson: Lesson = load_lesson(lesson_id)
        self.current_section = 0
        self.state = StateManager()
        self.all_lessons = get_all_lessons()
        super().__init__(title=self.lesson.title)
    
    def on_mount(self) -> None:
        """Populate the lesson content after mount and track progress."""
        self.state.mark_lesson_started(self.lesson_id)
        self._refresh_content()
    def compose_content(self) -> ComposeResult:
        with ScrollableContainer(id="lesson-scroll"):
            yield Vertical(id="lesson-content")
        yield Horizontal(id="lesson-nav-buttons")
        yield Static("", id="progress")
    
    def _get_next_lesson_id(self) -> str | None:
        """Get the ID of the next lesson, if any."""
        for i, lesson in enumerate(self.all_lessons):
            if lesson["id"] == self.lesson_id:
                if i + 1 < len(self.all_lessons):
                    return self.all_lessons[i + 1]["id"]
        return None
    
    def _refresh_content(self) -> None:
        """Refresh all content for current section."""
        section = self.lesson.sections[self.current_section]
        content_container = self.query_one("#lesson-content", Vertical)
        
        # Build new content as a single string to avoid duplicate ID issues
        title_text = f"╭─ {section.title} {'─' * max(0, 60 - len(section.title))}╮"
        
        content_parts = [title_text, "", section.content]
        
        if section.diagram:
            content_parts.extend(["", "─" * 70, "", section.diagram])
        
        full_content = "\n".join(content_parts)
        
        # Remove all children and add single Static widget
        children = list(content_container.children)
        for child in children:
            child.remove()
        
        # Mount new content widget without ID to avoid conflicts
        content_container.mount(Static(full_content, classes="lesson-body"))
        
        # Update navigation buttons
        self._update_nav_buttons()
        
        # Update progress
        self._update_progress()
        
        # Scroll to top
        scroll = self.query_one("#lesson-scroll", ScrollableContainer)
        scroll.scroll_home(animate=False)
    
    def _update_nav_buttons(self) -> None:
        """Update navigation buttons based on current state."""
        try:
            nav = self.query_one("#lesson-nav-buttons", Horizontal)
            nav.remove_children()
            
            # Previous section button
            if self.current_section > 0:
                nav.mount(Button("← Previous Section", id="prev-section-btn", variant="default"))
            
            # Next section or completion buttons
            if self.current_section < len(self.lesson.sections) - 1:
                nav.mount(Button("Next Section →", id="next-section-btn", variant="primary"))
            else:
                # Last section - show completion options
                next_lesson_id = self._get_next_lesson_id()
                if next_lesson_id:
                    nav.mount(Button("Next Lesson →", id="next-lesson-btn", variant="success"))
                nav.mount(Button("Lessons Home", id="lessons-home-btn", variant="default"))
        except Exception:
            pass
    
    def on_button_pressed(self, event: Button.Pressed) -> None:
        """Handle button presses."""
        btn_id = event.button.id
        if btn_id == "prev-section-btn":
            self.action_prev_section()
        elif btn_id == "next-section-btn":
            self.action_next_section()
        elif btn_id == "next-lesson-btn":
            self._go_to_next_lesson()
        elif btn_id == "lessons-home-btn":
            self._go_to_lessons_home()
    
    def _go_to_next_lesson(self) -> None:
        """Navigate to the next lesson."""
        next_lesson_id = self._get_next_lesson_id()
        if next_lesson_id:
            # Mark current lesson as completed
            self.state.mark_lesson_completed(self.lesson_id)
            # Find the next lesson title
            for lesson in self.all_lessons:
                if lesson["id"] == next_lesson_id:
                    self.app.navigate_to("lesson", lesson["title"], {"lesson_id": next_lesson_id})
                    break
    
    def _go_to_lessons_home(self) -> None:
        """Navigate back to lessons list."""
        # Mark current lesson as completed if on last section
        if self.current_section == len(self.lesson.sections) - 1:
            self.state.mark_lesson_completed(self.lesson_id)
        self.app.navigate_to("lessons", "Lessons")
    
    def _update_progress(self) -> None:
        """Update the progress indicator."""
        progress = self.query_one("#progress", Static)
        current = self.current_section + 1
        total = len(self.lesson.sections)
        section = self.lesson.sections[self.current_section]
        
        # Create progress bar
        bar_width = 20
        filled = int((current / total) * bar_width)
        bar = "█" * filled + "░" * (bar_width - filled)
        
        progress_text = f"[{bar}] {current}/{total} │ {section.title} │ ←→ Navigate"
        progress.update(progress_text)
    
    def action_prev_section(self) -> None:
        """Go to previous section."""
        if self.current_section > 0:
            self.current_section -= 1
            self._update_breadcrumb()
            self._refresh_content()
        else:
            self.notify("This is the first section", severity="warning")
    
    def action_next_section(self) -> None:
        """Go to next section."""
        if self.current_section < len(self.lesson.sections) - 1:
            self.current_section += 1
            self.state.update_lesson_progress(self.lesson_id, self.current_section)
            self._update_breadcrumb()
            self._refresh_content()
        else:
            # Mark lesson as completed
            self.state.mark_lesson_completed(self.lesson_id)
            self.notify("🎉 Lesson complete! Press Esc to return.", title="Well Done!")
    
    def action_first_section(self) -> None:
        """Go to first section."""
        if self.current_section != 0:
            self.current_section = 0
            self._update_breadcrumb()
            self._refresh_content()
    
    def action_last_section(self) -> None:
        """Go to last section."""
        last = len(self.lesson.sections) - 1
        if self.current_section != last:
            self.current_section = last
            self._update_breadcrumb()
            self._refresh_content()
    
    def _update_breadcrumb(self) -> None:
        """Update the navigation breadcrumb."""
        section = self.lesson.sections[self.current_section]
        if hasattr(self.app, 'nav') and self.app.nav.current():
            self.app.nav._stack[-1].title = f"{self.lesson.title} > {section.title}"
