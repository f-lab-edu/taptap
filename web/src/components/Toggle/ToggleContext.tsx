import { createContext, useContext } from 'react'

interface ToggleContextType {
  on: boolean
  toggle: () => void
}

export const ToggleContext = createContext<ToggleContextType | null>(null)

export const useToggleContext = () => {
  const context = useContext(ToggleContext)
  if (!context) {
    throw new Error('')
  }

  return context
}
