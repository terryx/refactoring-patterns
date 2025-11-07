# Substitute Algorithm

## Guideline

- **Substitute Algorithm**: When you find a clearer or simpler way to achieve the same result

## Example: Finding Matching Items

```javascript
// Before
function findPeople(people) {
  const result = []
  for (let i = 0; i < people.length; i++) {
    if (people[i].name === 'Don') {
      result.push(people[i])
    }
    if (people[i].name === 'John') {
      result.push(people[i])
    }
    if (people[i].name === 'Kent') {
      result.push(people[i])
    }
  }
  return result
}

// After
function findPeople(people) {
  return people.filter(p => ['Don', 'John', 'Kent'].includes(p.name))
}
```

## Motivation

Sometimes you discover a different algorithm that is clearer or simpler than the one you're currently using. When this happens, replace the complicated algorithm with the simpler one.

- **Clarity**: Simpler algorithms are easier to understand and maintain, reducing cognitive load for developers
- **Leverage Built-ins**: Modern languages provide powerful built-in methods that are well-tested and optimized
- **Reduce Bugs**: Simpler code has fewer opportunities for bugs compared to complex manual implementations
- **Better Performance**: Standard library functions are often highly optimized and may perform better than custom code
- **Future Maintenance**: Widely-recognized patterns are easier for new team members to understand
- **Testability**: Simpler algorithms are easier to test comprehensively

## Mechanics

- Prepare tests to verify the behavior of the current algorithm
- Create a new function with the substitute algorithm
- Run tests against the new function to ensure it produces the same results
- If the tests pass, replace the old algorithm with the new one
- If the algorithm is used in multiple places, consider doing the substitution one caller at a time
- Test thoroughly after each change
