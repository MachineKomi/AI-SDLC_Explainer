"""Help overlay modal showing keybindings and navigation guide."""

from textual.app import ComposeResult
from textual.containers import Container, Vertical
from textual.screen import ModalScreen
from textual.widgets import Static


HELP_TEXT = """\
╭─────────────────────────────────────────────────────────────────╮
│                    AI-SDLC Explainer Help                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  NAVIGATION                                                     │
│  ──────────                                                     │
│  ↑ / k        Move up                                           │
│  ↓ / j        Move down                                         │
│  Enter/Space  Select item                                       │
│  ← / h / Esc  Go back                                           │
│  → / l        Expand / Enter                                    │
│                                                                 │
│  QUICK ACCESS                                                   │
│  ────────────                                                   │
│  1-6          Jump to menu item                                 │
│  /            Search (when available)                           │
│                                                                 │
│  GENERAL                                                        │
│  ───────                                                        │
│  ?            Toggle this help                                  │
│  q            Quit application                                  │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│              Press any key to close this help                   │
╰─────────────────────────────────────────────────────────────────╯
"""


class HelpOverlay(ModalScreen[None]):
    """Modal screen showing help information."""
    
    DEFAULT_CSS = """
    HelpOverlay {
        align: center middle;
    }
    
    HelpOverlay > Container {
        width: 70;
        height: auto;
        background: $surface;
        border: solid $primary;
        padding: 0;
    }
    
    HelpOverlay Static {
        width: 100%;
        text-align: center;
    }
    """
    
    BINDINGS = [
        ("escape", "dismiss", "Close"),
        ("q", "dismiss", "Close"),
        ("?", "dismiss", "Close"),
    ]
    
    def compose(self) -> ComposeResult:
        """Compose the help overlay content."""
        with Container():
            yield Static(HELP_TEXT, id="help-content")
    
    def on_key(self, event) -> None:
        """Close on any key press."""
        self.dismiss()
