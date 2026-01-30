"""Tests for simulator adaptive branching logic."""

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


def calculate_active_stages(
    request_type: dict,
    risk_profile: str,
    constraints: set[str],
    stages: list[dict],
    risk_profiles: list[dict],
    constraint_data: list[dict],
) -> list[dict]:
    """Calculate which stages are active based on configuration.
    
    This mirrors the logic in SimulationViewScreen._calculate_active_stages()
    """
    type_stages = request_type.get("stages", {})
    
    # Get risk and constraint modifiers
    risk_modifiers = {}
    constraint_modifiers = {}
    
    for profile in risk_profiles:
        if profile["id"] == risk_profile:
            risk_modifiers = profile.get("stage_modifiers", {})
            break
    
    for c in constraint_data:
        if c["id"] in constraints:
            for stage_id, mods in c.get("stage_modifiers", {}).items():
                constraint_modifiers[stage_id] = mods
    
    result = []
    for stage in stages:
        stage_id = stage["id"]
        type_config = type_stages.get(stage_id, {"execute": "conditional"})
        
        # Determine execution status
        base_execute = type_config.get("execute", "conditional")
        
        # Check if constraints force execution
        if stage_id in constraint_modifiers:
            if constraint_modifiers[stage_id].get("force_execute"):
                base_execute = True
        
        # Check if risk profile affects execution
        if stage_id in risk_modifiers:
            if risk_modifiers[stage_id].get("force_execute"):
                base_execute = True
        
        # Determine status string
        if base_execute is True:
            status = "execute"
        elif base_execute is False:
            status = "skip"
        else:
            status = "conditional"
        
        result.append({
            "id": stage_id,
            "status": status,
        })
    
    return result


class TestGreenFieldPath:
    """Test adaptive branching for greenfield projects."""
    
    def test_greenfield_skips_reverse_engineering(self, stages_data, request_types_data):
        """Greenfield should skip reverse engineering stage."""
        greenfield = next(t for t in request_types_data["types"] if t["id"] == "greenfield")
        
        active = calculate_active_stages(
            greenfield,
            "medium",
            set(),
            stages_data["stages"],
            request_types_data["risk_profiles"],
            request_types_data["constraints"],
        )
        
        re_stage = next(s for s in active if s["id"] == "reverse-engineering")
        assert re_stage["status"] == "skip"
    
    def test_greenfield_executes_user_stories(self, stages_data, request_types_data):
        """Greenfield should execute user stories stage."""
        greenfield = next(t for t in request_types_data["types"] if t["id"] == "greenfield")
        
        active = calculate_active_stages(
            greenfield,
            "medium",
            set(),
            stages_data["stages"],
            request_types_data["risk_profiles"],
            request_types_data["constraints"],
        )
        
        us_stage = next(s for s in active if s["id"] == "user-stories")
        assert us_stage["status"] == "execute"
    
    def test_greenfield_executes_mandatory_stages(self, stages_data, request_types_data):
        """Greenfield should execute all mandatory stages."""
        greenfield = next(t for t in request_types_data["types"] if t["id"] == "greenfield")
        mandatory_stages = {"workspace-detection", "requirements-analysis", 
                          "workflow-planning", "code-generation", "build-and-test"}
        
        active = calculate_active_stages(
            greenfield,
            "medium",
            set(),
            stages_data["stages"],
            request_types_data["risk_profiles"],
            request_types_data["constraints"],
        )
        
        for stage_id in mandatory_stages:
            stage = next(s for s in active if s["id"] == stage_id)
            assert stage["status"] == "execute", f"Mandatory stage {stage_id} not executed"


class TestBrownfieldPath:
    """Test adaptive branching for brownfield projects."""
    
    def test_brownfield_executes_reverse_engineering(self, stages_data, request_types_data):
        """Brownfield should execute reverse engineering stage."""
        brownfield = next(t for t in request_types_data["types"] if t["id"] == "brownfield")
        
        active = calculate_active_stages(
            brownfield,
            "medium",
            set(),
            stages_data["stages"],
            request_types_data["risk_profiles"],
            request_types_data["constraints"],
        )
        
        re_stage = next(s for s in active if s["id"] == "reverse-engineering")
        assert re_stage["status"] == "execute"
    
    def test_brownfield_conditionalizes_user_stories(self, stages_data, request_types_data):
        """Brownfield user stories should be conditional."""
        brownfield = next(t for t in request_types_data["types"] if t["id"] == "brownfield")
        
        active = calculate_active_stages(
            brownfield,
            "medium",
            set(),
            stages_data["stages"],
            request_types_data["risk_profiles"],
            request_types_data["constraints"],
        )
        
        us_stage = next(s for s in active if s["id"] == "user-stories")
        assert us_stage["status"] == "conditional"


