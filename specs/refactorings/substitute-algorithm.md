# Substitute Algorithm

```javascript
// Before
function foundPerson(people) {
    for (let i = 0; i < people.length; i++) {
        if (people[i].name === 'John') {
            return 'John'
        }
        
        if (people[i].name === 'Jane') {
            return 'Jane'
        }
        
        if (people[i].name === 'Jill') {
            return 'Jill'
        }
    }
    return ''
}

// After
function foundPerson(people) {
    const candidates = ['John', 'Jane', 'Jill']
    return people.find(p => candidates.includes(p)) || ''
}
```

## Motivation

Refactoring can break down something complex into simpler pieces, decompose the method by replacing a large, complex algorithm.


## Mechanics

- Arrange the code to be replaced so that it fills a complete function.
- Prepare tests using this function only to capture its behavior.
- Prepare your alternative algorithm.
- Run static checks.
- Run tests to compare the output of the old algorithm with the new one. If they are the same, you're done. Otherwise, use the old algorithm for comparison in testing and debugging.