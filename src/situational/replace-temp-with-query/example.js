// Example 1: Price Calculation
// Expected output: 970 (for quantity=100, itemPrice=10)

function example1Before() {
  const order = { quantity: 100, itemPrice: 10 }
  const basePrice = order.quantity * order.itemPrice
  const discountFactor = basePrice > 1000 ? 0.95 : 0.98
  return basePrice * discountFactor
}

function example1After() {
  const order = { quantity: 100, itemPrice: 10 }
  return basePrice(order) * discountFactor(order)
}

function basePrice(order) {
  return order.quantity * order.itemPrice
}

function discountFactor(order) {
  return basePrice(order) > 1000 ? 0.95 : 0.98
}

// Example 2: Breaking Up Large Function
// Expected output: { total: 120, tax: 20, grandTotal: 140 }

function example2Before() {
  const items = [
    { price: 50, quantity: 1 },
    { price: 35, quantity: 2 }
  ]
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const taxRate = 0.2
  const tax = total * taxRate
  const grandTotal = total + tax
  return { total, tax, grandTotal }
}

function example2After() {
  const items = [
    { price: 50, quantity: 1 },
    { price: 35, quantity: 2 }
  ]
  return {
    total: calculateTotal(items),
    tax: calculateTax(items),
    grandTotal: calculateGrandTotal(items)
  }
}

function calculateTotal(items) {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0)
}

function calculateTax(items) {
  return calculateTotal(items) * 0.2
}

function calculateGrandTotal(items) {
  return calculateTotal(items) + calculateTax(items)
}

// Example 3: Reusing Calculation in Multiple Places
// Expected output: 'High priority customer with balance: 1500'

function example3Before() {
  const customer = {
    orders: [
      { amount: 500 },
      { amount: 300 },
      { amount: 700 }
    ]
  }
  const totalSpent = customer.orders.reduce((sum, order) => sum + order.amount, 0)
  const isPriority = totalSpent > 1000
  return isPriority ? `High priority customer with balance: ${totalSpent}` : `Regular customer with balance: ${totalSpent}`
}

function example3After() {
  const customer = {
    orders: [
      { amount: 500 },
      { amount: 300 },
      { amount: 700 }
    ]
  }
  const priority = isPriorityCustomer(customer) ? 'High priority' : 'Regular'
  return `${priority} customer with balance: ${totalSpent(customer)}`
}

function totalSpent(customer) {
  return customer.orders.reduce((sum, order) => sum + order.amount, 0)
}

function isPriorityCustomer(customer) {
  return totalSpent(customer) > 1000
}

export {
  example1Before,
  example1After,
  example2Before,
  example2After,
  example3Before,
  example3After
}
