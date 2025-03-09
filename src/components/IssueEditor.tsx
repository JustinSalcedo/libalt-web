import {useState} from 'react'
import {IIssue} from '../types/IIssue'
import CreateIssueForm from './CreateIssueForm'
import useIssueStore from '../hooks/useIssueStore'
import {observer} from 'mobx-react-lite'
import styled from 'styled-components'
import DarkButton from './DarkButton'

// IssueEditor component to toggle CreateIssueForm with add and cancel button
const IssueEditor = observer(() => {
    const issueStore = useIssueStore()

    const [isEditing, setIsEditing] = useState(false)
    // issue local state
    const [issue, setIssue] = useState<IIssue>({
        code: '',
        name: '',
        timeEntries: [],
        archived: false,
    })

    const onChange = (issue: IIssue) => {
        setIssue(issue)
    }

    const onSave = (issue: IIssue) => {
        console.log('save', issue)
        issueStore.createIssue(issue)
        setIsEditing(false)
        setIssue({
            code: '',
            name: '',
            timeEntries: [],
            archived: false,
        })
    }

    const onCancel = () => {
        setIsEditing(false)
    }

    return (
        <Container>
            {isEditing ? (
                <CreateIssueForm
                    issue={issue}
                    onChange={onChange}
                    onSave={onSave}
                    onCancel={onCancel}
                />
            ) : (
                <DarkButton onClick={() => setIsEditing(true)}>
                    Add Issue
                </DarkButton>
            )}
        </Container>
    )
})

export default IssueEditor

const Container = styled.div`
    margin-bottom: 1rem;
`
