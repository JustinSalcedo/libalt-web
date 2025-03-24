import {
    computed,
    IReactionDisposer,
    makeAutoObservable,
    reaction,
    runInAction,
} from 'mobx'
import {IIssue} from '../types/IIssue'
import {ITimeEntry} from '../types/ITimeEntry'
import {IssueStore} from './issue.store'
import {RootStore} from '../root.store'
import {formatTimeWithoutMilliseconds} from '../utils/datetime'

interface IssueConstructorDto {
    id: string
    code: string
    name: string
    timeEntries: ITimeEntry[]
    archived: boolean
    priority?: number

    issueStore: IssueStore
    rootStore: RootStore
}

interface TimeLogListItem {
    timeRange: string
    duration: string
}

export class Issue implements IIssue {
    id: string
    code: string
    name: string
    timeEntries: ITimeEntry[] = []
    archived: boolean = false
    priority: number = 0

    issueStore: IssueStore
    rootStore: RootStore

    updateIssueReactionDisposer: IReactionDisposer | null = null

    constructor({
        id,
        code,
        name,
        timeEntries,
        archived,
        priority,
        issueStore,
        rootStore,
    }: IssueConstructorDto) {
        makeAutoObservable(this, {
            isPlaying: computed,
            totalTimeInMs: computed,
            timeLogStrList: computed,
            updateIssueReactionDisposer: false,
        })

        this.id = id
        this.code = code
        this.name = name
        this.timeEntries = timeEntries
        this.archived = archived
        this.priority = priority ?? 0

        this.issueStore = issueStore
        this.rootStore = rootStore

        this.initReactions()
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

    get timeLogStrList(): TimeLogListItem[] {
        // today at midnight
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        return this.timeEntries.map(({startTimeInMs, endTimeInMs}) => {
            return {
                timeRange:
                    startTimeInMs >= today.getTime()
                        ? `${new Date(
                              startTimeInMs,
                          ).toLocaleTimeString()} - ${new Date(
                              endTimeInMs,
                          ).toLocaleTimeString()}`
                        : `${new Date(
                              startTimeInMs,
                          ).toLocaleString()} - ${new Date(
                              endTimeInMs,
                          ).toLocaleString()}`,
                duration: formatTimeWithoutMilliseconds(
                    Math.floor(endTimeInMs - startTimeInMs),
                ),
            }
        })
    }

    getIssueAbove(): Issue | undefined {
        const issueIndex = this.issueStore.activeIssues.findIndex(
            issue => issue.id === this.id,
        )
        if (issueIndex === -1) return undefined
        if (issueIndex === 0) return undefined
        return this.issueStore.activeIssues[issueIndex - 1]
    }

    initReactions() {
        this.updateIssueReactionDisposer = reaction(
            () => ({archived: this.archived, priority: this.priority}),
            ({archived, priority}) =>
                this.api
                    .updateIssue(this.id, {archived, priority})
                    .then(updated => console.log('updated:', updated))
                    .catch(error => console.error(error)),
        )
    }

    play() {
        this.rootStore.stopwatchObservable.startIssue(this)
    }

    stop() {
        if (this.isPlaying) this.rootStore.stopwatchObservable.stop()
    }

    moveUp() {
        const issueAbove = this.getIssueAbove()
        if (!issueAbove) return
        const issueIndex = this.issueStore.activeIssues.findIndex(
            issue => issue.id === this.id,
        )
        if (issueIndex === -1) return

        issueAbove.setPriority(this.priority)
        this.setPriority(this.priority - 1)
    }

    setPriority(priority: number) {
        this.priority = priority
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

    archive() {
        this.archived = true
        this.issueStore.resortIssuesByPriority()
    }

    unarchive() {
        this.archived = false
        this.priority = this.issueStore.activeIssues.length
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
