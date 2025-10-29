# Remove Middle Man

```javascript
// Before
class Person {
    constructor(name) {
        this._name = name
        this._department = new Department()
    }

    get manager() {
        return this._department.manager
    }
}

class Department {
    get manager() {
        return this._manager
    }
}

// Usage
manager = aPerson.manager

// After
class Person {
    constructor(name) {
        this._name = name
        this._department = new Department()
    }

    get department() {
        return this._department
    }
}

class Department {
    get manager() {
        return this._manager
    }
}

// Usage
manager = aPerson.department.manager
```

## Motivation

When a class is doing too much simple delegation, it's time to remove the middle man. The client should call the delegate directly.

In the earlier description of Hide Delegate, encapsulation of the delegate is touted as a benefit. But there is a price: Every time the client wants to use a new feature of the delegate, you have to add a simple delegating method to the server. After adding features for a while, it becomes painful. The server class is just a middle man, and perhaps it's time for the client to call the delegate directly.

It's hard to figure out what the right amount of hiding is. Fortunately, with Hide Delegate and Remove Middle Man, it doesn't matter so much. You can adjust your code as time goes on. As the system changes, the basis for how much you hide also changes.

## Mechanics

- Create a getter for the delegate.
- For each client use of a delegating method, replace the call to the delegating method with a call that chains through the accessor.
- Test after each replacement.
- Once all calls to delegating methods are replaced, you can delete the delegating methods.
