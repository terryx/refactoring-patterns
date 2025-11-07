# Extract Class

## Guideline

- **Extract Class**: When a class has multiple responsibilities or subsets of data that change together

## Example: Person and Telephone Number

```javascript
// Before
class Person {
  constructor(name, officeAreaCode, officeNumber) {
    this._name = name;
    this._officeAreaCode = officeAreaCode;
    this._officeNumber = officeNumber;
  }

  get name() { return this._name; }
  get telephoneNumber() { return `(${this._officeAreaCode}) ${this._officeNumber}`; }
  get officeAreaCode() { return this._officeAreaCode; }
  get officeNumber() { return this._officeNumber; }
}

// After
class Person {
  constructor(name, officeAreaCode, officeNumber) {
    this._name = name;
    this._telephoneNumber = new TelephoneNumber(officeAreaCode, officeNumber);
  }

  get name() { return this._name; }
  get telephoneNumber() { return this._telephoneNumber.toString(); }
  get officeAreaCode() { return this._telephoneNumber.areaCode; }
  get officeNumber() { return this._telephoneNumber.number; }
}

class TelephoneNumber {
  constructor(areaCode, number) {
    this._areaCode = areaCode;
    this._number = number;
  }

  get areaCode() { return this._areaCode; }
  get number() { return this._number; }
  toString() { return `(${this._areaCode}) ${this._number}`; }
}
```

## Motivation

A class should be a crisp abstraction, handling only a few clear responsibilities to remain understandable and maintainable.

- **Single Responsibility**: Classes grow over time and accumulate responsibilities that should be separated into distinct abstractions.
- **Data Cohesion**: Subsets of data that usually change together or are particularly dependent on each other signal a need for extraction.
- **Method Cohesion**: When groups of methods operate primarily on a subset of the class's data, they belong in their own class.
- **Reusability**: Extracted classes can be reused independently in other contexts where the parent class would be too heavy.
- **Testability**: Smaller, focused classes are easier to test in isolation than large, multi-responsibility classes.
- **Clarity**: Each class has a clear, well-defined purpose that's easy to understand and communicate.
- **Subtyping Signals**: The need to subtype only part of a class's behavior often indicates that part should be its own class.

## Mechanics

- Decide how to split the responsibilities of the class by identifying cohesive subsets of data and behavior
- Create a new child class to express the split-off responsibilities
- Create an instance of the child class when constructing the parent and add a link from parent to child
- Use Move Field on each field you wish to move, testing after each move
- Use Move Function to move methods to the new child, starting with lower-level methods (those being called rather than calling)
- Test after each method move to ensure behavior is preserved
- Review the interfaces of both classes, remove unneeded methods, change names to better fit the new circumstances
- Decide whether to expose the new child class directly or keep it encapsulated
- If exposing the child, consider applying Change Reference to Value to make it immutable
