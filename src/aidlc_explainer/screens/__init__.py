"""Screen definitions for the AI-SDLC Explainer TUI."""

from aidlc_explainer.screens.base import ExplorerScreen
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

__all__ = [
    "ExplorerScreen",
    "HomeScreen", 
    "LessonScreen",
    "LessonsScreen",
    "PracticeScreen",
    "SourcesScreen",
    "SimulatorScreen",
    "SimulationViewScreen",
    "GlossaryScreen",
    "QuickReferenceScreen",
    "ArtifactExplorerScreen",
    "SearchScreen",
    "MethodologyComparisonScreen",
    "TransitionMappingScreen",
    "InteractiveSimulatorScreen",
]
