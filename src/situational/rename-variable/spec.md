# Rename Variable

## Guideline

- **Rename Variable**: When a variable name doesn't clearly communicate its purpose or intent

## Example: Area Calculation

```javascript
// Before
function calculateArea(height, width) {
  const a = height * width;
  return a;
}

// After
function calculateArea(height, width) {
  const area = height * width;
  return area;
}
```

## Motivation

Naming things well is the heart of clear programming. Variables with poor names make code harder to understand and maintain.

- **Communicate Intent**: Good names explain what the variable represents without requiring readers to look at its usage.
- **Context Matters**: The importance of a name depends on its scope—widely used variables need more careful naming.
- **Improve Readability**: Clear variable names act as inline documentation that's always up to date.
- **Reduce Cognitive Load**: Readers don't have to mentally translate cryptic abbreviations or generic names.
- **Facilitate Maintenance**: When names match the domain, future developers can understand and modify code more easily.
- **Enable Search**: Descriptive names are easier to search for across the codebase than single letters or abbreviations.

## Mechanics

- If the variable is used widely, consider Encapsulate Variable first to control access
- Find all references to the variable using your IDE or search tools
- Change all references at once if possible, or one at a time if you need to test incrementally
- Test after renaming to ensure no references were missed
- For persistent fields that last beyond a single function, take extra care with naming
