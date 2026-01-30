'use client';

import { useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Source {
  title: string;
  description: string;
  url: string;
  type: 'documentation' | 'blog' | 'repository' | 'video';
}

const SOURCES: Source[] = [
  {
    title: 'AI-DLC Workflows Repository',
    description: 'Official AWS Labs repository with AI-DLC workflow definitions and rules',
    url: 'https://github.com/awslabs/aidlc-workflows',
    type: 'repository',
  },
  {
    title: 'AI-Driven Development Life Cycle Blog',
    description: 'AWS DevOps Blog post introducing AI-DLC methodology',
    url: 'https://aws.amazon.com/blogs/devops/ai-driven-development-life-cycle/',
    type: 'blog',
  },
  {
    title: 'AI-SDLC Best Practice Method Principles',
    description: 'Core methodology document defining phases, principles, and practices',
    url: 'https://github.com/awslabs/aidlc-workflows/blob/main/docs/AI-SDLC_best-practice_method_principles.md',
    type: 'documentation',
  },
  {
    title: 'Amazon Q Developer',
    description: 'AI-powered coding assistant that integrates with AI-DLC workflows',
    url: 'https://aws.amazon.com/q/developer/',
    type: 'documentation',
  },
  {
    title: 'Kiro IDE',
    description: 'AI-native IDE with built-in AI-DLC support',
    url: 'https://kiro.dev',
    type: 'documentation',
  },
];

const LOCAL_REFERENCES = [
  {
    title: 'AI-SDLC Best Practice Method Principles',
    path: 'AI-SDLC_best-practice_method_principles.md',
    description: 'Local copy of the methodology definition',
  },
  {
    title: 'AIDLC Method Definition',
    path: 'references/aidlc-docs/aidlc-method-definition.md',
    description: 'Detailed method definition and workflows',
  },
  {
    title: 'AIDLC Docs Structure Summary',
    path: 'references/aidlc-docs/aidlc-docs-structure-summary.md',
    description: 'Overview of documentation structure',
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
      default: return '🔗';
    }
  };

  return (
    <main className="min-h-screen p-4 md:p-8">
      <header className="mb-6">
        <Link href="/" className="text-slate-400 hover:text-slate-200 text-sm mb-2 inline-block">
          ← Back to Home
        </Link>
        <h1 className="text-2xl md:text-3xl font-bold">🔗 Sources & References</h1>
        <p className="text-slate-400">Learn more about AI-DLC</p>
      </header>

      {/* External Sources */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">External Resources</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {SOURCES.map(source => (
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
                    <span className="ml-2 text-slate-500 text-sm">↗</span>
                  </h3>
                  <p className="text-sm text-slate-400 mt-1">{source.description}</p>
                  <span className="text-xs text-slate-500 mt-2 inline-block capitalize">
                    {source.type}
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Local References */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Local References</h2>
        <div className="card">
          <p className="text-sm text-slate-400 mb-4">
            These files are included in the project repository:
          </p>
          <div className="space-y-3">
            {LOCAL_REFERENCES.map(ref => (
              <div key={ref.path} className="flex items-start gap-3 p-3 bg-slate-800/50 rounded">
                <span className="text-slate-400">📄</span>
                <div>
                  <h3 className="font-medium">{ref.title}</h3>
                  <p className="text-sm text-slate-400">{ref.description}</p>
                  <code className="text-xs text-slate-500 mt-1 block">{ref.path}</code>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Attribution */}
      <section className="card bg-accent-primary/10 border-accent-primary/30">
        <h2 className="font-semibold mb-3">📜 Attribution</h2>
        <p className="text-sm text-slate-300">
          AI-DLC (AI-Driven Development Lifecycle) is a methodology developed by AWS. 
          This educational application is based on the publicly available documentation 
          and is intended for learning purposes.
        </p>
        <p className="text-sm text-slate-400 mt-2">
          All content is derived from the official AI-DLC documentation and workflows 
          available at{' '}
          <a 
            href="https://github.com/awslabs/aidlc-workflows" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-accent-primary hover:underline"
          >
            github.com/awslabs/aidlc-workflows
          </a>
        </p>
      </section>

      <footer className="mt-8 pt-4 border-t border-slate-700 text-sm text-slate-500">
        <div className="flex justify-center gap-4">
          <span><kbd className="kbd">Esc</kbd> Home</span>
        </div>
      </footer>
    </main>
  );
}
