# Replace Error Code with Exception

## Guideline

- **Replace Error Code with Exception**: When error handling with return codes obscures the normal flow of logic or when errors need to propagate up the call stack

## Example: Withdraw from Account

```javascript
// Before
function withdraw(amount) {
  if (amount > balance) {
    return -1
  }
  balance -= amount
  return 0
}

// After
function withdraw(amount) {
  if (amount > balance) {
    throw new Error('Insufficient funds')
  }
  balance -= amount
}
```

## Motivation

Error codes force callers to check return values after every function call, mixing error handling logic with normal program flow. This makes code harder to read and maintain.

- **Separate Concerns**: Exceptions separate error handling from normal logic, making the happy path clearer and easier to follow
- **Propagation**: Exceptions automatically propagate up the call stack, eliminating the need for manual error passing through intermediate functions
- **Explicit Handling**: Try-catch blocks make it clear where errors are handled, while error codes can be silently ignored
- **Rich Information**: Exception objects can carry additional context about the error beyond simple numeric codes
- **Type Safety**: Different exception types allow callers to handle different errors differently without complex conditionals

## Mechanics

- Decide whether the exception should be checked or unchecked (in JavaScript, all exceptions are unchecked)
- Find all callers of the function and adjust them to use try-catch blocks if needed
- Change the function to throw an exception instead of returning an error code
- Test after each change
- Remove error code handling logic from callers that no longer need it
