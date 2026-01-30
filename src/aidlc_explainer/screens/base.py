"""Base screen class for all content screens."""

from textual.app import ComposeResult
from textual.containers import Container
from textual.screen import Screen
from textual.widgets import Footer, Header

from aidlc_explainer.widgets import Breadcrumb


class ExplorerScreen(Screen):
    """Base class for all content exploration screens.
    
    Provides common layout with header, breadcrumb, content area, and footer.
    Subclasses should override `compose_content()` to add screen-specific content.
    """
    
    DEFAULT_CSS = """
    ExplorerScreen {
        layout: grid;
        grid-size: 1;
        grid-rows: auto auto 1fr auto;
    }
    
    ExplorerScreen > Container {
        width: 100%;
        height: 100%;
    }
    """
    
    BINDINGS = [
        ("escape", "go_back", "Back"),
        ("q", "quit", "Quit"),
        ("question_mark", "show_help", "Help"),
    ]
    
    def __init__(self, title: str = "Screen", **kwargs) -> None:
        """Initialize the screen.
        
        Args:
            title: Screen title for breadcrumb
            **kwargs: Additional arguments passed to Screen
        """
        super().__init__(**kwargs)
        self._title = title
    
    def compose(self) -> ComposeResult:
        """Compose the screen layout."""
        yield Header()
        yield Breadcrumb(self._get_breadcrumb())
        with Container(id="content"):
            yield from self.compose_content()
        yield Footer()
    
    def compose_content(self) -> ComposeResult:
        """Compose screen-specific content. Override in subclasses."""
        yield from []
    
    def _get_breadcrumb(self) -> str:
        """Get breadcrumb string from app navigation stack."""
        try:
            return self.app.nav.breadcrumb_str()
        except AttributeError:
            return self._title
    
    def action_go_back(self) -> None:
        """Handle back navigation."""
        try:
            self.app.go_back()
        except AttributeError:
            pass
    
    def action_show_help(self) -> None:
        """Show help overlay."""
        try:
            self.app.action_show_help()
        except AttributeError:
            pass
    
    def action_quit(self) -> None:
        """Quit the application."""
        self.app.exit()
