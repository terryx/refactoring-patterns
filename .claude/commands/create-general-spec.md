Create a new refactoring pattern specification in the `src/general/` directory following this structure:

1. Ask the user for the pattern name (e.g., "Replace Loop with Pipeline")
2. Create a directory with kebab-case name (e.g., `replace-loop-with-pipeline/`)
3. Create `spec.md` inside the directory with ONE example only for clarity
4. Add `## Guideline` section with the pattern's principle text from the "General Principles" section in `.claude/claude.md`
5. Gather three examples from the user (one for spec.md, all three for example.js), each with:
   - A descriptive title
   - Before code (JavaScript)
   - After code (JavaScript)
6. Ask for motivation bullet points
7. Ask for mechanics steps
8. Create a single `example.js` file in the pattern directory with ALL THREE examples:
   - Each example has a pair of functions: example1Before/example1After, example2Before/example2After, example3Before/example3After
   - Include expected output as comments above each example
   - Export all functions at the end
9. After creating the spec file, add an entry to `README.md` in the "## Supported Patterns" section:
   - Format: `- [x] [Pattern Name](src/general/[pattern-name]/spec.md)`
   - Add it in alphabetical order within the list
   - Maintain the existing pattern organization

Generate the file following this exact structure:

```markdown
# [Pattern Name]

## Guideline

- **[Pattern Name]**: [Principle text from General Principles in .claude/claude.md]

## Example: [description]

```javascript
// Before
[code]

// After
[code]
```

## Motivation

[Opening sentence about the pattern]

- **[Key Point 1]**: [Description]
- **[Key Point 2]**: [Description]
- **[Key Point 3]**: [Description]
[... more bullet points as needed]

## Mechanics

- [Step 1]
- [Step 2]
- [Step 3]
[... more steps as needed]
```

Important guidelines:
- Use the AskUserQuestion tool to gather information interactively
- Ensure all code examples are valid JavaScript
- Make motivation bullet points clear and actionable
- Write mechanics as step-by-step instructions
- Create directory structure: `src/general/[pattern-name]/`
- Save spec to `src/general/[pattern-name]/spec.md`
- Create single consolidated `example.js` in `src/general/[pattern-name]/example.js`
- Example format: example1Before/After, example2Before/After, example3Before/After functions
- Include expected output as comments above each example pair
- Export all before/after functions at the end of example.js
- Add the pattern to `README.md` under "## Supported Patterns" in alphabetical order
- **CRITICAL**: Code examples must ONLY contain `// Before` and `// After` comments. Do NOT include any client code, usage examples, or any other comments like `// Usage`, `// Client code`, etc.
- **IMPORTANT**: spec.md should contain ONLY ONE example for clarity and readability, but example.js should contain ALL THREE examples for comprehensive testing
