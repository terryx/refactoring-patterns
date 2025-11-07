import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { model } from './client.js'
import {
    example1Before,
    example1After,
    example2Before,
    example2After,
    example3Before,
    example3After
} from '../../src/general/guard-clauses/example.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const rubricTemplate = readFileSync(join(__dirname, '../../docs/rubric.md'), 'utf-8')
const guideline = '- **Guard Clauses**: Handle edge cases early with immediate returns to reduce nesting'

describe('Guard Clauses Refactoring', () => {
    it('should evaluate example 1 - payment calculation with status checks', async () => {
        const badCode = example1Before.toString()
        const goodCode = example1After.toString()

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

    it('should evaluate example 2 - data processing with validation', async () => {
        const badCode = example2Before.toString()
        const goodCode = example2After.toString()

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

    it('should evaluate example 3 - configuration validation', async () => {
        const badCode = example3Before.toString()
        const goodCode = example3After.toString()

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
