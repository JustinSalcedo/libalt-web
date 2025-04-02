import {computed, makeAutoObservable} from 'mobx'
import {IssueStore} from '../issues/issue.store'
import {IssueLoggedTimeDto} from '../issues/dto/issue-logged-time.dto'
import {formatTimeWithoutMilliseconds} from '../utils/datetime'
import {FIFTEEN_MIN_IN_MS} from '../constants'

export class DailyLogObservable {
    dateOnView: Date = new Date()
    areRoundedTo15Min: boolean = true

    constructor(private issueStore: IssueStore) {
        makeAutoObservable(this, {
            dateOnViewRangeInMs: computed,
            dateSeekerStr: computed,
            loggedTimesByDate: computed,
        })
    }

    get dateOnViewRangeInMs() {
        const start = new Date(this.dateOnView)
        start.setHours(0, 0, 0, 0)
        const end = new Date(this.dateOnView)
        end.setHours(23, 59, 59, 999)
        return {
            startInMs: start.getTime(),
            endInMs: end.getTime() + 1,
        }
    }

    // e.g. "Jan 2"InMs
    get dateSeekerStr() {
        return this.dateOnView.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
        })
    }

    get loggedTimesByDate(): IssueLoggedTimeDto[] {
        const loggedTimes: IssueLoggedTimeDto[] = []
        this.issueStore.issues.forEach(issue => {
            const timeEntriesWithinDateOnViewRange = issue.timeEntries.filter(
                timeEntry =>
                    timeEntry.startTimeInMs >=
                        this.dateOnViewRangeInMs.startInMs &&
                    timeEntry.startTimeInMs < this.dateOnViewRangeInMs.endInMs,
            )
            const totalLoggedTimeInMs = timeEntriesWithinDateOnViewRange.reduce(
                (acc, timeEntry) => {
                    return (
                        acc + (timeEntry.endTimeInMs - timeEntry.startTimeInMs)
                    )
                },
                0,
            )
            const adjustedLoggedTimeInMs = this.areRoundedTo15Min
                ? Math.round(totalLoggedTimeInMs / FIFTEEN_MIN_IN_MS) *
                  FIFTEEN_MIN_IN_MS
                : totalLoggedTimeInMs

            if (adjustedLoggedTimeInMs > 0)
                loggedTimes.push({
                    displayTitle: `${issue.code} ${issue.name}`,
                    loggedTime: formatTimeWithoutMilliseconds(
                        adjustedLoggedTimeInMs,
                    ),
                })
        })

        return loggedTimes
    }

    setDateOnView(date: Date) {
        this.dateOnView = date
    }

    viewPreviousDay() {
        this.dateOnView.setDate(this.dateOnView.getDate() - 1)
        this.dateOnView = new Date(this.dateOnView)
    }

    viewNextDay() {
        this.dateOnView.setDate(this.dateOnView.getDate() + 1)
        this.dateOnView = new Date(this.dateOnView)
    }

    toggleRoundedTo15Min() {
        this.areRoundedTo15Min = !this.areRoundedTo15Min
    }
}
