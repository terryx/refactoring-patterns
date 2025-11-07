// Example 1: Area and Perimeter Calculation
// Expected output: Area: 200, Perimeter: 60, returns 60

function example1Before() {
  const height = 10
  const width = 20
  let temp = height * width
  console.log(`Area: ${temp}`)
  temp = 2 * (height + width)
  console.log(`Perimeter: ${temp}`)
  return temp
}

function example1After() {
  const height = 10
  const width = 20
  const area = height * width
  console.log(`Area: ${area}`)
  const perimeter = 2 * (height + width)
  console.log(`Perimeter: ${perimeter}`)
  return perimeter
}

// Example 2: Distance Calculations
// Expected output: { horizontal: 30, diagonal: 50 }

function example2Before() {
  let result = Math.abs(40 - 10)
  const horizontal = result
  result = Math.sqrt(result * result + Math.abs(50 - 10) * Math.abs(50 - 10))
  const diagonal = result
  return { horizontal, diagonal }
}

function example2After() {
  const horizontalDistance = Math.abs(40 - 10)
  const verticalDistance = Math.abs(50 - 10)
  const diagonalDistance = Math.sqrt(horizontalDistance * horizontalDistance + verticalDistance * verticalDistance)
  return { horizontal: horizontalDistance, diagonal: diagonalDistance }
}

// Example 3: Processing Data with Different Transformations
// Expected output: { doubled: [2, 4, 6], summed: 12 }

function example3Before() {
  const numbers = [1, 2, 3]
  let value = numbers.map(n => n * 2)
  const doubled = value
  value = value.reduce((sum, n) => sum + n, 0)
  const summed = value
  return { doubled, summed }
}

function example3After() {
  const numbers = [1, 2, 3]
  const doubled = numbers.map(n => n * 2)
  const summed = doubled.reduce((sum, n) => sum + n, 0)
  return { doubled, summed }
}

export {
  example1Before,
  example1After,
  example2Before,
  example2After,
  example3Before,
  example3After
}
