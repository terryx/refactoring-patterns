import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

/**
 * Extracts a guideline for a specific principle from .claude/claude.md
 * 
 * The function parses the markdown structure where principles are listed as:
 * - Single-line format: `- **Principle Name**: description`
 * - Multi-line format: `- **Principle Name**` followed by indented sub-bullets `    - sub-item`
 * 
 * @param {string} principleName - The name of the principle to extract (e.g., "Guard Clauses")
 * @param {string} sectionName - The section name to search in (default: "General Principles")
 * @returns {string} The formatted guideline text matching the markdown structure
 */
export function extractGuideline(principleName, sectionName = 'General Principles') {
    const claudeMdPath = join(__dirname, '../../../.claude/claude.md')
    const content = readFileSync(claudeMdPath, 'utf-8')
    const lines = content.split('\n')
    
    const sectionHeader = `## ${sectionName}`
    const principlePattern = new RegExp(`^-\\s+\\*\\*${principleName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\*\\*`)
    
    // Find the section start index
    const sectionStartIndex = lines.findIndex(line => line.trim() === sectionHeader)
    if (sectionStartIndex === -1) {
        throw new Error(`Could not find section "${sectionName}" in claude.md`)
    }
    
    // Find the next section header or end of file
    const sectionEndIndex = lines
        .slice(sectionStartIndex + 1)
        .findIndex(line => line.match(/^## /))
    const sectionLines = sectionEndIndex === -1
        ? lines.slice(sectionStartIndex + 1)
        : lines.slice(sectionStartIndex + 1, sectionStartIndex + 1 + sectionEndIndex)
    
    // Find the principle line index
    const principleIndex = sectionLines.findIndex(line => principlePattern.test(line))
    if (principleIndex === -1) {
        throw new Error(`Could not extract "${principleName}" guideline from claude.md in section "${sectionName}"`)
    }
    
    // Collect the principle line and its sub-bullets using pipeline operations
    const linesFromPrinciple = sectionLines.slice(principleIndex)
    
    // Find the index where we should stop (next top-level bullet or non-empty non-indented line)
    const stopIndex = linesFromPrinciple
        .slice(1)
        .findIndex(line => line.match(/^-\s+\*\*/) || (line.trim() && !line.startsWith(' ')))
    
    // Slice to the stopping point (or take all if no stop found)
    const candidateLines = stopIndex === -1
        ? linesFromPrinciple
        : linesFromPrinciple.slice(0, stopIndex + 1)
    
    // Filter to include only the principle line (first line) and its sub-bullets (indented lines)
    const principleLines = candidateLines.filter((line, index) => 
        index === 0 || line.startsWith('    -')
    )
    
    const guideline = principleLines.join('\n').trim()
    
    if (!guideline) {
        throw new Error(`Could not extract "${principleName}" guideline from claude.md in section "${sectionName}"`)
    }
    
    return guideline
}

