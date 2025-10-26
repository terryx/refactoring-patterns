# Code Guidelines

## Working with Specifications
- **Checkboxes**: Only implement features marked with `[ ]` (unchecked)
- **Completed**: Skip items marked with `[x]` (checked) - already implemented
- **Verify**: Check spec files for checkbox status before starting work
- **Refactorings**: Apply guiding principles from specs/refactorings/*.md when restructuring code

## General Principles
- **Guard Clauses**: Handle invalid cases early and return immediately
- **Branching**: Use switch/pattern matching/lookup tables for single discriminators
- **CQS**: Functions either return data OR cause effects, never both
- **External Services**: Isolate into dedicated components, separate from domain logic
- **Redundant Variables**: Avoid variables that are immediately returned without transformation

## JavaScript
- **Imports**: Use static ESM imports only (no dynamic `import()` or `require()`)
- **Exports**: Use ESM exports (no CommonJS)
- **Exceptions**: Never throw exceptions that are caught locally—use control flow instead
- **Promise Chains**: Prefer `.then().catch()` over defining and immediately calling async functions
- **Code Formatting**: Follow Prettier or ESLint configurations defined in the project if they exist

## Git Commits
- Follow [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)
- Use trunk-based development
- Omit "Generated with Claude Code" footer
