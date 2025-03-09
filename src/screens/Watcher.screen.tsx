import Stopwatch from '../components/Stopwatch'
import IssueList from '../components/IssueList'
import styled from 'styled-components'
import IssueEditor from '../components/IssueEditor'

// WatcherScreen component
const WatcherScreen = () => {
    return (
        <Container>
            <StopwatchContainer>
                <Stopwatch />
            </StopwatchContainer>
            <IssueEditor />
            <IssueListContainer>
                <IssueList />
            </IssueListContainer>
        </Container>
    )
}

export default WatcherScreen

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
`

const StopwatchContainer = styled.div`
    /* min-height: 160px; */
    margin-bottom: 20px;
`

const IssueListContainer = styled.div`
    overflow-y: scroll;
`
