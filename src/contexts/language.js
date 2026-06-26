import { createContext, useContext } from 'react'

export const LanguageContext = createContext('es')
export const useLanguage = () => useContext(LanguageContext)
