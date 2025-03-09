import {makeAutoObservable, runInAction} from 'mobx'
import {IIssue} from '../types/IIssue'
import {ITimeEntry} from '../types/ITimeEntry'
import {IssueStore} from './issue.store'

interface IssueConstructorDto {
    id: string
    code: string
    name: string
    timeEntries: ITimeEntry[]
    archived: boolean

    issueStore: IssueStore
}

export class Issue implements IIssue {
    id: string
    code: string
    name: string
    timeEntries: ITimeEntry[] = []
    archived: boolean = false

    issueStore: IssueStore

    constructor({
        id,
        code,
        name,
        timeEntries,
        archived,
        issueStore,
    }: IssueConstructorDto) {
        makeAutoObservable(this)

        this.id = id
        this.code = code
        this.name = name
        this.timeEntries = timeEntries
        this.archived = archived

        this.issueStore = issueStore
    }

    get api() {
        return this.issueStore.api
    }

    play() {
        this.issueStore.setIssueInProgress(this)
    }

    async addTimeEntry(timeEntry: ITimeEntry) {
        try {
            const timeEntryRecord = await this.api.addTimeEntryToIssue(
                this.id,
                timeEntry,
            )
            if (!timeEntryRecord) throw new Error('Failed to add time entry')
            this.timeEntries.push(timeEntry)
        } catch (error) {
            console.error(error)
        }
    }

    async deleteTimeEntry(timeEntryId: string) {
        try {
            const deleted = await this.api.deleteTimeEntryFromIssue(
                this.id,
                timeEntryId,
            )
            if (!deleted) throw new Error('Failed to delete time entry')
            runInAction(() => {
                this.timeEntries = this.timeEntries.filter(
                    timeEntry =>
                        timeEntry.startTimeInMs !== deleted.startTimeInMs,
                )
            })
        } catch (error) {
            console.error(error)
        }
    }

    async archive() {
        try {
            const archived = await this.api.updateIssue(this.id, {
                archived: true,
            })
            if (!archived) throw new Error('Failed to archive issue')
            runInAction(() => {
                this.archived = true
            })
        } catch (error) {
            console.error(error)
        }
    }

    async unarchive() {
        try {
            const unarchived = await this.api.updateIssue(this.id, {
                archived: false,
            })
            if (!unarchived) throw new Error('Failed to unarchive issue')
            runInAction(() => {
                this.archived = false
            })
        } catch (error) {
            console.error(error)
        }
    }

    async delete() {
        try {
            const deleted = await this.api.deleteIssue(this.id)
            if (!deleted) throw new Error('Failed to delete issue')
            runInAction(() => {
                this.issueStore.issues = this.issueStore.issues.filter(
                    issue => issue.id !== this.id,
                )
            })
        } catch (error) {
            console.error(error)
        }
    }
}
