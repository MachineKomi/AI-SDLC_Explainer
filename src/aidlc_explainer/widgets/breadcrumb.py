"""Breadcrumb widget showing navigation path."""

from textual.app import ComposeResult
from textual.widgets import Static


class Breadcrumb(Static):
    """Widget displaying the current navigation breadcrumb trail."""
    
    DEFAULT_CSS = """
    Breadcrumb {
        height: 1;
        background: $surface;
        color: $text-muted;
        padding: 0 1;
    }
    """
    
    def __init__(self, path: str = "Home", **kwargs) -> None:
        """Initialize breadcrumb with path.
        
        Args:
            path: The breadcrumb path string (e.g., "Home > Phases > Inception")
            **kwargs: Additional arguments passed to Static
        """
        super().__init__(path, **kwargs)
        self._path = path
    
    def update_path(self, path: str) -> None:
        """Update the breadcrumb path.
        
        Args:
            path: New breadcrumb path string
        """
        self._path = path
        self.update(path)
    
    @property
    def path(self) -> str:
        """Get the current breadcrumb path."""
        return self._path
