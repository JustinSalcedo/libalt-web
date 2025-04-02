import {makeAutoObservable} from 'mobx'
import {IssueStore} from './issues/issue.store'
import {StopwatchObservable} from './observables/stopwatch.observable'
import {IssueListObservable} from './observables/issue-list.observable'
import {DailyLogObservable} from './observables/daily-log.observable'
import {ViewsObservable} from './observables/views.observable'

export class RootStore {
    viewsObservable: ViewsObservable
    issueStore: IssueStore
    stopwatchObservable: StopwatchObservable
    issueListObservable: IssueListObservable
    dailyLogObservable: DailyLogObservable

    constructor() {
        makeAutoObservable(this, {init: false})

        this.viewsObservable = new ViewsObservable()
        this.issueStore = new IssueStore(this)
        this.stopwatchObservable = new StopwatchObservable(this)
        this.issueListObservable = new IssueListObservable(this.issueStore)
        this.dailyLogObservable = new DailyLogObservable(this.issueStore)
        this.init()
    }

    init() {
        try {
            this.bootload()
        } catch (error) {}
    }

    async bootload() {
        try {
            await this.issueStore.sync()
        } catch (error) {
            console.error(error)
        }
    }
}
