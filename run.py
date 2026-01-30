#!/usr/bin/env python3
"""Simple run script for AI-SDLC Explainer.

Usage:
    python run.py              # Normal mode
    python run.py --screenshot-mode  # Screenshot mode
    python run.py --help       # Show help
"""

import sys
from pathlib import Path

# Add src to path for development
src_path = Path(__file__).parent / "src"
sys.path.insert(0, str(src_path))

from aidlc_explainer.__main__ import main

if __name__ == "__main__":
    sys.exit(main())
