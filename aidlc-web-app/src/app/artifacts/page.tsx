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
  description: 'Root directory for all AI-DLC documentation',
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
          className={`w-full text-left px-2 py-1 rounded flex items-center gap-2 hover:bg-slate-700 transition-colors ${
            isSelected ? 'bg-slate-700 border-l-2 border-accent-primary' : ''
          }`}
          style={{ paddingLeft: `${depth * 16 + 8}px` }}
        >
          {node.type === 'folder' ? (
            <span className="text-yellow-400">{isExpanded ? '📂' : '📁'}</span>
          ) : (
            <span className="text-slate-400">📄</span>
          )}
          <span className={node.type === 'folder' ? 'font-medium' : 'text-slate-300'}>
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

  return (
    <main className="min-h-screen p-4 md:p-8">
      <header className="mb-6">
        <Link href="/" className="text-slate-400 hover:text-slate-200 text-sm mb-2 inline-block">
          ← Back to Home
        </Link>
        <h1 className="text-2xl md:text-3xl font-bold">📁 Artifact Explorer</h1>
        <p className="text-slate-400">Browse the AI-DLC documentation structure</p>
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
                  <h3 className="text-sm font-semibold text-slate-400 mb-1">Type</h3>
                  <p className="capitalize">{selectedNode.type}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-semibold text-slate-400 mb-1">Description</h3>
                  <p className="text-slate-300">{selectedNode.description}</p>
                </div>
                
                {selectedNode.type === 'folder' && selectedNode.children && (
                  <div>
                    <h3 className="text-sm font-semibold text-slate-400 mb-1">Contents</h3>
                    <p className="text-slate-300">
                      {selectedNode.children.filter(c => c.type === 'folder').length} folders,{' '}
                      {selectedNode.children.filter(c => c.type === 'file').length} files
                    </p>
                  </div>
                )}
                
                {selectedNode.type === 'file' && (
                  <div className="pt-4 border-t border-slate-700">
                    <h3 className="text-sm font-semibold text-slate-400 mb-2">Template</h3>
                    <div className="bg-slate-900 p-3 rounded font-mono text-xs text-slate-400">
                      # {selectedNode.name.replace('.md', '').replace(/-/g, ' ').toUpperCase()}
                      <br /><br />
                      ## Overview
                      <br />
                      [Description of this artifact]
                      <br /><br />
                      ## Content
                      <br />
                      [Main content goes here]
                      <br /><br />
                      ## Evidence
                      <br />
                      - [ ] Criterion 1
                      <br />
                      - [ ] Criterion 2
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center text-slate-500 py-8">
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
            <span className="text-slate-400">Collapsed folder</span>
          </div>
          <div className="flex items-center gap-2">
            <span>📂</span>
            <span className="text-slate-400">Expanded folder</span>
          </div>
          <div className="flex items-center gap-2">
            <span>📄</span>
            <span className="text-slate-400">Markdown file</span>
          </div>
        </div>
      </div>

      <footer className="mt-8 pt-4 border-t border-slate-700 text-sm text-slate-500">
        <div className="flex justify-center gap-4">
          <span><kbd className="kbd">Esc</kbd> {selectedNode ? 'Deselect' : 'Home'}</span>
        </div>
      </footer>
    </main>
  );
}
