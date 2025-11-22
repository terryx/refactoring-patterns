import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { model } from './client.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const rubricTemplate = readFileSync(join(__dirname, '../../docs/rubric.md'), 'utf-8')
const guideline = readFileSync(join(__dirname, '../../docs/rubric.md'), 'utf-8')

describe('E2E Refactoring Tests', () => {
    it('should evaluate Bad Example and Good Example with extracted functions', async () => {
        const badCode = readFileSync(join(__dirname, '../fixture/good-example2.js'), 'utf-8')
        const goodCode = readFileSync(join(__dirname, '../fixture/bad-example2.js'), 'utf-8')

        const prompt = rubricTemplate
            .replace('{GUIDELINE}', guideline)
            .replace('{BAD_EXAMPLE}', badCode)
            .replace('{GOOD_EXAMPLE}', goodCode)
            .replace('{CANDIDATE_CODE}', goodCode)

        const result = await model.generateContent(prompt)
        const response = await result.response
        const text = response.text()

        const jsonMatch = text.match(/\{[\s\S]*\}/)
        expect(jsonMatch).toBeTruthy()

        const parsed = JSON.parse(jsonMatch[0])
        expect(parsed).toHaveProperty('score')
        expect(parsed).toHaveProperty('reason')
        expect(typeof parsed.score).toBe('number')
        expect(parsed.score).toBeGreaterThanOrEqual(0.95)
    })
})
