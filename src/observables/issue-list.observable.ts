import {computed, makeAutoObservable} from 'mobx'
import {IssueStore} from '../issues/issue.store'

export class IssueListObservable {
    constructor(private issueStore: IssueStore) {
        makeAutoObservable(this, {
            activeIssues: computed,
            archivedIssues: computed,
        })
    }
    get activeIssues() {
        return this.issueStore.issues.filter(issue => !issue.archived)
    }

    get archivedIssues() {
        return this.issueStore.issues.filter(issue => issue.archived)
    }
}
