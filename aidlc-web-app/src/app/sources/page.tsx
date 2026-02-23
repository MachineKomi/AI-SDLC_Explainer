'use client';

import { useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Source {
  title: string;
  description: string;
  url: string;
  type: 'documentation' | 'blog' | 'repository' | 'video' | 'article' | 'reference';
}

const OFFICIAL_SOURCES: Source[] = [
  {
    title: 'AI-Driven Development Life Cycle Blog',
    description: 'AWS DevOps Blog post introducing AI-SDLC methodology',
    url: 'https://aws.amazon.com/blogs/devops/ai-driven-development-life-cycle/',
    type: 'blog',
  },
  {
    title: 'Open-Sourcing Adaptive Workflows for AI-SDLC',
    description: 'AWS blog post on open-sourcing adaptive workflows',
    url: 'https://aws.amazon.com/blogs/devops/open-sourcing-adaptive-workflows-for-ai-driven-development-life-cycle-ai-dlc/',
    type: 'blog',
  },
  {
    title: 'AI-SDLC Workflows Repository',
    description: 'Official AWS Labs repository with AI-SDLC workflow definitions and rules',
    url: 'https://github.com/awslabs/aidlc-workflows',
    type: 'repository',
  },
  {
    title: 'AWS MCP Servers',
    description: 'AWS MCP Servers — helping you get the most out of AWS, wherever you use MCP',
    url: 'https://github.com/awslabs/mcp',
    type: 'repository',
  },
];

const MCP_SOURCES: Source[] = [
  {
    title: 'AWS Documentation MCP Server',
    description: 'MCP server for AWS documentation access',
    url: 'https://awslabs.github.io/mcp/servers/aws-documentation-mcp-server',
    type: 'documentation',
  },
  {
    title: 'AWS Diagram MCP Server',
    description: 'MCP server for AWS architecture diagrams',
    url: 'https://awslabs.github.io/mcp/servers/aws-diagram-mcp-server',
    type: 'documentation',
  },
  {
    title: 'AWS Pricing MCP Server',
    description: 'MCP server for AWS pricing information',
    url: 'https://awslabs.github.io/mcp/servers/aws-pricing-mcp-server',
    type: 'documentation',
  },
  {
    title: 'Chrome DevTools MCP',
    description: 'Chrome DevTools for coding agents',
    url: 'https://developer.chrome.com/blog/chrome-devtools-mcp',
    type: 'blog',
  },
  {
    title: 'Chrome DevTools MCP Repository',
    description: 'GitHub repository for Chrome DevTools MCP',
    url: 'https://github.com/ChromeDevTools/chrome-devtools-mcp',
    type: 'repository',
  },
];

const COMMUNITY_SOURCES: Source[] = [
  {
    title: 'DeepWiki: AI-SDLC Workflows',
    description: 'Community documentation and analysis of AI-SDLC workflows',
    url: 'https://deepwiki.com/awslabs/aidlc-workflows',
    type: 'documentation',
  },
  {
    title: 'Ralph Wiggum as a "Software Engineer"',
    description: 'Geoffrey Huntley\'s analysis of AI coding assistants',
    url: 'https://ghuntley.com/ralph/',
    type: 'article',
  },
];

const VIDEO_SOURCES: Source[] = [
  {
    title: 'AWS re:Invent 2025 - Introducing AI-DLC (DVT214)',
    description: 'Official AWS presentation on AI-driven development lifecycle',
    url: 'https://youtu.be/1HNUH6j5t4A',
    type: 'video',
  },
  {
    title: '2026: The Year The IDE Died',
    description: 'Steve Yegge & Gene Kim discuss vibe coding and AI-SDLC',
    url: 'https://youtu.be/7Dtu2bilcFs',
    type: 'video',
  },
  {
    title: 'The 5 Levels of AI Coding (Why Most of You Won\'t Make It Past Level 2)',
    description: 'Nate B Jones on the maturity levels of AI-assisted development',
    url: 'https://youtu.be/bDcgHzCBgmQ',
    type: 'video',
  },
  {
    title: 'The Ticking Time Bomb in Every Codebase Over 18 Months Old',
    description: 'Nate B Jones on codebase entropy and AI solutions',
    url: 'https://youtu.be/NoRePxSrhpw',
    type: 'video',
  },
  {
    title: 'AI-DLC Operationalization Cheat Sheet for B2B Leaders',
    description: 'Jonas Directory of AI Strategy — Rosetta Stone, RACI, metrics, adoption playbook, anti-patterns',
    url: 'https://claude.ai/public/artifacts/3c048375-8f70-4e43-a3e4-ab5aaa9ec876',
    type: 'reference',
  },
];

const TOOL_SOURCES: Source[] = [
  {
    title: 'Amazon Q Developer',
    description: 'AI-powered coding assistant that integrates with AI-SDLC workflows',
    url: 'https://aws.amazon.com/q/developer/',
    type: 'documentation',
  },
  {
    title: 'Kiro IDE',
    description: 'AI-native IDE with built-in AI-SDLC support',
    url: 'https://kiro.dev',
    type: 'documentation',
  },
  {
    title: 'OpenAI Codex',
    description: 'Cloud-based AI coding agent from OpenAI for autonomous software engineering tasks',
    url: 'https://openai.com/index/introducing-codex/',
    type: 'documentation',
  },
  {
    title: 'Cursor',
    description: 'AI-first code editor built for pair-programming with AI',
    url: 'https://www.cursor.com/',
    type: 'documentation',
  },
  {
    title: 'Claude Code',
    description: 'Anthropic\'s agentic coding tool for terminal-based AI development',
    url: 'https://docs.anthropic.com/en/docs/agents-and-tools/claude-code/overview',
    type: 'documentation',
  },
  {
    title: 'GitHub Copilot',
    description: 'AI pair programmer integrated into VS Code, JetBrains, and more',
    url: 'https://github.com/features/copilot',
    type: 'documentation',
  },
];

export default function SourcesPage() {
  const router = useRouter();

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      router.push('/');
    }
  }, [router]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const getTypeIcon = (type: Source['type']) => {
    switch (type) {
      case 'repository': return '📦';
      case 'blog': return '📝';
      case 'documentation': return '📚';
      case 'video': return '🎥';
      case 'article': return '📰';
      default: return '🔗';
    }
  };

  const renderSourceGrid = (sources: Source[]) => (
    <div className="grid md:grid-cols-2 gap-4">
      {sources.map(source => (
        <a
          key={source.url}
          href={source.url}
          target="_blank"
          rel="noopener noreferrer"
          className="card hover:border-accent-primary transition-colors group"
        >
          <div className="flex items-start gap-3">
            <span className="text-2xl">{getTypeIcon(source.type)}</span>
            <div className="flex-1">
              <h3 className="font-semibold group-hover:text-accent-primary transition-colors">
                {source.title}
                <span className="ml-2 text-foreground-muted/70 text-sm">↗</span>
              </h3>
              <p className="text-sm text-foreground-muted mt-1">{source.description}</p>
              <span className="text-xs text-foreground-muted/70 mt-2 inline-block capitalize">
                {source.type}
              </span>
            </div>
          </div>
        </a>
      ))}
    </div>
  );

  return (
    <main className="min-h-screen p-4 md:p-8">
      <header className="mb-6">
        <Link href="/" className="text-foreground-muted hover:text-foreground text-sm mb-2 inline-block">
          ← Back to Home
        </Link>
        <h1 className="text-2xl md:text-3xl font-bold">🔗 Sources & References</h1>
        <p className="text-foreground-muted">All sources used to create this learning platform</p>
      </header>

      {/* Attribution Banner */}
      <section className="card bg-accent-primary/10 border-accent-primary/30 mb-8">
        <h2 className="font-semibold mb-3">📜 Content Attribution</h2>
        <p className="text-sm text-foreground-muted">
          The content of this website is derived from various publicly available sources listed below.
          AI-SDLC (AI-Driven Software Development Lifecycle) is a methodology developed by AWS.
          This educational application synthesizes information from official documentation, blog posts,
          video presentations, and community resources for learning purposes.
        </p>
        <p className="text-sm text-foreground-muted/80 mt-2">
          We gratefully acknowledge all content creators and organizations whose work has informed this platform.
        </p>
      </section>

      {/* Official AWS Sources */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <span>🏢</span> Official AWS Sources
        </h2>
        {renderSourceGrid(OFFICIAL_SOURCES)}
      </section>

      {/* MCP & Tooling */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <span>🔧</span> MCP Servers & Tooling
        </h2>
        {renderSourceGrid(MCP_SOURCES)}
      </section>

      {/* Video Sources */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <span>🎬</span> Video Resources
        </h2>
        {renderSourceGrid(VIDEO_SOURCES)}
      </section>

      {/* Community Sources */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <span>👥</span> Community Resources
        </h2>
        {renderSourceGrid(COMMUNITY_SOURCES)}
      </section>

      {/* Tools */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
          <span>🛠️</span> AI Coding Tools
        </h2>
        <p className="text-sm text-foreground-muted mb-4">
          AI-SDLC is methodology-agnostic — it works with any AI coding tool. Here are some popular options.
        </p>
        {renderSourceGrid(TOOL_SOURCES)}
      </section>

      <footer className="mt-8 pt-4 border-t border-background-tertiary text-sm text-foreground-muted">
        <div className="flex justify-center gap-4">
          <span><kbd className="kbd">Esc</kbd> Home</span>
        </div>
      </footer>
    </main>
  );
}
