import root from '../root'
import {createContext, useContext} from 'react'

const useRootStore = () => useContext(createContext(root))

export default useRootStore
