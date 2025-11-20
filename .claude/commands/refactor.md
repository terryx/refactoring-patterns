Refactor a code file following the guidelines in `.claude/claude.md`.

## Instructions

1. **Get the file path**:
   - If the user provided a file path as an argument, use it
   - If no argument was provided, ask the user which file to refactor

2. **Read and analyze the file**:
   - Read the file contents
   - Detect the programming language
   - Analyze the code against the guidelines in `.claude/claude.md`
   - Identify applicable refactoring patterns from both General Principles and Situational Principles

3. **Create a refactoring plan**:
   - List all refactoring opportunities found
   - Organize them by category (General Principles, Situational Principles, language-specific)
   - Use the TodoWrite tool to track the refactoring tasks

4. **Present findings to the user**:
   - Show what patterns/principles apply
   - Explain why each refactoring would improve the code
   - Ask the user if they want to proceed with all refactorings or select specific ones

5. **Apply refactorings**:
   - Apply each refactoring one at a time
   - Mark each todo as completed after applying it
   - Ensure the refactored code follows all applicable guidelines from `.claude/claude.md`

6. **Review the result**:
   - After all refactorings are complete, review the final code
   - Ensure no violations of the guidelines remain
   - Remove any dead code that was identified

## Important Notes

- `.claude/claude.md` is the source of truth for all refactoring guidelines
- Apply all General Principles and Situational Principles as written in `.claude/claude.md`
- The guidelines are language-agnostic and can be applied to any programming language
- Adapt pattern implementations to the idioms and conventions of the detected language
- Preserve code behavior exactly—refactoring should not change functionality
- If no refactoring opportunities are found, inform the user that the code already follows the guidelines
