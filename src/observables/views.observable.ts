import {makeAutoObservable} from 'mobx'
import {MidPanelViewId} from '../types'

export class ViewsObservable {
    midPanel: MidPanelViewId = 'issue-list'

    constructor() {
        makeAutoObservable(this)
    }

    setMidPanelView(view: MidPanelViewId) {
        this.midPanel = view
    }
}
