#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Run one harness turn with required-document gating.")
    parser.add_argument("--repo-root", default=".", help="Target repository root.")
    parser.add_argument("--session-id", default=None, help="Resume an existing session.")
    parser.add_argument("--resume-turn", default=None, help="Resume execution for an existing turn after acknowledgement.")
    parser.add_argument("--user-input", default=None, help="User request for this turn.")
    parser.add_argument("--target-path", action="append", default=[], help="Target path touched by the request.")
    parser.add_argument("--auto-ack", action="store_true", help="Automatically acknowledge required docs using generated notes.")
    parser.add_argument("--json", action="store_true", help="Print machine-readable JSON only.")
    return parser.parse_args()


def print_required_documents(session_id: str, turn_id: str, output: dict[str, object], repo_root: Path) -> None:
    print(f"Session: {session_id}")
    print(f"Turn: {turn_id}")
    print("Required documents:")
    for doc in output["required_documents"]:
        reasons = ", ".join(f"{reason['kind']}:{reason['value']}" for reason in doc["reasons"])
        print(f"  - {doc['doc_id']} ({reasons})")
        for read_path in doc.get("read_paths", []):
            print(f"    read: {read_path}")
    print("Execution is paused until the acknowledgement file is filled and submitted.")
    analysis = output.get("requirement_analysis", {})
    suggestions = analysis.get("skill_suggestions", []) if isinstance(analysis, dict) else []
    if suggestions:
        print("Repeated workflow skill suggestions:")
        for suggestion in suggestions:
            print(f"  - {suggestion['skill_id']} -> {suggestion['suggested_path']}")
    print(
        "Next step: python scripts/ack_required_docs.py "
        f"--repo-root {repo_root} --session-id {session_id} --turn-id {turn_id} --template"
    )
    print(
        "After acknowledgement: python scripts/run_turn.py "
        f"--repo-root {repo_root} --session-id {session_id} --resume-turn {turn_id}"
    )


def print_browser_review(output: dict[str, object]) -> None:
    reviewer = output.get("reviewer_result", {})
    if not isinstance(reviewer, dict):
        return
    reviewer_output = reviewer.get("output", {})
    if not isinstance(reviewer_output, dict):
        return
    browser_review = reviewer_output.get("browser_review")
    if not isinstance(browser_review, dict):
        return
    print(f"Browser review: {browser_review.get('status')} ({browser_review.get('validator')})")
    print(f"  {browser_review.get('summary')}")


def main() -> int:
    args = parse_args()
    repo_root = Path(args.repo_root).resolve()
    sys.path.insert(0, str(repo_root))

    from generated_harness import HarnessRuntime

    runtime = HarnessRuntime(repo_root)

    if args.resume_turn:
        if not args.session_id:
            raise SystemExit("Pass --session-id when using --resume-turn.")
        output = runtime.continue_turn(session_id=args.session_id, turn_id=args.resume_turn)
        if args.json:
            print(json.dumps(output, ensure_ascii=False, indent=2))
            return 0
        print(f"Session: {output['session_id']}")
        print(f"Turn: {output['turn_id']}")
        print(f"Simulated write status: {output['simulated_write']['status']}")
        quality = output.get("quality_review", {})
        if quality:
            print(f"Quality review: {quality.get('status')} ({quality.get('fallback_action')})")
            findings = quality.get("findings", [])
            if findings:
                print("Quality findings:")
                for finding in findings:
                    print(f"  - [{finding['severity']}] {finding['message']}")
            reminders = quality.get("reminders", [])
            if reminders:
                print("Self-check reminders:")
                for reminder in reminders:
                    print(f"  - {reminder}")
        questions = output["reviewer_result"]["output"].get("questions", [])
        if questions:
            print("Reviewer reminder checklist:")
            for question in questions:
                print(f"  - {question}")
        print_browser_review(output)
        return 0

    if not args.user_input:
        raise SystemExit("Pass --user-input for a new turn or use --resume-turn to continue an existing one.")

    start = runtime.start_turn(user_input=args.user_input, target_paths=args.target_path, session_id=args.session_id)
    session_id = start["session_id"]
    turn_id = start["turn_id"]
    output = {
        "session_id": session_id,
        "turn_id": turn_id,
        "required_documents": start["required_documents"],
        "acknowledgement_template": start["acknowledgement_template"],
        "planner_result": start["planner_result"],
        "requirement_analysis": start["requirement_analysis"],
    }

    if args.auto_ack:
        output["acknowledgement"] = runtime.acknowledge_required_docs(session_id=session_id, turn_id=turn_id, auto=True)
    elif output["required_documents"]:
        output["status"] = "awaiting_doc_acknowledgement"
        output["next_action"] = (
            "Review the required documents and run scripts/ack_required_docs.py "
            f"--session-id {session_id} --turn-id {turn_id} --template"
        )
        if args.json:
            print(json.dumps(output, ensure_ascii=False, indent=2))
            return 0
        print_required_documents(session_id, turn_id, output, repo_root)
        return 0

    continued = runtime.continue_turn(session_id=session_id, turn_id=turn_id)
    output.update(continued)

    if args.json:
        print(json.dumps(output, ensure_ascii=False, indent=2))
        return 0

    print(f"Session: {session_id}")
    print(f"Turn: {turn_id}")
    print("Requirement analysis completed before execution.")
    print(f"Intents: {', '.join(output['requirement_analysis']['inferred_intents'])}")
    suggestions = output["requirement_analysis"].get("skill_suggestions", [])
    if suggestions:
        print("Repeated workflow skill suggestions:")
        for suggestion in suggestions:
            print(f"  - {suggestion['skill_id']} -> {suggestion['suggested_path']}")
    if output["required_documents"]:
        print("Required documents were acknowledged automatically.")
    print(f"Simulated write status: {output['simulated_write']['status']}")
    quality = output.get("quality_review", {})
    if quality:
        print(f"Quality review: {quality.get('status')} ({quality.get('fallback_action')})")
        findings = quality.get("findings", [])
        if findings:
            print("Quality findings:")
            for finding in findings:
                print(f"  - [{finding['severity']}] {finding['message']}")
        reminders = quality.get("reminders", [])
        if reminders:
            print("Self-check reminders:")
            for reminder in reminders:
                print(f"  - {reminder}")
    questions = output["reviewer_result"]["output"].get("questions", [])
    if questions:
        print("Reviewer reminder checklist:")
        for question in questions:
            print(f"  - {question}")
    print_browser_review(output)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
