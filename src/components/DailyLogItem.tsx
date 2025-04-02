import styled from 'styled-components'
import {IssueLoggedTimeDto} from '../issues/dto/issue-logged-time.dto'

const DailyLogItem = ({
    loggedTime,
    small = false,
}: {
    loggedTime: IssueLoggedTimeDto
    small?: boolean
}) => {
    return (
        <Container>
            {small ? (
                <>
                    <StyledIssueLabelSmall>
                        {loggedTime.displayTitle}
                    </StyledIssueLabelSmall>
                    <StyledTimeLoggedSmall>
                        {loggedTime.loggedTime}
                    </StyledTimeLoggedSmall>
                </>
            ) : (
                <>
                    <StyledIssueLabel>
                        {loggedTime.displayTitle}
                    </StyledIssueLabel>
                    <StyledTimeLogged>{loggedTime.loggedTime}</StyledTimeLogged>
                </>
            )}
        </Container>
    )
}

export default DailyLogItem

const Container = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    /* gap: 1rem; */
    justify-content: space-between;
    width: 100vw;
    padding-inline: 2rem;
    height: 4rem;
`

const StyledIssueLabel = styled.span`
    font-size: 1.25rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`

const StyledIssueLabelSmall = styled.span`
    font-size: 1rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`

const StyledTimeLogged = styled.span`
    font-size: 1.25rem;
    font-weight: bold;
`

const StyledTimeLoggedSmall = styled.span`
    font-size: 1rem;
    font-weight: bold;
`
