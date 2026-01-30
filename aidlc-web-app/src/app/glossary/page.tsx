'use client';

import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { GLOSSARY_TERMS, searchTerms, getTermById } from '@/content/glossary';
import { GlossaryTerm } from '@/types';

export default function GlossaryPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTerm, setSelectedTerm] = useState<GlossaryTerm | null>(null);
  const [filteredTerms, setFilteredTerms] = useState(GLOSSARY_TERMS);

  useEffect(() => {
    if (searchQuery.trim()) {
      setFilteredTerms(searchTerms(searchQuery));
    } else {
      setFilteredTerms(GLOSSARY_TERMS);
    }
  }, [searchQuery]);

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
      setSelectedTerm(term);
    }
  };

  // Sort terms alphabetically
  const sortedTerms = [...filteredTerms].sort((a, b) => 
    a.term.localeCompare(b.term)
  );

  return (
    <main className="min-h-screen p-4 md:p-8">
      <header className="mb-6">
        <Link href="/" className="text-slate-400 hover:text-slate-200 text-sm mb-2 inline-block">
          ← Back to Home
        </Link>
        <h1 className="text-2xl md:text-3xl font-bold">📚 Glossary</h1>
        <p className="text-slate-400">{GLOSSARY_TERMS.length} AI-DLC terms</p>
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
            className="w-full px-4 py-2 bg-dark-secondary border border-slate-700 rounded-lg text-slate-50 placeholder-slate-500 focus:outline-none focus:border-accent-primary"
          />
          <kbd className="kbd absolute right-3 top-1/2 -translate-y-1/2">/</kbd>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Term List */}
        <section className="space-y-2 max-h-[70vh] overflow-y-auto pr-2">
          {sortedTerms.map((term) => (
            <button
              key={term.id}
              onClick={() => setSelectedTerm(term)}
              className={`card w-full text-left ${
                selectedTerm?.id === term.id ? 'border-accent-primary' : ''
              }`}
            >
              <h3 className="font-semibold text-slate-50">{term.term}</h3>
              <p className="text-sm text-slate-400 line-clamp-2">{term.definition}</p>
            </button>
          ))}
          {sortedTerms.length === 0 && (
            <p className="text-slate-500 text-center py-8">No terms found</p>
          )}
        </section>

        {/* Term Detail Panel */}
        <section className="card h-fit sticky top-4">
          {selectedTerm ? (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-slate-50">{selectedTerm.term}</h2>
              <p className="text-slate-300">{selectedTerm.definition}</p>
              
              {selectedTerm.example && (
                <div>
                  <h4 className="text-sm font-semibold text-slate-400 mb-1">Example</h4>
                  <p className="text-slate-300 text-sm italic">{selectedTerm.example}</p>
                </div>
              )}
              
              {selectedTerm.related.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-slate-400 mb-2">Related Terms</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedTerm.related.map((relatedId) => {
                      const relatedTerm = getTermById(relatedId);
                      return relatedTerm ? (
                        <button
                          key={relatedId}
                          onClick={() => handleRelatedClick(relatedId)}
                          className="px-2 py-1 bg-slate-700 rounded text-sm text-accent-primary hover:bg-slate-600 transition-colors"
                        >
                          {relatedTerm.term}
                        </button>
                      ) : null;
                    })}
                  </div>
                </div>
              )}
              
              <div className="text-xs text-slate-500 pt-2 border-t border-slate-700">
                Source: {selectedTerm.source}
              </div>
            </div>
          ) : (
            <div className="text-center text-slate-500 py-8">
              <p>Select a term to view details</p>
              <p className="text-sm mt-2">Press <kbd className="kbd">/</kbd> to search</p>
            </div>
          )}
        </section>
      </div>

      {/* Footer */}
      <footer className="mt-8 pt-4 border-t border-slate-700 text-sm text-slate-500">
        <div className="flex justify-center gap-4">
          <span><kbd className="kbd">/</kbd> Search</span>
          <span><kbd className="kbd">Esc</kbd> {selectedTerm ? 'Close detail' : 'Home'}</span>
        </div>
      </footer>
    </main>
  );
}
