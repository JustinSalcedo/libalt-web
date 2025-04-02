import {createContext, useContext} from 'react'
import root from '../root'

const useViewsObservable = () => useContext(createContext(root.viewsObservable))

export default useViewsObservable
