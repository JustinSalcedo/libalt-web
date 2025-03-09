import styled from 'styled-components'
import {IIssue} from '../types/IIssue'
import DarkButton from './DarkButton'

// CreateIssueForm component with fields for issue code and name and save button
const CreateIssueForm = ({
    issue,
    onChange,
    onSave,
    onCancel,
}: {
    issue: IIssue
    onChange: (issue: IIssue) => void
    onSave: (issue: IIssue) => void
    onCancel: () => void
}) => {
    return (
        <StyledForm>
            <StyledInputGroup>
                Code:
                <StyledInput
                    type="text"
                    value={issue.code}
                    onChange={e => onChange({...issue, code: e.target.value})}
                />
            </StyledInputGroup>
            <StyledInputGroup>
                Name:
                <StyledInput
                    type="text"
                    value={issue.name}
                    onChange={e => onChange({...issue, name: e.target.value})}
                />
            </StyledInputGroup>
            <ButtonsContainer>
                <DarkButton onClick={() => onSave(issue)}>Save</DarkButton>
                <DarkButton onClick={onCancel}>Cancel</DarkButton>
            </ButtonsContainer>
        </StyledForm>
    )
}

export default CreateIssueForm

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    width: 200px;
`

const StyledInputGroup = styled.label`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
`

const StyledInput = styled.input`
    width: 120px;
`

const ButtonsContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 1rem;
    margin-top: 1rem;
`
