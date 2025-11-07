# Remove Flag Argument

## Guideline

- **Remove Flag Argument**: Replace boolean parameters with explicit function calls that clearly state intent

## Example: Element Visibility

```javascript
// Before
function setVisibility(element, isVisible) {
  if (isVisible) {
    element.style.display = 'block'
  } else {
    element.style.display = 'none'
  }
}

setVisibility(navbar, true)
setVisibility(sidebar, false)

// After
function show(element) {
  element.style.display = 'block'
}

function hide(element) {
  element.style.display = 'none'
}

show(navbar)
hide(sidebar)
```

## Motivation

Flag arguments force callers to pass boolean values that are meaningless without looking at the function implementation. This obscures the caller's intent and makes code harder to read.

- **Clear Intent**: `show(navbar)` immediately communicates what happens, while `setVisibility(navbar, true)` requires remembering what `true` means
- **Self-Documenting**: Function names eliminate the need to check documentation or implementation to understand behavior
- **Prevent Errors**: It's easy to accidentally pass the wrong boolean value, but hard to call the wrong explicitly-named function
- **Easier Refactoring**: Separate functions can evolve independently without complex conditional logic
- **Better API Design**: Explicit functions create clearer interfaces that are easier to understand and use correctly
- **Reduced Cognitive Load**: Readers don't need to mentally map boolean values to behavior

## Mechanics

- For each value of the flag, create an explicit function that implements that behavior
- Name each function to clearly communicate what it does (not just "doSomethingTrue" and "doSomethingFalse")
- Find all callers that pass a literal boolean value and replace them with calls to the appropriate explicit function
- If callers pass a variable instead of a literal, consider whether the code would be clearer with an if-else calling explicit functions
- Remove the original flag-based function once all callers are updated
- Test after each change to ensure behavior is preserved
