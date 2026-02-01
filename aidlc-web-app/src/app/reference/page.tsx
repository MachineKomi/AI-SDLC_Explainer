'use client';

import { useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { PHASES } from '@/content/simulator/stages';

const PRINCIPLES = [
  { id: 1, name: 'AI as Collaborator', description: 'AI is a central team member, not just a tool' },
  { id: 2, name: 'Human Oversight', description: 'Humans validate AI output at critical gates' },
  { id: 3, name: 'Proof Over Prose', description: 'Evidence-based validation, not just documentation' },
  { id: 4, name: 'Adaptive Depth', description: 'Workflow adjusts based on risk and complexity' },
  { id: 5, name: 'Mob Collaboration', description: 'Team works together with AI in real-time' },
  { id: 6, name: 'Continuous Validation', description: 'Quality gates throughout, not just at the end' },
  { id: 7, name: 'Intent-Driven', description: 'Start with outcomes, not features' },
  { id: 8, name: 'Unit Decomposition', description: 'Break work into parallel, testable units' },
  { id: 9, name: 'Bolt Iterations', description: 'Rapid cycles of AI generation + human validation' },
  { id: 10, name: 'Guardrail Evolution', description: 'Continuously improve AI collaboration rules' },
];

const KEY_ARTIFACTS = [
  { phase: 'Inception', artifacts: ['Intent', 'Requirements', 'Units', 'Execution Plan'] },
  { phase: 'Construction', artifacts: ['Design', 'Tasks Plan', 'Code', 'Validation Report'] },
  { phase: 'Operations', artifacts: ['Deployment Plan', 'Runbooks', 'Observability Config'] },
];

const KEY_GATES = [
  { name: 'Requirements Approved', phase: 'Inception', evidence: 'Intent + requirements reviewed' },
  { name: 'INCEPTION EXIT', phase: 'Inception', evidence: 'All units defined with acceptance criteria' },
  { name: 'Design Approved', phase: 'Construction', evidence: 'Design document reviewed' },
  { name: 'UNIT COMPLETE', phase: 'Construction', evidence: 'Tests passing + validation report' },
  { name: 'PRODUCTION READY', phase: 'Operations', evidence: 'Deployable + observable + rollbackable' },
];

export default function ReferencePage() {
  const router = useRouter();

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      router.push('/');
    } else if (e.key === 'p') {
      window.print();
    }
  }, [router]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <main className="min-h-screen p-4 md:p-8 print:p-2">
      <header className="mb-6 print:mb-4">
        <Link href="/" className="text-foreground-muted hover:text-foreground text-sm mb-2 inline-block print:hidden">
          ← Back to Home
        </Link>
        <div className="flex justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-bold print:text-xl">📋 Quick Reference</h1>
          <button
            onClick={() => window.print()}
            className="btn-secondary text-sm print:hidden"
          >
            🖨️ Print
          </button>
        </div>
        <p className="text-foreground-muted print:text-sm">AI-SDLC at a glance</p>
      </header>

      <div className="grid md:grid-cols-2 gap-6 print:gap-4 print:text-sm">
        {/* Phases */}
        <section className="card print:p-3">
          <h2 className="font-bold text-lg mb-4 print:text-base">🔵 Three Phases</h2>
          <div className="space-y-4">
            {PHASES.map(phase => (
              <div key={phase.id} className="border-l-4 border-accent-primary pl-3">
                <div className="flex items-center gap-2">
                  <span>{phase.icon}</span>
                  <h3 className="font-semibold">{phase.name}</h3>
                </div>
                <p className="text-sm text-foreground-muted">{phase.goal}</p>
                <p className="text-xs text-foreground-muted/70 mt-1">Ritual: {phase.ritual}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 10 Principles */}
        <section className="card print:p-3">
          <h2 className="font-bold text-lg mb-4 print:text-base">📜 10 Principles</h2>
          <div className="grid grid-cols-2 gap-2">
            {PRINCIPLES.map(principle => (
              <div key={principle.id} className="text-sm">
                <span className="font-mono text-accent-primary">{principle.id}.</span>{' '}
                <span className="font-medium">{principle.name}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Key Artifacts */}
        <section className="card print:p-3">
          <h2 className="font-bold text-lg mb-4 print:text-base">📄 Key Artifacts</h2>
          <div className="space-y-3">
            {KEY_ARTIFACTS.map(group => (
              <div key={group.phase}>
                <h3 className="text-sm font-semibold text-foreground-muted">{group.phase}</h3>
                <div className="flex flex-wrap gap-2 mt-1">
                  {group.artifacts.map(artifact => (
                    <span key={artifact} className="text-xs px-2 py-1 bg-background-tertiary rounded">
                      {artifact}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Key Gates */}
        <section className="card print:p-3">
          <h2 className="font-bold text-lg mb-4 print:text-base">🚪 Key Gates</h2>
          <div className="space-y-2">
            {KEY_GATES.map(gate => (
              <div key={gate.name} className="flex items-start gap-2 text-sm">
                <span className="text-accent-success">✓</span>
                <div>
                  <span className="font-medium">{gate.name}</span>
                  <span className="text-foreground-muted/70 text-xs ml-2">({gate.phase})</span>
                  <p className="text-xs text-foreground-muted">{gate.evidence}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Principle Details */}
        <section className="card md:col-span-2 print:p-3">
          <h2 className="font-bold text-lg mb-4 print:text-base">📜 Principle Details</h2>
          <div className="grid md:grid-cols-2 gap-3">
            {PRINCIPLES.map(principle => (
              <div key={principle.id} className="flex gap-2">
                <span className="font-mono text-accent-primary font-bold">{principle.id}.</span>
                <div>
                  <span className="font-medium">{principle.name}</span>
                  <p className="text-sm text-foreground-muted">{principle.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Tips */}
        <section className="card md:col-span-2 print:p-3 bg-accent-primary/10 border-accent-primary/30">
          <h2 className="font-bold text-lg mb-4 print:text-base">💡 Quick Tips</h2>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div>
              <h3 className="font-semibold text-accent-success mb-2">Do:</h3>
              <ul className="space-y-1 text-foreground-muted">
                <li>✓ Start with clear Intent</li>
                <li>✓ Validate AI output at gates</li>
                <li>✓ Document evidence, not just prose</li>
                <li>✓ Iterate in small Bolts</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-accent-error mb-2">Don&apos;t:</h3>
              <ul className="space-y-1 text-foreground-muted">
                <li>✗ Skip human validation</li>
                <li>✗ Accept AI output blindly</li>
                <li>✗ Ignore gate criteria</li>
                <li>✗ Work in isolation</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-accent-warning mb-2">Remember:</h3>
              <ul className="space-y-1 text-foreground-muted">
                <li>→ AI generates, humans validate</li>
                <li>→ Proof over prose</li>
                <li>→ Adaptive depth based on risk</li>
                <li>→ Continuous improvement</li>
              </ul>
            </div>
          </div>
        </section>
      </div>

      <footer className="mt-8 pt-4 border-t border-background-tertiary text-sm text-foreground-muted print:hidden">
        <div className="flex justify-center gap-4">
          <span><kbd className="kbd">P</kbd> Print</span>
          <span><kbd className="kbd">Esc</kbd> Home</span>
        </div>
      </footer>
    </main>
  );
}
