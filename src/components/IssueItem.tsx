import {useState} from 'react'
import IssueLookupModal from '../modals/IssueLookup.modal'
import styled from 'styled-components'
import {Issue} from '../issues/issue'
import DarkButton from './DarkButton'
import {observer} from 'mobx-react-lite'

// IssueItem component with code, name, play button, and view button for IssueList
const IssueItem = observer(({issue}: {issue: Issue}) => {
    const [showLookupModal, setShowLookupModal] = useState(false)

    return (
        <Container>
            <StyledIssueTitle>{`${issue.code} ${issue.name}`}</StyledIssueTitle>
            <ButtonsContainer>
                <DarkButton onClick={() => setShowLookupModal(true)}>
                    View
                </DarkButton>
                {issue.isPlaying ? (
                    <DarkButton onClick={() => issue.stop()} type="danger">
                        Stop
                    </DarkButton>
                ) : (
                    <DarkButton onClick={() => issue.play()}>Play</DarkButton>
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
})

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

const ButtonsContainer = styled.div`
    display: flex;
    height: 2rem;
    /* width: max-content; */
    gap: 0.5rem;
    margin-left: 0.5rem;
`
