import {makeAutoObservable, runInAction} from 'mobx'
import {Issue} from './issue'
import {IssueApi} from './issue.api'
import {IIssue} from '../types/IIssue'
import {RootStore} from '../root.store'

export class IssueStore {
    issues: Issue[] = []

    api: IssueApi

    synced = false

    constructor(private rootStore: RootStore) {
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
                            rootStore: this.rootStore,
                        }),
                )
                this.synced = true
            })
        } catch (error) {
            console.log(error)
        }
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
                rootStore: this.rootStore,
            })
            runInAction(() => {
                this.issues.push(issue)
            })
        } catch (error) {
            console.log(error)
        }
    }
}
