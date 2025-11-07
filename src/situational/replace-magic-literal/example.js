// Replace Magic Literal - Consolidated Fixtures

// Example 1: Bulk Order Business Rules
// Expected output: { discount: 100, freeShipping: true }
function example1Before(order) {
  function calculateDiscount(order) {
    if (order.quantity > 100) {
      return order.total * 0.1
    }
    return 0
  }

  function isEligibleForFreeShipping(order) {
    return order.quantity > 100
  }

  return {
    discount: calculateDiscount(order),
    freeShipping: isEligibleForFreeShipping(order)
  }
}

function example1After(order) {
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

  return {
    discount: calculateDiscount(order),
    freeShipping: isEligibleForFreeShipping(order)
  }
}

// Example 2: HTTP Status Codes
// Expected output: { result: { data: { user: 'John' } }, success: true }
function example2Before(response) {
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

  return {
    result: handleResponse(response),
    success: isSuccessful(response)
  }
}

function example2After(response) {
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

  return {
    result: handleResponse(response),
    success: isSuccessful(response)
  }
}

// Example 3: Retry Configuration
// Expected output: { data: 'success' }
function example3Before(url) {
  // Mock fetch for testing
  let callCount = 0
  const fetch = (url) => {
    callCount++
    if (callCount < 2) {
      return Promise.reject(new Error('Network error'))
    }
    return Promise.resolve({ data: 'success' })
  }

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

  return fetchWithRetry(url)
}

function example3After(url) {
  // Mock fetch for testing
  let callCount = 0
  const fetch = (url) => {
    callCount++
    if (callCount < 2) {
      return Promise.reject(new Error('Network error'))
    }
    return Promise.resolve({ data: 'success' })
  }

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

  return fetchWithRetry(url)
}

export {
  example1Before,
  example1After,
  example2Before,
  example2After,
  example3Before,
  example3After
}
