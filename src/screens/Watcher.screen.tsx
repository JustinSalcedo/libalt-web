import Stopwatch from '../components/Stopwatch'
import IssueList from '../components/IssueList'
import styled from 'styled-components'
import IssueEditor from '../components/IssueEditor'
import DailyLogList from '../components/DailyLogList'
import {observer} from 'mobx-react-lite'
import useViewsObservable from '../hooks/useViewsObservable'

// WatcherScreen component
const WatcherScreen = () => {
    return (
        <Container>
            <StopwatchContainer>
                <Stopwatch />
            </StopwatchContainer>
            <IssueEditor />
            <MidPanel />
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
    padding-block: 1.5rem;
`

const StopwatchContainer = styled.div`
    /* min-height: 160px; */
    margin-bottom: 20px;
`

const MidPanel = observer(() => {
    const viewsObservable = useViewsObservable()

    switch (viewsObservable.midPanel) {
        case 'daily-log':
            return <DailyLogList />
        case 'issue-list':
        default:
            return <IssueList />
    }
})
