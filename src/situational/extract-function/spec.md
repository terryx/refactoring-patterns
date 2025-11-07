# Extract Function

## Guideline

- **Extract Function**: When you need to spend effort understanding what a code fragment does

## Example: Print Owing with Details

```javascript
// Before
function printOwing(invoice) {
  printBanner();
  const outstanding = calculateOutstanding(invoice);

  console.log(`name: ${invoice.customer}`);
  console.log(`amount: ${outstanding}`);
}

// After
function printOwing(invoice) {
  printBanner();
  const outstanding = calculateOutstanding(invoice);
  printDetails(invoice, outstanding);
}

function printDetails(invoice, outstanding) {
  console.log(`name: ${invoice.customer}`);
  console.log(`amount: ${outstanding}`);
}
```

## Motivation

If you have to spend effort looking at a fragment of code and figuring out what it's doing, extract it into a function and name the function after the "what."

- **Clarify Intent**: The function name communicates what the code does, making the code self-documenting.
- **Reduce Cognitive Load**: Readers can understand the high-level flow without diving into implementation details.
- **Enable Reuse**: Extracted functions can be reused in multiple places, reducing duplication.
- **Simplify Testing**: Smaller functions are easier to test in isolation than large monolithic functions.
- **Facilitate Changes**: When logic needs to change, you only need to modify it in one place.
- **Hide Complexity**: Implementation details are hidden behind a well-named function interface.
- **Short Functions**: Keep functions small and focused on a single purpose, making code easier to maintain.

## Mechanics

- Create a new function and name it after the intent of the function (name it by what it does, not by how it does it)
- Copy the extracted code from the source function into the new target function
- Scan the extracted code for references to any variables that are local in scope to the source function and will not be in scope for the extracted function - pass them as parameters
- Compile after all variables are dealt with to ensure no errors
- Replace the extracted code in the source function with a call to the target function
- Test to ensure behavior is preserved
