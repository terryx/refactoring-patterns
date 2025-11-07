# Hide Delegate

## Guideline

- **Hide Delegate**: When a client is accessing a delegate object through a server, exposing unnecessary coupling

## Example: Person, Department, and Manager

```javascript
// Before
class Person {
  constructor(name, department) {
    this._name = name;
    this._department = department;
  }

  get name() { return this._name; }
  get department() { return this._department; }
}

class Department {
  constructor(manager) {
    this._manager = manager;
  }

  get manager() { return this._manager; }
}

// Client code accesses manager through department
const manager = aPerson.department.manager;

// After
class Person {
  constructor(name, department) {
    this._name = name;
    this._department = department;
  }

  get name() { return this._name; }
  get manager() { return this._department.manager; }
}

class Department {
  constructor(manager) {
    this._manager = manager;
  }

  get manager() { return this._manager; }
}

// Client code directly accesses manager from person
const manager = aPerson.manager;
```

## Motivation

One of the keys to good modular design is encapsulation, which means modules need to know less about other parts of the system.

- **Reduce Coupling**: When a client calls a method on a delegate object through a server, the client becomes coupled to the delegate's structure.
- **Localize Changes**: If the delegate changes its interface, all clients that access it directly must change. Hiding the delegate limits changes to the server only.
- **Simplify Client Code**: Clients don't need to understand the relationships between server and delegate objects.
- **Improve Encapsulation**: The server object becomes the single point of contact, hiding internal structure from clients.
- **Enable Future Flexibility**: You can change the internal delegation structure without affecting clients.
- **Law of Demeter**: Following "don't talk to strangers" principle - objects should only talk to their immediate friends.

## Mechanics

- For each method on the delegate that clients use, create a simple delegating method on the server
- Adjust each client to call the server's delegating method instead of accessing the delegate directly
- Test after each change to ensure behavior is preserved
- If no client needs to access the delegate anymore, remove the server's accessor for the delegate
- Test to confirm all clients work correctly without direct delegate access
