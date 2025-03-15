import {computed, makeAutoObservable} from 'mobx'
import {RootStore} from '../root.store'
import {formatStopwatchTime} from '../utils/datetime'
import {Issue} from '../issues/issue'

export class StopwatchObservable {
    timeCountInMs = 0
    isRunning = false
    timeCounterIntervalId: NodeJS.Timer | number = 0
    calibrateCounterIntervalId: NodeJS.Timer | number = 0
    startTimeInMs = 0
    issueInProgress: Issue | null = null

    constructor(private rootStore: RootStore) {
        makeAutoObservable(this, {
            code: computed,
            name: computed,
            title: computed,
            formattedTime: computed,
            isIssueInProgress: computed,
        })
    }

    get code() {
        return this.issueInProgress?.code ?? '[NO-CODE]'
    }

    get name() {
        return this.issueInProgress?.name ?? 'Untitled issue'
    }

    get title() {
        return this.issueInProgress
            ? `${this.code} ${this.name}`
            : 'Nothing in progress'
    }

    get formattedTime() {
        return formatStopwatchTime(this.timeCountInMs)
    }

    get isIssueInProgress() {
        return !!this.issueInProgress
    }

    setTime(timeCountInMs: number) {
        this.timeCountInMs = timeCountInMs
    }

    runTimeCounter() {
        this.isRunning = true
        this.startTimeInMs = Date.now()
        this.timeCounterIntervalId = setInterval(
            () => this.setTime(this.timeCountInMs + 10),
            10,
        )
        this.calibrateCounterIntervalId = setInterval(
            () =>
                this.setTime(
                    Date.now() -
                        this.startTimeInMs +
                        (this.issueInProgress?.totalTimeInMs ?? 0),
                ),
            5000,
        )
    }

    stopTimeCounter() {
        this.isRunning = false
        clearInterval(this.timeCounterIntervalId)
        clearInterval(this.calibrateCounterIntervalId)
        if (!this.startTimeInMs) return
        this.issueInProgress?.addTimeEntry({
            startTimeInMs: this.startTimeInMs,
            endTimeInMs: Date.now(),
        })
        this.startTimeInMs = 0
    }

    startIssue(issue: Issue) {
        if (issue !== this.issueInProgress) this.stop()
        if (this.isRunning) return
        this.issueInProgress = issue
        this.setTime(issue.totalTimeInMs)
        this.play()
    }

    play() {
        this.runTimeCounter()
    }

    pause() {
        this.stopTimeCounter()
    }

    stop() {
        this.stopTimeCounter()
        this.setTime(0)
        this.issueInProgress = null
    }
}
