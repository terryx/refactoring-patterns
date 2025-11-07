// Example 1: Create Engineer
// Expected output: { name: 'John Doe', type: 'E', salary: 100000 }

function example1Before() {
  const document = { leadEngineer: 'John Doe' }
  const leadEngineer = new Employee(document.leadEngineer, 'E')
  return leadEngineer
}

function example1After() {
  const document = { leadEngineer: 'John Doe' }
  const leadEngineer = createEngineer(document.leadEngineer)
  return leadEngineer
}

class Employee {
  constructor(name, type) {
    this.name = name
    this.type = type
    this.salary = 100000
  }
}

function createEngineer(name) {
  return new Employee(name, 'E')
}

// Example 2: Polymorphic Returns
// Expected output: { name: 'Alice', role: 'engineer', level: 'senior' } or { name: 'Bob', role: 'manager', reports: [] }

function example2Before() {
  const document = { name: 'Alice', type: 'engineer' }
  let employee
  if (document.type === 'engineer') {
    employee = new Engineer(document.name)
  } else if (document.type === 'manager') {
    employee = new Manager(document.name)
  }
  return employee
}

function example2After() {
  const document = { name: 'Alice', type: 'engineer' }
  const employee = createEmployee(document)
  return employee
}

class Engineer {
  constructor(name) {
    this.name = name
    this.role = 'engineer'
    this.level = 'senior'
  }
}

class Manager {
  constructor(name) {
    this.name = name
    this.role = 'manager'
    this.reports = []
  }
}

function createEmployee(document) {
  if (document.type === 'engineer') {
    return new Engineer(document.name)
  } else if (document.type === 'manager') {
    return new Manager(document.name)
  }
}

// Example 3: Testing and Mocking
// Expected output: [{ id: 1, name: 'User 1' }, { id: 2, name: 'User 2' }]

function example3Before() {
  const connection = new DatabaseConnection({ host: 'localhost', port: 5432 })
  return connection.query('SELECT * FROM users')
}

function example3After() {
  const connection = createConnection({ host: 'localhost', port: 5432 })
  return connection.query('SELECT * FROM users')
}

class DatabaseConnection {
  constructor(config) {
    this.config = config
  }

  query(sql) {
    return [
      { id: 1, name: 'User 1' },
      { id: 2, name: 'User 2' }
    ]
  }
}

function createConnection(config) {
  return new DatabaseConnection(config)
}

export {
  example1Before,
  example1After,
  example2Before,
  example2After,
  example3Before,
  example3After
}
