# Remove Middle Man

## Guideline

- **Remove Middle Man**: When a class has too many simple delegating methods that just forward to another class

## Example: Person, Department, and Manager

```javascript
// Before
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

const manager = aPerson.manager;

// After
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

const manager = aPerson.department.manager;
```

## Motivation

When a class is doing too much simple delegation, it's time to remove the middle man and have the client call the delegate directly.

- **Reduce Indirection**: Too many delegating methods create unnecessary layers that obscure what's actually happening.
- **Simplify Maintenance**: Every new feature of the delegate requires adding another delegating method to the server.
- **Expose Direct Access**: Clients can access the delegate directly when the server is just a pass-through.
- **Balance Encapsulation**: Hide Delegate and Remove Middle Man are opposing forces—adjust as the system evolves.
- **Avoid Boilerplate**: Eliminate repetitive delegating methods that add no value.
- **Improve Clarity**: Direct access to the delegate makes dependencies and relationships more explicit.

## Mechanics

- Create a getter for the delegate if one doesn't already exist
- For each client use of a delegating method, replace the call to the delegating method with a call that chains through the accessor
- Test after each replacement to ensure behavior is preserved
- Once all calls to delegating methods are replaced, delete the delegating methods
- Adjust the level of delegation based on system needs—there's no absolute right answer
