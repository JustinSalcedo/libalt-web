import {createContext, useContext} from 'react'
import root from '../root'

const useDailyLogObservabable = () =>
    useContext(createContext(root.dailyLogObservable))

export default useDailyLogObservabable
