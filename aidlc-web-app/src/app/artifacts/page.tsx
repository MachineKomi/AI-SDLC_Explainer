'use client';

import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface ArtifactNode {
  name: string;
  type: 'folder' | 'file';
  description: string;
  children?: ArtifactNode[];
}

const ARTIFACT_TREE: ArtifactNode = {
  name: 'aidlc-docs',
  type: 'folder',
  description: 'Root directory for all AI-SDLC documentation',
  children: [
    {
      name: 'aidlc-state.md',
      type: 'file',
      description: 'Project state tracking - greenfield/brownfield, current phase, progress',
    },
    {
      name: 'execution-plan.md',
      type: 'file',
      description: 'Stage sequence with rationale for execute/skip decisions',
    },
    {
      name: 'inception',
      type: 'folder',
      description: 'Inception phase artifacts - WHAT and WHY',
      children: [
        { name: 'intent.md', type: 'file', description: 'One paragraph intent + success metrics' },
        { name: 'requirements.md', type: 'file', description: 'Functional requirements + constraints' },
        { name: 'nfr.md', type: 'file', description: 'Non-functional requirements (security, performance)' },
        { name: 'user-stories.md', type: 'file', description: 'User stories with acceptance criteria' },
        { name: 'application-design.md', type: 'file', description: 'High-level architecture decisions' },
        {
          name: 'units',
          type: 'folder',
          description: 'Unit definitions for parallel work',
          children: [
            { name: 'unit-01-*.md', type: 'file', description: 'First unit specification' },
            { name: 'unit-02-*.md', type: 'file', description: 'Second unit specification' },
          ],
        },
      ],
    },
    {
      name: 'construction',
      type: 'folder',
      description: 'Construction phase artifacts - HOW',
      children: [
        {
          name: 'unit-XX',
          type: 'folder',
          description: 'Per-unit construction artifacts',
          children: [
            { name: 'design.md', type: 'file', description: 'Detailed design - APIs, data models, algorithms' },
            { name: 'tasks-plan.md', type: 'file', description: 'Checkbox task list with completion status' },
            { name: 'validation-report.md', type: 'file', description: 'Test results, coverage, gaps' },
          ],
        },
      ],
    },
    {
      name: 'operations',
      type: 'folder',
      description: 'Operations phase artifacts - WHERE/WHEN',
      children: [
        { name: 'deployment-plan.md', type: 'file', description: 'Deployment strategy and rollback plan' },
        { name: 'runbooks.md', type: 'file', description: 'Operational procedures and troubleshooting' },
        { name: 'observability.md', type: 'file', description: 'Monitoring, alerting, dashboards' },
        { name: 'cost.md', type: 'file', description: 'Cost model and scaling assumptions' },
      ],
    },
  ],
};

import { ARTIFACT_TEMPLATES } from '@/content/artifact-templates';

