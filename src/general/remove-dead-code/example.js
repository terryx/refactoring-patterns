// Example 1: Unused Helper Function
// Expected output: { orderId: 123, total: 100 }

function example1Before() {
  const order = { id: 123, items: [{ price: 50 }, { price: 50 }] }
  const total = calculateTotal1(order.items)
  return { orderId: order.id, total }
}

function example1After() {
  const order = { id: 123, items: [{ price: 50 }, { price: 50 }] }
  const total = calculateTotal1(order.items)
  return { orderId: order.id, total }
}

function calculateTotal1(items) {
  return items.reduce((sum, item) => sum + item.price, 0)
}

function formatCurrency1(amount) {
  return `$${amount.toFixed(2)}`
}

// Example 2: Unreachable Code After Return
// Expected output: 'active'

function example2Before() {
  const user = { status: 'active' }
  return user.status
  console.log('This will never execute')
  const temp = user.status.toUpperCase()
  return temp
}

function example2After() {
  const user = { status: 'active' }
  return user.status
}

// Example 3: Unused Variable
// Expected output: { name: 'John', age: 30 }

function example3Before() {
  const user = { name: 'John', age: 30, email: 'john@example.com' }
  const unusedVariable = user.email.toLowerCase()
  const anotherUnused = 'test'
  return { name: user.name, age: user.age }
}

function example3After() {
  const user = { name: 'John', age: 30, email: 'john@example.com' }
  return { name: user.name, age: user.age }
}

export {
  example1Before,
  example1After,
  example2Before,
  example2After,
  example3Before,
  example3After
}
