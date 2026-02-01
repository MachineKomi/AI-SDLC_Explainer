# Contributing to AI-SDLC Explainer

Thank you for your interest in contributing to the AI-SDLC Explainer! This document provides guidelines for development and contribution.

---

## 🏗️ Development Setup

### Web Application

```bash
# Navigate to web app directory
cd aidlc-web-app

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000
```

### Python TUI

```bash
# Install with development dependencies
pip install -e ".[dev]"

# Run the application
python -m aidlc_explainer

# Run linter
ruff check src/

# Run tests
pytest
```

---

## 📁 Code Organization

### Web App Structure (`aidlc-web-app/src/`)

```
src/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Home page
│   ├── layout.tsx         # Root layout with metadata
│   ├── globals.css        # Global styles and CSS variables
│   └── [route]/           # Feature routes (lessons, glossary, etc.)
│
├── components/            # Reusable React components
│   ├── MermaidRenderer.tsx   # Mermaid diagram rendering
│   ├── Navigation.tsx        # Main navigation
│   ├── Sidebar.tsx           # Sidebar with progress
│   └── ...
│
├── content/               # Static content data
│   ├── lessons.ts         # Lesson content
│   ├── glossary.ts        # Glossary terms
│   ├── quiz.ts            # Quiz questions
│   ├── mermaid-diagrams.ts   # Mermaid diagram definitions
│   └── ...
│
├── context/               # React Context providers
│   ├── ThemeProvider.tsx  # Dark/light mode + color themes
│   └── ProgressProvider.tsx  # Learning progress tracking
│
├── lib/                   # Utility functions
│   ├── xp.ts             # XP/leveling calculations
│   └── utils.ts          # General utilities
│
└── types/                 # TypeScript type definitions
    └── index.ts          # Core type exports
```

---

## 🎨 Styling Guidelines

### CSS Variables

All colors should use CSS variables defined in `globals.css`:

```css
/* ✅ Correct - uses CSS variables */
.my-component {
  color: rgb(var(--foreground));
  background: rgb(var(--background-secondary));
  border-color: rgb(var(--accent-primary));
}

/* ❌ Incorrect - hardcoded colors */
.my-component {
  color: #f5f5f5;
  background: #1a1a2e;
}
```

### Theme Support

Components must work in both dark and light modes. Test by toggling the theme in the UI.

### Animation Guidelines

- Use `framer-motion` for complex animations
- Respect `prefers-reduced-motion` for accessibility
- Keep animations subtle and purposeful (dev/hacker aesthetic, not flashy)

---

## 📊 Adding New Diagrams

Diagrams use Mermaid syntax. To add a new diagram:

1. **Define the diagram** in `src/content/mermaid-diagrams.ts`:

```typescript
export const DIAGRAMS = {
  // ... existing diagrams
  
  myNewDiagram: `
flowchart TD
  A["Start"]:::accent --> B["Process"]
  B --> C["End"]:::accent
  
  classDef accent fill:#ec4899,stroke:#be185d,color:#fff
`,
};
```

2. **Use accent classes** for important nodes (gates, outcomes)
3. **Keep diagrams neutral** with accent highlights for key information
4. **Test in both modes** (dark/light)

---

## 📝 Content Guidelines

### Terminology

- Use **AI-SDLC** (not AI-DLC) consistently
- Spell out as "AI-Driven Software Development Lifecycle" on first use
- Keep URLs/links that contain `aidlc` as-is (functional requirement)

### Golden Thread Alignment

All educational content must align with the methodology documents in `references/aidlc-docs/`:

- `aisdlc-method-definition.md` - Core method definition
- `AI-SDLC_Playbook.md` - Practical playbook

### Lesson Content

When adding or modifying lessons in `src/content/lessons.ts`:

1. Verify accuracy against golden thread documents
2. Maintain high semantic density
3. Include practical examples
4. Add appropriate diagram references

---

## 🔧 Adding New Themes

To add a new color theme:

1. **Add theme definition** in `ThemeProvider.tsx`:

```typescript
const THEMES = {
  // ... existing themes
  
  myTheme: {
    name: 'My Theme',
    accent: {
      primary: '#hex',
      secondary: '#hex',
      tertiary: '#hex'
    }
  }
};
```

2. **Add CSS classes** in `globals.css`:

```css
.theme-my-theme {
  --accent-primary: r g b;
  --accent-secondary: r g b;
  --accent-tertiary: r g b;
}
```

---

## ✅ Pull Request Checklist

Before submitting a PR, ensure:

- [ ] Code builds without errors (`npm run build`)
- [ ] All tests pass (`npm test`)
- [ ] No lint errors (`npm run lint`)
- [ ] Light mode works correctly on all affected pages
- [ ] Dark mode works correctly on all affected pages
- [ ] Mobile responsive (test at 375px width)
- [ ] Diagrams render correctly if modified
- [ ] Content aligns with golden thread methodology (if content changes)

---

## 🧪 Testing

### Writing Tests

Tests are in `aidlc-web-app/__tests__/` using Jest and React Testing Library:

```typescript
import { render, screen } from '@testing-library/react';
import MyComponent from '@/components/MyComponent';

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('Expected text')).toBeInTheDocument();
  });
});
```

### Running Tests

```bash
npm test              # Run all tests
npm run test:watch    # Watch mode for development
```

---

## 🔄 AI-SDLC Workflow

This project follows AI-SDLC methodology. When making significant changes:

1. **Document intent** in `aidlc-docs/` if creating new features
2. **Create a plan** before implementing complex changes
3. **Provide evidence** that changes work (tests, screenshots)
4. **Update validation reports** for construction units

---

## 📞 Getting Help

- Review existing code for patterns and conventions
- Check the golden thread documents for methodology questions
- Open an issue for bugs or feature discussions

---

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.
