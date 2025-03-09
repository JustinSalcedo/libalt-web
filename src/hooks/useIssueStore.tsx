import {createContext, useContext} from 'react'
import root from '../root'

const useIssueStore = () => useContext(createContext(root.issueStore))

export default useIssueStore
