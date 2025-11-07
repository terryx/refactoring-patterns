// Replace Loop with Pipeline - Consolidated Fixtures

// Example 1: Filter and map loop to pipeline
// Expected output: ['Alice', 'Charlie']
function example1Before(input) {
  const names = []
  for (const i of input) {
    if (i.job === 'engineer') {
      names.push(i.name)
    }
  }
  return names
}

function example1After(input) {
  const names = input
    .filter(i => i.job === 'engineer')
    .map(i => i.name)
  return names
}

// Example 2: Transform and filter numbers
// Expected output: [16, 25, 36]
function example2Before(numbers) {
  const result = []
  for (const num of numbers) {
    const squared = num * num
    if (squared > 10) {
      result.push(squared)
    }
  }
  return result
}

function example2After(numbers) {
  const result = numbers
    .map(num => num * num)
    .filter(squared => squared > 10)
  return result
}

// Example 3: Multiple transformations with accumulation
// Expected output: [150]
function example3Before(orders) {
  const total = []
  for (const order of orders) {
    if (order.status === 'completed') {
      const amount = order.price * order.quantity
      if (amount > 100) {
        total.push(amount)
      }
    }
  }
  return total
}

function example3After(orders) {
  const total = orders
    .filter(order => order.status === 'completed')
    .map(order => order.price * order.quantity)
    .filter(amount => amount > 100)
  return total
}

export {
  example1Before,
  example1After,
  example2Before,
  example2After,
  example3Before,
  example3After
}
