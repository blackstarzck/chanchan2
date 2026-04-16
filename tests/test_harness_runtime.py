from __future__ import annotations

import json
import tempfile
import unittest
from pathlib import Path

from generated_harness import HarnessRuntime
from generated_harness.document_gate import DocumentGateError
from generated_harness.requirement_analysis import RequirementAnalysisError
from scripts.rebuild_doc_library import build_library


class HarnessRuntimeTests(unittest.TestCase):
    def setUp(self) -> None:
        self.temp_dir = tempfile.TemporaryDirectory()
        self.repo_root = Path(self.temp_dir.name)
        (self.repo_root / "config").mkdir()
        (self.repo_root / "docs" / "guides").mkdir(parents=True)
        (self.repo_root / "src" / "backend").mkdir(parents=True)
        (self.repo_root / "src" / "frontend").mkdir(parents=True)

        registry = {
            "documents": [
                {
                    "doc_id": "backend-rules",
                    "path": "docs/guides/backend.md",
                    "summary": "Backend rules",
                    "priority": 10,
                    "keywords": ["api", "backend"],
                    "intent_patterns": ["fix", "add"],
                    "path_globs": ["src/backend/**"],
                    "content_patterns": ["router\\."],
                    "labels": ["backend"],
                    "section_hints": ["security"],
                    "toc": {"max_chunk_lines": 50, "max_heading_depth": 3},
                },
                {
                    "doc_id": "frontend-rules",
                    "path": "docs/guides/frontend.md",
                    "summary": "Frontend rules",
                    "priority": 8,
                    "keywords": ["ui", "frontend"],
                    "intent_patterns": ["fix", "add"],
                    "path_globs": ["src/frontend/**"],
                    "content_patterns": ["useState\\("],
                    "labels": ["frontend"],
                    "section_hints": ["a11y"],
                    "toc": {"max_chunk_lines": 50, "max_heading_depth": 3},
                },
            ]
        }
        (self.repo_root / "config" / "document_registry.json").write_text(json.dumps(registry), encoding="utf-8")
        (self.repo_root / "docs" / "guides" / "backend.md").write_text(
            "# Backend\n\n## Security\n\nCheck auth.\n\n## Error Handling\n\nReturn explicit errors.\n",
            encoding="utf-8",
        )
        (self.repo_root / "docs" / "guides" / "frontend.md").write_text(
            "# Frontend\n\n## Accessibility\n\nLabel controls.\n",
            encoding="utf-8",
        )
        (self.repo_root / "src" / "backend" / "api.py").write_text("router = object()\n", encoding="utf-8")
        (self.repo_root / "src" / "frontend" / "screen.tsx").write_text("useState()\n", encoding="utf-8")
        self.runtime = HarnessRuntime(self.repo_root)

    def tearDown(self) -> None:
        self.temp_dir.cleanup()

    def test_required_docs_match_and_block_write_until_ack(self) -> None:
        start = self.runtime.start_turn(
            user_input="Fix the API route and add better error handling",
            target_paths=["src/backend/api.py"],
        )
        analysis = self.runtime.store.latest_event(start["session_id"], "requirements.analyzed", start["turn_id"])
        self.assertIsNotNone(analysis)
        self.assertEqual(analysis["payload"]["status"], "completed")
        self.assertEqual([doc["doc_id"] for doc in start["required_documents"]], ["backend-rules"])
        with self.assertRaises(DocumentGateError):
            self.runtime.simulate_write(
                session_id=start["session_id"],
                turn_id=start["turn_id"],
                target_paths=["src/backend/api.py"],
            )
        self.runtime.acknowledge_required_docs(
            session_id=start["session_id"],
            turn_id=start["turn_id"],
            note="Reviewed backend constraints before execution.",
            documents=[
                {
                    "doc_id": "backend-rules",
                    "constraints": ["Use explicit API errors.", "Re-check auth and validation."],
                }
            ],
        )
        result = self.runtime.simulate_write(
            session_id=start["session_id"],
            turn_id=start["turn_id"],
            target_paths=["src/backend/api.py"],
        )
        self.assertEqual(result["status"], "noop")

    def test_agents_receive_role_skills(self) -> None:
        start = self.runtime.start_turn(
            user_input="Fix the API route and add better error handling",
            target_paths=["src/backend/api.py"],
        )
        self.assertTrue(start["planner_result"]["output"]["skills"])
        planner_assigned = self.runtime.store.latest_event(start["session_id"], "agent.assigned", start["turn_id"])
        self.assertTrue(planner_assigned["payload"]["skills"])

        self.runtime.acknowledge_required_docs(
            session_id=start["session_id"],
            turn_id=start["turn_id"],
            auto=True,
        )
        implementer = self.runtime.run_implementer(session_id=start["session_id"], turn_id=start["turn_id"])
        reviewer = self.runtime.run_reviewer(session_id=start["session_id"], turn_id=start["turn_id"])
        self.assertTrue(implementer["output"]["skills"])
        self.assertTrue(reviewer["output"]["skills"])

    def test_repeated_workflow_suggests_and_exports_skill(self) -> None:
        self.runtime.start_turn(
            user_input="Fix the API route and add better error handling",
            target_paths=["src/backend/api.py"],
        )
        repeated = self.runtime.start_turn(
            user_input="Fix the API route and add better error handling",
            target_paths=["src/backend/api.py"],
        )
        suggestions = repeated["requirement_analysis"]["skill_suggestions"]
        self.assertEqual(len(suggestions), 1)
        self.assertEqual(suggestions[0]["kind"], "repeated_workflow")

        memory = json.loads((self.repo_root / ".harness" / "requirement_memory.json").read_text(encoding="utf-8"))
        self.assertTrue(memory["skill_suggestions"])
        exported = self.runtime.skills.export_repeated_skill(suggestions[0])
        readme = exported.with_name("README.md")
        self.assertTrue(exported.exists())
        self.assertTrue(readme.exists())
        self.assertIn("workflow signature", exported.read_text(encoding="utf-8"))
        self.assertIn("What this skill is", readme.read_text(encoding="utf-8"))

    def test_mutating_tool_blocks_without_requirement_analysis(self) -> None:
        session_id = "manual-session"
        turn_id = "manual-turn"
        self.runtime.store.emit_event(session_id, "session.started", {"session_id": session_id})
        self.runtime.store.emit_event(
            session_id,
            "turn.started",
            {
                "turn_id": turn_id,
                "user_input": "Fix the API route",
                "target_paths": ["src/backend/api.py"],
            },
        )
        with self.assertRaises(RequirementAnalysisError):
            self.runtime.tool_gateway.execute(
                session_id=session_id,
                turn_id=turn_id,
                name="repo.write",
                payload={"target_paths": ["src/backend/api.py"]},
            )
        blocked = self.runtime.store.latest_event(session_id, "tool.blocked", turn_id)
        self.assertEqual(blocked["payload"]["reason"], "requirements analysis not completed")

    def test_empty_user_input_blocks_requirement_analysis(self) -> None:
        with self.assertRaises(RequirementAnalysisError):
            self.runtime.start_turn(user_input="   ", target_paths=["src/backend/api.py"])

    def test_unknown_and_mutating_tools_block_until_ack(self) -> None:
        start = self.runtime.start_turn(
            user_input="Fix the API route and add better error handling",
            target_paths=["src/backend/api.py"],
        )
        read_result = self.runtime.tool_gateway.execute(
            session_id=start["session_id"],
            turn_id=start["turn_id"],
            name="repo.read",
            payload={"target_paths": ["src/backend/api.py"]},
        )
        self.assertEqual(read_result["status"], "noop")

        for tool_name in ["repo.write", "sandbox.execute", "shell.run", "filesystem.write", "custom.tool"]:
            with self.subTest(tool_name=tool_name):
                with self.assertRaises(DocumentGateError):
                    self.runtime.tool_gateway.execute(
                        session_id=start["session_id"],
                        turn_id=start["turn_id"],
                        name=tool_name,
                        payload={"target_paths": ["src/backend/api.py"]},
                    )

    def test_ack_expires_when_required_document_changes(self) -> None:
        start = self.runtime.start_turn(
            user_input="Fix the API route and add better error handling",
            target_paths=["src/backend/api.py"],
        )
        self.runtime.acknowledge_required_docs(
            session_id=start["session_id"],
            turn_id=start["turn_id"],
            auto=True,
        )
        (self.repo_root / "docs" / "guides" / "backend.md").write_text(
            "# Backend\n\n## Security\n\nUpdated constraints.\n",
            encoding="utf-8",
        )
        with self.assertRaises(DocumentGateError):
            self.runtime.simulate_write(
                session_id=start["session_id"],
                turn_id=start["turn_id"],
                target_paths=["src/backend/api.py"],
            )

    def test_intent_only_match_does_not_pull_unrelated_doc(self) -> None:
        start = self.runtime.start_turn(
            user_input="Fix the backend API error handling",
            target_paths=["src/backend/api.py"],
        )
        self.assertEqual([doc["doc_id"] for doc in start["required_documents"]], ["backend-rules"])

    def test_ack_requires_constraints_per_document(self) -> None:
        start = self.runtime.start_turn(
            user_input="Add API validation",
            target_paths=["src/backend/api.py"],
        )
        with self.assertRaises(DocumentGateError):
            self.runtime.acknowledge_required_docs(
                session_id=start["session_id"],
                turn_id=start["turn_id"],
                note="Read the docs.",
                documents=[{"doc_id": "backend-rules", "constraints": []}],
            )

    def test_previous_memory_does_not_force_unrelated_doc_by_itself(self) -> None:
        self.runtime.start_turn(
            user_input="Fix the frontend screen states",
            target_paths=["src/frontend/screen.tsx"],
        )
        start = self.runtime.start_turn(
            user_input="Fix the API route",
            target_paths=["src/backend/api.py"],
        )
        self.assertEqual([doc["doc_id"] for doc in start["required_documents"]], ["backend-rules"])

    def test_reviewer_emits_questions_and_memory_updates(self) -> None:
        start = self.runtime.start_turn(
            user_input="Add API validation",
            target_paths=["src/backend/api.py"],
        )
        self.runtime.acknowledge_required_docs(
            session_id=start["session_id"],
            turn_id=start["turn_id"],
            auto=True,
        )
        review = self.runtime.run_reviewer(session_id=start["session_id"], turn_id=start["turn_id"])
        self.assertTrue(any("error handling" in question.lower() for question in review["output"]["questions"]))
        memory = json.loads((self.repo_root / ".harness" / "requirement_memory.json").read_text(encoding="utf-8"))
        self.assertIn("backend", memory["active_labels"])
        self.assertTrue(memory["acknowledged_constraints"])

    def test_reviewer_skips_browser_review_for_non_ui_scope(self) -> None:
        start = self.runtime.start_turn(
            user_input="Add API validation",
            target_paths=["src/backend/api.py"],
        )
        self.runtime.acknowledge_required_docs(
            session_id=start["session_id"],
            turn_id=start["turn_id"],
            auto=True,
        )
        review = self.runtime.run_reviewer(session_id=start["session_id"], turn_id=start["turn_id"])
        browser_review = review["output"]["browser_review"]
        self.assertEqual(browser_review["validator"], "playwright-mcp")
        self.assertEqual(browser_review["status"], "skipped")
        self.assertEqual(browser_review["applicability"], "not_applicable")

        validation = self.runtime.store.latest_event(start["session_id"], "validation.completed", start["turn_id"])
        self.assertEqual(validation["payload"]["status"], "skipped")

    def test_reviewer_marks_browser_review_unavailable_for_ui_scope_without_handler(self) -> None:
        start = self.runtime.start_turn(
            user_input="Fix the frontend screen state",
            target_paths=["src/frontend/screen.tsx"],
        )
        self.runtime.acknowledge_required_docs(
            session_id=start["session_id"],
            turn_id=start["turn_id"],
            auto=True,
        )
        review = self.runtime.run_reviewer(session_id=start["session_id"], turn_id=start["turn_id"])
        browser_review = review["output"]["browser_review"]
        self.assertEqual(browser_review["validator"], "playwright-mcp")
        self.assertEqual(browser_review["status"], "unavailable")
        self.assertEqual(browser_review["applicability"], "required")

    def test_reviewer_records_playwright_handler_result_for_ui_scope(self) -> None:
        runtime = HarnessRuntime(
            self.repo_root,
            browser_review_handler=lambda request: {
                "status": "passed",
                "summary": "Playwright MCP loaded the screen without console errors.",
                "artifacts": {"screenshot": "screenshots/screen.png"},
            },
        )
        start = runtime.start_turn(
            user_input="Fix the frontend screen state",
            target_paths=["src/frontend/screen.tsx"],
        )
        runtime.acknowledge_required_docs(
            session_id=start["session_id"],
            turn_id=start["turn_id"],
            auto=True,
        )
        review = runtime.run_reviewer(session_id=start["session_id"], turn_id=start["turn_id"])
        browser_review = review["output"]["browser_review"]
        self.assertEqual(browser_review["status"], "passed")
        self.assertEqual(browser_review["artifacts"]["screenshot"], "screenshots/screen.png")

        validation = runtime.store.latest_event(start["session_id"], "validation.completed", start["turn_id"])
        self.assertEqual(validation["payload"]["validator"], "playwright-mcp")
        self.assertEqual(validation["payload"]["status"], "passed")

    def test_continue_turn_runs_after_acknowledgement(self) -> None:
        start = self.runtime.start_turn(
            user_input="Fix the API route and add better error handling",
            target_paths=["src/backend/api.py"],
        )
        self.runtime.acknowledge_required_docs(
            session_id=start["session_id"],
            turn_id=start["turn_id"],
            auto=True,
        )
        continued = self.runtime.continue_turn(
            session_id=start["session_id"],
            turn_id=start["turn_id"],
        )
        self.assertEqual(continued["simulated_write"]["status"], "noop")
        self.assertIn("reviewer_result", continued)
        self.assertEqual(continued["quality_review"]["status"], "passed")
        self.assertEqual(continued["quality_review"]["fallback_action"], "complete")
        changed = self.runtime.store.latest_event(start["session_id"], "repo.changed", start["turn_id"])
        self.assertIsNotNone(changed)
        self.assertEqual(changed["payload"]["changed_paths"], ["src/backend/api.py"])

    def test_quality_review_warns_without_recorded_changes(self) -> None:
        start = self.runtime.start_turn(
            user_input="Fix the API route and add better error handling",
            target_paths=["src/backend/api.py"],
        )
        self.runtime.acknowledge_required_docs(
            session_id=start["session_id"],
            turn_id=start["turn_id"],
            auto=True,
        )
        self.runtime.run_reviewer(session_id=start["session_id"], turn_id=start["turn_id"])
        review = self.runtime.run_quality_review(session_id=start["session_id"], turn_id=start["turn_id"])
        self.assertEqual(review["status"], "needs_attention")
        self.assertEqual(review["fallback_action"], "complete_with_reminders")
        self.assertTrue(any(finding["category"] == "no_changes_recorded" for finding in review["findings"]))

    def test_quality_review_routes_failed_validation_to_fixer(self) -> None:
        start = self.runtime.start_turn(
            user_input="Fix the API route and add better error handling",
            target_paths=["src/backend/api.py"],
        )
        self.runtime.acknowledge_required_docs(
            session_id=start["session_id"],
            turn_id=start["turn_id"],
            auto=True,
        )
        self.runtime.simulate_write(
            session_id=start["session_id"],
            turn_id=start["turn_id"],
            target_paths=["src/backend/api.py"],
        )
        self.runtime.store.emit_event(
            start["session_id"],
            "validation.completed",
            {
                "turn_id": start["turn_id"],
                "status": "failed",
                "summary": "Type check failed in the touched backend file.",
                "target_paths": ["src/backend/api.py"],
            },
        )
        self.runtime.run_reviewer(session_id=start["session_id"], turn_id=start["turn_id"])
        review = self.runtime.run_quality_review(session_id=start["session_id"], turn_id=start["turn_id"])
        self.assertEqual(review["status"], "needs_attention")
        self.assertEqual(review["fallback_action"], "recommend_immediate_fix")
        fixer = self.runtime.run_fixer(
            session_id=start["session_id"],
            turn_id=start["turn_id"],
            findings=[finding["message"] for finding in review["findings"]],
        )
        self.assertEqual(fixer["status"], "recommended")

    def test_document_library_index_lists_section_files(self) -> None:
        (self.repo_root / "docs" / "guides" / "backend.md").write_text(
            "\n".join(
                [
                    "# Backend",
                    "Overview line.",
                    *[f"Overview detail {index}." for index in range(1, 45)],
                    "## Security",
                    "Check auth.",
                    "## Error Handling",
                    "Return explicit errors.",
                    "## Migrations",
                    "Keep rollback notes.",
                ]
            )
            + "\n",
            encoding="utf-8",
        )
        built = build_library(self.repo_root, self.repo_root / "config" / "document_registry.json")
        self.assertEqual(built, 2)
        index_text = (
            self.repo_root / ".harness" / "document_library" / "backend-rules" / "INDEX.md"
        ).read_text(encoding="utf-8")
        self.assertIn("- files:", index_text)
        self.assertIn("01-backend.md: Backend", index_text)
        self.assertIn("02-security.md: Security", index_text)


if __name__ == "__main__":
    unittest.main()
