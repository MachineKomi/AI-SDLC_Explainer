'use client';

import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { GLOSSARY_TERMS, searchTerms, getTermById } from '@/content/glossary';
import { GlossaryTerm } from '@/types';
import { useProgress } from '@/context/ProgressContext';
import { CheckCircle } from 'lucide-react';

export default function GlossaryPage() {
  const router = useRouter();
  const { state, markGlossaryTermViewed } = useProgress();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTerm, setSelectedTerm] = useState<GlossaryTerm | null>(null);
  const [filteredTerms, setFilteredTerms] = useState(GLOSSARY_TERMS);

  // Track viewed terms
  const viewedTerms = new Set(state.glossary?.viewedTerms || []);

  useEffect(() => {
    if (searchQuery.trim()) {
      setFilteredTerms(searchTerms(searchQuery));
    } else {
      setFilteredTerms(GLOSSARY_TERMS);
    }
  }, [searchQuery]);

  // Award XP when selecting a term for the first time
  const handleSelectTerm = useCallback((term: GlossaryTerm) => {
    setSelectedTerm(term);
    markGlossaryTermViewed(term.id);
  }, [markGlossaryTermViewed]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      if (selectedTerm) {
        setSelectedTerm(null);
      } else {
        router.push('/');
      }
    } else if (e.key === '/') {
      e.preventDefault();
      document.getElementById('search-input')?.focus();
    }
  }, [router, selectedTerm]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const handleRelatedClick = (termId: string) => {
    const term = getTermById(termId);
    if (term) {
      handleSelectTerm(term);
    }
  };

  // Sort terms alphabetically
  const sortedTerms = [...filteredTerms].sort((a, b) =>
    a.term.localeCompare(b.term)
  );

  return (
    <main className="min-h-screen p-4 md:p-8">
      <header className="mb-6">
        <Link href="/" className="text-foreground-muted hover:text-foreground text-sm mb-2 inline-block">
          ← Back to Home
        </Link>
        <h1 className="text-2xl md:text-3xl font-bold">📚 Glossary</h1>
        <p className="text-foreground-muted">{GLOSSARY_TERMS.length} AI-SDLC terms</p>
      </header>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <input
            id="search-input"
            type="text"
            placeholder="Search terms... (press / to focus)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 bg-background-secondary border border-background-tertiary rounded-lg text-foreground placeholder-foreground-muted/50 focus:outline-none focus:border-accent-primary"
          />
          <kbd className="kbd absolute right-3 top-1/2 -translate-y-1/2">/</kbd>
        </div>
        {/* Progress indicator */}
        <div className="mt-2 flex items-center gap-2 text-sm text-foreground-muted">
          <span>{viewedTerms.size}/{GLOSSARY_TERMS.length} terms explored</span>
          <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden max-w-32">
            <div 
              className="h-full bg-accent-secondary rounded-full transition-all"
              style={{ width: `${(viewedTerms.size / GLOSSARY_TERMS.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Term List */}
        <section className="space-y-2 max-h-[70vh] overflow-y-auto pr-2">
          {sortedTerms.map((term) => (
            <button
              key={term.id}
              onClick={() => handleSelectTerm(term)}
              className={`card w-full text-left relative ${selectedTerm?.id === term.id ? 'border-accent-primary' : ''
                }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{term.term}</h3>
                  <p className="text-sm text-foreground-muted line-clamp-2">{term.definition}</p>
                </div>
                {viewedTerms.has(term.id) && (
                  <CheckCircle className="w-4 h-4 text-status-success flex-shrink-0 mt-1" />
                )}
              </div>
            </button>
          ))}
          {sortedTerms.length === 0 && (
            <p className="text-foreground-muted text-center py-8">No terms found</p>
          )}
        </section>

        {/* Term Detail Panel */}
        <section className="card h-fit sticky top-4">
          {selectedTerm ? (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-foreground">{selectedTerm.term}</h2>
              <p className="text-foreground-muted">{selectedTerm.definition}</p>

              {selectedTerm.example && (
                <div>
                  <h4 className="text-sm font-semibold text-foreground-muted mb-1">Example</h4>
                  <p className="text-foreground-muted text-sm italic">{selectedTerm.example}</p>
                </div>
              )}

              {selectedTerm.related.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-foreground-muted mb-2">Related Terms</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedTerm.related.map((relatedId) => {
                      const relatedTerm = getTermById(relatedId);
                      return relatedTerm ? (
                        <button
                          key={relatedId}
                          onClick={() => handleRelatedClick(relatedId)}
                          className="px-2 py-1 bg-background-tertiary rounded text-sm text-accent-primary hover:bg-background-tertiary/80 transition-colors"
                        >
                          {relatedTerm.term}
                        </button>
                      ) : null;
                    })}
                  </div>
                </div>
              )}

              <div className="text-xs text-foreground-muted pt-2 border-t border-background-tertiary">
                Source: {selectedTerm.source}
              </div>
            </div>
          ) : (
            <div className="text-center text-foreground-muted py-8">
              <p>Select a term to view details</p>
              <p className="text-sm mt-2">Press <kbd className="kbd">/</kbd> to search</p>
            </div>
          )}
        </section>
      </div>

      {/* Footer */}
      <footer className="mt-8 pt-4 border-t border-background-tertiary text-sm text-foreground-muted">
        <div className="flex justify-center gap-4">
          <span><kbd className="kbd">/</kbd> Search</span>
          <span><kbd className="kbd">Esc</kbd> {selectedTerm ? 'Close detail' : 'Home'}</span>
        </div>
      </footer>
    </main>
  );
}
