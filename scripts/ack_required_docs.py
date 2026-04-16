#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Acknowledge required documents for a turn.")
    parser.add_argument("--repo-root", default=".", help="Target repository root.")
    parser.add_argument("--session-id", required=True, help="Session identifier.")
    parser.add_argument("--turn-id", required=True, help="Turn identifier.")
    parser.add_argument("--input", default=None, help="JSON file containing note and per-document constraints.")
    parser.add_argument("--output", default=None, help="Optional path where the acknowledgement template should be written.")
    parser.add_argument("--template", action="store_true", help="Print or write a template instead of acknowledging.")
    parser.add_argument("--auto", action="store_true", help="Generate acknowledgement content automatically for demo or tests.")
    return parser.parse_args()


def default_template_path(repo_root: Path, session_id: str, turn_id: str) -> Path:
    return repo_root / ".harness" / "acks" / f"{session_id}-{turn_id}.json"


def main() -> int:
    args = parse_args()
    repo_root = Path(args.repo_root).resolve()
    sys.path.insert(0, str(repo_root))

    from generated_harness import HarnessRuntime

    runtime = HarnessRuntime(repo_root)

    if args.template:
        template = runtime.build_acknowledgement_template(session_id=args.session_id, turn_id=args.turn_id)
        if args.output:
            output_path = Path(args.output).resolve()
        else:
            output_path = default_template_path(repo_root, args.session_id, args.turn_id)
        output_path.parent.mkdir(parents=True, exist_ok=True)
        output_path.write_text(json.dumps(template, ensure_ascii=False, indent=2), encoding="utf-8")
        print(f"Wrote acknowledgement template to {output_path}")
        return 0

    if args.auto:
        acknowledgement = runtime.acknowledge_required_docs(
            session_id=args.session_id,
            turn_id=args.turn_id,
            auto=True,
        )
        print(f"Acknowledged {len(acknowledgement['documents'])} documents for turn {args.turn_id}.")
        return 0

    if not args.input:
        raise SystemExit("Pass --template to create a template or --input to submit an acknowledgement JSON file.")

    input_path = Path(args.input).resolve()
    payload = json.loads(input_path.read_text(encoding="utf-8-sig"))
    acknowledgement = runtime.acknowledge_required_docs(
        session_id=args.session_id,
        turn_id=args.turn_id,
        note=payload.get("note"),
        documents=payload.get("documents", []),
    )
    print(f"Acknowledged {len(acknowledgement['documents'])} documents for turn {args.turn_id}.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
