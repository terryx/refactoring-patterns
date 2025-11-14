# Replace Loop with Pipeline

> **Note**: This guideline is sourced from `.claude/claude.md`. The source file is the authoritative reference.

## Example

```javascript
// Before
const names = []
for (const i of input) {
    if (i.job === 'engineer') {
        names.push(i.name)
    }
}

// After
const names = input
    .filter(i => i.job === 'engineer')
    .map(i => i.name)
```

## Motivation

Collection pipelines describe processing as a series of operations, each consuming and emitting a collection. Key benefits include:

- **Readability**: Pipeline operations like `filter` and `map` help you quickly see what elements are included and how they're transformed
- **Declarative vs. Imperative**: Pipelines reveal what is being processed, while loops force readers to decipher how processing happens
- **Reduced Cognitive Load**: Eliminates manual state management like tracking indices, accumulator variables, and control flags
- **Separation of Concerns**: Each pipeline step handles one transformation, making intent explicit
- **Language Portability**: The pattern translates consistently across languages (JavaScript, Java streams, C# LINQ, Ruby, etc.)
- **Database Optimization Potential**: Pipeline form resembles SQL, making it easier to consider moving logic into database queries
- **Clarity Over Performance**: Focus on clarity unless you have a measured, significant performance problem

## Mechanics

- Create a new variable for the loop's collection
- Starting at the top, take each bit of behavior in the loop and replace it with a collection pipeline operation in the derivation of the collection variable. Test after each change.
- Once all behavior is removed from the loop, remove it.