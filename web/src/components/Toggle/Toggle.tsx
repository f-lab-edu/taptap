import { useState, useCallback, useMemo } from 'react'
import { ToggleContext } from './ToggleContext'
import ToggleButton from './ToggleButton'
import ToggleList from './ToggleList'

interface ListboxProps {
  children: React.ReactNode
}

const Toggle = ({ children }: ListboxProps) => {
  const [on, setOn] = useState(false)
  const toggle = useCallback(() => setOn((prev) => !prev), [])
  const value = useMemo(() => ({ on, toggle }), [on])

  return (
    <ToggleContext.Provider value={value}>{children}</ToggleContext.Provider>
  )
}

Toggle.Button = ToggleButton
Toggle.List = ToggleList
export default Toggle
