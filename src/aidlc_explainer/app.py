"""Main application class for the AI-SDLC Explainer TUI."""

from pathlib import Path

from textual.app import App
from textual.binding import Binding

from aidlc_explainer.navigation import NavigationStack
from aidlc_explainer.screens.home import HomeScreen
from aidlc_explainer.screens.lesson import LessonScreen
from aidlc_explainer.screens.lessons import LessonsScreen
from aidlc_explainer.screens.practice import PracticeScreen
from aidlc_explainer.screens.sources import SourcesScreen
from aidlc_explainer.screens.simulator import SimulatorScreen
from aidlc_explainer.screens.simulation_view import SimulationViewScreen
from aidlc_explainer.screens.glossary import GlossaryScreen
from aidlc_explainer.screens.quick_reference import QuickReferenceScreen
from aidlc_explainer.screens.artifact_explorer import ArtifactExplorerScreen
from aidlc_explainer.screens.search import SearchScreen
from aidlc_explainer.screens.methodology_comparison import MethodologyComparisonScreen
from aidlc_explainer.screens.transition_mapping import TransitionMappingScreen
from aidlc_explainer.screens.interactive_simulator import InteractiveSimulatorScreen
from aidlc_explainer.widgets.help_overlay import HelpOverlay


class AIDLCExplainerApp(App):
    """AI-SDLC Explainer TUI Application.
    
    An interactive learning tool for the AI-Driven Development Lifecycle (AI-DLC)
    methodology.
    """
    
    TITLE = "AI-SDLC Explainer"
    SUB_TITLE = "Interactive Learning Tool"
    
    CSS_PATH = Path(__file__).parent / "styles.tcss"
    
    BINDINGS = [
        Binding("q", "quit", "Quit", show=True, priority=True),
        Binding("question_mark", "show_help", "Help", show=True),
        Binding("escape", "go_back", "Back", show=True),
        Binding("slash", "show_search", "Search", show=True),
        Binding("g", "show_glossary", "Glossary"),
    ]
    
    def __init__(
        self,
        screenshot_mode: bool = False,
        theme: str = "dark",
    ) -> None:
        """Initialize the application.
        
        Args:
            screenshot_mode: If True, disable animations and use stable output
            theme: Color theme ("dark" or "light")
        """
        super().__init__()
        self.nav = NavigationStack()
        self.screenshot_mode = screenshot_mode
        self._theme_name = theme
        
        # Disable animations in screenshot mode
        if screenshot_mode:
            self.animation_level = "none"
    
    def on_mount(self) -> None:
        """Handle application mount - push initial screen."""
        self.nav.push("home", "Home")
        self.push_screen(HomeScreen())
    
    def action_show_help(self) -> None:
        """Show the help overlay."""
        self.push_screen(HelpOverlay())
    
    def action_show_search(self) -> None:
        """Show the search screen."""
        self.navigate_to("search", "Search")
    
    def action_show_glossary(self) -> None:
        """Show the glossary screen."""
        self.navigate_to("glossary", "Glossary")
    
    def action_quit(self) -> None:
        """Quit the application."""
        self.exit()
    
    def go_back(self) -> None:
        """Navigate back to the previous screen."""
        if len(self.nav) > 1:
            self.nav.pop()
            self.pop_screen()
    
    def action_go_back(self) -> None:
        """Action handler for back navigation."""
        self.go_back()
    
    def navigate_to(self, screen_id: str, title: str, context: dict | None = None) -> None:
        """Navigate to a new screen.
        
        Args:
            screen_id: Screen identifier
            title: Title for breadcrumb
            context: Optional context data
        """
        self.nav.push(screen_id, title, context)
        
        if screen_id == "lessons":
            self.push_screen(LessonsScreen())
        elif screen_id == "lesson":
            lesson_id = context.get("lesson_id") if context else "aidlc-overview"
            self.push_screen(LessonScreen(lesson_id))
        elif screen_id == "home":
            self.push_screen(HomeScreen())
        elif screen_id == "practice":
            self.push_screen(PracticeScreen())
        elif screen_id == "sources":
            self.push_screen(SourcesScreen())
        elif screen_id == "quiz":
            from aidlc_explainer.screens.quiz import QuizScreen
            self.push_screen(QuizScreen())
        elif screen_id == "gatekeeper":
            from aidlc_explainer.screens.gatekeeper import GatekeeperScreen
            self.push_screen(GatekeeperScreen())
        elif screen_id == "simulator":
            self.push_screen(SimulatorScreen())
        elif screen_id == "simulation-view":
            self.push_screen(SimulationViewScreen(context or {}))
        elif screen_id == "glossary":
            self.push_screen(GlossaryScreen())
        elif screen_id == "quick-reference":
            self.push_screen(QuickReferenceScreen())
        elif screen_id == "artifact-explorer":
            self.push_screen(ArtifactExplorerScreen())
        elif screen_id == "search":
            self.push_screen(SearchScreen())
        elif screen_id == "methodology-comparison":
            self.push_screen(MethodologyComparisonScreen())
        elif screen_id == "transition-mapping":
            self.push_screen(TransitionMappingScreen())
        elif screen_id == "interactive-simulator":
            request_type = context.get("request_type", "greenfield") if context else "greenfield"
            self.push_screen(InteractiveSimulatorScreen(request_type))
        else:
            self.notify(f"'{title}' coming in future updates!", title="Coming Soon")
            self.nav.pop()
