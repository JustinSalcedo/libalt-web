import {makeAutoObservable} from 'mobx'
import {IssueStore} from './issues/issue.store'
import {StopwatchObservable} from './observables/stopwatch.observable'
import {IssueListObservable} from './observables/issue-list.observable'

export class RootStore {
    issueStore: IssueStore
    stopwatchObservable: StopwatchObservable
    issueListObservable: IssueListObservable

    constructor() {
        makeAutoObservable(this, {init: false})

        this.issueStore = new IssueStore(this)
        this.stopwatchObservable = new StopwatchObservable(this)
        this.issueListObservable = new IssueListObservable(this.issueStore)
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
