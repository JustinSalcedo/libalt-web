import {observer} from 'mobx-react-lite'
import DailyLogItem from './DailyLogItem'
import ToggleRound15Min from './ToggleRound15Min'
import styled from 'styled-components'
import DateSeeker from './DateSeeker'
import useDailyLogObservabable from '../hooks/useDailyLogObservabable'

const DailyLogList = observer(() => {
    const dailyLogObservable = useDailyLogObservabable()

    return (
        <>
            <TopBarContainer>
                <DateSeeker />
                <ToggleRound15Min />
            </TopBarContainer>
            <DailyLogListContainer>
                {!!dailyLogObservable.loggedTimesByDate.length ? (
                    <div>
                        {dailyLogObservable.loggedTimesByDate.map(
                            (loggedTime, index) => (
                                <DailyLogItem
                                    key={index}
                                    loggedTime={loggedTime}
                                    small={
                                        dailyLogObservable.loggedTimesByDate
                                            .length > 5
                                    }
                                />
                            ),
                        )}
                    </div>
                ) : (
                    <div>No logged time</div>
                )}
            </DailyLogListContainer>
        </>
    )
})

export default DailyLogList

const TopBarContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding-inline: 2rem;
    margin-bottom: 1rem;
`

const DailyLogListContainer = styled.div`
    overflow-y: scroll;
`
