// Example 1: Person, Department, and Manager
// Expected output: Access manager through department instead of delegating method

function example1Before() {
  class Department {
    constructor(manager) {
      this._manager = manager;
    }

    get manager() { return this._manager; }
  }

  class Person {
    constructor(name, department) {
      this._name = name;
      this._department = department;
    }

    get name() { return this._name; }
    get manager() { return this._department.manager; }
  }

  const department = new Department('Alice Johnson');
  const person = new Person('Bob Smith', department);

  // Client uses delegating method
  const manager = person.manager;

  return { name: person.name, manager };
}

function example1After() {
  class Department {
    constructor(manager) {
      this._manager = manager;
    }

    get manager() { return this._manager; }
  }

  class Person {
    constructor(name, department) {
      this._name = name;
      this._department = department;
    }

    get name() { return this._name; }
    get department() { return this._department; }
  }

  const department = new Department('Alice Johnson');
  const person = new Person('Bob Smith', department);

  // Client accesses manager directly through department
  const manager = person.department.manager;

  return { name: person.name, manager };
}

// Example 2: Account and Owner
// Expected output: Access owner details through owner object instead of delegation

function example2Before() {
  class Owner {
    constructor(name, email) {
      this._name = name;
      this._email = email;
    }

    get name() { return this._name; }
    get email() { return this._email; }
  }

  class Account {
    constructor(accountNumber, owner) {
      this._accountNumber = accountNumber;
      this._owner = owner;
    }

    get accountNumber() { return this._accountNumber; }
    get ownerName() { return this._owner.name; }
    get ownerEmail() { return this._owner.email; }
  }

  const owner = new Owner('Carol Davis', 'carol@example.com');
  const account = new Account('ACC-123', owner);

  // Client uses delegating methods
  return {
    accountNumber: account.accountNumber,
    ownerName: account.ownerName,
    ownerEmail: account.ownerEmail
  };
}

function example2After() {
  class Owner {
    constructor(name, email) {
      this._name = name;
      this._email = email;
    }

    get name() { return this._name; }
    get email() { return this._email; }
  }

  class Account {
    constructor(accountNumber, owner) {
      this._accountNumber = accountNumber;
      this._owner = owner;
    }

    get accountNumber() { return this._accountNumber; }
    get owner() { return this._owner; }
  }

  const owner = new Owner('Carol Davis', 'carol@example.com');
  const account = new Account('ACC-123', owner);

  // Client accesses owner details directly
  return {
    accountNumber: account.accountNumber,
    ownerName: account.owner.name,
    ownerEmail: account.owner.email
  };
}

// Example 3: Product and Supplier
// Expected output: Access supplier information through supplier object

function example3Before() {
  class Supplier {
    constructor(name, country, rating) {
      this._name = name;
      this._country = country;
      this._rating = rating;
    }

    get name() { return this._name; }
    get country() { return this._country; }
    get rating() { return this._rating; }
  }

  class Product {
    constructor(name, price, supplier) {
      this._name = name;
      this._price = price;
      this._supplier = supplier;
    }

    get name() { return this._name; }
    get price() { return this._price; }
    get supplierName() { return this._supplier.name; }
    get supplierCountry() { return this._supplier.country; }
    get supplierRating() { return this._supplier.rating; }
  }

  const supplier = new Supplier('Global Parts Inc', 'USA', 4.5);
  const product = new Product('Widget', 29.99, supplier);

  // Client uses delegating methods
  return {
    productName: product.name,
    price: product.price,
    supplierName: product.supplierName,
    supplierCountry: product.supplierCountry,
    supplierRating: product.supplierRating
  };
}

function example3After() {
  class Supplier {
    constructor(name, country, rating) {
      this._name = name;
      this._country = country;
      this._rating = rating;
    }

    get name() { return this._name; }
    get country() { return this._country; }
    get rating() { return this._rating; }
  }

  class Product {
    constructor(name, price, supplier) {
      this._name = name;
      this._price = price;
      this._supplier = supplier;
    }

    get name() { return this._name; }
    get price() { return this._price; }
    get supplier() { return this._supplier; }
  }

  const supplier = new Supplier('Global Parts Inc', 'USA', 4.5);
  const product = new Product('Widget', 29.99, supplier);

  // Client accesses supplier details directly
  return {
    productName: product.name,
    price: product.price,
    supplierName: product.supplier.name,
    supplierCountry: product.supplier.country,
    supplierRating: product.supplier.rating
  };
}

export {
  example1Before,
  example1After,
  example2Before,
  example2After,
  example3Before,
  example3After
};
