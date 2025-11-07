// Example 1: Disability Benefits Check
// Expected output: 0 for ineligible, calculated amount for eligible

function example1Before() {
  const employee = { seniority: 1, monthsDisabled: 6, isPartTime: false }
  if (employee.seniority < 2) return 0
  if (employee.monthsDisabled > 12) return 0
  if (employee.isPartTime) return 0
  return calculateDisabilityAmount(employee)
}

function example1After() {
  const employee = { seniority: 1, monthsDisabled: 6, isPartTime: false }
  if (isNotEligibleForDisability(employee)) return 0
  return calculateDisabilityAmount(employee)
}

function isNotEligibleForDisability(employee) {
  return employee.seniority < 2 ||
         employee.monthsDisabled > 12 ||
         employee.isPartTime
}

function calculateDisabilityAmount(employee) {
  return 1000
}

// Example 2: Discount Eligibility
// Expected output: 'no discount' or 'discount applied'

function example2Before() {
  const order = { total: 40, isLoyalCustomer: false, itemCount: 3 }
  if (order.total < 50) {
    return 'no discount'
  }
  if (!order.isLoyalCustomer) {
    return 'no discount'
  }
  if (order.itemCount < 5) {
    return 'no discount'
  }
  return 'discount applied'
}

function example2After() {
  const order = { total: 40, isLoyalCustomer: false, itemCount: 3 }
  if (isNotEligibleForDiscount(order)) {
    return 'no discount'
  }
  return 'discount applied'
}

function isNotEligibleForDiscount(order) {
  return order.total < 50 ||
         !order.isLoyalCustomer ||
         order.itemCount < 5
}

// Example 3: Access Permission Check
// Expected output: 'access denied' or 'access granted'

function example3Before() {
  const user = { isAdmin: false, hasPermission: false, isActive: true }
  let canAccess = true
  if (!user.isAdmin) {
    canAccess = false
  }
  if (!user.hasPermission) {
    canAccess = false
  }
  if (!user.isActive) {
    canAccess = false
  }
  return canAccess ? 'access granted' : 'access denied'
}

function example3After() {
  const user = { isAdmin: false, hasPermission: false, isActive: true }
  const canAccess = hasAccess(user)
  return canAccess ? 'access granted' : 'access denied'
}

function hasAccess(user) {
  return user.isAdmin && user.hasPermission && user.isActive
}

export {
  example1Before,
  example1After,
  example2Before,
  example2After,
  example3Before,
  example3After
}
