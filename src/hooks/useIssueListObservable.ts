import {createContext, useContext} from 'react'
import root from '../root'

const useIssueListObservable = () =>
    useContext(createContext(root.issueListObservable))

export default useIssueListObservable
