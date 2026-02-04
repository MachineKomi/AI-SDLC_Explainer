# AI-SDLC Explainer

An interactive learning platform that teaches the **AI-Driven Software Development Lifecycle (AI-SDLC)** methodology through both a modern web application and a terminal-based TUI.

> **AI-SDLC** is an AI-native methodology that makes AI a central collaborator, redesigning workflows, roles, and iterations for faster decision-making, seamless task execution, and continuous adaptability.

## 🌐 Web Application

The primary learning experience is delivered through a Next.js web application featuring:

- **Interactive Lessons**: Comprehensive coverage of AI-SDLC phases, gates, artifacts, and roles
- **Mermaid Diagrams**: Clear, responsive flowcharts and visualizations
- **Practice Quizzes**: Test your knowledge with 26+ questions
- **Gatekeeper Scenarios**: Practice gate approval decisions with 10 scenarios
- **Workflow Simulator**: Interactive simulation of AI-SDLC workflows
- **Glossary**: Quick reference for 40+ AI-SDLC terms
- **Methodology Comparison**: See how AI-SDLC compares to Waterfall and Agile
- **Transition Guide**: Step-by-step guide for teams adopting AI-SDLC
- **Gamification System**: 
  - XP rewards for all learning activities
  - 8 progression levels (Novice → AI-SDLC Champion)
  - 7 unlockable achievements
  - Level-up celebrations with confetti
  - Achievement notifications
  - Progress dashboard on home page
- **Theme Support**: Dark/light modes with multiple color themes (Sunset, Matrix, Ocean, Mono)

### Live Demo

🔗 **[https://ai-sdlc-explainer.vercel.app](https://ai-sdlc-explainer.vercel.app)**

### Web App Quick Start

```bash
cd aidlc-web-app

# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

### Web App Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm test` | Run Jest test suite |
| `npm run test:watch` | Run tests in watch mode |

---

## 🖥️ Terminal TUI

A keyboard-driven terminal interface for learning AI-SDLC offline:

- **Vim-style Navigation**: `j`/`k` for up/down, `Enter` to select
- **ASCII Diagrams**: Visual representations in any terminal
- **Screenshot Mode**: Stable output for documentation
- **Fully Offline**: All content bundled locally

### TUI Quick Start

```bash
# Install Python package
pip install -e .

# Run the TUI
python -m aidlc_explainer

# Run in screenshot mode (stable output)
python -m aidlc_explainer --screenshot-mode
```

### TUI Navigation

| Key | Action |
|-----|--------|
| `↑`/`k` | Move up |
| `↓`/`j` | Move down |
| `Enter` | Select |
| `←`/`Esc` | Go back |
| `→` | Next (in lessons) |
| `?` | Help |
| `q` | Quit |

---

## 📁 Project Structure

```
AI-SDLC_Explainer_WebApp/
├── aidlc-web-app/           # Next.js web application
│   ├── src/
│   │   ├── app/             # Next.js app router pages
│   │   ├── components/      # React components
│   │   ├── content/         # Lesson content, glossary, quiz data
│   │   ├── context/         # React context providers (theme, progress)
│   │   ├── lib/             # Utility functions
│   │   └── types/           # TypeScript type definitions
│   └── public/              # Static assets
├── src/                     # Python TUI source code
│   └── aidlc_explainer/     # TUI application package
├── tests/                   # Python test suite
├── aidlc-docs/              # AI-SDLC methodology artifacts for this project
│   ├── inception/           # Requirements, user stories, units
│   ├── construction/        # Design docs, validation reports
│   └── operations/          # Deployment plans
└── references/              # Golden thread methodology documents (gitignored)
```

---

## 🧪 Testing

### Web App Tests

```bash
cd aidlc-web-app
npm test                 # Run all tests
npm run test:watch       # Watch mode
```

### Python TUI Tests

```bash
pip install -e ".[dev]"  # Install dev dependencies
pytest                   # Run all tests
pytest -v                # Verbose output
```

---

## 📚 AI-SDLC Methodology

This project teaches and follows the AI-SDLC methodology:

### Three Phases

1. **Inception** - WHAT + WHY: Convert intent into testable, decomposed units
2. **Construction** - HOW: Build each unit with proof (tests, validation)
3. **Operations** - RUN: Deploy with observability and rollback capability

### 10 Core Principles

1. Human accountability is the loss function
2. Plan-first, then act (stage-by-stage)
3. Small batches (units of work)
4. Persisted artifacts are first-class
5. Proof over prose
6. Tooling is for truth, not vibes
7. Adaptive depth
8. Safety constraints are explicit
9. Separation of concerns in roles and agents
10. Continuous improvement of prompts/guardrails

---

## 🔗 Content Sources

All educational content is grounded in authoritative sources:

- [AWS AI-SDLC Blog](https://aws.amazon.com/blogs/devops/ai-driven-development-life-cycle/)
- [AWS AI-SDLC Workflows](https://github.com/awslabs/aisdlc-workflows)
- [AI-SDLC Method Definition](references/aidlc-docs/aisdlc-method-definition.md)
- [AI-SDLC Playbook](references/aidlc-docs/AI-SDLC_Playbook.md)

---

## 🤝 Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for development guidelines, code style, and contribution process.

---

## 📄 License

MIT

---

## 🛠️ Requirements

### Web App
- Node.js 18+
- npm 9+

### Python TUI
- Python 3.11+
- No admin privileges required
