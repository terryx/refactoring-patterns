# Refactoring Patterns Guide

A collection of refactoring patterns and coding guidelines designed to work with Claude Code for improved code quality and maintainability.

## About

This repository contains refactoring patterns and code guidelines based on [**Refactoring: Improving the Design of Existing Code** by Martin Fowler](https://martinfowler.com/books/refactoring.html). The patterns are structured to work seamlessly with Claude Code for automated refactoring assistance.

## Using This Guide in Your Project

You can integrate these refactoring patterns and guidelines into your own projects by copying the relevant files:

### Quick Setup

**Copy the `.claude` directory** to your project root:
   ```bash
   cp -r .claude /path/to/your/project/
   ```

### What You Get

#### `.claude/CLAUDE.md`
Modify this file to add your own project-specific rules, preferred libraries, or coding conventions.

Each refactoring pattern can be referenced when working with Claude Code to guide systematic code improvements.

#### Supported Patterns

- [x] [Combine Functions into Class](specs/refactorings/combine-functions-into-class.md)
- [ ] Combine Functions into Transform
- [x] [Extract Class](specs/refactorings/extract-class.md)
- [x] [Extract Function](specs/refactorings/extract-function.md)
- [x] [Extract Variable](specs/refactorings/extract-variable.md)
- [x] [Hide Delegate](specs/refactorings/hide-delegate.md)
- [x] [Inline Function](specs/refactorings/inline-function.md)
- [x] [Inline Variable](specs/refactorings/inline-variable.md)
- [x] [Rename Variable](specs/refactorings/rename-variable.md)
- [x] [Remove Middle Man](specs/refactorings/remove-middle-man.md)
- [x] [Replace Conditional with Polymorphism](specs/refactorings/replace-conditional-with-polymorphism.md)
- [x] [Replace Error Code with Exception](specs/refactorings/replace-error-code-with-exception.md)
- [ ] Encapsulate Variable
- [ ] Introduce Parameter Object
- [x] [Replace Inline Code with Function Call](specs/refactorings/replace-inline-code-with-function-call.md)
- [x] [Replace Magic Literal](specs/refactorings/replace-magic-literal.md)
- [x] [Replace Nested Conditional with Guard Clauses](specs/refactorings/replace-nested-conditional-with-guard-clauses.md)
- [x] [Replace Primitive with Object](specs/refactorings/replace-primitive-with-object.md)
- [x] [Replace Temp with Query](specs/refactorings/replace-temp-with-query.md)
- [x] [Substitute Algorithm](specs/refactorings/substitute-algorithm.md)

## Reference

These patterns are based on **Refactoring: Improving the Design of Existing Code (2nd Edition)** by Martin Fowler.

- Book: https://martinfowler.com/books/refactoring.html
- Catalog: https://refactoring.com/catalog/

## License

This guide structure is MIT-licensed (see LICENSE). Please refer to the original book for detailed explanations and the complete catalog of refactoring patterns.
