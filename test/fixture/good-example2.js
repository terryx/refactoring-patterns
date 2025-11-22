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

    function buildJqlQuery() {
        const assigneeConditions = atlassianIds.map(id => `assignee = "${id}"`).join(' OR ')
        return `(${assigneeConditions}) AND statusCategory = "${statusCategory}" AND statusCategoryChangedDate >= "${startDate}" AND statusCategoryChangedDate <= "${endDate}"`
    }

    return searchIssues(buildJqlQuery(), { maxResults })
}

/**
 * @param {string} params.startDate - YYYY-MM-DD format
 * @param {string} params.endDate - YYYY-MM-DD format
 * @param {Array<string>} params.statusCategories - Must be a non-empty array
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

    function formatReportName(teamName, date) {
        const formattedDate = format(new Date(date), 'dd MMM yyyy')
        return `${teamName} ${formattedDate}`
    }

    const atlassianIds = team.users.map(user => user.accountId)

    const issuesByCategory = await Promise.all(
        statusCategories.map(statusCategory =>
            searchUserIssues(atlassianIds, statusCategory, startDate, endDate)
                .then(issues => ({ statusCategory, issues }))
        )
    )

    const issues = Object.fromEntries(
        issuesByCategory.map(({ statusCategory, issues }) => [statusCategory, issues])
    )

    const reportData = {
        teamId,
        teamName: team.name,
        startDate,
        endDate,
        statusCategories,
        createdAt: Date.now(),
        issues
    }

    const reportName = formatReportName(team.name, reportData.createdAt)
    const savedReport = createReport(reportName, reportData)
    const totalIssueCount = Object.values(reportData.issues).reduce(
        (sum, issues) => sum + issues.length,
        0
    )

    return {
        success: true,
        message: 'Report created successfully',
        data: {
            reportId: savedReport.id,
            reportName: savedReport.name,
            teamId,
            issueCount: totalIssueCount
        }
    }
}
