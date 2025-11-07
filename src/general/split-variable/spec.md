# Split Variable

## Guideline

- **Split Variable**: Give each variable one clear purpose—never reuse variable names for different concepts

## Example: Area and Perimeter Calculation

```javascript
// Before
function calculateDimensions(height, width) {
  let temp = height * width
  console.log(`Area: ${temp}`)
  temp = 2 * (height + width)
  console.log(`Perimeter: ${temp}`)
  return temp
}

// After
function calculateDimensions(height, width) {
  const area = height * width
  console.log(`Area: ${area}`)
  const perimeter = 2 * (height + width)
  console.log(`Perimeter: ${perimeter}`)
  return perimeter
}
```

## Motivation

Variables should represent one thing throughout their lifetime. When a variable is reused for multiple purposes, it becomes confusing what the variable represents at any given point in the code.

- **Clear Intent**: Each variable name communicates exactly what it represents, making code self-documenting
- **Easier Debugging**: When tracking a variable's value, you know it always represents the same concept
- **Prevent Errors**: Reusing variables for different purposes makes it easy to accidentally use the wrong value
- **Better Refactoring**: Single-purpose variables can be moved or extracted without worrying about which "version" of the variable you're dealing with
- **Improved Readability**: Readers don't need to track mental state changes to understand what a variable represents
- **Type Safety**: In typed languages, single-purpose variables enable better type checking

## Mechanics

- Identify variables that are assigned more than once for different purposes (not including legitimate accumulation or iteration)
- At the first assignment, change the variable declaration to use the new name that describes its purpose
- Change all references to the variable between the first assignment and the second assignment to use the new name
- At the second assignment, declare a new variable with a name that describes its different purpose
- Update all later references to use the appropriate variable name
- Test after each variable split to ensure behavior is preserved
- Repeat for each additional assignment that represents a different purpose
