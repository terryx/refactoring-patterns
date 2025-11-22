# Code Guidelines

## Writing New Code
Apply all principles from the start—never write code that needs immediate refactoring:

- **Before writing**: Consider which patterns apply to the task
- **While writing**: Apply Extract Function, Extract Variable, Guard Clauses, Replace Loop with Pipeline, etc. as you go
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
- **Replace Loop with Pipeline**: Shift from imperative iteration to declarative data flow.
    - **Goal**: Describe *what* results you want (e.g., "select active items"), not *how* to iterate.
    - **Preferred Operations**: Use collection pipeline operators to **Filter** (select), **Map** (transform), and **Find** (locate).
    - **Guardrails**:
        1.  **Purity Requirement**: Only use pipelines for pure data transformations. If the loop body performs side effects (e.g., I/O, modifying external variables), retain the standard loop.
        2.  **Avoid Complex Aggregations**: Be cautious with complex "Fold" or "Reduce" operations. If the accumulation logic is dense or hard to follow, a standard loop is often more readable.
- **Split Variable**: Give each variable one clear purpose—never reuse variable names for different concepts

## Situational Principles

### Code Organization (Class/Module Level)
- **Combine Functions into Class**: When multiple functions operate on the same data structure
- **Extract Class**: When a class has multiple responsibilities or subsets of data that change together
- **Hide Delegate**: When a client is accessing a delegate object through a server, exposing unnecessary coupling
- **Remove Middle Man**: When a method only forwards calls to another object without adding value—inline the delegate call at the call site

### Function Complexity (Extract vs Inline)
**IMPORTANT**: These principles can conflict. Apply them in the following priority order:

1. **Inline Function**: When a function meets ALL of these criteria, inline it and use a well-named variable instead:
    - 1-2 lines of code
    - Contains ONLY primitive operations: property access, arithmetic operators, comparison operators, logical operators, simple constructors, single property/method calls
    - NO array methods (map, filter, reduce, find, etc.)
    - NO string construction with 3+ parts (concatenation or template literals)
    - NO conditional branching (if/else/switch/ternary)
    - NO loops or recursion
    - NO regex
    - Examples to inline: `getTotal() { return this.price * this.quantity }`, `isValid() { return this.value != null }`

2. **Extract Function**: If the code does NOT qualify for inlining, use the point system (≥2 points to extract, points stack):
    - 4+ statements (variable declarations, assignments, calls, guard clauses, returns) = 2 points
    - Conditional branching (if/else/switch/ternary) = 1 point
    - Loops or recursion = 1 point
    - Array methods (map, filter, reduce, find, etc.) = 1 point each
    - String construction with 3+ interpolated parts = 1 point
    - Regex patterns = 1 point
    - Requires a comment to explain what it does or business rules = 2 points (auto-extract)
    - Same logic appears in multiple places = 2 points (auto-extract)
    - Score after extracting nested functions, not before. Related guard clauses extract together.
    - **When NOT to Extract** (never extract if ANY apply):
        - Function name merely restates what code obviously does
        - Inlining makes parent function easier to understand
        - Creates trivial one-line wrapper with no clarity benefit
    - **Scope Strategy**:
        - **Default to Nested**: Define as nested function within parent
        - **Promote to Top-Level**: Only if used by 2+ parent functions in same file
        - **Promote to Module**: Only export if used by multiple files

3. **Inline Function as Variable**: If a function does NOT qualify for criteria 1 AND scores less than 2 points in criteria 2:
    - Keep as a function if the name describes domain meaning (formatReportName, calculateTotal, validateEmail)
    - Otherwise, if used only once: inline as a variable at the call site
    - Otherwise, if used multiple times: keep as a function following Scope Strategy

### Variable Management (Extract vs Inline)
**IMPORTANT**: These principles can conflict. Apply them in the following priority order:

1. **Inline Variable**: When a variable meets ALL of these criteria, inline it:
    - Used only once
    - The name adds no clarity beyond the expression itself
    - The expression is short and immediately understandable

