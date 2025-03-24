// Stopwatch component with play, pause, and stop buttons
import styled from 'styled-components'
import useStopwatchObservable from '../hooks/useStopwatchObservable'
import {observer} from 'mobx-react-lite'
import PlayButton from './buttons/PlayButton'
import PauseButton from './buttons/PauseButton'
import StopButton from './buttons/StopButton'

const Stopwatch = observer(() => {
    const stopwatchObservable = useStopwatchObservable()

    return (
        <Container>
            <StyledTitleText>{stopwatchObservable.title}</StyledTitleText>
            <StyledTimerText>
                {stopwatchObservable.formattedTime}
            </StyledTimerText>
            <ButtonsContainer>
                {!stopwatchObservable.isIssueInProgress ||
                !stopwatchObservable.isRunning ? (
                    <PlayButton
                        onClick={() => stopwatchObservable.play()}
                        disabled={!stopwatchObservable.isIssueInProgress}
                    />
                ) : (
                    <PauseButton onClick={() => stopwatchObservable.pause()} />
                )}
                <StopButton
                    onClick={() => stopwatchObservable.stop()}
                    disabled={!stopwatchObservable.isIssueInProgress}
                    type="danger"
                />
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

const StyledTitleText = styled.h2`
    font-size: 1.5rem;
    margin-block: 1rem;
    margin-inline: 2rem;
    text-align: center;
`

const StyledTimerText = styled.p`
    font-size: 2rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
    font-family: monospace;
`
