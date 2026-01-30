# AI-SDLC Explainer

An interactive TUI learning tool that teaches the AI-Driven Development Lifecycle (AI-DLC) methodology.

## Features

- **Interactive TUI**: Keyboard-driven navigation with vim-style keybindings
- **Complete Lesson**: AI-DLC Overview covering phases, gates, artifacts, and roles
- **ASCII Diagrams**: Visual representations that work in any terminal
- **Screenshot Mode**: Stable output for recordings and documentation
- **Offline**: All content bundled, no network required

## Quick Start

```bash
# Install
pip install -e .

# Run
python -m aidlc_explainer

# Run in screenshot mode (stable output)
python -m aidlc_explainer --screenshot-mode
```

## Requirements

- Python 3.11+
- No admin privileges required

## Navigation

| Key | Action |
|-----|--------|
| `↑`/`k` | Move up |
| `↓`/`j` | Move down |
| `Enter` | Select |
| `←`/`Esc` | Go back |
| `→` | Next (in lessons) |
| `?` | Help |
| `q` | Quit |

## Development

```bash
# Install with dev dependencies
pip install -e ".[dev]"

# Run linter
ruff check src/

# Run tests
pytest
```

## Content Sources

All educational content is grounded in authoritative sources:
- [AWS AI-DLC Blog](https://aws.amazon.com/blogs/devops/ai-driven-development-life-cycle/)
- [AWS AI-DLC Workflows](https://github.com/awslabs/aidlc-workflows)
- AI-SDLC Best Practices Synthesis Document

## License

MIT
