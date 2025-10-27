# Replace Loop with Pipeline

```javascript
// Before
const names = []
for (const i of input) {
    if (i.job === 'engineer') {
        name.push(i.name)
    }
}

// After
const names = input
    .filter(i => i.job === 'engineer')
    .map(i => i.name)
```

## Motivation

Collection Pipeline allows you to describe processing as a series of operations, each consuming and emitting a collection.

## Mechanics

- Create a new variable for the loop's collection
- Starting at the top, take each bit of behavior in the loop and replace it with a collection pipeline operation in the derivation of the collection variable. Test after each change.
- Once all behavior is removed from the loop, remove it.