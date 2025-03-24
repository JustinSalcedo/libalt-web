import {RootApi} from '../root.api'
import {IIssue} from '../types/IIssue'
import {ITimeEntry} from '../types/ITimeEntry'
import {IssueDto} from './dto/issue.dto'
import {TimeEntryDto} from './dto/time-entry.dto'
import {UpdateIssueDto} from './dto/update-issue.dto'

export class IssueApi extends RootApi {
    constructor() {
        super({}, {auth: false})
        this.baseURL = this.baseURL + '/issues'
    }

    async getAllIssues() {
        try {
            console.log(this.baseURL)
            const response = await this.GET('/')

            const {status} = response
            const data = await response.json()

            if (status !== 200) throw new Error(data.message || 'Unknown error')

            return data as IssueDto[]
        } catch (error) {
            console.error(error)
            return []
        }
    }

    async getAllActiveIssues() {
        try {
            const response = await this.GET('/active')

            const {status} = response
            const data = await response.json()

            if (status !== 200) throw new Error(data.message || 'Unknown error')

            return data as IssueDto[]
        } catch (error) {
            console.error(error)
            return []
        }
    }

    async getAllArchivedIssues() {
        try {
            const response = await this.GET('/archived')

            const {status} = response
            const data = await response.json()

            if (status !== 200) throw new Error(data.message || 'Unknown error')

            return data as IssueDto[]
        } catch (error) {
            console.error(error)
            return []
        }
    }

    async getIssueById(id: string) {
        try {
            const response = await this.GET(`/${id}`)

            const {status} = response
            const data = await response.json()

            if (status !== 200) throw new Error(data.message || 'Unknown error')
            if (!data) throw new Error('Issue not found')

            return data as IssueDto
        } catch (error) {
            console.error(error)
            return null
        }
    }

    async createIssue(issue: IIssue) {
        try {
            console.log('creating issue', issue)
            const response = await this.POST('/', {
                body: JSON.stringify(issue),
            })

            const {status} = response
            const data = await response.json()

            if (status !== 201) throw new Error(data.message || 'Unknown error')

            return data as IssueDto
        } catch (error) {
            console.error(error)
            return null
        }
    }

    async createManyIssues(issues: IIssue[]) {
        try {
            const response = await this.POST('/many', {
                body: JSON.stringify(issues),
            })

            const {status} = response
            const data = await response.json()

            if (status !== 201) throw new Error(data.message || 'Unknown error')

            return data as IssueDto[]
        } catch (error) {
            console.error(error)
            return []
        }
    }

    async updateIssue(id: string, issue: Partial<IIssue>) {
        try {
            const response = await this.PUT(`/${id}`, {
                body: JSON.stringify(issue),
            })

            const {status} = response
            const data = await response.json()

            if (status !== 200) throw new Error(data.message || 'Unknown error')

            return data as IssueDto
        } catch (error) {
            console.error(error)
            return null
        }
    }

    async updateManyIssues(issues: UpdateIssueDto[]) {
        try {
            const response = await this.PUT('/', {
                body: JSON.stringify(issues),
            })

            const {status} = response
            const data = await response.json()

            if (status !== 200) throw new Error(data.message || 'Unknown error')

            return data as IssueDto[]
        } catch (error) {
            console.error(error)
            return []
        }
    }

    async deleteIssue(id: string) {
        try {
            const response = await this.DELETE(`/${id}`)

            const {status} = response
            const data = await response.json()

            if (status !== 200) throw new Error(data.message || 'Unknown error')

            return data as IssueDto
        } catch (error) {
            console.error(error)
            return null
        }
    }

    async addTimeEntryToIssue(id: string, timeEntry: ITimeEntry) {
        try {
            const response = await this.POST(`/${id}/time-entries/`, {
                body: JSON.stringify(timeEntry),
            })

            const {status} = response
            const data = await response.json()

            if (status !== 201) throw new Error(data.message || 'Unknown error')

            return data as TimeEntryDto
        } catch (error) {
            console.error(error)
            return null
        }
    }

    async deleteTimeEntryFromIssue(id: string, timeEntryId: string) {
        try {
            const response = await this.DELETE(
                `/${id}/time-entries/${timeEntryId}`,
            )

            const {status} = response
            const data = await response.json()

            if (status !== 200) throw new Error(data.message || 'Unknown error')

            return data as TimeEntryDto
        } catch (error) {
            console.error(error)
            return null
        }
    }
}
