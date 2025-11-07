// Example 1: Email Validation
// Expected output: { email: Email { value: 'user@example.com' }, verified: false }

function example1Before() {
  const email = 'user@example.com'
  if (!email.includes('@') || !email.includes('.')) {
    throw new Error('Invalid email')
  }
  return { email, verified: false }
}

function example1After() {
  const emailObj = new Email('user@example.com')
  return { email: emailObj, verified: false }
}

class Email {
  constructor(value) {
    if (!value.includes('@') || !value.includes('.')) {
      throw new Error('Invalid email')
    }
    this.value = value
  }

  toString() {
    return this.value
  }
}

// Example 2: Phone Number Formatting
// Expected output: '(555) 123-4567'

function example2Before() {
  const phone = '5551234567'
  if (phone.length !== 10) {
    throw new Error('Invalid phone number')
  }
  const formatted = `(${phone.slice(0, 3)}) ${phone.slice(3, 6)}-${phone.slice(6)}`
  return formatted
}

function example2After() {
  const phone = new PhoneNumber('5551234567')
  return phone.format()
}

class PhoneNumber {
  constructor(value) {
    if (value.length !== 10) {
      throw new Error('Invalid phone number')
    }
    this.value = value
  }

  format() {
    return `(${this.value.slice(0, 3)}) ${this.value.slice(3, 6)}-${this.value.slice(6)}`
  }

  toString() {
    return this.value
  }
}

// Example 3: Money with Currency
// Expected output: Money { amount: 100, currency: 'USD' }

function example3Before() {
  const amount = 100
  const currency = 'USD'
  if (amount < 0) {
    throw new Error('Amount cannot be negative')
  }
  if (!['USD', 'EUR', 'GBP'].includes(currency)) {
    throw new Error('Invalid currency')
  }
  return { amount, currency }
}

function example3After() {
  const money = new Money(100, 'USD')
  return money
}

class Money {
  constructor(amount, currency) {
    if (amount < 0) {
      throw new Error('Amount cannot be negative')
    }
    if (!['USD', 'EUR', 'GBP'].includes(currency)) {
      throw new Error('Invalid currency')
    }
    this.amount = amount
    this.currency = currency
  }

  add(other) {
    if (this.currency !== other.currency) {
      throw new Error('Cannot add money with different currencies')
    }
    return new Money(this.amount + other.amount, this.currency)
  }

  toString() {
    return `${this.amount} ${this.currency}`
  }
}

export {
  example1Before,
  example1After,
  example2Before,
  example2After,
  example3Before,
  example3After
}