class TestBugfixPath:
    """Test adaptive branching for bugfix projects."""
    
    def test_bugfix_minimal_stages(self, stages_data, request_types_data):
        """Bugfix should have minimal stage execution."""
        bugfix = next(t for t in request_types_data["types"] if t["id"] == "bugfix")
        
        active = calculate_active_stages(
            bugfix,
            "low",
            set(),
            stages_data["stages"],
            request_types_data["risk_profiles"],
            request_types_data["constraints"],
        )
        
        # Should skip these
        skip_stages = {"user-stories", "application-design", "units-generation",
                      "functional-design", "nfr-requirements", "nfr-design", 
                      "infrastructure-design", "operations"}
        
        for stage_id in skip_stages:
            stage = next(s for s in active if s["id"] == stage_id)
            assert stage["status"] == "skip", f"Bugfix should skip {stage_id}"
    
    def test_bugfix_executes_reverse_engineering(self, stages_data, request_types_data):
        """Bugfix should execute reverse engineering to understand bug context."""
        bugfix = next(t for t in request_types_data["types"] if t["id"] == "bugfix")
        
        active = calculate_active_stages(
            bugfix,
            "low",
            set(),
            stages_data["stages"],
            request_types_data["risk_profiles"],
            request_types_data["constraints"],
        )
        
        re_stage = next(s for s in active if s["id"] == "reverse-engineering")
        assert re_stage["status"] == "execute"


class TestRiskModifiers:
    """Test that risk profiles modify stage execution."""
    
    def test_high_risk_forces_nfr_stages(self, stages_data, request_types_data):
        """High risk should force NFR stages to execute."""
        greenfield = next(t for t in request_types_data["types"] if t["id"] == "greenfield")
        
        active = calculate_active_stages(
            greenfield,
            "high",
            set(),
            stages_data["stages"],
            request_types_data["risk_profiles"],
            request_types_data["constraints"],
        )
        
        nfr_req = next(s for s in active if s["id"] == "nfr-requirements")
        nfr_design = next(s for s in active if s["id"] == "nfr-design")
        
        assert nfr_req["status"] == "execute", "High risk should force NFR requirements"
        assert nfr_design["status"] == "execute", "High risk should force NFR design"


class TestConstraintModifiers:
    """Test that constraints modify stage execution."""
    
    def test_regulated_constraint_forces_nfr(self, stages_data, request_types_data):
        """Regulated constraint should force NFR stages."""
        bugfix = next(t for t in request_types_data["types"] if t["id"] == "bugfix")
        
        # Without regulated constraint
        active_no_constraint = calculate_active_stages(
            bugfix,
            "low",
            set(),
            stages_data["stages"],
            request_types_data["risk_profiles"],
            request_types_data["constraints"],
        )
        
        # With regulated constraint
        active_with_constraint = calculate_active_stages(
            bugfix,
            "low",
            {"regulated"},
            stages_data["stages"],
            request_types_data["risk_profiles"],
            request_types_data["constraints"],
        )
        
        # NFR should be skip without constraint
        nfr_no = next(s for s in active_no_constraint if s["id"] == "nfr-requirements")
        assert nfr_no["status"] == "skip"
        
        # NFR should be execute with constraint
        nfr_with = next(s for s in active_with_constraint if s["id"] == "nfr-requirements")
        assert nfr_with["status"] == "execute"
    
    def test_security_critical_forces_nfr(self, stages_data, request_types_data):
        """Security-critical constraint should force NFR stages."""
        frontend = next(t for t in request_types_data["types"] if t["id"] == "frontend")
        
        active = calculate_active_stages(
            frontend,
            "low",
            {"security-critical"},
            stages_data["stages"],
            request_types_data["risk_profiles"],
            request_types_data["constraints"],
        )
        
        nfr_req = next(s for s in active if s["id"] == "nfr-requirements")
        nfr_design = next(s for s in active if s["id"] == "nfr-design")
        
        assert nfr_req["status"] == "execute"
        assert nfr_design["status"] == "execute"


class TestFrontendPath:
    """Test adaptive branching for frontend projects."""
    
    def test_frontend_prioritizes_user_stories(self, stages_data, request_types_data):
        """Frontend should execute user stories for UX focus."""
        frontend = next(t for t in request_types_data["types"] if t["id"] == "frontend")
        
        active = calculate_active_stages(
            frontend,
            "low",
            set(),
            stages_data["stages"],
            request_types_data["risk_profiles"],
            request_types_data["constraints"],
        )
        
        us_stage = next(s for s in active if s["id"] == "user-stories")
        assert us_stage["status"] == "execute"
    
    def test_frontend_skips_infra(self, stages_data, request_types_data):
        """Frontend should skip infrastructure design by default."""
        frontend = next(t for t in request_types_data["types"] if t["id"] == "frontend")
        
        active = calculate_active_stages(
            frontend,
            "low",
            set(),
            stages_data["stages"],
            request_types_data["risk_profiles"],
            request_types_data["constraints"],
        )
        
        infra_stage = next(s for s in active if s["id"] == "infrastructure-design")
        assert infra_stage["status"] == "skip"