export default function ArtifactsPage() {
  const router = useRouter();
  const [selectedNode, setSelectedNode] = useState<ArtifactNode | null>(null);
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['aidlc-docs']));

  const toggleFolder = (path: string) => {
    setExpandedFolders(prev => {
      const next = new Set(prev);
      if (next.has(path)) next.delete(path);
      else next.add(path);
      return next;
    });
  };

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      if (selectedNode) setSelectedNode(null);
      else router.push('/');
    }
  }, [router, selectedNode]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const renderNode = (node: ArtifactNode, path: string = '', depth: number = 0) => {
    const fullPath = path ? `${path}/${node.name}` : node.name;
    const isExpanded = expandedFolders.has(fullPath);
    const isSelected = selectedNode?.name === node.name;

    return (
      <div key={fullPath}>
        <button
          onClick={() => {
            if (node.type === 'folder') toggleFolder(fullPath);
            setSelectedNode(node);
          }}
          className={`w-full text-left px-2 py-1 rounded flex items-center gap-2 hover:bg-background-tertiary transition-colors ${isSelected ? 'bg-background-tertiary border-l-2 border-accent-primary' : ''
            }`}
          style={{ paddingLeft: `${depth * 16 + 8}px` }}
        >
          {node.type === 'folder' ? (
            <span className="text-yellow-400">{isExpanded ? '📂' : '📁'}</span>
          ) : (
            <span className="text-foreground-muted">📄</span>
          )}
          <span className={node.type === 'folder' ? 'font-medium' : 'text-foreground-muted'}>
            {node.name}
          </span>
        </button>
        {node.type === 'folder' && isExpanded && node.children && (
          <div>
            {node.children.map(child => renderNode(child, fullPath, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  // Helper to match filenames to templates (handling wildcards like unit-01-*.md roughly)
  const getTemplateContent = (filename: string) => {
    // Exact match
    if (ARTIFACT_TEMPLATES[filename]) return ARTIFACT_TEMPLATES[filename];

    // Fuzzy match for unit files (e.g. unit-01-intent.md -> match generic if needed, or mapping)
    // The tree has "unit-01-*.md" which is not a real file.
    // Let's assume the user clicks the node named in the tree.
    // If the tree node name is "unit-01-*.md", we might want a generic unit template.

    // Try to find a partial match in keys if specific one not found?
    // For now, let's map the tree names to keys in the constant.
    // The tree has "unit-01-*.md". Let's update the tree to have cleaner names 
    // or just map "unit-01-*.md" to something.
    if (filename.includes('unit-')) return ARTIFACT_TEMPLATES['tasks-plan.md']; // Fallback for unit files to a plan

    return null;
  };

  return (
    <main className="min-h-screen p-4 md:p-8">
      <header className="mb-6">
        <Link href="/" className="text-foreground-muted hover:text-foreground text-sm mb-2 inline-block">
          ← Back to Home
        </Link>
        <h1 className="text-2xl md:text-3xl font-bold">📁 Artifact Explorer</h1>
        <p className="text-foreground-muted">Browse the AI-SDLC documentation structure</p>
      </header>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Tree View */}
        <section className="card">
          <h2 className="font-semibold mb-4">Directory Structure</h2>
          <div className="font-mono text-sm">
            {renderNode(ARTIFACT_TREE)}
          </div>
        </section>

        {/* Detail Panel */}
        <section className="card h-fit sticky top-4">
          {selectedNode ? (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">
                  {selectedNode.type === 'folder' ? '📂' : '📄'}
                </span>
                <h2 className="text-xl font-bold">{selectedNode.name}</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-semibold text-foreground-muted mb-1">Type</h3>
                  <p className="capitalize">{selectedNode.type}</p>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-foreground-muted mb-1">Description</h3>
                  <p className="text-foreground-muted">{selectedNode.description}</p>
                </div>

                {selectedNode.type === 'folder' && selectedNode.children && (
                  <div>
                    <h3 className="text-sm font-semibold text-foreground-muted mb-1">Contents</h3>
                    <p className="text-foreground-muted">
                      {selectedNode.children.filter(c => c.type === 'folder').length} folders,{' '}
                      {selectedNode.children.filter(c => c.type === 'file').length} files
                    </p>
                  </div>
                )}

                {selectedNode.type === 'file' && (
                  <div className="pt-4 border-t border-background-tertiary">
                    <h3 className="text-sm font-semibold text-foreground-muted mb-2">Template Preview</h3>
                    <div className="bg-background-secondary p-4 rounded-lg font-mono text-xs text-foreground-muted whitespace-pre-wrap overflow-x-auto border border-white/5">
                      {getTemplateContent(selectedNode.name) || (
                        `# ${selectedNode.name.replace('.md', '').toUpperCase()}\n\n[Content definition not found for this artifact.]`
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center text-foreground-muted py-8">
              <p>Select a file or folder to view details</p>
              <p className="text-sm mt-2">Click on items in the tree view</p>
            </div>
          )}
        </section>
      </div>

      {/* Legend */}
      <div className="card mt-6">
        <h3 className="font-semibold mb-3">Legend</h3>
        <div className="flex flex-wrap gap-6 text-sm">
          <div className="flex items-center gap-2">
            <span>📁</span>
            <span className="text-foreground-muted">Collapsed folder</span>
          </div>
          <div className="flex items-center gap-2">
            <span>📂</span>
            <span className="text-foreground-muted">Expanded folder</span>
          </div>
          <div className="flex items-center gap-2">
            <span>📄</span>
            <span className="text-foreground-muted">Markdown file</span>
          </div>
        </div>
      </div>

      <footer className="mt-8 pt-4 border-t border-background-tertiary text-sm text-foreground-muted">
        <div className="flex justify-center gap-4">
          <span><kbd className="kbd">Esc</kbd> {selectedNode ? 'Deselect' : 'Home'}</span>
        </div>
      </footer>
    </main>
  );
}
