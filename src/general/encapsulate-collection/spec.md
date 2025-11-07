# Encapsulate Collection

## Guideline

- **Encapsulate Collection**: Provide methods to add/remove items instead of exposing the collection directly—return copies, not references

## Example: Course Enrollment

```javascript
// Before
class Person {
  constructor(name) {
    this.name = name
    this.courses = []
  }
}

const person = new Person('Alice')
person.courses.push({ name: 'Math', level: 101 })
person.courses.push({ name: 'Physics', level: 201 })

// After
class Person {
  constructor(name) {
    this.name = name
    this._courses = []
  }

  get courses() {
    return [...this._courses]
  }

  addCourse(course) {
    this._courses.push(course)
  }

  removeCourse(courseName) {
    this._courses = this._courses.filter(c => c.name !== courseName)
  }
}

const person = new Person('Alice')
person.addCourse({ name: 'Math', level: 101 })
person.addCourse({ name: 'Physics', level: 201 })
```

## Motivation

Exposing collections directly allows external code to modify them in uncontrolled ways, breaking encapsulation and making it impossible to maintain invariants or respond to changes.

- **Prevent Unwanted Mutation**: External code cannot directly modify the collection, preventing bugs from unexpected changes
- **Maintain Invariants**: The class can enforce rules when items are added or removed (e.g., validation, duplicate prevention)
- **Enable Notifications**: Methods can trigger updates, events, or side effects when the collection changes
- **Control Access**: You can decide what operations are allowed (read-only, specific modifications, etc.)
- **Future Flexibility**: Changing the internal representation doesn't break external code that depends on the interface
- **Clear API**: Explicit methods communicate what operations are valid on the collection

## Mechanics

- Add methods to add and remove items from the collection
- Make the collection field private (prefix with underscore in JavaScript, use # for private fields)
- Create a getter that returns a copy of the collection (using spread operator or Array.from)
- Find all code that modifies the collection directly and replace with method calls
- Find all code that reads the collection and update to use the getter
- Test after each change to ensure behavior is preserved
- Consider whether certain operations should be disallowed and remove those methods
