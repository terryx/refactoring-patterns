# Code Guidelines

## Writing New Code
Apply all principles from the start—never write code that needs immediate refactoring:

- **Before writing**: Consider which patterns apply to the task
- **While writing**: Apply Extract Function, Extract Variable, Guard Clauses, etc. as you go
- **After writing**: Review against General and Situational Principles below
- **Never**: Write "quick and dirty" code first with plans to refactor later

## General Principles
- **Consolidate Conditional Expression**: Combine multiple conditionals that produce the same result into a single expression with clear naming
- **Decompose Conditional**: Extract complex conditional logic into well-named functions that clearly communicate intent
- **Encapsulate Collection**: Provide methods to add/remove items instead of exposing the collection directly—return copies, not references
- **Guard Clauses**
    - Use guard clauses in the same top-to-bottom order as the original code.
    - Include negations of earlier conditions to preserve logic when conditions overlap.
    - Do not reorder checks unless mutual exclusivity is guaranteed in the original code.
- **Remove Dead Code**: After refactoring a file, remove all unused code including variables, functions, constants, and exports. For unused exports that have tests, delete the tests first then delete the export. For internal unused code (variables, functions, constants), delete it immediately
- **Remove Flag Argument**: Replace boolean parameters with explicit function calls that clearly state intent
- **Replace Inline Code with Function Call**: Always use existing functions instead of duplicating their logic inline
- **Replace Loop with Pipeline**: Transform imperative loops into declarative pipeline operations to quickly see what elements are included and how they're transformed
- **Split Variable**: Give each variable one clear purpose—never reuse variable names for different concepts

## Situational Principles
- **Combine Functions into Class**: When multiple functions operate on the same data structure
- **Extract Class**: When a class has multiple responsibilities or subsets of data that change together
- **Extract Function**: When code is 3+ lines, contains business logic, or would need a comment to explain—not for trivial wrappers
- **Extract Variable**: When expressions are complex or used multiple times—ensure the name accurately describes the value in all cases
- **Hide Delegate**: When a client is accessing a delegate object through a server, exposing unnecessary coupling
- **Inline Function**: When the function is 1-2 lines performing only primitive operations (checks, operators, constructors) without conditional branching—use well-named variables instead
- **Inline Variable**: When a variable is used only once and its name adds no clarity beyond the expression—write the expression directly
- **Introduce Special Case**: When many users of a data structure check for a specific value and most do the same thing
- **Preserve Whole Object**: When you're passing multiple values from the same object as parameters
- **Remove Middle Man**: When a method only forwards calls to another object without adding value—inline the delegate call at the call site
- **Replace Primitive with Object**: When a primitive value needs validation, behavior, or the same validation appears in multiple places
- **Replace Temp with Query**: When breaking up large functions or when the same calculation appears in multiple places
- **Rename Variable**: When a variable name doesn't clearly communicate its purpose or intent
- **Replace Command with Function**: When a command object provides no significant benefit over a simple function
- **Strategy Pattern**: When you have different algorithms or behaviors that need to be interchangeable, and you want to encapsulate each one independently
- **Replace Constructor with Factory Function**: When constructors have limitations (fixed naming, type constraints, or require special operators) that prevent clear expression of intent or flexible object creation
- **Replace Error Code with Exception**: When error handling with return codes obscures the normal flow of logic or when errors need to propagate up the call stack
- **Replace Function with Command**: When a function needs additional operations like undo, queuing, lifecycle management, or complex parameterization that simple functions cannot provide
- **Replace Magic Literal**: When a literal value has special meaning that isn't immediately obvious or when the same literal appears in multiple places
- **Substitute Algorithm**: When you find a clearer or simpler way to achieve the same result

## JavaScript
Apply these when the conditions are met (both when writing new code AND when refactoring existing code):

- **Imports**: Use static ESM imports only (no dynamic `import()` or `require()`)
- **Exports**: Use ESM exports (no CommonJS)
- **Exceptions**: Never throw exceptions that are caught locally—use control flow instead
- **Promise Chains**: Prefer `.then().catch()` over defining and immediately calling async functions
- **Top-level Promises**: Use `void` operator for top-level function calls that return promises with complete internal error handling
- **Code Formatting**: Follow Prettier or ESLint configurations defined in the project if they exist

## Documentation and Comments
- **Redundant Punctuation**: Avoid unnecessary commas in instructional text (e.g., "Create a new function and name it" instead of "Create a new function, and name it")
- **Avoid Condescending Language**: Remove words that imply something is obvious or simple when it might not be for all readers (e.g., "You can build a particle accelerator" instead of "You can just build a particle accelerator"). Words like "just", "simply", "obviously", "clearly", and "of course" can alienate readers who find the topic challenging

## Git Commits
- Follow [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)
- Use trunk-based development
- Omit "Generated with Claude Code" footer
