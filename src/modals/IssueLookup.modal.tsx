import styled from 'styled-components'
import {Issue} from '../issues/issue'
import {formatTimeWithoutMilliseconds} from '../utils/datetime'
import DarkButton from '../components/buttons/DarkButton'

// IssueLookupModal with issue code, name, total logged tiem, and time entries
const IssueLookupModal = ({
    issue,
    onClose,
}: {
    issue: Issue
    onClose: () => void
}) => {
    return (
        <Container>
            <CloseButton onClick={onClose}>X</CloseButton>
            <Heading>{`${issue.code} ${issue.name}`}</Heading>
            <p>
                Total Logged Time:{' '}
                {formatTimeWithoutMilliseconds(issue.totalTimeInMs)}
            </p>
            <StyledList>
                {issue.timeLogStrList.map(({timeRange, duration}, index) => (
                    <li key={index}>
                        <p>{timeRange}</p>
                        <p>{duration}</p>
                    </li>
                ))}
            </StyledList>
            <ButtonsContainer>
                {/* archive and delete buttons */}
                {issue.archived ? (
                    <DarkButton onClick={() => issue.unarchive()}>
                        Unarchive
                    </DarkButton>
                ) : (
                    <DarkButton onClick={() => issue.archive()}>
                        Archive
                    </DarkButton>
                )}
                <DarkButton onClick={() => issue.delete()}>Delete</DarkButton>
            </ButtonsContainer>
        </Container>
    )
}

export default IssueLookupModal

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: calc(100vw - 40px);
    position: absolute;
    top: 0;
    left: 0;
    background-color: #111;
    padding-inline: 20px;
`

const CloseButton = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
`

const Heading = styled.h2`
    text-align: center;
`

const ButtonsContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 1rem;
    margin-top: 1rem;
`

const StyledList = styled.ol`
    margin: 0;
    gap: 0.5rem;
    max-height: 50vh;
    overflow-y: scroll;
`
