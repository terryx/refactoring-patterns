// Example 1: Element Visibility
// Expected output: navbar displays 'block', sidebar displays 'none'

function example1Before() {
  const navbar = { style: {} }
  const sidebar = { style: {} }

  setVisibility(navbar, true)
  setVisibility(sidebar, false)

  return {
    navbar: navbar.style.display,
    sidebar: sidebar.style.display
  }
}

function example1After() {
  const navbar = { style: {} }
  const sidebar = { style: {} }

  show(navbar)
  hide(sidebar)

  return {
    navbar: navbar.style.display,
    sidebar: sidebar.style.display
  }
}

function setVisibility(element, isVisible) {
  if (isVisible) {
    element.style.display = 'block'
  } else {
    element.style.display = 'none'
  }
}

function show(element) {
  element.style.display = 'block'
}

function hide(element) {
  element.style.display = 'none'
}

// Example 2: Booking Delivery
// Expected output: { type: 'rush', days: 1 } or { type: 'regular', days: 5 }

function example2Before() {
  const isRush = true
  return deliveryDate(new Date('2024-01-01'), isRush)
}

function example2After() {
  return rushDelivery(new Date('2024-01-01'))
}

function deliveryDate(date, isRush) {
  if (isRush) {
    return { type: 'rush', days: 1 }
  } else {
    return { type: 'regular', days: 5 }
  }
}

function rushDelivery(date) {
  return { type: 'rush', days: 1 }
}

function regularDelivery(date) {
  return { type: 'regular', days: 5 }
}

// Example 3: Rendering User Profile
// Expected output: HTML string with or without premium badge

function example3Before() {
  const user = { name: 'Alice', isPremium: true }
  return renderProfile(user, user.isPremium)
}

function example3After() {
  const user = { name: 'Alice', isPremium: true }
  return renderPremiumProfile(user)
}

function renderProfile(user, isPremium) {
  if (isPremium) {
    return `<div>${user.name} <span class="badge">Premium</span></div>`
  } else {
    return `<div>${user.name}</div>`
  }
}

function renderPremiumProfile(user) {
  return `<div>${user.name} <span class="badge">Premium</span></div>`
}

function renderStandardProfile(user) {
  return `<div>${user.name}</div>`
}

export {
  example1Before,
  example1After,
  example2Before,
  example2After,
  example3Before,
  example3After
}
