// Example 1: Course Enrollment
// Expected output: ['Math', 'Physics']

function example1Before() {
  class Person {
    constructor(name) {
      this.name = name
      this.courses = []
    }
  }

  const person = new Person('Alice')
  person.courses.push({ name: 'Math', level: 101 })
  person.courses.push({ name: 'Physics', level: 201 })
  return person.courses.map(c => c.name)
}

function example1After() {
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
  return person.courses.map(c => c.name)
}

// Example 2: Task List Management
// Expected output: 2 tasks after adding, 1 task after removing

function example2Before() {
  class TaskList {
    constructor() {
      this.tasks = []
    }
  }

  const list = new TaskList()
  list.tasks.push({ id: 1, title: 'Buy groceries' })
  list.tasks.push({ id: 2, title: 'Walk dog' })
  const afterAdd = list.tasks.length
  list.tasks = list.tasks.filter(t => t.id !== 1)
  const afterRemove = list.tasks.length
  return { afterAdd, afterRemove }
}

function example2After() {
  class TaskList {
    constructor() {
      this._tasks = []
    }

    get tasks() {
      return [...this._tasks]
    }

    addTask(task) {
      this._tasks.push(task)
    }

    removeTask(id) {
      this._tasks = this._tasks.filter(t => t.id !== id)
    }
  }

  const list = new TaskList()
  list.addTask({ id: 1, title: 'Buy groceries' })
  list.addTask({ id: 2, title: 'Walk dog' })
  const afterAdd = list.tasks.length
  list.removeTask(1)
  const afterRemove = list.tasks.length
  return { afterAdd, afterRemove }
}

// Example 3: Shopping Cart Items
// Expected output: total of 150 for 3 items

function example3Before() {
  class ShoppingCart {
    constructor() {
      this.items = []
    }

    getTotal() {
      return this.items.reduce((sum, item) => sum + item.price, 0)
    }
  }

  const cart = new ShoppingCart()
  cart.items.push({ name: 'Book', price: 50 })
  cart.items.push({ name: 'Pen', price: 10 })
  cart.items.push({ name: 'Notebook', price: 90 })
  return cart.getTotal()
}

function example3After() {
  class ShoppingCart {
    constructor() {
      this._items = []
    }

    get items() {
      return [...this._items]
    }

    addItem(item) {
      this._items.push(item)
    }

    removeItem(itemName) {
      this._items = this._items.filter(i => i.name !== itemName)
    }

    getTotal() {
      return this._items.reduce((sum, item) => sum + item.price, 0)
    }
  }

  const cart = new ShoppingCart()
  cart.addItem({ name: 'Book', price: 50 })
  cart.addItem({ name: 'Pen', price: 10 })
  cart.addItem({ name: 'Notebook', price: 90 })
  return cart.getTotal()
}

export {
  example1Before,
  example1After,
  example2Before,
  example2After,
  example3Before,
  example3After
}
