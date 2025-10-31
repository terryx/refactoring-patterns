# Replace Error Code with Exception

```javascript
// Before
function withdraw(amount) {
  if (amount > balance) {
    return -1
  }
  balance -= amount
  return 0
}

const result = withdraw(100)
if (result === -1) {
  console.error('Insufficient funds')
} else {
  console.log('Withdrawal successful')
}

// After
function withdraw(amount) {
  if (amount > balance) {
    throw new Error('Insufficient funds')
  }
  balance -= amount
}

try {
  withdraw(100)
  console.log('Withdrawal successful')
} catch (error) {
  console.error(error.message)
}
```

## Motivation

When a function encounters an error, it can either return a special error code or throw an exception.
Error codes force callers to check return values after every call, cluttering the normal execution path with error handling logic.

Exceptions separate the normal execution path from error handling, making the code easier to read.
They also automatically propagate up the call stack, so errors don't need to be explicitly checked and forwarded at every level.

However, exceptions should only be used for exceptional conditions—unexpected errors that should interrupt normal flow.
If something is expected to happen regularly (like a user entering invalid input), consider using explicit return values or validation instead.

## Mechanics

- Identify functions that return error codes to signal failure.
- Decide on appropriate exception types (use existing exception classes or create custom ones if needed).
- Replace the error code return with a throw statement.
- Update all callers to use try-catch blocks instead of checking error codes.
- If the function previously returned both success values and error codes, ensure the success path now uses a single return type.
- Test thoroughly, ensuring all error paths are covered.

## Notes

- Don't replace error codes with exceptions if the "error" is an expected part of normal operation.
- Exceptions add overhead, so they shouldn't be used for control flow in performance-critical code.
- Consider whether a simple boolean or null return value might be clearer than an exception.
- In some languages or contexts, exceptions may not be idiomatic—follow the conventions of your codebase.
- Be cautious about converting errors in pure functions or in code that emphasizes functional programming, where exceptions violate referential transparency.