2. **Extract Variable**: When expressions meet ANY of these criteria:
    - Complex or multi-part expressions
    - Used multiple times
    - The variable name provides meaningful context that isn't obvious from the expression
    - Extracting improves readability by naming an intermediate concept

### Control Flow and Behavior
- **Introduce Special Case**: When many users of a data structure check for a specific value and most do the same thing
- **Preserve Whole Object**: When you're passing multiple values from the same object as parameters
- **Rename Variable**: When a variable name doesn't clearly communicate its purpose or intent
- **Replace Primitive with Object**: When a primitive value needs validation, behavior, or the same validation appears in multiple places
- **Replace Temp with Query**: When breaking up large functions or when the same calculation appears in multiple places
- **Replace Magic Literal**: When a literal value has special meaning that isn't immediately obvious or when the same literal appears in multiple places
- **Substitute Algorithm**: When you find a clearer or simpler way to achieve the same result

### Function Representation (Function vs Command)
**IMPORTANT**: These principles are opposites. Choose based on requirements:

- **Replace Command with Function**: When a command object provides no significant benefit over a simple function
- **Replace Function with Command**: When a function needs additional operations like undo, queuing, lifecycle management, or complex parameterization that simple functions cannot provide

### Other Patterns
- **Strategy Pattern**: When you have different algorithms or behaviors that need to be interchangeable, and you want to encapsulate each one independently
- **Replace Constructor with Factory Function**: When constructors have limitations (fixed naming, type constraints, or require special operators) that prevent clear expression of intent or flexible object creation
- **Replace Error Code with Exception**: When error handling with return codes obscures the normal flow of logic or when errors need to propagate up the call stack

## JavaScript
Apply these when the conditions are met (both when writing new code AND when refactoring existing code):

- **Imports**: Use static ESM imports only (no dynamic `import()` or `require()`)
- **Exports**: Use ESM exports (no CommonJS)
- **Exceptions**: Never throw exceptions that are caught locally—use control flow instead
- **Promise Chains**: Prefer `.then().catch()` over defining and immediately calling async functions
- **Top-level Promises**: Use `void` operator for top-level function calls that return promises with complete internal error handling
- **Code Formatting**: Follow Prettier or ESLint configurations defined in the project if they exist

## Documentation and Comments

### API Documentation Comments
Apply these rules in order:

1. **Remove the entire documentation comment if ALL of these are true**:
    - The function/method name clearly states what it does
    - All parameter names are self-descriptive
    - The return type/structure is obvious from the function name or signature
    - No special format requirements, constraints, or business rules exist

2. **Keep ONLY these specific elements** (remove everything else):
    - **Format requirements**: Exact patterns like "YYYY-MM-DD", "ISO 8601", "RFC 3339", regex patterns
    - **Validation rules**: Min/max values, allowed ranges, character limits not enforced by types
    - **Business rules**: Domain-specific constraints (e.g., "Must be after fiscal year start")
    - **Side effects**: Non-obvious mutations, I/O operations, or state changes
    - **Performance notes**: Complexity warnings (e.g., "O(n²) operation"), caching behavior
    - **Error conditions**: Non-obvious failure cases beyond type errors
    - **Examples**: Only for complex or non-intuitive APIs

3. **Never include**:
    - Parameter descriptions that just restate the parameter name
    - Generic descriptions like "The configuration object" or "Returns the result"
    - Type information already expressed in the type system or function signature
    - What the function does if the function name already says it

### Explanatory Comments
- **Never add comments that explain what code does** - extract to a well-named function instead
- **Only acceptable use**: Explaining WHY a non-obvious approach was chosen (e.g., "Using X instead of Y because of Z browser bug")

### Writing Style
- **Redundant Punctuation**: Avoid unnecessary commas in instructional text (e.g., "Create a new function and name it" instead of "Create a new function, and name it")
- **Avoid Condescending Language**: Remove words that imply something is obvious or simple when it might not be for all readers (e.g., "You can build a particle accelerator" instead of "You can just build a particle accelerator"). Words like "just", "simply", "obviously", "clearly", and "of course" can alienate readers who find the topic challenging

## Git Commits
- Follow [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)
- Use trunk-based development
- Omit "Generated with Claude Code" footer
