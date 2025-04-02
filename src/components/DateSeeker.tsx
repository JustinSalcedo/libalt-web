import {observer} from 'mobx-react-lite'
import styled from 'styled-components'
import useDailyLogObservabable from '../hooks/useDailyLogObservabable'
import {useState} from 'react'

interface DateSeekerProps {
    onDateChange: (date: Date) => void
}

// DateSeeker component to navigate between dates
const DateSeeker = observer(() => {
    const dailyLogObservable = useDailyLogObservabable()
    const [showDatePicker, setShowDatePicker] = useState(false)

    const handlePreviousDay = () => {
        dailyLogObservable.viewPreviousDay()
    }

    const handleNextDay = () => {
        dailyLogObservable.viewNextDay()
    }

    const toggleDatePicker = () => {
        setShowDatePicker(!showDatePicker)
    }

    return (
        <DateSeekerContainer>
            <DateSeekerButtonLeft onClick={handlePreviousDay}>
                <b>{'<'}</b>
            </DateSeekerButtonLeft>
            <DateSeekerDate onClick={() => toggleDatePicker()}>
                {dailyLogObservable.dateSeekerStr}
            </DateSeekerDate>
            <DateSeekerButtonRight onClick={handleNextDay}>
                <b>{'>'}</b>
            </DateSeekerButtonRight>
        </DateSeekerContainer>
    )
})

export default DateSeeker

const DateSeekerContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

const DateSeekerButton = styled.button`
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 0.25rem 0.5rem;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #45a049;
    }
`

const DateSeekerButtonLeft = styled(DateSeekerButton)`
    border-radius: 5px 0 0 5px;
`

const DateSeekerButtonRight = styled(DateSeekerButton)`
    border-radius: 0 5px 5px 0;
`

const DateSeekerDate = styled.span`
    margin: 0 20px;
    font-size: 18px;
    font-weight: bold;
    /* cursor: pointer; */
`
