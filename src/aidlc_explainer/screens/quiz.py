"""Quiz screen for multiple-choice questions with mouse support and randomization."""

import json
import random
from pathlib import Path
from typing import Any

from textual.app import ComposeResult
from textual.binding import Binding
from textual.containers import Vertical, Horizontal, ScrollableContainer
from textual.widgets import Static, Button
from textual.message import Message

from aidlc_explainer.screens.base import ExplorerScreen


class OptionButton(Button):
    """A clickable quiz option button."""
    
    class Selected(Message):
        """Message when an option is selected."""
        def __init__(self, original_index: int) -> None:
            super().__init__()
            self.original_index = original_index
    
    def __init__(self, label: str, text: str, original_index: int, **kwargs) -> None:
        super().__init__(f"[{label}]  {text}", **kwargs)
        self.original_index = original_index
        self.label = label


def load_quiz() -> dict[str, Any]:
    """Load quiz data from JSON file."""
    quiz_path = Path(__file__).parent.parent / "content" / "practice" / "quiz.json"
    with open(quiz_path, "r", encoding="utf-8") as f:
        return json.load(f)


class QuizScreen(ExplorerScreen):
    """Screen for taking the quiz with mouse support and randomized answers."""
    
    DEFAULT_CSS = """
    QuizScreen {
        height: 100%;
    }
    
    QuizScreen #quiz-scroll {
        height: 1fr;
        padding: 0 2;
    }
    
    QuizScreen #question-box {
        border: round $primary;
        padding: 1 2;
        margin: 0 0 1 0;
        background: $surface;
        height: auto;
    }
    
    QuizScreen #question-title {
        text-style: bold;
        color: $primary-lighten-2;
        margin-bottom: 1;
    }
    
    QuizScreen #question-text {
        margin: 1 0;
    }
    
    QuizScreen #options-container {
        margin: 1 0;
        height: auto;
    }
    
    QuizScreen .option-btn {
        width: 100%;
        margin: 0 0 1 0;
        height: auto;
        min-height: 3;
        text-align: left;
        padding: 0 2;
    }
    
    QuizScreen .option-btn:hover {
        background: $primary 30%;
    }
    
    QuizScreen .option-btn:focus {
        background: $primary 40%;
    }
    
    QuizScreen .option-correct {
        background: $success 40%;
        color: $success-lighten-2;
    }
    
    QuizScreen .option-wrong {
        background: $error 40%;
        color: $error-lighten-2;
    }
    
    QuizScreen .option-selected {
        background: $primary 50%;
    }
    
    QuizScreen #feedback-box {
        border: round $secondary;
        padding: 1;
        margin: 1 0;
        background: $surface;
        height: auto;
    }
    
    QuizScreen #progress-bar {
        text-align: center;
        margin: 1 0;
        color: $text-muted;
    }
    
    QuizScreen #nav-buttons {
        margin: 1 0;
        height: auto;
    }
    
    QuizScreen #nav-buttons Button {
        margin: 0 1 0 0;
    }
    
    QuizScreen #score-box {
        border: double $primary;
        padding: 2;
        margin: 1 2;
        background: $surface;
        text-align: center;
        height: auto;
    }
    
    QuizScreen #results-buttons {
        margin: 1 0;
        height: auto;
    }
    
    QuizScreen #results-buttons Button {
        margin: 0 1 0 0;
    }
    """
    
    BINDINGS = [
        Binding("a", "select_option(0)", "A", show=True),
        Binding("b", "select_option(1)", "B", show=True),
        Binding("c", "select_option(2)", "C", show=True),
        Binding("d", "select_option(3)", "D", show=True),
        Binding("1", "select_option(0)", "1", show=False),
        Binding("2", "select_option(1)", "2", show=False),
        Binding("3", "select_option(2)", "3", show=False),
        Binding("4", "select_option(3)", "4", show=False),
        Binding("enter", "next_question", "Next", show=True),
        Binding("right", "next_question", "Next", show=False),
        Binding("r", "restart", "Restart", show=False),
        Binding("m", "review_mistakes", "Review", show=False),
    ]
    
    def __init__(self) -> None:
        super().__init__(title="Quiz")
        self.quiz_data = load_quiz()
        self.questions = self.quiz_data["questions"]
        self.current_index = 0
        self.score = 0
        self.answered = False
        self.selected_option: int | None = None  # Original index of selected option
        self.mistakes: list[str] = []
        self.showing_results = False
        self.review_mode = False
        self.review_indices: list[int] = []
        
        # Shuffled options for current question: list of (original_index, option_text)
        self.shuffled_options: list[tuple[int, str]] = []
    
    def compose_content(self) -> ComposeResult:
        """Initial compose - create scrollable container."""
        with ScrollableContainer(id="quiz-scroll"):
            yield Static("", id="quiz-display")
    
    def on_mount(self) -> None:
        """Initialize display after mount."""
        self._shuffle_current_options()
        self._refresh_display()
    
    def _shuffle_current_options(self) -> None:
        """Shuffle options for the current question."""
        if self.current_index >= len(self.questions):
            return
        
        q = self.questions[self.current_index]
        options = q['options']
        
        # Create list of (original_index, option_text) and shuffle
        indexed_options = list(enumerate(options))
        random.shuffle(indexed_options)
        self.shuffled_options = indexed_options
    
    def _get_display_index_for_original(self, original_index: int) -> int:
        """Get the display position for an original option index."""
        for display_idx, (orig_idx, _) in enumerate(self.shuffled_options):
            if orig_idx == original_index:
                return display_idx
        return -1
    
    def _refresh_display(self) -> None:
        """Refresh the screen content."""
        try:
            scroll = self.query_one("#quiz-scroll", ScrollableContainer)
            scroll.remove_children()
            
            if self.showing_results:
                for widget in self._compose_results():
                    scroll.mount(widget)
            else:
                for widget in self._compose_question():
                    scroll.mount(widget)
        except Exception:
            pass
    
    def _compose_question(self) -> list:
        """Compose question widgets."""
        widgets = []
        q = self.questions[self.current_index]
        labels = ['A', 'B', 'C', 'D']
        
        # Question box
        question_box = Vertical(id="question-box")
        widgets.append(question_box)
        
        # We'll mount children after
        title = Static(f"Question {self.current_index + 1} of {len(self.questions)}", id="question-title")
        text = Static(q['prompt'], id="question-text")
        
        # Options container
        options_container = Vertical(id="options-container")
        
        # Create option buttons with shuffled order
        for display_idx, (original_idx, option_text) in enumerate(self.shuffled_options):
            if display_idx >= len(labels):
                break
            
            label = labels[display_idx]
            btn = OptionButton(
                label=label,
                text=option_text,
                original_index=original_idx,
                id=f"option-{display_idx}",
                classes="option-btn",
                variant="default"
            )
            
            # Apply styling based on answer state
            if self.answered:
                correct_original = q['correct']
                if original_idx == correct_original:
                    btn.add_class("option-correct")
                elif original_idx == self.selected_option:
                    btn.add_class("option-wrong")
                btn.disabled = True
            
            options_container.mount(btn)
        
        question_box.mount(title)
        question_box.mount(text)
        question_box.mount(options_container)
        
        # Feedback box (if answered)
        if self.answered:
            feedback_box = Vertical(id="feedback-box")
            widgets.append(feedback_box)
            
            correct_original = q['correct']
            is_correct = self.selected_option == correct_original
            result = "✓ Correct!" if is_correct else "✗ Incorrect"
            
            feedback_box.mount(Static(result, classes="feedback-result"))
            feedback_box.mount(Static(""))
            feedback_box.mount(Static(q['explanation']))
            feedback_box.mount(Static(""))
            feedback_box.mount(Static(f"📚 Source: {q['sources']['local'][0]}"))
        
        # Progress bar
        current = self.current_index + 1
        total = len(self.questions)
        bar_width = 30
        filled = int((current / total) * bar_width)
        bar = "█" * filled + "░" * (bar_width - filled)
        
        hint = "Press Enter or → for next" if self.answered else "Click an option or press A-D"
        progress = Static(f"[{bar}] {current}/{total} │ {hint}", id="progress-bar")
        widgets.append(progress)
        
        # Navigation buttons
        nav = Horizontal(id="nav-buttons")
        widgets.append(nav)
        
        if self.answered:
            if self.current_index < len(self.questions) - 1:
                nav.mount(Button("Next Question →", id="next-btn", variant="primary"))
            else:
                nav.mount(Button("See Results →", id="next-btn", variant="success"))
        
        return widgets
    
    def _compose_results(self) -> list:
        """Compose results widgets."""
        widgets = []
        total = len(self.questions)
        pct = int((self.score / total) * 100)
        
        if pct >= 90:
            grade = "🎉 Excellent!"
            grade_msg = "You've mastered AI-DLC concepts!"
        elif pct >= 70:
            grade = "👍 Good job!"
            grade_msg = "Solid understanding of AI-DLC."
        elif pct >= 50:
            grade = "📚 Keep learning!"
            grade_msg = "Review the lessons and try again."
        else:
            grade = "💪 Don't give up!"
            grade_msg = "Start with the lessons to build your knowledge."
        
        score_box = Vertical(id="score-box")
        widgets.append(score_box)
        
        score_box.mount(Static(f"╭─ Quiz Complete {'─' * 40}╮"))
        score_box.mount(Static(""))
        score_box.mount(Static(f"Score: {self.score}/{total} ({pct}%)"))
        score_box.mount(Static(""))
        score_box.mount(Static(grade))
        score_box.mount(Static(grade_msg))
        score_box.mount(Static(""))
        
        if self.mistakes:
            score_box.mount(Static(f"Missed {len(self.mistakes)} question(s)"))
        else:
            score_box.mount(Static("Perfect score! 🌟"))
        
        score_box.mount(Static(""))
        score_box.mount(Static(f"╰{'─' * 55}╯"))
        
        # Results buttons
        buttons = Horizontal(id="results-buttons")
        widgets.append(buttons)
        
        buttons.mount(Button("[R] Restart Quiz", id="restart-btn", variant="primary"))
        if self.mistakes:
            buttons.mount(Button("[M] Review Mistakes", id="review-btn", variant="warning"))
        buttons.mount(Button("[Esc] Back to Menu", id="back-btn", variant="default"))
        
        return widgets
    
    def on_button_pressed(self, event: Button.Pressed) -> None:
        """Handle button presses."""
        if event.button.id == "next-btn":
            self.action_next_question()
        elif event.button.id == "restart-btn":
            self.action_restart()
        elif event.button.id == "review-btn":
            self.action_review_mistakes()
        elif event.button.id == "back-btn":
            self.action_go_back()
        elif event.button.id and event.button.id.startswith("option-"):
            # Option button clicked
            if isinstance(event.button, OptionButton):
                self._select_option(event.button.original_index)
    
    def action_select_option(self, display_index: int) -> None:
        """Handle keyboard option selection by display index."""
        if self.answered or self.showing_results:
            return
        
        if display_index < 0 or display_index >= len(self.shuffled_options):
            return
        
        # Get the original index from shuffled options
        original_index = self.shuffled_options[display_index][0]
        self._select_option(original_index)
    
    def _select_option(self, original_index: int) -> None:
        """Process option selection by original index."""
        if self.answered or self.showing_results:
            return
        
        q = self.questions[self.current_index]
        
        # Bounds check
        if original_index < 0 or original_index >= len(q['options']):
            return
        
        self.selected_option = original_index
        self.answered = True
        
        if original_index == q['correct']:
            self.score += 1
        else:
            self.mistakes.append(q['id'])
        
        self._refresh_display()
    
    def action_next_question(self) -> None:
        """Move to next question or show results."""
        if self.showing_results:
            return
        
        if not self.answered:
            return
        
        self.current_index += 1
        self.answered = False
        self.selected_option = None
        
        if self.current_index >= len(self.questions):
            self._save_results()
            self.showing_results = True
        else:
            self._shuffle_current_options()
        
        self._refresh_display()
    
    def action_restart(self) -> None:
        """Restart the quiz."""
        self.current_index = 0
        self.score = 0
        self.answered = False
        self.selected_option = None
        self.mistakes = []
        self.showing_results = False
        self.review_mode = False
        self._shuffle_current_options()
        self._refresh_display()
    
    def action_review_mistakes(self) -> None:
        """Review missed questions."""
        if not self.showing_results or not self.mistakes:
            return
        
        # Filter to only mistake questions
        self.review_indices = [
            i for i, q in enumerate(self.questions) 
            if q['id'] in self.mistakes
        ]
        if self.review_indices:
            self.current_index = self.review_indices[0]
            self.showing_results = False
            self.answered = False
            self.review_mode = True
            self._shuffle_current_options()
            self._refresh_display()
    
    def _save_results(self) -> None:
        """Save quiz results to state."""
        try:
            from aidlc_explainer.state import StateManager
            state = StateManager()
            state.save_quiz_result(self.score, len(self.questions), self.mistakes)
        except Exception:
            pass
