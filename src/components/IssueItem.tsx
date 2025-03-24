import {useState} from 'react'
import IssueLookupModal from '../modals/IssueLookup.modal'
import styled from 'styled-components'
import {Issue} from '../issues/issue'
import {observer} from 'mobx-react-lite'
import ViewButton from './buttons/ViewButton'
import StopButton from './buttons/StopButton'
import PlayButton from './buttons/PlayButton'
import MoveUpButton from './buttons/MoveUpButton'

// IssueItem component with code, name, play button, and view button for IssueList
const IssueItem = observer(
    ({issue, small = false}: {issue: Issue; small?: boolean}) => {
        const [showLookupModal, setShowLookupModal] = useState(false)

        return (
            <Container>
                {small ? (
                    <StyledIssueTitleSmall>{`${issue.code} ${issue.name}`}</StyledIssueTitleSmall>
                ) : (
                    <StyledIssueTitle>{`${issue.code} ${issue.name}`}</StyledIssueTitle>
                )}
                <ButtonsContainer>
                    {!issue.archived && !!issue.priority && (
                        <MoveUpButton onClick={() => issue.moveUp()} />
                    )}
                    <ViewButton onClick={() => setShowLookupModal(true)} />
                    {issue.isPlaying ? (
                        <StopButton onClick={() => issue.stop()} />
                    ) : (
                        <PlayButton onClick={() => issue.play()} />
                    )}
                </ButtonsContainer>
                {showLookupModal && (
                    <IssueLookupModal
                        issue={issue}
                        onClose={() => setShowLookupModal(false)}
                    />
                )}
            </Container>
        )
    },
)

export default IssueItem

const Container = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    /* gap: 1rem; */
    justify-content: space-between;
    width: calc(100vw - 80px);
    height: 4rem;
`

const StyledIssueTitle = styled.h2`
    font-size: 1.25rem;
    margin: 0;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`

const StyledIssueTitleSmall = styled.h2`
    font-size: 1rem;
    margin: 0;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`

const ButtonsContainer = styled.div`
    display: flex;
    height: 2rem;
    gap: 0.5rem;
    margin-left: 0.5rem;
`
