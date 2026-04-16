from __future__ import annotations


BASE_QUESTIONS = [
    "Any risky changes left unresolved?",
    "Did you add or verify error handling?",
    "Did you check security impact for the touched areas?",
    "Is anything still missing from the requested scope?",
]


def build_post_run_questions(required_docs: list[dict], target_paths: list[str]) -> list[str]:
    labels = {label for doc in required_docs for label in doc.get("labels", [])}
    questions = list(BASE_QUESTIONS)
    if "backend" in labels:
        questions.append("Did you verify auth, permissions, and database rollback impact?")
    if "frontend" in labels:
        questions.append("Did you check loading, error, empty states, and accessibility?")
    if any("config" in path.lower() for path in target_paths):
        questions.append("Did you confirm environment or configuration defaults are safe?")
    deduped: list[str] = []
    seen: set[str] = set()
    for question in questions:
        if question in seen:
            continue
        seen.add(question)
        deduped.append(question)
    return deduped


def infer_open_risks(required_docs: list[dict], target_paths: list[str]) -> list[str]:
    risks: list[str] = []
    labels = {label for doc in required_docs for label in doc.get("labels", [])}
    if "backend" in labels:
        risks.append("Backend changes often need explicit auth and error-path review.")
    if "frontend" in labels:
        risks.append("Frontend changes often miss loading, empty, or accessibility states.")
    if any("db" in path.lower() or "schema" in path.lower() for path in target_paths):
        risks.append("Schema changes should include rollback notes and downstream compatibility checks.")
    return risks
