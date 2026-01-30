"""Tests for simulator JSON schema validation."""

import json
from pathlib import Path

import pytest

CONTENT_DIR = Path(__file__).parent.parent / "src" / "aidlc_explainer" / "content" / "simulator"


@pytest.fixture
def stages_data():
    """Load stages.json for testing."""
    with open(CONTENT_DIR / "stages.json", encoding="utf-8") as f:
        return json.load(f)


@pytest.fixture
def request_types_data():
    """Load request-types.json for testing."""
    with open(CONTENT_DIR / "request-types.json", encoding="utf-8") as f:
        return json.load(f)


class TestStagesSchema:
    """Test stages.json structure and content."""
    
    def test_has_schema_version(self, stages_data):
        """Stages file should have schema identifier."""
        assert "$schema" in stages_data
        assert stages_data["$schema"] == "stages-v1"
    
    def test_has_metadata(self, stages_data):
        """Stages file should have metadata with source info."""
        assert "metadata" in stages_data
        meta = stages_data["metadata"]
        assert "version" in meta
        assert "source_document" in meta
        assert "upstream_repo" in meta
    
    def test_has_phases(self, stages_data):
        """Stages file should define phases."""
        assert "phases" in stages_data
        phases = stages_data["phases"]
        assert len(phases) >= 3  # Inception, Construction, Operations
        
        for phase in phases:
            assert "id" in phase
            assert "name" in phase
            assert "goal" in phase
            assert "source" in phase
    
    def test_phase_ids_valid(self, stages_data):
        """Phase IDs should be expected values."""
        phase_ids = {p["id"] for p in stages_data["phases"]}
        expected = {"inception", "construction", "operations"}
        assert expected == phase_ids
    
    def test_has_minimum_stages(self, stages_data):
        """Should have at least 10 stages."""
        assert "stages" in stages_data
        assert len(stages_data["stages"]) >= 10
    
    def test_stage_structure(self, stages_data):
        """Each stage should have required fields."""
        required_fields = {"id", "phase", "name", "description", "source"}
        
        for stage in stages_data["stages"]:
            for field in required_fields:
                assert field in stage, f"Stage {stage.get('id', 'unknown')} missing field: {field}"
    
    def test_stages_have_questions(self, stages_data):
        """Each stage should have at least one question."""
        for stage in stages_data["stages"]:
            questions = stage.get("questions", [])
            assert len(questions) >= 1, f"Stage {stage['id']} has no questions"
    
    def test_question_structure(self, stages_data):
        """Questions should have required fields."""
        for stage in stages_data["stages"]:
            for question in stage.get("questions", []):
                assert "id" in question, f"Question in {stage['id']} missing id"
                assert "text" in question, f"Question in {stage['id']} missing text"
                assert "type" in question, f"Question in {stage['id']} missing type"
    
    def test_stages_have_artifacts(self, stages_data):
        """Stages that execute should have artifacts."""
        for stage in stages_data["stages"]:
            artifacts = stage.get("artifacts", [])
            # At least mandatory stages should have artifacts
            if stage.get("always_execute", False):
                assert len(artifacts) >= 1, f"Mandatory stage {stage['id']} has no artifacts"
    
    def test_stages_have_gates(self, stages_data):
        """Each stage should have a gate definition."""
        for stage in stages_data["stages"]:
            gate = stage.get("gate", {})
            assert "name" in gate, f"Stage {stage['id']} gate missing name"
            assert "criteria" in gate, f"Stage {stage['id']} gate missing criteria"
            assert "evidence_required" in gate, f"Stage {stage['id']} gate missing evidence_required"
    
    def test_source_links_present(self, stages_data):
        """Every stage should have source links."""
        for stage in stages_data["stages"]:
            source = stage.get("source", {})
            assert "local" in source, f"Stage {stage['id']} missing local source"
            assert "upstream" in source, f"Stage {stage['id']} missing upstream source"
            
            # Local should reference the source document
            assert "AI-SDLC_best-practice_method_principles.md" in source["local"] or \
                   "aidlc-workflows" in source["local"], \
                   f"Stage {stage['id']} local source doesn't reference known docs"
    
    def test_stage_ids_unique(self, stages_data):
        """Stage IDs should be unique."""
        stage_ids = [s["id"] for s in stages_data["stages"]]
        assert len(stage_ids) == len(set(stage_ids)), "Duplicate stage IDs found"
    
    def test_stages_reference_valid_phases(self, stages_data):
        """All stages should reference valid phase IDs."""
        valid_phases = {p["id"] for p in stages_data["phases"]}
        
        for stage in stages_data["stages"]:
            assert stage["phase"] in valid_phases, \
                f"Stage {stage['id']} references invalid phase: {stage['phase']}"


class TestRequestTypesSchema:
    """Test request-types.json structure and content."""
    
    def test_has_schema_version(self, request_types_data):
        """Request types file should have schema identifier."""
        assert "$schema" in request_types_data
        assert request_types_data["$schema"] == "request-types-v1"
    
    def test_has_metadata(self, request_types_data):
        """Request types file should have metadata."""
        assert "metadata" in request_types_data
    
    def test_has_four_request_types(self, request_types_data):
        """Should have exactly 4 request types."""
        assert "types" in request_types_data
        assert len(request_types_data["types"]) == 4
    
    def test_request_type_ids(self, request_types_data):
        """Request type IDs should match expected values."""
        type_ids = {t["id"] for t in request_types_data["types"]}
        expected = {"greenfield", "brownfield", "frontend", "bugfix"}
        assert expected == type_ids
    
    def test_request_type_structure(self, request_types_data):
        """Each request type should have required fields."""
        required_fields = {"id", "name", "description", "stages", "source"}
        
        for rtype in request_types_data["types"]:
            for field in required_fields:
                assert field in rtype, f"Request type {rtype.get('id', 'unknown')} missing field: {field}"
    
    def test_request_types_have_stage_decisions(self, request_types_data, stages_data):
        """Each request type should have decisions for all stages."""
        stage_ids = {s["id"] for s in stages_data["stages"]}
        
        for rtype in request_types_data["types"]:
            type_stages = set(rtype.get("stages", {}).keys())
            missing = stage_ids - type_stages
            assert not missing, f"Request type {rtype['id']} missing stage decisions for: {missing}"
    
    def test_has_risk_profiles(self, request_types_data):
        """Should have risk profiles defined."""
        assert "risk_profiles" in request_types_data
        profiles = request_types_data["risk_profiles"]
        assert len(profiles) >= 3  # low, medium, high
        
        profile_ids = {p["id"] for p in profiles}
        assert {"low", "medium", "high"} == profile_ids
    
    def test_risk_profile_structure(self, request_types_data):
        """Risk profiles should have required fields."""
        for profile in request_types_data["risk_profiles"]:
            assert "id" in profile
            assert "name" in profile
            assert "description" in profile
    
    def test_has_constraints(self, request_types_data):
        """Should have constraint definitions."""
        assert "constraints" in request_types_data
        constraints = request_types_data["constraints"]
        assert len(constraints) >= 1
    
    def test_request_types_have_sources(self, request_types_data):
        """Each request type should have source references."""
        for rtype in request_types_data["types"]:
            source = rtype.get("source", {})
            assert "local" in source, f"Request type {rtype['id']} missing local source"
            assert "upstream" in source, f"Request type {rtype['id']} missing upstream source"
