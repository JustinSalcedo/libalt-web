import {createContext, useContext} from 'react'
import root from '../root'

const useStopwatchObservable = () =>
    useContext(createContext(root.stopwatchObservable))

export default useStopwatchObservable
