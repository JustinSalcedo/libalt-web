import {observer} from 'mobx-react-lite'
import useDailyLogObservabable from '../hooks/useDailyLogObservabable'
import styled from 'styled-components'
import Toggle from './Toggle'

const ToggleRound15Min = observer(() => {
    const dailyLogObservable = useDailyLogObservabable()

    return (
        <ToggleContainer>
            <Toggle
                isOn={dailyLogObservable.areRoundedTo15Min}
                handleToggle={() => dailyLogObservable.toggleRoundedTo15Min()}
            />
            <span>Round 15 min</span>
        </ToggleContainer>
    )
})

export default ToggleRound15Min

const ToggleContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`
