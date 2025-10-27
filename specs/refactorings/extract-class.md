# Extract Class

```javascript
// Before
class Person {
    get officeAreaCode() { return this._officeAreaCode }
    get officeNumber() { this._officeNumber }
}

// After
class Person {
    get officeAreaCode() { return this._telephoneNumber.areaCode }
    get officeNumber() { return this._telephoneNumber.number}
}
class TelephoneNumber {
    get areaCode() { return this._areaCode }
    get number() { return this._number }
}
```

## Motivation

A class should be a crips abstracting, only handle a few clear responsibilities.
In practice, classes grow and become too complicated. Good signs are subsets of data that usually change together
or are particularly dependent on each other. One sign that often crops up later in development is the way the
class is sub-typed.


## Mechanics

- Decide how to split the responsibilities of the class.
- Create a new child class to express the split-off responsibilities.
- Create an instance of the child class when constructing the parent and add a link from parent to child.
- Use Move Field on each field you wish to move. Test after each move.
- Use Move Function to move methods to the new child. Start with lower-level methods (those being called rather than calling). Test after each move.
- Review the interfaces of both classes, remove unneeded methods, change names to better fit the new circumstances.
- Decide whether to expose the new child. If so, consider applying Change Reference to Value to the child class.
