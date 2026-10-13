import { createContext, useContext } from 'react'

// Lets any page (e.g. the cover) open the Contents overlay.
export const ContentsContext = createContext(() => {})
export const useOpenContents = () => useContext(ContentsContext)
