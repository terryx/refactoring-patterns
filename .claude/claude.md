# Code Guidelines

## Working with Specifications
- **Checkboxes**: Only implement features marked with `[ ]` (unchecked)
- **Completed**: Skip items marked with `[x]` (checked) - already implemented
- **Verify**: Check spec files for checkbox status before starting work

## General Principles
- **Guard Clauses**: Handle edge cases early with immediate returns to reduce nesting
- **Clear Naming**: Name variables, functions, and classes by intent—descriptive names are the heart of readable code
- **Self-Documenting Code**: Extract complex expressions into well-named variables/functions rather than adding comments
- **Simplicity**: Prefer simpler, more readable algorithms over complex ones

## Situational Principles
Apply these when the conditions are met (refer to `specs/refactorings/` for detailed mechanics):

- **Extract Function**: When you need to spend effort understanding what a code fragment does
- **Inline Function**: When the function body is as clear as the function name (excessive indirection)
- **Extract Variable**: When expressions are complex or used multiple times
- **Inline Variable**: When the variable name doesn't communicate more than the expression itself
- **Combine Functions into Class**: When multiple functions operate on the same data structure
- **Replace Primitive with Object**: When a primitive value needs validation, behavior, or is duplicated across the codebase
- **Replace Temp with Query**: When breaking up large functions or when the same calculation appears in multiple places
- **Extract Class**: When a class has multiple responsibilities or subsets of data that change together
- **Replace Conditional with Polymorphism**: When you have switch statements on type codes that appear in multiple functions

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
