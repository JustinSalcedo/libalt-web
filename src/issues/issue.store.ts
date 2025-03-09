import {makeAutoObservable, runInAction} from 'mobx'
import {Issue} from './issue'
import {IssueApi} from './issue.api'
import {IIssue} from '../types/IIssue'

export class IssueStore {
    issues: Issue[] = []
    issueInProgress: Issue | null = null

    api: IssueApi

    synced = false

    constructor() {
        makeAutoObservable(this)
        this.api = new IssueApi()
    }

    async sync() {
        try {
            console.log('Syncing issues')
            const records = await this.api.getAllIssues()
            runInAction(() => {
                this.issues = records.map(
                    record =>
                        new Issue({
                            id: record._id,
                            code: record.code,
                            name: record.name,
                            timeEntries: record.timeEntries,
                            archived: record.archived,
                            issueStore: this,
                        }),
                )
                this.synced = true
            })
        } catch (error) {
            console.log(error)
        }
    }

    setIssueInProgress(issue: Issue | null) {
        this.issueInProgress = issue
    }

    async createIssue(issueDto: IIssue) {
        try {
            const record = await this.api.createIssue(issueDto)
            if (!record) throw new Error('Issue not created')
            const issue = new Issue({
                id: record._id,
                code: record.code,
                name: record.name,
                timeEntries: record.timeEntries,
                archived: record.archived,
                issueStore: this,
            })
            runInAction(() => {
                this.issues.push(issue)
            })
        } catch (error) {
            console.log(error)
        }
    }
}
