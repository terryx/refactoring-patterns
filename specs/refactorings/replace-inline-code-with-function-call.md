# Replace Inline Code with Function Call

```javascript
// Before
let appliesToMass = false
for (const s of states) {
    if (s === 'MA') appliesToMass = true
}

// After
appliesToMass = states.includes('MA')
```

## Motivation

Functions exist to encapsulate common behavior. If you see inline code that does the same thing as an existing function, you'll usually want to replace that inline code with a function call. This includes both functions from libraries and functions you've written yourself.

The exception is when the inline code is doing something that is subtly different from what the function does, and that difference is important. In that case, the inline code should stay.

## Mechanics

- Replace the inline code with a call to the existing function.
- Test.
