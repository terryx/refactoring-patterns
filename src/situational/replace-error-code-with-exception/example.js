// Example 1: Withdraw from Account
// Expected output: Throws Error('Insufficient funds') when amount > balance, otherwise reduces balance

let balance = 100

function example1Before() {
  const result = withdraw(150)
  if (result === -1) {
    console.log('Insufficient funds')
    return false
  }
  console.log('Withdrawal successful')
  return true
}

function example1After() {
  try {
    withdrawWithException(150)
    console.log('Withdrawal successful')
    return true
  } catch (error) {
    console.log(error.message)
    return false
  }
}

function withdraw(amount) {
  if (amount > balance) {
    return -1
  }
  balance -= amount
  return 0
}

function withdrawWithException(amount) {
  if (amount > balance) {
    throw new Error('Insufficient funds')
  }
  balance -= amount
}

// Example 2: File Reading with Error Propagation
// Expected output: Throws Error when file not found, returns content when successful

function example2Before() {
  const result = readFile('config.json')
  if (result.error) {
    return { error: result.error }
  }
  const parsed = parseJSON(result.data)
  if (parsed.error) {
    return { error: parsed.error }
  }
  return { data: parsed.data }
}

function example2After() {
  try {
    const content = readFileWithException('config.json')
    const parsed = parseJSONWithException(content)
    return { data: parsed }
  } catch (error) {
    return { error: error.message }
  }
}

function readFile(filename) {
  if (filename !== 'config.json') {
    return { error: 'File not found' }
  }
  return { data: '{"key": "value"}' }
}

function parseJSON(data) {
  try {
    return { data: JSON.parse(data) }
  } catch {
    return { error: 'Invalid JSON' }
  }
}

function readFileWithException(filename) {
  if (filename !== 'config.json') {
    throw new Error('File not found')
  }
  return '{"key": "value"}'
}

function parseJSONWithException(data) {
  return JSON.parse(data)
}

// Example 3: Validation with Multiple Error Conditions
// Expected output: Throws Error with specific message for validation failures

function example3Before() {
  const user = { email: 'invalid-email', age: 15 }
  const validationResult = validateUser(user)
  if (validationResult !== 0) {
    if (validationResult === 1) {
      console.log('Invalid email format')
    } else if (validationResult === 2) {
      console.log('User must be 18 or older')
    }
    return false
  }
  console.log('User validated')
  return true
}

function example3After() {
  const user = { email: 'invalid-email', age: 15 }
  try {
    validateUserWithException(user)
    console.log('User validated')
    return true
  } catch (error) {
    console.log(error.message)
    return false
  }
}

function validateUser(user) {
  if (!user.email.includes('@')) {
    return 1
  }
  if (user.age < 18) {
    return 2
  }
  return 0
}

function validateUserWithException(user) {
  if (!user.email.includes('@')) {
    throw new Error('Invalid email format')
  }
  if (user.age < 18) {
    throw new Error('User must be 18 or older')
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
