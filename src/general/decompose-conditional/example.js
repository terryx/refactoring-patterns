// Example 1: Seasonal Pricing
// Expected output: 300 (winter) or 250 (summer)

const SUMMER_START = new Date('2024-06-01')
const SUMMER_END = new Date('2024-08-31')

function example1Before() {
  const date = new Date('2024-03-15')
  const quantity = 10
  const plan = { regularRate: 25, regularServiceCharge: 50, summerRate: 25 }

  if (date < SUMMER_START || date > SUMMER_END) {
    return quantity * plan.regularRate + plan.regularServiceCharge
  } else {
    return quantity * plan.summerRate
  }
}

function example1After() {
  const date = new Date('2024-03-15')
  const quantity = 10
  const plan = { regularRate: 25, regularServiceCharge: 50, summerRate: 25 }

  if (isNotSummer(date)) {
    return winterCharge(quantity, plan)
  } else {
    return summerCharge(quantity, plan)
  }
}

function isNotSummer(date) {
  return date < SUMMER_START || date > SUMMER_END
}

function winterCharge(quantity, plan) {
  return quantity * plan.regularRate + plan.regularServiceCharge
}

function summerCharge(quantity, plan) {
  return quantity * plan.summerRate
}

// Example 2: Eligibility Check
// Expected output: 'Eligible for premium plan'

function example2Before() {
  const user = { age: 25, income: 75000, creditScore: 720, hasDebt: false }

  if (user.age >= 18 && user.age <= 65 && user.income >= 50000 && user.creditScore >= 700 && !user.hasDebt) {
    return 'Eligible for premium plan'
  } else {
    return 'Not eligible for premium plan'
  }
}

function example2After() {
  const user = { age: 25, income: 75000, creditScore: 720, hasDebt: false }

  if (isEligibleForPremium(user)) {
    return eligibleMessage()
  } else {
    return notEligibleMessage()
  }
}

function isEligibleForPremium(user) {
  return user.age >= 18 && user.age <= 65 &&
         user.income >= 50000 &&
         user.creditScore >= 700 &&
         !user.hasDebt
}

function eligibleMessage() {
  return 'Eligible for premium plan'
}

function notEligibleMessage() {
  return 'Not eligible for premium plan'
}

// Example 3: Discount Calculation
// Expected output: 90 (10% discount applied)

function example3Before() {
  const order = { total: 100, isLoyalCustomer: true, itemCount: 5 }

  if ((order.total > 50 && order.isLoyalCustomer) || order.itemCount > 10) {
    return order.total * 0.9
  } else {
    return order.total
  }
}

function example3After() {
  const order = { total: 100, isLoyalCustomer: true, itemCount: 5 }

  if (qualifiesForDiscount(order)) {
    return applyDiscount(order)
  } else {
    return regularPrice(order)
  }
}

function qualifiesForDiscount(order) {
  return (order.total > 50 && order.isLoyalCustomer) || order.itemCount > 10
}

function applyDiscount(order) {
  return order.total * 0.9
}

function regularPrice(order) {
  return order.total
}

export {
  example1Before,
  example1After,
  example2Before,
  example2After,
  example3Before,
  example3After
}
