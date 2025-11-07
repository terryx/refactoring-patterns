// Example 1: Date Formatting
// Expected output: 'User Alice joined on 3/15/2024'

function example1Before() {
  const user = { name: 'Alice', createdAt: '2024-03-15' }
  const date = new Date(user.createdAt)
  const formatted = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
  return `User ${user.name} joined on ${formatted}`
}

function example1After() {
  const user = { name: 'Alice', createdAt: '2024-03-15' }
  const formatted = formatDate(user.createdAt)
  return `User ${user.name} joined on ${formatted}`
}

function formatDate(dateString) {
  const date = new Date(dateString)
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
}

// Example 2: String Capitalization
// Expected output: 'Hello World'

function example2Before() {
  const text = 'hello world'
  const capitalized = text.split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
  return capitalized
}

function example2After() {
  const text = 'hello world'
  return capitalizeWords(text)
}

function capitalizeWords(str) {
  return str.split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

// Example 3: Price Calculation
// Expected output: '$12.35'

function example3Before() {
  const price = 10.29
  const tax = 0.2
  const total = price * (1 + tax)
  const formatted = '$' + total.toFixed(2)
  return formatted
}

function example3After() {
  const price = 10.29
  const tax = 0.2
  return formatPrice(calculateTotal(price, tax))
}

function calculateTotal(price, taxRate) {
  return price * (1 + taxRate)
}

function formatPrice(amount) {
  return '$' + amount.toFixed(2)
}

export {
  example1Before,
  example1After,
  example2Before,
  example2After,
  example3Before,
  example3After
}
