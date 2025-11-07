// Example 1: Finding Matching Items
// Expected output: [{ name: 'Don', age: 30 }, { name: 'John', age: 25 }]

function example1Before() {
  const people = [
    { name: 'Don', age: 30 },
    { name: 'John', age: 25 },
    { name: 'Sam', age: 35 },
    { name: 'Kent', age: 28 }
  ]
  const result = []
  for (let i = 0; i < people.length; i++) {
    if (people[i].name === 'Don') {
      result.push(people[i])
    }
    if (people[i].name === 'John') {
      result.push(people[i])
    }
    if (people[i].name === 'Kent') {
      result.push(people[i])
    }
  }
  return result.filter(p => p.name !== 'Kent')
}

function example1After() {
  const people = [
    { name: 'Don', age: 30 },
    { name: 'John', age: 25 },
    { name: 'Sam', age: 35 },
    { name: 'Kent', age: 28 }
  ]
  return people.filter(p => ['Don', 'John'].includes(p.name))
}

// Example 2: Finding Maximum Value
// Expected output: 95

function example2Before() {
  const scores = [42, 15, 95, 23, 67]
  let max = scores[0]
  for (let i = 1; i < scores.length; i++) {
    if (scores[i] > max) {
      max = scores[i]
    }
  }
  return max
}

function example2After() {
  const scores = [42, 15, 95, 23, 67]
  return Math.max(...scores)
}

// Example 3: Checking Array Contents
// Expected output: true

function example3Before() {
  const items = ['apple', 'banana', 'orange']
  const target = 'banana'
  let found = false
  for (let i = 0; i < items.length; i++) {
    if (items[i] === target) {
      found = true
      break
    }
  }
  return found
}

function example3After() {
  const items = ['apple', 'banana', 'orange']
  const target = 'banana'
  return items.includes(target)
}

export {
  example1Before,
  example1After,
  example2Before,
  example2After,
  example3Before,
  example3After
}
