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
This file contains coding guidelines that Claude Code will follow when working on your project:

- **Guard Clauses**: Early returns for invalid cases
- **Command-Query Separation (CQS)**: Functions either query data or modify state, never both
- **External Service Isolation**: Keep domain logic separate from external dependencies
- **JavaScript/ESM Best Practices**: Static imports, proper exports, promise handling
- **Git Conventions**: Conventional Commits, trunk-based development

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
- [x] [Extract Function](specs/refactorings/extract-function.md)
- [x] [Extract Variable](specs/refactorings/extract-variable.md)
- [x] [Inline Function](specs/refactorings/inline-function.md)
- [x] [Inline Variable](specs/refactorings/inline-variable.md)
- [x] [Rename Variable](specs/refactorings/rename-variable.md)
- [ ] Encapsulate Variable
- [ ] Introduce Parameter Object
- [ ] [Replace Nested Conditional with Guard Clauses](specs/refactorings/replace-nested-conditional-with-guard-clauses.md)

### Workflow

1. **Reference patterns** when requesting refactoring:
   ```
   "Apply the Extract Function pattern from specs/refactorings/extract-function.md to this code"
   ```

2. **Use checkboxes** in spec files to track implementation:
   - `[ ]` - Feature to implement
   - `[x]` - Already implemented

3. **Let Claude Code guide you** through the refactoring mechanics outlined in each pattern

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

This guide structure is MIT licensed (see LICENSE). Please refer to the original book for detailed explanations and the complete catalog of refactoring patterns.
