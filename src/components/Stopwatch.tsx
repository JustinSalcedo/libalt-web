// Stopwatch component with play, pause, and stop buttons
import styled from 'styled-components'
import useStopwatchObservable from '../hooks/useStopwatchObservable'
import {observer} from 'mobx-react-lite'
import DarkButton from './DarkButton'

const Stopwatch = observer(() => {
    const stopwatchObservable = useStopwatchObservable()

    return (
        <Container>
            <h2>{stopwatchObservable.title}</h2>
            <StyledTimerText>
                {stopwatchObservable.formattedTime}
            </StyledTimerText>
            <ButtonsContainer>
                <DarkButton
                    onClick={() => stopwatchObservable.start()}
                    disabled={
                        !stopwatchObservable.isIssueInProgress ||
                        stopwatchObservable.isRunning
                    }>
                    Play
                </DarkButton>
                <DarkButton
                    onClick={() => stopwatchObservable.pause()}
                    disabled={!stopwatchObservable.isRunning}>
                    Pause
                </DarkButton>
                <DarkButton onClick={() => stopwatchObservable.stop()}>
                    Stop
                </DarkButton>
            </ButtonsContainer>
        </Container>
    )
})

export default Stopwatch

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const ButtonsContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 1rem;
`

const StyledTimerText = styled.p`
    font-size: 2rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
`
