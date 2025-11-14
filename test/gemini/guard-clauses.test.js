import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { model } from './client.js'
import { extractGuideline } from './utils/extract-guideline.js'
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
const guideline = extractGuideline('Guard Clauses')

const MIN_SCORE = 0.95

/**
 * Evaluates refactored code against the rubric and returns parsed result
 * @param {Function} badCode - The before refactoring code
 * @param {Function} goodCode - The after refactoring code (target reference)
 * @returns {Promise<{score: number, reason: string, candidateCode?: string}>}
 */
async function evaluateRefactoring(badCode, goodCode) {
    const prompt = rubricTemplate
        .replace('{GUIDELINE}', guideline)
        .replace('{BAD_EXAMPLE}', badCode.toString())
        .replace('{GOOD_EXAMPLE}', goodCode.toString())

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()

    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
        throw new Error(`No JSON found in response. Response preview: ${text.substring(0, 200)}`)
    }

    try {
        const parsed = JSON.parse(jsonMatch[0])
        
        if (!parsed.score && parsed.score !== 0) {
            throw new Error(`Missing score in response. Got: ${JSON.stringify(parsed)}`)
        }
        if (!parsed.reason) {
            throw new Error(`Missing reason in response. Got: ${JSON.stringify(parsed)}`)
        }
        if (typeof parsed.score !== 'number') {
            throw new Error(`Score must be a number. Got: ${typeof parsed.score}`)
        }

        return parsed
    } catch (error) {
        if (error instanceof SyntaxError) {
            throw new Error(`Invalid JSON in response: ${error.message}\nJSON attempt: ${jsonMatch[0].substring(0, 300)}`)
        }
        throw error
    }
}

/**
 * Formats code for display, truncating if too long
 * @param {string} code - The code to format
 * @param {number} maxLines - Maximum number of lines to show
 * @returns {string} Formatted code string
 */
function formatCode(code, maxLines = 30) {
    if (!code) return '(not provided)'
    
    const lines = code.split('\n')
    if (lines.length <= maxLines) {
        return code
    }
    
    const preview = lines.slice(0, maxLines).join('\n')
    const remaining = lines.length - maxLines
    return `${preview}\n... (${remaining} more lines)`
}

/**
 * Asserts that the score meets the minimum threshold with a concise error message
 * @param {number} score - The evaluation score
 * @param {string} reason - The evaluation reason
 * @param {string} candidateCode - The generated candidate code
 * @param {number} minScore - The minimum required score
 */
function assertScore(score, reason, candidateCode, minScore = MIN_SCORE) {
    if (score < minScore) {
        const truncatedReason = reason?.length > 200 
            ? reason.substring(0, 200) + '...' 
            : reason
        
        const formattedCode = formatCode(candidateCode)
        
        throw new Error(
            `Score ${score.toFixed(3)} is below minimum ${minScore}\n\n` +
            `Reason:\n${truncatedReason}\n\n` +
            `Candidate Code:\n${'='.repeat(60)}\n${formattedCode}\n${'='.repeat(60)}`
        )
    }
}

describe('Guard Clauses Refactoring', () => {
    it('should evaluate example 1 - payment calculation with status checks', async () => {
        const result = await evaluateRefactoring(example1Before, example1After)
        assertScore(result.score, result.reason, result.candidateCode)
        expect(result.score).toBeGreaterThanOrEqual(MIN_SCORE)
    })

    it('should evaluate example 2 - data processing with validation', async () => {
        const result = await evaluateRefactoring(example2Before, example2After)
        assertScore(result.score, result.reason, result.candidateCode)
        expect(result.score).toBeGreaterThanOrEqual(MIN_SCORE)
    })

    it('should evaluate example 3 - configuration validation', async () => {
        const result = await evaluateRefactoring(example3Before, example3After)
        assertScore(result.score, result.reason, result.candidateCode)
        expect(result.score).toBeGreaterThanOrEqual(MIN_SCORE)
    })
})
