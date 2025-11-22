/**
 * Report service - generates reports based on Atlassian issue data
 */

import { format } from 'date-fns'
import searchIssues from '../../atlassian/service/search.js'
import { findTeamById } from '../../team/service/team.js'
import { createReport } from '../../../database/service.js'

export async function searchUserIssues(
    atlassianIds,
    statusCategory,
    startDate,
    endDate,
    maxResults = 1000
) {
    if (!Array.isArray(atlassianIds) || atlassianIds.length === 0) {
        throw new Error('atlassian_ids must be a non-empty array')
    }

    if (!statusCategory || typeof statusCategory !== 'string') {
        throw new Error('status_category must be a non-empty string')
    }

    const assigneeConditions = atlassianIds.map(id => `assignee = "${id}"`).join(' OR ')

    const jql = `(${assigneeConditions}) AND statusCategory = "${statusCategory}" AND statusCategoryChangedDate >= "${startDate}" AND statusCategoryChangedDate <= "${endDate}"`

    return searchIssues(jql, { maxResults })
}

function formatReportName(teamName, date) {
    const formattedDate = format(new Date(date), 'dd MMM yyyy')
    return `${teamName} ${formattedDate}`
}

/**
 * Creates a report by searching issues and saving results to the database
 * @param {Object} params - Report parameters
 * @param {string} params.teamId - The team ID
 * @param {string} params.startDate - Start date in YYYY-MM-DD format
 * @param {string} params.endDate - End date in YYYY-MM-DD format
 * @param {Array<string>} params.statusCategories - Array of status categories (e.g., ['In Progress', 'Done'])
 * @returns {Promise<Object>} Result object with success status and report data
 */
export async function addReport({ teamId, startDate, endDate, statusCategories }) {
    if (!teamId) {
        throw new Error('teamId is required')
    }

    if (!startDate || !endDate) {
        throw new Error('startDate and endDate are required')
    }

    if (!Array.isArray(statusCategories) || statusCategories.length === 0) {
        throw new Error('statusCategories must be a non-empty array')
    }

    const team = await findTeamById(teamId)
    if (!team) {
        throw new Error(`Team not found: ${teamId}`)
    }

    if (!team.users || team.users.length === 0) {
        throw new Error('Team has no users')
    }

    const atlassianIds = team.users.map(user => user.accountId)

    const reportData = {
        teamId,
        teamName: team.name,
        startDate,
        endDate,
        statusCategories,
        createdAt: Date.now(),
        issues: {}
    }

    for (const statusCategory of statusCategories) {
        const issues = await searchUserIssues(
            atlassianIds,
            statusCategory,
            startDate,
            endDate
        )
        reportData.issues[statusCategory] = issues
    }

    const reportName = formatReportName(team.name, reportData.createdAt)
    const savedReport = createReport(reportName, reportData)

    return {
        success: true,
        message: 'Report created successfully',
        data: {
            reportId: savedReport.id,
            reportName: savedReport.name,
            teamId,
            issueCount: Object.values(reportData.issues).reduce(
                (sum, issues) => sum + issues.length,
                0
            )
        }
    }
}
