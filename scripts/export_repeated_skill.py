#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Export a repeated workflow suggestion as a reusable skill.")
    parser.add_argument("--repo-root", default=".", help="Target repository root.")
    parser.add_argument("--skill-id", default=None, help="Specific suggested skill id to export. Defaults to latest suggestion.")
    parser.add_argument("--overwrite", action="store_true", help="Overwrite an existing generated skill.")
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    repo_root = Path(args.repo_root).resolve()
    sys.path.insert(0, str(repo_root))

    from generated_harness.skill_registry import SkillRegistry

    memory_path = repo_root / ".harness" / "requirement_memory.json"
    if not memory_path.exists():
        raise SystemExit("No requirement memory exists yet. Run repeated turns first.")

    memory = json.loads(memory_path.read_text(encoding="utf-8"))
    suggestions = memory.get("skill_suggestions", [])
    if args.skill_id:
        suggestions = [suggestion for suggestion in suggestions if suggestion.get("skill_id") == args.skill_id]
    if not suggestions:
        raise SystemExit("No repeated workflow skill suggestion found.")

    registry = SkillRegistry(repo_root)
    output_path = registry.export_repeated_skill(suggestions[-1], overwrite=args.overwrite)
    print(f"Exported repeated workflow skill to {output_path}")
    print(f"Exported skill README to {output_path.with_name('README.md')}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
