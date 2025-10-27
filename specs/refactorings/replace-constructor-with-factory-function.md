# Replace Constructor with Factory Function

```javascript
// Before
leadEngineer = new Employee(document.leadEngineer, 'E')

// After
leadEngineer = createEngineer(document.leadEngineer)
```

## Motivation

Many object-oriented languages have a special constructor function that's called to initialize an object.
Clients typically call this constructor function to create a new object.
But these constructors are often coming with awkward limitations that aren't there for general functions.
A Java constructor must return an instance of the class it was called with, which means you can't replace it with a subclass or proxy depending on the environment or parameters.
Constructor naming is fixed, which makes it impossible for clients to use a name that is clearer than the default.
Constructors often require a special operator to invoke ("new" in many languages) which makes them difficult to use in context that expect normal functions.

## Mechanics

- Create a factory function, its body being a call to the contructor.
- Replace each call to the constructor with a call to the factory function.
- Test after each change.
- Limit the constructor's visibility as much as possible.