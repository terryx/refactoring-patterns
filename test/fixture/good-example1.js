const BASE_URL = 'https://www.alphavantage.co/query'
const RATE_LIMIT_DELAY = 12000
const MAX_RETRIES = 3
const RETRY_DELAY = 1000

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
            throw new Error('API rate limit exceeded. Please try again later.')
        }

        await this.waitForRateLimit()
        this.lastRequestTime = Date.now()

        try {
            return await this.attemptFetchWithRetries(url, 0, MAX_RETRIES)
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

    async attemptFetchWithRetries(url, attempt, maxRetries) {
        const response = await fetch(url)

        if (!response.ok) {
            return this.handleFailedResponse(
                url,
                attempt,
                maxRetries,
                new Error(`HTTP error! status: ${response.status}`)
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
        if (data.Information) {
            this.handleRateLimitExceeded()
            return new Error('API rate limit exceeded. Please try again later.')
        }

        if (data['Error Message']) {
            return new Error(data['Error Message'])
        }

        return null
    }

    handleRateLimitExceeded() {
        this.rateLimitExceeded = true
    }

    async handleFailedResponse(url, attempt, maxRetries, error) {
        if (attempt >= maxRetries - 1) {
            throw error
        }

        await this.delay(RETRY_DELAY * (attempt + 1))
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

export default AlphaVantageClient

