"""Glossary screen for AI-DLC terminology."""

from textual.app import ComposeResult
from textual.containers import Horizontal, Vertical, VerticalScroll
from textual.widgets import Input, ListView, ListItem, Static, Label
from textual.binding import Binding

from aidlc_explainer.screens.base import ExplorerScreen
from aidlc_explainer.content.glossary import (
    get_all_terms,
    get_term_by_id,
    search_terms,
    GlossaryTerm,
)


class TermItem(ListItem):
    """A glossary term list item."""
    
    def __init__(self, term: GlossaryTerm) -> None:
        super().__init__()
        self.term = term
    
    def compose(self) -> ComposeResult:
        yield Static(f"  {self.term.term}")


class GlossaryScreen(ExplorerScreen):
    """Screen for browsing AI-DLC terminology."""
    
    BINDINGS = [
        Binding("escape", "go_back", "Back"),
        Binding("/", "focus_search", "Search"),
        Binding("up", "cursor_up", "Up", show=False),
        Binding("down", "cursor_down", "Down", show=False),
    ]
    
    DEFAULT_CSS = """
    GlossaryScreen {
        height: 100%;
    }
    
    GlossaryScreen #glossary-container {
        layout: horizontal;
        height: 1fr;
        min-height: 20;
    }
    
    GlossaryScreen #term-list-panel {
        width: 35%;
        height: 100%;
        border: round $primary;
        padding: 0 1;
    }
    
    GlossaryScreen #term-detail-panel {
        width: 65%;
        height: 100%;
        border: round $secondary;
        padding: 1;
    }
    
    GlossaryScreen #search-input {
        dock: top;
        margin: 0 0 1 0;
    }
    
    GlossaryScreen #term-list {
        height: 1fr;
        min-height: 10;
    }
    
    GlossaryScreen .panel-title {
        text-style: bold;
        color: $primary-lighten-2;
        margin-bottom: 1;
    }
    
    GlossaryScreen .term-title {
        text-style: bold;
        color: $success;
        text-align: center;
        margin-bottom: 1;
    }
    
    GlossaryScreen .section-header {
        text-style: bold;
        color: $secondary;
        margin-top: 1;
    }
    
    GlossaryScreen .definition-text {
        margin: 0 0 1 2;
    }
    
    GlossaryScreen .example-text {
        color: $text-muted;
        margin: 0 0 1 2;
    }
    
    GlossaryScreen .related-text {
        color: $accent;
        margin: 0 0 1 2;
    }
    
    GlossaryScreen .source-text {
        color: $warning;
        margin: 0 0 0 2;
    }
    
    GlossaryScreen .count-text {
        color: $text-muted;
        text-align: center;
    }
    """
    
    def __init__(self) -> None:
        super().__init__(title="Glossary")
        self.all_terms = sorted(get_all_terms(), key=lambda t: t.term.lower())
        self.filtered_terms = self.all_terms.copy()
        self.selected_term: GlossaryTerm | None = None
    
    def compose_content(self) -> ComposeResult:
        with Horizontal(id="glossary-container"):
            # Term list panel (left)
            with Vertical(id="term-list-panel"):
                yield Static("── AI-DLC Glossary ──", classes="panel-title")
                yield Input(placeholder="Type to filter...", id="search-input")
                yield Static(f"{len(self.all_terms)} terms", id="term-count", classes="count-text")
                with VerticalScroll():
                    with ListView(id="term-list"):
                        for term in self.filtered_terms:
                            yield TermItem(term)
            
            # Term detail panel (right)
            with VerticalScroll(id="term-detail-panel"):
                yield Static("Select a term to view details", id="term-detail")
    
    def on_mount(self) -> None:
        """Select first term on mount."""
        if self.filtered_terms:
            self.selected_term = self.filtered_terms[0]
            self._update_detail()
            term_list = self.query_one("#term-list", ListView)
            term_list.index = 0
    
    def on_input_changed(self, event: Input.Changed) -> None:
        """Handle search input changes."""
        query = event.value.strip()
        if query:
            self.filtered_terms = search_terms(query)
        else:
            self.filtered_terms = self.all_terms.copy()
        
        # Update count
        count = self.query_one("#term-count", Static)
        count.update(f"{len(self.filtered_terms)} terms")
        
        # Rebuild list
        self._rebuild_term_list()
    
    def _rebuild_term_list(self) -> None:
        """Rebuild the term list with filtered results."""
        term_list = self.query_one("#term-list", ListView)
        term_list.clear()
        for term in self.filtered_terms:
            term_list.append(TermItem(term))
        
        # Select first if available
        if self.filtered_terms:
            self.selected_term = self.filtered_terms[0]
            self._update_detail()
            term_list.index = 0
        else:
            self.selected_term = None
            detail = self.query_one("#term-detail", Static)
            detail.update("No matching terms found.")
    
    def on_list_view_selected(self, event: ListView.Selected) -> None:
        """Handle term selection."""
        if isinstance(event.item, TermItem):
            self.selected_term = event.item.term
            self._update_detail()
    
    def _update_detail(self) -> None:
        """Update the detail panel with selected term."""
        detail = self.query_one("#term-detail", Static)
        
        if not self.selected_term:
            detail.update("Select a term to view details")
            return
        
        term = self.selected_term
        lines = []
        
        # Title
        lines.append(f"╭{'─' * 50}╮")
        lines.append(f"│  {term.term.center(46)}  │")
        lines.append(f"╰{'─' * 50}╯")
        lines.append("")
        
        # Definition
        lines.append("── Definition ──")
        lines.append("")
        # Word wrap definition
        words = term.definition.split()
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
        
        # Example
        lines.append("── Example ──")
        lines.append("")
        lines.append(f"  💡 {term.example}")
        lines.append("")
        
        # Related terms
        lines.append("── Related Terms ──")
        lines.append("")
        related = ", ".join(term.related)
        lines.append(f"  🔗 {related}")
        lines.append("")
        
        # Source
        lines.append("── Source ──")
        lines.append("")
        lines.append(f"  📄 {term.source}")
        
        detail.update("\n".join(lines))
    
    def action_focus_search(self) -> None:
        """Focus the search input."""
        search = self.query_one("#search-input", Input)
        search.focus()
    
    def action_cursor_up(self) -> None:
        """Move cursor up in term list."""
        term_list = self.query_one("#term-list", ListView)
        if term_list.index is not None and term_list.index > 0:
            term_list.index -= 1
    
    def action_cursor_down(self) -> None:
        """Move cursor down in term list."""
        term_list = self.query_one("#term-list", ListView)
        if term_list.index is not None and term_list.index < len(self.filtered_terms) - 1:
            term_list.index += 1
