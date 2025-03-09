import styled from 'styled-components'
import {Issue} from '../issues/issue'
import {formatTimeWithoutMilliseconds} from '../utils/datetime'
import DarkButton from '../components/DarkButton'

// IssueLookupModal with issue code, name, total logged tiem, and time entries
const IssueLookupModal = ({
    issue,
    onClose,
}: {
    issue: Issue
    onClose: () => void
}) => {
    const totalLoggedTime = issue.timeEntries.reduce((acc, timeEntry) => {
        return acc + (timeEntry.endTimeInMs - timeEntry.startTimeInMs)
    }, 0)

    return (
        <Container>
            <CloseButton onClick={onClose}>X</CloseButton>
            <h2>{`${issue.code} ${issue.name}`}</h2>
            <p>
                Total Logged Time:{' '}
                {formatTimeWithoutMilliseconds(totalLoggedTime)}
            </p>
            <StyledList>
                {issue.timeEntries.map((timeEntry, index) => (
                    <li key={index}>
                        {/* start time and end time from startTimeInMs and endTimeInMs */}
                        <p>
                            {new Date(
                                timeEntry.startTimeInMs,
                            ).toLocaleTimeString()}{' '}
                            -{' '}
                            {new Date(
                                timeEntry.endTimeInMs,
                            ).toLocaleTimeString()}
                        </p>
                        {/* calculate total duration with startTimeInMs and endTimeInMs in HH:MM format*/}
                        <p>
                            {formatTimeWithoutMilliseconds(
                                Math.floor(
                                    timeEntry.endTimeInMs -
                                        timeEntry.startTimeInMs,
                                ),
                            )}
                        </p>
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
    width: 100vw;
    position: absolute;
    top: 0;
    left: 0;
    background-color: #111;
`

const CloseButton = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
`

const ButtonsContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 1rem;
    margin-top: 1rem;
`

const StyledList = styled.ol`
    padding: 0;
    margin: 0;
    padding-left: 1rem;
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: center;
    gap: 0.5rem;
    max-height: 50vh;
    overflow-y: scroll;
`
