# Hide Delegate

```javascript
// Before
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

// After
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
```

## Motivation

One of the keys to good modular design is encapsulation. Encapsulation means that modules need to know less about other parts of the system. When encapsulation is reduced, it's easier to change things since changes are more localized and less likely to cause cascading changes to other parts of the system.

If a client calls a method defined on an object in a field of a server object, the client needs to know about this delegate object. If the delegate changes, the client may also need to change. You can remove this dependency by placing a simple delegating method on the server that hides the delegate. Changes become limited to the server and don't propagate to the client.

## Mechanics

- For each method on the delegate, create a simple delegating method on the server.
- Adjust the client to call the server.
- Test after each change.
- If no client needs to access the delegate anymore, remove the server's accessor for the delegate.
- Test.
