"""Sources screen showing local and upstream content sources."""

from textual.app import ComposeResult
from textual.containers import Vertical, VerticalScroll
from textual.widgets import Static

from aidlc_explainer.screens.base import ExplorerScreen


# Source data - local files and upstream URLs
LOCAL_SOURCES = [
    {
        "path": "AI-SDLC_best-practice_method_principles.md",
        "description": "Synthesis of AI-DLC methodology from AWS sources and practitioners",
        "sections": [
            "Core principles (10 non-negotiables)",
            "Reference lifecycle (phases, stages, gates)",
            "Artifact and state model",
            "Interaction patterns",
            "Roles and rituals",
        ],
    },
    {
        "path": "references/aidlc-docs/aidlc-method-definition.md",
        "description": "Full AI-DLC method definition paper (AWS official)",
        "sections": [
            "Principles (10 key concepts)",
            "Artifacts (Intent, Unit, Bolt, Designs)",
            "Phases and rituals (Mob Elaboration, Mob Construction)",
            "Workflows (greenfield and brownfield)",
            "Practice prompts (appendix)",
        ],
    },
    {
        "path": "references/aidlc-workflows/",
        "description": "AWS AI-DLC workflow rule definitions (awslabs)",
        "sections": [
            "Core workflow (adaptive stages)",
            "Inception stages (workspace, requirements, design)",
            "Construction stages (functional, NFR, infra, code, test)",
            "Common rules (depth, questions, validation)",
        ],
    },
    {
        "path": "references/aidlc-docs/prompts/",
        "description": "Structured AI-DLC prompts for different scenarios",
        "sections": [
            "greenfield-backend.md",
            "greenfield-frontend.md", 
            "brownfield-backend.md",
            "brownfield-frontend.md",
            "sys-prompt-aidlc-agent.md",
        ],
    },
]

UPSTREAM_SOURCES = [
    {
        "title": "AWS AI-DLC Blog",
        "url": "https://aws.amazon.com/blogs/devops/ai-driven-development-life-cycle/",
        "description": "Official AWS introduction to AI-DLC methodology",
    },
    {
        "title": "Building with AI-DLC (AWS)",
        "url": "https://aws.amazon.com/blogs/devops/building-with-ai-driven-development-life-cycle-ai-dlc-using-amazon-q-developer/",
        "description": "Practical guide to implementing AI-DLC with Amazon Q",
    },
    {
        "title": "AWS AI-DLC Workflows (GitHub)",
        "url": "https://github.com/awslabs/aidlc-workflows",
        "description": "Official AWS workflow definitions and rules",
    },
    {
        "title": "AWS MCP Servers",
        "url": "https://github.com/awslabs/mcp",
        "description": "Model Context Protocol servers for AI tooling",
    },
    {
        "title": "DeepWiki AI-DLC Documentation",
        "url": "https://deepwiki.com/awslabs/aidlc-workflows",
        "description": "Community documentation and analysis",
    },
]


class SourcesScreen(ExplorerScreen):
    """Screen showing content sources."""
    
    DEFAULT_CSS = """
    SourcesScreen {
        height: 100%;
    }
    
    SourcesScreen VerticalScroll {
        height: 1fr;
        min-height: 20;
        padding: 0 2;
    }
    
    SourcesScreen .source-section {
        border: round $primary;
        padding: 1;
        margin: 1 0;
        background: $surface;
        height: auto;
    }
    
    SourcesScreen .section-title {
        text-style: bold;
        color: $primary-lighten-2;
        margin-bottom: 1;
    }
    
    SourcesScreen .source-item {
        margin: 0 0 1 2;
    }
    
    SourcesScreen .source-path {
        color: $success;
    }
    
    SourcesScreen .source-url {
        color: $warning;
    }
    
    SourcesScreen .source-desc {
        color: $text-muted;
        margin-left: 2;
    }
    """
    
    def __init__(self) -> None:
        super().__init__(title="Sources")
    
    def compose_content(self) -> ComposeResult:
        with VerticalScroll():
            # Local sources section
            with Vertical(classes="source-section"):
                yield Static("╭─ Local Sources ─────────────────────────────────────────────────────╮", classes="section-title")
                yield Static("")
                
                for source in LOCAL_SOURCES:
                    yield Static(f"  • {source['path']}", classes="source-path")
                    yield Static(f"    {source['description']}", classes="source-desc")
                    yield Static("")
            
            # Upstream sources section
            with Vertical(classes="source-section"):
                yield Static("╭─ Upstream Sources (URLs) ───────────────────────────────────────────╮", classes="section-title")
                yield Static("")
                
                for source in UPSTREAM_SOURCES:
                    yield Static(f"  • {source['title']}", classes="source-url")
                    yield Static(f"    {source['url']}", classes="source-desc")
                    yield Static(f"    {source['description']}", classes="source-desc")
                    yield Static("")
            
            # Note about offline
            yield Static(
                "Note: All lesson content is derived from local source files.\n"
                "Upstream URLs are provided for reference only (no network required).",
                classes="source-desc"
            )
