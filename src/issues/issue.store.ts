import {computed, makeAutoObservable, runInAction} from 'mobx'
import {Issue} from './issue'
import {IssueApi} from './issue.api'
import {IIssue} from '../types/IIssue'
import {RootStore} from '../root.store'
import {IssueDto} from './dto/issue.dto'

export class IssueStore {
    issues: Issue[] = []

    api: IssueApi

    synced = false

    constructor(private rootStore: RootStore) {
        makeAutoObservable(this, {
            activeIssues: computed,
            archivedIssues: computed,
        })
        this.api = new IssueApi()
    }

    get activeIssues() {
        return this.issues
            .filter(issue => !issue.archived)
            .sort((a, b) => a.priority - b.priority)
    }

    get archivedIssues() {
        return this.issues.filter(issue => issue.archived)
    }

    async sync() {
        try {
            console.log('Syncing issues')
            const records = await this.api.getAllIssues()

            const archivedRecords: IssueDto[] = []
            let activeRecords: IssueDto[] = []
            records.forEach(record => {
                if (record.archived) {
                    archivedRecords.push(record)
                } else {
                    activeRecords.push(record)
                }
            })
            activeRecords = activeRecords.sort(
                (a, b) => (a.priority ?? 0) - (b.priority ?? 0),
            )
            activeRecords.forEach((record, index) => {
                record.priority = index
            })
            await this.api
                .updateManyIssues(
                    activeRecords.map(({_id, ...record}) => ({
                        id: _id,
                        ...record,
                    })),
                )
                .catch(error => {
                    console.error(error)
                })

            runInAction(() => {
                this.issues = [...activeRecords, ...archivedRecords].map(
                    record => this.generateIssueFromRecord(record),
                )
                this.synced = true
            })
        } catch (error) {
            console.log(error)
        }
    }

    async createIssue(issueData: IIssue) {
        try {
            const record = await this.api.createIssue(issueData)
            if (!record) throw new Error('Issue not created')
            const issue = this.generateIssueFromRecord(record)
            runInAction(() => {
                this.issues.push(issue)
            })
        } catch (error) {
            console.log(error)
        }
    }

    resortIssuesByPriority() {
        const activeIssues = [...this.activeIssues].sort(
            (a, b) => a.priority - b.priority,
        )
        activeIssues.forEach((issue, index) => {
            issue.setPriority(index)
        })
        this.issues = [...activeIssues, ...this.archivedIssues]
    }

    generateIssueFromRecord(record: IssueDto) {
        return new Issue({
            id: record._id,
            code: record.code,
            name: record.name,
            timeEntries: record.timeEntries,
            archived: record.archived,
            priority: record.priority,
            issueStore: this,
            rootStore: this.rootStore,
        })
    }
}
