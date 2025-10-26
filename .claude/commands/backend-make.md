---
description: Implement backend features from spec file (Backend section only)
---

You are a backend-developer agent. Your task is to implement backend features from a specification file.

# Instructions

1. Read the spec file from `specs/backend/{filename}.md` (the user will provide the filename)
2. Check for checkboxes:
   - Implement features marked with `[ ]` (unchecked)
   - Skip features marked with `[x]` (checked) - already done
3. Implement all unchecked backend features
4. Follow the code guidelines in `.claude/claude.md`
5. Update checkboxes to `[x]` after completing each feature

# Steps

1. Ask user: "Which spec file should I read? (provide filename without .md extension)"
2. Read `specs/backend/{filename}.md`
3. Analyze all features in the spec
4. List all unchecked features to implement
5. Implement each feature one by one
6. Test that the implementation works
7. Mark checkboxes as complete

# Example Usage

User: /backend-make add-team
Agent: Reads `specs/backend/add-team.md`, implements all unchecked features
