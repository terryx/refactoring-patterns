# Refactoring Patterns Guide

A collection of refactoring patterns and coding guidelines designed to work with Claude Code for improved code quality and maintainability.

## About

This repository contains refactoring patterns and code guidelines based on [**Refactoring: Improving the Design of Existing Code** by Martin Fowler](https://martinfowler.com/books/refactoring.html). The patterns are structured to work seamlessly with Claude Code for automated refactoring assistance.

## Using This Guide in Your Project

You can integrate these refactoring patterns and guidelines into your own projects by copying the relevant files:

### Quick Setup

1. **Copy the `.claude` directory** to your project root:
   ```bash
   cp -r .claude /path/to/your/project/
   ```

2. **Copy the `specs` directory** to your project root:
   ```bash
   cp -r specs /path/to/your/project/
   ```

3. **Customize the guidelines** in `.claude/CLAUDE.md` to match your project's coding standards

### What You Get

#### `.claude/CLAUDE.md`
Modify this file to add your own project-specific rules, preferred libraries, or coding conventions.

#### `specs/refactorings/`
Contains documented refactoring patterns with:

- Before/after code examples
- Motivation for applying the refactoring
- Step-by-step mechanics

Each refactoring pattern can be referenced when working with Claude Code to guide systematic code improvements.

#### Supported Patterns

- [x] [Combine Functions into Class](specs/refactorings/combine-functions-into-class.md)
- [ ] Combine Functions into Transform
- [x] [Extract Class](specs/refactorings/extract-class.md)
- [x] [Extract Function](specs/refactorings/extract-function.md)
- [x] [Extract Variable](specs/refactorings/extract-variable.md)
- [x] [Inline Function](specs/refactorings/inline-function.md)
- [x] [Inline Variable](specs/refactorings/inline-variable.md)
- [x] [Rename Variable](specs/refactorings/rename-variable.md)
- [x] [Replace Conditional with Polymorphism](specs/refactorings/replace-conditional-with-polymorphism.md)
- [ ] Encapsulate Variable
- [ ] Introduce Parameter Object
- [x] [Replace Nested Conditional with Guard Clauses](specs/refactorings/replace-nested-conditional-with-guard-clauses.md)
- [x] [Replace Primitive with Object](specs/refactorings/replace-primitive-with-object.md)
- [x] [Replace Temp with Query](specs/refactorings/replace-temp-with-query.md)
- [x] [Substitute Algorithm](specs/refactorings/substitute-algorithm.md)

### Workflow

#### Option 1: Using Slash Commands (Recommended)

Create custom slash commands in `.claude/commands/` to apply refactoring patterns:

1. **Create a refactoring command** (e.g., `.claude/commands/refactor.md`):
   ```markdown
   Apply refactoring patterns from specs/refactorings/ to improve code quality.

   Review the code and:
   1. Identify applicable refactoring patterns from specs/refactorings/
   2. Apply the patterns following their mechanics
   3. Ensure all changes follow the guidelines in .claude/CLAUDE.md
   ```

2. **Use the command**:
   ```
   /refactor path/to/file.js
   ```

This approach allows Claude Code to automatically select and apply the most appropriate refactoring patterns without manually choosing individual specs.

#### Option 2: Direct Pattern Reference

**Reference specific patterns** when you know which refactoring to apply:
   ```
   "Apply the Extract Function pattern from specs/refactorings/extract-function.md to this code"
   ```

---

## Adding More Patterns

To add new refactoring patterns:

1. Create a new file in `specs/refactorings/[pattern-name].md`
2. Follow this structure:
   ```markdown
   # Pattern Name

   ```[language]
   // before
   [example code]

   // after
   [refactored code]
   ```

   ## Motivation
   [Why apply this refactoring]

   ## Mechanics
   - [Step-by-step instructions]
   ```


## Reference

These patterns are based on **Refactoring: Improving the Design of Existing Code (2nd Edition)** by Martin Fowler.

- Book: https://martinfowler.com/books/refactoring.html
- Catalog: https://refactoring.com/catalog/

## License

This guide structure is MIT-licensed (see LICENSE). Please refer to the original book for detailed explanations and the complete catalog of refactoring patterns.
