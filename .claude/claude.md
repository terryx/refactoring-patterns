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
Apply these when the conditions are met:

- **Extract Function**: When you need to spend effort understanding what a code fragment does
- **Inline Function**: When the function body is as clear as the function name (excessive indirection)
- **Extract Variable**: When expressions are complex or used multiple times
- **Inline Variable**: When the variable name doesn't communicate more than the expression itself
- **Replace Magic Literal**: When a literal value has special meaning that isn't immediately obvious, or when the same literal appears in multiple places
- **Combine Functions into Class**: When multiple functions operate on the same data structure
- **Replace Inline Code with Function Call**: When inline code duplicates behavior available in an existing function
- **Replace Primitive with Object**: When a primitive value needs validation, behavior, or is duplicated across the codebase
- **Replace Temp with Query**: When breaking up large functions or when the same calculation appears in multiple places
- **Extract Class**: When a class has multiple responsibilities or subsets of data that change together
- **Hide Delegate**: When a client is accessing a delegate object through a server, exposing unnecessary coupling
- **Remove Middle Man**: When a class has too many simple delegating methods that just forward to another class
- **Replace Conditional with Polymorphism**: When you have switch statements on type codes that appear in multiple functions
- **Replace Error Code with Exception**: When error codes clutter the normal execution path and errors should interrupt normal flow (use for truly exceptional conditions only)

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
