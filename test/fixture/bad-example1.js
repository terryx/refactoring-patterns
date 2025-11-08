const BASE_URL = 'https://www.alphavantage.co/query'
const RATE_LIMIT_DELAY = 12000
const MAX_RETRIES = 3
const RETRY_DELAY = 1000

function hasRateLimitError(data) {
    return Boolean(data.Information)
}

function hasApiError(data) {
    return Boolean(data['Error Message'])
}

function createRateLimitError() {
    return new Error('API rate limit exceeded. Please try again later.')
}

function createApiError(data) {
    return new Error(data['Error Message'])
}

function createHttpError(status) {
    return new Error(`HTTP error! status: ${status}`)
}

function shouldRetry(attempt, maxRetries) {
    return attempt < maxRetries - 1
}

function calculateRetryDelay(attempt) {
    return RETRY_DELAY * (attempt + 1)
}

class AlphaVantageClient {
    constructor() {
        this.apiKey = process.env.ALPHAVANTAGE_API_KEY
        this.lastRequestTime = 0
        this.rateLimitExceeded = false

        if (!this.apiKey) {
            throw new Error('ALPHAVANTAGE_API_KEY environment variable is required')
        }
    }

    async fetchWithRateLimit(url) {
        if (this.rateLimitExceeded) {
            throw createRateLimitError()
        }

        await this.waitForRateLimit()
        this.lastRequestTime = Date.now()

        try {
            return await this.fetchWithRetry(url)
        } catch (error) {
            const functionName = this.extractFunctionFromUrl(url)
            throw error
        }
    }

    async waitForRateLimit() {
        const timeSinceLastRequest = Date.now() - this.lastRequestTime

        if (timeSinceLastRequest < RATE_LIMIT_DELAY) {
            const waitTime = RATE_LIMIT_DELAY - timeSinceLastRequest
            await this.delay(waitTime)
        }
    }

    async fetchWithRetry(url, retries = MAX_RETRIES) {
        return this.attemptFetchWithRetries(url, 0, retries)
    }

    async attemptFetchWithRetries(url, attempt, maxRetries) {
        const response = await fetch(url)

        if (!response.ok) {
            return this.handleFailedResponse(
                url,
                attempt,
                maxRetries,
                createHttpError(response.status)
            )
        }

        const data = await response.json()
        const validationError = this.validateResponseData(data)

        if (validationError) {
            // Rate limit errors should not be retried - throw immediately
            if (this.rateLimitExceeded) {
                throw validationError
            }
            return this.handleFailedResponse(url, attempt, maxRetries, validationError)
        }

        return data
    }

    validateResponseData(data) {
        if (hasRateLimitError(data)) {
            this.handleRateLimitExceeded()
            return createRateLimitError()
        }

        if (hasApiError(data)) {
            return createApiError(data)
        }

        return null
    }

    handleRateLimitExceeded() {
        this.rateLimitExceeded = true
    }

    async handleFailedResponse(url, attempt, maxRetries, error) {
        if (!shouldRetry(attempt, maxRetries)) {
            throw error
        }

        const retryDelay = calculateRetryDelay(attempt)
        await this.delay(retryDelay)
        return this.attemptFetchWithRetries(url, attempt + 1, maxRetries)
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms))
    }

    buildUrl(functionName, symbol) {
        const params = new URLSearchParams({
            function: functionName,
            symbol: symbol,
            apikey: this.apiKey
        })
        return `${BASE_URL}?${params.toString()}`
    }

    async fetchFinancialData(functionName, symbol) {
        const url = this.buildUrl(functionName, symbol)
        const functionDisplayName = this.extractFunctionFromUrl(url)
        const data = await this.fetchWithRateLimit(url)
        return data
    }

    async getIncomeStatement(symbol) {
        return this.fetchFinancialData('INCOME_STATEMENT', symbol)
    }

    async getBalanceSheet(symbol) {
        return this.fetchFinancialData('BALANCE_SHEET', symbol)
    }

    async getCashFlow(symbol) {
        return this.fetchFinancialData('CASH_FLOW', symbol)
    }

    async getStockPrice(symbol) {
        return this.fetchFinancialData('TIME_SERIES_MONTHLY_ADJUSTED', symbol)
    }

    extractFunctionFromUrl(url) {
        try {
            const urlObj = new URL(url)
            const functionParam = urlObj.searchParams.get('function')
            const symbolParam = urlObj.searchParams.get('symbol')
            return symbolParam ? `${functionParam}(${symbolParam})` : functionParam || 'unknown'
        } catch {
            return 'unknown'
        }
    }
}

export function createClient() {
    return new AlphaVantageClient()
}

export default AlphaVantageClient

