"""Search screen for finding content across the application."""

from dataclasses import dataclass
from textual.app import ComposeResult
from textual.containers import Vertical, VerticalScroll
from textual.widgets import Input, ListView, ListItem, Static
from textual.binding import Binding

from aidlc_explainer.screens.base import ExplorerScreen
from aidlc_explainer.content import get_all_lessons, load_lesson
from aidlc_explainer.content.glossary import get_all_terms


@dataclass
class SearchResult:
    """A search result item."""
    title: str
    type: str
    preview: str
    target_screen: str
    context: dict


class SearchResultItem(ListItem):
    """A search result list item."""
    
    def __init__(self, result: SearchResult) -> None:
        super().__init__()
        self.result = result
    
    def compose(self) -> ComposeResult:
        type_icons = {
            "lesson": "📖",
            "section": "📄",
            "glossary": "📚",
            "artifact": "📁",
        }
        icon = type_icons.get(self.result.type, "•")
        yield Static(f"  {icon} {self.result.title}")
        yield Static(f"     {self.result.preview[:60]}...", classes="preview")


class SearchScreen(ExplorerScreen):
    """Screen for searching content."""
    
    BINDINGS = [
        Binding("escape", "go_back", "Back"),
        Binding("enter", "select_result", "Select"),
    ]
    
    DEFAULT_CSS = """
    SearchScreen #search-container {
        height: 100%;
        padding: 1 2;
    }
    
    SearchScreen #search-input {
        dock: top;
        margin-bottom: 1;
    }
    
    SearchScreen #results-count {
        dock: top;
        height: 1;
        color: $text-muted;
        margin-bottom: 1;
    }
    
    SearchScreen #results-list {
        height: 100%;
    }
    
    SearchScreen .preview {
        color: $text-muted;
    }
    
    SearchScreen .search-title {
        text-style: bold;
        color: $primary-lighten-2;
        margin-bottom: 1;
    }
    
    SearchScreen ListItem {
        height: auto;
        padding: 0 1;
    }
    
    SearchScreen ListItem:hover {
        background: $primary 20%;
    }
    
    SearchScreen ListItem.-selected {
        background: $primary 40%;
    }
    """
    
    def __init__(self) -> None:
        super().__init__(title="Search")
        self.results: list[SearchResult] = []
        self._build_index()
    
    def _build_index(self) -> None:
        """Build search index from all content."""
        self.index: list[SearchResult] = []
        
        # Index lessons and sections
        for lesson_meta in get_all_lessons():
            lesson = load_lesson(lesson_meta["id"])
            
            # Add lesson itself
            self.index.append(SearchResult(
                title=lesson.title,
                type="lesson",
                preview=lesson.description,
                target_screen="lesson",
                context={"lesson_id": lesson.id},
            ))
            
            # Add each section
            for i, section in enumerate(lesson.sections):
                self.index.append(SearchResult(
                    title=f"{lesson.title} > {section.title}",
                    type="section",
                    preview=section.content[:100].replace("\n", " "),
                    target_screen="lesson",
                    context={"lesson_id": lesson.id, "section": i},
                ))
        
        # Index glossary terms
        for term in get_all_terms():
            self.index.append(SearchResult(
                title=term.term,
                type="glossary",
                preview=term.definition[:100],
                target_screen="glossary",
                context={"term_id": term.id},
            ))
    
    def compose_content(self) -> ComposeResult:
        with Vertical(id="search-container"):
            yield Static("🔍 Search AI-DLC Content", classes="search-title")
            yield Input(placeholder="Type to search lessons, glossary, artifacts...", id="search-input")
            yield Static("Type to search", id="results-count")
            with VerticalScroll():
                yield ListView(id="results-list")
    
    def on_mount(self) -> None:
        """Focus search input on mount."""
        self.query_one("#search-input", Input).focus()
    
    def on_input_changed(self, event: Input.Changed) -> None:
        """Handle search input changes."""
        query = event.value.strip().lower()
        
        if not query:
            self.results = []
            self._update_results()
            return
        
        # Search the index
        self.results = []
        for item in self.index:
            score = 0
            # Check title
            if query in item.title.lower():
                score += 10
            # Check preview
            if query in item.preview.lower():
                score += 5
            
            if score > 0:
                self.results.append((score, item))
        
        # Sort by score and extract results
        self.results = [item for _, item in sorted(self.results, key=lambda x: -x[0])][:20]
        self._update_results()
    
    def _update_results(self) -> None:
        """Update the results list."""
        count = self.query_one("#results-count", Static)
        results_list = self.query_one("#results-list", ListView)
        
        results_list.clear()
        
        if not self.results:
            count.update("No results found")
            return
        
        count.update(f"{len(self.results)} results found")
        
        for result in self.results:
            results_list.append(SearchResultItem(result))
    
    def on_list_view_selected(self, event: ListView.Selected) -> None:
        """Handle result selection."""
        if isinstance(event.item, SearchResultItem):
            result = event.item.result
            self.app.navigate_to(
                result.target_screen,
                result.title.split(" > ")[0],
                result.context,
            )
    
    def action_select_result(self) -> None:
        """Select the current result."""
        results_list = self.query_one("#results-list", ListView)
        if results_list.index is not None and results_list.index < len(self.results):
            result = self.results[results_list.index]
            self.app.navigate_to(
                result.target_screen,
                result.title.split(" > ")[0],
                result.context,
            )
