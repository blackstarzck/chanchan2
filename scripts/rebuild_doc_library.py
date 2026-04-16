#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
import re
from pathlib import Path


def slugify(text: str) -> str:
    lowered = text.lower().strip()
    parts: list[str] = []
    previous_was_dash = False
    for character in lowered:
        if character.isalnum():
            parts.append(character)
            previous_was_dash = False
            continue
        if not previous_was_dash:
            parts.append("-")
            previous_was_dash = True
    return "".join(parts).strip("-") or "section"


def split_markdown(doc_text: str, max_heading_depth: int) -> tuple[list[str], list[tuple[str, list[str]]]]:
    toc: list[str] = []
    sections: list[tuple[str, list[str]]] = []
    current_title = "overview"
    current_lines: list[str] = []

    for line in doc_text.splitlines():
        match = re.match(r"^(#{1,6})\s+(.*)$", line)
        if match:
            depth = len(match.group(1))
            title = match.group(2).strip()
            if depth <= max_heading_depth:
                if current_lines:
                    sections.append((current_title, current_lines))
                current_title = title
                current_lines = [line]
                toc.append(f"{'  ' * max(depth - 1, 0)}- {title}")
                continue
        current_lines.append(line)

    if current_lines:
        sections.append((current_title, current_lines))
    return toc, sections


def build_library(repo_root: Path, registry_path: Path) -> int:
    payload = json.loads(registry_path.read_text(encoding="utf-8"))
    built = 0
    for entry in payload.get("documents", []):
        source = repo_root / entry["path"]
        if not source.exists():
            continue
        toc_config = entry.get("toc", {})
        max_chunk_lines = int(toc_config.get("max_chunk_lines", 120))
        max_heading_depth = int(toc_config.get("max_heading_depth", 3))
        text = source.read_text(encoding="utf-8")
        lines = text.splitlines()
        output_dir = repo_root / ".harness" / "document_library" / entry["doc_id"]
        output_dir.mkdir(parents=True, exist_ok=True)

        if len(lines) <= max_chunk_lines:
            (output_dir / "INDEX.md").write_text(
                "# Index\n\n- source: " + entry["path"] + "\n- mode: direct\n- files:\n  - 00-source.md\n",
                encoding="utf-8",
            )
            (output_dir / "00-source.md").write_text(text, encoding="utf-8")
            built += 1
            continue

        toc, sections = split_markdown(text, max_heading_depth)
        section_rows: list[str] = []
        rendered_sections: list[tuple[str, list[str], str]] = []
        for index, (title, section_lines) in enumerate(sections, start=1):
            filename = f"{index:02d}-{slugify(title)}.md"
            rendered_sections.append((title, section_lines, filename))
            section_rows.append(f"  - {filename}: {title}")
        (output_dir / "INDEX.md").write_text(
            "# Index\n\n"
            "- source: "
            + entry["path"]
            + "\n- table of contents:\n"
            + "\n".join(toc)
            + "\n- files:\n"
            + "\n".join(section_rows)
            + "\n",
            encoding="utf-8",
        )
        for _title, section_lines, filename in rendered_sections:
            (output_dir / filename).write_text("\n".join(section_lines) + "\n", encoding="utf-8")
        built += 1
    return built


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Split long manuals into index plus section files.")
    parser.add_argument("--repo-root", default=".", help="Target repository root.")
    parser.add_argument("--registry", default="config/document_registry.json", help="Registry path relative to repo root.")
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    repo_root = Path(args.repo_root).resolve()
    registry = repo_root / args.registry
    if not registry.exists():
        registry = repo_root / "config" / "document_registry.example.json"
    built = build_library(repo_root, registry)
    print(f"Built document library entries: {built}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
