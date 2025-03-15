import {computed, makeAutoObservable, runInAction} from 'mobx'
import {IIssue} from '../types/IIssue'
import {ITimeEntry} from '../types/ITimeEntry'
import {IssueStore} from './issue.store'
import {RootStore} from '../root.store'

interface IssueConstructorDto {
    id: string
    code: string
    name: string
    timeEntries: ITimeEntry[]
    archived: boolean

    issueStore: IssueStore
    rootStore: RootStore
}

export class Issue implements IIssue {
    id: string
    code: string
    name: string
    timeEntries: ITimeEntry[] = []
    archived: boolean = false

    issueStore: IssueStore
    rootStore: RootStore

    constructor({
        id,
        code,
        name,
        timeEntries,
        archived,
        issueStore,
        rootStore,
    }: IssueConstructorDto) {
        makeAutoObservable(this, {
            isPlaying: computed,
            totalTimeInMs: computed,
        })

        this.id = id
        this.code = code
        this.name = name
        this.timeEntries = timeEntries
        this.archived = archived

        this.issueStore = issueStore
        this.rootStore = rootStore
    }

    get api() {
        return this.issueStore.api
    }

    get isPlaying() {
        return (
            this.rootStore.stopwatchObservable.issueInProgress === this &&
            this.rootStore.stopwatchObservable.isRunning
        )
    }

    get totalTimeInMs() {
        return this.timeEntries.reduce((acc, timeEntry) => {
            return acc + (timeEntry.endTimeInMs - timeEntry.startTimeInMs)
        }, 0)
    }

    play() {
        this.rootStore.stopwatchObservable.startIssue(this)
    }

    stop() {
        if (this.isPlaying) this.rootStore.stopwatchObservable.stop()
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
