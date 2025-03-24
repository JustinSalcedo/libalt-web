import {TimeEntryDto} from './time-entry.dto'

export interface IssueDto {
    _id: string
    code: string
    name: string
    timeEntries: TimeEntryDto[]
    archived: boolean
    priority?: number
}
