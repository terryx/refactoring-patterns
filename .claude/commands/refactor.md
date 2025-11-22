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
    - **ALWAYS apply when**:
        - A method returns a direct reference to an internal collection
        - A collection is exposed as a public field that external code can mutate
        - External code can call mutating operations on the collection directly
    - **Test**: If external code can mutate the collection without going through a method, this principle is violated
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

### Statement Placement (Move into Function vs Move to Callers)
Use Data Affinity Score to determine whether statements belong inside a function or with its callers.

**Data Affinity Score Formula:**
```
DAS = (function_data_references / total_data_references) * 100
```
Where:
- **Function data references**: Count of variables, properties, and parameters defined or primarily used within the function
- **Total data references**: All variables, properties, and parameters referenced in the statement(s)

**Decision Rules Based on DAS Score:**

1. **DAS 80-100 (High Affinity/Feature Envy)**: Move statements into function
    - Statements primarily reference data owned by the function
    - Moving statements inside improves cohesion
    - Reduces coupling between caller and function internals

2. **DAS 40-79 (Balanced)**: No action
    - Statements reference both caller and function data equally
    - Current placement is acceptable
    - Maintain existing structure

3. **DAS 0-39 (Low Affinity/Context Dependent)**: Move statements to callers
    - Statements primarily reference caller's data
    - Function is being asked to work with external context
    - Moving to callers improves encapsulation

### Function Complexity (Extract vs Inline)
Use maintainability index to determine whether to extract or inline a function.

**Maintainability Index Formula:**
```
MI = max(0, (171 - 5.2 * ln(HV) - 0.23 * CC - 16.2 * ln(LOC)) * 100 / 171)
```
Where:
- **HV (Halstead Volume)**: Complexity based on operators and operands
    - Count unique operators: `+, -, *, /, =, ==, !=, <, >, &&, ||, !, if, else, for, while, return, function calls, property access, array access`
    - Count unique operands: `variables, literals, constants, function names`
    - HV = (total operators + total operands) * log2(unique operators + unique operands)
    - Use HV = 1 for single-line expressions with ≤3 operators
- **CC (Cyclomatic Complexity)**: Number of decision points + 1
    - Add 1 for each: `if, else if, for, while, case, &&, ||, ternary, catch`
    - Minimum CC = 1 (straight-line code)
- **LOC (Lines of Code)**: Physical lines including braces and declarations

**Decision Rules Based on MI Score:**

1. **MI 0-39 (Complex/Hard to Read)**: Extract function
    - Code is too complex and needs to be broken down
    - Extract into smaller, focused functions with clear names
    - **Override: Do NOT extract if ANY apply:**
        - Function name merely restates what code obviously does
        - Inlining makes parent function easier to understand
        - Creates trivial one-line wrapper with no clarity benefit
    - **Scope Strategy**:
        - **Default to Nested**: Define as nested function within parent
        - **Promote to Top-Level**: Only if used by 2+ parent functions in same file
        - **Promote to Module**: Only export if used by multiple files

2. **MI 40-79 (Balanced)**: Do nothing
    - Code complexity is acceptable
    - Maintain current structure
    - Exception: Extract if same logic appears in multiple places

3. **MI 80-100 (Trivial/Over-abstracted)**: Inline function
    - Function is too simple and adds unnecessary indirection
    - Inline the function body at call site
    - Use well-named variable if needed for clarity

**Special Cases (Always Apply First):**
- **Requires comment to explain what it does**: Extract regardless of MI score
- **Same logic in multiple places**: Extract regardless of MI score
- **Domain meaning function** (formatReportName, calculateTotal, validateEmail): Keep as function even if MI is 80-100

### Variable Management (Extract vs Inline)
Use token density metric to determine whether to extract or inline a variable.

**Token Density Formula:**
```
TD = 100 - ((logic_tokens / total_tokens) * 100)
```
Where:
- **Logic tokens**: Count of operators, logic gates, parentheses, brackets
    - Operators: `+, -, *, /, %, =, ==, ===, !=, !==, <, >, <=, >=`
    - Logic gates: `&&, ||, !, &, |, ^, ~, <<, >>`
    - Grouping: `(, ), [, ], {, }`
    - Ternary: `?`, `:`
    - Optional chaining/nullish: `?.`, `??`
- **Total tokens**: All tokens in the expression (variables, literals, operators, function calls, property access)

**Decision Rules Based on TD Score:**

1. **TD 0-39 (Dense/Complex)**: Extract variable
    - Too many logic gates, operators, or nested parentheses
    - Expression is hard to parse mentally
    - Use well-named variable to clarify intent

2. **TD 40-79 (Standard)**: Context-dependent
    - **Extract if**:
        - Used multiple times
        - Variable name provides meaningful context not obvious from expression
        - Naming an intermediate concept improves readability
    - **Inline if**:
        - Used only once
        - Variable name adds no clarity beyond the expression itself
        - Expression is immediately understandable

3. **TD 80-100 (Trivial)**: Inline variable
    - Expression is simple constant assignment or single property access
    - Variable adds unnecessary indirection
    - Inline at usage point

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
