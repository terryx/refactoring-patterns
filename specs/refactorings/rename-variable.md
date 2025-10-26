# Rename Variable

```javascript
// before
let a = height * width

// after
let area = height * width
```

## Motivation

Naming things well is the heart of clear programming. The importance of a name depends on how widely it is used.
Persistent fields that last beyond a single function invocation require more careful naming.

## Mechanics

- If the variable is used widely, consider Encapsulate Variable.
- Find all references to the variable and change everyone.
- Test.