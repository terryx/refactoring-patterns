# Replace Magic Literal

## Guideline

- **Replace Magic Literal**: When a literal value has special meaning that isn't immediately obvious or when the same literal appears in multiple places

## Example: Bulk Order Business Rules

```javascript
// Before
function calculateDiscount(order) {
  if (order.quantity > 100) {
    return order.total * 0.1
  }
  return 0
}

function isEligibleForFreeShipping(order) {
  return order.quantity > 100
}

// After
const BULK_ORDER_THRESHOLD = 100
const BULK_DISCOUNT_RATE = 0.1

function calculateDiscount(order) {
  if (order.quantity > BULK_ORDER_THRESHOLD) {
    return order.total * BULK_DISCOUNT_RATE
  }
  return 0
}

function isEligibleForFreeShipping(order) {
  return order.quantity > BULK_ORDER_THRESHOLD
}
```

## Example 2: HTTP Status Codes

```javascript
// Before
function handleResponse(response) {
  if (response.status === 404) {
    return { error: 'Not found' }
  }
  if (response.status === 500) {
    return { error: 'Server error' }
  }
  if (response.status === 200) {
    return { data: response.body }
  }
  return { error: 'Unknown error' }
}

function isSuccessful(response) {
  return response.status === 200
}

// After
const HTTP_OK = 200
const HTTP_NOT_FOUND = 404
const HTTP_INTERNAL_SERVER_ERROR = 500

function handleResponse(response) {
  if (response.status === HTTP_NOT_FOUND) {
    return { error: 'Not found' }
  }
  if (response.status === HTTP_INTERNAL_SERVER_ERROR) {
    return { error: 'Server error' }
  }
  if (response.status === HTTP_OK) {
    return { data: response.body }
  }
  return { error: 'Unknown error' }
}

function isSuccessful(response) {
  return response.status === HTTP_OK
}
```

## Example 3: Retry Configuration

```javascript
// Before
function fetchWithRetry(url) {
  let attempts = 0

  function attempt() {
    return fetch(url).catch(error => {
      attempts++
      if (attempts < 3) {
        return new Promise(resolve => {
          setTimeout(() => resolve(attempt()), 1000)
        })
      }
      throw error
    })
  }

  return attempt()
}

// After
const MAX_RETRY_ATTEMPTS = 3
const RETRY_DELAY_MS = 1000

function fetchWithRetry(url) {
  let attempts = 0

  function attempt() {
    return fetch(url).catch(error => {
      attempts++
      if (attempts < MAX_RETRY_ATTEMPTS) {
        return new Promise(resolve => {
          setTimeout(() => resolve(attempt()), RETRY_DELAY_MS)
        })
      }
      throw error
    })
  }

  return attempt()
}
```

## Motivation

A magic literal is a literal value (number, string, boolean) that has special meaning but isn't given a name. When the same literal appears in multiple places, it becomes hard to understand what it represents and difficult to change consistently.

- **Improves Readability**: A descriptive constant name immediately communicates the purpose of a value, while a bare literal requires readers to infer its meaning from context
- **Enables Consistent Changes**: When a value appears in multiple places, naming it ensures all occurrences can be updated by changing a single definition
- **Documents Business Rules**: Constants serve as documentation for important thresholds, rates, and configuration values that represent business logic
- **Reduces Errors**: Using named constants instead of typing literal values repeatedly reduces the risk of typos and inconsistent values

## Mechanics

- Identify a literal value that has special meaning or appears in multiple places
- Declare a constant with a descriptive name that explains the literal's purpose
- Find all occurrences of the literal that represent the same logical concept
- Replace each occurrence with the new constant
- Test after each replacement, or after all replacements if you're confident they're all equivalent
- Consider the appropriate scope for the constant (local, module, or configuration file)
