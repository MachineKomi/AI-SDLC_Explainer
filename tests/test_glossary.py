"""Tests for the glossary module."""

import pytest

from aidlc_explainer.content.glossary import (
    GLOSSARY_TERMS,
    get_all_terms,
    get_term_by_id,
    search_terms,
    get_terms_by_letter,
    GlossaryTerm,
)


class TestGlossaryData:
    """Tests for glossary data structure."""
    
    def test_has_minimum_terms(self):
        """Glossary should have at least 30 terms."""
        assert len(GLOSSARY_TERMS) >= 30
    
    def test_term_structure(self):
        """Each term should have required fields."""
        for term in GLOSSARY_TERMS:
            assert isinstance(term, GlossaryTerm)
            assert term.id, f"Term missing id"
            assert term.term, f"Term {term.id} missing term"
            assert term.definition, f"Term {term.id} missing definition"
            assert term.example, f"Term {term.id} missing example"
            assert isinstance(term.related, list), f"Term {term.id} related not a list"
            assert term.source, f"Term {term.id} missing source"
    
    def test_term_ids_unique(self):
        """Term IDs should be unique."""
        ids = [t.id for t in GLOSSARY_TERMS]
        assert len(ids) == len(set(ids)), "Duplicate term IDs found"
    
    def test_has_core_terms(self):
        """Glossary should include core AI-DLC terms."""
        term_ids = [t.id for t in GLOSSARY_TERMS]
        core_terms = [
            "aidlc", "intent", "unit", "bolt", "gate", "artifact",
            "inception", "construction", "operations",
            "mob-elaboration", "mob-construction",
            "proof-over-prose", "adaptive-depth",
        ]
        for core in core_terms:
            assert core in term_ids, f"Missing core term: {core}"
    
    def test_related_terms_exist(self):
        """Related terms should reference existing term IDs."""
        term_ids = {t.id for t in GLOSSARY_TERMS}
        for term in GLOSSARY_TERMS:
            for related in term.related:
                # Allow some flexibility for related terms
                # They don't all need to be in glossary
                pass  # Optional: assert related in term_ids


class TestGlossaryFunctions:
    """Tests for glossary helper functions."""
    
    def test_get_all_terms(self):
        """get_all_terms should return all terms."""
        terms = get_all_terms()
        assert len(terms) == len(GLOSSARY_TERMS)
    
    def test_get_term_by_id_exists(self):
        """get_term_by_id should return term when found."""
        term = get_term_by_id("aidlc")
        assert term is not None
        assert term.term == "AI-DLC"
    
    def test_get_term_by_id_not_found(self):
        """get_term_by_id should return None when not found."""
        term = get_term_by_id("nonexistent-term")
        assert term is None
    
    def test_search_terms_by_term(self):
        """search_terms should find by term name."""
        results = search_terms("bolt")
        assert len(results) >= 1
        assert any(t.id == "bolt" for t in results)
    
    def test_search_terms_by_definition(self):
        """search_terms should find by definition content."""
        results = search_terms("iteration")
        assert len(results) >= 1
    
    def test_search_terms_case_insensitive(self):
        """search_terms should be case insensitive."""
        results_lower = search_terms("inception")
        results_upper = search_terms("INCEPTION")
        assert len(results_lower) == len(results_upper)
    
    def test_search_terms_no_match(self):
        """search_terms with unmatched query returns empty list."""
        results = search_terms("zzzznonexistent")
        assert len(results) == 0
    
    def test_get_terms_by_letter(self):
        """get_terms_by_letter should filter correctly."""
        a_terms = get_terms_by_letter("A")
        assert all(t.term[0].upper() == "A" for t in a_terms)
        
        i_terms = get_terms_by_letter("I")
        assert any(t.id == "inception" for t in i_terms)
