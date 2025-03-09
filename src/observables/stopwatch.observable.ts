import {computed, IReactionDisposer, makeAutoObservable, reaction} from 'mobx'
import {RootStore} from '../root.store'
import {formatStopwatchTime} from '../utils/datetime'

export class StopwatchObservable {
    timeInMs = 0
    isRunning = false
    intervalId: NodeJS.Timer | number = 0
    startTimeInMs = 0

    isRunningReactionDisposer: IReactionDisposer | null = null
    isIssuePlayedReactionDisposer: IReactionDisposer | null = null

    constructor(private rootStore: RootStore) {
        makeAutoObservable(this, {
            code: computed,
            name: computed,
            title: computed,
            formattedTime: computed,
            isIssueInProgress: computed,
        })
        this.initReactions()
    }

    initReactions() {
        this.isRunningReactionDisposer = reaction(
            () => this.isRunning,
            isRunning => {
                if (isRunning) {
                    this.startTimeInMs = Date.now()
                    this.intervalId = setInterval(
                        () => this.setTime(this.timeInMs + 10),
                        10,
                    )
                    return
                }
                clearInterval(this.intervalId)
                this.rootStore.issueStore.issueInProgress?.addTimeEntry({
                    startTimeInMs: this.startTimeInMs,
                    endTimeInMs: Date.now(),
                })
                this.startTimeInMs = 0
            },
        )
        this.isIssuePlayedReactionDisposer = reaction(
            () => this.rootStore.issueStore.issueInProgress,
            issue => {
                console.log('issue', issue)
                if (issue) this.start()
                // else this.stop()
            },
        )
    }

    get code() {
        return this.rootStore.issueStore.issueInProgress?.code ?? '[NO-CODE]'
    }

    get name() {
        return (
            this.rootStore.issueStore.issueInProgress?.name ?? 'Untitled issue'
        )
    }

    get title() {
        return this.rootStore.issueStore.issueInProgress
            ? `${this.code} ${this.name}`
            : 'Nothing in progress'
    }

    get formattedTime() {
        return formatStopwatchTime(this.timeInMs)
    }

    get isIssueInProgress() {
        return !!this.rootStore.issueStore.issueInProgress
    }

    setTime(timeInMs: number) {
        this.timeInMs = timeInMs
    }

    start() {
        this.isRunning = true
        console.log('starting at stopwatch')
    }

    pause() {
        this.isRunning = false
    }

    stop() {
        this.isRunning = false
        this.setTime(0)
        // blur issue after reactions
        setTimeout(() => this.rootStore.issueStore.setIssueInProgress(null))
    }
}
