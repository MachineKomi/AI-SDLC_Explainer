'use client';

import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ROLE_MAPPINGS,
  PROCESS_MAPPINGS,
  ARTIFACT_MAPPINGS,
  TRANSITION_PHASES,
  READINESS_CHECKLIST,
  getReadinessCategories
} from '@/content/transition';

type Tab = 'roles' | 'processes' | 'artifacts' | 'phases' | 'checklist';

export default function TransitionPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>('roles');
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      router.push('/');
    } else if (e.key === '1') setActiveTab('roles');
    else if (e.key === '2') setActiveTab('processes');
    else if (e.key === '3') setActiveTab('artifacts');
    else if (e.key === '4') setActiveTab('phases');
    else if (e.key === '5') setActiveTab('checklist');
  }, [router]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const toggleCheck = (item: string) => {
    setCheckedItems(prev => {
      const next = new Set(prev);
      if (next.has(item)) next.delete(item);
      else next.add(item);
      return next;
    });
  };

  const tabs: { id: Tab; label: string; icon: string }[] = [
    { id: 'roles', label: 'Roles', icon: '👥' },
    { id: 'processes', label: 'Processes', icon: '🔄' },
    { id: 'artifacts', label: 'Artifacts', icon: '📄' },
    { id: 'phases', label: 'Phases', icon: '📈' },
    { id: 'checklist', label: 'Checklist', icon: '✅' },
  ];

  return (
    <main className="min-h-screen p-4 md:p-8">
      <header className="mb-6">
        <Link href="/" className="text-foreground-muted hover:text-foreground text-sm mb-2 inline-block">
          ← Back to Home
        </Link>
        <h1 className="text-2xl md:text-3xl font-bold">🔄 Transition Mapping</h1>
        <p className="text-foreground-muted">From Agile/Scrum to AI-SDLC</p>
      </header>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {tabs.map((tab, idx) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-3 py-2 rounded-lg flex items-center gap-2 text-sm transition-colors ${activeTab === tab.id
              ? 'bg-accent-primary text-white'
              : 'bg-background-tertiary text-foreground-muted hover:bg-background-tertiary/80'
              }`}
          >
            <kbd className="kbd text-xs">{idx + 1}</kbd>
            <span>{tab.icon}</span>
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Roles Tab */}
      {activeTab === 'roles' && (
        <div className="space-y-6">
          {ROLE_MAPPINGS.map(role => (
            <div key={role.agileRole} className="card">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Agile Role */}
                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="font-bold text-blue-400">{role.agileRole}</h3>
                  <p className="text-sm text-foreground-muted/70 mb-2">Agile/Scrum</p>
                  <ul className="text-sm space-y-1">
                    {role.agileResponsibilities.map((resp, idx) => (
                      <li key={idx} className="text-foreground-muted">• {resp}</li>
                    ))}
                  </ul>
                </div>

                {/* AI-SDLC Role */}
                <div className="border-l-4 border-green-500 pl-4">
                  <h3 className="font-bold text-green-400">{role.aidlcRole}</h3>
                  <p className="text-sm text-foreground-muted/70 mb-2">AI-SDLC</p>
                  <ul className="text-sm space-y-1">
                    {role.aidlcResponsibilities.map((resp, idx) => (
                      <li key={idx} className="text-foreground-muted">• {resp}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-background-tertiary grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-semibold text-accent-warning mb-2">Key Changes:</h4>
                  <ul className="text-sm space-y-1">
                    {role.keyChanges.map((change, idx) => (
                      <li key={idx} className="text-foreground-muted">→ {change}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-accent-primary mb-2">Skills to Develop:</h4>
                  <ul className="text-sm space-y-1">
                    {role.skillsToDevelop.map((skill, idx) => (
                      <li key={idx} className="text-foreground-muted">📚 {skill}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Processes Tab */}
      {activeTab === 'processes' && (
        <div className="space-y-4">
          {PROCESS_MAPPINGS.map(process => (
            <div key={process.agileProcess} className="card">
              <div className="grid md:grid-cols-2 gap-6 mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-blue-400 font-bold">{process.agileProcess}</span>
                    <span className="text-xs px-2 py-0.5 bg-blue-900/50 rounded">{process.agileFrequency}</span>
                    <span className="text-xs text-foreground-muted/70">{process.agileDuration}</span>
                  </div>
                  <p className="text-sm text-foreground-muted">{process.agilePurpose}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-green-400 font-bold">{process.aidlcProcess}</span>
                    <span className="text-xs px-2 py-0.5 bg-green-900/50 rounded">{process.aidlcFrequency}</span>
                    <span className="text-xs text-foreground-muted/70">{process.aidlcDuration}</span>
                  </div>
                  <p className="text-sm text-foreground-muted">{process.aidlcPurpose}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {process.keyDifferences.map((diff, idx) => (
                  <span key={idx} className="text-xs px-2 py-1 bg-background-tertiary rounded">
                    {diff}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Artifacts Tab */}
      {activeTab === 'artifacts' && (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-background-tertiary">
                <th className="text-left p-3 text-blue-400">Agile Artifact</th>
                <th className="text-left p-3 text-green-400">AI-SDLC Artifact</th>
                <th className="text-left p-3 text-foreground-muted">Key Differences</th>
              </tr>
            </thead>
            <tbody>
              {ARTIFACT_MAPPINGS.map(artifact => (
                <tr key={artifact.agileArtifact} className="border-b border-background-tertiary/50">
                  <td className="p-3">
                    <div className="font-medium">{artifact.agileArtifact}</div>
                    <div className="text-sm text-foreground-muted/70">{artifact.agilePurpose}</div>
                  </td>
                  <td className="p-3">
                    <div className="font-medium">{artifact.aidlcArtifact}</div>
                    <div className="text-sm text-foreground-muted/70">{artifact.aidlcPurpose}</div>
                  </td>
                  <td className="p-3">
                    <ul className="text-sm text-foreground-muted">
                      {artifact.keyDifferences.map((diff, idx) => (
                        <li key={idx}>• {diff}</li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Phases Tab */}
      {activeTab === 'phases' && (
        <div className="space-y-4">
          {TRANSITION_PHASES.map((phase, idx) => (
            <div key={phase.id} className="card">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-accent-primary flex items-center justify-center font-bold">
                  {idx + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-bold text-lg">{phase.name}</h3>
                    <span className="text-sm px-2 py-0.5 bg-background-tertiary rounded">{phase.duration}</span>
                  </div>
                  <p className="text-foreground-muted mb-4">{phase.focus}</p>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <h4 className="text-sm font-semibold text-foreground mb-2">Activities:</h4>
                      <ul className="text-sm space-y-1">
                        {phase.activities.map((activity, i) => (
                          <li key={i} className="text-foreground-muted">• {activity}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-accent-success mb-2">Success Criteria:</h4>
                      <ul className="text-sm space-y-1">
                        {phase.successCriteria.map((criteria, i) => (
                          <li key={i} className="text-foreground-muted">✓ {criteria}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-accent-warning mb-2">Risks:</h4>
                      <ul className="text-sm space-y-1">
                        {phase.risks.map((risk, i) => (
                          <li key={i} className="text-foreground-muted">⚠️ {risk}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Checklist Tab */}
      {activeTab === 'checklist' && (
        <div className="space-y-6">
          <div className="card bg-accent-primary/10 border-accent-primary/30">
            <div className="flex items-center justify-between">
              <span className="font-semibold">Readiness Progress</span>
              <span className="text-2xl font-bold">
                {checkedItems.size}/{READINESS_CHECKLIST.length}
              </span>
            </div>
            <div className="w-full bg-background-tertiary rounded-full h-3 mt-2">
              <div
                className="bg-accent-success h-3 rounded-full transition-all"
                style={{ width: `${(checkedItems.size / READINESS_CHECKLIST.length) * 100}%` }}
              />
            </div>
          </div>

          {getReadinessCategories().map(category => (
            <div key={category} className="card">
              <h3 className="font-bold mb-4">{category}</h3>
              <div className="space-y-3">
                {READINESS_CHECKLIST.filter(item => item.category === category).map(item => (
                  <label
                    key={item.item}
                    className="flex items-start gap-3 cursor-pointer group"
                  >
                    <input
                      type="checkbox"
                      checked={checkedItems.has(item.item)}
                      onChange={() => toggleCheck(item.item)}
                      className="mt-1 w-5 h-5 rounded border-background-tertiary bg-background-secondary text-accent-success focus:ring-accent-primary"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className={`font-medium ${checkedItems.has(item.item) ? 'line-through text-foreground-muted/50' : ''}`}>
                          {item.item}
                        </span>
                        <span className={`text-xs px-2 py-0.5 rounded ${item.importance === 'critical' ? 'bg-red-900/50 text-red-300' :
                          item.importance === 'high' ? 'bg-yellow-900/50 text-yellow-300' :
                            'bg-background-tertiary text-foreground-muted'
                          }`}>
                          {item.importance}
                        </span>
                      </div>
                      <p className="text-sm text-foreground-muted/70">{item.description}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <footer className="mt-8 pt-4 border-t border-background-tertiary text-sm text-foreground-muted">
        <div className="flex justify-center gap-4 flex-wrap">
          <span><kbd className="kbd">1</kbd> Roles</span>
          <span><kbd className="kbd">2</kbd> Processes</span>
          <span><kbd className="kbd">3</kbd> Artifacts</span>
          <span><kbd className="kbd">4</kbd> Phases</span>
          <span><kbd className="kbd">5</kbd> Checklist</span>
          <span><kbd className="kbd">Esc</kbd> Home</span>
        </div>
      </footer>
    </main>
  );
}
